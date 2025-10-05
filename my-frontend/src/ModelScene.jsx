import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { LevaPanel, useControls, useCreateStore } from 'leva';

const EXOPLANETS = [
  { name: 'Exoplanet A', r: 5, theta: 0, phi: 90, color: 'red', size: 0.5 },
  { name: 'Exoplanet B', r: 10, theta: 90, phi: 45, color: 'blue', size: 0.7 },
  { name: 'Exoplanet C', r: 15, theta: 180, phi: 135, color: 'green', size: 0.6 },
  { name: 'Exoplanet D', r: 20, theta: 270, phi: 60, color: 'purple', size: 0.8 },
  { name: 'Exoplanet E', x: 12, y: 0, z: 0, color: 'orange', size: 0.9 },
];

const Cartesian3DGrid = ({ size = 50, divisions = 10, colorCenter = '#888888', colorGrid = '#444444', planeCount = 3 }) => {
  const step = size / (planeCount - 1);

  const makeGrids = (axis, rot) => {
    const arr = [];
    for (let i = 0; i < planeCount; i++) {
      const pos = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      const position = axis === 'x' ? [pos, 0, 0] : axis === 'y' ? [0, pos, 0] : [0, 0, pos];
      arr.push(<primitive key={`${axis}-${i}`} object={grid} position={position} rotation={rot} />);
    }
    return arr;
  };

  return (
    <group>
      {makeGrids('y', [-Math.PI / 2, 0, 0])}
      {makeGrids('x', [0, Math.PI / 2, 0])}
      {makeGrids('z', [0, 0, 0])}
    </group>
  );
};

const ExoplanetScene = () => {
  const store = useCreateStore();
  const { maxDistance } = useControls({ maxDistance: { value: 25, min: 0, max: 50, step: 1 } }, { store });

  const filteredExoplanets = EXOPLANETS.filter((p) => {
    const r = p.r ?? Math.sqrt((p.x ?? 0) ** 2 + (p.y ?? 0) ** 2 + (p.z ?? 0) ** 2);
    return r <= maxDistance;
  });

  return (
    <>
      <header className="gray-box">
        Exoplanets orbiting the sun (filtered by max distance: {maxDistance} units),
        positioned using spherical coordinates on a 3D Cartesian grid.
      </header>

      {/* Simulation area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000',
          borderRadius: '10px',
          overflow: 'hidden',
          padding: '1rem',
          marginBottom: '2rem',
        }}
      >
        {/* Leva settings on right side INSIDE simulation area */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 5,
            transform: 'scale(0.9)',
            transformOrigin: 'top right',
          }}
        >
          <LevaPanel
            store={store}
            flat
            collapsed={false}
            fill={false}
            titleBar={{ title: '', drag: false }}
            theme={{
              colors: {
                elevation1: 'rgba(20,20,20,0.85)',
                highlight1: '#00bfff',
                accent1: '#00bfff',
                folderTextColor: '#ffffff',
              },
            }}
            style={{
              width: '220px',
              borderRadius: '8px',
              boxShadow: '0 0 12px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
            }}
          />
        </div>

        {/* 3D Simulation Canvas */}
        <div style={{ width: '100%', height: '70vh' }}>
          <Canvas camera={{ position: [30, 30, 30], fov: 50 }}>
            <hemisphereLight color="white" groundColor="#222222" intensity={0.5} />
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={2} color="yellow" />

            <group position={[0, 0, 0]}>
              {/* Sun */}
              <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={0.5} />
              </mesh>

              {/* Planets */}
              {filteredExoplanets.map((planet, i) => {
                const theta = (planet.theta ?? 0) * (Math.PI / 180);
                const phi = (planet.phi ?? 0) * (Math.PI / 180);
                const x = planet.x ?? planet.r * Math.cos(theta) * Math.sin(phi);
                const y = planet.y ?? planet.r * Math.cos(phi);
                const z = planet.z ?? planet.r * Math.sin(theta) * Math.sin(phi);
                return (
                  <group key={i}>
                    <mesh position={[x, y, z]}>
                      <sphereGeometry args={[planet.size, 32, 32]} />
                      <meshStandardMaterial color={planet.color} />
                    </mesh>
                    <Text position={[x, y + planet.size + 0.5, z]} fontSize={0.5} color="white" anchorX="center" anchorY="bottom">
                      {planet.name}
                    </Text>
                  </group>
                );
              })}

              {/* 3D Grid */}
              <Cartesian3DGrid size={50} divisions={10} planeCount={3} />
            </group>

            <OrbitControls makeDefault />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default ExoplanetScene;
