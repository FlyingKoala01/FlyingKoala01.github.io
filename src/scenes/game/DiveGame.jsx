import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import KoalaModel from '../atlas/KoalaModel.jsx'
import { useGame } from '../../store/useGame.js'
import { jitter } from '../../utils/geometry.js'
import { tilt } from '../../utils/tilt.js'

const ORIGIN = new THREE.Vector3(0, -1000, 0)
const AREA = 4.3 // half-width of the play field
const ROCK_COUNT = 22
const DOT_COUNT = 240
const ROCK_MIN_SCALE = 0.38
const ROCK_MAX_SCALE = 0.68
const FALL_START_SPEED = 5.5
const FALL_SPEED_STEP = 0.6
const FALL_DEPTH_STEP = 10
const FALL_MAX_SPEED = 13

const rnd = () => Math.random()

export default function DiveGame() {
  const state = useGame((s) => s.state)
  const koala = useRef()
  const rig = useRef()
  const parts = useRef({})
  const rocks = useRef([])
  const dots = useRef()
  const keys = useRef({})
  const prevState = useRef('idle')
  const look = useRef(new THREE.Vector3())
  const sim = useRef({
    x: 0,
    vx: 0,
    y: 0,
    t: 0,
    alive: true,
    crashT: 0,
    lastScore: -1,
  })

  const rockGeom = useMemo(() => {
    const base = new THREE.DodecahedronGeometry(1, 0)
    const g = jitter(base, 0.22, 77)
    base.dispose()
    return g
  }, [])

  const dotPositions = useMemo(() => new Float32Array(DOT_COUNT * 3), [])

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

  const placeRock = (rock, y) => {
    const sc = THREE.MathUtils.lerp(ROCK_MIN_SCALE, ROCK_MAX_SCALE, rnd())
    rock.position.set((rnd() - 0.5) * AREA * 2, y, 0)
    rock.scale.setScalar(sc)
    rock.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3)
    rock.userData.r = sc * 1.05
    rock.userData.spin = 0.4 + rnd() * 1.6
  }

  const resetRun = () => {
    const s = sim.current
    s.x = 0
    s.vx = 0
    s.y = 0
    s.t = 0
    s.alive = true
    s.crashT = 0
    s.lastScore = -1
    for (let i = 0; i < rocks.current.length; i++) {
      const rock = rocks.current[i]
      if (rock) placeRock(rock, -22 - i * 4 - rnd() * 3)
    }
    for (let i = 0; i < DOT_COUNT; i++) {
      dotPositions[i * 3] = (rnd() - 0.5) * 18
      dotPositions[i * 3 + 1] = 20 - rnd() * 90
      dotPositions[i * 3 + 2] = (rnd() - 0.5) * 18
    }
    if (dots.current) {
      dots.current.geometry.attributes.position.needsUpdate = true
    }
    if (rig.current) rig.current.rotation.set(0, 0, 0)
  }

  useEffect(() => {
    if (state === 'starting') resetRun()
    if (state === 'playing' && prevState.current === 'over') resetRun()
    prevState.current = state
  }, [state])

  useFrame((st, dt) => {
    if (state === 'idle' || state === 'exiting') return
    const s = sim.current
    const P = parts.current
    if (!koala.current || !rig.current || !P.prop) return
    const step = Math.min(dt, 0.05)
    const t = st.clock.elapsedTime

    if (state === 'playing' && s.alive) {
      s.t += step
      const depth = Math.floor(-s.y)
      const fall = Math.min(
        FALL_START_SPEED + Math.floor(depth / FALL_DEPTH_STEP) * FALL_SPEED_STEP,
        FALL_MAX_SPEED,
      )

      const k = keys.current
      const ix =
        (k.d || k.arrowright ? 1 : 0) - (k.a || k.arrowleft ? 1 : 0)
      const tx = ix * 7 + -Math.sin(tilt.rz) * 18
      s.vx = THREE.MathUtils.damp(s.vx, tx, 6, step)
      s.x = THREE.MathUtils.clamp(s.x + s.vx * step, -AREA, AREA)
      s.y -= fall * step

      // score = meters fallen; only touch the store when the number changes
      const nextDepth = Math.floor(-s.y)
      if (nextDepth !== s.lastScore) {
        s.lastScore = nextDepth
        useGame.getState().setScore(nextDepth)
      }

      // rocks: recycle above, collide, spin
      for (const rock of rocks.current) {
        if (!rock) continue
        if (rock.position.y > s.y + 14) {
          placeRock(rock, s.y - 42 - rnd() * 12)
        }
        rock.rotation.x += step * rock.userData.spin
        rock.rotation.y += step * rock.userData.spin * 0.6
        const dx = rock.position.x - s.x
        const dy = rock.position.y - s.y - 0.35
        if (Math.sqrt(dx * dx + dy * dy) < rock.userData.r + 0.3) {
          s.alive = false
          s.crashT = 0
          useGame.getState().crash()
        }
      }

      // background dots: recycle to keep the shaft populated
      for (let i = 0; i < DOT_COUNT; i++) {
        if (dotPositions[i * 3 + 1] > s.y + 24) {
          dotPositions[i * 3] = (rnd() - 0.5) * 18
          dotPositions[i * 3 + 1] = s.y - 70 - rnd() * 15
          dotPositions[i * 3 + 2] = (rnd() - 0.5) * 18
        }
      }
      dots.current.geometry.attributes.position.needsUpdate = true

      // dive pose: head-first lean into travel direction, propeller screaming
      rig.current.rotation.z = THREE.MathUtils.clamp(-s.vx * 0.05, -0.5, 0.5)
      rig.current.rotation.x = 0
      P.prop.rotation.y += step * 50
      P.armL.rotation.z = 2.3 + Math.sin(t * 18) * 0.4
      P.armR.rotation.z = -2.3 - Math.cos(t * 18) * 0.4
      P.legL.rotation.x = Math.sin(t * 14) * 0.6
      P.legR.rotation.x = -Math.sin(t * 14) * 0.6
    } else if (!s.alive) {
      // tumbling out after the hit
      s.crashT += step
      s.y -= Math.max(0, 1.6 - s.crashT) * 2.4 * step
      rig.current.rotation.x += step * 8
      rig.current.rotation.z += step * 6
    }

    koala.current.position.set(s.x, s.y, 0)

    // chase camera
    const cam = st.camera
    cam.position.set(
      ORIGIN.x + s.x * 0.55,
      ORIGIN.y + s.y + 1.6,
      ORIGIN.z + 7.4,
    )
    look.current.set(ORIGIN.x + s.x, ORIGIN.y + s.y - 0.6, ORIGIN.z)
    cam.lookAt(look.current)
  })

  if (state === 'idle') return null

  return (
    <group position={ORIGIN}>
      <group ref={koala}>
        <group ref={rig}>
          <group scale={0.38}>
            <KoalaModel parts={parts} />
          </group>
        </group>
        {/* headlight so rocks emerge from the dark below */}
        <pointLight
          position={[0, -2, 2.5]}
          intensity={16}
          distance={30}
          decay={1.6}
          color="#bcd6f5"
        />
      </group>
      {Array.from({ length: ROCK_COUNT }, (_, i) => (
        <mesh
          key={i}
          geometry={rockGeom}
          ref={(el) => {
            if (el) rocks.current[i] = el
          }}
          position={[0, -30 - i * 4, 0]}
        >
          <meshStandardMaterial color="#4a5560" flatShading roughness={0.95} />
        </mesh>
      ))}
      <points ref={dots}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#8fb0cf"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
