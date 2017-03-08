var battlemechCreatorControllerStep1Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(
				[
					'APP_TITLE', 'BM_STEP1_TITLE', 'BM_STEP1_DESC', 'WELCOME_BUTTON_MECH_CREATOR'
				]
			).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP1_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP1_DESC )
					$scope.h3_title = translation.BM_STEP1_TITLE + ": " + translation.BM_STEP1_DESC;
				else
					$scope.h3_title = translation.BM_STEP1_TITLE;

				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});
			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}
			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];


			updateMechStatusBarAndTRO($scope, $translate);

			$scope.selectedStrict = false;

			if( $scope.current_mech.strictEra > 0 )
				$scope.selectedStrict = true;

			$scope.update_mech_era_strict = function( newValue ) {
				if( newValue )
					$scope.current_mech.strictEra = 1;
				else
					$scope.current_mech.strictEra = 0;
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				updateMechStatusBarAndTRO($scope, $translate);
			}

			// fill out current data in forms
			$scope.mech_name = $scope.current_mech.getName();
			translated_btTechOptions = [];
			translated_mechTypeOptions = [];
			translated_btEraOptions = [];

			for( var filter_counter = 0; filter_counter < btTechOptions.length; filter_counter++) {
				var push = Object.create(btTechOptions[filter_counter]);
				if( push.name[ localStorage["tmp.preferred_language"] ] ) {
					push.name = push.name[ localStorage["tmp.preferred_language"] ];
					translated_btTechOptions.push( push );
				} else {
					push.name = "( " + localStorage["tmp.preferred_language"] + " - " + push.name["en-US"] + ")";
					translated_btTechOptions.push( push );
				}
			}

			for( var filter_counter = 0; filter_counter < mechTypeOptions.length; filter_counter++) {
				var push = Object.create(mechTypeOptions[filter_counter]);
				if( push.name[localStorage["tmp.preferred_language"]] ) {
					push.name = push.name[localStorage["tmp.preferred_language"]];
					translated_mechTypeOptions.push( push );
				} else {
					push.name = "( " + localStorage["tmp.preferred_language"] + " - " + push.name["en-US"] + ")";
					translated_mechTypeOptions.push( push );
				}
			}

			for( var filter_counter = 0; filter_counter < btEraOptions.length; filter_counter++) {
				var push = Object.create(btEraOptions[filter_counter]);
				if( push.name[localStorage["tmp.preferred_language"]] ) {
					push.name = push.name[localStorage["tmp.preferred_language"]];
					translated_btEraOptions.push( push );
				} else {
					push.name = "( " + localStorage["tmp.preferred_language"] + " - " + push.name["en-US"] + ")";
					translated_btEraOptions.push( push );
				}
			}


			$scope.mech_is_options = [];
			for( var filter_counter = 0; filter_counter < mechInternalStructureTypes.length; filter_counter++) {
				var push = Object.create(mechInternalStructureTypes[filter_counter]);
				if( push.name[ localStorage["tmp.preferred_language"] ] ) {
					push.name = push.name[ localStorage["tmp.preferred_language"] ];
					$scope.mech_is_options.push( push );
				} else {
					push.name = "( " + localStorage["tmp.preferred_language"] + " - " + push.name["en-US"] + ")";
					$scope.mech_is_options.push( push );
				}

				if( $scope.current_mech.getInternalStructureType() == mechInternalStructureTypes[filter_counter].tag)
					$scope.mech_selected_is_type = push;
			}
			if( !$scope.mech_selected_is_type )
				$scope.mech_selected_is_type = $scope.mech_is_options[0];

			$scope.mech_tech = {
				availableOptions: translated_btTechOptions,
				selectedOption: $scope.current_mech.getTech()
			};

			$scope.mech_type = {
				availableOptions: translated_mechTypeOptions,
				selectedOption: $scope.current_mech.getType()
			};

			$scope.mech_era = {
				availableOptions: translated_btEraOptions,
				selectedOption: $scope.current_mech.getEra()
			};

			var tonnageOptions = [];

			for(var tonnage = 20;	tonnage <= 100; tonnage = tonnage + 5) {
				tonnageOptions.push(tonnage);
			}

			$scope.mech_tonnage_options = tonnageOptions;
			// $scope.mech_tonnage.selectedOption = $scope.current_mech.getTonnage();
			$scope.mech_tonnage = {
				availableOptions: tonnageOptions,
				selectedOption: $scope.current_mech.getTonnage()
			};

			// update functions
			$scope.update_mech_name = function() {
				$scope.current_mech.setName( $scope.mech_name );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				updateMechStatusBarAndTRO($scope, $translate);
			};

			$scope.update_mech_tech = function() {
				$scope.current_mech.setTech( $scope.mech_tech.selectedOption.id );

				$scope.mech_era.selectedOption = $scope.current_mech.getEra();

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				updateMechStatusBarAndTRO($scope, $translate);
			};

			$scope.update_mechType = function() {
				$scope.current_mech.setMechType( $scope.mechType.selectedOption.id );
				// Remove any assigned criticals in the arms...
				$scope.current_mech.clearArmCriticalAllocationTable();
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				updateMechStatusBarAndTRO($scope, $translate);
			};

			$scope.update_mech_era = function() {
				$scope.current_mech.setEra( $scope.mech_era.selectedOption.id );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				updateMechStatusBarAndTRO($scope, $translate);
			};

			$scope.update_mech_tonnage = function() {
				$scope.current_mech.setTonnage( $scope.mech_tonnage.selectedOption );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				updateMechStatusBarAndTRO($scope, $translate);
			};

			$scope.update_mech_selected_is_type = function( newISType ) {
				//~ console.log( "newISType", newISType );
				//~ console.log( "$scope.mech_selected_is_type.tag", $scope.mech_selected_is_type.tag );
				$scope.current_mech.setInternalStructureType( $scope.mech_selected_is_type.tag );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				updateMechStatusBarAndTRO($scope, $translate);
			}

		}
	]
;



angular.module("webApp").controller(
	"battlemechCreatorControllerStep1",
	battlemechCreatorControllerStep1Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep1",
	battlemechCreatorControllerStep1Array
);
