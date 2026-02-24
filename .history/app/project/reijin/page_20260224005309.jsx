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
  "Reijin is a conceptual poster series inspired by Japanese aesthetics and the philosophy of the samurai sword.\n\nThe project explores three spirit blades - Water, Fire, and Metal, each representing an inner virtue: Purity, Endure, and Awaken.\n\nDesigned as exhibition-style artifacts, the posters are thoughtfully designed and deeply connected, inviting the viewer to look closer and discover deeper meaning.";

const RATIONALE_TEXT = (
  <>
    My starting point for this project was a personal fascination with Japanese swords and samurai culture.
    <br /><br />
    Through research, I became interested in how the katana represents more than a weapon, it is a physical embodiment of discipline, spirit, and inner virtue. This symbolic depth inspired me to translate the soul of the sword into three elemental states: <strong>Water</strong>, <strong>Fire</strong>, and <strong>Metal</strong>, each representing a core samurai ideal: <strong>Purity</strong>, <strong>Endurance</strong>, and <strong>Awakening</strong>.
  </>
);

const VISUAL_STORYTELLING_TEXT =
  "The series is structured as a narrative progression, from Water, to Fire, to Metal. Visually, this connection is created through repeating textures, balanced layouts, and a shared sense of atmosphere. Even though each poster has its own feeling, they speak the same visual language, inviting the viewer to move from one to the next as chapters in a single story of transformation.";

export default function ReijinProjectPage() {
  const partRefs = useRef([]);
  const designOverlayRef = useRef(null);
  const [mockupIndex, setMockupIndex] = useState(0);
  const [viewDesignPosterId, setViewDesignPosterId] = useState(null);
  const mockupImages = [
    `${IMG}/mockup-1.jpg`,
    `${IMG}/mockup-2.jpg`,
    `${IMG}/mockup-3.jpg`,
  ];
  const posterDesignImages = {
    1: `${IMG}/poster-1-1.jpg`,
    2: `${IMG}/poster-2.jpg`,
    3: `${IMG}/poster-3.jpg`,
  };

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

  useEffect(() => {
    if (viewDesignPosterId != null) {
      document.body.style.overflow = "hidden";
      designOverlayRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewDesignPosterId]);

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

        {/* Hero: title + subtitle + header photo */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>Reijin</h1>
            <p className={styles.heroSubtitle}>Conceptual Poster Series</p>
          </div>
          <div className={styles.heroHeaderPhoto}>
            <img
              src={`${IMG}/header-photo.png`}
              alt="Reijin header"
              className={styles.heroHeaderImg}
            />
          </div>
        </section>

        {/* Overview (left) | Info card (right) */}
        <section className={styles.section}>
          <div className={`${styles.twoColumnLayout} ${styles.scrollReveal}`} ref={(el) => (partRefs.current[0] = el)}>
            <div className={styles.leftColumn}>
              <div className={`${styles.block} ${styles.overviewBlock}`}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.bodyTextOverview}>{OVERVIEW_TEXT}</p>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <ProjectInfoCard
                role={["Graphic Design", "Conceptualization"]}
                tools={["Adobe Photoshop", "Adobe Illustrator"]}
                duration="2 weeks"
              />
            </div>
          </div>
        </section>

        {/* Rationale: titles outside, paragraph + icons in opacity rectangle */}
        <section className={`${styles.section} ${styles.rationaleSection}`}>
          <div className={`${styles.rationaleBlock} ${styles.scrollReveal}`} ref={(el) => (partRefs.current[1] = el)}>
            <div className={styles.rationaleHeader}>
              <h2 className={`${styles.sectionTitle} ${styles.sectionTitlePurple}`}>Rationale</h2>
              <h3 className={styles.sectionSubtitle}>Concept & Inspiration</h3>
            </div>
            <div className={styles.rationaleWrapper}>
              <div className={styles.rationaleRow}>
                <div className={styles.rationaleText}>
                  <p className={styles.bodyTextColumn}>{RATIONALE_TEXT}</p>
                </div>
                <div className={styles.rationaleIcons}>
                  <img src={`${IMG}/water.png`} alt="Water" className={styles.elementalImg} />
                  <img src={`${IMG}/fire.png`} alt="Fire" className={styles.elementalImg} />
                  <img src={`${IMG}/metal.png`} alt="Metal" className={styles.elementalImg} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Storytelling: three-color.png (left) | title + paragraph (right) */}
        <section className={styles.section}>
          <div
            className={`${styles.visualStoryBlock} ${styles.scrollReveal}`}
            ref={(el) => (partRefs.current[2] = el)}
          >
            <div className={styles.visualStoryRow}>
              <div className={styles.visualStoryImgWrap}>
                <img src={`${IMG}/three-color.png`} alt="Water, Fire, Metal" className={styles.threeColorImg} />
              </div>
              <div className={styles.visualStoryText}>
                <h3 className={styles.sectionSubtitle}>Visual Storytelling<br />& Design Intent</h3>
                <p className={styles.bodyTextColumn}>{VISUAL_STORYTELLING_TEXT}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mockups: 3D display stand + carousel */}
        <section className={styles.section} id="mockups">
          <div className={styles.mockupSection}>
            <div
              className={`${styles.mockupHeader} ${styles.scrollReveal}`}
              ref={(el) => (partRefs.current[3] = el)}
            >
              <h2 className={styles.sectionTitle}>Mockups</h2>
            </div>
            <div
              className={`${styles.mockup3DRow} ${styles.scrollReveal}`}
              ref={(el) => (partRefs.current[4] = el)}
            >
              <div className={styles.mockup3DItem}>
                <button
                  type="button"
                  className={styles.viewDesignBtn}
                  onClick={() => setViewDesignPosterId(1)}
                >
                  View Design
                </button>
                <DisplayStand3D posterId={1} />
                <img
                  src={`${IMG}/360.png`}
                  alt="360"
                  className={styles.mockup360Badge}
                />
              </div>
              <div className={styles.mockup3DItem}>
                <button
                  type="button"
                  className={styles.viewDesignBtn}
                  onClick={() => setViewDesignPosterId(2)}
                >
                  View Design
                </button>
                <DisplayStand3D posterId={2} />
                <img
                  src={`${IMG}/360.png`}
                  alt="360"
                  className={styles.mockup360Badge}
                />
              </div>
              <div className={styles.mockup3DItem}>
                <button
                  type="button"
                  className={styles.viewDesignBtn}
                  onClick={() => setViewDesignPosterId(3)}
                >
                  View Design
                </button>
                <DisplayStand3D posterId={3} />
                <img
                  src={`${IMG}/360.png`}
                  alt="360"
                  className={styles.mockup360Badge}
                />
              </div>
            </div>
            <div
              className={`${styles.mockupCarousel} ${styles.scrollReveal}`}
              ref={(el) => (partRefs.current[5] = el)}
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
            ref={(el) => (partRefs.current[6] = el)}
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

        {/* Design overlay: poster image in center with dark overlay */}
        {viewDesignPosterId != null && (
          <div
            ref={designOverlayRef}
            className={styles.designOverlay}
            onClick={() => setViewDesignPosterId(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setViewDesignPosterId(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label="View poster design"
            tabIndex={0}
          >
            <button
              type="button"
              className={styles.designOverlayClose}
              onClick={() => setViewDesignPosterId(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={posterDesignImages[viewDesignPosterId]}
              alt={`Poster ${viewDesignPosterId} design`}
              className={styles.designOverlayImg}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
