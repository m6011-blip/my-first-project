(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Subtle scroll reveals
  var targets = document.querySelectorAll('.menu, .card, .barber, .awards li, .photos figure');
  targets.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Booking request form (Netlify Forms)
  var form = document.getElementById('booking-form');
  var status = document.getElementById('form-status');
  var day = document.getElementById('f-day');
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  day.min = today.toISOString().slice(0, 10);

  var messages = { name: 'Please enter your name.', phone: 'Please enter a phone number we can reach you at.', service: 'Please choose a service.', day: 'Please pick a day.', time: 'Please pick a time between 10:00 AM and 6:30 PM.' };

  function validate() {
    var ok = true;
    ['name', 'phone', 'service', 'day', 'time'].forEach(function (n) {
      var f = form.elements[n], err = form.querySelector('.err[data-for="' + n + '"]');
      var v = (f.value || '').trim(), bad = !v;
      if (n === 'phone' && v && v.replace(/\D/g, '').length < 10) bad = true;
      if (n === 'time' && v && (v < '10:00' || v > '18:30')) bad = true;
      f.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) { err.textContent = messages[n]; f.setAttribute('aria-describedby', 'err-' + n); err.id = 'err-' + n; ok = false; } else { err.textContent = ''; f.removeAttribute('aria-describedby'); }
    });
    return ok;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    status.className = 'status';
    if (!validate()) {
      status.textContent = 'Please fix the highlighted fields.'; status.classList.add('bad');
      var first = form.querySelector('[aria-invalid="true"]'); if (first) first.focus();
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; status.textContent = 'Sending…';
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)).toString() })
      .then(function (r) {
        if (!r.ok) throw new Error('bad status');
        form.reset();
        status.textContent = 'Thanks! Your request was sent. The shop will confirm by phone. (Demo: no real appointment is booked.)';
        status.classList.add('ok');
      })
      .catch(function () {
        status.textContent = 'Sorry, we could not send that. Please call (718) 833-6200 or book on Booksy.';
        status.classList.add('bad');
      })
      .then(function () { btn.disabled = false; });
  });
})();
