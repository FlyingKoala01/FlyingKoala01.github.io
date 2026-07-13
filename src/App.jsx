import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './scenes/Experience.jsx'
import Hud from './ui/Hud.jsx'
import LoadingScreen from './ui/LoadingScreen.jsx'
import Fallback from './ui/Fallback.jsx'
import JourneyControls from './journey/JourneyControls.jsx'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl'))
    )
  } catch {
    return false
  }
}

export default function App() {
  const [webgl] = useState(hasWebGL)
  if (!webgl) return <Fallback />
  return (
    <>
      <div className="stage">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 3.6, 10.5], fov: 42, near: 0.1, far: 400 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
      <Hud />
      <JourneyControls />
      <LoadingScreen />
    </>
  )
}
