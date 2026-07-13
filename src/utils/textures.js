import * as THREE from 'three'

function blob(g, x, y, rx, ry, color, w, h) {
  // soft-edged ellipse, drawn wrapped so the texture tiles
  for (const ox of [-w, 0, w]) {
    for (const oy of [-h, 0, h]) {
      g.save()
      g.translate(x + ox, y + oy)
      g.scale(rx, ry)
      const grad = g.createRadialGradient(0, 0, 0.55, 0, 0, 1)
      grad.addColorStop(0, color)
      grad.addColorStop(0.82, color)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      g.fillStyle = grad
      g.beginPath()
      g.arc(0, 0, 1, 0, Math.PI * 2)
      g.fill()
      g.restore()
    }
  }
}

// Lava river: bright molten base, hottest along the center line, with dark
// cooled-crust slabs drifting on top. Flow direction = V (scroll offset.y).
export function makeLavaFlowTexture(w = 128, h = 256) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const g = c.getContext('2d')

  // cross-stream heat gradient: cool edges, white-hot core
  const grad = g.createLinearGradient(0, 0, w, 0)
  grad.addColorStop(0, '#961e03')
  grad.addColorStop(0.18, '#e05205')
  grad.addColorStop(0.42, '#ff9412')
  grad.addColorStop(0.5, '#ffd23e')
  grad.addColorStop(0.58, '#ff9412')
  grad.addColorStop(0.82, '#e05205')
  grad.addColorStop(1, '#961e03')
  g.fillStyle = grad
  g.fillRect(0, 0, w, h)

  // drifting crust slabs, elongated along the flow
  for (let i = 0; i < 22; i++) {
    const x = Math.random() * w
    const y = Math.random() * h
    const edge = Math.abs(x / w - 0.5) * 2 // more crust near the banks
    const dark = Math.random() < 0.35 + edge * 0.4
    blob(
      g,
      x,
      y,
      5 + Math.random() * 11,
      14 + Math.random() * 30,
      dark ? '#2a1006' : '#8a2204',
      w,
      h,
    )
  }
  // white-hot filaments between the slabs
  for (let i = 0; i < 7; i++) {
    blob(
      g,
      w * (0.3 + Math.random() * 0.4),
      Math.random() * h,
      2 + Math.random() * 3,
      18 + Math.random() * 40,
      '#fff0a8',
      w,
      h,
    )
  }

  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// Lava pool / crater: molten base with crust islands, denser toward the rim.
// Tileable both ways; drift offset slowly for churn.
export function makeLavaPoolTexture(size = 192) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')

  g.fillStyle = '#ff9412'
  g.fillRect(0, 0, size, size)
  // large soft hot patches for variation
  for (let i = 0; i < 8; i++) {
    blob(
      g,
      Math.random() * size,
      Math.random() * size,
      20 + Math.random() * 34,
      20 + Math.random() * 34,
      i % 2 ? '#ffd23e' : '#e85a06',
      size,
      size,
    )
  }
  // crust islands
  for (let i = 0; i < 26; i++) {
    const r = 6 + Math.random() * 15
    blob(
      g,
      Math.random() * size,
      Math.random() * size,
      r,
      r * (0.7 + Math.random() * 0.6),
      Math.random() < 0.55 ? '#2a1006' : '#7a1c03',
      size,
      size,
    )
  }
  // sparks of white heat
  for (let i = 0; i < 10; i++) {
    blob(
      g,
      Math.random() * size,
      Math.random() * size,
      2.5 + Math.random() * 4,
      2.5 + Math.random() * 4,
      '#fff0a8',
      size,
      size,
    )
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
