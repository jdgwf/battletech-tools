var settingsArray = [
	'$rootScope',
	'$translate',
	'$scope',
	'$route',
	'$location',
	'$http',
	function ($rootScope, $translate,  $scope, $route, $location, $http) {
		$rootScope.showSciFiCreatorMenu = false;
		$rootScope.showChargenMenu = false;

		$translate(['APP_TITLE', 'GENERAL_SETTINGS']).then(function (translation) {
			$rootScope.title_tag = translation.GENERAL_SETTINGS + " | " + translation.APP_TITLE;
			$rootScope.subtitle_tag = translation.GENERAL_SETTINGS;
		});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			localStorage["backToPath"] = $location.$$path;

		$scope.available_languages = Array();
		$scope.users_language = {};
		for( lang_count = 0; lang_count < available_languages.length; lang_count++) {
			if( available_languages[lang_count].active ) {
				language_object = {
					id: available_languages[lang_count].short_code,
					label: available_languages[lang_count].native_name
				};
				$scope.available_languages.push(
					language_object
				);
				if(localStorage["users_preferred_language"] == available_languages[lang_count].short_code ) {
					$scope.users_language = language_object;
					$scope.background_image_url = "url(images/flags/64/" + available_languages[lang_count].icon_file + ")";
				}
			}
		}


		$scope.updateLanguage = function( language_selected ) {

			$translate.use($scope.users_language.id);
			localStorage["users_preferred_language"] = $scope.users_language.id;
			for( lang_count = 0; lang_count < available_languages.length; lang_count++) {
				if( available_languages[lang_count].active ) {
					if(localStorage["users_preferred_language"] == available_languages[lang_count].short_code ) {
						$scope.background_image_url = "url(images/flags/64/" + available_languages[lang_count].icon_file + ")";
					}
				}
			}

			$route.reload();
		}


		// Export JSON Data...

		var exportObj = {
			as_favorites: null,
			saved_mechs: null
		};
		if( localStorage["as_builder_favorites"] )
			exportObj.as_favorites = JSON.parse( localStorage["as_builder_favorites"] );
		
		if( localStorage["saved_items_mechs"] )
			exportObj.saved_mechs = JSON.parse( localStorage["saved_items_mechs"] );

		var content = JSON.stringify( exportObj );
		$scope.exportText = content;
		var blob = new Blob([ content ], { type : 'application/javascript' });
		$scope.downloadExportData = (window.URL || window.webkitURL).createObjectURL( blob );
		var today = new Date();
		$scope.ExportFileName = "BattleTech Tools Export - " + today.getFullYear() + "-" + (today.getMonth()+ 1).toString().lpad("0", 2) + "-" + today.getDate().toString().lpad("0", 2) + ".json";
		$scope.importMessage = "";
		$scope.importText = "";
		$scope.showIOSAlternatives = false;
		$scope.showAlts = function() {
			$scope.showIOSAlternatives = true;
		}
		
		
		$scope.textImport = function() {
		    function addImportMessage( newMessage ) {
				$scope.importMessage += newMessage + "<br />\n";
				if(!$scope.$$phase) {
					$scope.$digest($scope);
				}
			}
			if( $scope.importText ) {
				var parsed = JSON.parse( $scope.importText );
				var imported = 0;
				if( parsed.as_favorites && parsed.as_favorites.length > 0 ) {
					localStorage["as_builder_favorites"] = JSON.stringify( parsed.as_favorites );
					addImportMessage("Imported " + parsed.as_favorites.length + " Alpha Strike Favorites");
					imported++;
				}
				
				if( parsed.saved_mechs && parsed.saved_mechs.length > 0 ) {
					localStorage["saved_items_mechs"] = JSON.stringify( parsed.saved_mechs );
					addImportMessage("Imported " + parsed.saved_mechs.length + " saved BattleMechs");
					imported++;
				}
				
				if( imported == 0 ) {
					addImportMessage( "Nothing imported" );
				}
			} 
		}
		
		// Import JSON Data...
		$scope.uploadFile = function(files) {
			//~ console.log( "files", files );

			$scope.importMessage = "Importing Files...";

		    var fReader = new FileReader();
		    var importMessage = "";

		    function addImportMessage( newMessage ) {
				$scope.importMessage += newMessage + "<br />\n";
				if(!$scope.$$phase) {
					$scope.$digest($scope);
				}
			}

		    function clearImportMessage( newMessage ) {
				$scope.importMessage = "";
				if(!$scope.$$phase) {
					$scope.$digest($scope);
				}
			}


		    for( var fileCounter = 0; fileCounter < files.length; fileCounter++ ) {
				$scope.importMessage = "";

				var file = files[ fileCounter ];


				fReader.onload = function(textContents) {

					if( textContents.target && textContents.target.result ) {
						//~ console.log( "textContents.target.result", textContents.target.result );
						var parsed = JSON.parse( textContents.target.result );
						var imported = 0;
						if( parsed.as_favorites && parsed.as_favorites.length > 0 ) {
							localStorage["as_builder_favorites"] = JSON.stringify( parsed.as_favorites );
							addImportMessage("Imported " + parsed.as_favorites.length + " Alpha Strike Favorites");
							imported++;
						}

						if( parsed.saved_mechs && parsed.saved_mechs.length > 0 ) {
							localStorage["saved_items_mechs"] = JSON.stringify( parsed.saved_mechs );
							addImportMessage("Imported " + parsed.saved_mechs.length + " saved BattleMechs");
							imported++;
						}

						if( imported == 0 ) {
							addImportMessage( "Nothing imported" );
						}

					}

				};


				fReader.readAsText( file, $scope );

			}

		};

		// $scope.change_language = function (key) {
		// 	$translate.use(key);
		// 	localStorage["users_preferred_language"] = key;

		// 	$route.reload();
		// };

	}
];
angular.module("webApp").controller(
	"settingsController",
	settingsArray
);

angular.module("cordovaApp").controller(
	"settingsController",
	settingsArray
);

