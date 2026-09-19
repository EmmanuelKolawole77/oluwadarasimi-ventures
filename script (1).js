

/* ---------- 1. Mobile nav toggle ---------- */
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu once a link is tapped, so it doesn't stay open
  // after the page scrolls to a section.
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ---------- 3. Product category filters ---------- */
(function () {
  var buttons = document.querySelectorAll('#filterTabs .filter-btn');
  var cards = document.querySelectorAll('#productGrid .product-card');
  var emptyState = document.getElementById('emptyState');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;

      cards.forEach(function (card) {
        var matches = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount++;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });

  // The category cards further up the page link straight into a filter,
  // e.g. clicking "Water" sets the Water tab as active before scrolling down.
  document.querySelectorAll('[data-filter-target]').forEach(function (card) {
    card.addEventListener('click', function () {
      var target = card.getAttribute('data-filter-target');
      var matchingBtn = document.querySelector('#filterTabs [data-filter="' + target + '"]');
      if (matchingBtn) matchingBtn.click();
    });
  });
})();


/* ---------- 5. Contact form ---------- */
(function () {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (!form) return;

  // There's no backend here yet, so this just confirms the message was
  // filled in correctly. Connect it to your own backend or a form
  // service (like Formspree) when you're ready to actually receive these.
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    if (success) success.hidden = false;
  });
})();
