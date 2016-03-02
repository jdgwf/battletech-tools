var pdfFontSize = 12;

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

	//pdfDoc.text(10, 10, "TRO Data for " + battlemech_object.getName() + ".....");
	/*
Type: PHX-1 Phoenix Hawk
Technology Base: Inner Sphere
Era: Succession Wars
Tonnage: 45
Battle Value: 0
Alpha Strike Value: 0
C-Bill Cost: $0
	*/
	lineHeight = 5;

	col1Loc = 10;
	col2Loc = 30;
	col3Loc = 50;
	col4Loc = 75;
	col5Loc = 90;

	var lineNumber = 1;
	pdfDoc.setFontType("");
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
	pdfDoc.setFontType("bold");
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_EQUIPMENT")  );
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_MASS")  );
	lineNumber++;

	pdfDoc.setFontType("");
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

	pdfDoc.setFontType("bold");
	// pdfDoc.setFontSize(9);
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber  , ""  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber, battlemech_object.getTranslation("TRO_INTERNAL")  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_ARMOR") );
	lineNumber++;

	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , ""  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_STRUCTURE")  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_VALUE") );
	lineNumber++;
	pdfDoc.setFontType("");
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
	pdfDoc.setFontType("bold");
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_WEAPONS")  );
	lineNumber++;
	pdfDoc.text(col1Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_AND_AMMO")  );
	pdfDoc.text(col3Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_LOCATION")  );
	pdfDoc.text(col4Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_CRITICAL"));
	pdfDoc.text(col5Loc, 10 + lineHeight * lineNumber , battlemech_object.getTranslation("TRO_TONNAGE"));

	lineNumber++;
	pdfDoc.setFontType("");

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

	pdfDoc.text(10, 10, "One small step with a really, really big metal and composite foot.....");
	pdfDoc.text(10, 25, battlemech_object.getName());
	pdfDoc = makeFooter(pdfDoc);
	return pdfDoc;
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


