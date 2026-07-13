import { useMemo } from 'react'
import { jitter, jitteredCylinder, jitteredCone } from '../../utils/geometry.js'
import * as THREE from 'three'

const ROCKS = [
  { p: [-4.1, 0.14, 1.2], s: 0.34, seed: 11 },
  { p: [1.4, 0.1, -3.4], s: 0.26, seed: 12 },
  { p: [3.9, 0.12, 1.1], s: 0.3, seed: 13 },
  { p: [-1.2, 0.1, 3.1], s: 0.22, seed: 14 },
  { p: [-3.0, 0.12, -2.8], s: 0.27, seed: 15 },
]

export default function AtlasIsland() {
  const turf = useMemo(() => jitteredCylinder(5.2, 5.45, 0.5, 11, 0.1, 3), [])
  const rock = useMemo(() => jitteredCylinder(5.45, 4.1, 1.7, 11, 0.16, 4), [])
  const keel = useMemo(() => jitteredCone(4.1, 4.6, 9, 0.3, 5), [])
  const boulder = useMemo(() => {
    const base = new THREE.DodecahedronGeometry(1)
    const g = jitter(base, 0.25, 21)
    base.dispose()
    return g
  }, [])

  return (
    <group>
      {/* island top */}
      <mesh geometry={turf} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#16343b" flatShading roughness={0.9} />
      </mesh>
      {/* rocky belt */}
      <mesh geometry={rock} position={[0, -1.35, 0]}>
        <meshStandardMaterial color="#1b232e" flatShading roughness={1} />
      </mesh>
      {/* hanging keel of the floating island */}
      <mesh geometry={keel} position={[0, -4.4, 0]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial color="#131a24" flatShading roughness={1} />
      </mesh>
      {/* scattered boulders */}
      {ROCKS.map((r, i) => (
        <mesh key={i} geometry={boulder} position={r.p} scale={r.s}>
          <meshStandardMaterial color="#26313d" flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
