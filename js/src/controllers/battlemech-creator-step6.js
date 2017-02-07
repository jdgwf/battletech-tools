var battlemechCreatorControllerStep6Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		function ($rootScope, $translate, $scope) {
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
				current_mech.clearCriticalAllocationTable();
				current_mech._calc();
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			$scope.updateCriticialController = {
				accept: function (sourceItemHandleScope, destSortableScope, destItemScope) {
					// console.log("sourceItemHandleScope", sourceItemHandleScope);
					// console.log("destSortableScope", destSortableScope);
					// console.log("destItemScope", destItemScope);

					// this should work if I can ever get the destination slot number...

					// deny access to 'write over' other items
					if( typeof(destItemScope) == "undefined" || typeof(destItemScope.modelValue) == "undefined") {



						if( sourceItemHandleScope && sourceItemHandleScope.modelValue && sourceItemHandleScope.modelValue.tag) {
							//return current_mech.canBeAssignedToArea(
							//	destSortableScope.modelValue,
							//	sourceItemHandleScope.modelValue,
							//	sourceItemHandleScope.modelValue.crits,
							//	slot_number
							//);
							can_be_assigned = true;
						//	console.log( sourceItemHandleScope.modelValue.tag );
							if ( sourceItemHandleScope.modelValue.tag == "jj-standard" || sourceItemHandleScope.modelValue.tag == "jj-enhanced"  ) {
								// Jump Jets can only be put on Torsos and Legs
								if(
								 	destSortableScope.element[0].classList.contains("location-lt")
									 	||
								 	destSortableScope.element[0].classList.contains("location-rt")
									 	||
								 	destSortableScope.element[0].classList.contains("location-ct")
								 		||
								 	destSortableScope.element[0].classList.contains("location-ll")
								 		||
								 	destSortableScope.element[0].classList.contains("location-rl")
								) {
									// Yep, user put it in the right place.
								//console.log( "accept", "Good placement of JJ");
								 	return can_be_assigned;
								} else {
									// DENIED This mech is not Iron Man.
									//console.log( "accept", "DENIED This mech is not Iron Man.");
								 	return false;
								}
							} else {
								// Not a jump jet...
								//console.log( "accept", "Not a jump jet");
								return can_be_assigned;
							}
						} else {
							// empty item - modelValue disappears after being moved more than once.
							//console.log( "accept", "Empty Item.");
							return true;
						}
					} else {
						// deny "placing over" existing items
						return true;
					}
					//return true;
				},
				itemMoved: function (eventObj) {
					//console.log("moving it...");
					current_mech.updateCriticalAllocationTable();
					current_mech._calc();
					localStorage["tmp.current_mech"] = current_mech.exportJSON();

					update_step_6_items($scope, current_mech);
					update_mech_status_bar_and_tro($scope, $translate, current_mech);
					return true;

				},
				orderChanged: function(eventObj) {
					current_mech.updateCriticalAllocationTable();
					current_mech._calc();
					localStorage["tmp.current_mech"] = current_mech.exportJSON();

					update_step_6_items($scope, current_mech);
					update_mech_status_bar_and_tro($scope, $translate, current_mech);
					return true;

				},
				//containment: '#board'//optional param.
				//clone: true, //optional param for clone feature.
				allowDuplicates: false //optional param allows duplicates to be dropped.
			};
		}
	]
;

function update_step_6_items($scope, current_mech) {

	$scope.has_la_hand_actuator = current_mech.hasHandActuator("la");
	$scope.has_ra_hand_actuator = current_mech.hasHandActuator("ra");
	$scope.has_la_lower_arm_actuator = current_mech.hasLowerArmActuator("la");
	$scope.has_ra_lower_arm_actuator = current_mech.hasLowerArmActuator("ra");

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
	console.log( $scope.battlemech_right_arm );
}

angular.module("webApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);


