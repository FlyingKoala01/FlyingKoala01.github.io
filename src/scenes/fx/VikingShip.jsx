import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const WOOD = '#4a3524'
const WOOD_TRIM = '#5d4530'
const SHIELD_COLORS = ['#8a2f2a', '#d8c9a8', '#3f5d78', '#8a6f2a']

// Low-poly viking longship with an explorer at the bow. Modeled along +X
// (bow at +X); rotate the group to aim it.
export default function VikingShip({ drift = 3.5, ...props }) {
  const ship = useRef()

  useFrame((state) => {
    if (!ship.current) return
    const t = state.clock.elapsedTime
    // drift along the bow axis (+X in local space)
    ship.current.position.x = Math.sin(t * 0.07) * drift
    ship.current.position.y = Math.sin(t * 0.9) * 0.04
    ship.current.rotation.z = Math.sin(t * 0.7) * 0.025
    ship.current.rotation.x = Math.sin(t * 0.5) * 0.02
  })

  return (
    <group {...props}>
      <group ref={ship}>
        {/* hull */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.4, 0.55, 1.0]} />
          <meshStandardMaterial color={WOOD} flatShading roughness={0.9} />
        </mesh>
        {/* tapered bow / stern */}
        <mesh position={[1.75, 0.3, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[0.6, 1, 1]}>
          <coneGeometry args={[0.5, 1.3, 4]} />
          <meshStandardMaterial color={WOOD} flatShading roughness={0.9} />
        </mesh>
        <mesh position={[-1.75, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} scale={[0.6, 1, 1]}>
          <coneGeometry args={[0.5, 1.3, 4]} />
          <meshStandardMaterial color={WOOD} flatShading roughness={0.9} />
        </mesh>
        {/* deck */}
        <mesh position={[0, 0.56, 0]}>
          <boxGeometry args={[2.3, 0.05, 0.85]} />
          <meshStandardMaterial color={WOOD_TRIM} flatShading roughness={1} />
        </mesh>
        {/* gunwale rails */}
        {[-0.5, 0.5].map((z, i) => (
          <mesh key={i} position={[0, 0.62, z]}>
            <boxGeometry args={[2.5, 0.07, 0.08]} />
            <meshStandardMaterial color={WOOD_TRIM} flatShading roughness={1} />
          </mesh>
        ))}
        {/* curved prow rising to a dragon head */}
        <mesh position={[2.25, 0.75, 0]} rotation={[0, 0, 0.7]}>
          <boxGeometry args={[0.14, 1.0, 0.14]} />
          <meshStandardMaterial color={WOOD} flatShading roughness={0.9} />
        </mesh>
        <mesh position={[2.62, 1.22, 0]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.34, 0.18, 0.16]} />
          <meshStandardMaterial color={WOOD_TRIM} flatShading roughness={0.9} />
        </mesh>
        <mesh position={[2.82, 1.18, 0]} rotation={[0, 0, -0.4]}>
          <coneGeometry args={[0.07, 0.22, 4]} />
          <meshStandardMaterial color={WOOD_TRIM} flatShading roughness={0.9} />
        </mesh>
        {/* stern tail */}
        <mesh position={[-2.2, 0.72, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.12, 0.8, 0.12]} />
          <meshStandardMaterial color={WOOD} flatShading roughness={0.9} />
        </mesh>
        {/* shields along both sides */}
        {[-0.9, -0.3, 0.3, 0.9].map((x, i) =>
          [-0.55, 0.55].map((z, j) => (
            <mesh
              key={`${i}-${j}`}
              position={[x, 0.48, z]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.17, 0.17, 0.05, 10]} />
              <meshStandardMaterial
                color={SHIELD_COLORS[(i + j) % SHIELD_COLORS.length]}
                flatShading
                roughness={0.7}
              />
            </mesh>
          )),
        )}
        {/* mast, yard and striped square sail */}
        <mesh position={[-0.2, 1.7, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 2.3, 6]} />
          <meshStandardMaterial color={WOOD_TRIM} flatShading roughness={1} />
        </mesh>
        <mesh position={[-0.2, 2.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 1.8, 5]} />
          <meshStandardMaterial color={WOOD_TRIM} flatShading roughness={1} />
        </mesh>
        <mesh position={[-0.2, 1.95, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.7, 1.25]} />
          <meshStandardMaterial color="#d8c9a8" roughness={0.9} side={2} />
        </mesh>
        {[-0.55, 0, 0.55].map((z, i) =>
          [-0.215, -0.185].map((x, j) => (
            <mesh
              key={`${i}-${j}`}
              position={[x, 1.95, z]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <planeGeometry args={[0.3, 1.25]} />
              <meshStandardMaterial color="#8a2f2a" roughness={0.9} side={2} />
            </mesh>
          )),
        )}
        {/* stern lantern */}
        <mesh position={[-2.05, 1.05, 0]}>
          <cylinderGeometry args={[0.015, 0.02, 0.5, 5]} />
          <meshStandardMaterial color={WOOD_TRIM} flatShading />
        </mesh>
        <mesh position={[-2.05, 1.32, 0]}>
          <sphereGeometry args={[0.06, 6, 6]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#ffd27a"
            emissiveIntensity={3.4}
          />
        </mesh>
        {/* lantern glow over the deck */}
        <pointLight
          position={[-1.6, 1.3, 0]}
          color="#ffd27a"
          intensity={2.2}
          distance={6}
          decay={1.6}
        />

        {/* the explorer, scanning the horizon from the bow */}
        <group position={[1.45, 0.6, 0]} rotation={[0, -0.15, 0]}>
          {/* legs */}
          {[-0.06, 0.06].map((z, i) => (
            <mesh key={i} position={[0, 0.12, z]}>
              <boxGeometry args={[0.11, 0.24, 0.09]} />
              <meshStandardMaterial color="#3a3230" flatShading roughness={1} />
            </mesh>
          ))}
          {/* tunic */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.2, 0.32, 0.18]} />
            <meshStandardMaterial color="#5d4a33" flatShading roughness={1} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <boxGeometry args={[0.22, 0.05, 0.2]} />
            <meshStandardMaterial color="#2b2320" flatShading roughness={1} />
          </mesh>
          {/* cape */}
          <mesh position={[-0.13, 0.36, 0]} rotation={[0, 0, 0.12]}>
            <planeGeometry args={[0.26, 0.4]} />
            <meshStandardMaterial
              color="#7a2b26"
              flatShading
              roughness={1}
              side={2}
            />
          </mesh>
          {/* head + helmet */}
          <mesh position={[0, 0.65, 0]}>
            <sphereGeometry args={[0.09, 8, 8]} />
            <meshStandardMaterial color="#d9b08c" flatShading roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.74, 0]}>
            <coneGeometry args={[0.1, 0.13, 7]} />
            <meshStandardMaterial color="#6d747d" flatShading roughness={0.5} />
          </mesh>
          {/* arm raised, shielding eyes toward the horizon */}
          <mesh position={[0.12, 0.62, 0.02]} rotation={[0, 0, -0.9]}>
            <boxGeometry args={[0.2, 0.055, 0.055]} />
            <meshStandardMaterial color="#5d4a33" flatShading roughness={1} />
          </mesh>
          {/* other arm holding a spear */}
          <mesh position={[-0.02, 0.45, -0.13]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.055, 0.22, 0.055]} />
            <meshStandardMaterial color="#5d4a33" flatShading roughness={1} />
          </mesh>
          <mesh position={[-0.02, 0.5, -0.19]}>
            <cylinderGeometry args={[0.015, 0.015, 0.95, 5]} />
            <meshStandardMaterial color={WOOD_TRIM} flatShading />
          </mesh>
          <mesh position={[-0.02, 1.02, -0.19]}>
            <coneGeometry args={[0.035, 0.12, 4]} />
            <meshStandardMaterial color="#8d959e" flatShading roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
