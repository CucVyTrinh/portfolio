"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the bg-blend layer only on the landing page.
 * Other pages use a main-scoped blend (pageMainBgBlend) that starts with the first icon.
 */
export default function BackgroundLayer({ children }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {isLanding && <div className="pageBgBlend" aria-hidden />}
      {children}
    </>
  );
}
