import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { jitteredCone } from '../../utils/geometry.js'
import Annotations from '../../journey/Annotations.jsx'
import VikingShip from '../fx/VikingShip.jsx'
import Snow from '../fx/Snow.jsx'
import Aurora from '../fx/Aurora.jsx'
import Seabirds from '../fx/Seabirds.jsx'
import Orcas from '../fx/Orcas.jsx'
import KoalaEgg from '../fx/KoalaEgg.jsx'
import { WORLDS } from '../../store/useAtlas.js'

// slow foam lines drifting with the current
const STREAKS = [
  { x: -1.8, z: 6, len: 3.2, w: 0.09, speed: 0.5, o: 0.16 },
  { x: 1.2, z: -2, len: 2.2, w: 0.06, speed: 0.7, o: 0.12 },
  { x: -0.6, z: -12, len: 4, w: 0.11, speed: 0.4, o: 0.18 },
  { x: 2.4, z: -18, len: 2.8, w: 0.07, speed: 0.6, o: 0.12 },
  { x: -3.2, z: -22, len: 3.4, w: 0.09, speed: 0.45, o: 0.15 },
  { x: 4, z: 10, len: 2.4, w: 0.06, speed: 0.65, o: 0.1 },
]

const WALLS = [
  // left ridge
  { p: [-11, 0, -14], r: 6, h: 17, seed: 61 },
  { p: [-8, 0, -2], r: 5, h: 13, seed: 62 },
  { p: [-12, 0, 8], r: 6.5, h: 15, seed: 63 },
  // right ridge
  { p: [10, 0, -10], r: 6, h: 19, seed: 64 },
  { p: [9, 0, 4], r: 5, h: 12, seed: 65 },
  { p: [13, 0, 12], r: 6, h: 14, seed: 66 },
]

