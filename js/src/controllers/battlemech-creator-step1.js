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
			current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];


			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			$scope.selectedStrict = false;

			if( current_mech.strictEra > 0 )
				$scope.selectedStrict = true;

			$scope.update_mech_era_strict = function( newValue ) {
				if( newValue )
					current_mech.strictEra = 1;
				else
					current_mech.strictEra = 0;
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			// fill out current data in forms
			$scope.mech_name = current_mech.getName();
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

			$scope.mech_tech = {
				availableOptions: translated_btTechOptions,
				selectedOption: current_mech.getTech()
			};

			$scope.mech_type = {
				availableOptions: translated_mechTypeOptions,
				selectedOption: current_mech.getType()
			};

			$scope.mech_era = {
				availableOptions: translated_btEraOptions,
				selectedOption: current_mech.getEra()
			};

			var tonnageOptions = [];

			for(var tonnage = 20;	tonnage <= 100; tonnage = tonnage + 5) {
				tonnageOptions.push(tonnage);
			}

			$scope.mech_tonnage_options = tonnageOptions;
			// $scope.mech_tonnage.selectedOption = current_mech.getTonnage();
			$scope.mech_tonnage = {
				availableOptions: tonnageOptions,
				selectedOption: current_mech.getTonnage()
			};
			// make tro for sidebar


			// update functions
			$scope.update_mech_name = function() {
				current_mech.setName( $scope.mech_name );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			};

			$scope.update_mech_tech = function() {
				current_mech.setTech( $scope.mech_tech.selectedOption.id );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			};

			$scope.update_mech_type = function() {
				current_mech.setMechType( $scope.mech_type.selectedOption.id );
				// Remove any assigned criticals in the arms...
				current_mech.clearArmCriticalAllocationTable();
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			};

			$scope.update_mech_era = function() {
				current_mech.setEra( $scope.mech_era.selectedOption.id );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			};

			$scope.update_mech_tonnage = function() {
				current_mech.setTonnage( $scope.mech_tonnage.selectedOption );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			};

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
