import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { pointerStore } from "../../lib/pointer-store";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { useWebglSupported } from "../../hooks/use-webgl-supported";
import { HeroCubeFallback } from "./hero-cube-fallback";

const GOLD = "#c5a059";
const GOLD_BRIGHT = "#e9d19f";

function hexagonRing(radius: number, thickness: number, depth: number) {
  const outer = new THREE.Shape();
  const inner = new THREE.Path();
  const sides = 6;
  for (let i = 0; i <= sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / 6;
    const ox = Math.cos(angle) * radius;
    const oy = Math.sin(angle) * radius;
    if (i === 0) outer.moveTo(ox, oy);
    else outer.lineTo(ox, oy);
  }
  for (let i = 0; i <= sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / 6;
    const ix = Math.cos(angle) * (radius - thickness);
    const iy = Math.sin(angle) * (radius - thickness);
    if (i === 0) inner.moveTo(ix, iy);
    else inner.lineTo(ix, iy);
  }
  outer.holes.push(inner);
  return new THREE.ExtrudeGeometry(outer, { depth, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
}

function WireCube() {
  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.05, 1.05, 1.05), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);
  return (
    <group>
      <mesh geometry={boxGeo}>
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.22}
          transparent
          opacity={0.16}
          envMapIntensity={2.2}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={GOLD_BRIGHT} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

function HexRing() {
  const geo = useMemo(() => hexagonRing(1.85, 0.08, 0.08), []);
  return (
    <mesh geometry={geo} rotation={[0, 0, 0]}>
      <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} envMapIntensity={2.4} />
    </mesh>
  );
}

function RigContent({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const cube = useRef<THREE.Group>(null);
  const t0 = useRef(performance.now());

  useFrame(() => {
    const t = (performance.now() - t0.current) / 1000;
    if (group.current) {
      const targetY = reduced ? 0 : pointerStore.x * 0.35;
      const targetX = reduced ? 0 : -pointerStore.y * 0.22;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.position.y = Math.sin(t * 0.6) * 0.14;
    }
    if (cube.current) {
      cube.current.rotation.y = t * (reduced ? 0.08 : 0.22);
      cube.current.rotation.x = 0.6108 + Math.sin(t * 0.35) * 0.05;
    }
  });

  return (
    <group ref={group} rotation={[0.5, 0.7, 0]}>
      <group ref={cube}>
        <WireCube />
      </group>
      <HexRing />
    </group>
  );
}

/** Real-time WebGL hero mark: gold wireframe cube inside a hex ring, echoing the PixelPerfect logo. */
export function HeroCube() {
  const reduced = useReducedMotion();
  const webglOk = useWebglSupported();

  if (!webglOk) return <HeroCubeFallback />;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 3, 5]} intensity={2.2} color={GOLD_BRIGHT} />
        <pointLight position={[-4, -2, -3]} intensity={0.8} color="#3a4a6b" />
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={1.1} />
          <Float speed={reduced ? 0 : 1.1} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.6}>
            <RigContent reduced={reduced} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
