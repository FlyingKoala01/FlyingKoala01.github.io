import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jitteredCone } from '../../utils/geometry.js'
import Annotations from '../../journey/Annotations.jsx'
import VikingShip from '../fx/VikingShip.jsx'
import Snow from '../fx/Snow.jsx'
import Aurora from '../fx/Aurora.jsx'
import { WORLDS } from '../../store/useAtlas.js'

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
  const water = useRef()

  useFrame((state) => {
    if (!water.current) return
    water.current.position.y = -0.4 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05
  })

  return (
    <group position={WORLDS.fjord.origin} {...props}>
      <mesh ref={water} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[70, 70, 1, 1]} />
        <meshStandardMaterial
          color="#0d5a72"
          emissive="#08374a"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.15}
        />
      </mesh>
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
