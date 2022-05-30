"use strict";

const technology = document.querySelector(".launch-vehicle");
const btns = document.querySelectorAll(".btn");
const technologyContainer = document.querySelector(
  ".technology-article-container"
);

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

/* Fetching data for the technology */
const getTechnologyData = async function (link) {
  const res = await fetch("data.json");
  const data = await res.json();
  const tech = data.technology;
  const getID = tech.find((item) => item.name === link.dataset.name);
  renderData(getID);
};

/* Render data based on the selected number */
btns.forEach((btn, i) => {
  btn.addEventListener("click", function () {
    if (btn.dataset.name === btn.dataset.name) {
      technologyContainer.innerHTML = "";
      getTechnologyData(btn);
      /* Set the active class on the number */
      setActive(i);
    }
  });
});

const setActive = function (active) {
  btns.forEach((btn) => btn.classList.remove("active"));
  btns[active].classList.add("active");
};

/* HTML template for DOM based on the data */
function renderData(tech) {
  let html = ` <div class="text">
  <span class="white uppercase">The terminology...</span>
  <h1 class="white uppercase">${tech.name}</h1>
  <p class="white">
   ${tech.description}
  </p>
</div>
<div class="technology-img">
  <img
    src="${tech.images.portrait}"
    alt="technology-img"
  />
</div>
            `;
  technologyContainer.insertAdjacentHTML("afterbegin", html);
}

/* When the page first load,render the data for the first technology */
getTechnologyData(technology);
