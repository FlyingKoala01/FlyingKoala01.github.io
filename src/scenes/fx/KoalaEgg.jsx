import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import KoalaModel from '../atlas/KoalaModel.jsx'

// Easter-egg koala hidden in each world: idle propeller, optional sitting
// pose and a friendly wave.
export default function KoalaEgg({ sit = false, wave = false, ...props }) {
  const parts = useRef({})

  useEffect(() => {
    if (sit) {
      parts.current.legL?.rotation.set(-1.35, 0, 0)
      parts.current.legR?.rotation.set(-1.35, 0, 0)
    }
  }, [sit])

  useFrame((state, dt) => {
    const P = parts.current
    if (!P.prop) return
    const t = state.clock.elapsedTime
    P.prop.rotation.y += dt * 2.2
    if (wave && P.armL) {
      P.armL.rotation.z = 2.1 + Math.sin(t * 5.5) * 0.35
    }
  })

  return (
    <group {...props}>
      <KoalaModel parts={parts} />
    </group>
  )
}
