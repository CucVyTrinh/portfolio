"use client";

import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const IMG = "/project/Mien";

const OVERVIEW_TEXT =
  "Miên is a beverage can label project for a specialty coffee brand from Vietnam, known for its unique civet coffee. The project introduces three distinct flavors: Milk Civet Coffee, Civet Egg Coffee, and Coconut Civet Coffee. The packaging is designed to feel playful yet premium, blending cartoon-inspired charm with elegant details to capture attention and convey quality.\n\nThe brand's personality is colorful, craft-focused, and inviting, with each can telling a visual story that feels fresh while remaining grounded in tradition.";

const GRAPHIC_ELEMENTS_TEXT =
  "Each flavor features a friendly cartoon civet character alongside a stylized coffee cup. The civet’s expression and activity change per flavor to hint at the taste experience, making the design engaging and easy to distinguish. Background elements like coffee fields and organic shapes add depth and a sense of origin. The overall graphic style aims to be welcoming, playful, and visually appetizing.";

const RATIONALE_TEXT =
  "The brand name “Miên” is custom-drawn to resemble tiered coffee fields, a common sight in Vietnam’s highlands. The connected, flowing letterforms create a sense of harmony and elevation, reinforcing a premium feel while staying approachable.";

const COLOR_PALETTE_TEXT =
  "The color scheme is built around three primary core colors, each tied to a specific flavor: red for Milk Civet Coffee, yellow for Civet Egg Coffee, and blue for Coconut Civet Coffee. Each main color is paired with two complementary shades. This system creates a vibrant, clear visual identity for the lineup, making each can distinct while feeling united as part of the same playful and premium brand family.";

export default function MienProjectPage() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const refs = sectionRefs.current.filter(Boolean);
    const observers = refs.map((el) => {
      const ob = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add(styles.inView);
          });
        },
        { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
      );
      ob.observe(el);
      return ob;
    });
    return () => observers.forEach((ob) => ob.disconnect());
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <main>
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
        {/* Hero: title + subtitle + three cans */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>Miên</h1>
            <p className={styles.heroSubtitle}>Packaging design, branding</p>
          </div>
          <div className={styles.heroCans}>
            <img
              src={`${IMG}/top-can-mock-up.png`}
              alt="Miên coffee can product display"
              className={styles.heroCansImg}
            />
          </div>
        </section>

        {/* Two-column layout: images on the opposite side of their section title */}
        <section className={styles.section} ref={(el) => (sectionRefs.current[0] = el)}>
          <div className={styles.sectionContent}>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div className={`${styles.block} ${styles.overviewBlock}`}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.bodyTextOverview}>{OVERVIEW_TEXT}</p>
              </div>
              <div className={`${styles.block} ${styles.blockTitleImg}`}>
                <img
                  src={`${IMG}/title.png`}
                  alt="Miên"
                  className={styles.rationaleTitleImg}
                />
              </div>
              <div className={styles.block}>
                <h3 className={styles.sectionSubtitle}>Graphic Elements</h3>
                <p className={styles.bodyTextColumn}>{GRAPHIC_ELEMENTS_TEXT}</p>
              </div>
              <div className={`${styles.block} ${styles.blockColorBars}`}>
                <div className={styles.colorBars}>
                  <img src={`${IMG}/color-1.png`} alt="" className={styles.colorBar} />
                  <img src={`${IMG}/color-2.png`} alt="" className={styles.colorBar} />
                  <img src={`${IMG}/color-3.png`} alt="" className={styles.colorBar} />
                </div>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={styles.block}>
                <ProjectInfoCard
                  role="Graphic Design"
                  tools={"Adobe Illustrator\nAdobe Photoshop"}
                  duration="2 weeks"
                />
              </div>
              <div className={`${styles.block} ${styles.blockRationale} ${styles.rationaleBlock}`}>
                <h2 className={`${styles.sectionTitle} ${styles.sectionTitlePurple}`}>Rationale</h2>
                <div className={styles.rationaleBody}>
                  <h3 className={styles.sectionSubtitle}>Title Design</h3>
                  <p className={styles.bodyTextColumn}>{RATIONALE_TEXT}</p>
                </div>
              </div>
              <div className={`${styles.block} ${styles.blockCivets}`}>
                <div className={styles.civetRow}>
                  <img src={`${IMG}/civet-1.png`} alt="" className={styles.civetImg} />
                  <img src={`${IMG}/civet-2.png`} alt="" className={styles.civetImg} />
                  <img src={`${IMG}/civet-3.png`} alt="" className={styles.civetImg} />
                </div>
              </div>
              <div className={`${styles.block} ${styles.blockColorPalette}`}>
                <h3 className={styles.sectionSubtitle}>Color Palette</h3>
                <p className={styles.bodyTextColumn}>{COLOR_PALETTE_TEXT}</p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Dieline & Mockups: left-align to Overview, title + coffee icons row, bigger cans, smaller gap */}
        <section className={styles.section} ref={(el) => (sectionRefs.current[1] = el)}>
          <div className={styles.sectionContent}>
          <div className={styles.dielineSection}>
            <div className={styles.dielineHeader}>
              <h2 className={styles.sectionTitle}>Dieline &<br />Mockups</h2>
              <div className={styles.cafeIcons}>
                <img src={`${IMG}/cafe-1.png`} alt="" className={styles.cafeIcon} />
                <img src={`${IMG}/cafe-2.png`} alt="" className={styles.cafeIcon} />
                <img src={`${IMG}/cafe-3.png`} alt="" className={styles.cafeIcon} />
              </div>
            </div>
            <div className={styles.mockups}>
              <img src={`${IMG}/can-1.png`} alt="Miên can mockup — traditional" className={styles.mockupImg} />
              <img src={`${IMG}/can-2.png`} alt="Miên can mockup — balanced" className={styles.mockupImg} />
              <img src={`${IMG}/can-3.png`} alt="Miên can mockup — bold" className={styles.mockupImg} />
            </div>
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
