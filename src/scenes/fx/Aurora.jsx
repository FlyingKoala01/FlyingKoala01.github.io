import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RIBBONS = [
  { p: [-4, 16, -38], w: 11, h: 6.5, rot: 0.3, color: '#4dffa0', speed: 0.5 },
  { p: [6, 18.5, -42], w: 14, h: 8, rot: -0.2, color: '#5fd4ff', speed: 0.35 },
  { p: [14, 15, -36], w: 9, h: 5.5, rot: 0.45, color: '#7dff8a', speed: 0.65 },
]

// Softly pulsing aurora ribbons + a bright moon for the fjord sky.
export default function Aurora(props) {
  const mats = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < RIBBONS.length; i++) {
      const m = mats.current[i]
      if (!m) continue
      m.opacity = 0.1 + (Math.sin(t * RIBBONS[i].speed + i * 2.1) + 1) * 0.05
    }
  })

  return (
    <group {...props}>
      {RIBBONS.map((r, i) => (
        <mesh key={i} position={r.p} rotation={[0.4, 0, r.rot]}>
          <planeGeometry args={[r.w, r.h, 1, 1]} />
          <meshBasicMaterial
            ref={(el) => {
              if (el) mats.current[i] = el
            }}
            color={r.color}
            transparent
            opacity={0.12}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={2}
          />
        </mesh>
      ))}
      {/* moon */}
      <mesh position={[-14, 19, -44]}>
        <circleGeometry args={[2.2, 24]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#cfdce8"
          emissiveIntensity={2.6}
        />
      </mesh>
    </group>
  )
}
