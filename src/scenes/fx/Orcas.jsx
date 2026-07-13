import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const BLACK = '#0e1319'
const WHITE = '#e8edf2'

const POD = [
  { cx: 0, cz: -24, rx: 9, rz: 5, speed: 0.15, phase: 0, scale: 1.1 },
  { cx: -6, cz: -20, rx: 7, rz: 4, speed: 0.12, phase: 2.3, scale: 0.85 },
  { cx: 7, cz: -28, rx: 8, rz: 4.5, speed: 0.18, phase: 4.2, scale: 0.95 },
]

function OrcaBody() {
  return (
    <>
      {/* body, nose at +x */}
      <mesh scale={[1.25, 0.42, 0.45]}>
        <sphereGeometry args={[1, 14, 12]} />
        <meshStandardMaterial color={BLACK} roughness={0.35} />
      </mesh>
      {/* white belly */}
      <mesh position={[0.1, -0.16, 0]} scale={[0.95, 0.28, 0.34]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} />
      </mesh>
      {/* chin patch */}
      <mesh position={[0.95, -0.08, 0]} scale={[0.3, 0.16, 0.24]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} />
      </mesh>
      {/* eye patches */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[0.72, 0.14, side * 0.28]}
          scale={[0.22, 0.09, 0.07]}
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color={WHITE} roughness={0.5} />
        </mesh>
      ))}
      {/* dorsal fin */}
      <mesh position={[-0.1, 0.55, 0]} rotation={[0, 0, -0.28]} scale={[0.5, 1, 0.16]}>
        <coneGeometry args={[0.22, 0.75, 6]} />
        <meshStandardMaterial color={BLACK} roughness={0.4} />
      </mesh>
      {/* tail flukes */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[-1.28, 0.05, side * 0.2]}
          rotation={[0, side * 0.55, 0.1]}
        >
          <boxGeometry args={[0.42, 0.05, 0.26]} />
          <meshStandardMaterial color={BLACK} roughness={0.4} />
        </mesh>
      ))}
      {/* pectoral fins */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[0.42, -0.22, side * 0.34]}
          rotation={[side * 0.5, 0, -0.35]}
        >
          <boxGeometry args={[0.34, 0.05, 0.2]} />
          <meshStandardMaterial color={BLACK} roughness={0.4} />
        </mesh>
      ))}
    </>
  )
}

// A pod porpoising around the fjord mouth: elliptical laps with surfacing
// arcs; the opaque water hides them between breaches.
export default function Orcas(props) {
  const pod = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < POD.length; i++) {
      const o = pod.current[i]
      const p = POD[i]
      if (!o) continue
      const u = t * p.speed + p.phase
      const x = p.cx + Math.cos(u) * p.rx
      const z = p.cz + Math.sin(u) * p.rz
      // three surfacing arcs per lap
      const ph = u * 3
      const arc = Math.sin(ph)
      o.position.set(x, -1.15 + Math.max(0, arc) * 1.45 * p.scale, z)
      // face along the path tangent
      const dx = -Math.sin(u) * p.rx
      const dz = Math.cos(u) * p.rz
      o.rotation.y = Math.atan2(-dz, dx)
      // pitch through the arc (nose up rising, down diving)
      o.rotation.z = arc > -0.2 ? Math.cos(ph) * 0.5 : 0
    }
  })

  return (
    <group {...props}>
      {POD.map((p, i) => (
        <group
          key={i}
          scale={p.scale}
          ref={(el) => {
            if (el) pod.current[i] = el
          }}
        >
          <OrcaBody />
        </group>
      ))}
    </group>
  )
}
