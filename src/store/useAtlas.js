import { create } from 'zustand'
import { useJourney } from './useJourney.js'

// Camera flight time between the atlas and a world, in ms. The HUD veil and
// the rig's teleport both key off this single value.
export const TRAVEL_MS = 1100

export const WORLDS = {
  volcano: {
    id: 'volcano',
    index: '01',
    name: 'VOLCANO',
    field: 'OFFENSIVE SECURITY',
    accent: '#ff7847',
    eyebrow: '01 — PRESSURE TEST',
    blurb:
      'Pentesting and offensive security: mapping attack surfaces, validating real risk and explaining practical remediation before it becomes an incident.',
    // where this world's scene lives, far below the atlas
    origin: [0, -240, 0],
    camPos: [0, 13.5, 33],
    camLook: [0, 6.5, 0],
    bg: '#120807',
    fog: '#2a1008',
  },
  fjord: {
    id: 'fjord',
    index: '02',
    name: 'FJORD',
    field: 'ICT ENGINEERING',
    accent: '#5fd4ff',
    eyebrow: '02 — SYSTEMS IN CONTEXT',
    blurb:
      'ICT systems engineering and the home lab: reliable infrastructure, clear interfaces, networking and the operational habits behind resilient services.',
    origin: [0, -480, 0],
    camPos: [0, 3.4, 24],
    camLook: [0, 1.5, 0],
    bg: '#06111c',
    fog: '#0d2233',
  },
  hangar: {
    id: 'hangar',
    index: '03',
    name: 'HANGAR',
    field: 'C-UAS // DEFENSE',
    accent: '#b6ff5f',
    eyebrow: '03 — COUNTER-UAS',
    blurb:
      'Defense sector work on counter-UAS: detecting, tracking and mitigating unmanned aerial systems where reliability is not optional.',
    origin: [0, -720, 0],
    camPos: [0, 4.4, 12.5],
    camLook: [0, 3.8, -5],
    bg: '#070b08',
    fog: '#0d140d',
  },
}

export const WORLD_LIST = Object.values(WORLDS)

// mode: 'atlas' | 'to-world' | 'world' | 'to-atlas'
export const useAtlas = create((set, get) => ({
  mode: 'atlas',
  activeWorld: null,
  hovered: null,

  setHovered: (id) => set({ hovered: id }),

  enterWorld: (id) => {
    if (get().mode !== 'atlas') return
    useJourney.getState().reset()
    set({ mode: 'to-world', activeWorld: id, hovered: null })
    setTimeout(() => set({ mode: 'world' }), TRAVEL_MS)
  },

  // direct world-to-world travel (used by "next region")
  travelTo: (id) => {
    if (get().mode !== 'world') return
    useJourney.getState().reset()
    set({ mode: 'to-world', activeWorld: id })
    setTimeout(() => set({ mode: 'world' }), TRAVEL_MS)
  },

  returnToAtlas: () => {
    if (get().mode !== 'world') return
    set({ mode: 'to-atlas' })
    setTimeout(() => set({ mode: 'atlas', activeWorld: null }), TRAVEL_MS)
  },
}))
