import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './LandingAtlas.css';

const LANDMARKS = [
  {
    id: 'volcano',
    title: 'Volcano / Offensive security',
    eyebrow: '01 — Pressure test',
    description: 'Pentesting experience shaped by mapping attack surfaces, validating risk, and explaining practical remediation.',
    sceneNote: 'A volcanic ridge: test the pressure before it becomes an incident.',
  },
  {
    id: 'fjord',
    title: 'Fjord / ICT engineering',
    eyebrow: '02 — Systems in context',
    description: 'ICT engineering work that connects reliable systems, clear interfaces, and the people who depend on them.',
    sceneNote: 'A fjord passage: infrastructure is useful when it creates a dependable route.',
  },
  {
    id: 'homelab',
    title: 'Homelab / Infrastructure lab',
    eyebrow: '03 — Learn by operating',
    description: 'Experimentation with self-hosted infrastructure, networking, automation, and the operational habits behind resilient services.',
    sceneNote: 'A small house with a big rack: experimentation becomes skill when it is operated with care.',
  },
];

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && canvas.getContext('webgl'));
  } catch (error) {
    return false;
  }
}

function createLandscape(scene) {
  const material = (color) => new THREE.MeshStandardMaterial({ color, flatShading: true });
  const landmarks = {};
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(8, 9, 0.75, 7), material('#173f45'));
  ground.position.y = -0.75;
  scene.add(ground);

  const volcanoGroup = new THREE.Group();
  const volcano = new THREE.Mesh(new THREE.ConeGeometry(1.55, 3.4, 6), material('#bb5a37'));
  volcano.position.y = 1;
  const crater = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.75, 0.18, 6), material('#2c1d1b'));
  crater.position.y = 2.72;
  volcanoGroup.add(volcano, crater);
  volcanoGroup.position.set(-3.2, 0, -0.4);
  volcanoGroup.name = 'volcano';
  landmarks.volcano = volcanoGroup;
  scene.add(volcanoGroup);

  const fjordGroup = new THREE.Group();
  const water = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.18, 2.3), material('#2d9caa'));
  water.position.y = -0.25;
  fjordGroup.add(water);
  [-0.5, 2.4].forEach((x) => {
    const cliff = new THREE.Mesh(new THREE.ConeGeometry(1.25, 2.8, 5), material('#78908a'));
    cliff.position.set(x - 1, 0.7, -0.2);
    fjordGroup.add(cliff);
  });
  fjordGroup.position.set(1, 0, 0.6);
  fjordGroup.name = 'fjord';
  landmarks.fjord = fjordGroup;
  scene.add(fjordGroup);

  const house = new THREE.Group();
  const houseBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.45, 1.65), material('#e6d7a4'));
  houseBody.position.y = 0.55;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.65, 1.25, 4), material('#27434b'));
  roof.position.y = 1.9;
  roof.rotation.y = Math.PI / 4;
  const windowLight = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.04), material('#f3a54c'));
  windowLight.position.set(0, 0.7, 0.85);
  house.add(houseBody, roof, windowLight);
  house.position.set(3.65, 0, -0.65);
  house.name = 'homelab';
  landmarks.homelab = house;
  scene.add(house);

  return landmarks;
}

