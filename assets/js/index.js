
//TOOLTIP MARQUE
$(function () {
  $('[data-toggle="tooltip"]').tooltip({delay: { "show": 500, "hide": 100 }})
})

//SLIDER MARQUE 
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
