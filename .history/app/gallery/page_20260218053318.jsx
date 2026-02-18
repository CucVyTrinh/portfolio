import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function GalleryPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="pageMainBgBlend" aria-hidden />
        <div className="pageBgIconsTop" aria-hidden>
          <span className="pageBgIcon" data-img="empathy" />
          <span className="pageBgIcon" data-img="creativity" />
          <span className="pageBgIcon" data-img="perfection" />
          <span className="pageBgIcon" data-img="collaboration" />
          <span className="pageBgIcon" data-img="empathy" />
          <span className="pageBgIcon" data-img="creativity" />
          <span className="pageBgIcon" data-img="perfection" />
          <span className="pageBgIcon" data-img="collaboration" />
        </div>
        <h1 className={styles.title}>Gallery</h1>
        <p className={styles.subtitle}>Visual work and collections.</p>
      </main>
      <Footer />
    </div>
  );
}
