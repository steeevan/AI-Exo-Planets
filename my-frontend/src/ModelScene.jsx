import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei';
import { useRef, useState, Suspense, useDeferredValue } from 'react';
import { useControls, useCreateStore, LevaPanel } from 'leva'; // 👈 added store + panel
import tunnel from 'tunnel-rat';

const status = tunnel()

const MODELS = {
  Beech: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf',
  Lime: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf',
  Spruce: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf'
}

const Cube = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.75;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, radius = 1, color = 'skyblue' }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Triangle3D = ({ position, color = 'orange' }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <tetrahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sun = ({ position = [0, 2, 0], coreRadius = 0.5, rayLength = 0.4, rayCount = 12 }) => {
  const groupRef = useRef();

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.3; // Slowly rotate the whole sun
  });

  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (i / rayCount) * Math.PI * 2;
    const distance = coreRadius + rayLength / 2;

    // Calculate ray position in circle around origin (XZ plane)
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;

    // Create a ref to rotate cone to point outward
    const rayRef = useRef();

    useFrame(() => {
      if (rayRef.current) {
        rayRef.current.lookAt(0, 0, 0); // Point toward the center
        rayRef.current.rotateX(Math.PI); // Flip to point outward
      }
    });

    return (
      <mesh
        key={i}
        ref={rayRef}
        position={[x, 0, z]} // placed on XZ circle
      >
        <coneGeometry args={[0.1, rayLength, 8]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
    );
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Sun core */}
      <mesh>
        <sphereGeometry args={[coreRadius, 32, 32]} />
        <meshStandardMaterial emissive="yellow" emissiveIntensity={1.5} color="gold" />
        <pointLight position={position} intensity={1.5} color="yellow" />
      </mesh>

      {/* Rays */}
      {rays}
    </group>
  );
};


const CameraLight = () => {
  const { camera } = useThree();
  const lightRef = useRef();

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <directionalLight ref={lightRef} intensity={1} />
  );
};

const ModelScene = () => {
  // ─────────────────────────────────────────────────────────────────────────────
  // Leva: use a dedicated store so we can render the panel inline (not fixed)
  // ─────────────────────────────────────────────────────────────────────────────
  const store = useCreateStore();

  // Keep your existing control for "model", and add a few more useful knobs.
  const { model, camDist, fov, lightIntensity, bg, modelScale, autoRotate } = useControls(
    'Scene',
    {
      model: { value: 'Beech', options: Object.keys(MODELS) },
      camDist: { value: 40, min: 10, max: 80, step: 1 },     // camera distance (z)
      fov: { value: 50, min: 20, max: 90, step: 1 },         // camera field of view
      lightIntensity: { value: 0.9, min: 0, max: 3, step: 0.1 }, // ambient/scene light
      bg: { value: '#f0f0f0' },                              // background color
      modelScale: { value: 1, min: 0.2, max: 3, step: 0.1 }, // uniform scale for the model
      autoRotate: { value: false },                          // OrbitControls auto-rotate
    },
    { store }
  );

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
        This is a {model.toLowerCase()} tree.
        <br />
        <status.Out />
      </header>

      {/* Relative wrapper so we can pin the LevaPanel at the Canvas’ top-right */}
      <div style={{ position: 'relative', height: '80vh', borderRadius: 12, overflow: 'hidden', backgroundColor: bg }}>
        {/* Inline (non-fixed) Leva panel aligned to the image’s top-right */}
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <LevaPanel store={store} fill titleBar={false} />
        </div>

        <Canvas camera={{ position: [-10, 10, camDist], fov }} style={{ height: '100%', width: '100%' }}>
          {/* Set Canvas background color (matches the wrapper) */}
          <color attach="background" args={[bg]} />

          <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
          <ambientLight intensity={lightIntensity} />
          <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />

          <group position={[0, -10, 0]} scale={modelScale}>
            <Suspense fallback={<status.In>Loading ...</status.In>}>
              <Model position={[0, 0.25, 0]} url={MODELS[model]} />
            </Suspense>
            <ContactShadows scale={20} blur={10} far={20} />
          </group>

          <OrbitControls autoRotate={autoRotate} autoRotateSpeed={0.6} />
        </Canvas>
      </div>
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
