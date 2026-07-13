import { Html } from '@react-three/drei'
import { PATHS } from './paths.js'
import { useJourney } from '../store/useJourney.js'

// HUD callouts pinned to 3D anchor points inside a world. Mounted only while
// that world is active, so the DOM stays clean.
export default function Annotations({ world }) {
  const chapter = useJourney((s) => s.chapter)

  return PATHS[world].chapters.map((c, i) => (
    <Html
      key={i}
      position={c.anchor}
      zIndexRange={[5, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <div
        className={`callout ${c.side === 'left' ? 'flip' : ''} ${
          chapter === i ? 'show' : ''
        }`}
      >
        <span className="callout-marker" />
        <div className="callout-card">
          <div className="hud-eyebrow">{c.eyebrow}</div>
          <div className="callout-title">{c.title}</div>
          <p>{c.body}</p>
        </div>
      </div>
    </Html>
  ))
}
