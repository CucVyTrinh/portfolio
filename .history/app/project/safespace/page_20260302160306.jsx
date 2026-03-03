"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectInfoCard from "../../components/ProjectInfoCard";
import Link from "next/link";
import styles from "./page.module.css";

const IMG = "/project/SafeSpace";

const OVERVIEW = (
  <>
    <span className={styles.overviewPurple}>SafeSpace</span> is an{" "}
    <span className={styles.overviewPurple}>AI-powered safety platform</span> built to support women and gender-diverse tradespeople in the skilled trades. It converts voice recordings and guided AI conversations into clear,{" "}
    <span className={styles.overviewPurple}>structured reports</span> and{" "}
    <span className={styles.overviewPurple}>practical insights</span>, while enabling anonymous sharing of job site experiences to help both workers and leadership strengthen workplace safety.
    <br /><br />
    Developed in partnership with <span className={styles.overviewPurple}>ConnectHER Hub</span>, SafeSpace was created to dismantle the systemic barriers that prevent underrepresented tradespeople from reporting misconduct and advocating for safer job sites.
  </>
);

const PROJECT_DETAILS = {
  role: [
    "Lead Creative Designer",
    "UX/UI Designer",
    "User Researcher",
  ],
  tools: [
    "Figma",
    "Adobe Suite (Photoshop, Illustrator, InDesign,",
    "After Effects, Premiere",
    "React Native (Expo), TypeScript, React,",
    "Next.js, JavaScript",
  ],
  duration: "Sep - Dec 2025 (4 months)",
  team: "8 members",
};

const TAG_CLOUD_PHRASES = [
  { text: 'Fear of being labeled "difficult" or "overreacting"', size: "small", weight: "thin", left: "5%", top: "8%" },
  { text: "Backlash or retaliation", size: "small", weight: "thin", left: "12%", top: "32%" },
  { text: "Lack of evidence", size: "large", weight: "bold", left: "8%", top: "68%" },
  { text: "Fear of disbelief", size: "large", weight: "bold", left: "38%", top: "12%" },
  { text: "Workplace cultures that normalize inappropriate behavior", size: "medium", weight: "thin", left: "32%", top: "55%" },
  { text: "Reporting feels intimidating", size: "large", weight: "bold", left: "68%", top: "8%" },
  { text: "Overwhelming reporting forms", size: "medium", weight: "thin", left: "72%", top: "42%" },
  { text: "Supervisors seem unapproachable", size: "medium", weight: "thin", left: "65%", top: "72%" },
];

const TAG_COLORS = ["#3A51D4"];

const SOLUTION_FEATURES = [
  {
    headline: "Secure Recording & AI-Powered Reporting",
    body: "Safely capture incidents in real time and automatically generate structured, AI-powered reports for clear and actionable documentation.",
    video: `${IMG}/feature-1.MP4`,
  },
  {
    headline: "Safi: AI Conversational Assistant",
    body: "Guides incident reporting through conversational prompts, transforming experiences into structured reports while making the process easier and less stressful.",
    video: `${IMG}/feature-2.mov`,
  },
  {
    headline: "Anonymous Community Reporting",
    body: "Share incidents anonymously with the community to raise awareness and promote safer worksites. Review reports from others to check site safety before arriving on a job.",
    video: `${IMG}/feature-3.MP4`,
  },
];

const FLIP_CARDS = [
  {
    percent: "66.7%",
    front: "reported feeling isolated as women or gender-diverse people in male-dominated trades, often needing to suppress their identity and emotions to fit in.",
    back: <>A safe <strong>community</strong> where peers can share insights and give advice or recommended steps for handling challenges. This fosters belonging, reduces isolation, and empowers tradespeople to navigate the workplace with support.</>,
  },
  {
    percent: "62.5%",
    front: "wanted a way to report harassment and unsafe work conditions, highlighting the prevalence of gender bias, verbal harassment, and uncomfortable environments.",
    back: <>Secure and <strong>anonymous reporting tools</strong> that document incidents in real time. Structured reports enable workers to safely share concerns, while leadership can access actionable insights to address and prevent misconduct.</>,
  },
  {
    percent: "75%",
    front: "use phones on-site, but heavy workloads and remote locations make it difficult to access support or resources when needed.",
    back: <>Offer mobile-first, <strong>on-site tools</strong> with offline capability, quick access to resources, and instant reporting. This ensures workers can manage safety, get help, and stay connected no matter the location or physical demands.</>,
  },
];

