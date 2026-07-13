import * as THREE from 'three'

// Deterministic pseudo-random offset derived from a (quantized) vertex
// position, so coincident vertices of a non-indexed geometry receive the same
// offset and the surface stays watertight.
function hashOffset(x, y, z, seed, axis) {
  const s = Math.sin(
    x * 12.9898 + y * 78.233 + z * 37.719 + seed * 91.17 + axis * 269.5,
  )
  return (s * 43758.5453) % 1
}

// Displace vertices of a geometry for an organic, hand-carved low-poly look.
// Returns a new non-indexed geometry; the input is left untouched.
export function jitter(geometry, amount = 0.12, seed = 1) {
  const g = geometry.toNonIndexed()
  const pos = g.attributes.position
  const q = 1e3
  for (let i = 0; i < pos.count; i++) {
    const x = Math.round(pos.getX(i) * q) / q
    const y = Math.round(pos.getY(i) * q) / q
    const z = Math.round(pos.getZ(i) * q) / q
    pos.setXYZ(
      i,
      x + hashOffset(x, y, z, seed, 1) * amount,
      y + hashOffset(x, y, z, seed, 2) * amount,
      z + hashOffset(x, y, z, seed, 3) * amount,
    )
  }
  pos.needsUpdate = true
  g.computeVertexNormals()
  return g
}

export function jitteredCone(radius, height, segments, amount, seed) {
  const base = new THREE.ConeGeometry(radius, height, segments)
  const g = jitter(base, amount, seed)
  base.dispose()
  return g
}

export function jitteredCylinder(rTop, rBottom, height, segments, amount, seed) {
  const base = new THREE.CylinderGeometry(rTop, rBottom, height, segments)
  const g = jitter(base, amount, seed)
  base.dispose()
  return g
}
