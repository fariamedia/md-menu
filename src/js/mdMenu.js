/**
  * fmMenu Module
  * --------------------
*/

var mdMenu = angular.module('mdMenu', ['swipe']); 

/**
  * mdMenu configuration
  * --------------------
*/ 
mdMenu.constant('CONFIG_mdMenu', { 
  namespace: 'md-menu',
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



