let prevScrollpos = window.pageYOffset;

//TOGGLE MENU MOBILE
const toggleMobileButton = document.querySelector(".toggle-menu");
const navBar = document.querySelector("#navbarMobile");
toggleMobileButton.addEventListener("click", () => {
  navBar.classList.toggle("toggle");
});
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
window.onscroll = function () {
  let currentScrollpos = window.pageYOffset;
  const navbar = document.getElementById("navbarDesktop");
  const links = document.getElementsByClassName("nav-link-lg");
  const toggleLine = document.getElementsByClassName("line");
  const logotype = document.getElementById("p");
  const logo = document.querySelector(".logo");

  if (prevScrollpos > currentScrollpos) {
    navbar.style.top = "0";
    logo.style.top = "0";
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

//SHOW HIDE LIVRABLES
let btnShowHide = document.getElementsByClassName("btnShowHide");

for (let i = 0; i < btnShowHide.length; i++) {
  btnShowHide[i].addEventListener("click", function () {
    let livrable = this.nextElementSibling;

    if (livrable && livrable.classList.contains("livrable")) {
      livrable.classList.toggle("show");

      let actionWord = this.querySelector(".actionWord");
      if (actionWord) {
        actionWord.textContent = livrable.classList.contains("show") ? "Cacher livrable.s"  : "Afficher livrable.s";
      }
    }
  });
}



