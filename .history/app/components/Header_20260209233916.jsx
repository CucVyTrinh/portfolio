"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";

export default function Header({ refractionContent }) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(typeof document !== "undefined" ? document.documentElement.scrollHeight : 0);
  const seedRef = useRef(0);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY ?? window.pageYOffset ?? 0);
      setDocHeight(document.documentElement.scrollHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;
    const turb = typeof document !== "undefined" ? document.getElementById("headerRefractionTurb") : null;
    if (!turb) return;
    const t = setInterval(() => {
      seedRef.current += 0.15;
      turb.setAttribute("seed", String(seedRef.current % 100));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className={styles.header}>
      {/* Effect ONLY here: pure displacement, no blur/tint/noise. Content scroll-synced. */}
      <div className={styles.backgroundDistortionLayer} aria-hidden>
        {refractionContent != null && (
          <div
            className={styles.refractionMirror}
            style={{
              transform: `translateY(${-scrollY}px)`,
              minHeight: `${docHeight}px`,
            }}
          >
            {refractionContent}
          </div>
        )}
      </div>

      {/* Logo + nav: NO filters, pixel-perfect and static. */}
      <div className={styles.uiContentLayer}>
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
