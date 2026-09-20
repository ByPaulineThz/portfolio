//Juste pour le fun
console.log(
  "%c Hey toi le dev curieux ! 👋 ",
  "background: #5a6d65; color:#fff ; font-size: 16px; font-weight: bold; padding: 8px; border-radius: 4px;",
);
console.log(
  "%cSi tu inspectes mon code, c'est qu'on a probablement des choses à se dire. On prend contact ? ",
  "background: #edb441; color:#000 ; font-size: 16px; font-weight: bold; padding: 8px; border-radius: 4px;",
);

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY - 15}px`;
  cursor.style.left = `${e.clientX - 15}px`;
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");
  setTimeout(() => cursor.classList.remove("expand"), 500);
});

var modal = document.getElementById("certifModal");
//TOGGLE MENU MOBILE
const toggleMobileButton = document.querySelector(".toggle-menu");
const navBar = document.querySelector("#navbarMobile");

function setMobileMenu(open) {
  navBar.classList.toggle("toggle", open);
  document.body.classList.toggle("menu-open", open);
  toggleMobileButton.setAttribute("aria-expanded", String(open));
  toggleMobileButton.setAttribute(
    "aria-label",
    open ? "Fermer le menu" : "Ouvrir le menu",
  );
}

toggleMobileButton.addEventListener("click", () => {
  setMobileMenu(!navBar.classList.contains("toggle"));
});

// Ferme le menu dès qu'on clique sur un lien (y compris les ancres de la page courante,
// qui ne rechargent pas la page et laissaient donc le menu ouvert)
navBar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

// Ferme avec la touche Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMobileMenu(false);
});

// Ferme si on repasse en affichage desktop (rotation, redimensionnement)
window.matchMedia("(min-width: 992px)").addEventListener("change", (e) => {
  if (e.matches) setMobileMenu(false);
});

// Retour arrière : le navigateur peut restaurer la page depuis son cache avec le menu encore ouvert
window.addEventListener("pageshow", () => setMobileMenu(false));

function toggleTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("back-to-up").classList.remove("none");
  } else {
    document.getElementById("back-to-up").classList.add("none");
  }
}
// BACK TO UP
function scrollToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}
// Masque le bouton (et le retire de la navigation clavier) dès le chargement, pas seulement au premier scroll
if (document.getElementById("back-to-up")) toggleTopButton();

//NAVBAR
let prevScrollpos = window.pageYOffset;
var logo = document.querySelector(".logo");
var navbar = document.getElementById("navbarDesktop");
window.onscroll = function () {
  let currentScrollpos = window.pageYOffset;
  const links = document.getElementsByClassName("nav-link-lg");
  const toggleLine = document.getElementsByClassName("line");
  const logotype = document.getElementById("p");

  if (prevScrollpos > currentScrollpos) {
    navbar.style.top = "0";
    logo.style.top = "0.5rem";
  } else {
    navbar.style.top = "-100px";
    logo.style.top = "-100px";
  }

  if (currentScrollpos <= 738) {
    navbar.style.background = "transparent";
    logotype.setAttribute("fill", "#fff");

    for (let i = 0; i < toggleLine.length; i++) {
      toggleLine[i].style.background = "#fff";
    }

    for (let i = 0; i < links.length; i++) {
      links[i].style.color = "#fff";
    }
  } else {
    navbar.style.background = "#fff";
    logotype.setAttribute("fill", "#000");

    for (let i = 0; i < toggleLine.length; i++) {
      toggleLine[i].style.background = "#000";
    }

    for (let i = 0; i < links.length; i++) {
      links[i].style.color = "#000";
    }
  }

  prevScrollpos = currentScrollpos;
  toggleTopButton();
};

// ONGLETS (motif ARIA "tabs" : clic, flèches gauche/droite, Début/Fin)
// Chaque onglet a data-tab="xxx" et pilote le panneau #panel-xxx
function initTabs(tabs) {
  if (tabs.length === 0) return;

  const activate = (tab, moveFocus) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.classList.toggle("active", selected);
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      document
        .getElementById(`panel-${t.dataset.tab}`)
        .classList.toggle("active", selected);
    });
    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activate(tab, false));
    tab.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft")
        next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        activate(next, true);
      }
    });
  });
}

initTabs(Array.from(document.querySelectorAll(".skills-tab")));

// --- MODAL CERTIFICATIONS ---
if (window.location.href.match(/about.html/)) {
  const modal = document.getElementById("certifModal");
  const modalImg = document.getElementById("certification");
  const captionText = document.getElementById("caption");
  const spanClose = document.getElementsByClassName("close")[0];
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  const certifImages = Array.from(document.querySelectorAll(".certification"));
  let currentIndex = 0;
  let lastFocused = null; // élément à refocaliser à la fermeture de la modale

  function showImage(index) {
    if (index < 0) {
      currentIndex = certifImages.length - 1; 
    } else if (index >= certifImages.length) {
      currentIndex = 0; 
    } else {
      currentIndex = index;
    }

    const currentImg = certifImages[currentIndex];
    modalImg.src = currentImg.src;
    modalImg.alt = currentImg.alt;
    captionText.innerHTML = currentImg.alt;
  }

  function openModal(index) {
    lastFocused = document.activeElement;
    modal.style.display = "block";
    if (typeof toggleMobileButton !== "undefined")
      toggleMobileButton.style.display = "none";
    if (typeof logo !== "undefined") logo.style.display = "none";
    if (typeof navbar !== "undefined") navbar.style.display = "none";

    showImage(index);
    spanClose.focus();
  }

  function closeModal() {
    modal.style.display = "none";
    if (typeof toggleMobileButton !== "undefined")
      toggleMobileButton.style.display = "";
    if (typeof logo !== "undefined") logo.style.display = "block";
    if (typeof navbar !== "undefined") navbar.style.display = "block";
    if (lastFocused) lastFocused.focus();
  }

  certifImages.forEach((img, index) => {
    img.onclick = function () {
      openModal(index);
    };
  });

  prevBtn.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  };

  nextBtn.onclick = (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  };

  spanClose.onclick = closeModal;

  modal.onclick = function (e) {
    if (e.target === modal) {
      closeModal();
    }
  };

  // Clavier : Entrée / Espace sur les images et les boutons de la modale
  const activateOnKey = (el, action) =>
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    });
  certifImages.forEach((img, index) =>
    activateOnKey(img, () => openModal(index)),
  );
  activateOnKey(spanClose, closeModal);
  activateOnKey(prevBtn, () => showImage(currentIndex - 1));
  activateOnKey(nextBtn, () => showImage(currentIndex + 1));

  // Modale ouverte : Échap ferme, flèches naviguent, Tab reste dans la modale
  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;
    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    else if (e.key === "ArrowRight") showImage(currentIndex + 1);
    else if (e.key === "Tab") {
      const first = spanClose;
      const last = nextBtn;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

let startX = 0;
let endX = 0;
let isDragging = false;

modal.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

modal.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}, { passive: true });



modalImg.addEventListener('dragstart', (e) => e.preventDefault());

modal.addEventListener('mousedown', (e) => {
  if (e.target.closest('.prev') || e.target.closest('.next') || e.target.closest('.close')) return;
  
  isDragging = true;
  startX = e.clientX;
});


document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  endX = e.clientX;
});

document.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  handleSwipe();
});


function handleSwipe() {
  const threshold = 50;
  const deltaX = startX - endX;

  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0) {
      showImage(currentIndex + 1); 
    } else {
      showImage(currentIndex - 1); 
    }
  }

  startX = 0;
  endX = 0;
}};

initTabs(Array.from(document.querySelectorAll(".flow-tab")));

// Vidéos en lecture automatique : arrêtées si l'utilisateur demande de réduire les animations
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video[autoplay]").forEach((video) => {
    video.removeAttribute("autoplay");
    video.pause();
  });
}
