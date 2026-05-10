import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PortfolioCard = {
  eyebrow: string;
  title: string;
  description: string;
  background: string;
  foreground: string;
  accent: string;
  rotation: number;
};

const portfolioCards: PortfolioCard[] = [
  {
    eyebrow: "PROJECT 1",
    title: "Healthcare AI Platform",
    description: "Designing intelligent workflows that help care teams understand patient risk and act faster.",
    background: "#eb70c7",
    foreground: "#4f2576",
    accent: "#fff4b8",
    rotation: -3.5,
  },
  {
    eyebrow: "PROJECT 2",
    title: "Care Team Command Center",
    description: "A focused operating layer for surfacing next-best actions across complex clinical programs.",
    background: "#126cf5",
    foreground: "#ffd03f",
    accent: "#ffffff",
    rotation: 2.5,
  },
  {
    eyebrow: "PROJECT 3",
    title: "Patient Insights System",
    description: "Turning dense healthcare data into confident, scannable product experiences.",
    background: "#fffdf7",
    foreground: "#d69b00",
    accent: "#126cf5",
    rotation: -1.5,
  },
];

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(deckRef.current, {
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        willChange: "transform",
      });

      gsap.set(cardRefs.current, {
        transformOrigin: "50% 64%",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
      });

      cardRefs.current.forEach((card, index) => {
        gsap.set(card, {
          xPercent: index === 0 ? 0 : index % 2 === 0 ? -7 : 7,
          yPercent: index === 0 ? 34 : 10 + index * 7,
          z: index === 0 ? -180 : -260 - index * 90,
          rotateX: index === 0 ? -72 : -10,
          rotateY: index === 0 ? 12 : index % 2 === 0 ? -7 : 7,
          rotateZ: index === 0 ? -10 : portfolioCards[index].rotation,
          scale: index === 0 ? 0.82 : 0.88 - index * 0.04,
          opacity: index === 0 ? 0 : 0.38 - index * 0.06,
          filter: index === 0 ? "blur(10px)" : "blur(2px)",
          zIndex: portfolioCards.length - index,
        });
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: reduceMotion ? "none" : "power3.inOut",
          duration: reduceMotion ? 0.01 : 1,
        },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3.8, 2800)}`,
          scrub: reduceMotion ? true : 0.85,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            pinRef.current?.style.setProperty("--stack-progress", self.progress.toFixed(3));
          },
        },
      });

      timeline
        .to(cardRefs.current[0], {
          xPercent: 0,
          yPercent: 0,
          z: 80,
          rotateX: 0,
          rotateY: 0,
          rotateZ: portfolioCards[0].rotation,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          zIndex: 40,
          duration: 1.15,
        })
        .to(deckRef.current, { rotateX: -2, rotateY: 2, scale: 1.015, duration: 0.65 }, "<")
        .to({}, { duration: 0.2 });

      portfolioCards.slice(1).forEach((card, index) => {
        const activeIndex = index + 1;
        const olderCards = cardRefs.current.slice(0, activeIndex);
        const upcomingCards = cardRefs.current.slice(activeIndex + 1);

        timeline
          .to(
            olderCards,
            {
              xPercent: (olderIndex) => (olderIndex % 2 === 0 ? -13 : 13),
              yPercent: (olderIndex) => 14 + olderIndex * 7,
              z: (olderIndex) => -120 - olderIndex * 70,
              rotateX: -6,
              rotateY: (olderIndex) => (olderIndex % 2 === 0 ? -5 : 5),
              rotateZ: (olderIndex) => portfolioCards[olderIndex].rotation * 0.8,
              scale: (olderIndex) => 0.86 - olderIndex * 0.035,
              opacity: 0.58,
              filter: "blur(1.1px)",
              zIndex: (olderIndex) => 12 - olderIndex,
              duration: 0.9,
            },
            ">",
          )
          .to(
            cardRefs.current[activeIndex],
            {
              xPercent: 0,
              yPercent: 0,
              z: 100,
              rotateX: 0,
              rotateY: 0,
              rotateZ: card.rotation,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              zIndex: 45 + activeIndex,
              duration: 0.95,
            },
            "<",
          )
          .to(
            upcomingCards,
            {
              xPercent: (upcomingIndex) => (upcomingIndex % 2 === 0 ? 7 : -7),
              yPercent: (upcomingIndex) => 13 + upcomingIndex * 7,
              z: (upcomingIndex) => -240 - upcomingIndex * 80,
              rotateX: -8,
              rotateY: (upcomingIndex) => (upcomingIndex % 2 === 0 ? 6 : -6),
              scale: (upcomingIndex) => 0.88 - upcomingIndex * 0.04,
              opacity: (upcomingIndex) => 0.42 - upcomingIndex * 0.08,
              filter: "blur(2px)",
              duration: 0.95,
            },
            "<",
          )
          .to(deckRef.current, { rotateX: index % 2 === 0 ? 1 : -1, rotateY: index % 2 === 0 ? -2 : 2, duration: 0.45 }, "<")
          .to({}, { duration: 0.18 });
      });

      timeline.to(deckRef.current, { rotateX: 0, rotateY: 0, scale: 0.99, duration: 0.7 });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="portfolio-page">
      <HeroSection />
      <section ref={pinRef} className="stack-section" aria-label="Pinned portfolio project deck">
        <div className="stack-heading" aria-hidden="true">
          <span>Selected work</span>
        </div>
        <div ref={deckRef} className="portfolio-deck">
          {portfolioCards.map((card, index) => (
            <article
              key={card.eyebrow}
              ref={(node) => {
                if (node) cardRefs.current[index] = node;
              }}
              className="portfolio-card"
              style={
                {
                  "--card-bg": card.background,
                  "--card-fg": card.foreground,
                  "--card-accent": card.accent,
                } as CSSProperties
              }
            >
              <div className="portfolio-card__shine" aria-hidden="true" />
              <p>{card.eyebrow}</p>
              <h2>{card.title}</h2>
              <span>{card.description}</span>
              <div className="portfolio-card__meta" aria-hidden="true">
                <small>Product strategy</small>
                <small>UX systems</small>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="case-study-content" id="case-study-content">
        <p className="section-kicker">Full case study</p>
        <h2>The normal content begins after the cinematic deck reveal.</h2>
      </section>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" aria-label="Associate Product Designer introduction">
      <div className="hero-cloud hero-cloud--top" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-cloud hero-cloud--side" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-shape hero-shape--triangle" aria-hidden="true" />
      <div className="hero-shape hero-shape--sun" aria-hidden="true" />
      <div className="hero-illustration" aria-hidden="true">
        <div className="cat">
          <span className="cat-ear cat-ear--left" />
          <span className="cat-ear cat-ear--right" />
          <span className="cat-body" />
          <span className="cat-tail" />
          <span className="cat-face" />
        </div>
        <div className="person">
          <div className="hair" />
          <div className="face">
            <span className="eye eye--left" />
            <span className="eye eye--right" />
            <span className="glasses glasses--left" />
            <span className="glasses glasses--right" />
            <span className="mouth" />
          </div>
        </div>
      </div>
      <div className="hero-title-card">
        <p>Portfolio</p>
        <h1>Associate Product Designer</h1>
      </div>
    </section>
  );
}
