// Honors the OS-level reduced-motion preference: idle bobbing, parallax and
// decorative animation are disabled when set. Scroll journeys stay functional.
export const REDUCED =
  typeof window !== 'undefined' &&
  !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
