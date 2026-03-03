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
    back: "A safe community where peers can share insights and give advice or recommended steps for handling challenges. This fosters belonging, reduces isolation, and empowers tradespeople to navigate the workplace with support.",
  },
  {
    percent: "62.5%",
    front: "wanted a way to report harassment and unsafe work conditions, highlighting the prevalence of gender bias, verbal harassment, and uncomfortable environments.",
    back: "Secure and anonymous reporting tools that document incidents in real time. Structured reports enable workers to safely share concerns, while leadership can access actionable insights to address and prevent misconduct.",
  },
  {
    percent: "75%",
    front: "use phones on-site, but heavy workloads and remote locations make it difficult to access support or resources when needed.",
    back: "Offer mobile-first, on-site tools with offline capability, quick access to resources, and instant reporting. This ensures workers can manage safety, get help, and stay connected no matter the location or physical demands.",
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

        {/* Introduction: The Challenge / The Solution */}
        <section className={styles.section} id="introduction">
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(5)}>
            Introduction
          </h2>
          <p className={`${styles.bodyText} ${styles.scrollReveal}`} ref={setRef(6)}>
            SafeSpace was born from a need to give young adults a judgment-free space to process emotions and find support. This section outlines the challenge we set out to solve and the solution we designed.
          </p>
          <div className={`${styles.challengeSolutionBox} ${styles.scrollReveal}`} ref={setRef(7)}>
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
            <div className={`${styles.uiMockupWrap} ${styles.scrollReveal}`} ref={setRef(8)}>
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
              <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(9)}>
                Empathy
              </h3>
              <p className={`${styles.bodyText} ${styles.scrollReveal}`} ref={setRef(10)}>
                Every interaction in SafeSpace is designed to make users feel heard and supported. From the tone of copy to the flow of screens, we prioritized emotional clarity and a sense of safety.
              </p>
              <h4 className={`${styles.keyFeaturesTitle} ${styles.scrollReveal}`} ref={setRef(11)}>
                Key Features
              </h4>
              {KEY_FEATURES.map((feat, i) => (
                <div
                  key={feat.title}
                  className={`${styles.keyFeatureItem} ${styles.scrollReveal}`}
                  ref={setRef(12 + i)}
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
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(14)}>
            User Research
          </h2>
            <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(15)}>
            Empathy Map
          </h3>
          <div className={styles.empathyCards}>
            <div className={`${styles.empathyCard} ${styles.empathyCardOrange} ${styles.scrollReveal}`} ref={setRef(16)}>
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
            <div className={`${styles.empathyCard} ${styles.empathyCardBlue} ${styles.scrollReveal}`} ref={setRef(17)}>
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
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(18)}>
            User Flow
          </h2>
          <div className={`${styles.flowDiagramWrap} ${styles.scrollReveal}`} ref={setRef(19)}>
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
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(20)}>
            Ideation
          </h2>
            <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(21)}>
            Brainstorming
          </h3>
          <div className={styles.brainstormGrid}>
            {BRAINSTORMING_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={`${styles.brainstormCell} ${styles.scrollReveal}`}
                ref={setRef(22 + i)}
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
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(34)}>
            Brand Identity
          </h2>

            <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(35)}>
            Colors
          </h3>
          <div className={`${styles.colorRow} ${styles.scrollReveal}`} ref={setRef(36)}>
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

            <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(37)}>
            Gradients
          </h3>
          <div className={`${styles.gradientRow} ${styles.scrollReveal}`} ref={setRef(38)}>
            <div className={styles.gradientBox} style={{ background: "linear-gradient(135deg, #E07A5F 0%, #F4D35E 30%, #8B7BBD 70%, #3d2b56 100%)" }} />
            <div className={styles.gradientBox} style={{ background: "linear-gradient(180deg, #4a4a4a 0%, #171717 100%)" }} />
          </div>

            <h3 className={`${styles.subHeading} ${styles.scrollReveal}`} ref={setRef(39)}>
            Logos & Icons
          </h3>
          <div className={`${styles.logosRow} ${styles.scrollReveal}`} ref={setRef(40)}>
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
