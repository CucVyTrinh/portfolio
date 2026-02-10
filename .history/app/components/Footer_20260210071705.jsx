"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS } from "../constants";
import styles from "./Footer.module.css";

const FOOTER_CTA_ICONS = [
  { src: "/landing/empathy.png", label: "empathy" },
  { src: "/landing/creativity.png", label: "creativity" },
  { src: "/landing/perfection.png", label: "perfection" },
  { src: "/landing/collaboration.png", label: "collaboration" },
];

export default function Footer() {
  const btnWrapRef = useRef(null);
  const [btnCursor, setBtnCursor] = useState({ x: null, y: null });

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerCol}>
          <a href="mailto:hello@example.com">Email</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
          <a href="#">Resume</a>
        </div>
        <div className={styles.footerColCenter}>
          <h2 className={styles.footerCtaHeading}>
            <span className={styles.footerCtaSmall}>Ready to</span>
            <span className={styles.footerCtaLarge}>Collaborate<span className={styles.footerCtaQ}>?</span></span>
          </h2>
          <div
            ref={btnWrapRef}
            className={styles.btnGetInTouchWrap}
            style={
              btnCursor.x != null && btnCursor.y != null
                ? {
                    "--mouse-x": `${btnCursor.x}px`,
                    "--mouse-y": `${btnCursor.y}px`,
                  }
                : undefined
            }
            onMouseMove={(e) => {
              const el = btnWrapRef.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              setBtnCursor({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            onMouseLeave={() => setBtnCursor({ x: null, y: null })}
          >
            <a href="mailto:hello@example.com" className={styles.btnGetInTouch}>
              Get in Touch
            </a>
            {FOOTER_CTA_ICONS.map((icon, i) => (
              <img
                key={icon.label}
                src={icon.src}
                alt=""
                className={styles.btnGetInTouchFlyingIcon}
                data-direction={i}
                aria-hidden
              />
            ))}
          </div>
        </div>
        <div className={styles.footerCol}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className={styles.footerCopyright}>© Cuc Vy Trinh | 2025</p>
    </footer>
  );
}
