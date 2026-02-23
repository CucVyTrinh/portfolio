"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

function DisplayStandModel() {
  const group = useRef();
  const obj = useLoader(OBJLoader, "/project/Reijin/poster-1/advertising_display_stand_mockup_03.obj");
  const posterTexture = useTexture("/project/Reijin/poster-1.jpg");

  useEffect(() => {
    posterTexture.flipY = false;
    posterTexture.colorSpace = THREE.SRGBColorSpace;
    posterTexture.repeat.set(1, 1);
    posterTexture.offset.set(0, 0);

    obj.traverse((child) => {
      const isSurface =
        child.isMesh &&
        (child.material?.name === "surface_Mat" || child.parent?.name === "surface");
      if (isSurface && child.material) {
        child.material = child.material.clone();
        child.material.map = posterTexture;
        child.material.side = THREE.FrontSide;
        child.material.needsUpdate = true;
      }
    });
  }, [obj, posterTexture]);

  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]} scale={0.22}>
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
        camera={{ position: [0, 0, 110], fov: 45 }}
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
