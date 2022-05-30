"use strict";

const member = document.querySelector(".member-douglas");
const dots = document.querySelectorAll(".dot");
const membersContainer = document.querySelector(".crew-article-container");

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

/* Fetching data for the crew */
const getDestinationData = async function (link) {
  const res = await fetch("data.json");
  const data = await res.json();
  const crew = data.crew;
  const getID = crew.find((member) => member.name === link.dataset.name);
  console.log(getID.images.png);
  renderData(getID);
};

/* Render data based on the selected dot */
dots.forEach((dot, i) => {
  dot.addEventListener("click", function () {
    if (dot.dataset.name === dot.dataset.name) {
      membersContainer.innerHTML = "";
      getDestinationData(dot);
      setActive(i);
    }
  });
});

/* Set the active class on the dot */
const setActive = function (active) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[active].classList.add("active");
};

/* HTML template for DOM based on the data */
function renderData(member) {
  let html = `<div class="crew-info">
  <span class="uppercase white">${member.role}</span>
  <h2 class="uppercase white">${member.name}</h2>
  <p class="white">
    ${member.bio}
  </p>
</div>
<div class="crew-img">
  <img src="${member.images.png}" alt="" />
</div>
            `;
  membersContainer.insertAdjacentHTML("afterbegin", html);
}

/* When the page first load,render the data for the first member */
getDestinationData(member);
