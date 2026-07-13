import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { DIVE_ANGLE } from './Koala.jsx'

const RIM_R = 5.05

// Marks the minigame edge: a little diving board and pulsing rim dashes.
export default function DiveBoard() {
  const dashes = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < dashes.current.length; i++) {
      const m = dashes.current[i]
      if (!m) continue
      m.material.emissiveIntensity = 1 + (Math.sin(t * 2.4 - i * 0.7) + 1) * 0.9
    }
  })

  const bx = Math.cos(DIVE_ANGLE) * (RIM_R - 0.35)
  const bz = Math.sin(DIVE_ANGLE) * (RIM_R - 0.35)

  return (
    <group>
      {/* plank sticking out over the void */}
      <group position={[bx, 0.06, bz]} rotation={[0, -DIVE_ANGLE, 0]}>
        <mesh position={[0.65, 0, 0]}>
          <boxGeometry args={[1.5, 0.07, 0.5]} />
          <meshStandardMaterial color="#5b4a36" flatShading roughness={0.9} />
        </mesh>
        {[0.15, 0.7].map((x, i) => (
          <mesh key={i} position={[x, -0.12, 0]}>
            <boxGeometry args={[0.08, 0.22, 0.42]} />
            <meshStandardMaterial color="#4a3c2c" flatShading roughness={1} />
          </mesh>
        ))}
        {/* chevrons pointing off the end */}
        {[0.35, 0.75, 1.15].map((x, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) dashes.current[i] = el
            }}
            position={[x, 0.045, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
          >
            <planeGeometry args={[0.2, 0.06]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#7ddcff"
              emissiveIntensity={1.5}
            />
          </mesh>
        ))}
      </group>
      {/* pulsing dashes along the rim sector */}
      {[-2, -1, 1, 2].map((i, idx) => {
        const a = DIVE_ANGLE + i * 0.11
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) dashes.current[3 + idx] = el
            }}
            position={[Math.cos(a) * RIM_R, 0.05, Math.sin(a) * RIM_R]}
            rotation={[0, -a, 0]}
          >
            <boxGeometry args={[0.05, 0.03, 0.28]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#7ddcff"
              emissiveIntensity={1.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}
