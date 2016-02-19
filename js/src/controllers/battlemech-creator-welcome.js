angular.module("baseApp").controller(
	"battlemechCreatorControllerWelcome",
	[
		'$rootScope',
		'$translate',
		'$scope',
		function ($rootScope, $translate, $scope) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_WELCOME_TITLE', 'BM_WELCOME_DESC', 'WELCOME_BUTTON_MECH_CREATOR', 'BM_WELCOME_TEXT' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_WELCOME_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_WELCOME_DESC )
					$scope.h3_title = translation.BM_WELCOME_TITLE + ": " + translation.BM_WELCOME_DESC;
				else
					$scope.h3_title = translation.BM_WELCOME_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
				$rootScope.welcome_text = translation.BM_WELCOME_TEXT;
			});

		}
	]
);

