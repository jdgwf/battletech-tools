angular.module("baseApp").controller(
	"battlemechCreatorControllerSidebar",
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$route',
		function ($rootScope, $translate, $scope, $route) {
			// Set Page Title Tag

			$scope.button_welcome_current = false;
			$scope.button_step1_current = false;
			$scope.button_step2_current = false;
			$scope.button_step3_current = false;
			$scope.button_step4_current = false;
			$scope.button_step5_current = false;
			$scope.button_step6_current = false;
			$scope.button_summary_current = false;
			$scope.button_exports_current = false;

			if( $route.current.originalPath == "/battlemech-creator/") {
				$scope.button_welcome_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-step1/") {
				$scope.button_step1_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-step2/") {
				$scope.button_step2_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-step3/") {
				$scope.button_step3_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-step4/") {
				$scope.button_step4_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-step5/") {
				$scope.button_step5_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-step6/") {
				$scope.button_step6_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-summary/") {
				$scope.button_summary_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator-exports/") {
				$scope.button_exports_current = true;
			}

		}
	]
);

