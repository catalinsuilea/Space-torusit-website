"use strict";

const linkMoon = document.querySelector(".planet-moon");
const linkMars = document.querySelector(".planet-mars");
const planetContainer = document.querySelector(".about-planet");

const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu");
const nav = document.querySelector("nav");

/* Nav functionality */
let click = 0;
menu.addEventListener("click", function () {
  click += 1;
  if (click % 2 != 0) {
    menu.src = "assets/shared/icon-close.svg";
    nav.classList.toggle("hidden-nav");
  } else {
    nav.classList.toggle("hidden-nav");
    menu.src = "assets/shared/icon-hamburger.svg";
  }
});

/* Fetching data for the destination */
const getDestinationData = async function (link) {
  const res = await fetch("data.json");
  const data = await res.json();
  console.log(data);
  const destinations = data.destinations;
  console.log(destinations);
  const getID = destinations.find(
    (destination) => destination.name === link.dataset.name
  );
  console.log(getID);
  renderData(getID);
};

/* HTML template for DOM based on the data */

let imgContainer = document.querySelector(".img-planet-container");
let infoContainer = document.querySelector(".text");

function renderData(planet) {
  imgContainer.innerHTML = ` <img src="${planet.images.png}" alt="${planet}-img" />`;
  infoContainer.innerHTML = `
 
   <h3>${planet.name}</h3>
   <p>${planet.description}</p>
     
     <div class="distance-travel-time">
       <div class="avg-distance">
         <p>Avg distance</p>
         <span>${planet.distance}</span>
       </div>
       <div class="travel-time">
         <p>EST.Travel Time</p>
         <span>${planet.travel}</span>
       </div>
     </div>
          `;
}
/* Render data based on the selected planet */
const links = document.querySelectorAll(".planet-link");
links.forEach((link, i) => {
  link.addEventListener("click", function () {
    if (link.dataset.name === link.dataset.name) {
      infoContainer.innerHTML = "";
      imgContainer.innerHTML = "";
      getDestinationData(link);
      /* Set the active class on the planet */
      setActive(i);
    }
  });
});
const setActive = function (active) {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  links[active].classList.add("active");
};

/* When the page first load,render the data for the first planet(moon) */
getDestinationData(linkMoon);
