var available_languages = [];

var appVersion = "0.01Alpha";

webApp = angular.module(
	'webApp',
	['ngRoute', 'ngResource', 'ngSanitize','pascalprecht.translate', 'as.sortable', 'mm.foundation'],
	[
		'$routeProvider',
		'$translateProvider',
		function ($routeProvider, $translateProvider, $scope, $http) {

			for( lang_count = 0; lang_count < available_languages.length; lang_count++) {
				if( available_languages[lang_count].active ) {
					$translateProvider.translations(
						available_languages[lang_count].short_code ,
						available_languages[lang_count].translations
					);
				}
			}

			cacheBreaker = "2016022204";

			$translateProvider.useSanitizeValueStrategy('sanitize');

			preferred_language = "en-US";
			if( localStorage && localStorage["tmp.preferred_language"] ) {
				preferred_language = localStorage["tmp.preferred_language"];
			} else {
				localStorage["tmp.preferred_language"] = "en-US";
			}
			$translateProvider.preferredLanguage(preferred_language);

			$routeProvider

			// route for the home/welcome page
			.when('/', {
				templateUrl : 'pages/welcome.html?v=' + cacheBreaker,
				controller  : 'welcomeController'
			})

			// route for the credits page
			.when('/credits', {
				templateUrl : 'pages/credits.html?v=' + cacheBreaker,
				controller  : 'creditsController'
			})

			/*
			 * BattleMech Creator Page
			 */
			// route for the battlemech creator page
			.when('/battlemech-creator/', {
				templateUrl : 'pages/battlemech-creator-welcome.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerWelcome'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step1/', {
				templateUrl : 'pages/battlemech-creator-step1.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerStep1'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step2/', {
				templateUrl : 'pages/battlemech-creator-step2.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerStep2'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step3/', {
				templateUrl : 'pages/battlemech-creator-step3.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerStep3'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step4/', {
				templateUrl : 'pages/battlemech-creator-step4.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerStep4'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step5/', {
				templateUrl : 'pages/battlemech-creator-step5.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerStep5'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step6/', {
				templateUrl : 'pages/battlemech-creator-step6.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerStep6'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/summary/', {
				templateUrl : 'pages/battlemech-creator-summary.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerSummary'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/exports/', {
				templateUrl : 'pages/battlemech-creator-exports.html?v=' + cacheBreaker,
				controller  : 'battlemechCreatorControllerExports'
			})

			/*
			 * Alpha Strike Builder/Play Tools
			 */
			// route for the home/welcome page
			.when('/as/', {
				templateUrl : 'pages/as-builder.html?v=' + cacheBreaker,
				controller  : 'asBuilderController'
			})

			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view.html?v=' + cacheBreaker,
				controller  : 'asPlayViewController'
			})

			// route for the credits page
			.when('/settings', {
				templateUrl : 'pages/settings.html?v=' + cacheBreaker,
				controller  : 'settingsController'
			})

			;
		}
	]
);

webApp.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);


angular.module('webApp').controller(
	'select_language',
	[
		'$translate',
		'$scope',
		'$route',
		'$location',
		function ($translate, $scope, $route, $location) {

			$scope.change_language = function (key) {
				$translate.use(key);
				localStorage["tmp.preferred_language"] = key;
				$route.reload();
			};

		}
	]
);
