var battlemechCreatorControllerWelcomeArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_INTRO_TITLE', 'BM_INTRO_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_INTRO_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_WELCOME_DESC )
					$scope.h3_title = translation.BM_INTRO_TITLE + ": " + translation.BM_INTRO_DESC;
				else
					$scope.h3_title = translation.BM_INTRO_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});


			localStorage["backToPath"] = $location.$$path;

		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerWelcome",
	battlemechCreatorControllerWelcomeArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerWelcome",
	battlemechCreatorControllerWelcomeArray
);
