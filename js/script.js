var available_languages = [];

var appVersion = "0.01Alpha";

webApp = angular.module(
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

			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view.html',
				controller  : 'asPlayViewController'
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

var appVersion = "0.01Alpha";

webApp = angular.module(
	'webApp',
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

			.when('/as/play-view', {
				templateUrl : 'pages/as-play-view.html',
				controller  : 'asPlayViewController'
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


angular.module('webApp').controller(
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

var pdfFontSize = 10;
var pdfFontFace = "helvetica";

function update_mech_status_bar_and_tro($scope, $translate, current_mech) {
	$translate(
		[
			'BM_REMAINING_TONS', 'BM_UNALLOCATED_ARMOR', 'BM_UNALLOCATED_CRITS',
		]
	).then(function (translation) {
		$scope.mech_status_bar = "<strong>" + translation.BM_REMAINING_TONS + "</strong>: " + current_mech.getRemainingTonnage();
		$scope.mech_status_bar += " | <strong>" + translation.BM_UNALLOCATED_ARMOR + "</strong>: " + current_mech.getUnallocatedArmor();
		$scope.mech_status_bar += " | <strong>" + translation.BM_UNALLOCATED_CRITS + "</strong>: " + current_mech.getUnallocatedCritCount();

		$scope.mech_summary_html = current_mech.makeTROHTML();
	});

}

function makeBattlemechRecordSheetPDF(battlemech_object) {

	var pdfDoc = new jsPDF('portrait', 'mm', 'letter');
	pdfDoc.setFontSize( pdfFontSize );
	pdfDoc = createRecordSheetPDF(pdfDoc, battlemech_object);

	return pdfDoc;

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

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ENGINE")  );
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

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_HEAT_SINKS")  );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getHeatSinks() + "" );
	lineNumber++;

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_GYRO")  );
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

	if( battlemech_object.getJumpJetWeight() > 0 ) {
		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber, battlemech_object.getTranslation("TRO_JUMP_JETS") );
		pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber, battlemech_object.getJumpJetWeight() + "" );
	}
	lineNumber++;
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
	pdfDoc.text(col3Loc - battlemech_object.getTranslation("TRO_ARMOR_HD").length - 10, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR_HD")  );
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
		pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.equipmentList[eq_count].name[ battlemech_object.useLang ]   );
		pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , "   " + battlemech_object.getLocationAbbr( battlemech_object.equipmentList[eq_count].location ) );
		pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , "   " + battlemech_object.equipmentList[eq_count].space.battlemech );
		pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , "   " + battlemech_object.equipmentList[eq_count].weight  );
		lineNumber++;
	}



	pdfDoc = makeFooter(pdfDoc);

	return pdfDoc;
}

function createRecordSheetPDF( pdfDoc, battlemech_object ) {

	pdfDoc = battlemech_record_sheet(pdfDoc);

	convertImgToDataURLviaCanvas("./images/pdf/Blank-Mech-Sheet.jpg",
		function(imageData) {
			if( imageData )
				pdfDoc.addImage( imageData, 1, 1);
		}
	);

	//pdfDoc.text(10, 10, "One small step with a really, really big metal and composite foot.....");
	//pdfDoc.text(10, 25, battlemech_object.getName());

	//pdfDoc.line( 10, 10, 20, 20);

	pdfDoc = makeFooter(pdfDoc);
	return pdfDoc;

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
    pdfDoc.text(10,270, "Created with @Gauthic's BattleTech Tools version " + appVersion);
    pdfDoc.text(10,273, "Exported on " + Date() );

    pdfDoc.text(150,270, "MechWarrior, BattleMech, ‘Mech and AeroTech are ");
    pdfDoc.text(150,273, "registered trademarks of The Topps Company, Inc.");
    pdfDoc.setFontSize( pdfFontSize );
    return pdfDoc;
}



function battlemech_record_sheet(jsDoc) {

	return jsDoc;

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


var btEraOptions = Array(
	{
		id: 1,
		name: {
			'en-US': "Age of War/Star League",
			'de-DE': "de - Age of War/Star League"
		},
		year_start: 2400,
		year_end: 2780,
	},
	{
		id: 2,
		name: {
			'en-US': "Succession Wars",
			'de-DE': "de - Succession Wars"
		},
		year_start: 2781,
		year_end: 3049,
	}/*,,
	{
		id: 3,
		name: {
			'en-US': "Clan Invasion",
			'de-DE': "de - Clan Invasion"
		},
		year_start: 3050,
		year_end: 3085,
	}

	{
		id: 4,
		name: {
			'en-US': "Dark Ages",
			'de-DE': "de - Dark Ages"
		},
		year_start: 3085,
		year_end: 4000,
	}
	*/
);
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
var mechClanEquipment = Array(
);
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

var mechEngineTypes = Array(
	{
		name: {
			"en-US": "Military Fusion (standard)"
		},
		tag: "standard",
		criticals: {
			is: {
				ct: 6
			},
			clan: {
				ct: 6
			}
		}
	},
	{
		name: {
			"en-US": "Exrta-Light Fusion (XL)"
		},
		tag: "xl",
		criticals: {
			is: {
				ct: 6,
				lt: 3,
				rt: 3
			},
			clan: {
				ct: 6,
				lt: 2,
				rt: 2
			}
		}
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
		}
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
		}
	}
);

var mechGyroTypes = Array(
	{
		name: {
			"en-US": "Standard Gyro"
		},
		tag: "standard",
		weight_multiplier: 1,
		criticals: 4
	},
	{
		name: {
			"en-US": "Extra-light (XL) Gyro"
		},
		tag: "xl",
		weight_multiplier: 0.5,
		criticals: 6
	},
	{
		name: {
			"en-US": "Compact Gyro"
		},
		tag: "compact",
		weight_multiplier: 1.5,
		criticals: 2
	},
	{
		name: {
			"en-US": "Heavy Duty Gyro"
		},
		tag: "heavy-duty",
		weight_multiplier: 2,
		criticals: 4
	}
);

