import Link from "next/link";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoBlock}>
          <span className={styles.logoCircle} aria-hidden>
            <img src="/landing/logo-purple.png" alt="" className={styles.logoImgPurple} />
            <img src="/landing/logo-yellow.png" alt="" className={styles.logoImgYellow} />
            <img src="/landing/logo-pink.png" alt="" className={styles.logoImgPink} />
          </span>
          <span className={styles.logoText}>Vy Trinh | Designer</span>
        </Link>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
