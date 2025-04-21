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


function openUserInfos(e, elementName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(elementName).style.display = "block";
  e.currentTarget.className += " active";
}