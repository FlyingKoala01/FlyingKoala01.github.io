import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAtlas } from '../../store/useAtlas.js'
import { tilt } from '../../utils/tilt.js'

const GRAVITY = 14
const WALK_SPEED = 1.9
// slipping is meant to be a challenge: strong pull, little grip while tilted
const SLIP_ACCEL = 17
const EDGE_R = 5.15
const RESPAWN_Y = 13

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

const GRAY = '#a4abb4'
const GRAY_DARK = '#8b939d'
const BELLY = '#edf0f3'

export default function Koala() {
  const root = useRef()
  const rig = useRef() // squash / lean / facing
  const prop = useRef()
  const armL = useRef()
  const armR = useRef()
  const legL = useRef()
  const legR = useRef()
  const shadow = useRef()
  const keys = useRef({})
  const sim = useRef({
    state: 'falling', // 'falling' | 'landing' | 'ground'
    pos: new THREE.Vector3(1.6, RESPAWN_Y, 1.4),
    vel: new THREE.Vector3(),
    landT: 0,
    target: null,
    yaw: 0,
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
    if (useAtlas.getState().mode === 'world') return
    const s = sim.current
    const t = state.clock.elapsedTime
    const step = Math.min(dt, 0.05)

    if (clickTarget.v) {
      s.target = new THREE.Vector3(clickTarget.v.x, 0, clickTarget.v.z)
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
      if (r > EDGE_R) {
        s.state = 'falling'
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
      // flailing free-fall: fast propeller, arms up, gentle tumble wobble
      prop.current.rotation.y += step * 45
      armL.current.rotation.z = 2.4 + Math.sin(t * 22) * 0.5
      armR.current.rotation.z = -2.4 - Math.cos(t * 22) * 0.5
      legL.current.rotation.x = Math.sin(t * 16) * 0.7
      legR.current.rotation.x = -Math.sin(t * 16) * 0.7
      rig.current.rotation.x = Math.sin(t * 3.1) * 0.22
      rig.current.rotation.z = Math.cos(t * 2.7) * 0.22
      rig.current.scale.set(0.95, 1.12, 0.95)
    } else if (s.state === 'landing') {
      // squash and elastic recovery
      const p = s.landT / 0.45
      const squash = Math.sin(Math.min(p * Math.PI, Math.PI)) * 0.4
      rig.current.scale.set(1 + squash * 0.7, 1 - squash, 1 + squash * 0.7)
      rig.current.rotation.x = 0
      rig.current.rotation.z = 0
      prop.current.rotation.y += step * (45 - p * 40)
      armL.current.rotation.z = 2.4 * (1 - p)
      armR.current.rotation.z = -2.4 * (1 - p)
      legL.current.rotation.x = 0
      legR.current.rotation.x = 0
    } else {
      prop.current.rotation.y += step * (3 + speed * 4)
      rig.current.rotation.x = 0
      const walk = Math.min(speed / WALK_SPEED, 1)
      const hop = Math.abs(Math.sin(t * 11)) * 0.05 * walk
      root.current.position.y = s.pos.y + hop
      rig.current.rotation.z = Math.sin(t * 11) * 0.1 * walk
      rig.current.scale.set(1, 1 + Math.sin(t * 2.3) * 0.02, 1)
      const scramble = slip > 0.06 && speed > 0.4 ? 2 : 1
      legL.current.rotation.x = Math.sin(t * 11 * scramble) * 0.8 * walk
      legR.current.rotation.x = -Math.sin(t * 11 * scramble) * 0.8 * walk
      armL.current.rotation.z = 0.25 + Math.sin(t * 11 * scramble) * 0.5 * walk
      armR.current.rotation.z = -0.25 - Math.sin(t * 11 * scramble) * 0.5 * walk
      // lean against the slope while slipping
      rig.current.rotation.z += -tilt.rz * 1.6
      rig.current.rotation.x += -tilt.rx * 1.6
    }

    // blob shadow: fades with height, hidden once off the island
    if (shadow.current) {
      shadow.current.position.set(s.pos.x, 0.03, s.pos.z)
      const overIsland = Math.hypot(s.pos.x, s.pos.z) < EDGE_R
      const h = Math.max(0, 1 - Math.max(s.pos.y, 0) / 7)
      shadow.current.material.opacity = overIsland && s.pos.y > -0.1 ? 0.3 * h : 0
    }
  })

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
          {/* pear body, smooth cartoon shading */}
          <mesh position={[0, 0.34, 0]} scale={[1, 1.02, 0.92]}>
            <sphereGeometry args={[0.38, 16, 16]} />
            <meshStandardMaterial color={GRAY} roughness={0.85} />
          </mesh>
          {/* white belly */}
          <mesh position={[0, 0.32, 0.17]} scale={[0.72, 0.85, 0.45]}>
            <sphereGeometry args={[0.32, 14, 14]} />
            <meshStandardMaterial color={BELLY} roughness={0.9} />
          </mesh>
          {/* wide head, full cheeks */}
          <mesh position={[0, 0.9, 0.02]} scale={[1.12, 0.98, 0.95]}>
            <sphereGeometry args={[0.48, 18, 18]} />
            <meshStandardMaterial color={GRAY} roughness={0.85} />
          </mesh>
          {/* huge scalloped ears with big pink inners */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.58, 1.14, -0.02]}>
              <mesh scale={[1, 1.1, 0.55]}>
                <sphereGeometry args={[0.27, 14, 14]} />
                <meshStandardMaterial color={GRAY} roughness={0.85} />
              </mesh>
              {/* scallop lobes */}
              <mesh position={[side * 0.1, 0.18, 0]} scale={[1, 1, 0.5]}>
                <sphereGeometry args={[0.14, 10, 10]} />
                <meshStandardMaterial color={GRAY} roughness={0.85} />
              </mesh>
              <mesh position={[side * 0.15, -0.14, 0]} scale={[1, 1, 0.5]}>
                <sphereGeometry args={[0.12, 10, 10]} />
                <meshStandardMaterial color={GRAY} roughness={0.85} />
              </mesh>
              <mesh position={[0, 0, 0.09]} scale={[0.72, 0.85, 0.3]}>
                <sphereGeometry args={[0.25, 12, 12]} />
                <meshStandardMaterial color="#f09cab" roughness={0.9} />
              </mesh>
            </group>
          ))}
          {/* small black bead eyes */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.19, 0.98, 0.44]}>
              <mesh>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#181c22" roughness={0.25} />
              </mesh>
              <mesh position={[0.014, 0.016, 0.036]}>
                <sphereGeometry args={[0.013, 6, 6]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.5}
                />
              </mesh>
            </group>
          ))}
          {/* the big koala nose */}
          <mesh position={[0, 0.88, 0.49]} scale={[0.74, 1.15, 0.5]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#23272e" roughness={0.35} />
          </mesh>
          <mesh position={[-0.035, 0.94, 0.55]} scale={[0.5, 0.8, 0.4]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#454b54" roughness={0.4} />
          </mesh>
          {/* little smile */}
          <mesh position={[0, 0.76, 0.45]} rotation={[0.15, 0, Math.PI * 1.05]}>
            <torusGeometry args={[0.075, 0.009, 6, 12, Math.PI * 0.9]} />
            <meshStandardMaterial color="#3a4048" roughness={0.6} />
          </mesh>
          {/* aviator cap + propeller */}
          <mesh position={[0, 1.4, 0.02]}>
            <cylinderGeometry args={[0.18, 0.26, 0.14, 10]} />
            <meshStandardMaterial color="#b3402f" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.5, 0.02]}>
            <cylinderGeometry args={[0.025, 0.025, 0.09, 5]} />
            <meshStandardMaterial color="#3a3230" roughness={0.8} />
          </mesh>
          <group ref={prop} position={[0, 1.56, 0.02]}>
            {[0, Math.PI / 2].map((a, i) => (
              <mesh key={i} rotation={[0, a, 0]}>
                <boxGeometry args={[0.4, 0.02, 0.06]} />
                <meshStandardMaterial color="#d8c9a8" flatShading roughness={0.8} />
              </mesh>
            ))}
          </group>
          {/* stubby arms */}
          <group ref={armL} position={[0.36, 0.44, 0]}>
            <mesh position={[0.07, -0.08, 0]} rotation={[0, 0, -0.5]}>
              <capsuleGeometry args={[0.075, 0.14, 4, 8]} />
              <meshStandardMaterial color={GRAY} roughness={0.85} />
            </mesh>
          </group>
          <group ref={armR} position={[-0.36, 0.44, 0]}>
            <mesh position={[-0.07, -0.08, 0]} rotation={[0, 0, 0.5]}>
              <capsuleGeometry args={[0.075, 0.14, 4, 8]} />
              <meshStandardMaterial color={GRAY} roughness={0.85} />
            </mesh>
          </group>
          {/* stubby legs */}
          <group ref={legL} position={[0.15, 0.1, 0]}>
            <mesh position={[0, -0.04, 0]}>
              <capsuleGeometry args={[0.085, 0.09, 4, 8]} />
              <meshStandardMaterial color={GRAY_DARK} roughness={0.85} />
            </mesh>
          </group>
          <group ref={legR} position={[-0.15, 0.1, 0]}>
            <mesh position={[0, -0.04, 0]}>
              <capsuleGeometry args={[0.085, 0.09, 4, 8]} />
              <meshStandardMaterial color={GRAY_DARK} roughness={0.85} />
            </mesh>
          </group>
          </group>
        </group>
      </group>
      <mesh ref={shadow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <circleGeometry args={[0.16, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}
