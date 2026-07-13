import { create } from 'zustand'

const BEST_KEY = 'koalaDiveBest'

function loadBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0
  } catch {
    return 0
  }
}

// Free-fall dodge minigame, triggered by diving off the marked edge.
// state: 'idle' | 'starting' | 'playing' | 'over' | 'exiting'
export const useGame = create((set, get) => ({
  state: 'idle',
  score: 0,
  best: loadBest(),

  start: () => {
    if (get().state !== 'idle') return
    set({ state: 'starting', score: 0 })
    setTimeout(() => {
      if (get().state === 'starting') set({ state: 'playing' })
    }, 700)
  },

  setScore: (score) => set({ score }),

  crash: () => {
    const { score, best } = get()
    const newBest = Math.max(best, score)
    if (newBest > best) {
      try {
        localStorage.setItem(BEST_KEY, String(newBest))
      } catch {
        // storage unavailable — the record just lives for this session
      }
    }
    set({ state: 'over', best: newBest })
  },

  retry: () => set({ state: 'playing', score: 0 }),

  exit: () => {
    set({ state: 'exiting' })
    setTimeout(() => set({ state: 'idle' }), 600)
  },
}))
