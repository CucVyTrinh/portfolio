"use client";

/**
 * Embeds the 3D display stand in an iframe to avoid WebGL context conflicts
 * with HeaderBackgroundDistortion (which also uses WebGL on the same page).
 */
export default function DisplayStand3D() {
  return (
    <div
      style={{
        width: "100%",
        height: 720,
        background: "rgba(0,0,0,0.2)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <iframe
        src="/project/reijin/3d-viewer"
        title="Reijin 3D display stand"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
