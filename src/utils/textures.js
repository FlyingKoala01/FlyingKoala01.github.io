import * as THREE from 'three'

// Tileable molten-rock texture: dark crust with hot cells from deep red
// through orange to near-white cores. Scrolled via texture.offset for flow.
export function makeLavaTexture(size = 256) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  g.fillStyle = '#1c0502'
  g.fillRect(0, 0, size, size)

  const colors = [
    '#420b02',
    '#7a1602',
    '#b52802',
    '#e84605',
    '#ff7a12',
    '#ffb42e',
    '#ffe98a',
  ]
  for (let i = 0; i < 110; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = 7 + Math.random() * 34
    // bias toward the darker end so bright cores stay rare
    const ci = Math.floor(Math.pow(Math.random(), 1.7) * colors.length)
    const col = colors[Math.min(ci, colors.length - 1)]
    for (const ox of [-size, 0, size]) {
      for (const oy of [-size, 0, size]) {
        const grad = g.createRadialGradient(x + ox, y + oy, 1, x + ox, y + oy, r)
        grad.addColorStop(0, col)
        grad.addColorStop(1, 'rgba(28,5,2,0)')
        g.fillStyle = grad
        g.beginPath()
        g.arc(x + ox, y + oy, r, 0, Math.PI * 2)
        g.fill()
      }
    }
  }

  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// Spectrum-waterfall display (SDR style): scrolling noise with a few
// persistent signal carriers. Call tick() to advance one row.
export function makeWaterfall(width = 48, height = 96) {
  const c = document.createElement('canvas')
  c.width = width
  c.height = height
  const g = c.getContext('2d')
  g.fillStyle = '#020c14'
  g.fillRect(0, 0, width, height)

  const carriers = Array.from(
    { length: 2 + Math.floor(Math.random() * 2) },
    () => ({
      x: 4 + Math.floor(Math.random() * (width - 8)),
      w: 1 + Math.floor(Math.random() * 2),
      strength: 0.65 + Math.random() * 0.35,
    }),
  )

  const heat = (v) => {
    if (v < 0.25) return `rgb(2,${18 + v * 120 | 0},${40 + v * 200 | 0})`
    if (v < 0.5) return `rgb(${(v - 0.25) * 280 | 0},${90 + v * 160 | 0},${180 - v * 120 | 0})`
    if (v < 0.75) return `rgb(${120 + v * 170 | 0},${200 + v * 55 | 0},${60 - v * 40 | 0})`
    return `rgb(255,${230 - (v - 0.75) * 500 | 0},40)`
  }

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace

  const tick = () => {
    g.drawImage(c, 0, 1)
    for (let x = 0; x < width; x++) {
      let v = Math.random() * 0.22
      for (const s of carriers) {
        if (Math.abs(x - s.x) <= s.w) {
          v = Math.max(v, s.strength + (Math.random() - 0.5) * 0.25)
        }
      }
      g.fillStyle = heat(Math.min(v, 1))
      g.fillRect(x, 0, 1, 1)
    }
    tex.needsUpdate = true
  }

  return { tex, tick }
}
