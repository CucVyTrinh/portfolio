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

const FILM_PHOTO_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const PUNCHUP_SPOTS = [
  { id: "coffee", baseSrc: "/punchUp/Coffee.png", withVySrc: "/punchUp/Coffee W Vy.png", alt: "Coffee" },
  { id: "park", baseSrc: "/punchUp/Park.png", withVySrc: "/punchUp/Park W Vy.png", alt: "Park" },
  { id: "rain", baseSrc: "/punchUp/Rain.png", withVySrc: "/punchUp/Rain W Vy.png", alt: "Rain" },
];

function FilmPhoto({ number, className }) {
  return (
    <img
      src={`/about/photo-${number}.png`}
      alt=""
      className={className}
    />
  );
}

export default function AboutPage() {
  const [vyFrame, setVyFrame] = useState(0); // 0 = vy-1, 1 = vy-2
  const [vyFlipped, setVyFlipped] = useState(false); // mobile: click to flip
  const [vyGraphicHovered, setVyGraphicHovered] = useState(false); // desktop: flip only when hovering the graphic
  const [tooltip, setTooltip] = useState(null);
  const [tooltipDisplayed, setTooltipDisplayed] = useState("");
  const [isDraggingVyPixel, setIsDraggingVyPixel] = useState(false);
  const [filledSpots, setFilledSpots] = useState({});
  const tooltipIntervalRef = useRef(null);
  const tooltipLeaveTimeoutRef = useRef(null);
  const vyGraphicLeaveTimeoutRef = useRef(null);
  const punchUpCharacterRef = useRef(null);

  // Waving: alternate vy-1 and vy-2 (slower)
  useEffect(() => {
    const t = setInterval(() => setVyFrame((f) => (f + 1) % 2), 950);
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

  useEffect(() => {
    return () => {
      if (tooltipLeaveTimeoutRef.current) clearTimeout(tooltipLeaveTimeoutRef.current);
      if (vyGraphicLeaveTimeoutRef.current) clearTimeout(vyGraphicLeaveTimeoutRef.current);
    };
  }, []);

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
              <div
                className={`${styles.vyFlipWrap} ${vyGraphicHovered ? styles.vyFlipWrapGraphicHovered : ""}`}
                onMouseLeave={() => {
                  if (vyGraphicLeaveTimeoutRef.current) {
                    clearTimeout(vyGraphicLeaveTimeoutRef.current);
                    vyGraphicLeaveTimeoutRef.current = null;
                  }
                  vyGraphicLeaveTimeoutRef.current = setTimeout(() => {
                    setVyGraphicHovered(false);
                    vyGraphicLeaveTimeoutRef.current = null;
                  }, 200);
                }}
              >
                <div className={styles.vyFlipHint}>
                  <span className={`${styles.vyFlipHintText} ${styles.vyFlipHintDesktop}`}>Hover!👀</span>
                  <span className={`${styles.vyFlipHintText} ${styles.vyFlipHintMobile}`}>Click</span>
                  <img src="/about/arrow.png" alt="" className={styles.vyFlipHintArrow} aria-hidden />
                </div>
                <div className={styles.vyFlipInner}>
                  <div className={styles.vyFlipFront}>
                    <div className={styles.helloGraphicWrap}>
                      <div
                        className={styles.helloGraphicHoverZone}
                        onMouseEnter={() => {
                          if (vyGraphicLeaveTimeoutRef.current) {
                            clearTimeout(vyGraphicLeaveTimeoutRef.current);
                            vyGraphicLeaveTimeoutRef.current = null;
                          }
                          setVyGraphicHovered(true);
                        }}
                        aria-hidden
                      />
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
                  <div className={styles.vyFlipBack}>
                    <img src="/about/vy-flip.png" alt="Vy" className={styles.vyPhotoFlip} />
                  </div>
                </div>
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
              onMouseLeave={() => {
                tooltipLeaveTimeoutRef.current = setTimeout(() => setTooltip(null), 100);
              }}
              onMouseEnter={() => {
                if (tooltipLeaveTimeoutRef.current) {
                  clearTimeout(tooltipLeaveTimeoutRef.current);
                  tooltipLeaveTimeoutRef.current = null;
                }
              }}
            >
              {HERO_ICONS.map((icon) => (
                <div
                  key={icon.label}
                  className={styles.heroIconWrap}
                  onMouseEnter={(e) => {
                    if (tooltipLeaveTimeoutRef.current) {
                      clearTimeout(tooltipLeaveTimeoutRef.current);
                      tooltipLeaveTimeoutRef.current = null;
                    }
                    setTooltip({ label: icon.label, x: e.clientX, y: e.clientY });
                  }}
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


{/*________________________________________________________________________________________*/}
{/*________________________________________________________________________________________*/}
{/*punch up section*/} 

          <section className={styles["punch-up-section"]} aria-label="Drag and drop hobbies">
            <div className={styles["punch-up-top-row"]}>
              <div className={styles["punch-up-character-vy"]}>
                {/*draggable character*/}
                <img
                  ref={punchUpCharacterRef}
                  src={isDraggingVyPixel ? "/punchUp/vy-pixel-2.png" : "/punchUp/vy-pixel-1.png"}
                  alt="Vy pixel character"
                  className={styles["punch-up-character-sprite"]}
                  draggable
                  onMouseDown={() => setIsDraggingVyPixel(true)}
                  onMouseUp={() => setIsDraggingVyPixel(false)}
                  onDragStart={(e) => {
                    setIsDraggingVyPixel(true);
                    if (e.dataTransfer && punchUpCharacterRef.current) {
                      const renderedWidth = Math.max(
                        1,
                        Math.round(punchUpCharacterRef.current.clientWidth)
                      );
                      const renderedHeight = Math.max(
                        1,
                        Math.round(punchUpCharacterRef.current.clientHeight)
                      );
                      e.dataTransfer.setDragImage(
                        punchUpCharacterRef.current,
                        Math.round(renderedWidth / 2),
                        Math.round(renderedHeight / 2)
                      );
                    }
                  }}
                  onDragEnd={() => setIsDraggingVyPixel(false)}
                />
              </div>
              <div className={styles["punch-up-info-box"]}>
                <p className={styles["punch-up-info-kicker"]}>tired of reading? take a little break</p>
                <h3 className={styles["punch-up-info-title"]}>Vy, where are you??</h3>
                <p className={styles["punch-up-info-copy"]}>click and drag me to find out my favorite little spots!</p>
              </div>
            </div>
            {/*grrid of drop spots*/}
            <div className={styles["punch-up-grid"]}>
              {PUNCHUP_SPOTS.map((spot) => {
                const isFilled = Boolean(filledSpots[spot.id]);
                return (
                  <button
                    key={spot.id}
                    type="button"
                    className={styles["punch-up-spot"]}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      setFilledSpots((prev) => ({ ...prev, [spot.id]: true }));
                      setIsDraggingVyPixel(false);
                    }}
                  >
                    {/*Image switching*/}
                    <img
                      src={isFilled ? spot.withVySrc : spot.baseSrc}
                      alt={isFilled ? `${spot.alt} with Vy` : spot.alt}
                      className={styles["punch-up-spot-image"]}
                    />
                  </button>
                );
              })}
            </div>
          </section>
{/*________________________________________________________________________________________*/}
{/*________________________________________________________________________________________*/}

          {/* Filmstrip */}
          <section className={styles.filmSection}>
          <div className={styles.filmStripWrap}>
            <div className={styles.filmStripScroll}>
              <div className={styles.filmStripLine} data-position="top" aria-hidden />
              <div className={styles.filmStripTrack}>
              {[1, 2].map((set) =>
                FILM_PHOTO_NUMBERS.map((n) => (
                  <div
                    key={`${set}-${n}`}
                    className={styles.filmCell}
                    style={{ flex: `0 0 calc(100% / ${FILM_PHOTO_NUMBERS.length})` }}
                  >
                    <FilmPhoto number={n} className={styles.filmPhoto} />
                  </div>
                ))
              )}
              </div>
              <div className={styles.filmStripLine} data-position="bottom" aria-hidden />
            </div>
          </div>
          <p className={styles.filmCaption}>Ouch...my heart is so full</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
