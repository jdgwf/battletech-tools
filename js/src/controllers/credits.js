angular.module("baseApp").controller(
	"creditsController",
	[
		'$rootScope',
		'$translate',
		'$scope',
		function ($rootScope, $translate, $scope) {
			$translate(['APP_TITLE', 'INDEX_WELCOME']).then(function (translation) {
				$rootScope.title_tag = translation.INDEX_WELCOME + " | " + translation.APP_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.INDEX_CREDITS;
			});
		}
	]
);
