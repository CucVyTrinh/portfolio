import Header from "../components/Header";
import Footer from "../components/Footer";
import PageBgIcons from "../components/PageBgIcons";
import styles from "./page.module.css";

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="pageMainBgBlend" aria-hidden />
        <PageBgIcons />
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.subtitle}>Visual work and collections.</p>
      </main>
      <Footer />
    </div>
  );
}
