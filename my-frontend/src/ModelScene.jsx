import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

// Define a list of exoplanets with spherical coordinates (r: distance from sun, theta: azimuthal angle in degrees, phi: polar angle in degrees from zenith)
const EXOPLANETS = [
  { name: 'Exoplanet A', r: 5, theta: 0, phi: 90, color: 'red', size: 0.5 }, // In XZ plane
  { name: 'Exoplanet B', r: 10, theta: 90, phi: 45, color: 'blue', size: 0.7 }, // Above XZ plane
  { name: 'Exoplanet C', r: 15, theta: 180, phi: 135, color: 'green', size: 0.6 }, // Below XZ plane
  { name: 'Exoplanet D', r: 20, theta: 270, phi: 60, color: 'purple', size: 0.8 }, // Above XZ plane
  { name: 'Exoplanet E', x: 12, y: 0, z: 0, color: 'orange', size: 0.9 }, // Cartesian input
];

// Custom 3D Cartesian grid with three sets of perpendicular planes, evenly distributed
const Cartesian3DGrid = ({ size = 50, divisions = 10, colorCenter = '#888888', colorGrid = '#444444', planeCount = 3 }) => {
  const step = size / (planeCount - 1); // Spacing between parallel planes

  // XZ planes (floor-like, parallel to XZ, varying Y)
  const xzGrids = useMemo(() => {
    const grids = [];
    for (let i = 0; i < planeCount; i++) {
      const y = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      grids.push(<primitive key={`xz-${i}`} object={grid} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} />);
    }
    return grids;
  }, [size, divisions, colorCenter, colorGrid, planeCount]);

  // XY planes (back wall-like, parallel to XY, varying Z)
  const xyGrids = useMemo(() => {
    const grids = [];
    for (let i = 0; i < planeCount; i++) {
      const z = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      grids.push(<primitive key={`xy-${i}`} object={grid} position={[0, 0, z]} />);
    }
    return grids;
  }, [size, divisions, colorCenter, colorGrid, planeCount]);

  // YZ planes (side wall-like, parallel to YZ, varying X)
  const yzGrids = useMemo(() => {
    const grids = [];
    for (let i = 0; i < planeCount; i++) {
      const x = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      grids.push(<primitive key={`yz-${i}`} object={grid} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} />);
    }
    return grids;
  }, [size, divisions, colorCenter, colorGrid, planeCount]);

  return (
    <group>
      {xzGrids}
      {xyGrids}
      {yzGrids}
    </group>
  );
};

const ExoplanetScene = () => {
  const { maxDistance } = useControls({ maxDistance: { value: 25, min: 0, max: 50, step: 1 } });

  const filteredExoplanets = EXOPLANETS.filter(planet => {
    if (planet.r !== undefined) {
      return planet.r <= maxDistance;
    } else if (planet.x !== undefined && planet.y !== undefined && planet.z !== undefined) {
      const r = Math.sqrt(planet.x * planet.x + planet.y * planet.y + planet.z * planet.z);
      return r <= maxDistance;
    }
    return false; // Exclude planets with invalid coordinates
  });

  return (
    <>
      <header>
        Exoplanets orbiting the sun (filtered by max distance: {maxDistance} units), positioned using spherical coordinates on a 3D Cartesian grid.
      </header>
      <Canvas camera={{ position: [30, 30, 30], fov: 50 }} style={{ height: "80vh", backgroundColor: "#000000" }}>
        <hemisphereLight color="white" groundColor="#222222" intensity={0.5} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} color="yellow" /> {/* Sun light */}

        <group position={[0, 0, 0]}>
          {/* Sun at the center */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={0.5} />
          </mesh>

          {/* Render filtered exoplanets using spherical to Cartesian conversion */}
          {filteredExoplanets.map((planet, index) => {
            let x, y, z;
            if (planet.x !== undefined && planet.y !== undefined && planet.z !== undefined) {
              x = planet.x;
              y = planet.y;
              z = planet.z;
            } else {
              const theta = planet.theta * (Math.PI / 180); // Convert degrees to radians
              const phi = planet.phi * (Math.PI / 180); // Convert degrees to radians
              // Spherical coordinates formulas:
              // Forward conversion (r, theta, phi to x, y, z):
              // x = r * cos(theta) * sin(phi)
              // y = r * cos(phi)
              // z = r * sin(theta) * sin(phi)
              // Inverse conversion (x, y, z to r, theta, phi):
              // r = sqrt(x^2 + y^2 + z^2)
              // phi = acos(y / r)  // Range [0, π] radians, or [0, 180] degrees
              // theta = atan2(z, x)  // Range [-π, π] radians, or [-180, 180] degrees
              x = planet.r * Math.cos(theta) * Math.sin(phi);
              y = planet.r * Math.cos(phi);
              z = planet.r * Math.sin(theta) * Math.sin(phi);
            }
            return (
              <group key={index}>
                <mesh position={[x, y, z]}>
                  <sphereGeometry args={[planet.size, 32, 32]} />
                  <meshStandardMaterial color={planet.color} />
                </mesh>
                {/* Label for the exoplanet name */}
                <Text
                  position={[x, y + planet.size + 0.5, z]}
                  fontSize={0.5}
                  color="white"
                  anchorX="center"
                  anchorY="bottom"
                >
                  {planet.name}
                </Text>
              </group>
            );
          })}

          {/* 3D Cartesian grid with evenly distributed planes */}
          <Cartesian3DGrid size={50} divisions={10} planeCount={3} />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ExoplanetScene;