import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>Get in touch for collaborations and inquiries.</p>
      </main>
      <Footer />
    </div>
  );
}