var mechISEquipment = Array(
{
		name: {
			'en-US': "Small Laser",
			'de-DE': "de - Small Laser",
		},
		tag: "small-laser",
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 3,
		cbills: 11250,
		introduced: 2400,
		extinct: 0,
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
		tech_rating: "e",
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 5,
		cbills: 40000,
		introduced: 2400,
		extinct: 0,
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
		tech_rating: "e",
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
		category: {
			'en-US': "Energy Weapons",
			'de-DE': "de - Energy Weapons",
		},
		damage: 8,
		cbills: 100000,
		introduced: 2400,
		extinct: 0,
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
			support_vehicle: 5,
			aerospace_fighter: 1,
			small_craft: 1,
			drop_ship: 1
		},
		ammo_per_ton: 0,
		min_ammo_tons: 1,
		tech_rating: "e",
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
			'en-US': "Machine Gun",
			'de-DE': "de - Machine Gun",
		},
		tag: "machine-gun",
		category: {
			'en-US': "Ballistic Weapons",
			'de-DE': "de - Ballistic Weapons",
		},
		damage: 2,
		damage_aero: 2,
		cbills: 0,
		introduced: 1950,
		extinct: 0,
		battlevalue: 5,
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
		tech_rating: "e",
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
	},
	{
		name: {
			'en-US': "Ammo (Machine Gun)",
			'de-DE': "de - Ammo (Machine Gun)",
		},
		tag: "ammo-machine-gun",
		category: {
			'en-US': "Ammunition",
			'de-DE': "de - Ammunition",
		},
		damage: 0,
		damage_aero: 0,
		cbills: 11250,
		introduced: 2400,
		extinct: 0,
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
		min_ammo_tons: 1,
		tech_rating: "e",
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
		criticals: 1
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
		criticals: 2
	}
);

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

			console.log( incomingMechData );

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

			this.role = incomingMechData["Role"]["Name"];

			this.type = incomingMechData["BFType"];
			this.size = incomingMechData["BFSize"];

			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData["BFArmor"] / 1;
			this.structure = incomingMechData["BFStructure"] / 1;

			this.damage = {
				short: incomingMechData["BFDamageShort"] / 1,
				medium: incomingMechData["BFDamageMedium"] / 1,
				long: incomingMechData["BFDamageLong"] / 1,
			};

			if( incomingMechData["BFDamamgeExtreme"] )
				this.damage.extreme = incomingMechData["BFDamamgeExtreme"] / 1
			else
				this.damage.extreme = 0;

			this.abilities = incomingMechData["BFAbilities"];

			this.overheat = incomingMechData["BFOverheat"] / 1;

			this.basePoints = incomingMechData["BFPointValue"] / 1;


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

		shortDamage = shortDamage - currentWeaponHits;
		mediumDamage = mediumDamage - currentWeaponHits;
		longDamage = longDamage - currentWeaponHits;
		extremeDamage = extremeDamage - currentWeaponHits;

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

	this.max_armor = 0;

	this.internalStructure = {};

	this.internalStructure.head = 0;

	this.internalStructure.centerTorso = 0;
	this.internalStructure.leftTorso = 0;
	this.internalStructure.rightTorso = 0;

	this.small_cockpit = false;
	this.cockpit_weight = 3;

	this.internalStructure.rightArm = 0;
	this.internalStructure.leftArm = 0;

	this.internalStructure.rightLeg = 0;
	this.internalStructure.leftLeg = 0;

	this.additional_heat_sinks = 0;

	this.armorWeight = 0;
	this.total_armor = 0;
	this.unallocated_armor = 0;

	this.armorAllocation = {};

	this.heat_sink_type = "single";

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

	this.alphaStrikeForceStats = {
		make: "",
		model: "",
		size_class: "",
		move: "",
		jump_move: "",
		pv: "",
		range_short: "",
		range_medium: "",
		range_long: "",
		range_extreme: "",
		armor: "",
		structure: "",
		size: 0,
		skill: 4,
		ov: 0,
		notes: ""
	}
}

