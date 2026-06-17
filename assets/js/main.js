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

/* ── 2. サイドバー表示（ABOUTが見えたら出す） ────────────── */
(function () {
  var side = document.getElementById('sideHeader');
  new IntersectionObserver(function (entries) {
    if (entries[0].intersectionRatio >= 0.3) {
      side.classList.add('visible');
    }
  }, { threshold: [0, 0.1, 0.2, 0.3] }).observe(document.getElementById('about'));
}());

/* ── 3. サイドナビのアクティブ切り替え ──────────────────── */
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

/* ── 4. 汎用フェードアップ（.fade-up） ──────────────────── */
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

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  // AREAセクション全体が画面に入ったら順番にフェードイン
  var areaSection = document.getElementById('area');
  if (!areaSection) return;

  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      spots.forEach(function (spot) {
        obs.observe(spot);
      });
    }
  }, { threshold: 0.2 }).observe(areaSection);
}());
