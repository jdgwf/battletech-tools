var battlemechCreatorControllerStep5Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		'$analytics',
		function ($rootScope, $translate, $scope, $location, $analytics) {


			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP5_TITLE', 'BM_STEP5_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP5_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP5_DESC )
					$scope.h3_title = translation.BM_STEP5_TITLE + ": " + translation.BM_STEP5_DESC;
				else
					$scope.h3_title = translation.BM_STEP5_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {
				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech.calc();
			}

			localStorage["backToPath"] = $location.$$path;

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];
			// make tro for sidebar
			updateMechStatusBarAndTRO($scope, $translate);

			$scope.filterEquipmentTerm = "";

			$scope.setCategory = function( selectedCategory ) {
				$scope.filterEquipment( localStorage["tmp.filterEquipmentTerm"], selectedCategory );
			}

			$scope.filterEquipment = function( newFilterTerm, selectedCategory ) {



				if( typeof(newFilterTerm) == "undefined" ) {
					$scope.filterEquipmentTerm = "";
				} else {
					$scope.filterEquipmentTerm = newFilterTerm;
				}

				if( typeof(selectedCategory) == "undefined" ) {
					$scope.selectedEquipmentCategory = "";
				} else {
					$scope.selectedEquipmentCategory = selectedCategory;
				}






				$scope.equipment_table =[];
				$scope.category_list =[];

				if( $scope.current_mech.getTech().tag == "clan") {
					// Use Clan Equipment Table...
					$scope.equipment_table = angular.copy( mechClanEquipment );
					$scope.category_list = angular.copy( mechClanEquipment );
				} else {
					// Use Inner Sphere Equipment Table...
					$scope.equipment_table = angular.copy( mechISEquipment );
					$scope.category_list = angular.copy( mechISEquipment );
				}



				$scope.mechIsStrict = false;
				if( $scope.current_mech.strictEra > 0 )
					$scope.mechIsStrict = true;

				selectedEra = $scope.current_mech.getEra();


				var ammunitionLocalName = "Ammunition";
				for(var eqc = $scope.category_list.length - 1; eqc > -1; eqc-- ) {

					if( $scope.category_list[eqc].category[ localStorage["tmp.preferred_language"] ])
						$scope.category_list[eqc].local_category = $scope.category_list[eqc].category[ localStorage["tmp.preferred_language"] ];
					else
						$scope.category_list[eqc].local_category = $scope.category_list[eqc].category[ "en-US" ];

					if( $scope.category_list[0].category["en-US"] == "Ammunition" )
						ammunitionLocalName = $scope.category_list[eqc].local_category;
				}



				if( $scope.selectedEquipmentCategory == "" ) {
					 $scope.selectedEquipmentCategory = $scope.category_list[0].local_category;


				}

				$scope.selectedOnAmmoCategory = false;

				if( $scope.selectedEquipmentCategory == ammunitionLocalName )
					$scope.selectedOnAmmoCategory = true;

				localStorage["tmp.filterEquipmentTerm"] = $scope.filterEquipmentTerm;
				localStorage["tmp.selectedEquipmentCategory"] = $scope.selectedEquipmentCategory;

				$scope.category_list.sort( sortByCategoryThenName );


				for(var eqc = $scope.category_list.length - 1; eqc > -1; eqc-- ) {
					if(
						eqc > 0
							&&
						$scope.category_list[eqc].local_category == $scope.category_list[eqc - 1].local_category
					) {
						$scope.category_list.splice( eqc, 1 );
					}
				}

				$scope.showAmmoNotification = false;
				for(var eqc = $scope.equipment_table.length - 1; eqc > -1; eqc-- ) {

					$scope.equipment_table[eqc].local_space = $scope.equipment_table[eqc].space.battlemech;

					if( $scope.equipment_table[eqc].variable_size ) {
						var numberOfCrits = 0;
						var itemWeight = 0;
						if(  $scope.equipment_table[eqc].criticals_divisior ) {
							numberOfCrits = Math.ceil( $scope.current_mech.getTonnage() / $scope.equipment_table[eqc].criticals_divisior);
							$scope.equipment_table[eqc].local_space = numberOfCrits;
						}
						if(  $scope.equipment_table[eqc].weight_divisior ) {
							itemWeight = Math.ceil( $scope.current_mech.getTonnage() / $scope.equipment_table[eqc].weight_divisior);
							$scope.equipment_table[eqc].weight = itemWeight;
						}
					}

					if( $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
						$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
					else
						$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ "en-US" ];

					if( $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
						$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
					else
						$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ "en-US" ];




					$scope.equipment_table[eqc].isInSelectedEra = false;

					if( getItemAvailability($scope.equipment_table[eqc], selectedEra) ) {
						$scope.equipment_table[eqc].isInSelectedEra = true;
					}

					$scope.equipment_table[eqc].isAvailableAmmoType = false;

					// Check if this is actually ammo
					if ( $scope.equipment_table[eqc].tag.indexOf("ammo") == -1 )
					{
						$scope.equipment_table[eqc].isAvailableAmmoType = true;
						$scope.showAmmoNotification = true;
					}

					// Scan the installed equipment to check if this item has the same tag (ammo always contains weapon tag)
					var installedEquipment = $scope.current_mech.getInstalledEquipment();
					for( var eCounter = 0; eCounter <  installedEquipment.length; eCounter++ )
					{
						if ( $scope.equipment_table[eqc].tag.indexOf( installedEquipment[ eCounter ].tag ) > -1 )
						{
							$scope.equipment_table[eqc].isAvailableAmmoType = true;
							$scope.showAmmoNotification = true;
						}
					}

					// Remove if filter doesn't match
					if(
						$scope.filterEquipmentTerm.trim().length > 2
							&&
						$scope.equipment_table[eqc].local_name.toLowerCase().indexOf( $scope.filterEquipmentTerm.toLowerCase().trim() ) === -1
					) {

						$scope.equipment_table.splice( eqc, 1 );
					} else {
						if( $scope.filterEquipmentTerm.trim().length < 3 ) {
						// remove if not current category
							if( $scope.selectedEquipmentCategory == "" ) {
								// set to first, then reshuffle.
								$scope.selectedEquipmentCategory = $scope.equipment_table[eqc].local_category
							}

							if(  $scope.equipment_table[eqc].local_category != $scope.selectedEquipmentCategory ) {
								$scope.equipment_table.splice( eqc, 1 );
							}
						}

					}


				}

				$scope.equipment_table.sort( sortByCategoryThenSortThenName );

			}

			$scope.filterEquipment( localStorage["tmp.filterEquipmentTerm"], localStorage["tmp.selectedEquipmentCategory"] );

			$translate(['BM_STEP5_SELECT_LOCATION' ]).then(function (translation) {


				$scope.item_locations = [];

				$scope.installed_equipment_table = $scope.current_mech.getInstalledEquipment();

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

					// $scope.item_locations[eqc] = make_select_object($scope.installed_equipment_table[eqc].location);
				}

				$scope.installed_equipment_table = $scope.installed_equipment_table.sort( sortBySortThenName );

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
					availableOptions: location_list
				};
			});

			$scope.addItem = function( index_number ) {
				if( $scope.equipment_table[index_number].tag ) {
					$analytics.eventTrack('Add', {  category: $scope.equipment_table[index_number].local_category, label: $scope.equipment_table[index_number].local_name });
					$scope.current_mech.addEquipmentFromTag( $scope.equipment_table[index_number].tag );
					updateMechStatusBarAndTRO($scope, $translate);
					localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

					$scope.installed_equipment_table = $scope.current_mech.getInstalledEquipment();

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

					}

					$scope.installed_equipment_table = $scope.installed_equipment_table.sort( sortBySortThenName );
				}
			};

			$scope.setRear = function( index_number, newValue ) {
				$scope.current_mech.setRear( index_number, !newValue );
				updateMechStatusBarAndTRO($scope, $translate);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			};

			$scope.removeItem = function( index_number ) {
				$scope.current_mech.removeEquipment( index_number );
				$scope.item_locations.splice(index_number, 1);
				$scope.filterEquipment( localStorage["tmp.filterEquipmentTerm"], localStorage["tmp.selectedEquipmentCategory"] )
				updateMechStatusBarAndTRO($scope, $translate);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

			};

			$scope.updateLocation = function( index_number ) {

				$scope.current_mech.setEquipmentLocation( index_number, $scope.item_locations[index_number].id );
				updateMechStatusBarAndTRO($scope, $translate);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();


			};
		}
	]
;

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



angular.module("webApp").controller(
	"battlemechCreatorControllerStep5",
	battlemechCreatorControllerStep5Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep5",
	battlemechCreatorControllerStep5Array
);

