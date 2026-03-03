"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const IMG = "/project/SafeSpace";

const OVERVIEW =
  "SafeSpace is a mobile application that creates an emotional and mental support system for young adults. The app provides a safe, anonymous space for users to express their feelings, connect with peers, and access resources for mental wellness.";

const PROJECT_DETAILS = {
  role: "Product Designer, UX/UI Designer",
  tools: "Figma, Illustrator, After Effects",
  duration: "4 weeks",
};

const KEY_FEATURES = [
  { title: "Anonymous Support", body: "Users can share and receive support without revealing their identity, reducing stigma and encouraging openness." },
  { title: "Community Connection", body: "Connect with peers who understand your experiences through moderated, safe channels and group activities." },
];

const BRAINSTORMING_ITEMS = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Idea ${i + 1}`,
  text: "Placeholder concept or sketch description for this ideation cell.",
}));

const BRAND_COLORS = [
  { name: "Purple", hex: "#8B7BBD" },
  { name: "Orange", hex: "#E07A5F" },
  { name: "Yellow", hex: "#F4D35E" },
  { name: "Grey", hex: "#6C757D" },
  { name: "Black", hex: "#171717" },
];

export default function SafeSpaceProjectPage() {
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

  const setRef = (i) => (el) => (partRefs.current[i] = el);

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

        {/* Hero: title + subtitle (same layout as Mien) + phone mockups + Overview | Project Details */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>SafeSpace</h1>
            <p className={styles.heroSubtitle}>App for Safer Worksites</p>
          </div>
          <div className={styles.heroPhones}>
            <Image
              src={`${IMG}/title-mockup.png`}
              alt="SafeSpace app on multiple devices"
              width={1200}
              height={600}
              className={styles.heroPhonesImg}
              unoptimized
            />
          </div>
          <div className={styles.heroTwoCol}>
            <div className={`${styles.heroBlock} ${styles.scrollReveal}`} ref={setRef(0)}>
              <h2 className={styles.heroHeading}>Overview</h2>
              <p className={styles.heroBody}>{OVERVIEW}</p>
            </div>
            <div className={`${styles.heroBlock} ${styles.scrollReveal}`} ref={setRef(1)}>
              <h2 className={styles.heroHeading}>Project Details</h2>
              <ProjectInfoCard
                role={PROJECT_DETAILS.role}
                tools={PROJECT_DETAILS.tools}
                duration={PROJECT_DETAILS.duration}
              />
            </div>
          </div>
        </section>

        {/* Introduction: The Challenge / The Solution */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(2)}>
            Introduction
          </h2>
          <p className={`${styles.bodyText} ${styles.scrollReveal}`} ref={setRef(3)}>
            SafeSpace was born from a need to give young adults a judgment-free space to process emotions and find support. This section outlines the challenge we set out to solve and the solution we designed.
          </p>
          <div className={`${styles.challengeSolutionBox} ${styles.scrollReveal}`} ref={setRef(4)}>
            <h3 className={styles.subHeading}>The Challenge</h3>
            <p className={styles.bodyText}>
              Young adults often face stigma when seeking mental health support. Many feel isolated, unable to express their feelings openly, or unsure where to turn. Existing resources can feel clinical, inaccessible, or not tailored to their needs.
            </p>
            <div className={styles.dividerDots} aria-hidden />
            <p className={styles.bodyText}>
              We needed to understand how to create a product that felt safe, approachable, and genuinely supportive without feeling like another formal therapy tool.
            </p>
            <h3 className={styles.subHeading}>The Solution</h3>
            <p className={styles.bodyText}>
              SafeSpace is a mobile app that combines anonymous peer support, guided reflection, and accessible resources in one place. Through empathetic design and clear information architecture, we created an emotional support system that meets users where they are.
            </p>
          </div>
        </section>

        {/* Mobile UI mockup + Key Features (Empathy) */}
        <section className={styles.section}>
          <div className={styles.uiFeatureRow}>
            <div className={`${styles.uiMockupWrap} ${styles.scrollReveal}`} ref={setRef(5)}>
              <div className={styles.phoneFrame}>
                <Image
                  src={`${IMG}/title-mockup.png`}
                  alt="SafeSpace app interface"
                  width={320}
                  height={640}
                  className={styles.phoneScreenImg}
                  unoptimized
                />
              </div>
            </div>
            <div className={styles.featureCol}>
              <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(6)}>
                Empathy
              </h3>
              <p className={`${styles.bodyText} ${styles.scrollReveal}`} ref={setRef(7)}>
                Every interaction in SafeSpace is designed to make users feel heard and supported. From the tone of copy to the flow of screens, we prioritized emotional clarity and a sense of safety.
              </p>
              <h4 className={`${styles.keyFeaturesTitle} ${styles.scrollReveal}`} ref={setRef(8)}>
                Key Features
              </h4>
              {KEY_FEATURES.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`${styles.keyFeatureItem} ${styles.scrollReveal}`}
                  ref={setRef(9 + i)}
                >
                  <h5 className={styles.keyFeatureTitle}>{feat.title}</h5>
                  <p className={styles.keyFeatureBody}>{feat.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Research - Empathy Map */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(11)}>
            User Research
          </h2>
          <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(12)}>
            Empathy Map
          </h3>
          <div className={styles.empathyCards}>
            <div className={`${styles.empathyCard} ${styles.empathyCardOrange} ${styles.scrollReveal}`} ref={setRef(13)}>
              <Image
                src={`${IMG}/Persona - Primary.jpg`}
                alt="Primary persona"
                width={200}
                height={200}
                className={styles.empathyAvatar}
                unoptimized
              />
              <div className={styles.empathyMeta}>
                <span className={styles.empathyName}>Sarah</span>
                <span className={styles.empathyAge}>19</span>
                <span className={styles.empathyRole}>College Student</span>
              </div>
              <div className={styles.empathySections}>
                <p><strong>Goals:</strong> Balance studies and mental wellness; find peer support.</p>
                <p><strong>Needs:</strong> Safe space to vent; accessible resources.</p>
                <p><strong>Pains:</strong> Anxiety about judgment; lack of time.</p>
                <p><strong>Behaviors:</strong> Uses social apps for connection; searches for coping strategies.</p>
              </div>
            </div>
            <div className={`${styles.empathyCard} ${styles.empathyCardBlue} ${styles.scrollReveal}`} ref={setRef(14)}>
              <Image
                src={`${IMG}/Persona - Secondary.jpg`}
                alt="Secondary persona"
                width={200}
                height={200}
                className={styles.empathyAvatar}
                unoptimized
              />
              <div className={styles.empathyMeta}>
                <span className={styles.empathyName}>David</span>
                <span className={styles.empathyAge}>22</span>
                <span className={styles.empathyRole}>Young Professional</span>
              </div>
              <div className={styles.empathySections}>
                <p><strong>Goals:</strong> Manage stress; maintain boundaries; feel understood.</p>
                <p><strong>Needs:</strong> Quick, low-friction support; privacy.</p>
                <p><strong>Pains:</strong> Burnout; stigma at work.</p>
                <p><strong>Behaviors:</strong> Reads self-help; prefers anonymous forums.</p>
              </div>
            </div>
          </div>
        </section>

        {/* User Flow */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(15)}>
            User Flow
          </h2>
          <div className={`${styles.flowDiagramWrap} ${styles.scrollReveal}`} ref={setRef(16)}>
            <Image
              src={`${IMG}/userflow.jpg`}
              alt="SafeSpace user flow diagram"
              width={1200}
              height={600}
              className={styles.flowDiagramImg}
              unoptimized
            />
          </div>
        </section>

        {/* Ideation - Brainstorming */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(17)}>
            Ideation
          </h2>
          <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(18)}>
            Brainstorming
          </h3>
          <div className={styles.brainstormGrid}>
            {BRAINSTORMING_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`${styles.brainstormCell} ${styles.scrollReveal}`}
                ref={setRef(19 + i)}
              >
                <div className={styles.brainstormIcon} aria-hidden />
                <p className={styles.brainstormTitle}>{item.title}</p>
                <p className={styles.brainstormText}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Identity: Colors, Gradients, Logos & Icons */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(31)}>
            Brand Identity
          </h2>

          <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(32)}>
            Colors
          </h3>
          <div className={`${styles.colorRow} ${styles.scrollReveal}`} ref={setRef(33)}>
            <Image
              src={`${IMG}/color-palette.jpg`}
              alt="SafeSpace color palette"
              width={800}
              height={200}
              className={styles.colorPaletteImg}
              unoptimized
            />
            <div className={styles.colorSwatchesInline}>
              {BRAND_COLORS.map((c) => (
                <div key={c.hex} className={styles.colorSwatch} style={{ background: c.hex }} title={c.hex}>
                  <span className={styles.colorLabel}>{c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(34)}>
            Gradients
          </h3>
          <div className={`${styles.gradientRow} ${styles.scrollReveal}`} ref={setRef(35)}>
            <div className={styles.gradientBox} style={{ background: "linear-gradient(135deg, #E07A5F 0%, #F4D35E 30%, #8B7BBD 70%, #3d2b56 100%)" }} />
            <div className={styles.gradientBox} style={{ background: "linear-gradient(180deg, #4a4a4a 0%, #171717 100%)" }} />
          </div>

          <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(36)}>
            Logos & Icons
          </h3>
          <div className={`${styles.logosRow} ${styles.scrollReveal}`} ref={setRef(37)}>
            <div className={styles.logoItem}>
              <Image
                src={`${IMG}/logo.jpg`}
                alt="SafeSpace primary logo"
                width={200}
                height={200}
                className={styles.logoImg}
                unoptimized
              />
              <p className={styles.logoCaption}>Primary logo</p>
            </div>
            <div className={styles.logoItem}>
              <Image
                src={`${IMG}/logo-text.jpg`}
                alt="SafeSpace text logo"
                width={280}
                height={80}
                className={styles.logoTextImg}
                unoptimized
              />
              <p className={styles.logoCaption}>Text logo</p>
            </div>
            <div className={styles.logoItem}>
              <Image
                src={`${IMG}/logo-slogan.jpg`}
                alt="SafeSpace logo and slogan"
                width={280}
                height={120}
                className={styles.logoSloganImg}
                unoptimized
              />
              <p className={styles.logoCaption}>Logo & slogan</p>
            </div>
          </div>
        </section>

        <div className={styles.backLinkWrap}>
          <Link href="/project" className={styles.backLink}>← Back to Projects</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
