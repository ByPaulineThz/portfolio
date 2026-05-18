
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
let prevScrollpos = window.pageYOffset;

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

//ABOUT MODAL
var modal = document.getElementById("myModal");

var master = document.getElementById("master");
var certifReact = document.getElementById("certifReact");
var certifFigma = document.getElementById("certifFigma");

var modalImg = document.getElementById("certification");
var captionText = document.getElementById("caption");

master.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
certifFigma.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
certifReact.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}
//CLOSE MODAL
var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
  modal.style.display = "none";
}


