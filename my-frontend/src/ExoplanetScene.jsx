import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Leva, useControls } from 'leva';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Define a list of exoplanets with spherical coordinates (distanceR: distance from sun, theta: azimuthal angle in degrees, phi: polar angle in degrees from zenith)
const EXOPLANETS_ONE = [
  { planetName: 'Exoplanet A', distanceR: 5, theta: 0, phi: 90, color: 'red', planetRadiusSize: 0.5 }, // In XZ plane
  { planetName: 'Exoplanet B', distanceR: 10, theta: 90, phi: 45, color: 'blue', planetRadiusSize: 0.7 }, // Above XZ plane
  { planetName: 'Exoplanet C', distanceR: 15, theta: 180, phi: 135, color: 'green', planetRadiusSize: 0.6 }, // Below XZ plane
  { planetName: 'Exoplanet D', distanceR: 20, phi: 60, color: 'purple', planetRadiusSize: 0.8 }, // Above XZ plane
  { planetName: 'Exoplanet E', x: 12, y: 10, z: 0, color: 'orange', planetRadiusSize: 0.9 }, // Cartesian input
];

// Custom 3D Cartesian grid with three sets of perpendicular planes, evenly distributed
const Cartesian3DGrid = ({ size = 50, divisions = 10, colorCenter = '#888888', colorGrid = '#444444', planeCount = 3, showLabels = true }) => {
  const step = size / (planeCount - 1); // Spacing between parallel planes
  const labelSize = 1;
  const labelColor = 'white';
  const labelStep = size / divisions; // Distance between labels on grid lines

  // XZ planes (floor-like, parallel to XZ, varying Y)
  const xzGrids = useMemo(() => {
    const grids = [];
    for (let i = 0; i < planeCount; i++) {
      const y = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      const labels = showLabels && Math.abs(y) < 0.001 ? ( // Only show labels for plane at Y=0
        <>
          {/* Labels along X-axis where Z=0 */}
          {[...Array(divisions + 1)].map((_, idx) => {
            const x = -size / 2 + idx * labelStep;
            return (
              <Text
                key={`xz-x-${i}-${idx}`}
                position={[x, y + 0.1, 0]}
                fontSize={labelSize}
                color={labelColor}
                anchorX="center"
                anchorY="bottom"
              >
                {x.toFixed(0)}
              </Text>
            );
          })}
        </>
      ) : null;
      grids.push(
        <group key={`xz-${i}`}>
          <primitive object={grid} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          {labels}
        </group>
      );
    }
    return grids;
  }, [size, divisions, colorCenter, colorGrid, planeCount, showLabels]);

  // XY planes (back wall-like, parallel to XY, varying Z)
  const xyGrids = useMemo(() => {
    const grids = [];
    for (let i = 0; i < planeCount; i++) {
      const z = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      const labels = showLabels && Math.abs(z) < 0.001 ? ( // Only show labels for plane at Z=0
        <>
          {/* Labels along X-axis where Y=0 */}
          {[...Array(divisions + 1)].map((_, idx) => {
            const x = -size / 2 + idx * labelStep;
            return (
              <Text
                key={`xy-x-${i}-${idx}`}
                position={[x, 0, z + 0.1]}
                fontSize={labelSize}
                color={labelColor}
                anchorX="center"
                anchorY="top"
              >
                {x.toFixed(0)}
              </Text>
            );
          })}
          {/* Labels along Y-axis where X=0 */}
          {[...Array(divisions + 1)].map((_, idx) => {
            const y = -size / 2 + idx * labelStep;
            return (
              <Text
                key={`xy-y-${i}-${idx}`}
                position={[0, y, z + 0.1]}
                fontSize={labelSize}
                color={labelColor}
                anchorX="right"
                anchorY="middle"
              >
                {y.toFixed(0)}
              </Text>
            );
          })}
        </>
      ) : null;
      grids.push(
        <group key={`xy-${i}`}>
          <primitive object={grid} position={[0, 0, z]} />
          {labels}
        </group>
      );
    }
    return grids;
  }, [size, divisions, colorCenter, colorGrid, planeCount, showLabels]);

  // YZ planes (side wall-like, parallel to YZ, varying X)
  const yzGrids = useMemo(() => {
    const grids = [];
    for (let i = 0; i < planeCount; i++) {
      const x = -size / 2 + i * step;
      const grid = new THREE.GridHelper(size, divisions, colorCenter, colorGrid);
      const labels = showLabels && Math.abs(x) < 0.001 ? ( // Only show labels for plane at X=0
        <>
          {/* Labels along Y-axis where Z=0 */}
          {[...Array(divisions + 1)].map((_, idx) => {
            const y = -size / 2 + idx * labelStep;
            return (
              <Text
                key={`yz-y-${i}-${idx}`}
                position={[x + 0.1, y, 0]}
                fontSize={labelSize}
                color={labelColor}
                anchorX="left"
                anchorY="middle"
              >
                {y.toFixed(0)}
              </Text>
            );
          })}
        </>
      ) : null;
      grids.push(
        <group key={`yz-${i}`}>
          <primitive object={grid} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
          {labels}
        </group>
      );
    }
    return grids;
  }, [size, divisions, colorCenter, colorGrid, planeCount, showLabels]);

  return (
    <group>
      {xzGrids}
      {xyGrids}
      {yzGrids}
    </group>
  );
};

