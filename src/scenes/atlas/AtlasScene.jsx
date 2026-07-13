import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { easing } from 'maath'
import AtlasIsland from './AtlasIsland.jsx'
import Landmark from './Landmark.jsx'
import VolcanoMini from './VolcanoMini.jsx'
import FjordMini from './FjordMini.jsx'
import HangarMini from './HangarMini.jsx'
import Koala, { setKoalaTarget } from './Koala.jsx'
import DiveBoard from './DiveBoard.jsx'
import { useAtlas } from '../../store/useAtlas.js'
import { REDUCED } from '../../utils/motion.js'
import { tilt, initTilt, needsTiltPermission } from '../../utils/tilt.js'

// Applies phone tilt to the whole island (and lets the koala slip).
function TiltGroup({ children }) {
  const g = useRef()

  useEffect(() => {
    if (!needsTiltPermission()) initTilt()
  }, [])

  useFrame((_, dt) => {
    if (!g.current) return
    const inAtlas = useAtlas.getState().mode !== 'world'
    easing.damp(g.current.rotation, 'x', inAtlas ? tilt.rx : 0, 0.18, dt)
    easing.damp(g.current.rotation, 'z', inAtlas ? tilt.rz : 0, 0.18, dt)
  })

  return <group ref={g}>{children}</group>
}

export default function AtlasScene(props) {
  return (
    <group {...props}>
      <Float
        speed={REDUCED ? 0 : 1.1}
        rotationIntensity={REDUCED ? 0 : 0.05}
        floatIntensity={REDUCED ? 0 : 0.3}
        floatingRange={[-0.12, 0.12]}
      >
        <TiltGroup>
          <AtlasIsland />
          <Landmark id="volcano" position={[-2.6, 0.02, -1.0]}>
            <VolcanoMini />
          </Landmark>
          <Landmark id="fjord" position={[2.5, 0.02, -1.4]} rotation={[0, -0.35, 0]}>
            <FjordMini />
          </Landmark>
          <Landmark id="hangar" position={[0.5, 0.02, 2.2]} rotation={[0, 0.3, 0]}>
            <HangarMini />
          </Landmark>
          <Koala />
          <DiveBoard />
          {/* invisible walk plane: right-click sends the koala there */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.015, 0]}
            onPointerDown={(e) => {
              if (e.button !== 2) return
              e.stopPropagation()
              const p = e.object.worldToLocal(e.point.clone())
              setKoalaTarget(p.x, -p.y)
            }}
          >
            <circleGeometry args={[6.4, 24]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
        </TiltGroup>
      </Float>
    </group>
  )
}
