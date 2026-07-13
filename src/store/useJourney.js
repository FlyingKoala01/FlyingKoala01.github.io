import { create } from 'zustand'

// Raw scroll target (0..1). The camera rig eases `journeyMotion.value`
// toward it every frame; keeping the damped value outside React avoids
// re-renders at 60fps.
export const journeyMotion = { value: 0 }

export const useJourney = create((set) => ({
  target: 0,
  // -1 = title card, 0..n = chapter index, -2 = between chapters, 99 = outro
  chapter: -1,

  reset: () => {
    journeyMotion.value = 0
    set({ target: 0, chapter: -1 })
  },
}))

export function nudgeJourney(delta) {
  useJourney.setState((s) => ({
    target: Math.min(1, Math.max(0, s.target + delta)),
  }))
}
