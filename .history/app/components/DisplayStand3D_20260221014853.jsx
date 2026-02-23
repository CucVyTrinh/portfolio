"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "@react-three/drei";

function DisplayStandModel() {
  const group = useRef();
  const obj = useLoader(OBJLoader, "/project/Reijin/poster-1/3d-frame.obj");

  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]} scale={0.08}>
      <primitive object={obj} />
    </group>
  );
}

export default function DisplayStand3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "100%",
          height: 420,
          background: "rgba(0,0,0,0.2)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent-yellow)",
        }}
      >
        Loading 3D…
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 420, background: "rgba(0,0,0,0.2)", borderRadius: 12 }}>
      <Canvas
        key="reijin-display-stand"
        camera={{ position: [0, 0, 80], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
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
