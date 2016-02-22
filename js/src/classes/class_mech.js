function Mech (type) {
	this.mech_type = mechTypeOptions[0];
	this.tech = btTechOptions[0];
	this.era = btEraOptions[1]; // Default to Succession Wars
	this.make = "";
	this.model = "";
	this.uuid = "";
	this.tonnage = 20;
	this.useLang = "en-US";

	this.max_armor = 0;

	this.internalStructure = {};

	this.internalStructure.head = 0;

	this.internalStructure.centerTorso = 0;
	this.internalStructure.leftTorso = 0;
	this.internalStructure.rightTorso = 0;

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


	this.weights = Array();


	this.critical_items = Array();

	this.criticals = {};

	this.criticals.centerTorso = Array();
	this.criticals.leftTorso = Array();
	this.criticals.rightTorso = Array();

	this.criticals.centerTorsoRear = Array();
	this.criticals.leftTorsoRear = Array();
	this.criticals.rightTorsoRear = Array();

	this.criticals.rightArm = Array();
	this.criticals.leftArm = Array();

	this.criticals.rightLeg = Array();
	this.criticals.leftLeg = Array();

	this.weights = Array();

	this.gyro = "Standard";

	this.engine = 0;
	this.engineType = "Standard";
	this.jumpJetType = "Standard";

	this.walkSpeed = 0;
	this.runSpeed = 0;
	this.jumpSpeed = 0;

	this.max_armor_tonnage = 0;

	this.cbillCost = "n/a";
	this.battleValue = "n/a";
	this.alphaStrikeValue = "n/a";

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

	// TODO - calculations
	if( this.tonnage > 100) {
		this.alphaStrikeForceStats.size_class = 4;
		this.alphaStrikeForceStats.size_class_name = "Superheavy";
		this.alphaStrikeForceStats.special_unit_abilities.push("LG");
	} else if( this.tonnage >= 80) {
		this.alphaStrikeForceStats.size_class = 4;
		this.alphaStrikeForceStats.size_class_name = "Assault";
	} else if( this.tonnage >= 60) {
		this.alphaStrikeForceStats.size_class = 3;
		this.alphaStrikeForceStats.size_class_name = "Heavy";
	} else if( this.tonnage >= 40) {
		this.alphaStrikeForceStats.size_class = 2;
		this.alphaStrikeForceStats.size_class_name = "Medium";
	} else {
		this.alphaStrikeForceStats.size_class = 1;
		this.alphaStrikeForceStats.size_class_name = "Light";
	}

	this.alphaStrikeForceStats.armor = ( this.getTotalArmor() / 30).toFixed(0);

	if( this.getTech().name == "Inner Sphere") {


		switch( this.engineType ) {
			case "Compact":
			case "Compact Fusion":
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
				break;
			case "Light":
			case "Light Fusion":
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

				break;
		}
	} else {
		switch( this.engineType ) {
			case "XL":
			case "XL Fusion":
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

				break;
		}
	}

	total_weapon_heat = 0;
	for( weapon_counter = 0; weapon_counter < this.equipmentList.length; weapon_counter++) {
		if( this.equipmentList[weapon_counter].alpha_strike ) {
			total_weapon_heat += this.alphaStrikeForceStats.heat
			this.alphaStrikeForceStats.range_short += this.equipmentList[weapon_counter].alpha_strike.range_short;
			this.alphaStrikeForceStats.range_medium += this.equipmentList[weapon_counter].alpha_strike.range_medium;
			this.alphaStrikeForceStats.range_long += this.equipmentList[weapon_counter].alpha_strike.range_long;
			this.alphaStrikeForceStats.range_extreme += this.equipmentList[weapon_counter].alpha_strike.range_extreme;
		}
	}
	if( this.getJumpSpeed() > 0 ) {
		if( this.getJumpSpeed() / 2 < 3 )
			total_weapon_heat += 3;
		else
			total_weapon_heat += this.getJumpSpeed() / 2;

	} else {
		total_weapon_heat += 2;
	}

	this.alphaStrikeForceStats.range_short = this.alphaStrikeForceStats.range_short.toFixed(0) /1;
	this.alphaStrikeForceStats.range_medium = this.alphaStrikeForceStats.range_medium.toFixed(0) /1;
	this.alphaStrikeForceStats.range_long = this.alphaStrikeForceStats.range_long.toFixed(0) /1;
	this.alphaStrikeForceStats.range_extreme = this.alphaStrikeForceStats.range_extreme.toFixed(0) /1;

	this.alphaStrikeValue = this.alphaStrikeForceStats.pv;
}

Mech.prototype._calcBattleValue = function() {
	// TODO Calculations



	this.battleValue = 0;
}

