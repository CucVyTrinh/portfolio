"use client";

import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const IMG = "/project/tokaido";

const OVERVIEW_TEXT =
  "Tōkaidō Timepiece is a print travel magazine that captures a nine-day journey across Japan. Following the historic route from Osaka to Tokyo, the magazine presents each destination through a structured sequence of itinerary pages, photography, and graphic elements, creating a clear and engaging editorial narrative. The design balances practical travel information with magazine-style storytelling, drawing on traditional Japanese aesthetics.";

const RATIONALE_TITLE_TEXT =
  "The title 東海道 \"The Tōkaidō Timepiece\" draws inspiration from the historical Tōkaidō route, which connected Japan's two great cities — Kyoto and Edo (modern Tokyo).\n\nBy naming the tour a timepiece, it symbolizes a journey not just through places, but through moments in time, where each city along the route becomes a \"tick\" in Japan's living history. This name also reflects how travelers experience the flow of time, tradition, and change, from Osaka's urban energy to Kyoto's timeless beauty and Tokyo's modern pulse.";

const DESIGN_INTENT_TEXT =
  "The visual direction draws inspiration from traditional Japanese design through restraint, balance, and continuity. Each spread is designed as a connected pair of pages, allowing imagery and graphic elements to flow across the centre fold. This approach strengthens the visual connection between pages and supports a sense of narrative progression.\n\nWith twelve pages presenting a nine-day itinerary, layouts, typography, and graphics are structured for clarity and ease of reading. Spreads and dielines are carefully considered to ensure alignment across folds, while image resolution and a CMYK-friendly color palette guarantee high-quality, consistent print results.";

export default function TokaidoProjectPage() {
  const partRefs = useRef([]);

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

        {/* Hero: title + subtitle + header image */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>Tōkaidō</h1>
            <p className={styles.heroSubtitle}>Travel Magazine Design</p>
          </div>
          <div className={styles.heroHeaderPhoto}>
            <img
              src={`${IMG}/title-img.png`}
              alt="Tōkaidō Travel Magazine"
              className={styles.heroHeaderImg}
            />
          </div>
        </section>

        {/* Two-column: Overview (left) | Role, Tools, Duration (right) */}
        <section className={styles.section}>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div
                className={`${styles.block} ${styles.overviewBlock} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[0] = el)}
              >
                <h2 className={styles.sectionTitle}>Overview</h2>
                <p className={styles.bodyTextOverview}>{OVERVIEW_TEXT}</p>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div
                className={`${styles.block} ${styles.scrollReveal}`}
                ref={(el) => (partRefs.current[1] = el)}
              >
                <ProjectInfoCard
                  role={["Visual Concept", "Layout Design"]}
                  tools={[
                    "Adobe InDesign",
                    "Adobe Illustrator",
                    "Adobe Photoshop",
                  ]}
                  duration="3 weeks"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rationale: dark background — row 1: title.png (left) | Title Design text (right) */}
        <section className={`${styles.section} ${styles.rationaleSection}`}>
          <div
            className={`${styles.rationaleBlock} ${styles.scrollReveal}`}
            ref={(el) => (partRefs.current[2] = el)}
          >
            <div className={styles.rationaleHeader}>
              <h2
                className={`${styles.sectionTitle} ${styles.sectionTitlePurple}`}
              >
                Rationale
              </h2>
              <h3 className={styles.sectionSubtitle}>Title Design</h3>
            </div>
            <div className={styles.rationaleWrapper}>
              <div className={styles.rationaleRow}>
                <div className={styles.rationaleImgCol}>
                  <img
                    src={`${IMG}/title.png`}
                    alt="Tōkaidō Timepiece title"
                    className={styles.rationaleTitleImg}
                  />
                </div>
                <div className={styles.rationaleTextCol}>
                  <p className={styles.bodyTextColumn}>
                    {RATIONALE_TITLE_TEXT}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Intent (left) | map.png (right) */}
        <section className={styles.section}>
          <div
            className={`${styles.designIntentBlock} ${styles.scrollReveal}`}
            ref={(el) => (partRefs.current[3] = el)}
          >
            <div className={styles.designIntentRow}>
              <div className={styles.designIntentText}>
                <h3 className={styles.sectionSubtitle}>
                  Design Intent & Print Experience
                </h3>
                <p className={styles.bodyTextColumn}>
                  {DESIGN_INTENT_TEXT}
                </p>
              </div>
              <div className={styles.designIntentImgWrap}>
                <img
                  src={`${IMG}/map.png`}
                  alt="Tōkaidō route map"
                  className={styles.mapImg}
                />
                <img
                  src={`${IMG}/umbrella.png`}
                  alt=""
                  className={styles.umbrellaImg}
                  aria-hidden
                />
              </div>
            </div>
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
