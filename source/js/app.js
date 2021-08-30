'use strict';

const burgerBtn = document.querySelector('.main-nav__toggle')
const menuContainer = document.querySelector('.main-nav')

burgerBtn.addEventListener('click', () => {
  menuContainer.classList.toggle('main-nav--open')
})
