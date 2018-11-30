'use strict';

(function(){
// /мобильное меню ----------------------------------------
var navMain = document.querySelector('.header__navigation');
var navToggle = document.getElementById('id-toggle');

if (!(navMain === null)  && !(navToggle === null))  {
  if (navMain.classList.contains('header__navigation--nojs')) {
    navMain.classList.remove('header__navigation--nojs');
  }

  navToggle.addEventListener('click', function() {
    navMain.classList.toggle('header__navigation--closed');
    navMain.classList.toggle('header__navigation--opened');
  });
}

})();
