/**
  * Application module
  * ------------------
  * @desc: the module for the application
  * @dependencies: $appConfig.dependencies
*/

var app = angular.module(appConfig.name, appConfig.dependencies);   


/**
  * Application module config
  * -------------------------
  * @desc: configuration for the application module
  * @dependencies: $stateProvider, $urlRouterProvider
*/

app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $appStates){ 


    // Application States & Routing
    //
        // Redirect every other not known url to home
        $urlRouterProvider.otherwise('/');
        
        // Define states
        for($stateIndex in $appStates){
          $stateProvider.state($stateIndex,$appStates[$stateIndex]);
        }


    // $httpProvider Configuration
    //
        $httpProvider.defaults.headers.common = { 'Access-Control-Allow-Origin' : '*' }

});



