"use strict";

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
