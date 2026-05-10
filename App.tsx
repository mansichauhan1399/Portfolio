import { useEffect, useRef } from "react";
import type { CSSProperties, MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectCard = {
  label: string;
  title: string;
  color: string;
  textColor: string;
  rotation: number;
};

const projects: ProjectCard[] = [
  {
    label: "PROJECT 1",
    title: "Placeholder",
    color: "#eb70c7",
    textColor: "#65328a",
    rotation: -3.5,
  },
  {
    label: "PROJECT 2",
    title: "Placeholder",
    color: "#126cf5",
    textColor: "#ffd03f",
    rotation: 2.1,
  },
  {
    label: "PROJECT 3",
    title: "Placeholder",
    color: "#fffdf7",
    textColor: "#ffd03f",
    rotation: -1.2,
  },
];

const portfolioCopy =
  "Building Healthcare AI at Innovaccer — designing intelligent systems that empower care teams and improve patient outcomes.";

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const titleCardRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const decorRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(stageRef.current, {
        transformOrigin: "50% 50%",
        willChange: "transform",
      });

      gsap.set(titleCardRef.current, {
        xPercent: 0,
        yPercent: -3,
        rotate: 0,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        willChange: "transform, opacity",
      });

      const initialProjectStates = [
        { xPercent: -4, yPercent: 8, rotate: -4, scale: 0.99, zIndex: 20, opacity: 1 },
        { xPercent: 0, yPercent: 8, rotate: 2, scale: 0.97, zIndex: 10, opacity: 1 },
        { xPercent: 3, yPercent: 10, rotate: 0, scale: 0.95, zIndex: 5, opacity: 0 },
      ];

      gsap.set(projectRefs.current, {
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });

      projectRefs.current.forEach((card, index) => {
        gsap.set(card, initialProjectStates[index]);
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: reduceMotion ? "none" : "power2.inOut",
          duration: reduceMotion ? 0.01 : 1,
        },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 4.2, 3200)}`,
          scrub: reduceMotion ? true : 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            pinRef.current?.style.setProperty("--scroll-progress", self.progress.toFixed(3));
          },
        },
      });

      timeline
        .to(titleCardRef.current, {
          xPercent: 8,
          yPercent: -170,
          rotate: 8,
          scale: 0.98,
          duration: 0.9,
        })
        .to(
          projectRefs.current[0],
          {
            xPercent: 0,
            yPercent: 0,
            rotate: projects[0].rotation,
            scale: 1,
            opacity: 1,
            zIndex: 40,
            duration: 0.9,
          },
          "<",
        )
        .to(stageRef.current, { yPercent: 3, duration: 0.45 })
        .to(projectRefs.current[0], {
          xPercent: 7,
          yPercent: -160,
          rotate: 7,
          scale: 0.98,
          zIndex: 12,
          duration: 0.95,
        })
        .to(
          projectRefs.current[1],
          {
            xPercent: 0,
            yPercent: 0,
            rotate: projects[1].rotation,
            scale: 1,
            opacity: 1,
            zIndex: 45,
            duration: 0.95,
          },
          "<",
        )
        .to(
          projectRefs.current[2],
          {
            xPercent: -2,
            yPercent: 4,
            rotate: projects[2].rotation,
            scale: 0.97,
            opacity: 1,
            zIndex: 15,
            duration: 0.95,
          },
          "<",
        )
        .to(stageRef.current, { yPercent: -1, duration: 0.45 })
        .to(projectRefs.current[1], {
          xPercent: -4,
          yPercent: -166,
          rotate: -3,
          scale: 0.98,
          zIndex: 14,
          duration: 0.95,
        })
        .to(
          projectRefs.current[2],
          {
            xPercent: 0,
            yPercent: 0,
            rotate: projects[2].rotation,
            scale: 1,
            opacity: 1,
            zIndex: 50,
            duration: 0.95,
          },
          "<",
        )
        .to(stageRef.current, { yPercent: -4, duration: 0.7 });

      decorRefs.current.forEach((decor, index) => {
        gsap.to(decor, {
          yPercent: index % 2 === 0 ? -34 : 28,
          xPercent: index % 3 === 0 ? 14 : -12,
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: reduceMotion ? true : 1.4,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="portfolio-page">
      <HeroSection />

      <section ref={pinRef} className="portfolio-scroll" aria-label="Scroll through portfolio projects">
        <DecorativeScene decorRefs={decorRefs} />

        <div ref={stageRef} className="portfolio-stage">
          <div ref={titleCardRef} className="portfolio-title-card">
            <h2>Associate Product Designer</h2>
            <p>{portfolioCopy}</p>
          </div>

          {projects.map((project, index) => (
            <article
              key={project.label}
              ref={(node) => {
                if (node) projectRefs.current[index] = node;
              }}
              className="project-card"
              style={
                {
                  "--card-bg": project.color,
                  "--card-text": project.textColor,
                } as CSSProperties
              }
            >
              <h3>{project.label}</h3>
              <p>{project.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-content" id="case-study-content">
        <p className="section-kicker">Full case study</p>
        <h2>The normal content begins after the pinned reveal.</h2>
      </section>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" aria-label="Associate Product Designer introduction">
      <div className="hero-sun" aria-hidden="true" />
      <div className="hero-blocks" aria-hidden="true">
        <span className="hero-triangle" />
        <span className="hero-square" />
        <span className="hero-base" />
      </div>
      <div className="hero-flower" aria-hidden="true">
        <span />
      </div>
      <div className="hero-hills" aria-hidden="true" />
      <Cloud className="hero-cloud hero-cloud-top" />
      <Cloud className="hero-cloud hero-cloud-left" />
      <div className="hero-person" aria-hidden="true">
        <div className="cat">
          <span className="cat-ear cat-ear-left" />
          <span className="cat-ear cat-ear-right" />
          <span className="cat-head" />
          <span className="cat-body" />
          <span className="cat-tail" />
        </div>
        <div className="hair" />
        <div className="face">
          <span className="glasses glasses-left" />
          <span className="glasses glasses-right" />
          <span className="nose" />
          <span className="mouth" />
        </div>
      </div>
      <div className="hero-nameplate">
        <h1>Associate Product Designer</h1>
      </div>
    </section>
  );
}

function DecorativeScene({ decorRefs }: { decorRefs: MutableRefObject<HTMLDivElement[]> }) {
  return (
    <div className="decorative-scene" aria-hidden="true">
      <Cloud className="cloud cloud-top" setRef={(node) => (decorRefs.current[0] = node)} />
      <Cloud className="cloud cloud-left" setRef={(node) => (decorRefs.current[1] = node)} />
      <Cloud className="cloud cloud-right" setRef={(node) => (decorRefs.current[2] = node)} />
      <Cloud className="cloud cloud-bottom" setRef={(node) => (decorRefs.current[3] = node)} />
      <Balloon variant="pink" className="balloon balloon-left" setRef={(node) => (decorRefs.current[4] = node)} />
      <Balloon variant="blue" className="balloon balloon-blue" setRef={(node) => (decorRefs.current[5] = node)} />
      <Balloon variant="orange" className="balloon balloon-orange" setRef={(node) => (decorRefs.current[6] = node)} />
      <Balloon variant="heart" className="balloon balloon-heart" setRef={(node) => (decorRefs.current[7] = node)} />
    </div>
  );
}

function Cloud({
  className,
  setRef,
}: {
  className: string;
  setRef?: (node: HTMLDivElement) => void;
}) {
  return (
    <div
      className={className}
      ref={(node) => {
        if (node && setRef) setRef(node);
      }}
    >
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function Balloon({
  variant,
  className,
  setRef,
}: {
  variant: "pink" | "blue" | "orange" | "heart";
  className: string;
  setRef?: (node: HTMLDivElement) => void;
}) {
  return (
    <div
      className={`${className} balloon-${variant}`}
      ref={(node) => {
        if (node && setRef) setRef(node);
      }}
    >
      <span className="balloon-envelope" />
      <span className="balloon-string balloon-string-left" />
      <span className="balloon-string balloon-string-right" />
      <span className="balloon-basket" />
    </div>
  );
}
