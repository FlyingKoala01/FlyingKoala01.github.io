import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Annotations from '../../journey/Annotations.jsx'
import KoalaEgg from '../fx/KoalaEgg.jsx'
import { WORLDS } from '../../store/useAtlas.js'

const CRATES = [
  { p: [5.8, 0.45, -10], s: 0.9, r: 0.2 },
  { p: [6.9, 0.4, -9.2], s: 0.8, r: 0.9 },
  { p: [6.3, 1.25, -9.7], s: 0.7, r: 0.5 },
  { p: [7.4, 0.35, -11], s: 0.7, r: 1.4 },
]

export default function HangarWorld({ active, ...props }) {
  const drone = useRef()
  const rotors = useRef([])
  const ring = useRef()
  const sweep = useRef()
  const doorBeacon = useRef()
  // spotlight target inside this group so the cone aims at the drone
  const spotTarget = useMemo(() => new THREE.Object3D(), [])

  useFrame((state, dt) => {
    if (!drone.current || !ring.current) return
    const t = state.clock.elapsedTime
    drone.current.position.y = 3.4 + Math.sin(t * 1.4) * 0.2
    drone.current.rotation.y = Math.sin(t * 0.5) * 0.4
    for (const r of rotors.current) r.rotation.y += dt * 30
    // tracking ring pulse
    const pulse = 1 + ((t * 0.9) % 1) * 0.6
    ring.current.scale.setScalar(pulse)
    ring.current.material.opacity = 0.85 * (1 - ((t * 0.9) % 1))
    // radar sweep on the console display
    if (sweep.current) sweep.current.rotation.z = -t * 1.6
    // amber service-door beacon
    if (doorBeacon.current) {
      const b = (Math.sin(t * 2.4) + 1) / 2
      doorBeacon.current.material.emissiveIntensity = 0.4 + b * 3
    }
  })

  return (
    <group position={WORLDS.hangar.origin} {...props}>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1c221c" roughness={0.9} />
      </mesh>
      {/* quonset shell arching overhead, axis along Z */}
      <mesh position={[0, 0, -4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[11, 11, 30, 18, 1, true, Math.PI / 2, Math.PI]}
        />
        <meshStandardMaterial
          color="#2a333d"
          roughness={0.85}
          flatShading
          side={2}
        />
      </mesh>
      {/* rear wall */}
      <mesh position={[0, 5.5, -18.5]}>
        <boxGeometry args={[23, 11, 0.4]} />
        <meshStandardMaterial color="#232c36" flatShading roughness={0.9} />
      </mesh>
      {/* ceiling strip lights across the arch */}
      {[-13, -7, -1, 5].map((z, i) => (
        <mesh key={i} position={[0, 9.6, z]}>
          <boxGeometry args={[7, 0.12, 0.4]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#cfe6ff"
            emissiveIntensity={2.2}
          />
        </mesh>
      ))}
      {/* floor guide markings */}
      {[-2.2, 2.2].map((x, i) => (
        <mesh key={i} position={[x, 0.02, -5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.14, 22]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#b6ff5f"
            emissiveIntensity={1.3}
          />
        </mesh>
      ))}
      {/* detection ring pulsing under the drone */}
      <mesh
        ref={ring}
        position={[0, 0.05, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[2.3, 2.45, 40]} />
        <meshBasicMaterial color="#b6ff5f" transparent opacity={0.8} />
      </mesh>
      {/* the subject: a quad drone under inspection */}
      <group ref={drone} position={[0, 3.4, -4]} scale={1.55}>
        <mesh>
          <boxGeometry args={[0.9, 0.22, 0.9]} />
          <meshStandardMaterial color="#39424e" flatShading roughness={0.6} />
        </mesh>
        {[
          [-0.62, 0.62],
          [0.62, 0.62],
          [-0.62, -0.62],
          [0.62, -0.62],
        ].map(([x, z], i) => (
          <group key={i} position={[x, 0.08, z]}>
            <mesh
              ref={(el) => {
                if (el) rotors.current[i] = el
              }}
            >
              <cylinderGeometry args={[0.34, 0.34, 0.02, 12]} />
              <meshStandardMaterial
                color="#222932"
                transparent
                opacity={0.55}
              />
            </mesh>
            <mesh position={[0, -0.06, 0]}>
              <sphereGeometry args={[0.07, 6, 6]} />
              <meshStandardMaterial
                color="#000000"
                emissive={i % 2 === 0 ? '#ff2d2d' : '#4dff88'}
                emissiveIntensity={2.6}
              />
            </mesh>
          </group>
        ))}
      </group>
      <primitive object={spotTarget} position={[0, 3, -4]} />
      <spotLight
        position={[0, 9.2, -4]}
        target={spotTarget}
        angle={0.55}
        penumbra={0.6}
        intensity={16}
        color="#dff1ff"
        distance={30}
        decay={1}
      />
      {/* cool interior fill */}
      <pointLight
        position={[0, 7.5, 4]}
        color="#9fc7e8"
        intensity={10}
        distance={60}
        decay={1}
      />
      {/* tracking console station (chapter 02 anchor) */}
      <group position={[-5.6, 0, -3]} rotation={[0, 0.9, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1.8, 1.0, 0.7]} />
          <meshStandardMaterial color="#2c353f" flatShading roughness={0.8} />
        </mesh>
        {/* display: dark glass, radar rings, rotating sweep, blips */}
        <group position={[0, 1.35, -0.1]} rotation={[-0.3, 0, 0]}>
          <mesh>
            <planeGeometry args={[1.5, 0.85]} />
            <meshStandardMaterial
              color="#02120a"
              emissive="#0d3a22"
              emissiveIntensity={1.2}
            />
          </mesh>
          {[0.12, 0.24, 0.36].map((r, i) => (
            <mesh key={i} position={[0, 0, 0.005]}>
              <ringGeometry args={[r - 0.006, r, 32]} />
              <meshBasicMaterial color="#2f9c5c" transparent opacity={0.85} />
            </mesh>
          ))}
          <group ref={sweep} position={[0, 0, 0.008]}>
            <mesh position={[0.18, 0, 0]}>
              <planeGeometry args={[0.36, 0.015]} />
              <meshBasicMaterial color="#48e07a" transparent opacity={0.9} />
            </mesh>
          </group>
          {[
            [0.2, 0.1],
            [-0.14, -0.18],
            [0.05, 0.28],
          ].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.006]}>
              <circleGeometry args={[0.016, 8]} />
              <meshBasicMaterial color="#7dffa4" />
            </mesh>
          ))}
        </group>
        {/* sensor mast beside the console */}
        <mesh position={[1.5, 1.1, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 2.2, 6]} />
          <meshStandardMaterial color="#454f5a" flatShading />
        </mesh>
        <mesh position={[1.5, 2.35, 0]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial
            color="#39424e"
            flatShading
            roughness={0.5}
          />
        </mesh>
        <mesh position={[1.5, 2.35, 0.23]}>
          <sphereGeometry args={[0.045, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#48e07a"
            emissiveIntensity={3}
          />
        </mesh>
      </group>
      {/* supply crates */}
      {CRATES.map((c, i) => (
        <group key={i} position={c.p} rotation={[0, c.r, 0]}>
          <mesh>
            <boxGeometry args={[c.s, c.s, c.s]} />
            <meshStandardMaterial color="#3a4450" flatShading roughness={0.9} />
          </mesh>
          <mesh position={[0, c.s / 2 + 0.01, 0]}>
            <boxGeometry args={[c.s * 1.06, 0.05, c.s * 1.06]} />
            <meshStandardMaterial color="#2b333d" flatShading roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* cable runs from the console toward the drone bay */}
      {[
        { p: [-3.2, 0.015, -3.1], w: 4.6, r: 0.25 },
        { p: [-2.6, 0.015, -3.6], w: 4.2, r: 0.12 },
        { p: [-3.0, 0.015, -2.4], w: 4.9, r: 0.38 },
      ].map((c, i) => (
        <mesh key={i} position={c.p} rotation={[-Math.PI / 2, 0, c.r]}>
          <planeGeometry args={[c.w, 0.07]} />
          <meshStandardMaterial color="#12161b" roughness={0.6} />
        </mesh>
      ))}
      {/* hazard chevrons at the bay entrance */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[-2.7 + i * 0.9, 0.02, 6.5]}
          rotation={[-Math.PI / 2, 0, 0.78]}
        >
          <planeGeometry args={[0.5, 0.16]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#e0b23a"
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}
      {/* ceiling trusses under the arch */}
      {[-10, -4, 2].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          <mesh position={[0, 8.9, 0]}>
            <boxGeometry args={[10.5, 0.16, 0.16]} />
            <meshStandardMaterial color="#1c242d" flatShading roughness={1} />
          </mesh>
          {[-4, 0, 4].map((x, j) => (
            <mesh key={j} position={[x, 9.4, 0]} rotation={[0, 0, j === 1 ? 0 : j === 0 ? -0.5 : 0.5]}>
              <boxGeometry args={[0.12, 1.1, 0.12]} />
              <meshStandardMaterial color="#1c242d" flatShading roughness={1} />
            </mesh>
          ))}
        </group>
      ))}
      {/* rear service door, outlined in light */}
      <group position={[6.5, 0, -18.25]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[2.4, 3, 0.1]} />
          <meshStandardMaterial color="#1a2129" flatShading roughness={0.9} />
        </mesh>
        {[
          { p: [0, 3.05, 0.06], s: [2.5, 0.06, 0.02] },
          { p: [-1.25, 1.5, 0.06], s: [0.06, 3.1, 0.02] },
          { p: [1.25, 1.5, 0.06], s: [0.06, 3.1, 0.02] },
        ].map((e, i) => (
          <mesh key={i} position={e.p}>
            <boxGeometry args={e.s} />
            <meshStandardMaterial
              color="#000000"
              emissive="#9fdcff"
              emissiveIntensity={1.8}
            />
          </mesh>
        ))}
        {/* amber beacon above the door */}
        <mesh ref={doorBeacon} position={[0, 3.5, 0.1]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffa63a"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
      {/* workbench with a disassembled drone */}
      <group position={[4.8, 0, 0.5]} rotation={[0, -0.5, 0]}>
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[1.9, 0.08, 0.9]} />
          <meshStandardMaterial color="#39424e" flatShading roughness={0.8} />
        </mesh>
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.26, 0]}>
            <boxGeometry args={[0.08, 0.52, 0.7]} />
            <meshStandardMaterial color="#2b333d" flatShading roughness={0.9} />
          </mesh>
        ))}
        <mesh position={[-0.4, 0.66, 0.05]}>
          <boxGeometry args={[0.55, 0.14, 0.55]} />
          <meshStandardMaterial color="#2f3844" flatShading roughness={0.6} />
        </mesh>
        {[0.25, 0.55].map((x, i) => (
          <mesh key={i} position={[x, 0.605, -0.15 + i * 0.35]}>
            <cylinderGeometry args={[0.2, 0.2, 0.015, 10]} />
            <meshStandardMaterial color="#222932" flatShading roughness={0.5} />
          </mesh>
        ))}
        {/* work lamp */}
        <mesh position={[0.75, 0.95, -0.3]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffd9a0"
            emissiveIntensity={2.6}
          />
        </mesh>
      </group>
      {/* easter egg: supervising the inspection from the crate stack */}
      <KoalaEgg
        position={[6.3, 1.63, -9.7]}
        rotation={[0, -0.6, 0]}
        scale={0.6}
        wave
      />
      {active && <Annotations world="hangar" />}
    </group>
  )
}
