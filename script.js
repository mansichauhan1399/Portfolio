const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('[data-reveal]');
const parallaxScenes = document.querySelectorAll('[data-scene]');
const cardStack = document.querySelector('[data-card-stack]');
const leadCard = document.querySelector('.project-card--lead');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
let ticking = false;

const updateStackProgress = () => {
  if (!cardStack) return;

  if (reduceMotionQuery.matches) {
    cardStack.style.setProperty('--stack-progress', 1);
    if (leadCard) leadCard.style.setProperty('--lead-y', '0px');
    return;
  }

  const rect = cardStack.getBoundingClientRect();
  const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
  const progress = clamp(-rect.top / scrollableDistance);
  const easedProgress = 1 - Math.pow(1 - progress, 3);

  cardStack.style.setProperty('--stack-progress', easedProgress.toFixed(4));

  if (leadCard) {
    const lift = Math.sin(progress * Math.PI) * -18;
    leadCard.style.setProperty('--lead-y', `${lift.toFixed(2)}px`);
  }
};

const updateParallax = () => {
  if (!reduceMotionQuery.matches) {
    const viewportMiddle = window.innerHeight / 2;

    parallaxScenes.forEach((scene) => {
      const rect = scene.getBoundingClientRect();
      const sceneMiddle = rect.top + rect.height / 2;
      const distance = (viewportMiddle - sceneMiddle) / rect.height;

      scene.querySelectorAll('.shape, .balloon').forEach((element, index) => {
        const strength = 26 + index * 10;
        element.style.translate = `0 ${distance * strength}px`;
      });
    });
  }

  updateStackProgress();
  ticking = false;
};

const requestParallaxUpdate = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
};

window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
window.addEventListener('resize', requestParallaxUpdate);

reduceMotionQuery.addEventListener('change', () => {
  parallaxScenes.forEach((scene) => {
    scene.querySelectorAll('.shape, .balloon').forEach((element) => {
      element.style.translate = '';
    });
  });
  requestParallaxUpdate();
});

updateParallax();
