function Mech (type) {
	this._mechType = mechTypeOptions[0];
	this._tech = btTechOptions[0];
	this._era = btEraOptions[1]; // Default to Succession Wars
	this._make = "";
	this._model = "";
	this._uuid = "";
	this._tonnage = 20;
	this._useLang = "en-US";

	this._armorType = mechArmorTypes[0];

	this._maxArmor = 0;

	this._selectedInternalStructure = mechInternalStructureTypes[0];

	this._internalStructure = {};

	this._hasTripleStrengthMyomer = false;

	this._internalStructure.head = 0;

	this._internalStructure.centerTorso = 0;
	this._internalStructure.leftTorso = 0;
	this._internalStructure.rightTorso = 0;

	this._smallCockpit = false;
	this._cockpitWeight = 3;

	this._internalStructure.rightArm = 0;
	this._internalStructure.leftArm = 0;

	this._totalInternalStructurePoints = 0;

	this._maxMoveHeat = 2;
	this._maxWeaponHeat = 0;
	this._heatDissipation = 0;

	this._internalStructure.rightLeg = 0;
	this._internalStructure.leftLeg = 0;

	this._additionalHeatSinks = 0;

	this._armorWeight = 0;
	this._totalArmor = 0;
	this._unallocatedArmor = 0;

	this._armorAllocation = {};

	this._heatSinkType = mechHeatSinkTypes[0];

	this._armorAllocation.head = 0;

	this._armorAllocation.centerTorso = 0;
	this._armorAllocation.leftTorso = 0;
	this._armorAllocation.rightTorso = 0;

	this._armorAllocation.centerTorsoRear = 0;
	this._armorAllocation.leftTorsoRear = 0;
	this._armorAllocation.rightTorsoRear = 0;

	this._armorAllocation.rightArm = 0;
	this._armorAllocation.leftArm = 0;

	this._armorAllocation.rightLeg = 0;
	this._armorAllocation.leftLeg = 0;

	this._armorAllocation.head = 0;

	this._equipmentList = Array();

	this._criticalAllocationTable = Array();

	this._weights = Array();

	this._strictEra = 1;

	this._unallocatedCriticals = Array();

	this._criticals = {};

	this._criticals.head = Array();

	this._criticals.centerTorso = Array();
	this._criticals.leftTorso = Array();
	this._criticals.rightTorso = Array();

	this._criticals.rightArm = Array();
	this._criticals.leftArm = Array();

	this._criticals.rightLeg = Array();
	this._criticals.leftLeg = Array();

	this._weights = Array();

	this._gyro = mechGyroTypes[0];

	this._engine = 0;
	this._engineType = mechEngineTypes[0];
	this._jumpJetType = mechJumpJetTypes[0];

	this._walkSpeed = 0;
	this._runSpeed = 0;
	this._jumpSpeed = 0;

	this._maxArmorTonnage = 0;

	this._cbillCost = "n/a";
	this._battleValue = "n/a";
	this._alphaStrikeValue = "n/a";

	this._calcLogBV = "";
	this._calcLogAS = "";
	this._calcLogCBill = "";

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

	this._pilot = {
		name: "",
		piloting: 5,
		gunnery: 4,
		wounds: 0
	};

	this._alphaStrikeForceStats = {
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

	this._alphaStrikeForceStats.name  = this.name;
	//~ this._alphaStrikeForceStats.model  = this._model;
	this._alphaStrikeForceStats.move  = this.getWalkSpeed() * 2;
	this._alphaStrikeForceStats.jumpMove  = this.getJumpSpeed() * 2;
	this._alphaStrikeForceStats.pv = 0;
	this._alphaStrikeForceStats.damage.short = 0;
	this._alphaStrikeForceStats.damage.medium = 0;
	this._alphaStrikeForceStats.damage.long = 0;
	this._alphaStrikeForceStats.damage.extreme = 0;
	this._alphaStrikeForceStats.armor = 0;
	this._alphaStrikeForceStats.structure = 0;
	this._alphaStrikeForceStats.skill = 4;
	this._alphaStrikeForceStats.ov = 0;
	this._alphaStrikeForceStats.notes = "";
	this._alphaStrikeForceStats.size_class = "";
	this._alphaStrikeForceStats.size_class_name = "";
	this._alphaStrikeForceStats.special_unit_abilities = Array();
	this._alphaStrikeForceStats.overheat = 0;
	this._alphaStrikeForceStats.longHeat = 0;
	this._alphaStrikeForceStats.abilityCodes = Array()

	this._alphaStrikeForceStats.getAbilityCode = function( abilityCode ) {
		for( var abiC = 0; abiC < this._alphaStrikeForceStats.abilityCodes.length; abiC++ ) {
			if( abilityCode.toLowerCase().trim() == this._alphaStrikeForceStats.abilityCodes[ abiC ].toLowerCase().trim() ) {
				return this._alphaStrikeForceStats.abilityCodes[ abiC ];
			}
		}

		return null;
	}

	this._alphaStrikeForceStats.addAbilityCode = function( abilityCode, abilityValue ) {

		 this._alphaStrikeForceStats.abilityCodes.push(
			{
				code: abilityCode,
				value: abilityValue
			}
		);


	}


	this._calcLogAS = "";

	// TODO - calculations
	this._calcLogAS += "Tonnage is " + this._tonnage + "<br />\n";
	if( this._tonnage > 100) {
		this._alphaStrikeForceStats.size_class = 4;
		this._alphaStrikeForceStats.size_class_name = "Superheavy";
		this._alphaStrikeForceStats.special_unit_abilities.push("LG");
		this._calcLogAS += "<strong>Setting Size to 4 (Superheavy)</strong><br />\n";
	} else if( this._tonnage >= 80) {
		this._alphaStrikeForceStats.size_class = 4;
		this._alphaStrikeForceStats.size_class_name = "Assault";
		this._calcLogAS += "<strong>Setting Size to 4 (Assault)</strong><br />\n";
	} else if( this._tonnage >= 60) {
		this._alphaStrikeForceStats.size_class = 3;
		this._alphaStrikeForceStats.size_class_name = "Heavy";
		this._calcLogAS += "<strong>Setting Size to 3 (Heavy)</strong><br />\n";
	} else if( this._tonnage >= 40) {
		this._alphaStrikeForceStats.size_class = 2;
		this._alphaStrikeForceStats.size_class_name = "Medium";
		this._calcLogAS += "<strong>Setting Size to 2 (Medium)</strong><br />\n";
	} else {
		this._alphaStrikeForceStats.size_class = 1;
		this._alphaStrikeForceStats.size_class_name = "Light";
		this._calcLogAS += "<strong>Setting Size to 1 (Light)</strong><br />\n";
	}

	this._alphaStrikeForceStats.armor = ( this.getTotalArmor() / 30).toFixed(0);
	this._calcLogAS += "Converting total armor of " + this.getTotalArmor() + "<br />\n";
	this._calcLogAS += "<strong>Setting Armor to " + this._alphaStrikeForceStats.armor + "</strong><br />\n";

	if( this.getTech().tag == "is") {


		switch( this._engineType.tag ) {
			case "compact":
				// Compact

				if( this._tonnage == 100) {
					this._alphaStrikeForceStats.structure = 10;
				} else if( this._tonnage >= 95 ) {
					this._alphaStrikeForceStats.structure = 10;
				} else if( this._tonnage >= 90 ) {
					this._alphaStrikeForceStats.structure = 10;
				} else if( this._tonnage >= 85 ) {
					this._alphaStrikeForceStats.structure = 9;
				} else if( this._tonnage >= 80 ) {
					this._alphaStrikeForceStats.structure = 8;
				} else if( this._tonnage >= 75 ) {
					this._alphaStrikeForceStats.structure = 8;
				} else if( this._tonnage >= 70 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 65 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 60 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 55 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 50 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 45 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 40 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 35 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 30 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 25 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 20 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 15 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 10 ) {
					this._alphaStrikeForceStats.structure = 1;
				}
				this._calcLogAS += "Engine is an IS Compact Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			case "xl":
				// XL
				if( this._tonnage == 100) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 95 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 90 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 85 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 80 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 75 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 70 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 65 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 60 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 55 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 50 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 45 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 40 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 35 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 30 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 25 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 20 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 15 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 10 ) {
					this._alphaStrikeForceStats.structure = 1;
				}
				this._calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			case "light":
				// Compact
				if( this._tonnage == 100) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 95 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 90 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 85 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 80 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 75 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 70 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 65 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 60 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 55 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 50 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 45 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 40 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 35 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 30 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 25 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 20 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 15 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 10 ) {
					this._alphaStrikeForceStats.structure = 1;
				}
				this._calcLogAS += "Engine is an IS Light Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			default:
				// Standard
				if( this._tonnage == 100) {
					this._alphaStrikeForceStats.structure = 8;
				} else if( this._tonnage >= 95 ) {
					this._alphaStrikeForceStats.structure = 8;
				} else if( this._tonnage >= 90 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 85 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 80 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 75 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 70 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 65 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 60 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 55 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 50 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 45 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 40 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 35 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 30 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 25 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 20 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 15 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 10 ) {
					this._alphaStrikeForceStats.structure = 1;
				}
				this._calcLogAS += "Engine is an IS Standard Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
		}
	} else {
		// Clan Engines...
		switch( this._engineType.tag ) {
			case "xl":
			case "clan-xl":
				// Compact
				if( this._tonnage == 100) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 95 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 90 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 85 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 80 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 75 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 70 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 65 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 60 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 55 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 50 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 45 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 40 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 35 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 30 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 25 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 20 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 15 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 10 ) {
					this._alphaStrikeForceStats.structure = 1;
				}
				this._calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
				break;
			default:
				// Standard / Standard Fusion
				if( this._tonnage == 100) {
					this._alphaStrikeForceStats.structure = 8;
				} else if( this._tonnage >= 95 ) {
					this._alphaStrikeForceStats.structure = 8;
				} else if( this._tonnage >= 90 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 85 ) {
					this._alphaStrikeForceStats.structure = 7;
				} else if( this._tonnage >= 80 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 75 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 70 ) {
					this._alphaStrikeForceStats.structure = 6;
				} else if( this._tonnage >= 65 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 60 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 55 ) {
					this._alphaStrikeForceStats.structure = 5;
				} else if( this._tonnage >= 50 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 45 ) {
					this._alphaStrikeForceStats.structure = 4;
				} else if( this._tonnage >= 40 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 35 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 30 ) {
					this._alphaStrikeForceStats.structure = 3;
				} else if( this._tonnage >= 25 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 20 ) {
					this._alphaStrikeForceStats.structure = 2;
				} else if( this._tonnage >= 15 ) {
					this._alphaStrikeForceStats.structure = 1;
				} else if( this._tonnage >= 10 ) {
					this._alphaStrikeForceStats.structure = 1;
				}
				this._calcLogAS += "Engine is a Clan Standard Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";

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

	for( weapon_counter = 0; weapon_counter < this._equipmentList.length; weapon_counter++) {
		if( this._equipmentList[weapon_counter].alpha_strike ) {
			if( this._equipmentList[weapon_counter].alpha_strike.range_long > 0){
				total_weapon_heat_long += this._equipmentList[weapon_counter].alpha_strike.heat;
			}



			if( this._equipmentList[weapon_counter].explosive )
				has_explosive = true;

			if( this._equipmentList[weapon_counter].rear ) {
				this._calcLogAS += "Adding <strong>rear</strong> Weapon " + this._equipmentList[weapon_counter].tag + " - ";
				this._calcLogAS += " (" + this._equipmentList[weapon_counter].alpha_strike.range_short + ", ";
				this._calcLogAS += this._equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
				this._calcLogAS += this._equipmentList[weapon_counter].alpha_strike.range_long + ", ";
				this._calcLogAS += this._equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";
				rearDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
				rearDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
				rearDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
				rearDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
			} else {

				this._alphaStrikeForceStats.damage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
				this._alphaStrikeForceStats.damage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
				this._alphaStrikeForceStats.damage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
				this._alphaStrikeForceStats.damage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;

				this._calcLogAS += "Adding Weapon " + this._equipmentList[weapon_counter].tag + " - ";
				this._calcLogAS += " (" + this._equipmentList[weapon_counter].alpha_strike.range_short + ", ";
				this._calcLogAS += this._equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
				this._calcLogAS += this._equipmentList[weapon_counter].alpha_strike.range_long + ", ";
				this._calcLogAS += this._equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";
				total_weapon_heat += this._equipmentList[weapon_counter].alpha_strike.heat;

			}

			if( this._equipmentList[weapon_counter].notes && this._equipmentList[weapon_counter].notes.length > 0) {
				for( var nC = 0; nC < this._equipmentList[weapon_counter].notes.length; nC++) {
					if( this._alphaStrikeForceStats.abilityCodes.indexOf( this._equipmentList[weapon_counter].notes[nC] ) === -1) {
						this._alphaStrikeForceStats.abilityCodes.push( this._equipmentList[weapon_counter].notes[nC] );
					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "heat" ) {
						heatDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
						heatDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
						heatDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
						heatDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "lrm" ) {
						lrmDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
						lrmDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
						lrmDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
						lrmDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "ac" ) {
						acDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
						acDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
						acDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
						acDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "flak" ) {
						flakDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
						flakDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
						flakDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
						flakDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "srm" ) {

						indirectFireRating += this._equipmentList[weapon_counter].alpha_strike.range_long;

					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "indirect fire" || this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "if") {
						srmDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
						srmDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
						srmDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
						srmDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
					}

					if( this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "missile"  || this._equipmentList[weapon_counter].notes[nC].toLowerCase() == "msl" ) {
						mslDamage.short += this._equipmentList[weapon_counter].alpha_strike.range_short;
						mslDamage.medium += this._equipmentList[weapon_counter].alpha_strike.range_medium;
						mslDamage.long += this._equipmentList[weapon_counter].alpha_strike.range_long;
						mslDamage.extreme += this._equipmentList[weapon_counter].alpha_strike.range_extreme;
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

		this._calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"/" + this.getJumpSpeed() * 2 + "\"J</strong><br />\n";
	} else {
		move_heat += 2;
		this._calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"</strong><br />\n";
	}

	// if there are no explosive components, then the mech gets the ENE ability :)
	if( !has_explosive ) {
		this._alphaStrikeForceStats.abilityCodes.push("ENE");
		this._calcLogAS += "Mech has no explosive components, gets ENE ability<br />\n";
	}

	var heatDissipation = 0;

	heatDissipation += (10 + this._additionalHeatSinks) * this._heatSinkType.dissipation;


	var max_heat_output = move_heat + total_weapon_heat;
	var overheat_value = move_heat + total_weapon_heat - heatDissipation;
	var long_overheat_value = move_heat + total_weapon_heat_long - heatDissipation;

	//~ var before_heat_range_short = this._alphaStrikeForceStats.damage.short.toFixed(0) /1;
	//~ var before_heat_range_medium = this._alphaStrikeForceStats.damage.medium.toFixed(0) /1;
	//~ var before_heat_range_long = this._alphaStrikeForceStats.damage.long.toFixed(0) /1;
	//~ var before_heat_range_extreme = this._alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

	//~ this._alphaStrikeForceStats.heat_damage = this._alphaStrikeForceStats.damage;

	var final_overheat_value = 0;
	if( overheat_value > 3) {
		// Heat Modified Damage, p115 AS companion
		var heat_damage_short = 0;
		var heat_damage_medium = 0;
		if( this._alphaStrikeForceStats.damage.short != "0*")
			heat_damage_short = Math.ceil( (this._alphaStrikeForceStats.damage.short * heatDissipation ) / (max_heat_output - 4) );
		if( this._alphaStrikeForceStats.damage.medium != "0*")
			heat_damage_medium =  Math.ceil( (this._alphaStrikeForceStats.damage.medium * heatDissipation ) / (max_heat_output - 4) );


		if( this._alphaStrikeForceStats.damage.short != "0*")
			this._alphaStrikeForceStats.damage.short = Math.ceil( this._alphaStrikeForceStats.damage.short );
		if( this._alphaStrikeForceStats.damage.medium != "0*")
			this._alphaStrikeForceStats.damage.medium =  Math.ceil( this._alphaStrikeForceStats.damage.medium );
		//~ if( this._alphaStrikeForceStats.damage.short != "0*")
			//~ this._alphaStrikeForceStats.damage.long = Math.ceil( this._alphaStrikeForceStats.damage.long );
		//~ if( this._alphaStrikeForceStats.damage.medium != "0*")
			//~ this._alphaStrikeForceStats.damage.extreme =  Math.ceil( this._alphaStrikeForceStats.damage.extreme );


		//~ console.log( "damage.short", this._alphaStrikeForceStats.damage.short );
		//~ console.log( "heat_damage_short", heat_damage_short );
		//~ console.log( "damage.medium", this._alphaStrikeForceStats.damage.medium );
		//~ console.log( "heat_damage_medium", heat_damage_medium );


		if(  this._alphaStrikeForceStats.damage.medium != "0*" && heat_damage_medium < this._alphaStrikeForceStats.damage.medium ) {
			final_overheat_value =  this._alphaStrikeForceStats.damage.medium - heat_damage_medium ;
			this._alphaStrikeForceStats.damage.medium = this._alphaStrikeForceStats.damage.medium - final_overheat_value;
			this._alphaStrikeForceStats.damage.short = this._alphaStrikeForceStats.damage.short - final_overheat_value;
		}
		//~ console.log( "final_overheat_value", final_overheat_value );



	} else {
		if( this._alphaStrikeForceStats.damage.short != "0*")
			this._alphaStrikeForceStats.damage.short = Math.ceil( this._alphaStrikeForceStats.damage.short );
		if( this._alphaStrikeForceStats.damage.medium != "0*")
			this._alphaStrikeForceStats.damage.medium =  Math.ceil( this._alphaStrikeForceStats.damage.medium );
		//~ if( this._alphaStrikeForceStats.damage.short != "0*")
			//~ this._alphaStrikeForceStats.damage.long = Math.ceil( this._alphaStrikeForceStats.damage.long );
		//~ if( this._alphaStrikeForceStats.damage.medium != "0*")
			//~ this._alphaStrikeForceStats.damage.extreme =  Math.ceil( this._alphaStrikeForceStats.damage.extreme );

	}

	var final_long_overheat_value = 0;

	//~ console.log( "this._alphaStrikeForceStats.damage", this._alphaStrikeForceStats.damage );

	if( long_overheat_value > 4) {

		//~ console.log( "long_overheat_value", long_overheat_value );

		if( this._alphaStrikeForceStats.damage.long != "0*") {
			//~ this._alphaStrikeForceStats.heat_damage.long = this._alphaStrikeForceStats.damage.long;
			var heat_damage_long = this._alphaStrikeForceStats.damage.long;
			var heat_damage_extreme = this._alphaStrikeForceStats.damage.extreme;

			this._alphaStrikeForceStats.damage.long = Math.ceil( ( this._alphaStrikeForceStats.damage.long * heatDissipation ) / (total_weapon_heat_long - 4) );
			this._alphaStrikeForceStats.damage.extreme = Math.ceil( ( this._alphaStrikeForceStats.damage.long * heatDissipation ) / (total_weapon_heat_long - 4) );

			//~ console.log( "damage.long", this._alphaStrikeForceStats.damage.long );
			//~ console.log( "heatDissipation", heatDissipation );
			//~ console.log( "heat_damage_long", heat_damage_long );
			//~ console.log( "total_weapon_heat_long", total_weapon_heat_long );



			if( heat_damage_long > this._alphaStrikeForceStats.damage.long) {
				var final_long_overheat_value = heat_damage_long - this._alphaStrikeForceStats.damage.long;
				this._alphaStrikeForceStats.damage.long = heat_damage_long - final_long_overheat_value;
				this._alphaStrikeForceStats.damage.extreme = heat_damage_extreme - final_long_overheat_value;
			}

			//~ console.log( "final_long_overheat_value", final_long_overheat_value );
			//~ console.log( "damage.long", this._alphaStrikeForceStats.damage.long );

		}
	} else {
		//~ if( this._alphaStrikeForceStats.damage.short != "0*")
			//~ this._alphaStrikeForceStats.damage.short = Math.ceil( this._alphaStrikeForceStats.damage.short );
		//~ if( this._alphaStrikeForceStats.damage.medium != "0*")
			//~ this._alphaStrikeForceStats.damage.medium =  Math.ceil( this._alphaStrikeForceStats.damage.medium );
		if( this._alphaStrikeForceStats.damage.short != "0*")
			this._alphaStrikeForceStats.damage.long = Math.ceil( this._alphaStrikeForceStats.damage.long );
		if( this._alphaStrikeForceStats.damage.medium != "0*")
			this._alphaStrikeForceStats.damage.extreme =  Math.ceil( this._alphaStrikeForceStats.damage.extreme );

	}

	if( final_long_overheat_value > 0 ) {
		this._alphaStrikeForceStats.abilityCodes.push( "OVL " + final_long_overheat_value);

	}

	//~ this._alphaStrikeForceStats.damage.short = this._alphaStrikeForceStats.damage.short.toFixed(0) /1;
	//~ this._alphaStrikeForceStats.damage.medium = this._alphaStrikeForceStats.damage.medium.toFixed(0) /1;
	//~ this._alphaStrikeForceStats.damage.long = this._alphaStrikeForceStats.damage.long.toFixed(0) /1;
	//~ this._alphaStrikeForceStats.damage.extreme = this._alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

	//~ console.log( "this._alphaStrikeForceStats.damage", this._alphaStrikeForceStats.damage);
	this._alphaStrikeForceStats.damage = this._adjustASDamage( this._alphaStrikeForceStats.damage, true );
	//~ console.log( "this._alphaStrikeForceStats.damage", this._alphaStrikeForceStats.damage);

	// Determine Overheat Values - p116 AS Companion
	//~ var final_overheat_value = 0;


	//~ if( this._alphaStrikeForceStats.damage.medium != "0*" && before_heat_range_medium - this._alphaStrikeForceStats.damage.medium > 0) {
		//~ final_overheat_value = before_heat_range_medium - this._alphaStrikeForceStats.damage.medium;
	//~ } else {
		//~ // try short range bracket since the med range is low.
		//~ if( this._alphaStrikeForceStats.damage.short != "0*" )
			//~ final_overheat_value = before_heat_range_short - this._alphaStrikeForceStats.damage.short;
	//~ }
	//~ if( final_overheat_value > 4 )
		//~ final_overheat_value = 4;

	// Determine Overheat Values - ASC - p116
	//~ var final_long_overheat_value = 0;
	//~ if( this._alphaStrikeForceStats.damage.long != "0*" && before_heat_range_long - this._alphaStrikeForceStats.damage.long > 0) {
		//~ final_long_overheat_value = before_heat_range_long - this._alphaStrikeForceStats.damage.long;
	//~ }

	if( final_long_overheat_value > 4 )
		final_long_overheat_value = 4;

	this._alphaStrikeForceStats.ov = final_overheat_value;

	this._calcLogAS += "Move Heat: " + move_heat + "<br />\n";
	this._calcLogAS += "Weapon Heat: " + total_weapon_heat + "<br />\n";
	this._calcLogAS += "Long Weapon Heat: " + total_weapon_heat_long + "<br />\n";
	this._calcLogAS += "Heat Dissipation: " + heatDissipation + "<br />\n";

	this._calcLogAS += "Overheat Value: " + overheat_value + "<br />\n";
	this._calcLogAS += "Long Overheat Value: " + long_overheat_value + "<br />\n";

	this._calcLogAS += "<strong>Short Damage: " + this._alphaStrikeForceStats.damage.short + "</strong><br />\n";
	this._calcLogAS += "<strong>Medium Damage: " + this._alphaStrikeForceStats.damage.medium + "</strong><br />\n";
	this._calcLogAS += "<strong>Long Damage: " + this._alphaStrikeForceStats.damage.long + "</strong><br />\n";
	this._calcLogAS += "<strong>Extreme Damage: " + this._alphaStrikeForceStats.damage.extreme + "</strong><br />\n";

	// Overheat Value is
	this._calcLogAS += "<strong>Final Overheat Value: " + final_overheat_value + "</strong><br />\n";
	this._calcLogAS += "<strong>Final Long Overheat Value: " + final_long_overheat_value + "</strong><br />\n";

	this._alphaStrikeForceStats.overheat = final_overheat_value;
	this._alphaStrikeForceStats.longOverheat = final_long_overheat_value;

	/* *********************************
	 *
	 * Alpha Strike Point Value ASC - p138
	 *
	 * ******************************** */

	this._alphaStrikeForceStats.pv = 0;
	this._calcLogAS += "<div class=\"text-center\"><strong> - Calculating Point Value - </strong></div>\n";
	/* *********************************
	 * Step 1: Determine Unit’s Offensive Value ASC - p138
	 * ******************************** */

	this._calcLogAS += "<strong>Step 1: Determine Unit’s Offensive Value ASC - p138</strong><br />\n";
	var offensive_value = 0;
	// Attack Damage Factor
	if( this._alphaStrikeForceStats.damage.short != "0*" && this._alphaStrikeForceStats.damage.short != "-" )
		offensive_value += this._alphaStrikeForceStats.damage.short;
	if( this._alphaStrikeForceStats.damage.medium != "0*" && this._alphaStrikeForceStats.damage.medium != "-" )
		offensive_value += this._alphaStrikeForceStats.damage.medium;
	if( this._alphaStrikeForceStats.damage.long != "0*" &&  this._alphaStrikeForceStats.damage.long != "-" )
		offensive_value += this._alphaStrikeForceStats.damage.long;
	if( this._alphaStrikeForceStats.damage.extreme != "0*" && this._alphaStrikeForceStats.damage.extreme != "-" )
		offensive_value += this._alphaStrikeForceStats.damage.extreme;

	this._calcLogAS += "Attack Damage Factor: " + offensive_value + " ( " + this._alphaStrikeForceStats.damage.short + " + " + this._alphaStrikeForceStats.damage.medium + " + " + this._alphaStrikeForceStats.damage.long + " + " + this._alphaStrikeForceStats.damage.extreme + " )<br />\n";

	// Unit Size Factor
	offensive_value += this._alphaStrikeForceStats.size_class / 2;
	this._calcLogAS += "Unit Size Factor: " + (this._alphaStrikeForceStats.size_class / 2) + " (" + this._alphaStrikeForceStats.size_class + " / 2))<br />\n";

	// Overheat Factor
	var overHeatFactor = 0;
	if( this._alphaStrikeForceStats.ov > 1 ) {
		offensive_value += 1;
		offensive_value += ( this._alphaStrikeForceStats.ov - 1 ) / 2;
		overHeatFactor += 1;
		overHeatFactor +=  ( this._alphaStrikeForceStats.ov - 1 ) / 2;
	} else {
		offensive_value += this._alphaStrikeForceStats.ov;
		overHeatFactor += this._alphaStrikeForceStats.ov;

	}

	this._calcLogAS += "Overheat Factor: " + overHeatFactor + "<br />\n";


	// Offensive Special Ability Factor
	// TODO

	/* *********************************
	 * Step 1a: Apply Blanket Offensive Modifiers ASC - p139
	 * ******************************** */
	this._calcLogAS += "<strong>Step 1a: Apply Blanket Offensive Modifiers ASC - p139</strong><br />\n";
	// TODO

	/* *********************************
	 * Step 2: Determine Unit’s Defensive Value ASC - p139
	 * ******************************** */
	this._calcLogAS += "<strong>Step 2: Determine Unit’s Defensive Value ASC - p139</strong><br />\n";
	var defensive_value = 0;

	// Movement Factor:
	var movementDefenseValue = 0;
	var bestMovement = 0;
	if( this._alphaStrikeForceStats.move > this._alphaStrikeForceStats.jumpMove ) {
		movementDefenseValue += this._alphaStrikeForceStats.move * .25;
		bestMovement = this._alphaStrikeForceStats.move;
	} else {
		movementDefenseValue += this._alphaStrikeForceStats.jumpMove * .25;
		bestMovement = this._alphaStrikeForceStats.move;
	}
	defensive_value += movementDefenseValue;

	if(this._alphaStrikeForceStats.jumpMove > 0 ) {
		movementDefenseValue += .5;
		this._calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25 + .5)<br />\n";
	} else {
		this._calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25)<br />\n";
	}



	if(
		rearDamage.short > 0
			||
		rearDamage.medium > 0
			||
		rearDamage.long > 0
	) {
		this._alphaStrikeForceStats.abilityCodes.push("Rear");
	}

	for( var aC = 0; aC < this._alphaStrikeForceStats.abilityCodes.length; aC++ ) {

		// Replace Heat with Heat X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "heat" ) {
			heatDamage = this._adjustASDamage( heatDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "Heat " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long;
			highestDamage = this._getHighestDamage( heatDamage );
			offensive_value += highestDamage;
			if( heatDamage.medium != "-" && heatDamage.medium > 0 )
				offensive_value += .5;

			this._calcLogAS += "<strong>Adding</strong> Heat Ability: " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long + "<br />\n";
			this._calcLogAS += "Adding Heat Damage Factor to PV: " + highestDamage + "<br />\n";
			if( heatDamage.medium != "-" && heatDamage.medium > 0 )
				this._calcLogAS += "Adding Heat Medium Damage Bonus to PV: 0,5<br />\n";
		}

		// Replace LRM with LRM X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "lrm" ) {
			lrmDamage = this._adjustASDamage( lrmDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "LRM " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long;
			this._calcLogAS += "<strong>Adding</strong> LRM Ability: " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long + "<br />\n";

		}


		// Replace Flak with Flak X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "flak" ) {
			flakDamage = this._adjustASDamage( flakDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "Flak " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long;
			this._calcLogAS += "<strong>Adding</strong> Flak Ability: " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long + "<br />\n";
		}


		// Replace AC with AC X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "ac" ) {
			acDamage = this._adjustASDamage( acDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "AC " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long;
			this._calcLogAS += "<strong>Adding</strong> AC Ability: " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long + "<br />\n";
		}


		// Replace SRM with SRM X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "srm" ) {
			srmDamage = this._adjustASDamage( srmDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "SRM " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long;
			this._calcLogAS += "<strong>Adding</strong> SRM Ability: " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long + "<br />\n";
		}

		// Replace Missile with Missile X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "missile" ||  this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "msl"  ) {
			mslDamage = this._adjustASDamage( mslDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "MSL " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long;
			this._calcLogAS += "<strong>Adding</strong> Missile Ability: " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long + "<br />\n";
		}

		// Replace Rear with Rear X/X/X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "rear" ) {
			rearDamage = this._adjustASDamage( rearDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "Rear " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long;
			this._calcLogAS += "<strong>Adding</strong> Rear Ability: " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long + "<br />\n";
		}

		// Replace IndirectFire with IF X
		if( this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "indirect fire" || this._alphaStrikeForceStats.abilityCodes[ aC ].toLowerCase() == "if" ) {
			rearDamage = this._adjustASDamage( rearDamage );
			this._alphaStrikeForceStats.abilityCodes[ aC ] = "IF " + indirectFireRating;
			this._calcLogAS += "<strong>Adding</strong> IF Ability: " + indirectFireRating + "<br />\n";
			offensive_value += highestDamage;
			this._calcLogAS += "Adding IF Rating to PV: " + indirectFireRating + "<br />\n";

		}

	}

	// Defensive Special Abilities Factor
	// TODO

	// Defensive Interaction Rating
	// TODO

	/* *********************************
	 * Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141
	 * ******************************* */
	this._calcLogAS += "<strong>Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141</strong><br />\n";
	var bmDIR = 0;
	// Armor Factor
	this._calcLogAS += "Armor Factor: " + (this._alphaStrikeForceStats.armor * 2) + " (" + this._alphaStrikeForceStats.armor + " * 2)<br />\n";
	bmDIR += this._alphaStrikeForceStats.armor * 2;  // No need to do other types of armor, since this is BM only.

	// Structure Factor
	this._calcLogAS += "Structure Factor: " + (this._alphaStrikeForceStats.structure * 1) + " (" + this._alphaStrikeForceStats.structure + " * 1)<br />\n";
	bmDIR += this._alphaStrikeForceStats.structure * 1; // TODO IndustrialMechs

	// Defense Factor

	if( bestMovement > 34 ) {
		this._calcLogAS += "Defense Factor: +5 (movement 35\"+)<br />\n";
		bmDIR += 5;
	} else if( bestMovement > 18 ) {
		this._calcLogAS += "Defense Factor: +4 (movement 19\"-34\"+)<br />\n";
		bmDIR += 4;
	} else if( bestMovement > 12 ) {
		this._calcLogAS += "Defense Factor: +3 (movement 13\"-18\"+)<br />\n";
		bmDIR += 3;
	} else if( bestMovement > 8 ) {
		this._calcLogAS += "Defense Factor: +2 (movement 9\"-12\"+)<br />\n";
		bmDIR += 2;
	} else if( bestMovement > 4 ) {
		this._calcLogAS += "Defense Factor: +1 (movement 4\"-8\"+)<br />\n";
		bmDIR += 1;
	} else {
		this._calcLogAS += "Defense Factor: +0 (movement 0\"-4\"+)<br />\n";
		bmDIR += 0;
	}

	bmDIR += defensive_value;
	this._calcLogAS += "Adding Defense Value from Step 2 above: " + defensive_value + "<br />\n";
	// Calculate the DIR
	this._calcLogAS += "Total DIR: " + bmDIR + "<br />\n";

	/* *********************************
	 * Step 3: Determine Unit’s Final Point Value ASC - p141
	 *
	 * ******************************* */
	this._calcLogAS += "<strong>Step 3: Determine Unit’s Final Point Value ASC - p141</strong><br />\n";
	baseFinalValue = offensive_value + bmDIR;
	this._calcLogAS += "Base Point Value: " + baseFinalValue  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";

	finalValue = baseFinalValue;
	if(
		bestMovement >= 6
		&& bestMovement <= 10
		&& this._alphaStrikeForceStats.damage.medium == 0
		&& this._alphaStrikeForceStats.damage.long == 0
		&& this._alphaStrikeForceStats.damage.extreme == 0
	) {
		this._calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
		this._calcLogAS += "Modified Point Value: " + baseFinalValue * .75  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .75;
	}

	if(
		bestMovement >= 2
		&& bestMovement <= 5
		&& this._alphaStrikeForceStats.damage.medium == 0
		&& this._alphaStrikeForceStats.damage.long == 0
		&& this._alphaStrikeForceStats.damage.extreme == 0
	) {
		this._calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
		this._calcLogAS += "Modified Point Value: " + baseFinalValue * .5  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .5;
	}

	if(
		bestMovement >= 2
		&& bestMovement <= 5
		&& this._alphaStrikeForceStats.damage.long == 0
		&& this._alphaStrikeForceStats.damage.extreme == 0
	) {
		this._calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short and Medium ranges. Point Value * .75<br />\n";
		this._calcLogAS += "Modified Point Value: " + baseFinalValue * .75  + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
		finalValue = baseFinalValue * .75;
	}

	this._calcLogAS += "Final Point Value: " + finalValue + "<br />\n";

	/* *********************************
	 * Step 3a: Add Force Bonuses ASC - p141
	 * ******************************* */
	 this._calcLogAS += "<strong>Step 3a: Add Force Bonuses ASC - p141</strong><br />\n";
	// TODO
	this._calcLogAS += "<strong class=\"color-red\">TODO<br />\n";

	this._alphaStrikeForceStats.name = this.name;
	this._alphaStrikeForceStats.type = "BM";


	this._alphaStrikeValue = Math.round(finalValue)  + " (WIP)";
	var asMechData = [];
	asMechData["BFPointValue"] = Math.round(finalValue);

	asMechData["Name"] = this.getName();
	asMechData["BFThreshold"] = 0;
	asMechData["Role"] = { Name: this._alphaStrikeForceStats.role };
	asMechData["BFType"] = "BM";
	asMechData["BFSize"] = this._alphaStrikeForceStats.size_class;

	asMechData["BFArmor"] = this._alphaStrikeForceStats.armor;
	asMechData["BFStructure"] = this._alphaStrikeForceStats.structure;

	asMechData["BFOverheat"] = final_overheat_value;


	asMechData["BFDamageShort"] = this._alphaStrikeForceStats.damage.short;
	asMechData["BFDamageMedium"] = this._alphaStrikeForceStats.damage.medium;
	asMechData["BFDamageLong"] = this._alphaStrikeForceStats.damage.long;
	asMechData["BFDamageExtreme"] = this._alphaStrikeForceStats.damage.extreme;

	asMechData["BFOverheat"] = this._alphaStrikeForceStats.overheat;

	asMechData["customName"] = this._alphaStrikeForceStats.customName;
	asMechData["currentSkilll"] = this._pilot.gunnery;

	if( this._alphaStrikeForceStats.jumpMove ) {
		asMechData["BFMove"] = this._alphaStrikeForceStats.move.toString() + "\"/" + this._alphaStrikeForceStats.jumpMove + "\"J";
	} else {
		asMechData["BFMove"] = this._alphaStrikeForceStats.move.toString() + "\"";
	}

	this._alphaStrikeForceStats.abilityCodes.sort();
	asMechData["BFAbilities"] = this._alphaStrikeForceStats.abilityCodes.join(", ").toUpperCase();

	this._alphaStrikeForceStats = new asUnit( asMechData );

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

	var hasCamo = false;
	var hasBasicStealth = false;
	var hasPrototypeStealth = false;
	var hasStandardStealth = false;
	var hasImprovedStealth = false;
	var hasMimetic = false;

	this._battleValue = 0;
	this._calcLogBV = "";

	/* ***************************************************
	 *  STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302
	 * ************************************************ */
	 var defensiveBattleRating = 0;
	 this._calcLogBV += "<strong>STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302</strong><br />";
	 var totalArmorFactor = 2.5 * this.getTotalArmor();
	 this._calcLogBV += "Total Armor Factor = Armor Factor x 2.5: " + totalArmorFactor + " = 2.5 x " + this.getTotalArmor() + "<br />";


	// Get Armor Rating
	 switch( this._armorType ) {
		 case "commercial":
			this._calcLogBV += "Total Armor Factor = 0.5 * Total Armor Factor Modifier for Commercial Armor: " + totalArmorFactor + " x 0.5 = " + (totalArmorFactor * .5) + "<br />";
			totalArmorFactor = totalArmorFactor * 0.5;
			break;
		default:
			this._calcLogBV += "Total Armor Factor = 1.0 * Total Armor Factor Modifier for Non-Commercial Armor:  " + totalArmorFactor + " x 1 = " + (totalArmorFactor * 1) + "<br />";
			break;
	 }

	 // Get for Internal Structure Rating
	 var totalInternalStructurePoints = 1.5 * this._totalInternalStructurePoints;
	 this._calcLogBV += "Total Internal Structure Points = Internal Structure Points x 1.5: " + totalInternalStructurePoints + " = 1.5 x " + this._totalInternalStructurePoints + "<br />";

	 // Adjust IS for Type
	 switch( this._internalStructureType ) {
		 case "industrial":
			this._calcLogBV += "Total Internal Structure BV = 0.5 x I.S. BV for Industrial Internal Structure: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 0.5;
			break;
		 case "endo-steel":
			this._calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Endo-Steel Internal Structure: " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
		default:
			this._calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Standard Internal Structure:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
	 }

	// Adjust IS for Engine Type
	 switch( this._engineType ) {
		 case "light":
			this._calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Light Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * .75;
			break;
		 case "xl":
			if( this.getTech().tag == "clan" ) {
				// Clan XL
				this._calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Clan XL Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .5;
				break;
			} else {
				// Inner Sphere
				this._calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Inner Sphere XL Engine: " + totalInternalStructurePoints + " x 0.75 = " + (totalInternalStructurePoints * .75) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .75;
				break;
			}
		case "compact":
			this._calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Compact Engine:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
		default:
			this._calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Standard Engine:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
			totalInternalStructurePoints = totalInternalStructurePoints * 1;
			break;
	 }




	// Add in the Gyro Modifier
	var totalGyroPoints = 0;
	 switch( this._internalStructureType ) {
		 case "compact":
			this._calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Compact Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 0.5;
			break;
		 case "xl":
			this._calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Extra Light Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 0.5;
			break;
		 case "heavy-duty":
			this._calcLogBV += "Total Gyro BV = 1 x Tonnage for Heavy Duty Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 1;
			break;
		default:
			this._calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Standard Gyro: " + this.getTonnage()  + " x 0.5 = " + (this.getTonnage()  * .5) + "<br />";
			totalGyroPoints = this.getTonnage() * 0.5;
			break;
	 }

	// Get Explosive Ammo Modifiers - Tech Manual p302-303
	var explosiveAmmoModifiers = 0;
	this._calcLogBV += "<strong>Get Explosive Ammo Modifiers (TM p302-303)</strong><br />";


	var caseEnabled_HD = false;
	var caseEnabled_CT = false;
	var caseEnabled_RL= false;
	var caseEnabled_LL = false;
	var caseEnabled_RA = false;
	var caseEnabled_LA = false;
	var caseEnabled_RT = false;
	var caseEnabled_LT = false;

	for( var lCrit = 0; lCrit < this._criticals.head.length; lCrit++) {
		if( this._criticals.head[ lCrit ] && this._criticals.head[ lCrit ].tag == "case" ) {
			caseEnabled_HD = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.centerTorso.length; lCrit++) {
		if( this._criticals.centerTorso[ lCrit ] && this._criticals.centerTorso[ lCrit ].tag == "case" ) {
			caseEnabled_CT = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.rightLeg.length; lCrit++) {
		if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].tag == "case" ) {
			caseEnabled_RL = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.leftLeg.length; lCrit++) {
		if( this._criticals.leftLeg[ lCrit ] && this._criticals.leftLeg[ lCrit ].tag == "case" ) {
			caseEnabled_LL = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.rightArm.length; lCrit++) {
		if( this._criticals.rightArm[ lCrit ] && this._criticals.rightArm[ lCrit ].tag == "case" ) {
			caseEnabled_RA = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.leftArm.length; lCrit++) {
		if( this._criticals.leftArm[ lCrit ] && this._criticals.leftArm[ lCrit ].tag == "case" ) {
			caseEnabled_LA = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.rightTorso.length; lCrit++) {
		if( this._criticals.rightTorso[ lCrit ] && this._criticals.rightTorso[ lCrit ].tag == "case" ) {
			caseEnabled_RT = true;
		}
	}

	for( var lCrit = 0; lCrit < this._criticals.leftTorso.length; lCrit++) {
		if( this._criticals.leftTorso[ lCrit ] && this._criticals.leftTorso[ lCrit ].tag == "case" ) {
			caseEnabled_LT = true;
		}
	}

	if( this._tech.tag == "clan" ) {

		//Clan is Assumed to have CASE in BV Calculation (TM p303)

		// check head
		for( var lCrit = 0; lCrit < this._criticals.head.length; lCrit++) {
			if( this._criticals.head[ lCrit ] ) {
				if( this._criticals.head[ lCrit ] && this._criticals.head[ lCrit ].obj && this._criticals.head[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Head (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.head[ lCrit ] && this._criticals.head[ lCrit ].obj && this._criticals.head[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Head (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check ct
		for( var lCrit = 0; lCrit < this._criticals.centerTorso.length; lCrit++) {
			if( this._criticals.centerTorso[ lCrit ] ) {
				if( this._criticals.centerTorso[ lCrit ] && this._criticals.centerTorso[ lCrit ].obj && this._criticals.centerTorso[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Center Torso (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.centerTorso[ lCrit ] && this._criticals.centerTorso[ lCrit ].obj && this._criticals.centerTorso[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Center Torso (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check lt
		for( var lCrit = 0; lCrit < this._criticals.leftTorso.length; lCrit++) {
			if( this._criticals.leftTorso[ lCrit ] ) {
				if( this._criticals.leftTorso[ lCrit ] && this._criticals.leftTorso[ lCrit ].obj && this._criticals.leftTorso[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Left Torso (Clan,-15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.leftTorso[ lCrit ] && this._criticals.leftTorso[ lCrit ].obj && this._criticals.leftTorso[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Left Torso (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check rt
		for( var lCrit = 0; lCrit < this._criticals.rightTorso.length; lCrit++) {
			if( this._criticals.rightTorso[ lCrit ] ) {
				if( this._criticals.rightTorso[ lCrit ] && this._criticals.rightTorso[ lCrit ].obj && this._criticals.rightTorso[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Right Torso (Clan,-15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.rightTorso[ lCrit ] && this._criticals.rightTorso[ lCrit ].obj && this._criticals.rightTorso[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Center Right (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check rl
		for( var lCrit = 0; lCrit < this._criticals.rightLeg.length; lCrit++) {
			if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.explosive ) {
				this._calcLogBV += "Explosive Ammo Crit in Right Leg (Clan, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.gauss ) {
				this._calcLogBV += "Gauss Crit in Right Leg (Clan, -1)<br />";
				explosiveAmmoModifiers += 1;
			}
		}

		// check ll
		for( var lCrit = 0; lCrit < this._criticals.leftLeg.length; lCrit++) {
			if( this._criticals.leftLeg[ lCrit ] && this._criticals.leftLeg[ lCrit ].obj && this._criticals.leftLeg[ lCrit ].obj.explosive ) {
				this._calcLogBV += "Explosive Ammo Crit in Left Leg (Clan, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this._criticals.leftLeg[ lCrit ] && this._criticals.leftLeg[ lCrit ].obj && this._criticals.leftLeg[ lCrit ].obj.gauss ) {
				this._calcLogBV += "Gauss Crit in Left Leg (Clan, -1)<br />";
				explosiveAmmoModifiers += 1;
			}
		}

	} else if( this._tech.tag == "is" ) {
		// check head
		for( var lCrit = 0; lCrit < this._criticals.head.length; lCrit++) {
			if( this._criticals.head[ lCrit ] ) {
				if( this._criticals.head[ lCrit ] && this._criticals.head[ lCrit ].obj && this._criticals.head[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Head (Inner Sphere,-15)<br />";
					explosiveAmmoModifiers += 15;
				}

			}
		}

		// check ct
		for( var lCrit = 0; lCrit < this._criticals.centerTorso.length; lCrit++) {
			if( this._criticals.centerTorso[ lCrit ] ) {
				if( this._criticals.centerTorso[ lCrit ] && this._criticals.centerTorso[ lCrit ].obj && this._criticals.centerTorso[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Center Torso (Inner Sphere,-15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.centerTorso[ lCrit ] && this._criticals.centerTorso[ lCrit ].obj && this._criticals.centerTorso[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Center Torso (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check lt
		for( var lCrit = 0; lCrit < this._criticals.leftTorso.length; lCrit++) {
			if( this._criticals.leftTorso[ lCrit ] ) {
				if( this._criticals.leftTorso[ lCrit ] && this._criticals.leftTorso[ lCrit ].obj && this._criticals.leftTorso[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Left Torso (Inner Sphere,-15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.leftTorso[ lCrit ] && this._criticals.leftTorso[ lCrit ].obj && this._criticals.leftTorso[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Left Torso (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check rt
		for( var lCrit = 0; lCrit < this._criticals.rightTorso.length; lCrit++) {
			if( this._criticals.rightTorso[ lCrit ] ) {
				if( this._criticals.rightTorso[ lCrit ] && this._criticals.rightTorso[ lCrit ].obj && this._criticals.rightTorso[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Right Torso (Inner Sphere,-15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.rightTorso[ lCrit ] && this._criticals.rightTorso[ lCrit ].obj && this._criticals.rightTorso[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Center Right (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check rl
		for( var lCrit = 0; lCrit < this._criticals.rightLeg.length; lCrit++) {
			if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.explosive ) {
				this._calcLogBV += "Explosive Ammo Crit in Right Leg (Inner Sphere, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.gauss ) {
				this._calcLogBV += "Gauss Crit in Right Leg (Inner Sphere, -1)<br />";
				explosiveAmmoModifiers += 1;
			}

			if( caseEnabled_RT == false  && caseEnabled_RL == false) {
				if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

		// check ll
		for( var lCrit = 0; lCrit < this._criticals.leftLeg.length; lCrit++) {
			if( this._criticals.leftLeg[ lCrit ] && this._criticals.leftLeg[ lCrit ].obj && this._criticals.leftLeg[ lCrit ].obj.explosive ) {
				this._calcLogBV += "Explosive Ammo Crit in Left Leg (Inner Sphere, -15)<br />";
				explosiveAmmoModifiers += 15;
			}
			if( this._criticals.leftLeg[ lCrit ] && this._criticals.leftLeg[ lCrit ].obj && this._criticals.leftLeg[ lCrit ].obj.gauss ) {
				this._calcLogBV += "Gauss Crit in Left Leg (Inner Sphere, -1)<br />";
				explosiveAmmoModifiers += 1;
			}

			if( caseEnabled_LT == false  && caseEnabled_LL == false) {
				if( this._criticals.rightLeg[ lCrit ] && this._criticals.rightLeg[ lCrit ].obj && this._criticals.rightLeg[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.leftLeg[ lCrit ] && this._criticals.leftLeg[ lCrit ].obj && this._criticals.leftLeg[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

		}

		// check RA
		for( var lCrit = 0; lCrit < this._criticals.rightArm.length; lCrit++) {


			if( caseEnabled_RT == false  && caseEnabled_RA == false) {
				if( this._criticals.rightArm[ lCrit ] && this._criticals.rightArm[ lCrit ].obj && this._criticals.rightArm[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.rightArm[ lCrit ] && this._criticals.rightArm[ lCrit ].obj && this._criticals.rightArm[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

		}

		// check LA
		for( var lCrit = 0; lCrit < this._criticals.leftArm.length; lCrit++) {


			if( caseEnabled_LT == false  && caseEnabled_LA == false) {
				if( this._criticals.leftArm[ lCrit ] && this._criticals.leftArm[ lCrit ].obj && this._criticals.leftArm[ lCrit ].obj.explosive ) {
					this._calcLogBV += "Explosive Ammo Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if( this._criticals.leftArm[ lCrit ] && this._criticals.leftArm[ lCrit ].obj && this._criticals.leftArm[ lCrit ].obj.gauss ) {
					this._calcLogBV += "Gauss Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}
		}

	}


	defensiveBattleRating = totalArmorFactor + totalInternalStructurePoints + totalGyroPoints - explosiveAmmoModifiers;
	this._calcLogBV += "Defensive battle rating = " + defensiveBattleRating +  " ( " + totalArmorFactor + " + " + totalInternalStructurePoints + " +  " + totalGyroPoints + " -  " + explosiveAmmoModifiers + "<br />";


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

	this._calcLogBV += "Best TMM: " + moveModifier+ "<br />";

	var defensiveFactorModifier = 1 + moveModifier / 10;
	if( defensiveFactorModifier < 1 )
		defensiveFactorModifier = 1;

	this._calcLogBV += "Defensive Factor (defensiveFactorModifier = 1 + TMM / 10): " + defensiveFactorModifier + " = 1 + " + moveModifier + " / 10<br />";

	// TODO for equipment.... add camo, stealth, etc when it's available
	this._calcLogBV += "<strong> Defensive Factor Modifiers for equipment</strong>.... add camo, stealth, etc when tech is available<br />";

	if( hasCamo ) {
		defensiveFactorModifier += 0.2;
	}

	if( hasBasicStealth ) {
		defensiveFactorModifier += 0.2;
	}

	if( hasPrototypeStealth ) {
		defensiveFactorModifier += 0.2;
	}

	if( hasStandardStealth ) {
		defensiveFactorModifier += 0.2;
	}

	if( hasImprovedStealth ) {
		defensiveFactorModifier += 0.3;
	}

	if( hasMimetic ) {
		defensiveFactorModifier += 0.3;
	}

	this._calcLogBV += "Defensive battle rating = Defensive battle rating * Target Modifier Rating : " + (defensiveBattleRating * defensiveFactorModifier).toFixed(2) + " = " + defensiveBattleRating + " x " + defensiveFactorModifier + "<br />";

	defensiveBattleRating = defensiveBattleRating * defensiveFactorModifier;

	this._calcLogBV += "<strong>Final defensive battle rating</strong>: " + defensiveBattleRating.toFixed(2) + "<br />";

	/* ***************************************************
	 *  STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303
	 * ************************************************ */
	 var offensiveBattleRating = 0;
	 this._calcLogBV += "<strong>STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303</strong><br />";

	// TODO
	this._calcLogBV += "<strong>Calculate Each Weapon’s Modified BV</strong><br />";

	var ammoBV = {};
	var weaponBV = {};

	var totalAmmoBV = 0;

	// Add up all the BV Sums, put each in an array for comparison
	for( var eqC = 0; eqC < this._equipmentList.length; eqC++ ) {
		if( this._equipmentList[ eqC ].tag.indexOf("ammo-") > -1 ) {
			if( !ammoBV[ this._equipmentList[ eqC ].tag ] )
				ammoBV[ this._equipmentList[ eqC ].tag ] = 0;
			if( this._equipmentList[ eqC ].battlevalue )
				ammoBV[ this._equipmentList[ eqC ].tag ] = this._equipmentList[ eqC ].battlevalue;

			this._calcLogBV += "+ Adding " + this.getLocalTranslation( this._equipmentList[ eqC ].name) + " - " + this._equipmentList[ eqC ].battlevalue + "<br />";

		} else {
			if( !weaponBV[ this._equipmentList[ eqC ].tag ] )
				weaponBV[ this._equipmentList[ eqC ].tag ] = 0;
			if( this._equipmentList[ eqC ].battlevalue )
				weaponBV[ this._equipmentList[ eqC ].tag ] = this._equipmentList[ eqC ].battlevalue;


		}
	}



	var totalWeaponBV = 0;
	var simplifiedAmmoBV = {};
	for( var weaponKey in weaponBV ) {
		for( var ammoKey in ammoBV ) {
			if( ammoKey.indexOf( weaponKey ) > -1 ) {
				if( !simplifiedAmmoBV[ weaponKey ] )
					simplifiedAmmoBV[ weaponKey ] = 0;
				simplifiedAmmoBV[ weaponKey ] += ammoBV[ ammoKey ];
			}
		}
		totalWeaponBV += weaponBV[ weaponKey];
	}

	for( var ammoKey in simplifiedAmmoBV ) {
		if( weaponBV[ ammoKey ] ) {
			if( simplifiedAmmoBV[ ammoKey] > weaponBV[ ammoKey ] ) {
				this._calcLogBV += "<strong>Excessive Ammo Rule</strong> setting " + ammoKey + " value to " +  weaponBV[ ammoKey ] + " from " + simplifiedAmmoBV[ ammoKey] + "<br />";

				simplifiedAmmoBV[ ammoKey] = weaponBV[ ammoKey ];
			}
			totalAmmoBV += simplifiedAmmoBV[ ammoKey];
		}
	}

	//~ console.log( "ammoBV", ammoBV );
	//~ console.log( "simplifiedAmmoBV", simplifiedAmmoBV );
	//~ console.log( "weaponBV", weaponBV );

	//~ console.log( "totalWeaponBV", totalWeaponBV );
	//~ console.log( "totalAmmoBV", totalAmmoBV );

	this._calcLogBV += "<strong>Total Ammo BV</strong> " + totalAmmoBV + "<br />";


	//~ console.log( "this.getHeatSinksType()", this.getHeatSinksType() );
	var mechHeatEfficiency  = 0;
	if( this.getHeatSinksType() == "single" ) {
		mechHeatEfficiency = 6 + this.getHeatSinks()  -  this.getMaxMovementHeat();
		this._calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() + " - " + this.getMaxMovementHeat() + ")<br />";

	} else if( this.getHeatSinksType() == "double" ) {
		mechHeatEfficiency = 6 + this.getHeatSinks() * 2 -  this.getMaxMovementHeat();
		this._calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() * 2 + " - " + this.getMaxMovementHeat() + ")<br />";
	}

	this._calcLogBV += "<strong>Total Weapon Heat</strong> ";
	var totalWeaponHeat = 0;

	var eqList = angular.copy ( this._equipmentList )
	eqList.sort( sortByBVThenHeat );

	for( var eqC = 0; eqC < eqList.length; eqC++ ) {
		if( eqList[ eqC ].tag.indexOf("ammo-") == -1 ) {
			if( !weaponBV[ eqList[ eqC ].tag ] )
				weaponBV[ eqList[ eqC ].tag ] = 0;
			if( eqList[ eqC ].battlevalue )
				weaponBV[ eqList[ eqC ].tag ] = eqList[ eqC ].battlevalue;

			this._calcLogBV += eqList[ eqC ].heat + " + ";

			// TODO modify per weapon type
			// one shot eqList[ eqC ].heat = eqList[ eqC ].heat / 4
			// streak SRM eqList[ eqC ].heat = eqList[ eqC ].heat / 2
			// ULTRA AC eqList[ eqC ].heat = eqList[ eqC ].heat * 2
			// Rotary AC eqList[ eqC ].heat = eqList[ eqC ].heat * 6

			totalWeaponHeat += eqList[ eqC ].heat;


		}
	}

	if( this._calcLogBV.substr( this._calcLogBV.length -3 ) == " + " ) {
		this._calcLogBV = this._calcLogBV.substr( 0, this._calcLogBV.length -3 )
	}

	this._calcLogBV += " = " + totalWeaponHeat;

	this._calcLogBV += "<br />";

	var runningTotal = 0;
	var runningHeat = 0;
	if( totalWeaponHeat >= mechHeatEfficiency ) {
		// Mech is heat inefficient, now we need to go through steps 4-7 on TM pp 303-304


		var inHalfCost = false;

		for( var weaponC = 0; weaponC < eqList.length; weaponC++ ) {
			if( eqList[ weaponC ].tag.indexOf("ammo-") == -1 ) {




				if( inHalfCost == true && eqList[ weaponC ].heat > 0 ) {
					// half efficiency
					this._calcLogBV += "+ Adding Heat Inefficient Weapon " + this.getLocalTranslation(eqList[ weaponC ].name) + " - " + eqList[weaponC].battlevalue + " / 2 = " + (eqList[weaponC].battlevalue /2 );
					runningTotal += (eqList[weaponC].battlevalue /2 );
				} else {
					// normal efficiency
					this._calcLogBV += "+ Adding Weapon " + this.getLocalTranslation( eqList[ weaponC ].name) + " - " + eqList[ weaponC ].battlevalue;
					runningTotal += eqList[weaponC].battlevalue;
				}

				runningHeat += eqList[ weaponC ].heat;
				//~ console.log( "r,m", runningHeat + " > "   + mechHeatEfficiency );
				if( runningHeat >= mechHeatEfficiency && eqList[ weaponC ].heat > 0 && inHalfCost == false ) {
					inHalfCost = true;
					this._calcLogBV +=  " (weapon is last heat efficient)";
				}

				this._calcLogBV += "<br />";

			}
		}

	} else {

		// Mech is heat efficient, no need to go through steps 4-7 on TM pp 303-304, just print and add up the weapons



		for( var weaponC = 0; weaponC < eqList.length; weaponC++ ) {
			if( eqList[ weaponC ].tag.indexOf("ammo-") == -1 ) {
				this._calcLogBV += "+ Adding Weapon " + this.getLocalTranslation( eqList[ weaponC ].name) + " - " + eqList[ weaponC ].battlevalue + "<br />";
				runningTotal += eqList[weaponC].battlevalue ;
			}
		}

	}

	totalWeaponBV = runningTotal;
	this._calcLogBV += "<strong>Total Weapon BV</strong> " + totalWeaponBV + "<br />";

	var modifiedMechTonnage = this.getTonnage();

	if( this._hasTripleStrengthMyomer ) {
		modifiedMechTonnage = modifiedMechTonnage * 1.5;
	}

	offensiveBattleRating = totalWeaponBV + totalAmmoBV + modifiedMechTonnage;

	var speedFactorModifier = this._getSpeedFactorModifier();
	offensiveBattleRating = offensiveBattleRating * speedFactorModifier;

	this._calcLogBV += "<strong>Final offensive battle rating</strong>: " + offensiveBattleRating.toFixed( 2)  + " (" + totalWeaponBV + " (weaponBV) + " +  totalAmmoBV + " (ammoBV) + " + modifiedMechTonnage + "(mechTonnage) ) x " + speedFactorModifier + " (speed factor rating)<br />";

	/* ***************************************************
	 * STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304
	 * ************************************************ */

	 this._calcLogBV += "<strong>STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304</strong><br />";
	 var finalBattleValue = defensiveBattleRating + offensiveBattleRating;
	 this._calcLogBV += "finalBattleValue = defensiveBattleRating + offensiveBattleRating: " + finalBattleValue.toFixed( 2)  + " = " + defensiveBattleRating.toFixed( 2)  + " + " + offensiveBattleRating.toFixed( 2)  + "<br />";

	 if( this._smallCockpit ) {
		finalBattleValue = Math.round( finalBattleValue * .95 );
		this._calcLogBV += "Small Cockpit, multiply total by .95 and round final BV: " + finalBattleValue.toFixed( 2)  + "<br />";
	}

	this._calcLogBV += "<strong>Final Battle Value</strong>: " + finalBattleValue.toFixed( 2)  + " rounded to " +  Math.round(finalBattleValue) + "<br />";
	this._battleValue = Math.round(finalBattleValue) + " (in testing)";
}

Mech.prototype._getSpeedFactorModifier = function() {
		var runSpeedAndHalfJumpSpeed = this.getRunSpeed() + this.getJumpSpeed() / 2;

		if( runSpeedAndHalfJumpSpeed > 25) {
			return (1 + Math.pow( (( this.getRunSpeed() + ( this.getJumpSpeed() / 2) - 5) / 10), 1.2)).toFixed(2);
		} else if( runSpeedAndHalfJumpSpeed > 24) {
			return 3.74; // 25
		} else if( runSpeedAndHalfJumpSpeed > 23) {
			return 3.59; // 24
		} else if( runSpeedAndHalfJumpSpeed > 22) {
			return 3.44; // 23
		} else if( runSpeedAndHalfJumpSpeed > 21) {
			return 3.29; // 22
		} else if( runSpeedAndHalfJumpSpeed > 20) {
			return 3.15; // 21
		} else if( runSpeedAndHalfJumpSpeed > 19) {
			return 3.00; // 20
		} else if( runSpeedAndHalfJumpSpeed > 18) {
			return 2.86; // 19
		} else if( runSpeedAndHalfJumpSpeed > 17) {
			return 2.72; // 18
		} else if( runSpeedAndHalfJumpSpeed > 16) {
			return 2.58; // 17
		} else if( runSpeedAndHalfJumpSpeed > 15) {
			return 2.44; // 16
		} else if( runSpeedAndHalfJumpSpeed > 14) {
			return 2.30; // 15
		} else if( runSpeedAndHalfJumpSpeed > 13) {
			return 2.16; // 14
		} else if( runSpeedAndHalfJumpSpeed > 12) {
			return 2.02; // 13
		} else if( runSpeedAndHalfJumpSpeed > 11) {
			return 1.89; // 12
		} else if( runSpeedAndHalfJumpSpeed > 10) {
			return 1.76; // 11
		} else if( runSpeedAndHalfJumpSpeed > 9) {
			return 1.63; // 10
		} else if( runSpeedAndHalfJumpSpeed > 8) {
			return 1.50; // 9
		} else if( runSpeedAndHalfJumpSpeed > 7) {
			return 1.37; // 8
		} else if( runSpeedAndHalfJumpSpeed > 6) {
			return 1.24; // 7
		} else if( runSpeedAndHalfJumpSpeed > 5) {
			return 1.12; // 6
		} else if( runSpeedAndHalfJumpSpeed > 4) {
			return 1.00; // 5
		} else if( runSpeedAndHalfJumpSpeed > 3) {
			return 0.88; // 4
		} else if( runSpeedAndHalfJumpSpeed > 2) {
			return 0.77; // 3
		} else if( runSpeedAndHalfJumpSpeed > 1) {
			return 0.65; // 2
		} else if( runSpeedAndHalfJumpSpeed > 0) {
			return 0.54; // 1
		} else {
			return 0.44;
		}
}

Mech.prototype._calcCBillCost = function() {
	// TODO Calculations
	this._calcLogCBill = "";
	this._cbillCost = 0  + " (TODO / WIP)";
	//~ this._calcLogCBill = "TODO";
	this._calcLogCBill += "<strong class=\"color-red\">TODO<br />\n";

}

Mech.prototype.getBattleValue = function() {
	return this._battleValue;
}

Mech.prototype.getAlphaStrikeValue = function() {
	return this._alphaStrikeValue;
}

Mech.prototype.getCBillCost = function() {
	return this._cbillCost;
}

Mech.prototype.getEngineWeight = function() {
	if( this._engine && this._engine.weight ) {
		if (this._engineType.tag == "clan-xl" )
			return this._engine.weight[ "xl" ];
		else
			return this._engine.weight[ this._engineType.tag ];
	} else {
		return 0;
	}
}

Mech.prototype.getEngineRating = function() {
	if( this._engine && this._engine.rating )
		return this._engine.rating;
	else
		return 0;

}

Mech.prototype.getHeatSinks = function() {
	return 10 + this._additionalHeatSinks;
}

Mech.prototype.getHeatSinksWeight = function() {
	return 0 + this._additionalHeatSinks;
}

Mech.prototype.getGyroWeight = function() {
	return Math.ceil(  Math.ceil(this._engine.rating / 100) * this._gyro.weight_multiplier  );
}
Mech.prototype.getCockpitWeight = function() {
	return this._cockpitWeight;
}

Mech.prototype.setCockpitWeight = function(new_weight) {
	this._cockpitWeight = new_weight;
	return this._cockpitWeight;
}


Mech.prototype.getInteralStructureWeight = function() {
	return this._selectedInternalStructure.perTon[ this.getTonnage() ].tonnage;
}

Mech.prototype.getJumpJetWeight = function() {
	if( this._tonnage <= 55) {
		// 10-55 tons
		return this._jumpSpeed * this._jumpJetType.weight_multiplier.light;
	} else if(this._tonnage <= 85) {
		// 60 - 85 tons
		return this._jumpSpeed * this._jumpJetType.weight_multiplier.medium;
	} else {
		// 90+ tons
		return this._jumpSpeed * this._jumpJetType.weight_multiplier.heavy;
	}

}

Mech.prototype.getTranslation = function(langKey) {
	for( lang_count = 0; lang_count < available_languages.length; lang_count++ ) {
		if( available_languages[lang_count].short_code == this._useLang ) {

			if(available_languages[lang_count].translations[langKey] ) {
				return available_languages[lang_count].translations[langKey];
			} else {
				return langKey;
			}
		}
	}
}

Mech.prototype.getLocalTranslation = function( languageObject ) {

	if( languageObject[ this._useLang ] ) {
		return languageObject[ this._useLang ];
	} else {
		return languageObject[ "en-US" ];
	}
}

Mech.prototype.getASCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this._calcLogAS + "</div>";
}

Mech.prototype.getBVCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this._calcLogBV + "</div>";
}

Mech.prototype.getCBillCalcHTML = function() {
	return "<div class=\"mech-tro\">" + this._calcLogCBill + "</div>";
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

	//~ console.log( this._alphaStrikeForceStats );

	return createSVGAlphaStrike( this._alphaStrikeForceStats, inPlay );
}

Mech.prototype.makeTROBBCode = function() {

	html = "";
	// Header Info
	html +=  this.getTranslation("TRO_TYPE") + ": " + this.getName() + "\n";
	html += this.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + this.getTech().name[ this._useLang ] + "\n";
	html += this.getTranslation("TRO_ERA") + ": " + this.getEra().name[ this._useLang ] + "\n";
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
	html += "" + ( this.getTranslation("TRO_ARMOR_IS") + " (" + this.getLocalTranslation( this._selectedInternalStructure.name ) + ")").rpad(" ",col1Padding + col2Padding) + "" + this.getInteralStructureWeight() + "\n";
	html += "" + this.getEngineName().rpad(" ",col1Padding) + "" + this.getEngineRating().toString().rpad(" ", col2Padding) + "" + this.getEngineWeight() + "\n";

	html += "" + this.getTranslation("TRO_WALKING").lpad(" ", col1Padding - 10) + " " + this.getWalkSpeed().toString().lpad(" ", 3) + "\n";
	html += "" + this.getTranslation("TRO_RUNNING").lpad(" ", col1Padding - 10) + " " + this.getRunSpeed().toString().lpad(" ", 3) + "\n";
	html += "" + this.getTranslation("TRO_JUMPING").lpad(" ", col1Padding - 10) + " " + this.getJumpSpeed().toString().lpad(" ", 3) + "\n";

	html += "" + this.getHeatSyncName().rpad(" ",col1Padding) + ""  + this.getHeatSinks().toString().rpad(" ", col2Padding) + "" + this.getHeatSinksWeight() + "\n";
	html += "" + this.getGyroName().rpad(" ",col1Padding + col2Padding) + "" + this.getGyroWeight() + "\n";

	if( this._smallCockpit ) {
		html += "" + this.getTranslation("TRO_SMALL_COCKPIT").rpad(" ",col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
	} else {
		html += "" + this.getTranslation("TRO_COCKPIT").rpad(" ",col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
	}

	//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "" + this.getTranslation("TRO_JUMP_JETS").rpad(" ",col1Padding + col2Padding) + "" + this.getJumpJetWeight() + "\n";
	//~ }

	if( this._mechType.class == "biped") {
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

	html += "" + (this.getTranslation("TRO_ARMOR_FACTOR") + " (" + this.getLocalTranslation( this._armorType.name ) + ")").rpad(" ",col1Padding) + "" + this.getTotalArmor().toString().rpad(" ",col2Padding) + "" + this.getArmorWeight() + "\n";

	var col1Padding = 20;
	var col2Padding = 10;
	var col3Padding = 15;
	var col4Padding = 10;

	// Armor Factor Table

	html += this.getTranslation("TRO_ARMOR_IS").lpad(" ", col1Padding + col2Padding) + "" + this.getTranslation("TRO_ARMOR_VALUE").lpad(" ", col3Padding) + "\n";
	html += "" + this.getTranslation("TRO_ARMOR_HD").lpad(" ", col1Padding)  + "" + this._internalStructure.head.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.head.toString().lpad(" ", col3Padding) + "\n";
	html += "" + this.getTranslation("TRO_ARMOR_CT").lpad(" ", col1Padding) + "" + this._internalStructure.centerTorso.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.centerTorso.toString().lpad(" ", col3Padding) + "\n";
	html += "" + this.getTranslation("TRO_ARMOR_CTR").lpad(" ", col1Padding) + "" + this._armorAllocation.centerTorsoRear.toString().lpad(" ", col2Padding) + "\n";
	if( this._armorAllocation.rightTorso == this._armorAllocation.leftTorso && this._armorAllocation.rightTorsoRear == this._armorAllocation.leftTorsoRear ) {
		html += "" + this.getTranslation("TRO_ARMOR_RLT").lpad(" ", col1Padding) + "" + this._internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_RLTR").lpad(" ", col1Padding) + "" + this._armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";
	} else {
		html += "" + this.getTranslation("TRO_ARMOR_RT").lpad(" ", col1Padding) + "" + this._internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_RTR").lpad(" ", col1Padding) + "" + this._armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";

		html += "" + this.getTranslation("TRO_ARMOR_LT").lpad(" ", col1Padding) + "" + this._internalStructure.leftTorso.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.leftTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_LTR").lpad(" ", col1Padding) + "" + this._armorAllocation.leftTorsoRear.toString().lpad(" ", col2Padding) + "\n";
	}
	if( this._mechType.class == "biped") {

		if( this._armorAllocation.rightArm == this._armorAllocation.leftArm) {
			html += "" + this.getTranslation("TRO_ARMOR_RLA").lpad(" ", col1Padding) + "" + this._internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RA").lpad(" ", col1Padding) + "" + this._internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LA").lpad(" ", col1Padding) + "" + this._internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
		}

		if( this._armorAllocation.rightLeg == this._armorAllocation.leftLeg) {
			html += "" + this.getTranslation("TRO_ARMOR_RLL").lpad(" ", col1Padding) + "" + this._internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RL").lpad(" ", col1Padding) + "" + this._internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LL").lpad(" ", col1Padding) + "" + this._internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
		}
	} else {
		if( this._armorAllocation.rightArm == this._armorAllocation.leftArm) {
			html += "" + this.getTranslation("TRO_ARMOR_RLFL").lpad(" ", col1Padding) + "" + this._internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RFL").lpad(" ", col1Padding) + "" + this._internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LFL").lpad(" ", col1Padding) + "" + this._internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
		}

		if( this._armorAllocation.rightLeg == this._armorAllocation.leftLeg) {
			html += "" + this.getTranslation("TRO_ARMOR_RLRL").lpad(" ", col1Padding) + "" + this._internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RRL").lpad(" ", col1Padding) + "" + this._internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_RLL").lpad(" ", col1Padding) + "" + this._internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + this._armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
		}
	}
	// End Factor Table
	html += "";
	html += "\n";


	var col1Padding = 20;
	var col2Padding = 10;
	var col3Padding = 10;
	var col4Padding = 10;
	this._equipmentList.sort( sortByLocationThenName );

	// Weapons and Ammo
	for( eq_count = 0; eq_count < this._equipmentList.length; eq_count++) {
		if(this._equipmentList[eq_count].name[ this._useLang ].length  + 3 > col1Padding)
			col1Padding = this._equipmentList[eq_count].name[ this._useLang ].length  + 3;
	}

	for( var locC = 0; locC < this.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < this._criticals[ this.validJJLocations[locC].long ].length; critC++ ) {
			if(
				this._criticals[ this.validJJLocations[locC].long ][ critC ]
				&& this._criticals[ this.validJJLocations[locC].long ][ critC ].tag
				&& this._criticals[ this.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				if(this._criticals[ this.validJJLocations[locC].long ][ critC ].name + 3 > col1Padding)
					col1Padding = this._criticals[ this.validJJLocations[locC].long ][ critC ].name + 3;
			}
		}
	}



	html += "" + this.getTranslation("TRO_WEAPONS") + "\n";

	html +=this.getTranslation("TRO_AND_AMMO").rpad(" ", col1Padding) + "" + this.getTranslation("TRO_LOCATION").rpad(" ", col2Padding) + "" + this.getTranslation("TRO_CRITICAL").rpad(" ", col3Padding) + "" + this.getTranslation("TRO_TONNAGE").rpad(" ", col4Padding) + "\n";



	for( eq_count = 0; eq_count < this._equipmentList.length; eq_count++) {
		if( typeof( this._equipmentList[eq_count].location ) == "undefined" )
			this._equipmentList[eq_count].location = "n/a";

		item_location = "";
		item_location = this.getLocationAbbr( this._equipmentList[eq_count].location );
		if( this._equipmentList[eq_count].ammo_per_ton && this._equipmentList[eq_count].ammo_per_ton > 0)
			html += "" + ( this._equipmentList[eq_count].name[ this._useLang ] +" " + this._equipmentList[eq_count].ammo_per_ton).rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + this._equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + this._equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
		else
			html += "" + this._equipmentList[eq_count].name[ this._useLang ].rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + this._equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + this._equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";


	}



	// List Jump Jets Allocations...

	for( var locC = 0; locC < this.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < this._criticals[ this.validJJLocations[locC].long ].length; critC++ ) {
			if(
				this._criticals[ this.validJJLocations[locC].long ][ critC ]
				&& this._criticals[ this.validJJLocations[locC].long ][ critC ].tag
				&& this._criticals[ this.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				jjObjs.push( this._criticals[ this.validJJLocations[locC].long ][ critC ] );
			}
		}

		if( jjObjs.length > 0 ) {
			var areaWeight = 0;
			if( this._tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
			} else if(this._tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
			}
			html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + this.validJJLocations[locC].short.toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

		}
	}

	var jjObjs = [];

	for( var critC = 0; critC < this._unallocatedCriticals.length; critC++ ) {
		if(
			this._unallocatedCriticals[ critC ]
			&& this._unallocatedCriticals[ critC ].tag
			&& this._unallocatedCriticals[ critC ].tag.indexOf( "jj-") === 0
		) {
			jjObjs.push(this._unallocatedCriticals[ critC ] );
		}
	}

	if( jjObjs.length > 0 ) {
		var areaWeight = 0;
		if( this._tonnage <= 55) {
			// 10-55 tons
			areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
		} else if(this._tonnage <= 85) {
			// 60 - 85 tons
			areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
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
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + this.getTech().name[ this._useLang ] + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ERA") + ": " + this.getEra().name[ this._useLang ] + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TONNAGE") + ": " + this.getTonnage() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_BATTLE_VALUE") + ": " + this.getBattleValue() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ALPHA_STRIKE_VALUE") + ": " + this.getAlphaStrikeValue() + "</td></tr>";
	html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_CBILL_COST") + ": $" + this.getCBillCost() + "</td></tr>";
	html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";

	// Equipment
	html += "<tr><th class=\"text-left\" colspan=\"3\">" + this.getTranslation("TRO_EQUIPMENT") + "</th><th class=\"text-center\" colspan=\"1\">" + this.getTranslation("TRO_MASS") + "</th></tr>";
	html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_ARMOR_IS") + " (" + this.getLocalTranslation( this._selectedInternalStructure.name ) + ")</td><td class=\"text-center\" colspan=\"1\">" + this.getInteralStructureWeight() + "</td></tr>";
	html += "<tr><td colspan=\"1\">" + this.getEngineName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_WALKING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_RUNNING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
	html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_JUMPING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

	html += "<tr><td colspan=\"1\">" + this.getHeatSyncName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
	html += "<tr><td colspan=\"3\">" + this.getGyroName() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

	if( this._smallCockpit ) {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_SMALL_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
	} else {
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
	}

	//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_JUMP_JETS") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
	//~ }

	if( this._mechType.class == "biped") {
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


	html += "<tr><th colspan=\"1\">" + this.getTranslation("TRO_ARMOR_VALUE") + " (" + this.getLocalTranslation( this._armorType.name ) + ")</th><th class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</th><th class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</th></tr>";


	// Armor Factor Table
	html += "<tr><td colspan=\"1\"></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + this.getTranslation("TRO_ARMOR_IS") + "</em></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + this.getTranslation("TRO_ARMOR_VALUE") + "</em></td><td>&nbsp;</td></tr>";
	html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_HD") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.head + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.head + "</td><td>&nbsp;</td></tr>";
	html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_CT") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.centerTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.centerTorso + "</td><td>&nbsp;</td></tr>";
	html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_CTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.centerTorsoRear + "</td><td>&nbsp;</td></tr>";
	if( this._armorAllocation.rightTorso == this._armorAllocation.leftTorso && this._armorAllocation.rightTorsoRear == this._armorAllocation.leftTorsoRear ) {
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLT") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";
	} else {
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RT") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";

		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LT") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftTorsoRear + "</td><td>&nbsp;</td></tr>";
	}
	if( this._mechType.class == "biped") {

		if( this._armorAllocation.rightArm == this._armorAllocation.leftArm) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLA") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RA") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LA") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
		}

		if( this._armorAllocation.rightLeg == this._armorAllocation.leftLeg) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
		}
	} else {
		if( this._armorAllocation.rightArm == this._armorAllocation.leftArm) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
		}

		if( this._armorAllocation.rightLeg == this._armorAllocation.leftLeg) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLRL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RRL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLL") + "</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
		}
	}
	// End Factor Table
	html += "</table>";
	html += "<br />";

	// Weapons and Ammo
	html += "<table class=\"mech-tro\">";
	html += "<tr><th class=\"text-left\">" + this.getTranslation("TRO_WEAPONS") + "<br />" + this.getTranslation("TRO_AND_AMMO") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_LOCATION") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_CRITICAL") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_TONNAGE") + "</th></tr>";

	this._equipmentList.sort( sortByLocationThenName );

	for( eq_count = 0; eq_count < this._equipmentList.length; eq_count++) {
		if( typeof( this._equipmentList[eq_count].location ) == "undefined" )
			this._equipmentList[eq_count].location = "n/a";

		item_location = "";
		item_location = this.getLocationAbbr( this._equipmentList[eq_count].location );
		if( this._equipmentList[eq_count].ammo_per_ton && this._equipmentList[eq_count].ammo_per_ton > 0)
			html += "<tr><td class=\"text-left\">" + this._equipmentList[eq_count].name[ this._useLang ] + " " + this._equipmentList[eq_count].ammo_per_ton + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + this._equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this._equipmentList[eq_count].weight + "</td></tr>";
		else
			html += "<tr><td class=\"text-left\">" + this._equipmentList[eq_count].name[ this._useLang ] + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + this._equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this._equipmentList[eq_count].weight + "</td></tr>";
	}

	// List Jump Jets Allocations...

	for( var locC = 0; locC < this.validJJLocations.length; locC++ ) {

		var jjObjs = [];
		for( var critC = 0; critC < this._criticals[ this.validJJLocations[locC].long ].length; critC++ ) {
			if(
				this._criticals[ this.validJJLocations[locC].long ][ critC ]
				&& this._criticals[ this.validJJLocations[locC].long ][ critC ].tag
				&& this._criticals[ this.validJJLocations[locC].long ][ critC ].tag.indexOf( "jj-") === 0
			) {
				jjObjs.push( this._criticals[ this.validJJLocations[locC].long ][ critC ] );
			}
		}

		if( jjObjs.length > 0 ) {
			var areaWeight = 0;
			if( this._tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
			} else if(this._tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
			}
			html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">" + this.validJJLocations[locC].short.toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

		}
	}

	var jjObjs = [];

	for( var critC = 0; critC < this._unallocatedCriticals.length; critC++ ) {
		if(
			this._unallocatedCriticals[ critC ]
			&& this._unallocatedCriticals[ critC ].tag
			&& this._unallocatedCriticals[ critC ].tag.indexOf( "jj-") === 0
		) {
			jjObjs.push(this._unallocatedCriticals[ critC ] );
		}
	}

	if( jjObjs.length > 0 ) {
		var areaWeight = 0;
		if( this._tonnage <= 55) {
			// 10-55 tons
			areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
		} else if(this._tonnage <= 85) {
			// 60 - 85 tons
			areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
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
			if( battlemechLocations[loc_count].abbr[ this._useLang ] != "undefined" )
				return battlemechLocations[loc_count].abbr[ this._useLang ];
			else
				return battlemechLocations[loc_count].abbr[ this._useLang ];
		}
	}
	return this.getTranslation("TRO_NOT_AVAILABLE") ;
}

Mech.prototype.clearMech = function() {
	this.setMechType(1);
	this.setTonnage(20);
	this.calc();
}

Mech.prototype.calc = function() {


	this._maxMoveHeat = 2;
	this._maxWeaponHeat = 0;
	this._heatDissipation = 0;


	this._weights = Array();
	this._weights.push( {name:"Internal Structure", weight: this.getInteralStructureWeight() } );

	if( this._smallCockpit ) {
		this.setCockpitWeight( 2 );
		this._weights.push( {name: "Small Cockpit", weight: this.getCockpitWeight() } );
	} else {
		this.setCockpitWeight( 3 );
		this._weights.push( {name: "Cockpit", weight: this.getCockpitWeight() } );
	}

	this._runSpeed = Math.ceil(this._walkSpeed * 1.5);

	if( this._era == 0 ) {
		this._era = btEraOptions[1];
	}

	if( this._tech == 0 ) {
		this._tech = btTechOptions[0];
	}

	if( this._mechType == 0 ) {
		this._mechType = mechTypeOptions[0];
	}


	if( this._engine ) {

		this._weights.push( {name: this._engineType.name[this._useLang] + " - " + this._engineType.rating, weight: this.getEngineWeight() } );

		this._weights.push( {name: this._gyro.name[this._useLang], weight: this.getGyroWeight()} );

	}

	if( this._jumpSpeed > 0) {
		this._maxMoveHeat = this._jumpSpeed;
		if( this._jumpJetType == "Standard" ) {
			// standard
			this._weights.push( {name: "Jump Jets", weight: this.getJumpJetWeight() } );
		} else {
			// improved
			this._weights.push( {name: "Improved Jets", weight: this.getJumpJetWeight() } );
		}
	}

	this._totalArmor = this._armorWeight * 16;

	//~ switch( this.getArmorType() ) {

		//~ default: // standard
			//~ this._totalArmor = this._armorWeight * 16;
			//~ break;
	//~ }
	if( this.getTech().tag == "clan") {
		 this._totalArmor = Math.floor( this._armorWeight * this.getArmorObj().armormultiplier.clan );
	} else {
		 this._totalArmor = Math.floor( this._armorWeight * this.getArmorObj().armormultiplier.is );
	}


	if( this._totalArmor > this._maxArmor )
		this._totalArmor = this._maxArmor;

	this._weights.push( {name: "Armor", weight: this._armorWeight} );
	this._unallocatedArmor = this._totalArmor;
	this._unallocatedArmor -= this._armorAllocation.head;

	this._unallocatedArmor -= this._armorAllocation.centerTorso;
	this._unallocatedArmor -= this._armorAllocation.leftTorso;
	this._unallocatedArmor -= this._armorAllocation.rightTorso;

	this._unallocatedArmor -= this._armorAllocation.centerTorsoRear;
	this._unallocatedArmor -= this._armorAllocation.leftTorsoRear;
	this._unallocatedArmor -= this._armorAllocation.rightTorsoRear;

	this._unallocatedArmor -= this._armorAllocation.rightArm;
	this._unallocatedArmor -= this._armorAllocation.leftArm;

	this._unallocatedArmor -= this._armorAllocation.rightLeg;
	this._unallocatedArmor -= this._armorAllocation.leftLeg;


	if( this._additionalHeatSinks > 0)
		this._weights.push( {name: "Additional Heat Sinks", weight: this._additionalHeatSinks} );

	for( eq_count = 0; eq_count < this._equipmentList.length; eq_count++) {
		if( this._equipmentList[eq_count].rear ) {
			this._weights.push( {name: this._equipmentList[eq_count].name + " (" + this.getTranslation("GENERAL_REAR") + ")", weight: this._equipmentList[eq_count].weight} );
		} else {
			this._weights.push( {name: this._equipmentList[eq_count].name + "", weight: this._equipmentList[eq_count].weight} );
		}
		if(  this._equipmentList[eq_count])
			this._maxWeaponHeat +=  this._equipmentList[eq_count].heat;
	}

	this._currentTonnage = 0;
	for( weight_counter = 0; weight_counter < this._weights.length; weight_counter++) {
		this._currentTonnage += this._weights[weight_counter].weight;
	}

	this._remainingTonnage = this._tonnage - this._currentTonnage;

	this.heatSinkCriticals = {};
	this.heatSinkCriticals.number = 0;
	//~ this.heatSinkCriticals.slots_type = "single slot";
	this.heatSinkCriticals.slots_each = 1;

	//~ if( this._heatSinkType == "double") {
		//~ if( this._tech.tag == "clan") {
			//~ this.heatSinkCriticals.slots_type = "double slot";
			//~ this.heatSinkCriticals.slots_each = 2;
		//~ } else {
			//~ this.heatSinkCriticals.slots_type = "triple slot";
			//~ this.heatSinkCriticals.slots_each = 3;
		//~ }
		//~ this._heatDissipation = (this._additionalHeatSinks + 10) * 2;
	//~ } else {
		//~ this.heatSinkCriticals.slots_type = "single";
		//~ this.heatSinkCriticals.slots_each = 1;
		//~ this._heatDissipation = this._additionalHeatSinks + 10;
	//~ }

	this._heatDissipation = ( this._additionalHeatSinks + 10 ) * this._heatSinkType.dissipation;
	this.heatSinkCriticals.slots_each = this._heatSinkType.crits[ this.getTech().tag ];

	if( this.getEngine().rating ) {
		this.heatSinkCriticals.number =  this._additionalHeatSinks + 10  -  Math.floor(this.getEngine().rating / 25);
	} else {
		this.heatSinkCriticals.number = 0
	}

	this._calcCriticals();
	this._calcAlphaStrike();
	this._calcBattleValue();
	this._calcCBillCost();

	this._equipmentList = this._equipmentList.sort( sortByLocationThenName );
 	this.sortedEquipmentList = [];
	for( eq_count = 0; eq_count < this._equipmentList.length; eq_count++) {


		var foundIt = false;

		for( var se_count = 0; se_count < this.sortedEquipmentList.length; se_count++ ) {
			if(
				this._equipmentList[eq_count].location == this.sortedEquipmentList[se_count].location
					&&
				this._equipmentList[eq_count].tag == this.sortedEquipmentList[se_count].tag
			) {
				this.sortedEquipmentList[se_count].count++;
				foundIt = true;
			}
		}

		if( !foundIt ) {
			var eqItem = angular.copy( this._equipmentList[eq_count] );
			eqItem.local_name = this.getLocalTranslation( eqItem.name );
			eqItem.count = 1;
			this.sortedEquipmentList.push( eqItem );
		}
	}
}

Mech.prototype._calcCriticals = function() {
	// WORK IN PROGRESS
	this._criticals.head = Array(6);

	this._criticals.centerTorso = Array(12);
	this._criticals.leftTorso = Array(12);
	this._criticals.rightTorso = Array(12);

	this._criticals.rightArm = Array(12);
	this._criticals.leftArm = Array(12);

	this._criticals.rightLeg = Array(6);
	this._criticals.leftLeg = Array(6);

	this._unallocatedCriticals = Array();

	// Add required components....
	if( this._smallCockpit ) {
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

	if( this._mechType.class.toLowerCase() == "quad") {
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
		this._engineType
		&& this._engineType.criticals
		&& this._engineType.criticals[ this.getTech().tag ]
		&& this._engineType.criticals[ this.getTech().tag ].ct > 3
	) {
		this._addCriticalItem(
			"engine", 									// item_tag
			this._engineType.name[this._useLang], 		// item_name
			3, 											// critical_count
			"ct" 										// location
														// slot
		);
	} else {
		// reset back to standard, engine not available for tech
		console.log( "warning", "resetting engine to standard ", this._engineType.criticals, this.getTech().tag, this._tech) ;
		this.setEngineType( "standard" );
		this._addCriticalItem(
			"engine", 												// item_tag
			this._engineType.name[this._useLang], 					// item_name
			this._engineType.criticals[ this.getTech().tag ].ct, 	// critical_count
			"ct" 													// location
																	// slot
		);
	}

	if(
		this._engineType.criticals[ this.getTech().tag ]
			&&
		this._engineType.criticals[ this.getTech().tag ].rt
	) {
		this._addCriticalItem( "engine", this._engineType.name[this._useLang], this._engineType.criticals[ this.getTech().tag ].rt, "rt");
	}
	if(
		this._engineType.criticals[ this.getTech().tag ]
			&&
		this._engineType.criticals[ this.getTech().tag ].lt
	) {
		this._addCriticalItem( "engine", this._engineType.name[this._useLang], this._engineType.criticals[ this.getTech().tag ].lt, "lt");
	}

	// Gyro
	this._addCriticalItem(
		"gyro", 										// item_tag
		this._gyro.name[this._useLang], 					// item_name
		this._gyro.criticals, 							// critical_count
		"ct"											// location
	);

	// Extra engine bits....
	if( this._engineType.criticals[ this.getTech().tag ].ct > 3 ){
		this._addCriticalItem(
			"engine", 													// item_tag
			this._engineType.name[this._useLang], 						// item_name
			this._engineType.criticals[ this.getTech().tag ].ct - 3, 	// critical_count
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
		this._unallocatedCriticals.push(
			{
				name: this._jumpJetType.name[this._useLang],
				tag: "jj-" + this._jumpJetType.tag,
				rear: false,
				movable: true,
				crits: this._jumpJetType.criticals
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
						armorObj.name[this._useLang], 		// item_name
						armorObj.crits_loc [ nameLoc ], 		// critical_count
						nameLoc									// location
																// slot
					);
				}
			} else {
				for( var aCounter = 0; aCounter < armorObj.crits.clan; aCounter++ ) {
					this._unallocatedCriticals.push(
						{
							name: armorObj.name[this._useLang],
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
						armorObj.name[this._useLang], 		// item_name
						armorObj.crits_loc [ nameLoc ], 		// critical_count
						nameLoc									// location
																// slot
					);
				}
			} else {
				for( var aCounter = 0; aCounter < armorObj.crits.is; aCounter++ ) {
					this._unallocatedCriticals.push(
						{
							name: armorObj.name[this._useLang],
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
		for( var aCounter = 0; aCounter < this._selectedInternalStructure.crits.clan; aCounter++ ) {
			this._unallocatedCriticals.push(
				{
					name: this._selectedInternalStructure.name[this._useLang],
					tag: this._selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this._selectedInternalStructure,
					movable: true
				}
			);
		}


	} else {
		for( var aCounter = 0; aCounter < this._selectedInternalStructure.crits.is; aCounter++ ) {
			this._unallocatedCriticals.push(
				{
					name: this._selectedInternalStructure.name[this._useLang],
					tag: this._selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this._selectedInternalStructure,
					movable: true
				}
			);
		}
	}


	// Get optional equipment...
	for(var elc = 0; elc < this._equipmentList.length; elc++ ) {
		//~ this._equipmentList[elc].location = "";
		var rearTag = "";
		if( this._equipmentList[elc].rear )
			rearTag = " (" + this.getTranslation("GENERAL_REAR") + ")";
		this._unallocatedCriticals.push(
			{
				name: this._equipmentList[elc].name[this._useLang] + rearTag,
				tag: this._equipmentList[elc].tag,
				rear: this._equipmentList[elc].rear,
				crits: this._equipmentList[elc].space.battlemech,
				obj: this._equipmentList[elc],
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

		this._unallocatedCriticals.push( {
			name: hs_name,
			rear: false,
			tag: "heat-sink",
			crits: hs_requirements.slots_each,
			movable: true
		} );
	}



	// Allocate items per allocation table.
	for( alt_c = 0; alt_c < this._criticalAllocationTable.length; alt_c++) {
		this._allocateCritical(
			this._criticalAllocationTable[alt_c].tag,
			this._criticalAllocationTable[alt_c].rear,
			this._criticalAllocationTable[alt_c].loc,
			this._criticalAllocationTable[alt_c].slot,
			true
		)
	}


	// remove location tag for remaining unallocated
	for( var lCount = 0; lCount < this._unallocatedCriticals.length; lCount++ ) {
		if( this._unallocatedCriticals[lCount].obj )
			this._unallocatedCriticals[lCount].obj.location = "";
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
	this.calc();

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
	this.calc();
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
	this.calc();
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
	this.calc();
}

Mech.prototype.getMaxMovementHeat = function() {
	var maxMoveHeat = 2; // standard run heat.

	if( this.getJumpSpeed() > 2 ) {
		maxMoveHeat = this.getJumpSpeed();
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
			this._assignItemToArea( this._criticals.head, item, critical_count, slot );

		} else if( location == "ct" ) {
			this._assignItemToArea( this._criticals.centerTorso, item, critical_count, slot );

		} else if( location == "lt" ) {
			this._assignItemToArea( this._criticals.leftTorso, item, critical_count, slot );

		} else if( location == "rt" ) {
			this._assignItemToArea( this._criticals.rightTorso, item, critical_count, slot );

		} else if( location == "ra" ) {
			this._assignItemToArea( this._criticals.rightArm, item, critical_count, slot );

		} else if( location == "la" ) {
			this._assignItemToArea( this._criticals.leftArm, item, critical_count, slot );

		} else if( location == "rl" ) {
			this._assignItemToArea( this._criticals.rightLeg, item, critical_count, slot );

		} else if( location == "ll" ) {
			this._assignItemToArea( this._criticals.leftLeg, item, critical_count, slot );

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

Mech.prototype._trimCriticals = function() {
	this._criticals.head = this._criticals.head.slice(0, 6);

	this._criticals.centerTorso = this._criticals.centerTorso.slice(0, 12);
	this._criticals.leftTorso = this._criticals.leftTorso.slice(0, 12);
	this._criticals.rightTorso = this._criticals.rightTorso.slice(0, 12);



	this._criticals.rightLeg = this._criticals.rightLeg.slice(0, 6);
	this._criticals.leftLeg = this._criticals.leftLeg.slice(0, 6);

	if( this._mechType.class.toLowerCase() == "quad") {
		this._criticals.rightArm = this._criticals.rightArm.slice(0, 6);
		this._criticals.leftArm = this._criticals.leftArm.slice(0, 6);
	} else {
		this._criticals.rightArm = this._criticals.rightArm.slice(0, 12);
		this._criticals.leftArm = this._criticals.leftArm.slice(0, 12);
	}
}

Mech.prototype.getHeatSinksType = function() {
	return this._heatSinkType.tag;
}

Mech.prototype.getHeatSinksObj = function() {
	return this._heatSinkType;
}


Mech.prototype.setHeatSinksType = function(newValue) {
	for( var lCounter = 0; lCounter < mechHeatSinkTypes.length; lCounter++ ) {
		if( mechHeatSinkTypes[ lCounter ].tag == newValue )
			this._heatSinkType = mechHeatSinkTypes[ lCounter ];
	}

	return this._heatSinkType;
}

Mech.prototype.getCurrentTonnage = function() {
	return this._currentTonnage;
}

Mech.prototype.getHeatSinkCriticalRequirements = function() {

	return this.heatSinkCriticals;
}


Mech.prototype.getArmorAllocation = function() {
	return this._armorAllocation;
}

Mech.prototype.getRemainingTonnage = function() {

	return this._remainingTonnage;

}

Mech.prototype.getMoveHeat = function() {
	return this._maxMoveHeat;
}

Mech.prototype.getWeaponHeat = function() {
	return this._maxWeaponHeat;
}

Mech.prototype.getHeatDissipation = function() {
	return this._heatDissipation;
}

Mech.prototype.getWalkSpeed = function() {
	return this._walkSpeed;
}

Mech.prototype.setWalkSpeed = function(walkSpeed) {
	this._walkSpeed = walkSpeed / 1;
	this.setEngine( this._tonnage * this._walkSpeed );

	if( this._jumpSpeed > this._walkSpeed )
		this.setJumpSpeed( this._walkSpeed );

	return this._walkSpeed;
}

Mech.prototype.getRunSpeed = function() {
	return this._runSpeed;
}

Mech.prototype.getJumpSpeed = function() {
	return this._jumpSpeed;
}

Mech.prototype.setJumpSpeed = function(jumpSpeed) {
	this._jumpSpeed = jumpSpeed / 1;
	this.calc();
	return this._walkSpeed;
}

Mech.prototype.getArmorWeight = function() {
	return this._armorWeight;
}

Mech.prototype.getArmorType = function() {
	return this._armorType.tag;
}

Mech.prototype.getArmorObj = function() {
	return this._armorType;
}


Mech.prototype.setArmorType = function( armorTag ) {
	for( var aCount = 0; aCount < mechArmorTypes.length; aCount++ ) {
		if( mechArmorTypes[ aCount ].tag == armorTag ) {
			this._armorType = mechArmorTypes[ aCount ];
		}
	}
	return this._armorType;
}

Mech.prototype.getTotalArmor = function() {
	return this._totalArmor;
}

Mech.prototype.getUnallocatedArmor = function() {
	return this._unallocatedArmor;
}

Mech.prototype.setArmorWeight = function(armorWeight) {
	this._armorWeight = armorWeight / 1;
	this.calc();
	return this._armorWeight;
}

Mech.prototype.getEngine = function() {
	return this._engine;
}

Mech.prototype.setEngine = function(ratingNumber) {
	ratingNumber = ratingNumber / 1;
	for( engine_count = 0; engine_count < mechEngineOptions.length; engine_count++ ) {
		if( mechEngineOptions[engine_count].rating == ratingNumber) {
			this._engine = mechEngineOptions[engine_count];
			this.calc();
			return this._engine;
		}
	}
	this.calc();
	return 0;
}

Mech.prototype.getInternalStructureType = function() {
	return this._selectedInternalStructure.tag;
}

Mech.prototype.getInternalStructure = function() {
	return this._internalStructure;
}

Mech.prototype.setInternalStructureType = function( isTag ) {
	for( lCounter = 0; lCounter < mechInternalStructureTypes.length ;lCounter++) {
		if( isTag == mechInternalStructureTypes[ lCounter ].tag ) {
			this._selectedInternalStructure = mechInternalStructureTypes[ lCounter ];
			return this._selectedInternalStructure;
		}
	}

	return null;
}


Mech.prototype.getGyro = function()  {
	return this._gyro;
}


Mech.prototype.getEra = function()  {
	return this._era;
}

Mech.prototype.getCriticals = function()  {
	this._trimCriticals();
	return this._criticals;
}


Mech.prototype.getUnallocatedCriticals = function()  {
	return this._unallocatedCriticals;
}



Mech.prototype.getEra = function()  {
	return this._era;
}

Mech.prototype.setEra = function( eraID )  {

	for( lcounter = 0; lcounter < btEraOptions.length; lcounter++) {
		if( eraID == btEraOptions[lcounter].id ) {
			this._era = btEraOptions[lcounter];
			this.calc();
			return this._era;
		}
	}
	return null;
}


Mech.prototype.getTech = function()  {
	return this._tech;
}

Mech.prototype.setTech = function( techID )  {
	for( lcounter = 0; lcounter < btTechOptions.length; lcounter++) {
		if( techID == btTechOptions[lcounter].id ) {
			this._tech = btTechOptions[lcounter];
			this.calc();

			// set era to Clan Invasion (id 3) if the techID is 2 (Clan)
			if( techID == 2 && this.getEra().id != 3 ) {
				this.setEra( 3 );
			}

			return this._tech;
		}
	}
	return null;
}


Mech.prototype.getMechType = function()  {
	return this._mechType;
}

Mech.prototype.getAlphaStrikeForceStats = function() {
	return this._alphaStrikeForceStats;
}

Mech.prototype.getPilot = function() {
	return this._pilot;
}


Mech.prototype.setPilotName = function( newValue ) {
	this._pilot.name = newValue;
}

Mech.prototype.setPilotPiloting = function( newValue ) {
	this._pilot.piloting = newValue;
}

Mech.prototype.setPilotGunnery = function( newValue ) {
	this._pilot.gunnery = newValue;
}

Mech.prototype.setMechType = function( typeID )  {
	for( lcounter = 0; lcounter < mechTypeOptions.length; lcounter++) {
		if( typeID == mechTypeOptions[lcounter].id ) {
			this._mechType = mechTypeOptions[lcounter];
			this.setTonnage( this._tonnage );
			this.calc();
			return this._mechType;
		}
	}

	return null;
}

Mech.prototype.setEngineType = function(engineType) {
	for( lcounter = 0; lcounter < mechEngineTypes.length; lcounter++) {
		if( engineType.toLowerCase() == mechEngineTypes[lcounter].tag) {
			this._engineType = mechEngineTypes[lcounter];
			this.calc();
			return this._engineType;
		}
	}
	// default to Military Standard if tag not found.
	this._engineType = mechEngineTypes[0];
	return this._engineType;
}

Mech.prototype.setGyroType = function(gyroType) {
	for( lcounter = 0; lcounter < mechGyroTypes.length; lcounter++) {
		if( gyroType.toLowerCase() == mechGyroTypes[lcounter].tag) {
			this._gyro = mechGyroTypes[lcounter];
			this.calc();
			return this._gyro;
		}
	}
	// default to Military Standard if tag not found.
	this._gyro = mechGyroTypes[0];
	return this._gyro;
}

Mech.prototype.getEngineType = function() {
	return this._engineType;
}


Mech.prototype.getEngineName = function() {
	if( this._engineType.name[ this._useLang ] )
		return this._engineType.name[ this._useLang ];
	else
		return this._engineType.name["en-US"];
}

Mech.prototype.getHeatSyncName = function() {

	if( this.heat_sink_type == "single" ) {
		return this.getTranslation( "BM_STEP3_SINGLE_HS" );
	} else {
		return this.getTranslation( "BM_STEP3_DOUBLE_HS" );
	}


}

Mech.prototype.getGyroName = function() {
	if( this._gyro.name[ this._useLang ] )
		return this._gyro.name[ this._useLang ];
	else
		return this._gyro.name["en-US"];
}


Mech.prototype.getName = function() {
	return this._make;
}

Mech.prototype.setName = function(newValue) {
	this._make = newValue;
	return this._make;
}

Mech.prototype.getTonnage = function() {
	return this._tonnage;
}

Mech.prototype.setTonnage = function(newValue) {
	this._tonnage = parseInt(newValue);

	this._internalStructure.head = this._selectedInternalStructure.perTon[ this.getTonnage() ].head;

	this._internalStructure.centerTorso = this._selectedInternalStructure.perTon[ this.getTonnage() ].centerTorso;
	this._internalStructure.leftTorso =  this._selectedInternalStructure.perTon[ this.getTonnage() ].rlTorso;
	this._internalStructure.rightTorso =  this._selectedInternalStructure.perTon[ this.getTonnage() ].rlTorso;

	this._internalStructure.rightArm =  this._selectedInternalStructure.perTon[ this.getTonnage() ].rlArm;
	this._internalStructure.leftArm =  this._selectedInternalStructure.perTon[ this.getTonnage() ].rlArm;

	this._internalStructure.rightLeg =  this._selectedInternalStructure.perTon[ this.getTonnage() ].rlLeg;
	this._internalStructure.leftLeg =  this._selectedInternalStructure.perTon[ this.getTonnage() ].rlLeg;

	this._maxArmor =  9 + this._internalStructure.centerTorso * 2 + this._internalStructure.leftTorso * 2 + this._internalStructure.rightTorso * 2 + this._internalStructure.rightLeg * 2 + this._internalStructure.leftLeg * 2;
	if( this._mechType.class.toLowerCase() == "biped")
		this._maxArmor +=  this._internalStructure.leftArm * 2 + this._internalStructure.rightArm * 2;
	else
		this._maxArmor +=  this._internalStructure.rightLeg * 2 + this._internalStructure.leftLeg * 2;


	if( this._mechType.class.toLowerCase() == "quad") {
		this._internalStructure.rightArm = this._internalStructure.rightLeg;
		this._internalStructure.leftArm = this._internalStructure.leftLeg;
	}

	this._maxArmorTonnage = this._maxArmor / 16;

	this._totalInternalStructurePoints = 0;

	this._totalInternalStructurePoints += this._internalStructure.head;

	this._totalInternalStructurePoints += this._internalStructure.centerTorso;
	this._totalInternalStructurePoints += this._internalStructure.leftTorso;
	this._totalInternalStructurePoints += this._internalStructure.rightTorso;

	this._totalInternalStructurePoints += this._internalStructure.rightArm;
	this._totalInternalStructurePoints += this._internalStructure.leftArm;

	this._totalInternalStructurePoints += this._internalStructure.rightLeg;
	this._totalInternalStructurePoints += this._internalStructure.leftLeg;

	this.setWalkSpeed( this._walkSpeed );
	this.calc();

	return this._tonnage;
}


Mech.prototype.getMaxArmorTonnage = function() {
	return this._maxArmorTonnage;
}

Mech.prototype.getMaxArmor = function() {
	return this._maxArmor;
}


Mech.prototype.getType = function() {
	return this._mechType;
}

Mech.prototype.setType = function(newValue) {
	this._mechType = newValue;
	this.setTonnage( this._tonnage );
	this.calc();
	return this._mechType;
}



Mech.prototype.exportJSON = function() {
	// TODO
	this.calc();
	var exportObject = {};
	exportObject.name = this.getName();
	exportObject.tonnage = this.getTonnage();
	exportObject.walkSpeed = this._walkSpeed;
	exportObject.jumpSpeed = this._jumpSpeed;
	exportObject.engineType = this.getEngineType().tag;

	exportObject.mechType = this._mechType.id;
	exportObject.era = this._era.id;
	exportObject.tech = this._tech.id;

	exportObject.gyro = this._gyro.tag;

	exportObject.is_type = this.getInternalStructureType();

	exportObject.additionalHeatSinks = this._additionalHeatSinks;
	exportObject.heat_sink_type = this.getHeatSinksType();

	exportObject.armor_weight = this._armorWeight;
	if(!this._uuid)
		this._uuid = generateUUID();

	exportObject.uuid = this._uuid;

	exportObject.strict_era = this._strictEra;

	exportObject.armor_allocation = this._armorAllocation;

	exportObject.armor_type = this.getArmorType();

	exportObject.equipment = Array();

	for( eq_count = 0; eq_count < this._equipmentList.length; eq_count++) {
		exportObject.equipment.push(
			{
				tag: this._equipmentList[eq_count].tag,
				loc: this._equipmentList[eq_count].location,
				rear: this._equipmentList[eq_count].rear
			}
		);
	}

	exportObject.allocation = this._criticalAllocationTable;
	exportObject.features = Array();
	if( !this.hasLowerArmActuator("la") )
		exportObject.features.push("no_lala");
	if( !this.hasLowerArmActuator("ra") )
		exportObject.features.push("no_rala");
	if( !this.hasHandActuator("la") )
		exportObject.features.push("no_laha");
	if( !this.hasHandActuator("ra") )
		exportObject.features.push("no_raha");
	if( this._smallCockpit )
		exportObject.features.push("sm_cockpit");

	exportObject.pilot = this._pilot;

	exportObject.as_role = this._alphaStrikeForceStats.role;
	exportObject.as_custom_name = this._alphaStrikeForceStats.customName;

	return JSON.stringify(exportObject);
}

Mech.prototype.getInteralStructure = function() {
	return this._internalStructure;
}

Mech.prototype.setASRole = function( newValue ) {
	return this._alphaStrikeForceStats.role = newValue;
}

Mech.prototype.setASCustomName = function( newValue ) {
	return this._alphaStrikeForceStats.customName = newValue;
}

Mech.prototype.getASCustomName = function( newValue ) {
	return this._alphaStrikeForceStats.customName;
}


Mech.prototype.importJSON = function(json_string) {
	// TODO

	try {
		importObject = JSON.parse( json_string );
	}
	catch( err ) {
		return false;
	}

	if( typeof(importObject) == "object") {
			this.setName( importObject.name );
			if( importObject.mechType )
				this.setMechType( importObject.mechType );

			this.setTonnage( importObject.tonnage );

			if( importObject.era )
				this.setEra( importObject.era );

			if( importObject.tech )
				this.setTech( importObject.tech );

			if( importObject.pilot )
				this._pilot = importObject.pilot;

			if( importObject.as_role )
				this.setASRole( importObject.as_role );

			if( importObject.armor_type )
				this.setArmorType( importObject.armor_type );

			if( importObject.as_custom_name  )
				this.setASCustomName( importObject.as_custom_name ) ;

			if( importObject.is_type  )
				this.setInternalStructureType( importObject.is_type ) ;

			if( importObject.walkSpeed )
				this.setWalkSpeed( importObject.walkSpeed );

			if( importObject.jumpSpeed )
				this.setJumpSpeed( importObject.jumpSpeed );

			if( typeof(importObject.strict_era) != "undefined" ) {
				if( importObject.strict_era )
					this._strictEra = 1;
				else
					this._strictEra = 0;
			}

			if( importObject.gyro )
				this.setGyroType( importObject.gyro );

			if( importObject.engineType )
				this.setEngineType( importObject.engineType );

			if( importObject.additionalHeatSinks )
				this.setAdditionalHeatSinks( importObject.additionalHeatSinks );

			if( importObject.heat_sink_type )
				this.setHeatSinksType( importObject.heat_sink_type );



			if( importObject.armor_weight )
				this.setArmorWeight( importObject.armor_weight );

			if( importObject.armor_allocation )
				this._armorAllocation = importObject.armor_allocation;

			if( importObject.uuid )
				this._uuid = importObject.uuid;


			if( importObject.features ) {


				// Lower Arm Actuators
				if ( importObject.features.indexOf( "no_rala" ) > -1 )
					this.removeLowerArmActuator( "ra" );
				if ( importObject.features.indexOf( "no_lala" ) > -1)
					this.removeLowerArmActuator( "la" );

				// Hand Actuators
				if ( importObject.features.indexOf( "no_raha" ) > -1 )
					this.removeHandActuator( "ra" );
				if ( importObject.features.indexOf( "no_laha" ) > -1)
					this.removeHandActuator( "la" );

				// Small Cockpit
				if ( importObject.features.indexOf( "sm_cockpit" ) > -1)
					this._smallCockpit = true;

				// Other features
			}

			if( importObject.equipment ) {
				for( eq_count = 0; eq_count < importObject.equipment.length; eq_count++) {

					import_item = importObject.equipment[eq_count];
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

			if( importObject.allocation ) {
				this._criticalAllocationTable = importObject.allocation;

				for( var eq_count = 0; eq_count < this._criticalAllocationTable.length; eq_count++) {
					if( !this._criticalAllocationTable[ eq_count ].rear )
						this._criticalAllocationTable[ eq_count ].rear = false;
					else
						this._criticalAllocationTable[ eq_count ].rear = true;
				}
			}

			if( !this._useLang && localStorage["tmp.preferred_language"] )
				this._useLang = localStorage["tmp.preferred_language"];

			this.calc();
			return true;
	} else {
			return false;
	}

}

Mech.prototype.getWeightBreakdown = function() {
	return this._weights;
}

Mech.prototype.setCenterTorsoArmor = function( armorValue ) {
	this._armorAllocation.centerTorso = armorValue / 1;
	this.calc();
	return this._armorAllocation.centerTorso;
}

Mech.prototype.setCenterTorsoRearArmor = function( armorValue ) {
	this._armorAllocation.centerTorsoRear = armorValue / 1;
	this.calc();
	return this._armorAllocation.centerTorsoRear;
}

Mech.prototype.setHeadArmor = function( armorValue ) {
	this._armorAllocation.head = armorValue / 1;
	this.calc();
	return this._armorAllocation.head;
}

Mech.prototype.setLeftArmArmor = function( armorValue ) {
	this._armorAllocation.leftArm = armorValue / 1;
	this.calc();
	return this._armorAllocation.leftArm;
}

Mech.prototype.setLeftLegArmor = function( armorValue ) {
	this._armorAllocation.leftLeg = armorValue / 1;
	this.calc();
	return this._armorAllocation.leftLeg;
}

Mech.prototype.setLeftTorsoArmor = function( armorValue ) {
	this._armorAllocation.leftTorso = armorValue / 1;
	this.calc();
	return this._armorAllocation.leftTorso;
}

Mech.prototype.setLeftTorsoRearArmor = function( armorValue ) {
	this._armorAllocation.leftTorsoRear = armorValue / 1;
	this.calc();
	return this._armorAllocation.leftTorsoRear;
}

Mech.prototype.setRightArmArmor = function( armorValue ) {
	this._armorAllocation.rightArm = armorValue / 1;
	this.calc();
	return this._armorAllocation.rightArm;
}

Mech.prototype.setRightLegArmor = function( armorValue ) {
	this._armorAllocation.rightLeg = armorValue / 1;
	this.calc();
	return this._armorAllocation.rightLeg;
}

Mech.prototype.setRightTorsoArmor = function( armorValue ) {
	this._armorAllocation.rightTorso = armorValue / 1;
	this.calc();
	return this._armorAllocation.rightTorso;
}

Mech.prototype.setRightTorsoRearArmor = function( armorValue ) {
	this._armorAllocation.rightTorsoRear = armorValue / 1;
	this.calc();
	return this._armorAllocation.rightTorsoRear;
}

Mech.prototype.getAdditionalHeatSinks = function() {
	return this._additionalHeatSinks;
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
		this._equipmentList.push( equipment_item );
		return equipment_item;
	}

	return null;
};

Mech.prototype.addEquipmentFromTag = function(equipment_tag, equipment_list_tag, location, rear) {
	equipment_list = Array();

	if( !equipment_list_tag ) {
		equipment_list_tag = this._tech.tag;
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
			this._equipmentList.push( equipment_item );
			return equipment_item;
		}
	}

	return null;
};

Mech.prototype.removeEquipment = function(equipment_index) {
	if( this._equipmentList[equipment_index] ) {
		this._equipmentList.splice(equipment_index, 1);
		return 1;
	}
	return null;
};

Mech.prototype.setRear = function(equipment_index, newValue) {
	if( this._equipmentList[equipment_index] ) {
		this._equipmentList[equipment_index].rear = newValue;
	}
	return this._equipmentList[equipment_index].rear;
};

Mech.prototype.updateCriticalAllocationTable = function() {
	this._criticalAllocationTable = Array();
	for( mech_location in this._criticals ) {

		for( var crit_item_counter = 0; crit_item_counter < this._criticals[mech_location].length; crit_item_counter++) {
			if(
				this._criticals[mech_location] &&
				this._criticals[mech_location][crit_item_counter] &&
				this._criticals[mech_location][crit_item_counter].movable
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
				if( this._criticals[mech_location][crit_item_counter].rear || ( this._criticals[mech_location][crit_item_counter].obj && this._criticals[mech_location][crit_item_counter].obj.rear )  )
					rear = true;

				if(this._criticals[mech_location][crit_item_counter] && this._criticals[mech_location][crit_item_counter].obj)
					this._criticals[mech_location][crit_item_counter].obj.location = short_loc;

				this._criticalAllocationTable.push(
					{
						tag: this._criticals[mech_location][crit_item_counter].tag,
						loc: short_loc,
						rear: rear,
						slot: crit_item_counter
					}
				);
			}
		}
	}
	// this.calc();


};

Mech.prototype.moveCritical = function ( itemTag, itemRear, fromLocation, fromIndex, toLocation, toIndex ) {



	fromItem = null
	fromLocationObj = null;
	if( fromLocation == "un" ) {
		if( this._unallocatedCriticals[fromIndex] ) {
			fromItem = this._unallocatedCriticals[fromIndex];

		}
		fromLocationObj = this._unallocatedCriticals;
	} else if(fromLocation == "hd" ) {
		if( this._criticals.head[fromIndex] ) {
			fromItem = this._criticals.head[fromIndex];
			fromLocationObj = this._criticals.head;
		}
	} else if( fromLocation == "ct" ) {
		if( this._criticals.centerTorso[fromIndex] ) {
			fromItem = this._criticals.centerTorso[fromIndex];
			fromLocationObj = this._criticals.centerTorso;
		}
	} else if( fromLocation == "rt" ) {
		if( this._criticals.rightTorso[fromIndex] ) {
			fromItem = this._criticals.rightTorso[fromIndex];
			fromLocationObj = this._criticals.rightTorso;
		}
	} else if( fromLocation == "ra" ) {
		if( this._criticals.rightArm[fromIndex] ) {
			fromItem = this._criticals.rightArm[fromIndex];
			fromLocationObj = this._criticals.rightArm;
		}
	} else if( fromLocation == "rl" ) {
		if( this._criticals.rightLeg[fromIndex] ) {
			fromItem = this._criticals.rightLeg[fromIndex];
			fromLocationObj = this._criticals.rightLeg;
		}
	} else if( fromLocation == "lt" ) {
		if( this._criticals.leftTorso[fromIndex] ) {
			fromItem = this._criticals.leftTorso[fromIndex];
			fromLocationObj = this._criticals.leftTorso;
		}
	} else if( fromLocation == "la" ) {
		if( this._criticals.leftArm[fromIndex] ) {
			fromItem = this._criticals.leftArm[fromIndex];
			fromLocationObj = this._criticals.leftArm;
		}
	} else if( fromLocation == "ll" ) {
		if( this._criticals.leftLeg[fromIndex] ) {
			fromItem = this._criticals.leftLeg[fromIndex];
			fromLocationObj = this._criticals.leftLeg;
		}
	}

;

	if( fromItem ) {

		if( toLocation == "hd" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.head, toIndex );
		} else if( toLocation == "ct" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.centerTorso, toIndex );
		} else if( toLocation == "rt" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.rightTorso, toIndex );
		} else if( toLocation == "rl" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.rightLeg, toIndex );
		} else if( toLocation == "ra" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.rightArm, toIndex );
		} else if( toLocation == "lt" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.leftTorso, toIndex );
		} else if( toLocation == "ll" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.leftLeg, toIndex );
		} else if( toLocation == "la" ) {
			return this._moveItemToArea( fromLocationObj, itemRear, fromItem, fromIndex, this._criticals.leftArm, toIndex );
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

	for(uaet_c = 0; uaet_c < this._unallocatedCriticals.length; uaet_c++) {

		if(
			equipment_tag == this._unallocatedCriticals[uaet_c].tag
				&&
			this._unallocatedCriticals[uaet_c].rear == equipment_rear
		) {
			if(  this._unallocatedCriticals[uaet_c] && this._unallocatedCriticals[uaet_c].obj )
				this._unallocatedCriticals[uaet_c].obj.location = mech_location;

			if(mech_location == "hd" ) {
				this._assignItemToArea( this._criticals.head, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "ct" ) {
				this._assignItemToArea( this._criticals.centerTorso, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "rt" ) {
				this._assignItemToArea( this._criticals.rightTorso, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "rl" ) {
				this._assignItemToArea( this._criticals.rightLeg, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "ra" ) {
				this._assignItemToArea( this._criticals.rightArm, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "lt" ) {
				this._assignItemToArea( this._criticals.leftTorso, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "ll" ) {
				this._assignItemToArea( this._criticals.leftLeg, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			} else if( mech_location == "la" ) {
				this._assignItemToArea( this._criticals.leftArm, this._unallocatedCriticals[uaet_c], this._unallocatedCriticals[uaet_c].crits, slot_number );
			}


			if( remove_from_unallocated ) {
				this._unallocatedCriticals.splice(uaet_c, 1);
			}

			return true;
		}
	}
	return null;
};

Mech.prototype.clearHeatSinkCriticals = function() {
	for( alloc_c = this._criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
		if( this._criticalAllocationTable[alloc_c] && this._criticalAllocationTable[alloc_c].tag == "heat-sink" )
			this._criticalAllocationTable.splice(alloc_c, 1);
	}

	this.calc();
};

Mech.prototype.clearArmCriticalAllocationTable = function() {
	for( alloc_c = this._criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
		if(
			this._criticalAllocationTable[alloc_c] && this._criticalAllocationTable[alloc_c].loc == "ra"
				||
			this._criticalAllocationTable[alloc_c] && this._criticalAllocationTable[alloc_c].loc == "la"
		) {
			this._criticalAllocationTable.splice(alloc_c, 1);
		}
	}
	this.calc();
}

Mech.prototype.clearCriticalAllocationTable = function() {
	this._criticalAllocationTable = Array();

	this.calc();

}

Mech.prototype.setEquipmentLocation = function(equipment_index, location) {
	if( this._equipmentList[equipment_index] ) {
		this._equipmentList[equipment_index].location = location;
		return this._equipmentList[equipment_index];
	}
	return null;
};

Mech.prototype.setAdditionalHeatSinks = function(newValue) {
	this._additionalHeatSinks = newValue / 1;
	this.calc();
	return this._additionalHeatSinks;
};

Mech.prototype.getUnallocatedCritCount = function() {
	return this._unallocatedCriticals.length;
}

Mech.prototype.getInstalledEquipment = function() {
	return this._equipmentList;
};
