"use client";

import { useEffect } from "react";

/**
 * Transparent layout for 3D viewer when embedded in iframe.
 * Removes the dark rectangle background so the parent page shows through.
 */
export default function ViewerLayout({ children }) {
  useEffect(() => {
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
        isolation: "isolate",
      }}
    >
      {children}
    </div>
  );
}
