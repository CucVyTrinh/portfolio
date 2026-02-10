"use client";

import { useState, useEffect } from "react";
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

export default function LandingPage() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % ROTATING_TITLES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

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
                {ROTATING_TITLES[titleIndex]}
              </p>
              <div className={styles.heroIcons}>
                <img src="/landing/empathy.png" alt="Empathy" className={styles.heroIconImg} />
                <img src="/landing/creativity.png" alt="Creative" className={styles.heroIconImg} />
                <img src="/landing/perfection.png" alt="Perfection" className={styles.heroIconImg} />
                <img src="/landing/collaboration.png" alt="Collaboration" className={styles.heroIconImg} />
              </div>
            </div>
          </div>
          <a href="#about" className={styles.heroScrollIndicator} aria-label="Scroll to content">
            <span className={styles.heroScrollArrow} />
          </a>
        </section>

        <section id="about" className={styles.about}>
          <p className={styles.aboutText}>
            Specializing in{" "}
            <span className={styles.highlightTerm}>Graphic Design</span>,{" "}
            <span className={styles.highlightTerm}>UX/UI Design</span>, and{" "}
            <span className={styles.highlightTerm}>Front-end Development</span>.
            I turn ideas into intuitive, visually refined, and user-centered
            digital experiences.
          </p>
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
      </main>

      <Footer />
    </div>
  );
}
