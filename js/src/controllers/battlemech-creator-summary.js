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

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.isIOSStandAlone = isIOSStandAlone();
			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];


			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();
			$scope.mech_cbill_calc = $scope.current_mech.getCBillCalcHTML();

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
					a.download = $scope.current_mech.getName() + ' Alpha Strike Card.png';
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
					a.download = $scope.current_mech.getName() + ' Alpha Strike Card.jpg';
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

					pdf.save($scope.current_mech.getName() + " Alpha Strike Card.pdf");				}
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
					a.download = $scope.current_mech.getName() + ' Record Sheet.png';
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
					a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
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

					pdf.save($scope.current_mech.getName() + " Record Sheet.pdf");				}
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
