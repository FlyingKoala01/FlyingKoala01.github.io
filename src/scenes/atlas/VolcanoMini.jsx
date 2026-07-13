import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jitteredCylinder } from '../../utils/geometry.js'
import Embers from './Embers.jsx'

const SLOPE = 0.36 // radians the flank leans, used to lay streaks on it

const STREAKS = [
  { angle: 0.55, y: 1.05, len: 1.3 },
  { angle: 2.4, y: 0.85, len: 1.0 },
  { angle: 4.3, y: 1.15, len: 1.15 },
]

export default function VolcanoMini() {
  const glow = useRef()
  // truncated cone: wide base, crater-width top
  const body = useMemo(() => jitteredCylinder(0.62, 1.55, 2.2, 7, 0.1, 7), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    glow.current.intensity = 2.6 + Math.sin(t * 3.1) * 0.5 + Math.sin(t * 7.7) * 0.3
  })

  return (
    <group scale={0.85}>
      <mesh geometry={body} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#43302c" flatShading roughness={1} />
      </mesh>
      {/* lava pool filling the crater */}
      <mesh position={[0, 2.14, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.12, 7]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#ff4d12"
          emissiveIntensity={3.4}
        />
      </mesh>
      {/* streaks laid on the flank */}
      {STREAKS.map((s, i) => {
        const r = 1.55 - ((1.55 - 0.62) / 2.2) * s.y - 0.06
        return (
          <group key={i} rotation={[0, s.angle, 0]}>
            <mesh position={[0, s.y, r]} rotation={[-SLOPE, 0, 0]}>
              <boxGeometry args={[0.09, s.len, 0.05]} />
              <meshStandardMaterial
                color="#000000"
                emissive="#ff3d08"
                emissiveIntensity={2.1}
              />
            </mesh>
          </group>
        )
      })}
      <Embers position={[0, 2.2, 0]} count={36} radius={0.32} height={1.25} />
      <pointLight
        ref={glow}
        position={[0, 2.5, 0]}
        color="#ff6a2a"
        intensity={2.8}
        distance={7}
        decay={2}
      />
    </group>
  )
}