function AtlasCanvas({ activeLandmark, onRendererError }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    let scene;
    let frame;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog('#0e232a', 11, 25);
      const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 100);
      const overviewTarget = new THREE.Vector3(0, 0.15, 0);
      const ambient = new THREE.HemisphereLight('#eaf5ef', '#142229', 1.6);
      const key = new THREE.DirectionalLight('#fff1ce', 2.2);
      key.position.set(4, 9, 6);
      scene.add(ambient, key);
      const landmarks = createLandscape(scene);
      const focusedLandmark = activeLandmark && landmarks[activeLandmark];
      Object.keys(landmarks).forEach((id) => {
        landmarks[id].visible = !focusedLandmark || id === activeLandmark;
      });

      let yaw = 0;
      let dragging = false;
      let startX = 0;
      const target = focusedLandmark ? focusedLandmark.position.clone().add(new THREE.Vector3(0, 0.9, 0)) : overviewTarget;
      const distance = focusedLandmark ? 6.5 : 12.5;
      const resize = () => {
        const { width, height } = canvas.getBoundingClientRect();
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      const render = () => {
        camera.position.x = target.x + Math.sin(yaw) * distance;
        camera.position.y = target.y + (focusedLandmark ? 3.2 : 6.7);
        camera.position.z = target.z + Math.cos(yaw) * distance;
        camera.lookAt(target);
        renderer.render(scene, camera);
        frame = window.requestAnimationFrame(render);
      };
      const beginDrag = (event) => {
        dragging = true;
        startX = event.clientX;
        canvas.setPointerCapture(event.pointerId);
      };
      const move = (event) => {
        if (!dragging) return;
        yaw += (event.clientX - startX) * 0.008;
        startX = event.clientX;
      };
      const endDrag = () => { dragging = false; };
      const handleContextLost = (event) => {
        event.preventDefault();
        onRendererError();
      };

      resize();
      render();
      window.addEventListener('resize', resize);
      canvas.addEventListener('pointerdown', beginDrag);
      canvas.addEventListener('pointermove', move);
      canvas.addEventListener('pointerup', endDrag);
      canvas.addEventListener('pointercancel', endDrag);
      canvas.addEventListener('webglcontextlost', handleContextLost);

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('pointerdown', beginDrag);
        canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('pointerup', endDrag);
        canvas.removeEventListener('pointercancel', endDrag);
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        scene.traverse((object) => {
          if (!object.isMesh) return;
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        });
        renderer.dispose();
      };
    } catch (error) {
      if (renderer) renderer.dispose();
      onRendererError();
      return undefined;
    }
  }, [activeLandmark, onRendererError]);

  const label = activeLandmark
    ? `Focused 3D scene: ${activeLandmark}. Drag to orbit the landmark.`
    : 'Interactive 3D atlas overview. Drag to rotate the landscape.';

  return <canvas ref={canvasRef} className="atlas-canvas" aria-label={label} />;
}

export default function LandingAtlas() {
  const [activeLandmark, setActiveLandmark] = useState(null);
  const [mode, setMode] = useState('checking');
  const active = LANDMARKS.find((landmark) => landmark.id === activeLandmark);
  const showFallback = useCallback(() => setMode('fallback'), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setMode('reduced-motion');
      return;
    }
    setMode(supportsWebGL() ? '3d' : 'fallback');
  }, []);

  return (
    <section className={`landing-atlas ${active ? 'is-focused' : ''}`} aria-labelledby="atlas-title">
      {mode === '3d' && <AtlasCanvas activeLandmark={activeLandmark} onRendererError={showFallback} />}
      <div className="atlas-grain" aria-hidden="true" />
      <div className="atlas-content">
        <header className="atlas-intro">
          <p className="atlas-kicker">Isaac Iglesias Vila · Interactive portfolio</p>
          <h1 id="atlas-title">Field atlas</h1>
          <p className="atlas-dek">Three terrain studies for the systems I test, engineer, and operate.</p>
        </header>

        {active ? (
          <article className="landmark-story" aria-live="polite">
            <p className="landmark-eyebrow">{active.eyebrow}</p>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
            <p className="scene-note">{active.sceneNote}</p>
            <button type="button" className="atlas-return" onClick={() => setActiveLandmark(null)}>Return to atlas</button>
          </article>
        ) : (
          <>
            <p className="atlas-instruction">Choose a landmark, then enter its field note. On the map, drag to orbit the terrain.</p>
            {mode !== '3d' && mode !== 'checking' && (
              <p className="atlas-fallback" role="status">
                {mode === 'reduced-motion'
                  ? 'Motion is reduced, so this atlas is presented as readable field notes.'
                  : 'Interactive 3D view is unavailable, so this atlas is presented as readable field notes.'}
              </p>
            )}
            <nav className="landmark-controls" aria-label="Atlas landmarks">
              {LANDMARKS.map((landmark) => (
                <article key={landmark.id} className={`landmark-card landmark-${landmark.id}`}>
                  <p className="landmark-index">{landmark.eyebrow}</p>
                  <h2>{landmark.id === 'homelab' ? 'Homelab house' : landmark.id}</h2>
                  <p>{landmark.description}</p>
                  <button type="button" onClick={() => setActiveLandmark(landmark.id)}>Enter {landmark.id}</button>
                </article>
              ))}
            </nav>
          </>
        )}
      </div>
    </section>
  );
}
