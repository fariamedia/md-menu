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
