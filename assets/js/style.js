/* ==========================================================================
   Portfolio Pauline Thelliez — interactions
   Chaque module vérifie la présence de ses éléments : le fichier est commun
   à toutes les pages.
   ========================================================================== */

// Juste pour le fun
console.log(
  "%c Hey toi le dev curieux ! 👋 ",
  "background:#20373b;color:#fafaf7;font-size:16px;font-weight:bold;padding:8px;border-radius:4px;",
);
console.log(
  "%cSi tu inspectes mon code, c'est qu'on a probablement des choses à se dire. On prend contact ? ",
  "background:#ffc64f;color:#20373b;font-size:16px;font-weight:bold;padding:8px;border-radius:4px;",
);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Menu mobile ---------- */
(() => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;

  const closeBtn = menu.querySelector(".menu__close");
  const focusables = () =>
    menu.querySelectorAll('a[href], button:not([disabled])');

  function setMenu(open, { restoreFocus = true } = {}) {
    menu.hidden = !open;
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      closeBtn.focus();
    } else if (restoreFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => setMenu(true));
  closeBtn.addEventListener("click", () => setMenu(false));

  // Un lien (y compris une ancre de la page courante) referme le menu
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => setMenu(false, { restoreFocus: false })),
  );

  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenu(false);
      return;
    }
    // Le focus reste piégé dans le menu tant qu'il est ouvert
    if (e.key === "Tab") {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Repasse en desktop ou retour arrière depuis le cache : menu fermé
  window
    .matchMedia("(min-width: 901px)")
    .addEventListener("change", (e) => e.matches && setMenu(false, { restoreFocus: false }));
  window.addEventListener("pageshow", () => setMenu(false, { restoreFocus: false }));
})();

/* ---------- Apparitions au défilement ---------- */
(() => {
  const items = document.querySelectorAll("[data-reveal], [data-reveal-mark]");
  if (!items.length) return;

  // Décalage progressif pour les éléments d'un même groupe
  document.querySelectorAll("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--delay", `${Math.min(i, 6) * 0.1}s`);
    });
  });

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );

  items.forEach((el) => observer.observe(el));
})();

/* ---------- Frise du parcours : le trait se remplit au défilement ---------- */
(() => {
  const timeline = document.querySelector(".timeline");
  const fill = timeline && timeline.querySelector(".timeline__fill");
  if (!fill || reduceMotion.matches) return;

  let ticking = false;
  function update() {
    const rect = timeline.getBoundingClientRect();
    const view = window.innerHeight * 0.7;
    const progress = Math.min(1, Math.max(0, (view - rect.top) / rect.height));
    fill.style.setProperty("--progress", progress.toFixed(3));
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
})();

/* ---------- Index des projets (accueil) ---------- */
(() => {
  const rows = document.querySelectorAll(".project-row");
  const cards = document.querySelectorAll(".project-card");
  if (!rows.length || !cards.length) return;

  function activate(index) {
    rows.forEach((row, i) => row.classList.toggle("is-active", i === index));
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-hidden", String(!active));
      card.querySelectorAll("a").forEach((a) => (a.tabIndex = active ? 0 : -1));
    });
  }

  rows.forEach((row, i) => {
    const link = row.querySelector(".project-row__link");
    row.addEventListener("mouseenter", () => activate(i));
    link.addEventListener("focus", () => activate(i));
  });

  activate(0);
})();

/* ---------- Pause des animations en boucle ---------- */
(() => {
  const buttons = document.querySelectorAll(".motion-toggle");
  if (!buttons.length) return;

  let paused = false;
  try {
    paused = localStorage.getItem("motion-paused") === "1";
  } catch (e) {
    /* stockage indisponible : on garde la valeur par défaut */
  }

  function apply() {
    document.documentElement.classList.toggle("motion-paused", paused);
    buttons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(paused));
      btn.querySelector(".motion-toggle__label").textContent = paused
        ? "Relancer les animations"
        : "Mettre en pause les animations";
    });
  }

  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      paused = !paused;
      try {
        localStorage.setItem("motion-paused", paused ? "1" : "0");
      } catch (e) {
        /* rien */
      }
      apply();
    }),
  );
  apply();
})();

/* ---------- Bouton retour en haut ---------- */
(() => {
  const btn = document.querySelector(".to-top");
  if (!btn) return;

  const update = () => {
    btn.hidden = window.scrollY < 600;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
    const target = document.getElementById("main");
    if (target) target.focus({ preventScroll: true });
  });
})();

/* ---------- Onglets (parcours utilisateur) ---------- */
(() => {
  const tabs = Array.from(document.querySelectorAll(".flow-tab"));
  if (!tabs.length) return;

  const activate = (tab, moveFocus) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.classList.toggle("active", selected);
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(`panel-${t.dataset.tab}`);
      if (panel) {
        panel.classList.toggle("active", selected);
        panel.hidden = !selected;
      }
    });
    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activate(tab, false));
    tab.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        activate(next, true);
      }
    });
  });

  activate(tabs.find((t) => t.classList.contains("active")) || tabs[0], false);
})();

/* ---------- Capture longue repliable (« Voir plus ») ---------- */
document.querySelectorAll(".case-figure-wrap").forEach((wrap) => {
  const frame = wrap.querySelector(".case-figure-frame");
  const img = frame && frame.querySelector("img");
  const btn = wrap.querySelector(".case-figure-toggle");
  const figure = wrap.closest("figure");
  if (!frame || !btn) return;

  let expanded = false;

  const checkShort = () => {
    if (!expanded) {
      wrap.classList.toggle("is-short", frame.scrollHeight <= frame.clientHeight + 1);
    }
  };

  const setState = (open) => {
    expanded = open;
    wrap.classList.toggle("is-expanded", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.querySelector("span").textContent = open ? "Voir moins" : "Voir plus";
    frame.style.maxHeight = open ? `${frame.scrollHeight}px` : "";
    if (!open && figure && figure.getBoundingClientRect().top < 0) {
      figure.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
    }
  };

  btn.addEventListener("click", () => setState(!expanded));

  if (img && !img.complete) {
    img.addEventListener("load", checkShort);
    img.addEventListener("error", checkShort);
  } else {
    checkShort();
  }
  window.addEventListener("resize", checkShort);
});

/* ---------- Vidéos : pas de lecture automatique si l'utilisateur réduit les animations ---------- */
if (reduceMotion.matches) {
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    video.removeAttribute("autoplay");
    video.pause();
  });
}
