import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const EDGE_LIGHTS = 6

export default function HangarMini() {
  const radar = useRef()
  const beacon = useRef()

  useFrame((state, dt) => {
    radar.current.rotation.y += dt * 1.1
    const blink = (Math.sin(state.clock.elapsedTime * 3.2) + 1) / 2
    beacon.current.material.emissiveIntensity = 0.4 + blink * 3.2
  })

  return (
    <group>
      {/* runway */}
      <mesh position={[0, 0.04, 0.35]}>
        <boxGeometry args={[2.9, 0.08, 0.85]} />
        <meshStandardMaterial color="#232a33" flatShading roughness={0.95} />
      </mesh>
      {/* centerline dashes */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[-1.1 + i * 0.55, 0.09, 0.35]}>
          <boxGeometry args={[0.22, 0.012, 0.045]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#dfe8ef"
            emissiveIntensity={1.1}
          />
        </mesh>
      ))}
      {/* runway edge lights */}
      {Array.from({ length: EDGE_LIGHTS * 2 }, (_, i) => {
        const row = i < EDGE_LIGHTS ? -1 : 1
        const x = -1.25 + (i % EDGE_LIGHTS) * 0.5
        return (
          <mesh key={i} position={[x, 0.1, 0.35 + row * 0.44]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#ffd27a"
              emissiveIntensity={3.6}
            />
          </mesh>
        )
      })}
      {/* quonset hangar */}
      <group position={[-0.55, 0, -0.55]}>
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[1.3, 0.18, 0.95]} />
          <meshStandardMaterial color="#2a333e" flatShading roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry
            args={[0.42, 0.42, 1.28, 10, 1, false, 0, Math.PI]}
          />
          <meshStandardMaterial color="#333e4c" flatShading roughness={0.8} />
        </mesh>
        {/* light spilling from the open door */}
        <mesh position={[0.65, 0.18, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.4, 10, 0, Math.PI]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#9fdcff"
            emissiveIntensity={1.6}
          />
        </mesh>
        {/* rotating radar on the roof */}
        <group ref={radar} position={[-0.3, 0.68, 0]}>
          <mesh>
            <boxGeometry args={[0.05, 0.18, 0.05]} />
            <meshStandardMaterial color="#4a5866" flatShading />
          </mesh>
          <mesh position={[0, 0.12, 0]} rotation={[0, 0, -0.35]}>
            <boxGeometry args={[0.3, 0.1, 0.02]} />
            <meshStandardMaterial color="#5d6d7d" flatShading />
          </mesh>
        </group>
        {/* red beacon */}
        <mesh ref={beacon} position={[0.35, 0.66, 0.25]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ff2d2d"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </group>
  )
}
