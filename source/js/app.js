'use strict';

const burgerBtn = document.querySelector('.main-nav__toggle')
const menuContainer = document.querySelector('.main-nav')

burgerBtn.addEventListener('click', () => {
  menuContainer.classList.toggle('main-nav--open')
})

const overflowTableWrapper = document.querySelector('.price__wrapper')
if (overflowTableWrapper) {
  overflowTableWrapper.scrollLeft = 535
}

const form = document.querySelector('.form__wrapper')

const modalSuccess = document.querySelector('.modal--success')
const modalReject = document.querySelector('.modal--reject')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    modalSuccess.style.display = 'block'
    const btn = modalSuccess.querySelector('button')
    btn.addEventListener('click', () => {
      modalSuccess.style.display = 'none'
    })
  })
}

// delete no-js class if js is enable

const menu = document.querySelector('.main-nav')

if (menu) {
  menu.classList.remove('main-nav--nojs')
}
