var pdfFontSize = 10;
var pdfFontFace = "helvetica";

function updateMechStatusBarAndTRO($scope, $translate) {
	$translate(
		[
			'BM_REMAINING_TONS', 'BM_UNALLOCATED_ARMOR', 'BM_UNALLOCATED_CRITS',
			'BM_MOVE_HEAT', 'BM_WEAPON_HEAT', 'BM_HEAT_DISSIPATION',
			'BM_HEAT_SUMMARY',
		]
	).then(function (translation) {
		$scope.mech_status_bar = "";

		$scope.mech_status_bar += "<strong>" + translation.BM_MOVE_HEAT + "</strong>: " + $scope.current_mech.getMoveHeat();
		$scope.mech_status_bar += " | <strong>" + translation.BM_WEAPON_HEAT + "</strong>: " + $scope.current_mech.getWeaponHeat();
		$scope.mech_status_bar += " | <strong>" + translation.BM_HEAT_DISSIPATION + "</strong>: " + $scope.current_mech.getHeatDissipation();

		var heatSummary = $scope.current_mech.getMoveHeat() + $scope.current_mech.getWeaponHeat() - $scope.current_mech.getHeatDissipation()
		if( heatSummary > 0  ) {
			$scope.mech_status_bar += " | <strong>" + translation.BM_HEAT_SUMMARY + "</strong>: <span class=\"color-red\">" + heatSummary + "</span>";
		} else {
			$scope.mech_status_bar += " | <strong>" + translation.BM_HEAT_SUMMARY + "</strong>: <span class=\"color-green\">" + heatSummary + "</span>";
		}

		$scope.mech_status_bar += " | <strong>" + translation.BM_REMAINING_TONS + "</strong>: " + $scope.current_mech.getRemainingTonnage();
		$scope.mech_status_bar += " | <strong>" + translation.BM_UNALLOCATED_ARMOR + "</strong>: " + $scope.current_mech.getUnallocatedArmor();
		$scope.mech_status_bar += " | <strong>" + translation.BM_UNALLOCATED_CRITS + "</strong>: " + $scope.current_mech.getUnallocatedCritCount();

		$scope.mech_summary_html = current_mech.makeTROHTML();
	});

}
/*
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

*/
