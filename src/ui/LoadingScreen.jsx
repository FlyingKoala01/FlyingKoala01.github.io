import { useEffect, useState } from 'react'

// The scene is fully procedural (no async assets yet), so this is a brand
// moment more than a real loader. When GLB/KTX2 assets arrive, wire it to
// drei's useProgress instead.
export default function LoadingScreen() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const fill = setTimeout(() => setPct(100), 60)
    const off = setTimeout(() => setDone(true), 1100)
    return () => {
      clearTimeout(fill)
      clearTimeout(off)
    }
  }, [])

  return (
    <div className={`loader ${done ? 'done' : ''}`}>
      <div className="hud-eyebrow">CHARTING TERRITORIES</div>
      <div className="bar">
        <i style={{ width: `${pct}%`, transition: 'width 0.9s ease' }} />
      </div>
    </div>
  )
}
