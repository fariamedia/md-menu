/**
  * fmMenu factory
  * --------------------
  * @desc: provides core functionality of fmMenu
  * @dependencies: $e, $rootScope, CONFIG_fmMenu
*/

fmMenu.factory('$fmMenu', function($e, $rootScope, CONFIG_fmMenu) {

    // Create factory object
    var $fmMenu = {};

    // =============================================================
    //  Variables
    // =============================================================

        // Private vars
        //
            var fmMenu = {
                element:            $('.'+CONFIG_fmMenu.namespace),               // The menu element
                toggle:             $('#'+CONFIG_fmMenu.namespace+'-toggle'),     // The menu toggle element
                activeClass:        CONFIG_fmMenu.namespace+'-open',              // Class added to DOM when menu is open
                clone:              (CONFIG_fmMenu.clone !== undefined ? true : false)
            };


        // Global vars ($rootScope)
        //
            $rootScope.fmMenu = {
                isOpen: CONFIG_fmMenu.init.open                                   // Boolean for menu logic
            };
            $rootScope.screenTaken = CONFIG_fmMenu.init.open;


    // =============================================================
    //  Functions
    // =============================================================

        /** 
          * init()
          * Initializes the menu
        */
        $fmMenu.init = function(){

            // Cloning
            //
                if(fmMenu.clone && CONFIG_fmMenu.clone.element.length){

                    var html = '';
                    var clone = CONFIG_fmMenu.clone.element;

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
                            throw 'ERROR fmMenu: clone \'#'+CONFIG_fmMenu.clone.element.attr('id')+'\' does not contain any ul elements nor is a ul element itself';
                        }

                        if(html) $fmMenu.clone(html);

                    } catch(err){
                        console.log(err);
                    }

                } else if(fmMenu.clone && !CONFIG_fmMenu.clone.element.length){
                    console.log('ERROR fmMenu: clone was set but no element was defined');
                }
        };


        /** 
          * close()
          * Closes the menu with the specified animation and updates menu state
        */
        $fmMenu.close = function(){

            // Remove active class from toggle ..
            fmMenu.toggle.removeClass('active');


            // Determine properties to animate ..
            var animatedProperties = $fmMenu.getAnimatedProperties('close');

            // Animate the menu closed ..
            fmMenu.element.velocity(animatedProperties, CONFIG_fmMenu.animation.duration,  CONFIG_fmMenu.animation.easing, function(){

                // Update menu scope as closed
                $rootScope.fmMenu.isOpen = false;
                $rootScope.screenTaken = false;

                // Reset body class/style
                $e.body
                .removeAttr('style')
                .removeClass(fmMenu.activeClass);
            });
        };


        /** 
          * open()
          * Opens the menu with the specified animation and updates menu state
        */
        $fmMenu.open = function(){

            // Add active class to body and restrict viewport height ..
            $e.body
                .addClass(fmMenu.activeClass)
                .css('height',$e.window.height());

            // Add active class to menu toggling animation
            fmMenu.toggle.addClass('active');

            // Determine properties to animate ..
            var animatedProperties = $fmMenu.getAnimatedProperties('open');

            // Animate the menu open ..
            fmMenu.element.velocity(animatedProperties, CONFIG_fmMenu.animation.duration,  CONFIG_fmMenu.animation.easing, function(){

                // Update menu scope as open
                $rootScope.fmMenu.isOpen = true;
                $rootScope.screenTaken = CONFIG_fmMenu.namespace;
            });
        };


        /** 
          * getAnimatedProperties()
          * Determines which properties nneded to animate and achieve the desired effect
          * @defaults: transition-open="slide", animation-direction="left"
        */
        $fmMenu.getAnimatedProperties = function(state){

            var transition, direction, properties = {};

            // Determine the transition type
            transition = ( fmMenu.element.data().hasOwnProperty('transition') ? fmMenu.element.data('transition') : 'slide' );

            // Swtich between states ..
            switch(state){ 

                // Properties for 'open' state
                //
                    case 'open':

                        // Switch between transition types ..
                        switch(transition){

                            // Slide
                                case 'slide':
                                    direction = ( fmMenu.element.data().hasOwnProperty('animationDirection') ? fmMenu.element.data('animation-direction') : 'left' );
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
                                    direction = ( fmMenu.element.data().hasOwnProperty('animationDirection') ? fmMenu.element.data('animation-direction') : 'left' );
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
          * Injects the fmMenu with html specified by a clone element
        */
        $fmMenu.clone = function(html){
            fmMenu.element.html(html);
        };

        // Return factory object
        return $fmMenu;

});