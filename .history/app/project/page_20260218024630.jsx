"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./page.module.css";

const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "ux-ui", label: "UX/UI DESIGN" },
  { id: "graphic", label: "GRAPHIC DESIGN" },
  { id: "motion", label: "MOTION GRAPHIC" },
];

// Placeholder projects – replace with your own data and images later.
// Each project has: title, description, tags, imageLeft, image, category, slug (optional – links to /project/[slug])
const PROJECTS = [
  {
    id: "1",
    title: "SafeSpace",
    description: "UX/UI Design & App Development",
    tags: ["Case Study"],
    imageLeft: false,
    image: "/landing/projects/safespace.jpg",
    category: "ux-ui",
    slug: null,
  },
  {
    id: "2",
    title: "Miên",
    description: "Packaging & Brand Design",
    tags: ["Illustrator", "Photoshop"],
    imageLeft: true,
    image: "/landing/projects/mien.jpg",
    category: "graphic",
    slug: "mien",
  },
  {
    id: "3",
    title: "Reijin",
    description: "Conceptual Poster Series",
    tags: ["Photoshop", "Illustration"],
    imageLeft: false,
    image: "/landing/projects/reijin.jpg",
    category: "graphic",
    slug: null,
  },
  {
    id: "4",
    title: "Project placeholder",
    description: "Motion & Animation",
    tags: ["After Effects"],
    imageLeft: true,
    image: null,
    category: "motion",
    slug: null,
  },
];

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className={styles.page}>
      <Header />

      <main>
        <section className={styles.projectsHero} aria-label="Featured projects">
          <div className={styles.projectsHeroInner}>
            <div className={styles.projectsHeroTitleWrap}>
              <span className={styles.projectsHeroLabel}>Featured</span>
              <h1 className={styles.projectsHeroTitle}>Projects</h1>
            </div>
            <nav className={styles.projectsNav} aria-label="Project categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.projectsNavLink} ${
                    activeCategory === cat.id ? styles.projectsNavLinkActive : ""
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-current={activeCategory === cat.id ? "true" : undefined}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <div className={styles.projectsContent}>
          <div className={styles.projectList}>
            {filteredProjects.length === 0 ? (
              <p className={styles.emptyState}>
                No projects in this category yet. Check back soon.
              </p>
            ) : (
              filteredProjects.map((project, i) => {
                const cardClass = `${styles.projectCard} ${
                  i % 2 === 0
                    ? styles.projectCardLeafOdd
                    : styles.projectCardLeafEven
                } ${project.imageLeft ? styles.projectCardReversed : ""}`;
                const content = (
                  <>
                    <div className={styles.projectCardText}>
                      <h2 className={styles.projectCardTitle}>
                        {project.title}
                      </h2>
                      <p className={styles.projectCardDesc}>
                        {project.description}
                      </p>
                      <div className={styles.projectTags}>
                        {project.tags.map((tag) => (
                          <span key={tag} className={styles.projectTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.projectCardImage}>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className={styles.projectCardImg}
                        />
                      ) : (
                        <div
                          className={styles.projectImagePlaceholder}
                          aria-hidden
                        />
                      )}
                    </div>
                  </>
                );
                return project.slug ? (
                  <Link
                    key={project.id}
                    href={`/project/${project.slug}`}
                    className={cardClass}
                  >
                    {content}
                  </Link>
                ) : (
                  <article key={project.id} className={cardClass}>
                    {content}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
