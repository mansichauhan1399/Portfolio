import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type StudyCard = {
  eyebrow: string;
  title: string;
  body: string;
  color: string;
  accent: string;
  rotation: number;
};

const cards: StudyCard[] = [
  {
    eyebrow: "01 / Discovery",
    title: "Start with a tiny spark",
    body: "A playful audit turned fuzzy ideas into a confident story arc for the case study.",
    color: "#ff6f61",
    accent: "#ffe7db",
    rotation: -4,
  },
  {
    eyebrow: "02 / System",
    title: "Stack the proof points",
    body: "Research, metrics, and sketches stay layered until the scroll invites each one forward.",
    color: "#573dde",
    accent: "#dfdcff",
    rotation: 3,
  },
  {
    eyebrow: "03 / Prototype",
    title: "Make movement useful",
    body: "Pinned progression lets readers linger without losing their place in the narrative.",
    color: "#016dff",
    accent: "#d8ecff",
    rotation: -2,
  },
  {
    eyebrow: "04 / Outcome",
    title: "Land on the takeaway",
    body: "The final card opens the door to a normal long-form case study with room for detail.",
    color: "#05b9aa",
    accent: "#d9fff7",
    rotation: 4,
  },
];

const contentBlocks = [
  {
    label: "Problem",
    heading: "Visitors needed a faster way to understand the project value.",
    copy: "The original flow buried the strongest evidence. This concept uses a tactile card reveal to preview the strategic moments before the full write-up begins.",
  },
  {
    label: "Approach",
    heading: "Pin the key sequence, then return control to the reader.",
    copy: "GSAP ScrollTrigger keeps the card section in place while cards ease forward one by one. Once the sequence finishes, the page continues naturally into traditional case-study content.",
  },
  {
    label: "Result",
    heading: "A memorable introduction that still respects scannability.",
    copy: "The stack, overlaps, rotations, and parallax objects add personality while responsive layout rules keep the experience practical across screen sizes.",
  },
];

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const decorRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, {
        transformPerspective: 1200,
        transformOrigin: "50% 56%",
        willChange: "transform, opacity",
      });

      cards.forEach((card, index) => {
        const el = cardRefs.current[index];
        gsap.set(el, {
          xPercent: index === 0 ? 0 : index % 2 === 0 ? 7 : -7,
          yPercent: index === 0 ? 46 : 20 + index * 7,
          zIndex: cards.length - index,
          rotate: index === 0 ? -10 : card.rotation,
          rotateY: index === 0 ? -16 : 0,
          scale: index === 0 ? 0.92 : 0.88 - index * 0.025,
          opacity: index === 0 ? 0 : 0,
        });
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: reduceMotion ? "none" : "power3.out",
          duration: reduceMotion ? 0.01 : 0.85,
        },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.2, 2200)}`,
          scrub: reduceMotion ? true : 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(cardRefs.current[0], {
          opacity: 1,
          yPercent: 0,
          rotate: cards[0].rotation,
          rotateY: 0,
          scale: 1,
        })
        .to(
          cardRefs.current.slice(1),
          {
            opacity: 1,
            yPercent: (index) => 10 + index * 6,
            xPercent: (index) => (index % 2 === 0 ? -5 : 5),
            scale: (index) => 0.94 - index * 0.035,
            stagger: 0.08,
          },
          ">-0.2",
        );

      cards.slice(1).forEach((_, index) => {
        const cardIndex = index + 1;
        timeline
          .to(cardRefs.current[cardIndex], {
            yPercent: -4 + index * 2,
            xPercent: index % 2 === 0 ? 3 : -3,
            rotate: cards[cardIndex].rotation,
            scale: 1 - index * 0.015,
            zIndex: cards.length + cardIndex,
          })
          .to(
            cardRefs.current.slice(0, cardIndex),
            {
              yPercent: (olderIndex) => 10 + olderIndex * 5,
              xPercent: (olderIndex) => (olderIndex % 2 === 0 ? -8 : 8),
              rotate: (olderIndex) => cards[olderIndex].rotation * 0.7,
              scale: (olderIndex) => 0.9 - olderIndex * 0.025,
              opacity: 0.82,
            },
            "<",
          );
      });

      timeline.to(stackRef.current, { yPercent: -6, scale: 0.98, duration: 0.7 });

      decorRefs.current.forEach((el, index) => {
        gsap.to(el, {
          y: index % 2 === 0 ? -90 : 80,
          x: index === 1 ? 34 : index === 2 ? -24 : 12,
          rotate: index % 2 === 0 ? 10 : -12,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: reduceMotion ? true : 1.2,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="portfolio-page">
      <HeroSection />

      <section ref={pinRef} className="card-pin-section" aria-label="Scroll driven case study highlights">
        <div className="pin-copy">
          <p className="section-kicker">Selected case study</p>
          <h2>Scroll to pull each idea from the stack.</h2>
          <p>
            The section pins while a playful deck previews the project phases. The cards rotate,
            overlap, and ease forward before the long-form story resumes.
          </p>
        </div>

        <DecorativeObjects decorRefs={decorRefs} />

        <div ref={stackRef} className="case-card-stack" aria-live="polite">
          {cards.map((card, index) => (
            <CaseStudyCard
              key={card.title}
              card={card}
              index={index}
              setRef={(node) => {
                if (node) cardRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </section>

      <CaseStudyContent />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-cloud hero-cloud-one" />
      <div className="hero-cloud hero-cloud-two" />
      <div className="hero-grid" />
      <div className="hero-copy">
        <p className="section-kicker">Portfolio concept</p>
        <h1>A cheerful case study intro with a scroll-powered card stack.</h1>
        <p>
          Inspired by Maxima Therapy&apos;s bright, characterful energy: bold shapes, friendly copy,
          and motion that makes the page feel hand-built.
        </p>
        <a href="#case-study-content" className="hero-link">
          Skip to the case study
        </a>
      </div>
      <div className="hero-figure" aria-hidden="true">
        <div className="hero-face">
          <span />
          <span />
        </div>
        <div className="hero-smile" />
      </div>
    </section>
  );
}

function DecorativeObjects({ decorRefs }: { decorRefs: React.MutableRefObject<HTMLDivElement[]> }) {
  return (
    <div className="decor-layer" aria-hidden="true">
      {["circle", "squiggle", "triangle", "pill"].map((shape, index) => (
        <div
          key={shape}
          ref={(node) => {
            if (node) decorRefs.current[index] = node;
          }}
          className={`decor-object decor-${shape}`}
        />
      ))}
    </div>
  );
}

function CaseStudyCard({
  card,
  index,
  setRef,
}: {
  card: StudyCard;
  index: number;
  setRef: (node: HTMLDivElement | null) => void;
}) {
  return (
    <article ref={setRef} className="case-card" style={{ "--card-color": card.color, "--card-accent": card.accent } as React.CSSProperties}>
      <div className="card-visual" aria-hidden="true">
        <PlaceholderArt index={index} />
      </div>
      <div className="card-copy">
        <p>{card.eyebrow}</p>
        <h3>{card.title}</h3>
        <span>{card.body}</span>
      </div>
    </article>
  );
}

function PlaceholderArt({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 240 160" role="img" aria-label="Placeholder project visual">
      <rect x="12" y="16" width="216" height="128" rx="28" fill="var(--card-accent)" />
      <circle cx={index % 2 === 0 ? 74 : 166} cy="72" r="32" fill="var(--card-color)" />
      <path d="M54 116 C92 86, 132 148, 188 98" fill="none" stroke="#1f1b2d" strokeWidth="10" strokeLinecap="round" />
      <path d="M158 42 l34 18 -34 18z" fill="#fdcb40" />
    </svg>
  );
}

function CaseStudyContent() {
  return (
    <section id="case-study-content" className="case-study-content">
      <p className="section-kicker">Full case study</p>
      <h2>The normal content begins after the pinned reveal.</h2>
      <div className="content-grid">
        {contentBlocks.map((block) => (
          <article key={block.label} className="content-card">
            <p>{block.label}</p>
            <h3>{block.heading}</h3>
            <span>{block.copy}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
