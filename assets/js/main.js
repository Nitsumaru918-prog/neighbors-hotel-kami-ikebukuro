'use strict';

/* ============================================================
   NEIGHBORS HOTEL KAMI-IKEBUKURO
   main.js
   ============================================================ */

/* ── 1. スライドショー（FV） ────────────────────────────── */
(function () {
  var slides = document.querySelectorAll('.slide');
  var dots   = document.querySelectorAll('.slide-dot');
  var ctr    = document.getElementById('slideCounter');
  var TOTAL  = slides.length;
  var cur    = 0;
  var timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (n + TOTAL) % TOTAL;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
    ctr.innerHTML = '<span>' + String(cur + 1).padStart(2, '0') + '</span> / 0' + TOTAL;
  }

  dots.forEach(function (d, i) {
    d.addEventListener('click', function () {
      goTo(i);
      clearInterval(timer);
      timer = setInterval(function () { goTo(cur + 1); }, 4500);
    });
  });

  timer = setInterval(function () { goTo(cur + 1); }, 4500);
}());

/* ── 2. サイドバー表示 ──────────────────────────────────── */
(function () {
  var side = document.getElementById('sideHeader');
  new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio >= 0.3) {
      side.classList.add('visible');
    }
  }, { threshold: [0, 0.1, 0.2, 0.3] }).observe(document.getElementById('about'));
}());

/* ── 3. サイドナビ アクティブ切り替え ──────────────────── */
(function () {
  var links = document.querySelectorAll('.side-nav a');
  ['about', 'rooms', 'area', 'amenities', 'access'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        links.forEach(function (l) { l.classList.remove('active'); });
        var link = document.querySelector('.side-nav a[href="#' + id + '"]');
        if (link) link.classList.add('active');
      }
    }, { threshold: 0.4 }).observe(el);
  });
}());

/* ── 4. 汎用フェードアップ ──────────────────────────────── */
(function () {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (x) {
      if (x.isIntersecting) {
        x.target.classList.add('visible');
        obs.unobserve(x.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    obs.observe(el);
  });
}());

/* ── 5. AREAスポット フェードイン ───────────────────────── */
(function () {
  var spots = document.querySelectorAll('.area__spot');
  if (!spots.length) return;

  var spotObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        spotObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  var areaSection = document.getElementById('area');
  if (!areaSection) return;

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      spots.forEach(function (spot) { spotObs.observe(spot); });
    }
  }, { threshold: 0.2 }).observe(areaSection);
}());

/* ── 6. 言語切り替えリンク アクティブ表示 ──────────────── */
(function () {
  // 現在のパスから言語を判定してアクティブクラスを付与
  var path = window.location.pathname;
  var langLinks = document.querySelectorAll('.side-lang__list a');
  langLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    // パスがhrefを含む場合アクティブ
    if (path.indexOf(href.replace(/^\//, '').replace(/\/$/, '')) !== -1) {
      link.classList.add('active');
    }
  });
}());

/* ── 7. LANGUAGEアコーディオン ─────────────────────────── */
(function () {
  var langBlock = document.querySelector('.side-lang');
  var langLabel = document.querySelector('.side-lang__label');
  if (!langBlock || !langLabel) return;

  langLabel.addEventListener('click', function () {
    langBlock.classList.toggle('open');
  });

  // 言語リンクを選択したらアコーディオンを閉じる
  var langLinks = document.querySelectorAll('.side-lang__list a');
  langLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      langBlock.classList.remove('open');
    });
  });
}());
