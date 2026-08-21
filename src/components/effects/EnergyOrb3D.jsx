import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Core() {
  const shell = useRef(null);
  const core = useRef(null);
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.x += delta * 0.04;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.2;
      const t = state.clock.getElapsedTime();
      const pulse = 1 + Math.sin(t * 1.6) * 0.04;
      core.current.scale.setScalar(pulse);
    }
    if (group.current) {
      pointer.current.x = state.pointer.x;
      pointer.current.y = state.pointer.y;
      group.current.rotation.y += (pointer.current.x * 0.25 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-pointer.current.y * 0.15 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 2]} />
        <meshStandardMaterial
          color="#4ca771"
          emissive="#6cc18d"
          emissiveIntensity={0.9}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#e8f5ec" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function EnergyOrb3D() {
  return (
    <Canvas
      className="energy-orb-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 3]} intensity={22} color="#6cc18d" />
      <pointLight position={[-3, -2, -2]} intensity={10} color="#143a2c" />
      <Suspense fallback={null}>
        <Core />
      </Suspense>
    </Canvas>
  );
}
