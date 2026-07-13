import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCursor } from '@react-three/drei'
import KoalaModel from './KoalaModel.jsx'
import { useAtlas } from '../../store/useAtlas.js'
import { useGame } from '../../store/useGame.js'
import { tilt } from '../../utils/tilt.js'

const GRAVITY = 14
const WALK_SPEED = 1.9
// slipping is meant to be a challenge: strong pull, little grip while tilted
const SLIP_ACCEL = 17
const EDGE_R = 5.15
const RESPAWN_Y = 13
// diving off this edge sector (the diving board) starts the minigame
export const DIVE_ANGLE = Math.PI / 4
const DIVE_SPREAD = 0.34
// the plank itself: walkable past the rim, out to its end
const BOARD_SPREAD = 0.075
const BOARD_END_R = 5.8
const BOARD_TOP_Y = 0.105

const angleToBoard = (x, z) => {
  let d = Math.atan2(z, x) - DIVE_ANGLE
  while (d > Math.PI) d -= Math.PI * 2
  while (d < -Math.PI) d += Math.PI * 2
  return d
}

// keep-out circles around the three miniature worlds
const OBSTACLES = [
  { x: -2.6, z: -1.0, r: 1.8 },
  { x: 2.5, z: -1.4, r: 1.95 },
  { x: 0.5, z: 2.2, r: 1.75 },
]

// right-click walk target, set by the walk plane in AtlasScene
const clickTarget = { v: null }
export function setKoalaTarget(x, z) {
  clickTarget.v = { x, z }
}

// drop the koala back in from the sky (used when leaving the minigame)
const respawnFlag = { v: false }
export function respawnKoala() {
  respawnFlag.v = true
}

