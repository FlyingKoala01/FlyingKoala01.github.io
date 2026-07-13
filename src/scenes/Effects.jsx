import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        mipmapBlur
        intensity={0.9}
        luminanceThreshold={1}
        luminanceSmoothing={0.25}
      />
      <Vignette eskil={false} offset={0.18} darkness={0.82} />
    </EffectComposer>
  )
}
