var battlemechCreatorControllerSummaryArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_SUMMARY_TITLE', 'BM_SUMMARY_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_SUMMARY_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_SUMMARY_DESC )
					$scope.h3_title = translation.BM_SUMMARY_TITLE + ": " + translation.BM_SUMMARY_DESC;
				else
					$scope.h3_title = translation.BM_SUMMARY_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			localStorage["backToPath"] = $location.$$path;

			$scope.isInDebugMode = false;
			if( typeof(isInDebugMode) != "undefined" && isInDebugMode )
				$scope.isInDebugMode = true;

			$scope.isInCordovaMode = false;
			if( typeof(isInCordovaMode) != "undefined" && isInCordovaMode )
				$scope.isInCordovaMode = true;

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.isIOSStandAlone = isIOSStandAlone();
			//~ $scope.isIOSStandAlone = true;
			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			var alphaStrikeForceStats = $scope.current_mech.getAlphaStrikeForceStats();
			var pilot = $scope.current_mech.getPilot();

			$scope.asRole = alphaStrikeForceStats.role;
			$scope.asCustomName = alphaStrikeForceStats.customName;



			$scope.mechwarriorName = pilot.name;
			$scope.mechwarriorPiloting = pilot.piloting;
			$scope.mechwarriorGunnery = pilot.gunnery;

			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();
			$scope.mech_cbill_calc = $scope.current_mech.getCBillCalcHTML();

			$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
			$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);

			$scope.setPilotName = function( newValue ) {
				$scope.current_mech.setPilotName( newValue );
				//~ updateMechStatusBarAndTRO($scope, $translate, current_mech);
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.setPilotPiloting = function( newValue ) {

				$scope.current_mech.setPilotPiloting( newValue );
				//~ updateMechStatusBarAndTRO($scope, $translate, current_mech);
				$scope.current_mech._calc();

				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.setPilotGunnery = function( newValue ) {
				$scope.current_mech.setPilotGunnery( newValue );
				//~ updateMechStatusBarAndTRO($scope, $translate, current_mech);
				$scope.current_mech._calc();
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.setASRole = function( newValue ) {
				$scope.current_mech.setASRole( newValue );
				//~ updateMechStatusBarAndTRO($scope, $translate, current_mech);
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}


			$scope.setASCustomName = function( newValue ) {
				//~ console.log( "setASCustomName", newValue );
				$scope.current_mech.setASCustomName( newValue );
				//~ console.log("1", alphaStrikeForceStats.customName);
				//~ updateMechStatusBarAndTRO($scope, $translate, current_mech);
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				//~ console.log("2", alphaStrikeForceStats.customName);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				//~ console.log("3", alphaStrikeForceStats.customName);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				//~ console.log("4", alphaStrikeForceStats.customName);
				//~ console.log( 'localStorage["tmp.current_mech"]', localStorage["tmp.current_mech"]);
			}


			$scope.saveASPNG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Alpha Strike Card.png';
					a.href = canvas.toDataURL('image/png');
					document.body.appendChild(a);
					a.click();
				}
			}


			$scope.saveASJPG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Alpha Strike Card.jpg';
					a.href = canvas.toDataURL('image/jpeg');
					document.body.appendChild(a);
					a.click();
				}
			}
			$scope.saveASPDF = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);
					var ratio = canvas.width / canvas.height;

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var imgData = canvas.toDataURL("image/jpeg", 1.0);
					var pdf = new jsPDF("portrait", "in", "letter");

					pdf.addImage(imgData, 'JPG', .25, 1, 8, 8 / ratio);
					//var download = document.getElementById('download');

					pdf.save($scope.current_mech.getName() + " - Alpha Strike Card.pdf");
				}
			}

			$scope.saveRSPNG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Record Sheet.png';
					a.href = canvas.toDataURL('image/png');
					document.body.appendChild(a);
					a.click();
				}
			}

			$scope.saveRSJPG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Record Sheet.jpg';
					a.href = canvas.toDataURL('image/jpeg');
					document.body.appendChild(a);
					a.click();
				}
			}

			$scope.saveRSPDF = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;

					var ratio = canvas.width / canvas.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var imgData = canvas.toDataURL("image/jpeg", 1.0);
					var pdf = new jsPDF("portrait", "in", "letter");

					pdf.addImage(imgData, 'JPG', .25, .25, 8, 8 / ratio );
					//var download = document.getElementById('download');

					pdf.save($scope.current_mech.getName() + " - Record Sheet.pdf");
				}
			}

			/* Create IOS Data Link PDF URLs */
			$scope.iosRSLink = "";
			$scope.iosASLink = "";
			//~ $scope.isIOSStandAlone = true;
			if($scope.isIOSStandAlone == true) {

				//~ console.log("creating as");
				var ASimage = new Image();
				ASimage.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				ASimage.onload = function() {
					var AScanvas = document.createElement('canvas');
					AScanvas.width = ASimage.width;
					AScanvas.height = ASimage.height;

					var ratio = AScanvas.width / AScanvas.height;
					var AScontext = AScanvas.getContext('2d');
					AScontext.drawImage(ASimage, 0, 0);

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var ASimgData = AScanvas.toDataURL("image/jpeg", 1.0);
					var ASpdf = new jsPDF("portrait", "in", "letter");

					ASpdf.addImage(ASimgData, 'JPG', .25, .25, 8, 8 / ratio );
					//var download = document.getElementById('download');

					var troPDFData = ASpdf.output('datauristring');
					//~ console.log("created as");
					$scope.iosASLink =  "pages/ios-standalone-pdf.html#" + troPDFData;
				}

				//~ console.log("creating rs");
				var RSimage = new Image();
				RSimage.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				RSimage.onload = function() {
					var RScanvas = document.createElement('canvas');
					RScanvas.width = RSimage.width;
					RScanvas.height = RSimage.height;

					var ratio = RScanvas.width / RScanvas.height;
					var RScontext = RScanvas.getContext('2d');
					RScontext.drawImage(RSimage, 0, 0);

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var RSimgData = RScanvas.toDataURL("image/jpeg", 1.0);
					var RSpdf = new jsPDF("portrait", "in", "letter");

					RSpdf.addImage(RSimgData, 'JPG', .25, .25, 8, 8 / ratio );
					//var download = document.getElementById('download');

					var troPDFData = RSpdf.output('datauristring');
					//~ console.log("created rs");
					$scope.iosRSLink =  "pages/ios-standalone-pdf.html#" + troPDFData;
				}


			}



		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerSummary",
	battlemechCreatorControllerSummaryArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerSummary",
	battlemechCreatorControllerSummaryArray
);
