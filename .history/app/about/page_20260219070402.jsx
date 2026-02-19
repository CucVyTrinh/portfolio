"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

const HERO_ICONS = [
  { src: "/landing/empathy.png", label: "empathy", alt: "Empathy" },
  { src: "/landing/creativity.png", label: "creativity", alt: "Creativity" },
  { src: "/landing/perfection.png", label: "perfection", alt: "Perfection" },
  { src: "/landing/collaboration.png", label: "collaboration", alt: "Collaboration" },
];

const TOOLTIP_OFFSET_X = 16;
const TOOLTIP_OFFSET_Y = 12;
const TOOLTIP_TYPEWRITER_MS = 70;

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const INTRO_PARAGRAPH_1 = (
  <>
    My name is <span className={styles.highlightYellow}>Vy</span>. I&apos;m a{" "}
    <span className={styles.highlightYellow}>digital designer</span> with{" "}
    <span className={styles.highlightYellow}>front-end development</span> skills who is constantly exploring new ideas, experimenting with visual directions, and challenging myself to step beyond what feels familiar.
  </>
);

const INTRO_PARAGRAPH_2 = (
  <>
    I enjoy experimenting with new color combinations, creative graphics, and layered details - but more importantly, I care about <span className={styles.highlightPurple}>meaning</span>. Every design decision I make is intentional. I strive to create work where <span className={styles.highlightPurple}>visuals</span> and <span className={styles.highlightPurple}>storytelling</span> connect seamlessly to communicate something deeper than just aesthetics.
  </>
);

const INTRO_PARAGRAPH_3 = "The four qualities below reflect the core values that shape my work.";

export default function AboutPage() {
  const [vyFrame, setVyFrame] = useState(0); // 0 = vy-1, 1 = vy-2
  const [tooltip, setTooltip] = useState(null);
  const [tooltipDisplayed, setTooltipDisplayed] = useState("");
  const tooltipIntervalRef = useRef(null);
  // Waving: alternate vy-1 and vy-2 (slower)
  useEffect(() => {
    const t = setInterval(() => setVyFrame((f) => (f + 1) % 2), 350);
    return () => clearInterval(t);
  }, []);

  // Tooltip typewriter (same as landing)
  useEffect(() => {
    if (tooltipIntervalRef.current) {
      clearInterval(tooltipIntervalRef.current);
      tooltipIntervalRef.current = null;
    }
    if (!tooltip) {
      setTooltipDisplayed("");
      return;
    }
    const fullText = `[${capitalize(tooltip.label)}]`;
    setTooltipDisplayed("");
    let i = 0;
    tooltipIntervalRef.current = setInterval(() => {
      if (i < fullText.length) {
        setTooltipDisplayed(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(tooltipIntervalRef.current);
        tooltipIntervalRef.current = null;
      }
    }, TOOLTIP_TYPEWRITER_MS);
    return () => {
      if (tooltipIntervalRef.current) clearInterval(tooltipIntervalRef.current);
    };
  }, [tooltip?.label]);

  return (
    <div className={styles.page}>
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
      <Header />
      <main>
        {/* Hero: same layout/position as Featured + Projects on Projects page */}
        <section className={styles.aboutHero} aria-label="About">
          <div className={styles.aboutHeroInner}>
            <div className={styles.aboutHeroTitleWrap}>
              <span className={styles.aboutHeroLabel}>Xin Chào!</span>
              <h1 className={styles.aboutHeroTitle}>Hello!</h1>
            </div>
          </div>
        </section>

        {/* Content: left graphic (bigger, centered), right text + icons; then filmstrip */}
        <div className={styles.aboutContent}>
          <section className={styles.hello}>
            <div className={styles.helloLeft}>
              <div className={styles.helloGraphicWrap}>
                <img
                  src="/about/vy-1.png"
                  alt="Vy waving"
                  className={`${styles.vyGraphic} ${vyFrame === 0 ? styles.vyActive : ""}`}
                  aria-hidden={vyFrame !== 0}
                />
                <img
                  src="/about/vy-2.png"
                  alt=""
                  className={`${styles.vyGraphic} ${vyFrame === 1 ? styles.vyActive : ""}`}
                  aria-hidden={vyFrame !== 1}
                />
              </div>
            </div>
            <div className={styles.helloRight}>
              <div className={styles.helloText}>
                <p className={styles.helloIntro}>{INTRO_PARAGRAPH_1}</p>
                <p className={styles.helloIntro}>{INTRO_PARAGRAPH_2}</p>
                <p className={styles.helloIntro}>{INTRO_PARAGRAPH_3}</p>
              </div>
            <div
              className={styles.heroIcons}
              onMouseLeave={() => setTooltip(null)}
            >
              {HERO_ICONS.map((icon) => (
                <div
                  key={icon.label}
                  className={styles.heroIconWrap}
                  onMouseEnter={(e) =>
                    setTooltip({ label: icon.label, x: e.clientX, y: e.clientY })
                  }
                  onMouseMove={(e) =>
                    setTooltip((prev) =>
                      prev && prev.label === icon.label
                        ? { ...prev, x: e.clientX, y: e.clientY }
                        : prev
                    )
                  }
                >
                  <img src={icon.src} alt={icon.alt} className={styles.heroIconImg} />
                </div>
              ))}
              {tooltip && (
                <span
                  className={styles.heroIconTooltip}
                  aria-hidden
                  style={{
                    left:
                      tooltip.label === "collaboration"
                        ? tooltip.x - TOOLTIP_OFFSET_X
                        : tooltip.x + TOOLTIP_OFFSET_X,
                    top: tooltip.y + TOOLTIP_OFFSET_Y,
                    transform:
                      tooltip.label === "collaboration"
                        ? "translateX(-100%)"
                        : undefined,
                  }}
                >
                  {tooltipDisplayed}
                  <span className={styles.heroIconTooltipCursor} aria-hidden>|</span>
                </span>
              )}
            </div>
            </div>
          </section>

          {/* How my heart is filled — filmstrip */}
          <section className={styles.filmSection}>
          <h2 className={styles.sectionTitle}>How my heart is filled</h2>
          <div className={styles.filmStripWrap}>
            <div className={styles.filmStripTrack}>
              {[1, 2].map((set) =>
                Array.from({ length: 11 }, (_, i) => i + 1).map((n) => (
                  <div key={`${set}-${n}`} className={styles.filmCell}>
                    <img
                      src={`/about/photo-${n}.jpg`}
                      alt=""
                      className={styles.filmPhoto}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
