"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);

  return (
    <header className={styles.header}>
      {/* Layer 1: Blur — backdrop blur + saturation so content behind header looks frosted */}
      <div className={styles.headerGlassBlur} aria-hidden />
      {/* Layer 2: Tint — semi-transparent overlay for glass color (uses --header-glass-tint) */}
      <div className={styles.headerGlassTint} aria-hidden />
      {/* Layer 3: Shine — specular highlight + subtle border for glass edge */}
      <div className={styles.headerGlassShine} aria-hidden />
      {/* Layer 4: Grain — optional animated film grain (respects prefers-reduced-motion) */}
      <div className={styles.headerFilmGrain} aria-hidden />
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
