"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const DisplayStand3D = dynamic(
  () => import("../../components/DisplayStand3D"),
  { ssr: false }
);

const IMG = "/project/Reijin";

const OVERVIEW_TEXT =
  "Reijin is a conceptual poster series exploring Japanese-inspired visual storytelling through typography, symbolism, and bold color contrasts. The project presents three distinct posters—each with its own narrative—unified by a shared aesthetic language. The design draws from traditional and contemporary visual elements to create a cohesive collection that feels both timeless and modern.\n\nThe concept centers on the interplay between order and chaos, stillness and motion. Each poster uses a central motif—the kanji 霊刀 (Reijin)—as an anchor, surrounded by abstract shapes and gradients that evoke different emotional tones.";

const RATIONALE_TEXT =
  "The concept centers on the interplay between order and chaos, stillness and motion. Each poster uses a central motif—the kanji 霊刀 (Reijin)—as an anchor, surrounded by abstract shapes and gradients that evoke different emotional tones. The visual language bridges cultural references while maintaining a contemporary graphic design sensibility.";

const VISUAL_STORYTELLING_TEXT =
  "The design intent is to create visual tension through contrast: bold reds against deep blues, organic flowing shapes against geometric precision. Each poster tells a micro-story—one celestial and calm, one fiery and dynamic, one balanced between the two. The snowflake-like and starburst motifs suggest both structure and expansion, mirroring the theme of duality.";

export default function ReijinProjectPage() {
  const partRefs = useRef([]);
  const [mockupIndex, setMockupIndex] = useState(0);
  const mockupImages = [
    `${IMG}/mockup-1.jpg`,
    `${IMG}/mockup-2.jpg`,
    `${IMG}/mockup-3.jpg`,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { rootMargin: "0px 0px -50px 0px", threshold: 0.08 }
    );
    partRefs.current.filter(Boolean).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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

        {/* Hero: title + subtitle + 3D mockup */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>Reijin</h1>
            <p className={styles.heroSubtitle}>Graphic Design | Concept & Visuals</p>
          </div>
          <div
            className={`${styles.heroMockup} ${styles.scrollReveal}`}
            ref={(el) => (partRefs.current[6] = el)}
          >
            <DisplayStand3D height={800} />
          </div>
        </section>

        {/* Two-column layout: Overview (left) | Role, Tools, Duration, Rationale, Visual Storytelling (right) */}
        <section className={styles.section}>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div
                className={`${styles.block} ${styles.overviewBlock} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[0] = el)}
              >
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.bodyTextOverview}>{OVERVIEW_TEXT}</p>
                <a href="#mockups" className={styles.viewDesignBtn}>
                  View Design
                </a>
              </div>
              <div
                className={`${styles.block} ${styles.blockRationale} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[1] = el)}
              >
                <h2 className={`${styles.sectionTitle} ${styles.sectionTitlePurple}`}>Rationale</h2>
                <h3 className={styles.sectionSubtitle}>Concept & Inspiration</h3>
                <p className={styles.bodyTextColumn}>{RATIONALE_TEXT}</p>
              </div>
              <div
                className={`${styles.block} ${styles.blockCircular} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[2] = el)}
              >
                <img src={`${IMG}/red.png`} alt="" className={styles.circularImg} />
                <img src={`${IMG}/blue.png`} alt="" className={styles.circularImg} />
                <img src={`${IMG}/white.png`} alt="" className={styles.circularImg} />
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div
                className={`${styles.block} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[3] = el)}
              >
                <ProjectInfoCard
                  role="Graphic Design\nConcept Development"
                  tools="Adobe Photoshop\nAdobe Illustrator"
                  duration="2 months"
                />
              </div>
              <div
                className={`${styles.block} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[4] = el)}
              >
                <h3 className={styles.sectionSubtitle}>Visual Storytelling & Design Intent</h3>
                <p className={styles.bodyTextColumn}>{VISUAL_STORYTELLING_TEXT}</p>
              </div>
              <div
                className={`${styles.block} ${styles.blockThreeShapes} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[5] = el)}
              >
                <img src={`${IMG}/three-white.png`} alt="" className={styles.shapeImg} />
                <img src={`${IMG}/three-red.png`} alt="" className={styles.shapeImg} />
                <img src={`${IMG}/three-blue.png`} alt="" className={styles.shapeImg} />
              </div>
            </div>
          </div>
        </section>

        {/* Mockups: carousel */}
        <section className={styles.section} id="mockups">
          <div className={styles.mockupSection}>
            <div
              className={`${styles.mockupHeader} ${styles.scrollReveal}`}
              ref={(el) => (partRefs.current[7] = el)}
            >
              <h2 className={styles.sectionTitle}>Mockups</h2>
            </div>
            <div
              className={`${styles.mockupCarousel} ${styles.scrollReveal}`}
              ref={(el) => (partRefs.current[8] = el)}
            >
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={() =>
                  setMockupIndex((i) => (i === 0 ? mockupImages.length - 1 : i - 1))
                }
                aria-label="Previous mockup"
              >
                ←
              </button>
              <img
                src={mockupImages[mockupIndex]}
                alt={`Reijin mockup ${mockupIndex + 1}`}
                className={styles.mockupImg}
              />
              <button
                type="button"
                className={styles.carouselBtn}
                onClick={() =>
                  setMockupIndex((i) => (i === mockupImages.length - 1 ? 0 : i + 1))
                }
                aria-label="Next mockup"
              >
                →
              </button>
            </div>
            <div className={styles.carouselDots}>
              {mockupImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${mockupIndex === i ? styles.dotActive : ""}`}
                  onClick={() => setMockupIndex(i)}
                  aria-label={`Go to mockup ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Outdoor display */}
        <section className={styles.section}>
          <div
            className={`${styles.outdoorSection} ${styles.scrollReveal}`}
            ref={(el) => (partRefs.current[9] = el)}
          >
            <img
              src={`${IMG}/museum-display.png`}
              alt="Reijin posters displayed in outdoor museum setting"
              className={styles.outdoorImg}
            />
          </div>
        </section>

        <div className={styles.backLinkWrap}>
          <Link href="/project" className={styles.backLink}>
            ← Back to Projects
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
