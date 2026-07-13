import { useEffect } from 'react'
import { useAtlas } from '../store/useAtlas.js'
import { nudgeJourney } from '../store/useJourney.js'

// DOM-level input capture for the in-world scroll journey. No native page
// scroll exists; wheel, touch and keys nudge the virtual progress instead.
export default function JourneyControls() {
  const inWorld = useAtlas((s) => s.mode === 'world')

  useEffect(() => {
    if (!inWorld) return undefined

    const onWheel = (e) => nudgeJourney(e.deltaY * 0.00042)

    let touchY = null
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (touchY === null) return
      nudgeJourney((touchY - e.touches[0].clientY) * 0.0022)
      touchY = e.touches[0].clientY
    }
    const onTouchEnd = () => {
      touchY = null
    }

    const onKey = (e) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) nudgeJourney(0.09)
      if (['ArrowUp', 'PageUp'].includes(e.key)) nudgeJourney(-0.09)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [inWorld])

  return null
}
