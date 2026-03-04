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

const FINDING_CARDS = [
  {
    title: "Seamless recording & Posting flow",
    finding: [
      "Users were unsure about the difference between recording and creating a report.",
      "\"Reports\" in the navigation felt similar to recording.",
      "The flow between capturing evidence and posting publicly felt disconnected.",
    ],
    solution: [
      "Renamed \"Reports\" → \"Posts\" in the navigation to clarify public content.",
      "Introduced a clearly defined center Record action as the primary CTA.",
      "Elevated the home screen with a prominent map and clearer content hierarchy.",
    ],
    image: "finding-1.png",
    imageAlt: "Recording and posting flow before and after",
  },
  {
    title: "Simplifying the Recording experience",
    finding: [
      "It was unclear whether the incident was recording, drafting, or posting.",
      "Too many visible options during urgent use cases.",
    ],
    solution: [
      "Simplified the recording interface to prioritize one primary action.",
      "Designed the flow to feel calm, direct, and distraction-free.",
    ],
    image: "finding-2.png",
    imageAlt: "Simplifying the recording experience",
  },
  {
    title: "Actionable Insights through Recommended Actions",
    finding: [
      "After creating a report, users were unsure what to do next.",
      "The report review screen felt static (informative but not supportive).",
      "Users needed direction to feel supported and empowered.",
    ],
    solution: [
      "Introduced a \"Recommended Actions\" section in the high-fidelity design.",
      "Added clear CTAs (Edit / Save Report) to reinforce decision-making.",
    ],
    image: "finding-3.png",
    imageAlt: "Recommended actions and CTAs",
  },
];

