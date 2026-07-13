import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Falling particles over a box volume (snow, ash…), positions mutated in place.
export default function Snow({
  count = 240,
  area = [46, 26, 50],
  fall = 0.9,
  size = 0.14,
  color = '#dfe8ef',
  opacity = 0.7,
  additive = true,
  ...props
}) {
  const points = useRef()

  const { positions, seeds } = useMemo(() => {
    const rnd = (i, k) => {
      const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
      return s - Math.floor(s)
    }
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count * 2)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rnd(i, 1) - 0.5) * area[0]
      positions[i * 3 + 1] = rnd(i, 2) * area[1]
      positions[i * 3 + 2] = (rnd(i, 3) - 0.5) * area[2]
      seeds[i * 2] = 0.5 + rnd(i, 4)
      seeds[i * 2 + 1] = rnd(i, 5) * Math.PI * 2
    }
    return { positions, seeds }
  }, [count, area])

  useFrame((state, dt) => {
    if (!points.current) return
    const arr = points.current.geometry.attributes.position
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      let y = arr.getY(i) - dt * fall * seeds[i * 2]
      if (y < 0) y += area[1]
      const sway = Math.sin(t * 0.8 + seeds[i * 2 + 1]) * 0.2
      arr.setXYZ(i, arr.getX(i) + sway * dt, y, arr.getZ(i))
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
        opacity={opacity}
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  )
}
