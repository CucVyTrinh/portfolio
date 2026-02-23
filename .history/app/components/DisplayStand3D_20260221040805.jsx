"use client";

/**
 * Embeds the 3D display stand in an iframe to avoid WebGL context conflicts
 * with HeaderBackgroundDistortion (which also uses WebGL on the same page).
 * Uses mockup-1 model with poster-1.jpg texture.
 */
export default function DisplayStand3D({ height = 720 }) {
  return (
    <div
      style={{
        width: "100%",
        height,
        background: "transparent",
      }}
    >
      <iframe
        src="/project/reijin/3d-viewer"
        title="Reijin 3D display stand with poster"
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
