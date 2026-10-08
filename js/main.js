(function () {
  'use strict';

  var header = document.getElementById('header');
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var toTop = document.getElementById('toTop');

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Header shadow, back-to-top, active nav link
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = nav.querySelectorAll('.nav__link');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    toTop.classList.toggle('is-visible', y > 600);

    var current = 'home';
    sections.forEach(function (s) {
      if (s.offsetTop - 120 <= y) current = s.id;
    });
    links.forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Count-up stats
  var counters = document.querySelectorAll('[data-count]');
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach(countUp);
  }

  // Contact form: validate, then open the visitor's mail client
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var CONTACT_EMAIL = 'contact@vikcom.vn';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (f) {
      var ok = f.value.trim() !== '' && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      f.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      note.textContent = 'Please fill in all required fields (*) with valid information.';
      note.className = 'form__note is-error';
      return;
    }

    var d = new FormData(form);
    var subject = 'Consultation request: ' + d.get('service') + ' – ' + d.get('name');
    var body = [
      'Full name: ' + d.get('name'),
      'Company: ' + (d.get('company') || '-'),
      'Email: ' + d.get('email'),
      'Phone: ' + (d.get('phone') || '-'),
      'Service of interest: ' + d.get('service'),
      '',
      d.get('message')
    ].join('\n');

    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    note.textContent = 'Thank you! Your email app will open to send your request to ' + CONTACT_EMAIL + '.';
    note.className = 'form__note is-success';
    form.reset();
  });
})();
