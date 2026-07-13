// Device-orientation tilt for the atlas island. The first readings become
// the neutral baseline, so however the phone is held counts as "flat".
export const tilt = { rx: 0, rz: 0, enabled: false }

let baseBeta = null
let baseGamma = null
let listening = false

const clamp = (v, m) => Math.max(-m, Math.min(m, v))

function onOrient(e) {
  if (e.beta == null || e.gamma == null) return
  if (baseBeta === null) {
    baseBeta = e.beta
    baseGamma = e.gamma
  }
  const db = clamp(e.beta - baseBeta, 26)
  const dg = clamp(e.gamma - baseGamma, 26)
  // front-back tilt tips the island toward/away, left-right sideways
  tilt.rx = (db * Math.PI) / 180 / 1.4
  tilt.rz = (-dg * Math.PI) / 180 / 1.4
  tilt.enabled = true
}

export function initTilt() {
  if (listening) return
  listening = true
  window.addEventListener('deviceorientation', onOrient)
}

// iOS requires an explicit permission grant from a user gesture
export function needsTiltPermission() {
  return (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  )
}

export async function requestTilt() {
  try {
    const res = await DeviceOrientationEvent.requestPermission()
    if (res === 'granted') initTilt()
    return res === 'granted'
  } catch {
    return false
  }
}

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)
