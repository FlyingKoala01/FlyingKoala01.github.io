import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BOLTS = 3
const SEGS = 7 // jag points per bolt

// Crackling electrical arcs for broken hardware: jagged bolts that
// regenerate and flicker at random, plus a stuttering blue light.
export default function Sparks({ spread = 0.55, ...props }) {
  const bolts = useRef([])
  const light = useRef()
  const acc = useRef(0)

  const geoms = useMemo(
    () =>
      Array.from({ length: BOLTS }, () => {
        const g = new THREE.BufferGeometry()
        g.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array((SEGS - 1) * 2 * 3), 3),
        )
        return g
      }),
    [],
  )

  useFrame((_, dt) => {
    acc.current += dt
    if (acc.current < 0.07) return
    acc.current = 0
    let any = false
    for (let b = 0; b < BOLTS; b++) {
      const line = bolts.current[b]
      if (!line) continue
      const on = Math.random() < 0.4
      line.visible = on
      if (!on) continue
      any = true
      // jagged path from origin to a random end point
      const ex = (Math.random() - 0.5) * spread * 2
      const ey = (Math.random() - 0.2) * spread * 1.6
      const ez = (Math.random() - 0.5) * spread * 2
      const pos = geoms[b].attributes.position
      let px = 0
      let py = 0
      let pz = 0
      for (let i = 0; i < SEGS - 1; i++) {
        const t = (i + 1) / (SEGS - 1)
        const nx = ex * t + (Math.random() - 0.5) * spread * 0.4 * (1 - t)
        const ny = ey * t + (Math.random() - 0.5) * spread * 0.4 * (1 - t)
        const nz = ez * t + (Math.random() - 0.5) * spread * 0.4 * (1 - t)
        pos.setXYZ(i * 2, px, py, pz)
        pos.setXYZ(i * 2 + 1, nx, ny, nz)
        px = nx
        py = ny
        pz = nz
      }
      pos.needsUpdate = true
    }
    if (light.current) {
      light.current.intensity = any ? 2.5 + Math.random() * 5 : 0.2
    }
  })

  return (
    <group {...props}>
      {geoms.map((g, i) => (
        <lineSegments
          key={i}
          geometry={g}
          ref={(el) => {
            if (el) bolts.current[i] = el
          }}
        >
          <lineBasicMaterial
            color="#bfe4ff"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}
      <pointLight
        ref={light}
        color="#7db8ff"
        intensity={0.2}
        distance={7}
        decay={1.8}
      />
    </group>
  )
}
