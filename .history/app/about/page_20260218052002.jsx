import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="pageMainBgBlend" aria-hidden />
        <div className="pageBgIconsTop" aria-hidden />
        <h1 className={styles.title}>About</h1>
        <p className={styles.subtitle}>Learn more about my background and approach.</p>
      </main>
      <Footer />
    </div>
  );
}
