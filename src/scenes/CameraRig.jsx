import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'
import { useAtlas, WORLDS } from '../store/useAtlas.js'
import { useJourney, journeyMotion } from '../store/useJourney.js'
import { PATHS, computeChapter } from '../journey/paths.js'
import { REDUCED } from '../utils/motion.js'

const PARALLAX = REDUCED ? 0 : 1

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

    // widen the view on narrow (portrait) screens so authored framings fit
    const aspect = state.viewport.aspect
    const targetFov = aspect < 0.8 ? 58 : aspect < 1.1 ? 50 : 42
    if (cam.fov !== targetFov) {
      cam.fov = targetFov
      cam.updateProjectionMatrix()
    }

    // Hard cuts happen while the veil is fully opaque.
    if (prevMode.current !== mode) {
      if (mode === 'world' && activeWorld) {
        const w = WORLDS[activeWorld]
        const path = PATHS[activeWorld]
        path.cam.getPoint(0, cam.position)
        cam.position.x += w.origin[0]
        cam.position.y += w.origin[1]
        cam.position.z += w.origin[2]
        path.look.getPoint(0, look.current)
        look.current.x += w.origin[0]
        look.current.y += w.origin[1]
        look.current.z += w.origin[2]
      } else if (mode === 'atlas' && prevMode.current === 'to-atlas') {
        cam.position.copy(ATLAS_POS)
        look.current.copy(ATLAS_LOOK)
      }
      prevMode.current = mode
    }

    if (mode === 'atlas') {
      p.copy(ATLAS_POS)
      if (aspect < 0.8) p.multiplyScalar(1.3)
      p.x += state.pointer.x * 0.9 * PARALLAX
      p.y += state.pointer.y * 0.45 * PARALLAX
      easing.damp3(cam.position, p, 0.6, dt)
      easing.damp3(look.current, ATLAS_LOOK, 0.6, dt)
    } else if (mode === 'to-world' && activeWorld) {
      if (cam.position.y > -100) {
        // leaving the atlas: dive into the miniature
        const d = DIVE[activeWorld]
        easing.damp3(cam.position, d, 0.5, dt)
        easing.damp3(look.current, d, 0.28, dt)
      }
      // world-to-world travel: hold position, the veil covers the cut
    } else if (mode === 'world' && activeWorld) {
      const w = WORLDS[activeWorld]
      const path = PATHS[activeWorld]
      const journey = useJourney.getState()

      // ease the journey along the path toward the scroll target
      journeyMotion.value = THREE.MathUtils.damp(
        journeyMotion.value,
        journey.target,
        2.4,
        dt,
      )
      const t = journeyMotion.value

      // getPoint (not getPointAt): keeps cam/look control points aligned at
      // the same t, so each chapter stop frames exactly its target
      path.cam.getPoint(t, p)
      p.x += w.origin[0] + state.pointer.x * 0.7 * PARALLAX
      p.y += w.origin[1] + state.pointer.y * 0.35 * PARALLAX
      p.z += w.origin[2]
      easing.damp3(cam.position, p, 0.28, dt)

      path.look.getPoint(t, l)
      l.x += w.origin[0]
      l.y += w.origin[1]
      l.z += w.origin[2]
      easing.damp3(look.current, l, 0.28, dt)

      // discrete chapter changes only touch React state when they differ
      const ch = computeChapter(activeWorld, t)
      if (ch !== journey.chapter) useJourney.setState({ chapter: ch })
    } else if (mode === 'to-atlas') {
      // slow pull upward while the veil closes
      cam.position.y += dt * 4
    }

    cam.lookAt(look.current)
  })

  return null
}
