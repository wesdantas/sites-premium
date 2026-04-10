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
   BOOK 3D — abertura + páginas voando + partículas
============================================================ */
(function bookEpicAnimation() {
  const book      = document.getElementById('book3d');
  const bookFront = document.getElementById('bookFront');
  const fallback  = document.getElementById('heroFallback');
  if (!book || !bookFront) return;

  // ── 1. PARTÍCULAS ──────────────────────────────────────────
  const particlesContainer = document.getElementById('bookParticles');
  if (particlesContainer) {
    const colors = ['#A855F7', '#F59E0B', '#C084FC', '#FDE68A', '#7C3AED'];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 2;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
        box-shadow: 0 0 ${size * 2}px ${colors[Math.floor(Math.random() * colors.length)]};
      `;
      particlesContainer.appendChild(p);

      // Anima cada partícula em loop independente
      gsap.to(p, {
        opacity: Math.random() * 0.8 + 0.2,
        x: (Math.random() - 0.5) * 60,
        y: (Math.random() - 0.5) * 60,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 3,
      });
    }
  }

  // ── 2. SEQUÊNCIA DE ABERTURA ───────────────────────────────
  const tl = gsap.timeline({ delay: 1.2 });

  // Livro entra do lado direito
  tl.from(book, {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.4)',
  });

  // Pausa flutuando fechado
  tl.to({}, { duration: 0.8 });

  // Capa frontal abre — rotaciona no eixo Y pela lombada
  tl.to(bookFront, {
    rotationY: -155,
    duration: 1.2,
    ease: 'power3.inOut',
    transformOrigin: 'left center',
    transformStyle: 'preserve-3d',
    boxShadow: '0 0 80px rgba(168,85,247,0.6)',
  });

  // Glow explode ao abrir
  tl.to('.book-ground-glow', {
    opacity: 1,
    scale: 1.6,
    duration: 0.4,
    ease: 'power2.out',
  }, '<+0.5');

  tl.to('.book-ground-glow', {
    scale: 1,
    opacity: 0.45,
    duration: 0.6,
    ease: 'power2.in',
  });

  // ── 3. PÁGINAS VOAM ────────────────────────────────────────
  const pages = [
    { el: document.getElementById('flyPage1'), delay: 0 },
    { el: document.getElementById('flyPage2'), delay: 0.2 },
    { el: document.getElementById('flyPage3'), delay: 0.4 },
  ];

  pages.forEach(({ el, delay }) => {
    if (!el) return;

    // Emerge do centro do livro e voa pro lugar
    tl.fromTo(el,
      {
        opacity: 0,
        scale: 0.3,
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        left: '50%',
        top: '50%',
      },
      {
        opacity: 1,
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        left: el.style.cssText.includes('right') ? 'auto' : undefined,
        duration: 0.7,
        ease: 'back.out(1.6)',
      },
      `<+${delay}`
    );

    // Flutua suavemente após posicionado
    gsap.to(el, {
      y: -8,
      duration: 2.5 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.5 + delay,
    });
  });

  // ── 4. PARALLAX MOUSE ─────────────────────────────────────
  const wrapper = fallback;
  if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      gsap.to(book, {
        rotateY: -15 + dx * 10,
        rotateX: 4 + dy * -6,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    wrapper.addEventListener('mouseleave', () => {
      gsap.to(book, {
        rotateY: -15,
        rotateX: 4,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });
    });
  }

  // ── 5. CLICK — fecha e abre de novo ───────────────────────
  let isOpen = false;
  book.addEventListener('click', () => {
    if (isOpen) {
      gsap.to(bookFront, {
        rotationY: 0,
        duration: 0.9,
        ease: 'power3.inOut',
      });
      pages.forEach(({ el }) => {
        if (el) gsap.to(el, { opacity: 0, scale: 0.3, duration: 0.4 });
      });
    } else {
      gsap.to(bookFront, {
        rotationY: -155,
        duration: 0.9,
        ease: 'power3.inOut',
      });
      pages.forEach(({ el }, i) => {
        if (el) gsap.to(el, { opacity: 1, scale: 1, duration: 0.5, delay: i * 0.1 });
      });
    }
    isOpen = !isOpen;
  });

})();
