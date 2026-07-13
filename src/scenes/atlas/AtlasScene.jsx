import { Float } from '@react-three/drei'
import AtlasIsland from './AtlasIsland.jsx'
import Landmark from './Landmark.jsx'
import VolcanoMini from './VolcanoMini.jsx'
import FjordMini from './FjordMini.jsx'
import HangarMini from './HangarMini.jsx'
import { REDUCED } from '../../utils/motion.js'

export default function AtlasScene(props) {
  return (
    <group {...props}>
      <Float
        speed={REDUCED ? 0 : 1.1}
        rotationIntensity={REDUCED ? 0 : 0.05}
        floatIntensity={REDUCED ? 0 : 0.3}
        floatingRange={[-0.12, 0.12]}
      >
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
      </Float>
    </group>
  )
}
