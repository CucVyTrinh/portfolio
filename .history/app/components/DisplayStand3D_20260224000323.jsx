"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
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

const STAGGER_DELAY = 0.12;
const ANIM_DURATION = 0.5;

function setupTexture(tex) {
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
}

function DisplayStandModel({ posterId = 1, positionX = 0, staggerIndex = 0 }) {
  const groupRef = useRef();
  const obj = useLoader(OBJLoader, OBJ_PATH);
  const cloneRef = useRef(null);
  const { front: posterFront, back: posterBack } = POSTER_IMAGES[posterId] ?? POSTER_IMAGES[1];
  const [texFront, texBack] = useTexture([posterFront, posterBack]);

  if (obj && !cloneRef.current) {
    cloneRef.current = obj.clone(true);
  }
  const displayObj = cloneRef.current;

  useEffect(() => {
    if (!displayObj || !texFront || !texBack) return;

    setupTexture(texFront);
    setupTexture(texBack);

    displayObj.traverse((child) => {
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

    const posterGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    const frontMat = new THREE.MeshStandardMaterial({
      map: texFront,
      side: THREE.FrontSide,
    });
    const frontPlane = new THREE.Mesh(posterGeom, frontMat);
    frontPlane.position.set(FRAME_CENTER.x, FRAME_CENTER.y, FRAME_CENTER.z + 0.02);
    displayObj.add(frontPlane);

    const backGeom = new THREE.PlaneGeometry(PLANE_WIDTH, PLANE_HEIGHT);
    const backMat = new THREE.MeshStandardMaterial({
      map: texBack,
      side: THREE.FrontSide,
    });
    const backPlane = new THREE.Mesh(backGeom, backMat);
    backPlane.position.set(FRAME_CENTER.x, FRAME_CENTER.y, FRAME_CENTER.z - 0.02);
    backPlane.rotation.y = Math.PI;
    displayObj.add(backPlane);
  }, [displayObj, texFront, texBack, posterId]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const delay = staggerIndex * STAGGER_DELAY;
    const t = typeof g.userData.elapsed === "number" ? g.userData.elapsed : 0;
    g.userData.elapsed = t + delta;
    const elapsed = g.userData.elapsed;
    let progress = 0;
    if (elapsed > delay) {
      progress = Math.min(1, (elapsed - delay) / ANIM_DURATION);
      progress = 1 - (1 - progress) * (1 - progress);
    }
    const scale = 0.5 * progress;
    g.scale.setScalar(scale);
  });

  if (!displayObj) return null;

  return (
    <group
      ref={groupRef}
      position={[positionX, -50, 0]}
      rotation={[0, Math.PI / 4, 0]}
      scale={0}
    >
      <primitive object={displayObj} />
    </group>
  );
}

function AllThreeStands() {
  return (
    <Suspense fallback={null}>
      <DisplayStandModel posterId={1} positionX={-150} staggerIndex={0} />
      <DisplayStandModel posterId={2} positionX={0} staggerIndex={1} />
      <DisplayStandModel posterId={3} positionX={150} staggerIndex={2} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, -15, 0]}
      />
    </Suspense>
  );
}

function SingleStand({ posterId }) {
  return (
    <Suspense fallback={null}>
      <DisplayStandModel posterId={posterId} positionX={0} staggerIndex={0} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={[0, -15, 0]}
      />
    </Suspense>
  );
}

export default function DisplayStand3D({ posterId = 1, showAll = false }) {
  const camera = showAll
    ? { position: [0, 0, 130], fov: 52 }
    : { position: [0, 0, 85], fov: 54 };
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
        camera={camera}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={0.7} />
        <directionalLight position={[-10, 5, -10]} intensity={0.7} />
        {showAll ? <AllThreeStands /> : <SingleStand posterId={posterId} />}
      </Canvas>
    </div>
  );
}
