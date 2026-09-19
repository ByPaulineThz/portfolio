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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

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

const skillsTabs = document.querySelectorAll(".skills-tab");
if (skillsTabs.length > 0) {
  skillsTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".skills-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".skills-panel")
        .forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      document
        .getElementById(`panel-${tab.dataset.tab}`)
        .classList.add("active");
    });
  });
}

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
    captionText.innerHTML = currentImg.alt;
  }

  function openModal(index) {
    modal.style.display = "block";
    if (typeof toggleMobileButton !== "undefined")
      toggleMobileButton.style.display = "none";
    if (typeof logo !== "undefined") logo.style.display = "none";
    if (typeof navbar !== "undefined") navbar.style.display = "none";

    showImage(index);
  }

  function closeModal() {
    modal.style.display = "none";
    if (typeof toggleMobileButton !== "undefined")
      toggleMobileButton.style.display = "";
    if (typeof logo !== "undefined") logo.style.display = "block";
    if (typeof navbar !== "undefined") navbar.style.display = "block";
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

document.querySelectorAll(".flow-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".flow-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".flow-panel")
      .forEach((p) => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(`panel-${tab.dataset.tab}`).classList.add("active");
  });
});
