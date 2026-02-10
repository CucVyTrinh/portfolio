import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function ProjectPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Project work and case studies.</p>
      </main>
      <Footer />
    </div>
  );
}
