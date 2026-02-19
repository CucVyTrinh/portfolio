"use client";

import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const BARRIERS = [
  "Fear of retaliation",
  "Concern about not being believed",
  "Lack of evidence",
  "Overwhelming reporting forms",
  "Discomfort approaching supervisors",
  "Workplace cultures that normalize inappropriate behavior",
];

const FEATURES = [
  {
    num: "1",
    title: "One-Tap Recording Tool",
    body: "A large central navigation button allows immediate access to an audio recording feature. Workers can document incidents as they happen, minimizing loss of detail. Future development includes continuous 30-second audio buffering, automatic trigger-word detection, and Swift-based implementation for deeper system-level integration.",
  },
  {
    num: "2",
    title: "Secure Evidence Storage",
    body: "All recordings are passcode protected, encrypted, and stored privately. Even if a phone is unlocked, logs remain inaccessible without SafeSpace credentials. This design directly addresses user fears of retaliation or evidence tampering.",
  },
  {
    num: "3",
    title: "AI-Powered Transcription & Report Generation",
    body: "Each recording is automatically processed using GPT-4o Mini to generate accurate transcripts, time and location metadata, keyword tagging, and structured report summaries. Users are not required to fill out complex forms — the system transforms raw experience into formal documentation instantly.",
  },
  {
    num: "4",
    title: "Safi — Conversational Reporting Assistant",
    body: "Powered by IBM WatsonX, Safi acts as a conversational assistant that gently prompts memory recall, asks structured follow-up questions, and converts conversations into formal anonymous reports. Users can type or speak; save reports privately or share publicly. Addresses cognitive overload and emotional fatigue.",
  },
  {
    num: "5",
    title: "Public Safety Board",
    body: "A public board where anonymous reports can be shared. This creates visibility of patterns across worksites, community validation, shared awareness, and collective accountability. Safety grows when information is shared — not buried.",
  },
  {
    num: "6",
    title: "Leadership Web Supplement",
    body: "A web-based dashboard for foremen, union representatives, and industry leaders. Aggregates reports into pattern analysis, frequency tracking, and actionable recommendations. Transforms isolated reports into organizational insight.",
  },
];

