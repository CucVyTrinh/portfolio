import Link from "next/link";
import { NAV_LINKS } from "../constants";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoBlock}>
        <span className={styles.logoIcon} aria-hidden />
        <span className={styles.logoText}>Vy Trinh | Designer</span>
      </Link>
      <nav className={styles.nav}>
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
