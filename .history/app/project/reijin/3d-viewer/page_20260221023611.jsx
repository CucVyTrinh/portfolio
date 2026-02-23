"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OrbitControls } from "@react-three/drei";

const MOCKUP_BASE = "/project/Reijin/mockup-1";
const OBJ_URL = `${MOCKUP_BASE}/advertising_display_stand_mockup_03.obj`;
const MTL_URL = `${MOCKUP_BASE}/advertising_display_stand_mockup_03.mtl`;

function DisplayStandModel() {
  const group = useRef();
  const [model, setModel] = useState(null);

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
        objLoader.load(
          "advertising_display_stand_mockup_03.obj",
          (obj) => setModel(obj),
          undefined,
          (err) => console.error("OBJ load error:", err)
        );
      },
      undefined,
      (err) => console.error("MTL load error:", err)
    );
  }, []);

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
 * Uses mockup-1 folder; poster-1.jpg is copied as surface_Mat_baseColor.jpg
 * so it displays on the display stand.
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