const WORKFLOWS = [
  { label: "Immediate Incident", steps: "Record → Transcript → Auto-Report → Save/Share" },
  { label: "Pattern Behavior", steps: "Safi Conversation → Structured Report → Save/Share" },
  { label: "Public Awareness", steps: "Browse Reports → Identify Worksite Trends" },
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

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <h1 className={styles.heroTitle}>SafeSpace</h1>
            <p className={styles.heroSubtitle}>
              Anonymous Reporting for Gender-Minority Workers in Trades
            </p>
          </div>
          <div className={styles.heroTagline}>
            <p className={styles.heroTaglineText}>
              Workplaces should be safe for everyone — but bias, harassment, and exclusion still happen.
            </p>
          </div>
          <div className={styles.heroPlaceholder} aria-hidden>
            {/* Add hero mockup image here: e.g. app screens or device frame */}
          </div>
        </section>

        {/* Problem + Role card */}
        <section className={styles.section}>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(0)}>
                <h2 className={styles.sectionTitle}>The Problem</h2>
                <p className={styles.bodyText}>
                  Harassment, gender-bias, and discrimination remain deeply embedded in trade culture across Canada. A 2024 Canadian study found that over 60% of women and gender-diverse trade workers have experienced harassment. In a study by YWCA Halifax, 91% of 101 anonymous respondents reported experiencing sexual or gender-based harassment.
                </p>
                <p className={styles.bodyText}>
                  These experiences threaten not only safety, but also confidence, job retention, and long-term career growth. Yet despite the prevalence of harm, formal reports remain rare.
                </p>
              </div>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(1)}>
                <h3 className={styles.sectionSubtitle}>Silence Feels Safer Than Speaking Up</h3>
                <p className={styles.bodyText}>
                  For many gender-minority workers, reporting harassment feels intimidating, exhausting, or pointless. When reporting systems feel unsafe, silence becomes the only protective strategy — and that silence allows harmful behaviors to continue unchecked.
                </p>
                <ul className={styles.barriersList}>
                  {BARRIERS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(2)}>
                <ProjectInfoCard
                  role="UX/UI Designer, Researcher, Front-End Developer"
                  tools={"User research, product strategy\nLow-fi & high-fi prototyping\nInterface design, AI integration planning\nFront-end development"}
                  duration="Case Study"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quotes */}
        <section className={styles.section}>
          <div className={`${styles.quotesBlock} ${styles.scrollReveal}`} ref={setRef(3)}>
            <blockquote className={styles.quote}>
              &ldquo;I cried every day. And no matter what I said (…) They didn&apos;t care.&rdquo;
              <cite>— Participant, YWCA Halifax</cite>
            </blockquote>
            <blockquote className={styles.quote}>
              &ldquo;They don&apos;t feel comfortable being out at work because (…) they&apos;re being harassed to the point of being forced to leave the trade permanently.&rdquo;
              <cite>— SRDC, 2023</cite>
            </blockquote>
          </div>
        </section>

        {/* Project Background */}
        <section className={styles.section}>
          <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(4)}>
            <h2 className={styles.sectionTitle}>Project Background</h2>
            <p className={styles.bodyText}>
              SafeSpace was designed as a response to systemic underreporting within the trades industry. The goal: create a tool that allows gender-minority workers to document incidents safely, easily, and on their own terms — while also enabling long-term cultural change across worksites.
            </p>
            <p className={styles.bodyText}>
              Rather than focusing only on individual incidents, SafeSpace addresses immediate documentation needs, pattern-based harassment over time, community awareness, and leadership accountability. The product aims to reduce the emotional and procedural burden of reporting while strengthening collective visibility.
            </p>
          </div>
        </section>

        {/* The Solution — 6 features */}
        <section className={styles.section}>
          <div className={`${styles.sectionHeader} ${styles.scrollReveal}`} ref={setRef(5)}>
            <h2 className={styles.sectionTitle}>The Solution</h2>
            <p className={styles.sectionLead}>
              A secure, anonymous reporting ecosystem — mobile app and leadership web supplement.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {FEATURES.map((feat, i) => (
              <article
                key={feat.num}
                className={`${styles.featureCard} ${styles.scrollReveal}`}
                ref={setRef(6 + i)}
              >
                <span className={styles.featureNum} aria-hidden>{feat.num}</span>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureBody}>{feat.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Research & Process */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(12)}>
            Research & Process
          </h2>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(13)}>
                <h3 className={styles.sectionSubtitle}>Competitive Analysis</h3>
                <p className={styles.bodyText}>
                  Existing reporting systems revealed key limitations: HR-based reporting requires identity disclosure; government forms are complex and bureaucratic; anonymous hotlines lack documentation tools; no solutions specifically address trades culture. No integrated tool combined anonymity, AI assistance, secure documentation, and industry-specific reporting.
                </p>
              </div>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(14)}>
                <h3 className={styles.sectionSubtitle}>User Research</h3>
                <p className={styles.bodyText}>
                  Interviews and surveys with gender-minority trade workers revealed: reporting feels unsafe, documentation feels overwhelming, evidence collection is difficult, pattern-based harassment is common, and fear of being labeled &ldquo;difficult&rdquo; prevents action. Primary emotional needs: Safety, Control, Validation, Simplicity.
                </p>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={`${styles.personaCard} ${styles.block} ${styles.scrollReveal}`} ref={setRef(15)}>
                <h3 className={styles.sectionSubtitle}>User Persona Example</h3>
                <p className={styles.personaRole}>Electrical Apprentice, 24</p>
                <p className={styles.bodyText}>
                  Frequently talked down to by mentor; experiences repeated microaggressions; feels singled out; cannot recall exact dates; hesitant to escalate.
                </p>
                <p className={styles.personaPain}>Pain points: No hard evidence, reporting feels intimidating, fear of retaliation.</p>
                <p className={styles.bodyText}>
                  SafeSpace addresses this by allowing pattern documentation, AI-assisted recollection, anonymous storage, and optional public sharing.
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(16)}>
            <h3 className={styles.sectionSubtitle}>Workflow & Mapping</h3>
            <p className={styles.bodyText}>The reporting journey was mapped into three simplified flows:</p>
            <ul className={styles.workflowList}>
              {WORKFLOWS.map((w) => (
                <li key={w.label}>
                  <strong>{w.label}</strong> — {w.steps}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Design Journey */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(17)}>
            Design Journey
          </h2>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(18)}>
                <h3 className={styles.sectionSubtitle}>Brand Identity</h3>
                <p className={styles.bodyText}>
                  SafeSpace required a tone that balanced calm, professional, protective, and empowering. The visual language avoids aggressive design; soft but confident typography and accessible color palettes reflect trust and safety.
                </p>
              </div>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(19)}>
                <h3 className={styles.sectionSubtitle}>Color System</h3>
                <p className={styles.bodyText}>
                  Primary colors emphasize deep protective blues, muted purples representing solidarity, and neutral greys for professionalism. Accessibility contrast standards were prioritized.
                </p>
                <div className={styles.colorSwatches} aria-hidden>
                  <span className={styles.swatch} data-color="blue" />
                  <span className={styles.swatch} data-color="purple" />
                  <span className={styles.swatch} data-color="grey" />
                </div>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(20)}>
                <h3 className={styles.sectionSubtitle}>Typography</h3>
                <p className={styles.bodyText}>
                  Clean sans-serif type ensures readability in high-stress moments, legibility in outdoor job site conditions, and clear hierarchy for report summaries.
                </p>
              </div>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(21)}>
                <h3 className={styles.sectionSubtitle}>Low-Fidelity → High-Fidelity</h3>
                <p className={styles.bodyText}>
                  Low-fi prototypes focused on fast access, minimal navigation, and clear recording affordances. High-fi refinement introduced secure interface states, micro-interactions, visual reassurance cues, and AI transcription previews. Testing emphasized emotional clarity over decorative design.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.mockupPlaceholder} ref={setRef(22)} aria-hidden>
            {/* Add design mockups / screens here */}
          </div>
        </section>

        {/* Development & Broader Impact */}
        <section className={styles.section}>
          <div className={styles.twoColumnLayout}>
            <div className={styles.leftColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(23)}>
                <h2 className={styles.sectionTitle}>Development</h2>
                <p className={styles.bodyText}>
                  Front-end development focused on secure local storage handling, AI integration architecture, navigation prioritization, and data privacy structure. Future iterations include Swift-based rebuild, trigger-word detection, and continuous buffering implementation.
                </p>
              </div>
            </div>
            <div className={styles.rightColumn}>
              <div className={`${styles.block} ${styles.scrollReveal}`} ref={setRef(24)}>
                <h2 className={`${styles.sectionTitle} ${styles.sectionTitlePurple}`}>Broader Impact</h2>
                <p className={styles.bodyText}>
                  SafeSpace is not solely an app — it is a cultural intervention tool. By reducing friction in documentation, protecting anonymity, highlighting patterns, and providing leadership insights, the platform encourages both individual empowerment and systemic accountability. Partnership goals include collaboration with unions, industry organizations, and WorkSafeBC. Change does not happen overnight; safer systems begin with accessible steps. SafeSpace makes those steps easier.
                </p>
              </div>
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
