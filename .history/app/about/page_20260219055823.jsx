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

const JOYS = [
  { id: "music", label: "Music", size: "big" },
  { id: "parks", label: "Parks", size: "big" },
  { id: "art", label: "Art", size: "medium" },
  { id: "coffee", label: "Coffee", size: "medium" },
  { id: "snoopy", label: "Snoopy", size: "small" },
  { id: "chocolate", label: "Chocolate", size: "small" },
  { id: "bunmoc", label: "Bun Moc", size: "small" },
  { id: "fashion", label: "Fashion", size: "small" },
  { id: "travelling", label: "Travelling", size: "small" },
];

const INTRO_PARAGRAPHS = [
  "My name is Vy. I'm a digital designer with front-end development skills who is constantly exploring new ideas, experimenting with visual directions, and challenging myself to step beyond what feels familiar.",
  "I enjoy experimenting with new color combinations, creative graphics, and layered details - but more importantly, I care about meaning. Every design decision I make is intentional. I strive to create work where visuals, interaction, and storytelling connect seamlessly to communicate something deeper than just aesthetics.",
  "The four qualities below reflect the core values that shape my work.",
];

export default function AboutPage() {
  const [vyFrame, setVyFrame] = useState(0); // 0 = vy-1, 1 = vy-2
  const [tooltip, setTooltip] = useState(null);
  const [tooltipDisplayed, setTooltipDisplayed] = useState("");
  const tooltipIntervalRef = useRef(null);
  const initialJoyPositions = () => [
    { x: 38, y: 32 },   /* Music - big, central */
    { x: 62, y: 8 },    /* Parks - big, upper right */
    { x: 5, y: 28 },    /* Art - medium, left */
    { x: 58, y: 38 },   /* Coffee - medium, middle right */
    { x: 8, y: 62 },    /* Snoopy - small, lower left */
    { x: 72, y: 12 },   /* Chocolate - small, top right */
    { x: 68, y: 22 },   /* Bun Moc - small, upper right */
    { x: 65, y: 58 },   /* Fashion - small, lower right */
    { x: 70, y: 68 },   /* Travelling - small, bottom right */
    { x: 12, y: 78 },   /* the earthy scent... - small, bottom center */
  ];
  const [joyPositions, setJoyPositions] = useState(initialJoyPositions());
  const dragRef = useRef({ index: null, startX: 0, startY: 0, startLeft: 0, startTop: 0 });

  // Waving: alternate vy-1 and vy-2 every 400ms
  useEffect(() => {
    const t = setInterval(() => setVyFrame((f) => (f + 1) % 2), 400);
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

  const handleJoyPointerDown = (e, index) => {
    e.preventDefault();
    dragRef.current = {
      index,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: joyPositions[index].x,
      startTop: joyPositions[index].y,
    };
    const onMove = (e) => {
      const dx = (e.clientX - dragRef.current.startX) / 2;
      const dy = (e.clientY - dragRef.current.startY) / 2;
      setJoyPositions((prev) => {
        const next = [...prev];
        next[dragRef.current.index] = {
          x: Math.max(0, Math.min(78, dragRef.current.startLeft + dx)),
          y: Math.max(0, Math.min(72, dragRef.current.startTop + dy)),
        };
        return next;
      });
    };
    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

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

        {/* Hello / Introduction — left: greeting on top, graphic below; right: 3 paragraphs + 4 icons */}
        <section className={styles.hello}>
          <div className={styles.helloLeft}>
            <div className={styles.helloTitleWrap}>
              <span className={styles.helloLabel}>Xin Chào!</span>
              <h1 className={styles.helloTitle}>Hello!</h1>
            </div>
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
              {INTRO_PARAGRAPHS.map((text, i) => (
                <p key={i} className={styles.helloIntro}>{text}</p>
              ))}
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

        {/* My Joys */}
        <section className={styles.joysSection}>
          <h2 className={styles.sectionTitle}>My Joys</h2>
          <div className={styles.joysFrame}>
            {JOYS.map((joy, index) => (
              <span
                key={joy.id}
                className={`${styles.joyItem} ${styles[`joySize_${joy.size}`]}`}
                style={{
                  left: `${joyPositions[index].x}%`,
                  top: `${joyPositions[index].y}%`,
                }}
                onPointerDown={(e) => handleJoyPointerDown(e, index)}
                draggable={false}
              >
                {joy.label}
              </span>
            ))}
            <span
              className={`${styles.joyItem} ${styles.joySize_small} ${styles.joyItalic}`}
              style={{
                left: `${joyPositions[9].x}%`,
                top: `${joyPositions[9].y}%`,
              }}
              onPointerDown={(e) => handleJoyPointerDown(e, 9)}
              draggable={false}
            >
              the earthy scent of rain falling on dry soil
            </span>
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
      </main>
      <Footer />
    </div>
  );
}
