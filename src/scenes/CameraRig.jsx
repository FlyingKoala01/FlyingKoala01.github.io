import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'
import { useAtlas, WORLDS } from '../store/useAtlas.js'

const ATLAS_POS = new THREE.Vector3(0, 3.6, 10.5)
const ATLAS_LOOK = new THREE.Vector3(0, 0.4, 0)

// Island-local points the camera dives toward while the veil closes.
const DIVE = {
  volcano: new THREE.Vector3(-2.6, 1.7, -1.0),
  fjord: new THREE.Vector3(2.4, 1.1, -1.3),
  hangar: new THREE.Vector3(0.5, 1.0, 2.2),
}

export default function CameraRig() {
  const look = useRef(ATLAS_LOOK.clone())
  const prevMode = useRef('atlas')
  const pos = useRef(new THREE.Vector3())
  const lk = useRef(new THREE.Vector3())

  useFrame((state, dt) => {
    const { mode, activeWorld } = useAtlas.getState()
    const cam = state.camera
    const p = pos.current
    const l = lk.current

    // Hard cuts happen while the veil is fully opaque.
    if (prevMode.current !== mode) {
      if (mode === 'world' && activeWorld) {
        const w = WORLDS[activeWorld]
        cam.position.fromArray(w.origin)
        p.fromArray(w.camPos)
        cam.position.add(p)
        look.current.fromArray(w.origin)
        l.fromArray(w.camLook)
        look.current.add(l)
      } else if (mode === 'atlas' && prevMode.current === 'to-atlas') {
        cam.position.copy(ATLAS_POS)
        look.current.copy(ATLAS_LOOK)
      }
      prevMode.current = mode
    }

    if (mode === 'atlas') {
      p.copy(ATLAS_POS)
      p.x += state.pointer.x * 0.9
      p.y += state.pointer.y * 0.45
      easing.damp3(cam.position, p, 0.6, dt)
      easing.damp3(look.current, ATLAS_LOOK, 0.6, dt)
    } else if (mode === 'to-world' && activeWorld) {
      const d = DIVE[activeWorld]
      easing.damp3(cam.position, d, 0.5, dt)
      easing.damp3(look.current, d, 0.28, dt)
    } else if (mode === 'world' && activeWorld) {
      const w = WORLDS[activeWorld]
      p.fromArray(w.origin)
      l.fromArray(w.camPos)
      p.add(l)
      p.x += state.pointer.x * 1.1
      p.y += state.pointer.y * 0.5
      easing.damp3(cam.position, p, 0.7, dt)
      l.fromArray(w.origin)
      look.current.x = l.x + w.camLook[0]
      look.current.y = l.y + w.camLook[1]
      look.current.z = l.z + w.camLook[2]
    } else if (mode === 'to-atlas') {
      // slow pull upward while the veil closes
      cam.position.y += dt * 4
    }

    cam.lookAt(look.current)
  })

  return null
}
