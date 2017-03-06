var battlemechCreatorControllerStep4Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag

			$translate(['APP_TITLE', 'BM_STEP4_TITLE', 'BM_STEP4_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP4_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP4_DESC )
					$scope.h3_title = translation.BM_STEP4_TITLE + ": " + translation.BM_STEP4_DESC;
				else
					$scope.h3_title = translation.BM_STEP4_TITLE;
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
				$scope.current_mech._calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			update_step4_page_items($scope, $translate, $scope.current_mech);

			update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);

			localStorage["backToPath"] = $location.$$path;

			$scope.update_armor_weight = function() {
				$scope.current_mech.setArmorWeight( $scope.selected_armor_weight.id );
				update_step4_page_items($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.availableArmorTypes = [];



			//~ console.log( "$scope.selected_armor_type", $scope.selected_armor_type );

			for( var aCount = 0; aCount < mechArmorTypes.length; aCount++ ) {
				console.log( "mechArmorTypes[ aCount ].armormultiplier", mechArmorTypes[ aCount ].armormultiplier );
				console.log( "$scope.current_mech.getTech().tag", $scope.current_mech.getTech().tag );
				if( mechArmorTypes[ aCount ].armormultiplier[ $scope.current_mech.getTech().tag ] ) {
					$scope.availableArmorTypes.push( mechArmorTypes[ aCount ] );
				}

			}

			$translate(['BM_STEP4_UNAVAILABLE_PAREN']).then(function (translation) {

				var selectedEra = $scope.current_mech.era;

				for(var eqc = $scope.availableArmorTypes.length - 1; eqc > -1; eqc-- ) {
					if( $scope.availableArmorTypes[eqc].name[ localStorage["tmp.preferred_language"] ])
						$scope.availableArmorTypes[eqc].local_name = $scope.availableArmorTypes[eqc].name[ localStorage["tmp.preferred_language"] ];
					else
						$scope.availableArmorTypes[eqc].local_name = $scope.availableArmorTypes[eqc].name[ "en-US" ];

					//~ $scope.availableArmorTypes[eqc].local_space = $scope.availableArmorTypes[eqc].space.battlemech;

					$scope.availableArmorTypes[eqc].isInSelectedEra = false;

					if( $scope.current_mech.getArmorType() == $scope.availableArmorTypes[eqc].tag )
						$scope.selected_armor_type = $scope.availableArmorTypes[eqc];


					if( getItemAvailability($scope.availableArmorTypes[eqc], selectedEra) ) {
						$scope.availableArmorTypes[eqc].isInSelectedEra = true;
					} else {
						if( ! $scope.current_mech.strictEra > 0 )
							$scope.availableArmorTypes[eqc].local_name += translation.BM_STEP4_UNAVAILABLE_PAREN;
						else
							$scope.availableArmorTypes.splice( eqc, 1 );
					}


				}
			});


			$scope.update_armor_type = function( armorType ) {
				console.log( "update_armor_type", armorType );
				$scope.current_mech.setArmorType( armorType.tag );
				$scope.current_mech._calc();
				update_step4_page_items($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}


			$scope.allocate_max = function() {

				internal_structure = $scope.current_mech.getInteralStructure();
				//console.log( "internal_structure", internal_structure);
				centerTorsoArmor = internal_structure.centerTorso * 2;
				lrTorsoArmor = internal_structure.rightTorso * 2;

				centerTorsoArmorRear = Math.ceil(centerTorsoArmor * .2);
				centerTorsoArmor = centerTorsoArmor - centerTorsoArmorRear;

				lrTorsoArmorRear = Math.ceil(lrTorsoArmor * .2);
				lrTorsoArmor = lrTorsoArmor - lrTorsoArmorRear;

				$scope.current_mech.setRightTorsoArmor( lrTorsoArmor );
				$scope.current_mech.setCenterTorsoArmor( centerTorsoArmor );
				$scope.current_mech.setLeftTorsoArmor( lrTorsoArmor );

				$scope.current_mech.setRightTorsoRearArmor( lrTorsoArmorRear );
				$scope.current_mech.setCenterTorsoRearArmor( centerTorsoArmorRear );
				$scope.current_mech.setLeftTorsoRearArmor( lrTorsoArmorRear );

				$scope.current_mech.setRightLegArmor( internal_structure.rightLeg * 2 );
				$scope.current_mech.setLeftLegArmor( internal_structure.leftLeg * 2 );

				$scope.current_mech.setHeadArmor( 9 );

				if( $scope.current_mech.getType().class.toLowerCase() == "biped") {
					$scope.current_mech.setRightArmArmor( internal_structure.leftArm * 2 );
					$scope.current_mech.setLeftArmArmor( internal_structure.leftArm * 2 );
				} else {
					// quad
					$scope.current_mech.setRightArmArmor( internal_structure.rightLeg * 2 );
					$scope.current_mech.setLeftArmArmor( internal_structure.leftLeg * 2 );
				}

				update_step4_page_items($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.allocate_sanely = function() {

				total_armor = $scope.current_mech.getTotalArmor();
				internal_structure = $scope.current_mech.getInteralStructure();
				maximum_armor = $scope.current_mech.getMaxArmor();
				percentage = total_armor / maximum_armor;


				arm_armor = Math.floor(internal_structure.rightArm * 2 * percentage);
				torso_armor = Math.floor(internal_structure.rightTorso * 1.75 * percentage);
				leg_armor = Math.floor(internal_structure.rightLeg * 2 * percentage);
				rear_armor = Math.floor(internal_structure.rightTorso * .25 * percentage);;

				centerTorsoArmor = Math.floor(internal_structure.centerTorso * 1.75 * percentage);
				centerTorsoArmorRear = Math.floor(internal_structure.centerTorso * .25 * percentage);

				if( total_armor > arm_armor) {
					head_armor = arm_armor;
					if( head_armor > 9)
						head_armor = 9;
					if( total_armor >= head_armor) {
					   $scope.current_mech.setHeadArmor(head_armor);
					   total_armor -= head_armor;
					} else {
						$scope.current_mech.setHeadArmor(0);
					}
				}


				if( total_armor > torso_armor) {
				   $scope.current_mech.setRightTorsoArmor( torso_armor );
				   total_armor -= torso_armor;
				}

				if( total_armor > rear_armor) {
				   $scope.current_mech.setRightTorsoRearArmor( rear_armor );
					total_armor -= rear_armor;
				}

				if( total_armor > torso_armor) {
					$scope.current_mech.setLeftTorsoArmor( torso_armor );
					total_armor -= torso_armor;
				}
				if( total_armor > rear_armor) {
					$scope.current_mech.setLeftTorsoRearArmor( rear_armor );
				   total_armor -= rear_armor;
				}

				if( total_armor > leg_armor) {
					$scope.current_mech.setRightLegArmor( leg_armor );
					total_armor -= leg_armor;
				}

				if( total_armor > leg_armor) {
				   $scope.current_mech.setLeftLegArmor( leg_armor );
				   total_armor -= leg_armor;
				}

				if( total_armor > arm_armor) {
					$scope.current_mech.setRightArmArmor( arm_armor );
				   total_armor -= arm_armor;
				}
				if( total_armor > arm_armor) {
				   $scope.current_mech.setLeftArmArmor( arm_armor );
				   total_armor -= arm_armor;
				}

				if( total_armor > rear_armor) {
				   $scope.current_mech.setCenterTorsoRearArmor( centerTorsoArmorRear );
				   total_armor -= rear_armor;
				}

				$scope.current_mech.setCenterTorsoArmor( centerTorsoArmor ); // everything else goes to center torso! :)

				update_step4_page_items($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.clear_armor = function() {

				$scope.current_mech.setHeadArmor( 0 );

				$scope.current_mech.setRightTorsoArmor( 0 );
				$scope.current_mech.setRightTorsoRearArmor( 0 );


				$scope.current_mech.setLeftTorsoArmor( 0 );
				$scope.current_mech.setLeftTorsoRearArmor( 0 );

				$scope.current_mech.setRightLegArmor( 0 );
				$scope.current_mech.setLeftLegArmor( 0 );


				$scope.current_mech.setRightArmArmor( 0 );
				$scope.current_mech.setLeftArmArmor( 0 );

				$scope.current_mech.setCenterTorsoRearArmor( 0 );
				$scope.current_mech.setCenterTorsoArmor( 0 );

				update_step4_page_items($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.update_armor_allocation = function(armor_location) {
				console.log("armor_location", armor_location);
				if( armor_location == "hd") {
					console.log("setHeadArmor", $scope.armor_current_hd.id);
					$scope.current_mech.setHeadArmor( $scope.armor_current_hd.id );

				} else if( armor_location == "ra") {
					$scope.current_mech.setRightArmArmor( $scope.armor_current_ra.id );

				} else if( armor_location == "la") {
					$scope.current_mech.setLeftArmArmor( $scope.armor_current_la.id );

				} else if( armor_location == "rt") {
					$scope.current_mech.setRightTorsoArmor( $scope.armor_current_rt.id );

				} else if( armor_location == "ct") {
					$scope.current_mech.setCenterTorsoArmor( $scope.armor_current_ct.id );

				} else if( armor_location == "lt") {
					$scope.current_mech.setLeftTorsoArmor( $scope.armor_current_lt.id );

				} else if( armor_location == "rtr") {
					$scope.current_mech.setRightTorsoRearArmor( $scope.armor_current_rtr.id );

				} else if( armor_location == "ctr") {
					$scope.current_mech.setCenterTorsoRearArmor( $scope.armor_current_ctr.id );

				} else if( armor_location == "ltr") {
					$scope.current_mech.setLeftTorsoRearArmor( $scope.armor_current_ltr.id );

				} else if( armor_location == "rl") {
					$scope.current_mech.setRightLegArmor( $scope.armor_current_rl.id );

				} else if( armor_location == "ll") {
					$scope.current_mech.setLeftLegArmor( $scope.armor_current_ll.id );

				}
				update_step4_page_items($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

			}

		}
	]
;

function make_armor_select_dd_options(max_armor) {

	var return_armor = [];
	for( var ascount = 0; ascount <= max_armor; ascount++) {
		return_armor.push( {
				id: ascount,
				label: ascount
			}
		);
	}

	return return_armor;
}

function make_current_option(current_value) {
	var return_current = {
				id: current_value,
				label: current_value
			};
	return return_current;
}


function update_step4_page_items($scope, $translate, current_mech) {

	$translate([ 'BM_NO_ARMOR','BM_TON', 'BM_TONS', 'BM_STEP3_CRITICAL_REQUIRED',
		'BM_STEP3_CRITICAL_REQUIRED_NONE' , 'BM_STEP3_CRITICAL_REQUIRED_SINGLE',
		'BM_STEP4_MAX_ARMOR', 'BM_STEP4_TOTAL_ARMOR','BM_STEP4_UNALLOCATED_ARMOR'
	]).then(function (translation) {

		$scope.for_quad = false;
		$scope.for_biped = false;
		if( $scope.current_mech.getType().class == "quad")
			$scope.for_quad = true;
		else
			$scope.for_biped = true;

		// Update Armor Weight Selection Dropdown....
		current_armor_weight = $scope.current_mech.getArmorWeight();

		$scope.armor_weight_list = [];
		$scope.armor_weight_list.push( {
				id: 0,
				label: translation.BM_NO_ARMOR
			}
		);

		if( 0 == current_armor_weight) {
				$scope.selected_armor_weight = {
				id: 0,
				label: translation.BM_NO_ARMOR
				};
		}

		for( var hscount = 1; hscount <= $scope.current_mech.getMaxArmorTonnage() + 0.5; hscount = hscount + 0.5) {
			if( hscount == 1)
				tons_label = translation.BM_TON;
			else
				tons_label = translation.BM_TONS;

			$scope.armor_weight_list.push( {
					id: hscount,
					label: hscount + " " + tons_label
				}
			);

			if( hscount == current_armor_weight) {
				$scope.selected_armor_weight = {
					id: hscount,
					label: hscount + " " + tons_label
				};
			}

		}

		// Armor Stats Label...
		label_armor_stats = translation.BM_STEP4_MAX_ARMOR + ": " + $scope.current_mech.getMaxArmor() + "<br />";
		label_armor_stats += translation.BM_STEP4_TOTAL_ARMOR + ": " + $scope.current_mech.getTotalArmor() + "<br />";
		label_armor_stats += translation.BM_STEP4_UNALLOCATED_ARMOR + ": " + $scope.current_mech.getUnallocatedArmor() + "<br />";

		// Update Armor Select Dropdowns....
		armor_allocations = $scope.current_mech.getArmorAllocations();
		internal_structure = $scope.current_mech.getInteralStructure();


		$scope.armor_alloc_hd = make_armor_select_dd_options( 9 );
		$scope.armor_current_hd = make_current_option( armor_allocations.head );

		$scope.armor_alloc_ct = make_armor_select_dd_options( internal_structure.centerTorso * 2   - armor_allocations.centerTorsoRear);
		$scope.armor_current_ct = make_current_option( armor_allocations.centerTorso );

		$scope.armor_alloc_rt = make_armor_select_dd_options( internal_structure.rightTorso * 2  - armor_allocations.rightTorsoRear );
		$scope.armor_current_rt = make_current_option( armor_allocations.rightTorso );

		$scope.armor_alloc_lt = make_armor_select_dd_options( internal_structure.leftTorso * 2  - armor_allocations.leftTorsoRear );
		$scope.armor_current_lt = make_current_option( armor_allocations.leftTorso );

		$scope.armor_alloc_ctr = make_armor_select_dd_options( internal_structure.centerTorso * 2  - armor_allocations.centerTorso);
		$scope.armor_current_ctr = make_current_option( armor_allocations.centerTorsoRear );

		$scope.armor_alloc_rtr = make_armor_select_dd_options( internal_structure.rightTorso * 2 - armor_allocations.rightTorso);
		$scope.armor_current_rtr = make_current_option( armor_allocations.rightTorsoRear );

		$scope.armor_alloc_ltr = make_armor_select_dd_options( internal_structure.leftTorso * 2 - armor_allocations.leftTorso);
		$scope.armor_current_ltr = make_current_option( armor_allocations.leftTorsoRear );

		$scope.armor_alloc_ll = make_armor_select_dd_options( internal_structure.leftLeg * 2 );
		$scope.armor_current_ll = make_current_option( armor_allocations.leftLeg );

		$scope.armor_alloc_la = make_armor_select_dd_options( internal_structure.leftArm * 2 );
		$scope.armor_current_la = make_current_option( armor_allocations.leftArm );

		$scope.armor_alloc_rl = make_armor_select_dd_options( internal_structure.rightLeg * 2 );
		$scope.armor_current_rl = make_current_option( armor_allocations.rightLeg );

		$scope.armor_alloc_ra = make_armor_select_dd_options( internal_structure.rightArm * 2 );
		$scope.armor_current_ra = make_current_option( armor_allocations.rightArm );

		$scope.label_armor_stats = label_armor_stats;

	});
}


angular.module("webApp").controller(
	"battlemechCreatorControllerStep4",
	battlemechCreatorControllerStep4Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep4",
	battlemechCreatorControllerStep4Array
);

