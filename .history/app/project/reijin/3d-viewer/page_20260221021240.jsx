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
    posterTexture.repeat.set(1.67, 1.67);
    posterTexture.offset.set(-0.335, -0.335);

    obj.traverse((child) => {
      const isSurface =
        child.isMesh &&
        (child.material?.name === "surface_Mat" || child.parent?.name === "surface");
      if (isSurface && child.material) {
        const geom = child.geometry;
        if (!geom) return;

        const posAttr = geom.getAttribute("position");
        const uvAttr = geom.getAttribute("uv");
        const index = geom.getIndex();
        if (!posAttr || !index) return;

        const positions = [];
        const uvs = uvAttr ? [] : null;
        const v0 = new THREE.Vector3();
        const v1 = new THREE.Vector3();
        const v2 = new THREE.Vector3();
        const normal = new THREE.Vector3();

        let frontCount = 0;
        let backCount = 0;
        for (let i = 0; i < index.count; i += 3) {
          v0.fromBufferAttribute(posAttr, index.array[i]);
          v1.fromBufferAttribute(posAttr, index.array[i + 1]);
          v2.fromBufferAttribute(posAttr, index.array[i + 2]);
          normal.crossVectors(
            v1.clone().sub(v0),
            v2.clone().sub(v0)
          ).normalize();
          if (normal.z > 0.1) frontCount++;
          else if (normal.z < -0.1) backCount++;
        }
        const useFront = frontCount >= backCount;

        for (let i = 0; i < index.count; i += 3) {
          const i0 = index.array[i];
          const i1 = index.array[i + 1];
          const i2 = index.array[i + 2];
          v0.fromBufferAttribute(posAttr, i0);
          v1.fromBufferAttribute(posAttr, i1);
          v2.fromBufferAttribute(posAttr, i2);
          normal.crossVectors(
            v1.clone().sub(v0),
            v2.clone().sub(v0)
          ).normalize();

          const keepFace = useFront ? normal.z > 0.1 : normal.z < -0.1;
          if (keepFace) {
            positions.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
            if (uvs && uvAttr) {
              uvs.push(
                uvAttr.getX(i0), uvAttr.getY(i0),
                uvAttr.getX(i1), uvAttr.getY(i1),
                uvAttr.getX(i2), uvAttr.getY(i2)
              );
            }
          }
        }

        if (positions.length > 0) {
          const newGeom = new THREE.BufferGeometry();
          newGeom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
          if (uvs) newGeom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
          newGeom.computeVertexNormals();
          child.geometry = newGeom;
        }

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
