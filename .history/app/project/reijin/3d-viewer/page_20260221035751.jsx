"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const POSTER_FRONT = "/project/Reijin/poster-1-1.jpg";
const POSTER_BACK = "/project/Reijin/poster-1-2.jpg";

// Poster aspect ~0.7 (w/h); size to fill view
const PLANE_WIDTH = 1;
const PLANE_HEIGHT = 1.43;

function setupTexture(tex) {
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
}

function PosterOnly() {
  const [texFront, texBack] = useTexture([POSTER_FRONT, POSTER_BACK]);

  useEffect(() => {
    setupTexture(texFront);
    setupTexture(texBack);
  }, [texFront, texBack]);

  return (
    <group rotation={[0, Math.PI / 4, 0]} scale={60}>
      {/* Front poster */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshStandardMaterial map={texFront} side={THREE.FrontSide} />
      </mesh>
      {/* Back poster */}
      <mesh position={[0, 0, -0.005]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshStandardMaterial map={texBack} side={THREE.FrontSide} />
      </mesh>
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
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 55], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={0.7} />
        <directionalLight position={[-10, 5, -10]} intensity={0.7} />
        <Suspense fallback={null}>
          <PosterOnly />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
