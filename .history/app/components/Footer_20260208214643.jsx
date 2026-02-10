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
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#">Resume</a>
        </div>
        <div className={styles.footerColCenter}>
          <p className={styles.footerCtaText}>Ready to Collaborate?</p>
          <Link href="/contact" className={styles.btnGetInTouch}>
            Get in Touch
          </Link>
          <p className={styles.footerCopyright}>© CUC VY TRINH | 2026</p>
        </div>
        <div className={styles.footerCol}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
