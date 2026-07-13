import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { REDUCED } from '../../utils/motion.js'

const rnd = (i, k) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return s - Math.floor(s)
}

const COUNT = 3
const WINDOW = 0.12 // fraction of each cycle the streak is visible

// Occasional meteors streaking across the night sky behind the island.
export default function ShootingStars(props) {
  const streaks = useRef([])

  useFrame((state) => {
    if (REDUCED) return
    const t = state.clock.elapsedTime
    for (let i = 0; i < COUNT; i++) {
      const g = streaks.current[i]
      if (!g) continue
      const period = 5.5 + i * 2.9
      const phase = (t + i * 4.7) / period
      const p = phase - Math.floor(phase)

      if (p >= WINDOW) {
        g.visible = false
        continue
      }
      g.visible = true
      const k = p / WINDOW
      const seed = Math.floor(phase) * 13 + i * 7

      // the visible sky band at this depth sits low relative to the camera
      const sx = (rnd(seed, 1) - 0.5) * 75
      const sy = -4 + rnd(seed, 2) * 11
      const sz = -42 - rnd(seed, 3) * 18
      const dirX = (rnd(seed, 4) > 0.5 ? 1 : -1) * (0.75 + rnd(seed, 5) * 0.25)
      const dirY = -0.5
      const len = Math.hypot(dirX, dirY)
      const dist = 20 + rnd(seed, 6) * 8

      g.position.set(
        sx + (dirX / len) * k * dist,
        sy + (dirY / len) * k * dist,
        sz,
      )
      g.rotation.z = Math.atan2(dirY, dirX)
      const fade = Math.sin(k * Math.PI)
      for (const child of g.children) {
        child.material.opacity = fade * child.userData.baseOpacity
      }
    }
  })

  return (
    <group {...props}>
      {Array.from({ length: COUNT }, (_, i) => (
        <group
          key={i}
          visible={false}
          ref={(el) => {
            if (el) streaks.current[i] = el
          }}
        >
          {/* long faint tail, brighter core, bright head */}
          <mesh userData={{ baseOpacity: 0.35 }} position={[-1.6, 0, 0]}>
            <planeGeometry args={[3.4, 0.05]} />
            <meshBasicMaterial
              color="#9fc4e8"
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh userData={{ baseOpacity: 0.7 }} position={[-0.55, 0, 0]}>
            <planeGeometry args={[1.4, 0.07]} />
            <meshBasicMaterial
              color="#d8ecff"
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh userData={{ baseOpacity: 1 }}>
            <circleGeometry args={[0.09, 8]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
