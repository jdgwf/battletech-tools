var battlemechCreatorControllerPrintingArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			//~ $translate(['APP_TITLE', 'BM_SUMMARY_TITLE', 'BM_SUMMARY_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				//~ $rootScope.title_tag = translation.BM_SUMMARY_TITLE + " | " + translation.APP_TITLE;
				//~ if( translation.BM_SUMMARY_DESC )
					//~ $scope.h3_title = translation.BM_SUMMARY_TITLE + ": " + translation.BM_SUMMARY_DESC;
				//~ else
					//~ $scope.h3_title = translation.BM_SUMMARY_TITLE;
				//~ $rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			//~ });

			//~ $scope.goHome = function() {

				//~ delete(localStorage["backToPath"]);
				//~ $location.url("/");
			//~ }

			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();

			$scope.isInDebugMode = false;
			if( typeof(isInDebugMode) != "undefined" && isInDebugMode )
				$scope.isInDebugMode = true;

			$scope.isInCordovaMode = false;
			if( typeof(isInCordovaMode) != "undefined" && isInCordovaMode )
				$scope.isInCordovaMode = true;

			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.isIOSStandAlone = isIOSStandAlone();
			//~ $scope.isIOSStandAlone = true;
			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();
			$scope.mech_cbill_calc = $scope.current_mech.getCBillCalcHTML();
			//~ console.log( $location.$$url );
			if( $location.$$url == "/battlemech-creator/print-tro/") {
				$rootScope.title_tag = $scope.current_mech.getName() + " - Record Sheet";
				$scope.textItem = $scope.current_mech.makeTROHTML();
			}


			//~ console.log( $location.$$url );
			if( $location.$$url == "/battlemech-creator/print-rs/") {
				$rootScope.title_tag = $scope.current_mech.getName() + " - Record Sheet";
				$scope.svgItem = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.textItem = "";
			}

			if( $location.$$url == "/battlemech-creator/print-as/") {
				$rootScope.title_tag = $scope.current_mech.getName() + " - Alpha Strike Card";
				$scope.svgItem = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				$scope.textItem = "";
			}
			//$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);

		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerPrinting",
	battlemechCreatorControllerPrintingArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerPrinting",
	battlemechCreatorControllerPrintingArray
);
