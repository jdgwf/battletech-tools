var settingsArray = [
	'$rootScope',
	'$translate',
	'$scope',
	'$route',
	function ($rootScope, $translate,  $scope, $route) {
		$rootScope.showSciFiCreatorMenu = false;
		$rootScope.showChargenMenu = false;

		$translate(['APP_TITLE', 'GENERAL_SETTINGS']).then(function (translation) {
			$rootScope.title_tag = translation.GENERAL_SETTINGS + " | " + translation.APP_TITLE;
			$rootScope.subtitle_tag = translation.GENERAL_SETTINGS;
		});


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

		$scope.chargen_pdf_layout = localStorage["users_chargen_pdf_layout"];

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

		$scope.updateChargenPDF = function( pdf_selected ) {
			//console.log( "updateChargenPDF", pdf_selected );
			localStorage["users_chargen_pdf_layout"] = pdf_selected;
			$scope.chargen_pdf_layout = pdf_selected;
			$route.reload();
		}

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

