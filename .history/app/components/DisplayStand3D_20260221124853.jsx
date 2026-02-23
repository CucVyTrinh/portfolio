"use client";

/**
 * Embeds the 3D display stand in an iframe to avoid WebGL context conflicts
 * with HeaderBackgroundDistortion (which also uses WebGL on the same page).
 * Uses mockup-1 model with poster-1.jpg texture.
 */
export default function DisplayStand3D() {
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
      <iframe
        src="/project/reijin/3d-viewer"
        title="Reijin 3D display stand with poster"
        style={{
          width: "100%",
          height: "50%",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
