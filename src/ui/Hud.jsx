import { useAtlas, WORLDS, WORLD_LIST } from '../store/useAtlas.js'

export default function Hud() {
  const mode = useAtlas((s) => s.mode)
  const hovered = useAtlas((s) => s.hovered)
  const activeWorld = useAtlas((s) => s.activeWorld)
  const setHovered = useAtlas((s) => s.setHovered)
  const enterWorld = useAtlas((s) => s.enterWorld)
  const returnToAtlas = useAtlas((s) => s.returnToAtlas)

  const world = activeWorld ? WORLDS[activeWorld] : null
  const hot = hovered ? WORLDS[hovered] : null
  const inAtlas = mode === 'atlas'
  const veilOn = mode === 'to-world' || mode === 'to-atlas'

  return (
    <>
      <div className="hud">
        <div className="hud-corner tl">
          <div className="hud-title">ISAAC IGLESIAS</div>
          <div className="hud-dim">// ICT ENGINEER</div>
          <div className="hud-dim">// PORTFOLIO ATLAS — V3</div>
        </div>

        <div className="hud-corner tr">
          <div className="hud-eyebrow">FIELD LOG</div>
          <div>
            Three territories chart my work: offensive security, ICT systems
            and counter-UAS defense.
          </div>
        </div>

        <div className="hud-corner bl hud-dim">
          {inAtlas ? (
            <>
              HOVER A LANDMARK
              <br />
              CLICK TO TRAVEL
            </>
          ) : world ? (
            <>
              REGION {world.index} // {world.name}
            </>
          ) : null}
        </div>

        <div className="hud-corner br hud-dim">
          N63°26' E10°23'
          <br />
          SOUND: OFF
        </div>

        <div
          className="hover-label"
          style={{ opacity: inAtlas && hot ? 1 : 0 }}
        >
          {hot && (
            <>
              <div className="hud-eyebrow">{hot.eyebrow}</div>
              <div className="big" style={{ color: hot.accent }}>
                {hot.name} — {hot.field}
              </div>
            </>
          )}
        </div>

        <div className={`picker ${inAtlas ? '' : 'hidden'}`}>
          {WORLD_LIST.map((w) => (
            <button
              key={w.id}
              className={hovered === w.id ? 'hot' : ''}
              style={{ '--hot': w.accent }}
              onMouseEnter={() => setHovered(w.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => enterWorld(w.id)}
            >
              <span className="idx">{w.index}</span>
              {w.name}
            </button>
          ))}
        </div>

        {mode === 'world' && world && (
          <div className="world-panel">
            <div className="hud-eyebrow">{world.eyebrow}</div>
            <h2 style={{ color: world.accent }}>
              {world.name} // {world.field}
            </h2>
            <p>{world.blurb}</p>
            <p className="hud-dim">
              // SCROLL JOURNEY UNDER CONSTRUCTION — the full chapter with
              missions, tooling and outcomes lands here next.
            </p>
            <button className="back" onClick={returnToAtlas}>
              ← RETURN TO ATLAS
            </button>
          </div>
        )}
      </div>
      <div className={`veil ${veilOn ? 'on' : ''}`} />
    </>
  )
}
