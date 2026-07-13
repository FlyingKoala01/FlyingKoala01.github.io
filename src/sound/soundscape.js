// Procedural ambient soundscapes via WebAudio — no audio assets.
// One layered scape per region, crossfaded on travel.

let ctx = null
let master = null
let noiseBuf = null
const scapes = {}
let currentId = null

function makeNoiseBuffer() {
  const len = ctx.sampleRate * 2
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1
    last = 0.98 * last + 0.02 * white // pinkish rumble base
    d[i] = last * 3 + white * 0.08
  }
  return buf
}

function noiseLayer(dest, { type, freq, q = 0.7, gain, lfoFreq = 0, lfoDepth = 0 }) {
  const src = ctx.createBufferSource()
  src.buffer = noiseBuf
  src.loop = true
  const filter = ctx.createBiquadFilter()
  filter.type = type
  filter.frequency.value = freq
  filter.Q.value = q
  const g = ctx.createGain()
  g.gain.value = gain
  src.connect(filter)
  filter.connect(g)
  g.connect(dest)
  if (lfoFreq > 0) {
    const lfo = ctx.createOscillator()
    lfo.frequency.value = lfoFreq
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = gain * lfoDepth
    lfo.connect(lfoGain)
    lfoGain.connect(g.gain)
    lfo.start()
  }
  src.start(0, Math.random() * 1.5)
}

function oscLayer(dest, { freq, type = 'triangle', detune = 0, gain }) {
  const osc = ctx.createOscillator()
  osc.type = type
  osc.frequency.value = freq
  osc.detune.value = detune
  const g = ctx.createGain()
  g.gain.value = gain
  osc.connect(g)
  g.connect(dest)
  osc.start()
}

function buildScape(id) {
  const bus = ctx.createGain()
  bus.gain.value = 0
  bus.connect(master)

  if (id === 'atlas') {
    // high, thin wind — a quiet overlook
    noiseLayer(bus, { type: 'lowpass', freq: 240, gain: 0.5, lfoFreq: 0.07, lfoDepth: 0.4 })
    noiseLayer(bus, { type: 'bandpass', freq: 900, q: 2, gain: 0.05, lfoFreq: 0.19, lfoDepth: 0.8 })
  } else if (id === 'volcano') {
    // deep rumble + faint crackle
    noiseLayer(bus, { type: 'lowpass', freq: 85, gain: 1.4, lfoFreq: 0.13, lfoDepth: 0.5 })
    noiseLayer(bus, { type: 'bandpass', freq: 2600, q: 1.2, gain: 0.035, lfoFreq: 0.7, lfoDepth: 0.9 })
  } else if (id === 'fjord') {
    // wind through the channel + water lapping
    noiseLayer(bus, { type: 'bandpass', freq: 480, q: 0.8, gain: 0.33, lfoFreq: 0.11, lfoDepth: 0.55 })
    noiseLayer(bus, { type: 'lowpass', freq: 160, gain: 0.4, lfoFreq: 0.4, lfoDepth: 0.5 })
  } else if (id === 'hangar') {
    // electrical hum + ventilation
    oscLayer(bus, { freq: 55, gain: 0.05 })
    oscLayer(bus, { freq: 110, detune: 4, gain: 0.03 })
    oscLayer(bus, { freq: 165, detune: -3, gain: 0.012 })
    noiseLayer(bus, { type: 'lowpass', freq: 420, gain: 0.09, lfoFreq: 0.09, lfoDepth: 0.25 })
  }

  return { bus }
}

function ensureContext() {
  if (ctx) return
  ctx = new (window.AudioContext || window.webkitAudioContext)()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)
  noiseBuf = makeNoiseBuffer()
}

// Single entry point: call whenever the enabled flag or region changes.
export function updateSound(enabled, scapeId) {
  if (!enabled && !ctx) return
  ensureContext()
  if (ctx.state === 'suspended') ctx.resume()

  const t = ctx.currentTime
  master.gain.cancelScheduledValues(t)
  master.gain.linearRampToValueAtTime(enabled ? 0.14 : 0, t + 0.8)

  if (scapeId !== currentId) {
    if (currentId && scapes[currentId]) {
      scapes[currentId].bus.gain.cancelScheduledValues(t)
      scapes[currentId].bus.gain.linearRampToValueAtTime(0, t + 1.4)
    }
    if (!scapes[scapeId]) scapes[scapeId] = buildScape(scapeId)
    scapes[scapeId].bus.gain.cancelScheduledValues(t)
    scapes[scapeId].bus.gain.linearRampToValueAtTime(1, t + 1.6)
    currentId = scapeId
  }
}
