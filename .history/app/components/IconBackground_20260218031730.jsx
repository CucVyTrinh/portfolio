"use client";

import { usePathname } from "next/navigation";
import styles from "./IconBackground.module.css";

/**
 * 4 icon background (empathy, creativity, perfection, collaboration).
 * Shown on every page. On landing, positioned lower; on other pages from very top.
 */
export default function IconBackground() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <div
      className={`${styles.iconBg} ${isLanding ? styles.iconBgLower : ""}`}
      aria-hidden
    >
      <span className={styles.iconBgImg} data-img="empathy" />
      <span className={styles.iconBgImg} data-img="creativity" />
      <span className={styles.iconBgImg} data-img="perfection" />
      <span className={styles.iconBgImg} data-img="collaboration" />
    </div>
  );
}
