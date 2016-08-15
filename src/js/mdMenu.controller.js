/**
  * fmMenu Controller
  * --------------------
  * @desc: controls the various states and functions of fmMenu
  * @dependencies: $rootScope, $scope, $state, $timeout, $fmMenu
*/

fmMenu.controller('fmMenu.controller', function ($rootScope, $scope, $state, $timeout, $fmMenu, CONFIG_fmMenu) {


	  // =============================================================
    //  Events / State Changes
    // =============================================================

        /** 
          * 'touchmove'
          * Prevent over-scroll on mobile devices when menu is open
        */
        $(document).on('touchmove',function(e){
          if($rootScope.fmMenu.isOpen) e.preventDefault();
        });

        /** 
          * '$stateChangeSuccess'
          * Close menu once state change is complete
        */
        $rootScope.$on('$stateChangeSuccess', function(event, toState){
        	$fmMenu.close();
        });


    // =============================================================
    //  Functions
    // =============================================================

     	/** 
          * toggleMenu()
          * Open/close the menu based on current menu state $rootScope.fmMenu.isOpen
        */
        $rootScope.toggleMenu = function(){
        	
        	if($rootScope.fmMenu.isOpen && $rootScope.screenTaken == CONFIG_fmMenu.namespace){
        		$fmMenu.close();
        	} else {
        		if(!$rootScope.screenTaken) $fmMenu.open();
        	}

        };


        /** 
          * closeMenu()
          * Close the menu
        */
        $rootScope.closeMenu = function(){
        	$fmMenu.close();  
        };


        /** 
          * openMenu()
          * Open the menu
        */
        $rootScope.openMenu = function(){ 
        	$fmMenu.open();
        };


    // Initialize fmMenu with $timeout
    $timeout($fmMenu.init);
    
});
