/**
  * Config object
  * --------------------
  * @desc: configuration for the application
*/
var appConfig = { 

	// App name
	name: $config.app_name,

	// App dependencies (the app relies on these to run)
	dependencies: [

		// Angular core
		'ngSanitize',
		'ngResource', 
	  	'ngAnimate',
	  	'ngTouch',
	  	'ngCookies',

		// Angular extensions
		'ui.router',
	  	'swipe',
	  	'ng.deviceDetector',
	  	'checklist-model',

	  	// Custom modules
	  	'globals',
	  	'fmMenu',
	  	'fmSearch',
	],

};


/**
  * Global module
  * --------------------
  * @desc: module for global constants
*/
angular.module('globals', [])

	// Common elements
	.constant('$e', {
		document: 	$(document), 
		window: 	$(window),
		html: 		$('html'),
		body: 		$('body'), 
	})

	// API
	.constant('$api', $config.api)

	// Application states
	.constant('$appStates',{

		'home': {
			url: '/',
			views: {

				// Main template (relatively named)
				'': { 
					controller: 'home.controller',
					templateUrl: 'app/views/home.html' 
				},

				'modal': { 
					templateUrl: 'app/views/modals/modal-quote.html' 
				},
			}
		},

		'quote': {
			url: '/quote',
			views: {

				// Main template (relatively named)
				'': { 
					controller: 'quote.controller',
					templateUrl: 'app/views/quote.html'
				},

			}
		},

	});