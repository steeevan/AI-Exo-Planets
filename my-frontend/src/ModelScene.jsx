import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

// Define a list of exoplanets with spherical coordinates (r: distance from sun, theta: azimuthal angle in degrees, phi: polar angle in degrees from zenith)
// or Cartesian coordinates (x, y, z)
const EXOPLANETS = [
  { name: 'Exoplanet A', r: 5, theta: 0, phi: 90, color: 'red', size: 0.5 }, // In XZ plane
  { name: 'Exoplanet B', r: 10, theta: 90, phi: 45, color: 'blue', size: 0.7 }, // Above XZ plane, x=0
  { name: 'Exoplanet C', r: 15, theta: 180, phi: 135, color: 'green', size: 0.6 }, // Below XZ plane
  { name: 'Exoplanet D', r: 20, theta: 270, phi: 60, color: 'purple', size: 0.8 }, // Above XZ plane, x=0
  { name: 'Exoplanet E', x: 12, y: 0, z: 0, color: 'orange', size: 0.9 }, // Cartesian input
];

// Custom 3D Cartesian grid with one plane per axis (XZ, XY, YZ) at origin, styled like the SVG coordinate system
const Cartesian3DGrid = ({ size = 50 }) => {
  // XZ plane (floor-like, at y=0): boundary only, no internal grid
  const xzPlane = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-size / 2, 0, -size / 2), // Bottom-left
      new THREE.Vector3(size / 2, 0, -size / 2),  // Bottom-right
      new THREE.Vector3(size / 2, 0, size / 2),   // Top-right
      new THREE.Vector3(-size / 2, 0, size / 2),  // Top-left
      new THREE.Vector3(-size / 2, 0, -size / 2), // Close loop
    ]);
    const material = new THREE.LineBasicMaterial({ color: '#555555', linewidth: 2 });
    return <line geometry={geometry} material={material} />;
  }, [size]);

  // XY plane (back wall-like, at z=0): boundary only
  const xyPlane = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-size / 2, -size / 2, 0),
      new THREE.Vector3(size / 2, -size / 2, 0),
      new THREE.Vector3(size / 2, size / 2, 0),
      new THREE.Vector3(-size / 2, size / 2, 0),
      new THREE.Vector3(-size / 2, -size / 2, 0),
    ]);
    const material = new THREE.LineBasicMaterial({ color: '#555555', linewidth: 2 });
    return <line geometry={geometry} material={material} />;
  }, [size]);

  // YZ plane (side wall-like, at x=0): boundary only, highlighted for Exoplanet B and D
  const yzPlane = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -size / 2, -size / 2),
      new THREE.Vector3(0, -size / 2, size / 2),
      new THREE.Vector3(0, size / 2, size / 2),
      new THREE.Vector3(0, size / 2, -size / 2),
      new THREE.Vector3(0, -size / 2, -size / 2),
    ]);
    const material = new THREE.LineBasicMaterial({ color: '#aaaaaa', linewidth: 3 }); // Highlighted
    return <line geometry={geometry} material={material} />;
  }, [size]);

  // Axis lines (X: red, Y: green, Z: blue)
  const axes = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      // X-axis (red)
      new THREE.Vector3(-size / 2, 0, 0),
      new THREE.Vector3(size / 2, 0, 0),
      // Y-axis (green)
      new THREE.Vector3(0, -size / 2, 0),
      new THREE.Vector3(0, size / 2, 0),
      // Z-axis (blue)
      new THREE.Vector3(0, 0, -size / 2),
      new THREE.Vector3(0, 0, size / 2),
    ]);
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      linewidth: 4,
    });
    geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute([
        1, 0, 0, 1, 0, 0, // X-axis: red
        0, 1, 0, 0, 1, 0, // Y-axis: green
        0, 0, 1, 0, 0, 1, // Z-axis: blue
      ], 3)
    );
    return <lineSegments geometry={geometry} material={material} />;
  }, [size]);

  return (
    <group>
      {xzPlane}
      {xyPlane}
      {yzPlane}
      {axes}
    </group>
  );
};

const ExoplanetScene = () => {
  const { maxDistance } = useControls({ maxDistance: { value: 25, min: 0, max: 50, step: 1 } });

  // Filter exoplanets, handling both spherical and Cartesian coordinates
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
        Exoplanets orbiting the sun (filtered by max distance: {maxDistance} units), positioned using spherical or Cartesian coordinates on a 3D Cartesian grid.
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

          {/* Render filtered exoplanets using spherical or Cartesian coordinates */}
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

          {/* 3D Cartesian grid styled like the SVG coordinate system */}
          <Cartesian3DGrid size={50} />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
};

export default ExoplanetScene;