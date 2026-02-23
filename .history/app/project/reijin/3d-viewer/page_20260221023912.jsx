"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const MOCKUP_BASE = "/project/Reijin/mockup-1";
const POSTER_URL = "/project/Reijin/mockup-1/advertising_display_stand_mockup_03/surface_Mat_baseColor.jpg";

function DisplayStandModel() {
  const group = useRef();
  const [model, setModel] = useState(null);
  const posterTexture = useTexture(POSTER_URL);

  useEffect(() => {
    posterTexture.colorSpace = THREE.SRGBColorSpace;
    posterTexture.flipY = false;
  }, [posterTexture]);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath(MOCKUP_BASE + "/");
    mtlLoader.load(
      "advertising_display_stand_mockup_03.mtl",
      (materials) => {
        materials.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(MOCKUP_BASE + "/");
        objLoader.load("advertising_display_stand_mockup_03.obj", (obj) => {
          obj.traverse((child) => {
            if (child.isMesh && child.material?.name === "surface_Mat") {
              child.material = child.material.clone();
              child.material.map = posterTexture;
              child.material.color.set(0xffffff);
              child.material.needsUpdate = true;
            }
          });
          setModel(obj);
        });
      },
      undefined,
      (err) => console.error("MTL load error:", err)
    );
  }, [posterTexture]);

  if (!model) return null;

  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]} scale={0.22}>
      <primitive object={model} />
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
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, 5, -10]} intensity={0.8} />
        <directionalLight position={[0, 10, 0]} intensity={0.5} />
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
