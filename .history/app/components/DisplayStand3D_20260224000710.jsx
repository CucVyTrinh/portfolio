"use client";

import { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const OBJ_PATH = "/project/Reijin/mockup-1/advertising_display_stand_mockup_03.obj";

const POSTER_IMAGES = {
  1: { front: "/project/Reijin/poster-1-1.jpg", back: "/project/Reijin/poster-1-2.jpg" },
  2: { front: "/project/Reijin/poster-2.jpg", back: "/project/Reijin/poster-2-2.jpg" },
  3: { front: "/project/Reijin/poster-3.jpg", back: "/project/Reijin/poster-3-2.jpg" },
};

const PLANE_WIDTH = 76;
const PLANE_HEIGHT = 109;
const FRAME_CENTER = { x: -0.5, y: 76, z: -0.8 };

function setupTexture(tex) {
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
}

function DisplayStandModel({ posterId = 1 }) {
  const group = useRef();
  const loadedObj = useLoader(OBJLoader, OBJ_PATH);
  const obj = useMemo(() => loadedObj.clone(), [loadedObj]);
  const { front: posterFront, back: posterBack } = POSTER_IMAGES[posterId] ?? POSTER_IMAGES[1];
  const [texFront, texBack] = useTexture([posterFront, posterBack]);

  useEffect(() => {
    setupTexture(texFront);
    setupTexture(texBack);

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
          child.material = new THREE.MeshStandardMaterial({ color: 0x000000 });
        }
      }
    });

    const root = obj;

    const posterGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    const frontMat = new THREE.MeshStandardMaterial({
      map: texFront,
      side: THREE.FrontSide,
    });
    const frontPlane = new THREE.Mesh(posterGeom, frontMat);
    frontPlane.position.set(FRAME_CENTER.x, FRAME_CENTER.y, FRAME_CENTER.z + 0.02);
    root.add(frontPlane);

    const backGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    const backMat = new THREE.MeshStandardMaterial({
      map: texBack,
      side: THREE.FrontSide,
    });
    const backPlane = new THREE.Mesh(backGeom, backMat);
    backPlane.position.set(FRAME_CENTER.x, FRAME_CENTER.y, FRAME_CENTER.z - 0.02);
    backPlane.rotation.y = Math.PI;
    root.add(backPlane);
  }, [obj, texFront, texBack, posterId]);

  return (
    <group ref={group} position={[0, -50, 0]} rotation={[0, Math.PI / 4, 0]} scale={0.5}>
      <primitive object={obj} />
    </group>
  );
}

const STAND_OFFSET_X = 95;

/** Single Canvas with all three poster stands in one scene — avoids WebGL context limits so all three always show. */
function ThreeStandsScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={0.7} />
      <directionalLight position={[-10, 5, -10]} intensity={0.7} />
      <group position={[-STAND_OFFSET_X, 0, 0]}>
        <DisplayStandModel posterId={1} />
      </group>
      <group position={[0, 0, 0]}>
        <DisplayStandModel posterId={2} />
      </group>
      <group position={[STAND_OFFSET_X, 0, 0]}>
        <DisplayStandModel posterId={3} />
      </group>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, -15, 0]}
      />
    </>
  );
}

export function DisplayStands3DRow() {
  return (
    <div
      style={{
        width: "100%",
        height: 560,
        background: "transparent",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 140], fov: 54 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ThreeStandsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function DisplayStand3D({ posterId = 1 }) {
  return (
    <div
      style={{
        width: "100%",
        height: 560,
        background: "transparent",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 85], fov: 54 }}
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
          <DisplayStandModel posterId={posterId} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            target={[0, -15, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
