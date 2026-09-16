import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { pointerStore } from "../../lib/pointer-store";
import { useWebglSupported } from "../../hooks/use-webgl-supported";

const GOLD = "#c5a059";
const GOLD_BRIGHT = "#efd9a8";
const DARK_BARREL = "#12172a";

function Pen({ pulse }: { pulse: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const kick = pulse.current ?? 0;
    group.current.rotation.z = -0.55 + Math.sin(t * 0.4) * 0.015 + kick * 0.08;
    group.current.rotation.y = 0.5 + pointerStore.x * 0.12;
    group.current.position.y = Math.sin(t * 0.55) * 0.08 + kick * 0.15;
  });

  return (
    <group ref={group} rotation={[0.1, 0.5, -0.55]}>
      {/* barrel */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.13, 2.1, 32]} />
        <meshStandardMaterial color={DARK_BARREL} metalness={0.7} roughness={0.25} />
      </mesh>
      {/* gold bands */}
      {[0.75, 0.2, -0.9].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.132, 0.132, 0.05, 32]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.15} />
        </mesh>
      ))}
      {/* grip taper */}
      <mesh position={[0, -1.15, 0]}>
        <coneGeometry args={[0.11, 0.32, 32]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.12} />
      </mesh>
      {/* nib */}
      <mesh position={[0, -1.36, 0]}>
        <coneGeometry args={[0.045, 0.22, 24]} />
        <meshStandardMaterial color={GOLD_BRIGHT} metalness={1} roughness={0.08} />
      </mesh>
      {/* cap finial */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.115, 24, 24]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.12} />
      </mesh>
    </group>
  );
}

/** 3D metallic gold fountain pen resting above the contact form; pulses on submit. */
export function ContactPen({ pulseRef }: { pulseRef: React.RefObject<number> }) {
  const webglOk = useWebglSupported();

  if (!webglOk) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div
          className="w-40 h-40 rounded-full opacity-30 blur-[60px] absolute"
          style={{ background: "radial-gradient(circle, #c5a059 0%, transparent 70%)" }}
        />
        <svg viewBox="0 0 60 200" className="h-56 rotate-[25deg]">
          <rect x="18" y="10" width="24" height="140" rx="10" fill="#12172a" stroke="#c5a059" strokeWidth="1.5" />
          <rect x="16" y="60" width="28" height="6" fill="#c5a059" />
          <rect x="16" y="90" width="28" height="6" fill="#c5a059" />
          <polygon points="20,150 40,150 30,190" fill="#e4c989" />
          <circle cx="30" cy="14" r="9" fill="#c5a059" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.2], fov: 34 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 3, 4]} intensity={2} color={GOLD_BRIGHT} />
        <pointLight position={[-3, -2, -2]} intensity={0.6} color="#3a4a6b" />
        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={1} />
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.4}>
            <Pen pulse={pulseRef} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
