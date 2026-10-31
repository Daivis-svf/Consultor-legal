(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
    nav.classList.toggle('is-open', !expanded);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
  }));
  const number = (window.SJI_CONFIG?.whatsappNumber || '').replace(/\D/g, '');
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    const message = link.dataset.whatsappMessage || window.SJI_CONFIG.whatsappMessage || '';
    if (number) {
      link.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('is-visible'));
  const backToTop = document.querySelector('.back-to-top');
  let scrollTicking = false;
  const visibleProtectedActions = new Set();
  const protectedActions = [document.querySelector('.advice-cta'), document.querySelector('.contact-copy'), document.querySelector('.contact-card'), document.querySelector('.site-footer')].filter(Boolean);
  if ('IntersectionObserver' in window) {
    const actionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visibleProtectedActions.add(entry.target) : visibleProtectedActions.delete(entry.target));
      updateBackToTop();
    }, { threshold: 0.08 });
    protectedActions.forEach(action => actionObserver.observe(action));
  }
  const updateBackToTop = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      backToTop.hidden = window.scrollY < 420 || visibleProtectedActions.size > 0;
      scrollTicking = false;
    });
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });
})();
