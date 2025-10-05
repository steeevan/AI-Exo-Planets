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
    <directionalLight ref={lightRef} intensity={1} />
  );
};

const ModelScene = () => {
  const { model } = useControls({ model: { value: 'Beech', options: Object.keys(MODELS) } })

  return (
    // <Canvas style={{ height: "80vh", border: "2px solid black", backgroundColor: "black" }}>
    //   <CameraLight />
    //   <ambientLight intensity={0.4} />

    //   <Cube position={[-2, 0, 0]} size={[1, 1, 1]} color="tomato" />
    //   {/* <Sphere position={[0, 0, 0]} radius={0.75} color="skyblue" /> */}
    //   <Triangle3D position={[2, 0, 0]} color="orange" />
    //   <Sun position={[0, 2, 0]} />
    //   <OrbitControls />
    // </Canvas>

    <>
      <header>
        Exoplanets orbiting the sun (filtered by max distance: {maxDistance} units), positioned using spherical coordinates on a 3D Cartesian grid.
      </header>
      <Canvas camera={{ position: [-10, 10, 40], fov: 50 }} style={{ height: "80vh", backgroundColor: "#f0f0f0" }}>
        <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
        <ambientLight intensity={0.9} />
        <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
        <group position={[0, -10, 0]}>
          <Suspense fallback={<status.In>Loading ...</status.In>}>
            <Model position={[0, 0.25, 0]} url={MODELS[model]} />
          </Suspense>
          <ContactShadows scale={20} blur={10} far={20} />
        </group>
        <OrbitControls />
      </Canvas>
    </>
  );
};


function Model({ url, ...props }) {
  // useDeferredValue allows us to defer updates, the component is market by React
  // so that it does *not* run into the fallback when something new loads
  const deferred = useDeferredValue(url)
  // We can find out the loading state by comparing the current value with the deferred value
  // const isLoading = url !== deferred
  const { scene } = useGLTF(deferred)
  // <primitive object={...} mounts an already existing object
  return <primitive object={scene} {...props} />
}

// Uncomment in order to silently pre-load all models
Object.values(MODELS).forEach(useGLTF.preload)

export default ModelScene;
