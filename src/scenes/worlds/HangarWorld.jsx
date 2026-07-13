import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Annotations from '../../journey/Annotations.jsx'
import { WORLDS } from '../../store/useAtlas.js'

export default function HangarWorld({ active, ...props }) {
  const drone = useRef()
  const rotors = useRef([])
  const ring = useRef()
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
        <mesh position={[0, 1.35, -0.1]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[1.5, 0.85]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#48e07a"
            emissiveIntensity={1.9}
          />
        </mesh>
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
      {active && <Annotations world="hangar" />}
    </group>
  )
}
