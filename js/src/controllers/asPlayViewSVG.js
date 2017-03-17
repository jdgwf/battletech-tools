var asPlayViewSVGArray = [
	'$rootScope',
	'$translate',
	'$scope',
	'$http',
	'$location',
	function ($rootScope, $translate, $scope, $http, $location) {
		$rootScope.showSciFiCreatorMenu = false;
		$rootScope.showChargenMenu = false;
		$translate(['APP_TITLE', 'INDEX_WELCOME']).then(function (translation) {
			$rootScope.title_tag = translation.INDEX_WELCOME + " | " + translation.APP_TITLE;
			$rootScope.subtitle_tag = translation.INDEX_WELCOME;
		});

		$scope.goHome = function() {
			delete(localStorage["backToPath"]);
			$location.url("/");
		}

		$scope.activeView = true;

		localStorage["backToPath"] = $location.$$path;

		incomingLance = Array();
		$scope.currentLances = Array()
		if( localStorage["as_builder_current_lances"] ) {
			incomingLances = JSON.parse(localStorage["as_builder_current_lances"]);
			for( var lanceCount = 0; lanceCount < incomingLances.length; lanceCount++) {
				var incomingLance = new asGroup();

				if( incomingLances[lanceCount].customName )
					incomingLance.customName = incomingLances[lanceCount].customName;
				//incomingLance[lanceCount];

				for( var mechCount = 0; mechCount < incomingLances[lanceCount].members.length; mechCount++) {
					if( incomingLances[lanceCount].members[mechCount] != null ) {
						var incomingMech = new asUnit( incomingLances[lanceCount].members[mechCount] );
						incomingLance.members.push( incomingMech );
					}
				}

				$scope.currentLances.push( incomingLance );
			}
		}

		if( $scope.currentLances.length == 0) {
			$scope.currentLances.push( new asGroup() );
		}

		$scope.viewingLance = 0;
		if( localStorage["as_builder_current_play_page"] && localStorage["as_builder_current_play_page"] < $scope.currentLances.length )
			$scope.viewingLance = localStorage["as_builder_current_play_page"];

		$scope.setHeat = function(mechObject, newValue) {
			mechObject.setHeat( newValue );

			$scope.saveToLS();

		}



		$scope.changePage = function(newPage) {
			$scope.viewingLance = newPage;
			$scope.saveToLS();
		}

		$scope.toggleStructure = function(mechObject, indexValue) {

			if( mechObject.currentStructure[indexValue] )
				mechObject.currentStructure[indexValue] = false;
			else
				mechObject.currentStructure[indexValue] = true;

			mechObject.calcCurrentVals();

			$scope.saveToLS();

		}

		$scope.toggleArmor = function(mechObject, indexValue) {

			if( mechObject.currentArmor[indexValue] )
				mechObject.currentArmor[indexValue] = false;
			else
				mechObject.currentArmor[indexValue] = true;

			mechObject.calcCurrentVals();

			$scope.saveToLS();

		}


		$scope.toggleEngineCrit = function(mechObject, indexValue) {

			if( mechObject.engineHits[indexValue] )
				mechObject.engineHits[indexValue] = false;
			else
				mechObject.engineHits[indexValue] = true;

			mechObject.calcCurrentVals();

			$scope.saveToLS();

		}

		$scope.toggleFireControlCrit = function(mechObject, indexValue) {

			if( mechObject.fireControlHits[indexValue] )
				mechObject.fireControlHits[indexValue] = false;
			else
				mechObject.fireControlHits[indexValue] = true;

			mechObject.calcCurrentVals();

			$scope.saveToLS();

		}

		$scope.toggleMPCrit = function(mechObject, indexValue) {

			if( mechObject.mpControlHits[indexValue] )
				mechObject.mpControlHits[indexValue] = false;
			else
				mechObject.mpControlHits[indexValue] = true;

			mechObject.calcCurrentVals();

			$scope.saveToLS();

		}

		$scope.toggleWeaponCrit = function(mechObject, indexValue) {

			if( mechObject.weaponHits[indexValue] )
				mechObject.weaponHits[indexValue] = false;
			else
				mechObject.weaponHits[indexValue] = true;

			mechObject.calcCurrentVals();

			console.log( mechObject.weaponHits );

			$scope.saveToLS();

		}

		$scope.takeDamage = function(mechObject, damageAmount) {
			if( typeof(damageAmount) == "undefined")
				damageAmount = 1;
			mechObject.takeDamage( damageAmount );

			mechObject.showDamageBar = false;
			$scope.saveToLS();

		}

		$scope.showDamageSelect = function( mechObject ) {
			mechObject.showDamageBar = true;
		}

		$scope.updateMemberCounts = function() {
			for( lanceCount = 0; lanceCount < $scope.currentLances.length; lanceCount++ ) {
				$scope.currentLances[lanceCount].getActiveMembers();
			}
		}

		$scope.saveToLS = function() {

			$scope.updateMemberCounts();

			localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
			localStorage["as_builder_current_play_page"] = $scope.viewingLance;
		}


		/*
		 * SVG JS Functions - all called from "outside" via onclicks in battlemech_record_sheet.js
		 */

		$scope.setMechHeat = function( newHeatValue, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				$scope.currentLances[groupIndex].members[mechIndex].setHeat( newHeatValue );

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.toggleArmorPip = function( armorIndex, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				if( $scope.currentLances[groupIndex].members[mechIndex].currentArmor[ armorIndex ] ) {
					$scope.currentLances[groupIndex].members[mechIndex].currentArmor[ armorIndex ] = false;
				} else {
					$scope.currentLances[groupIndex].members[mechIndex].currentArmor[ armorIndex ] = true;
				}

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.toggleStructPip = function( structIndex, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				if( $scope.currentLances[groupIndex].members[mechIndex].currentStructure[ structIndex ] ) {
					$scope.currentLances[groupIndex].members[mechIndex].currentStructure[ structIndex ] = false;
				} else {
					$scope.currentLances[groupIndex].members[mechIndex].currentStructure[ structIndex ] = true;
				}

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.toggleEngineHit = function( critIndex, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				if( $scope.currentLances[groupIndex].members[mechIndex].engineHits[ critIndex ] ) {
					$scope.currentLances[groupIndex].members[mechIndex].engineHits[ critIndex ] = false;
				} else {
					$scope.currentLances[groupIndex].members[mechIndex].engineHits[ critIndex ] = true;
				}

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.toggleControlHit = function( critIndex, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				if( $scope.currentLances[groupIndex].members[mechIndex].fireControlHits[ critIndex ] ) {
					$scope.currentLances[groupIndex].members[mechIndex].fireControlHits[ critIndex ] = false;
				} else {
					$scope.currentLances[groupIndex].members[mechIndex].fireControlHits[ critIndex ] = true;
				}

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.toggleMPHit = function( critIndex, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				if( $scope.currentLances[groupIndex].members[mechIndex].mpControlHits[ critIndex ] ) {
					$scope.currentLances[groupIndex].members[mechIndex].mpControlHits[ critIndex ] = false;
				} else {
					$scope.currentLances[groupIndex].members[mechIndex].mpControlHits[ critIndex ] = true;
				}

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.toggleWeaponHit = function( critIndex, groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				if( $scope.currentLances[groupIndex].members[mechIndex].weaponHits[ critIndex ] ) {
					$scope.currentLances[groupIndex].members[mechIndex].weaponHits[ critIndex ] = false;
				} else {
					$scope.currentLances[groupIndex].members[mechIndex].weaponHits[ critIndex ] = true;
				}

				$scope.updateMemberCounts();

				localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
				localStorage["as_builder_current_play_page"] = $scope.viewingLance;
			}
		}

		$scope.showDamagePopup = function( groupIndex, mechIndex ) {
			if( $scope.currentLances[groupIndex]
				&&
				$scope.currentLances[groupIndex].members[mechIndex]
			) {
				$scope.currentLances[groupIndex].members[mechIndex].showDamageBar = true;
			}
		}

		//~ console.log($scope.currentLance);
		$scope.updateMemberCounts();
	}
];
angular.module("webApp").controller(
	"asPlayViewSVGController",
	asPlayViewSVGArray
);

angular.module("cordovaApp").controller(
	"asPlayViewSVGController",
	asPlayViewSVGArray
);



