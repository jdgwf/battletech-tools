var available_languages = [];

cordovaApp = angular.module(
	'cordovaApp',
	['ngRoute', 'ngResource', 'ngSanitize','pascalprecht.translate', 'as.sortable', 'mm.foundation','angulartics','angulartics.google.analytics','angulartics.google.analytics.cordova'],
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
				templateUrl : 'pages/welcome.html',
				controller  : 'welcomeController'
			})

			// route for the credits page
			.when('/credits', {
				templateUrl : 'pages/credits.html',
				controller  : 'creditsController'
			})

			/*
			 * BattleMech Creator Page
			 */
			// route for the battlemech creator page
			.when('/battlemech-creator/', {
				templateUrl : 'pages/battlemech-creator-welcome.html',
				controller  : 'battlemechCreatorControllerWelcome'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step1/', {
				templateUrl : 'pages/battlemech-creator-step1.html',
				controller  : 'battlemechCreatorControllerStep1'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step2/', {
				templateUrl : 'pages/battlemech-creator-step2.html',
				controller  : 'battlemechCreatorControllerStep2'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step3/', {
				templateUrl : 'pages/battlemech-creator-step3.html',
				controller  : 'battlemechCreatorControllerStep3'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step4/', {
				templateUrl : 'pages/battlemech-creator-step4.html',
				controller  : 'battlemechCreatorControllerStep4'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step5/', {
				templateUrl : 'pages/battlemech-creator-step5.html',
				controller  : 'battlemechCreatorControllerStep5'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step6/', {
				templateUrl : 'pages/battlemech-creator-step6.html',
				controller  : 'battlemechCreatorControllerStep6'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/summary/', {
				templateUrl : 'pages/battlemech-creator-summary.html',
				controller  : 'battlemechCreatorControllerSummary'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/exports/', {
				templateUrl : 'pages/battlemech-creator-exports.html',
				controller  : 'battlemechCreatorControllerExports'
			})

			/*
			 * Alpha Strike Builder/Play Tools
			 */
			// route for the home/welcome page
			.when('/as/', {
				templateUrl : 'pages/as-builder.html',
				controller  : 'asBuilderController'
			})

			//~ .when('/as/play-view', {
				//~ templateUrl : 'pages/as-play-view.html',
				//~ controller  : 'asPlayViewController'
			//~ })

			//~ .when('/as/play-view-svg', {
				//~ templateUrl : 'pages/as-play-view-svg.html',
				//~ controller  : 'asPlayViewSVGController'
			//~ })
			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view-svg.html',
				controller  : 'asPlayViewSVGController'
			})

			.when('/as/play-view-smaller', {
				templateUrl : 'pages/as-play-view-svg-smaller.html',
				controller  : 'asPlayViewSVGController'
			})

			// route for the credits page
			.when('/settings', {
				templateUrl : 'pages/settings.html',
				controller  : 'settingsController'
			})

			;
		}
	]
);


angular.module('cordovaApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('cordovaApp')
    .filter('svg_to_dataurl', ['$sce', function($sce){
        return function(text) {
			//~ console.log( text );
            //~ return "data:image/svg+xml;base64," + btoa(text);

           //~ return "data:image/svg+xml;utf8," + encodeURIComponent(text);

			return "data:image/svg+xml;utf8," + text;
        };
    }]);

angular.module('cordovaApp')
    .filter('strip_nl', ['$sce', function($sce){
        return function(text) {
			//~ console.log( text );
			while( text.indexOf( "\n" ) != -1 ) {
				text = text.replace( "\n", "" );
			}
            return window.btoa(text);


        };
    }]);


cordovaApp.run( function( $rootScope ) {
	//~ $rootScope.svgBattleTechLogo = $rootScope.$sce.trustAsHtml( battleTechLogoSVG() );
	$rootScope.svgBattleTechLogo = battleTechLogoSVG();

});

cordovaApp.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|data):/);
}]);


angular.module('cordovaApp').controller(
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
