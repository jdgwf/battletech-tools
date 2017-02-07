var asBuilderArray = [
	'$rootScope',
	'$translate',
	'$scope',
	'$http',
	function ($rootScope, $translate, $scope, $http) {
		$rootScope.showSciFiCreatorMenu = false;
		$rootScope.showChargenMenu = false;

		$translate(['APP_TITLE', 'WELCOME_BUTTON_ALPHA_STRIKE']).then(function (translation) {
			$rootScope.title_tag = translation.WELCOME_BUTTON_ALPHA_STRIKE + " | " + translation.APP_TITLE;
			$rootScope.subtitle_tag = translation.WELCOME_BUTTON_ALPHA_STRIKE;

		});


		$scope.addToOptions = Array();
		$scope.activeView = false;

		$scope.rulesFilter = "Standard";
		$scope.techFilter = "";

		$scope.addToGroup = null;

		$scope.setRulesFilter = function(newFilter) {
			$scope.rulesFilter = newFilter;
			$scope.updateMULList();
		}

		$scope.setTechFilter = function(newFilter) {
			$scope.techFilter = newFilter;
			$scope.updateMULList();
		}

		$scope.updateMemberCounts = function() {
			for( lanceCount = 0; lanceCount < $scope.currentLances.length; lanceCount++ ) {
				$scope.currentLances[lanceCount].getActiveMembers();
			}
		}

		$scope.filterMechRules = function() {
			//~ console.log( '$scope.rulesFilter', $scope.rulesFilter );
			//~ console.log( '$scope.foundMULItems.Units.length', $scope.foundMULItems.Units.length );
			for( mechCounter = $scope.foundMULItems.Units.length - 1; mechCounter > -1; mechCounter--) {
				switch( $scope.rulesFilter ) {
					case "Introductory":
						if( $scope.foundMULItems.Units[mechCounter]["Rules"] != "Introductory" )
							$scope.foundMULItems.Units.splice( mechCounter, 1 );
						break;
					case "Standard":
						if(
							$scope.foundMULItems.Units[mechCounter]["Rules"] != "Introductory"
								&&
							$scope.foundMULItems.Units[mechCounter]["Rules"] != "Standard"
						 )
							$scope.foundMULItems.Units.splice( mechCounter, 1 );
						break;
					case "Advanced":
						if(
							$scope.foundMULItems.Units[mechCounter]["Rules"] != "Introductory"
								&&
							$scope.foundMULItems.Units[mechCounter]["Rules"] != "Standard"
								&&
							$scope.foundMULItems.Units[mechCounter]["Rules"] != "Advanced"
						 )
							$scope.foundMULItems.Units.splice( mechCounter, 1 );
						break;
				}

			}
		}

		$scope.changeSkillValues = function(currentLance, indexValue, newSkillValue) {
			currentLance.members[indexValue].setSkill( newSkillValue );
			$scope.saveToLS();
		}

		//~ $scope.recalcMechs = function(indexNumber, event) {
			//~ for( var mechCount = 0; mechCount < $scope.currentLance.length; mechCount++)
				//~ $scope.currentLance[mechCount].calcCurrentVals();
		//~ }

		$scope.filterMechTech = function() {
			//~ console.log( '$scope.rulesFilter', $scope.rulesFilter );
			//~ console.log( '$scope.foundMULItems.Units.length', $scope.foundMULItems.Units.length );
			for( mechCounter = $scope.foundMULItems.Units.length - 1; mechCounter > -1; mechCounter--) {

				switch( $scope.techFilter ) {
					case "Inner Sphere":
						if( $scope.foundMULItems.Units[mechCounter]["Technology"].Name != "Inner Sphere" )
							$scope.foundMULItems.Units.splice( mechCounter, 1 );
						break;
					case "Clan":
						if( $scope.foundMULItems.Units[mechCounter]["Technology"].Name != "Clan" )
							$scope.foundMULItems.Units.splice( mechCounter, 1 );
						break;
				}
			}
		}
		/* Endpoints:

			QuickList
			QuickCount
			QuickRandom
		*/
		$scope.updateMULList = function() {
			// http://masterunitlist.info//Unit/QuickList?MinPV=1&MaxPV=999&Name=
			if( $scope.currentSearch.length > 3 ) {
				$scope.foundMULItems = Array();
				$http.get("http://masterunitlist.info//Unit/QuickList?MinPV=1&MaxPV=999&Name=" + $scope.currentSearch)
					.then(function(response) {
						$scope.foundMULItems = response.data;
						$scope.filterMechRules();
						$scope.filterMechTech();
						// console.log( $scope.foundMULItems );
					});
			}
			$scope.saveToLS();
		}

		$scope.searchOnEnter = function(event) {
			//console.log( event );
			if( event.keyCode == 13 )
				$scope.updateMULList();
		}

		$scope.saveToLS = function() {
			localStorage["tmp_current_search"] = $scope.currentSearch;
			localStorage["tmp_current_rules"] = $scope.rulesFilter;
			localStorage["tmp_current_tech"] = $scope.techFilter;
			localStorage["tmp_current_lances"] = JSON.stringify( $scope.currentLances) ;

			$scope.updateMemberCounts();
			$scope.forceTotalPoints = 0;

			$scope.totalCount = 0;
			for( var lanceCount = 0; lanceCount < $scope.currentLances.length; lanceCount++) {
				$scope.totalCount += $scope.currentLances[lanceCount].members.length;
				$scope.forceTotalPoints += $scope.currentLances[lanceCount].groupPoints;
			}
			$scope.totalGroups = $scope.currentLances.length;
			//console.log( $scope.totalCount  ) ;
			$scope.makeAddToOptions();




		}

		$scope.makeAddToOptions = function() {

			$scope.addToOptions = Array();

			$translate(['GENERAL_GROUP']).then(function (translation) {

				groupName = translation.GENERAL_GROUP;

				$scope.addToOptions = Array();
				for( var lanceCount = 0; lanceCount < $scope.currentLances.length; lanceCount++) {
					if(  $scope.currentLances[lanceCount].customName != "" ) {
						$scope.addToOptions.push(
							{
								id: lanceCount,
								label: $scope.currentLances[lanceCount].customName + " (Group " + (lanceCount + 1 ) + ")"
							}
						);
					} else {
						$scope.addToOptions.push(
							{
								id: lanceCount,
								label: groupName + " " + (lanceCount + 1 )
							}
						);
					}
				}

				if( !$scope.addToGroup )
					$scope.addToGroup = $scope.addToOptions[0];
			});
		}

		incomingLance = Array();
		$scope.currentLances = Array()
		if( localStorage["tmp_current_lances"] ) {
			incomingLances = JSON.parse(localStorage["tmp_current_lances"]);
			for( var lanceCount = 0; lanceCount < incomingLances.length; lanceCount++) {
				var incomingLance = new asGroup();

				if( incomingLances[lanceCount].customName )
					incomingLance.customName = incomingLances[lanceCount].customName;
				//incomingLance[lanceCount];

				for( var mechCount = 0; mechCount < incomingLances[lanceCount].members.length; mechCount++) {
					if( incomingLances[lanceCount].members[mechCount] != null ) {
						var incomingMech = new asMech( incomingLances[lanceCount].members[mechCount] );
						incomingLance.members.push( incomingMech );
					}
				}

				$scope.currentLances.push( incomingLance );
			}
		}

		if( $scope.currentLances.length == 0) {
			$scope.currentLances.push( new asGroup() );
		}

		$scope.makeAddToOptions();



		//~ console.log("incomingLance", incomingLance);
		//~ console.log("$scope.currentLance", $scope.currentLance);

		$scope.viewingMech = null;
		$scope.foundMULItems = Array();
		if( localStorage["tmp_current_search"] ) {
			if( localStorage["tmp_current_rules"] ) {
				$scope.rulesFilter = localStorage["tmp_current_rules"];
			}
			if( localStorage["tmp_current_tech"] ) {
				$scope.techFilter = localStorage["tmp_current_tech"];
			}
			$scope.currentSearch = localStorage["tmp_current_search"];
			$scope.updateMULList();
		} else {
			$scope.currentSearch = "";
		}

		$scope.newGroup = function() {
			$scope.currentLances.push( new asGroup() );
			$scope.saveToLS();
		}

		$scope.removeGroup = function(groupIndex) {
			$scope.currentLances.splice( groupIndex, 1 );

			$scope.saveToLS();
			$scope.saveToLS();
		}

		$scope.viewMech = function(currentLance, viewIndex) {
			$scope.viewingMech = currentLance.members[viewIndex];
			//~ console.log( $scope.viewingMech );
		}

		$scope.viewSearchMech = function(viewIndex) {
			$scope.viewingMech = new asMech( $scope.foundMULItems.Units[viewIndex] );
			//~ console.log( $scope.viewingMech );
		}

		$scope.closeViewMech = function(addIndex) {
			$scope.viewingMech = null;
		}

		$scope.addToLance = function(addIndex) {
			var incomingMech = new asMech(  $scope.foundMULItems.Units[addIndex] );
			//~ console.log("Add", incomingMech );
			$scope.currentLances[ $scope.addToGroup.id ].members.push( incomingMech );
			$scope.saveToLS();
		}

		$scope.removefFromLance = function( currentLance, removeIndex ) {
			currentLance.members.splice( removeIndex, 1 );

			$scope.saveToLS();
		}

		$scope.range = function(min, max, step) {
			step = step || 1;
			var input = [];
			for (var i = min; i <= max; i += step) {
				input.push(i);
			}
			return input;
		};
	}
];
angular.module("webApp").controller(
	"asBuilderController",
	asBuilderArray
);

angular.module("cordovaApp").controller(
	"asBuilderController",
	asBuilderArray
);

