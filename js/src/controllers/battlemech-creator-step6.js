angular.module("baseApp").controller(
	"battlemechCreatorControllerStep6",
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
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			$scope.updateCrticialController = {
				accept: function (sourceItemHandleScope, destSortableScope) {
					//console.log("unallocatedControl - accept");
					return true;
				},	//override to determine drag is allowed or not. default is true.
				itemMoved: function (event) {
					//console.log(event);
					current_mech.updateCriticalAllocationTable();
					localStorage["tmp.current_mech"] = current_mech.exportJSON();
					current_mech._calc();
					update_step_6_items($scope, current_mech);
					update_mech_status_bar_and_tro($scope, $translate, current_mech);
				},
				orderChanged: function(event) {
					current_mech.updateCriticalAllocationTable();
					localStorage["tmp.current_mech"] = current_mech.exportJSON();
					current_mech._calc();
					update_step_6_items($scope, current_mech);
					update_mech_status_bar_and_tro($scope, $translate, current_mech);
					return false;
				},
				//containment: '#board'//optional param.
				//clone: true, //optional param for clone feature.
				allowDuplicates: false //optional param allows duplicates to be dropped.
			};
		}
	]
);

function update_step_6_items($scope, current_mech) {

	$scope.has_la_hand_actuator = current_mech.hasHandActuator("la");
	$scope.has_ra_hand_actuator = current_mech.hasHandActuator("ra");
	$scope.has_la_lower_arm_actuator = current_mech.hasLowerArmActuator("la");
	$scope.has_ra_lower_arm_actuator = current_mech.hasLowerArmActuator("ra");


	$scope.battlemech_head = current_mech.criticals.head;

	$scope.battlemech_left_arm = current_mech.criticals.leftArm;

	$scope.battlemech_right_arm = current_mech.criticals.rightArm;

	$scope.battlemech_left_leg = current_mech.criticals.leftLeg;

	$scope.battlemech_right_leg = current_mech.criticals.rightLeg;

	$scope.battlemech_left_torso = current_mech.criticals.leftTorso;

	$scope.battlemech_center_torso = current_mech.criticals.centerTorso;

	$scope.battlemech_right_torso = current_mech.criticals.rightTorso;

	$scope.battlemech_unallocated_items = current_mech.unallocatedCriticals;
}