export default function FjordWorld({ active, ...props }) {
  const streaks = useRef([])
  const waterGeo = useMemo(() => new THREE.PlaneGeometry(70, 70, 42, 42), [])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    // low-poly swell: three crossing wave trains, flat-shaded facets
    const pos = waterGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      pos.setZ(
        i,
        0.1 * Math.sin(x * 0.38 + t * 1.05) +
          0.08 * Math.sin(y * 0.31 + t * 0.75) +
          0.05 * Math.sin((x + y) * 0.55 + t * 1.5),
      )
    }
    pos.needsUpdate = true
    // foam lines ride the current toward the mouth
    for (let i = 0; i < STREAKS.length; i++) {
      const m = streaks.current[i]
      if (!m) continue
      const s = STREAKS[i]
      const drift = (t * s.speed + i * 9) % 46
      m.position.set(s.x + Math.sin(t * 0.3 + i) * 0.6, -0.18, s.z - drift + 20)
      m.material.opacity = s.o * (0.5 + 0.5 * Math.sin(t * 0.6 + i * 1.9))
    }
  })

  return (
    <group position={WORLDS.fjord.origin} {...props}>
      <mesh
        geometry={waterGeo}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.4, 0]}
      >
        <meshStandardMaterial
          color="#11627e"
          emissive="#0a4258"
          emissiveIntensity={0.55}
          roughness={0.18}
          metalness={0.2}
          flatShading
        />
      </mesh>
      {/* current foam lines */}
      {STREAKS.map((s, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0.12]}
          ref={(el) => {
            if (el) streaks.current[i] = el
          }}
        >
          <planeGeometry args={[s.w, s.len]} />
          <meshBasicMaterial
            color="#bfe8ef"
            transparent
            opacity={s.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      {/* moon glint lane toward the mouth */}
      <mesh rotation={[-Math.PI / 2, 0, 0.28]} position={[-7, -0.15, -26]}>
        <planeGeometry args={[1.6, 26]} />
        <meshBasicMaterial
          color="#cfdce8"
          transparent
          opacity={0.07}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <Orcas />
      {WALLS.map((w, i) => (
        <Wall key={i} {...w} />
      ))}
      {/* cold moonlight fill so the ridges read against the night */}
      <pointLight
        position={[8, 16, 30]}
        color="#86b8dd"
        intensity={48}
        distance={110}
        decay={1}
      />
      {/* nav buoy lights marking the channel */}
      {[-8, 0, 8].map((z, i) => (
        <mesh key={i} position={[i % 2 === 0 ? -2.4 : 2.4, 0.1, z]}>
          <sphereGeometry args={[0.16, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive={i % 2 === 0 ? '#ff4d4d' : '#4dff88'}
            emissiveIntensity={3.2}
          />
        </mesh>
      ))}
      {/* viking longship sailing the channel, explorer at the bow */}
      <VikingShip position={[-0.6, -0.25, 5]} rotation={[0, -Math.PI / 2.4, 0]} />
      {/* weather + sky */}
      <Snow position={[0, 0, -5]} />
      <Aurora />
      <Seabirds position={[0, 8.5, -14]} />
      {/* the home lab: a cabin on a dock at the water line (chapter 02) */}
      <group position={[5.2, -0.35, -5]} rotation={[0, -0.5, 0]}>
        {/* dock */}
        <mesh position={[-1.6, 0.12, 0]}>
          <boxGeometry args={[2.4, 0.12, 1.1]} />
          <meshStandardMaterial color="#4a3d2c" flatShading roughness={1} />
        </mesh>
        {[-2.5, -1.6, -0.7].map((x, i) => (
          <mesh key={i} position={[x, -0.15, 0.4]}>
            <cylinderGeometry args={[0.06, 0.06, 0.55, 5]} />
            <meshStandardMaterial color="#3a2f22" flatShading />
          </mesh>
        ))}
        {/* cabin */}
        <mesh position={[0.4, 0.75, 0]}>
          <boxGeometry args={[1.7, 1.3, 1.5]} />
          <meshStandardMaterial color="#5b4a36" flatShading roughness={0.9} />
        </mesh>
        <mesh position={[0.4, 1.65, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.45, 0.9, 4]} />
          <meshStandardMaterial color="#26333a" flatShading roughness={1} />
        </mesh>
        {/* warm window */}
        <mesh position={[0.4, 0.8, 0.76]}>
          <planeGeometry args={[0.5, 0.45]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffb45e"
            emissiveIntensity={2.4}
          />
        </mesh>
        {/* server rack glow through the side window */}
        <mesh position={[1.26, 0.75, -0.2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#5fd4ff"
            emissiveIntensity={2}
          />
        </mesh>
        {/* antenna */}
        <mesh position={[-0.3, 2.4, -0.3]}>
          <cylinderGeometry args={[0.02, 0.04, 1.4, 5]} />
          <meshStandardMaterial color="#5d564f" flatShading />
        </mesh>
        <mesh position={[-0.3, 3.1, -0.3]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#5fd4ff"
            emissiveIntensity={3}
          />
        </mesh>
      </group>
      {/* easter egg: feet over the water at the end of the dock */}
      <KoalaEgg
        position={[2.8, -0.02, -3.9]}
        rotation={[0, -0.9, 0]}
        scale={0.42}
        sit
        wave
      />
      {active && <Annotations world="fjord" />}
    </group>
  )
}

function Wall({ p, r, h, seed }) {
  const rock = useMemo(() => jitteredCone(r, h, 6, 0.6, seed), [r, h, seed])
  const snow = useMemo(
    () => jitteredCone(r * 0.4, h * 0.28, 6, 0.25, seed + 50),
    [r, h, seed],
  )
  return (
    <group position={p}>
      <mesh geometry={rock} position={[0, h / 2 - 1, 0]}>
        <meshStandardMaterial color="#3d4d54" flatShading roughness={1} />
      </mesh>
      <mesh geometry={snow} position={[0, h - 1 + h * 0.1, 0]}>
        <meshStandardMaterial color="#dfe8ef" flatShading roughness={0.7} />
      </mesh>
    </group>
  )
}
