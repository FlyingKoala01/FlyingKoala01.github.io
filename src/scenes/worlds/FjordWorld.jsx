import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jitteredCone } from '../../utils/geometry.js'
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

// Placeholder scene: the full scroll journey replaces this in a later phase.
export default function FjordWorld(props) {
  const water = useRef()

  useFrame((state) => {
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
        intensity={22}
        distance={100}
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
