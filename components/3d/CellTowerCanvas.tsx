'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Ring, Line, Sphere, Trail } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Global state for cursor interaction
const cursorState = {
  position: new THREE.Vector3(0, 0, 0),
  screenPosition: new THREE.Vector2(0, 0),
  isClicking: false,
  clickTime: 0
};

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Enhanced 5G Cell Tower with realistic details
function CellTower() {
  const towerRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!towerRef.current) return;
    // Subtle tower sway
    towerRef.current.rotation.y = -Math.PI / 6 + Math.sin(clock.getElapsedTime() * 0.3) * 0.04;
    
    // Blinking aviation light
    if (beaconRef.current) {
      const blink = Math.sin(clock.getElapsedTime() * 3) > 0;
      beaconRef.current.material.opacity = blink ? 1 : 0.2;
    }
  });

  return (
    <group ref={towerRef} position={[8.5, -6.5, -5]}>
      {/* Main tower structure - more realistic lattice */}
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.12, 0.35, 13, 8]} />
        <meshStandardMaterial color="#26394A" metalness={0.7} roughness={0.35} wireframe />
      </mesh>

      {/* Massive MIMO AAU Panels - 3 directions with more detail */}
      {[0, 120, 240].map((angle) => {
        const rad = THREE.MathUtils.degToRad(angle);
        return (
          <group key={angle} position={[Math.sin(rad) * 0.8, 10.5, Math.cos(rad) * 0.8]} rotation={[0, -rad, 0]}>
            {/* Main AAU panel */}
            <mesh>
              <boxGeometry args={[0.35, 2.4, 0.16]} />
              <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.95} />
            </mesh>
            {/* AAU detail lines */}
            {[0.2, 0, -0.2].map((y, i) => (
              <mesh key={i} position={[0, y, 0.09]}>
                <boxGeometry args={[0.3, 0.02, 0.01]} />
                <meshStandardMaterial color="#003344" />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Microwave Backhaul Dish */}
      <mesh position={[1.2, 8, 0]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <paraboloidGeometry args={[0.4, 0.15, 32]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[1.35, 8, 0.1]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#808080" />
      </mesh>

      {/* Aviation Warning Light - blinking */}
      <mesh ref={beaconRef} position={[0, 12, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#FF007A" transparent opacity={1} />
      </mesh>
      
      {/* Base platform */}
      <mesh position={[0, -2.6, 0]}>
        <cylinderGeometry args={[1.4, 1.8, 0.5, 8]} />
        <meshStandardMaterial color="#111820" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Orbiting 3D Data Orbs
function DataOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  const orbsRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    
    // Orbital animation
    groupRef.current.children.forEach((orb, i) => {
      const angle = t * 0.5 + (i * Math.PI * 2) / 6;
      const radius = 3 + Math.sin(t + i) * 0.5;
      orb.position.x = Math.cos(angle) * radius;
      orb.position.z = Math.sin(angle) * radius;
      orb.position.y = 8 + Math.sin(t * 2 + i) * 1.5;
      
      // Signal response when cursor is near
      const orbMesh = orb as THREE.Mesh;
      const distance = cursorState.position.distanceTo(orbMesh.position);
      if (distance < 5) {
        orbMesh.material.emissiveIntensity = 2 + (5 - distance) * 0.5;
      } else {
        orbMesh.material.emissiveIntensity = 0.5;
      }
    });
  });

  const orbColors = ['#00F0FF', '#00FF88', '#8B5CF6', '#FF007A', '#FFAA00', '#00DDFF'];

  return (
    <group ref={groupRef} position={[8.5, -6.5, -5]}>
      {orbColors.map((color, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) orbsRef.current[i] = el; }}
          position={[3, 8, 0]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

// RF Grid Mesh with Cursor Ripple Displacement
function RFGridMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPositions = useRef<Float32Array>();

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      originalPositions.current = geometry.attributes.position.array.slice();
    }
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !originalPositions.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array;
    const original = originalPositions.current;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      const z = original[i + 2];
      
      // Base wave animation
      const baseWave = Math.sin(x * 0.5 + time) * 0.2 + Math.cos(y * 0.3 + time * 0.8) * 0.15;
      
      // Cursor ripple effect
      const worldPos = new THREE.Vector3(x, y, z);
      const distance = cursorState.position.distanceTo(worldPos);
      const ripple = distance < 8 ? Math.sin(distance * 2 - time * 5) * Math.exp(-distance * 0.3) * 0.5 : 0;
      
      positions[i + 2] = original[i + 2] + baseWave + ripple;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[40, 40, 50, 50]} />
      <meshStandardMaterial 
        color="#00F0FF" 
        wireframe 
        transparent 
        opacity={0.15}
        emissive="#00F0FF"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Real-time Cursor 3D Signal Emitter
function CursorSignalEmitter() {
  const groupRef = useRef<THREE.Group>(null);
  const phases = useMemo(() => [0, 0.2, 0.4, 0.6], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    
    // Update position based on cursor
    groupRef.current.position.copy(cursorState.position);
    
    // Animate signal rings
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const progress = (t * 0.5 + phases[i]) % 1;
      const scale = 0.5 + progress * 8;
      mesh.scale.setScalar(scale);
      if (mesh.material && 'opacity' in mesh.material) {
        (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 * (1 - progress));
      }
    });
  });

  return (
    <group ref={groupRef}>
      {phases.map((_, i) => (
        <Ring key={i} args={[0.5, 0.6, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#00F0FF" : "#00FF88"} 
            transparent 
            opacity={0.8} 
            side={THREE.DoubleSide} 
          />
        </Ring>
      ))}
    </group>
  );
}

// Cursor Beamforming Laser
function BeamformingLaser() {
  const lineRef = useRef<THREE.Line>(null);
  const towerPosition = useMemo(() => new THREE.Vector3(8.5, 4, -5), []);

  useFrame(() => {
    if (!lineRef.current) return;
    
    const positions = lineRef.current.geometry.attributes.position.array;
    
    // Start from cursor
    positions[0] = cursorState.position.x;
    positions[1] = cursorState.position.y;
    positions[2] = cursorState.position.z;
    
    // End at tower
    positions[3] = towerPosition.x;
    positions[4] = towerPosition.y;
    positions[5] = towerPosition.z;
    
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([0, 0, 0, 0, 0, 0])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00F0FF" transparent opacity={0.6} linewidth={2} />
    </line>
  );
}

// 5G Burst Click Effect
function ClickBurstEffect() {
  const groupRef = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);
  const startTime = useRef(0);

  useEffect(() => {
    const handleClick = () => {
      setActive(true);
      startTime.current = performance.now();
      cursorState.isClicking = true;
      cursorState.clickTime = performance.now();
    };
    
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    if (active) {
      const elapsed = (performance.now() - startTime.current) / 1000;
      if (elapsed > 1) {
        setActive(false);
        cursorState.isClicking = false;
      }
      
      groupRef.current.position.copy(cursorState.position);
      groupRef.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const scale = elapsed * 15;
        mesh.scale.setScalar(scale);
        if (mesh.material && 'opacity' in mesh.material) {
          (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - elapsed);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {active && (
        <>
          <Sphere args={[0.5, 32, 32]}>
            <meshBasicMaterial color="#FF007A" transparent opacity={1} />
          </Sphere>
          {[0, 60, 120].map((angle, i) => (
            <Ring key={i} args={[0.8, 1, 64]} rotation={[Math.PI / 2, angle * Math.PI / 180, 0]}>
              <meshBasicMaterial color="#00F0FF" transparent opacity={1} />
            </Ring>
          ))}
        </>
      )}
    </group>
  );
}

// 360° Free Camera Orbit System
function CameraOrbit() {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const spherical = useRef(new THREE.Spherical(24, Math.PI / 3, 0));
  const target = useRef(new THREE.Vector3(8.5, 0, -5));

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor state for all effects
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      cursorState.screenPosition.set(x, y);
      
      // Unproject to 3D world space
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      cursorState.position.copy(pos);

      if (!isDragging.current) return;

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      spherical.current.theta -= deltaX * 0.005;
      spherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi + deltaY * 0.005));

      spherical.current.makeUnsafe();
      camera.position.setFromSpherical(spherical.current).add(target.current);
      camera.lookAt(target.current);

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [camera]);

  return null;
}

// Original Signal Waves (upgraded)
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

export default function CellTowerCanvas() {
  const { metrics, checkDeviceCapabilities } = usePerformanceMonitor();
  const { isMobile, shouldReduceEffects } = checkDeviceCapabilities();
  const reducedMotion = prefersReducedMotion();

  // Adjust quality based on device capabilities
  const pixelRatio = shouldReduceEffects ? 1 : Math.min(window.devicePixelRatio, 2);
  const antialias = !shouldReduceEffects;
  const powerPreference = shouldReduceEffects ? 'low-power' : 'high-performance';

  return (
    <div className="pointer-events-auto fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 24], fov: 55 }}
        dpr={[1, pixelRatio]}
        gl={{ antialias, alpha: true, powerPreference }}
      >
        <ambientLight color="#172033" intensity={1.4} />
        <directionalLight color="#00F0FF" intensity={1.3} position={[-8, 12, 10]} />
        <pointLight color="#FF007A" intensity={2.5} distance={70} position={[11, 9, 5]} />
        
        <CameraOrbit />
        <RFGridMesh />
        <CellTower />
        <DataOrbs />
        <SignalWaves />
        {!reducedMotion && !shouldReduceEffects && (
          <>
            <CursorSignalEmitter />
            <BeamformingLaser />
            <ClickBurstEffect />
          </>
        )}
      </Canvas>
    </div>
  );
}
