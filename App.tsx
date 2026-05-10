import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      gsap.set(stageRef.current, { transformOrigin: "top center" });
      gsap.set(bgRef.current, { y: 888, force3D: true });
      gsap.set(heroRef.current, { y: 0, force3D: true });
      gsap.set(orangeRef.current, { y: 0, opacity: 1, force3D: true });
      gsap.set(stackRef.current, {
        y: 170,
        scale: 0.98,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(cards, {
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        force3D: true,
      });

      gsap.set(cards[0], { opacity: 0, x: 0, y: 0, rotate: -2, rotateY: -18, scale: 0.96, zIndex: 4 });
      gsap.set(cards[1], { opacity: 0, x: -18, y: 18, rotate: -4, scale: 0.98, zIndex: 3 });
      gsap.set(cards[2], { opacity: 0, x: 18, y: 24, rotate: 3, scale: 0.96, zIndex: 2 });
      gsap.set(cards[3], { opacity: 0, x: 8, y: 32, rotate: 1, scale: 0.94, zIndex: 1 });

      const timeline = gsap.timeline({
        defaults: {
          ease: reduceMotion ? "none" : "power3.inOut",
          duration: reduceMotion ? 0.01 : 0.9,
        },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 4.5, 4200)}`,
          scrub: reduceMotion ? true : 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(bgRef.current, { y: -1568, ease: "none", duration: 7 }, 0)
        .to(heroRef.current, { y: -840, duration: 1.15 }, 0)
        .to(orangeRef.current, { y: -840, opacity: 0, duration: 1.15 }, 0)
        .to(stackRef.current, { y: -486, scale: 1, duration: 1.15 }, 0)
        .to(cards[0], { opacity: 1, rotate: 0, rotateY: 0, scale: 1, duration: 0.65 }, 0.18)
        .to(cards.slice(1), { opacity: 1, stagger: 0.08, duration: 0.45 }, 1.08)
        .to(cards[0], { y: -610, x: 120, rotate: 8, scale: 1.02, duration: 1.15 }, 1.35)
        .to(cards[1], { x: 0, y: 0, rotate: -4, scale: 1, zIndex: 5, duration: 1.1 }, 1.35)
        .to(cards[2], { x: 22, y: 16, rotate: 3, scale: 0.96, duration: 1.1 }, 1.35)
        .to(cards[3], { x: 10, y: 24, rotate: 1, scale: 0.94, duration: 1.1 }, 1.35)
        .to(cards[1], { y: -600, x: -84, rotate: -8, scale: 1.02, duration: 1.15 }, 2.65)
        .to(cards[2], { x: 0, y: 0, rotate: 2, scale: 1, zIndex: 6, duration: 1.1 }, 2.65)
        .to(cards[3], { x: -8, y: 16, rotate: -1, scale: 0.96, duration: 1.1 }, 2.65)
        .to(cards[2], { y: -605, x: 74, rotate: 7, scale: 1.02, duration: 1.15 }, 3.95)
        .to(cards[3], { x: 0, y: 0, rotate: -2, scale: 1, zIndex: 7, duration: 1.1 }, 3.95)
        .to(stackRef.current, { y: -486, scale: 0.99, duration: 0.7 }, 5.15);

      gsap.to(".clouds-drift", {
        x: -300,
        repeat: -1,
        yoyo: true,
        duration: 20,
        ease: "linear",
      });

      gsap.to(".flower-bob", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="portfolio-scroll-page">
      <section ref={pinRef} className="portfolio-pin-section" aria-label="Scroll-driven portfolio case study">
        <div ref={stageRef} className="portfolio-stage">
          <div ref={bgRef} className="absolute w-[1586.242px] h-[2916px] left-[-80px]">
            <Wireframe7BgOnly />
          </div>

          <div ref={heroRef} className="absolute inset-0">
            <div className="absolute bg-[#fdcb40] h-[838px] left-0 top-0 w-[1440px]" />
            <div className="absolute h-[499px] left-[16.27px] overflow-clip top-[16px] w-[1440px]">
              <CloudsLayer />
            </div>
            <div className="absolute h-[281px] left-[606.5px] top-[481.5px] w-[763px]">
              <PinkEllipse />
            </div>
            <div className="-translate-x-1/2 absolute h-[183.405px] left-1/2 top-[652px] w-[498px]">
              <YellowEllipse />
            </div>
            <div className="absolute h-[609px] left-[221px] top-[121px] w-[270.846px] z-[1]">
              <BlocksAnimated />
            </div>
            <div className="absolute h-[338.5px] left-[905px] top-[374px] w-[234.293px] z-[2]">
              <div className="flower-bob size-full">
                <FlowerComponent />
              </div>
            </div>
            <div className="absolute inset-0 z-[3]">
              <CharacterLayer />
            </div>
            <div className="-translate-x-1/2 absolute h-[431px] left-1/2 top-[407px] w-[1440px] z-[4]">
              <YellowPolygon />
            </div>
          </div>

          <div ref={orangeRef} className="absolute h-[223.866px] left-[1029px] top-[181px] w-[215px] z-[11]">
            <Group39 />
          </div>

          <div ref={stackRef} className="absolute left-[492px] top-[631px] h-[380px] w-[440px] z-[10]">
            <div ref={(node) => { if (node) cardsRef.current[3] = node; }} className="absolute inset-0 flex items-center justify-center">
              <CardWhite />
            </div>
            <div ref={(node) => { if (node) cardsRef.current[2] = node; }} className="absolute inset-0 flex items-center justify-center">
              <CardBlue />
            </div>
            <div ref={(node) => { if (node) cardsRef.current[1] = node; }} className="absolute inset-0 flex items-center justify-center">
              <CardPink />
            </div>
            <div ref={(node) => { if (node) cardsRef.current[0] = node; }} className="absolute inset-0 flex items-center justify-center">
              <CardRed />
            </div>
            <div aria-hidden="true" className="absolute inset-0 rounded-[20px] shadow-[0_28px_70px_rgba(48,23,51,0.16)] -z-10" />
          </div>
        </div>
      </section>

      <section className="case-study-detail" aria-label="Case study details">
        <p>Case Study</p>
        <h1>Building Healthcare AI at Innovaccer</h1>
        <div className="case-study-detail-grid">
          <article>
            <h2>Context</h2>
            <p>Placeholder space for the full narrative after the pinned card reveal finishes.</p>
          </article>
          <article>
            <h2>Role</h2>
            <p>Associate Product Designer shaping intelligent workflows for care teams.</p>
          </article>
          <article>
            <h2>Outcome</h2>
            <p>Detailed metrics, visuals, and process notes can continue in a standard scrolling layout.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
// ===== Sub-components built from Wireframe3-3 SVG paths =====
// We import from the Wireframe3-3 svg paths
import svgPaths from "./svg-nbcum20fjz";
import svgPathsW7 from "./svg-o04jntdhz2";
import imgReadingEyeglasses from "./5b74b62fe744bfd03cdbcbe33028b5687cddb509.png";
import Group40 from "./Group40";
import Group39 from "./Group39-13-266";

function CloudsLayer() {
  return (
    <div className="clouds-drift absolute inset-0">
      <div className="absolute inset-[0_32.89%_75.95%_49.64%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 251.629 120">
          <path d={svgPaths.p27619e00} fill="white" />
        </svg>
      </div>
      <div className="absolute inset-[35.07%_-17.78%_40.88%_100.3%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 251.629 120">
          <path d={svgPaths.p8ca6a80} fill="white" />
        </svg>
      </div>
      <div className="absolute inset-[75.95%_64.75%_0_17.78%]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 251.629 120">
          <path d={svgPaths.p27619e00} fill="white" />
        </svg>
      </div>
    </div>
  );
}

function BlocksAnimated() {
  return (
    <>
      {/* Pink block - static, always in place */}
      <div className="absolute bg-[#ffc5c9] inset-[65.35%_0_0_9.6%]" />

      {/* Red block - drops onto pink with rotation then settles */}
      <div className="hero-block-red absolute inset-[40.79%_13.42%_34.54%_22.34%]">
        <div className="bg-[#ff2700] size-full" />
      </div>

      {/* Purple triangle - drops onto red with rotation then settles */}
      <div className="hero-block-triangle absolute inset-[16.02%_25.62%_50.83%_-0.17%]">
        <div className="relative size-full">
          <div className="absolute bottom-1/4 left-[6.7%] right-[6.7%] top-0">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 174.071 150.75">
              <path d={svgPaths.p15baddb0} fill="#573DDE" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

function PinkEllipse() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 763 281">
      <path d={svgPaths.p3f049700} fill="#FFC5C9" />
    </svg>
  );
}

function YellowEllipse() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 498 183.405">
      <path d={svgPaths.p17c6aff0} fill="#FFF386" />
    </svg>
  );
}

function YellowPolygon() {
  return (
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 431">
      <path d="M0 0L720 431L1440 0V431H0V0Z" fill="#FFF3B7" />
    </svg>
  );
}

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
    <div className="bg-[#fe4401] content-stretch flex h-[380px] items-start justify-center py-[16px] rounded-[20px] w-[440px]">
      <div className="font-['Robuck:Rounded',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-center text-white w-[396px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0 text-[48px]">ASSOCIATE PRODUCT
DESIGNER</p>
        <p className="leading-[normal] mb-0 text-[48px]">​</p>
        <p className="font-['ABC_Diatype_Rounded_Unlicensed_Trial:Regular',sans-serif] leading-[normal] text-[24px]">Building Healthcare AI at Innovaccer — designing intelligent systems that empower care teams and improve patient outcomes.</p>
      </div>
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
