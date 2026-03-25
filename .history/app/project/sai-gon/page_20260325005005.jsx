"use client";

import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const MEDIA_BASE = "/project/Motion%20Graphic";
const VIDEO_SRC = `${MEDIA_BASE}/SaiGon.mp4`;

const HERO_TITLE = "Sai Gon";
const HERO_SUBTITLE = "Motion graphics";

const OVERVIEW_TEXT =
  "Inspired by Saigon as a hometown, this 30-second video moves away from the image of a modern city filled with tall buildings and instead brings back an older version of Saigon. A time filled with energy, everyday movement, and familiar scenes from daily life.\n\nThe entire piece is created using motion graphics, with a vintage and approachable visual style. Through illustrated elements, shapes, and dynamic motion, it captures the lively rhythm and atmosphere of the past. The video is also part of a concept that can grow into a series, exploring more moments, stories, and the unique pace of life in old Saigon.";

const ROLE = "Motion Designer";
const TOOLS = ["Adobe After Effects", "Illustrator"];
const DURATION = "1 week";

export default function SaiGonProjectPage() {
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

        {/* Hero: title + purple subtitle + video */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>{HERO_TITLE}</h1>
            <p className={styles.heroSubtitle}>{HERO_SUBTITLE}</p>
          </div>
          <div className={styles.heroCans}>
            <video
              src={VIDEO_SRC}
              controls
              preload="metadata"
              playsInline
              className={styles.heroCansImg}
              aria-label="Sai Gon motion graphics video (click to play/pause)"
            />
          </div>
        </section>

        {/* Two-column layout: Overview (left) | Project details (right) */}
        <section className={styles.section}>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div
                className={`${styles.block} ${styles.scrollReveal}`}
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
                <ProjectInfoCard role={ROLE} tools={TOOLS} duration={DURATION} />
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

