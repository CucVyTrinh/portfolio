"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

const OBJ_PATH = "/project/Reijin/mockup-1/advertising_display_stand_mockup_03.obj";
const POSTER_FRONT = "/project/Reijin/poster-1-1.jpg";
const POSTER_BACK = "/project/Reijin/poster-1-2.jpg";

function setupTexture(tex) {
  tex.flipY = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.repeat.set(1.2, 1.2);
  tex.offset.set(-0.1, -0.1);
}

function DisplayStandModel() {
  const group = useRef();
  const obj = useLoader(OBJLoader, OBJ_PATH);
  const [texFront, texBack] = useTexture([POSTER_FRONT, POSTER_BACK]);

  useEffect(() => {
    setupTexture(texFront);
    setupTexture(texBack);

    const toProcess = [];
    obj.traverse((child) => {
      const isSurface =
        child.isMesh &&
        (child.material?.name === "surface_Mat" || child.parent?.name === "surface");
      if (isSurface && child.material) toProcess.push(child);
    });

    toProcess.forEach((child) => {
      const geom = child.geometry;
      const posAttr = geom?.getAttribute("position");
      const uvAttr = geom?.getAttribute("uv");
      if (!posAttr || !uvAttr) return;

      const index = geom.getIndex();
      const triCount = index ? index.count / 3 : posAttr.count / 3;

      const frontPositions = [];
      const frontUvs = [];
      const backPositions = [];
      const backUvs = [];

      const v0 = new THREE.Vector3();
      const v1 = new THREE.Vector3();
      const v2 = new THREE.Vector3();
      const normal = new THREE.Vector3();

      const getIdx = (tri, vert) => index ? index.array[tri * 3 + vert] : tri * 3 + vert;

      for (let i = 0; i < triCount; i++) {
        const i0 = getIdx(i, 0), i1 = getIdx(i, 1), i2 = getIdx(i, 2);
        v0.fromBufferAttribute(posAttr, i0);
        v1.fromBufferAttribute(posAttr, i1);
        v2.fromBufferAttribute(posAttr, i2);
        normal.crossVectors(v1.clone().sub(v0), v2.clone().sub(v0)).normalize();

        const uvs = [
          uvAttr.getX(i0), uvAttr.getY(i0),
          uvAttr.getX(i1), uvAttr.getY(i1),
          uvAttr.getX(i2), uvAttr.getY(i2),
        ];
        const pos = [v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z];

        if (normal.z > 0.1) {
          frontPositions.push(...pos);
          frontUvs.push(...uvs);
        } else if (normal.z < -0.1) {
          backPositions.push(...pos);
          backUvs.push(...uvs);
        }
      }

      const parent = child.parent;
      parent.remove(child);

      if (frontPositions.length > 0) {
        const frontGeom = new THREE.BufferGeometry();
        frontGeom.setAttribute("position", new THREE.Float32BufferAttribute(frontPositions, 3));
        frontGeom.setAttribute("uv", new THREE.Float32BufferAttribute(frontUvs, 2));
        frontGeom.computeVertexNormals();
        const frontMat = new THREE.MeshStandardMaterial({
          map: texFront,
          side: THREE.FrontSide,
        });
        const frontMesh = new THREE.Mesh(frontGeom, frontMat);
        parent.add(frontMesh);
      }

      if (backPositions.length > 0) {
        const backGeom = new THREE.BufferGeometry();
        backGeom.setAttribute("position", new THREE.Float32BufferAttribute(backPositions, 3));
        backGeom.setAttribute("uv", new THREE.Float32BufferAttribute(backUvs, 2));
        backGeom.computeVertexNormals();
        const backMat = new THREE.MeshStandardMaterial({
          map: texBack,
          side: THREE.FrontSide,
        });
        const backMesh = new THREE.Mesh(backGeom, backMat);
        parent.add(backMesh);
      }
    });
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
