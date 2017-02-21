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

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			localStorage["backToPath"] = $location.$$path;

			var current_mech = new Mech();

			if( localStorage["tmp.current_mech"] ) {
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				current_mech.uuid = generateUUID();
				current_mech._calc();
			}

			$scope.confirmDialogQuestion = "";
			$scope.showConfirmDialog = false;

			$scope.confirmDialog = function( confirmationMessage, onYes ) {
				$scope.confirmDialogQuestion = confirmationMessage;
				$scope.showConfirmDialog = true;
				$scope.confirmDialogYes = onYes;
			}

			$scope.closeConfirmDialog = function( ) {
				$scope.showConfirmDialog = false;
				// reset confirm to nothing...
				$scope.confirmDialogYes = function() {
					$scope.showConfirmDialog = false;
				}
			}

			// Clear Mech Functions
			$scope.clearMech = function() {
				$translate(['BM_CLEAR_MECH']).then( function( translation) {
					$scope.confirmDialog(
						translation.BM_CLEAR_MECH,
						function() {
							current_mech = new Mech();
							current_mech.uuid = generateUUID();
							localStorage["tmp.current_mech"] = current_mech.exportJSON();
							$scope.showConfirmDialog = false;
						}
					);
				} );

			}

			$scope.removeSavedItem = function( deleteIndex ) {
				$translate(['BM_DELETE_ITEM']).then( function( translation) {
					$scope.confirmDialog(
						translation.BM_DELETE_ITEM,
						function() {

							$scope.showConfirmDialog = false;

							$scope.saved_items_mechs.splice( deleteIndex, 1);

							localStorage["saved_items_mechs"] = JSON.stringify( $scope.saved_items_mechs );
						}
					);
				} );
			}

			// Save Mech Functions
			$scope.saveMechDialogOpen = false;
			$scope.saveDialog = function() {
				$scope.save_as_name = current_mech.getName();
				$scope.save_over = -1;




				$scope.saved_items_mechs = [];
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				for( var itemC = 0; itemC < $scope.saved_items_mechs.length; itemC++) {

					//var techO = JSON.parse( $scope.saved_items_mechs[ itemC ].tech );
					$scope.saved_items_mechs[ itemC ].localTechName = $scope.saved_items_mechs[ itemC ].tech.name[ localStorage["tmp.preferred_language"] ];
				}

				$scope.saveMechDialogOpen = true;

			}

			$scope.updateSave = function( newIndex ) {
				$scope.save_over = newIndex;
			}

			$scope.updateSaveName = function( newName ) {
				$scope.save_as_name = newName;
			}


			$scope.closeSaveDialog = function() {
				$scope.saveMechDialogOpen = false;
			}

			$scope.saveMech = function() {
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				var saveItem = {
					saveName: $scope.save_as_name,
					savedOn: new Date(),
					tonnage: current_mech.getTonnage(),
					tech: current_mech.getTech(),
					data: current_mech.exportJSON()
				};


				if( $scope.save_over == -1 ) {
					$scope.saved_items_mechs.push( saveItem );
				} else {
					$scope.saved_items_mechs[ $scope.save_over] = saveItem ;
				}



				localStorage["saved_items_mechs"] = JSON.stringify( $scope.saved_items_mechs );

				$scope.saveMechDialogOpen = false;
			}

			// Load Mech Functions
			$scope.loadMechDialogOpen = false;
			$scope.loadDialog = function() {

				$scope.saved_items_mechs = [];
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				for( var itemC = 0; itemC < $scope.saved_items_mechs.length; itemC++) {

					$scope.saved_items_mechs[ itemC ].localTechName = $scope.saved_items_mechs[ itemC ].tech.name[ localStorage["tmp.preferred_language"] ];
				}

				$scope.loadMechDialogOpen = true;
			}

			$scope.loadSavedItem = function( loadIndex ) {
				$scope.saved_items_mechs = [];
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				if( $scope.saved_items_mechs[loadIndex] ) {
					localStorage["tmp.current_mech"] = $scope.saved_items_mechs[loadIndex].data;
					$location.url( "battlemech-creator/step1" );
				}
				$scope.loadMechDialogOpen = false;
			}

			$scope.closeLoadDialog = function() {
				$scope.loadMechDialogOpen = false;
			}
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
