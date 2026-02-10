import Link from "next/link";
import { NAV_LINKS } from "../constants";
import styles from "./Footer.module.css";

export default function Footer() {
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
          <Link href="/contact" className={styles.btnGetInTouch}>
            Get in Touch
          </Link>
        </div>
        <div className={styles.footerCol}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className={styles.footerCopyright}>© Cuc Vy Trinh | 2026</p>
    </footer>
  );
}