Mech.prototype._calcAlphaStrike = function() {

	this.alphaStrikeForceStats.make  = this.make;
	this.alphaStrikeForceStats.model  = this.model;
	this.alphaStrikeForceStats.move  = this.getWalkSpeed() * 2;
	this.alphaStrikeForceStats.jump_move  = this.getJumpSpeed() * 2;
	this.alphaStrikeForceStats.pv = 0;
	this.alphaStrikeForceStats.range_short = 0;
	this.alphaStrikeForceStats.range_medium = 0;
	this.alphaStrikeForceStats.range_long = 0;
	this.alphaStrikeForceStats.range_extreme = 0;
	this.alphaStrikeForceStats.armor = 0;
	this.alphaStrikeForceStats.structure = 0;
	this.alphaStrikeForceStats.skill = 4;
	this.alphaStrikeForceStats.ov = 0;
	this.alphaStrikeForceStats.notes = "";
	this.alphaStrikeForceStats.size_class = "";
	this.alphaStrikeForceStats.size_class_name = "";
	this.alphaStrikeForceStats.special_unit_abilities = Array();
	this.alphaStrikeForceStats.heat = 0;
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
	for( weapon_counter = 0; weapon_counter < this.equipmentList.length; weapon_counter++) {
		if( this.equipmentList[weapon_counter].alpha_strike ) {
			if( this.equipmentList[weapon_counter].alpha_strike.range_long > 0){
				total_weapon_heat_long += this.equipmentList[weapon_counter].alpha_strike.heat;
			}

			total_weapon_heat += this.equipmentList[weapon_counter].alpha_strike.heat;

			this.alphaStrikeForceStats.range_short += this.equipmentList[weapon_counter].alpha_strike.range_short;
			this.alphaStrikeForceStats.range_medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
			this.alphaStrikeForceStats.range_long += this.equipmentList[weapon_counter].alpha_strike.range_long;
			this.alphaStrikeForceStats.range_extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;

			this.calcLogAS += "Adding Weapon " + this.equipmentList[weapon_counter].tag;
			this.calcLogAS += " (" + this.equipmentList[weapon_counter].alpha_strike.range_short + ", ";
			this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
			this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_long + ", ";
			this.calcLogAS += this.equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";

		}
	}
	var move_heat = 0;
	if( this.getJumpSpeed() > 0 ) {
		if( this.getJumpSpeed() < 3 )
			move_heat += 3;
		else
			move_heat += this.getJumpSpeed();

		this.calcLogAS += "<strong>Move Is " + this.alphaStrikeForceStats.move + "\"/" + this.alphaStrikeForceStats.jump_move + "\"J</strong><br />\n";
	} else {
		move_heat += 2;
		this.calcLogAS += "<strong>Move Is " + this.alphaStrikeForceStats.move + "\"</strong><br />\n";
	}




	var heat_dissipation = 0;
	//~ console.log( "this.heat_sink_type", this.heat_sink_type );
	if( this.heat_sink_type == "single" ) {
		heat_dissipation += (10 + this.additional_heat_sinks) * 1;
	} else if( this.heat_sink_type == "double" ) {
		heat_dissipation += (10 + this.additional_heat_sinks) * 2;
	}

	var max_heat_output = move_heat + total_weapon_heat;
	var overheat_value = move_heat + total_weapon_heat - heat_dissipation;
	var long_overheat_value = move_heat + total_weapon_heat_long - heat_dissipation;



	var before_heat_range_short = this.alphaStrikeForceStats.range_short.toFixed(0) /1;
	var before_heat_range_medium = this.alphaStrikeForceStats.range_medium.toFixed(0) /1;
	var before_heat_range_long = this.alphaStrikeForceStats.range_long.toFixed(0) /1;
	var before_heat_range_extreme = this.alphaStrikeForceStats.range_extreme.toFixed(0) /1;
	//~ console.log( "ba", this.alphaStrikeForceStats );
	if( overheat_value > 3) {
		// Heat Modified Damage, p115 AS companion
		this.alphaStrikeForceStats.range_short = ( this.alphaStrikeForceStats.range_short * heat_dissipation ) / (max_heat_output - 4);
		this.alphaStrikeForceStats.range_medium = ( this.alphaStrikeForceStats.range_medium * heat_dissipation ) / (max_heat_output - 4);
	}

	if( long_overheat_value > 4) {
		this.alphaStrikeForceStats.range_long = ( this.alphaStrikeForceStats.range_long * heat_dissipation ) / (max_heat_output - 4);

	}
	//~ console.log( "ba", this.alphaStrikeForceStats );
	this.alphaStrikeForceStats.range_short = this.alphaStrikeForceStats.range_short.toFixed(0) /1;
	this.alphaStrikeForceStats.range_medium = this.alphaStrikeForceStats.range_medium.toFixed(0) /1;
	this.alphaStrikeForceStats.range_long = this.alphaStrikeForceStats.range_long.toFixed(0) /1;
	this.alphaStrikeForceStats.range_extreme = this.alphaStrikeForceStats.range_extreme.toFixed(0) /1;
	//~ console.log( "fa", this.alphaStrikeForceStats );

	// Determine Overheat Values - p116 AS Companion
	var final_overheat_value = 0;
	//~ console.log( "before_heat_range_medium", before_heat_range_medium );
	//~ console.log( "this.alphaStrikeForceStats.range_medium", this.alphaStrikeForceStats.range_medium );
	//~ console.log( "before_heat_range_short", before_heat_range_short );
	//~ console.log( "this.alphaStrikeForceStats.range_short", this.alphaStrikeForceStats.range_short );
	if( before_heat_range_medium - this.alphaStrikeForceStats.range_medium > 0) {
		final_overheat_value = before_heat_range_medium - this.alphaStrikeForceStats.range_medium;
	} else {
		// try short range bracket since the med range is low.
		final_overheat_value = before_heat_range_short - this.alphaStrikeForceStats.range_short;
	}
	if( final_overheat_value > 4 )
		final_overheat_value = 4;

	//~ console.log( "before_heat_range_long", before_heat_range_long );
	//~ console.log( "this.alphaStrikeForceStats.range_long", this.alphaStrikeForceStats.range_long );

	// Determine Overheat Values - ASC - p116
	var final_long_overheat_value = 0;
	if( before_heat_range_long - this.alphaStrikeForceStats.range_long > 0) {
		final_long_overheat_value = before_heat_range_long - this.alphaStrikeForceStats.range_long;
	}

	if( final_long_overheat_value > 4 )
		final_long_overheat_value = 4;

	this.alphaStrikeForceStats.ov = final_overheat_value;

	this.calcLogAS += "Move Heat: " + move_heat + "<br />\n";
	this.calcLogAS += "Weapon Heat: " + total_weapon_heat + "<br />\n";
	this.calcLogAS += "Long Weapon Heat: " + total_weapon_heat_long + "<br />\n";
	this.calcLogAS += "Heat Dissipation: " + heat_dissipation + "<br />\n";

	this.calcLogAS += "Overheat Value: " + overheat_value + "<br />\n";
	this.calcLogAS += "Long Overheat Value: " + long_overheat_value + "<br />\n";

	this.calcLogAS += "<strong>Short Damage: " + this.alphaStrikeForceStats.range_short + "</strong><br />\n";
	this.calcLogAS += "<strong>Medium Damage: " + this.alphaStrikeForceStats.range_medium + "</strong><br />\n";
	this.calcLogAS += "<strong>Long Damage: " + this.alphaStrikeForceStats.range_long + "</strong><br />\n";
	this.calcLogAS += "<strong>Extreme Damage: " + this.alphaStrikeForceStats.range_extreme + "</strong><br />\n";

	// Overheat Value is
	this.calcLogAS += "<strong>Final Overheat Value: " + final_overheat_value + "</strong><br />\n";
	this.calcLogAS += "<strong>Final Long Overheat Value: " + final_long_overheat_value + "</strong><br />\n";

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
	offensive_value += this.alphaStrikeForceStats.range_short + this.alphaStrikeForceStats.range_medium + this.alphaStrikeForceStats.range_long + this.alphaStrikeForceStats.range_extreme;
	this.calcLogAS += "Attack Damage Factor: " + offensive_value + " ( " + this.alphaStrikeForceStats.range_short + " + " + this.alphaStrikeForceStats.range_medium + " + " + this.alphaStrikeForceStats.range_long + " + " + this.alphaStrikeForceStats.range_extreme + " )<br />\n";

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
	if( this.alphaStrikeForceStats.move > this.alphaStrikeForceStats.jump_move ) {
		movementDefenseValue += this.alphaStrikeForceStats.move * .25;
		bestMovement = this.alphaStrikeForceStats.move;
	} else {
		movementDefenseValue += this.alphaStrikeForceStats.jump_move * .25;
		bestMovement = this.alphaStrikeForceStats.move;
	}
	defensive_value += movementDefenseValue;

	if(this.alphaStrikeForceStats.jump_move > 0 ) {
		movementDefenseValue += .5;
		this.calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25 + .5)<br />\n";
	} else {
		this.calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25)<br />\n";
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
		&& this.alphaStrikeForceStats.range_medium == 0
		&& this.alphaStrikeForceStats.range_long == 0
		&& this.alphaStrikeForceStats.range_extreme == 0
	) {
		this.calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
		this.calcLogAS += "Modified Point Value: " + baseFinalValue * .75  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .75;
	}

	if(
		bestMovement >= 2
		&& bestMovement <= 5
		&& this.alphaStrikeForceStats.range_medium == 0
		&& this.alphaStrikeForceStats.range_long == 0
		&& this.alphaStrikeForceStats.range_extreme == 0
	) {
		this.calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
		this.calcLogAS += "Modified Point Value: " + baseFinalValue * .5  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .5;
	}

	if(
		bestMovement >= 2
		&& bestMovement <= 5
		&& this.alphaStrikeForceStats.range_long == 0
		&& this.alphaStrikeForceStats.range_extreme == 0
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

	this.alphaStrikeForceStats.pv = finalValue;

	//console.log( this.alphaStrikeForceStats );
	this.alphaStrikeValue = Math.round(this.alphaStrikeForceStats.pv);
}

Mech.prototype._calcBattleValue = function() {
	// TODO Calculations


	this.battleValue = 0;
	this.calcLogBV = "TODO";

}

Mech.prototype._calcCBillCost = function() {
	// TODO Calculations

	this.cbillCost = 0;
	this.calcLogCBill = "TODO";

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
	if( this.engine && this.engine.weight )
		return this.engine.weight[ this.engineType.tag ];
	else
		return 0;
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
	return this.tonnage / 10;
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
Mech.prototype.getASCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this.calcLogAS + "</div>";
},

Mech.prototype.getBVCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this.calcLogBV + "</div>";
},

