

//TOGGLE MENU MOBILE
const toggleMobileButton = document.querySelector('.toggle-menu');
const navBar = document.querySelector('#navbarMobile');
toggleMobileButton.addEventListener('click', () => {
  navBar.classList.toggle('toggle');
});

// BACK TO UP

function scrollToTop(){
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function toggleTopButton() {
  if (document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20) {
    document.getElementById('back-to-up').classList.remove('none');
  } else {
    document.getElementById('back-to-up').classList.add('none');
  }
}
window.onscroll = function() {
  let currentScrollpos = window.pageYOffset;
  const navbar = document.getElementById("navbarDesktop");
  const links     = document.getElementsByClassName('nav-link-lg');
  const toggleLine = document.getElementsByClassName('line');

  if (prevScrollpos > currentScrollpos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-100px";
  }

  if (currentScrollpos <= 738) {
    navbar.style.background = "transparent";
    
    for (let i = 0; i < toggleLine.length; i++) {
      toggleLine[i].style.background = "#fff";
    }

    for (let i = 0; i < links.length; i++) {
      links[i].style.color = "#fff";
    }
  } 
  else {
    navbar.style.background = "#fff"; 
     for (let i = 0; i < toggleLine.length; i++) {
      toggleLine[i].style.background = "#000";
    }

    for (let i = 0; i < links.length; i++) {
      links[i].style.color = "#000";
    }

  }

  prevScrollpos = currentScrollpos; 
  toggleTopButton();
}


// var mySwiper = new Swiper('.swiper-container', {
//   effect: '',
//   loop: false,
//   speed: 1000,
//   slidesPerView: 1,
//   navigation: {
//      nextEl: '.swiper-button-next',
//      prevEl: '.swiper-button-prev'
//   },
//   pagination: {
//      el: '.swiper-pagination',
//      type: 'bullets',
//      clickable: 'true'
//   },

// });
       
       
// var swiper = new Swiper(".myGallery", {
//   slidesPerView: "auto",
//   spaceBetween: 30,
//   scrollbar: {
//     el: ".swiper-scrollbar",
//     hide: true,
//   },
// });