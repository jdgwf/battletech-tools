var available_languages = [];

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
				templateUrl : 'pages/welcome.html?v=' + getAppVersion(),
				controller  : 'welcomeController'
			})

			// route for the credits page
			.when('/credits', {
				templateUrl : 'pages/credits.html?v=' + getAppVersion(),
				controller  : 'creditsController'
			})

			/*
			 * BattleMech Creator Page
			 */
			// route for the battlemech creator page
			.when('/battlemech-creator/', {
				templateUrl : 'pages/battlemech-creator-welcome.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerWelcome'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step1/', {
				templateUrl : 'pages/battlemech-creator-step1.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep1'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step2/', {
				templateUrl : 'pages/battlemech-creator-step2.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep2'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step3/', {
				templateUrl : 'pages/battlemech-creator-step3.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep3'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step4/', {
				templateUrl : 'pages/battlemech-creator-step4.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep4'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step5/', {
				templateUrl : 'pages/battlemech-creator-step5.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep5'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step6/', {
				templateUrl : 'pages/battlemech-creator-step6.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep6'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/summary/', {
				templateUrl : 'pages/battlemech-creator-summary.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerSummary'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/exports/', {
				templateUrl : 'pages/battlemech-creator-exports.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerExports'
			})

			/*
			 * Alpha Strike Builder/Play Tools
			 */
			// route for the home/welcome page
			.when('/as/', {
				templateUrl : 'pages/as-builder.html?v=' + getAppVersion(),
				controller  : 'asBuilderController'
			})

			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view.html?v=' + getAppVersion(),
				controller  : 'asPlayViewController'
			})

			// route for the credits page
			.when('/settings', {
				templateUrl : 'pages/settings.html?v=' + getAppVersion(),
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
