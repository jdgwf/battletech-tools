var available_languages = [];

cordovaApp = angular.module(
	'cordovaApp',
	['ngRoute', 'ngResource', 'ngSanitize','pascalprecht.translate', 'as.sortable', 'mm.foundation'],
	[
		'$routeProvider',
		'$translateProvider',
		function ($routeProvider, $translateProvider, $scope, $http) {

			for( lang_count = 0; lang_count < available_languages.length; lang_count++) {
				if( available_languages[lang_count].active ) {
					$translateProvider.translations(
						available_languages[lang_count].short_code ,
						available_languages[lang_count].translations
					);
				}
			}

			$translateProvider.useSanitizeValueStrategy('sanitize');

			preferred_language = "en-US";
			if( localStorage && localStorage["tmp.preferred_language"] ) {
				preferred_language = localStorage["tmp.preferred_language"];
			} else {
				localStorage["tmp.preferred_language"] = "en-US";
			}
			$translateProvider.preferredLanguage(preferred_language);

			$routeProvider

			// route for the home/welcome page
			.when('/', {
				templateUrl : 'pages/welcome.html',
				controller  : 'welcomeController'
			})

			// route for the credits page
			.when('/credits', {
				templateUrl : 'pages/credits.html',
				controller  : 'creditsController'
			})

			/*
			 * BattleMech Creator Page
			 */
			// route for the battlemech creator page
			.when('/battlemech-creator/', {
				templateUrl : 'pages/battlemech-creator-welcome.html',
				controller  : 'battlemechCreatorControllerWelcome'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step1/', {
				templateUrl : 'pages/battlemech-creator-step1.html',
				controller  : 'battlemechCreatorControllerStep1'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step2/', {
				templateUrl : 'pages/battlemech-creator-step2.html',
				controller  : 'battlemechCreatorControllerStep2'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step3/', {
				templateUrl : 'pages/battlemech-creator-step3.html',
				controller  : 'battlemechCreatorControllerStep3'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step4/', {
				templateUrl : 'pages/battlemech-creator-step4.html',
				controller  : 'battlemechCreatorControllerStep4'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step5/', {
				templateUrl : 'pages/battlemech-creator-step5.html',
				controller  : 'battlemechCreatorControllerStep5'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step6/', {
				templateUrl : 'pages/battlemech-creator-step6.html',
				controller  : 'battlemechCreatorControllerStep6'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/summary/', {
				templateUrl : 'pages/battlemech-creator-summary.html',
				controller  : 'battlemechCreatorControllerSummary'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/exports/', {
				templateUrl : 'pages/battlemech-creator-exports.html',
				controller  : 'battlemechCreatorControllerExports'
			})

			/*
			 * Alpha Strike Builder/Play Tools
			 */
			// route for the home/welcome page
			.when('/as/', {
				templateUrl : 'pages/as-builder.html',
				controller  : 'asBuilderController'
			})

			//~ .when('/as/play-view', {
				//~ templateUrl : 'pages/as-play-view.html?v=' + getAppVersion(),
				//~ controller  : 'asPlayViewController'
			//~ })

			//~ .when('/as/play-view-svg', {
				//~ templateUrl : 'pages/as-play-view-svg.html?v=' + getAppVersion(),
				//~ controller  : 'asPlayViewSVGController'
			//~ })
			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view-svg.html?v=' + getAppVersion(),
				controller  : 'asPlayViewSVGController'
			})

			// route for the credits page
			.when('/settings', {
				templateUrl : 'pages/settings.html',
				controller  : 'settingsController'
			})

			;
		}
	]
);

cordovaApp.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);



cordovaApp.run( function( $rootScope ) {
	$rootScope.svgBattleTechLogo = battleTechLogoSVG();
});


angular.module('cordovaApp').controller(
	'select_language',
	[
		'$translate',
		'$scope',
		'$route',
		function ($translate, $scope, $route) {

			$scope.change_language = function (key) {
				$translate.use(key);
				localStorage["tmp.preferred_language"] = key;
				$route.reload();
			};

		}
	]
);

var available_languages = [];

webApp = angular.module(
	'webApp',
	['ngRoute', 'ngResource', 'ngSanitize','pascalprecht.translate', 'as.sortable', 'mm.foundation'],
	[
		'$routeProvider',
		'$translateProvider',
		function ($routeProvider, $translateProvider,$scope, $http) {

			for( lang_count = 0; lang_count < available_languages.length; lang_count++) {
				if( available_languages[lang_count].active ) {
					$translateProvider.translations(
						available_languages[lang_count].short_code ,
						available_languages[lang_count].translations
					);
				}
			}


			$translateProvider.useSanitizeValueStrategy('sanitize');

			preferred_language = "en-US";
			if( localStorage && localStorage["tmp.preferred_language"] ) {
				preferred_language = localStorage["tmp.preferred_language"];
			} else {
				localStorage["tmp.preferred_language"] = "en-US";
			}
			$translateProvider.preferredLanguage(preferred_language);



			$routeProvider

			// route for the home/welcome page
			.when('/', {
				templateUrl : 'pages/welcome.html?v=' + getAppVersion(),
				controller  : 'welcomeController'
			})

			// route for the credits page
			.when('/credits', {
				templateUrl : 'pages/credits.html?v=' + getAppVersion(),
				controller  : 'creditsController'
			})

			/*
			 * BattleMech Creator Page
			 */
			// route for the battlemech creator page
			.when('/battlemech-creator/', {
				templateUrl : 'pages/battlemech-creator-welcome.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerWelcome'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step1/', {
				templateUrl : 'pages/battlemech-creator-step1.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep1'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/step2/', {
				templateUrl : 'pages/battlemech-creator-step2.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep2'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step3/', {
				templateUrl : 'pages/battlemech-creator-step3.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep3'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step4/', {
				templateUrl : 'pages/battlemech-creator-step4.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep4'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step5/', {
				templateUrl : 'pages/battlemech-creator-step5.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep5'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/step6/', {
				templateUrl : 'pages/battlemech-creator-step6.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerStep6'
			})
			// route for the battlemech creator page
			.when('/battlemech-creator/summary/', {
				templateUrl : 'pages/battlemech-creator-summary.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerSummary'
			})


			// route for the battlemech creator page
			.when('/battlemech-creator/exports/', {
				templateUrl : 'pages/battlemech-creator-exports.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerExports'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/print-rs/', {
				templateUrl : 'pages/battlemech-print-svg.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerPrinting'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/print-as/', {
				templateUrl : 'pages/battlemech-print-svg.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerPrinting'
			})

			// route for the battlemech creator page
			.when('/battlemech-creator/print-tro/', {
				templateUrl : 'pages/battlemech-print-svg.html?v=' + getAppVersion(),
				controller  : 'battlemechCreatorControllerPrinting'
			})

			/*
			 * Alpha Strike Builder/Play Tools
			 */
			// route for the home/welcome page
			.when('/as/', {
				templateUrl : 'pages/as-builder.html?v=' + getAppVersion(),
				controller  : 'asBuilderController'
			})

			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view-svg.html?v=' + getAppVersion(),
				controller  : 'asPlayViewSVGController'
			})

			// route for the credits page
			.when('/settings', {
				templateUrl : 'pages/settings.html?v=' + getAppVersion(),
				controller  : 'settingsController'
			})



			;
		}
	]
);

angular.module('webApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('webApp')
    .filter('svg_to_dataurl', ['$sce', function($sce){
        return function(text) {
			//~ console.log( text );
            //~ return "data:image/svg+xml;base64," + btoa(text);

           //~ return "data:image/svg+xml;utf8," + encodeURIComponent(text);

			return "data:image/svg+xml;utf8," + text;
        };
    }]);

angular.module('webApp')
    .filter('strip_nl', ['$sce', function($sce){
        return function(text) {
			//~ console.log( text );
			while( text.indexOf( "\n" ) != -1 ) {
				text = text.replace( "\n", "" );
			}
            return window.btoa(text);


        };
    }]);


webApp.run( function( $rootScope ) {
	//~ $rootScope.svgBattleTechLogo = $rootScope.$sce.trustAsHtml( battleTechLogoSVG() );
	$rootScope.svgBattleTechLogo = battleTechLogoSVG();

});

webApp.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob|data):/);
}]);


angular.module('webApp').controller(
	'select_language',
	[
		'$translate',
		'$scope',
		'$route',
		'$location',
		function ($translate, $scope, $route, $location) {

			$scope.change_language = function (key) {
				$translate.use(key);
				localStorage["tmp.preferred_language"] = key;
				$route.reload();
			};

		}
	]
);

var pdfFontSize = 10;
var pdfFontFace = "helvetica";

function update_mech_status_bar_and_tro($scope, $translate, current_mech) {
	$translate(
		[
			'BM_REMAINING_TONS', 'BM_UNALLOCATED_ARMOR', 'BM_UNALLOCATED_CRITS',
			'BM_MOVE_HEAT', 'BM_WEAPON_HEAT', 'BM_HEAT_DISSIPATION',
			'BM_HEAT_SUMMARY',
		]
	).then(function (translation) {
		$scope.mech_status_bar = "";

		$scope.mech_status_bar += "<strong>" + translation.BM_MOVE_HEAT + "</strong>: " + current_mech.getMoveHeat();
		$scope.mech_status_bar += " | <strong>" + translation.BM_WEAPON_HEAT + "</strong>: " + current_mech.getWeaponHeat();
		$scope.mech_status_bar += " | <strong>" + translation.BM_HEAT_DISSIPATION + "</strong>: " + current_mech.getHeatDissipation();

		var heatSummary = current_mech.getMoveHeat() + current_mech.getWeaponHeat() - current_mech.getHeatDissipation()
		if( heatSummary > 0  ) {
			$scope.mech_status_bar += " | <strong>" + translation.BM_HEAT_SUMMARY + "</strong>: <span class=\"color-red\">" + heatSummary + "</span>";
		} else {
			$scope.mech_status_bar += " | <strong>" + translation.BM_HEAT_SUMMARY + "</strong>: <span class=\"color-green\">" + heatSummary + "</span>";
		}

		$scope.mech_status_bar += " | <strong>" + translation.BM_REMAINING_TONS + "</strong>: " + current_mech.getRemainingTonnage();
		$scope.mech_status_bar += " | <strong>" + translation.BM_UNALLOCATED_ARMOR + "</strong>: " + current_mech.getUnallocatedArmor();
		$scope.mech_status_bar += " | <strong>" + translation.BM_UNALLOCATED_CRITS + "</strong>: " + current_mech.getUnallocatedCritCount();

		$scope.mech_summary_html = current_mech.makeTROHTML();
	});

}

function makeBattlemechRecordSheetPDF(battlemech_object) {

//	var pdfDoc = new jsPDF('portrait', 'mm', 'letter');
//	pdfDoc.setFontSize( pdfFontSize );
	pdfDoc = new PDFDocument;


	pdfDoc = createRecordSheetPDF(pdfDoc, battlemech_object);

	pdfDoc.end();// return pdfDoc;

}

function makeBattlemechCombinedPDF(battlemech_object) {
	var pdfDoc = new jsPDF('portrait', null, 'letter');
	pdfDoc.setFontSize( pdfFontSize );
	pdfDoc = createTROPDF(pdfDoc, battlemech_object);
	pdfDoc.addPage();
	pdfDoc = createRecordSheetPDF(pdfDoc, battlemech_object);

	return pdfDoc;

}

function makeBattlemechTROPDF(battlemech_object) {
	var pdfDoc = new jsPDF('portrait', null, 'letter');

	pdfDoc.setFontSize( pdfFontSize );
	pdfDoc = createTROPDF(pdfDoc, battlemech_object);


	return pdfDoc;
}

function createTROPDF( pdfDoc, battlemech_object ) {

	lineHeight = 5;

	col1Loc = 10;
	col2Loc = 30;
	col3Loc = 50;
	col4Loc = 75;
	col5Loc = 90;

	var lineNumber = 1;
	pdfDoc.setFont(pdfFontFace, "");
	pdfDoc.text(10, 10, battlemech_object.getTranslation("TRO_TYPE") + ": " + battlemech_object.getName() );
	pdfDoc.text(10, 10 + lineHeight , battlemech_object.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + battlemech_object.getTech().name[ battlemech_object.useLang ] );
	lineNumber++;
	pdfDoc.text(10, 10 + lineHeight * lineNumber, battlemech_object.getTranslation("TRO_ERA") + ": " + battlemech_object.getEra().name[ battlemech_object.useLang ] );
	lineNumber++;
	pdfDoc.text(10, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_TONNAGE") + ": " + battlemech_object.getTonnage() );
	lineNumber++;
	pdfDoc.text(10, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_BATTLE_VALUE") + ": " + battlemech_object.getBattleValue() );
	lineNumber++;
	pdfDoc.text(10, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ALPHA_STRIKE_VALUE") + ": " + battlemech_object.getAlphaStrikeValue() );
	lineNumber++;
	pdfDoc.text(10, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_CBILL_COST") + ": $" + battlemech_object.getCBillCost() );
	lineNumber++;
	// pdfDoc.text(10, 10 + lineHeight * 7);
	lineNumber++;
	pdfDoc.setFont(pdfFontFace, "bold");
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_EQUIPMENT")  );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_MASS")  );
	lineNumber++;

	pdfDoc.setFont(pdfFontFace, "");
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_INTERNAL_STRUCTURE")  );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getInteralStructureWeight() + "" );
	lineNumber++;

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getEngineName()  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getEngineRating() + "" );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getEngineWeight() + "" );
	lineNumber++;

	pdfDoc.text(col2Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_WALKING")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getWalkSpeed() + "" );
	lineNumber++;

	pdfDoc.text(col2Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_RUNNING")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getRunSpeed() + "" );
	lineNumber++;

	pdfDoc.text(col2Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_JUMPING")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getJumpSpeed() + "" );
	lineNumber++;

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getHeatSyncName()  );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getHeatSinks() + "" );
	lineNumber++;

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getGyroName()  );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getGyroWeight() + "" );
	lineNumber++;

	if( this.small_cockpit ) {
		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_SMALL_COCKPIT")  );
		pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getCockpitWeight() + "" );
	} else {
		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_COCKPIT")  );
		pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getCockpitWeight() + "" );
	}
	lineNumber++;

	//~ if( battlemech_object.getJumpJetWeight() > 0 ) {
		//~ pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber, battlemech_object.getTranslation("TRO_JUMP_JETS") );
		//~ pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber, battlemech_object.getJumpJetWeight() + "" );
	//~ }
	//~ lineNumber++;
	actuator_html = "";

	if( battlemech_object.mech_type.class == "biped") {
		if( battlemech_object.hasLowerArmActuator("ra") )
			actuator_html += battlemech_object.getTranslation("TRO_LOWER_RIGHT") + ", ";
		if( battlemech_object.hasLowerArmActuator("la") )
			actuator_html += battlemech_object.getTranslation("TRO_LOWER_LEFT") + ", ";
		if( battlemech_object.hasHandActuator("ra") )
			actuator_html += battlemech_object.getTranslation("TRO_RIGHT_HAND") + ", ";
		if( battlemech_object.hasHandActuator("la") )
			actuator_html += battlemech_object.getTranslation("TRO_LEFT_HAND") + ", ";

		if( actuator_html == "")
			actuator_html = battlemech_object.getTranslation("TRO_NO_LOWER_ARM_ACTUATORS");
		else
			actuator_html = actuator_html.substring(0, actuator_html.length - 2);


		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARM_ACTUATORS") + ": " + actuator_html  );
		lineNumber++;
	}

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_FACTOR")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getTotalArmor() + "" );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getArmorWeight() + "" );
	lineNumber++;

	pdfDoc.setFont(pdfFontFace, "bold");
	// pdfDoc.setFontSize(9);
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber  , ""  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber, battlemech_object.getTranslation("TRO_INTERNAL")  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR") );
	lineNumber++;

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , ""  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_STRUCTURE")  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_VALUE") );
	lineNumber++;
	pdfDoc.setFont(pdfFontFace, "");
	pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_HD").length - 11, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_HD")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.head  + ""  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.head  + "");
	lineNumber++;

	pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_CT").length - 15, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_CT")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.centerTorso  + ""  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.centerTorso  + "");
	lineNumber++;

	pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_CTR").length - 20, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_CTR")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , ""  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.centerTorsoRear  + "");
	lineNumber++;

	if( battlemech_object.armorAllocation.rightTorso == battlemech_object.armorAllocation.leftTorso && battlemech_object.armorAllocation.rightTorsoRear == battlemech_object.armorAllocation.leftTorsoRear ) {
		pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RLT").length - 14, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RLT")  );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightTorso  + ""  );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightTorso  + "");
		lineNumber++;

		pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RLTR").length - 19, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RLTR")  );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , ""  );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightTorsoRear  + "");
		lineNumber++;
	} else {
		pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RT").length - 15, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RT")  );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightTorso  + ""  );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightTorso  + "");
		lineNumber++;

		pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RTR").length - 15, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RTR")  );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , ""  );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightTorsoRear  + "");
		lineNumber++;

		pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_LT").length - 15, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_LT")  );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.leftTorso  + ""  );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.leftTorso  + "");
		lineNumber++;

		pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_LTR").length - 15, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_LTR")  );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , ""  );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.leftTorsoRear  + "");
		lineNumber++;
	}

	if( battlemech_object.mech_type.class == "biped") {
		if( battlemech_object.armorAllocation.rightArm == battlemech_object.armorAllocation.leftArm) {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RLA").length - 14, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RLA")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightArm  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightArm  + "");
			lineNumber++;
		} else {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RA").length - 14, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RA")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightArm  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightArm  + "");
			lineNumber++;

			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_LA").length - 13, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_LA")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.leftArm  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.leftArm  + "");
			lineNumber++;
		}

		if( battlemech_object.armorAllocation.rightLeg == battlemech_object.armorAllocation.leftLeg) {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RLL").length - 13, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RLL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightLeg  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightLeg  + "");
			lineNumber++;
		} else {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RL").length - 13, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightLeg  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightLeg  + "");
			lineNumber++;

			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_LL").length - 12, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_LL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.leftLeg  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.leftLeg  + "");
			lineNumber++;
		}
	} else {
		if( battlemech_object.armorAllocation.rightArm == battlemech_object.armorAllocation.leftArm) {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RLFL").length - 17, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RLFL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightArm  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightArm  + "");
			lineNumber++;
		} else {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RFL").length - 18, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RFL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightArm  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightArm  + "");
			lineNumber++;

			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_LFL").length - 17, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_LFL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.leftArm  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.leftArm  + "");
			lineNumber++;
		}

		if( battlemech_object.armorAllocation.rightLeg == battlemech_object.armorAllocation.leftLeg) {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RLRL").length - 17, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RLRL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightLeg  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightLeg  + "");
			lineNumber++;
		} else {
			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_RRL").length - 18, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_RRL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.rightLeg  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.rightLeg  + "");
			lineNumber++;

			pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_LRL").length - 17, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_LRL")  );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.internalStructure.leftLeg  + ""  );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "     " + battlemech_object.armorAllocation.leftLeg  + "");
			lineNumber++;
		}
	}

	pdfDoc.setFontSize( pdfFontSize );
	lineNumber++;

	col1Loc = 10;
	col2Loc = 30;
	col3Loc = 55;
	col4Loc = 75;
	col5Loc = 90;
	pdfDoc.setFont(pdfFontFace, "bold");
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_WEAPONS")  );
	lineNumber++;
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_AND_AMMO")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_LOCATION")  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_CRITICAL"));
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_TONNAGE"));

	lineNumber++;
	pdfDoc.setFont(pdfFontFace, "");

	for( eq_count = 0; eq_count < battlemech_object.equipmentList.length; eq_count++) {
		item_location = "";
		item_location = battlemech_object.getLocationAbbr( battlemech_object.equipmentList[eq_count].location );

		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.equipmentList[eq_count].name[ battlemech_object.useLang ]   );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "   " + item_location.toUpperCase() );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "   " + battlemech_object.equipmentList[eq_count].space.battlemech );
		pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , "   " + battlemech_object.equipmentList[eq_count].weight  );
		lineNumber++;
	}


	for( var locC = 0; locC < battlemech_object.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < battlemech_object.criticals[ battlemech_object.validJJLocations[locC].long ].length; critC++ ) {
			if(
				battlemech_object.criticals[ battlemech_object.validJJLocations[locC].long ][ critC ]
				&& battlemech_object.criticals[ battlemech_object.validJJLocations[locC].long ][ critC ].tag
				&& battlemech_object.criticals[ battlemech_object.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				jjObjs.push( battlemech_object.criticals[ battlemech_object.validJJLocations[locC].long ][ critC ] );
			}
		}

		if( jjObjs.length > 0 ) {
			var areaWeight = 0;
			if( battlemech_object.tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * battlemech_object.jumpJetType.weight_multiplier.light;
			} else if(battlemech_object.tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * battlemech_object.jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * battlemech_object.jumpJetType.weight_multiplier.heavy;
			}

			pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , jjObjs[0].name   );
			pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "   " + battlemech_object.validJJLocations[locC].short.toUpperCase() );
			pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "   " + jjObjs.length.toString() );
			pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , "   " + areaWeight.toString()  );
			lineNumber++;
		}
	}

	var jjObjs = [];

	for( var critC = 0; critC < battlemech_object.unallocatedCriticals.length; critC++ ) {
		if(
			battlemech_object.unallocatedCriticals[ critC ]
			&& battlemech_object.unallocatedCriticals[ critC ].tag
			&& battlemech_object.unallocatedCriticals[ critC ].tag.indexOf( "jj-") === 0
		) {
			jjObjs.push(battlemech_object.unallocatedCriticals[ critC ] );
		}
	}

	if( jjObjs.length > 0 ) {
		var areaWeight = 0;
		if( battlemech_object.tonnage <= 55) {
			// 10-55 tons
			areaWeight = jjObjs.length * battlemech_object.jumpJetType.weight_multiplier.light;
		} else if(battlemech_object.tonnage <= 85) {
			// 60 - 85 tons
			areaWeight = jjObjs.length * battlemech_object.jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			areaWeight = jjObjs.length * battlemech_object.jumpJetType.weight_multiplier.heavy;
		}
		//	html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + "n/a".toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , jjObjs[0].name   );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "   " + "n/a" );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "   " + jjObjs.length.toString() );
		pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , "   " + areaWeight.toString()  );
		lineNumber++;
	}


	pdfDoc = makeFooter(pdfDoc);

	return pdfDoc;
}

function createRecordSheetPDF( pdfDoc, battlemech_object ) {

	// pdfDoc = battlemech_record_sheet(pdfDoc);

	//~ pdfDoc.text(10, 10, "One small step with a really, really big metal and composite foot.....");
	//~ pdfDoc.text(10, 25, battlemech_object.getName());
	//~ pdfDoc.line( 10, 10, 20, 20);

	//~ var svgText = JSON.stringify( battlemech_object.makeSVGRecordSheet() );
	//~ pdfDoc.addSVG( svgText, 0 , 0, pdfDoc.internal.pageSize.width - 0 );
//~ blobStream  = require 'blob-stream'
//~ stream = doc.pipe(blobStream())

	//~ pdfDoc.addPage()
	   //~ .fontSize(25)
	   //~ .text('Here is some vector graphics...', 100, 100)



//~ stream.on 'finish', ->
  //~ # get a blob you can do whatever you like with
  //~ blob = stream.toBlob('application/pdf')

  //~ # or get a blob URL for display in the browser
  //~ url = stream.toBlobURL('application/pdf')
  //~ iframe.src = url

	//~ return pdfDoc;

}

function convertImgToDataURLviaCanvas(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function convertFileToDataURLviaFileReader(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function makeFooter(pdfDoc) {
	pdfDoc.setFontSize( 6 );
	pdfDoc.line( 10, 267, 200, 267);
    pdfDoc.text(10,270, "Created with @Gauthic's BattleTech Tools version " + getAppVersion());
    pdfDoc.text(10,273, "Exported on " + Date() );

    pdfDoc.text(150,270, "MechWarrior, BattleMech, ‘Mech and AeroTech are ");
    pdfDoc.text(150,273, "registered trademarks of The Topps Company, Inc.");
    pdfDoc.setFontSize( pdfFontSize );
    return pdfDoc;
}




var colorRed = "rgb(200,0,0)";
var colorGreen = "rgb(0,200,0)";
var colorBlue = "rgb(0,0,200)";
var colorBlack = "rgb(0,0,0)";
var colorWhite = "rgb(255,255,255)";
var colorYellow = "rgb( 204, 187, 0 )";
var colorOrange = "rgb( 236,87,16 )";
var colorGrayBackground = "rgba( 255,255,255,.8)";

var colorMediumGray = "rgb(102,102,102)";
var colorDarkGray = "rgb(51,51,51)";
var colorLightGray = "rgb(153,153,153)";
var colorVeryLightGray = "rgb(225,225,225)";

var colorGold = "rgb(223,171,45)";
var colorTan = "rgb(253,253,227)";


function rsRearArmorSVG( standAlone, baseFillColor, lineColor, xLoc, yLoc, width) {

	var baseWidth = 744.09449;
	var baseHeight = 627.16514;
	if( typeof( width ) == "undefined" || width == 0) {
		theWidth = 744;
		theHeight = 627;
	} else {
		theWidth = width;
		theHeight = Math.round( width / baseWidth * baseHeight );
	}

	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof(standAlone) == "undefined" )
		standAlone = true;

	if( !baseFillColor )
		baseFillColor = colorTan;

	if( !lineColor )
		lineColor = colorGold;

	var svg = "";

	if( standAlone ) {
		var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

	} else {
		var svg = '<svg \
		    viewBox="0 0 744.09449 627.16514" \
		   height="' + theHeight + 'px" \
		   width="' + theWidth + 'px" \
		   x="' + xLoc + 'px" \
		   y="' + yLoc + 'px" \
		   id=\"rearArmor\" \
		   version="1.1"> \
		  <g> \"';
	  }

  svg += '<g \
     transform="translate(0,-425.19712)" \
     id="rearArmorLayer1"><path \
       id="path4740" \
       d="m 255.33564,1031.6854 c -12.9661,-14.8304 -22.468,-46.09741 -27.9139,-91.8529 l -2.6212,-22.02381 -12.7648,-1.44555 c -7.0206,-0.79506 -41.04523,-3.22678 -75.6103,-5.40381 l -62.845597,-3.95823 -7.12187,-6.74437 -7.12187,-6.74435 -5.10557,-107.8816 c -6.92551,-146.33745 -7.22688,-134.81631 3.84136,-146.85188 l 9.05806,-9.84969 96.974497,-4.90314 c 53.33599,-2.6967 100.33129,-5.09167 104.43409,-5.32214 l 7.4596,-0.41902 0.599,-25.70992 0.5991,-25.70991 7.4675,-6.7752 c 4.1071,-3.72636 8.8165,-6.77521 10.4653,-6.77521 1.6488,0 6.1711,-6.16748 10.0496,-13.70552 3.8784,-7.53804 12.699,-19.67628 19.6013,-26.97387 11.6697,-12.33812 12.6537,-14.18096 14.0348,-26.28546 1.2369,-10.83937 2.6195,-14.06423 8.2644,-19.27612 6.4699,-5.97368 7.73,-6.25902 27.6403,-6.25902 20.744,0 20.899,0.0403 27.545,7.15774 5.1647,5.53093 7.0234,9.91079 8.1784,19.27083 1.1974,9.70396 3.0584,13.88407 9.3567,21.01754 6.944,7.86481 21.3749,35.15322 21.3749,40.41937 0,2.47056 5.328,4.63451 11.4109,4.63451 2.5676,0 8.2437,3.04537 12.6136,6.76749 l 7.9451,6.76748 0,25.16704 c 0,13.84187 0.2398,25.17714 0.5329,25.1895 0.293,0.0123 23.5509,1.43793 51.6842,3.16793 28.1332,1.73001 75.1165,4.40934 104.4072,5.95407 l 53.2559,2.80858 8.0508,8.88956 c 4.4279,4.88924 8.5787,10.94903 9.2239,13.46617 0.6453,2.51717 -1.2485,56.24401 -4.2083,119.393 -4.9165,104.89636 -5.7578,115.57854 -9.7369,123.6384 -2.3955,4.85213 -6.0307,9.7134 -8.0783,10.80283 -2.0475,1.08943 -15.2319,2.62563 -29.2985,3.4138 -36.6161,2.05161 -119.2331,8.27694 -120.0095,9.04293 -0.3609,0.35608 -1.9888,11.13744 -3.6173,23.95856 -5.6384,44.38766 -15.8434,74.65309 -30.3601,90.03989 l -7.7919,8.259 -112.2788,0 -112.2787,0 -7.305,-8.3555 z m 234.5983,-8.1921 c 14.0048,-16.4826 22.9913,-45.92567 27.7115,-90.79356 4.4,-41.82414 -13.1726,-88.81453 -41.7376,-111.60959 l -11.2728,-8.99574 -0.01,-120.42049 -0.01,-120.4205 -5.2543,-4.27092 c -2.8899,-2.34901 -9.124,-4.91033 -13.8535,-5.69183 -8.1384,-1.34477 -8.5992,-1.83256 -8.5992,-9.10321 0,-5.32169 -0.9713,-7.68231 -3.161,-7.68231 -1.7386,0 -5.6728,-5.20312 -8.7427,-11.5625 -3.0698,-6.35937 -9.2011,-15.52678 -13.625,-20.37202 -6.6251,-7.25605 -8.2672,-10.90862 -9.3122,-20.71324 -1.9836,-18.61152 -6.55,-22.23319 -28.0326,-22.23319 -21.5711,0 -25.4651,3.22501 -27.28,22.59293 -1.1218,11.97133 -1.8435,13.30092 -12.8758,23.72004 -7.7287,7.29916 -14.4489,16.58123 -19.8404,27.40384 -6.0678,12.18017 -9.5225,16.71689 -13.5076,17.73786 -2.9451,0.75452 -7.5126,3.45328 -10.1501,5.99726 l -4.7954,4.6254 0,118.50137 0,118.50134 -15.669,16.01056 c -17.5261,17.90833 -26.6709,34.8829 -32.4743,60.27941 -8.4733,37.07972 5.5699,119.97679 23.7583,140.24629 l 5.3757,5.9908 108.3897,0 108.3896,0 6.5749,-7.738 z M 225.94384,901.84143 c 0.059,-11.33742 6.5273,-34.57934 14.2413,-51.17194 5.4916,-11.81232 11.8727,-20.87293 22.2867,-31.64518 l 14.5919,-15.0939 0,-88.21531 0,-88.21528 -39.962,1.56818 c -42.18887,1.6556 -105.41247,4.94946 -144.103437,7.50761 -23.10572,1.52768 -23.16395,1.54588 -29.30548,9.15587 -7.49621,9.28856 -7.4203,-1.49682 -0.9514,135.18804 4.84031,102.27358 5.31078,107.81658 9.54643,112.47558 4.18928,4.608 7.4124,5.07314 53.997007,7.7928 27.24798,1.59075 57.21449,3.60172 66.59225,4.4688 32.91573,3.04345 33.03113,3.03013 33.06673,-3.81527 z m 346.306,2.89404 c 22.2722,-1.70542 53.7687,-3.79796 69.9923,-4.65013 25.8381,-1.35717 30.1226,-2.12986 34.5366,-6.22849 5.0391,-4.67909 5.0392,-4.67984 10.4395,-122.10611 l 5.4003,-117.42698 -5.836,-7.62614 c -3.2098,-4.19437 -7.7541,-8.01268 -10.0986,-8.48513 -7.9218,-1.59644 -165.4225,-9.96763 -188.0879,-9.99692 l -15.452,-0.0199 0,88.20154 0,88.20156 14.6176,14.89666 c 16.8989,17.22163 30.1305,42.23341 35.6977,67.47998 4.4629,20.23843 4.6817,20.92788 6.6303,20.89172 0.916,-0.0176 19.8881,-1.42622 42.1602,-3.13161 z" \
       style="fill:#000000" /> \
';

svg += "</g></g></svg>";

	return svg;

}



function rsDamageTransferSVG( standAlone, baseFillColor, lineColor, xLoc, yLoc, width) {

	var baseWidth = 744.09448819;
	var baseHeight = 1052.3622047;
	if( typeof( width ) == "undefined" || width == 0) {
		theWidth = 744;
		theHeight = 627;
	} else {
		theWidth = width;
		theHeight = Math.round( width / baseWidth * baseHeight );
	}

	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof(standAlone) == "undefined" )
		standAlone = true;

	if( !baseFillColor )
		baseFillColor = colorTan;

	if( !lineColor )
		lineColor = colorGold;

	var svg = "";

	if( standAlone ) {
		var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

	} else {
		var svg = '<svg \
		    viewBox="0 0 744.09448819 1052.3622047" \
		   height="' + theHeight + 'px" \
		   width="' + theWidth + 'px" \
		   x="' + xLoc + 'px" \
		   y="' + yLoc + 'px" \
		   id=\"rearArmor\" \
		   version="1.1"> \
		  <g> \"';
	  }

  svg += '<g \
     transform="translate(0,-3.75)" \
     id="layer1"><path \
       id="path4147" \
       d="m 61.887999,1036.062 c 0,-8.3004 1.22968,-12.3976 4.04506,-13.478 2.22479,-0.8537 5.66394,-4.6656 7.64257,-8.4708 2.6344,-5.0664 8.98108,-8.9615 23.70701,-14.54952 23.903121,-9.07056 29.001101,-15.23799 17.508271,-21.18119 l -7.7173,-3.99076 3.81616,-16.49626 c 2.09889,-9.07296 4.8554,-20.31358 6.12559,-24.97922 1.98918,-7.30656 1.24665,-9.82029 -5.35442,-18.12665 -4.21512,-5.30403 -7.66386,-12.5933 -7.66386,-16.19836 0,-6.08342 47.53658,-116.27873 53.3568,-123.68724 1.43561,-1.82738 2.48844,-14.26272 2.33963,-27.63409 -0.16375,-14.71484 1.58543,-32.62268 4.43122,-45.36615 l 4.70178,-21.05454 9.36403,-0.79713 9.36403,-0.79712 16.51841,-61.0506 c 9.08513,-33.57785 17.06998,-63.12316 17.74412,-65.65629 0.86164,-3.23769 -0.30774,-4.60568 -3.93698,-4.60568 -2.83948,0 -7.02094,-2.07256 -9.29213,-4.60568 -3.57615,-3.9886 -3.80026,-8.98563 -1.67265,-37.29539 1.35123,-17.97934 3.66028,-34.13981 5.13122,-35.91218 1.47093,-1.77237 7.07342,-3.98215 12.44998,-4.91061 5.37655,-0.92848 15.89861,-2.89316 23.38235,-4.36597 l 13.60681,-2.67788 -6.3682,-18.22718 c -3.50251,-10.02494 -8.94503,-31.57442 -12.09449,-47.88775 -3.14946,-16.3133 -6.07108,-30.11434 -6.49249,-30.66897 -0.42142,-0.55463 -10.46904,-2.56202 -22.32805,-4.46085 -11.85902,-1.89883 -23.2017,-5.09228 -25.20596,-7.09654 -2.04354,-2.04355 -4.33901,-11.9328 -5.22621,-22.51529 -0.87015,-10.37913 -2.59464,-18.87116 -3.8322,-18.87116 -1.23756,0 -2.25011,1.26892 -2.25011,2.81981 0,1.55089 -1.77647,4.59628 -3.94772,6.76753 -2.17125,2.17125 -3.96164,8.30433 -3.97865,13.62906 -0.017,5.32472 -1.90391,25.66963 -4.19314,45.21088 -2.28922,19.54124 -4.09053,38.49033 -4.0029,42.10908 0.0876,3.61875 -2.19194,32.51959 -5.06569,64.2241 -5.46557,60.29864 -6.66543,64.42367 -18.80537,64.6513 -4.17646,0.0784 -4.16559,0.97348 0.16878,13.90074 3.84043,11.45406 4.15375,16.15049 1.83211,27.46144 -1.54033,7.50442 -5.46532,16.46315 -8.72219,19.90826 -3.83997,4.06192 -5.9216,9.53023 -5.9216,15.55565 0,12.74555 -5.98827,17.07486 -26.318171,19.02712 l -17.10682,1.64275 -12.31335,-14.46955 c -12.12384,-14.24684 -12.29032,-14.69267 -10.81702,-28.9675 1.39595,-13.52552 1.11857,-14.49795 -4.13552,-14.49795 -7.41263,0 -7.12301,-3.55535 2.11436,-25.9562 5.64356,-13.68579 6.78275,-18.7847 4.19685,-18.7847 -1.95214,0 -9.68425,-8.27555 -17.18247,-18.39007 l -13.63312,-18.39007 9.744,-45.43152 c 5.3592,-24.98735 10.88854,-46.8561 12.28741,-48.59726 1.39888,-1.74116 2.47409,-8.84706 2.38937,-15.79091 -0.16001,-13.11442 4.16915,-69.61995 6.43925,-84.04724 1.19242,-7.57827 -0.21902,-9.52907 -17.13754,-23.68636 -19.48404,-16.3041 -20.22794,-18.00219 -16.84708,-38.45634 1.38994,-8.40908 2.65119,-9.89668 8.52445,-10.05429 15.85892,-0.42558 16.82138,-2.88507 6.03151,-15.41305 l -9.99746,-11.60791 5.72072,-15.79912 5.72073,-15.79913 17.17567,0.62267 17.17568,0.62267 -4.87584,-20.56717 c -2.68171,-11.31194 -4.91628,-21.76011 -4.96571,-23.21815 -0.0494,-1.45804 5.53563,-6.05196 12.41125,-10.20871 l 12.50114,-7.55773 15.894951,8.23485 c 8.74222,4.52917 16.73637,8.23485 17.76477,8.23485 1.0284,0 1.86982,-8.64092 1.86982,-19.20204 l 0,-19.202032 16.83827,-5.474525 16.83826,-5.474526 18.58062,18.754963 c 23.7456,23.96844 38.0494,52.18802 34.059,67.19409 -1.3837,5.20349 -4.49437,11.05229 -6.91258,12.99734 -3.75851,3.0231 -2.10449,3.31841 11.39416,2.03436 8.685,-0.82616 29.70664,-2.26349 46.71477,-3.19406 l 30.92388,-1.69195 0,-23.22158 c 0,-21.01304 0.5563,-23.61122 5.8492,-27.31853 3.2171,-2.25333 9.6183,-4.09697 14.2249,-4.09697 7.0714,0 9.3968,-1.74236 14.9326,-11.18843 3.6062,-6.15363 8.9811,-13.38235 11.9441,-16.0638 2.963,-2.681459 6.1783,-8.601608 7.1452,-13.155888 3.2805,-15.452106 7.2535,-17.491873 34.0699,-17.491873 26.3021,0 32.8977,3.137806 32.8977,15.6507 0,3.313681 3.6379,10.16822 8.0843,15.232311 4.4463,5.06408 9.9951,13.21458 12.3306,18.11221 3.6767,7.71016 5.5317,8.90477 13.8274,8.90477 16.0662,0 21.0259,7.87097 21.0259,33.36755 l 0,21.18512 30.9239,1.7615 c 17.0081,0.96883 38.0297,2.44674 46.7147,3.28426 13.9487,1.3451 15.2275,1.08957 10.9611,-2.19028 -8.7282,-6.71005 -9.3839,-20.03794 -1.9117,-38.86101 5.1581,-12.99356 11.5825,-22.07505 27.3519,-38.66418 l 20.6104,-21.681776 16.2351,5.777854 16.2351,5.777853 0.7732,19.069279 c 0.4253,10.48811 1.2911,19.06929 1.9241,19.06929 0.6329,0 8.613,-3.67979 17.7335,-8.17732 l 16.5827,-8.17731 12.4171,7.50019 c 6.8294,4.12511 12.3766,8.69314 12.3272,10.15118 -0.049,1.45804 -2.284,11.90621 -4.9657,23.21815 l -4.8758,20.56717 17.3811,-0.63012 17.3812,-0.63012 5.116,15.9939 5.1161,15.99391 -9.7347,11.37274 c -8.6226,10.07362 -9.1972,11.58498 -5.0303,13.23066 2.5873,1.02186 7.8062,1.94116 11.5974,2.0429 5.8733,0.15762 7.1345,1.64521 8.5244,10.05429 3.3819,20.4599 2.6404,22.14936 -16.8942,38.49605 -18.3147,15.32589 -18.4712,15.56709 -17.0781,26.31818 2.4669,19.03815 6.5019,70.97222 6.4464,82.9717 -0.029,6.37416 0.9857,12.29575 2.2559,13.15909 1.2702,0.86337 6.8251,22.53534 12.3441,48.15996 l 10.0345,46.59018 -13.6155,18.3663 c -7.4885,10.10147 -15.0163,18.83324 -16.7284,19.40392 -2.1662,0.72207 -0.9306,6.59984 4.0627,19.32686 8.5711,21.84628 8.7946,24.73843 1.9119,24.73843 -4.2247,0 -5.2637,1.75456 -5.2637,8.88913 0,4.88899 1.699,10.29912 3.7755,12.02246 3.1584,2.62126 1.1468,5.91272 -12.3083,20.13896 l -16.0837,17.0056 -15.9838,-1.72724 c -19.2899,-2.0845 -25.1951,-6.55262 -25.1951,-19.06378 0,-6.02542 -2.0816,-11.49373 -5.9216,-15.55565 -9.2587,-9.79382 -12.2755,-30.52638 -6.7899,-46.6628 4.2095,-12.38257 4.2125,-13.29028 0.047,-14.52395 -13.354,-3.95536 -13.2928,-3.74181 -18.7839,-65.60585 -2.874,-32.37882 -4.6119,-59.86326 -3.8621,-61.07655 0.7499,-1.21327 0.1469,-6.61184 -1.34,-11.99678 -1.4868,-5.38494 -4.1229,-27.36791 -5.858,-48.85102 -2.6769,-33.14532 -3.9942,-40.03729 -8.6991,-45.51272 -3.0494,-3.54889 -6.395,-6.45253 -7.4345,-6.45253 -1.0396,0 -1.8901,8.20427 -1.8901,18.23171 0,16.28546 -0.6985,18.78113 -6.5432,23.37858 -3.7489,2.94892 -13.0211,5.92356 -21.7125,6.96563 -27.259,3.2683 -25.5125,1.59059 -29.1033,27.95688 -1.7684,12.98442 -6.712,34.48137 -10.9857,47.771 -4.2737,13.28963 -7.3879,24.54541 -6.9205,25.01283 0.4674,0.46743 10.7835,2.68279 22.9246,4.92307 12.1411,2.24026 23.4146,5.79308 25.0523,7.89514 1.6377,2.10206 3.8312,18.62067 4.8744,36.70802 2.0062,34.78219 0.6357,40.65259 -9.4902,40.65259 -2.7177,0 -4.9414,1.3436 -4.9414,2.9858 0,1.64217 5.9854,25.03246 13.3008,51.97841 23.1136,85.13823 19.7995,76.6267 29.836,76.6267 l 8.7761,0 5.2536,25.66022 c 3.6899,18.02275 4.8851,31.76849 4.0154,46.18267 -0.965,15.99688 -0.352,21.5103 2.7802,25.00227 7.198,8.02468 51.8379,112.92456 51.8379,121.8145 0,4.99471 -2.6964,12.03096 -6.5432,17.07439 l -6.5432,8.57859 5.7844,25.69776 c 3.8499,17.1035 4.8428,26.01163 2.9687,26.63629 -1.5486,0.51623 -5.0115,2.54418 -7.6952,4.50659 -7.2869,5.32828 -1.9086,10.06689 22.6711,19.97501 11.8105,4.7608 20.9393,10.0062 20.9393,12.0318 0,1.9752 2.9608,5.5312 6.5795,7.9023 5.3624,3.5136 6.5796,6.4459 6.5796,15.8516 l 0,11.5405 -100.0091,0 -100.0091,0 0,-12.8369 c 0,-7.8005 1.4475,-14.0381 3.6895,-15.8988 2.0292,-1.6841 4.4006,-5.8953 5.2697,-9.3582 0.8692,-3.4629 3.9462,-7.0471 6.8378,-7.9648 4.188,-1.3292 5.2575,-3.98452 5.2575,-13.05295 0,-7.22644 -1.3204,-11.89095 -3.6154,-12.77161 -1.9885,-0.76306 -4.4622,-5.90132 -5.4972,-11.41835 -2.9122,-15.5232 -5.5712,-18.57484 -17.7903,-20.41685 -10.2112,-1.53933 -12.2048,-3.16153 -21.4327,-17.44004 l -10.1741,-15.74282 0.7598,-69.06183 c 0.4178,-37.98398 0.221,-76.42539 -0.4376,-85.42531 -1.1257,-15.38295 -1.8626,-16.93289 -12.2981,-25.8653 -11.5815,-9.9133 -13.4057,-14.62641 -7.7178,-19.93974 3.3778,-3.15536 1.7352,-10.33449 -18.8955,-82.58145 l -4.5092,-15.79091 -42.5066,-0.72256 -42.5067,-0.72259 -2.7109,9.93395 c -1.491,5.46366 -7.4164,27.06809 -13.1677,48.00987 -9.2284,33.60294 -10.006,38.57405 -6.6193,42.31631 5.9765,6.604 4.7207,9.59074 -7.9363,18.87548 -11.2729,8.26939 -11.7682,9.19663 -11.641,21.7959 0.073,7.2375 -0.9012,16.71205 -2.165,21.05455 -1.2637,4.3425 -1.4617,36.91125 -0.4398,72.375 l 1.8578,64.47954 -9.76084,15.79091 c -9.05535,14.64954 -10.70265,15.99032 -22.7907,18.54971 l -13.02985,2.75878 -3.52477,14.34804 c -1.93863,7.8914 -5.1955,15.2951 -7.2375,16.45265 -2.07867,1.17834 -3.71273,6.12606 -3.71273,11.24165 0,7.19218 1.40047,9.7751 6.57955,12.13487 3.61875,1.6488 6.57954,4.95 6.57954,7.336 0,2.3859 1.73881,6.637 3.86403,9.4468 2.12521,2.8098 3.90169,10.7342 3.94773,17.6099 l 0.0837,12.5011 -98.69318,0 -98.693181,0 0,-11.9258 z m 186.859081,-1.687 c 0,-6.8275 -9.57449,-23.0424 -15.13295,-25.6285 -5.31709,-2.4737 -5.92159,-4.6414 -5.92159,-21.23405 0,-14.45476 0.83764,-18.47915 3.84629,-18.47915 2.32765,0 4.96094,-4.41627 6.6694,-11.18523 4.9488,-19.60718 7.18492,-23.02541 15.08811,-23.06433 13.13748,-0.0648 17.89431,-2.75381 25.14491,-14.21453 l 7.15129,-11.30374 0,-57.13911 c 0,-33.06522 -1.109,-59.21128 -2.6322,-62.0574 -1.78398,-3.33339 -1.70577,-7.30606 0.24271,-12.32812 1.58119,-4.0754 3.32023,-15.5954 3.86454,-25.59999 0.93569,-17.19798 1.50844,-18.61777 10.50024,-26.02957 6.1702,-5.08602 8.4478,-8.49622 6.4847,-9.70949 -2.1554,-1.3321 1.2486,-17.5447 11.8323,-56.35628 9.9038,-36.31796 14.0177,-55.53597 12.3375,-57.63442 -1.3865,-1.73153 -3.3291,-12.62278 -4.3169,-24.20278 -2.7078,-31.74023 -1.6021,-30.26591 -22.6993,-30.26591 l -18.24541,0 0,7.89546 c 0,7.81571 -0.14622,7.89545 -14.475,7.89545 -14.39224,0 -14.475,-0.0461 -14.475,-8.05434 0,-7.67285 -0.4585,-8.01562 -9.68107,-7.2375 l -9.68106,0.81684 -12.5791,46.05682 c -6.9185,25.33125 -15.73317,57.60392 -19.58814,71.71704 l -7.00904,25.66023 -8.70557,0 c -8.44373,0 -8.80928,0.45514 -12.15388,15.13295 -2.01353,8.83641 -3.13285,26.50362 -2.69015,42.46091 0.66397,23.93297 0.1288,28.01989 -4.30784,32.89773 -7.45257,8.19369 -50.45869,105.63907 -50.45869,114.33178 0,4.52928 2.57214,9.85277 6.57954,13.61753 7.89096,7.41317 8.02756,11.23791 1.31591,36.84545 -2.84539,10.85625 -5.19373,20.01882 -5.21853,20.36127 -0.0247,0.34246 4.20432,2.39817 9.39805,4.56823 5.19375,2.1701 9.01188,4.85071 8.48475,5.95691 -9.72206,20.40254 -10.66946,21.29684 -30.49738,28.78894 -12.909351,4.8779 -21.127281,9.6994 -23.888331,14.0155 -2.31496,3.6188 -5.71784,7.5267 -7.56196,8.6842 -9.80712,6.1559 1.54026,7.1067 84.812951,7.1067 65.66526,0 88.1659,-0.7874 88.1659,-3.0855 z m 446.10465,0.4351 c 0.9009,-1.4577 -0.3042,-3.3957 -2.6781,-4.3067 -2.3738,-0.9109 -5.3153,-4.2843 -6.5366,-7.4964 -1.555,-4.09 -8.5596,-8.3956 -23.3726,-14.3667 -17.044,-6.8704 -22.1964,-10.29608 -26.528,-17.63764 -7.137,-12.09641 -6.8822,-13.44067 3.4856,-18.38475 l 8.8614,-4.22567 -6.4136,-23.46674 -6.4136,-23.46674 8.0795,-9.20202 c 4.4438,-5.06114 8.0795,-11.38856 8.0795,-14.06096 0,-6.88555 -46.7571,-111.46457 -51.4144,-114.99579 -2.9441,-2.23228 -3.8537,-9.3044 -3.8537,-29.96249 0,-14.87227 -1.378,-34.51908 -3.0622,-43.6596 -3.0173,-16.37543 -3.196,-16.63066 -12.1873,-17.41024 l -9.125,-0.79117 -16.7758,-61.84773 c -9.2267,-34.01625 -17.9999,-66.28892 -19.4961,-71.71704 -2.475,-8.97984 -3.5412,-9.86932 -11.8301,-9.86932 -8.3676,0 -9.1099,0.64338 -9.1099,7.89546 0,7.81571 -0.1463,7.89545 -14.475,7.89545 -14.3288,0 -14.475,-0.0797 -14.475,-7.89545 l 0,-7.89546 -19.1849,0 -19.185,0 -4.4158,32.36944 -4.4159,32.36947 12.027,43.2953 c 16.5616,59.61913 16.6386,59.97795 13.1583,61.3021 -1.6423,0.62482 1.1004,4.64424 6.0949,8.93202 8.525,7.31877 9.2179,9.14947 11.3193,29.90588 2.4867,24.56247 2.6861,121.10958 0.2862,138.5369 -1.3118,9.5256 -0.3074,13.06906 6.8784,24.26726 6.9276,10.79564 10.1189,13.39972 18.059,14.73573 17.9611,3.02215 18.3874,3.38873 21.8305,18.77445 2.2892,10.22887 4.7495,15.10679 8.0559,15.97142 3.997,1.04523 4.7603,4.0819 4.7603,18.93817 0,16.02396 -0.5843,17.95946 -6.1925,20.51476 -6.681,3.0441 -18.5627,23.1148 -16.0708,27.1468 2.1322,3.4501 174.101,3.2627 176.2361,-0.1921 z M 92.984209,594.43099 c 0.70197,-8.53493 0.0979,-9.95443 -3.90768,-9.18301 -3.18543,0.61345 -5.26917,4.1803 -6.35899,10.88498 -1.47,9.04362 -1.106,9.89901 3.90769,9.18305 4.33903,-0.61964 5.70734,-2.96182 6.35898,-10.88502 z m 593.095721,0.88414 c -0.7843,-8.22504 -2.0946,-10.52728 -5.9911,-10.52728 -3.8976,0 -4.9872,1.91663 -4.9872,8.77272 0,9.81195 1.5577,12.28183 7.7457,12.28183 3.3555,0 4.0278,-2.18946 3.2326,-10.52727 z m -562.5322,3.75973 c 2.27465,-2.27462 4.13572,-7.65774 4.13572,-11.96243 0,-7.61229 -0.27039,-7.77699 -9.86932,-6.01194 -9.8234,1.80635 -13.69997,4.82755 -13.77674,10.73687 -0.0546,4.19836 7.39136,11.37322 11.80288,11.37322 1.96446,0 5.43282,-1.86106 7.70746,-4.13572 z m 536.5713,-0.56702 c 5.128,-5.66636 3.1168,-16.33585 -3.0891,-16.38773 -2.3643,-0.021 -6.9635,-0.75007 -10.2203,-1.62288 -5.192,-1.39139 -5.9216,-0.5994 -5.9216,6.4275 0,8.2627 5.7261,16.28585 11.6232,16.28585 1.8435,0 5.267,-2.11622 7.6078,-4.70274 z m -233.0837,-1.21885 c 4.7619,-6.02315 6.0122,-18.57906 8.583,-86.19204 1.4035,-36.91125 3.3183,-75.69767 4.2552,-86.19204 1.4819,-16.59814 1.1439,-19.08069 -2.5978,-19.08069 -3.3434,0 -4.3014,2.63772 -4.3014,11.84319 0,6.51375 -0.92,11.84318 -2.0444,11.84318 -1.1245,0 -10.2722,-8.29131 -20.3284,-18.4251 l -18.2839,-18.42509 19.6704,-19.8341 19.6704,-19.83406 1.3159,12.59893 c 1.0869,10.40579 2.2322,12.59896 6.5796,12.59896 4.3293,0 5.573,-2.33563 7.0069,-13.15909 2.4382,-18.40422 2.6364,-130.29718 0.2306,-130.17361 -1.0857,0.0558 -4.3425,3.8606 -7.2375,8.45521 -19.4866,30.92673 -80.5908,34.07156 -106.8944,5.50148 -3.7868,-4.11319 -8.192,-9.84716 -9.7892,-12.74216 -2.1818,-3.95439 -2.924,11.18376 -2.9841,60.86079 -0.044,36.36844 0.6694,69.87169 1.5854,74.45166 2.4232,12.11584 7.4146,8.42424 8.3596,-6.18261 l 0.8136,-12.57688 18.925,18.04624 c 10.4087,9.92543 19.3614,19.05942 19.8948,20.29774 1.0464,2.42941 -33.7026,38.54169 -37.0867,38.54169 -1.1245,0 -2.0445,-5.32943 -2.0445,-11.84318 0,-7.05954 -1.203,-11.84319 -2.9783,-11.84319 -2.023,0 -2.4189,3.58786 -1.2342,11.18523 0.9593,6.15188 2.8313,41.38534 4.16,78.29659 2.2619,62.83302 5.253,96.15108 9.2061,102.5474 2.5747,4.16598 84.2246,3.63956 87.5483,-0.56445 z m -325.25193,-25.75916 25.4204,-3.12244 -3.30878,-9.57453 c -2.96096,-8.56806 -4.52655,-9.76154 -14.89313,-11.35334 -6.37139,-0.97833 -16.532611,-1.86657 -22.580481,-1.97387 -10.97463,-0.19475 -11.0068,-0.16659 -16.44886,14.37865 -6.74262,18.02125 -6.74654,17.88579 0.46886,16.17334 3.25687,-0.77296 17.36077,-2.81047 31.341991,-4.52781 z m 602.26823,4.28084 c 0,-0.59492 -2.533,-7.70083 -5.6289,-15.79091 -5.5969,-14.62575 -5.6902,-14.70807 -16.4488,-14.51411 -5.951,0.10738 -16.033,0.99554 -22.4044,1.97387 -10.3667,1.59183 -11.9321,2.7852 -14.8933,11.35403 l -3.3091,9.57526 28.0525,3.88515 c 35.1574,4.86918 34.632,4.81583 34.632,3.51671 z M 139.54002,534.12536 c 0.64026,-1.80938 3.33518,-27.44289 5.9887,-56.96339 4.72314,-52.54504 4.72014,-53.70093 -0.14296,-54.97265 -3.57589,-0.93514 -4.54953,-2.85647 -3.47542,-6.85821 0.82068,-3.05754 1.50832,-8.08576 1.52809,-11.1738 0.0205,-3.20187 2.10031,-6.15448 4.83988,-6.87089 4.21161,-1.10136 5.22778,-6.48925 8.24131,-43.69673 2.26829,-28.00601 4.60488,-43.40943 6.87007,-45.28938 1.88798,-1.56688 4.19337,-6.31222 5.12309,-10.5452 1.43102,-6.51537 2.44001,-7.29513 6.5757,-5.08178 7.16904,3.83676 7.86315,3.38602 7.86315,-5.10611 0,-6.46609 -1.17604,-7.85596 -7.2375,-8.55341 -6.75043,-0.77672 -7.29103,-1.76261 -8.03299,-14.64981 -0.76382,-13.26687 -0.52803,-13.81704 5.92159,-13.81704 6.08205,0 6.71708,-0.99525 6.71708,-10.52728 0,-8.98819 -0.81988,-10.52727 -5.60799,-10.52727 -5.01581,0 -5.43573,-1.04216 -3.97669,-9.86932 0.89721,-5.42812 1.64433,-13.1409 1.66026,-17.1395 0.0237,-5.93145 2.72214,-8.993 14.65457,-16.62608 8.04408,-5.14573 15.30088,-11.11563 16.12622,-13.26643 2.93047,-7.63668 -12.20533,-36.19853 -28.86637,-54.47195 l -16.36045,-17.94374 -9.86932,4.16201 -9.86932,4.16202 0,23.65104 c 0,13.00808 -0.84583,23.65105 -1.87962,23.65105 -1.03379,0 -11.2333,-4.86633 -22.66558,-10.81405 -18.582941,-9.66791 -21.452021,-10.45759 -27.070381,-7.45073 -7.60503,4.07009 -7.6169,4.45083 -1.02078,32.73977 2.895,12.41586 5.26364,23.24385 5.26364,24.06221 0,0.81835 -9.24427,0.66961 -20.54281,-0.33054 l -20.54281,-1.81846 -2.7605,8.99453 c -2.64644,8.62289 -2.17823,9.67283 11.33144,25.41037 7.75057,9.02871 14.09195,17.51939 14.09195,18.86818 0,1.34879 -3.25687,2.46538 -7.2375,2.48131 -18.21322,0.0729 -26.51778,3.05091 -28.30747,10.15107 -1.52231,6.03937 0.22128,8.68875 13.60972,20.67997 8.44564,7.56425 17.3538,13.78192 19.79592,13.81705 3.49801,0.0503 4.18037,1.87888 3.21568,8.61727 -0.67349,4.70437 -2.87138,26.31818 -4.8842,48.03068 -3.15446,34.02756 -3.14423,39.88065 0.0741,42.39922 2.15197,1.68407 3.73376,7.53763 3.73376,13.81704 0,9.03014 -0.87441,10.8951 -5.10831,10.8951 -2.80957,0 -5.74703,1.03346 -6.52767,2.29657 -2.03572,3.29386 -17.31402,75.80392 -17.31402,82.17147 0,2.93124 4.22745,10.88402 9.39434,17.67279 l 9.39433,12.34325 29.42499,2.92666 c 41.021581,4.08009 46.531041,4.12188 47.861101,0.36312 z m 114.4707,-1.97387 c 0,-4.45385 -1.75455,-5.26363 -11.40454,-5.26363 -6.27251,0 -12.13604,-0.73149 -13.03009,-1.62555 -0.89404,-0.89402 7.49488,-10.28367 18.64205,-20.86587 l 20.26758,-19.24032 19.08068,18.82613 c 10.49443,10.35439 19.08073,19.74403 19.08073,20.86587 0,1.12186 -5.3295,2.03974 -11.8432,2.03974 -10.17683,0 -11.84321,0.75754 -11.84321,5.38388 0,4.96908 1.36868,5.32393 17.76481,4.60568 l 17.7647,-0.7782 0.6274,-34.21364 c 0.345,-18.81749 -0.8393,-47.83329 -2.6319,-64.47954 l -3.2591,-30.26591 -11.1852,-0.80928 -11.1852,-0.80928 0,-13.00777 0,-13.00776 9.2113,0 9.2114,0 0,-92.11363 0,-92.11363 -8.5534,-0.0266 c -20.32983,-0.0633 -101.13437,5.84268 -105.93072,7.74247 -4.79517,1.89933 -5.18787,4.10821 -4.41231,24.81862 l 0.85132,22.73373 7.70209,0 c 7.37385,0 7.70208,-0.50471 7.70208,-11.84318 0,-6.51375 0.91788,-11.84319 2.03974,-11.84319 1.12185,0 10.6712,8.68947 21.22079,19.30994 l 19.18106,19.30993 -21.22079,19.13026 -21.2208,19.13026 0,-12.12201 c 0,-11.34231 -0.44622,-12.12201 -6.9373,-12.12201 l -6.9373,0 1.90052,30.92386 c 1.04529,17.00812 2.37751,31.40422 2.96048,31.99135 0.58297,0.58714 11.816,2.54639 24.96228,4.35392 13.14628,1.80754 24.23472,3.69579 24.64098,4.19615 0.40625,0.50033 2.70678,13.88771 5.11228,29.74973 2.40551,15.86199 8.52368,40.73267 13.59596,55.26818 5.07227,14.53548 9.49748,27.5335 9.8338,28.88447 0.33632,1.35096 -11.82386,4.90391 -27.02261,7.89545 l -27.63409,5.43915 -1.71358,14.475 c -0.94247,7.96125 -1.83071,21.28483 -1.97386,29.60796 l -0.26028,15.13295 18.42272,0 c 16.66818,0 18.42273,-0.50131 18.42273,-5.26364 z m 231.60001,0 c 0,-4.48383 -1.7546,-5.26363 -11.8432,-5.26363 -6.5137,0 -11.8432,-0.91788 -11.8432,-2.03974 0,-1.12184 8.5948,-10.57715 19.0996,-21.01178 l 19.0995,-18.97204 20.3929,18.60674 c 11.2161,10.23372 19.724,19.68903 18.9065,21.01178 -0.8175,1.32278 -6.7459,2.40504 -13.1743,2.40504 -9.9332,0 -11.6878,0.79015 -11.6878,5.26363 0,4.7627 1.7546,5.26364 18.4359,5.26364 l 18.436,0 -1.5495,-26.97614 c -0.8522,-14.83687 -1.9355,-28.27457 -2.4073,-29.86153 -0.4717,-1.58696 -13.4001,-5.03522 -28.7296,-7.66277 -15.3295,-2.62758 -27.8719,-5.75789 -27.8719,-6.95624 0,-1.19837 2.9502,-9.59329 6.5559,-18.6554 8.6493,-21.73814 16.9764,-54.66494 18.9172,-74.80185 0.8595,-8.91892 2.4017,-17.57352 3.427,-19.23246 1.0252,-1.65892 11.8538,-4.49323 24.0635,-6.29844 12.2096,-1.80525 23.6446,-4.17549 25.4111,-5.26722 2.2249,-1.3751 3.2117,-11.23616 3.2117,-32.09554 0,-28.35604 -0.3067,-30.11058 -5.2636,-30.11058 -4.4977,0 -5.2637,1.75454 -5.2637,12.05662 l 0,12.05662 -21.1703,-19.11569 -21.1703,-19.1157 19.1306,-19.25911 c 10.5218,-10.59251 20.0484,-19.25911 21.1703,-19.25911 1.1219,0 2.0397,5.32944 2.0397,11.84319 0,10.68012 0.608,11.84318 6.1913,11.84318 5.8901,0 6.2767,-1.11133 7.947,-22.84123 1.1426,-14.86425 0.7981,-23.43306 -0.9862,-24.53585 -3.2161,-1.98765 -112.7991,-9.13044 -114.4683,-7.46122 -0.6229,0.62283 -1.2732,41.93596 -1.4452,91.80695 l -0.3128,90.67452 6.7962,0.83276 c 6.2762,0.76905 6.7962,1.8263 6.7962,13.81705 l 0,12.98428 -8.9349,0 c -8.5187,0 -9.0058,0.52113 -10.4553,11.18523 -0.8362,6.15188 -2.3127,35.75983 -3.2812,65.79545 l -1.761,54.61023 18.7958,0 c 17.0411,0 18.7957,-0.49136 18.7957,-5.26364 z m 197.9689,1.0277 22.9529,-1.73931 9.8359,-14.28125 9.8359,-14.28124 -7.5567,-37.34137 c -9.2976,-45.94433 -10.4282,-49.18452 -17.1627,-49.18452 -4.4923,0 -5.3287,-1.71016 -5.3287,-10.8951 0,-6.01728 1.6067,-12.20327 3.5888,-13.81704 3.0155,-2.4551 3.0436,-8.38834 0.1761,-37.13559 -4.5277,-45.39002 -4.6539,-61.83047 -0.4751,-61.91158 1.8094,-0.0351 10.1999,-6.2528 18.6455,-13.81705 13.4095,-12.01012 15.1336,-14.63417 13.6036,-20.7044 -1.8605,-7.38073 -9.144,-10.1556 -26.6566,-10.1556 -4.8853,0 -8.8823,-1.10356 -8.8823,-2.45235 0,-1.34879 6.3413,-9.83947 14.0919,-18.86818 13.5097,-15.73754 13.9779,-16.78748 11.3314,-25.41037 l -2.7604,-8.99453 -20.5429,1.81846 c -11.2985,1.00015 -20.5428,1.33911 -20.5428,0.75325 0,-0.58585 2.343,-11.66406 5.2067,-24.61824 6.5317,-29.54698 6.5631,-28.57817 -1.0578,-32.65677 -5.7508,-3.07771 -8.3606,-2.34451 -26.5203,7.45073 -11.078,5.9754 -21.2352,10.86437 -22.5716,10.86437 -1.3363,0 -2.4478,-9.77063 -2.47,-21.7125 -0.021,-11.94188 -0.9104,-22.92093 -1.9739,-24.39789 -1.0634,-1.47696 -5.4865,-4.25252 -9.829,-6.1679 -7.8298,-3.45358 -8.0314,-3.33283 -24.2559,14.52856 -16.6559,18.33641 -31.7878,46.92613 -28.8664,54.5393 0.8254,2.1508 8.0822,8.1207 16.1263,13.26643 13.0265,8.33298 14.6256,10.3306 14.6256,18.27096 0,4.90329 0.7402,12.61607 1.6448,17.13951 1.4295,7.14719 0.9124,8.22443 -3.9477,8.22443 -4.7702,0 -5.5926,1.54813 -5.5926,10.52727 0,9.53203 0.635,10.52728 6.7171,10.52728 6.4496,0 6.6854,0.55017 5.9216,13.81704 -0.742,12.8872 -1.2826,13.87309 -8.033,14.64981 -6.0615,0.69745 -7.2375,2.08732 -7.2375,8.55341 0,8.53522 0.6749,8.95314 8.0685,4.99623 4.2028,-2.24929 5.0906,-1.85221 5.0906,2.27689 0,2.75072 2.193,7.82574 4.8733,11.27783 3.852,4.96121 5.5914,15.03681 8.3001,48.07986 3.0155,36.78574 4.0101,41.95587 8.2858,43.074 3.2655,0.85394 4.859,3.6887 4.859,8.64389 0,4.05529 0.6591,9.09095 1.4647,11.19036 0.9144,2.38292 -0.5629,4.34736 -3.932,5.22839 -4.2598,1.11397 -5.138,2.98885 -4.1682,8.89928 0.6758,4.1184 3.162,28.80573 5.5249,54.86073 2.3629,26.055 4.9174,48.39655 5.6767,49.64788 0.7593,1.25135 8.0367,1.57785 16.172,0.72556 8.1353,-0.85229 25.1202,-2.33232 37.7444,-3.28893 z m -269.028,-282.39662 c 14.4814,-7.31369 23.1484,-22.05938 26.7441,-45.50138 3.0563,-19.92476 3.2437,-20.27671 11.2105,-21.05454 l 8.1022,-0.79105 0.7918,-18.36019 c 0.91,-21.10163 -1.9167,-25.06481 -17.8772,-25.06481 -8.6165,0 -10.0216,-1.07408 -15.1117,-11.55094 -3.0865,-6.35301 -9.1406,-15.56992 -13.4534,-20.48201 -4.3129,-4.91208 -8.2412,-12.445582 -8.7297,-16.741102 l -0.888,-7.810037 -20.9466,0 -20.9467,0 -1.7312,8.464675 c -0.9521,4.655572 -5.4346,12.682644 -9.961,17.837944 -4.5265,5.1553 -10.6298,14.07762 -13.5631,19.82737 -4.6358,9.08676 -6.503,10.4541 -14.276,10.4541 -16.4706,0 -17.2685,1.10754 -17.2685,23.96794 l 0,20.77296 8.8308,0 8.8307,0 1.5873,16.99757 c 2.7124,29.04702 15.4067,46.81324 37.9175,53.0673 15.2337,4.2323 37.9464,2.42659 50.7382,-4.0338 z" \
       style="fill:#000000" /> \
';

svg += "</g></g></svg>";

	return svg;

}

function createCritAllocationTable( critData, xPos, yPos, rollAgainTranslated) {

	var textSVG = "";
	var backgroundSVG = "";
	var graphicsSVG = "";

	fontSize = 25;
	boxWidth = 275;
	lineBuffer = 6;

	var lineCount = 0;
	var dieNumber = 1;
	lastName = "";
	yStartBox = -1;
	lastWasPlaceHolder = false;
	lastRollAgain = false;


	for( var critC = 0; critC < critData.length; critC++ ) {
		//~ console.log( "critData", critData[ critC ] )

		if( critData[ critC ] ) {
			if( critData[ critC ].name == "placeholder" ) {
				textSVG += "<text x=\"" + ( xPos ) + "\" y=\"" + ( yPos + lineCount * (fontSize + lineBuffer) ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + fontSize + "\">" + lastName + "</text>\n";
				lastWasPlaceHolder = true;
			} else {
				if( critData[ critC ].rollAgain ) {
					textSVG += "<text x=\"" + ( xPos ) + "\" y=\"" + ( yPos + lineCount * (fontSize + lineBuffer) ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + fontSize + "\">(" + critData[ critC ].name + ")</text>\n";
				} else {
					textSVG += "<text x=\"" + ( xPos ) + "\" y=\"" + ( yPos + lineCount * (fontSize + lineBuffer) ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + fontSize + "\">" + critData[ critC ].name + "</text>\n";

				}
				lastName = critData[ critC ].name;
				if(  critData[ critC ].rollAgain )
					lastRollAgain = true;
				else
					lastRollAgain = false;

				if( yStartBox > -1  && lastWasPlaceHolder) {

					var boxHeight = (yPos + lineCount * (fontSize + lineBuffer) - yStartBox - lineBuffer );

					if( critC == 6 ) {
						var boxHeight = (yPos + (lineCount - 1 ) * (fontSize + lineBuffer) - yStartBox - lineBuffer );
					}
					backgroundSVG += "<rect x=\"" + ( xPos - 10 ) + "\" rx=\"15\" ry=\"15\" y=\"" + (yStartBox - fontSize + 2) + "\" width=\"" + boxWidth  + "\" height=\"" + boxHeight + "\" stroke=\"" + colorMediumGray + "\" stroke-width=\"2\" fill=\"" + colorVeryLightGray + "\" />\n";

				}
				yStartBox = yPos + lineCount * (fontSize + lineBuffer);
				lastWasPlaceHolder = false;
			}

		} else {
			textSVG += "<text x=\"" + ( xPos ) + "\" y=\"" + ( yPos + lineCount * (fontSize + lineBuffer) ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + fontSize + "\">(" + rollAgainTranslated + ")</text>\n";
			if( yStartBox > -1  && lastWasPlaceHolder) {

				var boxHeight = (yPos + lineCount * (fontSize + lineBuffer) - yStartBox - lineBuffer );

				if( critC == 6 ) {
					var boxHeight = (yPos + (lineCount - 1 ) * (fontSize + lineBuffer) - yStartBox - lineBuffer );
				}
				backgroundSVG += "<rect x=\"" + ( xPos - 10 ) + "\" rx=\"15\" ry=\"15\" y=\"" + (yStartBox - fontSize + 2) + "\" width=\"" + boxWidth  + "\" height=\"" + boxHeight + "\" stroke=\"" + colorMediumGray + "\" stroke-width=\"2\" fill=\"" + colorVeryLightGray + "\" />\n";

			}
			lastWasPlaceHolder = false;

		}

		textSVG += "<text x=\"" + ( xPos - 40 ) + "\" y=\"" + ( yPos + lineCount * (fontSize + lineBuffer) ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + fontSize + "\">" + dieNumber + ".</text>\n";



		lineCount++;
		dieNumber++;
		if( critC == 5 ) {
			lineCount++;
			var dieNumber = 1;
		}

		if( critC == critData.length - 1 ) {
			if( yStartBox > -1  && lastWasPlaceHolder) {

				var boxHeight = (yPos + lineCount * (fontSize + lineBuffer) - yStartBox - lineBuffer );

				if( critC == 5 ) {
					var boxHeight = (yPos + (lineCount - 1 ) * (fontSize + lineBuffer) - yStartBox - lineBuffer );
				}
					backgroundSVG += "<rect x=\"" + ( xPos - 10 ) + "\" rx=\"15\" ry=\"15\" y=\"" + (yStartBox - fontSize + 2) + "\" width=\"" + boxWidth  + "\" height=\"" + boxHeight + "\" stroke=\"" + colorMediumGray + "\" stroke-width=\"2\" fill=\"" + colorVeryLightGray + "\" />\n";

			}
		}
	}

	if( critData.length > 6 ) {
		graphicsSVG += "<text x=\"" + ( xPos - 80 ) + "\" y=\"" + ( yPos + 2.75 * (fontSize + lineBuffer) ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + fontSize * 1.25 + "\">1-3</text>\n";
		graphicsSVG += "<text x=\"" + ( xPos - 80 ) + "\" y=\"" + ( yPos + 9.75 * (fontSize + lineBuffer) ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + fontSize * 1.25 + "\">4-6</text>\n";

	}

	return backgroundSVG + graphicsSVG + textSVG;
}

function rsArmorSVG( standAlone, baseFillColor, lineColor, xLoc, yLoc, width) {

	var baseWidth = 744.09448819;
	var baseHeight = 1052.3622047;
	if( typeof( width ) == "undefined" || width == 0) {
		theWidth = 744;
		theHeight = 627;
	} else {
		theWidth = width;
		theHeight = Math.round( width / baseWidth * baseHeight );
	}

	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof(standAlone) == "undefined" )
		standAlone = true;

	if( !baseFillColor )
		baseFillColor = colorTan;

	if( !lineColor )
		lineColor = colorGold;

	var svg = "";

	if( standAlone ) {
		var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

	} else {
		var svg = '<svg \
		    viewBox="0 0 744.09448819 1052.3622047" \
		   height="' + theHeight + 'px" \
		   width="' + theWidth + 'px" \
		   x="' + xLoc + 'px" \
		   y="' + yLoc + 'px" \
		   id=\"rearArmor\" \
		   version="1.1"> \
		  <g> \"';
	  }

  svg += '<g \
     transform="translate(0,-3.75)" \
     id="layer1"><path \
       style="fill:#000000" \
       d="m 58.482148,1046.717 v -9.3952 l 4.532781,-2.1616 c 3.1421,-1.4983 5.347263,-3.8621 7.1875,-7.7044 2.379444,-4.9681 3.56203,-5.9107 11.404719,-9.0907 32.008692,-12.9787 32.313422,-13.1431 35.504702,-19.1587 1.64544,-3.10168 2.76752,-5.85691 2.4935,-6.12271 -0.27401,-0.2658 -3.8732,-2.11175 -7.9982,-4.1021 -4.64506,-2.24129 -7.38092,-4.30887 -7.18716,-5.4316 0.17206,-0.99702 2.80935,-12.1714 5.86063,-24.83192 l 5.5478,-23.01917 -6.79813,-8.19012 c -6.70304,-8.07554 -6.79809,-8.30436 -6.7942,-16.35584 0.004,-7.88185 0.8309,-10.03431 23.79165,-61.91572 16.76366,-37.87865 24.74473,-54.5392 27.02876,-56.4227 l 3.24105,-2.6727 -0.85546,-22.9523 c -0.85527,-22.947 -0.85444,-22.95733 3.5923,-44.72644 2.44627,-11.97579 4.44776,-21.93551 4.44776,-22.13274 0,-0.19724 4.04207,-0.52387 8.98239,-0.72586 l 8.98238,-0.36726 17.86465,-66.25 c 9.82555,-36.4375 17.87723,-66.95313 17.89262,-67.8125 0.0186,-1.038 -1.99688,-1.5625 -6.00415,-1.5625 -4.81327,0 -6.62355,-0.62957 -8.9592,-3.11575 l -2.9271,-3.11577 2.10005,-29.69673 c 1.15503,-16.33322 2.11081,-30.5405 2.12396,-31.57175 0.061,-4.78679 3.14162,-5.97468 27.4817,-10.59702 13.38574,-2.54203 24.48871,-4.77052 24.6733,-4.9522 0.18457,-0.18167 -1.67665,-5.54065 -4.13604,-11.90883 -8.36791,-21.66727 -15.90165,-53.85885 -19.02461,-81.29195 l -0.92495,-8.125 -22.27418,-3.23572 c -20.94481,-3.0426 -22.48873,-3.45292 -25.86923,-6.875 -3.53572,-3.57921 -3.60962,-3.94602 -4.47619,-22.21906 l -0.88111,-18.57977 -4.147,-1.73273 c -5.37988,-2.24785 -5.47428,-2.2293 -5.49435,1.07978 -0.0271,4.47862 -1.40352,8.43586 -2.94123,8.45663 -4.17729,0.0565 -4.65046,2.52062 -8.23377,42.87918 -3.22663,36.34121 -3.92009,41.24826 -6.30189,44.59319 -1.57658,2.2141 -2.06938,3.7585 -1.19929,3.7585 1.0054,0 1.20866,1.29711 0.6366,4.0625 -0.99505,4.81017 -1.00269,7.36053 -0.0421,14.0625 0.39416,2.75 -1.51285,29.16361 -4.23782,58.69691 l -4.95446,53.69691 -4.167,3.5154 c -3.59299,3.03116 -4.8988,3.41535 -9.4795,2.789 -2.92187,-0.39952 -5.3125,-0.23996 -5.3125,0.35458 0,0.59455 1.89476,6.70733 4.21059,13.58397 4.13447,12.27699 4.19101,12.73433 3.12841,25.30109 -1.23287,14.58032 -2.94879,18.81502 -9.18579,22.6697 -5.1927,3.20927 -5.48263,4.1965 -5.62196,19.14327 -0.0746,8.0042 -3.50294,10.20527 -18.562812,11.91774 -19.472571,2.21426 -17.476687,2.9383 -29.581458,-10.73107 l -10.792514,-12.1875 0.78307,-13.125 c 0.430687,-7.21875 1.089171,-14.39063 1.463296,-15.9375 0.622371,-2.57329 0.240099,-2.8125 -4.494515,-2.8125 -2.988788,0 -5.426354,-0.66004 -5.770375,-1.5625 -0.3276,-0.85938 2.783803,-10.18157 6.91423,-20.71597 4.130426,-10.53441 7.509866,-19.67503 7.509866,-20.3125 0,-0.63747 -1.969887,-1.15903 -4.377529,-1.15903 -4.074501,0 -4.966654,-0.80039 -12.888059,-11.5625 -4.680792,-6.35938 -10.325195,-14.1302 -12.543118,-17.2685 l -4.032588,-5.706 9.479888,-44.27649 c 7.623808,-35.60755 10.01574,-44.84689 12.216739,-47.18975 3.286905,-3.49875 4.270823,-11.41435 2.749759,-22.12176 -0.390656,-2.75 0.953457,-23.28125 2.986919,-45.625 l 3.697205,-40.625 -3.165232,-2.39784 c -1.740878,-1.31881 -9.899747,-8.33164 -18.130819,-15.58405 l -14.965586,-13.1862 0.825597,-11.29096 c 0.454079,-6.21003 1.087665,-12.22219 1.407971,-13.36038 0.455948,-1.62019 3.421478,-2.4059 13.660613,-3.61937 7.193032,-0.85247 13.07824,-1.99675 13.07824,-2.54284 0,-0.5461 -4.982951,-6.78026 -11.073225,-13.85371 l -11.073226,-12.8608 4.907356,-13.75689 c 2.699046,-7.56629 5.010122,-13.84055 5.135726,-13.9428 0.125603,-0.10225 7.822119,0.49879 17.103369,1.33566 9.28125,0.83686 17.072497,1.37026 17.313885,1.18533 0.36509,-0.27972 -6.859396,-35.1487 -9.28384,-44.80845 -0.643674,-2.56461 0.52666,-3.66218 10.018124,-9.3953 l 10.74694,-6.49146 18.095693,9.47253 c 9.95264,5.20989 18.37999,9.47253 18.72745,9.47253 0.34746,0 0.63175,-4.41359 0.63175,-9.80797 0,-5.39439 0.35661,-14.83194 0.79247,-20.97235 l 0.79247,-11.16438 13.74671,-4.82151 13.74671,-4.8215 18.4984,19.23135 18.4984,19.23135 7.53161,17.09016 7.53162,17.09015 -2.1317,8.47627 -2.13169,8.47626 -8.37904,5.01289 c -4.60846,2.75708 -8.2004,5.19151 -7.98206,5.40984 0.3797,0.37971 72.67174,-3.82808 94.1736,-5.48141 l 10.3125,-0.79295 v -22.71924 -22.71924 l 3.4375,-3.2621 c 2.90965,-2.76119 5.02439,-3.39801 13.77167,-4.14716 l 10.33418,-0.88506 5.08299,-9.77015 c 2.79565,-5.37358 8.32971,-13.31572 12.29791,-17.6492 6.59766,-7.20499 7.29435,-8.52069 8.14345,-15.37906 0.7763,-6.27031 1.57444,-8.05527 4.86791,-10.88669 l 3.93939,-3.386705 21.31729,-0.0508 21.3173,-0.0508 3.84255,4.062505 c 2.92215,3.08942 4.04597,5.68604 4.69186,10.84064 0.7299,5.82509 1.71966,7.73044 7.03915,13.55081 5.09616,5.57601 12.14204,16.35541 17.35164,26.54605 0.63647,1.24501 4.30918,2.29499 10.93091,3.125 7.8976,0.98993 10.79544,1.94839 13.92835,4.6068 l 3.95595,3.3568 v 22.5807 c 0,18.30597 0.32477,22.5807 1.7156,22.5807 0.94359,0 24.09134,1.42471 51.43945,3.16602 27.34811,1.7413 50.30727,2.97154 51.02036,2.73384 0.71309,-0.2377 -2.32529,-2.61243 -6.75195,-5.27716 -4.42665,-2.66475 -8.41315,-5.38252 -8.85886,-6.03948 -0.44573,-0.65696 -1.47193,-4.5569 -2.28045,-8.66653 l -1.47004,-7.47206 7.28045,-16.83958 7.28044,-16.83958 18.75,-19.34913 18.75,-19.34914 13.75,4.7789 13.75,4.7789 0.77847,13.75 c 0.42817,7.5625 0.85004,17.02203 0.9375,21.02118 l 0.15903,7.27119 18.50979,-9.54209 18.50978,-9.54209 10.2095,6.0209 c 6.18155,3.64549 10.2216,6.83927 10.2402,8.09518 0.0169,1.14085 -1.93802,11.41801 -4.34427,22.83814 -2.40625,11.42012 -4.375,21.47877 -4.375,22.35257 0,1.27888 3.23004,1.30242 16.5625,0.12063 9.10937,-0.80744 16.92457,-1.11201 17.3671,-0.67685 0.87341,0.85887 9.8204,25.47941 9.8204,27.024 0,0.5186 -4.78125,6.46449 -10.625,13.2131 -5.84375,6.7486 -10.625,12.7866 -10.625,13.41777 0,0.63119 5.84591,1.84042 12.99091,2.68719 l 12.99091,1.5396 0.81115,8.32978 c 0.44613,4.58137 1.10389,10.57977 1.4617,13.32977 l 0.65057,5 -16.86935,14.6875 c -9.27815,8.07813 -17.46933,14.6875 -18.20263,14.6875 -1.68207,0 -1.96394,-5.01424 2.55861,45.51666 3.65619,40.85105 3.77527,43.86289 1.86219,47.10147 -1.39942,2.36902 -1.61617,3.72406 -0.6875,4.29801 0.74594,0.46101 1.19626,3.05391 1.00074,5.762 -0.28944,4.00869 0.24836,5.43704 2.89366,7.68532 2.96705,2.52175 4.02999,6.50613 12.24145,45.88654 4.94575,23.71875 9.08909,43.80936 9.20743,44.64581 0.11837,0.83644 -5.29147,9.10207 -12.02178,18.36804 -11.81696,16.26903 -12.40516,16.86035 -17.13815,17.22919 l -4.90121,0.38196 8.07565,20.38664 c 4.44161,11.21267 8.07565,20.9158 8.07565,21.56252 0,0.64673 -2.55471,1.17587 -5.67713,1.17587 h -5.67712 l 0.77651,9.6875 c 0.42709,5.32812 1.22196,11.11083 1.7664,12.85047 1.59678,5.10214 -1.13352,10.2986 -11.79125,22.44178 -10.49735,11.96045 -13.5676,13.74076 -19.89862,11.53845 -2.13058,-0.74114 -7.72185,-1.7382 -12.42504,-2.21568 -12.58348,-1.27749 -14.41159,-3.30781 -15.12908,-16.80252 -0.45188,-8.49915 -1.00956,-10.8751 -2.78726,-11.875 -5.11995,-2.8798 -10.2371,-9.10397 -10.86372,-13.21392 -3.24144,-21.2598 -3.19674,-22.1633 1.83851,-37.16577 l 4.74231,-14.12968 -5.44494,0.81652 c -4.98976,0.74826 -5.81105,0.46652 -9.82448,-3.37032 l -4.37955,-4.18683 -4.93464,-56.25 c -4.47229,-50.97952 -4.76018,-56.5962 -3.07255,-59.94493 1.31062,-2.60067 1.44297,-3.83464 0.44687,-4.16666 -1.72108,-0.5737 -1.91106,-9.01341 -0.2029,-9.01341 0.66679,0 -0.0509,-1.86147 -1.59483,-4.13659 -2.53723,-3.73883 -3.15554,-8.07316 -6.4301,-45.07481 l -3.62294,-40.93822 -3.53223,-0.70643 c -3.13578,-0.62717 -3.53222,-1.2418 -3.53222,-5.47643 0,-5.91521 -1.08168,-6.63257 -6.55354,-4.34627 -4.2724,1.78511 -4.32794,1.90877 -5.1328,11.43028 -0.44751,5.29412 -0.81366,13.53454 -0.81366,18.31207 0,8.14552 -0.25296,8.93567 -4.0625,12.68966 -3.94578,3.88824 -4.69251,4.08791 -25.9892,6.94909 l -21.9267,2.94582 -2.72514,19.48841 c -3.28257,23.47477 -8.32144,44.51205 -15.2966,63.86342 -2.8498,7.90625 -5.46732,15.28243 -5.81674,16.39153 -0.53813,1.70818 3.11803,2.73447 23.90958,6.71144 20.7947,3.97759 24.7996,5.10188 26.2122,7.35846 1.08996,1.74119 2.41304,13.40593 3.82066,33.68458 l 2.15331,31.02101 -2.80332,2.984 c -2.1243,2.26123 -4.37263,3.07361 -9.28223,3.35399 l -6.4789,0.36999 18.20529,67.79677 18.20529,67.79679 8.75276,0.0158 8.75278,0.0158 4.65853,23.4375 4.65855,23.4375 -0.99131,21.25 -0.9913,21.25 3.40761,3.125 c 2.35657,2.16112 10.76698,19.80031 27.2675,57.18824 22.5175,51.02153 23.85988,54.49488 23.85988,61.7367 0,7.45396 -0.20049,7.92166 -7.00641,16.34522 l -7.00642,8.67171 5.75642,23.00585 c 3.16602,12.65323 5.75641,23.75662 5.75641,24.6742 0,0.91759 -3.375,3.28144 -7.5,5.25302 -4.125,1.97157 -7.5,4.10778 -7.5,4.74713 0,0.63937 1.22112,3.33518 2.71361,5.99072 2.50438,4.45593 4.20179,5.45703 22.0125,12.98263 10.61438,4.485 19.81949,8.1545 20.4558,8.1545 0.63631,0 2.208,2.452 3.49263,5.449 1.45322,3.3902 3.96958,6.4587 6.66021,8.1216 3.63291,2.2453 4.45172,3.6008 5.11989,8.4755 0.43745,3.1916 0.79536,7.4118 0.79536,9.3784 v 3.5755 h -95 -95 v -9.7661 c 0,-9.1911 0.21794,-9.975 3.70151,-13.3124 2.54024,-2.4337 3.96156,-5.2804 4.5304,-9.0737 0.77733,-5.1836 1.24939,-5.7336 7.59036,-8.8435 l 6.76148,-3.3162 -0.35438,-11.82978 -0.35437,-11.82983 -3.84855,-0.99454 c -3.75205,-0.9696 -3.93359,-1.36517 -7.23959,-15.77498 l -3.39104,-14.78045 -12.55901,-2.01703 c -6.90745,-1.10935 -12.7275,-2.20139 -12.93344,-2.42674 -0.20593,-0.22536 -4.41692,-6.82837 -9.35775,-14.67338 l -8.98331,-14.26364 1.28671,-59.77428 c 0.70769,-32.87585 1.80273,-60.76971 2.43343,-61.98636 0.79169,-1.52722 0.0636,-5.98961 -2.35161,-14.41352 -2.72347,-9.49889 -3.24557,-13.08275 -2.3572,-16.18032 0.62762,-2.18837 0.78408,-7.01667 0.34771,-10.72955 -0.79116,-6.73162 -0.82465,-6.77533 -11.85738,-15.47818 -6.08518,-4.80013 -11.06397,-9.22034 -11.06397,-9.82269 0,-2.93173 3.1576,-7.46281 5.20065,-7.46281 1.26464,0 2.29935,-0.7903 2.29935,-1.75623 0,-0.96592 -3.01628,-12.6378 -6.70283,-25.9375 -3.68656,-13.2997 -9.63938,-35.15002 -13.22851,-48.55627 l -6.52569,-24.375 h -44.30745 -44.30746 l -1.31369,5 c -4.8393,18.41861 -22.63605,83.59465 -24.18203,88.56047 -1.81688,5.83593 -1.79314,6.08498 0.6405,6.72139 3.27227,0.85571 6.80847,7.46606 5.07957,9.49542 -0.69007,0.81 -5.72365,4.84772 -11.18575,8.97272 -11.14974,8.42032 -11.46666,9.17668 -11.46666,27.36593 0,5.06613 -1.04789,12.55629 -2.43546,17.40838 -1.72899,6.04597 -2.09277,9.30816 -1.25405,11.24602 0.64978,1.50132 1.69101,29.44842 2.31385,62.10467 l 1.13245,59.375 -8.57739,13.75 -8.5774,13.75 -7.2385,2.17607 c -3.98118,1.19684 -9.9057,2.52563 -13.16561,2.95286 -6.67565,0.87492 -6.01343,-0.39546 -10.54473,20.22848 -2.1362,9.72277 -2.50547,10.4168 -6.0269,11.32674 l -3.75126,0.96932 -0.35495,11.87721 -0.35495,11.8772 6.27316,2.9382 c 6.27084,2.9371 6.69138,3.4943 8.15826,10.8094 0.43074,2.1481 2.16023,5.1992 3.84332,6.7804 2.77163,2.6038 3.06016,3.8561 3.06016,13.282 v 10.4071 h -94.375 -94.375002 v -9.3952 z m 183.750002,-2.0867 c 0,-5.007 -0.64,-7.1591 -2.8125,-9.4579 -1.54688,-1.6367 -3.39161,-5.3292 -4.09941,-8.2055 -1.11343,-4.5247 -2.12447,-5.6619 -7.5,-8.4355 l -6.21309,-3.2059 -0.34938,-15.79308 -0.34936,-15.79309 4.42351,-0.82985 c 3.11523,-0.58443 4.60455,-1.61989 5.0356,-3.50106 0.33665,-1.46917 1.8876,-8.2729 3.44655,-15.11943 l 2.83448,-12.44824 10.6043,-1.60218 c 5.83236,-0.88122 11.81774,-1.8865 13.30081,-2.23398 1.7622,-0.41287 5.40433,-5.0131 10.5115,-13.27669 l 7.81498,-12.6449 -0.86232,-57.67288 c -0.5639,-37.71458 -1.35291,-59.03562 -2.28,-61.61069 -1.19455,-3.31796 -0.87947,-5.8344 2.00174,-15.98713 2.27354,-8.01146 3.14074,-13.31821 2.58779,-15.83577 -0.4574,-2.08254 -0.44349,-7.6515 0.0309,-12.37548 l 0.86257,-8.58903 10.48007,-7.8874 c 5.76404,-4.33808 10.49159,-8.26565 10.50565,-8.72797 0.0141,-0.4623 -1.89925,-1.47581 -4.25184,-2.25223 l -4.27742,-1.41168 2.56561,-8.99776 c 1.41109,-4.94878 8.03983,-29.15729 14.73053,-53.79671 11.87591,-43.73463 12.10881,-44.85123 9.80338,-46.99907 -1.93917,-1.80661 -2.91145,-6.87266 -5.43633,-28.32603 -1.69114,-14.36928 -3.08235,-26.55493 -3.09158,-27.07924 -0.009,-0.52431 -20.07932,-0.80556 -44.60022,-0.625 l -44.58342,0.32829 -18.85403,70.2528 -18.85404,70.2528 -8.72191,0.3722 -8.7219,0.3722 -4.08299,19.375 c -4.05286,19.23201 -4.07701,19.55396 -3.27303,43.62503 l 0.80995,24.25004 -3.81322,3.24996 c -2.97228,2.53324 -8.94221,14.82798 -27.07043,55.74997 -27.86405,62.89935 -27.42013,60.89576 -16.37647,73.9134 3.78125,4.45712 6.875,8.94092 6.875,9.96398 0,1.56795 -8.77679,37.91528 -10.74783,44.50999 -0.48947,1.63768 1.42283,3.17561 8.1795,6.57821 4.85008,2.44247 8.81833,4.67359 8.81833,4.95807 0,0.28447 -2.19086,4.29367 -4.86858,8.90933 -5.3782,9.2705 -2.12343,7.285 -33.428989,20.3926 -12.176255,5.0981 -12.752197,5.5144 -14.705802,10.6299 -1.479197,3.8732 -3.220391,5.89 -6.389932,7.4015 -3.907542,1.8634 -4.356699,2.5951 -4.356699,7.0978 v 5.0202 h 89.375002 89.375 v -6.4819 z m 436.25,1.0884 c 0,-4.8722 -0.39911,-5.5838 -4.12964,-7.3627 -2.99661,-1.429 -4.58697,-3.3551 -5.79656,-7.0202 l -1.66694,-5.0508 -20.76592,-8.6401 -20.76594,-8.6401 -4.77596,-8.2975 c -2.62679,-4.56363 -4.45432,-8.81798 -4.06117,-9.45411 0.39315,-0.63612 4.31969,-2.84351 8.72567,-4.90531 l 8.01083,-3.74874 -5.48113,-21.68096 c -3.01463,-11.92453 -5.49512,-22.96159 -5.51219,-24.52679 -0.0179,-1.63815 2.88647,-6.38289 6.84395,-11.18071 10.61877,-12.87364 11.26067,-10.07548 -16.86451,-73.51544 -13.05673,-29.45114 -24.19784,-53.86487 -24.75802,-54.25277 -7.0397,-4.87458 -6.57126,-2.37882 -5.41153,-28.83172 1.04196,-23.76672 1.00095,-24.44182 -2.49984,-41.14337 -1.95755,-9.33909 -3.85833,-18.24579 -4.22395,-19.79266 -0.61091,-2.5846 -1.37189,-2.8125 -9.39096,-2.8125 -4.7994,0 -8.72619,-0.22644 -8.72619,-0.50319 0,-0.53951 -35.8765,-134.8977 -36.9983,-138.55931 -0.62178,-2.02954 -3.86676,-2.1875 -44.93713,-2.1875 h -44.26695 l -0.58472,2.8125 c -0.3216,1.54687 -1.77388,13.5 -3.22728,26.5625 -2.15877,19.40222 -3.08552,24.22207 -5.0624,26.32877 -2.40216,2.55991 -2.33756,2.88354 8.82845,44.23329 6.18659,22.90997 11.24833,42.59015 11.24833,43.73372 0,1.14357 0.47886,2.61359 1.06414,3.26672 1.08087,1.20618 5.18586,15.2247 5.18586,17.70972 0,0.74701 -1.6875,1.94648 -3.75,2.66548 -2.0625,0.71898 -3.75,1.78873 -3.75,2.37722 0,0.58848 4.03439,4.13336 8.9653,7.87753 4.93091,3.74415 9.63592,7.47462 10.45559,8.28992 1.98017,1.96966 3.48707,17.88973 2.05706,21.7324 -0.83055,2.23183 -0.14536,6.49369 2.58862,16.10124 2.85343,10.02727 3.40118,13.57357 2.35522,15.24842 -0.88085,1.41047 -1.82644,22.81157 -2.67333,60.50378 l -1.31037,58.32136 7.65876,12.39213 c 4.21231,6.81567 8.58562,12.87496 9.71845,13.46508 1.13284,0.59013 6.94565,1.78937 12.91737,2.66498 5.97172,0.87561 11.35422,1.92867 11.96109,2.34012 0.60689,0.41147 2.50365,7.21687 4.21503,15.12312 l 3.11158,14.375 4.61482,1.15796 4.61481,1.15795 v 15.41812 15.41815 l -6.77559,3.323 c -5.8534,2.8708 -6.88879,3.9264 -7.60722,7.756 -0.45739,2.4382 -2.47088,6.3 -4.4744,8.5819 -2.81529,3.2064 -3.64279,5.3695 -3.64279,9.5221 0,2.9552 0.375,5.7481 0.83334,6.2065 0.45832,0.4583 40.67707,0.8333 89.375,0.8333 h 88.54166 z M 87.191031,650.75574 c -0.02261,-0.83519 -2.187649,-3.66692 -4.811187,-6.29274 -4.048386,-4.0519 -5.454602,-4.71381 -9.2946,-4.375 l -4.524531,0.39922 6.738896,7.2833 c 5.960915,6.44246 7.038689,7.12285 9.335718,5.89351 1.428251,-0.76438 2.578318,-2.0731 2.555703,-2.90829 z m 580.167379,-1.83102 c 8.24509,-8.81663 8.32753,-9.07667 2.83929,-8.95669 -4.01484,0.0878 -5.55693,0.93917 -9.04014,4.99125 -7.41651,8.62775 -1.62362,12.3323 6.20085,3.96544 z m -560.8535,1.42876 c 4.01749,-1.54165 2.14527,-4.24126 -2.94139,-4.24126 -5.674778,0 -11.331372,1.85655 -11.331372,3.71906 0,1.37562 10.999972,1.77809 14.272762,0.5222 z m 544.47724,-0.96001 c 0,-1.85137 -5.2429,-3.28125 -12.03125,-3.28125 -4.58798,0 -5.4961,1.63178 -2.03125,3.64987 3.40619,1.98393 14.0625,1.70459 14.0625,-0.36862 z M 91.767873,641.76912 c 1.139163,-2.96862 -4.652454,-9.25835 -8.598225,-9.33774 -1.890625,-0.038 -3.4375,0.24992 -3.4375,0.63991 0,0.38999 1.828125,2.9111 4.0625,5.60246 4.288365,5.16547 6.804079,6.14212 7.973225,3.09537 z m 568.905917,-4.0944 4.38207,-5.3125 h -3.7635 c -2.83339,0 -4.58957,1.08305 -7.10607,4.38235 -3.38525,4.4383 -3.30162,7.32141 0.19218,6.62436 1.05229,-0.20994 3.88518,-2.77234 6.29532,-5.69421 z m -551.3212,1.47055 c 0.27728,-0.84403 -1.88927,-1.30784 -5.83892,-1.25 -4.283669,0.0627 -6.280054,0.61037 -6.280649,1.72293 -0.0011,2.02022 11.447279,1.57347 12.119569,-0.47293 z m 536.95931,0.40445 c 0.42787,-1.11944 -1.31479,-1.60884 -6.1456,-1.72594 -5.60386,-0.13583 -6.50088,0.12811 -5.31044,1.5625 1.78931,2.15599 10.64615,2.28234 11.45604,0.16344 z M 70.419269,630.45755 c -3.522842,-4.61868 -3.600361,-6.21251 -1.13849,-23.40783 0.619594,-4.32765 0.435177,-4.6875 -2.402301,-4.6875 -2.85034,0 -3.132193,0.56705 -3.883238,7.8125 -0.445402,4.29687 -1.139282,10.71688 -1.541956,14.2667 -0.696049,6.1361 -0.556277,6.54948 2.835865,8.38746 1.9624,1.06327 4.900387,1.95576 6.52886,1.98329 l 2.960862,0.05 -3.359602,-4.40467 z m 609.374501,2.10612 c 2.77527,-2.24728 2.81322,-2.60282 1.70099,-15.9375 -1.08654,-13.02664 -1.27094,-13.65782 -4.10725,-14.05898 -2.94957,-0.4172 -2.96361,-0.3623 -2.0782,8.125 0.49028,4.69976 1.36124,9.0359 1.93546,9.63586 1.24365,1.29938 -0.84047,6.63302 -4.00117,10.23973 -1.2438,1.41931 -2.26145,2.96619 -2.26145,3.4375 0,1.76549 6.0793,0.77089 8.81162,-1.44161 z m -572.47513,-1.27014 2.86345,-2.31868 -4.47316,-0.83917 c -2.46024,-0.46154 -5.936478,-1.99021 -7.724973,-3.39704 l -3.251809,-2.55787 v 3.125 c 0,3.14943 5.063046,8.30645 8.155092,8.30645 0.86237,0 2.8565,-1.04342 4.4314,-2.31869 z m 538.41641,0.13119 c 2.4177,-2.09053 4.94585,-7.8125 3.4518,-7.8125 -0.39256,0 -2.81276,1.125 -5.37823,2.5 -2.56545,1.375 -6.07903,2.51871 -7.80796,2.54158 l -3.14351,0.0416 2.95097,2.45841 c 3.64619,3.03758 6.63299,3.11909 9.92693,0.27091 z m -557.52231,-5.625 c 0.707688,-0.85938 1.695584,-7.36774 2.195324,-14.46303 l 0.908618,-12.90051 -4.854768,0.79726 c -10.76734,1.76824 -11.730905,2.1082 -11.807045,4.1656 -0.0425,1.14849 -0.490572,6.21455 -0.995708,11.25791 -0.836961,8.35633 -0.694552,9.32654 1.605411,10.9375 3.122282,2.18693 11.210693,2.31515 12.948168,0.20527 z m 580.76862,-0.066 c 1.97653,-1.44527 2.12661,-2.91228 1.33424,-13.04127 l -0.89281,-11.41281 -5.15782,-0.77565 c -2.8368,-0.4266 -6.69992,-1.07042 -8.5847,-1.43072 -3.37277,-0.64473 -3.41785,-0.56965 -2.85498,4.75441 0.31453,2.97521 0.86863,8.97296 1.23132,13.32832 0.36269,4.35537 0.9775,8.43349 1.36626,9.0625 1.06722,1.7268 11.02068,1.3709 13.55849,-0.48478 z m -549.09871,-6.88273 c 2.67809,-2.99704 3.44007,-5.42191 4.17786,-13.29515 0.4963,-5.29626 0.57519,-9.95675 0.1753,-10.35662 -0.77136,-0.77137 -25.980266,1.98236 -26.947476,2.94363 -0.312847,0.31093 -0.789142,4.05937 -1.058432,8.32984 -0.415764,6.5933 -0.06822,8.29876 2.30396,11.30618 3.625978,4.59695 6.921538,5.92548 13.073288,5.27026 3.53262,-0.37626 5.96127,-1.60831 8.2755,-4.19814 z m 521.82411,2.40439 c 5.36513,-3.27165 7.05958,-8.02368 5.85335,-16.41553 l -0.98497,-6.85263 -9.35899,-1.48405 c -5.14745,-0.81623 -11.2675,-1.51935 -13.60011,-1.5625 l -4.24113,-0.0785 0.67451,9.84095 c 0.76535,11.16617 2.05235,14.32892 6.90165,16.96055 4.67857,2.53896 10.17175,2.38695 14.75569,-0.40834 z m -225.3844,-3.59591 c 3.11408,-3.25039 3.49409,-5.04435 6.48386,-30.60868 2.70683,-23.1449 3.17724,-32.55877 3.18484,-63.73475 0.009,-34.0116 0.40245,-40.5705 5.61609,-93.45382 l 5.60717,-56.875 -0.0965,-71.875 -0.0965,-71.875 -2.3384,10.3574 c -3.1858,14.1108 -8.83701,25.10155 -16.75911,32.59395 -12.24084,11.57686 -24.24001,15.64273 -46.31672,15.6942 -21.8603,0.051 -36.62104,-5.01867 -47.64845,-16.36504 -6.36527,-6.54936 -13.39487,-20.47455 -15.34908,-30.40551 -0.74407,-3.78125 -1.5744,-8 -1.84517,-9.375 -0.27077,-1.375 -0.55468,30.96875 -0.63092,71.875 l -0.13862,74.375 5.17604,51.25 c 4.62151,45.75951 5.27943,56.4057 6.14122,99.375 1.15593,57.63531 3.71613,84.10187 8.64274,89.34601 l 2.96302,3.15399 h 42.04824 42.04825 l 3.30794,-3.45275 z M 92.857148,593.51427 c 15.812502,-2.1365 29.423042,-4.08428 30.245642,-4.3284 1.05303,-0.31253 0.35792,-3.8847 -2.34895,-12.07127 -2.11453,-6.39506 -4.24702,-12.07433 -4.73887,-12.62061 -1.3206,-1.46671 -46.330429,-5.10237 -47.476118,-3.83487 -1.149568,1.2718 -13.806704,33.85908 -13.806704,35.547 0,1.936 8.113276,1.36315 38.125,-2.69185 z m 596.281672,1.66045 c -0.47343,-1.20313 -3.70711,-9.64063 -7.18595,-18.75 -5.35998,-14.03519 -6.72727,-16.56017 -8.96043,-16.54715 -3.85773,0.0225 -44.92067,3.7156 -45.1839,4.06377 -1.156,1.52896 -7.87664,24.03869 -7.33899,24.58075 1.1103,1.11938 54.03244,8.50524 62.20884,8.68193 6.49972,0.14045 7.22465,-0.0872 6.46043,-2.0293 z M 133.31765,557.31293 c 2.87607,-2.3958 3.10066,-4.02486 7.87662,-57.13303 5.16457,-57.42923 5.1517,-60.31768 -0.26835,-60.31768 -4.01598,0 -2.8944,-6.50203 1.30623,-7.57249 l 3.125,-0.79635 -3.24276,-1.5525 c -4.28445,-2.05121 -3.66853,-7.57866 0.8445,-7.57866 1.67205,0 3.52072,-1.09388 4.2956,-2.54174 1.12181,-2.09613 8.65511,-75.29906 8.71088,-84.64576 0.0128,-2.12847 0.74429,-2.8125 3.00804,-2.8125 3.54289,0 4.50874,-2.03018 4.50874,-9.47724 0,-3.03751 0.26042,-5.52276 0.57872,-5.52276 0.3183,0 3.50037,1.1516 7.07125,2.55911 l 6.49254,2.55912 -0.84639,-20.99662 c -0.4655,-11.54814 -1.20527,-28.2144 -1.64393,-37.03614 l -0.79757,-16.03952 -4.27705,0.80237 -4.27705,0.80238 0.88805,-11.35193 c 1.51339,-19.34569 0.78817,-18.08552 15.58062,-27.07295 18.9754,-11.52883 19.81223,-14.83312 9.59538,-37.88751 -6.53828,-14.75368 -6.88347,-15.23448 -23.57927,-32.8431 l -16.94386,-17.87022 -10.60974,3.45447 -10.60975,3.45446 -0.81098,11.42507 c -0.44603,6.28379 -0.81958,15.97928 -0.83011,21.54554 -0.01,5.56626 -0.51439,10.90252 -1.11967,11.85837 -0.87639,1.38394 -5.13012,-0.36999 -20.88538,-8.61161 l -19.784831,-10.34952 -6.694805,3.61162 c -3.682142,1.98638 -7.259179,4.28785 -7.948969,5.11437 -0.860276,1.0308 0.391828,9.19908 3.986784,26.00836 2.88252,13.47809 4.952226,24.79433 4.599348,25.1472 -0.35288,0.35289 -8.606369,-0.0374 -18.341088,-0.86724 -10.272519,-0.87571 -18.122267,-1.04355 -18.70703,-0.39997 -0.554147,0.60989 -2.145575,4.48389 -3.536505,8.60889 -1.390929,4.125 -2.885394,8.3653 -3.321031,9.42287 -0.534676,1.29803 3.71324,7.18796 13.072032,18.125 7.720138,9.02205 13.13537,16.33584 12.219692,16.50386 -0.904425,0.16597 -8.300953,1.10375 -16.436729,2.08399 -8.135776,0.98024 -14.950636,1.96945 -15.144133,2.19826 -0.193496,0.22882 -0.723407,4.67744 -1.17758,9.88584 l -0.825767,9.46981 14.7199,12.85874 c 8.095945,7.0723 16.266775,13.41279 18.1574,14.08996 1.890625,0.67718 3.442912,2.16058 3.449529,3.29645 0.0066,1.13587 -1.756098,21.27413 -3.91714,44.75169 -2.161043,23.47756 -3.577602,44.08724 -3.14791,45.79926 0.48526,1.93343 1.969362,3.41098 3.91714,3.89984 4.571913,1.14748 4.364176,6.39605 -0.301619,7.62054 -3.427291,0.89946 -3.429148,0.906 -0.625,2.20152 1.95387,0.9027 2.8125,2.38593 2.8125,4.85838 0,3.07801 -0.480609,3.55899 -3.556265,3.55899 -1.955946,0 -4.559594,1.10866 -5.785882,2.4637 -1.529597,1.69018 -5.05376,15.72046 -11.224731,44.6875 l -8.995115,42.2238 10.910637,15 10.910637,15 36.057859,3.27186 c 19.831822,1.79952 36.620362,3.32769 37.307862,3.39591 0.6875,0.0682 2.58222,-0.9857 4.2105,-2.34206 z m 520.39511,-1.37179 34.6056,-2.79739 10.90123,-15.0408 10.90122,-15.0408 -9.06197,-42.53747 c -9.56933,-44.91904 -10.28985,-46.91246 -16.95644,-46.91246 -2.57329,0 -4.37025,-2.08153 -4.37025,-5.06232 0,-0.60931 1.48874,-1.88787 3.30831,-2.84125 l 3.30833,-1.7334 -3.30833,-0.83033 c -4.26849,-1.07133 -4.16931,-2.59704 0.51568,-7.93294 3.5024,-3.98903 3.7635,-4.8964 3.10473,-10.79003 -0.39557,-3.5391 -2.11672,-22.74723 -3.82476,-42.68473 -1.70805,-19.9375 -3.2903,-37.8057 -3.51614,-39.70712 -0.3399,-2.86182 0.17569,-3.61516 2.99424,-4.375 1.87266,-0.50483 9.96456,-6.54288 17.98203,-13.41788 l 14.57718,-12.5 -0.5893,-9.8605 c -0.32411,-5.42329 -1.205,-10.24104 -1.95752,-10.70613 -0.75253,-0.46509 -8.11289,-1.57079 -16.35634,-2.4571 -8.24346,-0.88632 -14.98811,-1.85862 -14.98811,-2.16067 0,-0.30205 6.11422,-7.6491 13.58717,-16.32678 l 13.58718,-15.77761 -3.68621,-10.10048 c -2.02743,-5.55527 -3.9034,-10.31766 -4.16883,-10.58308 -0.26542,-0.26544 -8.67787,0.22837 -18.69431,1.09735 -10.01644,0.86897 -18.41789,1.36508 -18.66989,1.10247 -0.25199,-0.26261 1.99839,-11.72747 5.00085,-25.47747 6.19948,-28.39094 6.66045,-25.46099 -5.00869,-31.83552 l -5.35342,-2.92444 -20.60764,10.76529 -20.60764,10.76529 -0.81428,-15.14406 c -0.44787,-8.32924 -0.81429,-18.69222 -0.81429,-23.02884 0,-8.93646 0.54151,-8.39104 -12.9798,-13.07339 l -8.6048,-2.97979 -17.6452,18.26705 -17.6452,18.26704 -6.64936,15.72287 c -6.63423,15.68705 -6.64553,15.73646 -4.96383,21.6907 1.62744,5.76206 2.15841,6.25957 15.39938,14.42892 l 13.71381,8.46109 1.34666,14.68389 c 0.74068,8.07615 1.2153,14.86552 1.05473,15.08752 -0.16058,0.22199 -2.31345,-0.15455 -4.78418,-0.83675 -4.15215,-1.14646 -4.49525,-1.03507 -4.53227,1.47139 -0.022,1.49145 -0.82918,18.17022 -1.79364,37.06394 -0.96445,18.89371 -1.60121,34.50455 -1.41503,34.69073 0.18619,0.1862 3.46812,-0.7382 7.29315,-2.0542 l 6.95462,-2.39273 1.06298,7.02368 c 0.9175,6.06247 1.49065,7.124 4.18798,7.75664 l 3.125,0.73295 3.76495,42.58376 c 2.59066,29.30199 4.29536,43.22287 5.46555,44.63285 0.93534,1.12702 3.03799,2.04912 4.67255,2.04912 4.04965,0 4.16691,5.52251 0.16277,7.66546 l -2.80916,1.50342 3.43416,1.14473 c 4.25577,1.41859 5.02867,7.18639 0.96299,7.18639 -1.35915,0 -3.25495,1.26562 -4.21289,2.8125 -1.51516,2.44668 -1.10005,9.88486 3.19155,57.1875 4.84687,53.42281 4.98763,54.42433 8.03828,57.19238 1.92911,1.7504 4.14162,2.60277 5.84214,2.25067 1.50541,-0.3117 18.30963,-1.82557 37.34272,-3.36413 z M 310.98114,521.42472 c -9.4e-4,-34.15563 -0.40858,-41.29125 -5,-87.52205 l -4.99899,-50.33454 v -82.99194 -82.99192 l -7.8125,-0.52437 c -4.29688,-0.2884 -30.875,0.84725 -59.0625,2.52368 -43.61576,2.594 -51.57881,3.36196 -53.45734,5.15541 -2.10926,2.01371 -2.06412,5.1323 1.0155,70.17779 3.13649,66.24636 3.29613,68.14226 5.95735,70.75057 2.28119,2.23585 6.15351,3.12432 23.35949,5.35958 11.34375,1.47369 21.80685,2.92919 23.25132,3.23445 2.33174,0.49276 2.71645,1.72744 3.42977,11.00725 2.16553,28.17291 11.79776,66.95035 22.8227,91.87969 1.66572,3.7665 2.86833,7.00843 2.67247,7.2043 -0.19586,0.19586 -12.05164,2.56413 -26.34617,5.26283 -14.29453,2.6987 -26.45533,5.40512 -27.02399,6.01425 -0.56865,0.60914 -1.97336,14.22712 -3.12158,30.26219 -1.61237,22.51733 -1.7508,29.56055 -0.60802,30.9375 1.23759,1.4912 9.93986,1.78283 53.20155,1.78283 h 51.72195 l -10e-4,-37.1875 z m 226.02012,35.5907 c 0.93754,-1.12967 0.72136,-10.31507 -0.73892,-31.39844 -1.92418,-27.78073 -2.23677,-29.87329 -4.60967,-30.85809 -2.151,-0.8927 -49.6162,-9.90104 -52.15168,-9.89777 -0.47089,6e-4 1.01458,-4.07703 3.30107,-9.0614 9.4998,-20.70892 17.9747,-53.39689 21.56274,-83.16828 1.93497,-16.05522 2.40862,-17.90925 4.69716,-18.38606 1.39985,-0.29166 11.54519,-1.72274 22.54519,-3.18018 27.78465,-3.68131 26.27454,-1.90423 27.36839,-32.20656 1.30233,-36.07822 4.41356,-98.9709 5.20988,-105.31672 0.55574,-4.42862 0.2095,-6.27975 -1.55678,-8.32313 -2.15214,-2.48975 -4.96425,-2.7869 -53.52149,-5.65554 -28.1875,-1.66525 -54.76563,-2.79175 -59.0625,-2.50335 l -7.8125,0.52437 -0.005,80.20147 -0.005,80.20148 -5.61954,56.84702 c -5.06509,51.22889 -5.62046,60.07204 -5.62046,89.47918 0,17.94767 0.375,33.00713 0.83334,33.46546 0.45832,0.45834 24.01445,0.83334 52.34693,0.83334 40.27602,0 51.80272,-0.34834 52.83884,-1.5968 z M 383.69734,282.35632 c 12.58992,-1.82108 21.42291,-5.6405 28.94641,-12.51657 11.64785,-10.64547 17.3608,-24.94906 19.12336,-47.87941 l 0.83385,-10.84812 h 8.5656 8.56559 v -21.68127 c 0,-26.23589 0.49505,-25.38176 -15.42015,-26.6051 l -10.90565,-0.83828 -5.66314,-10.96488 c -3.25809,-6.30827 -8.78664,-14.37363 -13.01801,-18.99143 -6.51936,-7.11473 -7.45168,-8.79434 -8.20696,-14.7853 -0.5176,-4.10563 -1.85697,-7.86278 -3.41198,-9.57125 -2.43535,-2.67565 -3.46371,-2.8125 -21.13599,-2.8125 -23.09091,0 -24.11157,0.46663 -25.40545,11.61466 -0.84427,7.27435 -1.35706,8.22459 -8.74367,16.20281 -4.97536,5.37385 -9.73615,12.28923 -13.00983,18.89772 l -5.16303,10.42244 -10.82583,0.83214 c -15.82352,1.2163 -15.34031,0.37843 -15.34031,26.59897 v 21.68127 h 8.75 8.75 l 0.0436,7.1875 c 0.0975,16.07358 5.02489,33.88618 12.29782,44.45701 10.70907,15.56512 34.61417,23.32561 60.37376,19.59959 z m -210.56988,-49.6816 c -0.2864,-1.89063 -0.52074,-0.34375 -0.52074,3.4375 0,3.78125 0.23434,5.32812 0.52074,3.4375 0.28641,-1.89063 0.28641,-4.98438 0,-6.875 z m 398.3181,0.625 c -0.73757,-8.31347 -2.3888,-13.17878 -3.94466,-11.62292 -0.34375,0.34375 0.0978,1.49584 0.98107,2.5602 1.13465,1.36718 1.3842,4.31133 0.85017,10.03022 -0.61914,6.63016 -0.42357,8.095 1.08077,8.095 1.52064,0 1.69834,-1.55948 1.03265,-9.0625 z" \
       id="path4147" /> \
';

svg += "</g></g></svg>";

	return svg;

}

function damageCircle( xPos, yPos, radius, filledIn, armorFunction, armorClass ) {
	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof( radius ) == "undefined" ) {
		radius = 20;
	}

	if( typeof( filledIn ) == "undefined" ) {
		filledIn = false;
	}

	if( typeof( armorFunction ) == "undefined" ) {
		armorFunction = "";
	}

	if( typeof( armorClass ) == "undefined" ) {
		armorClass = "";
	}


	svgCode = "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( xPos  )  + "\" cy=\"" + ( yPos )  + "\" r=\"" + radius + "\" fill=\"" + colorBlack + "\" />\n";
//	svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
	if( armorFunction ) {
		svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( xPos )  + "\" cy=\"" + ( yPos )  + "\" r=\"" + (radius - 3 )+ "\" fill=\"" + colorRed + "\" />\n";
	} else {
		svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( xPos  )  + "\" cy=\"" + ( yPos )  + "\" r=\"" + (radius - 3 ) + "\" fill=\"" + colorWhite + "\" />\n";
	}

	return svgCode
}

function rsStructureSVG( standAlone, baseFillColor, lineColor, xLoc, yLoc, width) {

	var baseWidth = 744.09448819;
	var baseHeight = 1052.3622047;
	if( typeof( width ) == "undefined" || width == 0) {
		theWidth = 744;
		theHeight = 627;
	} else {
		theWidth = width;
		theHeight = Math.round( width / baseWidth * baseHeight );
	}

	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof(standAlone) == "undefined" )
		standAlone = true;

	if( !baseFillColor )
		baseFillColor = colorTan;

	if( !lineColor )
		lineColor = colorGold;

	var svg = "";

	if( standAlone ) {
		var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

	} else {
		var svg = '<svg \
		    viewBox="0 0 744.09448819 1052.3622047" \
		   height="' + theHeight + 'px" \
		   width="' + theWidth + 'px" \
		   x="' + xLoc + 'px" \
		   y="' + yLoc + 'px" \
		   id=\"rearArmor\" \
		   version="1.1"> \
		  <g> \"';
	  }

  svg += '<path \
       id="path5320" \
       d="m 123.52522,1037.3027 c -1.83759,-5.6069 -2.97974,-10.511 -2.53811,-10.8978 0.44162,-0.3869 12.12398,-5.5467 25.9608,-11.4661 13.83681,-5.9195 27.23203,-11.8598 29.76723,-13.2006 4.275,-2.2611 4.9638,-4.54582 9.4938,-31.4915 l 4.8844,-29.05352 -7.0245,-12.54543 c -5.8167,-10.38853 -7.2309,-14.94865 -8.2258,-26.52361 -1.1706,-13.62109 -0.8562,-15.1684 12.3079,-60.57209 12.2733,-42.33083 14.0335,-47.03838 19.2394,-51.4518 3.7651,-3.19198 5.3528,-5.87743 4.6301,-7.83092 -1.4356,-3.87995 4.6558,-26.5807 8.2391,-30.70502 5.0332,-5.79304 5.5881,-12.83119 1.4426,-18.29714 -5.5172,-7.27467 -4.4023,-24.66469 1.6873,-26.31631 4.3922,-1.19128 8.0594,-20.56883 5.1472,-27.19799 -2.5429,-5.78851 -0.6901,-18.28036 2.5218,-17.00203 1.5995,0.63657 2.1308,-1.7532 1.911,-8.59555 -0.1675,-5.2125 -0.7513,-9.94072 -1.2974,-10.50717 -0.5462,-0.56645 0.1814,-2.24801 1.6169,-3.7368 1.4354,-1.48878 2.6099,-4.77002 2.6099,-7.29163 0,-2.52162 1.2594,-5.08602 2.7988,-5.69866 1.7085,-0.67997 2.3575,-2.2907 1.6662,-4.13495 -3.4328,-9.15719 -4.5149,-23.2228 -2.6316,-34.205 3.2852,-19.15644 7.3208,-31.59071 11.598,-35.73494 2.2161,-2.14715 4.4081,-6.62963 4.8711,-9.96109 0.8397,-6.04133 0.8214,-6.05721 -6.9952,-6.05721 l -7.8371,0 1.1878,-9.28677 c 0.9727,-7.60487 0.6584,-9.49746 -1.7351,-10.45006 -3.871,-1.54064 -3.687,-4.96587 0.6644,-12.36793 2.5171,-4.28181 3.5974,-9.43827 3.6214,-17.2848 0.019,-6.15039 0.6284,-12.06674 1.3545,-13.14744 0.7261,-1.08068 11.4283,-4.32362 23.7826,-7.20651 12.3543,-2.8829 23.89,-6.54358 25.635,-8.13485 3.0229,-2.75674 3.0017,-3.08189 -0.4493,-6.89178 -2.2566,-2.49132 -3.6218,-6.5463 -3.6218,-10.75751 0,-3.71745 -0.8087,-7.27732 -1.797,-7.91085 -2.3426,-1.50161 -2.3426,-13.97817 0,-13.97817 3.1981,0 1.9539,-10.18428 -1.5192,-12.4338 -1.8238,-1.18134 -4.3548,-5.99589 -5.6245,-10.69898 -2.1579,-7.99373 -2.7031,-8.55109 -8.3643,-8.55109 -7.2279,0 -7.565,-1.60732 -1.5634,-7.45502 5.783,-5.6347 5.6852,-10.61926 -0.3362,-17.13777 l -4.8287,-5.22731 5.7272,0 c 6.4624,0 8.0384,-4.52966 2.1332,-6.1313 -1.9767,-0.53613 -3.594,-2.31132 -3.594,-3.94488 0,-1.63356 -0.8651,-2.97012 -1.9225,-2.97012 -1.0573,0 -5.4831,-2.54084 -9.8351,-5.64629 -7.7959,-5.56305 -7.9461,-5.59054 -10.1902,-1.86376 -1.8515,3.07491 -4.1746,3.78254 -12.4177,3.78254 -8.6288,0 -10.2801,-0.55555 -11.0799,-3.72752 -0.5308,-2.10532 -2.4511,-3.72751 -4.4125,-3.72751 -2.9709,0 -3.8127,-2.26747 -5.8265,-15.69332 -1.2946,-8.63131 -1.8682,-19.94577 -1.2747,-25.14323 1.3043,-11.42149 -0.7774,-13.21239 -15.3574,-13.21239 -15.0276,0 -17.338,3.58698 -18.607,28.88822 -1.4552,29.01296 -4.6982,69.29498 -6.0053,74.59176 -0.9644,3.90846 -0.6437,6.35569 1.0477,7.99443 4.8818,4.72966 1.8547,20.85231 -3.915,20.85231 -2.9765,0 -3.4252,2.11836 -1.0067,4.75258 0.9699,1.05645 0.8979,9.66335 -0.1785,21.34001 -1.6166,17.53609 -2.2775,19.96906 -6.36055,23.41533 -3.68151,3.10731 -4.20621,4.53895 -2.73225,7.45503 2.9827,5.90082 -3.28279,69.33622 -7.49716,75.90605 -2.7432,4.27643 -2.97174,6.0325 -1.28483,9.87243 4.35725,9.91843 2.55384,22.64539 -5.40371,38.135 l -7.45558,14.51255 5.9917,8.0737 c 3.29543,4.44053 6.73833,9.10816 7.65089,10.37251 3.46224,4.79687 -7.38986,6.47801 -27.47568,4.25634 -29.652027,-3.27976 -28.147997,-2.60969 -34.319867,-15.29037 -5.37526,-11.04397 -5.45076,-11.59738 -5.06771,-37.14447 0.21387,-14.2634 -0.13756,-26.47941 -0.78093,-27.14671 -2.05901,-2.13551 -1.25059,-13.29971 1.0199,-14.08467 1.69375,-0.58556 1.62791,-2.52241 -0.29068,-8.55181 -2.11564,-6.64862 -2.10088,-12.34258 0.10038,-38.72285 1.92083,-23.01961 2.06476,-31.71456 0.56292,-34.00396 -1.1098,-1.69175 -3.65183,-8.1557 -5.64896,-14.36432 l -3.63114,-11.28842 5.15589,-3.06901 c 4.16439,-2.47889 5.15581,-4.35128 5.15581,-9.73735 0,-4.20812 0.99448,-7.06412 2.69549,-7.74111 3.39401,-1.3508 3.52726,-4.40151 0.19225,-4.40151 -5.3636,0 -6.50482,-14.86907 -1.54,-20.06479 1.98557,-2.07792 3.20556,-6.37161 3.30976,-11.64848 0.0908,-4.59662 0.28704,-12.97029 0.43618,-18.60816 0.14913,-5.63786 -0.21996,-13.43317 -0.82023,-17.32289 -0.79041,-5.12186 -0.29172,-7.98869 1.80831,-10.39542 2.38979,-2.73881 2.92489,-8.37768 3.04299,-32.06666 0.0788,-15.8089 -0.42674,-35.96454 -1.12345,-44.79028 l -1.26674,-16.04682 4.71917,-1.22844 c 4.779967,-1.24427 6.599507,-7.18718 2.922177,-9.54433 -2.818487,-1.80665 -2.119977,-7.77539 1.79699,-15.35515 1.97669,-3.8251 3.59398,-8.87538 3.59398,-11.22284 0,-3.49004 2.375,-5.38978 13.02817,-10.42111 l 13.02817,-6.15301 25.88008,2.38294 c 14.23406,1.31062 26.62876,3.15941 27.54376,4.10844 2.2396,2.32282 4.8826,14.59712 4.9354,22.92028 0.058,9.13565 3.2639,11.5107 13.4081,9.93296 7.96,-1.23803 8.2039,-1.47239 8.3778,-8.05261 0.3339,-12.63336 2.1121,-15.82987 10.6783,-19.19485 9.7508,-3.83031 43.0497,-4.58065 45.1727,-1.0179 1.0177,1.70787 1.8398,1.68648 3.555,-0.0925 1.2272,-1.27277 3.68,-2.31412 5.4506,-2.31412 1.7707,0 4.2294,-1.67738 5.4638,-3.72751 1.9892,-3.30342 4.1907,-3.72752 19.3499,-3.72752 15.1592,0 17.3607,0.4241 19.3498,3.72752 1.2689,2.10725 4.1906,3.72751 6.7217,3.72751 4.1504,0 4.4773,-0.65375 4.4773,-8.95318 0,-7.77327 0.823,-9.7805 6.245,-15.23095 7.3856,-7.42445 12.9795,-23.648 9.289,-26.94064 -6.1592,-5.49524 -6.8853,-8.11442 -3.6634,-13.21439 2.49,-3.94137 4.2045,-4.78425 8.425,-4.1418 4.3939,0.66884 6.5658,-0.56351 12.7177,-7.21584 14.4752,-15.652686 17.1299,-19.750265 19.294,-29.779762 l 2.1743,-10.076356 14.0824,0 14.0824,0 2.9964,11.177987 c 2.4235,9.04062 4.1148,11.86239 8.8455,14.75728 3.2171,1.968611 8.5434,7.631821 11.8363,12.584911 4.9063,7.37983 6.8309,8.90399 10.661,8.4427 3.4305,-0.41318 5.5101,0.76092 7.8179,4.41397 3.0218,4.7832 3.0042,5.17329 -0.4529,10.02295 -3.1689,4.44543 -3.3683,6.083 -1.675,13.75766 1.0572,4.79138 2.8347,8.7116 3.9501,8.7116 1.1155,0 5.0224,3.18045 8.6822,7.06767 5.767,6.12532 6.6542,8.23754 6.6542,15.84193 0,7.86761 0.4195,8.77426 4.0602,8.77426 2.2331,0 5.0702,-1.67738 6.3047,-3.72751 1.9881,-3.30182 4.1906,-3.72752 19.2854,-3.72752 15.0948,0 17.2973,0.4257 19.2854,3.72752 1.2345,2.05013 4.0042,3.72751 6.1549,3.72751 2.1508,0 4.2507,1.04836 4.6665,2.3297 0.5876,1.81073 1.3341,1.83519 3.3511,0.10977 1.6092,-1.37658 9.3244,-2.23898 20.3088,-2.27011 14.0644,-0.0398 19.5133,0.75274 26.449,3.84725 8.6407,3.85524 8.7355,3.99078 8.7627,12.52076 0.034,10.60356 1.1178,12.38391 8.4387,13.86052 8.6217,1.73898 11.3007,-2.11665 11.3007,-16.26399 0,-16.80542 1.0658,-17.4736 32.562,-20.41428 l 25.8401,-2.41258 13.0282,6.61893 c 12.0757,6.13505 13.0282,7.04926 13.0282,12.50518 0,3.23743 1.3094,7.01337 2.9099,8.39096 2.3259,2.00209 2.6926,4.66037 1.8273,13.24689 -1.0438,10.35705 -0.9183,10.78493 3.4985,11.93468 4.5089,1.1737 4.5605,1.38725 3.2755,13.53985 -0.718,6.79104 -1.3285,27.23555 -1.3566,45.43227 -0.046,29.86519 0.2668,33.326 3.2157,35.56234 2.6315,1.99575 3.0239,3.8976 2.0179,9.7815 -2.9859,17.4644 -1.3906,43.24523 2.9821,48.19218 4.72,5.34 3.6208,19.68395 -1.5085,19.68395 -3.0962,0 -3.0893,0.23786 0.1985,6.77604 1.4764,2.93611 2.6894,6.73614 2.6955,8.4445 0.01,1.70837 2.2197,4.7748 4.9191,6.81425 l 4.9081,3.70813 -3.3408,9.95956 c -1.8375,5.47777 -4.4613,11.83428 -5.8307,14.1256 -2.1292,3.56264 -2.0787,8.6523 0.3491,35.1418 2.5808,28.15941 2.5824,31.64079 0.018,38.29015 -2.5002,6.48073 -2.5138,7.43699 -0.1193,8.38995 3.0647,1.21975 3.7809,12.81172 0.9054,14.65492 -1.0635,0.68174 -1.797,12.12001 -1.797,28.02505 0,25.48512 -0.2531,27.40846 -4.9002,37.23577 -5.5525,11.7421 -4.0142,11.09405 -33.1832,13.97924 -15.3035,1.5137 -22.0163,1.52092 -24.7086,0.0265 -2.0331,-1.1285 -3.6965,-2.29018 -3.6965,-2.58152 0,-0.29133 3.213,-4.99616 7.1401,-10.45518 l 7.1401,-9.92549 -8.0386,-15.29494 c -8.7949,-16.73392 -10.2369,-26.53501 -5.3469,-36.3426 2.4603,-4.93437 2.3929,-5.92829 -0.7831,-11.55592 -4.5221,-8.01295 -10.2854,-68.39799 -7.1145,-74.543 1.6793,-3.2544 1.2469,-4.46258 -2.7929,-7.80348 -4.3711,-3.61486 -4.9411,-5.66956 -6.6658,-24.02704 -1.4568,-15.50747 -1.3841,-20.70123 0.3199,-22.83071 1.7893,-2.236 1.6672,-2.75657 -0.6465,-2.75657 -6.0736,0 -9.0678,-15.78352 -3.9927,-21.04714 1.419,-1.4717 1.9191,-3.41865 1.1115,-4.32658 -1.9117,-2.149 -5.9068,-51.42854 -5.7181,-70.53195 0.151,-15.27455 -3.4643,-32.28752 -7.4138,-34.88867 -2.6171,-1.72366 -17.7668,-2.03015 -21.7615,-0.44026 -2.2767,0.90609 -2.5655,3.71755 -1.6954,16.50448 0.7202,10.58474 0.408,15.82305 -0.9969,16.72357 -1.1259,0.72121 -2.0464,4.12857 -2.0464,7.57197 0,8.60763 -1.5947,12.15686 -5.4622,12.15686 -1.8043,0 -3.7939,1.67738 -4.4213,3.72751 -1.6303,5.32757 -19.2874,5.4661 -22.8577,0.1793 -2.3054,-3.41364 -2.7862,-3.29712 -12.6809,3.07342 -5.6565,3.64193 -10.2846,7.75469 -10.2846,9.13949 0,1.38481 -1.2129,2.51785 -2.6955,2.51785 -1.4825,0 -2.6954,1.25803 -2.6954,2.79563 0,1.89048 1.8239,2.79564 5.6333,2.79564 l 5.6333,0 -4.7348,3.86278 c -6.4255,5.2421 -6.4593,14.31622 -0.076,20.50712 l 4.6585,4.51832 -6.7643,0.93188 c -6.165,0.84932 -7.0009,1.67496 -9.435,9.31879 -1.4689,4.61279 -4.1602,9.48283 -5.9807,10.82227 -3.9899,2.93568 -4.3543,9.3804 -0.6145,10.86882 1.6357,0.65101 2.6955,3.46936 2.6955,7.16832 0,3.35256 -1.213,7.13962 -2.6955,8.41572 -1.4825,1.2761 -2.6955,5.29654 -2.6955,8.93429 0,3.66446 -1.3918,8.2092 -3.1208,10.1908 -2.9146,3.34024 -2.9217,3.72775 -0.1066,5.86261 1.6578,1.25727 12.9681,4.68465 25.134,7.61637 12.7906,3.08228 22.9929,6.54844 24.1901,8.21835 1.1387,1.58833 2.3708,9.05829 2.738,16.59989 0.5144,10.56408 1.3798,14.12535 3.7698,15.51258 4.1452,2.40593 3.9241,6.64273 -0.4959,9.50565 -3.0817,1.99602 -3.4354,3.60361 -2.464,11.19834 l 1.1342,8.86774 -9.2164,0 c -8.931,0 -9.2165,0.16419 -9.2165,5.3024 0,2.91674 1.6001,6.80426 3.5563,8.64042 8.9417,8.39277 16.5594,46.2778 12.6985,63.15278 -1.8655,8.15324 -1.7692,10.39637 0.6503,15.16035 1.5618,3.0752 2.8446,7.05898 2.8507,8.85285 0,1.79386 0.6176,3.26224 1.3588,3.26306 1.7105,0.002 1.6501,16.14817 -0.067,17.92908 -2.2632,2.34731 -1.3657,4.86716 1.3488,3.78684 3.5433,-1.41022 5.717,10.50642 3.0315,16.61939 -2.8342,6.45143 0.4763,23.22387 5.3388,27.04889 5.8034,4.56522 6.7955,19.01947 1.7875,26.04479 -4.3718,6.13284 -3.7667,13.14491 1.6795,19.46304 3.7822,4.38779 9.5768,26.21857 8.0527,30.33799 -0.6608,1.78602 1.0172,4.66017 4.4898,7.69016 4.9126,4.28647 7.0809,10.04574 19.0129,50.50029 13.2687,44.98697 13.4508,45.88122 12.3191,60.48802 -0.9581,12.36437 -2.2928,17.00605 -8.039,27.95635 l -6.8902,13.13037 4.3151,25.16072 c 2.3734,13.83839 4.7209,26.92444 5.2168,29.0801 0.6873,2.98786 6.3546,6.2817 23.8453,13.859 12.619,5.4667 26.3123,11.4689 30.4295,13.3381 l 7.486,3.3986 -2.873,7.9032 c -1.5801,4.3468 -3.6327,8.9515 -4.5612,10.2329 -1.2992,1.7929 -17.5795,2.3297 -70.6523,2.3297 l -68.9641,0 0,-4.7337 c 0,-7.5079 6.5119,-18.7578 13.4216,-23.1869 3.4899,-2.237 6.3453,-4.7209 6.3453,-5.5196 0,-4.7607 -7.8529,-40.34625 -9.0811,-41.15082 -0.8165,-0.5349 -1.7354,-5.56695 -2.042,-11.1823 l -0.5573,-10.20975 -7.3329,-1.59627 c -7.255,-1.57931 -7.4307,-1.81713 -16.5318,-22.36532 l -9.1989,-20.76904 -1.8967,-44.73016 c -1.7019,-40.13458 -1.5906,-45.61609 1.0834,-53.35327 2.9098,-8.41926 2.8534,-9.19034 -2.3831,-32.61574 -4.5139,-20.19222 -6.0192,-24.33494 -9.5031,-26.15377 -2.2768,-1.18863 -4.8266,-3.28535 -5.6663,-4.65939 -2.1883,-3.58072 -1.9385,-17.89156 0.3377,-19.35058 1.0557,-0.67673 1.5418,-2.25131 1.0801,-3.49907 -0.4616,-1.24777 -0.2254,-5.75117 0.5251,-10.00752 1.2072,-6.84692 0.7029,-8.76545 -4.3756,-16.64631 -3.4587,-5.36723 -8.7704,-19.10733 -13.3645,-34.5709 -7.0809,-23.83411 -7.4798,-26.29185 -5.596,-34.4795 1.1156,-4.84884 2.0001,-9.65476 1.9656,-10.67983 -0.063,-1.87641 -9.5944,-55.88204 -12.0058,-68.02711 l -1.2952,-6.52315 -1.2854,5.59127 c -0.7069,3.0752 -1.4033,10.20407 -1.5475,15.84193 -0.2187,8.55112 -1.5437,12.4137 -7.9915,23.29696 l -7.7293,13.04629 -37.5951,0.4885 -37.5951,0.48847 -8.3423,-15.39853 c -7.1216,-13.14515 -8.507,-17.40901 -9.4671,-29.13709 -1.1943,-14.58908 -3.5938,-22.18933 -5.3714,-17.01344 -0.5281,1.5376 -3.8062,19.92887 -7.2848,40.8695 -5.3877,32.43323 -6.0196,39.12985 -4.2656,45.2016 1.5532,5.37671 1.5473,8.29256 -0.024,11.86932 -1.1457,2.60788 -2.0831,6.62252 -2.0831,8.92144 0,7.41999 -10.8461,40.42718 -16.3115,49.63965 -4.4317,7.47002 -5.1849,10.43922 -4.5692,18.01152 0.4055,4.98685 1.6406,11.45515 2.7447,14.37398 2.8617,7.56564 -0.442,19.37187 -6.1795,22.08318 -2.402,1.13507 -4.7267,3.40417 -5.1661,5.04249 -0.4394,1.6383 -2.9748,12.89975 -5.6343,25.02543 -4.7141,21.49392 -4.757,22.2269 -1.7105,29.2339 2.8865,6.63886 2.9664,10.71563 1.0471,53.43545 l -2.0777,46.24824 -9.173,19.87894 c -9.0575,19.62888 -9.2715,19.90468 -17.0112,21.92598 l -7.8382,2.04704 0,9.85107 c 0,5.41809 -0.7316,10.64783 -1.6257,11.62164 -0.8942,0.97382 -3.3353,10.56132 -5.4248,21.30554 l -3.7991,19.53493 4.077,3.2653 c 2.2424,1.7959 5.2901,3.6932 6.7726,4.2163 3.1048,1.0955 8.9849,14.8579 8.9849,21.0293 l 0,4.1739 -69.7907,0 -69.79066,0 -3.34105,-10.1945 z m 132.98472,-2.9606 c -1.5631,-3.135 -6.2858,-7.8574 -10.4949,-10.4943 l -7.6529,-4.7943 4.1578,-21.30908 c 2.2868,-11.72001 5.1215,-23.14236 6.2994,-25.383 1.1779,-2.24065 2.1894,-9.06342 2.2478,-15.1617 l 0.1062,-11.08779 8.0864,-1.95851 c 7.9772,-1.93204 8.2006,-2.19927 16.5297,-19.77047 l 8.4433,-17.81196 2.0523,-44.41112 c 1.9056,-41.2367 1.8244,-44.93515 -1.1353,-51.74258 -2.639,-6.06962 -2.8697,-8.83287 -1.3406,-16.0547 10.3773,-49.0103 10.273,-48.66379 15.1944,-50.44893 7.1889,-2.60756 8.3745,-10.6075 2.5125,-16.95335 -3.9466,-4.27243 -4.267,-5.38146 -2.0951,-7.251 1.93,-1.6612 2.1905,-3.92216 1.0536,-9.14118 -1.3484,-6.19012 -0.7776,-8.13385 5.3208,-18.11661 4.4111,-7.22075 9.2849,-19.66064 13.7566,-35.11282 l 6.9253,-23.93028 -3.1125,-9.08929 c -2.2349,-6.52614 -2.6022,-10.02656 -1.3026,-12.41297 1.7521,-3.21727 9.4491,-45.37847 11.9201,-65.2936 l 1.2141,-9.78472 -36.0502,0 c -39.6956,0 -36.103,-1.10978 -38.9477,12.03107 -0.6558,3.02937 -2.6877,6.59425 -4.5154,7.92197 -7.8782,5.72317 -14.2517,42.70808 -9.9277,57.60958 1.4055,4.84358 2.2128,9.38148 1.7941,10.08421 -0.4188,0.70274 -1.2025,4.96268 -1.7416,9.46656 -0.5391,4.50388 -2.1805,14.78136 -3.6475,22.83886 -1.4671,8.05751 -2.6674,14.95037 -2.6674,15.31749 0,0.36712 -1.343,0.13307 -2.9844,-0.52025 -2.4886,-0.99044 -2.737,-0.43893 -1.4957,3.32008 0.8187,2.4793 1.3108,10.51172 1.0934,17.84985 -0.2523,8.51657 0.3581,13.82488 1.6876,14.67708 2.7317,1.75098 -1.3083,4.52854 -6.6444,4.56809 -6.8662,0.0509 -8.3898,12.14826 -2.2551,17.9063 3.1328,2.94054 3.595,4.92477 2.7089,11.6301 -0.5877,4.44657 -2.7757,10.57127 -4.8622,13.61046 -5.0921,7.41691 -9.0058,23.19458 -7.0302,28.34179 1.2719,3.31367 0.3242,5.17088 -5.3808,10.54518 -6.5941,6.21195 -7.536,8.64956 -19.7436,51.09722 -12.0774,41.99468 -12.7471,45.2723 -11.5734,56.64006 0.9449,9.15082 2.9635,15.15585 8.3551,24.85489 l 7.1092,12.78888 -4.7811,30.28202 c -2.6296,16.65513 -5.1276,31.57537 -5.5511,33.15607 -0.4483,1.6735 -12.4551,7.8664 -28.74128,14.8244 -15.38423,6.5727 -28.37362,12.6254 -28.86529,13.4505 -0.49167,0.8251 -0.38294,3.1701 0.24163,5.211 1.10566,3.6134 2.80917,3.7108 64.85364,3.7108 l 63.7181,0 -2.842,-5.7 z m 415.1535,1.9892 c 0.6246,-2.0409 0.7413,-4.3726 0.2593,-5.1815 -0.482,-0.8088 -13.4174,-6.8969 -28.7452,-13.5289 l -27.8689,-12.0583 -2.0243,-12.11438 c -1.1134,-6.66293 -3.6854,-21.45158 -5.7156,-32.86368 l -3.6913,-20.74928 7.243,-12.86249 c 5.8535,-10.39497 7.469,-15.35303 8.421,-25.84466 1.1242,-12.39016 0.5949,-14.97934 -11.6071,-56.78042 -12.1242,-41.53418 -13.1434,-44.13549 -19.7168,-50.32143 -5.6714,-5.33706 -6.6599,-7.25447 -5.4364,-10.54518 1.9182,-5.15934 -2.2878,-22.0291 -7.216,-28.94257 -2.0291,-2.84654 -4.1627,-8.75725 -4.7412,-13.13494 -0.8681,-6.56881 -0.392,-8.57881 2.7254,-11.50484 3.7414,-3.51165 4.9483,-11.22947 2.4021,-15.36017 -0.7261,-1.178 -3.3419,-2.43643 -5.8127,-2.79655 -3.3527,-0.48862 -4.3362,-1.60024 -3.8763,-4.38133 0.3389,-2.04965 0.4113,-7.08138 0.1608,-11.18165 -0.7069,-11.57512 -0.4632,-16.39925 1.0755,-21.28162 1.1694,-3.71057 0.9045,-4.30241 -1.4976,-3.34638 -2.2761,0.9059 -3.1543,-0.35769 -3.9911,-5.74285 -0.5901,-3.79734 -1.896,-10.81249 -2.902,-15.58918 -1.006,-4.7767 -1.6416,-10.22819 -1.4125,-12.11442 0.2291,-1.88623 -0.048,-4.68755 -0.6157,-6.22515 -2.4363,-6.59778 -2.4418,-8.78139 -0.04,-15.84194 4.7081,-13.84018 -1.6008,-50.07815 -10.412,-59.80573 -2.1984,-2.42704 -4.4923,-7.57613 -5.0976,-11.44242 l -1.1005,-7.02963 -36.3597,-0.50453 c -27.8449,-0.38638 -36.3598,0.0325 -36.3598,1.7887 0,5.27931 11.007,68.02945 12.6238,71.9677 1.2724,3.09914 0.9415,6.89591 -1.1898,13.65403 l -2.9521,9.36114 6.7292,22.68923 c 3.7742,12.72551 9.7831,28.02413 13.6836,34.83775 5.8592,10.23549 6.7833,13.24122 5.8685,19.08774 -0.7177,4.58722 -0.2539,7.97876 1.3685,10.00623 2.1254,2.65613 1.9159,3.43775 -1.5643,5.83437 -2.8605,1.96983 -4.0186,4.60971 -4.0186,9.16013 0,5.3043 0.8447,6.69817 4.961,8.18642 4.6471,1.68019 5.3295,3.41296 10.788,27.39346 6.6587,29.25322 6.7995,31.08736 3.0929,40.28817 -2.3674,5.87641 -2.4642,12.50571 -0.7438,50.8852 l 1.9781,44.12852 8.3811,17.83548 c 8.2816,17.62396 8.4769,17.85853 16.4674,19.78063 l 8.0865,1.94516 1.0914,10.16926 c 0.9752,9.08626 9.3446,52.4391 11.4988,59.5626 0.5454,1.8036 -2.0438,4.696 -7.2778,8.1304 -4.4684,2.9319 -9.3319,7.7527 -10.8078,10.7127 l -2.6834,5.3819 63.7182,0 c 62.0445,0 63.748,-0.097 64.8537,-3.7108 z M 140.65845,623.29478 c 0,-0.62129 -2.45598,-4.34574 -5.45772,-8.27657 l -5.45771,-7.14697 8.1532,-15.63951 c 8.91265,-17.0963 10.37102,-26.91203 5.46142,-36.75887 -2.4941,-5.00229 -2.39513,-5.91782 1.34775,-12.46775 3.30155,-5.77761 4.54444,-12.63407 6.80344,-37.53149 2.61864,-28.86125 2.59503,-30.7505 -0.44925,-35.94242 -3.32745,-5.67484 -4.64847,-12.44106 -1.41619,-7.25363 1.52701,2.45067 1.74534,2.43203 1.76948,-0.15096 0.0144,-1.62065 1.94613,-4.01161 4.29113,-5.31324 3.34501,-1.85671 4.50315,-4.43429 5.37535,-11.96342 1.61472,-13.93888 1.38976,-26.29356 -0.51579,-28.32757 -0.91231,-0.97381 -1.22236,-4.07697 -0.68902,-6.8959 0.73344,-3.87633 2.01348,-5.12533 5.2527,-5.12533 5.9841,0 5.9107,-6.96029 -0.09,-8.52231 -4.59428,-1.19593 -4.60337,-2.00046 -0.1461,-12.91089 2.0024,-4.9012 4.8169,-34.93649 7.1607,-76.41402 1.2259,-21.69383 2.7417,-28.63458 6.5259,-29.88025 1.8762,-0.61762 3.4113,-2.80032 3.4113,-4.85045 0,-3.0547 0.7298,-3.46456 4.0432,-2.27073 2.2238,0.80123 6.8735,1.48678 10.3327,1.52342 l 6.2894,0.0665 0.5063,-21.89915 0.5063,-21.89914 -8.8738,0 c -7.8121,0 -8.7676,-0.42077 -7.9869,-3.51717 0.4878,-1.93444 0.01,-4.08067 -1.0667,-4.76938 -1.0745,-0.68872 -1.9659,-6.02519 -1.9811,-11.85882 -0.014,-5.83364 -0.7587,-11.80504 -1.6525,-13.26979 -1.1503,-1.8852 -8.3601,-3.26308 -24.68104,-4.71681 -22.82559,-2.03311 -23.15839,-2.00649 -33.28979,2.66317 -8.32746,3.83821 -10.46341,5.75322 -11.46684,10.28075 -0.67823,3.06017 -2.39753,7.40705 -3.82068,9.65975 -1.94504,3.0788 -2.10962,5.02197 -0.66283,7.82577 1.05861,2.05154 1.92473,7.13992 1.92473,11.30758 0,6.8564 -0.431,7.57755 -4.52875,7.57755 l -4.52874,0 1.17786,18.17163 c 0.64782,9.99439 1.80657,19.01032 2.57501,20.03538 0.76844,1.02507 0.69427,5.63787 -0.16483,10.25066 -0.8591,4.6128 -1.59721,14.55033 -1.64026,22.08341 -0.0496,8.67283 -1.15768,16.05575 -3.021187,20.12871 -2.15229,4.70414 -2.46964,7.53373 -1.18124,10.53233 1.09661,2.55221 1.1946,10.05051 0.25958,19.86146 -0.96046,10.07789 -0.85851,16.42884 0.28274,17.6125 0.981677,1.01815 1.784867,4.19951 1.784867,7.06969 0,4.32392 -0.77013,5.21852 -4.492467,5.21852 -5.59196,0 -6.29997,6.60884 -0.89849,8.3869 4.365347,1.437 4.947457,10.49297 0.89849,13.97818 -1.48251,1.2761 -2.69548,5.08295 -2.69548,8.45967 0,4.44886 -1.2742,7.10216 -4.62723,9.63543 l -4.62723,3.49594 3.109,8.30798 c 1.70994,4.56939 4.19652,9.63206 5.52572,11.25038 1.3292,1.61832 2.41673,3.92472 2.41673,5.12533 0,1.20061 0.80864,2.18294 1.79699,2.18294 2.787297,0 2.11799,6.85585 -0.98333,10.0724 -4.31688,4.47728 -7.51721,45.25005 -4.36817,55.65127 2.37004,7.82817 2.4619,14.48823 0.22458,16.28163 -0.6394,0.51253 -0.75822,14.77027 -0.26405,31.68386 0.7827,26.78867 1.39512,31.71279 4.75188,38.20701 l 3.853387,7.45503 16.81198,2.06886 c 22.11158,2.72105 23.10145,2.78365 23.10145,1.46091 z m 550.72009,-2.22591 c 10.1506,-1.23494 10.943,-1.70409 14.7956,-8.75937 3.746,-6.86014 4.0729,-9.78277 4.1001,-36.65341 0.022,-21.57041 0.6164,-29.45462 2.2758,-30.17787 1.6086,-0.70109 1.3535,-1.56509 -0.8985,-3.04355 -3.8782,-2.5461 -3.9758,-6.81617 -0.3607,-15.78973 2.3643,-5.86873 2.5006,-10.04764 0.9046,-27.71803 -1.0336,-11.44406 -1.8821,-22.27512 -1.8855,-24.06898 0,-1.79387 -1.2191,-3.26158 -2.7016,-3.26158 -1.797,0 -2.6955,-1.86375 -2.6955,-5.59127 0,-3.0752 0.6112,-5.59127 1.3583,-5.59127 1.7758,0 9.1408,-16.70475 10.5213,-23.86369 0.8818,-4.57265 0.3927,-5.80616 -2.7062,-6.82627 -2.8569,-0.94043 -3.7824,-2.77791 -3.7824,-7.50952 0,-3.44543 -1.1144,-7.42021 -2.4764,-8.83283 -1.362,-1.41261 -3.0219,-5.14462 -3.6888,-8.2933 -1.0762,-5.08237 -0.684,-5.86243 3.4943,-6.9501 5.6962,-1.48279 5.4756,-7.32654 -0.309,-8.18583 -4.4357,-0.65891 -6.7935,-7.38092 -3.8702,-11.03411 1.3079,-1.63442 1.625,-8.23385 0.9303,-19.35626 -0.6886,-11.02222 -0.3368,-18.50936 1.0139,-21.5841 1.7227,-3.92127 1.5499,-5.10087 -1.0343,-7.06067 -2.4461,-1.85507 -3.2512,-5.98147 -3.8053,-19.50293 -0.3866,-9.43253 -1.1823,-17.64722 -1.7682,-18.2549 -1.5955,-1.65483 -1.2838,-11.83234 0.5676,-18.52734 0.898,-3.2476 1.8996,-12.46766 2.2257,-20.48902 0.5569,-13.69933 0.36,-14.61891 -3.245,-15.15474 -2.9341,-0.43611 -4.0376,-2.19159 -4.6863,-7.45502 -0.4666,-3.78652 -0.1455,-7.68134 0.7137,-8.65515 2.3521,-2.66604 1.777,-8.96055 -1.1905,-13.02977 -1.4511,-1.98979 -2.6384,-5.54215 -2.6384,-7.89413 0,-3.35383 -2.229,-5.41071 -10.3327,-9.53466 l -10.3327,-5.25832 -22.4866,2.05345 c -12.3676,1.12939 -23.4865,2.69437 -24.7086,3.47772 -1.389,0.89039 -2.2219,5.88286 -2.2219,13.31871 0,6.54193 -0.8087,12.41277 -1.797,13.04629 -0.9884,0.63353 -1.797,2.77975 -1.797,4.76939 0,3.04493 -1.28,3.61752 -8.0865,3.61752 l -8.0864,0 0,22.61048 0,22.61048 6.7387,-0.99364 c 3.7063,-0.54649 8.1538,-1.58535 9.8834,-2.30856 2.1989,-0.91943 3.1448,-0.43383 3.1448,1.61455 0,1.6112 1.5119,3.7687 3.3599,4.79446 4.805,2.66709 9.1022,22.37074 8.9936,41.23735 -0.1409,24.47904 3.768,63.74022 6.6843,67.13719 3.7062,4.31708 3.1419,10.434 -1.068,11.57581 -5.5274,1.49917 -4.7823,8.77876 0.8985,8.77876 3.8844,0 4.4925,0.83249 4.4925,6.1504 0,3.38272 -0.7967,6.97673 -1.7705,7.98668 -1.0749,1.11481 -1.3104,8.02469 -0.5994,17.58691 1.0571,14.21758 1.6667,16.2017 6.263,20.38471 5.3104,4.833 6.2922,9.17785 3.3585,14.86326 -1.142,2.21308 -0.8182,13.72157 0.9491,33.73075 2.1308,24.12486 3.4796,31.84239 6.5578,37.52286 3.7285,6.88041 3.7606,7.4007 0.8479,13.73576 -4.7069,10.23717 -3.7347,16.65306 5.059,33.38463 4.4475,8.4623 8.0864,16.40524 8.0864,17.65099 0,1.24573 -2.0216,5.01393 -4.4924,8.37377 -2.4709,3.35983 -4.4925,6.68753 -4.4925,7.39486 0,0.70735 3.8411,0.79581 8.5357,0.19655 4.6946,-0.59925 13.3619,-1.67673 19.2607,-2.39437 z m -248.1235,-39.92576 c 4.1583,-7.65302 5.6302,-12.02778 4.3276,-12.86272 -3.143,-2.01465 -0.6296,-31.68332 2.9116,-34.36889 2.4117,-1.82897 2.8402,-7.35332 2.8402,-36.61238 0,-30.32287 0.8627,-40.67714 7.188,-86.27486 l 7.1879,-51.81646 0,-93.62378 0,-93.62379 -4.3522,-2.95761 -4.3521,-2.95761 -0.091,14.49698 c -0.1842,29.23188 -10.3936,49.21266 -30.3351,59.369 -9.0995,4.63443 -12.1526,5.21645 -26.4593,5.04411 -20.3042,-0.24458 -31.9897,-4.95631 -42.237,-17.0305 -9.0241,-10.63275 -13.9618,-24.42873 -15.4739,-43.23386 -2.8178,-35.04203 -4.2853,-6.72765 -4.2853,82.67872 l 0,95.61793 6.2895,45.24124 c 5.6304,40.50068 6.2894,49.41322 6.2894,85.05646 l 0,39.81523 4.4925,0 c 4.4739,0 4.4925,0.0725 4.4925,17.55038 0,11.88272 -0.6886,17.78842 -2.1322,18.2875 -1.3687,0.47319 0.2864,4.86625 4.6226,12.26973 l 6.7547,11.53261 33.0102,0 33.0101,0 6.3015,-11.59743 z m -99.8036,-52.7872 c 0.3475,-0.33235 0.6405,-16.80363 0.6511,-36.60286 0.014,-26.31399 -0.9845,-43.51967 -3.7118,-63.95498 -2.052,-15.37599 -4.0922,-31.73046 -4.5336,-36.34325 -0.4415,-4.6128 -1.6484,-12.16102 -2.682,-16.77381 -1.156,-5.15853 -1.9095,-41.20878 -1.9576,-93.65378 l -0.078,-85.26686 -5.1125,0 c -2.8303,0 -6.5643,-1.66394 -8.365,-3.72752 -2.6395,-3.02507 -5.5346,-3.72751 -15.3628,-3.72751 -10.9756,0 -12.6512,0.52395 -17.8814,5.59127 -4.3667,4.23067 -7.474,5.59127 -12.769,5.59127 -3.8489,0 -6.9979,-0.77248 -6.9979,-1.71662 0,-2.42596 -28.3724,-2.26437 -35.9398,0.20469 -8.0653,2.6315 -8.9241,4.14898 -8.9574,15.82642 -0.024,8.58347 -0.4763,9.7212 -4.0708,10.25066 -3.9271,0.57846 -4.0575,1.29382 -4.5421,24.91246 l -0.4988,24.31688 4.9913,1.82278 4.9914,1.82275 0.045,20.45426 c 0.051,22.84776 1.1557,28.00116 6.3035,29.39734 1.9439,0.52723 3.5345,2.29518 3.5345,3.92874 0,4.5104 10.1813,3.91704 12.9959,-0.75739 3.1478,-5.22775 8.5571,-4.64378 16.7835,1.8119 3.8824,3.04669 8.784,5.56276 10.8925,5.59127 2.2961,0.0311 4.2105,1.54683 4.7734,3.77937 0.5624,2.23017 2.4512,3.72751 4.7021,3.72751 3.5753,0 3.7622,0.95575 3.7622,19.23744 0,21.16068 3.3848,35.43057 9.1652,38.63906 2.6204,1.45452 3.4137,3.95862 3.4137,10.77531 0,4.88426 -0.9703,9.8869 -2.1564,11.11697 -1.6771,1.73951 -1.6771,2.73352 0,4.47302 1.1861,1.23008 2.1564,5.84288 2.1564,10.25066 0,7.30593 0.397,8.01416 4.4925,8.01416 4.1264,0 4.4925,0.68338 4.4925,8.3869 0,7.05939 -0.5521,8.38691 -3.4879,8.38691 -1.9184,0 -3.9471,0.77055 -4.5083,1.71232 -0.5612,0.94178 -8.4932,3.50716 -17.6267,5.70084 -9.1335,2.1937 -19.6388,4.81023 -23.3451,5.81455 l -6.7387,1.82602 0,11.66982 c 0,6.4184 -0.8127,12.51275 -1.806,13.54298 -1.0827,1.12294 -1.3429,6.46899 -0.6497,13.34786 l 1.1564,11.47468 14.5763,0.53713 c 16.555,0.61007 78.9383,-0.4921 79.8997,-1.41162 z m 214.6149,-23.59397 c -0.2927,-13.47207 -0.8428,-24.81681 -1.2224,-25.21057 -0.3797,-0.39374 -10.6052,-3.14345 -22.7234,-6.11046 -12.1182,-2.967 -22.8803,-6.2732 -23.9157,-7.34707 -1.0354,-1.07388 -3.3381,-1.95251 -5.1171,-1.95251 -2.6356,0 -3.2346,-1.55313 -3.2346,-8.38691 0,-7.14439 0.5325,-8.3869 3.594,-8.3869 2.9413,0 3.594,-1.24251 3.594,-6.84234 0,-3.86968 1.35,-8.38948 3.1073,-10.40347 2.9451,-3.37523 2.9451,-3.65529 0,-5.36469 -5.0136,-2.91 -4.241,-17.49117 1.2015,-22.67501 6.59,-6.27687 10.0671,-20.03959 10.0671,-39.84743 0,-15.77255 0.3119,-17.37368 3.3844,-17.37368 1.8731,0 3.804,-1.66448 4.3242,-3.72751 0.5272,-2.09093 2.4511,-3.72752 4.3819,-3.72752 1.8932,0 6.6186,-2.49273 10.501,-5.53942 8.247,-6.47186 14.2414,-7.14963 16.9422,-1.9156 1.2798,2.48015 3.7626,3.72751 7.4194,3.72751 3.9847,0 5.7545,-1.02499 6.4359,-3.72751 0.5169,-2.05014 2.3563,-3.72752 4.0876,-3.72752 4.2585,0 6.1804,-11.12472 5.6745,-32.84537 -0.3662,-15.72221 -0.12,-17.07835 3.2677,-17.99716 3.4603,-0.93852 3.6637,-2.40028 3.6637,-26.32888 0,-20.89216 -0.457,-25.3352 -2.6062,-25.3352 -1.8539,0 -2.9609,-3.25086 -3.8348,-11.26187 -1.1485,-10.52895 -1.6173,-11.43039 -7.2043,-13.85152 -6.5859,-2.85398 -36.109,-3.42914 -37.7145,-0.73474 -1.3469,2.26024 -15.1287,2.03753 -15.1287,-0.24447 0,-1.02506 -1.1846,-1.86375 -2.6323,-1.86375 -1.4478,0 -3.4978,-1.67738 -4.5557,-3.72752 -1.6585,-3.21403 -3.7626,-3.72751 -15.2744,-3.72751 -11.5118,0 -13.6159,0.51348 -15.2744,3.72751 -1.3553,2.62646 -3.7626,3.72752 -8.1497,3.72752 l -6.2262,0 0,86.43708 c 0,72.29225 -0.4374,87.52281 -2.6729,93.07193 -1.4836,3.6825 -2.2163,9.0028 -1.6468,11.95635 0.5644,2.92682 -1.063,20.26587 -3.6165,38.53125 -3.6981,26.45239 -4.6427,40.37139 -4.6427,68.40643 l 0,35.19665 48.1395,-0.0518 48.1395,-0.0518 -0.5321,-24.49465 z M 421.76154,234.78795 c 12.5851,-4.88366 22.6669,-16.34707 27.0302,-30.73453 4.428,-14.60104 4.1018,-40.84501 -0.7054,-56.75073 l -3.6614,-12.11442 3.9787,-3.1341 c 4.9554,-3.90352 3.1015,-6.36345 -2.4666,-3.27279 -2.2643,1.25685 -4.3579,1.51448 -4.6603,0.57349 -1.8717,-5.82364 -13.186,-20.81511 -18.4911,-24.50064 -4.6704,-3.24461 -7.1454,-7.003685 -9.6143,-14.602583 l -3.3248,-10.233174 -8.2824,0.560427 -8.2824,0.560427 -2.7687,9.68206 c -2.1467,7.507059 -4.3834,10.899233 -9.9566,15.100363 -3.9534,2.98006 -9.988,10.05763 -13.4102,15.72793 -6.0501,10.02439 -6.3376,10.2313 -10.3888,7.4782 -5.0591,-3.43803 -8.1373,-1.21449 -3.3474,2.41805 1.8682,1.41682 4.0405,2.81596 4.8272,3.10919 0.7868,0.29324 -0.084,5.14595 -1.9345,10.78382 -6.7627,20.60086 -6.1967,50.74814 1.2407,66.08419 5.58,11.50593 17.1642,21.53645 29.2908,25.36226 8.7908,2.77338 24.8623,1.80825 34.9273,-2.09744 z" \
       style="fill:#000000" /> \
';

svg += "</g></svg>";

	return svg;

}


function battleTechLogoSVG ( standAlone, baseFillColor, aFillColor, xLoc, yLoc, width ) {
	var baseWidth = 210;
	var baseHeight = 28;
	if( typeof( width ) == "undefined" || width == 0) {
		theWidth = 210;
		theHeight = 28;
	} else {
		theWidth = width;
		theHeight = Math.round( width / baseWidth * baseHeight );
	}

	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof(standAlone) == "undefined" )
		standAlone = true;

	if( !baseFillColor )
		baseFillColor = colorTan;

	if( !aFillColor )
		aFillColor = colorGold;

	if( standAlone ) {
		var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + "px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

	} else {
		var svg = '<svg \
		   viewBox="0 0 790 100" \
		   height="' + theHeight + 'px" \
		   width="' + theWidth + 'px" \
		   x="' + xLoc + 'px" \
		   y="' + yLoc + 'px" \
		   id=\"btLogo\" \
		   version="1.1"> \
		  <g> \"';
	  }



	svg += '<path \
       style="fill:' + baseFillColor + ';fill-opacity:1" \
       d="m 613.14797,97.475074 c -22.55326,-4.54102 -37.15014,-23.093463 -35.59872,-45.245504 0.80541,-11.500123 4.65183,-20.129404 12.33332,-27.669285 8.70005,-8.53966 19.66012,-12.841085 32.94182,-12.928434 13.03574,-0.08571 22.06992,3.344107 29.95796,11.373609 4.30902,4.386291 9.64083,12.354358 8.81769,13.177502 -0.48955,0.489545 -18.75978,9.049511 -20.47631,9.59357 -1.28765,0.408111 -1.96543,-0.151872 -3.84663,-3.178085 -1.45635,-2.342783 -3.5741,-4.429788 -5.84618,-5.761307 -9.13401,-5.352899 -22.62013,-0.192407 -26.08697,9.982218 -1.87994,5.517331 -1.54632,13.334811 0.76721,17.977475 4.14483,8.317581 13.22817,12.313718 22.27788,9.800981 3.11377,-0.864571 10.18475,-7.253029 10.18475,-9.201671 0,-0.612272 0.31314,-1.306735 0.69586,-1.543272 0.55987,-0.346024 21.30969,8.637335 22.34734,9.674984 0.15811,0.158104 -0.66682,2.076919 -1.83316,4.264015 -2.70077,5.064342 -10.72234,13.110593 -15.73262,15.781022 -8.54657,4.555229 -20.29316,6.038485 -30.90324,3.902182 z M 1.432377,54.886471 l 0,-42.291291 26.734517,0.0117 c 28.953298,0.01266 32.397458,0.368487 38.567864,3.984585 13.631143,7.988382 13.737063,28.930366 0.181219,35.829155 -2.190529,1.114789 -2.191238,1.117415 -0.451992,1.669431 2.916553,0.92567 8.378881,6.520629 10.230164,10.478542 2.158699,4.615149 2.382168,12.500468 0.509976,17.995039 -1.645329,4.828763 -7.551683,10.785957 -12.587425,12.69577 -3.388228,1.284982 -6.476365,1.438839 -33.45854,1.667006 l -29.725783,0.251359 0,-42.291282 z m 48.096499,19.665707 c 0.898395,-0.472873 1.880668,-1.230047 2.182849,-1.682594 C 52.668353,71.4369 52.329337,68.475488 51.046407,67.057876 49.949844,65.846179 48.500843,65.6903 38.333494,65.6903 l -11.475292,0 0,4.860823 0,4.860823 10.518626,0 c 6.479807,0 11.145807,-0.330129 12.152048,-0.859768 z M 49.420837,42.018111 c 1.678338,-1.518873 1.768324,-4.237325 0.192417,-5.813223 -0.959715,-0.959724 -3.153138,-1.17515 -11.965096,-1.17515 l -10.789956,0 0,4.113006 0,4.112997 10.597539,0 c 8.81168,0 10.827988,-0.208552 11.965096,-1.23763 z m 127.001083,24.439995 0,-30.640563 -11.03033,-0.20695 -11.03032,-0.206942 0,-11.217279 0,-11.217279 35.14748,0 35.14747,0 0,11.217279 0,11.217279 -11.03032,0.206942 -11.03033,0.20695 0,30.640563 0,30.640572 -13.08682,0 -13.08683,0 z m 74.78186,-0.01994 0,-30.660561 -11.23676,0 -11.23675,0 0.20642,-11.404231 0.20644,-11.404241 35.14747,0 35.14748,0 0,11.217279 0,11.21728 -11.03033,0.206941 -11.03033,0.20696 0,30.640563 0,30.640572 -13.08682,0 -13.08682,0 z m 53.27584,-11.404231 0.19319,-42.064802 12.89987,-0.204611 12.89986,-0.204612 0,30.678221 0,30.678222 15.70419,0 15.70419,0 0,11.591182 0,11.591193 -28.79724,0 -28.79723,0 z m 63.70339,41.071024 c -0.20974,-0.54658 -0.28331,-19.475735 -0.16349,-42.064792 l 0.21787,-41.071034 68.61235,-0.190863 68.61235,-0.190873 0,11.595104 0,11.595104 -11.21728,0 -11.21728,0 0,30.660561 0,30.660562 -12.71291,0 -12.71292,0 0,-30.660562 0,-30.660561 -31.78229,0 -31.78228,0 0,3.739093 0,3.739093 18.69546,0 18.69546,0 0,11.217279 0,11.21728 -18.69546,0 -18.69546,0 0,4.112996 0,4.113007 19.06937,0 19.06937,0 0,11.591182 0,11.591193 -31.80576,0 c -25.76175,0 -31.87822,-0.18885 -32.1871,-0.993769 z m 142.51381,-41.257985 0,-42.251745 31.78229,0 31.78229,0 0,11.591183 0,11.591193 -18.69546,0 -18.69547,0 0,3.739093 0,3.739093 18.32155,0 18.32156,0 0,11.217279 0,11.21728 -18.32156,0 -18.32155,0 0,4.112996 0,4.113007 18.69547,0 18.69546,0 0,11.591182 0,11.591193 -31.78229,0 -31.78229,0 z m 154.97917,0.186961 0.19318,-42.064802 12.89988,-0.204611 12.89986,-0.204612 0,14.974032 0,14.974032 14.58246,0 14.58247,0 0,-14.974032 0,-14.974032 12.89986,0.204612 12.89988,0.204611 0,41.877841 0,41.877841 -12.89988,0.204611 -12.89986,0.204621 0,-16.095762 0,-16.095762 -14.58247,0 -14.58246,0 0,16.078103 0,16.078102 -13.09305,0 -13.09304,0 z" /> \
    <path \
       style="fill:' + aFillColor + ';fill-opacity:1" \
       d="m 81.354266,96.997204 c 0.132976,-0.52117 2.748565,-5.40069 5.812408,-10.84338 l 5.570619,-9.89577 26.257817,0 26.25782,0 5.74945,10.15953 c 3.16218,5.58774 5.74943,10.46725 5.74943,10.84337 0,0.40421 -15.46403,0.68383 -37.81966,0.68383 -30.157097,0 -37.770684,-0.19199 -37.577884,-0.94758 z m -1.627755,-27.03083 c 0,-1.33965 39.191139,-70.72527986 39.670909,-70.23501986 0.33538,0.34274 9.36944,16.27127986 20.07565,35.39672986 l 19.46585,34.77357 -13.19042,0.20474 c -7.25473,0.11262 -13.43513,-0.0556 -13.73422,-0.3739 -0.29911,-0.31827 -3.31884,-5.57872 -6.71055,-11.68991 -5.31432,-9.57538 -6.27985,-10.91917 -6.98514,-9.72164 -0.45011,0.76429 -3.34948,5.9326 -6.44302,11.48516 l -5.62462,10.09555 -13.262212,0.20421 c -7.294228,0.11231 -13.262227,0.0496 -13.262227,-0.13949 z" /> \
  </g>';

	svg += "<text x=\"750\" y=\"30\" font-family=\"sans-serif\" text-anchor=\"start\" style=\"fill:" + baseFillColor + ";fill-opacity:1\" font-size=\"25\">TM</text>\n";


	svg += "</svg>";


	return svg;
}

/* Functions outside scope for SVG manipulation */
function ASChangeSVGHeat( newHeatValue, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.setMechHeat( newHeatValue, groupIndex, mechIndex ) ;
		}
    );
}


function ASToggleArmorPip( armorIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleArmorPip( armorIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleStructPip( structIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleStructPip( structIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleEngineHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleEngineHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleFireControlHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleControlHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleMPlHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleMPHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleWeaponHits( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleWeaponHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASTakeDamage(  groupIndex, mechIndex, idField ) {
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.showDamagePopup( groupIndex, mechIndex ) ;
		}
    );
}


function createSVGRecordSheet( mechData, inPlay, landscape, itemIDField ) {
	if( typeof( landscape ) == "undefined" ) {
		landscape = false;
	} else {
		if( landscape )
			landscape = true;
		else
			landscape = false;
	}

	if( typeof( inPlay ) == "undefined" ) {
		inPlay = false;
	} else {
		if( inPlay )
			inPlay = true;
		else
			inPlay = false;
	}

	if( typeof( itemIDField ) == "undefined" ) {
		itemIDField = "";
	} else {
		if( !itemIDField )
			itemIDField = "";
	}

	if( itemIDField ) {
		// this is a workaround for a bug. When I previously had parameters, the $index and $parent.$index
		// paramters were undefined when passed directly, but are passed correctly when in the string of the id field
		itemItems = itemIDField.split("-");
		groupIndex = itemItems[2] / 1;
		mechIndex = itemItems[3] / 1;
	}

	var docWidth = 2000;
	var docHeight = 2600;

	svgCode = "<!DOCTYPE HTML><svg version=\"1.1\" x=\"0px\" y=\"0px\" xml:space=\"preserve\" viewBox=\"0 0 " + docWidth  + " " + docHeight  + "\" xmlns=\"http://www.w3.org/2000/svg\">\n";

	svgCode += "<g>\n";

	svgCode += "<rect x=\"0\" y=\"0\" width=\"" + docWidth  + "\" height=\"" + docHeight  + "\" fill=\"" + colorWhite + "\" />\n";


	/*
	 * Mech Data
	 */
	// Mech Data Box....
	var mechDataTop = 10;
	var mechDataLeft = 10;
	svgCode += createRSGroupBox( "'Mech Data", 10, 10, 400, 700);

	// Name/Type
	svgCode += "<text x=\"" + ( mechDataLeft + 10 ) + "\" y=\"" + (mechDataTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">Type:</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 10 ) + "\" y=\"" + (mechDataTop + 120) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"35\">" + mechData.getName() + "</text>\n";


	// Movement
	svgCode += "<text x=\"" + ( mechDataLeft + 15 ) + "\" y=\"" + (mechDataTop + 160) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">Movement Points</text>\n";

	// Walk
	svgCode += "<text x=\"" + ( mechDataLeft + 220 ) + "\" y=\"" + (mechDataTop + 210) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">Walking:</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 240 ) + "\" y=\"" + (mechDataTop + 210) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"30\">" + mechData.getWalkSpeed() + "</text>\n";

	// Run
	svgCode += "<text x=\"" + ( mechDataLeft + 220 ) + "\" y=\"" + (mechDataTop + 245) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">Running</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 240 ) + "\" y=\"" + (mechDataTop + 245) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"30\">" + mechData.getRunSpeed() + "</text>\n";

	// Jump
	svgCode += "<text x=\"" + ( mechDataLeft + 220 ) + "\" y=\"" + (mechDataTop + 280) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">Jumping</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 240 ) + "\" y=\"" + (mechDataTop + 280) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"30\">" + mechData.getJumpSpeed() + "</text>\n";

	// Tonnage
	svgCode += "<text x=\"" + ( mechDataLeft + 340 ) + "\" y=\"" + (mechDataTop + 160) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">Tonnage:</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 665 ) + "\" y=\"" + (mechDataTop + 160) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">" + mechData.getTonnage() + "</text>\n";

	// Tech Base
	svgCode += "<text x=\"" + ( mechDataLeft + 340 ) + "\" y=\"" + (mechDataTop + 205) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">Tech Base:</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 665 ) + "\" y=\"" + (mechDataTop + 225) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">" + mechData.getLocalTranslation( mechData.getTech().name)  + "</text>\n";

	// Era
	eraString = mechData.getLocalTranslation( mechData.getEra().name);
	eraArray = eraString.split("(");
	eraLine1 = eraArray[0];
	if( eraArray[1] ) {
		eraLine2 = eraArray[1];
		eraLine2 = eraLine2.replace(")", "");
		eraLine2 = eraLine2.replace("(", "");
	}
	eraLine1 = eraLine1.trim();
	eraLine2 = eraLine2.trim();
	svgCode += "<text x=\"" + ( mechDataLeft + 340 ) + "\" y=\"" + (mechDataTop + 255) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">Era:</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 665 ) + "\" y=\"" + (mechDataTop + 280) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">" + eraLine1  + "</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 665 ) + "\" y=\"" + (mechDataTop + 300) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">" + eraLine2  + "</text>\n";


	// Cost
	svgCode += "<text x=\"" + ( mechDataLeft + 15 ) + "\" y=\"" + (mechDataTop + 350) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">Cost (CBills)</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 15 ) + "\" y=\"" + (mechDataTop + 380) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">" + mechData.getCBillCost()  + "</text>\n";
	// BV
	svgCode += "<text x=\"" + ( mechDataLeft + 340 ) + "\" y=\"" + (mechDataTop + 350) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">BattleValue (BV2)</text>\n";
	svgCode += "<text x=\"" + ( mechDataLeft + 340 ) + "\" y=\"" + (mechDataTop + 380) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">" + mechData.getBattleValue()  + "</text>\n";


	/*
	 * Weapons and Equipment
	 */
	// Weapons and Equipment Data Box....
	var weapAndEqpTop = 460;
	var weapAndEqpLeft = 10;

	var wacCol1 = weapAndEqpLeft + 15;
	var wacCol2 = weapAndEqpLeft + 90;
	var wacCol3 = weapAndEqpLeft + 470;
	var wacCol4 = weapAndEqpLeft + 550;
	var wacCol5 = weapAndEqpLeft + 650;
	var wacCol6 = weapAndEqpLeft + 770;
	var wacCol7 = weapAndEqpLeft + 880;
	var wacCol8 = weapAndEqpLeft + 990;
	var wacCol9 = weapAndEqpLeft + 1100;

	var eqLineHeight = 33;
	svgCode += createRSGroupBox( "Weapons and Equipment", weapAndEqpLeft, weapAndEqpTop, 750, 1200);
	// Col Headers
	svgCode += "<text x=\"" + ( wacCol1 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Qty</text>\n";
	svgCode += "<text x=\"" + ( wacCol2 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Type</text>\n";
	svgCode += "<text x=\"" + ( wacCol3 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Loc</text>\n";
	svgCode += "<text x=\"" + ( wacCol4 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Heat</text>\n";
	svgCode += "<text x=\"" + ( wacCol5 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Dmg</text>\n";
	svgCode += "<text x=\"" + ( wacCol6 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Min</text>\n";
	svgCode += "<text x=\"" + ( wacCol7 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Sht</text>\n";
	svgCode += "<text x=\"" + ( wacCol8 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Med</text>\n";
	svgCode += "<text x=\"" + ( wacCol9 ) + "\" y=\"" + (weapAndEqpTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Lng</text>\n";


	for( eq_count = 0; eq_count < mechData.sortedEquipmentList.length; eq_count++) {

		if( eq_count % 2 == 0 )
			svgCode += "<rect x=\"" + ( wacCol1 - 5 ) + "\" y=\"" + (weapAndEqpTop + 93 + eqLineHeight * eq_count) + "\" width=\"1180\" height=\"" + (eqLineHeight + 4 )  + "\" fill=\"" + colorVeryLightGray + "\" />\n";

		svgCode += "<text x=\"" + ( wacCol1 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].count + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol2 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].local_name + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol3 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].location.toUpperCase() + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol4 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].heat + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol5 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].damage + "</text>\n";
		if(mechData.sortedEquipmentList[eq_count].range_min.min == 0)
			svgCode += "<text x=\"" + ( wacCol6 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + "-" + "</text>\n";
		else
			svgCode += "<text x=\"" + ( wacCol6 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].range_min.min + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol7 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].range_min.short + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol8 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].range_min.medium + "</text>\n";
		svgCode += "<text x=\"" + ( wacCol9 + 30 ) + "\" y=\"" + (weapAndEqpTop + 120 + eqLineHeight * eq_count ) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"30\">" + mechData.sortedEquipmentList[eq_count].range_min.long + "</text>\n";
	}

	/*
	 * BATTLEMECH RECORD SHEET
	 */
	svgCode += "<text x=\"" + (docWidth / 2 - 25 ) + "\" y=\"" + "80" + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"65\">BATTLEMECH</text>\n";
	svgCode += "<text x=\"" + (docWidth / 2 - 25 ) + "\" y=\"" + "120" + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"35\">Record Sheet</text>\n";

	/*
	 * Pilot
	 */
	// Warrior Data Box....
	var pilotTop = 160;
	var pilotLeft = 725;
	svgCode += createRSGroupBox( "Warrior Data", pilotLeft, pilotTop, 250, 500);

	// Name/Type
	svgCode += "<text x=\"" + ( pilotLeft + 10 ) + "\" y=\"" + (pilotTop + 80) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">" + mechData.pilot.name + "</text>\n";

	// Piloting
	svgCode += "<text x=\"" + ( pilotLeft + 450 ) + "\" y=\"" + (pilotTop + 120) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"35\">Piloting: " + mechData.pilot.piloting + "</text>\n";

	// Gunnery
	svgCode += "<text x=\"" + ( pilotLeft + 450 ) + "\" y=\"" + (pilotTop + 160) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"35\">Gunnery: " + mechData.pilot.gunnery + "</text>\n";

	// Damage Track
	svgCode += "<text x=\"" + ( pilotLeft + 100 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">Hits:</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">Consc:</text>\n";

	boxWidth = 60;
	lWidthBuffer = 0;
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 170) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 170 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 210) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 210 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">1</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">3+</text>\n";

	lWidthBuffer += boxWidth;
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 170) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 170 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 210) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 210 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">2</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">5+</text>\n";


	lWidthBuffer += boxWidth;
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 170) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 170 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 210) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 210 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">3</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">7+</text>\n";


	lWidthBuffer += boxWidth;
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 170) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 170 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 210) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 210 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">4</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">10+</text>\n";


	lWidthBuffer += boxWidth;
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 170) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 170 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 210) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 210 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">5</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 35 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">11+</text>\n";



	lWidthBuffer += boxWidth;
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 170) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 170 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer ) + "\" y=\"" + (pilotTop + 210) + "\" width=\"" + (boxWidth) + "\" height=\"40\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"" + ( pilotLeft + 110 + lWidthBuffer + 1 ) + "\" y=\"" + (pilotTop + 210 + 1) + "\" width=\"" + (boxWidth - 2) + "\" height=\"38\" fill=\"" + colorWhite + "\" />\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 37 ) + "\" y=\"" + (pilotTop + 200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"25\">6</text>\n";
	svgCode += "<text x=\"" + ( pilotLeft + 100 + lWidthBuffer + 37 ) + "\" y=\"" + (pilotTop + 240) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"20\">Dead</text>\n";




	/*
	 * Armor
	 */
	// Armor Diagram Box....
	armorBoxTop = 10;
	armorBoxLeft = 1240;
	armorBoxWidth = 750;
	svgCode += createRSGroupBox( "Armor Diagram", armorBoxLeft, armorBoxTop, 1200, armorBoxWidth);
	svgCode += rsArmorSVG( false, colorBlack, colorBlack, armorBoxLeft + 37, armorBoxTop, 675 );
	svgCode += rsRearArmorSVG( false, colorBlack, colorBlack, armorBoxLeft + armorBoxWidth / 2 - 190, armorBoxTop + 875, 380 );

	// Main Armor Labels
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 ) + "\" y=\"" + (armorBoxTop + 80) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">HEAD [" + mechData.armorAllocation.head + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 - 65) + "\" y=\"" + (armorBoxTop + 105) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">LEFT TORSO</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 - 95 ) + "\" y=\"" + (armorBoxTop + 125) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">[" + mechData.armorAllocation.leftTorso + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 + 65 ) + "\" y=\"" + (armorBoxTop + 105) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">RIGHT TORSO</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 + 95 ) + "\" y=\"" + (armorBoxTop + 125) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">[" + mechData.armorAllocation.rightTorso + "]</text>\n";


	svgCode += "<text x=\"" + ( armorBoxLeft +  20 ) + "\" y=\"" + (armorBoxTop + 610) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">LEFT</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft +  20 ) + "\" y=\"" + (armorBoxTop + 630) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">ARM [" + mechData.armorAllocation.leftArm + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth - 40 ) + "\" y=\"" + (armorBoxTop + 610) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">RIGHT</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth - 40 ) + "\" y=\"" + (armorBoxTop + 630) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">ARM [" + mechData.armorAllocation.rightArm + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft +  20 ) + "\" y=\"" + (armorBoxTop + 890) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">LEFT</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft +  20 ) + "\" y=\"" + (armorBoxTop + 910) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">LEG [" + mechData.armorAllocation.leftLeg + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth - 40 ) + "\" y=\"" + (armorBoxTop + 890) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">RIGHT</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth - 40 ) + "\" y=\"" + (armorBoxTop + 910) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">LEG [" + mechData.armorAllocation.rightLeg + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2   ) + "\" y=\"" + (armorBoxTop + 600) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">CENTER</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2  ) + "\" y=\"" + (armorBoxTop + 620) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">TORSO</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2  ) + "\" y=\"" + (armorBoxTop + 640) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">[" + mechData.armorAllocation.centerTorso + ")</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2  ) + "\" y=\"" + (armorBoxTop + 1210) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">CENTER TORSO (REAR) [" + mechData.armorAllocation.centerTorsoRear + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 - 170 ) + "\" y=\"" + (armorBoxTop + 1090) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">LEFT TORSO</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 - 170 ) + "\" y=\"" + (armorBoxTop + 1110) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">(REAR) [" + mechData.armorAllocation.leftTorsoRear + "]</text>\n";

	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 + 170 ) + "\" y=\"" + (armorBoxTop + 1090) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">RIGHT TORSO</text>\n";
	svgCode += "<text x=\"" + ( armorBoxLeft + armorBoxWidth / 2 + 170 ) + "\" y=\"" + (armorBoxTop + 1110) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"20\">(REAR) [" + mechData.armorAllocation.rightTorsoRear + "]</text>\n";

	// Main Armor bubbles (this will be a lot of code, and possibly quite messy the first time around)

	var armorBubbleRadius = 10;
	// Head Armor
	if( mechData.armorAllocation.head >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + 200 - armorBubbleRadius * 5, armorBubbleRadius );
	if( mechData.armorAllocation.head >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + 200 - armorBubbleRadius * 5, armorBubbleRadius );
	if( mechData.armorAllocation.head >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + 200 - armorBubbleRadius * 5, armorBubbleRadius );

	if( mechData.armorAllocation.head >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + 200 - armorBubbleRadius * 2.5, armorBubbleRadius );
	if( mechData.armorAllocation.head >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + 200 - armorBubbleRadius * 2.5, armorBubbleRadius );
	if( mechData.armorAllocation.head >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 , armorBoxTop + 200 - armorBubbleRadius * 2.5, armorBubbleRadius );

	if( mechData.armorAllocation.head >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + 200, armorBubbleRadius );
	if( mechData.armorAllocation.head >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + 200, armorBubbleRadius );
	if( mechData.armorAllocation.head >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + 200, armorBubbleRadius );


	// Center Torso Armor  - Handles up to 71 currently ( should be *very* sufficient as max is 62 for a 100 ton 'mech )
	var ctTop = 275;

if( mechData.armorAllocation.centerTorso >= 55 ) {
		armorBubbleRadius = 8;
		// some poor fool put a LOT of armor in the front and not much in the rear
		var ctTop = 270;
		rowMultiplier = 0;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 55 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 56 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 57 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 58 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 59 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 60 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 61 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 62 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 63 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 64 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 65 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 66 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 67 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 68 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 69 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 70 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 71 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	} else if( mechData.armorAllocation.centerTorso >= 47 ) {
		armorBubbleRadius = 9;

		rowMultiplier = 0;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 48 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 50 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 49 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 51 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2+ armorBubbleRadius * 3, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 53 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 52 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 54 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	} else if( mechData.armorAllocation.centerTorso >= 25 ) {
		// do row of 4 step...
		 rowMultiplier = 0;
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 38 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 27 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 28 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 39 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 40 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 29 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 30 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 41 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 42 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 31 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 32 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 43 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 44 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 33 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 35 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 36 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 45 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 46 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 26 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	} else if( mechData.armorAllocation.centerTorso >= 47 ) {
		armorBubbleRadius = 9;

		rowMultiplier = 0;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 48 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 49 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	} else if( mechData.armorAllocation.centerTorso >= 25 ) {
		// do row of 4 step...
		 rowMultiplier = 0;
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 38 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		 rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 27 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 28 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 39 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 40 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 29 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 30 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 41 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 42 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 31 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 32 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 43 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 44 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 33 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 35 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 36 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 45 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 46 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 3.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 26 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	} else {
		// less than 25 do row of 3 step...
		rowMultiplier = 0;
		if( mechData.armorAllocation.centerTorso >= 2 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 17 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 4 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 21 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 1 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 22 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 5 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 18 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 3 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 7 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 19 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 9 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 23 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 6 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 24 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 10 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 20 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 8 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 11 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 15 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 12 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );


		rowMultiplier += 2.5;
		if( mechData.armorAllocation.centerTorso >= 13 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 16 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.centerTorso >= 14 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );



		rowMultiplier += 2.5;
	}

	armorBubbleRadius = 10;

	// Center Torso Rear Armor - Handles up to 39 currently ( should be *very* sufficient )
	var ctrTop = 960;
	rowMultiplier = 0;
	if( mechData.armorAllocation.centerTorsoRear >= 29 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 27 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 26 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 28 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



	rowMultiplier += 2.5;

	if( mechData.armorAllocation.centerTorsoRear >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 20 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 13 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	rowMultiplier += 2.5;
	if( mechData.armorAllocation.centerTorsoRear >= 22 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 24 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 21 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 25 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.centerTorsoRear >= 23 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5, armorBoxTop + ctrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Right Torso Armor - 51 MAX
	var rtTop = 210;
	distanceFromCenter = 115;


	if( mechData.armorAllocation.rightTorso >= 39) {
		armorBubbleRadius = 8;

		rowMultiplier = 0;
		if( mechData.armorAllocation.rightTorso >= 1 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 2 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 3 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 4 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 5 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 6 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 7 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 8 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 9 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 10 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 11 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 12 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 13 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 14 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 15 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 16 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 17 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 18 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 19 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 20 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 21 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 22 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 23 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 24 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 26 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 27 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 28 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 29 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 30 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 + distanceFromCenter, armorBoxTop + rtTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 31 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 32 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 33 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 36 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 38 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius - 4, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 39 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius - 4, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 40 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius - 6, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 41 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius - 8, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 42 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius - 8, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 43 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius - 8, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 44 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 45 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 46 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 48 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 49 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 50 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 51 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );



	} else {
		armorBubbleRadius = 10;
		rowMultiplier = 0;
		if( mechData.armorAllocation.rightTorso >= 12 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 2 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 11 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 1 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 14 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 4 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 13 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 3 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 16 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 6 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 15 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 5 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 18 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 8 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 17 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 7 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 20 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 10 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 19 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 9 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 21 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 26 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 22 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 27 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 23 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - 5, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 28 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - 5, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 24 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - 7, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 29 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - 10, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - 10, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 30 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - 15, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 31 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - 10, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 32 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - 15, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 33 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter - 15, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter - 20, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.rightTorso >= 35 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter - 10, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 36 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter - 15, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter - 15, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.rightTorso >= 38 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter - 20, armorBoxTop + rtTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	}


	// Left Torso - XX Max - targeting 42!




	var ltTop = 210;
	distanceFromCenter = 117;

	if( mechData.armorAllocation.leftTorso >= 39) {
		armorBubbleRadius = 8;

		rowMultiplier = 0;
		if( mechData.armorAllocation.leftTorso >= 1 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 2 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 3 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 4 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 5 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 6 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 7 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 8 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 9 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 10 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 11 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 12 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 13 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 14 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 15 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 16 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 17 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 18 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 19 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 20 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 21 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 22 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 23 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 24 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 26 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 27 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 28 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 29 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 30 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 5 - distanceFromCenter, armorBoxTop + ltTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 31 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter  + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 32 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter  + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 33 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 36 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 39 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 6 + 4, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 38 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius  * 6 + 4, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 41 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 6 + 8, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 40 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 6 + 6, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 43 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 6 + 8, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 42 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 6 + 8, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 47 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 46 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 45 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 44 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 51 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 50 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 49 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 48 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );



	} else {
		armorBubbleRadius = 10;
		rowMultiplier = 0;
		if( mechData.armorAllocation.leftTorso >= 1 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 11 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 2 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 12 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 3 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 13 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 4 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 14 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 5 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 15 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 6 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 16 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 7 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 17 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 8 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 18 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 9 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 19 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 10 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 20 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 26 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 21 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 27 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 22 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 28 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + 5 + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 23 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + 5 + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 29 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + 10 + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 24 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + 7 + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 30 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + 15 + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 25 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + 10 + armorBubbleRadius * 5, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 34 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + 20, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 33 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + 15, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 32 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter + 15, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 31 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter + 10, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

		rowMultiplier += 2.5;
		if( mechData.armorAllocation.leftTorso >= 38 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter + 20, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 37 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter + 15, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 36 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter + 15, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
		if( mechData.armorAllocation.leftTorso >= 35 )
			svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter + 10, armorBoxTop + ltTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	}

	armorBubbleRadius = 10;

	// Right Torso Rear Armor - 19 MAX
	var rtrTop = 995;
	distanceFromCenter = 107;

	rowMultiplier = 0;
	if( mechData.armorAllocation.rightTorsoRear >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightTorsoRear >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightTorsoRear >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 13 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightTorsoRear >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 + distanceFromCenter, armorBoxTop + rtrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightTorsoRear >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + 10, armorBoxTop + rtrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + 10, armorBoxTop + rtrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightTorsoRear >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + 10, armorBoxTop + rtrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Left Torso Rear Armor
	var ltrTop = 995;
	distanceFromCenter = 107;

	rowMultiplier = 0;
	if( mechData.armorAllocation.leftTorsoRear >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftTorsoRear >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftTorsoRear >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 13 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftTorsoRear >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, armorBoxTop + ltrTop + armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftTorsoRear >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - 10, armorBoxTop + ltrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - 10, armorBoxTop + ltrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftTorsoRear >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - 10, armorBoxTop + ltrTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



	// Right Arm Armor 39MAX
	var raTop = 170;
	distanceFromCenter = 225;

	//~ mechData.armorAllocation.rightArm = 98;


	armorBubbleRadius = 10;

	//~ armorBubbleRadius = 8;
	// 9 Block
	rowMultiplier = 0;
	if( mechData.armorAllocation.rightArm >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 1
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 38 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 28 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 39 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 20 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 21 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 13 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 22 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 23 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 2
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 34 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 29 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 35 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 24 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 25 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 26 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 27 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 1.7, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



		// Spacer Block 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 36 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 30 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 37 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	// Last Block of 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightArm >= 32 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2.5, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 31 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 2.5, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightArm >= 33 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2.5, armorBoxTop + raTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );





	// Left Arm Armor 39MAX
	var laTop = 170;
	distanceFromCenter = 225;

	//~ mechData.armorAllocation.leftArm = 98;


	armorBubbleRadius = 10;

	//~ armorBubbleRadius = 8;
	// 9 Block
	rowMultiplier = 0;
	if( mechData.armorAllocation.leftArm >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 1
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 39 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 28 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 38 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 21 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 20 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 23 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 23 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 22 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 2
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 35 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 29 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 34 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 25 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 24 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 27 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 26 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 1.7, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



		// Spacer Block 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 37 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 30 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 36 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	// Last Block of 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftArm >= 33 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2.5, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 31 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 2.5, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftArm >= 32 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2.5, armorBoxTop + laTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );





	// Right Leg Armor 51MAX
	var rlTop = 520;
	distanceFromCenter = 100;



	armorBubbleRadius = 10;

	//~ armorBubbleRadius = 8;
	// 9 Block
	rowMultiplier = 0;
	if( mechData.armorAllocation.rightLeg >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 27 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 38 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 39 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 28 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 1
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 46 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 37 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 47 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 29 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 40 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 41 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 30 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 2, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 2
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 48 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 36 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 49 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 13 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 31 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 42 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 43 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 32 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 3.5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



		// Spacer Block 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 50 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 35 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 51 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 5, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	// Block 9
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 33 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 44 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 45 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 34 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 20 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


		// Spacer Block 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 25 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 24 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 26 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	// Last Block of 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.rightLeg >= 22 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 21 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.rightLeg >= 23 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 + distanceFromCenter + armorBubbleRadius * 8, armorBoxTop + rlTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Left Leg Armor 51MAX
	var llTop = 520;
	distanceFromCenter = 100;



	armorBubbleRadius = 10;

	// 9 Block
	rowMultiplier = 0;
	if( mechData.armorAllocation.leftLeg >= 6 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 27 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 5 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 39 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 1 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 38 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 8 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 28 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 7 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 1
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 47 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 37 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 46 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 10 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 29 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 9 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 41 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 2 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 40 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 12 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 30 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 11 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 2, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// Spacer Block 2
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 49 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 36 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 48 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	// 9 Block
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 14 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 31 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 13 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 43 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 3 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 42 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 16 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 32 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 15 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 3.5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );



		// Spacer Block 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 51 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 35 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 50 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 5, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	// Block 9
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 18 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 33 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 17 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 45 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 4 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 44 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 20 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 34 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 19 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


		// Spacer Block 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 26 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 24 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 25 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );

	// Last Block of 3
	rowMultiplier += 2.5;
	if( mechData.armorAllocation.leftLeg >= 23 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 + armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 21 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );
	if( mechData.armorAllocation.leftLeg >= 22 )
		svgCode += damageCircle( armorBoxLeft + armorBoxWidth / 2 - armorBubbleRadius * 2.5 - distanceFromCenter - armorBubbleRadius * 8, armorBoxTop + llTop +  armorBubbleRadius * rowMultiplier, armorBubbleRadius );


	/*
	 * Criticals
	 */
	// Critical Hit Box....
	critBoxTop = 1250;
	critBoxLeft = 10;
	critBoxWidth = 1200;
	damageTransferWidth = 250;
	svgCode += createRSGroupBox( "Critical Hit Table", critBoxLeft, critBoxTop, 1210, critBoxWidth);



	col1Start = 125;
	col2Start = 513;
	col3Start = 925;

	var transRollAgain = mechData.getTranslation("GENERAL_ROLL_AGAIN");

	// Left Arm
	svgCode += "<text x=\"" + ( critBoxLeft + col1Start ) + "\" y=\"" + (critBoxTop + 100) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">LEFT ARM</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.leftArm, critBoxLeft + col1Start, critBoxTop + 140, transRollAgain);

	// Head
	svgCode += "<text x=\"" + ( critBoxLeft + col2Start ) + "\" y=\"" + (critBoxTop + 100) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">HEAD</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.head, critBoxLeft + col2Start, critBoxTop + 140, transRollAgain);

	// Right Arm
	svgCode += "<text x=\"" + ( critBoxLeft + col3Start ) + "\" y=\"" + (critBoxTop + 100) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">RIGHT ARM</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.rightArm, critBoxLeft + col3Start, critBoxTop + 140, transRollAgain);

	// Left Torso
	svgCode += "<text x=\"" + ( critBoxLeft + col1Start ) + "\" y=\"" + (critBoxTop + 550) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">LEFT TORSO</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.leftTorso, critBoxLeft + col1Start, critBoxTop + 575, transRollAgain);

	// Center Torso
	svgCode += "<text x=\"" + ( critBoxLeft + col2Start ) + "\" y=\"" + (critBoxTop + 350) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">CENTER TORSO</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.centerTorso, critBoxLeft + col2Start, critBoxTop + 375, transRollAgain);

	// Right Torso
	svgCode += "<text x=\"" + ( critBoxLeft + col3Start ) + "\" y=\"" + (critBoxTop + 550) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">RIGHT TORSO</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.rightTorso, critBoxLeft + col3Start, critBoxTop + 575, transRollAgain);


	// Left Leg
	svgCode += "<text x=\"" + ( critBoxLeft + col1Start ) + "\" y=\"" + (critBoxTop + 1010) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">LEFT LEG</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.leftLeg, critBoxLeft + col1Start, critBoxTop + 1050, transRollAgain);

	// Damage Transfer Diagram
	svgCode += rsDamageTransferSVG( false, colorBlack, colorBlack, critBoxLeft + critBoxWidth / 2 - damageTransferWidth / 2, critBoxTop + 820, damageTransferWidth);
	svgCode += "<text x=\"" + ( critBoxLeft + critBoxWidth / 2 ) + "\" y=\"" + (critBoxTop + 1200) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">DAMAGE TRANSFER</text>\n";
	svgCode += "<text x=\"" + ( critBoxLeft + critBoxWidth / 2 ) + "\" y=\"" + (critBoxTop + 1220) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">DIAGRAM</text>\n";

	// Right Leg
	svgCode += "<text x=\"" + ( critBoxLeft + col3Start ) + "\" y=\"" + (critBoxTop + 1010) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"30\">RIGHT LEG</text>\n";
	svgCode += createCritAllocationTable( mechData.criticals.rightLeg, critBoxLeft + col3Start, critBoxTop + 1050, transRollAgain);


	/*
	 * Structure
	 */
	// Internal Structure....
	isBoxTop = 1250;
	isBoxLeft = 1240;
	isBoxWidth = 655;
	svgCode += createRSGroupBox( "Internal Structure", isBoxLeft,  isBoxTop, 600, isBoxWidth);
	svgCode += rsStructureSVG( false, colorBlack, colorBlack, isBoxLeft + 100, isBoxTop + 17, 425 );

	// Main Structure Labels
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 ) + "\" y=\"" + (isBoxTop + 55) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">HEAD [" + mechData.internalStructure.head + "]</text>\n";

	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 - 65) + "\" y=\"" + (isBoxTop + 85) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">LEFT TORSO</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 - 65 ) + "\" y=\"" + (isBoxTop + 105) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">[" + mechData.internalStructure.leftTorso + "]</text>\n";

	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 + 65 ) + "\" y=\"" + (isBoxTop + 85) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">RIGHT TORSO</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 + 65 ) + "\" y=\"" + (isBoxTop + 105) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">[" + mechData.internalStructure.rightTorso + "]</text>\n";


	svgCode += "<text x=\"" + ( isBoxLeft +  isBoxWidth / 2 - 200 ) + "\" y=\"" + (isBoxTop + 310) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">LEFT</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft +  isBoxWidth / 2 - 200) + "\" y=\"" + (isBoxTop + 330) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">ARM [" + mechData.internalStructure.leftArm + "]</text>\n";

	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 + 200) + "\" y=\"" + (isBoxTop + 310) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">RIGHT</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 + 200) + "\" y=\"" + (isBoxTop + 330) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">ARM [" + mechData.internalStructure.rightArm + "]</text>\n";

	svgCode += "<text x=\"" + ( isBoxLeft +  isBoxWidth / 2 - 150 ) + "\" y=\"" + (isBoxTop + 570) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">LEFT</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft +  isBoxWidth / 2 - 150 ) + "\" y=\"" + (isBoxTop + 590) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">LEG [" + mechData.internalStructure.leftLeg + "]</text>\n";

	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 + 150) + "\" y=\"" + (isBoxTop + 570) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">RIGHT</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2 + 150 ) + "\" y=\"" + (isBoxTop + 590) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">LEG [" + mechData.internalStructure.rightLeg + "]</text>\n";

	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2  ) + "\" y=\"" + (isBoxTop + 400) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">CENTER</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2  ) + "\" y=\"" + (isBoxTop + 420) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">TORSO</text>\n";
	svgCode += "<text x=\"" + ( isBoxLeft + isBoxWidth / 2  ) + "\" y=\"" + (isBoxTop + 440) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"15\">[" + mechData.internalStructure.centerTorso + ")</text>\n";

	// Internal Structure Bubbles....
	var isBubbleRadius = 8;
	var isCenterAdjust = 3;

	// Head - max 6
	var hdISTop = 110;

	rowMultiplier = 0;
	if( mechData.internalStructure.head >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2 , isBoxTop + hdISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.head >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + hdISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.head >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2, isBoxTop + hdISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.head >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2 , isBoxTop + hdISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.head >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + hdISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.head >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2, isBoxTop + hdISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	// Center Torso - max 36
	var ctISTop = 165;
	rowMultiplier = 0;


	rowMultiplier = 0;
	if( mechData.internalStructure.centerTorso >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 21 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 22 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 23 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 24 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 25 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 26 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 28 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 29 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 30 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 32 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 31 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 33 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	if( mechData.internalStructure.centerTorso >= 35 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 34 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.centerTorso >= 36 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ctISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );



	// Right Torso - Max 23
	var rtISTop = 145;
	rowMultiplier = 0;
	var distanceFromCenter = 73;

	rowMultiplier = 0;
	if( mechData.internalStructure.rightTorso >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.rightTorso >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.rightTorso >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	rowMultiplier++;
	if( mechData.internalStructure.rightTorso >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	distanceFromCenter -= 20;
	if( mechData.internalStructure.rightTorso >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	distanceFromCenter -= 0;
	if( mechData.internalStructure.rightTorso >= 23 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	distanceFromCenter -= 0;
	if( mechData.internalStructure.rightTorso >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	distanceFromCenter -= 3;
	if( mechData.internalStructure.rightTorso >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	distanceFromCenter -= 0;
	if( mechData.internalStructure.rightTorso >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	distanceFromCenter += 10;
	isBoxTop += 4;
	if( mechData.internalStructure.rightTorso >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2 , isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	rowMultiplier++;
	if( mechData.internalStructure.rightTorso >= 22 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2 , isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 21 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightTorso >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2, isBoxTop + rtISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );



	// Left Torso - Max 23
	var ltISTop = 145;
	rowMultiplier = 0;
	var distanceFromCenter = 73;


	rowMultiplier = 0;
	if( mechData.internalStructure.leftTorso >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.leftTorso >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	if( mechData.internalStructure.leftTorso >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	rowMultiplier++;
	if( mechData.internalStructure.leftTorso >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2.5 , isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2.5, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	distanceFromCenter -= 20;
	if( mechData.internalStructure.leftTorso >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	distanceFromCenter -= 0;
	if( mechData.internalStructure.leftTorso >= 23 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	distanceFromCenter -= 0;
	if( mechData.internalStructure.leftTorso >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	distanceFromCenter -= 3;
	if( mechData.internalStructure.leftTorso >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	rowMultiplier++;
	distanceFromCenter -= 0;
	if( mechData.internalStructure.leftTorso >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	rowMultiplier++;
	distanceFromCenter += 11;
	isBoxTop += 4;
	if( mechData.internalStructure.leftTorso >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2 , isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	rowMultiplier++;
	if( mechData.internalStructure.leftTorso >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 2 , isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 21 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftTorso >= 22 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 2, isBoxTop + ltISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );



	// Right Arm - Max 20
	var raISTop = 145;
	rowMultiplier = 0;
	var distanceFromCenter = 145;

	//~ mechData.internalStructure.rightArm = 21;

	rowMultiplier = 0;
	if( mechData.internalStructure.rightArm >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 0;
	rowMultiplier++;
	if( mechData.internalStructure.rightArm >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 3;
	rowMultiplier++;
	if( mechData.internalStructure.rightArm >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightArm >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightArm >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightArm >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	//~ if( mechData.internalStructure.rightArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightArm >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + raISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );



	// Left Arm - Max 20
	var laISTop = 145;
	rowMultiplier = 0;
	var distanceFromCenter = 145;

	//~ mechData.internalStructure.leftArm = 21;

	rowMultiplier = 0;
	if( mechData.internalStructure.leftArm >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftArm >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 0;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftArm >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 3;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftArm >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftArm >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftArm >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 2 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftArm >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 8 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 9 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 10 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 20 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 16 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftArm >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	//~ if( mechData.internalStructure.leftArm >= 17 )
		//~ svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + laISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );





	// Right Leg - Max 28
	var rlISTop = 330;
	rowMultiplier = 0;
	var distanceFromCenter = 65;

	//~ mechData.internalStructure.rightLeg = 30;

	rowMultiplier = 0;
	if( mechData.internalStructure.rightLeg >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 0;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 3;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 25 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 27 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 3;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 26 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 28 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 21 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 22 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.rightLeg >= 23 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.rightLeg >= 24 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust + distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + rlISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	// Left Leg - Max 28
	var llISTop = 330;
	rowMultiplier = 0;
	var distanceFromCenter = 65;

	//~ mechData.internalStructure.leftLeg = 30;

	rowMultiplier = 0;
	if( mechData.internalStructure.leftLeg >= 1 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 11 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 0;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 2 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 12 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 3;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 3 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 13 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 4 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 14 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 5 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 15 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 27 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 25 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 3;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 6 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 16 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 7 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 17 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 8 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 18 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 9 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 19 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );

	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 10 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 20 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 28 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 26 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 22 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 21 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	distanceFromCenter += 2;
	rowMultiplier++;
	if( mechData.internalStructure.leftLeg >= 24 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 + isBubbleRadius * 1.25 , isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );
	if( mechData.internalStructure.leftLeg >= 23 )
		svgCode += damageCircle( isBoxLeft + isCenterAdjust - distanceFromCenter + isBoxWidth / 2 - isBubbleRadius * 1.25, isBoxTop + llISTop +  isBubbleRadius * rowMultiplier * 2, isBubbleRadius );


	/*
	 * Heat
	 */
	// Heat Scale Track....
	svgCode += "<text x=\"" + ( docWidth - 50 ) + "\" y=\"" + 1260 + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">HEAT</text>\n";
	svgCode += "<text x=\"" + ( docWidth - 50 ) + "\" y=\"" + 1290 + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"25\">SCALE</text>\n";

	boxHeight = 37;
	boxWidth = 60;
	normalBG = colorWhite;
	effectBG = colorVeryLightGray;
	for( var hCounter = 0; hCounter < 31; hCounter++ ) {


		svgCode += "<rect x=\"" + (  docWidth - boxWidth - 25 ) + "\" y=\"" + (docHeight - 155 - boxHeight * hCounter) + "\" width=\"" + (boxWidth) + "\" height=\"" + (boxHeight) + "\" fill=\"" + colorBlack + "\" />\n";
		if(
			hCounter == 5
				||
			hCounter == 8
				||
			hCounter == 10
				||
			hCounter == 13
				||
			hCounter == 14
				||
			hCounter == 15
				||
			hCounter == 17
				||
			hCounter == 18
				||
			hCounter == 19
				||
			hCounter == 20
				||
			hCounter == 22
				||
			hCounter == 23
				||
			hCounter == 24
				||
			hCounter == 25
				||
			hCounter == 26
				||
			hCounter == 28
				||
			hCounter == 30

		)
		{
			boxBX = effectBG;
		} else {
			boxBX = normalBG;
		}

		svgCode += "<rect x=\"" + (  docWidth - boxWidth - 25 + 2 ) + "\" y=\"" + (docHeight - 155 + 2  - boxHeight * hCounter) + "\" width=\"" + (boxWidth - 4) + "\" height=\"" + (boxHeight - 4) + "\" fill=\"" + boxBX + "\" />\n";
		svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 - 11) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 10) + "\">" + hCounter + "</text>\n";

		if( hCounter == 5 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 8 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 10 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 13 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 14 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 15 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 17 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 18 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 19 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 20 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 22 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 23 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 24 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 25 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 26 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 28 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
		if( hCounter == 30 ) {
			svgCode += "<text x=\"" + (  docWidth - boxWidth / 2 ) + "\" y=\"" + (docHeight - 125 - boxHeight * hCounter - 10) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 100;\" font-size=\"" + ( boxHeight - 15) + "\">*</text>\n";
		}
	}

	// Heat Sinks.... MAX is 50. This should be plenty.
	boxY = 1885;
	boxX = 1690;
	hsBoxWidth = 205
	svgCode += createRSGroupBox( "Sinks", boxX, boxY, 575, hsBoxWidth);
	lineHeight = 27;
	hCounter = 0;
	svgCode += "<text x=\"" + (  boxX + 205 / 2 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + ( lineHeight - 6) + "\">HEAT SINKS</text>\n";
	hCounter++;
	hCounter++;
	svgCode += "<text x=\"" + (  boxX + 205 / 2 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + ( lineHeight * 2) + "\">" + mechData.getHeatSinks() + "</text>\n";

	hCounter++;
	if( mechData.heat_sink_type == "single" ) {
		svgCode += "<text x=\"" + (  boxX + 205 / 2 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 6) + "\">Single</text>\n";
	} else if( mechData.heat_sink_type == "double" ){
		svgCode += "<text x=\"" + (  boxX + 205 / 2 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 6) + "\">Double</text>\n";

	} else {
		svgCode += "<text x=\"" + (  boxX + 205 / 2 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 6) + "\">" +  mechData.heat_sink_type + "</text>\n";

	}
	armorBubbleRadius = 15;
	hsTop = 185;
	hsLeft = 100;

	numHeatSinks = mechData.getHeatSinks();

	var hsCounter = 0;
	var lCounter = 0;

	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );

	hsCounter++;
	lCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 0 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 10 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 1 + hsCounter + 30 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );



	lCounter++;
	lCounter++;
	if( numHeatSinks >= 41 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 42 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 43 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 44 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );

	lCounter++;
	if( numHeatSinks >= 45 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 46 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 - armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 47 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 1.25 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );
	if( numHeatSinks >= 48 )
		svgCode += damageCircle( hsLeft + boxX + hsBoxWidth / 2 + armorBubbleRadius * 4 - distanceFromCenter, boxY + hsTop + armorBubbleRadius * lCounter * 2, armorBubbleRadius );


	// Heat Effects....
	boxY = 1885;
	boxX = 1240;
	svgCode += createRSGroupBox( "Heat Effects", boxX, boxY, 575, 435);
	col1Loc = 70;
	col2Loc = 90;

	hCounter = 0;
	lineHeight = 27;

	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + ( lineHeight - 6) + "\">HEAT</text>\n";
	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + ( lineHeight - 6) + "\">LEVEL</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 700;\" font-size=\"" + ( lineHeight - 6) + "\">EFFECTS</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">30</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Shutdown</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">28</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Ammo Exp. Avoid on 8+</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">26</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Shutdown Avoid on 10+</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">25</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">-5 Movement Points</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">24</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">+4 Modifier to Fire</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">23</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Ammo Exp. Avoid on 6+</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">22</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Shutdown Avoid on 8+</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">20</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">-4 Movement Points</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">19</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Ammo Exp. Avoid on 4+</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">18</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Shutdown Avoid on 6+</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">17</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">+3 Modifier to Fire</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">15</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">-3 Movement Points</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">14</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">Shutdown Avoid on 4+</text>\n";


	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">13</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">+2 Modifier to Fire</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">10</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">-2 Movement Points</text>\n";


	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">8</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">+1 Modifier to Fire</text>\n";

	hCounter++;
	svgCode += "<text x=\"" + (  boxX + col1Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"end\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">5</text>\n";
	svgCode += "<text x=\"" + (  boxX + col2Loc + 20 ) + "\" y=\"" + (boxY + 75 + lineHeight * hCounter) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorBlack + "\" style=\"font-weight: 500;\" font-size=\"" + ( lineHeight - 3) + "\">-1 Movement Points</text>\n";


	// Classic Battletech Logo on bottom.
	svgCode += "<rect x=\"0\" y=\"" + (docHeight - 100) + "\" width=\"2000\" height=\"100\" fill=\"" + colorBlack + "\" />\n";
	svgCode += battleTechLogoSVG( false, colorTan, colorGold, 1500, docHeight - 85, 500  );
	svgCode += "<text x=\"20\" y=\"" + (docHeight - 25) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorTan + "\" style=\"font-weight: 700;\" font-size=\"60\">CLASSIC BATTLETECH</text>\n";
	svgCode += "<text x=\"20\" y=\"" + (docHeight - 25) + "\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorTan + "\" style=\"font-weight: 700;\" font-size=\"60\">CLASSIC BATTLETECH</text>\n";

	svgCode += "</g>\n";

	svgCode += "</svg>\n";


	while( svgCode.indexOf( "class=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "class=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "onclick=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "onclick=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "  " ) > 0 ) {

		svgCode = svgCode.replace( "  ", " " );
	}

	return svgCode;
}

function createRSGroupBox( txtLabel, xPos, yPos, height, width, borderColor, fillColor, labelColor ) {
	var svgCode = "";
	var borderWidth = 2;
	var textSize = 35;
	var labelLeft = 35;
	if( typeof(borderColor) == "undefined" || !borderColor)
		borderColor = colorDarkGray;
	if( typeof(fillColor) == "undefined" || !fillColor)
		fillColor = colorWhite;
	if( typeof(labelColor) == "undefined" || !labelColor)
		labelColor = colorWhite;

	var svgCode = "";

	svgCode += "<rect rx=\"15\" ry=\"15\" x=\"" + xPos + "\" y=\"" + ( yPos + ( textSize + 5 ) / 2 ) + "\" width=\"" + width  + "\" height=\"" + height  + "\" fill=\"" + borderColor + "\" />\n";
	svgCode += "<rect rx=\"15\" ry=\"15\" x=\"" + (xPos + borderWidth) + "\" y=\"" + (yPos + ( textSize + 5 ) / 2 + borderWidth) + "\" width=\"" + (width - borderWidth * 2 )+ "\" height=\"" + (height - borderWidth * 2) + "\" fill=\"" + fillColor + "\" />\n";

	if( txtLabel ) {
		svgCode += "<rect rx=\"15\" ry=\"15\" x=\"" + ( labelLeft + xPos ) + "\" y=\"" + yPos + "\" width=\"" + ( width - labelLeft * 2 )   + "\" height=\"" + ( textSize + 5 )  + "\" fill=\"" + borderColor + "\" />\n";
		svgCode += "<text rx=\"15\" ry=\"15\" x=\""+ ( xPos +  width / 2 ) + "\" y=\"" + (yPos + textSize - 3 ) + "\" font-family=\"sans-serif\" fill=\"" + labelColor + "\" text-anchor=\"middle\" font-size=\"" + textSize + "\">" + txtLabel.toUpperCase() + "</text>\n";
	}

	return svgCode;
}

function createSVGAlphaStrike( asData, inPlay, itemIDField ) {

	groupIndex = -1;
	mechIndex = -1;

	if( typeof( inPlay ) == "undefined" ) {
		inPlay = false;
	} else {
		if( inPlay )
			inPlay = true;
		else
			inPlay = false;
	}

	if( typeof( itemIDField ) == "undefined" ) {
		itemIDField = "";
	} else {
		if( !itemIDField )
			itemIDField = "";
	}

	if( itemIDField ) {
		// this is a workaround for a bug. When I previously had parameters, the $index and $parent.$index
		// paramters were undefined when passed directly, but are passed correctly when in the string of the id field
		itemItems = itemIDField.split("-");
		groupIndex = itemItems[2] / 1;
		mechIndex = itemItems[3] / 1;
	}

	var leftBoxWidth = 550;



	svgCode = "<!DOCTYPE HTML><svg version=\"1.1\" x=\"0px\" y=\"0px\" xml:space=\"preserve\" viewBox=\"0 0 1000 640\" xmlns=\"http://www.w3.org/2000/svg\">\n";

	svgCode += "<g transform=\"translate(0, 0)\">\n";

	// Base Border and Interior White....
	svgCode += "<rect x=\"0\" y=\"0\" width=\"1000\" height=\"640px\" fill=\"" + colorBlack + "\" />\n";

	if( !asData.active && inPlay )
		svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"" + colorRed + "\" />\n";
	else
		svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"" + colorWhite + "\" />\n";

	// Attempt to put unit's image in background...
	if( asData.imageURL ) {
		svgCode += "    <image x=\"440\" y=\"10\" xlink:href=\"" + asData.imageURL + "\" x=\"0\" y=\"0\" width=\"" + leftBoxWidth + "\" height=\"500\" />\n";
	}


	// Mech Name and Custom Name
	if( asData.customName ) {
		svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"40\">" + asData.customName  + "</text>\n";
		if( asData.name.toUpperCase().length > 45 ) {
			svgCode += "<text x=\"20\" y=\"75\" font-family=\"sans-serif\" font-size=\"13\">" + asData.name.toUpperCase()  + "</text>\n";
		} else {
			svgCode += "<text x=\"20\" y=\"75\" font-family=\"sans-serif\" font-size=\"20\">" + asData.name.toUpperCase()  + "</text>\n";
		}
	} else {
		if( asData.name.toUpperCase().length > 45 ) {
			words = asData.name.split( " " );
			halfWords = Math.floor( words.length / 2) + 1;
			firstLine = "";
			secondLine = "";

			for( var lCount = 0; lCount <= halfWords; lCount++ )
				firstLine += words[ lCount ] + " ";

			for( var lCount = halfWords + 1; lCount < words.length ; lCount++ )
				secondLine += words[ lCount ] + " ";

			svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"40\">" + firstLine.toUpperCase()  + "</text>\n";
			svgCode += "<text x=\"20\" y=\"80\" font-family=\"sans-serif\" font-size=\"40\">" + secondLine.toUpperCase()  + "</text>\n";
		} else {
			svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"40\">" + asData.name.toUpperCase()  + "</text>\n";
		}
	}

	//svgCode += "<text x=\"800\" y=\"50\" font-family=\"sans-serif\" font-size=\"11\">" + groupIndex + ", " + mechIndex + ", " + itemIDField + "</text>\n";
	// Point Value
	svgCode += "<rect x=\"850\" y=\"9\" width=\"150\" height=\"35\" fill=\"" + colorBlack + "\" />\n";
	//svgCode += "<rect x=\"780\" y=\"9\" width=\"70\" height=\"35\" fill=\"" + colorBlack + "\" transform=\"rotate( 45, 850, 44)\" />\n";
	svgCode += "<text x=\"990\" y=\"35\" text-anchor=\"end\" fill=\"" + colorWhite + "\" stroke=\"" + colorWhite + "\" font-family=\"sans-serif\" font-size=\"33\">PV: " + asData.currentPoints  + "</text>\n";

	/*
	 *  Movement, Type, Role, Skill, etc
	*/
	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"100\" width=\"" + leftBoxWidth + "\" height=\"105\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"105\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"95\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";

	//Type
	svgCode += "<text x=\"30\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">TP: " + asData.type.toUpperCase()  + "</text>\n";

	//Size
	svgCode += "<text x=\"150\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">SZ: " + asData.size.toString().toUpperCase()  + "</text>\n";

	//TMM
	if( asData.isAerospace == false )
		svgCode += "<text x=\"235\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">TMM: " + asData.currentTMM.toUpperCase()  + "</text>\n";

	//Move
	svgCode += "<text x=\"" + (leftBoxWidth - 10) + "\" y=\"140\" font-family=\"sans-serif\" text-anchor=\"end\" font-size=\"25\">MV: " + asData.currentMove.toUpperCase()  + "</text>\n";

	//Role
	svgCode += "<text x=\"30\" y=\"180\" font-family=\"sans-serif\" font-size=\"25\">ROLE: " + asData.role.toUpperCase()  + "</text>\n";


	//Skill
	svgCode += "<text x=\"" + (leftBoxWidth - 10) + "\" y=\"180\" font-family=\"sans-serif\" text-anchor=\"end\" font-size=\"25\">SKILL: " + asData.currentSkill.toString().toUpperCase()  + "</text>\n";

	/*
	 *  Damage Section
	*/

	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"210\" width=\"" + leftBoxWidth + "\" height=\"85\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"215\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"75\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";



	// Damage Label
	svgCode += "<text x=\"55\" y=\"250\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\" transform=\"rotate(270, 58, 250)\">DAMAGE</text>\n";

	var firstDamageLineY = 245;
	var secondDamageLineY = 280;
	if( asData.damage.extreme > 0 ) {
		shortX = 120;
		mediumX = 240;
		longX = 350;
		extremeX = 460;

		// Short
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">S (+0 | " + asData.currentToHitShort + "+)</text>\n";
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.short  + "</text>\n";


		// Medium
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">M (+2 | " + asData.currentToHitMedium + "+)</text>\n";
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.medium  + "</text>\n";

		// Long
		svgCode += "<text x=\"" + longX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">L (+4 | " + asData.currentToHitLong + "+)</text>\n";
		svgCode += "<text x=\"" + longX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.long  + "</text>\n";

		// Extreme
		svgCode += "<text x=\"" + extremeX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">E (+6 | " + asData.currentToHitExtreme + "+)</text>\n";
		svgCode += "<text x=\"" + extremeX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.extreme  + "</text>\n";

	} else {
		shortX = 140;
		mediumX = 290;
		longX = 440;
		extremeX = 0;

		// Short
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">S (+0 | " + asData.currentToHitShort + "+)</text>\n";
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + asData.currentDamage.short  + "</text>\n";


		// Medium
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">M (+2 | " + asData.currentToHitMedium + "+)</text>\n";
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + asData.currentDamage.medium  + "</text>\n";

		// Long
		svgCode += "<text x=\"" + longX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">L (+4 | " + asData.currentToHitLong + "+)</text>\n";
		svgCode += "<text x=\"" + longX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + asData.currentDamage.long  + "</text>\n";
	}


	/*
	 *  Overheat Section
	*/
	var armorBoxStart = 400;
	if( asData.type.toLowerCase() != 'pm' && !asData.isInfantry ) {
		svgCode += "<rect x=\"20\" y=\"310\" width=\"" + leftBoxWidth + "\" height=\"80\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"25\" y=\"315\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"70\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";

		svgCode += "<text x=\"40\" y=\"360\" font-family=\"sans-serif\" font-size=\"35\">OV: " + asData.overheat + "</text>\n";

		// heat container...
		svgCode += "<text x=\"240\" y=\"357\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"15\">HEAT SCALE</text>\n";
		svgCode += "<rect x=\"" + ( leftBoxWidth - 255 ) + "\" y=\"320\" width=\"265\" height=\"60\" fill=\"" + colorBlack + "\" rx=\"30\" ry=\"30\"  />\n";

		var inActiveColor = "rgb(102,102,102)";
		var onClickFunction = "";
		var mouseHandClass = "";


		// 0 Heat....
		if( asData.currentHeat < 1 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 225 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + colorGreen + "\" />\n";
			svgCode += "<circle cx=\"" + ( leftBoxWidth - 225 ) + "\" cy=\"350\" r=\"25\" fill=\"" + colorGreen + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 225 - 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">0</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 0, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 225 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<circle onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" cx=\"" + ( leftBoxWidth - 225 ) + "\" cy=\"350\" r=\"25\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 225 - 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">0</text>\n";
		}

		// 1 Heat....
		//~ svgCode += "<rect x=\"280\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat == 1 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 195 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + colorYellow + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 195 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">1</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 1, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 195 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 195 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">1</text>\n";

		}

		// 2 Heat....
		//~ svgCode += "<rect x=\"340\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat == 2 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 145 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + colorRed + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 145 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">2</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 2, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 145 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 145 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">2</text>\n";

		}
		// 3 Heat....
		//~ svgCode += "<rect x=\"400\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat == 3 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 95 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + colorOrange + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 95 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">3</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 3, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 95 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 95 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">3</text>\n";

		}
		// s Heat....
		//~ svgCode += "<rect x=\"400\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat > 3 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 45 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + colorDarkGray + "\" />\n";
			svgCode += "<circle cx=\"" + ( leftBoxWidth - 20 ) + "\" cy=\"350\" r=\"25\" fill=\"" + colorDarkGray + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 45 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">S</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 4, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 45 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<circle onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" cx=\"" + ( leftBoxWidth - 20 ) + "\" cy=\"350\" r=\"25\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 45 + 10) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">S</text>\n";
		}
	} else {
		armorBoxStart = 300;
	}


	/*
	 *  Armor and IS Section
	*/

	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"" + (armorBoxStart) + "\" width=\"" + leftBoxWidth + "\" height=\"105\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"" + (armorBoxStart + 5) + "\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"95\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";




	var armorTopBase = armorBoxStart + 15;
	var isTopBase = armorBoxStart + 60;
	var buttonRadius = 15;
	var leftBase = 90;

	if( asData.isAerospace ) {
		svgCode += "<text x=\"" + ( leftBoxWidth - 25) + "\" y=\"" + ( armorTopBase + 25) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"35\">TH</text>\n";
		svgCode += "<text x=\"" + ( leftBoxWidth - 25) + "\" y=\"" + ( armorTopBase + 65) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"35\">" + asData.threshold + "</text>\n";
	}

	var armorClass = "";
	var armorFunction = "";
	if( inPlay ) {
		svgCode += "<text x=\"80\" y=\"" + ( armorTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">A: </text>\n";
		svgCode += "<text x=\"80\" y=\"" + ( isTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">S: </text>\n";


		var onClick = "ASTakeDamage( " + groupIndex + ", "+ mechIndex + ", '" + itemIDField + "')";
		svgCode += "<rect class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"30\" y=\"" + (armorBoxStart + 10) + "\" width=\"" + ( 40 ) + "\" height=\"85\" fill=\"" + colorRed + "\" rx=\"15\" ry=\"15\" />\n";
		svgCode += "<text class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"60\" y=\"" + (armorBoxStart + 30) + "\" fill=\"" + colorWhite + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"13\" transform=\"rotate(270, 65, " + (armorBoxStart + 47) + ")\">TAKE</text>\n";
		svgCode += "<text class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"70\" y=\"" + (armorBoxStart + 30) + "\" fill=\"" + colorWhite + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"13\" transform=\"rotate(270, 75, " + (armorBoxStart + 45) + ")\">DAMAGE</text>\n";
		leftBase += 40;
	} else {
		svgCode += "<text x=\"40\" y=\"" + ( armorTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">A: </text>\n";
		svgCode += "<text x=\"40\" y=\"" + ( isTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">S: </text>\n";
	}

	for( var armorCount = 0; armorCount < asData.currentArmor.length; armorCount++ ) {
		if( inPlay ) {
			var armorClass = "mouse-hand";
			var armorFunction = "ASToggleArmorPip( " + armorCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
		}
		svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
	//	svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
		if( asData.currentArmor[ armorCount ] && inPlay ) {
			svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
		} else {
			svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
		}
	}

	var structClass = "";
	var structFunction = "";
	for( var structCount = 0; structCount < asData.currentStructure.length; structCount++ ) {
		if( inPlay ) {
			var structClass = "mouse-hand";
			var structFunction = "ASToggleStructPip( " + structCount + ", " + groupIndex + ", "+ mechIndex + ", '" + itemIDField + "')";
		}
		svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
	//	svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
		if( asData.currentStructure[ structCount ] && inPlay ) {
			svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
		} else {
			svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorLightGray + "\" />\n";
		}
	}


	/*
	 *  Special Section
	*/

	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"510\" width=\"960\" height=\"60\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"515\" width=\"950\" height=\"50\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";
	if( asData.abilities )
		svgCode += "<text x=\"30\" y=\"550\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">SPECIAL: " + asData.abilities + "</text>\n";
	else
		svgCode += "<text x=\"30\" y=\"550\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">SPECIAL: (none)</text>\n";


	/*
	 *  Critical Hits Section
	*/

	if( !asData.isInfantry ) {

		critLineHeight = 50;
		critLineStart = 325;

		// Gray, Rounded Box
		svgCode += "<rect x=\"" + (leftBoxWidth + 30) + "\" y=\"245\" width=\"" + (950 - leftBoxWidth ) + "\" height=\"260\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"" + (leftBoxWidth + 35) + "\" y=\"250\" width=\"" + (950 - 10 - leftBoxWidth ) + "\" height=\"250\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";

		//
		svgCode += "<text x=\"" + (leftBoxWidth + 35 + (950 - leftBoxWidth ) / 2) + "\" y=\"275\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"25\">CRITICAL HITS</text>\n";

		var leftmostCritButton = (leftBoxWidth + 35 + (950 - leftBoxWidth ) / 2) - 15;

		// Engine Hits
		if( asData.type.toLowerCase() != 'pm') {

			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">ENGINE</text>\n";
			for( var critCount = 0; critCount < asData.engineHits.length; critCount++ ) {
				if( inPlay ) {
					var critClass = "mouse-hand";
					var critFunction = "ASToggleEngineHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				}
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

				if( asData.engineHits[ critCount ] && inPlay ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}
			}
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">+1 Heat/Firing Weapons</text>\n";
			critLineStart += critLineHeight;
		}



		// Fire Control Hits
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">FIRE CONTROL</text>\n";
		for( var critCount = 0; critCount < asData.fireControlHits.length; critCount++ ) {
			if( inPlay ) {
				var critClass = "mouse-hand";
				var critFunction = "ASToggleFireControlHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
			}
			svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

			if( asData.fireControlHits[ critCount ] && inPlay ) {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
			} else {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
			}
		}
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">+2 To Hit Each</text>\n";
		critLineStart += critLineHeight;

		if( asData.type.toLowerCase() == 'bm' || asData.type.toLowerCase() == 'pm' ) {
			// MP Hits
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">MP</text>\n";
			for( var critCount = 0; critCount < asData.mpControlHits.length; critCount++ ) {
				if( inPlay ) {
					var critClass = "mouse-hand";
					var critFunction = "ASToggleMPlHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				}
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

				if( asData.mpControlHits[ critCount ] && inPlay ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}
			}
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">1/2 Move Each</text>\n";
			critLineStart += critLineHeight;
		}

		// Weapon Hits
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">WEAPONS</text>\n";
		for( var critCount = 0; critCount < asData.weaponHits.length; critCount++ ) {
			if( inPlay ) {
				var critClass = "mouse-hand";
				var critFunction = "ASToggleWeaponHits( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
			}
			svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

			if( asData.weaponHits[ critCount ] && inPlay ) {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
			} else {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
			}
		}
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">-1 Damage Each</text>\n";
		critLineStart += critLineHeight;


		if( asData.type.toLowerCase() == 'cv' || asData.type.toLowerCase() == 'sv' ) {
			// Vehicile Motive Hits
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">MOTIVE</text>\n";

			if( inPlay ) {


				var critClass = "mouse-hand";
				var critFunction = "ASToggleMPlHit( 0, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

				if( asData.mpControlHits[ 0 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 1, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 1 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 2, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 2 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 3, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 3 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 4, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 4 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4  +30)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}



			} else {
				critClass = "";
				critFunction = "";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


			}
			svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 - buttonRadius + 20 )  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">-2 MV</text>\n";
			svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 - buttonRadius +10)  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">&frac12; Move Each</text>\n";
			svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 - buttonRadius +30)  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">0 MV</text>\n";
			critLineStart += critLineHeight;
		}

	}

	if( !asData.active && inPlay) {
		svgCode += "<text x=\"50\" y=\"100\" font-family=\"sans-serif\" transform=\"rotate( 30, 50, 100)\" font-size=\"150\" stroke=\"" + colorWhite + "\" stroke-width=\"4\" fill=\"" + colorRed + "\">WRECKED</text>\n";
	}


	/*
	 * Battletech and Alpha Strike at bottom...
	 */
		svgCode += "<rect x=\"10\" y=\"610\" width=\"960\" height=\"35\" fill=\"" + colorBlack + "\" />\n";

		svgCode += "<text x=\"20\" y=\"625\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorTan + "\" style=\"font-weight: 700;\" font-size=\"30\">ALPHA STRIKE</text>\n";

		svgCode += battleTechLogoSVG ( false, colorTan, colorGold, 750, 600, 250 );

	svgCode += "</g>\n";

	svgCode += "</svg>\n";

	while( svgCode.indexOf( "class=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "class=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "onclick=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "onclick=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "  " ) > 0 ) {

		svgCode = svgCode.replace( "  ", " " );
	}

	return svgCode;
}





function getAppVersion() {
	return "2016030601";
}


function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function sortByLocationThenName( a, b ) {
	if( a.location > b.location )
		return 1;
	if( a.location < b.location )
		return -1;
	if( a.name > b.name )
		return 1;
	if( a.name < b.name )
		return -1;
	return 0;
}

function sortByCategoryThenName( a, b ) {
	if( a.local_category > b.local_category )
		return 1;
	if( a.local_category < b.local_category )
		return -1;
	if( a.local_name > b.local_name )
		return 1;
	if( a.local_name < b.local_name )
		return -1;
	return 0;
}

function sortByCategoryThenSortThenName( a, b ) {



	if( a.local_category > b.local_category )
		return 1;
	if( a.local_category < b.local_category )
		return -1;

	if( a.sort && b.sort ) {
		if( a.sort > b.sort )
			return 1;
		if( a.sort < b.sort )
			return -1;
	} else if( a.sort ) {
		if( a.sort > b.local_name )
			return 1;
		if( a.sort < b.local_name )
			return -1;
	} else if( b.sort ) {
		if( a.local_name > b.sort )
			return 1;
		if( a.local_name < b.sort )
			return -1;
	} else {
		if( a.local_name > b.local_name )
			return 1;
		if( a.local_name < b.local_name )
			return -1;
	}

	return 0;
}

function sortBySortThenName( a, b ) {


	if( a.sort && b.sort ) {
		if( a.sort > b.sort )
			return 1;
		if( a.sort < b.sort )
			return -1;
	} else if( a.sort ) {
		if( a.sort > b.local_name )
			return 1;
		if( a.sort < b.local_name )
			return -1;
	} else if( b.sort ) {
		if( a.local_name > b.sort )
			return 1;
		if( a.local_name < b.sort )
			return -1;
	} else {
		if( a.local_name > b.local_name )
			return 1;
		if( a.local_name < b.local_name )
			return -1;
	}

	return 0;
}

function sortByLocalName( a, b ) {
	if( a.local_name > b.local_name )
		return 1;
	if( a.local_name < b.local_name )
		return -1;
	return 0;
}

function ifIEOrEdge() {
	console.log( "ifIEorEdge", navigator.userAgent);
	if (/MSIE 10/i.test(navigator.userAgent)) {
	   // This is internet explorer 10
	   return true;
	}

	if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
	    // This is internet explorer 9 or 11
	    return true;
	}

	if (/Edge\/\d./i.test(navigator.userAgent)){
	   // This is Microsoft Edge
	   return true;
	}



	return false;
}


function isIOSStandAlone() {
	if( window.navigator.standalone == true ){
	   // Experimenting with iOS PDF fixes.
	   return true;
	}
	return false;
}

function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
//pads left
String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

//pads right
String.prototype.rpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

function getMovementModifier( moveScore ) {
	if( moveScore >= 25 ) {
		return 6;
	} else if ( moveScore >= 18 ) {
		return 5;
	} else if ( moveScore >= 10 ) {
		return 4;
	} else if ( moveScore >= 7 ) {
		return 3;
	} else if ( moveScore >= 5 ) {
		return 2;
	} else if ( moveScore >= 3 ) {
		return 1;
	}

	return 0;

}


/*
	item: Object must include following keys:
	{
		introduced int,
		extinct int (if == 0, item != extinct),
		reintroduced int (if == 0 item != reintroduced)
	}

	currentEra: Object must include following keys:
	{
		year_start int,
		year_end int
	}
*/
function getItemAvailability( item, currentEra )
{
	if
	(
		(
			item.reintroduced != 0
			&& item.reintroduced <= currentEra.year_end
		)
		||
		(
			item.introduced <= currentEra.year_end
			&&
			(
				item.extinct == 0
				||
				item.extinct >= currentEra.year_start
			)
		)
	) {
		return true;
	}
	else {
		return false;
	}
}



/*
 * The data here is copyright NOT included in the MIT license.
 * Based on BattleTech Master Unit List eras: http://masterunitlist.info/Era/Index
 */
var btEraOptions = Array(
	{
		id: 1,
		name: {
			'en-US': "Age of War (2005-2570)",
			'de-DE': "de - Age of War"
		},
		year_start: 2005,
		year_end: 2570,
	},
	{
		id: 2,
		name: {
			'en-US': "Star League (2571-2780)",
			'de-DE': "de - Star League"
		},
		year_start: 2571,
		year_end: 2780,
	},
	{
		id: 3,
		name: {
			'en-US': "Early Succcession War (2781-2900)",
			'de-DE': "de - Early Succession War"
		},
		year_start: 2781,
		year_end: 2900,
	},
	{
		id: 4,
		name: {
			'en-US': "Late Succcession War - LosTech (2901-3019)",
			'de-DE': "de - Late Succession War - LosTech"
		},
		year_start: 2901,
		year_end: 3019,
	},
	{
		id: 5,
		name: {
			'en-US': "Late Succcession War - Renaissance (3020-3049)",
			'de-DE': "de - Late Succession War - Renaissance"
		},
		year_start: 3020,
		year_end: 3049,
	},
	{
		id: 6,
		name: {
			'en-US': "Clan Invasion (3050-3061)",
			'de-DE': "de - Clan Invasion"
		},
		year_start: 3050,
		year_end: 3061,
	},
	{
		id: 7,
		name: {
			'en-US': "Civil War (3062-3067)",
			'de-DE': "de - Civil War"
		},
		year_start: 3062,
		year_end: 3067,
	},
	{
		id: 8,
		name: {
			'en-US': "Jihad (3068-3085)",
			'de-DE': "de - Jihad"
		},
		year_start: 3068,
		year_end: 3085,
	},
	{
		id: 8,
		name: {
			'en-US': "Early Republic (3086-3100)",
			'de-DE': "de - Early Republic"
		},
		year_start: 3086,
		year_end: 3100,
	},
	{
		id: 9,
		name: {
			'en-US': "Late Republic (3101-3130)",
			'de-DE': "de - Late Republic"
		},
		year_start: 3101,
		year_end: 3130,
	},
	{
		id: 10,
		name: {
			'en-US': "Dark Ages (3131-3999)",
			'de-DE': "de - Dark Ages"
		},
		year_start: 3131,
		year_end: 3999,
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
battlemechLocations = Array(
	{
		tag: "hd",
		rear: true,
		name: {
			"en-US": "Head",
			"de-DE": "de-Head",
		},
		abbr: {
			"en-US": "hd",
			"de-DE": "de-hd",
		}
	},
	{
		tag: "hdr",
		rear: true,
		name: {
			"en-US": "Head (Rear)",
			"de-DE": "de-Head (Rear)",
		},
		abbr: {
			"en-US": "hd(r)",
			"de-DE": "de-hd(r)",
		}
	},
	{
		tag: "rt",
		rear: false,
		name: {
			"en-US": "Right Torso",
			"de-DE": "de-Right Torso",
		},
		abbr: {
			"en-US": "rt",
			"de-DE": "de-rt",
		}
	},
	{
		tag: "ct",
		rear: false,
		name: {
			"en-US": "Center Torso",
			"de-DE": "de-Center Torso",
		},
		abbr: {
			"en-US": "ct",
			"de-DE": "de-ct",
		}
	},
	{
		tag: "lt",
		rear: false,
		name: {
			"en-US": "Left Torso",
			"de-DE": "de-Left Torso",
		},
		abbr: {
			"en-US": "lt",
			"de-DE": "de-lt",
		}
	},
	{
		tag: "rtr",
		rear: true,
		name: {
			"en-US": "Right Torso (Rear)",
			"de-DE": "de-Right Torso (Rear)",
		},
		abbr: {
			"en-US": "rt(r)",
			"de-DE": "de-rt(r)",
		}
	},
	{
		tag: "ctr",
		rear: true,
		name: {
			"en-US": "Center Torso (Rear)",
			"de-DE": "de-Center Torso (Rear)",
		},
		abbr: {
			"en-US": "ct(r)",
			"de-DE": "de-ct(r)",
		}
	},
	{
		tag: "ltr",
		rear: true,
		name: {
			"en-US": "Left Torso (Rear)",
			"de-DE": "de-Left Torso (Rear)",
		},
		abbr: {
			"en-US": "lt(r)",
			"de-DE": "de-lt(r)",
		}
	},
	{
		tag: "ra",
		rear: false,
		name: {
			"en-US": "Right Arm",
			"de-DE": "de-Right Arm",
		},
		abbr: {
			"en-US": "ra",
			"de-DE": "de-ra",
		}
	},
	{
		tag: "la",
		rear: false,
		name: {
			"en-US": "Left Arm",
			"de-DE": "de-Left Arm",
		},
		abbr: {
			"en-US": "la",
			"de-DE": "de-la",
		}
	},
	{
		tag: "rl",
		rear: false,
		name: {
			"en-US": "Right Leg",
			"de-DE": "de-Right Leg",
		},
		abbr: {
			"en-US": "rl",
			"de-DE": "de-rl",
		}
	},
	{
		tag: "ll",
		rear: false,
		name: {
			"en-US": "Left Leg",
			"de-DE": "de-Left Leg",
		},
		abbr: {
			"en-US": "ll",
			"de-DE": "de-ll",
		}
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechArmorTypes = Array(
	{
		name: {
			"en-US": "Standard"
		},
		tag: "standard",
		crits: {
			clan: 0,
			is: 0
		},
		armormultiplier: {
			clan: 16,
			is: 16
		},

		costmultiplier: 10000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Ferro Fibrous"
		},
		tag: "ferro-fibrous",
		armormultiplier: {
			clan: 16 * 1.2,
			is: 16 * 1.12
		},
		crits: {
			clan: 7,
			is: 14
		},
		costmultiplier: 20000,
		introduced: 2571,
		extinct: 2810,
		reintroduced: 3040
	},

	{
		name: {
			"en-US": "Light Ferro Fibrous"
		},
		tag: "light-ferro-fibrous",
		armormultiplier: {
			clan: 0,
			is: 7
		},
		crits: {
			clan: 0,
			is: 16 * 1.06
		},
		costmultiplier: 15000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0
	},

	{
		name: {
			"en-US": "Heavy Ferro Fibrous"
		},
		tag: "light-ferro-fibrous",
		armormultiplier: {
			clan: 0,
			is: 16 * 1.24
		},
		crits: {
			clan: 0,
			is: 21
		},
		costmultiplier: 25000,
		introduced: 3069,
		extinct: 0,
		reintroduced: 0
	},

	{
		name: {
			"en-US": "Stealth"
		},
		tag: "stealth",
		armormultiplier: {
			clan: 0,
			is: 16
		},
		crits: {
			clan: 0,
			is: 12
		},
		crit_locs: {
			"ra": 2,
			"rl": 2,
			"rt": 2,
			"la": 2,
			"ll": 2,
			"lt": 2
		},
		costmultiplier: 50000,
		introduced: 3063,
		extinct: 0,
		reintroduced: 0
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechClanEquipment = Array(
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechEngineOptions = Array(
	{
		name: "10",
		rating: 10,
		weight: {
			ice: 1.0,
			cell: 1.0,
			fission: 5,
			comp: 1,
			standard: 0.5,
			light: 0.5,
			xl: 0.5
		}
	},
	{
		name: "15",
		rating: 15,
		weight: {
			ice: 1.0,
			cell: 1.0,
			fission: 5,
			comp: 1,
			standard: 0.5,
			light: 0.5,
			xl: 0.5
		}
	},
	{
		name: "20",
		rating: 20,
		weight: {
			ice: 1.0,
			cell: 1.0,
			fission: 5,
			comp: 1,
			standard: 0.5,
			light: 0.5,
			xl: 0.5
		}
	},
	{
		name: "25",
		rating: 25,
		weight: {
			ice: 1.0,
			cell: 1.0,
			fission: 5,
			comp: 1,
			standard: 0.5,
			light: 0.5,
			xl: 0.5
		}
	},
	{
		name: "30",
		rating: 30,
		weight: {
			ice: 2.0,
			cell: 1.5,
			fission: 5,
			comp: 1.5,
			standard: 1,
			light: 1,
			xl: 0.5
		}
	},
	{
		name: "35",
		rating: 35,
		weight: {
			ice: 2,
			cell: 1.5,
			fission: 5,
			comp: 1.5,
			standard: 1,
			light: 1,
			xl: 0.5
		}
	},
	{
		name: "40",
		rating: 40,
		weight: {
			ice: 2,
			cell: 1.5,
			fission: 5,
			comp: 1.5,
			standard: 1,
			light: 1,
			xl: 0.5
		}
	},
	{
		name: "45",
		rating: 45,
		weight: {
			ice: 2,
			cell: 1.5,
			fission: 5,
			comp: 1.5,
			standard: 1,
			light: 1,
			xl: 0.5
		}
	},
	{
		name: "50",
		rating: 50,
		weight: {
			ice: 3,
			cell: 2,
			fission: 5,
			comp: 2.5,
			standard: 1.5,
			light: 1.5,
			xl: 1
		}
	},
	{
		name: "55",
		rating: 55,
		weight: {
			ice: 3,
			cell: 2,
			fission: 5,
			comp: 2.5,
			standard: 1.5,
			light: 1.5,
			xl: 1
		}
	},
	{
		name: "60",
		rating: 60,
		weight: {
			ice: 3,
			cell: 2,
			fission: 5,
			comp: 2.5,
			standard: 1.5,
			light: 1.5,
			xl: 1
		}
	},
	{
		name: "65",
		rating: 65,
		weight: {
			ice: 4,
			cell: 2.5,
			fission: 5,
			comp: 3,
			standard: 2,
			light: 1.5,
			xl: 1
		}
	},
	{
		name: "70",
		rating: 70,
		weight: {
			ice: 4,
			cell: 2.5,
			fission: 5,
			comp: 3,
			standard: 2,
			light: 1.5,
			xl: 1
		}
	},
	{
		name: "75",
		rating: 75,
		weight: {
			ice: 4,
			cell: 2.5,
			fission: 5,
			comp: 3,
			standard: 2,
			light: 1.5,
			xl: 1
		}
	},
	{
		name: "80",
		rating: 80,
		weight: {
			ice: 5,
			cell: 3,
			fission: 5,
			comp: 4,
			standard: 2.5,
			light: 2,
			xl: 1.5
		}
	},
	{
		name: "85",
		rating: 85,
		weight: {
			ice: 5,
			cell: 3,
			fission: 5,
			comp: 4,
			standard: 2.5,
			light: 2,
			xl: 1.5
		}
	},
	{
		name: "90",
		rating: 90,
		weight: {
			ice: 6,
			cell: 4,
			fission: 5.5,
			comp: 4.5,
			standard: 3,
			light: 2.5,
			xl: 1.5
		}
	},
	{
		name: "95",
		rating: 95,
		weight: {
			ice: 6,
			cell: 4,
			fission: 5.5,
			comp: 4.5,
			standard: 3,
			light: 2.5,
			xl: 1.5
		}
	},
	{
		name: "100",
		rating: 100,
		weight: {
			ice: 6,
			cell: 4,
			fission: 5.5,
			comp: 4.5,
			standard: 3.5,
			light: 2.5,
			xl: 1.5
		}
	},
	{
		name: "105",
		rating: 105,
		weight: {
			ice: 7,
			cell: 4.5,
			fission: 6.5,
			comp: 5.5,
			standard: 3.5,
			light: 3,
			xl: 2
		}
	},
	{
		name: "110",
		rating: 110,
		weight: {
			ice: 7.0,
			cell: 4.5,
			fission: 6.5,
			comp: 5.5,
			standard: 3.5,
			light: 3,
			xl: 2
		}
	},
	{
		name: "115",
		rating: 115,
		weight: {
			ice: 7.0,
			cell: 4.5,
			fission: 6.5,
			comp: 5.5,
			standard: 3.5,
			light: 3,
			xl: 2
		}
	},
	{
		name: "120",
		rating: 120,
		weight: {
			ice: 8,
			cell: 5,
			fission: 7,
			comp: 6,
			standard: 4,
			light: 3,
			xl: 2
		}
	},
	{
		name: "125",
		rating: 125,
		weight: {
			ice: 8,
			cell: 5,
			fission: 7,
			comp: 6,
			standard: 4,
			light: 3,
			xl: 2
		}
	},
	{
		name: "130",
		rating: 130,
		weight: {
			ice: 9,
			cell: 5.5,
			fission: 8,
			comp: 7,
			standard: 4.5,
			light: 3.5,
			xl: 2.5
		}
	},
	{
		name: "135",
		rating: 135,
		weight: {
			ice: 9,
			cell: 5.5,
			fission: 8,
			comp: 7,
			standard: 4.5,
			light: 3.5,
			xl: 2.5
		}
	},
	{
		name: "140",
		rating: 140,
		weight: {
			ice: 10,
			cell: 6.0,
			fission: 9,
			comp: 7.5,
			standard: 5,
			light: 4,
			xl: 2.5
		}
	},
	{
		name: "145",
		rating: 145,
		weight: {
			ice: 10,
			cell: 6.0,
			fission: 9,
			comp: 7.5,
			standard: 5,
			light: 4,
			xl: 2.5
		}
	},
	{
		name: "150",
		rating: 150,
		weight: {
			ice: 11,
			cell: 7,
			fission: 10,
			comp: 8.5,
			standard: 5.5,
			light: 4.5,
			xl: 3
		}
	},
	{
		name: "155",
		rating: 155,
		weight: {
			ice: 11,
			cell: 7,
			fission: 10,
			comp: 8.5,
			standard: 5.5,
			light: 4.5,
			xl: 3
		}
	},
	{
		name: "160",
		rating: 160,
		weight: {
			ice: 12,
			cell: 7.5,
			fission: 10.5,
			comp: 9,
			standard: 6,
			light: 4.5,
			xl: 3
		}
	},
	{
		name: "165",
		rating: 165,
		weight: {
			ice: 12,
			cell: 7.5,
			fission: 10.5,
			comp: 9,
			standard: 6,
			light: 4.5,
			xl: 4
		}
	},
	{
		name: "170",
		rating: 170,
		weight: {
			ice: 12,
			cell: 7.5,
			fission: 10.5,
			comp: 9,
			standard: 6,
			light: 4.5,
			xl: 4
		}
	},
	{
		name: "175",
		rating: 175,
		weight: {
			ice: 14,
			cell: 8.5,
			fission: 12.5,
			comp: 10,
			standard: 7,
			light: 5.5,
			xl: 3.5
		}
	},
	{
		name: "180",
		rating: 180,
		weight: {
			ice: 14,
			cell: 8.5,
			fission: 12.5,
			comp: 10.5,
			standard: 7,
			light: 5.5,
			xl: 3.5
		}
	},
	{
		name: "185",
		rating: 185,
		weight: {
			ice: 15,
			cell: 9.0,
			fission: 13.5,
			comp: 11.5,
			standard: 7.6,
			light: 6,
			xl: 4
		}
	},
	{
		name: "190",
		rating: 190,
		weight: {
			ice: 15,
			cell: 9,
			fission: 13.5,
			comp: 11.5,
			standard: 7.5,
			light: 6,
			xl: 4
		}
	},
	{
		name: "195",
		rating: 195,
		weight: {
			ice: 16,
			cell: 10,
			fission: 14,
			comp: 12,
			standard: 8,
			light: 6,
			xl: 4
		}
	},
	{
		name: "200",
		rating: 200,
		weight: {
			ice: 17.0,
			cell: 10.5,
			fission: 15,
			comp: 13,
			standard: 8.5,
			light: 6.5,
			xl: 4.5
		}
	},
	{
		name: "205",
		rating: 205,
		weight: {
			ice: 17.0,
			cell: 10.5,
			fission: 15,
			comp: 13,
			standard: 8.5,
			light: 6.5,
			xl: 4.5
		}
	},
	{
		name: "210",
		rating: 210,
		weight: {
			ice: 18,
			cell: 11,
			fission: 16,
			comp: 13.5,
			standard: 9,
			light: 7,
			xl: 4.5
		}
	},
	{
		name: "215",
		rating: 215,
		weight: {
			ice: 18,
			cell: 11,
			fission: 16,
			comp: 13.5,
			standard: 10,
			light: 7.5,
			xl: 5
		}
	},
	{
		name: "220",
		rating: 220,
		weight: {
			ice: 20,
			cell: 12,
			fission: 17.5,
			comp: 15,
			standard: 10,
			light: 7.5,
			xl: 5
		}
	},
	{
		name: "225",
		rating: 225,
		weight: {
			ice: 20,
			cell: 12,
			fission: 17.5,
			comp: 15,
			standard: 10,
			light: 7.5,
			xl: 5
		}
	},
	{
		name: "230",
		rating: 230,
		weight: {
			ice: 21,
			cell: 13,
			fission: 18.5,
			comp: 16,
			standard: 10.5,
			light: 8,
			xl: 5.5
		}
	},
	{
		name: "235",
		rating: 235,
		weight: {
			ice: 22,
			cell: 13.5,
			fission: 19.5,
			comp: 16.5,
			standard: 11,
			light: 8.5,
			xl: 5.5
		}
	},
	{
		name: "240",
		rating: 240,
		weight: {
			ice: 23,
			cell: 14,
			fission: 20.5,
			comp: 17.5,
			standard: 11.5,
			light: 9,
			xl: 6
		}
	},
	{
		name: "245",
		rating: 245,
		weight: {
			ice: 24,
			cell: 14.5,
			fission: 5,
			comp: 1,
			standard: 0.5,
			light: 0.5,
			xl: 0.5
		}
	},
	{
		name: "250",
		rating: 250,
		weight: {
			ice: 25,
			cell: 15,
			fission: 22,
			comp: 19,
			standard: 12.5,
			light: 9.6,
			xl: 6.5
		}
	},
	{
		name: "255",
		rating: 255,
		weight: {
			ice: 26,
			cell: 16,
			fission: 23,
			comp: 19.5,
			standard: 13,
			light: 10,
			xl: 6.5
		}
	},
	{
		name: "260",
		rating: 260,
		weight: {
			ice: 27,
			cell: 16.5,
			fission: 24,
			comp: 20.5,
			standard: 13.5,
			light: 10.5,
			xl: 7
		}
	},
	{
		name: "265",
		rating: 265,
		weight: {
			ice: 28,
			cell: 17,
			fission: 24.5,
			comp: 21,
			standard: 14,
			light: 10.5,
			xl: 7
		}
	},
	{
		name: "270",
		rating: 270,
		weight: {
			ice: 29,
			cell: 17.5,
			fission: 25.5,
			comp: 22,
			standard: 14.5,
			light: 11,
			xl: 7.5
		}
	},
	{
		name: "275",
		rating: 275,
		weight: {
			ice: 31,
			cell: 19,
			fission: 27.5,
			comp: 23.5,
			standard: 15.5,
			light: 12,
			xl: 8
		}
	},
	{
		name: "280",
		rating: 280,
		weight: {
			ice: 32,
			cell: 19.5,
			fission: 28,
			comp: 24,
			standard: 16,
			light: 12,
			xl: 8
		}
	},
	{
		name: "285",
		rating: 285,
		weight: {
			ice: 33,
			cell: 20,
			fission: 29,
			comp: 25,
			standard: 16.5,
			light: 12.5,
			xl: 8.5
		}
	},
	{
		name: "290",
		rating: 290,
		weight: {
			ice: 35,
			cell: 21,
			fission: 31,
			comp: 26.5,
			standard: 17.5,
			light: 13.5,
			xl: 9
		}
	},
	{
		name: "295",
		rating: 295,
		weight: {
			ice: 36,
			cell: 22,
			fission: 31.5,
			comp: 27,
			standard: 18,
			light: 13.5,
			xl: 9
		}
	},
	{
		name: "300",
		rating: 300,
		weight: {
			ice: 38,
			cell: 23,
			fission: 33.5,
			comp: 28.5,
			standard: 19,
			light: 15.5,
			xl: 9.5
		}
	},
	{
		name: "305",
		rating: 305,
		weight: {
			ice: 39,
			cell: 23.5,
			fission: 34.5,
			comp: 29.5,
			standard: 19.5,
			light: 15,
			xl: 10
		}
	},
	{
		name: "310",
		rating: 310,
		weight: {
			ice: 41,
			cell: 25,
			fission: 36,
			comp: 31,
			standard: 20.5,
			light: 15.5,
			xl: 10.5
		}
	},
	{
		name: "315",
		rating: 315,
		weight: {
			ice: 43,
			cell: 26,
			fission: 38,
			comp: 32.5,
			standard: 21.5,
			light: 16.5,
			xl: 11
		}
	},
	{
		name: "320",
		rating: 320,
		weight: {
			ice: 45,
			cell: 27,
			fission: 39.5,
			comp: 34,
			standard: 22.5,
			light: 17,
			xl: 11.5
		}
	},
	{
		name: "325",
		rating: 325,
		weight: {
			ice: 47,
			cell: 28.5,
			fission: 41.5,
			comp: 33.5,
			standard: 23.5,
			light: 18,
			xl: 12
		}
	},
	{
		name: "330",
		rating: 330,
		weight: {
			ice: 49,
			cell: 29.5,
			fission: 43,
			comp: 37,
			standard: 24.5,
			light: 18.5,
			xl: 12.5
		}
	},
	{
		name: "335",
		rating: 335,
		weight: {
			ice: 51,
			cell: 31,
			fission: 45,
			comp: 38.5,
			standard: 25.5,
			light: 18.5,
			xl: 12.5
		}
	},
	{
		name: "340",
		rating: 340,
		weight: {
			ice: 54,
			cell: 32.5,
			fission: 47.5,
			comp: 40.5,
			standard: 27,
			light: 20.5,
			xl: 13.5
		}
	},
	{
		name: "345",
		rating: 345,
		weight: {
			ice: 57,
			cell: 34.5,
			fission: 50,
			comp: 40.5,
			standard: 29.5,
			light: 21.5,
			xl: 14.5
		}
	},
	{
		name: "350",
		rating: 350,
		weight: {
			ice: 59,
			cell: 35.5,
			fission: 52,
			comp: 44.5,
			standard: 29.5,
			light: 22.5,
			xl: 15
		}
	},
	{
		name: "355",
		rating: 355,
		weight: {
			ice: 63,
			cell: 38,
			fission: 55.5,
			comp: 47.5,
			standard: 31.5,
			light: 24,
			xl: 16
		}
	},
	{
		name: "360",
		rating: 360,
		weight: {
			ice: 66,
			cell: 40,
			fission: 58,
			comp: 49.5,
			standard: 33,
			light: 25,
			xl: 16.5
		}
	},
	{
		name: "365",
		rating: 365,
		weight: {
			ice: 69,
			cell: 41.5,
			fission: 60.5,
			comp: 52,
			standard: 34.5,
			light: 26,
			xl: 17.5
		}
	},
	{
		name: "370",
		rating: 370,
		weight: {
			ice: 73,
			cell: 44,
			fission: 64,
			comp: 55,
			standard: 36.5,
			light: 27.5,
			xl: 18.5
		}
	},
	{
		name: "375",
		rating: 375,
		weight: {
			ice: 77,
			cell: 46.5,
			fission: 67.5,
			comp: 58,
			standard: 38.5,
			light: 29,
			xl: 19.5
		}
	},
	{
		name: "380",
		rating: 380,
		weight: {
			ice: 82,
			cell: 49.5,
			fission: 72,
			comp: 61.5,
			standard: 41,
			light: 31,
			xl: 20.5
		}
	},
	{
		name: "385",
		rating: 385,
		weight: {
			ice: 87,
			cell: 52.5,
			fission: 76.5,
			comp: 65.5,
			standard: 43.5,
			light: 33,
			xl: 22
		}
	},
	{
		name: "390",
		rating: 390,
		weight: {
			ice: 92,
			cell: 55.5,
			fission: 80.5,
			comp: 69,
			standard: 46,
			light: 34.5,
			xl: 23
		}
	},
	{
		name: "395",
		rating: 395,
		weight: {
			ice: 98,
			cell: 59,
			fission: 86,
			comp: 73.5,
			standard: 49,
			light: 37,
			xl: 24.5
		}
	},
	{
		name: "400",
		rating: 400,
		weight: {
			ice: 105.5,
			cell: 63,
			fission: 92,
			comp: 79,
			standard: 52.5,
			light: 39.5,
			xl: 26.5
		}
	}

);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechEngineTypes = Array(
	{
		name: {
			"en-US": "Standard Fusion"
		},
		tag: "standard",
		criticals: {
			is: {
				ct: 6
			},
			clan: {
				ct: 6
			}
		},
		costmultiplier: 5000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "XL Fusion"
		},
		tag: "xl",
		criticals: {
			is: {
				ct: 6,
				lt: 3,
				rt: 3
			}
		},
		costmultiplier: 20000,
		introduced: 2579,
		extinct: 2865,
		reintroduced: 3035
	},
	{
		name: {
			"en-US": "Clan XL Fusion"
		},
		tag: "clan-xl",
		criticals: {
			clan: {
				ct: 6,
				lt: 2,
				rt: 2
			}
		},
		costmultiplier: 20000,
		introduced: 2827,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Light Fusion"
		},
		tag: "light",
		criticals: {
			is: {
				ct: 6,
				lt: 2,
				rt: 2
			}
		},
		costmultiplier: 15000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Compact Fusion"
		},
		tag: "compact",
		criticals: {
			is: {
				ct: 3
			}
		},
		costmultiplier: 10000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechGyroTypes = Array(
	{
		name: {
			"en-US": "Standard Gyro"
		},
		tag: "standard",
		weight_multiplier: 1,
		criticals: 4,
		costmultiplier: 300000,
		introduced: 2350,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Extra-light (XL) Gyro"
		},
		tag: "xl",
		weight_multiplier: 0.5,
		criticals: 6,
		costmultiplier: 750000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Compact Gyro"
		},
		tag: "compact",
		weight_multiplier: 1.5,
		criticals: 2,
		costmultiplier: 400000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Heavy Duty Gyro"
		},
		tag: "heavy-duty",
		weight_multiplier: 2,
		criticals: 4,
		costmultiplier: 500000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechHeatSinkTypes = Array(
	{
		name: {
			"en-US": "Single"
		},
		tag: "single",
		dissipation: 1,
		crits: {
			clan: 1,
			is: 1
		},

		cost: 2000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Double"
		},
		tag: "double",
		dissipation: 2,
		crits: {
			clan: 2,
			is: 3
		},
		cost: 6000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechInternalStructureTypes = Array(
	{
		name: {
			"en-US": "Standard"
		},
		tag: "standard",
		crits: {
			clan: 0,
			is: 0
		},

		perTon: {
			20: {
				tonnage: 2,
				head: 3,
				centerTorso: 6,
				rlTorso: 5,
				rlArm: 3,
				rlLeg: 4
			},
			25: {
				tonnage: 2.5,
				head: 3,
				centerTorso: 8,
				rlTorso: 6,
				rlArm: 4,
				rlLeg: 6
			},
			30: {
				tonnage: 3,
				head: 3,
				centerTorso: 10,
				rlTorso: 7,
				rlArm: 5,
				rlLeg: 7
			},
			35: {
				tonnage: 3.5,
				head: 3,
				centerTorso: 11,
				rlTorso: 8,
				rlArm: 6,
				rlLeg: 8
			},
			40: {
				tonnage: 4,
				head: 3,
				centerTorso: 12,
				rlTorso: 10,
				rlArm: 6,
				rlLeg: 10
			},
			45: {
				tonnage: 4.5,
				head: 3,
				centerTorso: 14,
				rlTorso: 11,
				rlArm: 7,
				rlLeg: 11
			},
			50: {
				tonnage: 5,
				head: 3,
				centerTorso: 16,
				rlTorso: 12,
				rlArm: 8,
				rlLeg: 12
			},
			55: {
				tonnage: 5.5,
				head: 3,
				centerTorso: 18,
				rlTorso: 13,
				rlArm: 9,
				rlLeg: 13
			},
			60: {
				tonnage: 6,
				head: 3,
				centerTorso: 20,
				rlTorso: 14,
				rlArm: 10,
				rlLeg: 14
			},
			65: {
				tonnage: 6.5,
				head: 3,
				centerTorso: 21,
				rlTorso: 15,
				rlArm: 10,
				rlLeg: 15
			},
			70: {
				tonnage: 7,
				head: 3,
				centerTorso: 22,
				rlTorso: 15,
				rlArm: 11,
				rlLeg: 15
			},
			75: {
				tonnage: 7.5,
				head: 3,
				centerTorso: 23,
				rlTorso: 16,
				rlArm: 12,
				rlLeg: 16
			},
			80: {
				tonnage: 8,
				head: 3,
				centerTorso: 25,
				rlTorso: 17,
				rlArm: 13,
				rlLeg: 17
			},
			85: {
				tonnage: 8.5,
				head: 3,
				centerTorso: 27,
				rlTorso: 18,
				rlArm: 14,
				rlLeg: 18
			},
			90: {
				tonnage: 9,
				head: 3,
				centerTorso: 29,
				rlTorso: 19,
				rlArm: 15,
				rlLeg: 19
			},
			95: {
				tonnage: 9.5,
				head: 3,
				centerTorso: 30,
				rlTorso: 20,
				rlArm: 16,
				rlLeg: 20
			},
			100: {
				tonnage: 10,
				head: 3,
				centerTorso: 31,
				rlTorso: 21,
				rlArm: 17,
				rlLeg: 21
			}
		},

		cost: 2000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	},
	{
		name: {
			"en-US": "Endo-Steel"
		},
		tag: "endo-steel",
		crits: {
			clan: 7,
			is: 14
		},


		perTon: {
			20: {
				tonnage: 1,
				head: 3,
				centerTorso: 6,
				rlTorso: 5,
				rlArm: 3,
				rlLeg: 4
			},
			25: {
				tonnage: 1.5,
				head: 3,
				centerTorso: 8,
				rlTorso: 6,
				rlArm: 4,
				rlLeg: 6
			},
			30: {
				tonnage: 1.5,
				head: 3,
				centerTorso: 10,
				rlTorso: 7,
				rlArm: 5,
				rlLeg: 7
			},
			35: {
				tonnage: 2,
				head: 3,
				centerTorso: 11,
				rlTorso: 8,
				rlArm: 6,
				rlLeg: 8
			},
			40: {
				tonnage: 2,
				head: 3,
				centerTorso: 12,
				rlTorso: 10,
				rlArm: 6,
				rlLeg: 10
			},
			45: {
				tonnage: 2.5,
				head: 3,
				centerTorso: 14,
				rlTorso: 11,
				rlArm: 7,
				rlLeg: 11
			},
			50: {
				tonnage: 2.5,
				head: 3,
				centerTorso: 16,
				rlTorso: 12,
				rlArm: 8,
				rlLeg: 12
			},
			55: {
				tonnage: 3,
				head: 3,
				centerTorso: 18,
				rlTorso: 13,
				rlArm: 9,
				rlLeg: 13
			},
			60: {
				tonnage: 3,
				head: 3,
				centerTorso: 20,
				rlTorso: 14,
				rlArm: 10,
				rlLeg: 14
			},
			65: {
				tonnage: 3.5,
				head: 3,
				centerTorso: 21,
				rlTorso: 15,
				rlArm: 10,
				rlLeg: 15
			},
			70: {
				tonnage: 3.5,
				head: 3,
				centerTorso: 22,
				rlTorso: 15,
				rlArm: 11,
				rlLeg: 15
			},
			75: {
				tonnage: 4,
				head: 3,
				centerTorso: 23,
				rlTorso: 16,
				rlArm: 12,
				rlLeg: 16
			},
			80: {
				tonnage: 4,
				head: 3,
				centerTorso: 25,
				rlTorso: 17,
				rlArm: 13,
				rlLeg: 17
			},
			85: {
				tonnage: 4.5,
				head: 3,
				centerTorso: 27,
				rlTorso: 18,
				rlArm: 14,
				rlLeg: 18
			},
			90: {
				tonnage: 4.5,
				head: 3,
				centerTorso: 29,
				rlTorso: 19,
				rlArm: 15,
				rlLeg: 19
			},
			95: {
				tonnage: 5,
				head: 3,
				centerTorso: 30,
				rlTorso: 20,
				rlArm: 16,
				rlLeg: 20
			},
			100: {
				tonnage: 5,
				head: 3,
				centerTorso: 31,
				rlTorso: 21,
				rlArm: 17,
				rlLeg: 21
			}
		},


		cost: 6000,
		introduced: 2470,
		extinct: 0,
		reintroduced: 0
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechISEquipment = Array(
	/*
		ENERGY WEAPONS
	*/
	// Standard Lasers
	{
		name: {
			'en-US': "Small Laser",
			'de-DE': "de - Small Laser",
		},
		sort: "laser, 0, small",
		tag: "small-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: 0,
		cbills: 11250,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		ammo_battlevalue: 0,
		heat: 1,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 1,
			range_short: 0.3,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Medium Laser",
			'de-DE': "de - Medium Laser",
		},
		tag: "medium-laser",
		sort: "laser, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 40000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 46,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 3,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large Laser",
			'de-DE': "de - Large Laser",
		},
		tag: "large-laser",
		sort: "laser, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
		damage_aero: 8,
		accuracy_modifier: 0,
		cbills: 100000,
		introduced: 2316,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 123,
		ammo_battlevalue: 0,
		heat: 8,
		weight: 5,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 8,
			range_short: 0.8,
			range_medium: 0.8,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Binary Laser Cannon",
			'de-DE': "de - Binary Laser Cannon",
		},
		tag: "blazer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 12,
		damage_aero: 12,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2812,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 222,
		ammo_battlevalue: 0,
		heat: 16,
		weight: 9,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "d",
		book: "TO",
		page: 319,
		alpha_strike: {
			heat: 16,
			range_short: 1.2,
			range_medium: 1.2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// ER Lasers
	{
		name: {
			'en-US': "ER Small Laser",
			'de-DE': "de - ER Small Laser",
		},
		tag: "er-small-laser",
		sort: "laser, er, 0, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: 0,
		cbills: 11250,
		introduced: 3058,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 17,
		ammo_battlevalue: 0,
		heat: 2,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 5,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 3,
			range_short: 0.3,
			range_medium: 0.3,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "ER Medium Laser",
			'de-DE': "de - ER Medium Laser",
		},
		tag: "er-medium-laser",
		sort: "laser, er, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 80000,
		introduced: 3058,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 62,
		ammo_battlevalue: 0,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 4,
			medium: 8,
			long: 12,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 5,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "ER Large Laser",
			'de-DE': "de - ER Large Laser",
		},
		tag: "er-large-laser",
		sort: "laser, er, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
		damage_aero: 8,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2620,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 163,
		ammo_battlevalue: 0,
		heat: 12,
		weight: 5,
		range_min: {
			min: 0,
			short: 7,
			medium: 14,
			long: 19,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "c",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 12,
			range_short: 0.8,
			range_medium: 0.8,
			range_long: 0.8,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Standard Pulse Lasers
	{
		name: {
			'en-US': "Small Pulse Laser",
			'de-DE': "de - Small Pulse Laser",
		},
		tag: "small-pulse-laser",
		sort: "laser, pulse, 0, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: -2,
		cbills: 16000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 12,
		ammo_battlevalue: 0,
		heat: 2,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P",
			"AI"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 2,
			range_short: 0.33,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Medium Pulse Laser",
			'de-DE': "de - Medium Pulse Laser",
		},
		tag: "medium-pulse-laser",
		sort: "laser, pulse, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
		damage_aero: 6,
		accuracy_modifier: -2,
		cbills: 60000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 48,
		ammo_battlevalue: 0,
		heat: 4,
		weight: 2,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 6,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 4,
			range_short: 0.66,
			range_medium: 0.66,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large Pulse Laser",
			'de-DE': "de - Large Pulse Laser",
		},
		tag: "large-pulse-laser",
		sort: "laser, pulse, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 9,
		damage_aero: 9,
		accuracy_modifier: -2,
		cbills: 175000,
		introduced: 2609,
		extinct: 2950,
		reintroduced: 3037,
		battlevalue: 119,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 0,
			short: 3,
			medium: 7,
			long: 10,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TM",
		page: 226,
		alpha_strike: {
			heat: 10,
			range_short: 0.99,
			range_medium: 0.99,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// X-Pulse Lasers
	{
		name: {
			'en-US': "Small X-Pulse Laser",
			'de-DE': "de - Small X-Pulse Laser",
		},
		tag: "small-x-pulse-laser",
		sort: "laser, x-pulse, 0, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		damage_aero: 3,
		accuracy_modifier: -2,
		cbills: 31000,
		introduced: 3057,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 21,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 5,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P",
			"AI"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 3,
			range_short: 0.33,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Medium X-Pulse Laser",
			'de-DE': "de - Medium X-Pulse Laser",
		},
		tag: "medium-x-pulse-laser",
		sort: "laser, x-pulse, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 6,
		damage_aero: 6,
		accuracy_modifier: -2,
		cbills: 110000,
		introduced: 3057,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 71,
		ammo_battlevalue: 0,
		heat: 6,
		weight: 2,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 6,
			range_short: 0.66,
			range_medium: 0.66,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large X-Pulse Laser",
			'de-DE': "de - Large X-Pulse Laser",
		},
		tag: "large-x-pulse-laser",
		sort: "laser, x-pulse, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 9,
		damage_aero: 9,
		accuracy_modifier: -2,
		cbills: 175000,
		introduced: 3057,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 119,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 0,
			short: 3,
			medium: 7,
			long: 10,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 14,
			range_short: 0.99,
			range_medium: 0.99,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Variable-Speed Pulse Lasers
	{
		name: {
			'en-US': "Small Variable-Speed Pulse Laser",
			'de-DE': "de - Small Variable-Speed Pulse Laser",
		},
		tag: "small-vspl",
		sort: "laser, vspl, 0, small",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 5,
			medium: 4,
			long: 3,
			aero_short: 4,
			aero_medium: 0,
			aero_long: 0
		},
		accuracy_modifier: {
			short: -3,
			medium: -2,
			long: -1
		},
		cbills: 60000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		ammo_battlevalue: 0,
		heat: 3,
		weight: 2,
		range_min: {
			min: 0,
			short: 2,
			medium: 4,
			long: 6,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 3,
			range_short: 0.575,
			range_medium: 0.378,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Medium Variable-Speed Pulse Laser",
			'de-DE': "de - Medium Variable-Speed Pulse Laser",
		},
		tag: "medium-vspl",
		sort: "laser, vspl, 1, medium",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 9,
			medium: 7,
			long: 5,
			aero_short: 7,
			aero_medium: 0,
			aero_long: 0
		},
		accuracy_modifier: {
			short: -3,
			medium: -2,
			long: -1
		},
		cbills: 200000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 56,
		ammo_battlevalue: 0,
		heat: 7,
		weight: 4,
		range_min: {
			min: 0,
			short: 2,
			medium: 5,
			long: 9,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 6,
			range_short: 1.035,
			range_medium: 0.648,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Large Variable-Speed Pulse Laser",
			'de-DE': "de - Large Variable-Speed Pulse Laser",
		},
		tag: "large-vspl",
		sort: "laser, vspl, 2, large",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 11,
			medium: 9,
			long: 7,
			aero_short: 10,
			aero_medium: 7,
			aero_long: 0
		},
		accuracy_modifier: {
			short: -3,
			medium: -2,
			long: -1
		},
		cbills: 456000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 123,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 9,
		range_min: {
			min: 0,
			short: 4,
			medium: 8,
			long: 15,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"P"
		),
		tech_rating: "e",
		book: "TO",
		page: 321,
		alpha_strike: {
			heat: 14,
			range_short: 1.265,
			range_medium: 0.863,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Bombast Laser",
			'de-DE': "de - Bombast Laser",
		},
		tag: "bombast-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 12,
		damage_aero: 12,
		accuracy_modifier: 3,
		cbills: 200000,
		introduced: 3064,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 137,
		ammo_battlevalue: 0,
		heat: 12,
		weight: 7,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 3,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 3,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TO",
		page: 320,
		alpha_strike: {
			heat: 12,
			range_short: 1.02,
			range_medium: 1.02,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// PPCs
	{
		name: {
			'en-US': "Light PPC",
			'de-DE': "de - Light PPC",
		},
		tag: "light-ppc",
		sort: "ppc, 0, light",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 150000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 88,
		ammo_battlevalue: 0,
		heat: 5,
		weight: 3,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 5,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "PPC",
			'de-DE': "de - PPC",
		},
		tag: "standard-ppc",
		sort: "ppc, 1, standard",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 176,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 7,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 3,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 3,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "d",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 10,
			range_short: 0.75,
			range_medium: 1,
			range_long: 1,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Heavy PPC",
			'de-DE': "de - Heavy PPC",
		},
		tag: "heavy-ppc",
		sort: "ppc, 2, heavy",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 15,
		damage_aero: 15,
		accuracy_modifier: 0,
		cbills: 250000,
		introduced: 3067,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 317,
		ammo_battlevalue: 0,
		heat: 15,
		weight: 10,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 15,
			range_short: 1.125,
			range_medium: 1.5,
			range_long: 1.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Snub-Nose PPC",
			'de-DE': "de - Snub-Nose PPC",
		},
		tag: "snub-nose-ppc",
		sort: "ppc, snub-nose",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: {
			short: 10,
			medium: 8,
			long: 5,
			aero_short: 10,
			aero_medium: 8,
			aero_long: 0
		},
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2784,
		extinct: 2790,
		reintroduced: 3067,
		battlevalue: 165,
		ammo_battlevalue: 0,
		heat: 10,
		weight: 6,
		range_min: {
			min: 0,
			short: 9,
			medium: 13,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 234,
		alpha_strike: {
			heat: 10,
			range_short: 1,
			range_medium: 0.65,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Extended-Range PPC",
			'de-DE': "de - Extended-Range PPC",
		},
		tag: "er-ppc",
		sort: "ppc, er",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2751,
		extinct: 2860,
		reintroduced: 3037,
		battlevalue: 229,
		ammo_battlevalue: 0,
		heat: 15,
		weight: 7,
		range_min: {
			min: 0,
			short: 7,
			medium: 14,
			long: 23,
		},
		space: {
			battlemech: 3,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 3,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE"
		),
		tech_rating: "e",
		book: "TM",
		page: 233,
		alpha_strike: {
			heat: 15,
			range_short: 1,
			range_medium: 1,
			range_long: 1,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Plasma Rifle
	{
		name: {
			'en-US': "Plasma Rifle",
			'de-DE': "de - Plasma Rifle",
		},
		tag: "plasma-rifle",
		sort: "plasmarifle",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 260000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 210,
		ammo_battlevalue: 26,
		heat: 10,
		weight: 6,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 2,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 2,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "e",
		book: "TM",
		page: 235,
		alpha_strike: {
			heat: 10,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
				"Heat"
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Plasma Rifle)",
			'de-DE': "de - Ammo (Plasma Rifle)",
		},
		tag: "ammo-plasma-rifle",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 10000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 26,
		heat: 0,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"AI"
		),
		tech_rating: "e",
		book: "TM",
		page: 235,
		alpha_strike: {
			heat: 10,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat"
			)
		}
	},
	// Flamers
	{
		name: {
			'en-US': "Flamer",
			'de-DE': "de - Flamer",
		},
		tag: "standard-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 7500,
		introduced: 2025,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 6,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "b",
		book: "TM",
		page: 218,
		alpha_strike: {
			heat: 3,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat",
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "ER Flamer",
			'de-DE': "de - ER Flamer",
		},
		tag: "er-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 3070,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 16,
		ammo_battlevalue: 1,
		heat: 4,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 5,
			long: 7,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "d",
		book: "TO",
		page: 312,
		alpha_strike: {
			heat: 4,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat"
			)
		}
	},
	{
		name: {
			'en-US': "Vehicle Flamer",
			'de-DE': "de - Vehicle Flamer",
		},
		tag: "vehicle-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		sort: "flamer, vehicle",
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 7500,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "b",
		book: "TM",
		page: 218,
		alpha_strike: {
			heat: 3,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat",
				"Point Defense"
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer)",
			'de-DE': "de - Ammo (Vehicle Flamer)",
		},
		tag: "ammo-vehicle-flamer",
		sort: "ammo, flamer, vehicle",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "b",
		book: "TM",
		page: 218,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer Coolant)",
			'de-DE': "de - Ammo (Vehicle Flamer Coolant)",
		},
		tag: "ammo-vehicle-flamer-coolant",
		sort: "ammo, flamer, vehicle, coolant",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 3000,
		introduced: 2050,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "c",
		book: "TO",
		page: 316,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer Inferno)",
			'de-DE': "de - Ammo (Vehicle Flamer Inferno)",
		},
		tag: "ammo-vehicle-flamer-inferno",
		sort: "ammo, flamer, vehicle, inferno",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 5000,
		introduced: 2400,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 2,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "d",
		book: "TO",
		page: 316,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Vehicle Flamer Water)",
			'de-DE': "de - Ammo (Vehicle Flamer Water)",
		},
		tag: "ammo-vehicle-flamer-water",
		sort: "ammo, flamer, vehicle, water",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 500,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 1,
		heat: 3,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "a",
		book: "TO",
		page: 316,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Heavy Flamer",
			'de-DE': "de - Heavy Flamer",
		},
		tag: "heavy-flamer",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		sort: "flamer, heavy",
		damage: 4,
		damage_aero: 4,
		accuracy_modifier: 0,
		cbills: 11250,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 1,
		heat: 5,
		weight: 1.5,
		range_min: {
			min: 0,
			short: 2,
			medium: 3,
			long: 4,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DE",
			"H"
		),
		tech_rating: "c",
		book: "TO",
		page: 312,
		alpha_strike: {
			heat: 5,
			range_short: 0.4,
			range_medium: 0.4,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
				"Heat"
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer)",
			'de-DE': "de - Ammo (Heavy Flamer)",
		},
		tag: "ammo-heavy-flamer",
		sort: "ammo, flamer, heavy",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 2000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 2,
		ammo_battlevalue: 1,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 2,
			medium: 3,
			long: 4,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "c",
		book: "TO",
		page: 312,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer Coolant)",
			'de-DE': "de - Ammo (Heavy Flamer Coolant)",
		},
		tag: "ammo-heavy-flamer-coolant",
		sort: "ammo, flamer, heavy, coolant",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 3000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		ammo_battlevalue: 2,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "c",
		book: "TO",
		page: 361,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer Inferno)",
			'de-DE': "de - Ammo (Heavy Flamer Inferno)",
		},
		tag: "ammo-heavy-flamer-inferno",
		sort: "ammo, flamer, heavy, inferno",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 5000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 4,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "d",
		book: "TO",
		page: 361,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Heavy Flamer Water)",
			'de-DE': "de - Ammo (Heavy Flamer Water)",
		},
		tag: "ammo-heavy-flamer-water",
		sort: "ammo, flamer, heavy, water",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		ammo_battlevalue: 2,
		heat: 5,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"X"
		),
		tech_rating: "a",
		book: "TO",
		page: 362,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	/*
		BALLISTIC WEAPONS
	*/
	// Standard Autocannons
	// Note: ACs referred to internally as a-d instead of numerically to avoid sort and partial
	// match problems
	// AC/2
	{
		name: {
			'en-US': "Autocannon/2",
			'de-DE': "de - Autocannon/2",
		},
		tag: "standard-autocannon-a",
		sort: "Autocannon/a",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 75000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 37,
		heat: 1,
		weight: 6,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2)",
			'de-DE': "de - Ammo (Autocannon/2)",
		},
		tag: "ammo-standard-autocannon-a",
		sort: "ammo, Autocannon/a",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2 Armor-Piercing)",
			'de-DE': "de - Ammo (Autocannon/2 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-a-armor-piercing",
		sort: "ammo, Autocannon/a, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2 Caseless)",
			'de-DE': "de - Ammo (Autocannon/2 Caseless)",
		},
		tag: "ammo-standard-autocannon-a-caseless",
		sort: "ammo, Autocannon/a, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2 Flak)",
			'de-DE': "de - Ammo (Autocannon/2 Flak)",
		},
		tag: "ammo-standard-autocannon-a-flak",
		sort: "ammo, Autocannon/a, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 2310,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2 Flechette)",
			'de-DE': "de - Ammo (Autocannon/2 Flechette)",
		},
		tag: "ammo-standard-autocannon-a-flechette",
		sort: "ammo, Autocannon/a, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2 Precision)",
			'de-DE': "de - Ammo (Autocannon/2 Precision)",
		},
		tag: "ammo-standard-autocannon-a-precision",
		sort: "ammo, Autocannon/a, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/2 Tracer)",
			'de-DE': "de - Ammo (Autocannon/2 Tracer)",
		},
		tag: "ammo-standard-autocannon-a-tracer",
		sort: "ammo, Autocannon/a, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 1,
		weight: 1,
		range_min: {
			min: 4,
			short: 8,
			medium: 16,
			long: 24,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.132,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0.2,
			tc: 1,
			notes: Array(
			)
		}
	},
	// AC/5
	{
		name: {
			'en-US': "Autocannon/5",
			'de-DE': "de - Autocannon/5",
		},
		tag: "standard-autocannon-b",
		sort: "Autocannon/b",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 125000,
		introduced: 2250,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 75,
		heat: 1,
		weight: 8,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 4,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 4,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5)",
			'de-DE': "de - Ammo (Autocannon/5)",
		},
		tag: "ammo-standard-autocannon-b",
		sort: "ammo, Autocannon/b",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4500,
		introduced: 2250,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5 Armor-Piercing)",
			'de-DE': "de - Ammo (Autocannon/5 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-b-armor-piercing",
		sort: "ammo, Autocannon/b, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 18000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5 Caseless)",
			'de-DE': "de - Ammo (Autocannon/5 Caseless)",
		},
		tag: "ammo-standard-autocannon-b-caseless",
		sort: "ammo, Autocannon/b, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5 Flak)",
			'de-DE': "de - Ammo (Autocannon/5 Flak)",
		},
		tag: "ammo-standard-autocannon-b-flak",
		sort: "ammo, Autocannon/b, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 2310,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5 Flechette)",
			'de-DE': "de - Ammo (Autocannon/5 Flechette)",
		},
		tag: "ammo-standard-autocannon-b-flechette",
		sort: "ammo, Autocannon/b, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5 Precision)",
			'de-DE': "de - Ammo (Autocannon/5 Precision)",
		},
		tag: "ammo-standard-autocannon-b-precision",
		sort: "ammo, Autocannon/b, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 27000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/5 Tracer)",
			'de-DE': "de - Ammo (Autocannon/5 Tracer)",
		},
		tag: "ammo-standard-autocannon-b-tracer",
		sort: "ammo, Autocannon/b, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 9,
		heat: 1,
		weight: 1,
		range_min: {
			min: 3,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.375,
			range_medium: 0.5,
			range_long: 0.5,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// AC/10
	{
		name: {
			'en-US': "Autocannon/10",
			'de-DE': "de - Autocannon/10",
		},
		tag: "standard-autocannon-c",
		sort: "Autocannon/c",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 10,
		damage_aero: 10,
		accuracy_modifier: 0,
		cbills: 200000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 123,
		heat: 3,
		weight: 12,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 7,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 7,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10)",
			'de-DE': "de - Ammo (Autocannon/10)",
		},
		tag: "ammo-standard-autocannon-c",
		sort: "ammo, Autocannon/c",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10 Armor-Piercing)",
			'de-DE': "de - Ammo (Autocannon/10 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-c-armor-piercing",
		sort: "ammo, Autocannon/c, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 24000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10 Caseless)",
			'de-DE': "de - Ammo (Autocannon/10 Caseless)",
		},
		tag: "ammo-standard-autocannon-c-caseless",
		sort: "ammo, Autocannon/c, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10 Flak)",
			'de-DE': "de - Ammo (Autocannon/10 Flak)",
		},
		tag: "ammo-standard-autocannon-c-flak",
		sort: "ammo, Autocannon/c, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10 Flechette)",
			'de-DE': "de - Ammo (Autocannon/10 Flechette)",
		},
		tag: "ammo-standard-autocannon-c-flechette",
		sort: "ammo, Autocannon/c, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10 Precision)",
			'de-DE': "de - Ammo (Autocannon/10 Precision)",
		},
		tag: "ammo-standard-autocannon-c-precision",
		sort: "ammo, Autocannon/c, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 30000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/10 Tracer)",
			'de-DE': "de - Ammo (Autocannon/10 Tracer)",
		},
		tag: "ammo-standard-autocannon-c-tracer",
		sort: "ammo, Autocannon/c, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 9000,
		introduced: 2460,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 15,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 3,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Autocannon/20",
			'de-DE': "de - Autocannon/20",
		},
		tag: "standard-autocannon-d",
		sort: "Autocannon/d",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 20,
		damage_aero: 20,
		accuracy_modifier: 0,
		cbills: 300000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 178,
		heat: 7,
		weight: 14,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 10,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 10,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20)",
			'de-DE': "de - Ammo (Autocannon/20)",
		},
		tag: "ammo-standard-autocannon-d",
		sort: "ammo, Autocannon/d",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 10000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 1,
			range_medium: 1,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20 Armor-Piercing)",
			'de-DE': "de - Ammo (Autocannon/20 Armor-Piercing)",
		},
		tag: "ammo-standard-autocannon-d-armor-piercing",
		sort: "ammo, Autocannon/d, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 40000,
		introduced: 3059,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 2,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20 Caseless)",
			'de-DE': "de - Ammo (Autocannon/20 Caseless)",
		},
		tag: "ammo-standard-autocannon-d-caseless",
		sort: "ammo, Autocannon/d, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20 Flak)",
			'de-DE': "de - Ammo (Autocannon/20 Flak)",
		},
		tag: "ammo-standard-autocannon-d-flak",
		sort: "ammo, Autocannon/d, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20 Flechette)",
			'de-DE': "de - Ammo (Autocannon/20 Flechette)",
		},
		tag: "ammo-standard-autocannon-d-flechette",
		sort: "ammo, Autocannon/d, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 3055,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20 Precision)",
			'de-DE': "de - Ammo (Autocannon/20 Precision)",
		},
		tag: "ammo-standard-autocannon-d-precision",
		sort: "ammo, Autocannon/d, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 60000,
		introduced: 3062,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 2,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Autocannon/20 Tracer)",
			'de-DE': "de - Ammo (Autocannon/20 Tracer)",
		},
		tag: "ammo-standard-autocannon-d-tracer",
		sort: "ammo, Autocannon/d, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 15000,
		introduced: 2500,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 22,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 3,
			medium: 6,
			long: 9,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 5,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 7,
			range_short: 2,
			range_medium: 2,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Light Autocannon/2",
			'de-DE': "de - Light Autocannon/2",
		},
		tag: "light-autocannon-2",
		sort: "Light Autocannon/2",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 100000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 30,
		heat: 1,
		weight: 4,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2)",
			'de-DE': "de - Ammo (Light Autocannon/2)",
		},
		tag: "ammo-light-autocannon-2",
		sort: "ammo, Light Autocannon/2",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Armor-Piercing)",
			'de-DE': "de - Ammo (Light Autocannon/2 Armor-Piercing)",
		},
		tag: "ammo-light-autocannon-2-armor-piercing",
		sort: "ammo, Light Autocannon/2, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Caseless)",
			'de-DE': "de - Ammo (Light Autocannon/2 Caseless)",
		},
		tag: "ammo-light-autocannon-2-caseless",
		sort: "ammo, Light Autocannon/2, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Flak)",
			'de-DE': "de - Ammo (Light Autocannon/2 Flak)",
		},
		tag: "ammo-light-autocannon-2-flak",
		sort: "ammo, Light Autocannon/2, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Flechette)",
			'de-DE': "de - Ammo (Light Autocannon/2 Flechette)",
		},
		tag: "ammo-light-autocannon-2-flechette",
		sort: "ammo, Light Autocannon/2, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Precision)",
			'de-DE': "de - Ammo (Light Autocannon/2 Precision)",
		},
		tag: "ammo-light-autocannon-2-precision",
		sort: "ammo, Light Autocannon/2, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 22,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/2 Tracer)",
			'de-DE': "de - Ammo (Light Autocannon/2 Tracer)",
		},
		tag: "ammo-light-autocannon-2-tracer",
		sort: "ammo, Light Autocannon/2, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 4,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 6,
			medium: 12,
			long: 18,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 45,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.2,
			range_medium: 0.2,
			range_long: 0.2,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
		{
		name: {
			'en-US': "Light Autocannon/5",
			'de-DE': "de - Light Autocannon/5",
		},
		tag: "light-autocannon-5",
		sort: "Light Autocannon/5",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 5,
		damage_aero: 5,
		accuracy_modifier: 0,
		cbills: 150000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 62,
		heat: 1,
		weight: 5,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: false,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5)",
			'de-DE': "de - Ammo (Light Autocannon/5)",
		},
		tag: "ammo-light-autocannon-5",
		sort: "ammo, Light Autocannon/5",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 4500,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "c",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Armor-Piercing)",
			'de-DE': "de - Ammo (Light Autocannon/5 Armor-Piercing)",
		},
		tag: "ammo-light-autocannon-5-armor-piercing",
		sort: "ammo, Light Autocannon/5, Armor-Piercing",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 18000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Caseless)",
			'de-DE': "de - Ammo (Light Autocannon/5 Caseless)",
		},
		tag: "ammo-light-autocannon-5-caseless",
		sort: "ammo, Light Autocannon/5, Caseless",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3079,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 90,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "d",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Flak)",
			'de-DE': "de - Ammo (Light Autocannon/5 Flak)",
		},
		tag: "ammo-light-autocannon-5-flak",
		sort: "ammo, Light Autocannon/5, Flak",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 352,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Flechette)",
			'de-DE': "de - Ammo (Light Autocannon/5 Flechette)",
		},
		tag: "ammo-light-autocannon-5-flechette",
		sort: "ammo, Light Autocannon/5, Flechette",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Precision)",
			'de-DE': "de - Ammo (Light Autocannon/5 Precision)",
		},
		tag: "ammo-light-autocannon-5-precision",
		sort: "ammo, Light Autocannon/5, Precision",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 27000,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 10,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "e",
		book: "TM",
		page: 208,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Light Autocannon/5 Tracer)",
			'de-DE': "de - Ammo (Light Autocannon/5 Tracer)",
		},
		tag: "ammo-light-autocannon-5-tracer",
		sort: "ammo, Light Autocannon/5, Tracer",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 6750,
		introduced: 3068,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 8,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 5,
			medium: 10,
			long: 15,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 20,
		min_ammo_tons: 1,
		explosive: true,
		weapon_type: Array(
			"DB",
			"S"
		),
		tech_rating: "b",
		book: "TO",
		page: 353,
		alpha_strike: {
			heat: 1,
			range_short: 0.5,
			range_medium: 0.5,
			range_long: 0.0,
			range_extreme: 0,
			tc: 1,
			notes: Array(
			)
		}
	},
	// Machine Guns
	{
		name: {
			'en-US': "Machine Gun",
			'de-DE': "de - Machine Gun",
		},
		tag: "machine-gun",
		sort: "machine gun",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		accuracy_modifier: 0,
		cbills: 5000,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 5,
		heat: 0,
		weight: 0.5,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 200,
		min_ammo_tons: 0.5,
		explosive: false,
		weapon_type: Array(
			"DB",
			"AI"
		),
		tech_rating: "b",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 0,
			range_short: 0.2,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	},
	{
		name: {
			'en-US': "Ammo (Machine Gun)",
			'de-DE': "de - Ammo (Machine Gun)",
		},
		tag: "ammo-machine-gun",
		sort: "ammo, machine gun",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		accuracy_modifier: 0,
		cbills: 1000,
		introduced: 1950,
		extinct: 0,
		reintroduced: 0,
		battlevalue: 1,
		heat: 1,
		weight: 1,
		range_min: {
			min: 0,
			short: 1,
			medium: 2,
			long: 3,
		},
		space: {
			battlemech: 1,
			protomech: "n/a",
			combat_vehicle: 1,
			support_vehicle: 1,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 200,
		min_ammo_tons: 0.5,
		explosive: true,
		weapon_type: Array(
			"DB",
			"AI"
		),
		tech_rating: "b",
		book: "TM",
		page: 227,
		alpha_strike: {
			heat: 0,
			range_short: 0,
			range_medium: 0,
			range_long: 0,
			range_extreme: 0,
			tc: 0,
			notes: Array(
			)
		}
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechJumpJetTypes = Array(
	{
		name: {
			"en-US": "Standard Jump Jets"
		},
		tag: "standard",
		weight_multiplier: {
			light: 0.5,
			medium: 1,
			heavy: 2
		},
		criticals: 1,
		costmultiplier: 200,
		introduced: 2300,
		extinct: 0,
		reintroduced: 0
	},

	{
		name: {
			"en-US": "Improved Jump Jets"
		},
		tag: "improved",
		weight_multiplier: {
			light: 1,
			medium: 2,
			heavy: 4
		},
		criticals: 2,
		costmultiplier: 500,
		introduced: 3050,
		extinct: 0,
		reintroduced: 0
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var mechTypeOptions = Array(
	{
		id: 1,
		class: "biped",
		name: {
			'en-US': "Biped",
			'de-DE': "de-Biped"
		}
	},
	{
		id: 2,
		class: "quad",
		name: {
			'en-US': "Quad",
			'de-DE': "de-Biped"
		}
	}
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
var btTechOptions = Array(
	{
		id: 1,
		tag: "is",
		name: {
			'en-US':'Inner Sphere',
			'de-DE': "de - Inner Sphere"
		}
	},
	{
		id: 2,
		tag: "clan",
		name: {
			'en-US':'Clan',
			'de-DE': "de - Clan"
		}
	}
);

function asGroup () {

	this.members = Array();

	this.customName = "";

	this.activeMembers = 0;
	this.groupPoints = 0;
	this.membersLabel = "";

	this.getActiveMembers = function() {
		this.activeMembers = 0;
		this.groupPoints = 0;
		for( var memCount = 0; memCount < this.members.length; memCount++ ) {
			this.members[memCount].calcCurrentVals();
			if( this.members[memCount].active )
				this.activeMembers++;
			this.groupPoints += this.members[memCount].currentPoints / 1;
		}

		this.membersLabel = " (" + this.activeMembers + "/" + this.members.length + ")";
		//console.log( this.membersLevel );
	}
}

function asUnit (incomingMechData) {
	this.originalStats = null;

	this.class = "";
	this.costCR = 0;


	this.variant = "";
	this.name = "";
	this.dateIntroduced = "";
	this.era = "";

	this.tro = "";

	this.showDetails = 0;

	this.active = true;

	this.tonnage = 0;

	this.currentSkill = 4;
	this.type = "BattleMech";
	this.size = 0;
	this.tmm = 0;

	this.armor = 0;
	this.structure = 0;

	this.threshold = 0;

	this.damage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	};

	this.move = Array();

	this.mulID = 0;

	this.abilities = "";

	this.overheat = 0;
	this.role = "";

	this.basePoints = 0;
	this.currentPoints = 0;
	this.currentHeat = 0;

	this.currentDamage = 0;

	this.currentArmor = Array();
	this.currentStructure = Array();
	this.engineHits = Array();
	this.fireControlHits = Array();
	this.mpControlHits = Array();
	this.weaponHits = Array();

	this.customName = "";


	this.getRawNumber = function( incomingString ) {
		myString = incomingString.replace(/\D/g,'');
		return myString / 1;
	}

	this.getRawAlpha = function( incomingString ) {
		myString = incomingString.replace(/\d/g,'');
		return myString.toLowerCase().trim();
	}

	this.toggleShowingDetails = function() {

		if( this.showDetails > 0)
			this.showDetails = 0;
		else
			this.showDetails = 1;

	}

	if( typeof(incomingMechData) != "undefined" && incomingMechData != null ) {

		if( typeof(incomingMechData["BFPointValue"]) != "undefined") {
			// RAW Data From MUL

			//~ console.log( "incomingMechData", incomingMechData );

			this.class = incomingMechData["Marauder"];
			this.costCR = incomingMechData["Cost"] / 1;


			this.variant = incomingMechData["Variant"];
			this.name = incomingMechData["Name"];
			this.dateIntroduced = incomingMechData["DateIntroduced"];
			//this.era = incomingMechData["XXXX"];

			this.tro = incomingMechData["TRO"];

			this.mulID = incomingMechData["Id"];

			this.tonnage = incomingMechData["Tonnage"] / 1;

			this.threshold = incomingMechData["BFThreshold"] / 1;

			if( incomingMechData["Role"] && incomingMechData["Role"]["Name"] ) {
				this.role = incomingMechData["Role"]["Name"];
			} else {
				this.role = "Not Specified";
			}

			this.type = incomingMechData["BFType"];
			this.size = incomingMechData["BFSize"];

			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData["BFArmor"] / 1;
			this.structure = incomingMechData["BFStructure"] / 1;

			this.damage = {
				short: incomingMechData["BFDamageShort"] ,
				medium: incomingMechData["BFDamageMedium"] ,
				long: incomingMechData["BFDamageLong"]
			};

			if( incomingMechData["BFDamamgeExtreme"] )
				this.damage.extreme = incomingMechData["BFDamamgeExtreme"]
			else
				this.damage.extreme = 0;

			this.abilities = incomingMechData["BFAbilities"];

			this.overheat = incomingMechData["BFOverheat"] / 1;

			this.basePoints = incomingMechData["BFPointValue"] / 1;

			if( incomingMechData["customName"] )
				this.customName = incomingMechData["customName"];



			this.imageURL = incomingMechData["ImageUrl"];

			var tmpMove = incomingMechData["BFMove"];
			this.move = Array();
			while( tmpMove.indexOf('"') > 0 )
				tmpMove = tmpMove.replace('"', "");
			if( tmpMove.indexOf("/") > 0 ) {
				//split move....
				var moveArray = tmpMove.split( "/" );

				for( var moveCount = 0; moveCount < moveArray.length; moveCount++ ) {
					var tmpMoveObj = {
						move: 0,
						type: ""
					};

					tmpMoveObj.move = this.getRawNumber( moveArray[moveCount] );
					tmpMoveObj.type = this.getRawAlpha( moveArray[moveCount] );

					this.move.push( tmpMoveObj );
				}

			} else {

				var tmpMoveObj = {
					move: 0,
					type: ""
				};

				tmpMoveObj.move = this.getRawNumber( tmpMove );
				tmpMoveObj.type = this.getRawAlpha( tmpMove );

				this.move.push( tmpMoveObj );

			}

			//~ this.jumpMove = this.jumpMove.trim() / 1;
			//~ this.move = this.move.trim() / 1;

			//~ console.log( "after move", this.move );
			//~ console.log( "after jumpMove", this.jumpMove );

			this.currentSkill = 4;
			this.currentHeat = 0;
			this.currentPoints = this.basePoints / 1;

			if( incomingMechData["currentSkilll"] )
				this.currentSkill = incomingMechData["currentSkilll"];

			//~ this.calcCurrentVals();
		} else {
			// Interally Processed Data

			this.class = incomingMechData.class;
			this.costCR = incomingMechData.costCR / 1;

			this.mulID = incomingMechData.mulID / 1;

			this.imageURL = incomingMechData.imageURL;

			this.currentHeat = incomingMechData.currentHeat;

			this.variant = incomingMechData.variant;
			this.name = incomingMechData.name;
			this.dateIntroduced = incomingMechData.dateIntroduced;
			//this.era = incomingMechData["XXXX"];

			this.tro = incomingMechData.tro;

			this.role =  incomingMechData.role;

			this.tonnage = incomingMechData.tonnage / 1;

			this.threshold = incomingMechData.threshold / 1;


			this.type = incomingMechData.type;
			this.size = incomingMechData.size / 1;
			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData.armor / 1;
			this.structure = incomingMechData.structure / 1;


			this.move = incomingMechData.move;
			this.jumpMove = incomingMechData.jumpMove;

			this.damage = {
				short: incomingMechData.damage.short / 1,
				medium: incomingMechData.damage.medium / 1,
				long: incomingMechData.damage.long / 1,
				extreme: incomingMechData.damage.extreme / 1
			};

			if( this.damage.extreme = "NaN" )
				this.damage.extreme = 0;

			this.move = incomingMechData.move;

			this.abilities = incomingMechData.abilities;

			this.showDetails = incomingMechData.showDetails;

			this.overheat = incomingMechData.overheat / 1;

			this.basePoints = incomingMechData.basePoints / 1;


			if( incomingMechData.currentSkill > 0  )
				this.currentSkill = incomingMechData.currentSkill;
			else
				this.currentSkill = 4;

			this.currentPoints = this.basePoints;



			if( incomingMechData.currentArmor )
				this.currentArmor = incomingMechData.currentArmor;

			if( incomingMechData.currentStructure )
				this.currentStructure = incomingMechData.currentStructure;

			if( incomingMechData.engineHits )
				this.engineHits = incomingMechData.engineHits;

			if( incomingMechData.fireControlHits )
				this.fireControlHits = incomingMechData.fireControlHits;

			if( incomingMechData.mpControlHits )
				this.mpControlHits = incomingMechData.mpControlHits;

			if( incomingMechData.weaponHits )
				this.weaponHits = incomingMechData.weaponHits;

			if( incomingMechData.customName )
				this.customName = incomingMechData.customName;
		}

	}



	this.setSkill = function( newSkillValue ) {
		this.currentSkill = newSkillValue / 1;
		this.calcCurrentVals();
	}

	this.calcCurrentVals = function() {

		if(
			this.type.trim().toLowerCase() == "sv"
				||
			this.type.trim().toLowerCase() == "cv"
		) {
			while( this.mpControlHits.length < 5 )
				this.mpControlHits.push( false );

		}

		this.isAerospace = false;
		if(
			this.type.trim().toLowerCase() == "af"
				||
			this.type.trim().toLowerCase() == "cf"
		) {
			this.isAerospace = true;
		}

		this.isInfantry = false;
		if(
			this.type.trim().toLowerCase() == "ba"
				||
			this.type.trim().toLowerCase() == "ci"
		) {
			this.isInfantry = true;
		}


		if( this.currentSkill < 4) {
			// improved skill....
			var pvDifference = 0;

			if( this.basePoints <= 7) {
				pvDifference = 1;
			} else if( this.basePoints <= 12) {
				pvDifference = 2;
			} else if( this.basePoints <= 17) {
				pvDifference = 3;
			} else if( this.basePoints <= 22) {
				pvDifference = 4;
			} else if( this.basePoints <= 27) {
				pvDifference = 5;
			} else if( this.basePoints <= 32) {
				pvDifference = 6;
			} else if( this.basePoints <= 37) {
				pvDifference = 7;
			} else if( this.basePoints <= 42) {
				pvDifference = 8;
			} else if( this.basePoints <= 47) {
				pvDifference = 9;
			} else if( this.basePoints <= 52) {
				pvDifference = 10;
			} else {
				pvDifference = 10 + Math.floor( ( this.basePoints - 52) / 5 );
			}
			this.currentPoints = this.basePoints + ( pvDifference * ( 4 - this.currentSkill ) ) ;
		} else if( this.currentSkill > 4) {
			// low skill....

			if( this.basePoints <= 14) {
				pvDifference = 1;
			} else if( this.basePoints <= 24) {
				pvDifference = 2;
			} else if( this.basePoints <= 34) {
				pvDifference = 3;
			} else if( this.basePoints <= 44) {
				pvDifference = 4;
			} else if( this.basePoints <= 54) {
				pvDifference = 5;
			} else if( this.basePoints <= 64) {
				pvDifference = 6;
			} else if( this.basePoints <= 74) {
				pvDifference = 7;
			} else if( this.basePoints <= 84) {
				pvDifference = 8;
			} else if( this.basePoints <= 94) {
				pvDifference = 9;
			} else if( this.basePoints <= 104) {
				pvDifference = 10;
			} else {
				pvDifference = 10 + Math.floor( ( this.basePoints - 104) / 10 );
			}
			this.currentPoints = this.basePoints - ( pvDifference * ( this.currentSkill - 4) );
		} else {
			this.currentSkill = 4;
			this.currentPoints = this.basePoints;
		}
		this.currentSkillString = this.currentSkill.toString();



		if( typeof( this.currentArmor ) == "undefined" || this.currentArmor.length == 0 ) {
			this.currentArmor = Array();
			for( var armorCount = 0; armorCount < this.armor; armorCount++)
				this.currentArmor.push( false );
		}

		if( typeof( this.currentStructure ) == "undefined" || this.currentStructure.length == 0 ) {
			this.currentStructure = Array();
			for( var structureCount = 0; structureCount < this.structure; structureCount++)
				this.currentStructure.push( false );
		}

		if( typeof( this.engineHits ) == "undefined"  || this.engineHits.length == 0  ) {
			this.engineHits = Array();
			for( var engineHitsCount = 0; engineHitsCount < 2; engineHitsCount++)
				this.engineHits.push( false );
		}

		if( typeof( this.fireControlHits ) == "undefined"  || this.fireControlHits.length == 0  ) {
			this.fireControlHits = Array();
			for( var fcHitsCount = 0; fcHitsCount < 4; fcHitsCount++)
				this.fireControlHits.push( false );
		}

		if( typeof( this.mpControlHits ) == "undefined"  || this.mpControlHits.length == 0  ) {
			this.mpControlHits = Array();
			for( var mpHitsCount = 0; mpHitsCount < 4; mpHitsCount++)
				this.mpControlHits.push( false );
		}

		if( typeof( this.weaponHits ) == "undefined"  || this.weaponHits.length == 0  ) {
			this.weaponHits = Array();
			for( var weaponHitsCount = 0; weaponHitsCount < 4; weaponHitsCount++)
				this.weaponHits.push( false );
		}

		var currentWeaponHits = 0;
		for( var weaponHitsCount = 0; weaponHitsCount < this.weaponHits.length; weaponHitsCount++) {
			if( this.weaponHits[ weaponHitsCount ] )
				currentWeaponHits++;
		}

		var currentFCHits = 0;
		for( var fcHitsCount = 0; fcHitsCount < this.fireControlHits.length; fcHitsCount++) {
			if( this.fireControlHits[ fcHitsCount ] )
				currentFCHits++;
		}

		var currentMPHits = 0;
		for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
			if( this.mpControlHits[ mpHitsCount ] )
				currentMPHits++;
		}


		var currentEngineHits = 0;
		for( var engineHitsCount = 0; engineHitsCount < this.engineHits.length; engineHitsCount++) {
			if( this.engineHits[ engineHitsCount ] )
				currentEngineHits++;
		}

		// Calculate Current Damage Values from Crits...
		var shortDamage = this.damage.short;
		var mediumDamage = this.damage.medium;
		var longDamage = this.damage.long;
		var extremeDamage = this.damage.extreme;

		if( shortDamage != "0*") {
			shortDamage = shortDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				shortDamage = 0;
		}

		if( mediumDamage != "0*") {
			mediumDamage = mediumDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				mediumDamage = 0;
		}

		if( longDamage != "0*") {
			longDamage = longDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				longDamage = 0;
		}

		if( extremeDamage != "0*") {
			extremeDamage = extremeDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				extremeDamage = 0;
		}

		//~ mediumDamage = mediumDamage - currentWeaponHits;
		//~ longDamage = longDamage - currentWeaponHits;
		//~ extremeDamage = extremeDamage - currentWeaponHits;

		if( shortDamage < 0 )
			shortDamage = 0;

		if( mediumDamage < 0 )
			mediumDamage = 0;

		if( longDamage < 0 )
			longDamage = 0;

		if( extremeDamage < 0 )
			extremeDamage = 0;


		this.currentDamage = {
			short: shortDamage,
			medium: mediumDamage,
			long: longDamage,
			extreme: extremeDamage
		};


		for( var moveC = 0; moveC < this.move.length; moveC++ ) {
			this.move[moveC].currentMove = this.move[moveC].move;
		}

		// Calculate Critical Movement
		if(
			this.type.toLowerCase() == "bm"
				||
			this.type.toLowerCase() == "im"
		) {
			// for BattleMechs
			for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
				if( this.mpControlHits[ mpHitsCount ] ) {

					for( var moveC = 0; moveC < this.move.length; moveC++ ) {
						var movePenalty = Math.round(this.move[moveC].currentMove / 2);
						if( movePenalty < 2 )
							movePenalty = 2;

						this.move[moveC].currentMove = this.move[moveC].currentMove - movePenalty;

						if( this.move[moveC].currentMove < 0 )
							this.move[moveC].currentMove = 0;
					}

				}
			}
		}

		if(
			this.type.trim().toLowerCase() == "sv"
				||
			this.type.trim().toLowerCase() == "cv"
		) {
			var numMPHits = 0;
			for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
				if( this.mpControlHits[ mpHitsCount ] ) {
					numMPHits++;
				}
			}

			if( numMPHits > 0 ) {
				if( numMPHits < 3 ) {
					for( var moveC = 0; moveC < this.move.length; moveC++ ) {

						this.move[moveC].currentMove = this.move[moveC].currentMove - 2;

						if( this.move[moveC].currentMove < 0 )
							this.move[moveC].currentMove = 0;
					}
				} else if( numMPHits < 5 ) {
					for( var moveC = 0; moveC < this.move.length; moveC++ ) {

						this.move[moveC].currentMove = Math.round(this.move[moveC].currentMove / 2);

						if( this.move[moveC].currentMove < 0 )
							this.move[moveC].currentMove = 0;
					}
				} else {
					for( var moveC = 0; moveC < this.move.length; moveC++ ) {
						this.move[moveC].currentMove = 0;
					}
				}
			}


		}

		this.currentMove = "";
		this.currentTMM = "";

		this.immobile = true;
		for( var moveC = 0; moveC < this.move.length; moveC++ ) {

			// Subtract Heat from Current Move
			if( this.move[moveC].type != "j" ) {
				this.move[moveC].currentMove = this.move[moveC].currentMove - this.currentHeat * 2;
			}


			this.currentMove += "" + this.move[moveC].currentMove + "\"" + this.move[moveC].type;
			tmpTMM = 0;
			if( this.move[moveC].currentMove < 5 ) {
				tmpTMM = 0;
			} else if( this.move[moveC].currentMove < 9 ) {
				tmpTMM = 1;
			} else if( this.move[moveC].currentMove < 13 ) {
				tmpTMM = 2;
			} else if( this.move[moveC].currentMove < 19 ) {
				tmpTMM = 3;
			} else if( this.move[moveC].currentMove < 35 ) {
				tmpTMM = 4;
			} else {
				tmpTMM = 5;
			}



			if( this.move[moveC].type == "j" ) {
				tmpTMM++;
			}

			if( this.move[moveC].currentMove < 0 ) {
				this.move[moveC].currentMove = 0;
			}

			if( this.move[moveC].currentMove == 0 )
				tmpTMM = 0;

			if( this.move[moveC].currentMove > 0 )
				this.immobile = false;

			this.currentTMM += "" + tmpTMM + this.move[moveC].type;

			if( moveC != this.move.length - 1 ) {
				this.currentTMM += "/";
				this.currentMove += "/";
			}

		}






		// Calculate To-Hits with Criticals
		this.currentToHitShort = this.currentSkill + this.currentHeat + currentFCHits * 2 + currentEngineHits;
		this.currentToHitMedium = this.currentSkill + 2 + this.currentHeat + currentFCHits * 2 + currentEngineHits;
		this.currentToHitLong = this.currentSkill + 4 + this.currentHeat + currentFCHits * 2 + currentEngineHits;
		this.currentToHitExtreme = this.currentSkill + 6 + this.currentHeat + currentFCHits * 2 + currentEngineHits;


		this.currentHeat = this.currentHeat / 1;

		// Engine Hit Heat Effects
		if( currentEngineHits == 1 )
			if( this.currentHeat < 1)
			this.currentHeat = 1;

		if( this.currentHeat < 0 )
			this.currentHeat = 0;

		if( this.currentHeat > 4 )
			this.currentHeat = 4;



		this.getCurrentStructure();

		if( currentEngineHits > 1 )
			this.active = false;

	}

	this.setHeat = function( newHeatValue ) {
		this.currentHeat = newHeatValue;
		this.calcCurrentVals();
	}

	this.takeDamage = function( numberOfPoints ) {
		leftOverPoints = numberOfPoints;
		//~ console.log("TODO: takeDamage();", numberOfPoints);
		for( var pointCounter = 0; pointCounter < numberOfPoints; pointCounter++ ) {
			for( var armorCounter = 0; armorCounter < this.currentArmor.length; armorCounter++ ) {
				if( this.currentArmor[armorCounter] == false ) {
					if( leftOverPoints > 0 ) {
						this.currentArmor[armorCounter] = true;
						leftOverPoints--;
					}

				}
			}


			for( var structureCounter = 0; structureCounter < this.currentStructure.length; structureCounter++ ) {
				if( this.currentStructure[structureCounter] == false ) {
					if( leftOverPoints > 0 ) {
						this.currentStructure[structureCounter] = true;
						leftOverPoints--;

						if( this.getCurrentStructure() == 0 )
							this.active = false;
						else
							this.active = true;
					}
				}
			}
		}

		//~ console.log("this.currentArmor", this.currentArmor);
		//~ console.log("this.currentStructure", this.currentStructure);
		//~ console.log("this.getCurrentStructure()", this.getCurrentStructure());
		//~ console.log("this.getCurrentArmor()", this.getCurrentArmor());
		//~ console.log("this.active", this.active);
		this.calcCurrentVals();
	}

	this.getCurrentArmor = function() {
		var armorPoints = 0;
		for( var armorCounter = 0; armorCounter < this.currentArmor.length; armorCounter++ ) {
			if( this.currentArmor[armorCounter] == false ) {
				armorPoints++;
			}
		}
		return armorPoints;
	}

	this.getCurrentStructure = function() {
		var structPoints = 0;
		for( var structureCounter = 0; structureCounter < this.currentStructure.length; structureCounter++ ) {
			if( this.currentStructure[structureCounter] == false ) {
				structPoints++;
			}
		}

		if( structPoints < 1 )
			this.active = false;
		else
			this.active = true;

		return structPoints;
	}

	this.makeSVGAlphaStrikeCard = function( inPlay, itemIDField ) {

		return createSVGAlphaStrike( this, inPlay, itemIDField );
	}


	this.calcCurrentVals();
}

var class_dice = function() {};

class_dice.prototype = {

	init: function() {
		this.always_exploding_dice = false;

		this.roll_set_count_rolls = [];
		this.roll_set_count = 0;

		this.label_no_effect = "No Effect";
		this.label_shaken = "Shaken";
		this.label_shaken_and_a_wound = "Shaken and a wound";
		this.label_shaken_and_x_wounds = "Shaken and {raises} wounds";

		this.label_critical_failure = "Critical Failure";
		this.label_failure = "Failure";
		this.label_success = "Success";
		this.label_success_with_a_raise = "Success with a raise";
		this.label_success_with_x_raises = "Success with {raises} raises";

		this.label_die_roll_number = "die roll #";
		this.label_wild_die_roll_number = "wild die roll #";

		this.label_roll_set_number = "Roll Set #";

		this.label_total_roll = "Total Roll";

		this.success_target_number = 4;
		this.success_base_toughness = 5;
		this.success_armor = 1;
		this.success_weapons_ap = 0;
	},
	roll_die: function(number_of_sides, exploding_die, wild_die) {

		if(!number_of_sides)
			number_of_sides = 6;


		total_roll = 0;
		keep_rolling = 1;
		display_roll = "";
		while(keep_rolling > 0) {
			roll = Math.floor(Math.random() * number_of_sides) + 1;
			if(exploding_die > 0) {
				if(roll == number_of_sides)
					keep_rolling = 1;
				else
					keep_rolling = 0;
			} else {
				keep_rolling = 0;
			}


			display_roll += roll + ", ";
			total_roll += roll;

		}

		this.roll_set_count_rolls[ this.roll_set_count ].base_rolls.push( display_roll );
		this.roll_set_count_rolls[ this.roll_set_count ].base_roll_sides.push(number_of_sides);
		wild_display_roll = "";
		totalwild_dieRoll = 0;
		keep_rolling = 1;
		if(wild_die > 0) {
			number_of_sides = 6;
			while(keep_rolling > 0) {
				roll = Math.floor(Math.random() * number_of_sides) + 1;
				if(exploding_die > 0) {
					if(roll == number_of_sides)
						keep_rolling = 1;
					else
						keep_rolling = 0;
				} else {
					keep_rolling = 0;
				}



				totalwild_dieRoll += roll;

				wild_display_roll += roll + ", ";
			}
		}
		this.roll_set_count_rolls[ this.roll_set_count ].wild_die_rolls.push(wild_display_roll);

		if(totalwild_dieRoll == 1 && total_roll == 1)
			this.roll_set_count_rolls[ this.roll_set_count ].critical_failure= 1;
		else
			this.roll_set_count_rolls[ this.roll_set_count ].critical_failure= 0;

		if(totalwild_dieRoll > total_roll)
			return totalwild_dieRoll;
		else
			return total_roll;

	},

	roll_dice: function (number_of_dice, total_modifier) { // 2d6+3 would be this.roll_dice(2,3)

		var returnTotal = 0;
		number_of_sides = 6;

		if(number_of_dice.indexOf("*") > 0)
			wild_die = 1;
		else
			wild_die = 0;

		if(number_of_sides < 2)
			number_of_sides = 2;

		number_of_dice = number_of_dice.replace("*", "");

		explodingDice = 0;
		if(number_of_dice.indexOf("d") > -1) {
			rollNumber = number_of_dice.substring(0, number_of_dice.indexOf("d")) / 1;
			number_of_sides = number_of_dice.substring(number_of_dice.indexOf("d") + 1) / 1;
			if(this.always_exploding_dice)
				explodingDice = 1;
		} else {
			if(number_of_dice.indexOf("e") > -1) {
				explodingDice = 1;
				rollNumber = number_of_dice.substring(0, number_of_dice.indexOf("e")) / 1;
				number_of_sides = number_of_dice.substring(number_of_dice.indexOf("e") + 1) / 1;
			} else {
				rollNumber = number_of_dice;
			}
		}

		// a dX assumes 1dX
		if(!rollNumber)
			rollNumber = 1;

		// a 2d assumes 2d6
		if(!number_of_sides)
			number_of_sides = 6;

		var rolls = rollNumber + "d" + number_of_sides + ": ";
		while(rollNumber-- > 0) {

			dieRoll = this.roll_die(number_of_sides, explodingDice, wild_die);
			returnTotal += dieRoll;
			rolls += dieRoll + ",";
			this.roll_set_count_rolls[ this.roll_set_count ].total_rolled_dice++;
		}
		rolls = rolls.substring(0, rolls.length -1);
		rolls += "";



		return returnTotal;
	},
	_parse_bit: function (input_string) {
		value = 0;

		if(input_string.indexOf("d") > -1)
			value = this.roll_dice(input_string, 0);
		else
			if(input_string.indexOf("e") > -1)
				value = this.roll_dice(input_string, 0);
			else
				value = input_string / 1;

		return value;
	},

	_parse_roll_set: function( input_string ) {
		set_total = 0;

		// remove all spaces...

		input_string = input_string.replace(/ /g, "");
		input_string = input_string.toLowerCase();

		// parse mathematical expressions
		input_string = input_string.replace(/\+/g, " + ");
		input_string = input_string.replace(/x/g, " x ");
		input_string = input_string.replace(/\//g, " / ");
		input_string = input_string.replace(/\-/g, " - ");
		input_string = input_string.replace(/\)/g, " ) ");
		input_string = input_string.replace(/\(/g, " ( ");
		input_string = input_string.replace(/\,/g, " , ");


		this.roll_set_count_rolls[ this.roll_set_count ] = {};

		this.roll_set_count_rolls[ this.roll_set_count ].base_rolls = [];
		this.roll_set_count_rolls[ this.roll_set_count ].wild_die_rolls = [];
		this.roll_set_count_rolls[ this.roll_set_count ].base_roll_sides = [];
		this.roll_set_count_rolls[ this.roll_set_count ].total_rolled_dice = 0;
		this.roll_set_count_rolls[ this.roll_set_count ].critical_failure = 0;

		if(input_string.indexOf(" ") > 0) {
			items = input_string.split(" ");

			current_function = "+";
			for(count = 0; count < items.length; count++) {

				if(
					items[count] != "+"
						&&
					items[count] != "x"
						&&
					items[count] != "-"
						&&
					items[count] != "/"
				) {
					// parse the bit
					if(current_function == "+") {
						set_total += this._parse_bit( items[count]) / 1;
					} else {
						if(current_function == "-") {
							set_total -= this._parse_bit( items[count]) / 1;
						} else {
							if(current_function == "x") {
								if(set_total == 0) {
									set_total = items[count] / 1;
								} else {
									set_total = set_total * this._parse_bit( items[count]) / 1;
								}
							} else {
								if(current_function == "/") {
									set_total = set_total / this._parse_bit( items[count]) / 1;
								} else {
									// ignore parentheticals for now
								}
							}
						}
					}
				} else {
					// change what it does...
					current_function = items[count];
				}

			}

		} else {
			set_total += this._parse_bit( input_string);

		}
		this.roll_set_count_rolls[ this.roll_set_count ].total_roll = set_total;
		this.roll_set_count++;
	},

	parse_roll: function (parse_roll_input_string) {

		// look for modifier(s)....
		total = 0;
		this.roll_set_count = 0;
		this.roll_set_count_rolls = [];

		if(parse_roll_input_string.indexOf(",") > 0) {
			parse_roll_items = parse_roll_input_string.split(",");
			for( parse_roll_itemcount = 0; parse_roll_itemcount < parse_roll_items.length; parse_roll_itemcount++) {
				total = this._parse_roll_set( parse_roll_items[parse_roll_itemcount] );
			}
		} else {
			total += this._parse_roll_set( parse_roll_input_string );
		}

		return total;
	},

	display_results: function (for_trait, for_damage) {
		html = "";
		for( results_set_count = 0; results_set_count < this.roll_set_count; results_set_count++ ) {
			if( this.roll_set_count > 1 ) {
				if( results_set_count > 0) {
					html += "<hr />";
				}
				html += "<h4>" + this.label_roll_set_number + (results_set_count + 1) + "</h4>";
			}


			html += "<h5>" + this.label_total_roll + ": " + this.roll_set_count_rolls[ results_set_count ].total_roll + "</h5>"

			if( for_trait )
				html += this.trait_success_margin( this.roll_set_count_rolls[ results_set_count ].total_roll, null, results_set_count ) + "<br />";

			if( for_damage )
				html += this.damage_success_margin( this.roll_set_count_rolls[ results_set_count ].total_roll ) + "<br />";

			for(current_roll = 0; current_roll < this.roll_set_count_rolls[ results_set_count ].total_rolled_dice; current_roll++) {
				// each die roll section
				if(typeof(this.roll_set_count_rolls[ results_set_count ].base_rolls[ current_roll ]) != "undefined") {
					html += "<br />" + this.label_die_roll_number  + "" + (current_roll + 1) + " (d" + this.roll_set_count_rolls[ results_set_count ].base_roll_sides[ current_roll ] + "): ";
					if( this.roll_set_count_rolls[ results_set_count ].base_rolls[ current_roll ] ) {
						if( this.roll_set_count_rolls[ results_set_count ].base_rolls[ current_roll ].length > 2 ) {
							html += this.roll_set_count_rolls[ results_set_count ].base_rolls[ current_roll ].substring(
								0,
								this.roll_set_count_rolls[ results_set_count ].base_rolls[ current_roll ].length - 2
							);
						} else {
							html += this.roll_set_count_rolls[ results_set_count ].base_rolls[ current_roll ];
						}
					}

				}

				// print out wild die rolls if exists
				if(typeof(this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ]) != "undefined") {
					if(this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ].length > 0)
						html += "<br />" + this.label_wild_die_roll_number + ( current_roll  + 1) + " (d6): ";

					if( this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ] ) {
						if( this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ].length > 2 ) {
							html += this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ].substring(
								0,
								this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ].length - 2
							);
						} else {
							html += this.roll_set_count_rolls[ results_set_count ].wild_die_rolls[ current_roll ];
						}
					}
				}

			}
		}

		return html;
	},
	trait_success_margin: function (roll, target_number, trait_set_count) {

		if (! target_number )
			target_number = this.success_target_number;

		value = roll/1 - target_number/1;

		html = "";


		if(typeof(trait_set_count) != "undefined" && this.roll_set_count_rolls[ trait_set_count ].critical_failure > 0) {
			html += "<span  class=\"color-red bolded uppercase\">" + this.label_critical_failure + "</span>";
		} else {
			if(value < 0) {
				html += "<span  class=\"color-red\">" + this.label_failure + "</span>";
			} else {
				raises = Math.floor(value/4);
				if(raises == 0) {
					html += this.label_success;
				} else {
					if( raises == 1) {
						html += "<span  class=\"color-green bolded\">" + this.label_success_with_a_raise + "</span>";
					} else {
						html += "<span  class=\"color-green bolded uppercase\">" + this.label_success_with_x_raises.replace("{raises}", raises) + "</span>";
					}
				}
			}
		}

		return html;
	},

	set_result_margins: function( input_target_number, input_base_toughness, input_armor, input_weapons_ap ) {
		this.success_target_number = input_target_number;
		this.success_base_toughness = input_base_toughness;
		this.success_armor = input_armor;
		this.success_weapons_ap = input_weapons_ap;
	},

	set_label: function( label_name, label_value ) {
		if( label_name == "no_effect") {
			this.label_no_effect = label_value;
			return label_value;
		}

		if( label_name == "total_roll") {
			this.label_total_roll = label_value;
			return label_value;
		}

		if( label_name == "shaken") {
			this.label_shaken = label_value;
			return label_value;
		}

		if( label_name == "shaken_and_a_wound") {
			this.label_shaken_and_a_wound = label_value;
			return label_value;
		}

		if( label_name == "shaken_and_x_wounds") {
			this.label_shaken_and_x_wounds = label_value;
			return label_value;
		}

		if( label_name == "critical_failure") {
			this.label_critical_failure = label_value;
			return label_value;
		}

		if( label_name == "roll_set_number") {
			this.label_roll_set_number = label_value;
			return label_value;
		}

		if( label_name == "failure") {
			this.label_failure = label_value;
			return label_value;
		}

		if( label_name == "success") {
			this.label_success = label_value;
			return label_value;
		}

		if( label_name == "success_with_a_raise") {
			this.label_success_with_a_raise = label_value;
			return label_value;
		}

		if( label_name == "success_with_x_raises") {
			this.label_success_with_x_raises = label_value;
			return label_value;
		}

		if( label_name == "die_roll_number") {
			this.label_die_roll_number = label_value;
			return label_value;
		}

		if( label_name == "wild_die_roll_number") {
			this.label_wild_die_roll_number = label_value;
			return label_value;
		}

		return null;
	},

	set_always_exploding_dice: function( new_value ) {
		this.always_exploding_dice = new_value;
		return this.always_exploding_dice;
	},

	damage_success_margin: function (roll, toughness, armor, armor_piercing) {

		if( !toughness )
			toughness = this.success_base_toughness;

		if( !armor )
			armor = this.success_armor;

		if( !armor_piercing )
			armor_piercing = this.success_weapons_ap;

		armor = armor/1 - armor_piercing/1;
		if(armor < 0)
			armor = 0;

		target_number = toughness/1 + armor/1;
		value = roll/1 - target_number/1;

		html = "";
		if(value < 0) {
			html += "<span>" + this.label_no_effect + "</span>";
		} else {
			raises = Math.floor(value/4);
			if(raises == 0) {
				html += "<span class=\"color-orange\">" + this.label_shaken + "</span>";
			} else {
				if( raises == 1) {
					html += "<span class=\"color-red\">" + this.label_shaken_and_a_wound + "</span>";
				} else {
					html += "<span class=\"color-red bolded uppercase\">" + this.label_shaken_and_x_wounds.replace("{raises}", raises) + "</span>";
				}
			}
		}
		return html;
	}
}


function Mech (type) {
	this.mech_type = mechTypeOptions[0];
	this.tech = btTechOptions[0];
	this.era = btEraOptions[1]; // Default to Succession Wars
	this.make = "";
	this.model = "";
	this.uuid = "";
	this.tonnage = 20;
	this.useLang = this.useLang;

	this.armorType = mechArmorTypes[0];

	this.max_armor = 0;

	this.selectedInternalStructure = mechInternalStructureTypes[0];

	this.internalStructure = {};

	this.internalStructure.head = 0;

	this.internalStructure.centerTorso = 0;
	this.internalStructure.leftTorso = 0;
	this.internalStructure.rightTorso = 0;

	this.small_cockpit = false;
	this.cockpit_weight = 3;

	this.internalStructure.rightArm = 0;
	this.internalStructure.leftArm = 0;

	this.totalInternalStructurePoints = 0;

	this.max_move_heat = 2;
	this.max_weapon_heat = 0;
	this.heat_dissipation = 0;

	this.internalStructure.rightLeg = 0;
	this.internalStructure.leftLeg = 0;

	this.additional_heat_sinks = 0;

	this.armorWeight = 0;
	this.total_armor = 0;
	this.unallocated_armor = 0;

	this.armorAllocation = {};

	this.heatSinkType = mechHeatSinkTypes[0];

	this.armorAllocation.head = 0;

	this.armorAllocation.centerTorso = 0;
	this.armorAllocation.leftTorso = 0;
	this.armorAllocation.rightTorso = 0;

	this.armorAllocation.centerTorsoRear = 0;
	this.armorAllocation.leftTorsoRear = 0;
	this.armorAllocation.rightTorsoRear = 0;

	this.armorAllocation.rightArm = 0;
	this.armorAllocation.leftArm = 0;

	this.armorAllocation.rightLeg = 0;
	this.armorAllocation.leftLeg = 0;

	this.armorAllocation.head = 0;

	this.equipmentList = Array();

	this.criticalAllocationTable = Array();

	this.weights = Array();

	this.strictEra = 1;

	this.unallocatedCriticals = Array();

	this.criticals = {};

	this.criticals.head = Array();

	this.criticals.centerTorso = Array();
	this.criticals.leftTorso = Array();
	this.criticals.rightTorso = Array();

	this.criticals.rightArm = Array();
	this.criticals.leftArm = Array();

	this.criticals.rightLeg = Array();
	this.criticals.leftLeg = Array();

	this.weights = Array();

	this.gyro = mechGyroTypes[0];

	this.engine = 0;
	this.engineType = mechEngineTypes[0];
	this.jumpJetType = mechJumpJetTypes[0];

	this.walkSpeed = 0;
	this.runSpeed = 0;
	this.jumpSpeed = 0;

	this.max_armor_tonnage = 0;

	this.cbillCost = "n/a";
	this.battleValue = "n/a";
	this.alphaStrikeValue = "n/a";

	this.calcLogBV = "";
	this.calcLogAS = "";
	this.calcLogCBill = "";

	this.validJJLocations = [
		{
			long: "leftTorso",
			short: "lt"
		},
		{
			long: "leftLeg",
			short: "ll"
		},
		{
			long:  "rightLeg",
			short: "rl"
		},
		{
			long:  "rightTorso",
			short: "rt"
		},
		{
			long:  "centerTorso",
			short: "ct"
		},
	];

	this.pilot = {
		name: "",
		piloting: 5,
		gunnery: 4,
		wounds: 0
	};

	this.alphaStrikeForceStats = {
		name: "",
		size: "",
		move: "",
		customName: "",
		role: "Brawler",
		jumpMove: "",
		pv: "",
		damage: {
			short: 0,
			medium: 0,
			long: 0,
			extreme: 0
		},
		armor: "",
		structure: "",
		size: 0,
		skill: 4,
		overheat: 0,
		notes: "",
		tmm: 0
	}
}

Mech.prototype._calcAlphaStrike = function() {

	this.alphaStrikeForceStats.name  = this.name;
	//~ this.alphaStrikeForceStats.model  = this.model;
	this.alphaStrikeForceStats.move  = this.getWalkSpeed() * 2;
	this.alphaStrikeForceStats.jumpMove  = this.getJumpSpeed() * 2;
	this.alphaStrikeForceStats.pv = 0;
	this.alphaStrikeForceStats.damage.short = 0;
	this.alphaStrikeForceStats.damage.medium = 0;
	this.alphaStrikeForceStats.damage.long = 0;
	this.alphaStrikeForceStats.damage.extreme = 0;
	this.alphaStrikeForceStats.armor = 0;
	this.alphaStrikeForceStats.structure = 0;
	this.alphaStrikeForceStats.skill = 4;
	this.alphaStrikeForceStats.ov = 0;
	this.alphaStrikeForceStats.notes = "";
	this.alphaStrikeForceStats.size_class = "";
	this.alphaStrikeForceStats.size_class_name = "";
	this.alphaStrikeForceStats.special_unit_abilities = Array();
	this.alphaStrikeForceStats.overheat = 0;
	this.alphaStrikeForceStats.longHeat = 0;
	this.alphaStrikeForceStats.abilityCodes = Array()

	this.alphaStrikeForceStats.getAbilityCode = function( abilityCode ) {
		for( var abiC = 0; abiC < this.alphaStrikeForceStats.abilityCodes.length; abiC++ ) {
			if( abilityCode.toLowerCase().trim() == this.alphaStrikeForceStats.abilityCodes[ abiC ].toLowerCase().trim() ) {
				return this.alphaStrikeForceStats.abilityCodes[ abiC ];
			}
		}

		return null;
	}

	this.alphaStrikeForceStats.addAbilityCode = function( abilityCode, abilityValue ) {

		 this.alphaStrikeForceStats.abilityCodes.push(
			{
				code: abilityCode,
				value: abilityValue
			}
		);


	}


	this.calcLogAS = "";

	// TODO - calculations
	this.calcLogAS += "Tonnage is " + this.tonnage + "<br />\n";
	if( this.tonnage > 100) {
		this.alphaStrikeForceStats.size_class = 4;
		this.alphaStrikeForceStats.size_class_name = "Superheavy";
		this.alphaStrikeForceStats.special_unit_abilities.push("LG");
		this.calcLogAS += "<strong>Setting Size to 4 (Superheavy)</strong><br />\n";
	} else if( this.tonnage >= 80) {
		this.alphaStrikeForceStats.size_class = 4;
		this.alphaStrikeForceStats.size_class_name = "Assault";
		this.calcLogAS += "<strong>Setting Size to 4 (Assault)</strong><br />\n";
	} else if( this.tonnage >= 60) {
		this.alphaStrikeForceStats.size_class = 3;
		this.alphaStrikeForceStats.size_class_name = "Heavy";
		this.calcLogAS += "<strong>Setting Size to 3 (Heavy)</strong><br />\n";
	} else if( this.tonnage >= 40) {
		this.alphaStrikeForceStats.size_class = 2;
		this.alphaStrikeForceStats.size_class_name = "Medium";
		this.calcLogAS += "<strong>Setting Size to 2 (Medium)</strong><br />\n";
	} else {
		this.alphaStrikeForceStats.size_class = 1;
		this.alphaStrikeForceStats.size_class_name = "Light";
		this.calcLogAS += "<strong>Setting Size to 1 (Light)</strong><br />\n";
	}

	this.alphaStrikeForceStats.armor = ( this.getTotalArmor() / 30).toFixed(0);
	this.calcLogAS += "Converting total armor of " + this.getTotalArmor() + "<br />\n";
	this.calcLogAS += "<strong>Setting Armor to " + this.alphaStrikeForceStats.armor + "</strong><br />\n";

	if( this.getTech().tag == "is") {


		switch( this.engineType.tag ) {
			case "compact":
				// Compact

				if( this.tonnage == 100) {
					this.alphaStrikeForceStats.structure = 10;
				} else if( this.tonnage >= 95 ) {
					this.alphaStrikeForceStats.structure = 10;
				} else if( this.tonnage >= 90 ) {
					this.alphaStrikeForceStats.structure = 10;
				} else if( this.tonnage >= 85 ) {
					this.alphaStrikeForceStats.structure = 9;
				} else if( this.tonnage >= 80 ) {
					this.alphaStrikeForceStats.structure = 8;
				} else if( this.tonnage >= 75 ) {
					this.alphaStrikeForceStats.structure = 8;
				} else if( this.tonnage >= 70 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 65 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 60 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 55 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 50 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 45 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 40 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 35 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 30 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 25 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 20 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 15 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 10 ) {
					this.alphaStrikeForceStats.structure = 1;
				}
				this.calcLogAS += "Engine is an IS Compact Engine <strong>setting structure to " + this.alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			case "xl":
				// XL
				if( this.tonnage == 100) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 95 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 90 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 85 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 80 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 75 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 70 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 65 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 60 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 55 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 50 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 45 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 40 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 35 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 30 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 25 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 20 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 15 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 10 ) {
					this.alphaStrikeForceStats.structure = 1;
				}
				this.calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + this.alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			case "light":
				// Compact
				if( this.tonnage == 100) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 95 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 90 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 85 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 80 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 75 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 70 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 65 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 60 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 55 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 50 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 45 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 40 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 35 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 30 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 25 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 20 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 15 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 10 ) {
					this.alphaStrikeForceStats.structure = 1;
				}
				this.calcLogAS += "Engine is an IS Light Engine <strong>setting structure to " + this.alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			default:
				// Standard
				if( this.tonnage == 100) {
					this.alphaStrikeForceStats.structure = 8;
				} else if( this.tonnage >= 95 ) {
					this.alphaStrikeForceStats.structure = 8;
				} else if( this.tonnage >= 90 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 85 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 80 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 75 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 70 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 65 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 60 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 55 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 50 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 45 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 40 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 35 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 30 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 25 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 20 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 15 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 10 ) {
					this.alphaStrikeForceStats.structure = 1;
				}
				this.calcLogAS += "Engine is an IS Standard Engine <strong>setting structure to " + this.alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
		}
	} else {
		// Clan Engines...
		switch( this.engineType.tag ) {
			case "xl":
			case "clan-xl":
				// Compact
				if( this.tonnage == 100) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 95 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 90 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 85 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 80 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 75 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 70 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 65 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 60 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 55 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 50 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 45 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 40 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 35 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 30 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 25 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 20 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 15 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 10 ) {
					this.alphaStrikeForceStats.structure = 1;
				}
				this.calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + this.alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			default:
				// Standard / Standard Fusion
				if( this.tonnage == 100) {
					this.alphaStrikeForceStats.structure = 8;
				} else if( this.tonnage >= 95 ) {
					this.alphaStrikeForceStats.structure = 8;
				} else if( this.tonnage >= 90 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 85 ) {
					this.alphaStrikeForceStats.structure = 7;
				} else if( this.tonnage >= 80 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 75 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 70 ) {
					this.alphaStrikeForceStats.structure = 6;
				} else if( this.tonnage >= 65 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 60 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 55 ) {
					this.alphaStrikeForceStats.structure = 5;
				} else if( this.tonnage >= 50 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 45 ) {
					this.alphaStrikeForceStats.structure = 4;
				} else if( this.tonnage >= 40 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 35 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 30 ) {
					this.alphaStrikeForceStats.structure = 3;
				} else if( this.tonnage >= 25 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 20 ) {
					this.alphaStrikeForceStats.structure = 2;
				} else if( this.tonnage >= 15 ) {
					this.alphaStrikeForceStats.structure = 1;
				} else if( this.tonnage >= 10 ) {
					this.alphaStrikeForceStats.structure = 1;
				}
				this.calcLogAS += "Engine is a Clan Standard Engine <strong>setting structure to " + this.alphaStrikeForceStats.structure + "</strong><br />\n";

				break;
		}
	}

	// Heat Modified Damage, p115 AS companion
	var total_weapon_heat = 0;
	var total_weapon_heat_long = 0;
	var has_explosive = false;

	var lrmDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0

	}

	var heatDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	}

	var flakDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	}

	var acDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	}

	var srmDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	}

	var mslDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	}

	var rearDamage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	}

	var indirectFireRating = 0;

	for( weapon_counter = 0; weapon_counter < this.equipmentList.length; weapon_counter++) {
		if( this.equipmentList[weapon_counter].alpha_strike ) {
			if( this.equipmentList[weapon_counter].alpha_strike.range_long > 0){
				total_weapon_heat_long += this.equipmentList[weapon_counter].alpha_strike.heat;
			}



			if( this.equipmentList[weapon_counter].explosive )
				has_explosive = true;

			if( this.equipmentList[weapon_counter].rear ) {
				this.calcLogAS += "Adding <strong>rear</strong> Weapon " + this.equipmentList[weapon_counter].tag + " - ";
				this.calcLogAS += " (" + this.equipmentList[weapon_counter].alpha_strike.range_short + ", ";
				this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
				this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_long + ", ";
				this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";
				rearDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
				rearDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
				rearDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
				rearDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
			} else {

				this.alphaStrikeForceStats.damage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
				this.alphaStrikeForceStats.damage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
				this.alphaStrikeForceStats.damage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
				this.alphaStrikeForceStats.damage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;

				this.calcLogAS += "Adding Weapon " + this.equipmentList[weapon_counter].tag + " - ";
				this.calcLogAS += " (" + this.equipmentList[weapon_counter].alpha_strike.range_short + ", ";
				this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
				this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_long + ", ";
				this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";
				total_weapon_heat += this.equipmentList[weapon_counter].alpha_strike.heat;

			}

			if( this.equipmentList[weapon_counter].notes && this.equipmentList[weapon_counter].notes.length > 0) {
				for( var nC = 0; nC < this.equipmentList[weapon_counter].notes.length; nC++) {
					if( this.alphaStrikeForceStats.abilityCodes.indexOf( this.equipmentList[weapon_counter].notes[nC] ) === -1) {
						this.alphaStrikeForceStats.abilityCodes.push( this.equipmentList[weapon_counter].notes[nC] );
					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "heat" ) {
						heatDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
						heatDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
						heatDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
						heatDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "lrm" ) {
						lrmDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
						lrmDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
						lrmDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
						lrmDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "ac" ) {
						acDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
						acDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
						acDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
						acDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "flak" ) {
						flakDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
						flakDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
						flakDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
						flakDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "srm" ) {

						indirectFireRating += this.equipmentList[weapon_counter].alpha_strike.range_long;

					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "indirect fire" || this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "if") {
						srmDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
						srmDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
						srmDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
						srmDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "missile"  || this.equipmentList[weapon_counter].notes[nC].toLowerCase() == "msl" ) {
						mslDamage.short += this.equipmentList[weapon_counter].alpha_strike.range_short;
						mslDamage.medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
						mslDamage.long += this.equipmentList[weapon_counter].alpha_strike.range_long;
						mslDamage.extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
					}


				}

			}
		}
	}

	var move_heat = 0;
	if( this.getJumpSpeed() > 0 ) {
		if( this.getJumpSpeed() < 3 )
			move_heat += 3;
		else
			move_heat += this.getJumpSpeed();

		this.calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"/" + this.getJumpSpeed() * 2 + "\"J</strong><br />\n";
	} else {
		move_heat += 2;
		this.calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"</strong><br />\n";
	}

	// if there are no explosive components, then the mech gets the ENE ability :)
	if( !has_explosive ) {
		this.alphaStrikeForceStats.abilityCodes.push("ENE");
		this.calcLogAS += "Mech has no explosive components, gets ENE ability<br />\n";
	}

	var heat_dissipation = 0;

	heat_dissipation += (10 + this.additional_heat_sinks) * this.heatSinkType.dissipation;


	var max_heat_output = move_heat + total_weapon_heat;
	var overheat_value = move_heat + total_weapon_heat - heat_dissipation;
	var long_overheat_value = move_heat + total_weapon_heat_long - heat_dissipation;

	//~ var before_heat_range_short = this.alphaStrikeForceStats.damage.short.toFixed(0) /1;
	//~ var before_heat_range_medium = this.alphaStrikeForceStats.damage.medium.toFixed(0) /1;
	//~ var before_heat_range_long = this.alphaStrikeForceStats.damage.long.toFixed(0) /1;
	//~ var before_heat_range_extreme = this.alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

	//~ this.alphaStrikeForceStats.heat_damage = this.alphaStrikeForceStats.damage;

	var final_overheat_value = 0;
	if( overheat_value > 3) {
		// Heat Modified Damage, p115 AS companion
		var heat_damage_short = 0;
		var heat_damage_medium = 0;
		if( this.alphaStrikeForceStats.damage.short != "0*")
			heat_damage_short = Math.ceil( (this.alphaStrikeForceStats.damage.short * heat_dissipation ) / (max_heat_output - 4) );
		if( this.alphaStrikeForceStats.damage.medium != "0*")
			heat_damage_medium =  Math.ceil( (this.alphaStrikeForceStats.damage.medium * heat_dissipation ) / (max_heat_output - 4) );


		if( this.alphaStrikeForceStats.damage.short != "0*")
			this.alphaStrikeForceStats.damage.short = Math.ceil( this.alphaStrikeForceStats.damage.short );
		if( this.alphaStrikeForceStats.damage.medium != "0*")
			this.alphaStrikeForceStats.damage.medium =  Math.ceil( this.alphaStrikeForceStats.damage.medium );
		//~ if( this.alphaStrikeForceStats.damage.short != "0*")
			//~ this.alphaStrikeForceStats.damage.long = Math.ceil( this.alphaStrikeForceStats.damage.long );
		//~ if( this.alphaStrikeForceStats.damage.medium != "0*")
			//~ this.alphaStrikeForceStats.damage.extreme =  Math.ceil( this.alphaStrikeForceStats.damage.extreme );


		//~ console.log( "damage.short", this.alphaStrikeForceStats.damage.short );
		//~ console.log( "heat_damage_short", heat_damage_short );
		//~ console.log( "damage.medium", this.alphaStrikeForceStats.damage.medium );
		//~ console.log( "heat_damage_medium", heat_damage_medium );


		if(  this.alphaStrikeForceStats.damage.medium != "0*" && heat_damage_medium < this.alphaStrikeForceStats.damage.medium ) {
			final_overheat_value =  this.alphaStrikeForceStats.damage.medium - heat_damage_medium ;
			this.alphaStrikeForceStats.damage.medium = this.alphaStrikeForceStats.damage.medium - final_overheat_value;
			this.alphaStrikeForceStats.damage.short = this.alphaStrikeForceStats.damage.short - final_overheat_value;
		}
		//~ console.log( "final_overheat_value", final_overheat_value );



	} else {
		if( this.alphaStrikeForceStats.damage.short != "0*")
			this.alphaStrikeForceStats.damage.short = Math.ceil( this.alphaStrikeForceStats.damage.short );
		if( this.alphaStrikeForceStats.damage.medium != "0*")
			this.alphaStrikeForceStats.damage.medium =  Math.ceil( this.alphaStrikeForceStats.damage.medium );
		//~ if( this.alphaStrikeForceStats.damage.short != "0*")
			//~ this.alphaStrikeForceStats.damage.long = Math.ceil( this.alphaStrikeForceStats.damage.long );
		//~ if( this.alphaStrikeForceStats.damage.medium != "0*")
			//~ this.alphaStrikeForceStats.damage.extreme =  Math.ceil( this.alphaStrikeForceStats.damage.extreme );

	}

	var final_long_overheat_value = 0;

	//~ console.log( "this.alphaStrikeForceStats.damage", this.alphaStrikeForceStats.damage );

	if( long_overheat_value > 4) {

		//~ console.log( "long_overheat_value", long_overheat_value );

		if( this.alphaStrikeForceStats.damage.long != "0*") {
			//~ this.alphaStrikeForceStats.heat_damage.long = this.alphaStrikeForceStats.damage.long;
			var heat_damage_long = this.alphaStrikeForceStats.damage.long;
			var heat_damage_extreme = this.alphaStrikeForceStats.damage.extreme;

			this.alphaStrikeForceStats.damage.long = Math.ceil( ( this.alphaStrikeForceStats.damage.long * heat_dissipation ) / (total_weapon_heat_long - 4) );
			this.alphaStrikeForceStats.damage.extreme = Math.ceil( ( this.alphaStrikeForceStats.damage.long * heat_dissipation ) / (total_weapon_heat_long - 4) );

			//~ console.log( "damage.long", this.alphaStrikeForceStats.damage.long );
			//~ console.log( "heat_dissipation", heat_dissipation );
			//~ console.log( "heat_damage_long", heat_damage_long );
			//~ console.log( "total_weapon_heat_long", total_weapon_heat_long );



			if( heat_damage_long > this.alphaStrikeForceStats.damage.long) {
				var final_long_overheat_value = heat_damage_long - this.alphaStrikeForceStats.damage.long;
				this.alphaStrikeForceStats.damage.long = heat_damage_long - final_long_overheat_value;
				this.alphaStrikeForceStats.damage.extreme = heat_damage_extreme - final_long_overheat_value;
			}

			//~ console.log( "final_long_overheat_value", final_long_overheat_value );
			//~ console.log( "damage.long", this.alphaStrikeForceStats.damage.long );

		}
	} else {
		//~ if( this.alphaStrikeForceStats.damage.short != "0*")
			//~ this.alphaStrikeForceStats.damage.short = Math.ceil( this.alphaStrikeForceStats.damage.short );
		//~ if( this.alphaStrikeForceStats.damage.medium != "0*")
			//~ this.alphaStrikeForceStats.damage.medium =  Math.ceil( this.alphaStrikeForceStats.damage.medium );
		if( this.alphaStrikeForceStats.damage.short != "0*")
			this.alphaStrikeForceStats.damage.long = Math.ceil( this.alphaStrikeForceStats.damage.long );
		if( this.alphaStrikeForceStats.damage.medium != "0*")
			this.alphaStrikeForceStats.damage.extreme =  Math.ceil( this.alphaStrikeForceStats.damage.extreme );

	}

	if( final_long_overheat_value > 0 ) {
		this.alphaStrikeForceStats.abilityCodes.push( "OVL " + final_long_overheat_value);

	}

	//~ this.alphaStrikeForceStats.damage.short = this.alphaStrikeForceStats.damage.short.toFixed(0) /1;
	//~ this.alphaStrikeForceStats.damage.medium = this.alphaStrikeForceStats.damage.medium.toFixed(0) /1;
	//~ this.alphaStrikeForceStats.damage.long = this.alphaStrikeForceStats.damage.long.toFixed(0) /1;
	//~ this.alphaStrikeForceStats.damage.extreme = this.alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

	//~ console.log( "this.alphaStrikeForceStats.damage", this.alphaStrikeForceStats.damage);
	this.alphaStrikeForceStats.damage = this._adjustASDamage( this.alphaStrikeForceStats.damage, true );
	//~ console.log( "this.alphaStrikeForceStats.damage", this.alphaStrikeForceStats.damage);

	// Determine Overheat Values - p116 AS Companion
	//~ var final_overheat_value = 0;


	//~ if( this.alphaStrikeForceStats.damage.medium != "0*" && before_heat_range_medium - this.alphaStrikeForceStats.damage.medium > 0) {
		//~ final_overheat_value = before_heat_range_medium - this.alphaStrikeForceStats.damage.medium;
	//~ } else {
		//~ // try short range bracket since the med range is low.
		//~ if( this.alphaStrikeForceStats.damage.short != "0*" )
			//~ final_overheat_value = before_heat_range_short - this.alphaStrikeForceStats.damage.short;
	//~ }
	//~ if( final_overheat_value > 4 )
		//~ final_overheat_value = 4;

	// Determine Overheat Values - ASC - p116
	//~ var final_long_overheat_value = 0;
	//~ if( this.alphaStrikeForceStats.damage.long != "0*" && before_heat_range_long - this.alphaStrikeForceStats.damage.long > 0) {
		//~ final_long_overheat_value = before_heat_range_long - this.alphaStrikeForceStats.damage.long;
	//~ }

	if( final_long_overheat_value > 4 )
		final_long_overheat_value = 4;

	this.alphaStrikeForceStats.ov = final_overheat_value;

	this.calcLogAS += "Move Heat: " + move_heat + "<br />\n";
	this.calcLogAS += "Weapon Heat: " + total_weapon_heat + "<br />\n";
	this.calcLogAS += "Long Weapon Heat: " + total_weapon_heat_long + "<br />\n";
	this.calcLogAS += "Heat Dissipation: " + heat_dissipation + "<br />\n";

	this.calcLogAS += "Overheat Value: " + overheat_value + "<br />\n";
	this.calcLogAS += "Long Overheat Value: " + long_overheat_value + "<br />\n";

	this.calcLogAS += "<strong>Short Damage: " + this.alphaStrikeForceStats.damage.short + "</strong><br />\n";
	this.calcLogAS += "<strong>Medium Damage: " + this.alphaStrikeForceStats.damage.medium + "</strong><br />\n";
	this.calcLogAS += "<strong>Long Damage: " + this.alphaStrikeForceStats.damage.long + "</strong><br />\n";
	this.calcLogAS += "<strong>Extreme Damage: " + this.alphaStrikeForceStats.damage.extreme + "</strong><br />\n";

	// Overheat Value is
	this.calcLogAS += "<strong>Final Overheat Value: " + final_overheat_value + "</strong><br />\n";
	this.calcLogAS += "<strong>Final Long Overheat Value: " + final_long_overheat_value + "</strong><br />\n";

	this.alphaStrikeForceStats.overheat = final_overheat_value;
	this.alphaStrikeForceStats.longOverheat = final_long_overheat_value;

	/* *********************************
	 *
	 * Alpha Strike Point Value ASC - p138
	 *
	 * ******************************** */

	this.alphaStrikeForceStats.pv = 0;
	this.calcLogAS += "<div class=\"text-center\"><strong> - Calculating Point Value - </strong></div>\n";
	/* *********************************
	 * Step 1: Determine Unit’s Offensive Value ASC - p138
	 * ******************************** */

	this.calcLogAS += "<strong>Step 1: Determine Unit’s Offensive Value ASC - p138</strong><br />\n";
	var offensive_value = 0;
	// Attack Damage Factor
	if( this.alphaStrikeForceStats.damage.short != "0*" && this.alphaStrikeForceStats.damage.short != "-" )
		offensive_value += this.alphaStrikeForceStats.damage.short;
	if( this.alphaStrikeForceStats.damage.medium != "0*" && this.alphaStrikeForceStats.damage.medium != "-" )
		offensive_value += this.alphaStrikeForceStats.damage.medium;
	if( this.alphaStrikeForceStats.damage.long != "0*" &&  this.alphaStrikeForceStats.damage.long != "-" )
		offensive_value += this.alphaStrikeForceStats.damage.long;
	if( this.alphaStrikeForceStats.damage.extreme != "0*" && this.alphaStrikeForceStats.damage.extreme != "-" )
		offensive_value += this.alphaStrikeForceStats.damage.extreme;

	this.calcLogAS += "Attack Damage Factor: " + offensive_value + " ( " + this.alphaStrikeForceStats.damage.short + " + " + this.alphaStrikeForceStats.damage.medium + " + " + this.alphaStrikeForceStats.damage.long + " + " + this.alphaStrikeForceStats.damage.extreme + " )<br />\n";

	// Unit Size Factor
	offensive_value += this.alphaStrikeForceStats.size_class / 2;
	this.calcLogAS += "Unit Size Factor: " + (this.alphaStrikeForceStats.size_class / 2) + " (" + this.alphaStrikeForceStats.size_class + " / 2))<br />\n";

	// Overheat Factor
	var overHeatFactor = 0;
	if( this.alphaStrikeForceStats.ov > 1 ) {
		offensive_value += 1;
		offensive_value += ( this.alphaStrikeForceStats.ov - 1 ) / 2;
		overHeatFactor += 1;
		overHeatFactor +=  ( this.alphaStrikeForceStats.ov - 1 ) / 2;
	} else {
		offensive_value += this.alphaStrikeForceStats.ov;
		overHeatFactor += this.alphaStrikeForceStats.ov;

	}

	this.calcLogAS += "Overheat Factor: " + overHeatFactor + "<br />\n";


	// Offensive Special Ability Factor
	// TODO

	/* *********************************
	 * Step 1a: Apply Blanket Offensive Modifiers ASC - p139
	 * ******************************** */
	this.calcLogAS += "<strong>Step 1a: Apply Blanket Offensive Modifiers ASC - p139</strong><br />\n";
	// TODO

	/* *********************************
	 * Step 2: Determine Unit’s Defensive Value ASC - p139
	 * ******************************** */
	this.calcLogAS += "<strong>Step 2: Determine Unit’s Defensive Value ASC - p139</strong><br />\n";
	var defensive_value = 0;

	// Movement Factor:
	var movementDefenseValue = 0;
	var bestMovement = 0;
	if( this.alphaStrikeForceStats.move > this.alphaStrikeForceStats.jumpMove ) {
		movementDefenseValue += this.alphaStrikeForceStats.move * .25;
		bestMovement = this.alphaStrikeForceStats.move;
	} else {
		movementDefenseValue += this.alphaStrikeForceStats.jumpMove * .25;
		bestMovement = this.alphaStrikeForceStats.move;
	}
	defensive_value += movementDefenseValue;

	if(this.alphaStrikeForceStats.jumpMove > 0 ) {
		movementDefenseValue += .5;
		this.calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25 + .5)<br />\n";
	} else {
		this.calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25)<br />\n";
	}



	if(
		rearDamage.short > 0
			||
		rearDamage.medium > 0
			||
		rearDamage.long > 0
	) {
		this.alphaStrikeForceStats.abilityCodes.push("Rear");
	}

	for( var aC = 0; aC < this.alphaStrikeForceStats.abilityCodes.length; aC++ ) {

		// Replace Heat with Heat X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "heat" ) {
			heatDamage = this._adjustASDamage( heatDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "Heat " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long;
			highestDamage = this._getHighestDamage( heatDamage );
			offensive_value += highestDamage;
			if( heatDamage.medium != "-" && heatDamage.medium > 0 )
				offensive_value += .5;

			this.calcLogAS += "<strong>Adding</strong> Heat Ability: " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long + "<br />\n";
			this.calcLogAS += "Adding Heat Damage Factor to PV: " + highestDamage + "<br />\n";
			if( heatDamage.medium != "-" && heatDamage.medium > 0 )
				this.calcLogAS += "Adding Heat Medium Damage Bonus to PV: 0,5<br />\n";
		}

		// Replace LRM with LRM X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "lrm" ) {
			lrmDamage = this._adjustASDamage( lrmDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "LRM " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long;
			this.calcLogAS += "<strong>Adding</strong> LRM Ability: " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long + "<br />\n";

		}


		// Replace Flak with Flak X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "flak" ) {
			flakDamage = this._adjustASDamage( flakDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "Flak " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long;
			this.calcLogAS += "<strong>Adding</strong> Flak Ability: " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long + "<br />\n";
		}


		// Replace AC with AC X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "ac" ) {
			acDamage = this._adjustASDamage( acDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "AC " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long;
			this.calcLogAS += "<strong>Adding</strong> AC Ability: " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long + "<br />\n";
		}


		// Replace SRM with SRM X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "srm" ) {
			srmDamage = this._adjustASDamage( srmDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "SRM " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long;
			this.calcLogAS += "<strong>Adding</strong> SRM Ability: " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long + "<br />\n";
		}

		// Replace Missile with Missile X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "missile" ||  this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "msl"  ) {
			mslDamage = this._adjustASDamage( mslDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "MSL " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long;
			this.calcLogAS += "<strong>Adding</strong> Missile Ability: " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long + "<br />\n";
		}

		// Replace Rear with Rear X/X/X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "rear" ) {
			rearDamage = this._adjustASDamage( rearDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "Rear " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long;
			this.calcLogAS += "<strong>Adding</strong> Rear Ability: " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long + "<br />\n";
		}

		// Replace IndirectFire with IF X
		if( this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "indirect fire" || this.alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "if" ) {
			rearDamage = this._adjustASDamage( rearDamage );
			this.alphaStrikeForceStats.abilityCodes[ aC ] = "IF " + indirectFireRating;
			this.calcLogAS += "<strong>Adding</strong> IF Ability: " + indirectFireRating + "<br />\n";
			offensive_value += highestDamage;
			this.calcLogAS += "Adding IF Rating to PV: " + indirectFireRating + "<br />\n";

		}

	}

	// Defensive Special Abilities Factor
	// TODO

	// Defensive Interaction Rating
	// TODO

	/* *********************************
	 * Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141
	 * ******************************* */
	this.calcLogAS += "<strong>Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141</strong><br />\n";
	var bmDIR = 0;
	// Armor Factor
	this.calcLogAS += "Armor Factor: " + (this.alphaStrikeForceStats.armor * 2) + " (" + this.alphaStrikeForceStats.armor + " * 2)<br />\n";
	bmDIR += this.alphaStrikeForceStats.armor * 2;  // No need to do other types of armor, since this is BM only.

	// Structure Factor
	this.calcLogAS += "Structure Factor: " + (this.alphaStrikeForceStats.structure * 1) + " (" + this.alphaStrikeForceStats.structure + " * 1)<br />\n";
	bmDIR += this.alphaStrikeForceStats.structure * 1; // TODO IndustrialMechs

	// Defense Factor

	if( bestMovement > 34 ) {
		this.calcLogAS += "Defense Factor: +5 (movement 35\"+)<br />\n";
		bmDIR += 5;
	} else if( bestMovement > 18 ) {
		this.calcLogAS += "Defense Factor: +4 (movement 19\"-34\"+)<br />\n";
		bmDIR += 4;
	} else if( bestMovement > 12 ) {
		this.calcLogAS += "Defense Factor: +3 (movement 13\"-18\"+)<br />\n";
		bmDIR += 3;
	} else if( bestMovement > 8 ) {
		this.calcLogAS += "Defense Factor: +2 (movement 9\"-12\"+)<br />\n";
		bmDIR += 2;
	} else if( bestMovement > 4 ) {
		this.calcLogAS += "Defense Factor: +1 (movement 4\"-8\"+)<br />\n";
		bmDIR += 1;
	} else {
		this.calcLogAS += "Defense Factor: +0 (movement 0\"-4\"+)<br />\n";
		bmDIR += 0;
	}

	bmDIR += defensive_value;
	this.calcLogAS += "Adding Defense Value from Step 2 above: " + defensive_value + "<br />\n";
	// Calculate the DIR
	this.calcLogAS += "Total DIR: " + bmDIR + "<br />\n";

	/* *********************************
	 * Step 3: Determine Unit’s Final Point Value ASC - p141
	 *
	 * ******************************* */
	this.calcLogAS += "<strong>Step 3: Determine Unit’s Final Point Value ASC - p141</strong><br />\n";
	baseFinalValue = offensive_value + bmDIR;
	this.calcLogAS += "Base Point Value: " + baseFinalValue  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";

	finalValue = baseFinalValue;
	if(
		bestMovement >= 6
		&& bestMovement <= 10
		&& this.alphaStrikeForceStats.damage.medium == 0
		&& this.alphaStrikeForceStats.damage.long == 0
		&& this.alphaStrikeForceStats.damage.extreme == 0
	) {
		this.calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
		this.calcLogAS += "Modified Point Value: " + baseFinalValue * .75  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .75;
	}

	if(
		bestMovement >= 2
		&& bestMovement <= 5
		&& this.alphaStrikeForceStats.damage.medium == 0
		&& this.alphaStrikeForceStats.damage.long == 0
		&& this.alphaStrikeForceStats.damage.extreme == 0
	) {
		this.calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
		this.calcLogAS += "Modified Point Value: " + baseFinalValue * .5  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .5;
	}

	if(
		bestMovement >= 2
		&& bestMovement <= 5
		&& this.alphaStrikeForceStats.damage.long == 0
		&& this.alphaStrikeForceStats.damage.extreme == 0
	) {
		this.calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short and Medium ranges. Point Value * .75<br />\n";
		this.calcLogAS += "Modified Point Value: " + baseFinalValue * .75  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .75;
	}

	this.calcLogAS += "Final Point Value: " + finalValue + "<br />\n";

	/* *********************************
	 * Step 3a: Add Force Bonuses ASC - p141
	 * ******************************* */
	 this.calcLogAS += "<strong>Step 3a: Add Force Bonuses ASC - p141</strong><br />\n";
	// TODO
	this.calcLogAS += "<strong class=\"color-red\">TODO<br />\n";

	this.alphaStrikeForceStats.name = this.name;
	this.alphaStrikeForceStats.type = "BM";


	this.alphaStrikeValue = Math.round(finalValue)  + " (TODO / WIP)";
	var asMechData = [];
	asMechData["BFPointValue"] = Math.round(finalValue);

	asMechData["Name"] = this.getName();
	asMechData["BFThreshold"] = 0;
	asMechData["Role"] = { Name: this.alphaStrikeForceStats.role };
	asMechData["BFType"] = "BM";
	asMechData["BFSize"] = this.alphaStrikeForceStats.size_class;

	asMechData["BFArmor"] = this.alphaStrikeForceStats.armor;
	asMechData["BFStructure"] = this.alphaStrikeForceStats.structure;

	asMechData["BFOverheat"] = final_overheat_value;


	asMechData["BFDamageShort"] = this.alphaStrikeForceStats.damage.short;
	asMechData["BFDamageMedium"] = this.alphaStrikeForceStats.damage.medium;
	asMechData["BFDamageLong"] = this.alphaStrikeForceStats.damage.long;
	asMechData["BFDamageExtreme"] = this.alphaStrikeForceStats.damage.extreme;

	asMechData["BFOverheat"] = this.alphaStrikeForceStats.overheat;

	asMechData["customName"] = this.alphaStrikeForceStats.customName;
	asMechData["currentSkilll"] = this.pilot.gunnery;

	if( this.alphaStrikeForceStats.jumpMove ) {
		asMechData["BFMove"] = this.alphaStrikeForceStats.move.toString() + "\"/" + this.alphaStrikeForceStats.jumpMove + "\"J";
	} else {
		asMechData["BFMove"] = this.alphaStrikeForceStats.move.toString() + "\"";
	}

	this.alphaStrikeForceStats.abilityCodes.sort();
	asMechData["BFAbilities"] = this.alphaStrikeForceStats.abilityCodes.join(", ").toUpperCase();

	this.alphaStrikeForceStats = new asUnit( asMechData );

}

Mech.prototype._getHighestDamage = function( incomingDamageObject ) {
	returnValue = 0;
	for( var dC = 0; dC < incomingDamageObject.length; dC++ ) {
		if(
			incomingDamageObject[ dC ]
			&& incomingDamageObject[ dC ] != "-"
			&& incomingDamageObject[ dC ] != "0*"
		) {
			if( incomingDamageObject[ dC ] > returnValue ) {
				returnValue = incomingDamageObject[ dC ] / 1;
			}
		}
	}

	return returnValue;
}

Mech.prototype._adjustASDamage = function( incomingDamageObject, useZeros ) {
	if( typeof(useZeros) == "undefined")
		useZeros = false;

	if( incomingDamageObject.short == 0 ) {
		if( useZeros )
			incomingDamageObject.short = 0;
		else
			incomingDamageObject.short = "-";
	} else if ( incomingDamageObject.short < .5 ) {
		//~ if( useZeros )
			//~ incomingDamageObject.short = 0;
		//~ else
			incomingDamageObject.short = "0*";
	} else {
		incomingDamageObject.short = Math.round( incomingDamageObject.short );
	}

	if( incomingDamageObject.medium == 0 ) {
		if( useZeros )
			incomingDamageObject.medium = 0;
		else
			incomingDamageObject.medium = "-";
	} else if ( incomingDamageObject.medium < .5 ) {
		//~ if( useZeros )
			//~ incomingDamageObject.medium = 0;
		//~ else
			incomingDamageObject.medium = "0*";
	} else {
		incomingDamageObject.medium = Math.round( incomingDamageObject.medium );
	}

	if( incomingDamageObject.long == 0 ) {
		if( useZeros )
			incomingDamageObject.long = 0;
		else
			incomingDamageObject.long = "-";
	} else if ( incomingDamageObject.long < .5 ) {
		//~ if( useZeros )
			//~ incomingDamageObject.long = 0;
		//~ else
			incomingDamageObject.long = "0*";
	} else {
		incomingDamageObject.long = Math.round( incomingDamageObject.long );
	}

	if( incomingDamageObject.extreme == 0 ) {
		if( useZeros )
			incomingDamageObject.extreme = 0;
		else
			incomingDamageObject.extreme = "-";
	} else if ( incomingDamageObject.extreme < .5 ) {
		//~ if( useZeros )
			//~ incomingDamageObject.extreme = 0;
		//~ else
			incomingDamageObject.extreme = "0*";
	} else {
		incomingDamageObject.extreme = Math.round( incomingDamageObject.extreme );
	}

	return incomingDamageObject;
}

Mech.prototype._calcBattleValue = function() {

	this.battleValue = 0;
	this.calcLogBV = "";

	/* ***************************************************
	 *  STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302
	 * ************************************************ */
	 var defensiveBattleRating = 0;
	 this.calcLogBV += "<strong>STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302</strong><br />";
	 var totalArmorFactor = 2.5 * this.getTotalArmor();
	 this.calcLogBV += "Total Armor Factor = Armor Factor x 2.5: " + totalArmorFactor + " = 2.5 x " + this.getTotalArmor() + "<br />";


	// Get Armor Rating
	 switch( this.armorType ) {
		 case "commercial":
			this.calcLogBV += "Total Armor Factor = 0.5 * Total Armor Factor Modifier for Commercial Armor: " + totalArmorFactor + " x 0.5 = " + (totalArmorFactor * .5) + "<br />";
			totalArmorFactor = totalArmorFactor * 0.5;
			break;
		default:
			this.calcLogBV += "Total Armor Factor = 1.0 * Total Armor Factor Modifier for Non-Commercial Armor:  " + totalArmorFactor + " x 1 = " + (totalArmorFactor * 1) + "<br />";
			break;
	 }

	 // Get for Internal Structure Rating
	 var totalInternalStructurePoints = 1.5 * this.totalInternalStructurePoints;
	 this.calcLogBV += "Total Internal Structure Points = Internal Structure Points x 1.5: " + totalInternalStructurePoints + " = 1.5 x " + this.totalInternalStructurePoints + "<br />";

	 // Adjust IS for Type
	 switch( this.internalStructureType ) {
		 case "industrial":
			this.calcLogBV += "Total Internal Structure BV = 0.5 x I.S. BV for Industrial Internal Structure: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 0.5;
			break;
		 case "endo-steel":
			this.calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Endo-Steel Internal Structure: " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
		default:
			this.calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Standard Internal Structure:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
	 }

	// Adjust IS for Engine Type
	 switch( this.engineType ) {
		 case "light":
			this.calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Light Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * .75;
			break;
		 case "xl":
			if( this.getTech().tag == "clan" ) {
				// Clan XL
				this.calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Clan XL Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .5;
				break;
			} else {
				// Inner Sphere
				this.calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Inner Sphere XL Engine: " + totalInternalStructurePoints + " x 0.75 = " + (totalInternalStructurePoints * .75) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .75;
				break;
			}
		case "compact":
			this.calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Compact Engine:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
		default:
			this.calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Standard Engine:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
	 }




	// Add in the Gyro Modifier
	var totalGyroPoints = 0;
	 switch( this.internalStructureType ) {
		 case "compact":
			this.calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Compact Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 0.5;
			break;
		 case "xl":
			this.calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Extra Light Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 0.5;
			break;
		 case "heavy-duty":
			this.calcLogBV += "Total Gyro BV = 1 x Tonnage for Heavy Duty Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 1;
			break;
		default:
			this.calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Standard Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 0.5;
			break;
	 }

	// Get Explosive Ammo Modifiers - Tech Manual p302-303
	var explosiveAmmoModifiers = 0;
	this.calcLogBV += "<strong>Get Explosive Ammo Modifiers (TM p302-303)</strong><br />";


	var caseEnabled_HD = false;
	var caseEnabled_CT = false;
	var caseEnabled_RL= false;
	var caseEnabled_LL = false;
	var caseEnabled_RA = false;
	var caseEnabled_LA = false;
	var caseEnabled_RT = false;
	var caseEnabled_LT = false;

	for( var lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
		if( this.criticals.head[ lCrit ] && this.criticals.head[ lCrit ].tag == "case" ) {
			caseEnabled_HD = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
		if( this.criticals.centerTorso[ lCrit ] && this.criticals.centerTorso[ lCrit ].tag == "case" ) {
			caseEnabled_CT = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
		if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].tag == "case" ) {
			caseEnabled_RL = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
		if( this.criticals.leftLeg[ lCrit ] && this.criticals.leftLeg[ lCrit ].tag == "case" ) {
			caseEnabled_LL = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.rightArm.length; lCrit++) {
		if( this.criticals.rightArm[ lCrit ] && this.criticals.rightArm[ lCrit ].tag == "case" ) {
			caseEnabled_RA = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.leftArm.length; lCrit++) {
		if( this.criticals.leftArm[ lCrit ] && this.criticals.leftArm[ lCrit ].tag == "case" ) {
			caseEnabled_LA = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
		if( this.criticals.rightTorso[ lCrit ] && this.criticals.rightTorso[ lCrit ].tag == "case" ) {
			caseEnabled_RT = true;
		}
	}

	for( var lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
		if( this.criticals.leftTorso[ lCrit ] && this.criticals.leftTorso[ lCrit ].tag == "case" ) {
			caseEnabled_LT = true;
		}
	}

	if( this.tech.tag == "clan" ) {

		//Clan is Assumed to have CASE in BV Calculation (TM p303)

		// check head
		for( var lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
			if( this.criticals.head[ lCrit ] ) {
				if( this.criticals.head[ lCrit ] && this.criticals.head[ lCrit ].obj && this.criticals.head[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Head (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.head[ lCrit ] && this.criticals.head[ lCrit ].obj && this.criticals.head[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Head (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check ct
		for( var lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
			if( this.criticals.centerTorso[ lCrit ] ) {
				if( this.criticals.centerTorso[ lCrit ] && this.criticals.centerTorso[ lCrit ].obj && this.criticals.centerTorso[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Center Torso (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.centerTorso[ lCrit ] && this.criticals.centerTorso[ lCrit ].obj && this.criticals.centerTorso[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Center Torso (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check rl
		for( var lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
			if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.explosive ) {
				this.calcLogBV += "Explosive Ammo Crit in Right Leg (Clan, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.gauss ) {
				this.calcLogBV += "Gauss Crit in Right Leg (Clan, -1)<br />";
				explosiveAmmoModifiers += 1;
			}
		}

		// check ll
		for( var lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
			if( this.criticals.leftLeg[ lCrit ] && this.criticals.leftLeg[ lCrit ].obj && this.criticals.leftLeg[ lCrit ].obj.explosive ) {
				this.calcLogBV += "Explosive Ammo Crit in Left Leg (Clan, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this.criticals.leftLeg[ lCrit ] && this.criticals.leftLeg[ lCrit ].obj && this.criticals.leftLeg[ lCrit ].obj.gauss ) {
				this.calcLogBV += "Gauss Crit in Left Leg (Clan, -1)<br />";
				explosiveAmmoModifiers += 1;
			}
		}

	} else if( this.tech.tag == "is" ) {
		// check head
		for( var lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
			if( this.criticals.head[ lCrit ] ) {
				if( this.criticals.head[ lCrit ] && this.criticals.head[ lCrit ].obj && this.criticals.head[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Head (Inner Sphere,-15)<br />";
					explosiveAmmoModifiers += 15;
				}

			}
		}

		// check ct
		for( var lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
			if( this.criticals.centerTorso[ lCrit ] ) {
				if( this.criticals.centerTorso[ lCrit ] && this.criticals.centerTorso[ lCrit ].obj && this.criticals.centerTorso[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Center Torso (Inner Sphere,-15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.centerTorso[ lCrit ] && this.criticals.centerTorso[ lCrit ].obj && this.criticals.centerTorso[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Center Torso (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check rl
		for( var lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
			if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.explosive ) {
				this.calcLogBV += "Explosive Ammo Crit in Right Leg (Inner Sphere, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.gauss ) {
				this.calcLogBV += "Gauss Crit in Right Leg (Inner Sphere, -1)<br />";
				explosiveAmmoModifiers += 1;
			}

			if( caseEnabled_RT == false  && caseEnabled_RL == false) {
				if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check ll
		for( var lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
			if( this.criticals.leftLeg[ lCrit ] && this.criticals.leftLeg[ lCrit ].obj && this.criticals.leftLeg[ lCrit ].obj.explosive ) {
				this.calcLogBV += "Explosive Ammo Crit in Left Leg (Inner Sphere, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this.criticals.leftLeg[ lCrit ] && this.criticals.leftLeg[ lCrit ].obj && this.criticals.leftLeg[ lCrit ].obj.gauss ) {
				this.calcLogBV += "Gauss Crit in Left Leg (Inner Sphere, -1)<br />";
				explosiveAmmoModifiers += 1;
			}

			if( caseEnabled_LT == false  && caseEnabled_LL == false) {
				if( this.criticals.rightLeg[ lCrit ] && this.criticals.rightLeg[ lCrit ].obj && this.criticals.rightLeg[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.leftLeg[ lCrit ] && this.criticals.leftLeg[ lCrit ].obj && this.criticals.leftLeg[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

		}

		// check RA
		for( var lCrit = 0; lCrit < this.criticals.rightArm.length; lCrit++) {


			if( caseEnabled_RT == false  && caseEnabled_RA == false) {
				if( this.criticals.rightArm[ lCrit ] && this.criticals.rightArm[ lCrit ].obj && this.criticals.rightArm[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.rightArm[ lCrit ] && this.criticals.rightArm[ lCrit ].obj && this.criticals.rightArm[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

		}

		// check LA
		for( var lCrit = 0; lCrit < this.criticals.leftArm.length; lCrit++) {


			if( caseEnabled_LT == false  && caseEnabled_LA == false) {
				if( this.criticals.leftArm[ lCrit ] && this.criticals.leftArm[ lCrit ].obj && this.criticals.leftArm[ lCrit ].obj.explosive ) {
					this.calcLogBV += "Explosive Ammo Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this.criticals.leftArm[ lCrit ] && this.criticals.leftArm[ lCrit ].obj && this.criticals.leftArm[ lCrit ].obj.gauss ) {
					this.calcLogBV += "Gauss Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

	}


	defensiveBattleRating = totalArmorFactor + totalInternalStructurePoints + totalGyroPoints - explosiveAmmoModifiers;
	this.calcLogBV += "Defensive battle rating = " + defensiveBattleRating +  " ( " + totalArmorFactor + " + " + totalInternalStructurePoints + " +  " + totalGyroPoints + " -  " + explosiveAmmoModifiers + "<br />";


	// Get Defensive Factor Modifier


	var runSpeed = this.getRunSpeed();
	var jumpSpeed = this.getJumpSpeed();
	var runModifier = getMovementModifier( runSpeed );
	var jumpModifier = getMovementModifier( jumpSpeed ) + 1;

	var moveModifier = 0;
	if( jumpModifier > runModifier )
		moveModifier = jumpModifier;
	else
		moveModifier = runModifier;

	var targetModifierRating = 1 + moveModifier / 10;
	if( targetModifierRating < 1 )
		targetModifierRating = 1;

	this.calcLogBV += "Target Move Modifier (targetModifierRating = 1 + moveModifier / 10): " + targetModifierRating + " = 1 + " + moveModifier + " / 10<br />";

	// TODO for equipment.... add camo, stealth, etc when it's available
	this.calcLogBV += "<strong class=\"color-red\">TODO</strong>: targetModifierRating for equipment.... add camo, stealth, etc when tech is available<br />";

	this.calcLogBV += "Defensive battle rating = Defensive battle rating * Target Modifier Rating : " + (defensiveBattleRating * targetModifierRating) + " = " + defensiveBattleRating + " x " + targetModifierRating + "<br />";

	defensiveBattleRating = defensiveBattleRating * targetModifierRating;

	this.calcLogBV += "<strong>Final defensive battle rating</strong>: " + defensiveBattleRating + "<br />";

	/* ***************************************************
	 *  STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303
	 * ************************************************ */
	 var offensiveBattleRating = 0;
	 this.calcLogBV += "<strong>STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303</strong><br />";

	// TODO
	this.calcLogBV += "<strong class=\"color-red\">TODO</strong>: All offensive<br />";


	//~ console.log( "this.getHeatSinksType()", this.getHeatSinksType() );
	var mechHeatEfficiency  = 0;
	if( this.getHeatSinksType() == "single" ) {
		mechHeatEfficiency = 6 + this.getHeatSinks()  +  this.getMaxMovementHeat()
	} else if( this.getHeatSinksType() == "double" ) {
		mechHeatEfficiency = 6 + this.getHeatSinks() * 2 +  this.getMaxMovementHeat()
	}

	//~ console.log( "mechHeatEfficiency", mechHeatEfficiency );
	//~ var mechHeatEfficiency = 6 + +  this.getMaxMovementHeat()

	this.calcLogBV += "<strong>Final offensive battle rating</strong>: " + offensiveBattleRating + "<br />";

	/* ***************************************************
	 * STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304
	 * ************************************************ */

	 this.calcLogBV += "<strong>STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304</strong><br />";
	 var finalBattleValue = defensiveBattleRating + offensiveBattleRating;
	 this.calcLogBV += "finalBattleValue = defensiveBattleRating + offensiveBattleRating: " + finalBattleValue + " = " + defensiveBattleRating + " + " + offensiveBattleRating + "<br />";

	 if( this.smallCockpit ) {
		finalBattleValue = Math.round( finalBattleValue * .95 );
		this.calcLogBV += "Small Cockpit, multiply total by .95 and round final BV: " + finalBattleValue + "<br />";
	}

	this.calcLogBV += "<strong>Final Battle Value</strong>: " + finalBattleValue + " rounded to " +  Math.round(finalBattleValue) + "<br />";
	this.battleValue = Math.round(finalBattleValue) + " (TODO / WIP)";
}

Mech.prototype._calcCBillCost = function() {
	// TODO Calculations
	this.calcLogCBill = "";
	this.cbillCost = 0  + " (TODO / WIP)";
	//~ this.calcLogCBill = "TODO";
	this.calcLogCBill += "<strong class=\"color-red\">TODO<br />\n";

}

Mech.prototype.getBattleValue = function() {
	return this.battleValue;
}

Mech.prototype.getAlphaStrikeValue = function() {
	return this.alphaStrikeValue;
}

Mech.prototype.getCBillCost = function() {
	return this.cbillCost;
}

Mech.prototype.getEngineWeight = function() {
	if( this.engine && this.engine.weight ) {
		if (this.engineType.tag == "clan-xl" )
			return this.engine.weight[ "xl" ];
		else
			return this.engine.weight[ this.engineType.tag ];
	} else {
		return 0;
	}
}

Mech.prototype.getEngineRating = function() {
	if( this.engine && this.engine.rating )
		return this.engine.rating;
	else
		return 0;

}

Mech.prototype.getHeatSinks = function() {
	return 10 + this.additional_heat_sinks;
}

Mech.prototype.getHeatSinksWeight = function() {
	return 0 + this.additional_heat_sinks;
}

Mech.prototype.getGyroWeight = function() {
	return Math.ceil(  Math.ceil(this.engine.rating / 100) * this.gyro.weight_multiplier  );
}
Mech.prototype.getCockpitWeight = function() {
	return this.cockpit_weight;
}

Mech.prototype.setCockpitWeight = function(new_weight) {
	this.cockpit_weight = new_weight;
	return this.cockpit_weight;
}


Mech.prototype.getInteralStructureWeight = function() {
	return this.selectedInternalStructure.perTon[ this.getTonnage() ].tonnage;
}

Mech.prototype.getJumpJetWeight = function() {
	if( this.tonnage <= 55) {
		// 10-55 tons
		return this.jumpSpeed * this.jumpJetType.weight_multiplier.light;
	} else if(this.tonnage <= 85) {
		// 60 - 85 tons
		return this.jumpSpeed * this.jumpJetType.weight_multiplier.medium;
	} else {
		// 90+ tons
		return this.jumpSpeed * this.jumpJetType.weight_multiplier.heavy;
	}

}

Mech.prototype.getTranslation = function(langKey) {
	for( lang_count = 0; lang_count < available_languages.length; lang_count++ ) {
		if( available_languages[lang_count].short_code == this.useLang ) {

			if(available_languages[lang_count].translations[langKey] ) {
				return available_languages[lang_count].translations[langKey];
			} else {
				return langKey;
			}
		}
	}
}

Mech.prototype.getLocalTranslation = function( languageObject ) {

	if( languageObject[ this.useLang ] ) {
		return languageObject[ this.useLang ];
	} else {
		return languageObject[ "en-US" ];
	}
}

Mech.prototype.getASCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this.calcLogAS + "</div>";
}

Mech.prototype.getBVCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this.calcLogBV + "</div>";
}

Mech.prototype.getCBillCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this.calcLogCBill + "</div>";
}


Mech.prototype.makeSVGRecordSheet = function( inPlay, landscape ) {
	if( typeof( landscape ) == "undefined" ) {
		landscape = false;
	} else {
		if( landscape )
			landscape = true;
		else
			landscape = false;
	}

	if( typeof( inPlay ) == "undefined" ) {
		inPlay = false;
	} else {
		if( inPlay )
			inPlay = true;
		else
			inPlay = false;
	}




	return createSVGRecordSheet( this, inPlay, landscape );


}

Mech.prototype.makeSVGAlphaStrikeCard = function( inPlay ) {
	if( typeof( inPlay ) == "undefined" ) {
		inPlay = false;
	} else {
		if( inPlay )
			inPlay = true;
		else
			inPlay = false;
	}

	//~ console.log( this.alphaStrikeForceStats );

	return createSVGAlphaStrike( this.alphaStrikeForceStats, inPlay );
}

Mech.prototype.makeTROBBCode = function() {

	html = "";
	// Header Info
	html +=  this.getTranslation("TRO_TYPE") + ": " + this.getName() + "\n";
	html += this.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + this.getTech().name[ this.useLang ] + "\n";
	html += this.getTranslation("TRO_ERA") + ": " + this.getEra().name[ this.useLang ] + "\n";
	html += this.getTranslation("TRO_TONNAGE") + ": " + this.getTonnage() + "\n";
	html += this.getTranslation("TRO_BATTLE_VALUE") + ": " + this.getBattleValue() + "\n";
	html += this.getTranslation("TRO_ALPHA_STRIKE_VALUE") + ": " + this.getAlphaStrikeValue() + "\n";
	html += this.getTranslation("TRO_CBILL_COST") + ": $" + this.getCBillCost() + "\n";
	html += "\n";

	var col1Padding = 25;
	var col2Padding = 15;
	var col3Padding = 10;
	var col4Padding = 10;

	// Equipment
	html += "" + this.getTranslation("TRO_EQUIPMENT").rpad(" ",col1Padding + col2Padding) + "" + this.getTranslation("TRO_MASS") + "\n";
	html += "" + ( this.getTranslation("TRO_ARMOR_IS") + " (" + this.getLocalTranslation( this.selectedInternalStructure.name ) + ")").rpad(" ",col1Padding + col2Padding) + "" + this.getInteralStructureWeight() + "\n";
	html += "" + this.getEngineName().rpad(" ",col1Padding) + "" + this.getEngineRating().toString().rpad(" ", col2Padding) + "" + this.getEngineWeight() + "\n";

	html += "" + this.getTranslation("TRO_WALKING").lpad(" ", col1Padding - 10) + " " + this.getWalkSpeed().toString().lpad(" ", 3) + "\n";
	html += "" + this.getTranslation("TRO_RUNNING").lpad(" ", col1Padding - 10) + " " + this.getRunSpeed().toString().lpad(" ", 3) + "\n";
	html += "" + this.getTranslation("TRO_JUMPING").lpad(" ", col1Padding - 10) + " " + this.getJumpSpeed().toString().lpad(" ", 3) + "\n";

	html += "" + this.getHeatSyncName().rpad(" ",col1Padding) + ""  + this.getHeatSinks().toString().rpad(" ", col2Padding) + "" + this.getHeatSinksWeight() + "\n";
	html += "" + this.getGyroName().rpad(" ",col1Padding + col2Padding) + "" + this.getGyroWeight() + "\n";

	if( this.small_cockpit ) {
		html += "" + this.getTranslation("TRO_SMALL_COCKPIT").rpad(" ",col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
	} else {
		html += "" + this.getTranslation("TRO_COCKPIT").rpad(" ",col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
	}

	//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "" + this.getTranslation("TRO_JUMP_JETS").rpad(" ",col1Padding + col2Padding) + "" + this.getJumpJetWeight() + "\n";
	//~ }

	if( this.mech_type.class == "biped") {
		html += "" + this.getTranslation("TRO_ARM_ACTUATORS") + ": ";
		actuator_html = "";

		if( this.hasLowerArmActuator("ra") )
			actuator_html += this.getTranslation("TRO_LOWER_RIGHT") + ", ";
		if( this.hasLowerArmActuator("la") )
			actuator_html += this.getTranslation("TRO_LOWER_LEFT") + ", ";
		if( this.hasHandActuator("ra") )
			actuator_html += this.getTranslation("TRO_RIGHT_HAND") + ", ";
		if( this.hasHandActuator("la") )
			actuator_html += this.getTranslation("TRO_LEFT_HAND") + ", ";

		if( actuator_html == "")
			actuator_html = this.getTranslation("TRO_NO_LOWER_ARM_ACTUATORS");
		else
			actuator_html = actuator_html.substring(0, actuator_html.length - 2);

		html += actuator_html;
		html += "\n";
	}

	html += "" + (this.getTranslation("TRO_ARMOR_FACTOR") + " (" + this.getLocalTranslation( this.armorType.name ) + ")").rpad(" ",col1Padding) + "" + this.getTotalArmor().toString().rpad(" ",col2Padding) + "" + this.getArmorWeight() + "\n";

	var col1Padding = 20;
	var col2Padding = 10;
	var col3Padding = 15;
	var col4Padding = 10;

	// Armor Factor Table

	html += this.getTranslation("TRO_ARMOR_IS").lpad(" ", col1Padding + col2Padding) + "" + this.getTranslation("TRO_ARMOR_VALUE").lpad(" ", col3Padding) + "\n";
	html += "" + this.getTranslation("TRO_ARMOR_HD").lpad(" ", col1Padding)  + "" + this.internalStructure.head.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.head.toString().lpad(" ", col3Padding) + "\n";
	html += "" + this.getTranslation("TRO_ARMOR_CT").lpad(" ", col1Padding) + "" + this.internalStructure.centerTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.centerTorso.toString().lpad(" ", col3Padding) + "\n";
	html += "" + this.getTranslation("TRO_ARMOR_CTR").lpad(" ", col1Padding) + "" + this.armorAllocation.centerTorsoRear.toString().lpad(" ", col2Padding) + "\n";
	if( this.armorAllocation.rightTorso == this.armorAllocation.leftTorso && this.armorAllocation.rightTorsoRear == this.armorAllocation.leftTorsoRear ) {
		html += "" + this.getTranslation("TRO_ARMOR_RLT").lpad(" ", col1Padding) + "" + this.internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_RLTR").lpad(" ", col1Padding) + "" + this.armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";
	} else {
		html += "" + this.getTranslation("TRO_ARMOR_RT").lpad(" ", col1Padding) + "" + this.internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_RTR").lpad(" ", col1Padding) + "" + this.armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";

		html += "" + this.getTranslation("TRO_ARMOR_LT").lpad(" ", col1Padding) + "" + this.internalStructure.leftTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_LTR").lpad(" ", col1Padding) + "" + this.armorAllocation.leftTorsoRear.toString().lpad(" ", col2Padding) + "\n";
	}
	if( this.mech_type.class == "biped") {

		if( this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
			html += "" + this.getTranslation("TRO_ARMOR_RLA").lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RA").lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LA").lpad(" ", col1Padding) + "" + this.internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
		}

		if( this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
			html += "" + this.getTranslation("TRO_ARMOR_RLL").lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RL").lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LL").lpad(" ", col1Padding) + "" + this.internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
		}
	} else {
		if( this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
			html += "" + this.getTranslation("TRO_ARMOR_RLFL").lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RFL").lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LFL").lpad(" ", col1Padding) + "" + this.internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
		}

		if( this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
			html += "" + this.getTranslation("TRO_ARMOR_RLRL").lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RRL").lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_RLL").lpad(" ", col1Padding) + "" + this.internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
		}
	}
	// End Factor Table
	html += "";
	html += "\n";


	var col1Padding = 20;
	var col2Padding = 10;
	var col3Padding = 10;
	var col4Padding = 10;
	this.equipmentList.sort( sortByLocationThenName );

	// Weapons and Ammo
	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		if(this.equipmentList[eq_count].name[ this.useLang ].length  + 3 > col1Padding)
			col1Padding = this.equipmentList[eq_count].name[ this.useLang ].length  + 3;
	}

	for( var locC = 0; locC < this.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < this.criticals[ this.validJJLocations[locC].long ].length; critC++ ) {
			if(
				this.criticals[ this.validJJLocations[locC].long ][ critC ]
				&& this.criticals[ this.validJJLocations[locC].long ][ critC ].tag
				&& this.criticals[ this.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				if(this.criticals[ this.validJJLocations[locC].long ][ critC ].name + 3 > col1Padding)
					col1Padding = this.criticals[ this.validJJLocations[locC].long ][ critC ].name + 3;
			}
		}
	}



	html += "" + this.getTranslation("TRO_WEAPONS") + "\n";

	html +=this.getTranslation("TRO_AND_AMMO").rpad(" ", col1Padding) + "" + this.getTranslation("TRO_LOCATION").rpad(" ", col2Padding) + "" + this.getTranslation("TRO_CRITICAL").rpad(" ", col3Padding) + "" + this.getTranslation("TRO_TONNAGE").rpad(" ", col4Padding) + "\n";



	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		if( typeof( this.equipmentList[eq_count].location ) == "undefined" )
			this.equipmentList[eq_count].location = "n/a";

		item_location = "";
		item_location = this.getLocationAbbr( this.equipmentList[eq_count].location );
		html += "" + this.equipmentList[eq_count].name[ this.useLang ].rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + this.equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + this.equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
	}

	// List Jump Jets Allocations...

	for( var locC = 0; locC < this.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < this.criticals[ this.validJJLocations[locC].long ].length; critC++ ) {
			if(
				this.criticals[ this.validJJLocations[locC].long ][ critC ]
				&& this.criticals[ this.validJJLocations[locC].long ][ critC ].tag
				&& this.criticals[ this.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				jjObjs.push( this.criticals[ this.validJJLocations[locC].long ][ critC ] );
			}
		}

		if( jjObjs.length > 0 ) {
			var areaWeight = 0;
			if( this.tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
			} else if(this.tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
			}
			html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + this.validJJLocations[locC].short.toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

		}
	}

	var jjObjs = [];

	for( var critC = 0; critC < this.unallocatedCriticals.length; critC++ ) {
		if(
			this.unallocatedCriticals[ critC ]
			&& this.unallocatedCriticals[ critC ].tag
			&& this.unallocatedCriticals[ critC ].tag.indexOf( "jj-") === 0
		) {
			jjObjs.push(this.unallocatedCriticals[ critC ] );
		}
	}

	if( jjObjs.length > 0 ) {
		var areaWeight = 0;
		if( this.tonnage <= 55) {
			// 10-55 tons
			areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
		} else if(this.tonnage <= 85) {
			// 60 - 85 tons
			areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
		}
			html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + "n/a".toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

	}



	var createdBy = "\n\nCreated with BattleTech Tools: [url]https://jdgwf.github.io/battletech-tools/[/url]\n\n";


	return "[code]" +  html + "[/code]" + createdBy;

}

Mech.prototype.makeTROHTML = function() {


	html = "<table class=\"mech-tro\">";

	// Header Info
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TYPE") + ": " + this.getName() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + this.getTech().name[ this.useLang ] + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ERA") + ": " + this.getEra().name[ this.useLang ] + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TONNAGE") + ": " + this.getTonnage() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_BATTLE_VALUE") + ": " + this.getBattleValue() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ALPHA_STRIKE_VALUE") + ": " + this.getAlphaStrikeValue() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_CBILL_COST") + ": $" + this.getCBillCost() + "</td></tr>";
	html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";

	// Equipment
	html += "<tr><th class=\"text-left\" colspan=\"3\">" + this.getTranslation("TRO_EQUIPMENT") + "</th><th class=\"text-center\" colspan=\"1\">" + this.getTranslation("TRO_MASS") + "</th></tr>";
	html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_ARMOR_IS") + " (" + this.getLocalTranslation( this.selectedInternalStructure.name ) + ")</td><td class=\"text-center\" colspan=\"1\">" + this.getInteralStructureWeight() + "</td></tr>";
	html += "<tr><td colspan=\"1\">" + this.getEngineName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_WALKING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_RUNNING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_JUMPING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

	html += "<tr><td colspan=\"1\">" + this.getHeatSyncName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
	html += "<tr><td colspan=\"3\">" + this.getGyroName() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

	if( this.small_cockpit ) {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_SMALL_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
	} else {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
	}

	//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_JUMP_JETS") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
	//~ }

	if( this.mech_type.class == "biped") {
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ARM_ACTUATORS") + ": ";
		actuator_html = "";

		if( this.hasLowerArmActuator("ra") )
			actuator_html += this.getTranslation("TRO_LOWER_RIGHT") + ", ";
		if( this.hasLowerArmActuator("la") )
			actuator_html += this.getTranslation("TRO_LOWER_LEFT") + ", ";
		if( this.hasHandActuator("ra") )
			actuator_html += this.getTranslation("TRO_RIGHT_HAND") + ", ";
		if( this.hasHandActuator("la") )
			actuator_html += this.getTranslation("TRO_LEFT_HAND") + ", ";

		if( actuator_html == "")
			actuator_html = this.getTranslation("TRO_NO_LOWER_ARM_ACTUATORS");
		else
			actuator_html = actuator_html.substring(0, actuator_html.length - 2);

		html += actuator_html;
		html += "</td></tr>";
	}
/*
	TRO_ACTUATORS: "Actuators",
		TRO_LOWER_LEFT: "Lower Left",
		TRO_LEFT_HAND: "Left Hand",
		TRO_LOWER_RIGHT: "Lower Right",
		TRO_RIGHT_HAND: "Right Hand",
*/


	html += "<tr><th colspan=\"1\">" + this.getTranslation("TRO_ARMOR_VALUE") + " (" + this.getLocalTranslation( this.armorType.name ) + ")</th><th class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</th><th class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</th></tr>";


	// Armor Factor Table
	html += "<tr><td colspan=\"1\"></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + this.getTranslation("TRO_ARMOR_IS") + "</em></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + this.getTranslation("TRO_ARMOR_VALUE") + "</em></td><td>&nbsp;</td></tr>";
	html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_HD") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.head + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.head + "</td><td>&nbsp;</td></tr>";
	html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_CT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.centerTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.centerTorso + "</td><td>&nbsp;</td></tr>";
	html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_CTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.centerTorsoRear + "</td><td>&nbsp;</td></tr>";
	if( this.armorAllocation.rightTorso == this.armorAllocation.leftTorso && this.armorAllocation.rightTorsoRear == this.armorAllocation.leftTorsoRear ) {
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";
	} else {
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";

		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftTorsoRear + "</td><td>&nbsp;</td></tr>";
	}
	if( this.mech_type.class == "biped") {

		if( this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLA") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RA") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LA") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
		}

		if( this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
		}
	} else {
		if( this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
		}

		if( this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLRL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RRL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
		}
	}
	// End Factor Table
	html += "</table>";
	html += "<br />";

	// Weapons and Ammo
	html += "<table class=\"mech-tro\">";
	html += "<tr><th class=\"text-left\">" + this.getTranslation("TRO_WEAPONS") + "<br />" + this.getTranslation("TRO_AND_AMMO") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_LOCATION") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_CRITICAL") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_TONNAGE") + "</th></tr>";

	this.equipmentList.sort( sortByLocationThenName );

	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		if( typeof( this.equipmentList[eq_count].location ) == "undefined" )
			this.equipmentList[eq_count].location = "n/a";

		item_location = "";
		item_location = this.getLocationAbbr( this.equipmentList[eq_count].location );
		html += "<tr><td class=\"text-left\">" + this.equipmentList[eq_count].name[ this.useLang ] + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + this.equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this.equipmentList[eq_count].weight + "</td></tr>";
	}

	// List Jump Jets Allocations...

	for( var locC = 0; locC < this.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < this.criticals[ this.validJJLocations[locC].long ].length; critC++ ) {
			if(
				this.criticals[ this.validJJLocations[locC].long ][ critC ]
				&& this.criticals[ this.validJJLocations[locC].long ][ critC ].tag
				&& this.criticals[ this.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				jjObjs.push( this.criticals[ this.validJJLocations[locC].long ][ critC ] );
			}
		}

		if( jjObjs.length > 0 ) {
			var areaWeight = 0;
			if( this.tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
			} else if(this.tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
			}
			html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">" + this.validJJLocations[locC].short.toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

		}
	}

	var jjObjs = [];

	for( var critC = 0; critC < this.unallocatedCriticals.length; critC++ ) {
		if(
			this.unallocatedCriticals[ critC ]
			&& this.unallocatedCriticals[ critC ].tag
			&& this.unallocatedCriticals[ critC ].tag.indexOf( "jj-") === 0
		) {
			jjObjs.push(this.unallocatedCriticals[ critC ] );
		}
	}

	if( jjObjs.length > 0 ) {
		var areaWeight = 0;
		if( this.tonnage <= 55) {
			// 10-55 tons
			areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
		} else if(this.tonnage <= 85) {
			// 60 - 85 tons
			areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
		}
			html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">" + "n/a".toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

	}

	// END Weapons and Ammo
	html += "</table>";

	return html;
}
Mech.prototype.getLocationAbbr = function(location_tag) {


	for(loc_count = 0; loc_count < battlemechLocations.length; loc_count++) {
		if( location_tag == battlemechLocations[loc_count].tag ) {
			if( battlemechLocations[loc_count].abbr[ this.useLang ] != "undefined" )
				return battlemechLocations[loc_count].abbr[ this.useLang ];
			else
				return battlemechLocations[loc_count].abbr[ this.useLang ];
		}
	}
	return this.getTranslation("TRO_NOT_AVAILABLE") ;
}

Mech.prototype.clearMech = function() {
	this.setMechType(1);
	this.setTonnage(20);
	this._calc();
}

Mech.prototype._calc = function() {


	this.max_move_heat = 2;
	this.max_weapon_heat = 0;
	this.heat_dissipation = 0;


	this.weights = Array();
	this.weights.push( {name:"Internal Structure", weight: this.getInteralStructureWeight() } );

	if( this.small_cockpit ) {
		this.setCockpitWeight( 2 );
		this.weights.push( {name: "Small Cockpit", weight: this.getCockpitWeight() } );
	} else {
		this.setCockpitWeight( 3 );
		this.weights.push( {name: "Cockpit", weight: this.getCockpitWeight() } );
	}

	this.runSpeed = Math.ceil(this.walkSpeed * 1.5);

	if( this.era == 0 ) {
		this.era = btEraOptions[1];
	}

	if( this.tech == 0 ) {
		this.tech = btTechOptions[0];
	}

	if( this.mech_type == 0 ) {
		this.mech_type = mechTypeOptions[0];
	}


	if( this.engine ) {

		this.weights.push( {name: this.engineType.name[this.useLang] + " - " + this.engineType.rating, weight: this.getEngineWeight() } );

		this.weights.push( {name: this.gyro.name[this.useLang], weight: this.getGyroWeight()} );

	}

	if( this.jumpSpeed > 0) {
		this.max_move_heat = this.jumpSpeed;
		if( this.jumpJetType == "Standard" ) {
			// standard
			this.weights.push( {name: "Jump Jets", weight: this.getJumpJetWeight() } );
		} else {
			// improved
			this.weights.push( {name: "Improved Jets", weight: this.getJumpJetWeight() } );
		}
	}

	this.total_armor = this.armorWeight * 16;

	//~ switch( this.getArmorType() ) {

		//~ default: // standard
			//~ this.total_armor = this.armorWeight * 16;
			//~ break;
	//~ }
	if( this.getTech().tag == "clan") {
		 this.total_armor = Math.floor( this.armorWeight * this.getArmorObj().armormultiplier.clan );
	} else {
		 this.total_armor = Math.floor( this.armorWeight * this.getArmorObj().armormultiplier.is );
	}
	//~ console.log( this.getArmorObj() );

	if( this.total_armor > this.max_armor )
		this.total_armor = this.max_armor;

	this.weights.push( {name: "Armor", weight: this.armorWeight} );
	this.unallocated_armor = this.total_armor;
	this.unallocated_armor -= this.armorAllocation.head;

	this.unallocated_armor -= this.armorAllocation.centerTorso;
	this.unallocated_armor -= this.armorAllocation.leftTorso;
	this.unallocated_armor -= this.armorAllocation.rightTorso;

	this.unallocated_armor -= this.armorAllocation.centerTorsoRear;
	this.unallocated_armor -= this.armorAllocation.leftTorsoRear;
	this.unallocated_armor -= this.armorAllocation.rightTorsoRear;

	this.unallocated_armor -= this.armorAllocation.rightArm;
	this.unallocated_armor -= this.armorAllocation.leftArm;

	this.unallocated_armor -= this.armorAllocation.rightLeg;
	this.unallocated_armor -= this.armorAllocation.leftLeg;


	if( this.additional_heat_sinks > 0)
		this.weights.push( {name: "Additional Heat Sinks", weight: this.additional_heat_sinks} );

	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		if( this.equipmentList[eq_count].rear ) {
			this.weights.push( {name: this.equipmentList[eq_count].name + " (" + this.getTranslation("GENERAL_REAR") + ")", weight: this.equipmentList[eq_count].weight} );
		} else {
			this.weights.push( {name: this.equipmentList[eq_count].name + "", weight: this.equipmentList[eq_count].weight} );
		}
		if(  this.equipmentList[eq_count])
			this.max_weapon_heat +=  this.equipmentList[eq_count].heat;
	}

	this.current_tonnage = 0;
	for( weight_counter = 0; weight_counter < this.weights.length; weight_counter++) {
		this.current_tonnage += this.weights[weight_counter].weight;
	}

	this.remaining_tonnage = this.tonnage - this.current_tonnage;

	this.heat_sink_criticals = {};
	this.heat_sink_criticals.number = 0;
	//~ this.heat_sink_criticals.slots_type = "single slot";
	this.heat_sink_criticals.slots_each = 1;

	//~ if( this.heatSinkType == "double") {
		//~ if( this.tech.tag == "clan") {
			//~ this.heat_sink_criticals.slots_type = "double slot";
			//~ this.heat_sink_criticals.slots_each = 2;
		//~ } else {
			//~ this.heat_sink_criticals.slots_type = "triple slot";
			//~ this.heat_sink_criticals.slots_each = 3;
		//~ }
		//~ this.heat_dissipation = (this.additional_heat_sinks + 10) * 2;
	//~ } else {
		//~ this.heat_sink_criticals.slots_type = "single";
		//~ this.heat_sink_criticals.slots_each = 1;
		//~ this.heat_dissipation = this.additional_heat_sinks + 10;
	//~ }

	this.heat_dissipation = ( this.additional_heat_sinks + 10 ) * this.heatSinkType.dissipation;
	this.heat_sink_criticals.slots_each = this.heatSinkType.crits[ this.getTech().tag ];

	if( this.getEngine().rating ) {
		this.heat_sink_criticals.number =  this.additional_heat_sinks + 10  -  Math.floor(this.getEngine().rating / 25);
	} else {
		this.heat_sink_criticals.number = 0
	}

	this._calcCriticals();
	this._calcAlphaStrike();
	this._calcBattleValue();
	this._calcCBillCost();

	this.equipmentList = this.equipmentList.sort( sortByLocationThenName );
 	this.sortedEquipmentList = [];
	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {


		var foundIt = false;

		for( var se_count = 0; se_count < this.sortedEquipmentList.length; se_count++ ) {
			if(
				this.equipmentList[eq_count].location == this.sortedEquipmentList[se_count].location
					&&
				this.equipmentList[eq_count].tag == this.sortedEquipmentList[se_count].tag
			) {
				this.sortedEquipmentList[se_count].count++;
				foundIt = true;
			}
		}

		if( !foundIt ) {
			var eqItem = angular.copy( this.equipmentList[eq_count] );
			eqItem.local_name = this.getLocalTranslation( eqItem.name );
			eqItem.count = 1;
			this.sortedEquipmentList.push( eqItem );
		}
	}
}

Mech.prototype._calcCriticals = function() {
	// WORK IN PROGRESS
	this.criticals.head = Array(6);

	this.criticals.centerTorso = Array(12);
	this.criticals.leftTorso = Array(12);
	this.criticals.rightTorso = Array(12);

	this.criticals.rightArm = Array(12);
	this.criticals.leftArm = Array(12);

	this.criticals.rightLeg = Array(6);
	this.criticals.leftLeg = Array(6);

	this.unallocatedCriticals = Array();

	// Add required components....
	if( this.small_cockpit ) {
		this._addCriticalItem( "life-support", this.getTranslation("BM_CRITS_LIFE_SUPPORT"), 1, "hd", 0);
		this._addCriticalItem( "sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 1);
		this._addCriticalItem( "cockpit", this.getTranslation("BM_CRITS_COCKPIT"), 1, "hd", 2);
		this._addCriticalItem( "sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 3);
	} else {
		this._addCriticalItem( "life-support", this.getTranslation("BM_CRITS_LIFE_SUPPORT"), 1, "hd", 0);
		this._addCriticalItem( "sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 1);
		this._addCriticalItem( "cockpit", this.getTranslation("BM_CRITS_COCKPIT"), 1, "hd", 2);
		this._addCriticalItem( "sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 4);
		this._addCriticalItem( "life-support", this.getTranslation("BM_CRITS_LIFE_SUPPORT"), 1, "hd", 5);
	}

	if( this.mech_type.class.toLowerCase() == "quad") {
		// quad
		// Left Leg Components
		this._addCriticalItem( "hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "ra", 0);
		this._addCriticalItem( "upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "ra", 1);
		this._addCriticalItem( "lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "ra", 2);
		this._addCriticalItem( "foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "ra", 3);

		// Right Leg Components
		this._addCriticalItem( "hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "la", 0);
		this._addCriticalItem( "upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "la", 1);
		this._addCriticalItem( "lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "la", 2);
		this._addCriticalItem( "foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "la", 3);

	} else {
		// biped
		// Left Arm Components
		this._addCriticalItem( "shoulder", this.getTranslation("BM_CRITS_ACTUATOR_SHOULDER") , 1, "la", 0);
		this._addCriticalItem( "upper-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_ARM"), 1, "la", 1);
		if( this.hasLowerArmActuator("la") ) {
			this._addCriticalItem( "lower-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_ARM"), 1, "la", 2);
			if( this.hasHandActuator("la") ) {

				this._addCriticalItem( "hand-actuator", this.getTranslation("BM_CRITS_ACTUATOR_HAND"), 1, "la", 3);
			}
		}


		// Right Arm Components
		this._addCriticalItem( "shoulder", this.getTranslation("BM_CRITS_ACTUATOR_SHOULDER"), 1, "ra", 0);
		this._addCriticalItem( "upper-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_ARM"), 1, "ra", 1);
		if( this.hasLowerArmActuator("ra") ) {
			this._addCriticalItem( "lower-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_ARM"), 1, "ra", 2);
			if( this.hasHandActuator("ra") ) {

				this._addCriticalItem( "hand-actuator", this.getTranslation("BM_CRITS_ACTUATOR_HAND"), 1, "ra", 3);
			}
		}
	}



	// Engine

	if(
		this.engineType
		&& this.engineType.criticals
		&& this.engineType.criticals[ this.getTech().tag ]
		&& this.engineType.criticals[ this.getTech().tag ].ct > 3
	) {
		this._addCriticalItem(
			"engine", 									// item_tag
			this.engineType.name[this.useLang], 		// item_name
			3, 											// critical_count
			"ct" 										// location
														// slot
		);
	} else {
		// reset back to standard, engine not available for tech
		console.log( "warning", "resetting engine to standard ", this.engineType.criticals, this.getTech().tag, this.tech) ;
		this.setEngineType( "standard" );
		this._addCriticalItem(
			"engine", 												// item_tag
			this.engineType.name[this.useLang], 					// item_name
			this.engineType.criticals[ this.getTech().tag ].ct, 	// critical_count
			"ct" 													// location
																	// slot
		);
	}

	if(
		this.engineType.criticals[ this.getTech().tag ]
			&&
		this.engineType.criticals[ this.getTech().tag ].rt
	) {
		this._addCriticalItem( "engine", this.engineType.name[this.useLang], this.engineType.criticals[ this.getTech().tag ].rt, "rt");
	}
	if(
		this.engineType.criticals[ this.getTech().tag ]
			&&
		this.engineType.criticals[ this.getTech().tag ].lt
	) {
		this._addCriticalItem( "engine", this.engineType.name[this.useLang], this.engineType.criticals[ this.getTech().tag ].lt, "lt");
	}

	// Gyro
	this._addCriticalItem(
		"gyro", 										// item_tag
		this.gyro.name[this.useLang], 					// item_name
		this.gyro.criticals, 							// critical_count
		"ct"											// location
	);

	// Extra engine bits....
	if( this.engineType.criticals[ this.getTech().tag ].ct > 3 ){
		this._addCriticalItem(
			"engine", 													// item_tag
			this.engineType.name[this.useLang], 						// item_name
			this.engineType.criticals[ this.getTech().tag ].ct - 3, 	// critical_count
			"ct"														// location
		);
	}

	// Left Leg Components
	this._addCriticalItem( "hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "ll", 0);
	this._addCriticalItem( "upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "ll", 1);
	this._addCriticalItem( "lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "ll", 2);
	this._addCriticalItem( "foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "ll", 3);

	// Right Leg Components
	this._addCriticalItem( "hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "rl", 0);
	this._addCriticalItem( "upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "rl", 1);
	this._addCriticalItem( "lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "rl", 2);
	this._addCriticalItem( "foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "rl", 3);

	// Jump Jets
	jump_move = this.getJumpSpeed();
	for(var jmc = 0; jmc < jump_move; jmc++ ) {
		this.unallocatedCriticals.push(
			{
				name: this.jumpJetType.name[this.useLang],
				tag: "jj-" + this.jumpJetType.tag,
				rear: false,
				movable: true,
				crits: this.jumpJetType.criticals
			}
		);
	}

	// Armor

	var armorObj = this.getArmorObj();
	if( this.getTech().tag  == "clan" ) {
		if( armorObj.crits.clan > 0 ) {
			if( armorObj.crit_locs ) {
				for( var nameLoc in armorObj.crits_locs ) {
					this._addCriticalItem(
						armorObj.tag, 						// item_tag
						armorObj.name[this.useLang], 		// item_name
						armorObj.crits_loc [ nameLoc ], 		// critical_count
						nameLoc									// location
																// slot
					);
				}
			} else {
				for( var aCounter = 0; aCounter < armorObj.crits.clan; aCounter++ ) {
					this.unallocatedCriticals.push(
						{
							name: armorObj.name[this.useLang],
							tag: armorObj.tag,
							rollAgain: true,
							rear: false,
							crits: 1,
							obj: armorObj,
							movable: true
						}
					);
				}
			}
		}
	} else {
		if( armorObj.crits.is > 0 ) {
			if( armorObj.crit_locs ) {
				for( var nameLoc in armorObj.crits_locs ) {
					this._addCriticalItem(
						armorObj.tag, 						// item_tag
						armorObj.name[this.useLang], 		// item_name
						armorObj.crits_loc [ nameLoc ], 		// critical_count
						nameLoc									// location
																// slot
					);
				}
			} else {
				for( var aCounter = 0; aCounter < armorObj.crits.is; aCounter++ ) {
					this.unallocatedCriticals.push(
						{
							name: armorObj.name[this.useLang],
							tag: armorObj.tag,
							rear: false,
							rollAgain: true,
							crits: 1,
							obj: armorObj,
							movable: true
						}
					);
				}
			}
		}
	}

	// Internal Structure critical Items
	if( this.getTech().tag  == "clan" ) {
		for( var aCounter = 0; aCounter < this.selectedInternalStructure.crits.clan; aCounter++ ) {
			this.unallocatedCriticals.push(
				{
					name: this.selectedInternalStructure.name[this.useLang],
					tag: this.selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this.selectedInternalStructure,
					movable: true
				}
			);
		}


	} else {
		for( var aCounter = 0; aCounter < this.selectedInternalStructure.crits.is; aCounter++ ) {
			this.unallocatedCriticals.push(
				{
					name: this.selectedInternalStructure.name[this.useLang],
					tag: this.selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this.selectedInternalStructure,
					movable: true
				}
			);
		}
	}


	// Get optional equipment...
	for(var elc = 0; elc < this.equipmentList.length; elc++ ) {
		//~ this.equipmentList[elc].location = "";
		var rearTag = "";
		if( this.equipmentList[elc].rear )
			rearTag = " (" + this.getTranslation("GENERAL_REAR") + ")";
		this.unallocatedCriticals.push(
			{
				name: this.equipmentList[elc].name[this.useLang] + rearTag,
				tag: this.equipmentList[elc].tag,
				rear: this.equipmentList[elc].rear,
				crits: this.equipmentList[elc].space.battlemech,
				obj: this.equipmentList[elc],
				movable: true
			} );
	}


	// Heat Sink Requirements
	hs_requirements = this.getHeatSinkCriticalRequirements();
	if( hs_requirements.slots_each > 1 )
		hs_name = this.getTranslation("BM_CRITS_DOUBLE_HEAT_SINK");
	else
		hs_name = this.getTranslation("BM_CRITS_HEAT_SINK");
	for(var hsc = 0; hsc < hs_requirements.number; hsc++ ) {

		this.unallocatedCriticals.push( {
			name: hs_name,
			rear: false,
			tag: "heat-sink",
			crits: hs_requirements.slots_each,
			movable: true
		} );
	}



	// Allocate items per allocation table.
	for( alt_c = 0; alt_c < this.criticalAllocationTable.length; alt_c++) {
		this._allocateCritical(
			this.criticalAllocationTable[alt_c].tag,
			this.criticalAllocationTable[alt_c].rear,
			this.criticalAllocationTable[alt_c].loc,
			this.criticalAllocationTable[alt_c].slot,
			true
		)
	}


	// remove location tag for remaining unallocated
	for( var lCount = 0; lCount < this.unallocatedCriticals.length; lCount++ ) {
		if( this.unallocatedCriticals[lCount].obj )
			this.unallocatedCriticals[lCount].obj.location = "";
	}

}

Mech.prototype.hasHandActuator = function( location ){
	if( location == "ra" )
		if( this._no_right_arm_hand_actuator )
			return false;
	if( location == "la" )
		if( this._no_left_arm_hand_actuator )
			return false;
	return true;
}

Mech.prototype.localizeLocationAbbreviation = function( locationAbbr ) {
	// TODO
	return locationAbbr;
}

Mech.prototype.hasLowerArmActuator = function( location ){
	if( location == "ra" )
		if( this._no_right_arm_lower_actuator )
			return false;
	if( location == "la" )
		if( this._no_left_arm_lower_actuator )
			return false;
	return true;
}


Mech.prototype.removeHandActuator = function( location ) {
	if( location == "ra" ) {
		this._no_right_arm_hand_actuator = true;
	}
	if( location == "la" ) {
		this._no_left_arm_hand_actuator = true;
	}
	this._calc();

}

Mech.prototype.removeLowerArmActuator = function( location ) {
	if( location == "ra" ) {
		this._no_right_arm_hand_actuator = true;
		this._no_right_arm_lower_actuator = true;

	}
	if( location == "la" ) {
		this._no_left_arm_hand_actuator = true;
		this._no_left_arm_lower_actuator = true;
	}
	this._calc();
}

Mech.prototype.addHandActuator = function( location ) {
	if( location == "ra" ) {
		this._no_right_arm_hand_actuator = false;
		this._no_right_arm_lower_actuator = false;

	}
	if( location == "la" ) {
		this._no_left_arm_hand_actuator = false;
		this._no_left_arm_lower_actuator = false;
	}
	this._calc();
}

Mech.prototype.addLowerArmActuator = function( location ) {
	if( location == "ra" ) {
	//	this._no_right_arm_hand_actuator = false;
		this._no_right_arm_lower_actuator = false;

	}
	if( location == "la" ) {
	//	this._no_left_arm_hand_actuator = false;
		this._no_left_arm_lower_actuator = false;
	}
	this._calc();
}

Mech.prototype.getMaxMovementHeat = function() {
	var maxMoveHeat = 2; // standard run heat.

	if( this.getJumpSpeed() > 2 ) {
		maxMoveHeat == this.getJumpSpeed();
	}


	// Stealth Armor
	if( this.getArmorType() == "stealth") {
		maxMoveHeat += 10;
	}

	return maxMoveHeat;
}

Mech.prototype._addCriticalItem = function( item_tag, item_name, critical_count, location, slot, movable ) {
	uuid = generateUUID();
	if( movable != "undefined" && movable != null)
		item = { tag: item_tag, name: item_name, crits: critical_count, movable: true, uuid: uuid };
	else
		item = { tag: item_tag, name: item_name, crits: critical_count, movable: false, uuid: uuid };

	if( typeof(slot) == "undefined" || slot == null)
		slot = null;

	if( typeof(location) != "undefined" && location != null) {
		if( location == "hd" ) {
			this._assignItemToArea( this.criticals.head, item, critical_count, slot );

		} else if( location == "ct" ) {
			this._assignItemToArea( this.criticals.centerTorso, item, critical_count, slot );

		} else if( location == "lt" ) {
			this._assignItemToArea( this.criticals.leftTorso, item, critical_count, slot );

		} else if( location == "rt" ) {
			this._assignItemToArea( this.criticals.rightTorso, item, critical_count, slot );

		} else if( location == "ra" ) {
			this._assignItemToArea( this.criticals.rightArm, item, critical_count, slot );

		} else if( location == "la" ) {
			this._assignItemToArea( this.criticals.leftArm, item, critical_count, slot );

		} else if( location == "rl" ) {
			this._assignItemToArea( this.criticals.rightLeg, item, critical_count, slot );

		} else if( location == "ll" ) {
			this._assignItemToArea( this.criticals.leftLeg, item, critical_count, slot );

		} else  {
			return item;
		}

	} else {
		return item;
	}
}

Mech.prototype._isNextXCritsAvailable = function( area_array, critical_count, begin_slot ) {
	returnValue = true;
	for( isca_c = 0; isca_c < critical_count; isca_c++ ) {
		if( area_array[begin_slot + isca_c] != null) {
			returnValue = false;
		}
	}
	return returnValue;
}

Mech.prototype._assignItemToArea = function( area_array, new_item, critical_count, slot_number ) {

	var placeholder = {
		uuid: new_item.uuid,
		name: "placeholder",
		placeholder: true
	};

	if( typeof(slot_number) == "undefined" || slot_number === null) {
		// place anywhere available
		for( array_count = 0; array_count < area_array.length; array_count++) {
			if(area_array[array_count] == null ) {
				if( this._isNextXCritsAvailable( area_array, critical_count - 1, array_count + 1) ) {
					for( var aita_c = 0; aita_c < critical_count; aita_c++ ) {
						if( aita_c == 0) {
							area_array[aita_c + array_count] = new_item;
						} else {
							area_array[aita_c + array_count] = placeholder;
						}
					}
					return true;
				}
			}
		}
	} else {
		// at specified slot
		if(area_array[slot_number] == null ) {
			if( this._isNextXCritsAvailable( area_array, critical_count - 1, slot_number + 1) ) {

				for( var aita_c = 0; aita_c < critical_count; aita_c++ ) {
					if( aita_c == 0) {
						area_array[aita_c + slot_number] = new_item;
					} else {
						area_array[aita_c + slot_number] = placeholder;
					}
				}
				return true;
			}
		}
	}

	return false;
}


Mech.prototype.canBeAssignedToArea = function( area_array, new_item, critical_count, slot_number ) {

	if( typeof(slot_number) == "undefined" || slot_number === null) {
		// place anywhere available
		for( array_count = 0; array_count < area_array.length; array_count++) {
			if(area_array[array_count] == null ) {
				if( this._isNextXCritsAvailable( area_array, critical_count - 1, array_count + 1) ) {
					return true;
				}
			}
		}
	} else {
		// at specified slot
		if(area_array[slot_number] == null ) {
			if( this._isNextXCritsAvailable( area_array, critical_count - 1, slot_number + 1) ) {
				return true;
			}
		}
	}

	return false;
}

Mech.prototype.trimCriticals = function() {
	this.criticals.head = this.criticals.head.slice(0, 6);

	this.criticals.centerTorso = this.criticals.centerTorso.slice(0, 12);
	this.criticals.leftTorso = this.criticals.leftTorso.slice(0, 12);
	this.criticals.rightTorso = this.criticals.rightTorso.slice(0, 12);



	this.criticals.rightLeg = this.criticals.rightLeg.slice(0, 6);
	this.criticals.leftLeg = this.criticals.leftLeg.slice(0, 6);

	if( this.mech_type.class.toLowerCase() == "quad") {
		this.criticals.rightArm = this.criticals.rightArm.slice(0, 6);
		this.criticals.leftArm = this.criticals.leftArm.slice(0, 6);
	} else {
		this.criticals.rightArm = this.criticals.rightArm.slice(0, 12);
		this.criticals.leftArm = this.criticals.leftArm.slice(0, 12);
	}
}

Mech.prototype.getHeatSinksType = function() {
	return this.heatSinkType.tag;
}

Mech.prototype.setHeatSinksType = function(newValue) {
	for( var lCounter = 0; lCounter < mechHeatSinkTypes.length; lCounter++ ) {
		if( mechHeatSinkTypes[ lCounter ].tag == newValue )
			this.heatSinkType = mechHeatSinkTypes[ lCounter ];
	}

	return this.heatSinkType;
}

Mech.prototype.getCurrentTonnage = function() {
	return this.current_tonnage;
}

Mech.prototype.getHeatSinkCriticalRequirements = function() {

	return this.heat_sink_criticals;
}


Mech.prototype.getArmorAllocations = function() {
	return this.armorAllocation;
}

Mech.prototype.getRemainingTonnage = function() {

	return this.remaining_tonnage;

}

Mech.prototype.getMoveHeat = function() {
	return this.max_move_heat;
}

Mech.prototype.getWeaponHeat = function() {
	return this.max_weapon_heat;
}

Mech.prototype.getHeatDissipation = function() {
	return this.heat_dissipation;
}

Mech.prototype.getWalkSpeed = function() {
	return this.walkSpeed;
}

Mech.prototype.setWalkSpeed = function(walkSpeed) {
	this.walkSpeed = walkSpeed / 1;
	this.setEngine( this.tonnage * this.walkSpeed );

	if( this.jumpSpeed > this.walkSpeed )
		this.setJumpSpeed( this.walkSpeed );

	return this.walkSpeed;
}

Mech.prototype.getRunSpeed = function() {
	return this.runSpeed;
}

Mech.prototype.getJumpSpeed = function() {
	return this.jumpSpeed;
}

Mech.prototype.setJumpSpeed = function(jumpSpeed) {
	this.jumpSpeed = jumpSpeed / 1;
	this._calc();
	return this.walkSpeed;
}

Mech.prototype.getArmorWeight = function() {
	return this.armorWeight;
}

Mech.prototype.getArmorType = function() {
	return this.armorType.tag;
}

Mech.prototype.getArmorObj = function() {
	return this.armorType;
}


Mech.prototype.setArmorType = function( armorTag ) {
	for( var aCount = 0; aCount < mechArmorTypes.length; aCount++ ) {
		if( mechArmorTypes[ aCount ].tag == armorTag ) {
			this.armorType = mechArmorTypes[ aCount ];
		}
	}
	return this.armorType;
}

Mech.prototype.getTotalArmor = function() {
	return this.total_armor;
}

Mech.prototype.getUnallocatedArmor = function() {
	return this.unallocated_armor;
}

Mech.prototype.setArmorWeight = function(armorWeight) {
	this.armorWeight = armorWeight / 1;
	this._calc();
	return this.armorWeight;
}

Mech.prototype.getEngine = function() {
	return this.engine;
}

Mech.prototype.setEngine = function(ratingNumber) {
	ratingNumber = ratingNumber / 1;
	for( engine_count = 0; engine_count < mechEngineOptions.length; engine_count++ ) {
		if( mechEngineOptions[engine_count].rating == ratingNumber) {
			this.engine = mechEngineOptions[engine_count];
			this._calc();
			return this.engine;
		}
	}
	this._calc();
	return 0;
}

Mech.prototype.getInternalStructureType = function() {
	return this.selectedInternalStructure.tag;
}

Mech.prototype.setInternalStructureType = function( isTag ) {
	for( lCounter = 0; lCounter < mechInternalStructureTypes.length ;lCounter++) {
		if( isTag == mechInternalStructureTypes[ lCounter ].tag ) {
			this.selectedInternalStructure = mechInternalStructureTypes[ lCounter ];
			return this.selectedInternalStructure;
		}
	}

	return null;
}


Mech.prototype.getGyro = function()  {
	return this.gyro;
}


Mech.prototype.getEra = function()  {
	return this.era;
}

Mech.prototype.setEra = function( eraID )  {

	for( lcounter = 0; lcounter < btEraOptions.length; lcounter++) {
		if( eraID == btEraOptions[lcounter].id ) {
			this.era = btEraOptions[lcounter];
			this._calc();
			return this.era;
		}
	}
	return null;
}


Mech.prototype.getTech = function()  {
	return this.tech;
}

Mech.prototype.setTech = function( techID )  {
	for( lcounter = 0; lcounter < btTechOptions.length; lcounter++) {
		if( techID == btTechOptions[lcounter].id ) {
			this.tech = btTechOptions[lcounter];
			this._calc();

			// set era to Clan Invasion (id 3) if the techID is 2 (Clan)
			if( techID == 2 && this.getEra().id != 3 ) {
				this.setEra( 3 );
			}

			return this.tech;
		}
	}
	return null;
}


Mech.prototype.getMechType = function()  {
	return this.mech_type;
}

Mech.prototype.setMechType = function( typeID )  {
	for( lcounter = 0; lcounter < mechTypeOptions.length; lcounter++) {
		if( typeID == mechTypeOptions[lcounter].id ) {
			this.mech_type = mechTypeOptions[lcounter];
			this.setTonnage( this.tonnage );
			this._calc();
			return this.mech_type;
		}
	}

	return null;
}

Mech.prototype.setEngineType = function(engineType) {
	for( lcounter = 0; lcounter < mechEngineTypes.length; lcounter++) {
		if( engineType.toLowerCase() == mechEngineTypes[lcounter].tag) {
			this.engineType = mechEngineTypes[lcounter];
			this._calc();
			return this.engineType;
		}
	}
	// default to Military Standard if tag not found.
	this.engineType = mechEngineTypes[0];
	return this.engineType;
}

Mech.prototype.setGyroType = function(gyroType) {
	for( lcounter = 0; lcounter < mechGyroTypes.length; lcounter++) {
		if( gyroType.toLowerCase() == mechGyroTypes[lcounter].tag) {
			this.gyro = mechGyroTypes[lcounter];
			this._calc();
			return this.gyro;
		}
	}
	// default to Military Standard if tag not found.
	this.gyro = mechGyroTypes[0];
	return this.gyro;
}

Mech.prototype.getEngineType = function() {
	return this.engineType;
}


Mech.prototype.getEngineName = function() {
	if( this.engineType.name[ this.useLang ] )
		return this.engineType.name[ this.useLang ];
	else
		return this.engineType.name["en-US"];
}

Mech.prototype.getHeatSyncName = function() {

	if( this.heat_sink_type == "single" ) {
		return this.getTranslation( "BM_STEP3_SINGLE_HS" );
	} else {
		return this.getTranslation( "BM_STEP3_DOUBLE_HS" );
	}


}

Mech.prototype.getGyroName = function() {
	if( this.gyro.name[ this.useLang ] )
		return this.gyro.name[ this.useLang ];
	else
		return this.gyro.name["en-US"];
}


Mech.prototype.getName = function() {
	return this.make;
}

Mech.prototype.setName = function(newValue) {
	this.make = newValue;
	return this.make;
}

Mech.prototype.getTonnage = function() {
	return this.tonnage;
}

Mech.prototype.setTonnage = function(newValue) {
	this.tonnage = parseInt(newValue);

	//~ console.log( this.selectedInternalStructure.perTon );

	this.internalStructure.head = this.selectedInternalStructure.perTon[ this.getTonnage() ].head;

	this.internalStructure.centerTorso = this.selectedInternalStructure.perTon[ this.getTonnage() ].centerTorso;
	this.internalStructure.leftTorso =  this.selectedInternalStructure.perTon[ this.getTonnage() ].rlTorso;
	this.internalStructure.rightTorso =  this.selectedInternalStructure.perTon[ this.getTonnage() ].rlTorso;

	this.internalStructure.rightArm =  this.selectedInternalStructure.perTon[ this.getTonnage() ].rlArm;
	this.internalStructure.leftArm =  this.selectedInternalStructure.perTon[ this.getTonnage() ].rlArm;

	this.internalStructure.rightLeg =  this.selectedInternalStructure.perTon[ this.getTonnage() ].rlLeg;
	this.internalStructure.leftLeg =  this.selectedInternalStructure.perTon[ this.getTonnage() ].rlLeg;

	this.max_armor =  9 + this.internalStructure.centerTorso * 2 + this.internalStructure.leftTorso * 2 + this.internalStructure.rightTorso * 2 + this.internalStructure.rightLeg * 2 + this.internalStructure.leftLeg * 2;
	if( this.mech_type.class.toLowerCase() == "biped")
		this.max_armor +=  this.internalStructure.leftArm * 2 + this.internalStructure.rightArm * 2;
	else
		this.max_armor +=  this.internalStructure.rightLeg * 2 + this.internalStructure.leftLeg * 2;


	if( this.mech_type.class.toLowerCase() == "quad") {
		this.internalStructure.rightArm = this.internalStructure.rightLeg;
		this.internalStructure.leftArm = this.internalStructure.leftLeg;
	}

	this.max_armor_tonnage = this.max_armor / 16;

	this.totalInternalStructurePoints = 0;

	this.totalInternalStructurePoints += this.internalStructure.head;

	this.totalInternalStructurePoints += this.internalStructure.centerTorso;
	this.totalInternalStructurePoints += this.internalStructure.leftTorso;
	this.totalInternalStructurePoints += this.internalStructure.rightTorso;

	this.totalInternalStructurePoints += this.internalStructure.rightArm;
	this.totalInternalStructurePoints += this.internalStructure.leftArm;

	this.totalInternalStructurePoints += this.internalStructure.rightLeg;
	this.totalInternalStructurePoints += this.internalStructure.leftLeg;

	this.setWalkSpeed( this.walkSpeed );
	this._calc();

	return this.tonnage;
}


Mech.prototype.getMaxArmorTonnage = function() {
	return this.max_armor_tonnage;
}

Mech.prototype.getMaxArmor = function() {
	return this.max_armor;
}


Mech.prototype.getType = function() {
	return this.mech_type;
}

Mech.prototype.setType = function(newValue) {
	this.mech_type = newValue;
	this.setTonnage( this.tonnage );
	this._calc();
	return this.mech_type;
}



Mech.prototype.exportJSON = function() {
	// TODO
	this._calc();
	var export_object = {};
	export_object.name = this.getName();
	export_object.tonnage = this.getTonnage();
	export_object.walkSpeed = this.walkSpeed;
	export_object.jumpSpeed = this.jumpSpeed;
	export_object.engineType = this.getEngineType().tag;

	export_object.mech_type = this.mech_type.id;
	export_object.era = this.era.id;
	export_object.tech = this.tech.id;

	export_object.gyro = this.gyro.tag;

	export_object.is_type = this.getInternalStructureType();

	export_object.additional_heat_sinks = this.additional_heat_sinks;
	export_object.heat_sink_type = this.getHeatSinksType();

	export_object.armor_weight = this.armorWeight;
	if(!this.uuid)
		this.uuid = generateUUID();

	export_object.uuid = this.uuid;

	export_object.strict_era = this.strictEra;

	export_object.armor_allocation = this.armorAllocation;

	export_object.armor_type = this.getArmorType();

	export_object.equipment = Array();

	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		export_object.equipment.push(
			{
				tag: this.equipmentList[eq_count].tag,
				loc: this.equipmentList[eq_count].location,
				rear: this.equipmentList[eq_count].rear
			}
		);
	}

	export_object.allocation = this.criticalAllocationTable;
	export_object.features = Array();
	if( !this.hasLowerArmActuator("la") )
		export_object.features.push("no_lala");
	if( !this.hasLowerArmActuator("ra") )
		export_object.features.push("no_rala");
	if( !this.hasHandActuator("la") )
		export_object.features.push("no_laha");
	if( !this.hasHandActuator("ra") )
		export_object.features.push("no_raha");
	if( this.small_cockpit )
		export_object.features.push("sm_cockpit");

	export_object.pilot = this.pilot;

	export_object.as_role = this.alphaStrikeForceStats.role;
	export_object.as_custom_name = this.alphaStrikeForceStats.customName;

	return JSON.stringify(export_object);
}

Mech.prototype.getInteralStructure = function() {
	return this.internalStructure;
}

Mech.prototype.setASRole = function( newValue ) {
	return this.alphaStrikeForceStats.role = newValue;
}

Mech.prototype.setASCustomName = function( newValue ) {
	return this.alphaStrikeForceStats.customName = newValue;
}

Mech.prototype.getASCustomName = function( newValue ) {
	return this.alphaStrikeForceStats.customName;
}


Mech.prototype.importJSON = function(json_string) {
	// TODO

	try {
		import_object = JSON.parse( json_string );
	}
	catch( err ) {
		return false;
	}

	if( typeof(import_object) == "object") {
			this.setName( import_object.name );
			if( import_object.mech_type )
				this.setMechType( import_object.mech_type );

			this.setTonnage( import_object.tonnage );

			if( import_object.era )
				this.setEra( import_object.era );

			if( import_object.tech )
				this.setTech( import_object.tech );

			if( import_object.pilot )
				this.pilot = import_object.pilot;

			if( import_object.as_role )
				this.setASRole( import_object.as_role );

			if( import_object.armor_type )
				this.setArmorType( import_object.armor_type );

			if( import_object.as_custom_name  )
				this.setASCustomName( import_object.as_custom_name ) ;

			if( import_object.is_type  )
				this.setInternalStructureType( import_object.is_type ) ;

			if( import_object.walkSpeed )
				this.setWalkSpeed( import_object.walkSpeed );

			if( import_object.jumpSpeed )
				this.setJumpSpeed( import_object.jumpSpeed );

			if( typeof(import_object.strict_era) != "undefined" ) {
				if( import_object.strict_era )
					this.strictEra = 1;
				else
					this.strictEra = 0;
			}

			if( import_object.gyro )
				this.setGyroType( import_object.gyro );

			if( import_object.engineType )
				this.setEngineType( import_object.engineType );

			if( import_object.additional_heat_sinks )
				this.setAdditionalHeatSinks( import_object.additional_heat_sinks );

			if( import_object.heat_sink_type )
				this.setHeatSinksType( import_object.heat_sink_type );



			if( import_object.armor_weight )
				this.setArmorWeight( import_object.armor_weight );

			if( import_object.armor_allocation )
				this.armorAllocation = import_object.armor_allocation;

			if( import_object.uuid )
				this.uuid = import_object.uuid;


			if( import_object.features ) {


				// Lower Arm Actuators
				if ( import_object.features.indexOf( "no_rala" ) > -1 )
					this.removeLowerArmActuator( "ra" );
				if ( import_object.features.indexOf( "no_lala" ) > -1)
					this.removeLowerArmActuator( "la" );

				// Hand Actuators
				if ( import_object.features.indexOf( "no_raha" ) > -1 )
					this.removeHandActuator( "ra" );
				if ( import_object.features.indexOf( "no_laha" ) > -1)
					this.removeHandActuator( "la" );

				// Small Cockpit
				if ( import_object.features.indexOf( "sm_cockpit" ) > -1)
					this.small_cockpit = true;

				// Other features
			}

			if( import_object.equipment ) {
				for( eq_count = 0; eq_count < import_object.equipment.length; eq_count++) {

					import_item = import_object.equipment[eq_count];
					// if( this.getTech().tag == "is")
					// 	this.addEquipmentFromTag( import_item.tag, import_item.loc );
					// if( this.getTech().tag == "clan")
					// 	this.addEquipmentFromTag( import_item.tag), null, import_item.loc );
					if( import_item.rear && import_item.rear > 0)
						import_item.rear = true;
					else
						import_item.rear = false;
					this.addEquipmentFromTag( import_item.tag, this.getTech().tag, import_item.loc, import_item.rear );
				}
			}

			if( import_object.allocation ) {
				this.criticalAllocationTable = import_object.allocation;

				for( var eq_count = 0; eq_count < this.criticalAllocationTable.length; eq_count++) {
					if( !this.criticalAllocationTable[ eq_count ].rear )
						this.criticalAllocationTable[ eq_count ].rear = false;
					else
						this.criticalAllocationTable[ eq_count ].rear = true;
				}
			}

			if( !this.useLang && localStorage["tmp.preferred_language"] )
				this.useLang = localStorage["tmp.preferred_language"];

			this._calc();
			return true;
	} else {
			return false;
	}

}

Mech.prototype.getWeightBreakdown = function() {
	return this.weights;
}

Mech.prototype.setCenterTorsoArmor = function( armorValue ) {
	this.armorAllocation.centerTorso = armorValue / 1;
	this._calc();
	return this.armorAllocation.centerTorso;
}

Mech.prototype.setCenterTorsoRearArmor = function( armorValue ) {
	this.armorAllocation.centerTorsoRear = armorValue / 1;
	this._calc();
	return this.armorAllocation.centerTorsoRear;
}

Mech.prototype.setHeadArmor = function( armorValue ) {
	this.armorAllocation.head = armorValue / 1;
	this._calc();
	return this.armorAllocation.head;
}

Mech.prototype.setLeftArmArmor = function( armorValue ) {
	this.armorAllocation.leftArm = armorValue / 1;
	this._calc();
	return this.armorAllocation.leftArm;
}

Mech.prototype.setLeftLegArmor = function( armorValue ) {
	this.armorAllocation.leftLeg = armorValue / 1;
	this._calc();
	return this.armorAllocation.leftLeg;
}

Mech.prototype.setLeftTorsoArmor = function( armorValue ) {
	this.armorAllocation.leftTorso = armorValue / 1;
	this._calc();
	return this.armorAllocation.leftTorso;
}

Mech.prototype.setLeftTorsoRearArmor = function( armorValue ) {
	this.armorAllocation.leftTorsoRear = armorValue / 1;
	this._calc();
	return this.armorAllocation.leftTorsoRear;
}

Mech.prototype.setRightArmArmor = function( armorValue ) {
	this.armorAllocation.rightArm = armorValue / 1;
	this._calc();
	return this.armorAllocation.rightArm;
}

Mech.prototype.setRightLegArmor = function( armorValue ) {
	this.armorAllocation.rightLeg = armorValue / 1;
	this._calc();
	return this.armorAllocation.rightLeg;
}

Mech.prototype.setRightTorsoArmor = function( armorValue ) {
	this.armorAllocation.rightTorso = armorValue / 1;
	this._calc();
	return this.armorAllocation.rightTorso;
}

Mech.prototype.setRightTorsoRearArmor = function( armorValue ) {
	this.armorAllocation.rightTorsoRear = armorValue / 1;
	this._calc();
	return this.armorAllocation.rightTorsoRear;
}

Mech.prototype.getAdditionalHeatSinks = function() {
	return this.additional_heat_sinks;
};


Mech.prototype.addEquipment = function(equipment_index, equipment_list_tag, location, rear) {
	equipment_list = Array();
	if( equipment_list_tag == "is") {
		equipment_list = mechISEquipment;

	}

	if( equipment_list_tag == "clan" ){
		equipment_list = mechClanEquipment;
	}

	if( equipment_list[equipment_index] ) {
		if( typeof(jQuery) != "undefined" ) {
			equipment_item = jQuery.extend({}, equipment_list[equipment_index]);
		}
		if( typeof(angular) != "undefined" ) {
			equipment_item = angular.copy(equipment_list[add_counter] );
		}
		if( typeof(location) != "undefined" )
			equipment_item.location = location;
		if( typeof(rear) != "undefined" )
			equipment_item.rear = rear;
		else
			equipment_item.rear = false;
		this.equipmentList.push( equipment_item );
		return equipment_item;
	}

	return null;
};

Mech.prototype.addEquipmentFromTag = function(equipment_tag, equipment_list_tag, location, rear) {
	equipment_list = Array();

	if( !equipment_list_tag ) {
		equipment_list_tag = this.tech.tag;
	}

	if( equipment_list_tag == "is") {
		equipment_list = mechISEquipment;

	}

	if( equipment_list_tag == "clan" ){
		equipment_list = mechClanEquipment;
	}

	for( add_counter = 0; add_counter < equipment_list.length; add_counter++) {
		if( equipment_tag == equipment_list[add_counter].tag ) {
			if( typeof(jQuery) != "undefined" ) {
				equipment_item = jQuery.extend({}, equipment_list[equipment_index]);
			}
			if( typeof(angular) != "undefined" ) {
				equipment_item = angular.copy(equipment_list[add_counter] );
			}
			if( typeof(location) != "undefined" )
				equipment_item.location = location;
			equipment_item.rear = rear;
			this.equipmentList.push( equipment_item );
			return equipment_item;
		}
	}

	return null;
};

Mech.prototype.removeEquipment = function(equipment_index) {
	if( this.equipmentList[equipment_index] ) {
		this.equipmentList.splice(equipment_index, 1);
		return 1;
	}
	return null;
};

Mech.prototype.setRear = function(equipment_index, newValue) {
	if( this.equipmentList[equipment_index] ) {
		this.equipmentList[equipment_index].rear = newValue;
	}
	return this.equipmentList[equipment_index].rear;
};

Mech.prototype.updateCriticalAllocationTable = function() {
	this.criticalAllocationTable = Array();
	for( mech_location in this.criticals ) {

		for( var crit_item_counter = 0; crit_item_counter < this.criticals[mech_location].length; crit_item_counter++) {
			if(
				this.criticals[mech_location] &&
				this.criticals[mech_location][crit_item_counter] &&
				this.criticals[mech_location][crit_item_counter].movable
			) {
				short_loc = "";
				if(mech_location == "head" ) {
					short_loc = "hd";
				} else if( mech_location == "centerTorso" ) {
					short_loc = "ct";
				} else if( mech_location == "rightTorso" ) {
					short_loc = "rt";
				} else if( mech_location == "rightLeg" ) {
					short_loc = "rl";
				} else if( mech_location == "rightArm" ) {
					short_loc = "ra";
				} else if( mech_location == "leftTorso" ) {
					short_loc = "lt";
				} else if( mech_location == "leftLeg" ) {
					short_loc = "ll";
				} else if( mech_location == "leftArm" ) {
					short_loc = "la";
				}

				var rear = false;
				if( this.criticals[mech_location][crit_item_counter].rear || ( this.criticals[mech_location][crit_item_counter].obj && this.criticals[mech_location][crit_item_counter].obj.rear )  )
					rear = true;

				if(this.criticals[mech_location][crit_item_counter] && this.criticals[mech_location][crit_item_counter].obj)
					this.criticals[mech_location][crit_item_counter].obj.location = short_loc;

				this.criticalAllocationTable.push(
					{
						tag: this.criticals[mech_location][crit_item_counter].tag,
						loc: short_loc,
						rear: rear,
						slot: crit_item_counter
					}
				);
			}
		}
	}
	// this._calc();


};

Mech.prototype.moveCritical = function ( itemTag, itemRear, fromLocation, fromIndex, toLocation, toIndex ) {



	fromItem = null
	fromLocationObj = null;
	if( fromLocation == "un" ) {
		if( this.unallocatedCriticals[fromIndex] ) {
			fromItem = this.unallocatedCriticals[fromIndex];

		}
		fromLocationObj = this.unallocatedCriticals;
	} else if(fromLocation == "hd" ) {
		if( this.criticals.head[fromIndex] ) {
			fromItem = this.criticals.head[fromIndex];
			fromLocationObj = this.criticals.head;
		}
	} else if( fromLocation == "ct" ) {
		if( this.criticals.centerTorso[fromIndex] ) {
			fromItem = this.criticals.centerTorso[fromIndex];
			fromLocationObj = this.criticals.centerTorso;
		}
	} else if( fromLocation == "rt" ) {
		if( this.criticals.rightTorso[fromIndex] ) {
			fromItem = this.criticals.rightTorso[fromIndex];
			fromLocationObj = this.criticals.rightTorso;
		}
	} else if( fromLocation == "ra" ) {
		if( this.criticals.rightArm[fromIndex] ) {
			fromItem = this.criticals.rightArm[fromIndex];
			fromLocationObj = this.criticals.rightArm;
		}
	} else if( fromLocation == "rl" ) {
		if( this.criticals.rightLeg[fromIndex] ) {
			fromItem = this.criticals.rightLeg[fromIndex];
			fromLocationObj = this.criticals.rightLeg;
		}
	} else if( fromLocation == "lt" ) {
		if( this.criticals.leftTorso[fromIndex] ) {
			fromItem = this.criticals.leftTorso[fromIndex];
			fromLocationObj = this.criticals.leftTorso;
		}
	} else if( fromLocation == "la" ) {
		if( this.criticals.leftArm[fromIndex] ) {
			fromItem = this.criticals.leftArm[fromIndex];
			fromLocationObj = this.criticals.leftArm;
		}
	} else if( fromLocation == "ll" ) {
		if( this.criticals.leftLeg[fromIndex] ) {
			fromItem = this.criticals.leftLeg[fromIndex];
			fromLocationObj = this.criticals.leftLeg;
		}
	}

;

	if( fromItem ) {

		if( toLocation == "hd" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.head, toIndex );
		} else if( toLocation == "ct" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.centerTorso, toIndex );
		} else if( toLocation == "rt" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.rightTorso, toIndex );
		} else if( toLocation == "rl" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.rightLeg, toIndex );
		} else if( toLocation == "ra" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.rightArm, toIndex );
		} else if( toLocation == "lt" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.leftTorso, toIndex );
		} else if( toLocation == "ll" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.leftLeg, toIndex );
		} else if( toLocation == "la" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.leftArm, toIndex );
		}
	}

	return false;
};

Mech.prototype._moveItemToArea = function( fromLocation, itemRear, fromItem, fromIndex, toLocation, toIndex) {


	// Step One check to see if TO has enough slots for item....
	var placeholder = {
		uuid: fromItem.uuid,
		name: "placeholder",
		placeholder: true
	};


	hasSpace = true;
	if( toLocation.length < toIndex + fromItem.crits )
		return false;
	for( var testC = 0; testC < fromItem.crits; testC++ ) {
		if( toLocation[ toIndex + testC ] ) {
			hasSpace = false;
		}
	}

	if( hasSpace ) {
		toLocation[ toIndex ] = fromItem;
		for( var phC = 1; phC < toLocation[ toIndex ].crits; phC++ ) {
			toLocation[ toIndex + phC ] = placeholder;
		}


		fromLocation[ fromIndex ] = null;
		nextCounter = 1;
		while(
			fromLocation[ fromIndex + nextCounter]
				&&
			fromLocation[ fromIndex + nextCounter].name == "placeholder"
				&&
			nextCounter < fromLocation.length
		) {
			fromLocation[ fromIndex  + nextCounter ] = null;
			nextCounter++;
		}
		return true;

	}

	return false;

}

Mech.prototype._allocateCritical = function(equipment_tag, equipment_rear, mech_location, slot_number, remove_from_unallocated) {

	for(uaet_c = 0; uaet_c < this.unallocatedCriticals.length; uaet_c++) {

		if(
			equipment_tag == this.unallocatedCriticals[uaet_c].tag
				&&
			this.unallocatedCriticals[uaet_c].rear == equipment_rear
		) {
			if(  this.unallocatedCriticals[uaet_c] && this.unallocatedCriticals[uaet_c].obj )
				this.unallocatedCriticals[uaet_c].obj.location = mech_location;

			if(mech_location == "hd" ) {
				this._assignItemToArea( this.criticals.head, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "ct" ) {
				this._assignItemToArea( this.criticals.centerTorso, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "rt" ) {
				this._assignItemToArea( this.criticals.rightTorso, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "rl" ) {
				this._assignItemToArea( this.criticals.rightLeg, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "ra" ) {
				this._assignItemToArea( this.criticals.rightArm, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "lt" ) {
				this._assignItemToArea( this.criticals.leftTorso, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "ll" ) {
				this._assignItemToArea( this.criticals.leftLeg, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "la" ) {
				this._assignItemToArea( this.criticals.leftArm, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
			}


			if( remove_from_unallocated ) {
				this.unallocatedCriticals.splice(uaet_c, 1);
			}

			return true;
		}
	}
	return null;
};

Mech.prototype.clearHeatSinkCriticals = function() {
	for( alloc_c = this.criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
		if( this.criticalAllocationTable[alloc_c] && this.criticalAllocationTable[alloc_c].tag == "heat-sink" )
			this.criticalAllocationTable.splice(alloc_c, 1);
	}

	this._calc();
};

Mech.prototype.clearArmCriticalAllocationTable = function() {
	for( alloc_c = this.criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
		if(
			this.criticalAllocationTable[alloc_c] && this.criticalAllocationTable[alloc_c].loc == "ra"
				||
			this.criticalAllocationTable[alloc_c] && this.criticalAllocationTable[alloc_c].loc == "la"
		) {
			this.criticalAllocationTable.splice(alloc_c, 1);
		}
	}
	this._calc();
}

Mech.prototype.clearCriticalAllocationTable = function() {
	this.criticalAllocationTable = Array();

	this._calc();

}

Mech.prototype.setEquipmentLocation = function(equipment_index, location) {
	if( this.equipmentList[equipment_index] ) {
		this.equipmentList[equipment_index].location = location;
		return this.equipmentList[equipment_index];
	}
	return null;
};

Mech.prototype.setAdditionalHeatSinks = function(newValue) {
	this.additional_heat_sinks = newValue / 1;
	this._calc();
	return this.additional_heat_sinks;
};

Mech.prototype.getUnallocatedCritCount = function() {
	return this.unallocatedCriticals.length;
}

Mech.prototype.getInstalledEquipment = function() {
	return this.equipmentList;
};

var asBuilderArray = [
	'$rootScope',
	'$translate',
	'$scope',
	'$http',
	'$location',
	function ($rootScope, $translate, $scope, $http, $location) {
		$rootScope.showSciFiCreatorMenu = false;
		$rootScope.showChargenMenu = false;

		$scope.goHome = function() {

			delete(localStorage["backToPath"]);
			$location.url("/");
		}

		$translate(['APP_TITLE', 'WELCOME_BUTTON_ALPHA_STRIKE']).then(function (translation) {
			$rootScope.title_tag = translation.WELCOME_BUTTON_ALPHA_STRIKE + " | " + translation.APP_TITLE;
			$rootScope.subtitle_tag = translation.WELCOME_BUTTON_ALPHA_STRIKE;

		});

			localStorage["backToPath"] = $location.$$path;

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


var asPlayViewArray = [
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

		//~ console.log($scope.currentLance);
		$scope.updateMemberCounts();
	}
];
angular.module("webApp").controller(
	"asPlayViewController",
	asPlayViewArray
);

angular.module("cordovaApp").controller(
	"asPlayViewController",
	asPlayViewArray
);


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




var battlemechCreatorControllerExportsArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		'$sce',
		'$compile',
		function ($rootScope, $translate, $scope, $location, $sce, $compile) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_EXPORTS_TITLE', 'BM_EXPORTS_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_EXPORTS_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_EXPORTS_DESC )
					$scope.h3_title = translation.BM_EXPORTS_TITLE + ": " + translation.BM_EXPORTS_DESC;
				else
					$scope.h3_title = translation.BM_EXPORTS_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}



			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			$scope.makeTROBBCode = $scope.current_mech.makeTROBBCode();

			$scope.mechJSON = $scope.current_mech.exportJSON();

			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();

			//~ $scope.isIOSStandAlone = isIOSStandAlone();


			//~ $scope.troIOSPDFLinkClick = function() {
				//~ var troPDF = makeBattlemechTROPDF($scope.current_mech);
				//~ var troPDFData = troPDF.output('datauristring');
				//~ $scope.troIOSPDFLink =  "pages/ios-standalone-pdf.html#" + troPDFData;
			//~ }

			//~ $scope.rsIOSPDFLinkClick = function() {
				//~ var rsPDFData = makeBattlemechRecordSheetPDF($scope.current_mech);
				//~ var rsPDFData = rsPDFData.output('datauristring');
				//~ $scope.rsIOSPDFLink =  "pages/ios-standalone-pdf.html#" + rsPDFData;
			//~ }

			//~ $scope.combIOSPDFLinkClick = function() {
				//~ var combPDF = makeBattlemechCombinedPDF($scope.current_mech);
				//~ var combPDFData = combPDF.output('datauristring');
				//~ $scope.combIOSPDFLink =  "pages/ios-standalone-pdf.html#" + combPDFData;
			//~ }

			//~ $scope.makeRecordSheet = function() {
				//~ pdf = makeBattlemechRecordSheetPDF($scope.current_mech);
			//~ //	pdf.save($scope.current_mech.getName() + ' - Record Sheet.pdf');
			//~ }

			//~ $scope.makeTROSheet = function() {
				//~ pdf = makeBattlemechTROPDF($scope.current_mech);
				//~ pdf.save($scope.current_mech.getName() + ' - TRO.pdf');
			//~ }
			//~ $scope.makeCombinedSheet = function() {
				//~ pdf = makeBattlemechCombinedPDF($scope.current_mech);
				//~ pdf.save($scope.current_mech.getName() + ' - Record Sheet and TRO.pdf');
			//~ }

			//~ $scope.updateSVG = function( tmpText ) {
				//~ if( typeof( tmpText ) == "undefined" )
					//~ tmpText = "";
				//~ console.log( "updateSVG", tmpText );

				//~ var rawSVG = $scope.current_mech.makeSVGRecordSheet(tmpText);
				//~ var compiled = $scope.current_mech.makeSVGRecordSheet(rawSVG)
				//~ $scope.recordSheetSVG =  $sce.trustAsHtml( compiled );
				//~ compiled( $scope.recordSheetSVG  )
				//~ var el = document.getElementById( 'testsvg' );
				//~ angular.element(el).append( $compile( rawSVG )($scope) )
				//~ el = $compile( angular.element( rawSVG ) )($scope);
				//~ //var element = $compile(angular.element( rawSVG ))(scope);

			//~ }

			//~ $scope.updateSVG();


		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerExports",
	battlemechCreatorControllerExportsArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerExports",
	battlemechCreatorControllerExportsArray
);

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


			update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);

			$scope.selectedStrict = false;

			if( $scope.current_mech.strictEra > 0 )
				$scope.selectedStrict = true;

			$scope.update_mech_era_strict = function( newValue ) {
				if( newValue )
					$scope.current_mech.strictEra = 1;
				else
					$scope.current_mech.strictEra = 0;
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
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

				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			};

			$scope.update_mech_tech = function() {
				$scope.current_mech.setTech( $scope.mech_tech.selectedOption.id );

				$scope.mech_era.selectedOption = $scope.current_mech.getEra();

				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			};

			$scope.update_mech_type = function() {
				$scope.current_mech.setMechType( $scope.mech_type.selectedOption.id );
				// Remove any assigned criticals in the arms...
				$scope.current_mech.clearArmCriticalAllocationTable();
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			};

			$scope.update_mech_era = function() {
				$scope.current_mech.setEra( $scope.mech_era.selectedOption.id );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			};

			$scope.update_mech_tonnage = function() {
				$scope.current_mech.setTonnage( $scope.mech_tonnage.selectedOption );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			};

			$scope.update_mech_selected_is_type = function( newISType ) {
				//~ console.log( "newISType", newISType );
				//~ console.log( "$scope.mech_selected_is_type.tag", $scope.mech_selected_is_type.tag );
				$scope.current_mech.setInternalStructureType( $scope.mech_selected_is_type.tag );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
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

					// TODO calculate the max engine size for tonnage
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
						getItemAvailability (mechEngineTypes[ lCount ], $scope.current_mech.era)
							&&
						// Make sure that the engine is available to the tech selected
						(
							mechEngineTypes[ lCount ].criticals[ $scope.current_mech.tech.tag ]
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
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			}

			$scope.update_gyro_dropdowns = function( translate ) {
				var selected_option = null;
				var availble_options = [];

				for( var lCount = mechGyroTypes.length - 1; lCount > -1; lCount -- ) {
					if( getItemAvailability(mechGyroTypes[ lCount ], $scope.current_mech.era) ) {
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
						if( availble_options[ lCount ].id == $scope.current_mech.gyro.tag ) {
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
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
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
				$scope.current_mech._calc();
			}

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			localStorage["backToPath"] = $location.$$path;

			$scope.update_walking_jumping_dropdowns( $translate );
			update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);

			$scope.update_engine_dropdowns( $translate );
			$scope.update_gyro_dropdowns( $translate );


			$scope.update_mech_walking = function() {
				$scope.current_mech.setWalkSpeed( $scope.mech_walking.selectedOption.id );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				$scope.update_walking_jumping_dropdowns( $translate );
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech );
			}

			$scope.update_mech_jumping = function() {
				$scope.current_mech.setJumpSpeed( $scope.mech_jumping.selectedOption.id );
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

				$scope.update_walking_jumping_dropdowns( $scope, $translate );
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech );
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
			$scope.current_mech = new Mech();
			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.mechHeatSinkTypes = [];
			for( var hsCounter = 0; hsCounter < mechHeatSinkTypes.length; hsCounter++ ) {
				if( mechHeatSinkTypes[ hsCounter ].name[ $scope.current_mech.useLang ] )
					mechHeatSinkTypes[ hsCounter ].local_name = hsItem.name[ $scope.current_mech.useLang ];
				else
					mechHeatSinkTypes[ hsCounter ].local_name = hsItem.name[ "en-US" ];

				$scope.mechHeatSinkTypes.push( mechHeatSinkTypes[ hsCounter ] );

				if( mechHeatSinkTypes[ hsCounter ].tag == $scope.current_mech.getHeatSinksType() )
					$scope.selected_heat_sink_tech = mechHeatSinkTypes[ hsCounter ];
			}

			if( !$scope.selected_heat_sink_tech )
				$scope.selected_heat_sink_tech = $scope.mechHeatSinkTypes[0];

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			var required_label = "";


			localStorage["backToPath"] = $location.$$path;

			$translate(['BM_STEP3_BM_INC_10_HS', 'BM_STEP3_BM_INC_10_DOUBLE_HS', 'BM_STEP3_CRITICAL_REQUIRED' ]).then(function (translation) {
				$scope.label_included_heatsinks = translation.BM_STEP3_BM_INC_10_HS;
				required_label = translation.BM_STEP3_CRITICAL_REQUIRED;
			});

			update_heat_sink_dropdown($scope, $translate, $scope.current_mech);

			update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
			// make tro for sidebar


			$scope.update_selected_heat_sinks = function() {
				$scope.current_mech.setAdditionalHeatSinks( $scope.selected_heat_sinks.id );
				update_heat_sink_dropdown($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.update_selected_heat_sink_tech = function() {
				//~ console.log( "$scope.selected_heat_sink_tech", $scope.selected_heat_sink_tech);
				$scope.current_mech.setHeatSinksType( $scope.selected_heat_sink_tech.tag );
				$scope.current_mech.clearHeatSinkCriticals();
				update_heat_sink_dropdown($scope, $translate, $scope.current_mech);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}
		}
	]
;

function update_heat_sink_dropdown($scope, $translate, current_mech) {

	$translate([ 'BM_STEP3_CRITICAL_REQUIRED', 'BM_STEP3_CRITICAL_REQUIRED_NONE' , 'BM_STEP3_CRITICAL_REQUIRED_SINGLE'  ]).then(function (translation) {

		current_heat_sinks = $scope.current_mech.getHeatSinks() - 10;

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

		remaining_tonnage = Math.floor( $scope.current_mech.getRemainingTonnage() )
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
		var heat_sinks_required = $scope.current_mech.getHeatSinkCriticalRequirements();
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


var battlemechCreatorControllerStep5Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {


			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP5_TITLE', 'BM_STEP5_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP5_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP5_DESC )
					$scope.h3_title = translation.BM_STEP5_TITLE + ": " + translation.BM_STEP5_DESC;
				else
					$scope.h3_title = translation.BM_STEP5_TITLE;
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

			localStorage["backToPath"] = $location.$$path;

			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];
			// make tro for sidebar
			update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);

			$scope.filterEquipmentTerm = "";

			$scope.setCategory = function( selectedCategory ) {
				$scope.filterEquipment( localStorage["tmp.filterEquipmentTerm"], selectedCategory );
			}

			$scope.filterEquipment = function( newFilterTerm, selectedCategory ) {



				if( typeof(newFilterTerm) == "undefined" ) {
					$scope.filterEquipmentTerm = "";
				} else {
					$scope.filterEquipmentTerm = newFilterTerm;
				}

				if( typeof(selectedCategory) == "undefined" ) {
					$scope.selectedEquipmentCategory = "";
				} else {
					$scope.selectedEquipmentCategory = selectedCategory;
				}






				$scope.equipment_table =[];
				$scope.category_list =[];

				if( $scope.current_mech.getTech().tag == "clan") {
					// Use Clan Equipment Table...
					$scope.equipment_table = angular.copy( mechClanEquipment );
					$scope.category_list = angular.copy( mechClanEquipment );
				} else {
					// Use Inner Sphere Equipment Table...
					$scope.equipment_table = angular.copy( mechISEquipment );
					$scope.category_list = angular.copy( mechISEquipment );
				}



				$scope.mechIsStrict = false;
				if( $scope.current_mech.strictEra > 0 )
					$scope.mechIsStrict = true;

				selectedEra = $scope.current_mech.era;

				for(var eqc = $scope.category_list.length - 1; eqc > -1; eqc-- ) {

					if( $scope.category_list[eqc].category[ localStorage["tmp.preferred_language"] ])
						$scope.category_list[eqc].local_category = $scope.category_list[eqc].category[ localStorage["tmp.preferred_language"] ];
					else
						$scope.category_list[eqc].local_category = $scope.category_list[eqc].category[ "en-US" ];
					//~ console.log( "$scope.filterEquipmentTerm.toLowerCase().trim()", $scope.filterEquipmentTerm.toLowerCase().trim() );
					//~ console.log( "$scope.equipment_table[eqc].local_name.toLowerCase()", $scope.equipment_table[eqc].local_name.toLowerCase() );
					//~ console.log("meow", $scope.equipment_table[eqc].local_name.toLowerCase().indexOf( $scope.filterEquipmentTerm.toLowerCase().trim() ));


				}


				if( $scope.selectedEquipmentCategory == "" ) {
					 $scope.selectedEquipmentCategory = $scope.category_list[0].local_category;
				}

				//~ console.log( "filterEquipment", $scope.filterEquipmentTerm, $scope.selectedEquipmentCategory );

				localStorage["tmp.filterEquipmentTerm"] = $scope.filterEquipmentTerm;
				localStorage["tmp.selectedEquipmentCategory"] = $scope.selectedEquipmentCategory;

				$scope.category_list.sort( sortByCategoryThenName );


				for(var eqc = $scope.category_list.length - 1; eqc > -1; eqc-- ) {
					if(
						eqc > 0
							&&
						$scope.category_list[eqc].local_category == $scope.category_list[eqc - 1].local_category
					) {
						$scope.category_list.splice( eqc, 1 );
					}
				}

				for(var eqc = $scope.equipment_table.length - 1; eqc > -1; eqc-- ) {
					if( $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
						$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
					else
						$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ "en-US" ];

					if( $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
						$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
					else
						$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ "en-US" ];


					$scope.equipment_table[eqc].local_space = $scope.equipment_table[eqc].space.battlemech;

					$scope.equipment_table[eqc].isInSelectedEra = false;

					if( getItemAvailability($scope.equipment_table[eqc], selectedEra) ) {
						$scope.equipment_table[eqc].isInSelectedEra = true;
					}

					$scope.equipment_table[eqc].isAvailableAmmoType = false;

					// Check if this is actually ammo
					if ( $scope.equipment_table[eqc].tag.indexOf("ammo") == -1 )
					{
						$scope.equipment_table[eqc].isAvailableAmmoType = true;
					}

					// Scan the installed equipment to check if this item has the same tag (ammo always contains weapon tag)
					var installedEquipment = $scope.current_mech.getInstalledEquipment();
					for( var eCounter = 0; eCounter <  installedEquipment.length; eCounter++ )
					{
						if ( $scope.equipment_table[eqc].tag.indexOf( installedEquipment[ eCounter].tag ) > -1 )
						{
							$scope.equipment_table[eqc].isAvailableAmmoType = true;
						}
					}

					// Remove if filter doesn't match
					if(
						$scope.filterEquipmentTerm.trim().length > 2
							&&
						$scope.equipment_table[eqc].local_name.toLowerCase().indexOf( $scope.filterEquipmentTerm.toLowerCase().trim() ) === -1
					) {

						$scope.equipment_table.splice( eqc, 1 );
					} else {
						if( $scope.filterEquipmentTerm.trim().length < 3 ) {
						// remove if not current category
							if( $scope.selectedEquipmentCategory == "" ) {
								// set to first, then reshuffle.
								$scope.selectedEquipmentCategory = $scope.equipment_table[eqc].local_category
							}

							if(  $scope.equipment_table[eqc].local_category != $scope.selectedEquipmentCategory ) {
								$scope.equipment_table.splice( eqc, 1 );
							}
						}

					}

				}

				$scope.equipment_table.sort( sortByCategoryThenSortThenName );


				//~ console.log( "$scope.category_list", $scope.category_list );

			}

			$scope.filterEquipment( localStorage["tmp.filterEquipmentTerm"], localStorage["tmp.selectedEquipmentCategory"] );

			$translate(['BM_STEP5_SELECT_LOCATION' ]).then(function (translation) {


				$scope.item_locations = [];

				$scope.installed_equipment_table = $scope.current_mech.getInstalledEquipment();

				for(var eqc = 0; eqc < $scope.installed_equipment_table.length; eqc++ ) {
					if( $scope.installed_equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
						$scope.installed_equipment_table[eqc].local_name = $scope.installed_equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
					else
						$scope.installed_equipment_table[eqc].local_name = $scope.installed_equipment_table[eqc].name[ "en-US" ];

					if( $scope.installed_equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
						$scope.installed_equipment_table[eqc].local_category = $scope.installed_equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
					else
						$scope.installed_equipment_table[eqc].local_category = $scope.installed_equipment_table[eqc].category[ "en-US" ];

					$scope.installed_equipment_table[eqc].local_space = $scope.installed_equipment_table[eqc].space.battlemech;

					// $scope.item_locations[eqc] = make_select_object($scope.installed_equipment_table[eqc].location);
				}

				$scope.installed_equipment_table = $scope.installed_equipment_table.sort( sortBySortThenName );

				var location_list = [];
				location_list.push( {
					id: "undefined",
					name: "- " + translation.BM_STEP5_SELECT_LOCATION + " -"
				} );
				for(loccount = 0; loccount < battlemechLocations.length; loccount++) {
					location_list.push( {
						id: battlemechLocations[loccount].tag,
						name: battlemechLocations[loccount].name[ localStorage["tmp.preferred_language"] ]
					} );

				}
				$scope.bm_location_list = {
					availableOptions: location_list //,
					// selectedOption: selected_jumping_mp
				};
			});

			$scope.addItem = function( index_number ) {
				if( $scope.equipment_table[index_number].tag ) {
					$scope.current_mech.addEquipmentFromTag( $scope.equipment_table[index_number].tag );
					update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
					localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();

					$scope.installed_equipment_table = $scope.current_mech.getInstalledEquipment();

					for(var eqc = 0; eqc < $scope.installed_equipment_table.length; eqc++ ) {
						if( $scope.installed_equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
							$scope.installed_equipment_table[eqc].local_name = $scope.installed_equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
						else
							$scope.installed_equipment_table[eqc].local_name = $scope.installed_equipment_table[eqc].name[ "en-US" ];

						if( $scope.installed_equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
							$scope.installed_equipment_table[eqc].local_category = $scope.installed_equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
						else
							$scope.installed_equipment_table[eqc].local_category = $scope.installed_equipment_table[eqc].category[ "en-US" ];

						$scope.installed_equipment_table[eqc].local_space = $scope.installed_equipment_table[eqc].space.battlemech;

						//$scope.item_locations[eqc] = make_select_object($scope.installed_equipment_table[eqc].location);
					}

					$scope.installed_equipment_table = $scope.installed_equipment_table.sort( sortBySortThenName );
				}
			};

			$scope.setRear = function( index_number, newValue ) {
				$scope.current_mech.setRear( index_number, !newValue );
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			};

			$scope.removeItem = function( index_number ) {
				$scope.current_mech.removeEquipment( index_number );
				$scope.item_locations.splice(index_number, 1);
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			};

			$scope.updateLocation = function( index_number ) {

				$scope.current_mech.setEquipmentLocation( index_number, $scope.item_locations[index_number].id );
				update_mech_status_bar_and_tro($scope, $translate, $scope.current_mech);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();


			};
		}
	]
;

function make_select_object(current_tag) {
	for(loccount = 0; loccount < battlemechLocations.length; loccount++) {
		if(  battlemechLocations[loccount].tag == current_tag ) {
			return {
				id: battlemechLocations[loccount].tag,
				name: battlemechLocations[loccount].name[ localStorage["tmp.preferred_language"] ]
			} ;
		}
	}
	return null
}



angular.module("webApp").controller(
	"battlemechCreatorControllerStep5",
	battlemechCreatorControllerStep5Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep5",
	battlemechCreatorControllerStep5Array
);


var battlemechCreatorControllerStep6Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_STEP6_TITLE', 'BM_STEP6_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_STEP6_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_STEP6_DESC )
					$scope.h3_title = translation.BM_STEP6_TITLE + ": " + translation.BM_STEP6_DESC;
				else
					$scope.h3_title = translation.BM_STEP6_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;

			$scope.selectedItem = null;

			if( localStorage["tmp.current_mech"] ) {
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				current_mech.uuid = generateUUID();
				current_mech._calc();
			}

			current_mech.useLang = localStorage["tmp.preferred_language"];

			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			update_step_6_items($scope, current_mech);

			$translate(
				[
					'TRO_ARMOR_HD', 'TRO_ARMOR_CT', 'TRO_ARMOR_RT', 'TRO_ARMOR_LT',
					'TRO_ARMOR_RA', 'TRO_ARMOR_LA', 'TRO_ARMOR_RL', 'TRO_ARMOR_LL',
					'TRO_ARMOR_RFL', 'TRO_ARMOR_LFL', 'TRO_ARMOR_RRL', 'TRO_ARMOR_LRL'
				]
			).then(function (translation) {

				$scope.label_head = translation.TRO_ARMOR_HD;
				$scope.label_center_torso = translation.TRO_ARMOR_CT;
				$scope.label_right_torso = translation.TRO_ARMOR_RT;
				$scope.label_left_torso = translation.TRO_ARMOR_LT;

				if( current_mech.mech_type.class.toLowerCase() == "quad") {
					$scope.battlemech_is_quad = true;
					$scope.label_right_arm = translation.TRO_ARMOR_RFL;
					$scope.label_left_arm = translation.TRO_ARMOR_LFL;
					$scope.label_right_leg = translation.TRO_ARMOR_RRL;
					$scope.label_left_leg = translation.TRO_ARMOR_LRL;
				} else {
					$scope.battlemech_is_quad = false;
					$scope.label_right_arm = translation.TRO_ARMOR_RA;
					$scope.label_left_arm = translation.TRO_ARMOR_LA;
					$scope.label_right_leg = translation.TRO_ARMOR_RL;
					$scope.label_left_leg = translation.TRO_ARMOR_LL;
				}

			});


			$scope.step6ItemClick = function( criticalItem, indexLocation, locationString ) {
				if( typeof(criticalItem) == "undefined")
					criticalItem = null;
				if( typeof(indexLocation) == "undefined")
					indexLocation = null;
				if( typeof(locationString) == "undefined")
					locationString = null;

				$scope.errorCannotPlace = false;
				$scope.errorCannotMove = false;
				$scope.torsosAndHeadOnly = false;
				$scope.legsAndTorsosOnly = false;

				//~ console.log( "step6ItemClick", criticalItem, indexLocation, locationString );
				if( $scope.selectedItem == null ) {
					if( criticalItem != null) {
						if( criticalItem.movable == true ) {
							 $scope.selectedItem = {
								 item: criticalItem,
								 from: locationString,
								 index: indexLocation
							};
						} else {
							//~ console.log( "Unmovable item selected" );
							$scope.errorCannotMove = true;
						}
					} else {
						//~ console.log( "Unallocated area selected" );


					}
				} else {
					if( $scope.selectedItem.item == criticalItem ) {
						$scope.selectedItem = null;
					} else if( criticalItem ) {
						//~ console.log( "Slot is already filled" );
						$scope.errorCannotPlace = true;
					} else {


						if(
							(
								(
									$scope.selectedItem.item.obj
										&&
									$scope.selectedItem.item.obj.rear
								)
									||
								$scope.selectedItem.item.rear
							)
								&&
							(
								locationString == "ra"
									||
								locationString == "la"
									||
								locationString == "rl"
									||
								locationString == "ll"
							)
						) {
							$scope.torsosAndHeadOnly = true;
						} else if(
							$scope.selectedItem.item.tag.indexOf("jj-") === 0
								&&
							(
								locationString == "ra"
									||
								locationString == "la"
									||
								locationString == "hd"
							)
						) {
							$scope.legsAndTorsosOnly = true;
						} else {

							var itemTag =  $scope.selectedItem.item.tag;
							if( $scope.selectedItem.item && $scope.selectedItem.item.obj && $scope.selectedItem.item.obj.rear )
								var itemRear =  $scope.selectedItem.item.obj.rear;
							else
								var itemRear = false;
							var fromLocation =  $scope.selectedItem.from;
							var fromIndex =  $scope.selectedItem.index;
							var toLocation = locationString;
							var toIndex = indexLocation;
							worked = current_mech.moveCritical(
								itemTag,
								itemRear,
								fromLocation,
								fromIndex,
								toLocation,
								toIndex
							);

							if( worked ) {
								//~ console.log( "a", current_mech.criticals.leftTorso )
								current_mech.updateCriticalAllocationTable();
								//~ console.log("b", current_mech.criticals.leftTorso )
								current_mech._calc();
								//~ console.log("c", current_mech.criticals.leftTorso )
								localStorage["tmp.current_mech"] = current_mech.exportJSON();

								update_step_6_items($scope, current_mech);
								update_mech_status_bar_and_tro($scope, $translate, current_mech);

								$scope.selectedItem = null;
							} else {
								$scope.errorCannotPlace = true;
							}
						}
					}

				}
			}


			// make tro for sidebar
			$scope.clickLowerRightArmActuator = function() {
				if( $scope.has_ra_lower_arm_actuator )
					current_mech.addLowerArmActuator("ra");
				else
					current_mech.removeLowerArmActuator("ra");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);

			}
			$scope.clickLowerLeftArmActuator = function() {
				if( $scope.has_la_lower_arm_actuator )
					current_mech.addLowerArmActuator("la");
				else
					current_mech.removeLowerArmActuator("la");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);

			}
			$scope.clickRightHandActuator = function() {

				if( $scope.has_ra_hand_actuator )
					current_mech.addHandActuator("ra");
				else
					current_mech.removeHandActuator("ra");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);

			}
			$scope.clickLeftHandActuator = function() {
				if( $scope.has_la_hand_actuator )
					current_mech.addHandActuator("la");
				else
					current_mech.removeHandActuator("la");

				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			$scope.resetAllocations = function() {
				$scope.selectedItem = null;
				current_mech.clearCriticalAllocationTable();
				current_mech._calc();
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
				update_step_6_items($scope, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

		}
	]
;

function update_step_6_items($scope, current_mech) {

	$scope.has_la_hand_actuator = current_mech.hasHandActuator("la");
	$scope.has_ra_hand_actuator = current_mech.hasHandActuator("ra");
	$scope.has_la_lower_arm_actuator = current_mech.hasLowerArmActuator("la");
	$scope.has_ra_lower_arm_actuator = current_mech.hasLowerArmActuator("ra");

//~ console.log(current_mech.criticals.head );
	current_mech.trimCriticals();

	$scope.battlemech_head = current_mech.criticals.head;

	$scope.battlemech_left_arm = current_mech.criticals.leftArm;

	$scope.battlemech_right_arm = current_mech.criticals.rightArm;

	$scope.battlemech_left_leg = current_mech.criticals.leftLeg;

	$scope.battlemech_right_leg = current_mech.criticals.rightLeg;

	$scope.battlemech_left_torso = current_mech.criticals.leftTorso;

	$scope.battlemech_center_torso = current_mech.criticals.centerTorso;

	$scope.battlemech_right_torso = current_mech.criticals.rightTorso;

	$scope.battlemech_unallocated_items = current_mech.unallocatedCriticals;
	//~ console.log( $scope.battlemech_head );
}

angular.module("webApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerStep6",
	battlemechCreatorControllerStep6Array
);



var battlemechCreatorControllerSummaryArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_SUMMARY_TITLE', 'BM_SUMMARY_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_SUMMARY_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_SUMMARY_DESC )
					$scope.h3_title = translation.BM_SUMMARY_TITLE + ": " + translation.BM_SUMMARY_DESC;
				else
					$scope.h3_title = translation.BM_SUMMARY_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.isIOSStandAlone = isIOSStandAlone();
			//~ $scope.isIOSStandAlone = true;
			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];

			$scope.asRole = $scope.current_mech.alphaStrikeForceStats.role;
			$scope.asCustomName = $scope.current_mech.alphaStrikeForceStats.customName;



			$scope.mechwarriorName = $scope.current_mech.pilot.name;
			$scope.mechwarriorPiloting = $scope.current_mech.pilot.piloting;
			$scope.mechwarriorGunnery = $scope.current_mech.pilot.gunnery;

			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();
			$scope.mech_cbill_calc = $scope.current_mech.getCBillCalcHTML();

			$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
			$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);

			$scope.setPilotName = function( newValue ) {
				$scope.current_mech.pilot.name = newValue;
				//~ update_mech_status_bar_and_tro($scope, $translate, current_mech);
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.setPilotPiloting = function( newValue ) {
				$scope.current_mech.pilot.piloting = newValue;
				//~ update_mech_status_bar_and_tro($scope, $translate, current_mech);
				$scope.current_mech._calc();

				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.setPilotGunnery = function( newValue ) {
				$scope.current_mech.pilot.gunnery = newValue;
				//~ update_mech_status_bar_and_tro($scope, $translate, current_mech);
				$scope.current_mech._calc();
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}

			$scope.setASRole = function( newValue ) {
				$scope.current_mech.setASRole( newValue );
				//~ update_mech_status_bar_and_tro($scope, $translate, current_mech);
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
			}


			$scope.setASCustomName = function( newValue ) {
				//~ console.log( "setASCustomName", newValue );
				$scope.current_mech.setASCustomName( newValue );
				//~ console.log("1", $scope.current_mech.alphaStrikeForceStats.customName);
				//~ update_mech_status_bar_and_tro($scope, $translate, current_mech);
				$scope.svgRecordSheet = $scope.current_mech.makeSVGRecordSheet(false);
				//~ console.log("2", $scope.current_mech.alphaStrikeForceStats.customName);
				$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				//~ console.log("3", $scope.current_mech.alphaStrikeForceStats.customName);
				localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
				//~ console.log("4", $scope.current_mech.alphaStrikeForceStats.customName);
				//~ console.log( 'localStorage["tmp.current_mech"]', localStorage["tmp.current_mech"]);
			}


			$scope.saveASPNG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Alpha Strike Card.png';
					a.href = canvas.toDataURL('image/png');
					document.body.appendChild(a);
					a.click();
				}
			}


			$scope.saveASJPG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Alpha Strike Card.jpg';
					a.href = canvas.toDataURL('image/jpeg');
					document.body.appendChild(a);
					a.click();
				}
			}
			$scope.saveASPDF = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);
					var ratio = canvas.width / canvas.height;

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var imgData = canvas.toDataURL("image/jpeg", 1.0);
					var pdf = new jsPDF("portrait", "in", "letter");

					pdf.addImage(imgData, 'JPG', .25, 1, 8, 8 / ratio);
					//var download = document.getElementById('download');

					pdf.save($scope.current_mech.getName() + " - Alpha Strike Card.pdf");
				}
			}

			$scope.saveRSPNG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Record Sheet.png';
					a.href = canvas.toDataURL('image/png');
					document.body.appendChild(a);
					a.click();
				}
			}

			$scope.saveRSJPG = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					var a = document.createElement('a');
					a.download = $scope.current_mech.getName() + ' - Record Sheet.jpg';
					a.href = canvas.toDataURL('image/jpeg');
					document.body.appendChild(a);
					a.click();
				}
			}

			$scope.saveRSPDF = function() {
				//~ saveSvgAsPng(document.getElementById('asSheetImage'), $scope.current_mech.getName() + ' Alpha Strike Card.png', {scale: 10});
				var image = new Image();
				image.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				image.onload = function() {
					var canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;

					var ratio = canvas.width / canvas.height;
					var context = canvas.getContext('2d');
					context.drawImage(image, 0, 0);

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var imgData = canvas.toDataURL("image/jpeg", 1.0);
					var pdf = new jsPDF("portrait", "in", "letter");

					pdf.addImage(imgData, 'JPG', .25, .25, 8, 8 / ratio );
					//var download = document.getElementById('download');

					pdf.save($scope.current_mech.getName() + " - Record Sheet.pdf");
				}
			}

			/* Create IOS Data Link PDF URLs */
			$scope.iosRSLink = "";
			$scope.iosASLink = "";
			//~ $scope.isIOSStandAlone = true;
			if($scope.isIOSStandAlone == true) {

				//~ console.log("creating as");
				var ASimage = new Image();
				ASimage.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGAlphaStrikeCard() );
				ASimage.onload = function() {
					var AScanvas = document.createElement('canvas');
					AScanvas.width = ASimage.width;
					AScanvas.height = ASimage.height;

					var ratio = AScanvas.width / AScanvas.height;
					var AScontext = AScanvas.getContext('2d');
					AScontext.drawImage(ASimage, 0, 0);

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var ASimgData = AScanvas.toDataURL("image/jpeg", 1.0);
					var ASpdf = new jsPDF("portrait", "in", "letter");

					ASpdf.addImage(ASimgData, 'JPG', .25, .25, 8, 8 / ratio );
					//var download = document.getElementById('download');

					var troPDFData = ASpdf.output('datauristring');
					//~ console.log("created as");
					$scope.iosASLink =  "pages/ios-standalone-pdf.html#" + troPDFData;
				}

				//~ console.log("creating rs");
				var RSimage = new Image();
				RSimage.src = 'data:image/svg+xml;base64,' + window.btoa( $scope.current_mech.makeSVGRecordSheet() );
				RSimage.onload = function() {
					var RScanvas = document.createElement('canvas');
					RScanvas.width = RSimage.width;
					RScanvas.height = RSimage.height;

					var ratio = RScanvas.width / RScanvas.height;
					var RScontext = RScanvas.getContext('2d');
					RScontext.drawImage(RSimage, 0, 0);

					//~ var a = document.createElement('a');
					//~ a.download = $scope.current_mech.getName() + ' Record Sheet.jpg';
					//~ a.href = canvas.toDataURL('image/jpeg');
					//~ document.body.appendChild(a);
					//~ a.click();
					var RSimgData = RScanvas.toDataURL("image/jpeg", 1.0);
					var RSpdf = new jsPDF("portrait", "in", "letter");

					RSpdf.addImage(RSimgData, 'JPG', .25, .25, 8, 8 / ratio );
					//var download = document.getElementById('download');

					var troPDFData = RSpdf.output('datauristring');
					//~ console.log("created rs");
					$scope.iosRSLink =  "pages/ios-standalone-pdf.html#" + troPDFData;
				}


			}



		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerSummary",
	battlemechCreatorControllerSummaryArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerSummary",
	battlemechCreatorControllerSummaryArray
);

var battlemechCreatorControllerWelcomeArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_INTRO_TITLE', 'BM_INTRO_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_INTRO_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_WELCOME_DESC )
					$scope.h3_title = translation.BM_INTRO_TITLE + ": " + translation.BM_INTRO_DESC;
				else
					$scope.h3_title = translation.BM_INTRO_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			localStorage["backToPath"] = $location.$$path;

			$scope.current_mech = new Mech();

			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.importJSONData = "";
			$scope.confirmDialogQuestion = "";
			$scope.jsonImportError = "";
			$scope.showConfirmDialog = false;
			$scope.showImportJSONDialog = false;

			$scope.confirmDialog = function( confirmationMessage, onYes ) {
				$scope.confirmDialogQuestion = confirmationMessage;
				$scope.showConfirmDialog = true;
				$scope.confirmDialogYes = onYes;
			}

			$scope.importJSONDialog = function() {
				$scope.showImportJSONDialog = true;
			}

			$scope.updateImportJSON = function( newValue ) {
				$scope.importJSONData = newValue;
			}

			$scope.importJSON = function() {
				if( $scope.importJSONData != "" ) {

					if( $scope.current_mech.importJSON( $scope.importJSONData ) == true ) {
						$scope.showImportJSONDialog = false;
						$scope.importJSONData= "";
						$location.url( "battlemech-creator/step1" );
					} else {
						console.log("import error");
						$translate(['GENERAL_IMPORT_ERROR' ]).then(function (translation) {
							$scope.jsonImportError = translation.GENERAL_IMPORT_ERROR;
						});
					}
				} else {
					console.log("empty");
					$translate(['GENERAL_EMPTY_JSON' ]).then(function (translation) {
						$scope.jsonImportError = translation.GENERAL_EMPTY_JSON;
					});
				}

			}

			$scope.closeImportJSONDialog = function() {
				$scope.showImportJSONDialog = false;
				$scope.importJSONData = "";
			}

			$scope.closeConfirmDialog = function( ) {
				$scope.showConfirmDialog = false;
				// reset confirm to nothing...
				$scope.confirmDialogYes = function() {
					$scope.showConfirmDialog = false;
				}
			}

			// Clear Mech Functions
			$scope.clearMech = function() {
				$translate(['BM_CLEAR_MECH']).then( function( translation) {
					$scope.confirmDialog(
						translation.BM_CLEAR_MECH,
						function() {
							$scope.current_mech = new Mech();
							$scope.current_mech.uuid = generateUUID();
							localStorage["tmp.current_mech"] = $scope.current_mech.exportJSON();
							$scope.showConfirmDialog = false;
						}
					);
				} );

			}

			$scope.removeSavedItem = function( deleteIndex ) {
				$translate(['BM_DELETE_ITEM']).then( function( translation) {
					$scope.confirmDialog(
						translation.BM_DELETE_ITEM,
						function() {

							$scope.showConfirmDialog = false;

							$scope.saved_items_mechs.splice( deleteIndex, 1);

							localStorage["saved_items_mechs"] = JSON.stringify( $scope.saved_items_mechs );
						}
					);
				} );
			}

			// Save Mech Functions
			$scope.saveMechDialogOpen = false;
			$scope.saveDialog = function() {
				$scope.save_as_name = $scope.current_mech.getName();
				$scope.save_over = -1;




				$scope.saved_items_mechs = [];
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				for( var itemC = 0; itemC < $scope.saved_items_mechs.length; itemC++) {

					//var techO = JSON.parse( $scope.saved_items_mechs[ itemC ].tech );
					$scope.saved_items_mechs[ itemC ].localTechName = $scope.saved_items_mechs[ itemC ].tech.name[ localStorage["tmp.preferred_language"] ];
				}

				$scope.saveMechDialogOpen = true;

			}

			$scope.updateSave = function( newIndex ) {
				$scope.save_over = newIndex;
			}

			$scope.updateSaveName = function( newName ) {
				$scope.save_as_name = newName;
			}

			$scope.closeSaveDialog = function() {
				$scope.saveMechDialogOpen = false;
			}

			$scope.saveMech = function() {
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				var saveItem = {
					saveName: $scope.save_as_name,
					savedOn: new Date(),
					tonnage: $scope.current_mech.getTonnage(),
					tech: $scope.current_mech.getTech(),
					data: $scope.current_mech.exportJSON()
				};


				if( $scope.save_over == -1 ) {
					$scope.saved_items_mechs.push( saveItem );
				} else {
					$scope.saved_items_mechs[ $scope.save_over] = saveItem ;
				}


				localStorage["saved_items_mechs"] = JSON.stringify( $scope.saved_items_mechs );

				$scope.saveMechDialogOpen = false;
			}

			// Load Mech Functions
			$scope.loadMechDialogOpen = false;
			$scope.loadDialog = function() {

				$scope.saved_items_mechs = [];
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				for( var itemC = 0; itemC < $scope.saved_items_mechs.length; itemC++) {

					$scope.saved_items_mechs[ itemC ].localTechName = $scope.saved_items_mechs[ itemC ].tech.name[ localStorage["tmp.preferred_language"] ];
				}

				$scope.loadMechDialogOpen = true;
			}

			$scope.loadSavedItem = function( loadIndex ) {
				$scope.saved_items_mechs = [];
				if( localStorage["saved_items_mechs"] ) {
					$scope.saved_items_mechs = JSON.parse( localStorage["saved_items_mechs"] );
				} else {
					localStorage["saved_items_mechs"] = "[]";
					$scope.saved_items_mechs = [];
				}

				if( $scope.saved_items_mechs[loadIndex] ) {
					localStorage["tmp.current_mech"] = $scope.saved_items_mechs[loadIndex].data;
					$location.url( "battlemech-creator/step1" );
				}
				$scope.loadMechDialogOpen = false;
			}

			$scope.closeLoadDialog = function() {
				$scope.loadMechDialogOpen = false;
			}
		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerWelcome",
	battlemechCreatorControllerWelcomeArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerWelcome",
	battlemechCreatorControllerWelcomeArray
);

var battlemechCreatorControllerSidebarArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$route',
		function ($rootScope, $translate, $scope, $route) {
			// Set Page Title Tag

			$scope.button_welcome_current = false;
			$scope.button_step1_current = false;
			$scope.button_step2_current = false;
			$scope.button_step3_current = false;
			$scope.button_step4_current = false;
			$scope.button_step5_current = false;
			$scope.button_step6_current = false;
			$scope.button_summary_current = false;
			$scope.button_exports_current = false;

			if( $route.current.originalPath == "/battlemech-creator/") {
				$scope.button_welcome_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/step1/") {
				$scope.button_step1_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/step2/") {
				$scope.button_step2_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/step3/") {
				$scope.button_step3_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/step4/") {
				$scope.button_step4_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/step5/") {
				$scope.button_step5_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/step6/") {
				$scope.button_step6_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/summary/") {
				$scope.button_summary_current = true;
			} else if( $route.current.originalPath == "/battlemech-creator/exports/") {
				$scope.button_exports_current = true;
			}

		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerSidebar",
	battlemechCreatorControllerSidebarArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerSidebar",
	battlemechCreatorControllerSidebarArray
);

var battlemechCreatorControllerPrintingArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			//~ $translate(['APP_TITLE', 'BM_SUMMARY_TITLE', 'BM_SUMMARY_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				//~ $rootScope.title_tag = translation.BM_SUMMARY_TITLE + " | " + translation.APP_TITLE;
				//~ if( translation.BM_SUMMARY_DESC )
					//~ $scope.h3_title = translation.BM_SUMMARY_TITLE + ": " + translation.BM_SUMMARY_DESC;
				//~ else
					//~ $scope.h3_title = translation.BM_SUMMARY_TITLE;
				//~ $rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			//~ });

			//~ $scope.goHome = function() {

				//~ delete(localStorage["backToPath"]);
				//~ $location.url("/");
			//~ }

			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			$scope.current_mech = new Mech();


			if( localStorage["tmp.current_mech"] ) {
				$scope.current_mech.importJSON( localStorage["tmp.current_mech"] );
			} else {
				$scope.current_mech.uuid = generateUUID();
				$scope.current_mech._calc();
			}

			$scope.isIOSStandAlone = isIOSStandAlone();
			//~ $scope.isIOSStandAlone = true;
			$scope.current_mech.useLang = localStorage["tmp.preferred_language"];


			// make tro for sidebar
			$scope.mech_tro = $scope.current_mech.makeTROHTML();
			$scope.mech_bv_calc = $scope.current_mech.getBVCalcHTML();
			$scope.mech_as_calc = $scope.current_mech.getASCalcHTML();
			$scope.mech_cbill_calc = $scope.current_mech.getCBillCalcHTML();
			//~ console.log( $location.$$url );
			if( $location.$$url == "/battlemech-creator/print-tro/") {
				$rootScope.title_tag = $scope.current_mech.getName() + " - Record Sheet";
				$scope.textItem = $scope.current_mech.makeTROHTML();
			}


			//~ console.log( $location.$$url );
			if( $location.$$url == "/battlemech-creator/print-rs/") {
				$rootScope.title_tag = $scope.current_mech.getName() + " - Record Sheet";
				$scope.svgItem = $scope.current_mech.makeSVGRecordSheet(false);
				$scope.textItem = "";
			}

			if( $location.$$url == "/battlemech-creator/print-as/") {
				$rootScope.title_tag = $scope.current_mech.getName() + " - Alpha Strike Card";
				$scope.svgItem = $scope.current_mech.makeSVGAlphaStrikeCard(false);
				$scope.textItem = "";
			}
			//$scope.svgAlphaStrikeCard = $scope.current_mech.makeSVGAlphaStrikeCard(false);

		}
	]
;

angular.module("webApp").controller(
	"battlemechCreatorControllerPrinting",
	battlemechCreatorControllerPrintingArray
);

angular.module("cordovaApp").controller(
	"battlemechCreatorControllerPrinting",
	battlemechCreatorControllerPrintingArray
);

var creditsArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			$translate(['APP_TITLE', 'INDEX_WELCOME']).then(function (translation) {
				$rootScope.title_tag = translation.INDEX_WELCOME + " | " + translation.APP_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.INDEX_CREDITS;
			});


			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			$scope.appVersion = getAppVersion();

			localStorage["backToPath"] = $location.$$path;

		}
	]
;

angular.module("webApp").controller(
	"creditsController",
	creditsArray
);

angular.module("cordovaApp").controller(
	"creditsController",
	creditsArray
);

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


var welcomeArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			$translate(['APP_TITLE', 'INDEX_WELCOME']).then(function (translation) {
				$rootScope.title_tag = translation.INDEX_WELCOME + " | " + translation.APP_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.INDEX_WELCOME;
			});

			$scope.goHome = function() {

				delete(localStorage["backToPath"]);
				$location.url("/");
			}

			// Check to see if a backToPath is set, move to that route if so.
			if( localStorage["backToPath"] != "" ) {
				var goto = localStorage["backToPath"];
				localStorage["backToPath"] = "";
				$location.url( goto );
			}

			localStorage["backToPath"] = "";

		}
	]
;


angular.module("webApp").controller(
	"welcomeController",
	welcomeArray
);

angular.module("cordovaApp").controller(
	"welcomeController",
	welcomeArray
);

/*
 * The data here is copyright NOT included in the MIT license.
 */
available_languages.push ({
	english_name: "German",
	native_name: "Deutsch",
	icon_file: "DE.png",
	short_code: "de-DE",
	active: true,

	translations: {

		APP_TITLE: 'Jeff\'s BattleTech Werkzeug',

		INDEX_WELCOME: 'Willkommen',
		INDEX_H3_CORE: 'Jeff\'s BattleTech Werkzeug',
		INDEX_BUTTON_MECH_CREATOR: 'BattleMech Hersteller',

		BM_MP_ABBR: "BP",

		BM_TONS: "tonnen",
		BM_TON: "tonne",
		BM_NO_ARMOR: "Keine rüstung",

		BM_WELCOME_TITLE: "Willkommen",
		BM_WELCOME_DESC: "",

		BM_STEP1_TITLE: "Schritt 1",
		BM_STEP1_DESC: "Gestalten sie das chassis",

		BM_STEP2_TITLE: "Schritt 2",
		BM_STEP2_DESC: "Installieren motor und steuerungssysteme",

		BM_STEP3_TITLE: "Schritt 3",
		BM_STEP3_DESC: "Fügen sie zusätzliche wärmesenken",

		BM_STEP4_TITLE: "Schritt 4",
		BM_STEP4_DESC: "In Rüstung",

		BM_STEP5_TITLE: "Schritt 5",
		BM_STEP5_DESC: "In waffen, munition und andere ausrüstung",

		BM_STEP6_TITLE: "Schritt 6",
		BM_STEP6_DESC: "Füllen sie das schaublatt",

		BM_SUMMARY_TITLE: "Der Auszug",
		BM_SUMMARY_DESC: "",

		BUTTON_LANG_EN: 'English',
		BUTTON_LANG_DE: 'German',
		BUTTON_LANG_BR: 'Brazilian'
	}

} );

/*
 * The data here is copyright NOT included in the MIT license.
 */
available_languages.push ({
	english_name: "English",
	native_name: "English",
	icon_file: "US.png",
	short_code: "en-US",
	active: true,

	translations: {

		APP_TITLE: 'BattleTech Tools',

		INDEX_WELCOME: 'Welcome',
		INDEX_H3_CORE: 'BattleTech Tools',

		WELCOME_BUTTON_MECH_CREATOR: '\'Mech Creator',
		WELCOME_BUTTON_MECH_CREATOR_DESC: 'Create a BattleMech',

		WELCOME_BUTTON_ALPHA_STRIKE: 'Alpha Strike',
		WELCOME_BUTTON_ALPHA_STRIKE_DESC: 'Alpha Strike Force Builder and In-Play App',

		WELCOME_H3_CORE: 'BattleTech Tools',
		WELCOME_H3_CREATORS_CORE: 'BattleTech Creators',

		WELCOME_H3_FORCE_BUILDERS_CORE: 'BattleTech Force Builders',

		GENERAL_SELECT_LANGUAGE: "Select Langage",
		GENERAL_SETTINGS: "Settings",
		GENERAL_CREDITS: 'Credits',
		GENERAL_COPYRIGHT: 'Copyright',
		GENERAL_WELCOME: 'Welcome',
		GENERAL_TECHNOLOGY: 'Technology',
		GENERAL_TECH: 'Tech',
		GENERAL_POINTS: 'Points',
		GENERAL_POINT: 'Point',
		GENERAL_POINT_VALUE: 'Point Value',
		GENERAL_RULES: 'Rules',
		GENERAL_BATTLETECH: 'BattleTech',
		GENERAL_MECH: '\'Mech',
		GENERAL_GROUP: 'Group',
		GENERAL_TON: 'Ton',
		GENERAL_TONS: 'Tons',
		GENERAL_CLAN: 'Clan',
		GENERAL_SKILL: 'Skill',
		GENERAL_SKILL_LEVEL: 'Skill Level',
		GENERAL_SKILL_PILOTING: 'Piloting Skill',
		GENERAL_SKILL_GUNNERY: 'Gunnery Skill',
		GENERAL_NAME: 'Name',
		GENERAL_CLANS: 'Clans',
		GENERAL_INNER_SPHERE: 'Inner Sphere',
		GENERAL_ALL: 'All',
		GENERAL_SEARCH: 'Search',
		GENERAL_SEARCH_RESULTS: 'Search Results',
		GENERAL_IMMOBILE: "Immobile",
		GENERAL_CANCEL: "Cancel",
		GENERAL_YES: "Yes",
		GENERAL_NO: "No",
		GENERAL_REAR: "rear",
		GENERAL_VERSION: "Version",
		GENERAL_CALCULATIONS: "Calculations",
		GENERAL_RECORD_SHEETS: "Record Sheets",
		GENERAL_PRINT: "Print",
		GENERAL_PRINT_VIEW: "View/Print",
		GENERAL_TURN_OFF_PRINT_HEAD_FOOT: "Be sure to remember to turn off headers and footers when you print",
		GENERAL_ROLL_AGAIN: "roll again",

		GENERAL_FILTER: "Filter",
		GENERAL_TYPE_HERE_TO_FILTER: "Type here to search for equipment",

		GENERAL_IMPORT_JSON: "Import JSON",
		GENERAL_IMPORT: "Import",

		GENERAL_REMOVE: "Remove",
		GENERAL_SAVED: "Saved",

		GENERAL_SAVE_AS_NEW: "Save as New",
		GENERAL_SAVED_ITEM_AS: "Save Item As...",
		GENERAL_SAVE_NAME: "Save Name",
		GENERAL_SAVE: "Save",
		GENERAL_LOAD: "Load",
		GENERAL_SAVE_OVER_WARNING: "The existing item will be replaced.",
		GENERAL_LOAD_WARNING: "Warning: The loaded item will replace your current item. Please be sure that you have saved your current item.",
		GENERAL_NO_SAVED_ITEMS: "You have no saved items",
		GENERAL_LOAD_ITEM: "Load Saved Item",

		GENERAL_INTRODUCTORY: "Introductory",
		GENERAL_STANDARD: "Standard",
		GENERAL_ADVANCED: "Advanced",
		GENERAL_CLOSE: "Close",

		GENERAL_IMPORT_ERROR: "There was an import error!",
		GENERAL_EMPTY_JSON: "Input area was empty, no changes were made.",

		SETTINGS_IMPORT_EXPORT_SETTINGS: "Import/Export Data",
		SETTINGS_IMPORT_EXPORT_SETTINGS_DESC: "At some point I'm sure that you'll want to move or back up your hard work. Use this function to import and export your saved items.",
		SETTINGS_IMPORT: "Import",
		SETTINGS_IMPORT_DESC: "Browse to your backup JSON file on your local device. Warning: this will replace all your existing saved 'mechs and Alpha Strile saved groups.",
		SETTINGS_EXPORT: "Export",
		SETTINGS_EXPORT_DESC: "Click on the button below to download your saved 'mechs and favrorite alpha strike groups.",
		SETTINGS_CLICK_TO_DOWNLOAD: "Click to Download",
		SETTINGS_CLICK_TO_PREPARE: "Click to Prepare",
		SETTINGS_ALTERNATIVE_INPUT: "Alternatively, if your device doesn't support file uploads (iOS), paste the contents of the file below then press the Import button beneath the input field.",
		SETTINGS_SHOW_ALTERNATIVES: "Show Alternative Import/Export",

		AS_PLEASE_WAIT: "Please wait while information is retrieved from the master unit list.",
		AS_FAVORITE_GROUPS: "Favorite Groups",
		AS_ADD_TO_GROUP: "Add to Group",
		AS_GROUP_POINTS: "Group Points",
		AS_GROUP_NUM_UNITS: "Group # Units",
		AS_TOTAL_POINTS: "Total Points",
		AS_TOTAL_UNITS: "Total Units",
		AS_TOTAL_GROUPS: "Total Groups",
		AS_CURRENT_FORCE: "Current Force",
		AS_ADD_NEW_GROUP: "Add New Group",
		AS_GROUP_EMPTY: "This group is empty",
		AS_SEARCH_NO_MATCHES: "Sorry, there are no matches with those parameters",
		AS_PLAY_VIEW: "Play View",
		AS_CUSTOM_UNIT_NAME: "Custom Unit Name",
		AS_CUSTOM_GROUP_NAME: "Custom Star/Lance Name",
		AS_RESULTS_PROVIDED_BY_MUL: "Search results provided by the Master Unit List Website",
		AS_VIEWING_CARD: "Viewing Card",
		AS_ADD_TO_SELECTED_GROUP_NOTED_IN_DROPDOWN: "Add this unit to the group selected in the drop down in the top right of the search results",
		AS_UNIT_CUSTOMIZATION: "Unit Customization",
		AS_SELECT_DAMAGE_TAKEN: "Select Damage Taken",
		AS_ADD_TO_FAVORITES: "Add this force to your favorites",

		BM_MP_ABBR: "MP",

		BM_NEXT_STEP: "Next Step",
		BM_PREVIOUS_STEP: "Previous Step",
		BM_SUMMARY: "Summary",
		BM_BACK_TO_WELCOME: "Welcome",
		BM_EXPORTS: "Exporting and Printing",
		BM_BBCODE_TRO: "BBCode TRO",
		BM_BBCODE_DESC: "Copy and paste the text below and it should format it nicely if your bullieten board forum supports BB Code (bg.batteltech.com does).",
		BM_JSON_EXPORT: "JSON Export",
		BM_JSON_EXPORT_DESC: "If you'd like to share this design with another, copy the code and have them import the data via the \"Import JSON\" button on the Welcome Screen.",

		BUTTON_HOME_TITLE: "Home",
		BUTTON_HOME_DESC: "Back to the main screen",

		BM_INTRO_TITLE: "Welcome",
		BM_INTRO_DESC: "",
		BM_INTRO_TEXT: "<p>Welcome to a BattleTech 'mech builder.</p><p>This tool attempts to closely follow the steps in the <a href='http://bg.battletech.com/?wpsc-product=1095-2'>BattleTech TechManual</a> and the steps in that book should be referenced during 'mech creation</p>",
		BM_CLEAR_MECH: "Are you sure that you want to clear out your current 'mech?",
		BM_DELETE_ITEM: "Are you sure that you want to delete this item?",

		BM_TONS: "tons",
		BM_TON: "ton",
		BM_NO_ARMOR: "No Armor",

		BM_PRINTING_AND_PDF: "Printing and PDFs",

		BM_REMAINING_TONS: "Remaining Tons",
		BM_UNALLOCATED_ARMOR: "Unallocated Armor",
		BM_UNALLOCATED_CRITS: "Unallocated Criticals",
		BM_WEAPON_HEAT: "Weapon Heat",
		BM_MOVE_HEAT: "Move Heat",
		BM_HEAT_DISSIPATION: "Heat Dissipation",
		BM_HEAT_SUMMARY: "Heat Summary",
		BM_WELCOME_CLEAR_MECH: "Clear Current 'Mech",
		BM_WELCOME_LOAD_MECH: "Load 'Mech",
		BM_WELCOME_SAVE_MECH: "Save Current 'Mech",

		BM_WELCOME_IMPORT_JSON: "Import JSON",
		BM_WELCOME_IMPORT_JSON_DESC: "Paste the import code below them press the \"Import\" button. <strong>Warning</strong>: This will clear out your current 'mech. Be sure to save your current work!",

		BM_STEP1_TITLE: "Step 1",
		BM_STEP1_DESC: "Design the Chassis",
		BM_STEP1_MECH_NAME: "Mech Model Name",
		BM_STEP1_MECH_TYPE: "Mech Type",
		BM_STEP1_MECH_ERA: "Mech Era",
		BM_STEP1_MECH_TONNAGE: "Mech Tonnage",
		BM_STEP1_MECH_TECH: "Technology Base",
		BM_STEP1_SELECTED_STRICT: "Hide non-available weapons and equipment (will be gray otherwise)",
		BM_STEP1_MECH_TECH: "Technology Base",
		BM_STEP1_IS_TYPE: "Internal Structure Type",

		BM_STEP2_TITLE: "Step 2",
		BM_STEP2_DESC: "Install engine and control systems",
		BM_STEP2_WALKING_MP: "Walking Movement Points",
		BM_STEP2_JUMPING_MP: "Jumping Movement Points",
		BM_STEP2_SELECT_JUMP: "Select Jumping MP",
		BM_STEP2_SELECT_WALK: "Select Walking MP",
		BM_STEP2_SELECT_GYRO: "Select Gyro Type",
		BM_STEP2_SELECT_ENGINE: "Select Engine Type",
		BM_STEP2_SELECT_MOVEMENT: "Select Movement",


		BM_STEP3_TITLE: "Step 3",
		BM_STEP3_DESC: "Add additional heat sinks",
		BM_STEP3_HS_TECH: "Heat Sink Technology",
		BM_STEP3_HS_ADD: "Add additional heat sinks",
		BM_STEP3_BM_INC_10_HS: "Your BattleMech includes 10 heat sinks.",
		BM_STEP3_BM_INC_10_DOUBLE_HS: "Your BattleMech includes 10 double heat sinks.",
		BM_STEP3_ADD_LABEL: "Additional heat sinks",
		BM_STEP3_CRITICAL_REQUIRED: "{hs_crits_required} critical slots are required for your engine class and selected heat sinks",
		BM_STEP3_CRITICAL_REQUIRED_NONE: "No additional critical slots are required for your engine class and selected heat sinks",
		BM_STEP3_CRITICAL_REQUIRED_SINGLE: "One critical slot is required for your engine class and selected heat sinks",
		BM_STEP3_SINGLE_HS: "Single Heat Sinks",
		BM_STEP3_DOUBLE_HS: "Double Heat Sinks",

		BM_STEP4_TITLE: "Step 4",
		BM_STEP4_DESC: "Add armor",
		BM_STEP4_ARMOR_WEIGHT: "Armor Weight",
		BM_STEP4_ARMOR_ALLOCATION: "Armor Allocation",
		BM_STEP4_MAX_ARMOR: "Maximum Armor",
		BM_STEP4_TOTAL_ARMOR: "Total Armor",
		BM_STEP4_UNALLOCATED_ARMOR: "Unallocated Armor",
		BM_STEP4_ALLOCATE_NONE: "Clear Armor",
		BM_STEP4_ALLOCATE_SANELY: "Allocate Sanely",
		BM_STEP4_ALLOCATE_MAX: "Allocate Max",
		BM_STEP4_UNAVAILABLE_PAREN: " (unavailable)",
		BM_STEP4_ARMOR_TYPE: "Armor Type",

		BM_STEP5_TITLE: "Step 5",
		BM_STEP5_DESC: "Add weapons, ammunition and other equipment",
		BM_STEP5_ITEM_NAME: "Name",
		BM_STEP5_ITEM_CATEGORY: "Category",
		BM_STEP5_ITEM_SPACE: "Criticals",
		BM_STEP5_ITEM_WEIGHT: "Weight",
		BM_STEP5_ADD: "Add",
		BM_STEP5_ITEM_LOCATION: "Location",
		BM_STEP5_REMOVE: "Remove",
		BM_STEP5_INSTALLED_EQUIPMENT: "Installed Equipment",
		BM_STEP5_NO_EQUIPMENT_INSTALLED: "No equipment has been installed",
		BM_STEP5_SELECT_LOCATION: "Select Location",
		BM_STEP5_AVAILABLE_EQUIPMENT: "Available Equipment",
		BM_STEP5_ITEM_REAR: "Rear?",
		BM_STEP5_NO_ITEMS_IN_CATEGORY: "No available items in this category",

		BM_STEP6_TITLE: "Step 6",
		BM_STEP6_DESC: "Complete the record sheet",
		BM_STEP6_UNALLOCATED_EQUIPMENT: "Unallocated Equipment",
		BM_STEP6_CRITICAL_TABLE: "Critical Table",
		BM_STEP6_RESET_ALLOCATIONS: "Reset Allocations",
		BM_STEP6_INSTRUCTIONS: "Instructions",
		BM_STEP6_INSTRUCTIONS_TEXT: "To assign equipment to your critical allocation table, just click on an assignable item then click on an unallocated location.",
		BM_STEP6_SELECT_AN_ITEM_TO_ALLOCATE: "Select an item to allocate",
		BM_STEP6_SELECT_AN_PLACE_TO_ALLOCATE: "Click on an available location",
		BM_STEP6_CANNOT_MOVE_THAT_ITEM: "You cannot move that item",
		BM_STEP6_CANNOT_BE_PLACED: "Item cannot be placed there",
		BM_STEP6_TORSO_AND_HEAD_ONLY: "Item may only be placed on torsos and head",
		BM_STEP6_TORSO_AND_LEGS_ONLY: "Item may only be placed on torsos and legs",

		BM_SUMMARY_TITLE: "Summary",
		BM_SUMMARY_DESC: "",
		BM_SUMMARY_TRO: "Technical Read Out",
		BM_SUMMARY_BV_CALC: "Battle Value",
		BM_SUMMARY_AS_CALC: "Alpha Strike",
		BM_SUMMARY_CBILL_CALC: "CBill Cost",
		BM_SUMMARY_MECHWARRIOR_DATA: "Mechwarrior Data",
		BM_SUMMARY_ALPHA_STRIKE_CUSTOM_NAME: "Custom Name",

		BM_EXPORTS_TITLE: "Exports",
		BM_EXPORTS_DESC: "",
		BM_EXPORTS_OUTPUT: "Exporting",
		BM_EXPORTS_EXPORT_RECORD_SHEET: "Export Record Sheet",
		BM_EXPORTS_EXPORT_TRO: "Export TRO",
		BM_EXPORTS_EXPORT_FULL: "Export Both",

		BM_CRITS_LIFE_SUPPORT: "Life Support",
		BM_CRITS_HEAT_SINK: "Heat Sink",
		BM_CRITS_DOUBLE_HEAT_SINK: "Double Heat Sink",
		BM_CRITS_COCKPIT: "Cockpit",
		BM_CRITS_SENSORS: "Sensors",

		BM_CRITS_ACTUATOR_SHOULDER: "Shoulder",
		BM_CRITS_ACTUATOR_UPPER_ARM: "Upper Arm Actuator",
		BM_CRITS_ACTUATOR_LOWER_ARM: "Lower Arm Actuator",
		BM_CRITS_ACTUATOR_HAND: "Hand Actuator",
		BM_CRITS_ACTUATOR_HIP: "Hip",
		BM_CRITS_ACTUATOR_UPPER_LEG: "Upper Leg Actuator",
		BM_CRITS_ACTUATOR_LOWER_LEG: "Lower Leg Actuator",
		BM_CRITS_ACTUATOR_FOOT: "Foot Actuator",

		BM_PDF_EXPORT:"Export PDFs",

		TRO_TYPE: "Type",

		TRO_TECHNOLOGY_BASE: "Technology Base",
		TRO_ERA: "Era",
		TRO_TONNAGE: "Tonnage",
		TRO_BATTLE_VALUE: "Battle Value",
		TRO_ALPHA_STRIKE_VALUE: "Alpha Strike Value",
		TRO_CBILL_COST: "C-Bill Cost",

		TRO_EQUIPMENT: "Equipment",
		TRO_MASS: "Mass",

		TRO_NOT_AVAILABLE: "n/a",

		TRO_INTERNAL_STRUCTURE: "Internal Structure",
		TRO_INTERNAL: "Internal",  // separate lines
		TRO_STRUCTURE: "Structure", // separate lines
		TRO_ENGINE: "Engine",
		TRO_GYRO_TYPE: "Gyro Type",
		TRO_ENGINE_TYPE: "Engine Type",
		TRO_WALKING: "Walking",
		TRO_RUNNING: "Running",
		TRO_JUMPING: "Jumping",
		TRO_HEAT_SINKS: "Heat Sinks",

		TRO_ARM_ACTUATORS: "Actuators",
		TRO_LOWER_LEFT: "LLA",
		TRO_LEFT_HAND: "LH",
		TRO_LOWER_RIGHT: "RLA",
		TRO_RIGHT_HAND: "RH",
		TRO_NO_LOWER_ARM_ACTUATORS: "No lower arm actuators",

		TRO_GYRO: "Gyro",
		TRO_COCKPIT: "Cockpit",
		TRO_JUMP_JETS: "Jump Jets",

		TRO_ARMOR_FACTOR: "Armor Factor",

		TRO_ARMOR_IS: "Internal Structure",
		TRO_ARMOR_VALUE: "Armor Value",
		TRO_ARMOR: "Armor", // split into 2 lines
		TRO_VALUE: "Value", // 2nd line

		TRO_ARMOR_HD: "Head",
		TRO_ARMOR_CT: "Center Torso",
		TRO_ARMOR_CTR: "Center Torso (Rear)",
		TRO_ARMOR_RLT: "R/L Torso",
		TRO_ARMOR_RLTR: "R/L Torso (Rear)",
		TRO_ARMOR_RT: "Right Torso",
		TRO_ARMOR_RTR: "Right Torso (Rear)",
		TRO_ARMOR_LT: "Left Torso",
		TRO_ARMOR_LTR: "Left Torso (Rear)",
		TRO_ARMOR_RLA: "R/L Arm",
		TRO_ARMOR_RA: "Right Arm",
		TRO_ARMOR_LA: "Left Arm",
		TRO_ARMOR_RLL: "R/L Leg",
		TRO_ARMOR_RL: "Right Leg",
		TRO_ARMOR_LL: "Left Leg",
		TRO_ARMOR_RLFL: "R/L Front Leg",
		TRO_ARMOR_RLRL: "R/L Rear Leg",
		TRO_ARMOR_RFL: "Right Front Leg",
		TRO_ARMOR_LFL: "Left Front Leg",
		TRO_ARMOR_RRL: "Right Rear Leg",
		TRO_ARMOR_LRL: "Left Rear Leg",

		TRO_WEAPONS_AND_AMMO: "Weapons<br />and Ammo",
		TRO_WEAPONS: "Weapons",
		TRO_AND_AMMO: "and Ammo",
		TRO_LOCATION: "Location",
		TRO_CRITICAL: "Critical",

		BUTTON_LANG_EN: 'English',
		BUTTON_LANG_DE: 'German',
		BUTTON_LANG_BR: 'Brazilian'
	}

} );