Mech.prototype._calcCBillCost = function() {
	// TODO Calculations



	this.cbillCost = 0;
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
		return this.engine.weight.standard;
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
	switch( this.gyro ) {
		case "Compact":
			return Math.ceil(this.engine.rating / 100) * 1.5;
			break
		case "Heavy Duty":
			return Math.ceil(this.engine.rating / 100) * 2;

			break
		case "Extra-Light (XL)":
			return Math.ceil(this.engine.rating / 100) * 0.5;
			break
		default:
			return Math.ceil(this.engine.rating / 100);
			// TODO 4 slots to center torso
			break
	}
	return Math.ceil(this.engine.rating / 100);
}
Mech.prototype.getCockpitWeight = function() {
	return 3;
}

Mech.prototype.getInteralStructureWeight = function() {
	return this.tonnage / 10;
}

Mech.prototype.getJumpJetWeight = function() {
	if( this.jumpJetType == "Standard" ) {
		// standard
		if( this.tonnage <= 55) {
			// 10-55 tons
			return this.jumpSpeed * 0.5;
		} else if(this.tonnage <= 85) {
			// 60 - 85 tons
			return this.jumpSpeed * 1;
		} else {
			// 90+ tons
			return this.jumpSpeed * 2;
		}
	} else {
		// improved
		if( this.tonnage <= 55) {
			// 10-55 tons
			return this.jumpSpeed * 1;
		} else if(this.tonnage <= 85) {
			// 60 - 85 tons
			return this.jumpSpeed * 2;
		} else {
			// 90+ tons
			return this.jumpSpeed * 4;
		}
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
	return "<div class=\"callout alert\">TODO</div>";
},

Mech.prototype.getBVCalcHTML = function() {
	return "<div class=\"callout alert\">TODO</div>";
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
	html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";

	if( this.getJumpJetWeight() > 0 )
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_JUMP_JETS") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";

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
	html += "<table class=\"mech-tro\">";
	html += "<tr><th class=\"text-left\">" + this.getTranslation("TRO_WEAPONS_AND_AMMO") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_LOCATION") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_CRITICAL") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_TONNAGE") + "</th></tr>";

	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		if( typeof( this.equipmentList[eq_count].location ) == "undefined" )
			this.equipmentList[eq_count].location = "n/a";

		item_location = "";
		item_location = this.getLocationAbbr( this.equipmentList[eq_count].location );
		html += "<tr><td class=\"text-left\">" + this.equipmentList[eq_count].name[ this.useLang ] + "</td><td class=\"text-center\">" + item_location + "</strong></td><td class=\"text-center\">" + this.equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this.equipmentList[eq_count].weight + "</td></tr>";
	}

	// TODO Weapons and Ammo
	html += "</table>";

	return html;
}
Mech.prototype.getLocationAbbr = function(location_tag) {


	for(loc_count = 0; loc_count < battlemechLocations.length; loc_count++) {
		if( location_tag == battlemechLocations[loc_count].tag ) {
			if( battlemechLocations[loc_count].abbr[ this.useLang ] != "undefined" )
				return battlemechLocations[loc_count].abbr[ this.useLang ];
			else
				return battlemechLocations[loc_count].abbr[ "en-US" ];
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
	this.weights.push( {name: "Cockpit", weight: this.getCockpitWeight() } );

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
		this.weights.push( {name: "Standard Engine - " + this.engine.rating, weight: this.engine.weight.standard} );


		switch( this.gyro ) {
			case "Compact":
				this.weights.push( {name: "Compact Gyro", weight: this.getGyroWeight()} );
				// TODO 2 slots to center torso
				break
			case "Heavy Duty":
				this.weights.push( {name: "Heavy Duty Gyro", weight: Math.ceil(this.engine.rating / 100) * 2} );
				// TODO 4 slots to center torso
				break
			case "Extra-Light (XL)":
				this.weights.push( {name: "Extra-Light (XL) Gyro", weight: Math.ceil(this.engine.rating / 100) * 0.5} );
				// TODO 6 slots to center torso
				break
			default:
				this.weights.push( {name: "Standard Gyro", weight: Math.ceil(this.engine.rating / 100)} );
				// TODO 4 slots to center torso
				break
		}


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
	for( weight_counter = 0; weight_counter < this.weights.length; weight_counter++)
		this.current_tonnage += this.weights[weight_counter].weight;

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

	this._calcAlphaStrike();
	this._calcBattleValue();
	this._calcCBillCost();
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
	this.engineType = engineType;
	this._calc();
	return this.engine;
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

Mech.prototype.calcBattleValue = function() {
	// TODO
}

Mech.prototype.calcAlphaStrikeValue = function() {
	// TODO
}

Mech.prototype.exportJSON = function() {
	// TODO
	this._calc();
	var export_object = {};
	export_object.name = this.getName();
	export_object.tonnage = this.getTonnage();
	export_object.walkSpeed = this.walkSpeed;
	export_object.jumpSpeed = this.jumpSpeed;
	export_object.engineType = this.getEngineType();

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

Mech.prototype.getInstalledEquipment = function() {
	return this.equipmentList;
};