/* ============================================================
   script.js — Super Poderes Contra Relações Abusivas
   Stack: GSAP 3 + ScrollTrigger
============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   COUNTDOWN TIMER — 15 minutos (900s)
============================================================ */
(function initTimer() {
  const DURATION = 15 * 60; // segundos
  const STORAGE_KEY = 'sp_timer_end';

  let endTime = localStorage.getItem(STORAGE_KEY);
  if (!endTime || Date.now() > Number(endTime)) {
    endTime = Date.now() + DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, endTime);
  }

  const timerEl = document.getElementById('stickyTimer');

  function tick() {
    const remaining = Math.max(0, Math.round((Number(endTime) - Date.now()) / 1000));
    const m = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    if (timerEl) timerEl.textContent = `${m}:${s}`;
    if (remaining > 0) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

/* ============================================================
   URGÊNCIA — prazo dos bônus (hoje às 23:59)
============================================================ */
(function initBonusDeadline() {
  const el = document.getElementById('bonusDeadline');
  if (!el) return;
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  el.textContent = `${day}/${month} às 23h59`;
})();

/* ============================================================
   STICKY BAR — esconder ao scrollar para cima no hero
============================================================ */
(function initStickyBar() {
  const bar = document.getElementById('stickyBar');
  if (!bar) return;

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: '100px top',
    onLeave: () => gsap.to(bar, { y: 0, opacity: 1, duration: 0.3 }),
    onEnterBack: () => gsap.to(bar, { y: -60, opacity: 0, duration: 0.3 }),
  });
})();

/* ============================================================
   HERO — animação de entrada
============================================================ */
(function animateHero() {
  const tl = gsap.timeline({ delay: 0.1 });

  tl.from('.hero__badge',    { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
    .from('.hero__headline', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.hero__sub',      { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .from('.hero__proof',    { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .from('.hero__cta',      { y: 15, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    .from('.hero__guarantee',{ y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    .from('.hero__video-wrapper, .hero__video-fallback',
                             { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.8');
})();

/* ============================================================
   HERO VIDEO — fallback: mostra placeholder se vídeo não carrega
============================================================ */
(function handleHeroVideo() {
  const video    = document.getElementById('heroVideo');
  const fallback = document.getElementById('heroFallback');
  if (!video || !fallback) return;

  // Esconde placeholder se vídeo carregou
  video.addEventListener('canplay', () => {
    fallback.style.display = 'none';
    video.style.display = 'block';
  });

  // Se vídeo não existir ou der erro, mantém placeholder
  video.addEventListener('error', () => {
    video.style.display = 'none';
    fallback.style.display = 'flex';
  });

  // Se src vazia, esconde o video tag imediatamente
  const src = video.querySelector('source');
  if (!src || !src.src || src.src.includes('hero-3d.mp4')) {
    // Verifica se o arquivo existe tentando carregar
    // Se não carregar em 1s, exibe fallback
    setTimeout(() => {
      if (video.readyState === 0) {
        video.style.display = 'none';
        fallback.style.display = 'flex';
      }
    }, 1000);
  }
})();

/* ============================================================
   SCROLL ANIMATIONS — ScrollTrigger
============================================================ */

// Helper: animação padrão fade-up para seção
function fadeUpOnScroll(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  elements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      y: options.y ?? 40,
      opacity: 0,
      duration: options.duration ?? 0.7,
      ease: options.ease ?? 'power2.out',
      delay: options.delay ?? 0,
    });
  });
}

// Proof bar
fadeUpOnScroll('.proof-bar__item', { y: 20, duration: 0.5 });

// Pain items — stagger
(function animatePain() {
  const items = document.querySelectorAll('.pain__item');
  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: '.pain__list',
      start: 'top 85%',
      once: true,
    },
    x: -30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
})();

fadeUpOnScroll('.pain__conclusion', { y: 20 });

// Revelation card
fadeUpOnScroll('.revelation__card', { y: 50, duration: 0.9 });

// Step cards — stagger
(function animateSteps() {
  const cards = document.querySelectorAll('.step-card');
  if (!cards.length) return;

  gsap.from(cards, {
    scrollTrigger: {
      trigger: '.steps__grid',
      start: 'top 85%',
      once: true,
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
  });
})();

// Deliverable cards — stagger
(function animateDeliverables() {
  const cards = document.querySelectorAll('.deliverable-card');
  if (!cards.length) return;

  gsap.from(cards, {
    scrollTrigger: {
      trigger: '.deliverables__grid',
      start: 'top 85%',
      once: true,
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
  });
})();

// Author
fadeUpOnScroll('.author__photo-wrapper', { x: -40, y: 0, duration: 0.8 });
fadeUpOnScroll('.author__bio', { x: 40, y: 0, duration: 0.8 });

// Testimonials — stagger
(function animateTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  gsap.from(cards, {
    scrollTrigger: {
      trigger: '.testimonials__grid',
      start: 'top 85%',
      once: true,
    },
    y: 50,
    opacity: 0,
    duration: 0.65,
    stagger: 0.15,
    ease: 'power3.out',
  });
})();

// Offer card
fadeUpOnScroll('.offer__card', { y: 60, duration: 0.9 });

// Guarantee
fadeUpOnScroll('.guarantee__shield', { y: 20, duration: 0.6 });
fadeUpOnScroll('.guarantee__title',  { y: 20, duration: 0.6 });
fadeUpOnScroll('.guarantee__desc',   { y: 20, duration: 0.6 });

// FAQ items — stagger
(function animateFaq() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: '.faq__list',
      start: 'top 85%',
      once: true,
    },
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
  });
})();

// CTA Final
fadeUpOnScroll('.cta-final__title', { y: 40, duration: 0.8 });
fadeUpOnScroll('.cta-final__sub',   { y: 30, duration: 0.7 });

/* ============================================================
   PARALLAX — glow do hero
============================================================ */
(function heroParallax() {
  const glow = document.querySelector('.hero__bg-glow');
  if (!glow) return;

  gsap.to(glow, {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: 80,
    ease: 'none',
  });
})();

/* ============================================================
   SECTION TITLES — fade up
============================================================ */
fadeUpOnScroll('.section-title', { y: 30, duration: 0.7 });
fadeUpOnScroll('.testimonials__sub', { y: 20, duration: 0.5 });

/* ============================================================
   SMOOTH SCROLL — links internos
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   CTA PULSE — botões principais piscam suavemente
============================================================ */
(function pulseCta() {
  const ctaButtons = document.querySelectorAll('.btn--primary');
  ctaButtons.forEach((btn) => {
    gsap.to(btn, {
      boxShadow: '0 8px 48px rgba(168, 85, 247, 0.7)',
      duration: 1.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
})();

/* ============================================================
   BOOK 3D — parallax suave no mouse
============================================================ */
(function bookParallax() {
  const book    = document.getElementById('book3d');
  const wrapper = document.getElementById('heroFallback');
  if (!book || !wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    gsap.to(book, {
      rotateY: -22 + dx * 8,
      rotateX:   3 + dy * -5,
      duration: 0.7,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });

  wrapper.addEventListener('mouseleave', () => {
    gsap.to(book, {
      rotateY: -22,
      rotateX: 3,
      duration: 1.2,
      ease: 'elastic.out(1, 0.4)',
    });
  });
})();
