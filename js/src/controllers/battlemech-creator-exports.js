var battlemechCreatorControllerExportsArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		'$sce',
		'$compile',
		function ($rootScope, $translate, $scope, $location, $sce, $compile) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_EXPORTS_TITLE', 'BM_EXPORTS_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_EXPORTS_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_EXPORTS_DESC )
					$scope.h3_title = translation.BM_EXPORTS_TITLE + ": " + translation.BM_EXPORTS_DESC;
				else
					$scope.h3_title = translation.BM_EXPORTS_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}



			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			$scope.makeTROBBCode = $scope.current_mech.makeTROBBCode();

			$scope.mechJSON = $scope.current_mech.exportJSON();

			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();

			$scope.isIOSStandAlone = isIOSStandAlone();


			$scope.troIOSPDFLinkClick = function() {
				var troPDF = makeBattlemechTROPDF($scope.current_mech);
				var troPDFData = troPDF.output('datauristring');
				$scope.troIOSPDFLink =  "pages/ios-standalone-pdf.html#" + troPDFData;
			}

			$scope.rsIOSPDFLinkClick = function() {
				var rsPDFData = makeBattlemechRecordSheetPDF($scope.current_mech);
				var rsPDFData = rsPDFData.output('datauristring');
				$scope.rsIOSPDFLink =  "pages/ios-standalone-pdf.html#" + rsPDFData;
			}

			$scope.combIOSPDFLinkClick = function() {
				var combPDF = makeBattlemechCombinedPDF($scope.current_mech);
				var combPDFData = combPDF.output('datauristring');
				$scope.combIOSPDFLink =  "pages/ios-standalone-pdf.html#" + combPDFData;
			}

			$scope.makeRecordSheet = function() {
				pdf = makeBattlemechRecordSheetPDF($scope.current_mech);
			//	pdf.save($scope.current_mech.getName() + ' - Record Sheet.pdf');
			}

			$scope.makeTROSheet = function() {
				pdf = makeBattlemechTROPDF($scope.current_mech);
				pdf.save($scope.current_mech.getName() + ' - TRO.pdf');
			}
			$scope.makeCombinedSheet = function() {
				pdf = makeBattlemechCombinedPDF($scope.current_mech);
				pdf.save($scope.current_mech.getName() + ' - Record Sheet and TRO.pdf');
			}

			//~ $scope.updateSVG = function( tmpText ) {
				//~ if( typeof( tmpText ) == "undefined" )
					//~ tmpText = "";
				//~ console.log( "updateSVG", tmpText );

				//~ var rawSVG = $scope.current_mech.makeSVGRecordSheet(tmpText);
				//~ var compiled = $scope.current_mech.makeSVGRecordSheet(rawSVG)
				//~ $scope.recordSheetSVG =  $sce.trustAsHtml( compiled );
				//~ compiled( $scope.recordSheetSVG  )
				//~ var el = document.getElementById( 'testsvg' );
				//~ angular.element(el).append( $compile( rawSVG )($scope) )
				//~ el = $compile( angular.element( rawSVG ) )($scope);
				//~ //var element = $compile(angular.element( rawSVG ))(scope);

			//~ }

			//~ $scope.updateSVG();


		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerExports",
	battlemechCreatorControllerExportsArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerExports",
	battlemechCreatorControllerExportsArray
);
