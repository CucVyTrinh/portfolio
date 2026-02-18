import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import styles from "./page.module.css";

const IMG = "/project/Mien";

export default function MienProjectPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main>
        {/* Hero: title + subtitle + three cans */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>Miên</h1>
            <p className={styles.heroSubtitle}>Vietnamese Coffee Cans</p>
          </div>
          <div className={styles.heroCans}>
            <img
              src={`${IMG}/top-can-mock-up.png`}
              alt="Miên coffee can product display"
              className={styles.heroCansImg}
            />
          </div>
        </section>

        {/* Overview: no box */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.bodyText}>
              Miên is a packaging and brand design project for a line of Vietnamese coffee cans.
              The goal was to create a distinctive identity that honors traditional Vietnamese
              coffee culture while feeling modern and shelf-ready. The design combines custom
              typography, illustrated characters, and a warm color palette to tell the story
              of quality and heritage.
            </p>
          </div>
        </section>

        {/* Rationale: large Miên + brand rationale, right column Rationale / Title Design + 3 civet illustrations */}
        <section className={styles.section}>
          <div className={styles.rationaleGrid}>
            <div className={styles.rationaleLeft}>
              <div className={styles.rationaleBigTitle} aria-hidden>Miên</div>
              <p className={styles.bodyText}>
                The brand name &ldquo;Miên&rdquo; evokes a sense of connection and comfort,
                rooted in Vietnamese coffee rituals. The visual identity centers on a custom
                wordmark and a set of character illustrations that represent the people and
                stories behind the product—farmers, tradition, and everyday moments with coffee.
              </p>
            </div>
            <div className={styles.rationaleRight}>
              <h3 className={styles.rationaleHeading}>Rationale</h3>
              <h4 className={styles.rationaleSubheading}>Title Design</h4>
              <p className={styles.bodyText}>
                The Miên wordmark was designed to feel both editorial and approachable, with
                a slight serif character and careful spacing. It works across the three can
                variants—traditional, balanced, and bold—while keeping a consistent brand voice.
              </p>
              <div className={styles.civetRow}>
                <img src={`${IMG}/civet-1.png`} alt="" className={styles.civetImg} />
                <img src={`${IMG}/civet-2.png`} alt="" className={styles.civetImg} />
                <img src={`${IMG}/civet-3.png`} alt="" className={styles.civetImg} />
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Color Palette</h2>
            <p className={styles.bodyText}>
              Three color directions were developed to support different product variants:
              a warm reddish-brown for traditional, a light tan with green and orange for a
              balanced option, and a teal and dark green set for a bolder expression. Each
              palette keeps contrast and readability for both label and can.
            </p>
            <div className={styles.colorBars}>
              <img src={`${IMG}/color-1.png`} alt="" className={styles.colorBar} />
              <img src={`${IMG}/color-2.png`} alt="" className={styles.colorBar} />
              <img src={`${IMG}/color-3.png`} alt="" className={styles.colorBar} />
            </div>
          </div>
        </section>

        {/* Dieline & Mockups */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Dieline & Mockups</h2>
            <div className={styles.cafeIcons}>
              <img src={`${IMG}/cafe-1.png`} alt="" className={styles.cafeIcon} />
              <img src={`${IMG}/cafe-2.png`} alt="" className={styles.cafeIcon} />
              <img src={`${IMG}/cafe-3.png`} alt="" className={styles.cafeIcon} />
            </div>
            <div className={styles.mockups}>
              <img src={`${IMG}/can-1.png`} alt="Miên can mockup — traditional" className={styles.mockupImg} />
              <img src={`${IMG}/can-2.png`} alt="Miên can mockup — balanced" className={styles.mockupImg} />
              <img src={`${IMG}/can-3.png`} alt="Miên can mockup — bold" className={styles.mockupImg} />
            </div>
          </div>
        </section>

        <div className={styles.backLinkWrap}>
          <Link href="/project" className={styles.backLink}>← Back to Projects</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
