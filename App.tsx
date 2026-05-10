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

function FlowerComponent() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-[2.36%_0_-2.36%_0]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234.293 338.5">
          <g>
            <path d={svgPaths.p2214e680} fill="#05D7D2" />
            <path d={svgPaths.p1804f400} fill="#FFC502" />
            <rect fill="#573DDE" height="150.444" width="25.2848" x="104.709" y="188.056" />
            <path d={svgPaths.p12caea00} fill="#FF2700" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CharacterLayer() {
  return (
    <>
      {/* Character (Group3 content) */}
      <div className="absolute flex h-[410.353px] items-center justify-center left-[481px] top-[279px] w-[435.824px]">
        <div className="flex-none rotate-[1.01deg]">
          <div className="h-[402.829px] relative w-[428.764px]">
            <div className="absolute inset-[-0.1%_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 428.764 403.25">
                <g>
                  <path d={svgPaths.p2ab74100} fill="#016DFF" />
                  <path d={svgPaths.p2e677a00} fill="#FCD9C4" />
                  <path d={svgPaths.p1c091780} fill="#016DFF" stroke="#016DFF" strokeWidth="0.841352" />
                  <path d={svgPaths.p2581a780} fill="#016DFF" stroke="#016DFF" strokeWidth="0.841352" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Glasses band */}
      <div className="absolute flex h-[46.765px] items-center justify-center left-[603.18px] top-[449.25px] w-[190.463px]">
        <div className="flex-none rotate-[1.01deg]">
          <div className="h-[43.415px] relative w-[189.725px]">
            <div className="absolute inset-[-6.78%_-1.55%_-0.29%_-1.55%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 195.615 46.4837">
                <g>
                  <path d={svgPaths.p3c997800} stroke="black" strokeWidth="0.841352" />
                  <path d={svgPaths.p1ddeed00} stroke="black" strokeLinecap="round" strokeWidth="5.88947" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Glasses image */}
      <div className="absolute flex items-center justify-center left-[562.39px] size-[273.955px] top-[317.08px]">
        <div className="flex-none rotate-[1.01deg]">
          <div className="relative size-[269.233px]">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgReadingEyeglasses} />
          </div>
        </div>
      </div>
      {/* Mouth */}
      <div className="absolute flex h-[67.348px] items-center justify-center left-[626.81px] top-[499.82px] w-[147.539px]">
        <div className="flex-none rotate-[1.01deg]">
          <div className="h-[64.767px] relative w-[146.416px]">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 146.416 64.7669">
              <g>
                <path d={svgPaths.p644f2f0} fill="#1F1F1F" />
                <path d={svgPaths.p134f7e80} fill="#9A2811" />
                <path d={svgPaths.p2e50c500} fill="#FFFEFE" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      {/* Cat (Group5) */}
      <div className="absolute h-[308.673px] left-[541.04px] top-[90px] w-[386.036px]">
        <div className="absolute inset-[0_0_-0.59%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 386.036 310.5">
            <g>
              <path d={svgPaths.p3d821a00} fill="#FCFCFC" />
              <path d={svgPaths.p9bd8700} fill="#FCFCFC" />
              <path d={svgPaths.p2920b300} fill="#FCFCFC" />
              <path d={svgPaths.p971c700} fill="#FCFCFC" />
              <path d={svgPaths.p2af86d40} fill="#FCFCFC" stroke="#FFA216" strokeWidth="4" />
              <path d={svgPaths.p15f50ef0} fill="#FFE3E3" />
              <path d={svgPaths.p11c64000} fill="#FFE3E3" />
              <path d={svgPaths.p3005ec00} fill="#FEBB56" />
              <path d={svgPaths.p3b665d00} stroke="black" strokeLinecap="round" strokeWidth="3" />
              <path d={svgPaths.pcecaa80} fill="black" />
              <path d={svgPaths.p85eed00} fill="black" />
              <path d={svgPaths.p12a64d00} fill="#FFAF37" />
              <path d={svgPaths.p8ef5500} fill="#FFAF37" />
              <path d={svgPaths.p13633210} fill="#FFAF37" />
              <path d={svgPaths.p3b828700} fill="#FFAF37" />
              <path d={svgPaths.p20554b00} fill="#FFAF37" />
              <path d={svgPaths.p52de400} fill="#FFAF37" />
              <path d={svgPaths.p3e223300} fill="#FFAF37" />
              <path d={svgPaths.p1102dd00} fill="#FFCB7D" />
              <path d={svgPaths.pc138d40} fill="#FFCB7D" />
              <path d={svgPaths.p1a30fc00} fill="#FFCB7D" />
              <path d={svgPaths.p2f2fb940} fill="#FFCB7D" />
              <path d={svgPaths.p2b83f070} fill="#FFAF37" />
              <path d={svgPaths.p15c6ec00} fill="#FFAF37" />
              <path d={svgPaths.p698c300} fill="#FFAF37" />
              <path d={svgPaths.p251e2900} fill="#FFAF37" />
              <path d={svgPaths.p284b2e00} fill="#FFAF37" />
              <path d={svgPaths.p18a90180} stroke="#FFA216" strokeLinecap="round" strokeWidth="4" />
              <path d={svgPaths.p1bd9bc80} stroke="#FFA216" strokeLinecap="round" strokeWidth="4" />
              <path d={svgPaths.p2654f280} stroke="#FFAF37" strokeLinecap="round" strokeWidth="4" />
              <path d={svgPaths.p3bf5cc00} fill="#FFDADA" />
              <path d={svgPaths.p31918a80} fill="#FCFCFC" stroke="#FCFCFC" strokeLinecap="round" strokeWidth="4" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

