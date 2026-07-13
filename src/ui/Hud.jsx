import { useEffect, useRef, useState } from 'react'
import { useAtlas, WORLDS, WORLD_LIST } from '../store/useAtlas.js'
import { useJourney, journeyMotion } from '../store/useJourney.js'
import { useGame } from '../store/useGame.js'
import { respawnKoala } from '../scenes/atlas/Koala.jsx'
import { PATHS } from '../journey/paths.js'
import { updateSound } from '../sound/soundscape.js'
import { isTouchDevice, needsTiltPermission, requestTilt } from '../utils/tilt.js'

function ProgressRail({ world }) {
  const fill = useRef()

  useEffect(() => {
    let raf
    const loop = () => {
      if (fill.current) {
        fill.current.style.transform = `scaleY(${journeyMotion.value})`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="rail">
      <div className="rail-track">
        <div className="rail-fill" ref={fill} />
        {PATHS[world].chapters.map((c, i) => (
          <span key={i} className="rail-tick" style={{ top: `${c.at * 100}%` }} />
        ))}
      </div>
    </div>
  )
}

export default function Hud() {
  const mode = useAtlas((s) => s.mode)
  const hovered = useAtlas((s) => s.hovered)
  const activeWorld = useAtlas((s) => s.activeWorld)
  const setHovered = useAtlas((s) => s.setHovered)
  const enterWorld = useAtlas((s) => s.enterWorld)
  const travelTo = useAtlas((s) => s.travelTo)
  const returnToAtlas = useAtlas((s) => s.returnToAtlas)
  const chapter = useJourney((s) => s.chapter)

  const sound = useAtlas((s) => s.sound)
  const toggleSound = useAtlas((s) => s.toggleSound)
  const [tiltOn, setTiltOn] = useState(false)
  const game = useGame((s) => s.state)
  const score = useGame((s) => s.score)
  const best = useGame((s) => s.best)
  const retryGame = useGame((s) => s.retry)
  const exitGame = useGame((s) => s.exit)

  const world = activeWorld ? WORLDS[activeWorld] : null
  const hot = hovered ? WORLDS[hovered] : null
  const gameOn = game !== 'idle'
  const inAtlas = mode === 'atlas' && !gameOn
  const inWorld = mode === 'world'
  const veilOn =
    mode === 'to-world' ||
    mode === 'to-atlas' ||
    game === 'starting' ||
    game === 'exiting'

  useEffect(() => {
    const scape =
      activeWorld && (mode === 'world' || mode === 'to-world')
        ? activeWorld
        : 'atlas'
    updateSound(sound, scape)
  }, [sound, mode, activeWorld])
  const next = world
    ? WORLD_LIST[(WORLD_LIST.findIndex((w) => w.id === world.id) + 1) % WORLD_LIST.length]
    : null

  return (
    <>
      <div className="hud">
        <div className="hud-corner tl">
          <div className="hud-title">ISAAC IGLESIAS</div>
          <div className="hud-dim">// ICT ENGINEER</div>
          <div className="hud-dim">// PORTFOLIO ATLAS — V3</div>
        </div>

        {!gameOn && (
          <div className="hud-corner tr">
            <div className="hud-eyebrow">FIELD LOG</div>
            <div>
              Three territories chart my work: offensive security, ICT systems
              and counter-UAS defense.
            </div>
          </div>
        )}

        <div className="hud-corner bl hud-dim">
          {inAtlas ? (
            isTouchDevice() ? (
              <>
                TAP A LANDMARK TO TRAVEL
                <br />
                TILT THE PHONE — DON'T LET
                <br />
                THE KOALA SLIP OFF…
                <br />
                …EXCEPT ONTO THE BOARD ↘
                {needsTiltPermission() && !tiltOn && (
                  <>
                    <br />
                    <button
                      className="hud-link"
                      onClick={async () => setTiltOn(await requestTilt())}
                    >
                      [ ENABLE TILT ]
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                HOVER A LANDMARK — CLICK TO TRAVEL
                <br />
                WASD / RIGHT-CLICK: WALK THE KOALA
                <br />
                DARE THE DIVING BOARD ↘
              </>
            )
          ) : world ? (
            <>
              REGION {world.index} // {world.name}
              <br />
              <button className="hud-link" onClick={returnToAtlas}>
                ← ATLAS
              </button>
            </>
          ) : null}
        </div>

        <div className="hud-corner br hud-dim">
          <span className="coords">
            N63°26' E10°23'
            <br />
          </span>
          <button className="hud-link" onClick={toggleSound}>
            SOUND: {sound ? 'ON' : 'OFF'}
          </button>
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

        {/* journey title card */}
        {inWorld && world && (
          <div className={`title-card ${chapter === -1 ? 'show' : ''}`}>
            <div className="hud-eyebrow">{world.eyebrow}</div>
            <h2 style={{ color: world.accent }}>{world.name}</h2>
            <div className="title-field">{world.field}</div>
            <div className="scroll-hint hud-dim">SCROLL TO EXPLORE ▾</div>
          </div>
        )}

        {/* journey end card */}
        {inWorld && world && (
          <div className={`end-card ${chapter === 99 ? 'show' : ''}`}>
            <div className="hud-eyebrow">REGION {world.index} CHARTED</div>
            <h2>{world.name} // LOGGED</h2>
            <div className="end-actions">
              <button className="back" onClick={returnToAtlas}>
                ← RETURN TO ATLAS
              </button>
              {next && (
                <button
                  className="back"
                  style={{ borderColor: next.accent }}
                  onClick={() => travelTo(next.id)}
                >
                  NEXT: {next.name} →
                </button>
              )}
            </div>
          </div>
        )}

        {inWorld && world && <ProgressRail world={world.id} />}

        {/* dive minigame HUD */}
        {(game === 'playing' || game === 'over') && (
          <>
            <div className="game-score">
              {String(score).padStart(4, '0')} M
            </div>
            <div className="game-best hud-dim">
              BEST {String(best).padStart(4, '0')} M
            </div>
            {game === 'playing' && (
              <div className="game-hint hud-dim">
                {isTouchDevice()
                  ? 'TILT TO DODGE THE ROCKS'
                  : 'WASD / ARROWS — DODGE THE ROCKS'}
              </div>
            )}
          </>
        )}
        {game === 'over' && (
          <div className="end-card show">
            <div className="hud-eyebrow">KOALA DOWN // DIVE LOGGED</div>
            <h2>
              DEPTH {String(score).padStart(4, '0')} M
              {score >= best && score > 0 ? ' — NEW RECORD!' : ''}
            </h2>
            <div className="end-actions">
              <button className="back" onClick={retryGame}>
                ↻ DIVE AGAIN
              </button>
              <button
                className="back"
                onClick={() => {
                  exitGame()
                  respawnKoala()
                }}
              >
                ← BACK TO THE ISLAND
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={`veil ${veilOn ? 'on' : ''}`} />
    </>
  )
}
