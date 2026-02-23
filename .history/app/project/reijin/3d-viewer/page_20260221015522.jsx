"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "@react-three/drei";

function DisplayStandModel() {
  const group = useRef();
  const obj = useLoader(OBJLoader, "/project/Reijin/poster-1/advertising_display_stand_mockup_03.obj");

  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]} scale={0.08}>
      <primitive object={obj} />
    </group>
  );
}

/**
 * Standalone 3D viewer page — loaded in iframe to avoid WebGL context
 * conflicts with HeaderBackgroundDistortion on the parent page.
 */
export default function Reijin3DViewerPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 80], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-10, 5, -10]} intensity={0.4} />
        <Suspense fallback={null}>
          <DisplayStandModel />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={40}
            maxDistance={120}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