Mech.prototype.getCBillCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this.calcLogCBill + "</div>";
},


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
	html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_INTERNAL_STRUCTURE") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getInteralStructureWeight() + "</td></tr>";
	html += "<tr><td colspan=\"1\">" + this.getTranslation("TRO_ENGINE") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_WALKING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_RUNNING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_JUMPING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

	html += "<tr><td colspan=\"1\">" + this.getTranslation("TRO_HEAT_SINKS") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
	html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_GYRO") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

	if( this.small_cockpit ) {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_SMALL_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
	} else {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
	}

	if( this.getJumpJetWeight() > 0 ) {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_JUMP_JETS") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
	}

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


	html += "<tr><td colspan=\"1\">" + this.getTranslation("TRO_ARMOR_FACTOR") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</td></tr>";


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

	// TODO Weapons and Ammo
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

	// TODO List Jump Jets Allocations...

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
		this.weights.push( {name: this.engineType.name[this.useLang] + " - " + this.engineType.rating, weight: this.engine.weight[this.engineType.tag]} );

		this.weights.push( {name: this.gyro.name[this.useLang], weight: this.getGyroWeight()} );

	}

	if( this.jumpSpeed > 0) {
		if( this.jumpJetType == "Standard" ) {
			// standard
			this.weights.push( {name: "Jump Jets", weight: this.getJumpJetWeight() } );
		} else {
			// improved
			this.weights.push( {name: "Improved Jets", weight: this.getJumpJetWeight() } );
		}
	}

	this.total_armor = this.armorWeight * 16;

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
		this.weights.push( {name: this.equipmentList[eq_count].name + " (" + this.equipmentList[eq_count].location  + ")", weight: this.equipmentList[eq_count].weight} );
	}

	this.current_tonnage = 0;
	for( weight_counter = 0; weight_counter < this.weights.length; weight_counter++) {
		this.current_tonnage += this.weights[weight_counter].weight;
	}

	this.remaining_tonnage = this.tonnage - this.current_tonnage;

	this.heat_sink_criticals = {};
	this.heat_sink_criticals.number = 0;
	this.heat_sink_criticals.slots_type = "single slot";
	this.heat_sink_criticals.slots_each = 1;

	if( this.heat_sink_type == "double") {
		if( this.tech.tag == "clan") {
			this.heat_sink_criticals.slots_type = "double slot";
			this.heat_sink_criticals.slots_each = 2;
		} else {
			this.heat_sink_criticals.slots_type = "triple slot";
			this.heat_sink_criticals.slots_each = 3;
		}
		this.heat_dissipation = (this.additional_heat_sinks + 10) * 2;
	} else {
		this.heat_sink_criticals.slots_type = "single";
		this.heat_sink_criticals.slots_each = 1;
		this.heat_dissipation = this.additional_heat_sinks + 10;
	}

	if( this.getEngine().rating ) {
		this.heat_sink_criticals.number =  this.additional_heat_sinks + 10  -  Math.floor(this.getEngine().rating / 25);
	} else {
		this.heat_sink_criticals.number = 0
	}

	this._calcCriticals();

	this._calcAlphaStrike();
	this._calcBattleValue();
	this._calcCBillCost();
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
	if( this.engineType.criticals[ this.getTech().tag ].ct > 3 ) {
		this._addCriticalItem(
			"engine", 									// item_tag
			this.engineType.name[this.useLang], 		// item_name
			3, 											// critical_count
			"ct" 										// location
														// slot
		);
	} else {
		this._addCriticalItem(
			"engine", 												// item_tag
			this.engineType.name[this.useLang], 					// item_name
			this.engineType.criticals[ this.getTech().tag ].ct, 	// critical_count
			"ct" 													// location
																	// slot
		);
	}

	if( this.engineType.criticals.rt )
		this._addCriticalItem( "engine", this.engineType.name[this.useLang], this.engineType.criticals[ this.getTech().tag ].rt, "rt");
	if( this.engineType.criticals.lt )
		this._addCriticalItem( "engine", this.engineType.name[this.useLang], this.engineType.criticals[ this.getTech().tag ].lt, "lt");

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
				movable: true,
				crits: this.jumpJetType.criticals
			}
		);
	}

	// Get optional equipment...
	for(var elc = 0; elc < this.equipmentList.length; elc++ ) {
		this.unallocatedCriticals.push(
			{
				name: this.equipmentList[elc].name[this.useLang] + " (" + this.localizeLocationAbbreviation(this.equipmentList[elc].location) + ")",
				tag: this.equipmentList[elc].tag,
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
			tag: "heat-sink",
			crits: hs_requirements.slots_each,
			movable: true
		} );
	}

	//~ console.log( this.criticalAllocationTable );

	// Allocate items per allocation table.
	for( alt_c = 0; alt_c < this.criticalAllocationTable.length; alt_c++) {
		this._allocateCritical(
			this.criticalAllocationTable[alt_c].tag,
			this.criticalAllocationTable[alt_c].loc,
			this.criticalAllocationTable[alt_c].slot,
			true
		)
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
	return this.heat_sink_type;
}

