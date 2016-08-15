/**
  * fmMenu Module
  * --------------------
*/

var fmMenu = angular.module('fmMenu', ['globals']); 

/**
  * fmMenu configuration
  * --------------------
*/ 
fmMenu.constant('CONFIG_fmMenu', { 
  namespace: 'fm-menu',
  animation: {
    duration: 400,
    easing: 'easeInOutCubic',   
  },
  init: {
    open: false
  },
  clone: {
    element: $('#nav-desktop'),
  }
});



