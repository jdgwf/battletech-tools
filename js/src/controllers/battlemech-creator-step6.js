var battlemechCreatorControllerStep6Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP6_TITLE', 'BM_STEP6_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP6_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP6_DESC )
					$scope.h3_title = translation.BM_STEP6_TITLE + ": " + translation.BM_STEP6_DESC;
				else
					$scope.h3_title = translation.BM_STEP6_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});
			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;

			$scope.selectedItem = null;

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];

			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			update_step_6_items($scope, current_mech);

			$translate(
				[
					'TRO_ARMOR_HD', 'TRO_ARMOR_CT', 'TRO_ARMOR_RT', 'TRO_ARMOR_LT',
					'TRO_ARMOR_RA', 'TRO_ARMOR_LA', 'TRO_ARMOR_RL', 'TRO_ARMOR_LL',
					'TRO_ARMOR_RFL', 'TRO_ARMOR_LFL', 'TRO_ARMOR_RRL', 'TRO_ARMOR_LRL'
				]
			).then(function (translation) {

				$scope.label_head = translation.TRO_ARMOR_HD;
				$scope.label_center_torso = translation.TRO_ARMOR_CT;
				$scope.label_right_torso = translation.TRO_ARMOR_RT;
				$scope.label_left_torso = translation.TRO_ARMOR_LT;

				if( current_mech.mech_type.class.toLowerCase() == "quad") {
					$scope.battlemech_is_quad = true;
					$scope.label_right_arm = translation.TRO_ARMOR_RFL;
					$scope.label_left_arm = translation.TRO_ARMOR_LFL;
					$scope.label_right_leg = translation.TRO_ARMOR_RRL;
					$scope.label_left_leg = translation.TRO_ARMOR_LRL;
				} else {
					$scope.battlemech_is_quad = false;
					$scope.label_right_arm = translation.TRO_ARMOR_RA;
					$scope.label_left_arm = translation.TRO_ARMOR_LA;
					$scope.label_right_leg = translation.TRO_ARMOR_RL;
					$scope.label_left_leg = translation.TRO_ARMOR_LL;
				}

			});


			$scope.step6ItemClick = function( criticalItem, indexLocation, locationString ) {
				if( typeof(criticalItem) == "undefined")
					criticalItem = null;
				if( typeof(indexLocation) == "undefined")
					indexLocation = null;
				if( typeof(locationString) == "undefined")
					locationString = null;

				$scope.errorCannotPlace = false;
				$scope.errorCannotMove = false;

				//~ console.log( "step6ItemClick", criticalItem, indexLocation, locationString );
				if( $scope.selectedItem == null ) {
					if( criticalItem != null) {
						if( criticalItem.movable == true ) {
							 $scope.selectedItem = {
								 item: criticalItem,
								 from: locationString,
								 index: indexLocation
							};
						} else {
							//~ console.log( "Unmovable item selected" );
							$scope.errorCannotMove = true;
						}
					} else {
						//~ console.log( "Unallocated area selected" );


					}
				} else {
					if( criticalItem ) {
						//~ console.log( "Slot is already filled" );
						$scope.errorCannotPlace = true;
					} else {
						var itemTag =  $scope.selectedItem.item.tag;
						var fromLocation =  $scope.selectedItem.from;
						var fromIndex =  $scope.selectedItem.index;
						var toLocation = locationString;
						var toIndex = indexLocation;
						worked = current_mech.moveCritical(
							itemTag,
							fromLocation,
							fromIndex,
							toLocation,
							toIndex
						);

						if( worked ) {
							//console.log( "a", current_mech.criticals.head )
							current_mech.updateCriticalAllocationTable();
							//console.log("b", current_mech.criticals.head )
							current_mech._calc();
							//console.log("c", current_mech.criticals.head )
							localStorage["tmp.current_mech"] = current_mech.exportJSON();

							update_step_6_items($scope, current_mech);
							update_mech_status_bar_and_tro($scope, $translate, current_mech);

							$scope.selectedItem = null;
						} else {
							$scope.errorCannotPlace = true;
						}
					}

				}
			}


			// make tro for sidebar
			$scope.clickLowerRightArmActuator = function() {
				if( $scope.has_ra_lower_arm_actuator )
					current_mech.addLowerArmActuator("ra");
				else
					current_mech.removeLowerArmActuator("ra");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);

			}
			$scope.clickLowerLeftArmActuator = function() {
				if( $scope.has_la_lower_arm_actuator )
					current_mech.addLowerArmActuator("la");
				else
					current_mech.removeLowerArmActuator("la");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);

			}
			$scope.clickRightHandActuator = function() {

				if( $scope.has_ra_hand_actuator )
					current_mech.addHandActuator("ra");
				else
					current_mech.removeHandActuator("ra");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);

			}
			$scope.clickLeftHandActuator = function() {
				if( $scope.has_la_hand_actuator )
					current_mech.addHandActuator("la");
				else
					current_mech.removeHandActuator("la");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			$scope.resetAllocations = function() {
				$scope.selectedItem = null;
				current_mech.clearCriticalAllocationTable();
				current_mech._calc();
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

		}
	]
;

function update_step_6_items($scope, current_mech) {

	$scope.has_la_hand_actuator = current_mech.hasHandActuator("la");
	$scope.has_ra_hand_actuator = current_mech.hasHandActuator("ra");
	$scope.has_la_lower_arm_actuator = current_mech.hasLowerArmActuator("la");
	$scope.has_ra_lower_arm_actuator = current_mech.hasLowerArmActuator("ra");

//~ console.log(current_mech.criticals.head );
	current_mech.trimCriticals();

	$scope.battlemech_head = current_mech.criticals.head;

	$scope.battlemech_left_arm = current_mech.criticals.leftArm;

	$scope.battlemech_right_arm = current_mech.criticals.rightArm;

	$scope.battlemech_left_leg = current_mech.criticals.leftLeg;

	$scope.battlemech_right_leg = current_mech.criticals.rightLeg;

	$scope.battlemech_left_torso = current_mech.criticals.leftTorso;

	$scope.battlemech_center_torso = current_mech.criticals.centerTorso;

	$scope.battlemech_right_torso = current_mech.criticals.rightTorso;

	$scope.battlemech_unallocated_items = current_mech.unallocatedCriticals;
	//~ console.log( $scope.battlemech_head );
}

angular.module("webApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);


