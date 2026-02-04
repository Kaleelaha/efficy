(function () {
  'use strict';

  // ----- Year in footer -----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Scroll reveal (section titles, cards, timeline, etc.) -----
  var revealEls = document.querySelectorAll('.reveal');
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // ----- Stagger timeline items (fade in one by one) -----
  var timelineItems = document.querySelectorAll('.timeline-item.reveal');
  timelineItems.forEach(function (item, i) {
    item.style.transitionDelay = (i * 0.12) + 's';
  });

  // ----- Stagger skill cards and experience cards -----
  document.querySelectorAll('.skill-card').forEach(function (el, i) {
    el.style.animationDelay = (i * 0.06) + 's';
  });
  document.querySelectorAll('.experience-card.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  // ----- Smooth scroll for anchor links (enhance if needed) -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ----- Contact form: redirect to WhatsApp with message -----
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var telLink = document.querySelector('.contact-section a[href^="tel:"]');
      var phone = telLink ? telLink.getAttribute('href').replace(/\D/g, '') : '919876543210';
      var name = (form.querySelector('input[name="name"]') || {}).value || '';
      var email = (form.querySelector('input[name="email"]') || {}).value || '';
      var message = (form.querySelector('textarea[name="message"]') || {}).value || '';
      var fullText = ['Hi, I\'m ' + name + '.', message, 'My email: ' + email].filter(Boolean).join('\n\n');
      var whatsappUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(fullText);
      form.reset();
      window.open(whatsappUrl, '_blank');
    });
  }
})();
