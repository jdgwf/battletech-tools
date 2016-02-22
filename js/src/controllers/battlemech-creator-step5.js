angular.module("baseApp").controller(
	"battlemechCreatorControllerStep5",
	[
		'$rootScope',
		'$translate',
		'$scope',
		function ($rootScope, $translate, $scope) {


			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP5_TITLE', 'BM_STEP5_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP5_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP5_DESC )
					$scope.h3_title = translation.BM_STEP5_TITLE + ": " + translation.BM_STEP5_DESC;
				else
					$scope.h3_title = translation.BM_STEP5_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});
			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];
			// make tro for sidebar
			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			$scope.equipment_table =[];

			if( current_mech.getTech().tag == "clan") {
				// Use Clan Equipment Table...
				$scope.equipment_table = mechClanEquipment;
			} else {
				// Use Inner Sphere Equipment Table...
				$scope.equipment_table = mechISEquipment;
			}
			for(var eqc = 0; eqc < $scope.equipment_table.length; eqc++ ) {
				if( $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
					$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
				else
					$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ "en-US" ];

				if( $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
					$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
				else
					$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ "en-US" ];

				$scope.equipment_table[eqc].local_space = $scope.equipment_table[eqc].space.battlemech;

			}


			$translate(['BM_STEP5_SELECT_LOCATION' ]).then(function (translation) {


				$scope.item_locations = [];

				$scope.installed_equipment_table = current_mech.getInstalledEquipment();

				for(var eqc = 0; eqc < $scope.installed_equipment_table.length; eqc++ ) {
					if( $scope.installed_equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
						$scope.installed_equipment_table[eqc].local_name = $scope.installed_equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
					else
						$scope.installed_equipment_table[eqc].local_name = $scope.installed_equipment_table[eqc].name[ "en-US" ];

					if( $scope.installed_equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
						$scope.installed_equipment_table[eqc].local_category = $scope.installed_equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
					else
						$scope.installed_equipment_table[eqc].local_category = $scope.installed_equipment_table[eqc].category[ "en-US" ];

					$scope.installed_equipment_table[eqc].local_space = $scope.installed_equipment_table[eqc].space.battlemech;

					$scope.item_locations[eqc] = make_select_object($scope.installed_equipment_table[eqc].location);
				}


				var location_list = [];
				location_list.push( {
					id: "undefined",
					name: "- " + translation.BM_STEP5_SELECT_LOCATION + " -"
				} );
				for(loccount = 0; loccount < battlemechLocations.length; loccount++) {
					location_list.push( {
						id: battlemechLocations[loccount].tag,
						name: battlemechLocations[loccount].name[ localStorage["tmp.preferred_language"] ]
					} );

				}
				$scope.bm_location_list = {
					availableOptions: location_list //,
					// selectedOption: selected_jumping_mp
				};
			});




			$scope.addItem = function( index_number ) {
				if( $scope.equipment_table[index_number].tag ) {
					current_mech.addEquipmentFromTag( $scope.equipment_table[index_number].tag );
					update_mech_status_bar_and_tro($scope, $translate, current_mech);
					localStorage["tmp.current_mech"] = current_mech.exportJSON();
				}

			};

			$scope.removeItem = function( index_number ) {
				current_mech.removeEquipment( index_number );
				$scope.item_locations.splice(index_number, 1);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			};

			$scope.updateLocation = function( index_number ) {
				//console.log( "updateLocation", index_number );
	//			current_mech.removeEquipment( index_number );
				//console.log( "updateLocation", $scope.item_locations[index_number] );
				current_mech.setEquipmentLocation( index_number, $scope.item_locations[index_number].id );
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();


			};
		}
	]
);

function make_select_object(current_tag) {
	for(loccount = 0; loccount < battlemechLocations.length; loccount++) {
		if(  battlemechLocations[loccount].tag == current_tag ) {
			return {
				id: battlemechLocations[loccount].tag,
				name: battlemechLocations[loccount].name[ localStorage["tmp.preferred_language"] ]
			} ;
		}
	}
	return null
}