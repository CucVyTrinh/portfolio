"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const OBJ_PATH = "/project/Reijin/mockup-1/advertising_display_stand_mockup_03.obj";
const POSTER_FRONT = "/project/Reijin/poster-1-1.jpg";
const POSTER_BACK = "/project/Reijin/poster-1-2.jpg";

// Poster plane size — model uses cm; display frame ~70×130cm
// Oversized (~5%) to fully fill frame and eliminate black edge gaps
const PLANE_WIDTH = 76;
const PLANE_HEIGHT = 109;
// Display center in model space (from OBJ vertices)
const FRAME_CENTER = { x: -1.5, y: 75, z: -0.8 };

function setupTexture(tex) {
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
}

function DisplayStandModel() {
  const group = useRef();
  const obj = useLoader(OBJLoader, OBJ_PATH);
  const [texFront, texBack] = useTexture([POSTER_FRONT, POSTER_BACK]);

  useEffect(() => {
    setupTexture(texFront);
    setupTexture(texBack);

    // 1. Keep frame white; hide/remove poster surfaces (we replace with planes)
    obj.traverse((child) => {
      if (child.isMesh) {
        const name = (child.name || "").toLowerCase();
        const matName = (child.material?.name || "").toLowerCase();
        const isPosterSurface =
          name.includes("poster") ||
          name.includes("surface") ||
          matName.includes("surface_mat");

        if (isPosterSurface) {
          child.visible = false;
        } else {
          child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        }
      }
    });

    // 2. Create poster planes and add to the model's parent/root
    const root = obj;

    // Front poster plane (facing +Z)
    const posterGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    const frontMat = new THREE.MeshStandardMaterial({
      map: texFront,
      side: THREE.FrontSide,
    });
    const frontPlane = new THREE.Mesh(posterGeom, frontMat);
    frontPlane.position.set(FRAME_CENTER.x, FRAME_CENTER.y, FRAME_CENTER.z + 0.02);
    root.add(frontPlane);

    // Back poster plane (facing -Z)
    const backGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    const backMat = new THREE.MeshStandardMaterial({
      map: texBack,
      side: THREE.FrontSide,
    });
    const backPlane = new THREE.Mesh(backGeom, backMat);
    backPlane.position.set(FRAME_CENTER.x, FRAME_CENTER.y, FRAME_CENTER.z - 0.02);
    backPlane.rotation.y = Math.PI;
    root.add(backPlane);
  }, [obj, texFront, texBack]);

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
