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
		$scope.techFilter = "Inner Sphere";

		$scope.favoriteGroups = Array();

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

		$scope.addFavoriteUnit = function( favoriteGroupIndex, favoriteMechIndex, addToGroup ) {

			if( typeof(addToGroup) == "undefined")
				addToGroup = $scope.addToGroup.id / 1;

			//~ console.log("addFavoriteUnit TODO:" + favoriteGroupIndex + "/" + favoriteMechIndex + "/" + addToGroup);

			addUnitInfo = $scope.favoriteGroups[favoriteGroupIndex].members[ favoriteMechIndex ];
			console.log("addFavoriteUnit TODO:", addUnitInfo );
			//~ addUnitInfo.customName
			//~ addUnitInfo.currentSkill
			//~ addUnitInfo.mulID
			var tempFavCurrentSkill = addUnitInfo.currentSkill;
			var tempFavCustomName = addUnitInfo.customName;
			$scope.pleaseWait = true;

			var mulUnitURL = "https://masterunitlist.azurewebsites.net/Unit/QuickDetails/" + addUnitInfo.mulID + "/";
			//~ console.log("mulUnitURL", mulUnitURL );

			$http.get(mulUnitURL)
				.then(
					function(response) {
						foundMULItem = response.data;

						//~ console.log("addFavoriteUnit MUL response", foundMULItem );

						//~ console.log("addUnitInfo.mulID", addUnitInfo.mulID);

						$scope.pleaseWait = false;
						
						//~ console.log( "$scope.tempFavCurrentSkill", tempFavCurrentSkill );
						//~ console.log( "$scope.tempFavCustomName", tempFavCustomName );
 
						$scope.currentLances[ addToGroup ].members.push( new asUnit( foundMULItem ) );
						$scope.currentLances[ addToGroup ].members[ $scope.currentLances[ addToGroup ].members.length - 1 ].setSkill( tempFavCurrentSkill );
						$scope.currentLances[ addToGroup ].members[ $scope.currentLances[ addToGroup ].members.length - 1 ].customName = tempFavCustomName;
						$scope.saveToLS();
						$scope.tempFavCurrentSkill = null;
						$scope.tempFavCustomName = null;

					}
				)
				.catch(
					function(fallback) {
						$scope.pleaseWait = false;
						alert("There was an error retreiving from the MUL. (Are you online?)");
					}
				)

				;

		}

		$scope.addFavoriteGroup = function( favoriteGroupIndex ) {
			var newGroup = new asGroup();
			newGroup.customName = $scope.favoriteGroups[favoriteGroupIndex].customName;

			this.currentLances.push(newGroup);
			for( var mCount = 0; mCount < $scope.favoriteGroups[favoriteGroupIndex].members.length; mCount++) {
				$scope.addFavoriteUnit( favoriteGroupIndex, mCount, this.currentLances.length - 1);
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

		$scope.changeSkillValues = function( newSkillValue) {
			console.log( newSkillValue );
			$scope.viewingLance.members[$scope.viewingMechIndex].setSkill( newSkillValue );
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
			QuickDetails
			QuickList
			QuickCount
			QuickRandom
		*/
		
		$scope.updateMULList = function() {
			// https://masterunitlist.azurewebsites.net/Unit/QuickList?MinPV=1&MaxPV=999&Name=
			if( $scope.currentSearch.length >= 3 ) {
				$scope.foundMULItems = Array();
				$scope.pleaseWait = true;
				$http.get("https://masterunitlist.azurewebsites.net/Unit/QuickList?MinPV=1&MaxPV=999&Name=" + $scope.currentSearch)
					.then(function(response) {
						$scope.foundMULItems = response.data;
						$scope.filterMechRules();
						$scope.filterMechTech();
						$scope.pleaseWait = false;
						// console.log( $scope.foundMULItems );
					})
					.catch(
						function(fallback) {
							$scope.pleaseWait = false;
							alert("There was an error retreiving from the MUL. Are you online?");
							//~ console.log("error", fallback);
						}
				);
			}
			$scope.saveToLS();
		}

		$scope.searchOnEnter = function(event) {
			//console.log( event );
			if( event.keyCode == 13 )
				$scope.updateMULList();
		}

		$scope.saveToLS = function() {
			localStorage["as_builder_current_search"] = $scope.currentSearch;
			localStorage["as_builder_current_rules"] = $scope.rulesFilter;
			localStorage["as_builder_current_tech"] = $scope.techFilter;
			localStorage["as_builder_current_lances"] = JSON.stringify( $scope.currentLances) ;
			localStorage["as_builder_favorites"] = JSON.stringify( $scope.favoriteGroups) ;

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

		$scope.makeAddToOptions();



		//~ console.log("incomingLance", incomingLance);
		//~ console.log("$scope.currentLance", $scope.currentLance);

		if( !localStorage["as_builder_favorites"] ) {
			localStorage["as_builder_favorites"] = "[]";
		}

		$scope.favoriteGroups = JSON.parse(localStorage["as_builder_favorites"]);

		$scope.viewingMech = null;
		$scope.viewingLance = null;
		$scope.viewingMechIndex = -1;

		$scope.foundMULItems = Array();
		if( localStorage["as_builder_current_search"] ) {
			if( localStorage["as_builder_current_rules"] ) {
				$scope.rulesFilter = localStorage["as_builder_current_rules"];
			}
			if( localStorage["as_builder_current_tech"] ) {
				$scope.techFilter = localStorage["as_builder_current_tech"];
			}
			$scope.currentSearch = localStorage["as_builder_current_search"];
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
		}

		$scope.viewMech = function(currentLance, viewIndex) {
			$scope.viewingMech = currentLance.members[viewIndex];
			$scope.viewingLance = currentLance;
			$scope.viewingMechIndex = viewIndex;
			//~ console.log( $scope.viewingMech );
		}

		$scope.toggleDetails = function(currentLance, viewIndex) {
			currentLance.members[viewIndex].toggleShowingDetails();
			$scope.saveToLS();
			//~ console.log( $scope.viewingMech );
		}

		$scope.viewSearchMech = function(viewIndex) {
			$scope.viewingMech = new asUnit( $scope.foundMULItems.Units[viewIndex] );
			//~ console.log( $scope.viewingMech );
		}

		$scope.closeViewMech = function(addIndex) {
			$scope.viewingMech = null;
			$scope.viewingLance = null;
			$scope.viewingMechIndex = -1;
		}

		$scope.addToLance = function(addIndex) {
			var incomingMech = new asUnit(  $scope.foundMULItems.Units[addIndex] );
			console.log("Add Raw", $scope.foundMULItems.Units[addIndex] );
			console.log("Add", incomingMech );
			$scope.currentLances[ $scope.addToGroup.id ].members.push( incomingMech );
			$scope.saveToLS();
		}

		$scope.removefFromLance = function( currentLance, removeIndex ) {
			currentLance.members.splice( removeIndex, 1 );

			$scope.saveToLS();
		}

		$scope.removeFromFavorites = function(groupIndex) {
			$scope.favoriteGroups.splice( groupIndex, 1 );

			$scope.saveToLS();
		}

		$scope.addGroupToFavorites = function( groupIndex ) {
			console.log( groupIndex );
			console.log( $scope.currentLances );
			if( $scope.currentLances[groupIndex] ) {
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();

				if(dd<10) {
				    dd='0'+dd
				}

				if(mm<10) {
				    mm='0'+mm
				}

				today = mm+'/'+dd+'/'+yyyy;

				groupName = "Saved Group";

				if( $scope.currentLances[groupIndex].customName != "")
					groupName = $scope.currentLances[groupIndex].customName;

				var favoriteObject = {
					savedOn: today,
					customName: groupName,
					members: Array()
				};

				for( var itemC = 0; itemC < $scope.currentLances[groupIndex].members.length; itemC++) {
					var memObj = {
						name: $scope.currentLances[groupIndex].members[itemC].name,
						customName: $scope.currentLances[groupIndex].members[itemC].customName,
						currentSkill: $scope.currentLances[groupIndex].members[itemC].currentSkill,
						mulID: $scope.currentLances[groupIndex].members[itemC].mulID,
					}
					favoriteObject.members.push( memObj );
				}

				$scope.favoriteGroups.push( favoriteObject );

				$scope.saveToLS();
				console.log( $scope.favoriteGroups );
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

