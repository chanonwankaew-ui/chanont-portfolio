'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const TOWER_POSITION = new THREE.Vector3(6, -10, -4);
const ANTENNA_POSITION = new THREE.Vector3(6, 11.5, -4);
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 10);
const pointerNdc = new THREE.Vector2(0, 0);

type BarSpec = {
  start: THREE.Vector3;
  end: THREE.Vector3;
  radius: number;
};

function createTowerBars(): BarSpec[] {
  const bars: BarSpec[] = [];
  const levels = 9;
  const baseWidth = 1.45;
  const topWidth = 0.38;
  const height = 21.5;

  const cornersAt = (fraction: number) => {
    const halfWidth = THREE.MathUtils.lerp(baseWidth, topWidth, fraction) / 2;
    const y = fraction * height;
    return [
      new THREE.Vector3(-halfWidth, y, -halfWidth),
      new THREE.Vector3(halfWidth, y, -halfWidth),
      new THREE.Vector3(halfWidth, y, halfWidth),
      new THREE.Vector3(-halfWidth, y, halfWidth),
    ];
  };

  const addBar = (start: THREE.Vector3, end: THREE.Vector3, radius = 0.035) => {
    bars.push({ start, end, radius });
  };

  const lower = cornersAt(0);
  const upper = cornersAt(1);
  lower.forEach((corner, index) => addBar(corner, upper[index], 0.07));

  for (let level = 0; level <= levels; level += 1) {
    const corners = cornersAt(level / levels);
    corners.forEach((corner, index) => addBar(corner, corners[(index + 1) % corners.length], 0.045));
  }

  for (let level = 0; level < levels; level += 1) {
    const low = cornersAt(level / levels);
    const high = cornersAt((level + 1) / levels);
    for (let face = 0; face < 4; face += 1) {
      const next = (face + 1) % 4;
      addBar(low[face], high[next]);
      addBar(low[next], high[face]);
    }
  }

  return bars;
}

function TowerBar({ start, end, radius }: BarSpec) {
  const direction = useMemo(() => end.clone().sub(start), [end, start]);
  const rotation = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    ),
    [direction],
  );
  const midpoint = useMemo(() => start.clone().add(end).multiplyScalar(0.5), [end, start]);

  return (
    <mesh position={midpoint} quaternion={rotation} scale={[1, direction.length(), 1]}>
      <cylinderGeometry args={[radius, radius, 1, 6]} />
      <meshStandardMaterial color={0x88919a} metalness={0.15} roughness={0.75} />
    </mesh>
  );
}