export default function SafeSpaceProjectPage() {
  const partRefs = useRef([]);
  const [solutionActive, setSolutionActive] = useState(0);
  const [flippedCards, setFlippedCards] = useState([false, false, false]);
  const videoRef = useRef(null);

  const toggleFlip = (index) => {
    setFlippedCards((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [solutionActive]);

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
              <a
                href="https://safe-space.figma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.overviewButton}
              >
                View Website
              </a>
            </div>
            <div className={`${styles.heroBlock} ${styles.heroBlockCard} ${styles.scrollReveal}`} ref={setRef(1)}>
              <ProjectInfoCard
                role={PROJECT_DETAILS.role}
                tools={PROJECT_DETAILS.tools}
                duration={PROJECT_DETAILS.duration}
                team={PROJECT_DETAILS.team}
              />
            </div>
          </div>
        </section>

        {/* Stats Section: 60% / Silence / Tag Cloud */}
        <section className={styles.statsSection} ref={setRef(2)}>
          <div className={styles.statsHero}>
            <span className={styles.statsNumber}>60%</span>
            <p className={styles.statsCaption}>
              of <span className={styles.statsCaptionPurple}>women</span> and <span className={styles.statsCaptionPurple}>gender-diverse</span> trade workers have experienced harassment at work.
            </p>
          </div>
          <div className={styles.silenceCallout}>
            <p className={styles.silenceSubheader}>Yet reporting remains rare...</p>
            <div className={styles.silenceContainer}>
              <p className={styles.silenceText}>Silence was the only safe option</p>
            </div>
          </div>
          <h3 className={styles.tagCloudHeader}>Why?</h3>
          <div className={styles.tagCloudSection}>
            <div className={styles.tagCloud}>
              {TAG_CLOUD_PHRASES.map((item, i) => (
                <span
                  key={item.text}
                  className={styles.tagCloudTag}
                  style={{
                    "--tag-delay": `${i * 0.8}s`,
                    "--tag-dur": `${10 + (i % 3)}s`,
                    left: item.left,
                    top: item.top,
                  }}
                >
                  <span
                    className={`${styles.tagCloudTagInner} ${styles[`tagSize${item.size.charAt(0).toUpperCase() + item.size.slice(1)}`]} ${styles[`tagWeight${item.weight.charAt(0).toUpperCase() + item.weight.slice(1)}`]}`}
                    style={{ "--tag-color": TAG_COLORS[i % TAG_COLORS.length] }}
                  >
                    {item.text}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* The Solution: Video + Accordion Feature Cards */}
        <section className={styles.solutionSection} ref={setRef(3)}>
          <div className={styles.solutionLine} aria-hidden />
          <h2 className={styles.solutionTitle}>The Solution</h2>
          <div className={styles.solutionRow}>
            <div className={styles.solutionVideoWrap}>
              <div className={styles.phoneFrameSolution}>
                <div className={styles.videoScreen}>
                  <video
                    ref={videoRef}
                    key={solutionActive}
                    src={SOLUTION_FEATURES[solutionActive].video}
                    className={styles.solutionVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={(e) => e.target.play().catch(() => {})}
                  />
                </div>
              </div>
            </div>
            <div className={styles.solutionCards}>
              {SOLUTION_FEATURES.map((feat, i) => (
                <button
                  key={feat.headline}
                  type="button"
                  className={`${styles.solutionCard} ${i === solutionActive ? styles.solutionCardActive : ""}`}
                  onClick={() => setSolutionActive(i)}
                >
                  <h3 className={styles.solutionCardTitle}>{feat.headline}</h3>
                  <div className={styles.solutionCardBody}>
                    <p className={styles.solutionCardText}>{feat.body}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Research Flip-Cards */}
        <section className={styles.flipCardsSection} ref={setRef(4)}>
          <div className={styles.flipCardsIntro}>
            <h2 className={styles.heroHeading}>Research</h2>
            <p className={styles.heroBody}>
              To better understand the experiences of women and gender-diverse people in trades, Team SafeSpace conducted a mixed-methods research study, combining <span className={styles.researchHighlight}>surveys, interviews, and secondary research</span>.
              <br /><br />
              Our participants included tradespeople of various genders, ages, and experience levels, from newcomers to seasoned professionals. The research aimed to uncover <span className={styles.researchHighlight}>barriers, frustrations, and needs</span> specific to underrepresented groups in the skilled trades.
            </p>
          </div>
          <div className={styles.flipCardsGrid}>
            {FLIP_CARDS.map((card, i) => (
              <div
                key={i}
                className={`${styles.flipCardWrap} ${flippedCards[i] ? styles.flipCardFlipped : ""}`}
                onClick={() => toggleFlip(i)}
              >
                <div className={styles.flipCardInner}>
                  <div className={styles.flipCardFront}>
                    <span className={styles.flipCardPercent}>{card.percent}</span>
                    <p className={styles.flipCardFrontText}>{card.front}</p>
                  </div>
                  <div className={styles.flipCardBack}>
                    <p className={styles.flipCardBackText}>{card.back}</p>
                  </div>
                </div>
                <span className={styles.flipCardTooltip}>Click to flip</span>
              </div>
            ))}
          </div>
        </section>

        {/* User Personas */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionSubtitle} ${styles.scrollReveal}`} ref={setRef(5)}>
            User Personas
          </h2>
          <p className={`${styles.bodyText} ${styles.scrollReveal}`} ref={setRef(6)}>
            To inform the design process, two user personas were created from the collected research data. These personas highlighted the needs, goals, and pain points of gender-minority tradespeople, helping prioritize features and validate design decisions.
          </p>
          <div className={styles.personasGrid}>
            <div className={styles.personaCol}>
              <button type="button" className={styles.personaExpandBtn} aria-label="Click to expand primary persona">
                <Image
                  src={`${IMG}/click-to-expand.png`}
                  alt=""
                  width={120}
                  height={48}
                  unoptimized
                />
              </button>
              <Image
                src={`${IMG}/Persona - Primary.jpg`}
                alt="Primary persona"
                width={400}
                height={400}
                className={styles.personaImg}
                unoptimized
              />
            </div>
            <div className={styles.personaCol}>
              <button type="button" className={styles.personaExpandBtn} aria-label="Click to expand secondary persona">
                <Image
                  src={`${IMG}/click-to-expand.png`}
                  alt=""
                  width={120}
                  height={48}
                  unoptimized
                />
              </button>
              <Image
                src={`${IMG}/Persona - Secondary.jpg`}
                alt="Secondary persona"
                width={400}
                height={400}
                className={styles.personaImg}
                unoptimized
              />
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
