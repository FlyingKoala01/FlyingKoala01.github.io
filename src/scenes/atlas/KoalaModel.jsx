const GRAY = '#a4abb4'
const GRAY_DARK = '#8b939d'
const BELLY = '#edf0f3'

// The koala mesh, ~1.6 units tall at scale 1. Pass a `parts` ref object to
// receive handles for the animatable pieces (prop, armL, armR, legL, legR).
export default function KoalaModel({ parts, ...props }) {
  const grab = (name) => (el) => {
    if (el && parts) parts.current[name] = el
  }

  return (
    <group {...props}>
      {/* pear body, smooth cartoon shading */}
      <mesh position={[0, 0.34, 0]} scale={[1, 1.02, 0.92]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color={GRAY} roughness={0.85} />
      </mesh>
      {/* white belly */}
      <mesh position={[0, 0.32, 0.17]} scale={[0.72, 0.85, 0.45]}>
        <sphereGeometry args={[0.32, 14, 14]} />
        <meshStandardMaterial color={BELLY} roughness={0.9} />
      </mesh>
      {/* wide head, full cheeks */}
      <mesh position={[0, 0.9, 0.02]} scale={[1.12, 0.98, 0.95]}>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial color={GRAY} roughness={0.85} />
      </mesh>
      {/* huge scalloped ears with big pink inners */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.58, 1.14, -0.02]}>
          <mesh scale={[1, 1.1, 0.55]}>
            <sphereGeometry args={[0.27, 14, 14]} />
            <meshStandardMaterial color={GRAY} roughness={0.85} />
          </mesh>
          <mesh position={[side * 0.1, 0.18, 0]} scale={[1, 1, 0.5]}>
            <sphereGeometry args={[0.14, 10, 10]} />
            <meshStandardMaterial color={GRAY} roughness={0.85} />
          </mesh>
          <mesh position={[side * 0.15, -0.14, 0]} scale={[1, 1, 0.5]}>
            <sphereGeometry args={[0.12, 10, 10]} />
            <meshStandardMaterial color={GRAY} roughness={0.85} />
          </mesh>
          <mesh position={[0, 0, 0.09]} scale={[0.72, 0.85, 0.3]}>
            <sphereGeometry args={[0.25, 12, 12]} />
            <meshStandardMaterial color="#f09cab" roughness={0.9} />
          </mesh>
        </group>
      ))}
      {/* small black bead eyes */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.19, 0.98, 0.44]}>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#181c22" roughness={0.25} />
          </mesh>
          <mesh position={[0.014, 0.016, 0.036]}>
            <sphereGeometry args={[0.013, 6, 6]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
      {/* the big koala nose */}
      <mesh position={[0, 0.88, 0.49]} scale={[0.74, 1.15, 0.5]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#23272e" roughness={0.35} />
      </mesh>
      <mesh position={[-0.035, 0.94, 0.55]} scale={[0.5, 0.8, 0.4]}>
        <sphereGeometry args={[0.035, 6, 6]} />
        <meshStandardMaterial color="#454b54" roughness={0.4} />
      </mesh>
      {/* little smile */}
      <mesh position={[0, 0.76, 0.45]} rotation={[0.15, 0, Math.PI * 1.05]}>
        <torusGeometry args={[0.075, 0.009, 6, 12, Math.PI * 0.9]} />
        <meshStandardMaterial color="#3a4048" roughness={0.6} />
      </mesh>
      {/* aviator cap + propeller */}
      <mesh position={[0, 1.4, 0.02]}>
        <cylinderGeometry args={[0.18, 0.26, 0.14, 10]} />
        <meshStandardMaterial color="#b3402f" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.5, 0.02]}>
        <cylinderGeometry args={[0.025, 0.025, 0.09, 5]} />
        <meshStandardMaterial color="#3a3230" roughness={0.8} />
      </mesh>
      <group ref={grab('prop')} position={[0, 1.56, 0.02]}>
        {[0, Math.PI / 2].map((a, i) => (
          <mesh key={i} rotation={[0, a, 0]}>
            <boxGeometry args={[0.4, 0.02, 0.06]} />
            <meshStandardMaterial color="#d8c9a8" roughness={0.8} />
          </mesh>
        ))}
      </group>
      {/* stubby arms */}
      <group ref={grab('armL')} position={[0.36, 0.44, 0]}>
        <mesh position={[0.07, -0.08, 0]} rotation={[0, 0, -0.5]}>
          <capsuleGeometry args={[0.075, 0.14, 4, 8]} />
          <meshStandardMaterial color={GRAY} roughness={0.85} />
        </mesh>
      </group>
      <group ref={grab('armR')} position={[-0.36, 0.44, 0]}>
        <mesh position={[-0.07, -0.08, 0]} rotation={[0, 0, 0.5]}>
          <capsuleGeometry args={[0.075, 0.14, 4, 8]} />
          <meshStandardMaterial color={GRAY} roughness={0.85} />
        </mesh>
      </group>
      {/* stubby legs */}
      <group ref={grab('legL')} position={[0.15, 0.1, 0]}>
        <mesh position={[0, -0.04, 0]}>
          <capsuleGeometry args={[0.085, 0.09, 4, 8]} />
          <meshStandardMaterial color={GRAY_DARK} roughness={0.85} />
        </mesh>
      </group>
      <group ref={grab('legR')} position={[-0.15, 0.1, 0]}>
        <mesh position={[0, -0.04, 0]}>
          <capsuleGeometry args={[0.085, 0.09, 4, 8]} />
          <meshStandardMaterial color={GRAY_DARK} roughness={0.85} />
        </mesh>
      </group>
    </group>
  )
}
