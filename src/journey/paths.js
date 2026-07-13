import * as THREE from 'three'

// One scroll journey per world: a camera curve, a look-target curve and the
// content chapters pinned along the way. All coordinates are world-local
// (the world group applies its own origin offset).
//
// EDIT CONTENT HERE — chapter copy is plain data.

const curve = (pts) =>
  new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))

export const PATHS = {
  volcano: {
    cam: curve([
      [0, 13.5, 33],
      [16, 5, 21],
      [14.5, 6, -6.5],
      [6, 14.5, -9.5],
      [-14, 17, 24],
    ]),
    look: curve([
      [0, 6.5, 0],
      [7, 1, 8],
      [6.7, 4.2, -2.5],
      [0, 9.5, 0],
      [0, 8, 0],
    ]),
    chapters: [
      {
        at: 0.24,
        eyebrow: '01 // RECON',
        title: 'SURFACE SURVEY',
        body: 'Mapping attack surfaces before they erupt: reconnaissance, enumeration and threat modeling across web, network and infrastructure.',
        anchor: [7.5, 1.6, 11],
      },
      {
        at: 0.5,
        eyebrow: '02 // OFFENSE',
        title: 'FIELD TOOLING',
        body: 'Hands-on offensive practice — Hack The Box labs, OffSec methodology, Burp Suite, Kali — pressure-testing systems the way attackers do.',
        anchor: [6.6, 5.4, -2.6],
        side: 'left',
      },
      {
        at: 0.76,
        eyebrow: '03 // IMPACT',
        title: 'CONTROLLED ERUPTION',
        body: 'Findings that matter: validating real risk, writing clear reports and walking teams through practical remediation.',
        anchor: [2.8, 10.9, -1.8],
      },
    ],
  },

  fjord: {
    cam: curve([
      [0, 3.4, 24],
      [1.8, 2.4, 10],
      [-2.6, 3, 0.5],
      [2.2, 3.4, -12],
      [0, 6.5, -24],
    ]),
    look: curve([
      [0, 1.5, 0],
      [-2, 1.4, -2],
      [4.4, 1, -5.2],
      [0, 3, -22],
      [0, 4, -42],
    ]),
    chapters: [
      {
        at: 0.24,
        eyebrow: '01 // SYSTEMS',
        title: 'THE CHANNEL',
        body: 'ICT Systems Engineering (UPC-EPSEM): dependable routes for data the way a fjord carries ships — networks, embedded systems and the interfaces between them.',
        anchor: [-3.2, 1.8, 6],
      },
      {
        at: 0.52,
        eyebrow: '02 // OPERATE',
        title: 'THE HOME LAB',
        body: 'Proxmox virtualization, pfSense routing, self-hosted services on Linux — running my own infrastructure and learning by operating it.',
        anchor: [4.6, 2.2, -5],
      },
      {
        at: 0.78,
        eyebrow: '03 // BUILD',
        title: 'THE TOOLBOX',
        body: 'Python, Go, C, ARM assembly, JavaScript/React — plus git, Linux and Arduino. From bare metal to the browser.',
        anchor: [-2.4, 3, -16],
      },
    ],
  },

  hangar: {
    cam: curve([
      [0, 4.4, 12.5],
      [4.2, 3.2, 3],
      [1.2, 3.8, 2.4],
      [-1.5, 2.2, 2],
      [0, 5.2, 9],
    ]),
    look: curve([
      [0, 3.8, -5],
      [0, 3.4, -4],
      [-4.7, 1.9, -2.2],
      [0, 4.5, -12],
      [0, 3, -18],
    ]),
    chapters: [
      {
        at: 0.24,
        eyebrow: '01 // DETECT',
        title: 'THE SUBJECT',
        body: 'Counter-UAS in the defense sector: understanding a threat that is small, fast and cheap — and never showing up the same way twice.',
        anchor: [1.6, 4.2, -4],
      },
      {
        at: 0.52,
        eyebrow: '02 // TRACK',
        title: 'TRACK & CLASSIFY',
        body: 'Sensors, data links and fusion keeping eyes on what matters. Reliability is not a feature here — it is the requirement.',
        anchor: [-4.6, 2.7, -1.9],
      },
      {
        at: 0.78,
        eyebrow: '03 // MITIGATE',
        title: 'CLOSE THE LOOP',
        body: 'From detection to decision: integrating effectors and procedures so the response is as dependable as the alert.',
        anchor: [0, 3.2, -13],
      },
    ],
  },
}

const WINDOW = 0.11

export function computeChapter(worldId, progress) {
  if (progress < 0.06) return -1
  if (progress > 0.93) return 99
  const chapters = PATHS[worldId].chapters
  for (let i = 0; i < chapters.length; i++) {
    if (Math.abs(progress - chapters[i].at) < WINDOW) return i
  }
  return -2
}
