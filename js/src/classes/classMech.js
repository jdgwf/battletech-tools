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

	for( eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
		if( typeof( this.equipmentList[eq_count].location ) == "undefined" )
			this.equipmentList[eq_count].location = "n/a";

		item_location = "";
		item_location = this.getLocationAbbr( this.equipmentList[eq_count].location );
		html += "<tr><td class=\"text-left\">" + this.equipmentList[eq_count].name[ this.useLang ] + "</td><td class=\"text-center\">" + item_location + "</strong></td><td class=\"text-center\">" + this.equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this.equipmentList[eq_count].weight + "</td></tr>";
	}

	// TODO List Jump Jets Allocations...

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

				short_loc = "";
				if(mech_location == "Head" ) {
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
		if( this.criticals.Head[fromIndex] ) {
			fromItem = this.criticals.Head[fromIndex];
			fromLocationObj = this.criticals.Head;
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

		if(toLocation == "hd" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.Head, toIndex );
		} else if( toLocation == "ct" ) {
			return this._moveItemToArea( fromLocationObj, fromItem, fromIndex, this.criticals.centerTorso, toIndex );
		} else if( toLocation == "rt" ) {
			return this._moveItemToArea( fromLocationObj,fromItem, fromIndex, this.criticals.rightTorso, toIndex );
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
	//console.log( "Mech._moveItemToArea()", fromLocation, fromItem, fromIndex, toLocation, toIndex);
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

Mech.prototype._allocateCritical = function(equipment_tag, mech_location, slot_number, remove_from_unallocated) {

	for(uaet_c = 0; uaet_c < this.unallocatedCriticals.length; uaet_c++) {
		if( equipment_tag == this.unallocatedCriticals[uaet_c].tag ) {
			if(  this.unallocatedCriticals[uaet_c] && this.unallocatedCriticals[uaet_c].obj )
				this.unallocatedCriticals[uaet_c].obj.location = mech_location;

			if(mech_location == "hd" ) {
				this._assignItemToArea( this.criticals.Head, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slot_number );
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
