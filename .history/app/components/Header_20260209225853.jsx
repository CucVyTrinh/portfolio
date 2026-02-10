"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";
import LiquidDistortionBackdrop from "./LiquidDistortionBackdrop";

export default function Header() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);

  return (
    <header className={styles.header} data-liquid-header="true">
      {/* Distortion layer: captures & warps ONLY the page pixels behind the header */}
      <LiquidDistortionBackdrop
        className={styles.headerDistortion}
        headerSelector='[data-liquid-header="true"]'
      />

      {/* Tint layer: subtle colored film on top of distortion (NOT distorted UI) */}
      <div className={styles.headerGlass} aria-hidden />

      {/* Noise/grain layer: optional texture on top for premium “film” feel */}
      <div className={styles.headerFilmGrain} aria-hidden />

      {/* Content layer: logo + nav stay sharp and readable (no filters applied) */}
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
