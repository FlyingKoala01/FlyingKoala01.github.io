import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function makeSmokeTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30)
  grad.addColorStop(0, 'rgba(255,255,255,0.9)')
  grad.addColorStop(0.5, 'rgba(255,255,255,0.35)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

const rnd = (i, k) => {
  const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453
  return s - Math.floor(s)
}

// A rising, expanding smoke column made of billboard sprites.
export default function Smoke({
  count = 20,
  height = 12,
  spread = 1.6,
  rise = 0.09,
  size = 2.2,
  grow = 3,
  color = '#5a5560',
  opacity = 0.32,
  ...props
}) {
  const refs = useRef([])
  const tex = useMemo(makeSmokeTexture, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const s = refs.current[i]
      if (!s) continue
      const life = (t * rise * (0.6 + rnd(i, 1) * 0.8) + rnd(i, 2)) % 1
      const drift = spread * (rnd(i, 3) - 0.5) * (0.4 + life * 2)
      s.position.set(
        drift + Math.sin(t * 0.3 + i) * 0.35 * life,
        life * height,
        spread * (rnd(i, 4) - 0.5) * (0.4 + life * 2),
      )
      const sc = size * (0.35 + life * grow)
      s.scale.set(sc, sc, 1)
      s.material.opacity = opacity * Math.min(life / 0.12, 1) * (1 - life)
    }
  })

  return (
    <group {...props}>
      {Array.from({ length: count }, (_, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el
          }}
        >
          <spriteMaterial
            map={tex}
            color={color}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  )
}