const ExoplanetScene = ({ fileContent }) => {
  const [exoplanets, setExoplanets] = useState(fileContent || EXOPLANETS_ONE);
  const [invalidPlanetNames, setInvalidPlanetNames] = useState([]);
  const { maxDistance, showGridLabels } = useControls({
    maxDistance: { value: 10000000, min: 0, max: 20000000, step: 1000 },
    showGridLabels: { value: true, label: 'Show Grid Labels' },
  });

  useEffect(() => {
    const source = fileContent || EXOPLANETS_ONE;
    const invalidPlanets = [];
    const filteredExoplanets = source.filter(planet => {
      if (planet.distanceR !== undefined) {
        const largestDistanceR = 516023463.75;
        const xx = 3000000000 / 100;
        const G = 1500;
        const dFirstLog = Math.log(1 + (Math.abs(planet.distanceR) / xx));
        const dSecondlog = Math.log(1 + (largestDistanceR / xx))
        const planetNewDistance = G * (Math.sign(planet.distanceR) * (dFirstLog / dSecondlog));
        return planetNewDistance <= maxDistance;
      } else if (planet.x !== undefined && planet.y !== undefined && planet.z !== undefined) {
        const r = Math.sqrt(planet.x * planet.x + planet.y * planet.y + planet.z * planet.z);
        return r <= maxDistance;
      }
      invalidPlanets.push(planet.planetName || 'Unnamed Planet');
      return false;
    });
    setInvalidPlanetNames(invalidPlanets);
    setExoplanets(filteredExoplanets);
  }, [fileContent, maxDistance]);

  return (
    <>
      {/* Header */}
      <header className="px-6 pt-4 text-center text-white">
        <h2 className="text-xl font-semibold">
          Exoplanets Orbiting the Sun
        </h2>
        <p className="text-sm mt-1 text-gray-300">
          Filtered by max distance: <span className="font-medium">{maxDistance}</span> units,
          positioned using spherical coordinates on a 3D Cartesian grid.
        </p>
      </header>

      {/* Invalid Planets */}
      {invalidPlanetNames && invalidPlanetNames.length > 0 && (
        <section className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-md mx-6 text-left">
          <h3 className="font-semibold mb-2">Exoplanets with invalid coordinates:</h3>
          <ul className="list-disc list-inside text-sm">
            {invalidPlanetNames.map((planet, idx) => (
              <li key={idx}>{planet}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Scene Container */}
      <div className="flex flex-col items-center max-w-screen-xl p-4">
        <div className="w-full rounded-md overflow-hidden shadow-lg">
          <Canvas
            camera={{ position: [30, 30, 30], fov: 50 }}
            style={{ height: "80vh", backgroundColor: "#000000" }}
          >
            <hemisphereLight color="white" groundColor="#222222" intensity={0.5} />
            <ambientLight intensity={0.3} />
            <pointLight position={[0, 0, 0]} intensity={2} color="yellow" />

            <group position={[0, 0, 0]}>
              {/* Sun */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[10, 32, 32]} />
                <meshStandardMaterial color="yellow" emissive="orange" emissiveIntensity={1} toneMapped={false} />
              </mesh>

              {/* Exoplanets */}
              {exoplanets.map((planet, index) => {
                const largestDistanceR = 516023463.75;
                const xx = 3000000000 / 100;
                let x, y, z;
                if (planet.x !== undefined && planet.y !== undefined && planet.z !== undefined) {
                  x = planet.x;
                  y = planet.y;
                  z = planet.z;
                } else {
                  const theta = (planet.theta ?? 0) * (Math.PI / 180);
                  const phi = planet.phi * (Math.PI / 180);

                  const G = 1500;
                  const dFirstLog = Math.log(1 + (Math.abs(planet.distanceR) / xx));
                  const dSecondlog = Math.log(1 + (largestDistanceR / xx))
                  const planetNewDistance = G * (Math.sign(planet.distanceR) * dFirstLog / dSecondlog);
                  x = planetNewDistance * Math.cos(theta) * Math.sin(phi);
                  y = planetNewDistance * Math.cos(phi);
                  z = planetNewDistance * Math.sin(theta) * Math.sin(phi);
                }

                const planetLargestRadius = 77.342;
                const rMin = 0.1;
                const rMax = 5;
                const rFirstLog = Math.log(1 + (planet.planetRadiusSize / xx));
                const rSecondLog = Math.log(1 + (planetLargestRadius / xx));
                const planetNewSize = rMin + ((rMax - rMin) * (rFirstLog / rSecondLog));

                return (
                  <group key={index}>
                    <mesh position={[x, y, z]}>
                      <sphereGeometry args={[planetNewSize, 32, 32]} />
                      <meshStandardMaterial color={planet.color} />
                    </mesh>
                    <Text
                      position={[x, y + planetNewSize + 0.5, z]}
                      fontSize={0.5}
                      color="white"
                      anchorX="center"
                      anchorY="bottom"
                    >
                      {planet.planetName}
                    </Text>
                  </group>
                );
              })}

              {/* Grid */}
              <Cartesian3DGrid size={3000} divisions={300} planeCount={3} showLabels={showGridLabels} />
            </group>

            <EffectComposer>
              <Bloom
                intensity={2}
                // radius={0.7}
                luminanceThreshold={0.3}
              />
            </EffectComposer>
            <OrbitControls />
          </Canvas>
        </div>
        <div className="w-full max-w-xs mt-4"></div>
      </div>
      <Leva />
    </>
  );
};

export default ExoplanetScene;