'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Ring } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// โมเดลเสาสัญญาณ 5G (Cell Tower)
function CellTower() {
  const towerRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!towerRef.current) return;
    // ขยับเสาสัญญาณสไลด์เบาๆ ตามเวลา
    towerRef.current.rotation.y = -Math.PI / 6 + Math.sin(clock.getElapsedTime() * 0.3) * 0.04;
  });

  return (
    <group ref={towerRef} position={[8.5, -6.5, -5]}>
      {/* โครงเสาหลัก */}
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.12, 0.35, 13, 8]} />
        <meshStandardMaterial color="#26394A" metalness={0.7} roughness={0.35} wireframe />
      </mesh>

      {/* แผงสายอากาศ 5G 3 ทิศทาง */}
      {[0, 120, 240].map((angle) => {
        const rad = THREE.MathUtils.degToRad(angle);
        return (
          <mesh key={angle} position={[Math.sin(rad) * 0.8, 10.5, Math.cos(rad) * 0.8]} rotation={[0, -rad, 0]}>
            <boxGeometry args={[0.35, 2.4, 0.16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.95} />
          </mesh>
        );
      })}

      {/* ไฟสัญญาณเตือนภัยการบิน */}
      <mesh position={[0, 12, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#FF007A" />
      </mesh>
    </group>
  );
}

// คลื่นสัญญาณวิทยุแผ่กระจายวงแหวน (Signal Rings)
function SignalWaves() {
  const groupRef = useRef<THREE.Group>(null);
  const phases = useMemo(() => [0, 0.15, 0.3, 0.45, 0.6, 0.75], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const progress = (t * 0.34 + phases[i]) % 1;
      const scale = 0.4 + progress * 10;
      mesh.scale.setScalar(scale);
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.72 * (1 - progress));
      }
    });
  });

  return (
    <group ref={groupRef} position={[8.5, 4, -5]} rotation={[Math.PI / 2.4, 0, 0]}>
      {phases.map((_, i) => (
        <Ring key={i} args={[0.95, 1.02, 96]}>
          <meshBasicMaterial color={i % 2 === 0 ? "#00F0FF" : "#00FF88"} transparent opacity={0.8} side={THREE.DoubleSide} />
        </Ring>
      ))}
    </group>
  );
}

// ระบบควบคุมมุมกล้องตามพิกัดเมาส์ (Pointer Parallax)
function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 3, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -pointer.y * 2 + 2, 0.025);
    camera.lookAt(0, 1.5, 0);
  });
  return null;
}

export default function CellTowerCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 24], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight color="#172033" intensity={1.4} />
        <directionalLight color="#00F0FF" intensity={1.3} position={[-8, 12, 10]} />
        <pointLight color="#FF007A" intensity={2.5} distance={70} position={[11, 9, 5]} />
        <CellTower />
        <SignalWaves />
        <CameraRig />
      </Canvas>
    </div>
  );
}
