﻿/**
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