function CardRed() {
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

function CardPink() {
  return (
    <div className="bg-[#f781d4] content-stretch flex h-[380px] items-start justify-center py-[16px] relative rounded-[20px] w-[440px]">
      <div className="font-['Robuck:Rounded',sans-serif] leading-[0] not-italic relative shrink-0 text-[#6c3089] text-[0px] text-center w-[396px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0 text-[48px]">Project 1</p>
        <p className="leading-[normal] mb-0 text-[48px]">​</p>
        <p className="font-['ABC_Diatype_Rounded_Unlicensed_Trial:Regular',sans-serif] leading-[normal] text-[24px]">Placeholder</p>
      </div>
    </div>
  );
}

function CardBlue() {
  return (
    <div className="bg-[#2668fd] content-stretch flex h-[380px] items-start justify-center py-[16px] relative rounded-[20px] w-[440px]">
      <div className="font-['Robuck:Rounded',sans-serif] leading-[0] not-italic relative shrink-0 text-[#fdcb40] text-[0px] text-center w-[396px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0 text-[48px]">Project 2</p>
        <p className="leading-[normal] mb-0 text-[48px]">​</p>
        <p className="font-['ABC_Diatype_Rounded_Unlicensed_Trial:Regular',sans-serif] leading-[normal] text-[24px]">Placeholder</p>
      </div>
    </div>
  );
}

function CardWhite() {
  return (
    <div className="bg-white content-stretch flex h-[380px] items-start justify-center py-[16px] relative rounded-[20px] w-[440px]">
      <div className="font-['Robuck:Rounded',sans-serif] leading-[0] not-italic relative shrink-0 text-[#fdcb40] text-[0px] text-center w-[396px] whitespace-pre-wrap">
        <p className="leading-[normal] mb-0 text-[48px]">Project 3</p>
        <p className="leading-[normal] mb-0 text-[48px]">​</p>
        <p className="font-['ABC_Diatype_Rounded_Unlicensed_Trial:Regular',sans-serif] leading-[normal] text-[24px]">Placeholder</p>
      </div>
    </div>
  );
}

// Background balloons/clouds from Wireframe7 SVG paths
function Wireframe7BgOnly() {
  return (
    <div className="absolute inset-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1586.24 2916" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g id="Group 37">
          <g clipPath="url(#clip0_bg)" id="Group 29">
            <path d={svgPathsW7.p13582ea0} fill="white" />
            <path d={svgPathsW7.p19999080} fill="white" />
            <path d={svgPathsW7.p3edcfd80} fill="white" />
          </g>
          <g clipPath="url(#clip1_bg)" id="Group 9">
            <path d={svgPathsW7.p2b8f4f80} fill="white" />
            <path d={svgPathsW7.p34c0d500} fill="white" />
            <path d={svgPathsW7.p329ceb00} fill="white" />
          </g>
          {/* Group40 balloon replaces basket-only group */}
          {/* Orange balloon */}
          <g>
            <rect fill="#C95B45" height="64" rx="4" width="100" x="1145" y="1411" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="4" x1="1111.68" x2="1146.91" y1="1339.91" y2="1411.32" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="4" x1="1280.91" x2="1244.23" y1="1337.68" y2="1411.99" />
            <g>
              <path d={svgPathsW7.p3fb43100} fill="#FF8E43" />
              <path d={svgPathsW7.p3c207f00} fill="#FF6B09" />
              <path d={svgPathsW7.p16a24500} fill="#FF8E43" />
              <path d={svgPathsW7.p1744ad00} fill="#FF6B09" />
              <path d={svgPathsW7.p8f4e00} fill="#FF8E43" />
              <path d={svgPathsW7.pbf3ad00} fill="#FF8E43" />
              <path d={svgPathsW7.p5c61100} fill="#FF8E43" />
              <path d={svgPathsW7.p2e204e00} fill="#FF8E43" />
              <path d={svgPathsW7.p3940bf40} fill="#FF6B09" />
              <path d={svgPathsW7.p19977d00} fill="#FF6B09" />
              <path d={svgPathsW7.p14d6400} fill="#FF6B09" />
              <path d={svgPathsW7.p387c00} fill="#FF8E43" />
              <path d={svgPathsW7.p3077cc60} fill="#FF8E43" />
              <path d={svgPathsW7.p202a6700} fill="#FF6B09" />
              <path d={svgPathsW7.p11b67970} fill="#FF6B09" />
              <path d={svgPathsW7.p22182400} stroke="#BD3505" />
            </g>
          </g>
          <path d={svgPathsW7.p34b66680} fill="white" />
          <g>
            <path d={svgPathsW7.pe629400} fill="white" />
            <path d={svgPathsW7.p13453a00} fill="white" />
            <path d={svgPathsW7.p1cf9d780} fill="white" />
          </g>
          <g>
            <path d={svgPathsW7.p2f158080} fill="white" />
            <path d={svgPathsW7.pd22d770} fill="white" />
            <path d={svgPathsW7.p37fad00} fill="white" />
          </g>
          {/* Pink balloon */}
          <g>
            <rect fill="#C95B45" height="51.6233" rx="3.22646" width="80.6614" x="1330.82" y="1994.12" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="3.22646" x1="1303.94" x2="1332.36" y1="1936.78" y2="1994.38" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="3.22646" x1="1440.45" x2="1410.87" y1="1934.98" y2="1994.92" />
            <g>
              <path d={svgPathsW7.p34fe67c0} fill="#FF6CDB" />
              <path d={svgPathsW7.p35777cc0} fill="#FF6CDB" />
              <path d={svgPathsW7.p3298f700} fill="#B60D3F" />
              <path d={svgPathsW7.paac330} fill="#BA325A" />
              <path d={svgPathsW7.p2158a380} fill="#B60D3F" />
              <path d={svgPathsW7.p1ee00300} fill="#BA325A" />
              <path d={svgPathsW7.p245bd200} fill="#FF6CDB" />
              <path d={svgPathsW7.p37191400} fill="#FF6CDB" />
              <path d={svgPathsW7.pb8e2470} fill="#FF6CDB" />
              <path d={svgPathsW7.p2f948500} fill="#B60D3F" />
            </g>
          </g>
          {/* Another pink balloon */}
          <g>
            <rect fill="#C95B45" height="51.6233" rx="3.22646" width="80.6614" x="1428.82" y="825.121" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="3.22646" x1="1401.94" x2="1430.36" y1="767.778" y2="825.381" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="3.22646" x1="1538.45" x2="1508.87" y1="765.979" y2="825.921" />
            <g>
              <path d={svgPathsW7.pfc99500} fill="#FF6CDB" />
              <path d={svgPathsW7.p53f2400} fill="#FF6CDB" />
              <path d={svgPathsW7.p9c05080} fill="#B60D3F" />
              <path d={svgPathsW7.p4aacc00} fill="#BA325A" />
              <path d={svgPathsW7.p113ea980} fill="#B60D3F" />
              <path d={svgPathsW7.p12f23e00} fill="#BA325A" />
              <path d={svgPathsW7.p82b9500} fill="#FF6CDB" />
              <path d={svgPathsW7.p488e00} fill="#FF6CDB" />
              <path d={svgPathsW7.p31649670} fill="#FF6CDB" />
              <path d={svgPathsW7.p39f17df0} fill="#B60D3F" />
            </g>
          </g>
          {/* Blue balloon */}
          <g>
            <rect fill="#C95B45" height="36.4937" rx="2.28086" width="57.0215" x="220.6" y="882.145" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="2.28086" x1="201.6" x2="221.689" y1="841.608" y2="882.329" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="2.28086" x1="298.097" x2="277.185" y1="840.336" y2="882.711" />
            <g>
              <path d={svgPathsW7.p2fee4200} fill="#68A8FF" />
              <path d={svgPathsW7.p2efa7280} fill="#016DFF" />
              <path d={svgPathsW7.p15a0c900} fill="#68A8FF" />
              <path d={svgPathsW7.p2a082e20} fill="#016DFF" />
              <path d={svgPathsW7.p146bbd80} fill="#68A8FF" />
              <path d={svgPathsW7.p24a69700} fill="#68A8FF" />
              <path d={svgPathsW7.p30ac8a80} fill="#68A8FF" />
              <path d={svgPathsW7.p273c6600} fill="#68A8FF" />
              <path d={svgPathsW7.p1fa45980} fill="#016DFF" />
              <path d={svgPathsW7.p1c790d00} fill="#016DFF" />
              <path d={svgPathsW7.p2183480} fill="#016DFF" />
              <path d={svgPathsW7.pc5787f0} fill="#68A8FF" />
              <path d={svgPathsW7.p21d391f0} fill="#68A8FF" />
              <path d={svgPathsW7.p45e0640} fill="#016DFF" />
              <path d={svgPathsW7.pea4f980} fill="#016DFF" />
              <path d={svgPathsW7.p243718d0} stroke="black" strokeWidth="0.570215" />
            </g>
          </g>
          {/* Another blue balloon */}
          <g>
            <rect fill="#C95B45" height="36.4937" rx="2.28086" width="57.0215" x="747.6" y="1820.15" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="2.28086" x1="728.6" x2="748.689" y1="1779.61" y2="1820.33" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="2.28086" x1="825.097" x2="804.185" y1="1778.34" y2="1820.71" />
            <g>
              <path d={svgPathsW7.p17640f00} fill="#68A8FF" />
              <path d={svgPathsW7.p10add500} fill="#016DFF" />
              <path d={svgPathsW7.p1155ee00} fill="#68A8FF" />
              <path d={svgPathsW7.p235218f2} fill="#016DFF" />
              <path d={svgPathsW7.p3f642d80} fill="#68A8FF" />
              <path d={svgPathsW7.p23c00100} fill="#68A8FF" />
              <path d={svgPathsW7.p1a9c4f80} fill="#68A8FF" />
              <path d={svgPathsW7.p177948f0} fill="#68A8FF" />
              <path d={svgPathsW7.p26c8c000} fill="#016DFF" />
              <path d={svgPathsW7.p10e53d00} fill="#016DFF" />
              <path d={svgPathsW7.pcdd3500} fill="#016DFF" />
              <path d={svgPathsW7.p43b3080} fill="#68A8FF" />
              <path d={svgPathsW7.p3bb91800} fill="#68A8FF" />
              <path d={svgPathsW7.p11e71e80} fill="#016DFF" />
              <path d={svgPathsW7.p3bf30a00} fill="#016DFF" />
              <path d={svgPathsW7.peb7d200} stroke="black" strokeWidth="0.570215" />
            </g>
          </g>
          {/* Orange balloon bottom */}
          <g>
            <rect fill="#C95B45" height="64" rx="4" width="100" x="106" y="2391" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="4" x1="72.6785" x2="107.909" y1="2319.91" y2="2391.32" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="4" x1="241.908" x2="205.234" y1="2317.68" y2="2391.99" />
            <g>
              <path d={svgPathsW7.p211bea00} fill="#FF8E43" />
              <path d={svgPathsW7.p3ced4700} fill="#FF6B09" />
              <path d={svgPathsW7.p2cb17000} fill="#FF8E43" />
              <path d={svgPathsW7.p11efa180} fill="#FF6B09" />
              <path d={svgPathsW7.p10e02e80} fill="#FF8E43" />
              <path d={svgPathsW7.p36a39600} fill="#FF8E43" />
              <path d={svgPathsW7.p18190980} fill="#FF8E43" />
              <path d={svgPathsW7.p2c54a140} fill="#FF8E43" />
              <path d={svgPathsW7.p31759880} fill="#FF6B09" />
              <path d={svgPathsW7.p21aef000} fill="#FF6B09" />
              <path d={svgPathsW7.p9b2a80} fill="#FF6B09" />
              <path d={svgPathsW7.p2ed20a00} fill="#FF8E43" />
              <path d={svgPathsW7.p3eda4c00} fill="#FF8E43" />
              <path d={svgPathsW7.p3428d400} fill="#FF6B09" />
              <path d={svgPathsW7.p246d7600} fill="#FF6B09" />
              <path d={svgPathsW7.p2be3c300} stroke="#BD3505" />
            </g>
          </g>
          {/* Small basket bottom */}
          <g>
            <rect fill="#C95B45" height="38.2196" rx="2.38873" width="59.7181" x="1212.14" y="2732.52" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="2.38873" x1="1192.24" x2="1213.28" y1="2690.06" y2="2732.71" />
            <line stroke="#C95B45" strokeLinecap="round" strokeWidth="2.38873" x1="1293.3" x2="1271.4" y1="2688.73" y2="2733.11" />
            <path d={svgPathsW7.p1636b100} />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_bg">
            <rect fill="white" height="499" transform="translate(99 1020.74)" width="1440" />
          </clipPath>
          <clipPath id="clip1_bg">
            <rect fill="white" height="499" transform="translate(84)" width="1440" />
          </clipPath>
        </defs>
      </svg>
      {/* Group40 balloon overlay at position of old basket (y=1443) */}
      <div className="absolute" style={{ left: "10.22%", top: "4.07%", width: "13.87%", height: "11.01%" }}>
        <Group40 />
      </div>
    </div>
  );
}