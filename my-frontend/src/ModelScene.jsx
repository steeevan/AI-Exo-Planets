import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { LevaPanel, useControls, useCreateStore } from 'leva';

// Define a list of exoplanets with spherical coordinates (r: distance from sun, theta, phi)
const EXOPLANETS = [
  { name: 'Exoplanet A', r: 5, theta: 0, phi: 90, color: 'red', size: 0.5 },
  { name: 'Exoplanet B', r: 10, theta: 90, phi: 45, color: 'blue', size: 0.7 },
  { name: 'Exoplanet C', r: 15, theta: 180, phi: 135, color: 'green', size: 0.6 },
  { name: 'Exoplanet D', r: 20, theta: 270, phi: 60, color: 'purple', size: 0.8 },
  { name: 'Exoplanet E', x: 12, y: 0, z: 0, color: 'orange', size: 0.9 },
];

// 3D grid
const Cartesian3DGrid = ({ size = 50, divisions = 10, colorCenter = '#888888', colorGrid = '#444444', planeCount = 3 }) => {
  const step = size / (planeCount - 1);

  const xzGrids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < planeCount; i++) {
      const y = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      arr.push(<primitive key={`xz-${i}`} object={grid} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} />);
    }
    return arr;
  }, [size, divisions, colorCenter, colorGrid, planeCount]);

  const xyGrids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < planeCount; i++) {
      const z = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      arr.push(<primitive key={`xy-${i}`} object={grid} position={[0, 0, z]} />);
    }
    return arr;
  }, [size, divisions, colorCenter, colorGrid, planeCount]);

  const yzGrids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < planeCount; i++) {
      const x = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      arr.push(<primitive key={`yz-${i}`} object={grid} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} />);
    }
    return arr;
  }, [size, divisions, colorCenter, colorGrid, planeCount]);

  return <group>{xzGrids}{xyGrids}{yzGrids}</group>;
};

const ExoplanetScene = () => {
  // 1) Create a local Leva store and 2) bind useControls to it
  const store = useCreateStore();
  const { maxDistance } = useControls(
    { maxDistance: { value: 25, min: 0, max: 50, step: 1 } },
    { store }
  );

  const filteredExoplanets = EXOPLANETS.filter(p => {
    if (p.r !== undefined) return p.r <= maxDistance;
    if (p.x !== undefined && p.y !== undefined && p.z !== undefined) {
      const r = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
      return r <= maxDistance;
    }
    return false;
  });

  return (
    <>
      <header className='gray-box'>
        Exoplanets orbiting the sun (filtered by max distance: {maxDistance} units), positioned using spherical coordinates on a 3D Cartesian grid.
      </header>

      {/* Simulation wrapper */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          backgroundColor: '#000000',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        {/* 3) Render LevaPanel INSIDE the wrapper with the SAME store */}
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
          <LevaPanel
            store={store}
            titleBar={{ title: 'Settings For Simulation', drag: false }} // fixed, not draggable
            collapsed={true}
            fill={false}
          />
        </div>

        <Canvas camera={{ position: [30, 30, 30], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <hemisphereLight color="white" groundColor="#222222" intensity={0.5} />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={2} color="yellow" />

          <group position={[0, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.5, 32, 32]} />
              <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={0.5} />
            </mesh>

            {filteredExoplanets.map((planet, i) => {
              let x, y, z;
              if (planet.x !== undefined) {
                ({ x, y, z } = planet);
              } else {
                const theta = planet.theta * (Math.PI / 180);
                const phi = planet.phi * (Math.PI / 180);
                x = planet.r * Math.cos(theta) * Math.sin(phi);
                y = planet.r * Math.cos(phi);
                z = planet.r * Math.sin(theta) * Math.sin(phi);
              }
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

            <Cartesian3DGrid size={50} divisions={10} planeCount={3} />
          </group>

          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </>
  );
};

export default ExoplanetScene;
