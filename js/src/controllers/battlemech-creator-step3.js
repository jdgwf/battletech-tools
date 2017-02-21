var battlemechCreatorControllerStep3Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP3_TITLE', 'BM_STEP3_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP3_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP3_DESC )
					$scope.h3_title = translation.BM_STEP3_TITLE + ": " + translation.BM_STEP3_DESC;
				else
					$scope.h3_title = translation.BM_STEP3_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;


			});
			// create mech object, load from localStorage if exists
			current_mech = new Mech();
			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			if( localStorage["tmp.current_mech"] ) {
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				current_mech.uuid = generateUUID();
				current_mech._calc();
			}

			current_mech.useLang = localStorage["tmp.preferred_language"];

			var required_label = "";


			localStorage["backToPath"] = $location.$$path;

			$translate(['BM_STEP3_BM_INC_10_HS', 'BM_STEP3_BM_INC_10_DOUBLE_HS', 'BM_STEP3_CRITICAL_REQUIRED' ]).then(function (translation) {
				$scope.label_included_heatsinks = translation.BM_STEP3_BM_INC_10_HS;
				required_label = translation.BM_STEP3_CRITICAL_REQUIRED;
			});

			update_heat_sink_dropdown($scope, $translate, current_mech);

			update_mech_status_bar_and_tro($scope, $translate, current_mech);
			// make tro for sidebar
			$scope.selected_heat_sink_tech = current_mech.getHeatSinksType();

			$scope.update_selected_heat_sinks = function() {
				current_mech.setAdditionalHeatSinks( $scope.selected_heat_sinks.id );
				update_heat_sink_dropdown($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			}

			$scope.update_selected_heat_sink_tech = function() {
				console.log( "$scope.selected_heat_sink_tech", $scope.selected_heat_sink_tech);
				current_mech.setHeatSinksType( $scope.selected_heat_sink_tech );
				current_mech.clearHeatSinkCriticals();
				update_heat_sink_dropdown($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			}
		}
	]
;

function update_heat_sink_dropdown($scope, $translate, current_mech) {

	$translate([ 'BM_STEP3_CRITICAL_REQUIRED', 'BM_STEP3_CRITICAL_REQUIRED_NONE' , 'BM_STEP3_CRITICAL_REQUIRED_SINGLE'  ]).then(function (translation) {

		current_heat_sinks = current_mech.getHeatSinks() - 10;

		$scope.heat_sink_list = [];
		$scope.heat_sink_list.push( {
				id: 0,
				label: "None"
			}
		);

		if( 0 == current_heat_sinks) {
				$scope.selected_heat_sinks = {
				id: 0,
				label: "None"
				};
		}

		remaining_tonnage = Math.floor( current_mech.getRemainingTonnage() )
		if( remaining_tonnage < 0)
			remaining_tonnage = 0;
		for( var hscount = 1; hscount <= remaining_tonnage + current_heat_sinks; hscount++) {
			$scope.heat_sink_list.push( {
					id: hscount,
					label: hscount
				}
			);

			if( hscount == current_heat_sinks) {
				$scope.selected_heat_sinks = {
					id: hscount,
					label: hscount
				};
			}

		}
		var heat_sinks_required = current_mech.getHeatSinkCriticalRequirements();
		if( heat_sinks_required ) {
			the_label = translation.BM_STEP3_CRITICAL_REQUIRED;
			the_label_single = translation.BM_STEP3_CRITICAL_REQUIRED_SINGLE;
			the_label_none = translation.BM_STEP3_CRITICAL_REQUIRED_NONE;
			//~ console.log( "heat_sinks_required", heat_sinks_required);
			$scope.hs_crits_required = heat_sinks_required.number * heat_sinks_required.slots_each;
			hs_crit_count = heat_sinks_required.number * heat_sinks_required.slots_each;
			if( hs_crit_count < 0)
				hs_crit_count = 0;
			if( hs_crit_count == 1) {
				$scope.label_criticals_required = the_label_single.replace("{hs_crits_required}", hs_crit_count);
			} else if ( hs_crit_count == 0) {
				$scope.label_criticals_required = the_label_none.replace("{hs_crits_required}", hs_crit_count);
			} else {
				$scope.label_criticals_required = the_label.replace("{hs_crits_required}", hs_crit_count);
			}
		}


	});
}


angular.module("webApp").controller(
	"battlemechCreatorControllerStep3",
	battlemechCreatorControllerStep3Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep3",
	battlemechCreatorControllerStep3Array
);

