/* ============================================================
  Light2minds — Main JavaScript
  ============================================================ */

// ── Nav: scroll shadow + hamburger ────────────────────────────
(function initNav() {
  const nav  = document.querySelector('.nav');
  const ham  = document.querySelector('.nav__hamburger');
  const mob  = document.querySelector('.nav__mobile');
  if (!nav) return;

  // Scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Hamburger toggle
  if (ham && mob) {
    ham.addEventListener('click', () => {
      const open = ham.classList.toggle('open');
      mob.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Highlight active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href !== '#' && path.includes(href.replace('.html', ''))) {
      a.classList.add('active');
    }
    if ((path === '' || path === 'index.html') && (href === 'index.html' || href === './')) {
      a.classList.add('active');
    }
  });
})();

// ── Accordion ─────────────────────────────────────────────────
(function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.accordion__item');
      const body   = item.querySelector('.accordion__body');
      const isOpen = trigger.classList.contains('open');

      // Close all siblings
      const parent = trigger.closest('.accordion');
      if (parent) {
        parent.querySelectorAll('.accordion__trigger.open').forEach(t => {
          if (t !== trigger) {
            t.classList.remove('open');
            t.closest('.accordion__item').querySelector('.accordion__body').classList.remove('open');
          }
        });
      }

      trigger.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
    });
  });

  // Open first item by default if present
  document.querySelectorAll('.accordion').forEach(acc => {
    const first = acc.querySelector('.accordion__trigger');
    if (first && acc.dataset.openFirst !== 'false') {
      first.classList.add('open');
      first.closest('.accordion__item').querySelector('.accordion__body').classList.add('open');
    }
  });
})();

// ── Smooth scroll for anchor links ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Scroll-reveal (IntersectionObserver) ─────────────────────
(function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, .resource-card, .wing-card, .step-list li').forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(22px)';
    el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
    observer.observe(el);
  });
})();

// ── Download button placeholder ───────────────────────────────
document.querySelectorAll('[data-download]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const name = btn.dataset.download || 'Resource';
    // In production, replace with real file URLs
    alert(`"${name}" will be available for download soon. Please check back or contact us for access.`);
  });
});

// ── Tab system ────────────────────────────────────────────────
(function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const triggers = tabGroup.querySelectorAll('[data-tab]');
    const panels   = tabGroup.querySelectorAll('[data-panel]');

    function activate(tab) {
      triggers.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      panels.forEach(p => p.classList.toggle('active', p.dataset.panel === tab));
    }

    triggers.forEach(t => {
      t.addEventListener('click', () => activate(t.dataset.tab));
    });

    if (triggers.length) activate(triggers[0].dataset.tab);
  });
})();
