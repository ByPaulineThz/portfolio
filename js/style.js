const toggleButton = document.querySelector('.toggle-menu');
const navBar = document.querySelector('.nav-bar');
toggleButton.addEventListener('click', () => {
  navBar.classList.toggle('toggle');
});

// swiper    
var mySwiper = new Swiper('.swiper-container', {
  effect: '',
  loop: false,
  speed: 1000,
  slidesPerView: 1,
  navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev'
  },
  pagination: {
     el: '.swiper-pagination',
     type: 'bullets',
     clickable: 'true'
  },

});
       
       
var swiper = new Swiper(".myGallery", {
  slidesPerView: "auto",
  spaceBetween: 30,
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
});