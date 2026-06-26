(() => {
  // ─── Scroll Reveal ────────────────────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  // Section headings
  document.querySelectorAll('section h1, section h2, section h3').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Section intro paragraphs
  document.querySelectorAll('section > div > p, section > div > div > p').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Stagger direct children of grid containers
  document.querySelectorAll('.grid, .space-y-gutter').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
      if (!child.classList.contains('reveal')) {
        child.classList.add('reveal', `stagger-${Math.min(i, 6)}`);
        revealObserver.observe(child);
      }
    });
  });

  // Articles
  document.querySelectorAll('article').forEach((el, i) => {
    el.classList.add('reveal', `stagger-${Math.min(i, 6)}`);
    revealObserver.observe(el);
  });

  // Any remaining glass cards/panels
  document.querySelectorAll('.glass-card, .glass-panel').forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    }
  });

  // Catch-all: observe any element that already has reveal in its HTML but
  // wasn't picked up by the selectors above (e.g. prose-p/prose-h2 inside
  // article pages). Calling observe() twice on the same element is safe.
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ─── Count-up for stat numbers ────────────────────────────────────────────
  function animateCount(el, target, prefix, suffix) {
    const duration = 1400;
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = '1';
      const { num, prefix, suffix } = entry.target._countData;
      animateCount(entry.target, num, prefix, suffix);
    });
  }, { threshold: 0.5 });

  // Auto-detect stat numbers (leaf text matching $250, 30+, 100%)
  document.querySelectorAll('div').forEach(el => {
    if (el.children.length) return;
    const text = el.textContent.trim();
    const match = text.match(/^(\$?)(\d+)(\+|%|K\+?)?\s*$/);
    if (match) {
      el._countData = { num: parseFloat(match[2]), prefix: match[1] || '', suffix: match[3] || '' };
      el.classList.add('count-up');
      countObserver.observe(el);
    }
  });

  // ─── Ripple on button clicks ──────────────────────────────────────────────
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      Object.assign(ripple.style, {
        width:  size + 'px',
        height: size + 'px',
        left:   (e.clientX - rect.left - size / 2) + 'px',
        top:    (e.clientY - rect.top  - size / 2) + 'px',
      });
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // ─── Magnetic pull on CTA buttons ────────────────────────────────────────
  document.querySelectorAll('button.bg-primary, button.bg-teal-accent, button.bg-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.18;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.18;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ─── Parallax on hero images ──────────────────────────────────────────────
  const heroImgs = document.querySelectorAll('section:first-of-type img');
  if (heroImgs.length) {
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      heroImgs.forEach(img => { img.style.transform = `translateY(${s * 0.14}px)`; });
    }, { passive: true });
  }
})();
