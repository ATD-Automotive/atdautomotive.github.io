/* ATD Mobile Automotive — footer year, nav, tap-to-call, map embed, reviews. */

(function () {
  'use strict';

  var cfg = window.ATD_CONFIG || {};

  document.getElementById('year').textContent = new Date().getFullYear();

  initNav();
  initPhone(cfg.phone);
  initMap(cfg.placeId, cfg.mapsApiKey);
  initReviews(cfg.placeId, cfg.mapsApiKey, cfg.reviewsCacheKey);
})();

function initNav() {
  var btn = document.querySelector('.hamburger');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;

  function setOpen(open) {
    links.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setOpen(!links.classList.contains('open'));
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  document.addEventListener('click', function (e) {
    if (!links.classList.contains('open')) return;
    if (btn.contains(e.target) || links.contains(e.target)) return;
    setOpen(false);
  });
}

function initPhone(parts) {
  if (!Array.isArray(parts) || parts.length !== 3) return;

  var tel = parts.join('');
  var display = parts.join(' ');

  document.querySelectorAll('.js-reveal-phone').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (el.classList.contains('revealed')) return;
      e.preventDefault();
      el.classList.add('revealed');
      el.href = 'tel:' + tel;
      var text = el.querySelector('.js-phone-text');
      if (text) text.textContent = display;
    });
  });
}

function initMap(placeId, apiKey) {
  var iframe = document.querySelector('.js-map-embed');
  if (!iframe || !placeId || !apiKey) return;

  iframe.src = 'https://www.google.com/maps/embed/v1/place?key=' +
    encodeURIComponent(apiKey) +
    '&q=place_id:' + encodeURIComponent(placeId);
}

function initReviews(placeId, apiKey, cacheKey) {
  var section = document.getElementById('reviews');
  if (!section || !placeId || !apiKey) return;

  var CACHE_KEY = cacheKey || 'atd-reviews-v2';
  var CACHE_TTL_MS = 24 * 60 * 60 * 1000;
  var MAX_CARDS = 4;

  var cached = readCache();
  if (cached) {
    render(cached);
    return;
  }

  fetch('https://places.googleapis.com/v1/places/' + encodeURIComponent(placeId), {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews'
    }
  })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      writeCache(data);
      render(data);
    })
    .catch(function () {
      /* Section stays hidden on failure */
    });

  function render(data) {
    if (!data || !Array.isArray(data.reviews) || data.reviews.length === 0) return;

    var rating = (typeof data.rating === 'number') ? data.rating.toFixed(1) : '';
    var count = data.userRatingCount || data.reviews.length;
    var ratingEl = section.querySelector('.js-reviews-rating');
    var countEl = section.querySelector('.js-reviews-count');
    if (ratingEl) ratingEl.textContent = rating;
    if (countEl) countEl.textContent = count + (count === 1 ? ' review' : ' reviews');

    var grid = section.querySelector('.js-reviews-grid');
    grid.replaceChildren();
    var visible = data.reviews
      .filter(function (r) { return r && r.text && r.text.text; })
      .slice(0, MAX_CARDS);

    if (visible.length === 0) return;
    visible.forEach(function (review) { grid.appendChild(buildCard(review)); });

    section.removeAttribute('hidden');
  }

  function buildCard(review) {
    var card = document.createElement('article');
    card.className = 'review-card';

    var stars = document.createElement('div');
    stars.className = 'review-stars';
    var starCount = review.rating || 5;
    stars.setAttribute('aria-label', starCount + ' out of 5 stars');
    stars.textContent = renderStars(starCount);

    var text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = (review.text && review.text.text) || '';

    var meta = document.createElement('div');
    meta.className = 'review-meta';

    var author = document.createElement('span');
    author.className = 'review-author';
    author.textContent = (review.authorAttribution && review.authorAttribution.displayName) || 'Google reviewer';

    var date = document.createElement('span');
    date.className = 'review-date';
    date.textContent = review.relativePublishTimeDescription || '';

    meta.appendChild(author);
    meta.appendChild(date);

    card.appendChild(stars);
    card.appendChild(text);
    card.appendChild(meta);

    return card;
  }

  function renderStars(n) {
    var rounded = Math.max(0, Math.min(5, Math.round(n)));
    return '\u2605'.repeat(rounded) + '\u2606'.repeat(5 - rounded);
  }

  function readCache() {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var entry = JSON.parse(raw);
      if (!entry || !entry.timestamp || !entry.data) return null;
      if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
      return entry.data;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: data
      }));
    } catch (e) {
      /* storage full or disabled — non-fatal */
    }
  }
}
