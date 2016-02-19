angular.module("baseApp").controller(
	"battlemechCreatorControllerStep5",
	[
		'$rootScope',
		'$translate',
		'$scope',
		function ($rootScope, $translate, $scope) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP5_TITLE', 'BM_STEP5_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP5_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP5_DESC )
					$scope.h3_title = translation.BM_STEP5_TITLE + ": " + translation.BM_STEP5_DESC;
				else
					$scope.h3_title = translation.BM_STEP5_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});
			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];
			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			// make tro for sidebar

		}
	]
);

