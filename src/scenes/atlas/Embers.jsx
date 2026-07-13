import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Rising ember/spark particles. Cheap: one Points object, positions mutated
// in place each frame.
export default function Embers({
  count = 50,
  radius = 0.4,
  height = 1.6,
  speed = 0.55,
  size = 0.06,
  color = '#ff9a4d',
  ...props
}) {
  const points = useRef()

  const { positions, seeds } = useMemo(() => {
    // deterministic hash noise, avoids visible banding
    const rnd = (i, k) => {
      const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
      return s - Math.floor(s)
    }
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count * 2)
    for (let i = 0; i < count; i++) {
      const a = rnd(i, 1) * Math.PI * 2
      const r = radius * (0.15 + rnd(i, 2) * 0.85)
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = rnd(i, 3) * height
      positions[i * 3 + 2] = Math.sin(a) * r
      seeds[i * 2] = 0.5 + rnd(i, 4) // speed factor
      seeds[i * 2 + 1] = a
    }
    return { positions, seeds }
  }, [count, radius, height])

  useFrame((state, dt) => {
    if (!points.current) return
    const arr = points.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      let y = arr.getY(i) + dt * speed * seeds[i * 2]
      if (y > height) y -= height
      const sway = Math.sin(t * 1.7 + seeds[i * 2 + 1] * 9) * 0.045
      arr.setXYZ(i, arr.getX(i) + sway * dt * 8, y, arr.getZ(i))
    }
    arr.needsUpdate = true
  })

  return (
    <points ref={points} {...props}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