Mech.prototype.setHeatSinksType = function(newValue) {
	this.heat_sink_type = newValue;
	return this.heat_sink_type;
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

Mech.prototype.setGyro = function( gyroType )  {
	this.gyro = gyroType;
	this._calc();
	return this.gyro;
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
	this.engineType = engineType[0];
	return this.engineType;
}

Mech.prototype.getEngineType = function() {
	return this.engineType;
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

	switch( this.tonnage ) {
		case 20:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 6;
			this.internalStructure.leftTorso = 5;
			this.internalStructure.rightTorso = 5;

			this.internalStructure.rightArm = 3;
			this.internalStructure.leftArm = 3;

			this.internalStructure.rightLeg = 4;
			this.internalStructure.leftLeg = 4;



			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 69;
			else
				this.max_armor = 73;

			break;
		case 25:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 8;
			this.internalStructure.leftTorso = 6;
			this.internalStructure.rightTorso = 6;

			this.internalStructure.rightArm = 4;
			this.internalStructure.leftArm = 4;

			this.internalStructure.rightLeg = 6;
			this.internalStructure.leftLeg = 6;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 89;
			else
				this.max_armor = 97;

			break;
		case 30:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 10;
			this.internalStructure.leftTorso = 7;
			this.internalStructure.rightTorso = 7;

			this.internalStructure.rightArm = 5;
			this.internalStructure.leftArm = 5;

			this.internalStructure.rightLeg = 7;
			this.internalStructure.leftLeg = 7;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 105;
			else
				this.max_armor = 113;

			break;

		case 35:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 11;
			this.internalStructure.leftTorso = 8;
			this.internalStructure.rightTorso = 8;

			this.internalStructure.rightArm = 6;
			this.internalStructure.leftArm = 6;

			this.internalStructure.rightLeg = 8;
			this.internalStructure.leftLeg = 8;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 119;
			else
				this.max_armor = 127;

			break;

		case 40:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 12;
			this.internalStructure.leftTorso = 10;
			this.internalStructure.rightTorso = 10;

			this.internalStructure.rightArm = 6;
			this.internalStructure.leftArm = 6;

			this.internalStructure.rightLeg = 10;
			this.internalStructure.leftLeg = 10;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 137;
			else
				this.max_armor = 153;

			break;

		case 45:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 14;
			this.internalStructure.leftTorso = 11;
			this.internalStructure.rightTorso = 11;

			this.internalStructure.rightArm = 7;
			this.internalStructure.leftArm = 7;

			this.internalStructure.rightLeg = 11;
			this.internalStructure.leftLeg = 11;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 153;
			else
				this.max_armor = 169;

			break;

		case 50:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 16;
			this.internalStructure.leftTorso = 12;
			this.internalStructure.rightTorso = 12;

			this.internalStructure.rightArm = 8;
			this.internalStructure.leftArm = 8;

			this.internalStructure.rightLeg = 12;
			this.internalStructure.leftLeg = 12;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 169;
			else
				this.max_armor = 185;


			break;

		case 55:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 18;
			this.internalStructure.leftTorso = 13;
			this.internalStructure.rightTorso = 13;

			this.internalStructure.rightArm = 9;
			this.internalStructure.leftArm = 9;

			this.internalStructure.rightLeg = 13;
			this.internalStructure.leftLeg = 13;


			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 285;
			else
				this.max_armor = 201;

			break;

		case 60:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 20;
			this.internalStructure.leftTorso = 14;
			this.internalStructure.rightTorso = 14;

			this.internalStructure.rightArm = 10;
			this.internalStructure.leftArm = 10;

			this.internalStructure.rightLeg = 14;
			this.internalStructure.leftLeg = 14;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 201;
			else
				this.max_armor = 217;


		break;
		case 65:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 21;
			this.internalStructure.leftTorso = 15;
			this.internalStructure.rightTorso = 15;

			this.internalStructure.rightArm = 10;
			this.internalStructure.leftArm = 10;

			this.internalStructure.rightLeg = 15;
			this.internalStructure.leftLeg = 15;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 211;
			else
				this.max_armor = 231;


		break;
		case 70:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 22;
			this.internalStructure.leftTorso = 15;
			this.internalStructure.rightTorso = 15;

			this.internalStructure.rightArm = 11;
			this.internalStructure.leftArm = 11;

			this.internalStructure.rightLeg = 15;
			this.internalStructure.leftLeg = 15;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 213;
			else
				this.max_armor = 233;


		break;
		case 75:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 23;
			this.internalStructure.leftTorso = 16;
			this.internalStructure.rightTorso = 16;

			this.internalStructure.rightArm = 12;
			this.internalStructure.leftArm = 12;

			this.internalStructure.rightLeg = 16;
			this.internalStructure.leftLeg = 16;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 231;
			else
				this.max_armor = 247;


		break;
		case 80:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 25;
			this.internalStructure.leftTorso = 17;
			this.internalStructure.rightTorso = 17;

			this.internalStructure.rightArm = 13;
			this.internalStructure.leftArm = 13;

			this.internalStructure.rightLeg = 17;
			this.internalStructure.leftLeg = 17;


			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 247;
			else
				this.max_armor = 263;

			break;
		case 85:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 27;
			this.internalStructure.leftTorso = 18;
			this.internalStructure.rightTorso = 18;

			this.internalStructure.rightArm = 14;
			this.internalStructure.leftArm = 14;

			this.internalStructure.rightLeg = 18;
			this.internalStructure.leftLeg = 18;


			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 263;
			else
				this.max_armor = 279;

			break;

		case 90:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 29;
			this.internalStructure.leftTorso = 19;
			this.internalStructure.rightTorso = 19;

			this.internalStructure.rightArm = 15;
			this.internalStructure.leftArm = 15;

			this.internalStructure.rightLeg = 19;
			this.internalStructure.leftLeg = 19;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 279;
			else
				this.max_armor = 295;


			break;
		case 95:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 30;
			this.internalStructure.leftTorso = 20;
			this.internalStructure.rightTorso = 20;

			this.internalStructure.rightArm = 16;
			this.internalStructure.leftArm = 16;

			this.internalStructure.rightLeg = 20;
			this.internalStructure.leftLeg = 20;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 293;
			else
				this.max_armor = 309;


			break;
		case 100:
			this.internalStructure.head = 3;

			this.internalStructure.centerTorso = 31;
			this.internalStructure.leftTorso = 21;
			this.internalStructure.rightTorso = 21;

			this.internalStructure.rightArm = 17;
			this.internalStructure.leftArm = 17;

			this.internalStructure.rightLeg = 21;
			this.internalStructure.leftLeg = 21;

			if( this.mech_type.class.toLowerCase() == "biped")
				this.max_armor = 307;
			else
				this.max_armor = 323;

			break;

		default:
			// error
			break;
	}

	if( this.mech_type.class.toLowerCase() == "quad") {
		this.internalStructure.rightArm = this.internalStructure.rightLeg;
		this.internalStructure.leftArm = this.internalStructure.leftLeg;
	}

	this.max_armor_tonnage = this.max_armor / 16;

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

	export_object.additional_heat_sinks = this.additional_heat_sinks;
	export_object.heat_sink_type = this.heat_sink_type;

	export_object.armor_weight = this.armorWeight;
	if(!this.uuid)
		this.uuid = generateUUID();

	export_object.uuid = this.uuid;


	export_object.armor_allocation = this.armorAllocation;

	export_object.equipment = Array();

	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		export_object.equipment.push(
			{
				tag: this.equipmentList[eq_count].tag,
				loc: this.equipmentList[eq_count].location
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

	return JSON.stringify(export_object);
}

Mech.prototype.getInteralStructure = function() {
	return this.internalStructure;
}

Mech.prototype.importJSON = function(json_string) {
	// TODO
	import_object = JSON.parse( json_string );

	if( typeof(import_object) == "object") {
			this.setName( import_object.name );
			if( import_object.mech_type )
				this.setMechType( import_object.mech_type );

			this.setTonnage( import_object.tonnage );

			if( import_object.walkSpeed )
				this.setWalkSpeed( import_object.walkSpeed );

			if( import_object.jumpSpeed )
				this.setJumpSpeed( import_object.jumpSpeed );

			if( import_object.engineType )
				this.setEngineType( import_object.engineType );

			if( import_object.additional_heat_sinks )
				this.setAdditionalHeatSinks( import_object.additional_heat_sinks );

			if( import_object.heat_sink_type )
				this.setHeatSinksType( import_object.heat_sink_type );

			if( import_object.era )
				this.setEra( import_object.era );

			if( import_object.tech )
				this.setTech( import_object.tech );

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
					this.addEquipmentFromTag( import_item.tag, this.getTech().tag, import_item.loc );
				}
			}

			if( import_object.allocation ) {
				this.criticalAllocationTable = import_object.allocation;
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


Mech.prototype.addEquipment = function(equipment_index, equipment_list_tag, location) {
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
		this.equipmentList.push( equipment_item );
		return equipment_item;
	}

	return null;
};

Mech.prototype.addEquipmentFromTag = function(equipment_tag, equipment_list_tag, location) {
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

Mech.prototype.updateCriticalAllocationTable = function() {
	this.criticalAllocationTable = Array();
	for( mech_location in this.criticals ) {

		for( crit_item_counter = 0; crit_item_counter < this.criticals[mech_location].length; crit_item_counter++) {
			if(
				this.criticals[mech_location] &&
				this.criticals[mech_location][crit_item_counter] &&
				this.criticals[mech_location][crit_item_counter].movable
			) {
				//~ console.log( mech_location );
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

				if(this.criticals[mech_location][crit_item_counter] && this.criticals[mech_location][crit_item_counter].obj)
					this.criticals[mech_location][crit_item_counter].obj.location = short_loc;

				this.criticalAllocationTable.push(
					{
						tag: this.criticals[mech_location][crit_item_counter].tag,
						loc: short_loc,
						slot: crit_item_counter
					}
				);
			}
		}
	}
	// this._calc();
};

Mech.prototype.moveCritical = function ( itemTag, fromLocation, fromIndex, toLocation, toIndex ) {
	//~ console.log( "Mech.moveCritical()", itemTag, fromLocation, fromIndex, toLocation, toIndex );



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

	//~ console.log( "fromItem", fromItem );
	//~ console.log( "fromLocationObj", fromLocationObj );

	if( fromItem ) {

		if( toLocation == "hd" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.head, toIndex );
		} else if( toLocation == "ct" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.centerTorso, toIndex );
		} else if( toLocation == "rt" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.rightTorso, toIndex );
		} else if( toLocation == "rl" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.rightLeg, toIndex );
		} else if( toLocation == "ra" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.rightArm, toIndex );
		} else if( toLocation == "lt" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.leftTorso, toIndex );
		} else if( toLocation == "ll" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.leftLeg, toIndex );
		} else if( toLocation == "la" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.leftArm, toIndex );
		}
	}

	return false;
};