function TowerFrame() {
  const bars = useMemo(() => createTowerBars(), []);

  return (
    <group position={TOWER_POSITION}>
      {bars.map((bar, index) => <TowerBar key={index} {...bar} />)}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.15, 1.35, 0.36, 8]} />
        <meshStandardMaterial color={0x707982} metalness={0.15} roughness={0.78} />
      </mesh>
      {[0, 120, 240].map((degrees) => {
        const angle = THREE.MathUtils.degToRad(degrees);
        return (
          <group
            key={degrees}
            position={[Math.sin(angle) * 0.62, 21.5, Math.cos(angle) * 0.62]}
            rotation={[0, -angle, 0]}
          >
            <mesh>
              <boxGeometry args={[0.38, 2.2, 0.18]} />
              <meshStandardMaterial color={0xa2abb3} metalness={0.12} roughness={0.72} />
            </mesh>
            <mesh position={[0, -1.25, 0]}>
              <boxGeometry args={[0.15, 0.35, 0.15]} />
              <meshStandardMaterial color={0x707982} metalness={0.15} roughness={0.75} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function SignalRings() {
  const ringRefs = useRef<Array<THREE.Mesh | null>>([]);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      const progress = (time * 0.2 + index / 4) % 1;
      ring.position.y = 21.5 - progress * 21.5;
      ring.scale.setScalar(0.75 + progress * 0.65);
      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = 0.12 * (1 - progress);
    });

    if (auraRef.current) {
      const progress = (time * 0.2) % 1;
      auraRef.current.scale.setScalar(0.9 + progress * 5);
      (auraRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(progress * Math.PI) * 0.12;
    }
  });

  return (
    <group position={TOWER_POSITION}>
      {Array.from({ length: 4 }, (_, index) => (
        <mesh
          key={index}
          ref={(element) => { ringRefs.current[index] = element; }}
          position={[0, 21.5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[1.05, 0.025, 6, 64]} />
          <meshBasicMaterial
            color={0xc6edf2}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <mesh
        ref={auraRef}
        position={[0, 0.04, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.8, 0.92, 64]} />
        <meshBasicMaterial
          color={0xd8f8fb}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function BeamformingLobe() {
  const groupRef = useRef<THREE.Group>(null);
  const lobeRef = useRef<THREE.Mesh>(null);
  const raycaster = useThree((state) => state.raycaster);
  const camera = useThree((state) => state.camera);
  const target = useMemo(() => new THREE.Vector3(), []);
  const geometry = useMemo(
    () => new THREE.CylinderGeometry(1.5, 0.1, 1, 32, 1, true).rotateX(Math.PI / 2),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    raycaster.setFromCamera(pointerNdc, camera);
    if (!raycaster.ray.intersectPlane(groundPlane, target) || !groupRef.current || !lobeRef.current) return;

    groupRef.current.lookAt(target);
    const distance = ANTENNA_POSITION.distanceTo(target);
    const focus = THREE.MathUtils.clamp(5.5 / distance, 0.2, 0.65);
    lobeRef.current.scale.set(focus, focus, distance);
    lobeRef.current.position.z = distance / 2;
  });

  return (
    <group ref={groupRef} position={ANTENNA_POSITION}>
      <mesh ref={lobeRef} geometry={geometry}>
        <meshBasicMaterial
          color={0xa8e5eb}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function DataNodes() {
  const nodeRefs = useRef<Array<THREE.Mesh | null>>([]);
  const raycaster = useThree((state) => state.raycaster);
  const camera = useThree((state) => state.camera);
  const cursor = useMemo(() => new THREE.Vector3(), []);
  const nodeData = useMemo(
    () => Array.from({ length: 6 }, (_, index) => ({
      angle: (index / 6) * Math.PI * 2,
      radius: 2.3 + (index % 2) * 0.65,
      height: 12 + Math.sin(index * 2.1) * 5,
      phase: index * 1.3,
    })),
    [],
  );

  useFrame(({ clock }) => {
    raycaster.setFromCamera(pointerNdc, camera);
    if (!raycaster.ray.intersectPlane(groundPlane, cursor)) return;

    const localCursorX = cursor.x - TOWER_POSITION.x;
    const localCursorZ = cursor.z - TOWER_POSITION.z;
    const time = clock.getElapsedTime();

    nodeData.forEach((node, index) => {
      const mesh = nodeRefs.current[index];
      if (!mesh) return;
      const angle = node.angle + Math.sin(time * 0.18 + node.phase) * 0.12;
      const target = new THREE.Vector3(
        Math.cos(angle) * node.radius,
        node.height + Math.sin(time * 0.55 + node.phase) * 0.28,
        Math.sin(angle) * node.radius,
      );
      const dx = target.x - localCursorX;
      const dz = target.z - localCursorZ;
      const horizontalDistance = Math.hypot(dx, dz);

      if (horizontalDistance < 3.2) {
        const strength = (1 - horizontalDistance / 3.2) * 1.5;
        const safeDistance = Math.max(horizontalDistance, 0.01);
        target.x += (dx / safeDistance) * strength;
        target.z += (dz / safeDistance) * strength;
      }

      mesh.position.lerp(target, 0.035);
    });
  });

  return (
    <group position={TOWER_POSITION}>
      {nodeData.map((node, index) => (
        <mesh
          key={index}
          ref={(element) => { nodeRefs.current[index] = element; }}
          position={[
            Math.cos(node.angle) * node.radius,
            node.height,
            Math.sin(node.angle) * node.radius,
          ]}
        >
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial
            color={0xd9e1e6}
            metalness={0.08}
            roughness={0.32}
            transparent
            opacity={0.72}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerNdc.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame(({ camera }) => {
    const desiredX = pointerNdc.x * 0.7;
    const desiredY = 1.4 - pointerNdc.y * 0.35;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, 0.018);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, 0.018);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <hemisphereLight args={[0xe8edf2, 0x242930, 1.35]} />
      <directionalLight position={[-8, 14, 10]} intensity={2.2} />
      <directionalLight position={[8, 4, -8]} intensity={0.6} color={0xc7d4df} />
      <TowerFrame />
      <SignalRings />
      <BeamformingLobe />
      <DataNodes />
    </>
  );
}

export default function CellTowerCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 29], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      performance={{ min: 0.6 }}
    >
      <Scene />
    </Canvas>
  );
}
