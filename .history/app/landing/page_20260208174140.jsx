import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import styles from "./landing.module.css";

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
  return (
    <div className={styles.page}>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroWavy} aria-hidden>
            <svg viewBox="0 0 120 400" preserveAspectRatio="none">
              <path
                d="M20 0 Q40 80 20 120 Q0 160 20 200 Q40 240 20 280 Q0 320 20 360 Q40 400 20 400"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.4"
              />
              <path
                d="M40 0 Q60 60 40 100 Q20 140 40 180 Q60 220 40 260 Q20 300 40 340 Q60 380 40 400"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                opacity="0.3"
              />
              <path
                d="M60 0 Q80 70 60 130 Q40 190 60 250 Q80 310 60 370 Q40 400 60 400"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.35"
                opacity="0.25"
              />
            </svg>
          </div>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleAccent}>CUC</span>{" "}
              <span className={styles.heroTitleScriptWrap}>
                <span className={styles.heroTitleScript}>Vy</span>
                <span className={styles.heroTriangle} aria-hidden />
              </span>{" "}
              <span className={styles.heroTitleAccent}>TRINH</span>
            </h1>
            <p className={styles.heroSubtitle}>[Graphic Designer]</p>
          </div>
          <div className={styles.heroIcons}>
            <div className={styles.heroIcon} data-icon="star" aria-hidden />
            <div className={styles.heroIcon} data-icon="spiral" aria-hidden />
            <div className={styles.heroIcon} data-icon="eye" aria-hidden />
            <div className={styles.heroIcon} data-icon="pattern" aria-hidden />
          </div>
        </section>

        <section id="about" className={styles.about}>
          <div className={styles.aboutShape} aria-hidden />
          <p className={styles.aboutText}>
            Specializing in{" "}
            <mark className={styles.highlight}>Graphic Design</mark>,{" "}
            <mark className={styles.highlight}>UX/UI Design</mark>, and Front-End
            Development. I turn ideas into intuitive, visually refined, and
            user-centered digital experiences.
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
