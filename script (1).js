/* =========================================================
   ChillSpot Drinks — Scripts
   Four independent pieces, in the order they appear on the
   page. Each one only touches its own bit of the page, so
   you can edit or remove one without breaking the others.
   ========================================================= */

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

/* ---------- 2. Hero slideshow ---------- */
(function () {
  var slides = document.querySelectorAll('#slideshow .slide');
  var dotsWrap = document.getElementById('slideDots');
  if (!slides.length || !dotsWrap) return;

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;
  var timer;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + slides.length);
    dot.addEventListener('click', function () {
      goTo(i);
      restart();
    });
    dotsWrap.appendChild(dot);
  });
  var dots = dotsWrap.querySelectorAll('.dot');

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
  }

  function next() { goTo((current + 1) % slides.length); }

  function start() {
    if (prefersReduced) return; // respect users who've asked for less motion
    timer = setInterval(next, 3200);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  start();
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

/* ---------- 4. Wholesale order form -> WhatsApp ---------- */
(function () {
  var form = document.getElementById('wholesaleOrderForm');
  if (!form) return;

  // Replace this with your aunt's real WhatsApp number (country code, no + or spaces).
  var WHATSAPP_NUMBER = '2348012345678';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.wName.value.trim();
    var phone = form.wPhone.value.trim();
    var category = form.wCategory.value;
    var quantity = form.wQuantity.value.trim();
    var delivery = form.wDelivery.value;
    var details = form.wDetails.value.trim();

    var message =
      'Hi ChillSpot, I would like to place a wholesale order.\n' +
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '\n' +
      'Category: ' + (category || 'Not specified') + '\n' +
      'Quantity: ' + (quantity || 'Not specified') + '\n' +
      'Delivery or Pickup: ' + delivery + '\n' +
      'Details: ' + (details || 'None');

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
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
