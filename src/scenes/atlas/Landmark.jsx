import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { easing } from 'maath'
import { useAtlas } from '../../store/useAtlas.js'

// Hover/click wrapper for one selectable miniature world on the atlas island.
export default function Landmark({ id, children, ...props }) {
  const group = useRef()
  const hovered = useAtlas((s) => s.hovered === id)
  useCursor(hovered)

  useFrame((_, dt) => {
    if (!group.current) return
    const s = hovered ? 1.1 : 1
    easing.damp3(group.current.scale, [s, s, s], 0.15, dt)
  })

  const guard = (fn) => (e) => {
    e.stopPropagation()
    if (useAtlas.getState().mode !== 'atlas') return
    fn()
  }

  return (
    <group
      ref={group}
      {...props}
      onPointerOver={guard(() => useAtlas.getState().setHovered(id))}
      onPointerOut={guard(() => useAtlas.getState().setHovered(null))}
      onClick={guard(() => useAtlas.getState().enterWorld(id))}
    >
      {children}
    </group>
  )
}
