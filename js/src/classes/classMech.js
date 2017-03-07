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
		if( this.equipmentList[eq_count].ammo_per_ton && this.equipmentList[eq_count].ammo_per_ton > 0)
			html += "" + ( this.equipmentList[eq_count].name[ this.useLang ] +" " + this.equipmentList[eq_count].ammo_per_ton).rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + this.equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + this.equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
		else
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
		if( this.equipmentList[eq_count].ammo_per_ton && this.equipmentList[eq_count].ammo_per_ton > 0)
			html += "<tr><td class=\"text-left\">" + this.equipmentList[eq_count].name[ this.useLang ] + " " + this.equipmentList[eq_count].ammo_per_ton + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + this.equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this.equipmentList[eq_count].weight + "</td></tr>";
		else
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
