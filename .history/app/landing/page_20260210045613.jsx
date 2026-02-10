"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import styles from "./landing.module.css";

const ROTATING_TITLES = [
  "[Graphic Designer]",
  "[UX/UI Designer]",
  "[Front-end Developer]",
];

const PROJECTS = [
  {
    title: "Miên",
    description: "Packaging & Brand Design",
    tags: ["Studio Art", "Packaging"],
    imageLeft: false,
  },
  {
    title: "Reijin",
    description: "Conceptual Poster Series",
    tags: ["Photoshop", "Illustration"],
    imageLeft: true,
  },
  {
    title: "Miên",
    description: "Packaging & Brand Design",
    tags: ["Studio Art", "Packaging"],
    imageLeft: false,
  },
  {
    title: "Reijin",
    description: "Conceptual Poster Series",
    tags: ["Photoshop", "Illustration"],
    imageLeft: true,
  },
  {
    title: "Miên",
    description: "Packaging & Brand Design",
    tags: ["Studio Art", "Packaging"],
    imageLeft: false,
  },
];

const TYPEWRITER_SPEED_MS = 70;
const PAUSE_AFTER_TYPE_MS = 1500;
const DELETE_SPEED_MS = 50;

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

export default function LandingPage() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [tooltip, setTooltip] = useState(null);
  const [tooltipDisplayed, setTooltipDisplayed] = useState("");
  const [pillTooltip, setPillTooltip] = useState(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const tooltipIntervalRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const full = ROTATING_TITLES[titleIndex];
    setDisplayedRole("");
    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i < full.length) {
        setDisplayedRole(full.slice(0, i + 1));
        i++;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        // Typing complete → pause → delete backward → then advance to next title
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          intervalRef.current = setInterval(() => {
            setDisplayedRole((prev) => {
              if (prev.length <= 1) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setTitleIndex((idx) => (idx + 1) % ROTATING_TITLES.length);
                return "";
              }
              return prev.slice(0, -1);
            });
          }, DELETE_SPEED_MS);
        }, PAUSE_AFTER_TYPE_MS);
      }
    }, TYPEWRITER_SPEED_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [titleIndex]);

  /* Typewriter effect for tooltip label when hovering an icon */
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
      if (tooltipIntervalRef.current) {
        clearInterval(tooltipIntervalRef.current);
        tooltipIntervalRef.current = null;
      }
    };
  }, [tooltip?.label]);

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleAccent}>CUC</span>
              <span className={styles.heroTitleVyWrap}>
                <span className={styles.heroTitleVy}>VY</span>
              </span>
              <span className={styles.heroTitleAccent}>TRINH</span>
            </h1>
            <div className={styles.heroRoleRow}>
              <p className={styles.heroSubtitle} aria-live="polite">
                {displayedRole}
                <span className={styles.heroSubtitleCursor} aria-hidden>|</span>
              </p>
              <div
                className={styles.heroIcons}
                onMouseLeave={() => setTooltip(null)}
              >
                {HERO_ICONS.map((icon) => (
                  <div
                    key={icon.label}
                    className={styles.heroIconWrap}
                    onMouseEnter={(e) => setTooltip({ label: icon.label, x: e.clientX, y: e.clientY })}
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
              </div>
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
          <a
            href="#about"
            className={styles.heroScrollIndicator}
            aria-label="Scroll down"
            onClick={(e) => {
              e.preventDefault();
              if (aboutRef.current) {
                const rect = aboutRef.current.getBoundingClientRect();
                const scrollTop =
                  window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
                window.scrollTo({ top: scrollTop, behavior: "smooth" });
              }
            }}
          >
            <span className={styles.heroScrollArrow} />
          </a>
        </section>

        <div className={styles.mainContentWrap}>
          <div className={styles.contentBgImages} aria-hidden>
            <span className={styles.contentBgImg} data-img="empathy" />
            <span className={styles.contentBgImg} data-img="creativity" />
            <span className={styles.contentBgImg} data-img="perfection" />
            <span className={styles.contentBgImg} data-img="collaboration" />
          </div>

          <section
            id="about"
            ref={aboutRef}
            className={styles.about}
            onMouseLeave={() => setPillTooltip(null)}
          >
            <p className={styles.aboutText}>
              Specializing in{" "}
              <span
                className={styles.aboutPill}
                onMouseEnter={(e) =>
                  setPillTooltip({ x: e.clientX, y: e.clientY })
                }
                onMouseMove={(e) =>
                  setPillTooltip((prev) =>
                    prev ? { ...prev, x: e.clientX, y: e.clientY } : null
                  )
                }
                onMouseLeave={() => setPillTooltip(null)}
              >
                Graphic Design
              </span>
              ,{" "}
              <span
                className={styles.aboutPill}
                onMouseEnter={(e) =>
                  setPillTooltip({ x: e.clientX, y: e.clientY })
                }
                onMouseMove={(e) =>
                  setPillTooltip((prev) =>
                    prev ? { ...prev, x: e.clientX, y: e.clientY } : null
                  )
                }
                onMouseLeave={() => setPillTooltip(null)}
              >
                UX/UI Design
              </span>
              ,{" "}
              <span
                className={styles.aboutPill}
                onMouseEnter={(e) =>
                  setPillTooltip({ x: e.clientX, y: e.clientY })
                }
                onMouseMove={(e) =>
                  setPillTooltip((prev) =>
                    prev ? { ...prev, x: e.clientX, y: e.clientY } : null
                  )
                }
                onMouseLeave={() => setPillTooltip(null)}
              >
                Front-End Development
              </span>
              , and{" "}
              <span
                className={styles.aboutPill}
                onMouseEnter={(e) =>
                  setPillTooltip({ x: e.clientX, y: e.clientY })
                }
                onMouseMove={(e) =>
                  setPillTooltip((prev) =>
                    prev ? { ...prev, x: e.clientX, y: e.clientY } : null
                  )
                }
                onMouseLeave={() => setPillTooltip(null)}
              >
                Motion Graphic
              </span>
              .
              <br />
              I turn ideas into intuitive, visually refined,
              <br />
              and user-centered digital experiences.
            </p>
            {pillTooltip && (
              <span
                className={styles.aboutPillTooltip}
                aria-hidden
                style={{
                  left: pillTooltip.x + TOOLTIP_OFFSET_X,
                  top: pillTooltip.y + TOOLTIP_OFFSET_Y,
                }}
              >
                [View Projects]
              </span>
            )}
          </section>

          <section id="projects" className={styles.projects}>
          <h2 className={styles.projectsTitle}>Featured Projects</h2>
          <div className={styles.projectList}>
            {PROJECTS.map((project, i) => (
              <article
                key={i}
                className={`${styles.projectCard} ${
                  project.imageLeft ? styles.projectCardReversed : ""
                }`}
              >
                <div className={styles.projectCardText}>
                  <h3 className={styles.projectCardTitle}>{project.title}</h3>
                  <p className={styles.projectCardDesc}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.projectTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.projectCardImage}>
                  <div className={styles.projectImagePlaceholder} aria-hidden />
                </div>
              </article>
            ))}
          </div>
          <div className={styles.projectsCta}>
            <Link href="/project" className={styles.btnViewMore}>
              View More Projects
            </Link>
          </div>
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
