import { WORLD_LIST } from '../store/useAtlas.js'
import { PATHS } from '../journey/paths.js'

// Plain-DOM version of the atlas for browsers without WebGL.
export default function Fallback() {
  return (
    <div className="fallback">
      <header>
        <div className="hud-title">ISAAC IGLESIAS</div>
        <div className="hud-dim">// ICT ENGINEER — PORTFOLIO ATLAS</div>
        <p className="hud-dim">
          This site is an interactive 3D experience; your browser has no WebGL
          support, so here is the chart on paper.
        </p>
      </header>
      {WORLD_LIST.map((w) => (
        <section key={w.id}>
          <div className="hud-eyebrow">{w.eyebrow}</div>
          <h2 style={{ color: w.accent }}>
            {w.name} // {w.field}
          </h2>
          <p>{w.blurb}</p>
          <ul>
            {PATHS[w.id].chapters.map((c, i) => (
              <li key={i}>
                <strong>{c.title}</strong> — {c.body}
              </li>
            ))}
          </ul>
        </section>
      ))}
      <footer className="hud-dim">
        <a href="https://github.com/FlyingKoala01">github.com/FlyingKoala01</a>
      </footer>
    </div>
  )
}
