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
    <section className="hero-section" aria-label="Associate Product Designer introduction">
      <svg className="hero-scene" viewBox="0 0 1432 805" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="1432" height="805" fill="#ffd03f" />
        <polygon className="hero-plane-motion" points="716,486 1217,710 242,710" fill="#ffc5c9" />
        <polygon points="0,408 489,710 489,805 0,805" fill="#fff4b8" />
        <polygon points="1432,408 927,710 927,805 1432,805" fill="#fff4b8" />

        <g transform="translate(727 17)">
          <g className="hero-svg-cloud hero-cloud-main-motion">
            <circle cx="32" cy="64" r="32" />
            <circle cx="88" cy="65" r="56" />
            <circle cx="158" cy="64" r="56" />
            <circle cx="218" cy="64" r="32" />
          </g>
        </g>
        <g transform="translate(268 413)">
          <g className="hero-svg-cloud hero-cloud-left-motion">
            <circle cx="32" cy="45" r="32" />
            <circle cx="88" cy="45" r="44" />
            <circle cx="154" cy="45" r="44" />
            <circle cx="218" cy="45" r="32" />
          </g>
        </g>

        <g className="hero-house-motion" transform="translate(230 219)">
          <polygon points="87,0 174,152 0,152" fill="#573dde" />
          <rect x="48" y="152" width="174" height="148" fill="#ff2700" />
          <rect x="13" y="300" width="244" height="70" fill="#ffc5c9" />
        </g>

        <g transform="translate(1028 188)">
          <g className="hero-svg-sun">
            <polygon points="100,0 122,55 191,43 168,102 207,116 154,146 171,207 110,166 99,229 69,167 33,178 45,123 0,114 52,78 18,43 66,47" fill="#ff7045" />
            <circle cx="101" cy="103" r="66" fill="#ef6d42" />
          </g>
        </g>

        <g transform="translate(900 380)">
          <g className="hero-svg-flower">
            <rect x="105" y="178" width="14" height="112" fill="#573dde" />
            <circle cx="42" cy="70" r="42" fill="#05cbd1" />
            <circle cx="112" cy="44" r="44" fill="#05cbd1" />
            <circle cx="188" cy="71" r="43" fill="#05cbd1" />
            <path d="M0 76 C45 37 76 76 113 115 C149 75 185 37 232 75 L232 120 C232 174 185 191 116 191 C47 191 1 174 1 119 Z" fill="#ff2700" />
            <path d="M55 77 C82 30 151 28 181 78 C156 64 139 74 116 106 C92 74 75 64 55 77Z" fill="#ffd03f" />
          </g>
        </g>

        <g transform="translate(510 92)">
          <g className="hero-character-motion">
            <g className="hero-cat-motion">
              <path d="M48 90 L49 14 Q49 6 56 12 L115 56 Z" fill="#fffdf7" stroke="#ff9d16" strokeWidth="4" />
              <path d="M205 55 L252 7 Q260 -1 263 11 L276 89 Z" fill="#fffdf7" stroke="#ff9d16" strokeWidth="4" />
              <path d="M65 91 L56 30 L107 65 Z" fill="#ffd8e3" opacity=".9" />
              <path d="M219 66 L253 29 L263 91 Z" fill="#ffd8e3" opacity=".9" />
              <path d="M242 124 C330 121 347 202 307 239" fill="none" stroke="#ff9d16" strokeWidth="4" strokeLinecap="round" />
              <path d="M340 62 C384 49 397 115 342 105" fill="none" stroke="#ff9d16" strokeWidth="5" strokeLinecap="round" />
              <path d="M348 107 C380 134 352 204 310 228" fill="none" stroke="#ff9d16" strokeWidth="4" strokeLinecap="round" />
              <path d="M344 145 C366 154 382 156 397 153" stroke="#ff9d16" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M338 181 C362 192 383 197 400 196" stroke="#ff9d16" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M62 170 C17 229 21 261 67 276" fill="#fffdf7" stroke="#ff9d16" strokeWidth="4" strokeLinecap="round" />
              <path d="M211 206 C240 222 263 218 283 202 C280 242 248 266 207 259 C189 247 179 228 190 213 Z" fill="#fffdf7" />
              <path d="M88 202 C71 240 42 260 15 256 C0 236 2 208 26 187 Z" fill="#fffdf7" />
              <path d="M34 128 C35 54 96 36 151 39 C222 40 267 76 267 129 C267 186 209 213 151 211 C83 210 33 186 34 128Z" fill="#ffbb50" />
              <path d="M34 128 C35 54 96 36 151 39 C147 90 117 117 68 137 C50 141 40 136 34 128Z" fill="#ffbb50" />
              <path d="M151 39 C176 104 208 124 267 106 C277 176 215 213 151 211 C80 210 31 182 34 128 C80 138 119 113 151 39Z" fill="#fffdf7" />
              <path d="M34 128 C35 54 96 36 151 39 C222 40 267 76 267 129 C267 186 209 213 151 211 C83 210 33 186 34 128Z" fill="none" stroke="#ff9d16" strokeWidth="4" strokeLinecap="round" />
              <path d="M132 42 L154 87 L164 40" fill="#ffa72f" opacity=".65" />
              <path d="M32 126 C48 129 58 128 70 122 M37 143 C50 142 60 139 71 134 M248 115 C262 111 274 106 286 101 M247 128 C263 127 275 123 288 118" stroke="#ffa72f" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M90 114 C91 99 111 99 112 114" stroke="#050505" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M168 114 C169 99 189 99 190 114" stroke="#050505" strokeWidth="8" fill="none" strokeLinecap="round" />
              <path d="M129 137 L153 137 L141 146 Z" fill="#ffc5c9" />
              <path d="M141 148 L141 162 M121 166 C132 171 139 164 141 160 C145 166 156 171 166 164" stroke="#050505" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            <g className="hero-person" transform="translate(0 209)">
              <path d="M30 188 C1 96 45 5 181 5 C315 5 363 96 359 185 L359 293 C338 321 275 333 181 333 C87 333 24 321 12 292 C27 262 30 231 30 188Z" fill="#126cf5" />
              <path d="M86 97 C108 52 144 31 180 20 C224 32 272 60 294 98 C263 101 223 87 189 67 C172 95 137 113 86 97Z" fill="#ffd7c7" />
              <path d="M83 113 C111 72 144 54 182 52 C228 51 267 74 296 113 C279 117 233 112 191 76 C164 109 120 124 83 113Z" fill="#126cf5" />
              <ellipse cx="44" cy="143" rx="24" ry="31" fill="#ffd7c7" />
              <ellipse cx="320" cy="143" rx="24" ry="31" fill="#ffd7c7" />
              <ellipse cx="181" cy="167" rx="135" ry="116" fill="#ffd7c7" />
              <path d="M61 137 C88 119 124 117 157 130 C157 171 141 190 101 190 C69 190 61 167 61 137Z" fill="none" stroke="#050505" strokeWidth="8" />
              <path d="M203 130 C235 117 273 119 301 137 C300 167 292 190 260 190 C220 190 204 171 203 130Z" fill="none" stroke="#050505" strokeWidth="8" />
              <path d="M155 136 C172 132 188 132 205 136" stroke="#050505" strokeWidth="8" strokeLinecap="round" />
              <path d="M88 156 C108 139 131 139 149 156" stroke="#050505" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M231 156 C251 139 274 139 292 156" stroke="#050505" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M178 194 C184 187 191 190 195 196" stroke="#6a3e35" strokeWidth="1" fill="none" />
              <path d="M113 216 H254 C255 261 226 283 184 283 C141 283 112 261 113 216Z" fill="#171717" />
              <path d="M113 216 H254 V231 H113 Z" fill="#ffffff" />
              <ellipse cx="184" cy="279" rx="45" ry="12" fill="#9b2b12" />
            </g>
          </g>
        </g>
      </svg>
      <div className="hero-title-card" aria-hidden="true">
        <h1>
          <span>Associate Product</span>
          <span>Designer</span>
        </h1>
      </div>
      <h1 className="hero-sr-title">Associate Product Designer</h1>
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
