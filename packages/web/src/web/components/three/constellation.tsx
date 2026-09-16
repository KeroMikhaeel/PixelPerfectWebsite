import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglSupported } from "../../hooks/use-webgl-supported";

const GOLD = "#c5a059";
const GOLD_BRIGHT = "#e9d19f";

const NODES = [
  new THREE.Vector3(-2.6, 0.9, 0),
  new THREE.Vector3(0, -0.9, 0.4),
  new THREE.Vector3(2.6, 0.9, -0.2),
];

// scattered secondary points for constellation texture
const DUST = Array.from({ length: 60 }, () => new THREE.Vector3((Math.random() - 0.5) * 9, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 2));

function Scene({ progress }: { progress: React.RefObject<number> }) {
  const lineRefs = [useRef<THREE.Line>(null), useRef<THREE.Line>(null), useRef<THREE.Line>(null)];
  const nodeRefs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];
  const group = useRef<THREE.Group>(null);

  const dustGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(DUST.length * 3);
    DUST.forEach((v, i) => v.toArray(positions, i * 3));
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const segments = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [
      [NODES[0], NODES[1]],
      [NODES[1], NODES[2]],
      [NODES[0], NODES[2]],
    ];
    return pairs.map(([a, b]) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b]);
      g.setDrawRange(0, 0);
      return g;
    });
  }, []);

  useFrame((state) => {
    const p = progress.current ?? 0;
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    segments.forEach((g, i) => {
      const segStart = i / 3;
      const segEnd = (i + 1) / 3;
      const local = THREE.MathUtils.clamp((p - segStart) / (segEnd - segStart), 0, 1);
      g.setDrawRange(0, Math.round(local * 2));
      const mat = lineRefs[i].current?.material as THREE.LineBasicMaterial | undefined;
      if (mat) mat.opacity = 0.25 + local * 0.75;
    });
    nodeRefs.forEach((r, i) => {
      const s = THREE.MathUtils.clamp(p * 3 - i, 0, 1);
      const scale = 0.55 + s * 0.65;
      r.current?.scale.setScalar(scale);
      const mat = r.current?.material as THREE.MeshStandardMaterial | undefined;
      if (mat) mat.emissiveIntensity = 0.4 + s * 1.4;
    });
  });

  return (
    <group ref={group}>
      <points geometry={dustGeo}>
        <pointsMaterial color={GOLD} size={0.035} transparent opacity={0.5} sizeAttenuation toneMapped={false} />
      </points>
      {segments.map((g, i) => (
        <primitive key={i} object={new THREE.Line(g, new THREE.LineBasicMaterial({ color: GOLD_BRIGHT, transparent: true, opacity: 0.3, toneMapped: false }))} ref={lineRefs[i]} />
      ))}
      {NODES.map((pos, i) => (
        <mesh key={i} position={pos} ref={nodeRefs[i]}>
          <icosahedronGeometry args={[0.16, 1]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.4} metalness={1} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Gold constellation graphic for the metrics section: three nodes connect
 * with drawn lines as `progressRef` (0..1, driven by scroll-into-view) advances.
 */
export function Constellation({ progressRef }: { progressRef: React.RefObject<number> }) {
  const webglOk = useWebglSupported();

  if (!webglOk) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 400 150" className="w-full max-w-2xl opacity-60">
          <line x1="60" y1="55" x2="200" y2="105" stroke="#e4c989" strokeWidth="1" />
          <line x1="200" y1="105" x2="340" y2="55" stroke="#e4c989" strokeWidth="1" />
          <line x1="60" y1="55" x2="340" y2="55" stroke="#e4c989" strokeWidth="1" />
          {[
            [60, 55],
            [200, 105],
            [340, 55],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#c5a059" />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 4]} intensity={1.6} color={GOLD_BRIGHT} />
        <Scene progress={progressRef} />
      </Canvas>
    </div>
  );
}

/** Hook: returns a ref that eases toward 1 while `el` is in view, 0 otherwise. */
export function useInViewProgress<T extends HTMLElement>() {
  const elRef = useRef<T>(null);
  const progressRef = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const target = inView ? 1 : 0;
      progressRef.current += (target - progressRef.current) * 0.03;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return { elRef, progressRef };
}
