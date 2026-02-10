"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";
import LiquidDistortionBackdrop from "./LiquidDistortionBackdrop";

/**
 * Fixed header with liquid distortion on background only.
 * Layout: position fixed, top 0, width 100%, high z-index.
 * Page content scrolls behind; header acts as a distortion window.
 *
 * Layer order (bottom -> top):
 * 1. Distortion - WebGL displaces captured content behind header (turbulence + flow).
 * 2. Tint - dark/colored overlay; no distortion.
 * 3. Noise/grain - optional film grain; no distortion.
 * 4. Content - logo + nav; sharp, never distorted.
 */
export default function Header() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);

  return (
    <header className={styles.header} data-liquid-header="true">
      {/* Layer 1 - Distortion: captures page behind header, applies turbulence + displacement (WebGL). */}
      <LiquidDistortionBackdrop
        className={styles.headerDistortion}
        headerSelector='[data-liquid-header="true"]'
      />

      {/* Layer 2 - Tint: slight dark/colored film over distortion; header UI stays readable. */}
      <div className={styles.headerGlass} aria-hidden />

      {/* Noise/grain layer: optional texture on top for premium “film” feel */}
      <div className={styles.headerFilmGrain} aria-hidden />

      {/* Layer 4 - Content: logo + nav; no filters, always sharp and readable. */}
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoBlock}>
          <span className={styles.logoCircle} aria-hidden>
            <img src="/landing/logo-purple.png" alt="" className={styles.logoImgPurple} />
            <img src="/landing/logo-yellow.png" alt="" className={styles.logoImgYellow} />
            <img src="/landing/logo-pink.png" alt="" className={styles.logoImgPink} />
          </span>
          <span className={styles.logoText}>Vy Trinh | Designer</span>
        </Link>
        <nav
          className={styles.nav}
          onMouseLeave={() => setHoveredHref(null)}
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href + "/"));
            const showActivePurple =
              isActive && (hoveredHref === null || hoveredHref === link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""} ${showActivePurple ? styles.navLinkActiveVisible : ""}`}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => setHoveredHref(link.href)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
