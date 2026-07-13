import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAtlas } from '../../store/useAtlas.js'
import { tilt } from '../../utils/tilt.js'

const GRAVITY = 14
const WALK_SPEED = 1.9
const SLIP_ACCEL = 9
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

const GRAY = '#8f9aa3'
const GRAY_DARK = '#77828c'
const BELLY = '#c6ccd4'

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
        s.vel.x = THREE.MathUtils.damp(s.vel.x, 0, 6, step)
        s.vel.z = THREE.MathUtils.damp(s.vel.z, 0, 6, step)
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
          {/* squat round body */}
          <mesh position={[0, 0.32, 0]} scale={[1, 0.82, 1]}>
            <sphereGeometry args={[0.34, 12, 12]} />
            <meshStandardMaterial color={GRAY} flatShading roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.3, 0.16]} scale={[0.72, 0.58, 0.5]}>
            <sphereGeometry args={[0.3, 10, 10]} />
            <meshStandardMaterial color={BELLY} flatShading roughness={0.9} />
          </mesh>
          {/* oversized head */}
          <mesh position={[0, 0.88, 0.02]}>
            <sphereGeometry args={[0.44, 14, 14]} />
            <meshStandardMaterial color={GRAY} flatShading roughness={0.9} />
          </mesh>
          {/* big fluffy ears */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.4, 1.22, 0]}>
              <mesh>
                <sphereGeometry args={[0.21, 10, 10]} />
                <meshStandardMaterial color={GRAY_DARK} flatShading roughness={0.9} />
              </mesh>
              <mesh position={[side * 0.03, 0, 0.07]} scale={0.62}>
                <sphereGeometry args={[0.21, 8, 8]} />
                <meshStandardMaterial color="#e0aab2" flatShading roughness={0.9} />
              </mesh>
            </group>
          ))}
          {/* big sparkly eyes, set low on the face */}
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.17, 0.9, 0.43]}>
              <mesh>
                <sphereGeometry args={[0.105, 10, 10]} />
                <meshStandardMaterial color="#f2f5f8" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0, 0.075]}>
                <sphereGeometry args={[0.055, 8, 8]} />
                <meshStandardMaterial color="#14181d" roughness={0.25} />
              </mesh>
              <mesh position={[0.025, 0.03, 0.115]}>
                <sphereGeometry args={[0.02, 6, 6]} />
                <meshStandardMaterial
                  color="#ffffff"
                  emissive="#ffffff"
                  emissiveIntensity={0.6}
                />
              </mesh>
            </group>
          ))}
          {/* blush cheeks */}
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[side * 0.29, 0.76, 0.38]}
              scale={[1, 0.6, 0.4]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#e8a1a8" flatShading roughness={1} />
            </mesh>
          ))}
          {/* soft round nose */}
          <mesh position={[0, 0.82, 0.47]} scale={[0.7, 0.95, 0.5]}>
            <sphereGeometry args={[0.105, 8, 8]} />
            <meshStandardMaterial color="#272c33" flatShading roughness={0.6} />
          </mesh>
          {/* aviator cap + propeller */}
          <mesh position={[0, 1.28, 0.02]}>
            <cylinderGeometry args={[0.17, 0.23, 0.13, 8]} />
            <meshStandardMaterial color="#b3402f" flatShading roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.38, 0.02]}>
            <cylinderGeometry args={[0.025, 0.025, 0.09, 5]} />
            <meshStandardMaterial color="#3a3230" flatShading />
          </mesh>
          <group ref={prop} position={[0, 1.44, 0.02]}>
            {[0, Math.PI / 2].map((a, i) => (
              <mesh key={i} rotation={[0, a, 0]}>
                <boxGeometry args={[0.4, 0.02, 0.06]} />
                <meshStandardMaterial color="#d8c9a8" flatShading roughness={0.8} />
              </mesh>
            ))}
          </group>
          {/* stubby arms */}
          <group ref={armL} position={[0.32, 0.42, 0]}>
            <mesh position={[0.06, -0.07, 0]} rotation={[0, 0, -0.5]}>
              <capsuleGeometry args={[0.065, 0.12, 3, 6]} />
              <meshStandardMaterial color={GRAY_DARK} flatShading roughness={0.9} />
            </mesh>
          </group>
          <group ref={armR} position={[-0.32, 0.42, 0]}>
            <mesh position={[-0.06, -0.07, 0]} rotation={[0, 0, 0.5]}>
              <capsuleGeometry args={[0.065, 0.12, 3, 6]} />
              <meshStandardMaterial color={GRAY_DARK} flatShading roughness={0.9} />
            </mesh>
          </group>
          {/* stubby legs */}
          <group ref={legL} position={[0.13, 0.1, 0]}>
            <mesh position={[0, -0.04, 0]}>
              <capsuleGeometry args={[0.07, 0.08, 3, 6]} />
              <meshStandardMaterial color={GRAY_DARK} flatShading roughness={0.9} />
            </mesh>
          </group>
          <group ref={legR} position={[-0.13, 0.1, 0]}>
            <mesh position={[0, -0.04, 0]}>
              <capsuleGeometry args={[0.07, 0.08, 3, 6]} />
              <meshStandardMaterial color={GRAY_DARK} flatShading roughness={0.9} />
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