export default function SafeSpaceProjectPage() {
  const partRefs = useRef([]);
  const personaOverlayRef = useRef(null);
  const diagramOverlayRef = useRef(null);
  const [solutionActive, setSolutionActive] = useState(0);
  const [flippedCards, setFlippedCards] = useState([false, false, false]);
  const [personaExpanded, setPersonaExpanded] = useState(null);
  const [diagramExpanded, setDiagramExpanded] = useState(null);
  const [findingCardIndex, setFindingCardIndex] = useState(0);
  const videoRef = useRef(null);
  const marketingSliderRef = useRef(null);
  const [marketingRevealPercent, setMarketingRevealPercent] = useState(50);
  const [marketingDragging, setMarketingDragging] = useState(false);

  const updateMarketingReveal = (clientX) => {
    const el = marketingSliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setMarketingRevealPercent(pct);
  };

  const onMarketingHandlePointerDown = (e) => {
    e.preventDefault();
    setMarketingDragging(true);
    if (e.type === "mousedown") updateMarketingReveal(e.clientX);
    else if (e.touches?.[0]) updateMarketingReveal(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!marketingDragging) return;
    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0]?.clientX : e.clientX;
      if (clientX != null) updateMarketingReveal(clientX);
    };
    const onUp = () => setMarketingDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };
  }, [marketingDragging]);

  const toggleFlip = (index) => {
    setFlippedCards((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [solutionActive]);

  useEffect(() => {
    if (personaExpanded != null) {
      document.body.style.overflow = "hidden";
      personaOverlayRef.current?.focus();
    } else if (diagramExpanded != null) {
      document.body.style.overflow = "hidden";
      diagramOverlayRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [personaExpanded, diagramExpanded]);

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
              <button
                type="button"
                className={styles.personaExpandBtn}
                onClick={() => setPersonaExpanded("primary")}
                aria-label="Click to expand primary persona"
              >
                <Image
                  src={`${IMG}/click-to-expand.png`}
                  alt=""
                  width={804}
                  height={188}
                  className={styles.personaExpandBtnImgDefault}
                  unoptimized
                />
                <Image
                  src={`${IMG}/click-to-expand-clicked.png`}
                  alt=""
                  width={804}
                  height={188}
                  className={styles.personaExpandBtnImgHover}
                  unoptimized
                />
              </button>
              <button
                type="button"
                className={styles.personaImgBtn}
                onClick={() => setPersonaExpanded("primary")}
                aria-label="Expand primary persona"
              >
                <Image
                  src={`${IMG}/Persona - Primary.jpg`}
                  alt="Primary persona"
                  width={300}
                  height={300}
                  className={styles.personaImg}
                  unoptimized
                />
              </button>
            </div>
            <div className={styles.personaCol}>
              <button
                type="button"
                className={styles.personaExpandBtn}
                onClick={() => setPersonaExpanded("secondary")}
                aria-label="Click to expand secondary persona"
              >
                <Image
                  src={`${IMG}/click-to-expand.png`}
                  alt=""
                  width={804}
                  height={188}
                  className={styles.personaExpandBtnImgDefault}
                  unoptimized
                />
                <Image
                  src={`${IMG}/click-to-expand-clicked.png`}
                  alt=""
                  width={804}
                  height={188}
                  className={styles.personaExpandBtnImgHover}
                  unoptimized
                />
              </button>
              <button
                type="button"
                className={styles.personaImgBtn}
                onClick={() => setPersonaExpanded("secondary")}
                aria-label="Expand secondary persona"
              >
                <Image
                  src={`${IMG}/Persona - Secondary.jpg`}
                  alt="Secondary persona"
                  width={300}
                  height={300}
                  className={styles.personaImg}
                  unoptimized
                />
              </button>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.scrollReveal}`} ref={setRef(7)}>
            Design Process
          </h2>
          <h3 className={`${styles.sectionSubtitle} ${styles.scrollReveal}`} ref={setRef(8)}>
            Sitemap & User Flow
          </h3>
          <div className={`${styles.designProcessTwoCol} ${styles.scrollReveal}`} ref={setRef(9)}>
            <p className={styles.bodyText}>
              Based on user research findings, the team developed a sitemap to define the app&apos;s structure, scope, and navigation. Given the project timeline, the scope was intentionally narrowed to focus on four core values, prioritizing meaningful impact and clear direction.
            </p>
            <p className={styles.bodyText}>
              Based on the sitemap, the team developed a user flow to define how individuals would navigate through the app&apos;s core features. This helped align the team on key interactions and ensured a consistent direction throughout the design process.
            </p>
          </div>

          <div className={styles.diagramCards}>
            <div className={`${styles.diagramCard} ${styles.scrollReveal}`} ref={setRef(11)}>
              <div className={styles.diagramCardHeader}>
                <h4 className={styles.diagramLabel}>Sitemap</h4>
                <button
                  type="button"
                  className={styles.diagramExpandBtn}
                  onClick={() => setDiagramExpanded("sitemap")}
                  aria-label="Expand sitemap"
                >
                  <Image
                    src={`${IMG}/click-to-expand.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgDefault}
                    unoptimized
                  />
                  <Image
                    src={`${IMG}/click-to-expand-clicked.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgHover}
                    unoptimized
                  />
                </button>
              </div>
              <button
                type="button"
                className={styles.diagramImgBtn}
                onClick={() => setDiagramExpanded("sitemap")}
                aria-label="Expand sitemap"
              >
                <Image
                  src={`${IMG}/sitemap.jpg`}
                  alt="SafeSpace sitemap"
                  width={800}
                  height={600}
                  className={styles.diagramImg}
                  unoptimized
                />
              </button>
            </div>
            <div className={`${styles.diagramCard} ${styles.scrollReveal}`} ref={setRef(12)}>
              <div className={styles.diagramCardHeader}>
                <h4 className={styles.diagramLabel}>User Flow</h4>
                <button
                  type="button"
                  className={styles.diagramExpandBtn}
                  onClick={() => setDiagramExpanded("userflow")}
                  aria-label="Expand user flow"
                >
                  <Image
                    src={`${IMG}/click-to-expand.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgDefault}
                    unoptimized
                  />
                  <Image
                    src={`${IMG}/click-to-expand-clicked.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgHover}
                    unoptimized
                  />
                </button>
              </div>
              <button
                type="button"
                className={styles.diagramImgBtn}
                onClick={() => setDiagramExpanded("userflow")}
                aria-label="Expand user flow"
              >
                <Image
                  src={`${IMG}/userflow.jpg`}
                  alt="SafeSpace user flow"
                  width={800}
                  height={600}
                  className={styles.diagramImg}
                  unoptimized
                />
              </button>
            </div>
          </div>

          <h3 className={`${styles.sectionSubtitle} ${styles.wireframesSubtitle} ${styles.scrollReveal}`} ref={setRef(13)}>
            Low-Fidelity Wireframes
          </h3>
          <div className={`${styles.wireframesText} ${styles.scrollReveal}`} ref={setRef(14)}>
            <p className={styles.bodyText}>
              After finalizing the user flow, low-fidelity wireframes were created to visualize the core layout and interactions. These wireframes focused on{" "}
              <strong className={styles.bodyTextBoldYellow}>structure, hierarchy, and functionality.</strong>
              {" "}This stage allowed the team to quickly validate ideas, gather feedback, and iterate efficiently before moving into high-fidelity design.
            </p>
          </div>

          <div className={`${styles.diagramCard} ${styles.wireframesDiagramCard} ${styles.scrollReveal}`} ref={setRef(15)}>
            <div className={styles.wireframesExpandRow}>
              <button
                type="button"
                className={styles.diagramExpandBtn}
                onClick={() => setDiagramExpanded("wireframe")}
                aria-label="Expand low-fidelity wireframes"
              >
                <Image
                  src={`${IMG}/click-to-expand.png`}
                  alt=""
                  width={804}
                  height={188}
                  className={styles.personaExpandBtnImgDefault}
                  unoptimized
                />
                <Image
                  src={`${IMG}/click-to-expand-clicked.png`}
                  alt=""
                  width={804}
                  height={188}
                  className={styles.personaExpandBtnImgHover}
                  unoptimized
                />
              </button>
            </div>
            <button
              type="button"
              className={styles.diagramImgBtn}
              onClick={() => setDiagramExpanded("wireframe")}
              aria-label="Expand low-fidelity wireframes"
            >
              <Image
                src={`${IMG}/Low-Fidelity Wireframes.png`}
                alt="SafeSpace low-fidelity wireframes"
                width={1000}
                height={800}
                className={styles.diagramImg}
                unoptimized
              />
            </button>
          </div>

          <h3 className={`${styles.sectionSubtitle} ${styles.wireframesSubtitle} ${styles.scrollReveal}`} ref={setRef(16)}>
            Branding & Styleguide
          </h3>
          <div className={`${styles.wireframesText} ${styles.scrollReveal}`} ref={setRef(17)}>
            <p className={styles.bodyText}>
              The visual identity conveys{" "}
              <strong className={styles.bodyTextBoldYellow}>trust, strength, and resilience</strong>
              {" "}while remaining{" "}
              <strong className={styles.bodyTextBoldYellow}>approachable and inclusive</strong>
              , using rounded shapes and soft gradients to create a welcoming space. SafeSpace&apos;s design reflects its mission to support and empower women and gender-diverse tradespeople.
            </p>
          </div>

          {/* Color Palette */}
          <div className={`${styles.brandingSection} ${styles.colorPaletteSection} ${styles.scrollReveal}`} ref={setRef(18)}>
            <div className={`${styles.brandingTwoCol} ${styles.brandingColorPaletteGrid}`}>
              <button type="button" className={styles.diagramImgBtn} onClick={() => setDiagramExpanded("colorpalette")} aria-label="Expand color palette">
                <Image src={`${IMG}/color-palette.png`} alt="SafeSpace color palette" width={1000} height={600} className={styles.diagramImg} unoptimized />
              </button>
              <div>
                <h4 className={styles.diagramLabel}>Color Palette</h4>
                <p className={styles.bodyText}>
                  Our palette of purple, orange, and yellow embodies SafeSpace&apos;s values, creating a visual identity that is trustworthy, empowering, and welcoming.
                </p>
                <button
                  type="button"
                  className={styles.diagramExpandBtn}
                  onClick={() => setDiagramExpanded("colorpalette")}
                  aria-label="Expand color palette"
                >
                  <Image
                    src={`${IMG}/click-to-expand.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgDefault}
                    unoptimized
                  />
                  <Image
                    src={`${IMG}/click-to-expand-clicked.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgHover}
                    unoptimized
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className={`${styles.brandingSection} ${styles.typographySection} ${styles.scrollReveal}`} ref={setRef(19)}>
            <div className={`${styles.brandingTwoCol} ${styles.typographyGrid}`}>
              <div>
                <h4 className={styles.diagramLabel}>Typography</h4>
                <p className={styles.bodyText}>
                  Typography emphasizes clarity and approachability, reflecting SafeSpace&apos;s friendly yet professional tone. Satoshi was chosen for its clean, geometric shapes, ensuring readability and a modern, cohesive look throughout the app.
                </p>
                <button
                  type="button"
                  className={styles.diagramExpandBtn}
                  onClick={() => setDiagramExpanded("typography")}
                  aria-label="Expand typography"
                >
                  <Image
                    src={`${IMG}/click-to-expand.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgDefault}
                    unoptimized
                  />
                  <Image
                    src={`${IMG}/click-to-expand-clicked.png`}
                    alt=""
                    width={804}
                    height={188}
                    className={styles.personaExpandBtnImgHover}
                    unoptimized
                  />
                </button>
                <div className={styles.logoInCol}>
                  <Image src={`${IMG}/logo.png`} alt="SafeSpace logo" width={400} height={400} className={styles.logoInColImgSmall} unoptimized />
                  <Image src={`${IMG}/logo-slogan.png`} alt="SafeSpace logo with slogan" width={600} height={250} className={styles.logoInColImgSmall} unoptimized />
                </div>
              </div>
              <div className={styles.brandingColRight}>
                <button type="button" className={styles.diagramImgBtn} onClick={() => setDiagramExpanded("typography")} aria-label="Expand typography">
                  <Image src={`${IMG}/typo.png`} alt="SafeSpace typography" width={3400} height={2125} className={`${styles.diagramImg} ${styles.typographyImg}`} unoptimized />
                </button>
                <div className={styles.logoUnderTypo}>
                  <p className={styles.diagramLabel}>Logo</p>
                  <p className={styles.bodyText}>
                    The logo overall represents safety, support, and community for gender-minority tradespeople. The hardhat symbolizes the trades, while the handshake conveys a safe, supportive and welcoming environment.
                  </p>
                  <Image src={`${IMG}/logo-text.png`} alt="SafeSpace logo with text" width={600} height={200} className={styles.logoRightColImg} unoptimized />
                </div>
              </div>
            </div>
          </div>

          {/* User Testing and Iteration */}
          <h3 className={`${styles.sectionSubtitle} ${styles.wireframesSubtitle} ${styles.scrollReveal}`} ref={setRef(20)}>
            User Testing and Iteration
          </h3>
          <div className={`${styles.wireframesText} ${styles.scrollReveal}`} ref={setRef(21)}>
            <p className={styles.bodyText}>
              User testing was conducted to evaluate how intuitive, clear, and trustworthy SafeSpace feels in real-world scenarios. The goal was to identify usability gaps, emotional friction points, and opportunities to improve clarity between key features.
            </p>
            <p className={styles.bodyText}>
              We primarily tested three core scenarios that reflect the app&apos;s main functions: recording an incident, creating a report (both by completing a short form and through Safi), and browsing public posts to review report details.
            </p>
          </div>

          {/* Finding cards carousel (3 cards, same layout as finding-1) */}
          <div className={`${styles.userTestingFlowCarousel} ${styles.scrollReveal}`} ref={setRef(22)}>
            <button
              type="button"
              className={styles.userTestingFlowArrow}
              onClick={() => setFindingCardIndex((i) => (i === 0 ? FINDING_CARDS.length - 1 : i - 1))}
              aria-label="Previous finding card"
            >
              ←
            </button>
            <div className={styles.userTestingFlowSection}>
              {FINDING_CARDS.map((card, idx) => (
                <div
                  key={card.title}
                  className={styles.userTestingFlowCard}
                  aria-hidden={idx !== findingCardIndex}
                  style={{ display: idx === findingCardIndex ? "block" : "none" }}
                >
                  <h4 className={styles.userTestingFlowTitle}>{card.title}</h4>
                  <div className={styles.userTestingFlowTwoCol}>
                    <div className={styles.userTestingFlowCol}>
                      <h5 className={styles.userTestingFlowColTitle}>Finding</h5>
                      <ul className={styles.userTestingFlowList}>
                        {card.finding.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.userTestingFlowCol}>
                      <h5 className={styles.userTestingFlowColTitle}>Solution</h5>
                      <ul className={styles.userTestingFlowList}>
                        {card.solution.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.userTestingFlowImgWrap}>
                    <Image
                      src={`${IMG}/${card.image}`}
                      alt={card.imageAlt}
                      width={1200}
                      height={600}
                      className={styles.userTestingFlowImg}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.userTestingFlowArrow}
              onClick={() => setFindingCardIndex((i) => (i === FINDING_CARDS.length - 1 ? 0 : i + 1))}
              aria-label="Next finding card"
            >
              →
            </button>
          </div>

          {/* Web Supplement (under User Testing) */}
          <h3 className={`${styles.sectionSubtitle} ${styles.wireframesSubtitle} ${styles.scrollReveal}`} ref={setRef(23)}>
            Web Supplement
          </h3>
          <div className={`${styles.wireframesText} ${styles.scrollReveal}`} ref={setRef(24)}>
            <p className={styles.bodyText}>
              For foremen, union representatives, and industry leaders, the web supplement centralizes worksite posts and transforms them into clear, actionable insights. By identifying patterns and surfacing recommended steps, it enables leadership to respond effectively and foster safer work environments.
            </p>
          </div>
          <div className={`${styles.webSupplementVideoWrap} ${styles.scrollReveal}`} ref={setRef(25)}>
            <video
              src={`${IMG}/web-supplement.mp4`}
              className={styles.webSupplementVideo}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={(e) => e.target.play().catch(() => {})}
              aria-label="Web supplement demo"
            />
          </div>

          {/* Marketing Materials (yellow title) */}
          <h2 className={`${styles.sectionTitle} ${styles.marketingSectionTitle} ${styles.scrollReveal}`} ref={setRef(26)}>
            Marketing Materials
          </h2>
          <div className={styles.marketingRevealWrap}>
            <Image
              src={`${IMG}/marketing-bg.png`}
              alt=""
              width={1920}
              height={1080}
              className={styles.marketingBg}
              unoptimized
              aria-hidden
            />
            <div
              className={styles.marketingRevealOverlay}
              ref={marketingSliderRef}
              aria-label="Brochure comparison: drag the center handle to reveal each side"
            >
              <div className={styles.marketingRevealBehind}>
                <Image
                  src={`${IMG}/brochure-side-1.png`}
                  alt="Brochure side 1"
                  fill
                  className={styles.marketingRevealImg}
                  sizes="100vw"
                  unoptimized
                />
              </div>
              <div
                className={styles.marketingRevealFront}
                style={{ width: `${marketingRevealPercent}%`, "--reveal-pct": Math.max(1, marketingRevealPercent) }}
              >
                <div className={styles.marketingRevealFrontInner}>
                  <Image
                    src={`${IMG}/brochure-side-2.png`}
                    alt="Brochure side 2"
                    fill
                    className={styles.marketingRevealImg}
                    sizes="100vw"
                    unoptimized
                  />
                </div>
              </div>
              <div
                className={styles.marketingRevealHandle}
                style={{ left: `${marketingRevealPercent}%` }}
                onMouseDown={onMarketingHandlePointerDown}
                onTouchStart={onMarketingHandlePointerDown}
                role="slider"
                aria-valuenow={Math.round(marketingRevealPercent)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Drag to reveal brochure sides"
                tabIndex={0}
              >
                <span className={styles.marketingRevealLine} aria-hidden />
                <Image
                  src={`${IMG}/marketing-central.png`}
                  alt=""
                  width={80}
                  height={80}
                  className={styles.marketingCentralBtn}
                  unoptimized
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className={styles.marketingMerchRow}>
            <Image
              src={`${IMG}/merch1.png`}
              alt="SafeSpace merchandise 1"
              width={400}
              height={400}
              className={styles.marketingMerchImg}
              unoptimized
            />
            <Image
              src={`${IMG}/merch2.png`}
              alt="SafeSpace merchandise 2"
              width={400}
              height={400}
              className={styles.marketingMerchImg}
              unoptimized
            />
            <Image
              src={`${IMG}/merch3.png`}
              alt="SafeSpace merchandise 3"
              width={400}
              height={400}
              className={styles.marketingMerchImg}
              unoptimized
            />
          </div>
        </section>

        {personaExpanded != null && (
          <div
            ref={personaOverlayRef}
            className={styles.personaOverlay}
            onClick={() => setPersonaExpanded(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setPersonaExpanded(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`View ${personaExpanded} persona`}
            tabIndex={0}
          >
            <button
              type="button"
              className={styles.personaOverlayClose}
              onClick={() => setPersonaExpanded(null)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={personaExpanded === "primary" ? `${IMG}/Persona - Primary.jpg` : `${IMG}/Persona - Secondary.jpg`}
              alt={personaExpanded === "primary" ? "Primary persona" : "Secondary persona"}
              width={1200}
              height={1200}
              className={styles.personaOverlayImg}
              onClick={(e) => e.stopPropagation()}
              unoptimized
            />
          </div>
        )}

        {diagramExpanded != null && (
          <div
            ref={diagramOverlayRef}
            className={styles.personaOverlay}
            onClick={() => setDiagramExpanded(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setDiagramExpanded(null);
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`View ${diagramExpanded}`}
            tabIndex={0}
          >
            <button
              type="button"
              className={styles.personaOverlayClose}
              onClick={() => setDiagramExpanded(null)}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={
                diagramExpanded === "sitemap"
                  ? `${IMG}/sitemap.jpg`
                  : diagramExpanded === "userflow"
                    ? `${IMG}/userflow.jpg`
                    : diagramExpanded === "wireframe"
                      ? `${IMG}/Low-Fidelity Wireframes.png`
                      : diagramExpanded === "colorpalette"
                        ? `${IMG}/color-palette.png`
                        : `${IMG}/typo.png`
              }
              alt={
                diagramExpanded === "sitemap"
                  ? "SafeSpace sitemap"
                  : diagramExpanded === "userflow"
                    ? "SafeSpace user flow"
                    : diagramExpanded === "wireframe"
                      ? "SafeSpace low-fidelity wireframes"
                      : diagramExpanded === "colorpalette"
                        ? "SafeSpace color palette"
                        : "SafeSpace typography"
              }
              width={1400}
              height={1000}
              className={styles.personaOverlayImg}
              onClick={(e) => e.stopPropagation()}
              unoptimized
            />
          </div>
        )}

        <div className={styles.backLinkWrap}>
          <Link href="/project" className={styles.backLink}>← Back to Projects</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
