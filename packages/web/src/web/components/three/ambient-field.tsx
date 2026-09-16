import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "../../lib/scroll-store";
import { useReducedMotion } from "../../hooks/use-reduced-motion";
import { useWebglSupported } from "../../hooks/use-webgl-supported";

const GOLD = "#c5a059";
const COUNT = 42;

interface Particle {
  base: THREE.Vector3;
  phase: number;
  speed: number;
  amp: number;
  scale: number;
  rotAxis: THREE.Vector3;
  rotSpeed: number;
}

function Field({ reduced, geometry, count }: { reduced: boolean; geometry: THREE.BufferGeometry; count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        base: new THREE.Vector3((Math.random() - 0.5) * 16, Math.random() * 60 - 10, (Math.random() - 0.5) * 8 - 4),
        phase: Math.random() * Math.PI * 2,
        speed: 0.08 + Math.random() * 0.12,
        amp: 0.6 + Math.random() * 1.1,
        scale: 0.05 + Math.random() * 0.16,
        rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        rotSpeed: (0.1 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1),
      });
    }
    return arr;
  }, [count]);

  const t0 = useRef(performance.now());
  const smoothedVel = useRef(0);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = (performance.now() - t0.current) / 1000;

    smoothedVel.current += (scrollStore.velocity - smoothedVel.current) * 0.08;
    const velKick = reduced ? 0 : THREE.MathUtils.clamp(smoothedVel.current * 0.6, -3, 3);

    particles.forEach((p, i) => {
      const drift = reduced ? 0 : Math.sin(t * p.speed + p.phase) * p.amp;
      const x = p.base.x + drift * 0.4;
      let y = p.base.y - scrollStore.scrollY * 0.35 + drift * 0.6;
      // wrap vertically so the field is endless
      y = ((y % 70) + 70) % 70;
      y -= 30;
      const z = p.base.z + Math.cos(t * p.speed * 0.7 + p.phase) * p.amp * 0.3;

      dummy.position.set(x, y, z);
      const angle = t * p.rotSpeed * (1 + Math.abs(velKick) * 0.5) + p.phase;
      dummy.quaternion.setFromAxisAngle(p.rotAxis, angle);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.28} toneMapped={false} />
    </instancedMesh>
  );
}

/** Fixed full-viewport backdrop of drifting low-poly gold polyhedra, reacting to scroll velocity. */
export function AmbientField() {
  const reduced = useReducedMotion();
  const webglOk = useWebglSupported();
  const geometries = useMemo(
    () => [new THREE.OctahedronGeometry(1, 0), new THREE.IcosahedronGeometry(1, 0), new THREE.TetrahedronGeometry(1, 0)],
    [],
  );

  if (!webglOk) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 9], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <Field reduced={reduced} geometry={geometries[0]} count={Math.round(COUNT * 0.4)} />
        <Field reduced={reduced} geometry={geometries[1]} count={Math.round(COUNT * 0.35)} />
        <Field reduced={reduced} geometry={geometries[2]} count={Math.round(COUNT * 0.25)} />
      </Canvas>
    </div>
  );
}
