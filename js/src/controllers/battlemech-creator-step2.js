var battlemechCreatorControllerStep2Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {

			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP2_TITLE', 'BM_STEP2_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP2_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP2_DESC )
					$scope.h3_title = translation.BM_STEP2_TITLE + ": " + translation.BM_STEP2_DESC;
				else
					$scope.h3_title = translation.BM_STEP2_TITLE;

				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];

			localStorage["backToPath"] = $location.$$path;

			update_walking_jumping_dropdowns( $scope, $translate, current_mech );
			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			// make tro for sidebar


			$scope.update_mech_walking = function() {
				current_mech.setWalkSpeed( $scope.mech_walking.selectedOption.id );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_walking_jumping_dropdowns( $scope, $translate, current_mech );
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			$scope.update_mech_jumping = function() {
				current_mech.setJumpSpeed( $scope.mech_jumping.selectedOption.id );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_walking_jumping_dropdowns( $scope, $translate, current_mech );
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}
		}
	]
;

function update_walking_jumping_dropdowns( $scope, $translate, current_mech ) {

	$translate(['BM_STEP2_SELECT_WALK', 'BM_STEP2_SELECT_JUMP', 'BM_MP_ABBR' ]).then(function (translation) {
		availble_walking_mp = [];
		availble_jumping_mp = [];
		selected_walking_mp = 0;
		selected_jumping_mp = 0;

		// TODO calculate the max engine size for tonnage
		max_walking = (400/ current_mech.tonnage);
		max_jumping = current_mech.getWalkSpeed();

		for( m_counter = 0; m_counter <= max_walking; m_counter++) {
			if( m_counter == 0 ) {
				availble_walking_mp.push( { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_WALK + " -"} );
				if( current_mech.getWalkSpeed() == m_counter) {
					selected_walking_mp = { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_WALK + " -"};
				}
			} else {
				availble_walking_mp.push( { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR} );
				if( current_mech.getWalkSpeed() == m_counter) {
					selected_walking_mp = { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR};
				}
			}
		}

		for( m_counter = 0; m_counter <= max_jumping; m_counter++) {
			if( m_counter == 0 ) {
				availble_jumping_mp.push( { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_JUMP + " -"} );
				if( current_mech.getJumpSpeed() == m_counter) {
					selected_jumping_mp = { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_JUMP + " -"};
				}
			} else {
				availble_jumping_mp.push( { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR} );
				if( current_mech.getJumpSpeed() == m_counter) {
					selected_jumping_mp = { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR};
				}
			}
		}

		$scope.mech_jumping = {
			availableOptions: availble_jumping_mp,
			selectedOption: selected_jumping_mp
		}

		$scope.mech_walking = {
			availableOptions: availble_walking_mp,
			selectedOption: selected_walking_mp
		}
	});
}


angular.module("webApp").controller(
	"battlemechCreatorControllerStep2",
	battlemechCreatorControllerStep2Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep2",
	battlemechCreatorControllerStep2Array
);