export default function Koala() {
  const root = useRef()
  const rig = useRef()
  const shadow = useRef()
  const parts = useRef({})
  const keys = useRef({})
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)
  const sim = useRef({
    state: 'falling', // 'falling' | 'landing' | 'ground'
    pos: new THREE.Vector3(1.6, RESPAWN_Y, 1.4),
    vel: new THREE.Vector3(),
    landT: 0,
    target: null,
    yaw: 0,
    reactT: -1, // >= 0 while the click reaction plays
  })

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true
    }
    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame((state, dt) => {
    if (!root.current || !rig.current) return
    const P = parts.current
    if (!P.prop || !P.armL || !P.armR || !P.legL || !P.legR) return
    if (useAtlas.getState().mode === 'world') return
    if (useGame.getState().state !== 'idle') return
    const s = sim.current
    const t = state.clock.elapsedTime
    const step = Math.min(dt, 0.05)

    if (respawnFlag.v) {
      respawnFlag.v = false
      const a = Math.random() * Math.PI * 2
      const rr = 1 + Math.random() * 2.6
      s.pos.set(Math.cos(a) * rr, RESPAWN_Y, Math.sin(a) * rr)
      s.vel.set(0, 0, 0)
      s.state = 'falling'
      s.target = null
      s.reactT = -1
    }

    if (clickTarget.v) {
      let { x: tx, z: tz } = clickTarget.v
      // a click on or near the diving board means "walk off the end"
      const tr = Math.hypot(tx, tz)
      if (tr > 4.6 && Math.abs(angleToBoard(tx, tz)) < DIVE_SPREAD) {
        tx = Math.cos(DIVE_ANGLE) * 6.6
        tz = Math.sin(DIVE_ANGLE) * 6.6
      }
      s.target = new THREE.Vector3(tx, 0, tz)
      clickTarget.v = null
    }

    const k = keys.current
    let ix = (k.d ? 1 : 0) - (k.a ? 1 : 0)
    let iz = (k.s ? 1 : 0) - (k.w ? 1 : 0)

    if (s.state === 'falling') {
      s.vel.y -= GRAVITY * step
      s.pos.addScaledVector(s.vel, step)
      const r = Math.hypot(s.pos.x, s.pos.z)
      if (s.vel.y < 0 && s.pos.y <= 0 && r < EDGE_R) {
        s.pos.y = 0
        s.vel.set(0, 0, 0)
        s.state = 'landing'
        s.landT = 0
      } else if (s.pos.y < -26) {
        const a = Math.random() * Math.PI * 2
        const rr = 1 + Math.random() * 2.6
        s.pos.set(Math.cos(a) * rr, RESPAWN_Y, Math.sin(a) * rr)
        s.vel.set(0, 0, 0)
        s.target = null
      }
    } else if (s.state === 'landing') {
      s.landT += step
      if (s.landT > 0.45) s.state = 'ground'
    } else {
      // --- grounded: WASD > click-target > idle, plus tilt slip ---
      if (ix || iz) {
        const n = Math.hypot(ix, iz)
        s.vel.x = THREE.MathUtils.damp(s.vel.x, (ix / n) * WALK_SPEED, 8, step)
        s.vel.z = THREE.MathUtils.damp(s.vel.z, (iz / n) * WALK_SPEED, 8, step)
        s.target = null
      } else if (s.target) {
        const dx = s.target.x - s.pos.x
        const dz = s.target.z - s.pos.z
        const d = Math.hypot(dx, dz)
        if (d < 0.14) {
          s.target = null
        } else {
          s.vel.x = THREE.MathUtils.damp(s.vel.x, (dx / d) * WALK_SPEED, 8, step)
          s.vel.z = THREE.MathUtils.damp(s.vel.z, (dz / d) * WALK_SPEED, 8, step)
        }
      } else {
        // barely any grip while the island is tilted
        const grip = Math.hypot(tilt.rx, tilt.rz) > 0.04 ? 1.1 : 6
        s.vel.x = THREE.MathUtils.damp(s.vel.x, 0, grip, step)
        s.vel.z = THREE.MathUtils.damp(s.vel.z, 0, grip, step)
      }
      // slipping downhill when the island is tilted
      s.vel.x += -Math.sin(tilt.rz) * SLIP_ACCEL * step
      s.vel.z += Math.sin(tilt.rx) * SLIP_ACCEL * step

      s.pos.x += s.vel.x * step
      s.pos.z += s.vel.z * step

      for (const o of OBSTACLES) {
        const dx = s.pos.x - o.x
        const dz = s.pos.z - o.z
        const d = Math.hypot(dx, dz)
        if (d < o.r && d > 1e-4) {
          s.pos.x = o.x + (dx / d) * o.r
          s.pos.z = o.z + (dz / d) * o.r
        }
      }

      const r = Math.hypot(s.pos.x, s.pos.z)
      const boardDiff = angleToBoard(s.pos.x, s.pos.z)
      const onBoard =
        Math.abs(boardDiff) < BOARD_SPREAD && r > 4.5 && r <= BOARD_END_R
      // the plank raises the walkway; everywhere else feet stay on turf
      s.pos.y = onBoard ? BOARD_TOP_Y : 0

      if (r > EDGE_R && !onBoard) {
        // walked off the end (or side) of the diving board? game time
        if (Math.abs(boardDiff) < DIVE_SPREAD) {
          useGame.getState().start()
        }
        s.state = 'falling'
        s.reactT = -1
        if (Math.hypot(s.vel.x, s.vel.z) < 0.8) {
          s.vel.x += s.pos.x / r
          s.vel.z += s.pos.z / r
        }
      }
    }

    // ---------------- visuals ----------------
    root.current.position.copy(s.pos)

    const speed = Math.hypot(s.vel.x, s.vel.z)
    if (speed > 0.35) {
      const want = Math.atan2(s.vel.x, s.vel.z)
      let d = want - s.yaw
      while (d > Math.PI) d -= Math.PI * 2
      while (d < -Math.PI) d += Math.PI * 2
      s.yaw += d * Math.min(1, step * 9)
    }
    rig.current.rotation.y = s.yaw

    const slip = Math.hypot(tilt.rx, tilt.rz)
    if (s.state === 'falling') {
      P.prop.rotation.y += step * 45
      P.armL.rotation.z = 2.4 + Math.sin(t * 22) * 0.5
      P.armR.rotation.z = -2.4 - Math.cos(t * 22) * 0.5
      P.legL.rotation.x = Math.sin(t * 16) * 0.7
      P.legR.rotation.x = -Math.sin(t * 16) * 0.7
      rig.current.rotation.x = Math.sin(t * 3.1) * 0.22
      rig.current.rotation.z = Math.cos(t * 2.7) * 0.22
      rig.current.scale.set(0.95, 1.12, 0.95)
    } else if (s.state === 'landing') {
      const p = s.landT / 0.45
      const squash = Math.sin(Math.min(p * Math.PI, Math.PI)) * 0.4
      rig.current.scale.set(1 + squash * 0.7, 1 - squash, 1 + squash * 0.7)
      rig.current.rotation.x = 0
      rig.current.rotation.z = 0
      P.prop.rotation.y += step * (45 - p * 40)
      P.armL.rotation.z = 2.4 * (1 - p)
      P.armR.rotation.z = -2.4 * (1 - p)
      P.legL.rotation.x = 0
      P.legR.rotation.x = 0
    } else if (s.reactT >= 0) {
      // click reaction: startled hop + full spin + propeller burst
      s.reactT += step
      const p = Math.min(s.reactT / 0.85, 1)
      root.current.position.y = s.pos.y + Math.sin(p * Math.PI) * 0.55
      rig.current.rotation.y = s.yaw + p * Math.PI * 2
      rig.current.rotation.x = 0
      rig.current.rotation.z = 0
      const stretch = Math.sin(p * Math.PI) * 0.18
      rig.current.scale.set(1 - stretch * 0.5, 1 + stretch, 1 - stretch * 0.5)
      P.prop.rotation.y += step * 50
      P.armL.rotation.z = 2.5
      P.armR.rotation.z = -2.5
      P.legL.rotation.x = -0.6
      P.legR.rotation.x = -0.6
      if (p >= 1) s.reactT = -1
    } else {
      P.prop.rotation.y += step * (3 + speed * 4)
      rig.current.rotation.x = 0
      const walk = Math.min(speed / WALK_SPEED, 1)
      const hop = Math.abs(Math.sin(t * 11)) * 0.05 * walk
      root.current.position.y = s.pos.y + hop
      rig.current.rotation.z = Math.sin(t * 11) * 0.1 * walk
      rig.current.scale.set(1, 1 + Math.sin(t * 2.3) * 0.02, 1)
      const scramble = slip > 0.06 && speed > 0.4 ? 2 : 1
      P.legL.rotation.x = Math.sin(t * 11 * scramble) * 0.8 * walk
      P.legR.rotation.x = -Math.sin(t * 11 * scramble) * 0.8 * walk
      P.armL.rotation.z = 0.25 + Math.sin(t * 11 * scramble) * 0.5 * walk
      P.armR.rotation.z = -0.25 - Math.sin(t * 11 * scramble) * 0.5 * walk
      rig.current.rotation.z += -tilt.rz * 1.6
      rig.current.rotation.x += -tilt.rx * 1.6
    }

    // blob shadow: fades with height, hidden once off the island
    if (shadow.current) {
      shadow.current.position.set(
        s.pos.x,
        (s.state === 'ground' ? s.pos.y : 0) + 0.03,
        s.pos.z,
      )
      const overIsland = Math.hypot(s.pos.x, s.pos.z) < EDGE_R
      const h = Math.max(0, 1 - Math.max(s.pos.y, 0) / 7)
      shadow.current.material.opacity = overIsland && s.pos.y > -0.1 ? 0.3 * h : 0
    }
  })

  const poke = (e) => {
    e.stopPropagation()
    if (useAtlas.getState().mode !== 'atlas') return
    const s = sim.current
    if (s.state === 'ground' && s.reactT < 0) s.reactT = 0
  }

  return (
    <>
      <group ref={root}>
        {/* soft key light so the little guy reads against the dark island */}
        <pointLight
          position={[0, 1.6, 1.1]}
          intensity={0.75}
          distance={3}
          decay={1.8}
          color="#cfe0f0"
        />
        {/* rig carries animation (squash/lean); the inner group owns base size */}
        <group ref={rig}>
          <group scale={0.3}>
            <KoalaModel parts={parts} />
          </group>
        </group>
        {/* generous invisible hit target for clicking the koala */}
        <mesh
          position={[0, 0.28, 0]}
          onClick={poke}
          onPointerOver={(e) => {
            e.stopPropagation()
            if (useAtlas.getState().mode === 'atlas') setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.42, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}
