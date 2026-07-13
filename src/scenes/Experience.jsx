import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { easing } from 'maath'
import AtlasScene from './atlas/AtlasScene.jsx'
import VolcanoWorld from './worlds/VolcanoWorld.jsx'
import FjordWorld from './worlds/FjordWorld.jsx'
import HangarWorld from './worlds/HangarWorld.jsx'
import CameraRig from './CameraRig.jsx'
import Effects from './Effects.jsx'
import { useAtlas, WORLDS } from '../store/useAtlas.js'

const DEFAULT_BG = '#050810'
const DEFAULT_FOG = '#0a1524'

// Eases scene background + fog toward the active world's palette.
function Atmosphere() {
  const scene = useThree((s) => s.scene)

  const targets = useMemo(
    () => ({ bg: new THREE.Color(DEFAULT_BG), fog: new THREE.Color(DEFAULT_FOG) }),
    [],
  )

  useEffect(() => {
    scene.background = new THREE.Color(DEFAULT_BG)
    scene.fog = new THREE.Fog(DEFAULT_FOG, 16, 85)
  }, [scene])

  useFrame((_, dt) => {
    const { mode, activeWorld } = useAtlas.getState()
    const inWorld = activeWorld && (mode === 'world' || mode === 'to-atlas')
    targets.bg.set(inWorld ? WORLDS[activeWorld].bg : DEFAULT_BG)
    targets.fog.set(inWorld ? WORLDS[activeWorld].fog : DEFAULT_FOG)
    if (scene.background?.isColor) {
      easing.dampC(scene.background, targets.bg, 0.4, dt)
    }
    if (scene.fog) easing.dampC(scene.fog.color, targets.fog, 0.4, dt)
  })

  return null
}

export default function Experience() {
  const mode = useAtlas((s) => s.mode)
  const activeWorld = useAtlas((s) => s.activeWorld)

  return (
    <>
      <Atmosphere />
      <CameraRig />

      <hemisphereLight args={['#41608a', '#0b0f14', 0.55]} />
      <directionalLight position={[6, 12, 5]} intensity={1.15} color="#b7d2f5" />
      <ambientLight intensity={0.12} color="#96b4d8" />

      <group visible={mode !== 'world'}>
        <Stars
          radius={110}
          depth={45}
          count={2400}
          factor={3.4}
          saturation={0}
          fade
          speed={0.5}
        />
        <AtlasScene />
      </group>

      <VolcanoWorld visible={activeWorld === 'volcano'} />
      <FjordWorld visible={activeWorld === 'fjord'} />
      <HangarWorld visible={activeWorld === 'hangar'} />

      <Effects />
    </>
  )
}
