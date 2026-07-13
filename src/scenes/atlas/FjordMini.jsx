import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jitteredCone } from '../../utils/geometry.js'

const CLIFFS = [
  // left ridge (behind the channel)
  { p: [-1.15, 0.8, -0.95], r: 0.55, h: 2.1, seed: 31 },
  { p: [-0.3, 1.0, -1.05], r: 0.65, h: 2.7, seed: 32 },
  { p: [0.75, 0.75, -0.98], r: 0.5, h: 1.9, seed: 33 },
  // right ridge (in front, kept low so the water stays visible)
  { p: [-0.65, 0.4, 1.05], r: 0.4, h: 1.0, seed: 34 },
  { p: [0.4, 0.5, 1.12], r: 0.48, h: 1.25, seed: 35 },
  { p: [1.25, 0.32, 1.0], r: 0.34, h: 0.85, seed: 36 },
]

function Cliff({ p, r, h, seed }) {
  const rock = useMemo(() => jitteredCone(r, h, 5, 0.12, seed), [r, h, seed])
  const snow = useMemo(
    () => jitteredCone(r * 0.42, h * 0.32, 5, 0.05, seed + 50),
    [r, h, seed],
  )
  return (
    <group position={p}>
      <mesh geometry={rock}>
        <meshStandardMaterial color="#46565c" flatShading roughness={1} />
      </mesh>
      <mesh geometry={snow} position={[0, h * 0.36, 0]}>
        <meshStandardMaterial color="#dfe8ef" flatShading roughness={0.7} />
      </mesh>
    </group>
  )
}

export default function FjordMini() {
  const boat = useRef()

  useFrame((state) => {
    if (!boat.current) return
    const t = state.clock.elapsedTime
    // slow passage through the channel, with a gentle bob
    boat.current.position.x = Math.sin(t * 0.22) * 1.25
    boat.current.position.y = 0.16 + Math.sin(t * 1.6) * 0.015
    boat.current.rotation.z = Math.sin(t * 1.3) * 0.05
    boat.current.rotation.y = Math.cos(t * 0.22) > 0 ? 0 : Math.PI
  })

  return (
    <group>
      {/* water channel */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[3.3, 0.14, 1.35]} />
        <meshStandardMaterial
          color="#12809c"
          emissive="#0c586e"
          emissiveIntensity={0.7}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
      {CLIFFS.map((c, i) => (
        <Cliff key={i} {...c} />
      ))}
      {/* little boat */}
      <group ref={boat}>
        <mesh>
          <boxGeometry args={[0.34, 0.09, 0.13]} />
          <meshStandardMaterial color="#c8b48a" flatShading roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <coneGeometry args={[0.09, 0.24, 4]} />
          <meshStandardMaterial color="#dfe8ef" flatShading />
        </mesh>
        {/* stern light */}
        <mesh position={[-0.17, 0.06, 0]}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffd27a"
            emissiveIntensity={3.5}
          />
        </mesh>
      </group>
    </group>
  )
}
