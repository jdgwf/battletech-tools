var battlemechCreatorControllerStep2Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {

			// make tro for sidebar
			$scope.update_walking_jumping_dropdowns = function( translate ) {

				$translate(['BM_STEP2_SELECT_WALK', 'BM_STEP2_SELECT_JUMP', 'BM_MP_ABBR' ]).then(function (translation) {
					availble_walking_mp = [];
					availble_jumping_mp = [];
					selected_walking_mp = 0;
					selected_jumping_mp = 0;

					// Calculate the max engine size for tonnage
					max_walking = (400/ $scope.current_mech.tonnage);
					max_jumping = $scope.current_mech.getWalkSpeed();

					for( m_counter = 0; m_counter <= max_walking; m_counter++) {
						if( m_counter == 0 ) {
							availble_walking_mp.push( { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_WALK + " -"} );
							if( $scope.current_mech.getWalkSpeed() == m_counter) {
								selected_walking_mp = { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_WALK + " -"};
							}
						} else {
							availble_walking_mp.push( { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR} );
							if( $scope.current_mech.getWalkSpeed() == m_counter) {
								selected_walking_mp = { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR};
							}
						}
					}

					for( m_counter = 0; m_counter <= max_jumping; m_counter++) {
						if( m_counter == 0 ) {
							availble_jumping_mp.push( { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_JUMP + " -"} );
							if( $scope.current_mech.getJumpSpeed() == m_counter) {
								selected_jumping_mp = { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_JUMP + " -"};
							}
						} else {
							availble_jumping_mp.push( { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR} );
							if( $scope.current_mech.getJumpSpeed() == m_counter) {
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

			$scope.update_engine_dropdowns = function( translate ) {
				var selected_option = null;
				var availble_options = [];

				for( var lCount = mechEngineTypes.length - 1; lCount > -1; lCount -- ) {
					if(
						getItemAvailability (mechEngineTypes[ lCount ], $scope.current_mech.getEra() )
							&&
						// Make sure that the engine is available to the tech selected
						(
							mechEngineTypes[ lCount ].criticals[ $scope.current_mech.getTech().tag ]
						)
					) {
						var localName = "";
						if( mechEngineTypes[ lCount ].name[ localStorage["tmp.preferred_language"] ] ) {
							localName = mechEngineTypes[ lCount ].name[ localStorage["tmp.preferred_language"] ];
						} else {
							localName = mechEngineTypes[ lCount ].name[ "en-US" ];
						}
						// get local name
						availble_options.push( {
							id: mechEngineTypes[ lCount ].tag,
							local_name: localName
						} );
						// add item to drop down
					}
				}

				if( $scope.current_mech.engineType) {

					for( var lCount = 0; lCount < availble_options.length; lCount++ ) {
						if( availble_options[ lCount ].id == $scope.current_mech.engineType.tag ) {
							selected_option = availble_options[ lCount ];
						}
					}

				}

				if( selected_option == null )
					selected_option = availble_options[0];

				$scope.mech_engine = {
					availableOptions: availble_options,
					selectedOption: selected_option
				}
			}

			$scope.update_mech_engine = function() {
				$scope.current_mech.setEngineType( $scope.mech_engine.selectedOption.id );

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				updateMechStatusBarAndTRO($scope, $translate);
			}

			$scope.update_gyro_dropdowns = function( translate ) {
				var selected_option = null;
				var availble_options = [];

				for( var lCount = mechGyroTypes.length - 1; lCount > -1; lCount -- ) {
					if( getItemAvailability(mechGyroTypes[ lCount ], $scope.current_mech.getEra()) ) {
						var localName = "";
						if( mechGyroTypes[ lCount ].name[ localStorage["tmp.preferred_language"] ] ) {
							localName = mechGyroTypes[ lCount ].name[ localStorage["tmp.preferred_language"] ];
						} else {
							localName = mechGyroTypes[ lCount ].name[ "en-US" ];
						}
						// get local name
						availble_options.push( {
							id: mechGyroTypes[ lCount ].tag,
							local_name: localName
						} );
						// add item to drop down
					}
				}

				if( $scope.current_mech.gyro) {

					for( var lCount = 0; lCount < availble_options.length; lCount++ ) {
						if( availble_options[ lCount ].id == $scope.current_mech.getGyro().tag ) {
							selected_option = availble_options[ lCount ];
						}
					}

				}

				if( selected_option == null )
					selected_option = availble_options[0];
				$scope.mech_gyro = {
					availableOptions: availble_options,
					selectedOption: selected_option
				}
			}

			$scope.update_mech_gyro = function() {

				$scope.current_mech.setGyroType( $scope.mech_gyro.selectedOption.id );

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				updateMechStatusBarAndTRO($scope, $translate);
			}

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
			$scope.current_mech = new Mech();
			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech.calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			localStorage["backToPath"] = $location.$$path;

			$scope.update_walking_jumping_dropdowns( $translate );
			updateMechStatusBarAndTRO($scope, $translate);

			$scope.update_engine_dropdowns( $translate );
			$scope.update_gyro_dropdowns( $translate );


			$scope.update_mech_walking = function() {
				$scope.current_mech.setWalkSpeed( $scope.mech_walking.selectedOption.id );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				$scope.update_walking_jumping_dropdowns( $translate );
				updateMechStatusBarAndTRO($scope, $translate, $scope.current_mech );
			}

			$scope.update_mech_jumping = function() {
				$scope.current_mech.setJumpSpeed( $scope.mech_jumping.selectedOption.id );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				$scope.update_walking_jumping_dropdowns( $scope, $translate );
				updateMechStatusBarAndTRO($scope, $translate, $scope.current_mech );
			}
		}
	]
;



angular.module("webApp").controller(
	"battlemechCreatorControllerStep2",
	battlemechCreatorControllerStep2Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep2",
	battlemechCreatorControllerStep2Array
);


