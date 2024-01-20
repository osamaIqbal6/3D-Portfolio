import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={1.95} groundColor="white" />
      <pointLight intensity={5} />
      <spotLight position={[-20, 50, 10]} intensity={5} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.1 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.75, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setisMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width : 500px)");
    setisMobile(media.matches);

    const handlechange = (event) => {
      setisMobile(event.matches);
    };

    media.addEventListener("change", handlechange);

    return () => media.removeEventListener("change", handlechange);
  }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />;
    </Canvas>
  );
};

export default ComputersCanvas;
