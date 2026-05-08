const revealItems = document.querySelectorAll('[data-reveal]');
const parallaxScenes = document.querySelectorAll('[data-scene]');

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

let ticking = false;
const updateParallax = () => {
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

  ticking = false;
};

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

updateParallax();