Mech.prototype._moveItemToArea = function( fromLocation, fromItem, fromIndex, toLocation, toIndex) {
	//~ //console.log( "Mech._moveItemToArea()", fromLocation, fromItem, fromIndex, toLocation, toIndex);
	//~ console.log( "Mech._moveItemToArea() fromLocation : ", fromLocation );
	//~ console.log( "Mech._moveItemToArea() fromItem : ", fromItem );
	//~ console.log( "Mech._moveItemToArea() fromIndex : ", fromIndex );
	//~ console.log( "Mech._moveItemToArea() toLocation : ", toLocation );
	//~ console.log( "Mech._moveItemToArea() toIndex : ", toIndex );

	// Step One check to see if TO has enough slots for item....
	var placeholder = {
		uuid: fromItem.uuid,
		name: "placeholder",
		placeholder: true
	};


	hasSpace = true;
	//~ console.log( "toLocation.length > toIndex + fromItem.crits", toLocation.length, toIndex, fromItem.crits );
	if( toLocation.length < toIndex + fromItem.crits )
		return false;
	for( var testC = 0; testC < fromItem.crits; testC++ ) {
		if( toLocation[ toIndex + testC ] ) {
			hasSpace = false;
		}
	}

	if( hasSpace ) {
		//~ console.log( "toa", toLocation );
		toLocation[ toIndex ] = fromItem;
		for( var phC = 1; phC < toLocation[ toIndex ].crits; phC++ ) {
			toLocation[ toIndex + phC ] = placeholder;
		}

		//~ console.log( "tob",toLocation );


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

Mech.prototype._allocateCritical = function(equipment_tag, mech_location, slot_number, remove_from_unallocated) {

	for(uaet_c = 0; uaet_c < this.unallocatedCriticals.length; uaet_c++) {
		if( equipment_tag == this.unallocatedCriticals[uaet_c].tag ) {
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


var battlemechCreatorControllerExportsArray =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {
			// Set Page Title Tag
			$translate(['APP_TITLE', 'BM_EXPORTS_TITLE', 'BM_EXPORTS_DESC', 'WELCOME_BUTTON_MECH_CREATOR' ]).then(function (translation) {
				$rootScope.title_tag = translation.BM_EXPORTS_TITLE + " | " + translation.APP_TITLE;
				if( translation.BM_EXPORTS_DESC )
					$scope.h3_title = translation.BM_EXPORTS_TITLE + ": " + translation.BM_EXPORTS_DESC;
				else
					$scope.h3_title = translation.BM_EXPORTS_TITLE;
				$rootScope.subtitle_tag = "&raquo; " + translation.WELCOME_BUTTON_MECH_CREATOR;
			});

			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];


			// make tro for sidebar
			$scope.mech_tro = current_mech.makeTROHTML();
			$scope.mech_bv_calc = current_mech.getBVCalcHTML();
			$scope.mech_as_calc = current_mech.getASCalcHTML();

			$scope.makeRecordSheet = function() {
				// convertImgToDataURLviaCanvas(
				// 	'./images/pdf/blank-mech-sheet-smaller.png',
				// 	function(base64Img) {
						pdf = makeBattlemechRecordSheetPDF(current_mech);
						pdf.output('dataurlnewwindow');
					// }
				 // );
			}

			$scope.makeTROSheet = function() {
				pdf = makeBattlemechTROPDF(current_mech);
				pdf.output('dataurlnewwindow');
			}
			$scope.makeCombinedSheet = function() {
				// convertFileToDataURLviaFileReader(
				// 	'./images/pdf/blank-mech-sheet.png',
				// 	function(base64Img) {
						pdf = makeBattlemechCombinedPDF(current_mech);
				// 		pdf.output('dataurlnewwindow');
				// 	}
				// );
			}
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

			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];


			update_mech_status_bar_and_tro($scope, $translate, current_mech);

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

var battlemechCreatorControllerStep2Array =
	[
		'$rootScope',
		'$translate',
		'$scope',
		'$location',
		function ($rootScope, $translate, $scope, $location) {

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
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];

			localStorage["backToPath"] = $location.$$path;

			update_walking_jumping_dropdowns( $scope, $translate, current_mech );
			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			// make tro for sidebar


			$scope.update_mech_walking = function() {
				current_mech.setWalkSpeed( $scope.mech_walking.selectedOption.id );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_walking_jumping_dropdowns( $scope, $translate, current_mech );
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}

			$scope.update_mech_jumping = function() {
				current_mech.setJumpSpeed( $scope.mech_jumping.selectedOption.id );
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

				update_walking_jumping_dropdowns( $scope, $translate, current_mech );
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
			}
		}
	]
;

function update_walking_jumping_dropdowns( $scope, $translate, current_mech ) {

	$translate(['BM_STEP2_SELECT_WALK', 'BM_STEP2_SELECT_JUMP', 'BM_MP_ABBR' ]).then(function (translation) {
		availble_walking_mp = [];
		availble_jumping_mp = [];
		selected_walking_mp = 0;
		selected_jumping_mp = 0;

		// TODO calculate the max engine size for tonnage
		max_walking = (400/ current_mech.tonnage);
		max_jumping = current_mech.getWalkSpeed();

		for( m_counter = 0; m_counter <= max_walking; m_counter++) {
			if( m_counter == 0 ) {
				availble_walking_mp.push( { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_WALK + " -"} );
				if( current_mech.getWalkSpeed() == m_counter) {
					selected_walking_mp = { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_WALK + " -"};
				}
			} else {
				availble_walking_mp.push( { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR} );
				if( current_mech.getWalkSpeed() == m_counter) {
					selected_walking_mp = { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR};
				}
			}
		}

		for( m_counter = 0; m_counter <= max_jumping; m_counter++) {
			if( m_counter == 0 ) {
				availble_jumping_mp.push( { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_JUMP + " -"} );
				if( current_mech.getJumpSpeed() == m_counter) {
					selected_jumping_mp = { id: m_counter, name: "- " + translation.BM_STEP2_SELECT_JUMP + " -"};
				}
			} else {
				availble_jumping_mp.push( { id: m_counter, name: m_counter + " " + translation.BM_MP_ABBR} );
				if( current_mech.getJumpSpeed() == m_counter) {
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
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

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
			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];

			update_step4_page_items($scope, $translate, current_mech);

			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			localStorage["backToPath"] = $location.$$path;

			$scope.update_armor_weight = function() {
				current_mech.setArmorWeight( $scope.selected_armor_weight.id );
				update_step4_page_items($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			}



			$scope.allocate_max = function() {

				internal_structure = current_mech.getInteralStructure();
				//console.log( "internal_structure", internal_structure);
				centerTorsoArmor = internal_structure.centerTorso * 2;
				lrTorsoArmor = internal_structure.rightTorso * 2;

				centerTorsoArmorRear = Math.ceil(centerTorsoArmor * .2);
				centerTorsoArmor = centerTorsoArmor - centerTorsoArmorRear;

				lrTorsoArmorRear = Math.ceil(lrTorsoArmor * .2);
				lrTorsoArmor = lrTorsoArmor - lrTorsoArmorRear;

				current_mech.setRightTorsoArmor( lrTorsoArmor );
				current_mech.setCenterTorsoArmor( centerTorsoArmor );
				current_mech.setLeftTorsoArmor( lrTorsoArmor );

				current_mech.setRightTorsoRearArmor( lrTorsoArmorRear );
				current_mech.setCenterTorsoRearArmor( centerTorsoArmorRear );
				current_mech.setLeftTorsoRearArmor( lrTorsoArmorRear );

				current_mech.setRightLegArmor( internal_structure.rightLeg * 2 );
				current_mech.setLeftLegArmor( internal_structure.leftLeg * 2 );

				current_mech.setHeadArmor( 9 );

				if( current_mech.getType().class.toLowerCase() == "biped") {
					current_mech.setRightArmArmor( internal_structure.leftArm * 2 );
					current_mech.setLeftArmArmor( internal_structure.leftArm * 2 );
				} else {
					// quad
					current_mech.setRightArmArmor( internal_structure.rightLeg * 2 );
					current_mech.setLeftArmArmor( internal_structure.leftLeg * 2 );
				}

				update_step4_page_items($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			}

			$scope.allocate_sanely = function() {

				total_armor = current_mech.getTotalArmor();
				internal_structure = current_mech.getInteralStructure();
				maximum_armor = current_mech.getMaxArmor();
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
					   current_mech.setHeadArmor(head_armor);
					   total_armor -= head_armor;
					} else {
						current_mech.setHeadArmor(0);
					}
				}


				if( total_armor > torso_armor) {
				   current_mech.setRightTorsoArmor( torso_armor );
				   total_armor -= torso_armor;
				}

				if( total_armor > rear_armor) {
				   current_mech.setRightTorsoRearArmor( rear_armor );
					total_armor -= rear_armor;
				}

				if( total_armor > torso_armor) {
					current_mech.setLeftTorsoArmor( torso_armor );
					total_armor -= torso_armor;
				}
				if( total_armor > rear_armor) {
					current_mech.setLeftTorsoRearArmor( rear_armor );
				   total_armor -= rear_armor;
				}

				if( total_armor > leg_armor) {
					current_mech.setRightLegArmor( leg_armor );
					total_armor -= leg_armor;
				}

				if( total_armor > leg_armor) {
				   current_mech.setLeftLegArmor( leg_armor );
				   total_armor -= leg_armor;
				}

				if( total_armor > arm_armor) {
					current_mech.setRightArmArmor( arm_armor );
				   total_armor -= arm_armor;
				}
				if( total_armor > arm_armor) {
				   current_mech.setLeftArmArmor( arm_armor );
				   total_armor -= arm_armor;
				}

				if( total_armor > rear_armor) {
				   current_mech.setCenterTorsoRearArmor( centerTorsoArmorRear );
				   total_armor -= rear_armor;
				}

				current_mech.setCenterTorsoArmor( centerTorsoArmor ); // everything else goes to center torso! :)

				update_step4_page_items($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			}

			$scope.clear_armor = function() {

				current_mech.setHeadArmor( 0 );

				current_mech.setRightTorsoArmor( 0 );
				current_mech.setRightTorsoRearArmor( 0 );


				current_mech.setLeftTorsoArmor( 0 );
				current_mech.setLeftTorsoRearArmor( 0 );

				current_mech.setRightLegArmor( 0 );
				current_mech.setLeftLegArmor( 0 );


				current_mech.setRightArmArmor( 0 );
				current_mech.setLeftArmArmor( 0 );

				current_mech.setCenterTorsoRearArmor( 0 );
				current_mech.setCenterTorsoArmor( 0 );

				update_step4_page_items($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			}

			$scope.update_armor_allocation = function(armor_location) {
				console.log("armor_location", armor_location);
				if( armor_location == "hd") {
					console.log("setHeadArmor", $scope.armor_current_hd.id);
					current_mech.setHeadArmor( $scope.armor_current_hd.id );

				} else if( armor_location == "ra") {
					current_mech.setRightArmArmor( $scope.armor_current_ra.id );

				} else if( armor_location == "la") {
					current_mech.setLeftArmArmor( $scope.armor_current_la.id );

				} else if( armor_location == "rt") {
					current_mech.setRightTorsoArmor( $scope.armor_current_rt.id );

				} else if( armor_location == "ct") {
					current_mech.setCenterTorsoArmor( $scope.armor_current_ct.id );

				} else if( armor_location == "lt") {
					current_mech.setLeftTorsoArmor( $scope.armor_current_lt.id );

				} else if( armor_location == "rtr") {
					current_mech.setRightTorsoRearArmor( $scope.armor_current_rtr.id );

				} else if( armor_location == "ctr") {
					current_mech.setCenterTorsoRearArmor( $scope.armor_current_ctr.id );

				} else if( armor_location == "ltr") {
					current_mech.setLeftTorsoRearArmor( $scope.armor_current_ltr.id );

				} else if( armor_location == "rl") {
					current_mech.setRightLegArmor( $scope.armor_current_rl.id );

				} else if( armor_location == "ll") {
					current_mech.setLeftLegArmor( $scope.armor_current_ll.id );

				}
				update_step4_page_items($scope, $translate, current_mech);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();

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
		if( current_mech.getType().class == "quad")
			$scope.for_quad = true;
		else
			$scope.for_biped = true;

		// Update Armor Weight Selection Dropdown....
		current_armor_weight = current_mech.getArmorWeight();

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

		for( var hscount = 1; hscount <= current_mech.getMaxArmorTonnage() + 0.5; hscount = hscount + 0.5) {
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
		label_armor_stats = translation.BM_STEP4_MAX_ARMOR + ": " + current_mech.getMaxArmor() + "<br />";
		label_armor_stats += translation.BM_STEP4_TOTAL_ARMOR + ": " + current_mech.getTotalArmor() + "<br />";
		label_armor_stats += translation.BM_STEP4_UNALLOCATED_ARMOR + ": " + current_mech.getUnallocatedArmor() + "<br />";

		// Update Armor Select Dropdowns....
		armor_allocations = current_mech.getArmorAllocations();
		internal_structure = current_mech.getInteralStructure();


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
			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			localStorage["backToPath"] = $location.$$path;

			current_mech.useLang = localStorage["tmp.preferred_language"];
			// make tro for sidebar
			update_mech_status_bar_and_tro($scope, $translate, current_mech);

			$scope.equipment_table =[];

			if( current_mech.getTech().tag == "clan") {
				// Use Clan Equipment Table...
				$scope.equipment_table = mechClanEquipment;
			} else {
				// Use Inner Sphere Equipment Table...
				$scope.equipment_table = mechISEquipment;
			}
			for(var eqc = 0; eqc < $scope.equipment_table.length; eqc++ ) {
				if( $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ])
					$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ localStorage["tmp.preferred_language"] ];
				else
					$scope.equipment_table[eqc].local_name = $scope.equipment_table[eqc].name[ "en-US" ];

				if( $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ])
					$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ localStorage["tmp.preferred_language"] ];
				else
					$scope.equipment_table[eqc].local_category = $scope.equipment_table[eqc].category[ "en-US" ];

				$scope.equipment_table[eqc].local_space = $scope.equipment_table[eqc].space.battlemech;

			}


			$translate(['BM_STEP5_SELECT_LOCATION' ]).then(function (translation) {


				$scope.item_locations = [];

				$scope.installed_equipment_table = current_mech.getInstalledEquipment();

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

					$scope.item_locations[eqc] = make_select_object($scope.installed_equipment_table[eqc].location);
				}


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
					current_mech.addEquipmentFromTag( $scope.equipment_table[index_number].tag );
					update_mech_status_bar_and_tro($scope, $translate, current_mech);
					localStorage["tmp.current_mech"] = current_mech.exportJSON();
				}

			};

			$scope.removeItem = function( index_number ) {
				current_mech.removeEquipment( index_number );
				$scope.item_locations.splice(index_number, 1);
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();
			};

			$scope.updateLocation = function( index_number ) {
				//console.log( "updateLocation", index_number );
	//			current_mech.removeEquipment( index_number );
				//console.log( "updateLocation", $scope.item_locations[index_number] );
				current_mech.setEquipmentLocation( index_number, $scope.item_locations[index_number].id );
				update_mech_status_bar_and_tro($scope, $translate, current_mech);
				localStorage["tmp.current_mech"] = current_mech.exportJSON();


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
			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			localStorage["backToPath"] = $location.$$path;

			$scope.selectedItem = null;

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

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
					if( criticalItem ) {
						//~ console.log( "Slot is already filled" );
						$scope.errorCannotPlace = true;
					} else {
						var itemTag =  $scope.selectedItem.item.tag;
						var fromLocation =  $scope.selectedItem.from;
						var fromIndex =  $scope.selectedItem.index;
						var toLocation = locationString;
						var toIndex = indexLocation;
						worked = current_mech.moveCritical(
							itemTag,
							fromLocation,
							fromIndex,
							toLocation,
							toIndex
						);

						if( worked ) {
							//console.log( "a", current_mech.criticals.head )
							current_mech.updateCriticalAllocationTable();
							//console.log("b", current_mech.criticals.head )
							current_mech._calc();
							//console.log("c", current_mech.criticals.head )
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

			localStorage["backToPath"] = $location.$$path;

			// create mech object, load from localStorage if exists
			current_mech = new Mech();

			if( localStorage["tmp.current_mech"] )
				current_mech.importJSON( localStorage["tmp.current_mech"] );
			else
				current_mech.uuid = generateUUID();

			current_mech.useLang = localStorage["tmp.preferred_language"];


			// make tro for sidebar
			$scope.mech_tro = current_mech.makeTROHTML();
			$scope.mech_bv_calc = current_mech.getBVCalcHTML();
			$scope.mech_as_calc = current_mech.getASCalcHTML();
			$scope.mech_cbill_calc = current_mech.getCBillCalcHTML();



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


			localStorage["backToPath"] = $location.$$path;

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
	function ($rootScope, $translate,  $scope, $route, $location) {
		$rootScope.showSciFiCreatorMenu = false;
		$rootScope.showChargenMenu = false;

		$translate(['APP_TITLE', 'GENERAL_SETTINGS']).then(function (translation) {
			$rootScope.title_tag = translation.GENERAL_SETTINGS + " | " + translation.APP_TITLE;
			$rootScope.subtitle_tag = translation.GENERAL_SETTINGS;
		});


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
available_languages.push ({
	english_name: "English",
	native_name: "English",
	icon_file: "US.png",
	short_code: "en-US",
	active: true,

	translations: {

		APP_TITLE: '@Gauthic\'s BattleTech Tools',

		INDEX_WELCOME: 'Welcome',
		INDEX_H3_CORE: '@Gauthic\'s BattleTech Tools',

		WELCOME_BUTTON_MECH_CREATOR: '\'Mech Creator',
		WELCOME_BUTTON_MECH_CREATOR_DESC: 'Create a BattleMech',

		WELCOME_BUTTON_ALPHA_STRIKE: 'Alpha Strike',
		WELCOME_BUTTON_ALPHA_STRIKE_DESC: 'Alpha Strike Force Builder and In-Play App',

		WELCOME_H3_CORE: 'Jeff\'s BattleTech Tools',
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

		GENERAL_INTRODUCTORY: "Introductory",
		GENERAL_STANDARD: "Standard",
		GENERAL_ADVANCED: "Advanced",
		GENERAL_CLOSE: "Close",

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


		BUTTON_HOME_TITLE: "Home",
		BUTTON_HOME_DESC: "Back to the main screen",

		BM_INTRO_TITLE: "Welcome",
		BM_INTRO_DESC: "",
		BM_INTRO_TEXT: "<p>Welcome to a BattleTech 'mech builder.</p><p>This tool attempts to closely follow the steps in the <a href='http://bg.battletech.com/?wpsc-product=1095-2'>BattleTech TechManual</a> and the steps in that book should be referenced during 'mech creation</p>",

		BM_TONS: "tons",
		BM_TON: "ton",
		BM_NO_ARMOR: "No Armor",

		BM_REMAINING_TONS: "Remaining Tons",
		BM_UNALLOCATED_ARMOR: "Unallocated Armor",
		BM_UNALLOCATED_CRITS: "Unallocated Criticals",

		BM_STEP1_TITLE: "Step 1",
		BM_STEP1_DESC: "Design the Chassis",
		BM_STEP1_MECH_NAME: "Mech Model Name",
		BM_STEP1_MECH_TYPE: "Mech Type",
		BM_STEP1_MECH_ERA: "Mech Era",
		BM_STEP1_MECH_TONNAGE: "Mech Tonnage",
		BM_STEP1_MECH_TECH: "Mech Tech",

		BM_STEP2_TITLE: "Step 2",
		BM_STEP2_DESC: "Install engine and control systems",
		BM_STEP2_WALKING_MP: "Walking Movement Points",
		BM_STEP2_JUMPING_MP: "Jumping Movement Points",
		BM_STEP2_SELECT_JUMP: "Select Jumping MP",
		BM_STEP2_SELECT_WALK: "Select Walking MP",

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

		BM_SUMMARY_TITLE: "Summary",
		BM_SUMMARY_DESC: "",
		BM_SUMMARY_TRO: "Technical Read Out",
		BM_SUMMARY_BV_CALC: "Battle Value Calculations",
		BM_SUMMARY_AS_CALC: "Alpha Strike Calculations",
		BM_SUMMARY_CBILL_CALC: "CBill Cost Calculations",

		BM_EXPORTS_TITLE: "Exports",
		BM_EXPORTS_DESC: "",
		BM_EXPORTS_OUTPUT: "Exporting and Printing",
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
