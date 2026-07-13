import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// A few gulls circling on flapping wings.
export default function Seabirds({ count = 3, radius = 7, ...props }) {
  const birds = useRef([])
  const wings = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const b = birds.current[i]
      if (!b) continue
      const w = 0.22 + i * 0.045
      const a = t * w + i * 2.1
      b.position.set(
        Math.cos(a) * radius,
        Math.sin(t * 0.7 + i * 1.7) * 0.9,
        Math.sin(a) * radius * 0.65,
      )
      b.rotation.y = -a - Math.PI / 2
      const flap = Math.sin(t * 8 + i * 3) * 0.55
      const pair = wings.current[i]
      if (pair) {
        pair[0].rotation.z = flap
        pair[1].rotation.z = -flap
      }
    }
  })

  return (
    <group {...props}>
      {Array.from({ length: count }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) birds.current[i] = el
          }}
        >
          {[0, 1].map((side) => (
            <mesh
              key={side}
              ref={(el) => {
                if (el) {
                  wings.current[i] = wings.current[i] || []
                  wings.current[i][side] = el
                }
              }}
              position={[side === 0 ? 0.22 : -0.22, 0, 0]}
            >
              <planeGeometry args={[0.46, 0.15]} />
              <meshStandardMaterial
                color="#d6dde4"
                flatShading
                roughness={0.9}
                side={2}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
