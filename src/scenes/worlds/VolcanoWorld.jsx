import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { jitteredCone, jitteredCylinder } from '../../utils/geometry.js'
import Embers from '../atlas/Embers.jsx'
import Annotations from '../../journey/Annotations.jsx'
import { WORLDS } from '../../store/useAtlas.js'

const SPIRES = [
  { p: [-14, 0, -6], r: 2.2, h: 7, seed: 41 },
  { p: [13, 0, -10], r: 3, h: 9, seed: 42 },
  { p: [18, 0, 4], r: 1.8, h: 5, seed: 43 },
  { p: [-19, 0, 3], r: 2.4, h: 6.5, seed: 44 },
]

// glowing fissures radiating from the volcano base
const CRACKS = [
  { angle: 0.4, len: 9, w: 0.5 },
  { angle: 1.9, len: 7, w: 0.35 },
  { angle: 3.6, len: 11, w: 0.6 },
  { angle: 5.1, len: 8, w: 0.4 },
]

export default function VolcanoWorld({ active, ...props }) {
  const glow = useRef()
  const ground = useMemo(() => jitteredCylinder(34, 36, 2, 24, 0.5, 45), [])
  const cone = useMemo(() => jitteredCylinder(3.4, 9.5, 10, 9, 0.55, 46), [])

  useFrame((state) => {
    if (!glow.current) return
    const t = state.clock.elapsedTime
    glow.current.intensity = 55 + Math.sin(t * 2.7) * 12 + Math.sin(t * 6.3) * 7
  })

  return (
    <group position={WORLDS.volcano.origin} {...props}>
      <mesh geometry={ground} position={[0, -1, 0]}>
        <meshStandardMaterial color="#2b1a15" flatShading roughness={1} />
      </mesh>
      {/* truncated main cone */}
      <mesh geometry={cone} position={[0, 5, 0]}>
        <meshStandardMaterial color="#453029" flatShading roughness={1} />
      </mesh>
      {/* lava pool in the crater */}
      <mesh position={[0, 10.05, 0]}>
        <cylinderGeometry args={[3.1, 3.1, 0.3, 9]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#ff4d12"
          emissiveIntensity={3.4}
        />
      </mesh>
      {/* lava streaks over the crater lip */}
      {[0.9, 2.8, 4.6].map((a, i) => {
        const r = 3.4 + ((9.5 - 3.4) / 10) * 2.2
        return (
          <group key={i} rotation={[0, a, 0]}>
            <mesh position={[0, 7.6, r + 0.12]} rotation={[-0.55, 0, 0]}>
              <boxGeometry args={[0.5, 4.6, 0.25]} />
              <meshStandardMaterial
                color="#000000"
                emissive="#ff3d08"
                emissiveIntensity={2.4}
              />
            </mesh>
          </group>
        )
      })}
      {/* ground fissures */}
      {CRACKS.map((c, i) => (
        <group key={i} rotation={[0, c.angle, 0]}>
          <mesh position={[0, 0.08, 10 + c.len / 2]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[c.w, c.len]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#c22e08"
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      ))}
      {SPIRES.map((s, i) => (
        <Spire key={i} {...s} />
      ))}
      <Embers
        position={[0, 10.2, 0]}
        count={90}
        radius={2.6}
        height={9}
        speed={1.7}
        size={0.24}
      />
      {/* crater glow */}
      <pointLight
        ref={glow}
        position={[0, 12, 0]}
        color="#ff5a1f"
        intensity={55}
        distance={55}
        decay={2}
      />
      {/* warm fill so the flanks read against the night */}
      <pointLight
        position={[14, 18, 26]}
        color="#ff7a3a"
        intensity={30}
        distance={90}
        decay={1}
      />
      {/* field observation post on the slope (chapter 02 anchor) */}
      <group position={[6.7, 3.55, -2.5]} rotation={[0, 2.0, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2.2, 0.25, 1.6]} />
          <meshStandardMaterial color="#241814" flatShading roughness={1} />
        </mesh>
        <mesh position={[-0.5, 0.55, 0]}>
          <boxGeometry args={[0.7, 0.7, 0.55]} />
          <meshStandardMaterial color="#33302c" flatShading roughness={0.7} />
        </mesh>
        {/* console screen */}
        <mesh position={[-0.48, 0.62, 0.29]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[0.5, 0.32]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ff8c3a"
            emissiveIntensity={2.2}
          />
        </mesh>
        {/* antenna mast */}
        <mesh position={[0.6, 0.9, -0.3]}>
          <cylinderGeometry args={[0.03, 0.05, 1.6, 5]} />
          <meshStandardMaterial color="#4a4440" flatShading />
        </mesh>
        <mesh position={[0.6, 1.75, -0.3]} rotation={[0, 0, -0.5]}>
          <coneGeometry args={[0.22, 0.3, 4, 1, true]} />
          <meshStandardMaterial color="#5d564f" flatShading side={2} />
        </mesh>
        <mesh position={[0.6, 1.95, -0.3]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ff2d2d"
            emissiveIntensity={3}
          />
        </mesh>
      </group>
      {active && <Annotations world="volcano" />}
    </group>
  )
}

function Spire({ p, r, h, seed }) {
  const g = useMemo(() => jitteredCone(r, h, 6, 0.35, seed), [r, h, seed])
  return (
    <mesh geometry={g} position={[p[0], p[1] + h / 2 - 1, p[2]]}>
      <meshStandardMaterial color="#33201a" flatShading roughness={1} />
    </mesh>
  )
}
