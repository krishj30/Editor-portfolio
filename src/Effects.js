/* =========================================================
   effects.js — motion layer for the portfolio
   Add ONE line to src/main.jsx (after your CSS import):

       import "./effects.js";

   It never edits your React text or classes. It only adds
   data-* attributes, CSS variables and a few overlay elements,
   so it is safe with React re-renders and page changes.
========================================================= */

(() => {
  if (typeof window === "undefined" || window.__premiumFx) return;
  window.__premiumFx = true;

  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isMobile = window.matchMedia("(max-width: 900px)").matches;

  /* ---------- What gets which effect ---------- */
  const SEL = {
    items: [
      ".project-card", ".service-card", ".tool", ".step", ".featured-project",
      ".real-video-card", ".graphic-work-card", ".category-tile", ".stats > div",
      ".contact-card", ".reel-placeholder", ".detail-card", ".paired-work",
      ".artwork-card", ".category-links a",
    ].join(","),
    headings: [
      ".section-head h2", ".about h2", ".process h2", ".tools h2", ".contact h2",
      ".featured-header h2", ".inner-head h1", ".video-page-hero h1",
      ".graphic-category-hero h1", ".showcase-head h2",
    ].join(","),
    fades: [
      ".section-head > p", ".about-copy > p", ".about-copy > .eyebrow",
      ".tools-intro > p", ".contact-description", ".contact-status",
      ".contact-intro > .eyebrow", ".featured-header .eyebrow",
      ".featured-header-right", ".video-page-hero > p", ".inner-head > p",
      ".graphic-category-hero > p", ".video-page-meta", ".graphic-category-meta",
      ".featured-bottom", ".contact-form", ".about-art",
    ].join(","),
    tilt: [
      ".service-card", ".tool", ".project-card", ".featured-project",
      ".category-tile", ".contact-card", ".real-video-frame", ".graphic-work-image",
    ].join(","),
    magnetic: ".create, .pill, .contact-submit, .outline, .featured-view-all",
  };

  const seen = new WeakSet();

  /* ---------- Scroll reveal ---------- */
  const io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target;
              io.unobserve(el);
              el.setAttribute("data-in", "1");
              const wait = 1500 + (parseInt(el.style.getPropertyValue("--i")) || 0) * 90;
              setTimeout(() => el.setAttribute("data-done", "1"), wait);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        )
      : null;

  function markReveal(el, kind, index) {
    if (seen.has(el) || el.closest(".hero")) return;
    seen.add(el);
    el.setAttribute("data-reveal", kind);
    el.style.setProperty("--i", String(Math.min(index, 8)));
    if (reduce || !io) {
      el.setAttribute("data-in", "1");
      el.setAttribute("data-done", "1");
    } else {
      io.observe(el);
    }
  }

  /* ---------- Count-up numbers ---------- */
  const counted = new WeakSet();
  const countIO =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              countIO.unobserve(entry.target);
              countUp(entry.target);
            });
          },
          { threshold: 0.6 }
        )
      : null;

  function countUp(el) {
    if (counted.has(el) || reduce) return;
    counted.add(el);
    const node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    const match = node.nodeValue.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = (match[1].split(".")[1] || "").length;
    const start = performance.now();
    const dur = 1500;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      node.nodeValue = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Gold marquee under the hero ---------- */
  const MARQUEE_WORDS = [
    "Video Editing", "Motion Graphics", "Graphic Design",
    "Social Reels", "Cinematic Edits", "Brand Visuals",
  ];

  function buildMarquee() {
    const wrap = document.createElement("div");
    wrap.className = "fx-marquee";
    wrap.setAttribute("aria-hidden", "true");
    const track = document.createElement("div");
    track.className = "fx-marquee-track";
    for (let round = 0; round < 2; round++) {
      MARQUEE_WORDS.forEach((word) => {
        const w = document.createElement("span");
        w.textContent = word;
        const s = document.createElement("span");
        s.className = "sep";
        s.textContent = "✦";
        track.append(w, s);
      });
    }
    wrap.append(track);
    return wrap;
  }

  function syncMarquee() {
    const hero = document.querySelector(".hero");
    const existing = document.querySelectorAll(".fx-marquee");
    if (!hero) {
      existing.forEach((m) => m.remove());
      return;
    }
    if (!(hero.nextElementSibling && hero.nextElementSibling.classList.contains("fx-marquee"))) {
      existing.forEach((m) => m.remove());
      hero.after(buildMarquee());
    }
  }

  /* ---------- Scan the page (runs on load + every page change) ---------- */
  function scan() {
    document.querySelectorAll(SEL.headings).forEach((el) => markReveal(el, "heading", 0));
    document.querySelectorAll(SEL.fades).forEach((el) => markReveal(el, "fade", 0));
    document.querySelectorAll(SEL.items).forEach((el) => {
      const parent = el.parentElement;
      const siblings = parent ? Array.from(parent.children).filter((c) => c.matches(SEL.items)) : [el];
      markReveal(el, "item", Math.max(siblings.indexOf(el), 0));
    });
    document.querySelectorAll(".process-line").forEach((el) => markReveal(el, "line", 0));

    if (finePointer && !reduce) {
      document.querySelectorAll(SEL.tilt).forEach((el) => el.setAttribute("data-tilt", ""));
      document.querySelectorAll(SEL.magnetic).forEach((el) => el.setAttribute("data-magnetic", ""));
      document.querySelectorAll(".about-art").forEach((el) => el.setAttribute("data-scene", ""));
    }

    if (countIO) {
      document.querySelectorAll(".stats b").forEach((el) => {
        if (!counted.has(el)) countIO.observe(el);
      });
    }

    syncMarquee();
  }

  let scanQueued = false;
  function queueScan() {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(() => {
      scanQueued = false;
      scan();
    });
  }

  /* ---------- Scroll: progress bar, parallax value, smart nav ---------- */
  let lastY = window.scrollY;
  let scrollQueued = false;
  let velTimer = null;

  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      scrollQueued = false;
      const y = window.scrollY;
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--sy", String(Math.min(y, 1200)));
      const vel = Math.max(-5, Math.min(5, (y - lastY) * 0.12));
      root.style.setProperty("--v", vel.toFixed(2));
      clearTimeout(velTimer);
      velTimer = setTimeout(() => root.style.setProperty("--v", "0"), 140);
      root.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : "0");

      const nav = document.querySelector(".nav");
      if (nav) {
        if (y > 40) nav.setAttribute("data-scrolled", "1");
        else nav.removeAttribute("data-scrolled");

        const menuOpen = nav.querySelector("nav.open");
        if (y > lastY + 4 && y > 200 && !menuOpen) nav.setAttribute("data-hidden", "1");
        else if (y < lastY - 4 || y < 200) nav.removeAttribute("data-hidden");
      }
      lastY = y;
    });
  }

  /* ---------- Pointer: hero parallax, cursor light, tilt, magnetic, 3D scene ---------- */
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  let glowX = -999, glowY = -999, glowTX = -999, glowTY = -999;
  let looping = false;
  let cursorEl = null;
  let ringEl = null;
  let ringX = -99, ringY = -99;

  function loop() {
    curX += (targetX - curX) * 0.07;
    curY += (targetY - curY) * 0.07;
    glowX += (glowTX - glowX) * 0.12;
    glowY += (glowTY - glowY) * 0.12;

    root.style.setProperty("--px", curX.toFixed(4));
    root.style.setProperty("--py", curY.toFixed(4));
    if (cursorEl) {
      cursorEl.style.setProperty("--cx", glowX.toFixed(1) + "px");
      cursorEl.style.setProperty("--cy", glowY.toFixed(1) + "px");
    }
    ringX += (glowTX - ringX) * 0.22;
    ringY += (glowTY - ringY) * 0.22;
    if (ringEl) {
      ringEl.style.setProperty("--rx2", ringX.toFixed(1) + "px");
      ringEl.style.setProperty("--ry2", ringY.toFixed(1) + "px");
    }

    const settled =
      Math.abs(targetX - curX) < 0.001 &&
      Math.abs(targetY - curY) < 0.001 &&
      Math.abs(glowTX - glowX) < 0.5 &&
      Math.abs(glowTY - glowY) < 0.5 &&
      Math.abs(glowTX - ringX) < 0.5 &&
      Math.abs(glowTY - ringY) < 0.5;

    if (settled) {
      looping = false;
    } else {
      requestAnimationFrame(loop);
    }
  }

  function kick() {
    if (looping) return;
    looping = true;
    requestAnimationFrame(loop);
  }

  let activeTilt = null;
  let activeMagnet = null;
  let activeScene = null;

  function resetTilt(el) {
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
    el.removeAttribute("data-tilting");
  }

  function onPointerMove(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;

    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    glowTX = e.clientX;
    glowTY = e.clientY;
    if (cursorEl) cursorEl.setAttribute("data-on", "1");
    if (ringEl) ringEl.setAttribute("data-on", "1");
    kick();

    const target = e.target instanceof Element ? e.target : null;
    if (ringEl) {
      if (target && target.closest("a, button, [data-tilt], [data-magnetic], input, textarea")) {
        ringEl.setAttribute("data-hover", "1");
      } else {
        ringEl.removeAttribute("data-hover");
      }
    }

    // 3D tilt cards
    const tilt = target ? target.closest("[data-tilt]") : null;
    if (activeTilt && activeTilt !== tilt) resetTilt(activeTilt);
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      tilt.style.setProperty("--ry", ((x - 0.5) * 10).toFixed(2) + "deg");
      tilt.style.setProperty("--rx", ((0.5 - y) * 8).toFixed(2) + "deg");
      tilt.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
      tilt.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      tilt.setAttribute("data-tilting", "1");
    }
    activeTilt = tilt;

    // Magnetic buttons
    const mag = target ? target.closest("[data-magnetic]") : null;
    if (activeMagnet && activeMagnet !== mag) activeMagnet.style.translate = "";
    if (mag) {
      const r = mag.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      mag.style.translate = (dx * 0.22).toFixed(1) + "px " + (dy * 0.32).toFixed(1) + "px";
    }
    activeMagnet = mag;

    // About-section 3D scene
    const scene = target ? target.closest("[data-scene]") : null;
    if (activeScene && activeScene !== scene) {
      activeScene.style.removeProperty("--sx2");
      activeScene.style.removeProperty("--sy2");
    }
    if (scene) {
      const r = scene.getBoundingClientRect();
      scene.style.setProperty("--sx2", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
      scene.style.setProperty("--sy2", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
    }
    activeScene = scene;
  }

  function onPointerLeaveWindow() {
    if (activeTilt) resetTilt(activeTilt);
    if (activeMagnet) activeMagnet.style.translate = "";
    if (activeScene) {
      activeScene.style.removeProperty("--sx2");
      activeScene.style.removeProperty("--sy2");
    }
    activeTilt = activeMagnet = activeScene = null;
    targetX = 0;
    targetY = 0;
    if (cursorEl) cursorEl.removeAttribute("data-on");
    if (ringEl) ringEl.removeAttribute("data-on");
    kick();
  }

  /* ---------- Overlay elements ---------- */
  function mountOverlays() {
    const bar = document.createElement("div");
    bar.className = "fx-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.append(bar);

    if (!reduce) {
      const dust = document.createElement("div");
      dust.className = "fx-dust";
      dust.setAttribute("aria-hidden", "true");
      const count = isMobile ? 12 : 26;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("i");
        p.style.setProperty("--l", (Math.random() * 100).toFixed(1) + "%");
        p.style.setProperty("--s", (2 + Math.random() * 4).toFixed(1) + "px");
        p.style.setProperty("--d", (14 + Math.random() * 18).toFixed(1) + "s");
        p.style.setProperty("--delay", (-Math.random() * 30).toFixed(1) + "s");
        p.style.setProperty("--x", ((Math.random() - 0.5) * 120).toFixed(0) + "px");
        dust.append(p);
      }
      document.body.append(dust);
    }

    if (finePointer && !reduce) {
      cursorEl = document.createElement("div");
      cursorEl.className = "fx-cursor";
      cursorEl.setAttribute("aria-hidden", "true");
      document.body.append(cursorEl);

      ringEl = document.createElement("div");
      ringEl.className = "fx-ring";
      ringEl.setAttribute("aria-hidden", "true");
      document.body.append(ringEl);
    }
  }

  /* ---------- Start ---------- */
  function init() {
    mountOverlays();
    scan();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    if (finePointer && !reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("mouseleave", onPointerLeaveWindow);
    }

    // Re-scan whenever React swaps pages or renders new content
    new MutationObserver(queueScan).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();