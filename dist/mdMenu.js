!function(n,t,e){"use strict";function a(n,e,a,u){o.directive(n,["$parse","swipe",function(o,c){var i=75,r=.3,s=30;return function(f,h,v){function l(n){if(!d||!p)return!1;var t=(n.y-d.y)*e,o=(n.x-d.x)*e;return a?Math.abs(o)<i&&t>0&&t>s&&Math.abs(o)/t<r:Math.abs(t)<i&&o>0&&o>s&&Math.abs(t)/o<r}var d,p,m=o(v[n]),w=["touch"];t.isDefined(v.ngSwipeDisableMouse)||w.push("mouse"),c.bind(h,{start:function(n,t){var e=t.target.getAttribute("class");a&&(!e||e&&null===e.match("noPreventDefault"))&&t.preventDefault(),d=n,p=!0},cancel:function(){p=!1},end:function(n,t){l(n)&&f.$apply(function(){h.triggerHandler(u),m(f,{$event:t})})}},w)}}])}var o=t.module("swipe",[]);o.factory("swipe",[function(){function n(n){var t=n.originalEvent||n,e=t.touches&&t.touches.length?t.touches:[t],a=t.changedTouches&&t.changedTouches[0]||e[0];return{x:a.clientX,y:a.clientY}}function e(n,e){var a=[];return t.forEach(n,function(n){var t=u[n][e];t&&a.push(t)}),a.join(" ")}var a=40,o=.3,u={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"}};return{bind:function(t,u,c){var i,r,s,f,h=!1,v=!1,l=!0;c=c||["mouse","touch"],t.on(e(c,"start"),function(t){s=n(t),h=!0,i=0,r=0,v=!1,l=!0,f=s,u.start&&u.start(s,t)}),t.on(e(c,"cancel"),function(n){h=!1,u.cancel&&u.cancel(n)}),t.on(e(c,"move"),function(t){if(h&&s){var e=n(t);if(i+=Math.abs(e.x-f.x),r+=Math.abs(e.y-f.y),f=e,!(a>i&&a>r)){if(!v){var c,d,p;c=Math.abs(e.x-s.x),d=Math.abs(e.y-s.y),p=d/c,o>p?(t.preventDefault(),l=!1):l=!0,v=!0}t.isVertical=l,u.move&&u.move(e,t)}}}),t.on(e(c,"end"),function(t){h&&(t.isVertical=l,h=!1,u.end&&u.end(n(t),t))})}}}]),a("ngSwipeUp",-1,!0,"swipeup"),a("ngSwipeDown",1,!0,"swipedown")}(window,window.angular);

/**
  * trim()
  * -------------------------
  * @desc: removes uneccesry white space from a string
  * @type: (string)
*/
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, "");
};


/**
  * toCamel()
  * -------------------------
  * @desc: converts string to camel case format
  * @type: (string)
*/
String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};


/**
  * toDash()
  * -------------------------
  * @desc: converts string from camel case to dashed format
  * @type: (string)
*/
String.prototype.toDash = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};


/**
  * toUnderscore()
  * -------------------------
  * @desc: converts string from camel case to underscore format
  * @type: (string)
*/
String.prototype.toUnderscore = function(){
	return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
};

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




/**
  * mdMenu Controller
  * --------------------
  * @desc: controls the various states and functions of mdMenu
  * @dependencies: $rootScope, $scope, $state, $timeout, $mdMenu
*/

mdMenu.controller('mdMenu.controller', function ($rootScope, $scope, $state, $timeout, $mdMenu, CONFIG_mdMenu) {


	  // =============================================================
    //  Events / State Changes
    // =============================================================

        /** 
          * 'touchmove'
          * Prevent over-scroll on mobile devices when menu is open
        */
        $(document).on('touchmove',function(e){
          if($rootScope.mdMenu.isOpen) e.preventDefault();
        });

        /** 
          * '$stateChangeSuccess'
          * Close menu once state change is complete
        */
        $rootScope.$on('$stateChangeSuccess', function(event, toState){
        	$mdMenu.close();
        });


    // =============================================================
    //  Functions
    // =============================================================

     	/** 
          * toggleMenu()
          * Open/close the menu based on current menu state $rootScope.mdMenu.isOpen
        */
        $rootScope.toggleMenu = function(){
        	
        	if($rootScope.mdMenu.isOpen && $rootScope.screenTaken == CONFIG_mdMenu.namespace){
        		$mdMenu.close();
        	} else {
        		if(!$rootScope.screenTaken) $mdMenu.open();
        	}

        };


        /** 
          * closeMenu()
          * Close the menu
        */
        $rootScope.closeMenu = function(){
        	$mdMenu.close();  
        };


        /** 
          * openMenu()
          * Open the menu
        */
        $rootScope.openMenu = function(){ 
        	$mdMenu.open();
        };


    // Initialize mdMenu with $timeout
    $timeout($mdMenu.init);
    
});

/**
  * mdMenu factory
  * --------------------
  * @desc: provides core functionality of mdMenu
  * @dependencies: $e, $rootScope, CONFIG_mdMenu
*/

mdMenu.factory('$mdMenu', function($rootScope, CONFIG_mdMenu) {

    // Create factory object
    var $mdMenu = {};

    // =============================================================
    //  Variables
    // =============================================================

        // Private vars
        //
            var mdMenu = {
                element:            $('.'+CONFIG_mdMenu.namespace),               // The menu element
                toggle:             $('#'+CONFIG_mdMenu.namespace+'-toggle'),     // The menu toggle element
                activeClass:        CONFIG_mdMenu.namespace+'-open',              // Class added to DOM when menu is open
                clone:              (CONFIG_mdMenu.clone !== undefined ? true : false)
            };


        // Global vars ($rootScope)
        //
            $rootScope.mdMenu = {
                isOpen: CONFIG_mdMenu.init.open                                   // Boolean for menu logic
            };
            $rootScope.screenTaken = CONFIG_mdMenu.init.open;


    // =============================================================
    //  Functions
    // =============================================================

        /** 
          * init()
          * Initializes the menu
        */
        $mdMenu.init = function(){

            // Cloning
            //
                if(mdMenu.clone && CONFIG_mdMenu.clone.element.length){

                    var html = '';
                    var clone = CONFIG_mdMenu.clone.element;

                    try {

                        // Clone is container with ul's inside
                        if(clone.find('ul').length){

                            html += '<div style="width:100%">';
                            clone.find('ul').each(function(){
                                html += '<ul>'+$(this).html()+'</ul>';
                            });
                            html += '</div>';

                        // Clone is a single ul
                        } else if(clone.is('ul')){

                            html = '<ul>'+clone.html()+'</ul>';

                        } else {
                            throw 'ERROR mdMenu: clone \'#'+CONFIG_mdMenu.clone.element.attr('id')+'\' does not contain any ul elements nor is a ul element itself';
                        }

                        if(html) $mdMenu.clone(html);

                    } catch(err){
                        console.log(err);
                    }

                } else if(mdMenu.clone && !CONFIG_mdMenu.clone.element.length){
                    console.log('ERROR mdMenu: clone was set but no element was defined');
                }
        };


        /** 
          * close()
          * Closes the menu with the specified animation and updates menu state
        */
        $mdMenu.close = function(){

            // Remove active class from toggle ..
            mdMenu.toggle.removeClass('active');


            // Determine properties to animate ..
            var animatedProperties = $mdMenu.getAnimatedProperties('close');

            // Animate the menu closed ..
            mdMenu.element.velocity(animatedProperties, CONFIG_mdMenu.animation.duration,  CONFIG_mdMenu.animation.easing, function(){

                // Update menu scope as closed
                $rootScope.mdMenu.isOpen = false;
                $rootScope.screenTaken = false;

                // Reset body class/style
                $e.body
                .removeAttr('style')
                .removeClass(mdMenu.activeClass);
            });
        };


        /** 
          * open()
          * Opens the menu with the specified animation and updates menu state
        */
        $mdMenu.open = function(){

            // Add active class to body and restrict viewport height ..
            $e.body
                .addClass(mdMenu.activeClass)
                .css('height',$e.window.height());

            // Add active class to menu toggling animation
            mdMenu.toggle.addClass('active');

            // Determine properties to animate ..
            var animatedProperties = $mdMenu.getAnimatedProperties('open');

            // Animate the menu open ..
            mdMenu.element.velocity(animatedProperties, CONFIG_mdMenu.animation.duration,  CONFIG_mdMenu.animation.easing, function(){

                // Update menu scope as open
                $rootScope.mdMenu.isOpen = true;
                $rootScope.screenTaken = CONFIG_mdMenu.namespace;
            });
        };


        /** 
          * getAnimatedProperties()
          * Determines which properties nneded to animate and achieve the desired effect
          * @defaults: transition-open="slide", animation-direction="left"
        */
        $mdMenu.getAnimatedProperties = function(state){

            var transition, direction, properties = {};

            // Determine the transition type
            transition = ( mdMenu.element.data().hasOwnProperty('transition') ? mdMenu.element.data('transition') : 'slide' );

            // Swtich between states ..
            switch(state){ 

                // Properties for 'open' state
                //
                    case 'open':

                        // Switch between transition types ..
                        switch(transition){

                            // Slide
                                case 'slide':
                                    direction = ( mdMenu.element.data().hasOwnProperty('animationDirection') ? mdMenu.element.data('animation-direction') : 'left' );
                                    properties[direction] = '0';
                                break;

                            // Fade
                                case 'fade':
                                    properties['opacity'] = 1;
                                break;

                        }

                    break;

                // Properties for 'close' state
                //
                    case 'close':

                        // Switch between transition types ..
                        switch(transition){

                            // Slide
                                case 'slide':
                                    direction = ( mdMenu.element.data().hasOwnProperty('animationDirection') ? mdMenu.element.data('animation-direction') : 'left' );
                                    properties[direction] = '-100%';
                                break;

                            // Fade
                                case 'fade':
                                    properties['opacity'] = 0;
                                break;

                        }

                    break;

            }

            // Return the properties to animate
            return properties;

        };


        /** 
          * clone()
          * Injects the mdMenu with html specified by a clone element
        */
        $mdMenu.clone = function(html){
            mdMenu.element.html(html);
        };

        // Return factory object
        return $mdMenu;

});