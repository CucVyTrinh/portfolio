"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";
import HeaderBackgroundDistortion from "./HeaderBackgroundDistortion";

export default function Header() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);

  return (
    <header className={styles.header} data-header-root>
      {/* Layer 1 — backgroundDistortionLayer: liquid effect ONLY here; clipped to header, behind all UI. */}
      <HeaderBackgroundDistortion
        className={styles.backgroundDistortionLayer}
        headerSelector="[data-header-root]"
      />
      {/* Layer 2 — tint / color overlay */}
      <div className={styles.headerGlass} aria-hidden />
      {/* Layer 3 — optional grain / noise */}
      <div className={styles.headerFilmGrain} aria-hidden />
      {/* Layer 4 — uiContentLayer: logo + nav; NO FILTERS, always sharp and static. */}
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
