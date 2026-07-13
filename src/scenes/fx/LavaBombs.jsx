import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const rnd = (i, k) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return s - Math.floor(s)
}

// Glowing rocks lobbed from the crater on looping ballistic arcs.
export default function LavaBombs({ count = 6, ...props }) {
  const refs = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const m = refs.current[i]
      if (!m) continue
      const period = 3.5 + rnd(i, 1) * 2.5
      const life = ((t + rnd(i, 2) * 10) % period) / period
      const ang = rnd(i, 3) * Math.PI * 2
      const vx = 2.5 + rnd(i, 4) * 4.5
      const x = Math.cos(ang) * vx * life * period * 0.45
      const z = Math.sin(ang) * vx * life * period * 0.45
      // simple parabola: up fast, down with "gravity"
      const y = 9 * life * period * 0.45 - 4.9 * (life * period * 0.45) ** 2
      m.position.set(x, Math.max(y, -12), z)
      m.rotation.x = t * (1 + rnd(i, 5))
      m.rotation.z = t * (1 + rnd(i, 6))
      m.visible = y > -11
    }
  })

  return (
    <group {...props}>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el
          }}
          scale={0.12 + rnd(i, 7) * 0.14}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#1c0f0a"
            emissive="#ff4d12"
            emissiveIntensity={2.6}
          />
        </mesh>
      ))}
    </group>
  )
}
