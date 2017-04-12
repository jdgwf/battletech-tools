function Mech(type) {
	var _mechType = mechTypeOptions[0];
	var _tech = btTechOptions[0];
	var _era = btEraOptions[1]; // Default to Succession Wars
	var _make = "";
	var _model = "";
	var _uuid = "";
	var _tonnage = 20;
	var _useLang = "en-US";

	var _armorType = mechArmorTypes[0];

	var _maxArmor = 0;

	var _selectedInternalStructure = mechInternalStructureTypes[0];

	var _hasTripleStrengthMyomer = false;

	var _internalStructure = {
		head: 0,
		centerTorso: 0,
		rightTorso: 0,
		leftTorso: 0,
		leftArm: 0,
		rightArm: 0,
		leftLeg: 0,
		rightLeg: 0
	};

	var _no_right_arm_hand_actuator = false;
	var _no_right_arm_lower_actuator = false;

	var _no_left_arm_hand_actuator = false;
	var _no_left_arm_lower_actuator = false;

	var _smallCockpit = false;
	var _cockpitWeight = 3;

	var _totalInternalStructurePoints = 0;

	var _maxMoveHeat = 2;
	var _maxWeaponHeat = 0;
	var _heatDissipation = 0;

	var _additionalHeatSinks = 0;

	var _armorWeight = 0;
	var _totalArmor = 0;
	var _unallocatedArmor = 0;

	var _armorAllocation = {
		head: 0,
		centerTorso: 0,
		rightTorso: 0,
		leftTorso: 0,
		centerTorsoRear: 0,
		rightTorsoRear: 0,
		leftTorsoRear: 0,
		leftArm: 0,
		rightArm: 0,
		leftLeg: 0,
		rightLeg: 0
	};

	var _heatSinkType = mechHeatSinkTypes[0];


	var _equipmentList = Array();

	var _criticalAllocationTable = Array();

	var _weights = Array();

	var _strictEra = 1;

	var _unallocatedCriticals = Array();

	var _criticals = {
		head: Array(),
		centerTorso: Array(),
		rightTorso: Array(),
		leftTorso: Array(),
		leftArm: Array(),
		rightArm: Array(),
		leftLeg: Array(),
		rightLeg: Array()
	};

	var _weights = Array();

	var _gyro = mechGyroTypes[0];

	var _engine = 0;
	var _engineType = mechEngineTypes[0];
	var _jumpJetType = mechJumpJetTypes[0];

	var _walkSpeed = 0;
	var _runSpeed = 0;
	var _jumpSpeed = 0;

	var _maxArmorTonnage = 0;

	var _cbillCost = "n/a";
	var _battleValue = "n/a";
	var _pilotAdjustedBattleValue = "n/a";
	var _alphaStrikeValue = "n/a";

	var _calcLogBV = "";
	var _calcLogAS = "";
	var _calcLogCBill = "";

	this.validJJLocations = [{
			long: "leftTorso",
			short: "lt"
		},
		{
			long: "leftLeg",
			short: "ll"
		},
		{
			long: "rightLeg",
			short: "rl"
		},
		{
			long: "rightTorso",
			short: "rt"
		},
		{
			long: "centerTorso",
			short: "ct"
		},
	];

	var _pilot = {
		name: "",
		piloting: 5,
		gunnery: 4,
		wounds: 0
	};

	var _alphaStrikeForceStats = {
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


	this.setMechType = function(typeID) {
		for (lcounter = 0; lcounter < mechTypeOptions.length; lcounter++) {
			if (typeID == mechTypeOptions[lcounter].id) {
				_mechType = mechTypeOptions[lcounter];
				this.setTonnage(_tonnage);
				this.calc();
				return _mechType;
			}
		}

		return null;
	}


	this._calcAlphaStrike = function() {

		_alphaStrikeForceStats.name = this.name;
		//~ _alphaStrikeForceStats.model  = _model;
		_alphaStrikeForceStats.move = this.getWalkSpeed() * 2;
		_alphaStrikeForceStats.jumpMove = this.getJumpSpeed() * 2;
		_alphaStrikeForceStats.pv = 0;
		_alphaStrikeForceStats.damage.short = 0;
		_alphaStrikeForceStats.damage.medium = 0;
		_alphaStrikeForceStats.damage.long = 0;
		_alphaStrikeForceStats.damage.extreme = 0;
		_alphaStrikeForceStats.armor = 0;
		_alphaStrikeForceStats.structure = 0;
		_alphaStrikeForceStats.skill = 4;
		_alphaStrikeForceStats.ov = 0;
		_alphaStrikeForceStats.notes = "";
		_alphaStrikeForceStats.size_class = "";
		_alphaStrikeForceStats.size_class_name = "";
		_alphaStrikeForceStats.special_unit_abilities = Array();
		_alphaStrikeForceStats.overheat = 0;
		_alphaStrikeForceStats.longHeat = 0;
		_alphaStrikeForceStats.abilityCodes = Array()

		_alphaStrikeForceStats.getAbilityCode = function(abilityCode) {
			for (var abiC = 0; abiC < _alphaStrikeForceStats.abilityCodes.length; abiC++) {
				if (abilityCode.toLowerCase().trim() == _alphaStrikeForceStats.abilityCodes[abiC].toLowerCase().trim()) {
					return _alphaStrikeForceStats.abilityCodes[abiC];
				}
			}

			return null;
		}

		_alphaStrikeForceStats.addAbilityCode = function(abilityCode, abilityValue) {

			_alphaStrikeForceStats.abilityCodes.push({
				code: abilityCode,
				value: abilityValue
			});


		}


		_calcLogAS = "";

		// TODO - calculations
		_calcLogAS += "Tonnage is " + _tonnage + "<br />\n";
		if (_tonnage > 100) {
			_alphaStrikeForceStats.size_class = 4;
			_alphaStrikeForceStats.size_class_name = "Superheavy";
			_alphaStrikeForceStats.special_unit_abilities.push("LG");
			_calcLogAS += "<strong>Setting Size to 4 (Superheavy)</strong><br />\n";
		} else if (_tonnage >= 80) {
			_alphaStrikeForceStats.size_class = 4;
			_alphaStrikeForceStats.size_class_name = "Assault";
			_calcLogAS += "<strong>Setting Size to 4 (Assault)</strong><br />\n";
		} else if (_tonnage >= 60) {
			_alphaStrikeForceStats.size_class = 3;
			_alphaStrikeForceStats.size_class_name = "Heavy";
			_calcLogAS += "<strong>Setting Size to 3 (Heavy)</strong><br />\n";
		} else if (_tonnage >= 40) {
			_alphaStrikeForceStats.size_class = 2;
			_alphaStrikeForceStats.size_class_name = "Medium";
			_calcLogAS += "<strong>Setting Size to 2 (Medium)</strong><br />\n";
		} else {
			_alphaStrikeForceStats.size_class = 1;
			_alphaStrikeForceStats.size_class_name = "Light";
			_calcLogAS += "<strong>Setting Size to 1 (Light)</strong><br />\n";
		}

		_alphaStrikeForceStats.armor = (this.getTotalArmor() / 30).toFixed(0);
		_calcLogAS += "Converting total armor of " + this.getTotalArmor() + "<br />\n";
		_calcLogAS += "<strong>Setting Armor to " + _alphaStrikeForceStats.armor + "</strong><br />\n";

		if (this.getTech().tag == "is") {


			switch (_engineType.tag) {
				case "compact":
					// Compact

					if (_tonnage == 100) {
						_alphaStrikeForceStats.structure = 10;
					} else if (_tonnage >= 95) {
						_alphaStrikeForceStats.structure = 10;
					} else if (_tonnage >= 90) {
						_alphaStrikeForceStats.structure = 10;
					} else if (_tonnage >= 85) {
						_alphaStrikeForceStats.structure = 9;
					} else if (_tonnage >= 80) {
						_alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 75) {
						_alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 70) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 65) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 60) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 55) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 50) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 45) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 40) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 35) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 30) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 25) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 20) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 15) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 10) {
						_alphaStrikeForceStats.structure = 1;
					}
					_calcLogAS += "Engine is an IS Compact Engine <strong>setting structure to " + _alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				case "xl":
					// XL
					if (_tonnage == 100) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 95) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 90) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 85) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 80) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 75) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 70) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 65) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 60) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 55) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 50) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 45) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 40) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 35) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 30) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 25) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 20) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 15) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						_alphaStrikeForceStats.structure = 1;
					}
					_calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + _alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				case "light":
					// Compact
					if (_tonnage == 100) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 95) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 90) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 85) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 80) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 75) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 70) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 65) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 60) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 55) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 50) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 45) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 40) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 35) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 30) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 25) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 20) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 15) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						_alphaStrikeForceStats.structure = 1;
					}
					_calcLogAS += "Engine is an IS Light Engine <strong>setting structure to " + _alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				default:
					// Standard
					if (_tonnage == 100) {
						_alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 95) {
						_alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 90) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 85) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 80) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 75) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 70) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 65) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 60) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 55) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 50) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 45) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 40) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 35) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 30) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 25) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 20) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 15) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						_alphaStrikeForceStats.structure = 1;
					}
					_calcLogAS += "Engine is an IS Standard Engine <strong>setting structure to " + _alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
			}
		} else {
			// Clan Engines...
			switch (_engineType.tag) {
				case "xl":
				case "clan-xl":
					// Compact
					if (_tonnage == 100) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 95) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 90) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 85) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 80) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 75) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 70) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 65) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 60) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 55) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 50) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 45) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 40) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 35) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 30) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 25) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 20) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 15) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						_alphaStrikeForceStats.structure = 1;
					}
					_calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + _alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				default:
					// Standard / Standard Fusion
					if (_tonnage == 100) {
						_alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 95) {
						_alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 90) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 85) {
						_alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 80) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 75) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 70) {
						_alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 65) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 60) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 55) {
						_alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 50) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 45) {
						_alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 40) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 35) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 30) {
						_alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 25) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 20) {
						_alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 15) {
						_alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						_alphaStrikeForceStats.structure = 1;
					}
					_calcLogAS += "Engine is a Clan Standard Engine <strong>setting structure to " + _alphaStrikeForceStats.structure + "</strong><br />\n";

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

		for (weapon_counter = 0; weapon_counter < _equipmentList.length; weapon_counter++) {
			if (_equipmentList[weapon_counter].alpha_strike) {
				if (_equipmentList[weapon_counter].alpha_strike.range_long > 0) {
					total_weapon_heat_long += _equipmentList[weapon_counter].alpha_strike.heat;
				}

				if (_equipmentList[weapon_counter].explosive)
					has_explosive = true;

				if (_equipmentList[weapon_counter].rear) {
					_calcLogAS += "Adding <strong>rear</strong> Weapon " + _equipmentList[weapon_counter].tag + " - ";
					_calcLogAS += " (" + _equipmentList[weapon_counter].alpha_strike.range_short + ", ";
					_calcLogAS += _equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
					_calcLogAS += _equipmentList[weapon_counter].alpha_strike.range_long + ", ";
					_calcLogAS += _equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";
					rearDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
					rearDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
					rearDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
					rearDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
				} else {

					_alphaStrikeForceStats.damage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
					_alphaStrikeForceStats.damage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
					_alphaStrikeForceStats.damage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
					_alphaStrikeForceStats.damage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;

					_calcLogAS += "Adding Weapon " + _equipmentList[weapon_counter].tag + " - ";
					_calcLogAS += " (" + _equipmentList[weapon_counter].alpha_strike.range_short + ", ";
					_calcLogAS += _equipmentList[weapon_counter].alpha_strike.range_medium + ", ";
					_calcLogAS += _equipmentList[weapon_counter].alpha_strike.range_long + ", ";
					_calcLogAS += _equipmentList[weapon_counter].alpha_strike.range_extreme + ")<br />\n";
					total_weapon_heat += _equipmentList[weapon_counter].alpha_strike.heat;

				}

				if ( _equipmentList[weapon_counter].alpha_strike.notes && _equipmentList[weapon_counter].alpha_strike.notes.length && _equipmentList[weapon_counter].alpha_strike.notes.length > 0) {
					for (var nC = 0; nC < _equipmentList[weapon_counter].alpha_strike.notes.length; nC++) {
						if (_alphaStrikeForceStats.abilityCodes.indexOf(_equipmentList[weapon_counter].alpha_strike.notes[nC]) === -1) {
							_alphaStrikeForceStats.abilityCodes.push(_equipmentList[weapon_counter].alpha_strike.notes[nC]);
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "mel") {
							_alphaStrikeForceStats.special_unit_abilities.push( "MEL" );
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "heat") {
							heatDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
							heatDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
							heatDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
							heatDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "lrm") {
							lrmDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
							lrmDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
							lrmDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
							lrmDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "ac") {
							acDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
							acDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
							acDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
							acDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "flak") {
							flakDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
							flakDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
							flakDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
							flakDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "srm") {

							indirectFireRating += _equipmentList[weapon_counter].alpha_strike.range_long;

						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "indirect fire" || _equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "if") {
							srmDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
							srmDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
							srmDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
							srmDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
						}

						if (_equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "missile" || _equipmentList[weapon_counter].alpha_strike.notes[nC].toLowerCase() == "msl") {
							mslDamage.short += _equipmentList[weapon_counter].alpha_strike.range_short;
							mslDamage.medium += _equipmentList[weapon_counter].alpha_strike.range_medium;
							mslDamage.long += _equipmentList[weapon_counter].alpha_strike.range_long;
							mslDamage.extreme += _equipmentList[weapon_counter].alpha_strike.range_extreme;
						}


					}

				}
			}
		}

		var move_heat = 0;
		if (this.getJumpSpeed() > 0) {
			if (this.getJumpSpeed() < 3)
				move_heat += 3;
			else
				move_heat += this.getJumpSpeed();

			_calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"/" + this.getJumpSpeed() * 2 + "\"J</strong><br />\n";
		} else {
			move_heat += 2;
			_calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"</strong><br />\n";
		}

		// if there are no explosive components, then the mech gets the ENE ability :)
		if (!has_explosive) {
			_alphaStrikeForceStats.abilityCodes.push("ENE");
			_calcLogAS += "Mech has no explosive components, gets ENE ability<br />\n";
		}

		var heatDissipation = 0;

		heatDissipation += (10 + _additionalHeatSinks) * _heatSinkType.dissipation;


		var max_heat_output = move_heat + total_weapon_heat;
		var overheat_value = move_heat + total_weapon_heat - heatDissipation;
		var long_overheat_value = move_heat + total_weapon_heat_long - heatDissipation;

		//~ var before_heat_range_short = _alphaStrikeForceStats.damage.short.toFixed(0) /1;
		//~ var before_heat_range_medium = _alphaStrikeForceStats.damage.medium.toFixed(0) /1;
		//~ var before_heat_range_long = _alphaStrikeForceStats.damage.long.toFixed(0) /1;
		//~ var before_heat_range_extreme = _alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

		//~ _alphaStrikeForceStats.heat_damage = _alphaStrikeForceStats.damage;

		var final_overheat_value = 0;
		if (overheat_value > 3) {
			// Heat Modified Damage, p115 AS companion
			var heat_damage_short = 0;
			var heat_damage_medium = 0;
			if (_alphaStrikeForceStats.damage.short != "0*")
				heat_damage_short = Math.ceil((_alphaStrikeForceStats.damage.short * heatDissipation) / (max_heat_output - 4));
			if (_alphaStrikeForceStats.damage.medium != "0*")
				heat_damage_medium = Math.ceil((_alphaStrikeForceStats.damage.medium * heatDissipation) / (max_heat_output - 4));


			if (_alphaStrikeForceStats.damage.short != "0*")
				_alphaStrikeForceStats.damage.short = Math.ceil(_alphaStrikeForceStats.damage.short);
			if (_alphaStrikeForceStats.damage.medium != "0*")
				_alphaStrikeForceStats.damage.medium = Math.ceil(_alphaStrikeForceStats.damage.medium);
			//~ if( _alphaStrikeForceStats.damage.short != "0*")
			//~ _alphaStrikeForceStats.damage.long = Math.ceil( _alphaStrikeForceStats.damage.long );
			//~ if( _alphaStrikeForceStats.damage.medium != "0*")
			//~ _alphaStrikeForceStats.damage.extreme =  Math.ceil( _alphaStrikeForceStats.damage.extreme );


			//~ console.log( "damage.short", _alphaStrikeForceStats.damage.short );
			//~ console.log( "heat_damage_short", heat_damage_short );
			//~ console.log( "damage.medium", _alphaStrikeForceStats.damage.medium );
			//~ console.log( "heat_damage_medium", heat_damage_medium );


			if (_alphaStrikeForceStats.damage.medium != "0*" && heat_damage_medium < _alphaStrikeForceStats.damage.medium) {
				final_overheat_value = _alphaStrikeForceStats.damage.medium - heat_damage_medium;
				_alphaStrikeForceStats.damage.medium = _alphaStrikeForceStats.damage.medium - final_overheat_value;
				_alphaStrikeForceStats.damage.short = _alphaStrikeForceStats.damage.short - final_overheat_value;
			}
			//~ console.log( "final_overheat_value", final_overheat_value );



		} else {
			if (_alphaStrikeForceStats.damage.short != "0*")
				_alphaStrikeForceStats.damage.short = Math.ceil(_alphaStrikeForceStats.damage.short);
			if (_alphaStrikeForceStats.damage.medium != "0*")
				_alphaStrikeForceStats.damage.medium = Math.ceil(_alphaStrikeForceStats.damage.medium);
			//~ if( _alphaStrikeForceStats.damage.short != "0*")
			//~ _alphaStrikeForceStats.damage.long = Math.ceil( _alphaStrikeForceStats.damage.long );
			//~ if( _alphaStrikeForceStats.damage.medium != "0*")
			//~ _alphaStrikeForceStats.damage.extreme =  Math.ceil( _alphaStrikeForceStats.damage.extreme );

		}

		var final_long_overheat_value = 0;

		//~ console.log( "_alphaStrikeForceStats.damage", _alphaStrikeForceStats.damage );

		if (long_overheat_value > 4) {

			//~ console.log( "long_overheat_value", long_overheat_value );

			if (_alphaStrikeForceStats.damage.long != "0*") {
				//~ _alphaStrikeForceStats.heat_damage.long = _alphaStrikeForceStats.damage.long;
				var heat_damage_long = _alphaStrikeForceStats.damage.long;
				var heat_damage_extreme = _alphaStrikeForceStats.damage.extreme;

				_alphaStrikeForceStats.damage.long = Math.ceil((_alphaStrikeForceStats.damage.long * heatDissipation) / (total_weapon_heat_long - 4));
				_alphaStrikeForceStats.damage.extreme = Math.ceil((_alphaStrikeForceStats.damage.long * heatDissipation) / (total_weapon_heat_long - 4));

				//~ console.log( "damage.long", _alphaStrikeForceStats.damage.long );
				//~ console.log( "heatDissipation", heatDissipation );
				//~ console.log( "heat_damage_long", heat_damage_long );
				//~ console.log( "total_weapon_heat_long", total_weapon_heat_long );



				if (heat_damage_long > _alphaStrikeForceStats.damage.long) {
					var final_long_overheat_value = heat_damage_long - _alphaStrikeForceStats.damage.long;
					_alphaStrikeForceStats.damage.long = heat_damage_long - final_long_overheat_value;
					_alphaStrikeForceStats.damage.extreme = heat_damage_extreme - final_long_overheat_value;
				}

				//~ console.log( "final_long_overheat_value", final_long_overheat_value );
				//~ console.log( "damage.long", _alphaStrikeForceStats.damage.long );

			}
		} else {
			//~ if( _alphaStrikeForceStats.damage.short != "0*")
			//~ _alphaStrikeForceStats.damage.short = Math.ceil( _alphaStrikeForceStats.damage.short );
			//~ if( _alphaStrikeForceStats.damage.medium != "0*")
			//~ _alphaStrikeForceStats.damage.medium =  Math.ceil( _alphaStrikeForceStats.damage.medium );
			if (_alphaStrikeForceStats.damage.short != "0*")
				_alphaStrikeForceStats.damage.long = Math.ceil(_alphaStrikeForceStats.damage.long);
			if (_alphaStrikeForceStats.damage.medium != "0*")
				_alphaStrikeForceStats.damage.extreme = Math.ceil(_alphaStrikeForceStats.damage.extreme);

		}

		if (final_long_overheat_value > 0) {
			_alphaStrikeForceStats.abilityCodes.push("OVL " + final_long_overheat_value);

		}

		//~ _alphaStrikeForceStats.damage.short = _alphaStrikeForceStats.damage.short.toFixed(0) /1;
		//~ _alphaStrikeForceStats.damage.medium = _alphaStrikeForceStats.damage.medium.toFixed(0) /1;
		//~ _alphaStrikeForceStats.damage.long = _alphaStrikeForceStats.damage.long.toFixed(0) /1;
		//~ _alphaStrikeForceStats.damage.extreme = _alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

		//~ console.log( "_alphaStrikeForceStats.damage", _alphaStrikeForceStats.damage);
		_alphaStrikeForceStats.damage = this._adjustASDamage(_alphaStrikeForceStats.damage, true);
		//~ console.log( "_alphaStrikeForceStats.damage", _alphaStrikeForceStats.damage);

		// Determine Overheat Values - p116 AS Companion
		//~ var final_overheat_value = 0;


		//~ if( _alphaStrikeForceStats.damage.medium != "0*" && before_heat_range_medium - _alphaStrikeForceStats.damage.medium > 0) {
		//~ final_overheat_value = before_heat_range_medium - _alphaStrikeForceStats.damage.medium;
		//~ } else {
		//~ // try short range bracket since the med range is low.
		//~ if( _alphaStrikeForceStats.damage.short != "0*" )
		//~ final_overheat_value = before_heat_range_short - _alphaStrikeForceStats.damage.short;
		//~ }
		//~ if( final_overheat_value > 4 )
		//~ final_overheat_value = 4;

		// Determine Overheat Values - ASC - p116
		//~ var final_long_overheat_value = 0;
		//~ if( _alphaStrikeForceStats.damage.long != "0*" && before_heat_range_long - _alphaStrikeForceStats.damage.long > 0) {
		//~ final_long_overheat_value = before_heat_range_long - _alphaStrikeForceStats.damage.long;
		//~ }

		if (final_long_overheat_value > 4)
			final_long_overheat_value = 4;

		_alphaStrikeForceStats.ov = final_overheat_value;

		_calcLogAS += "Move Heat: " + move_heat + "<br />\n";
		_calcLogAS += "Weapon Heat: " + total_weapon_heat + "<br />\n";
		_calcLogAS += "Long Weapon Heat: " + total_weapon_heat_long + "<br />\n";
		_calcLogAS += "Heat Dissipation: " + heatDissipation + "<br />\n";

		_calcLogAS += "Overheat Value: " + overheat_value + "<br />\n";
		_calcLogAS += "Long Overheat Value: " + long_overheat_value + "<br />\n";

		_calcLogAS += "<strong>Short Damage: " + _alphaStrikeForceStats.damage.short + "</strong><br />\n";
		_calcLogAS += "<strong>Medium Damage: " + _alphaStrikeForceStats.damage.medium + "</strong><br />\n";
		_calcLogAS += "<strong>Long Damage: " + _alphaStrikeForceStats.damage.long + "</strong><br />\n";
		_calcLogAS += "<strong>Extreme Damage: " + _alphaStrikeForceStats.damage.extreme + "</strong><br />\n";

		// Overheat Value is
		_calcLogAS += "<strong>Final Overheat Value: " + final_overheat_value + "</strong><br />\n";
		_calcLogAS += "<strong>Final Long Overheat Value: " + final_long_overheat_value + "</strong><br />\n";

		_alphaStrikeForceStats.overheat = final_overheat_value;
		_alphaStrikeForceStats.longOverheat = final_long_overheat_value;

		/* *********************************
		 *
		 * Alpha Strike Point Value ASC - p138
		 *
		 * ******************************** */

		_alphaStrikeForceStats.pv = 0;
		_calcLogAS += "<div class=\"text-center\"><strong> - Calculating Point Value - </strong></div>\n";
		/* *********************************
		 * Step 1: Determine Unit’s Offensive Value ASC - p138
		 * ******************************** */

		_calcLogAS += "<strong>Step 1: Determine Unit’s Offensive Value ASC - p138</strong><br />\n";
		var offensive_value = 0;
		// Attack Damage Factor
		if (_alphaStrikeForceStats.damage.short != "0*" && _alphaStrikeForceStats.damage.short != "-")
			offensive_value += _alphaStrikeForceStats.damage.short;
		if (_alphaStrikeForceStats.damage.medium != "0*" && _alphaStrikeForceStats.damage.medium != "-")
			offensive_value += _alphaStrikeForceStats.damage.medium;
		if (_alphaStrikeForceStats.damage.long != "0*" && _alphaStrikeForceStats.damage.long != "-")
			offensive_value += _alphaStrikeForceStats.damage.long;
		if (_alphaStrikeForceStats.damage.extreme != "0*" && _alphaStrikeForceStats.damage.extreme != "-")
			offensive_value += _alphaStrikeForceStats.damage.extreme;

		_calcLogAS += "Attack Damage Factor: " + offensive_value + " ( " + _alphaStrikeForceStats.damage.short + " + " + _alphaStrikeForceStats.damage.medium + " + " + _alphaStrikeForceStats.damage.long + " + " + _alphaStrikeForceStats.damage.extreme + " )<br />\n";

		// Unit Size Factor
		offensive_value += _alphaStrikeForceStats.size_class / 2;
		_calcLogAS += "Unit Size Factor: " + (_alphaStrikeForceStats.size_class / 2) + " (" + _alphaStrikeForceStats.size_class + " / 2))<br />\n";

		// Overheat Factor
		var overHeatFactor = 0;
		if (_alphaStrikeForceStats.ov > 1) {
			offensive_value += 1;
			offensive_value += (_alphaStrikeForceStats.ov - 1) / 2;
			overHeatFactor += 1;
			overHeatFactor += (_alphaStrikeForceStats.ov - 1) / 2;
		} else {
			offensive_value += _alphaStrikeForceStats.ov;
			overHeatFactor += _alphaStrikeForceStats.ov;

		}

		_calcLogAS += "Overheat Factor: " + overHeatFactor + "<br />\n";


		// Offensive Special Ability Factor
		// TODO

		/* *********************************
		 * Step 1a: Apply Blanket Offensive Modifiers ASC - p139
		 * ******************************** */
		_calcLogAS += "<strong>Step 1a: Apply Blanket Offensive Modifiers ASC - p139</strong><br />\n";
		// TODO

		/* *********************************
		 * Step 2: Determine Unit’s Defensive Value ASC - p139
		 * ******************************** */
		_calcLogAS += "<strong>Step 2: Determine Unit’s Defensive Value ASC - p139</strong><br />\n";
		var defensive_value = 0;

		// Movement Factor:
		var movementDefenseValue = 0;
		var bestMovement = 0;
		if (_alphaStrikeForceStats.move > _alphaStrikeForceStats.jumpMove) {
			movementDefenseValue += _alphaStrikeForceStats.move * .25;
			bestMovement = _alphaStrikeForceStats.move;
		} else {
			movementDefenseValue += _alphaStrikeForceStats.jumpMove * .25;
			bestMovement = _alphaStrikeForceStats.move;
		}
		defensive_value += movementDefenseValue;

		if (_alphaStrikeForceStats.jumpMove > 0) {
			movementDefenseValue += .5;
			_calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25 + .5)<br />\n";
		} else {
			_calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25)<br />\n";
		}



		if (
			rearDamage.short > 0 ||
			rearDamage.medium > 0 ||
			rearDamage.long > 0
		) {
			_alphaStrikeForceStats.abilityCodes.push("Rear");
		}

		for (var aC = 0; aC < _alphaStrikeForceStats.abilityCodes.length; aC++) {

			// Replace Heat with Heat X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "heat") {
				heatDamage = this._adjustASDamage(heatDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "Heat " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long;
				highestDamage = this._getHighestDamage(heatDamage);
				offensive_value += highestDamage;
				if (heatDamage.medium != "-" && heatDamage.medium > 0)
					offensive_value += .5;

				_calcLogAS += "<strong>Adding</strong> Heat Ability: " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long + "<br />\n";
				_calcLogAS += "Adding Heat Damage Factor to PV: " + highestDamage + "<br />\n";
				if (heatDamage.medium != "-" && heatDamage.medium > 0)
					_calcLogAS += "Adding Heat Medium Damage Bonus to PV: 0,5<br />\n";
			}

			// Replace LRM with LRM X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "lrm") {
				lrmDamage = this._adjustASDamage(lrmDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "LRM " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long;
				_calcLogAS += "<strong>Adding</strong> LRM Ability: " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long + "<br />\n";

			}


			// Replace Flak with Flak X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "flak") {
				flakDamage = this._adjustASDamage(flakDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "Flak " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long;
				_calcLogAS += "<strong>Adding</strong> Flak Ability: " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long + "<br />\n";
			}


			// Replace AC with AC X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "ac") {
				acDamage = this._adjustASDamage(acDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "AC " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long;
				_calcLogAS += "<strong>Adding</strong> AC Ability: " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long + "<br />\n";
			}


			// Replace SRM with SRM X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "srm") {
				srmDamage = this._adjustASDamage(srmDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "SRM " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long;
				_calcLogAS += "<strong>Adding</strong> SRM Ability: " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long + "<br />\n";
			}

			// Replace Missile with Missile X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "missile" || _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "msl") {
				mslDamage = this._adjustASDamage(mslDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "MSL " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long;
				_calcLogAS += "<strong>Adding</strong> Missile Ability: " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long + "<br />\n";
			}

			// Replace Rear with Rear X/X/X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "rear") {
				rearDamage = this._adjustASDamage(rearDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "Rear " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long;
				_calcLogAS += "<strong>Adding</strong> Rear Ability: " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long + "<br />\n";
			}

			// Replace IndirectFire with IF X
			if (_alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "indirect fire" || _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "if") {
				rearDamage = this._adjustASDamage(rearDamage);
				_alphaStrikeForceStats.abilityCodes[aC] = "IF " + indirectFireRating;
				_calcLogAS += "<strong>Adding</strong> IF Ability: " + indirectFireRating + "<br />\n";
				offensive_value += highestDamage;
				_calcLogAS += "Adding IF Rating to PV: " + indirectFireRating + "<br />\n";

			}

		}

		// Defensive Special Abilities Factor
		// TODO

		// Defensive Interaction Rating
		// TODO

		/* *********************************
		 * Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141
		 * ******************************* */
		_calcLogAS += "<strong>Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141</strong><br />\n";
		var bmDIR = 0;
		// Armor Factor
		_calcLogAS += "Armor Factor: " + (_alphaStrikeForceStats.armor * 2) + " (" + _alphaStrikeForceStats.armor + " * 2)<br />\n";
		bmDIR += _alphaStrikeForceStats.armor * 2; // No need to do other types of armor, since this is BM only.

		// Structure Factor
		_calcLogAS += "Structure Factor: " + (_alphaStrikeForceStats.structure * 1) + " (" + _alphaStrikeForceStats.structure + " * 1)<br />\n";
		bmDIR += _alphaStrikeForceStats.structure * 1; // TODO IndustrialMechs

		// Defense Factor

		if (bestMovement > 34) {
			_calcLogAS += "Defense Factor: +5 (movement 35\"+)<br />\n";
			bmDIR += 5;
		} else if (bestMovement > 18) {
			_calcLogAS += "Defense Factor: +4 (movement 19\"-34\"+)<br />\n";
			bmDIR += 4;
		} else if (bestMovement > 12) {
			_calcLogAS += "Defense Factor: +3 (movement 13\"-18\"+)<br />\n";
			bmDIR += 3;
		} else if (bestMovement > 8) {
			_calcLogAS += "Defense Factor: +2 (movement 9\"-12\"+)<br />\n";
			bmDIR += 2;
		} else if (bestMovement > 4) {
			_calcLogAS += "Defense Factor: +1 (movement 4\"-8\"+)<br />\n";
			bmDIR += 1;
		} else {
			_calcLogAS += "Defense Factor: +0 (movement 0\"-4\"+)<br />\n";
			bmDIR += 0;
		}

		bmDIR += defensive_value;
		_calcLogAS += "Adding Defense Value from Step 2 above: " + defensive_value + "<br />\n";
		// Calculate the DIR
		_calcLogAS += "Total DIR: " + bmDIR + "<br />\n";

		/* *********************************
		 * Step 3: Determine Unit’s Final Point Value ASC - p141
		 *
		 * ******************************* */
		_calcLogAS += "<strong>Step 3: Determine Unit’s Final Point Value ASC - p141</strong><br />\n";
		baseFinalValue = offensive_value + bmDIR;
		_calcLogAS += "Base Point Value: " + baseFinalValue + " (" + offensive_value + " + " + bmDIR + ")<br />\n";

		finalValue = baseFinalValue;
		if (
			bestMovement >= 6 &&
			bestMovement <= 10 &&
			_alphaStrikeForceStats.damage.medium == 0 &&
			_alphaStrikeForceStats.damage.long == 0 &&
			_alphaStrikeForceStats.damage.extreme == 0
		) {
			_calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
			_calcLogAS += "Modified Point Value: " + baseFinalValue * .75 + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
			finalValue = baseFinalValue * .75;
		}

		if (
			bestMovement >= 2 &&
			bestMovement <= 5 &&
			_alphaStrikeForceStats.damage.medium == 0 &&
			_alphaStrikeForceStats.damage.long == 0 &&
			_alphaStrikeForceStats.damage.extreme == 0
		) {
			_calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
			_calcLogAS += "Modified Point Value: " + baseFinalValue * .5 + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
			finalValue = baseFinalValue * .5;
		}

		if (
			bestMovement >= 2 &&
			bestMovement <= 5 &&
			_alphaStrikeForceStats.damage.long == 0 &&
			_alphaStrikeForceStats.damage.extreme == 0
		) {
			_calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short and Medium ranges. Point Value * .75<br />\n";
			_calcLogAS += "Modified Point Value: " + baseFinalValue * .75 + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
			finalValue = baseFinalValue * .75;
		}

		_calcLogAS += "Final Point Value: " + finalValue + "<br />\n";

		/* *********************************
		 * Step 3a: Add Force Bonuses ASC - p141
		 * ******************************* */
		_calcLogAS += "<strong>Step 3a: Add Force Bonuses ASC - p141</strong><br />\n";
		// TODO
		_calcLogAS += "<strong class=\"color-red\">TODO<br />\n";

		_alphaStrikeForceStats.name = this.name;
		_alphaStrikeForceStats.type = "BM";


		_alphaStrikeValue = Math.round(finalValue) + " (WIP)";
		var asMechData = [];
		asMechData["BFPointValue"] = Math.round(finalValue);

		asMechData["Name"] = this.getName();
		asMechData["BFThreshold"] = 0;
		asMechData["Role"] = {
			Name: _alphaStrikeForceStats.role
		};
		asMechData["BFType"] = "BM";
		asMechData["BFSize"] = _alphaStrikeForceStats.size_class;

		asMechData["BFArmor"] = _alphaStrikeForceStats.armor;
		asMechData["BFStructure"] = _alphaStrikeForceStats.structure;

		asMechData["BFOverheat"] = final_overheat_value;


		asMechData["BFDamageShort"] = _alphaStrikeForceStats.damage.short;
		asMechData["BFDamageMedium"] = _alphaStrikeForceStats.damage.medium;
		asMechData["BFDamageLong"] = _alphaStrikeForceStats.damage.long;
		asMechData["BFDamageExtreme"] = _alphaStrikeForceStats.damage.extreme;

		asMechData["BFOverheat"] = _alphaStrikeForceStats.overheat;

		asMechData["customName"] = _alphaStrikeForceStats.customName;
		asMechData["currentSkilll"] = _pilot.gunnery;

		if (_alphaStrikeForceStats.jumpMove) {
			asMechData["BFMove"] = _alphaStrikeForceStats.move.toString() + "\"/" + _alphaStrikeForceStats.jumpMove + "\"J";
		} else {
			asMechData["BFMove"] = _alphaStrikeForceStats.move.toString() + "\"";
		}

		_alphaStrikeForceStats.abilityCodes.sort();
		asMechData["BFAbilities"] = _alphaStrikeForceStats.abilityCodes.join(", ").toUpperCase();

		_alphaStrikeForceStats = new asUnit(asMechData);

	}

	this._getHighestDamage = function(incomingDamageObject) {
		returnValue = 0;
		for (var dC = 0; dC < incomingDamageObject.length; dC++) {
			if (
				incomingDamageObject[dC] &&
				incomingDamageObject[dC] != "-" &&
				incomingDamageObject[dC] != "0*"
			) {
				if (incomingDamageObject[dC] > returnValue) {
					returnValue = incomingDamageObject[dC] / 1;
				}
			}
		}

		return returnValue;
	}

	this._adjustASDamage = function(incomingDamageObject, useZeros) {
		if (typeof(useZeros) == "undefined")
			useZeros = false;

		if (incomingDamageObject.short == 0) {
			if (useZeros)
				incomingDamageObject.short = 0;
			else
				incomingDamageObject.short = "-";
		} else if (incomingDamageObject.short < .5) {
			//~ if( useZeros )
			//~ incomingDamageObject.short = 0;
			//~ else
			incomingDamageObject.short = "0*";
		} else {
			incomingDamageObject.short = Math.round(incomingDamageObject.short);
		}

		if (incomingDamageObject.medium == 0) {
			if (useZeros)
				incomingDamageObject.medium = 0;
			else
				incomingDamageObject.medium = "-";
		} else if (incomingDamageObject.medium < .5) {
			//~ if( useZeros )
			//~ incomingDamageObject.medium = 0;
			//~ else
			incomingDamageObject.medium = "0*";
		} else {
			incomingDamageObject.medium = Math.round(incomingDamageObject.medium);
		}

		if (incomingDamageObject.long == 0) {
			if (useZeros)
				incomingDamageObject.long = 0;
			else
				incomingDamageObject.long = "-";
		} else if (incomingDamageObject.long < .5) {
			//~ if( useZeros )
			//~ incomingDamageObject.long = 0;
			//~ else
			incomingDamageObject.long = "0*";
		} else {
			incomingDamageObject.long = Math.round(incomingDamageObject.long);
		}

		if (incomingDamageObject.extreme == 0) {
			if (useZeros)
				incomingDamageObject.extreme = 0;
			else
				incomingDamageObject.extreme = "-";
		} else if (incomingDamageObject.extreme < .5) {
			//~ if( useZeros )
			//~ incomingDamageObject.extreme = 0;
			//~ else
			incomingDamageObject.extreme = "0*";
		} else {
			incomingDamageObject.extreme = Math.round(incomingDamageObject.extreme);
		}

		return incomingDamageObject;
	}

	this._calcBattleValue = function() {

		var hasCamo = false;
		var hasBasicStealth = false;
		var hasPrototypeStealth = false;
		var hasStandardStealth = false;
		var hasImprovedStealth = false;
		var hasMimetic = false;

		_battleValue = 0;
		_calcLogBV = "";

		/* ***************************************************
		 *  STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302
		 * ************************************************ */
		var defensiveBattleRating = 0;
		_calcLogBV += "<strong>STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302</strong><br />";
		var totalArmorFactor = 2.5 * this.getTotalArmor();
		_calcLogBV += "Total Armor Factor = Armor Factor x 2.5: " + totalArmorFactor + " = 2.5 x " + this.getTotalArmor() + "<br />";


		// Get Armor Rating
		switch (_armorType) {
			case "commercial":
				_calcLogBV += "Total Armor Factor = 0.5 * Total Armor Factor Modifier for Commercial Armor: " + totalArmorFactor + " x 0.5 = " + (totalArmorFactor * .5) + "<br />";
				totalArmorFactor = totalArmorFactor * 0.5;
				break;
			default:
				_calcLogBV += "Total Armor Factor = 1.0 * Total Armor Factor Modifier for Non-Commercial Armor:  " + totalArmorFactor + " x 1 = " + (totalArmorFactor * 1) + "<br />";
				break;
		}

		// Get for Internal Structure Rating
		var totalInternalStructurePoints = 1.5 * _totalInternalStructurePoints;
		_calcLogBV += "Total Internal Structure Points = Internal Structure Points x 1.5: " + totalInternalStructurePoints + " = 1.5 x " + _totalInternalStructurePoints + "<br />";

		// Adjust IS for Type
		switch (this.getInteralStructure().tag) {
			case "industrial":
				_calcLogBV += "Total Internal Structure BV = 0.5 x I.S. BV for Industrial Internal Structure: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * 0.5;
				break;
			case "endo-steel":
				_calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Endo-Steel Internal Structure: " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * 1;
				break;
			default:
				_calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Standard Internal Structure:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * 1;
				break;
		}

		// Adjust IS for Engine Type
		switch (_engineType) {
			case "light":
				_calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Light Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .75;
				break;
			case "xl":
				if (this.getTech().tag == "clan") {
					// Clan XL
					_calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Clan XL Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
					totalInternalStructurePoints = totalInternalStructurePoints * .5;
					break;
				} else {
					// Inner Sphere
					_calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Inner Sphere XL Engine: " + totalInternalStructurePoints + " x 0.75 = " + (totalInternalStructurePoints * .75) + "<br />";
					totalInternalStructurePoints = totalInternalStructurePoints * .75;
					break;
				}
			case "compact":
				_calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Compact Engine:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * 1;
				break;
			default:
				_calcLogBV += "Total Internal Structure = 1.0 x I.S. BV for Standard Engine:  " + totalInternalStructurePoints + " x 1 = " + (totalInternalStructurePoints * 1) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * 1;
				break;
		}




		// Add in the Gyro Modifier
		var totalGyroPoints = 0;
		switch (this.getInteralStructure().tag) {
			case "compact":
				_calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Compact Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 0.5;
				break;
			case "xl":
				_calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Extra Light Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 0.5;
				break;
			case "heavy-duty":
				_calcLogBV += "Total Gyro BV = 1 x Tonnage for Heavy Duty Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 1;
				break;
			default:
				_calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Standard Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 0.5;
				break;
		}

		// Get Explosive Ammo Modifiers - Tech Manual p302-303
		var explosiveAmmoModifiers = 0;
		_calcLogBV += "<strong>Get Explosive Ammo Modifiers (TM p302-303)</strong><br />";


		var caseEnabled_HD = false;
		var caseEnabled_CT = false;
		var caseEnabled_RL = false;
		var caseEnabled_LL = false;
		var caseEnabled_RA = false;
		var caseEnabled_LA = false;
		var caseEnabled_RT = false;
		var caseEnabled_LT = false;

		for (var lCrit = 0; lCrit < _criticals.head.length; lCrit++) {
			if (_criticals.head[lCrit] && _criticals.head[lCrit].tag == "case") {
				caseEnabled_HD = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.centerTorso.length; lCrit++) {
			if (_criticals.centerTorso[lCrit] && _criticals.centerTorso[lCrit].tag == "case") {
				caseEnabled_CT = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.rightLeg.length; lCrit++) {
			if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].tag == "case") {
				caseEnabled_RL = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.leftLeg.length; lCrit++) {
			if (_criticals.leftLeg[lCrit] && _criticals.leftLeg[lCrit].tag == "case") {
				caseEnabled_LL = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.rightArm.length; lCrit++) {
			if (_criticals.rightArm[lCrit] && _criticals.rightArm[lCrit].tag == "case") {
				caseEnabled_RA = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.leftArm.length; lCrit++) {
			if (_criticals.leftArm[lCrit] && _criticals.leftArm[lCrit].tag == "case") {
				caseEnabled_LA = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.rightTorso.length; lCrit++) {
			if (_criticals.rightTorso[lCrit] && _criticals.rightTorso[lCrit].tag == "case") {
				caseEnabled_RT = true;
			}
		}

		for (var lCrit = 0; lCrit < _criticals.leftTorso.length; lCrit++) {
			if (_criticals.leftTorso[lCrit] && _criticals.leftTorso[lCrit].tag == "case") {
				caseEnabled_LT = true;
			}
		}

		if (_tech.tag == "clan") {

			//Clan is Assumed to have CASE in BV Calculation (TM p303)

			// check head
			for (var lCrit = 0; lCrit < _criticals.head.length; lCrit++) {
				if (_criticals.head[lCrit]) {
					if (_criticals.head[lCrit] && _criticals.head[lCrit].obj && _criticals.head[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Head (Clan, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.head[lCrit] && _criticals.head[lCrit].obj && _criticals.head[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Head (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check ct
			for (var lCrit = 0; lCrit < _criticals.centerTorso.length; lCrit++) {
				if (_criticals.centerTorso[lCrit]) {
					if (_criticals.centerTorso[lCrit] && _criticals.centerTorso[lCrit].obj && _criticals.centerTorso[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Center Torso (Clan, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.centerTorso[lCrit] && _criticals.centerTorso[lCrit].obj && _criticals.centerTorso[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Center Torso (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check lt
			for (var lCrit = 0; lCrit < _criticals.leftTorso.length; lCrit++) {
				if (_criticals.leftTorso[lCrit]) {
					if (_criticals.leftTorso[lCrit] && _criticals.leftTorso[lCrit].obj && _criticals.leftTorso[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Left Torso (Clan,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.leftTorso[lCrit] && _criticals.leftTorso[lCrit].obj && _criticals.leftTorso[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Left Torso (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rt
			for (var lCrit = 0; lCrit < _criticals.rightTorso.length; lCrit++) {
				if (_criticals.rightTorso[lCrit]) {
					if (_criticals.rightTorso[lCrit] && _criticals.rightTorso[lCrit].obj && _criticals.rightTorso[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Right Torso (Clan,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.rightTorso[lCrit] && _criticals.rightTorso[lCrit].obj && _criticals.rightTorso[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Center Right (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rl
			for (var lCrit = 0; lCrit < _criticals.rightLeg.length; lCrit++) {
				if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.explosive) {
					_calcLogBV += "Explosive Ammo Crit in Right Leg (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.gauss) {
					_calcLogBV += "Gauss Crit in Right Leg (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

			// check ll
			for (var lCrit = 0; lCrit < _criticals.leftLeg.length; lCrit++) {
				if (_criticals.leftLeg[lCrit] && _criticals.leftLeg[lCrit].obj && _criticals.leftLeg[lCrit].obj.explosive) {
					_calcLogBV += "Explosive Ammo Crit in Left Leg (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (_criticals.leftLeg[lCrit] && _criticals.leftLeg[lCrit].obj && _criticals.leftLeg[lCrit].obj.gauss) {
					_calcLogBV += "Gauss Crit in Left Leg (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

		} else if (_tech.tag == "is") {
			// check head
			for (var lCrit = 0; lCrit < _criticals.head.length; lCrit++) {
				if (_criticals.head[lCrit]) {
					if (_criticals.head[lCrit] && _criticals.head[lCrit].obj && _criticals.head[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Head (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}

				}
			}

			// check ct
			for (var lCrit = 0; lCrit < _criticals.centerTorso.length; lCrit++) {
				if (_criticals.centerTorso[lCrit]) {
					if (_criticals.centerTorso[lCrit] && _criticals.centerTorso[lCrit].obj && _criticals.centerTorso[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Center Torso (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.centerTorso[lCrit] && _criticals.centerTorso[lCrit].obj && _criticals.centerTorso[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Center Torso (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check lt
			for (var lCrit = 0; lCrit < _criticals.leftTorso.length; lCrit++) {
				if (_criticals.leftTorso[lCrit]) {
					if (_criticals.leftTorso[lCrit] && _criticals.leftTorso[lCrit].obj && _criticals.leftTorso[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Left Torso (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.leftTorso[lCrit] && _criticals.leftTorso[lCrit].obj && _criticals.leftTorso[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Left Torso (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rt
			for (var lCrit = 0; lCrit < _criticals.rightTorso.length; lCrit++) {
				if (_criticals.rightTorso[lCrit]) {
					if (_criticals.rightTorso[lCrit] && _criticals.rightTorso[lCrit].obj && _criticals.rightTorso[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Right Torso (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.rightTorso[lCrit] && _criticals.rightTorso[lCrit].obj && _criticals.rightTorso[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Center Right (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rl
			for (var lCrit = 0; lCrit < _criticals.rightLeg.length; lCrit++) {
				if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.explosive) {
					_calcLogBV += "Explosive Ammo Crit in Right Leg (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.gauss) {
					_calcLogBV += "Gauss Crit in Right Leg (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}

				if (caseEnabled_RT == false && caseEnabled_RL == false) {
					if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check ll
			for (var lCrit = 0; lCrit < _criticals.leftLeg.length; lCrit++) {
				if (_criticals.leftLeg[lCrit] && _criticals.leftLeg[lCrit].obj && _criticals.leftLeg[lCrit].obj.explosive) {
					_calcLogBV += "Explosive Ammo Crit in Left Leg (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (_criticals.leftLeg[lCrit] && _criticals.leftLeg[lCrit].obj && _criticals.leftLeg[lCrit].obj.gauss) {
					_calcLogBV += "Gauss Crit in Left Leg (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}

				if (caseEnabled_LT == false && caseEnabled_LL == false) {
					if (_criticals.rightLeg[lCrit] && _criticals.rightLeg[lCrit].obj && _criticals.rightLeg[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.leftLeg[lCrit] && _criticals.leftLeg[lCrit].obj && _criticals.leftLeg[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}

			}

			// check RA
			for (var lCrit = 0; lCrit < _criticals.rightArm.length; lCrit++) {


				if (caseEnabled_RT == false && caseEnabled_RA == false) {
					if (_criticals.rightArm[lCrit] && _criticals.rightArm[lCrit].obj && _criticals.rightArm[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.rightArm[lCrit] && _criticals.rightArm[lCrit].obj && _criticals.rightArm[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}

			}

			// check LA
			for (var lCrit = 0; lCrit < _criticals.leftArm.length; lCrit++) {


				if (caseEnabled_LT == false && caseEnabled_LA == false) {
					if (_criticals.leftArm[lCrit] && _criticals.leftArm[lCrit].obj && _criticals.leftArm[lCrit].obj.explosive) {
						_calcLogBV += "Explosive Ammo Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (_criticals.leftArm[lCrit] && _criticals.leftArm[lCrit].obj && _criticals.leftArm[lCrit].obj.gauss) {
						_calcLogBV += "Gauss Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

		}


		defensiveBattleRating = totalArmorFactor + totalInternalStructurePoints + totalGyroPoints - explosiveAmmoModifiers;
		_calcLogBV += "Defensive battle rating = " + defensiveBattleRating + " ( " + totalArmorFactor + " + " + totalInternalStructurePoints + " +  " + totalGyroPoints + " -  " + explosiveAmmoModifiers + "<br />";


		// Get Defensive Factor Modifier


		var runSpeed = this.getRunSpeed();
		var jumpSpeed = this.getJumpSpeed();
		var runModifier = getMovementModifier(runSpeed);
		var jumpModifier = getMovementModifier(jumpSpeed) + 1;

		var moveModifier = 0;
		if (jumpModifier > runModifier)
			moveModifier = jumpModifier;
		else
			moveModifier = runModifier;

		_calcLogBV += "Best TMM: " + moveModifier + "<br />";

		var defensiveFactorModifier = 1 + moveModifier / 10;
		if (defensiveFactorModifier < 1)
			defensiveFactorModifier = 1;

		_calcLogBV += "Defensive Factor (defensiveFactorModifier = 1 + TMM / 10): " + defensiveFactorModifier + " = 1 + " + moveModifier + " / 10<br />";

		// TODO for equipment.... add camo, stealth, etc when it's available
		_calcLogBV += "<strong> Defensive Factor Modifiers for equipment</strong>.... add camo, stealth, etc when tech is available<br />";

		if (hasCamo) {
			defensiveFactorModifier += 0.2;
		}

		if (hasBasicStealth) {
			defensiveFactorModifier += 0.2;
		}

		if (hasPrototypeStealth) {
			defensiveFactorModifier += 0.2;
		}

		if (hasStandardStealth) {
			defensiveFactorModifier += 0.2;
		}

		if (hasImprovedStealth) {
			defensiveFactorModifier += 0.3;
		}

		if (hasMimetic) {
			defensiveFactorModifier += 0.3;
		}

		_calcLogBV += "Defensive battle rating = Defensive battle rating * Target Modifier Rating : " + (defensiveBattleRating * defensiveFactorModifier).toFixed(2) + " = " + defensiveBattleRating + " x " + defensiveFactorModifier + "<br />";

		defensiveBattleRating = defensiveBattleRating * defensiveFactorModifier;

		_calcLogBV += "<strong>Final defensive battle rating</strong>: " + defensiveBattleRating.toFixed(2) + "<br />";

		/* ***************************************************
		 *  STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303
		 * ************************************************ */
		var offensiveBattleRating = 0;
		_calcLogBV += "<strong>STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303</strong><br />";

		// TODO
		_calcLogBV += "<strong>Calculate Each Weapon’s Modified BV</strong><br />";

		var ammoBV = {};
		var weaponBV = {};

		var totalAmmoBV = 0;

		// Add up all the BV Sums, put each in an array for comparison
		for (var eqC = 0; eqC < _equipmentList.length; eqC++) {
			if (_equipmentList[eqC].tag.indexOf("ammo-") > -1) {
				if (!ammoBV[_equipmentList[eqC].tag])
					ammoBV[_equipmentList[eqC].tag] = 0;
				if (_equipmentList[eqC].battlevalue)
					ammoBV[_equipmentList[eqC].tag] += _equipmentList[eqC].battlevalue;

				_calcLogBV += "+ Adding " + this.getLocalTranslation(_equipmentList[eqC].name) + " - " + _equipmentList[eqC].battlevalue + "<br />";

			} else {
				if (!weaponBV[_equipmentList[eqC].tag])
					weaponBV[_equipmentList[eqC].tag] = 0;
				if (_equipmentList[eqC].battlevalue)
					weaponBV[_equipmentList[eqC].tag] = _equipmentList[eqC].battlevalue;


			}
		}



		var totalWeaponBV = 0;
		var simplifiedAmmoBV = {};
		for (var weaponKey in weaponBV) {
			for (var ammoKey in ammoBV) {
				if (ammoKey.indexOf(weaponKey) > -1) {
					if (!simplifiedAmmoBV[weaponKey])
						simplifiedAmmoBV[weaponKey] = 0;
					simplifiedAmmoBV[weaponKey] += ammoBV[ammoKey];
				}
			}
			totalWeaponBV += weaponBV[weaponKey];
		}

		for (var ammoKey in simplifiedAmmoBV) {
			if (weaponBV[ammoKey]) {
				if (simplifiedAmmoBV[ammoKey] > weaponBV[ammoKey]) {
					_calcLogBV += "<strong>Excessive Ammo Rule</strong> setting " + ammoKey + " value to " + weaponBV[ammoKey] + " from " + simplifiedAmmoBV[ammoKey] + "<br />";

					simplifiedAmmoBV[ammoKey] = weaponBV[ammoKey];
				}
				totalAmmoBV += simplifiedAmmoBV[ammoKey];
			}
		}

		//~ console.log( "ammoBV", ammoBV );
		//~ console.log( "simplifiedAmmoBV", simplifiedAmmoBV );
		//~ console.log( "weaponBV", weaponBV );

		//~ console.log( "totalWeaponBV", totalWeaponBV );
		//~ console.log( "totalAmmoBV", totalAmmoBV );

		_calcLogBV += "<strong>Total Ammo BV</strong> " + totalAmmoBV + "<br />";


		//~ console.log( "this.getHeatSinksType()", this.getHeatSinksType() );
		var mechHeatEfficiency = 0;
		if (this.getHeatSinksType() == "single") {
			mechHeatEfficiency = 6 + this.getHeatSinks() - this.getMaxMovementHeat();
			_calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() + " - " + this.getMaxMovementHeat() + ")<br />";

		} else if (this.getHeatSinksType() == "double") {
			mechHeatEfficiency = 6 + this.getHeatSinks() * 2 - this.getMaxMovementHeat();
			_calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() * 2 + " - " + this.getMaxMovementHeat() + ")<br />";
		}

		_calcLogBV += "<strong>Total Weapon Heat</strong> ";
		var totalWeaponHeat = 0;

		var eqList = angular.copy(_equipmentList)
		eqList.sort(sortByBVThenRearThenHeat);

		for (var eqC = 0; eqC < eqList.length; eqC++) {
			if (eqList[eqC].tag.indexOf("ammo-") == -1) {
				if (!weaponBV[eqList[eqC].tag])
					weaponBV[eqList[eqC].tag] = 0;
				if (eqList[eqC].battlevalue)
					weaponBV[eqList[eqC].tag] = eqList[eqC].battlevalue;

				_calcLogBV += eqList[eqC].heat + " + ";

				// TODO modify per weapon type
				// one shot eqList[ eqC ].heat = eqList[ eqC ].heat / 4
				// streak SRM eqList[ eqC ].heat = eqList[ eqC ].heat / 2
				// ULTRA AC eqList[ eqC ].heat = eqList[ eqC ].heat * 2
				// Rotary AC eqList[ eqC ].heat = eqList[ eqC ].heat * 6

				totalWeaponHeat += eqList[eqC].heat;


			}
		}

		if (_calcLogBV.substr(_calcLogBV.length - 3) == " + ") {
			_calcLogBV = _calcLogBV.substr(0, _calcLogBV.length - 3)
		}

		_calcLogBV += " = " + totalWeaponHeat;

		_calcLogBV += "<br />";

		var runningTotal = 0;
		var runningHeat = 0;
		if (totalWeaponHeat >= mechHeatEfficiency) {
			// Mech is heat inefficient, now we need to go through steps 4-7 on TM pp 303-304


			var inHalfCost = false;

			for (var weaponC = 0; weaponC < eqList.length; weaponC++) {
				if (eqList[weaponC].tag.indexOf("ammo-") == -1) {




					if (inHalfCost == true && eqList[weaponC].heat > 0) {
						// half efficiency
						if( eqList[weaponC].rear ) {
							_calcLogBV += "+ Adding Heat Inefficient Rear Weapon " + this.getLocalTranslation(eqList[weaponC].name) + " - " + eqList[weaponC].battlevalue + " / 4 = " + (eqList[weaponC].battlevalue / 4);
							runningTotal += (eqList[weaponC].battlevalue / 4);
						} else {
							_calcLogBV += "+ Adding Heat Inefficient Weapon " + this.getLocalTranslation(eqList[weaponC].name) + " - " + eqList[weaponC].battlevalue + " / 2 = " + (eqList[weaponC].battlevalue / 2);
							runningTotal += (eqList[weaponC].battlevalue / 2);
						}
					} else {
						// normal efficiency

						//~ console.log(  eqList[weaponC] );
						if( eqList[weaponC].rear ) {
							_calcLogBV += "+ Adding Rear Weapon " + this.getLocalTranslation(eqList[weaponC].name) + " - " + (eqList[weaponC].battlevalue / 2 ) + "<br />";
							runningTotal += (eqList[weaponC].battlevalue / 2);
						} else {
							_calcLogBV += "+ Adding Weapon " + this.getLocalTranslation(eqList[weaponC].name) + " - " + eqList[weaponC].battlevalue;

							runningTotal += eqList[weaponC].battlevalue;
						}
					}

					runningHeat += eqList[weaponC].heat;
					//~ console.log( "r,m", runningHeat + " > "   + mechHeatEfficiency );
					if (runningHeat >= mechHeatEfficiency && eqList[weaponC].heat > 0 && inHalfCost == false) {
						inHalfCost = true;
						_calcLogBV += " (weapon is last heat efficient)";
					}

					_calcLogBV += "<br />";

				}
			}

		} else {

			// Mech is heat efficient, no need to go through steps 4-7 on TM pp 303-304, just print and add up the weapons



			for (var weaponC = 0; weaponC < eqList.length; weaponC++) {
				if (eqList[weaponC].tag.indexOf("ammo-") == -1) {
					if( eqList[weaponC].rear ) {
						_calcLogBV += "+ Adding Rear Weapon " + this.getLocalTranslation(eqList[weaponC].name) + " - " + (eqList[weaponC].battlevalue / 2 ) + "<br />";

						runningTotal += (eqList[weaponC].battlevalue / 2);
					} else {
						_calcLogBV += "+ Adding Weapon " + this.getLocalTranslation(eqList[weaponC].name) + " - " + eqList[weaponC].battlevalue + "<br />";

						runningTotal += eqList[weaponC].battlevalue;
					}
				}
			}

		}

		totalWeaponBV = runningTotal;
		_calcLogBV += "<strong>Total Weapon BV</strong> " + totalWeaponBV + "<br />";

		var modifiedMechTonnage = this.getTonnage();

		if (_hasTripleStrengthMyomer) {
			modifiedMechTonnage = modifiedMechTonnage * 1.5;
		}

		offensiveBattleRating = totalWeaponBV + totalAmmoBV + modifiedMechTonnage;

		var speedFactorModifier = this._getSpeedFactorModifier();
		offensiveBattleRating = offensiveBattleRating * speedFactorModifier;

		_calcLogBV += "<strong>Final offensive battle rating</strong>: " + offensiveBattleRating.toFixed(2) + " (" + totalWeaponBV + " (weaponBV) + " + totalAmmoBV + " (ammoBV) + " + modifiedMechTonnage + "(mechTonnage) ) x " + speedFactorModifier + " (speed factor rating)<br />";

		/* ***************************************************
		 * STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304
		 * ************************************************ */

		_calcLogBV += "<strong>STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304</strong><br />";
		var finalBattleValue = defensiveBattleRating + offensiveBattleRating;
		_calcLogBV += "finalBattleValue = defensiveBattleRating + offensiveBattleRating: " + finalBattleValue.toFixed(2) + " = " + defensiveBattleRating.toFixed(2) + " + " + offensiveBattleRating.toFixed(2) + "<br />";

		if (_smallCockpit) {
			finalBattleValue = Math.round(finalBattleValue * .95);
			_calcLogBV += "Small Cockpit, multiply total by .95 and round final BV: " + finalBattleValue.toFixed(2) + "<br />";
		}

		_calcLogBV += "<strong>Final Battle Value</strong>: " + finalBattleValue.toFixed(2) + " rounded to " + Math.round(finalBattleValue) + "<br />";
		_battleValue = Math.round(finalBattleValue);

		this._setPilotAdjustedBattleValue();

	}

	this._setPilotAdjustedBattleValue = function() {
		_pilotAdjustedBattleValue = _battleValue;

		if( _pilot.gunnery == 0 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.80;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.56;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.24;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.92;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.60;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.50;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.43;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.36;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 0 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.28;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.63;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.40;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.10;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.80;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.50;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.35;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.33;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.26;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.19;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.45;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.24;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.96;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.68;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.40;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.26;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.19;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.16;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 2 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.10;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.28;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.08;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.82;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.56;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.30;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.17;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.11;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.04;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 3 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.01;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 2.01;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.84;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.61;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.38;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.15;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.04;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 1 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.98;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.92;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 4 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.86;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.82;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.60;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.40;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.20;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.0;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.90;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.85;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.80;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 5 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.75;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.75;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.58;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.33;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.14;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.95;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.86;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.81;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.76;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 6 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.71;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.67;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.51;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.31;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.08;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.90;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.81;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.77;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.72;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 7 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.68;
		} else if( _pilot.gunnery == 0 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.59;
		} else if( _pilot.gunnery == 1 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.44;
		} else if( _pilot.gunnery == 2 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.25;
		} else if( _pilot.gunnery == 3 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 1.06;
		} else if( _pilot.gunnery == 4 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.85;
		} else if( _pilot.gunnery == 5 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.77;
		} else if( _pilot.gunnery == 6 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.72;
		} else if( _pilot.gunnery == 7 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.68;
		} else if( _pilot.gunnery == 8 && _pilot.piloting == 8 ) {
			_pilotAdjustedBattleValue = _pilotAdjustedBattleValue * 0.64;
		}
		_pilotAdjustedBattleValue = Math.round( _pilotAdjustedBattleValue );
	}

	this._getSpeedFactorModifier = function() {
		var runSpeedAndHalfJumpSpeed = this.getRunSpeed() + this.getJumpSpeed() / 2;

		if (runSpeedAndHalfJumpSpeed > 25) {
			return (1 + Math.pow(((this.getRunSpeed() + (this.getJumpSpeed() / 2) - 5) / 10), 1.2)).toFixed(2);
		} else if (runSpeedAndHalfJumpSpeed > 24) {
			return 3.74; // 25
		} else if (runSpeedAndHalfJumpSpeed > 23) {
			return 3.59; // 24
		} else if (runSpeedAndHalfJumpSpeed > 22) {
			return 3.44; // 23
		} else if (runSpeedAndHalfJumpSpeed > 21) {
			return 3.29; // 22
		} else if (runSpeedAndHalfJumpSpeed > 20) {
			return 3.15; // 21
		} else if (runSpeedAndHalfJumpSpeed > 19) {
			return 3.00; // 20
		} else if (runSpeedAndHalfJumpSpeed > 18) {
			return 2.86; // 19
		} else if (runSpeedAndHalfJumpSpeed > 17) {
			return 2.72; // 18
		} else if (runSpeedAndHalfJumpSpeed > 16) {
			return 2.58; // 17
		} else if (runSpeedAndHalfJumpSpeed > 15) {
			return 2.44; // 16
		} else if (runSpeedAndHalfJumpSpeed > 14) {
			return 2.30; // 15
		} else if (runSpeedAndHalfJumpSpeed > 13) {
			return 2.16; // 14
		} else if (runSpeedAndHalfJumpSpeed > 12) {
			return 2.02; // 13
		} else if (runSpeedAndHalfJumpSpeed > 11) {
			return 1.89; // 12
		} else if (runSpeedAndHalfJumpSpeed > 10) {
			return 1.76; // 11
		} else if (runSpeedAndHalfJumpSpeed > 9) {
			return 1.63; // 10
		} else if (runSpeedAndHalfJumpSpeed > 8) {
			return 1.50; // 9
		} else if (runSpeedAndHalfJumpSpeed > 7) {
			return 1.37; // 8
		} else if (runSpeedAndHalfJumpSpeed > 6) {
			return 1.24; // 7
		} else if (runSpeedAndHalfJumpSpeed > 5) {
			return 1.12; // 6
		} else if (runSpeedAndHalfJumpSpeed > 4) {
			return 1.00; // 5
		} else if (runSpeedAndHalfJumpSpeed > 3) {
			return 0.88; // 4
		} else if (runSpeedAndHalfJumpSpeed > 2) {
			return 0.77; // 3
		} else if (runSpeedAndHalfJumpSpeed > 1) {
			return 0.65; // 2
		} else if (runSpeedAndHalfJumpSpeed > 0) {
			return 0.54; // 1
		} else {
			return 0.44;
		}
	}

	this.isQuad = function() {
		if (_mechType.class.toLowerCase() == "quad")
			return true;
		else
			return false;
	}

	this._calcCBillCost = function() {
		// TODO Calculations
		_calcLogCBill = "";

		var cbillTotal = 0;
		//~ _calcLogCBill = "TODO";

		_calcLogCBill += "<table class=\"cbill-cost\">\n";

		_calcLogCBill += "<tbody>\n";
		// Cockpit
		if( _smallCockpit ) {
			_calcLogCBill += "<tr><td><strong>Small Cockpit</strong></td><td>175,000</td></tr>\n";
			cbillTotal += 175000;
		} else {
			_calcLogCBill += "<tr><td><strong>Standard Cockpit</strong></td><td>200,000</td></tr>\n";
			cbillTotal += 200000;
		}

		// Life Support
		_calcLogCBill += "<tr><td><strong>Life Support</strong></td><td>50,000</td></tr>\n";
		cbillTotal += 50000;

		// Sensors
		_calcLogCBill += "<tr><td><strong>Sensors</strong><br /><span class=\"smaller-text\">2,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" + addCommas( 2000 * this.getTonnage()) + "</td></tr>\n";
		cbillTotal += 2000 * this.getTonnage() ;

		_calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Cockpit Subtotal: " + addCommas(cbillTotal) + "</strong></td></tr>\n";


		// Myomer
		if( _hasTripleStrengthMyomer ) {
			_calcLogCBill += "<tr><td><strong>Triple-Strength Myomer</strong><br /><span class=\"smaller-text\">16,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 16000 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 16000 * this.getTonnage() ;
		} else {
			_calcLogCBill += "<tr><td><strong>Standard Musculature</strong><br /><span class=\"smaller-text\">2,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 2000 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 2000 * this.getTonnage() ;
		}

		// Internal Structure
		//~ console.log(  this.getLocalTranslation( _selectedInternalStructure.name ) );
		_calcLogCBill += "<tr><td><strong>Internal Structure: " + this.getLocalTranslation( _selectedInternalStructure.name)  + "</strong><br />" +  addCommas( _selectedInternalStructure.cost ) + " x Unit Tonnage [" + this.getTonnage() + "]</td><td>" +  addCommas( _selectedInternalStructure.cost * this.getTonnage() ) + "</td></tr>\n";
		cbillTotal += _selectedInternalStructure.cost * this.getTonnage() ;


		_calcLogCBill += "<tr><td colspan=\"2\"><strong>Actuators</strong></td></tr>\n";

		var actuatorTotal = 0;
		// Actuators
		if (_mechType.class.toLowerCase() == "quad") {
			_calcLogCBill += "<tr><td>Right Front Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;


			_calcLogCBill += "<tr><td>Right Front Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Right Front Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Front Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Front Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Front Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Right Rear Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Right Rear Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Right Rear Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Rear Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Rear Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Rear Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;
		} else {

			_calcLogCBill += "<tr><td>Right Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Right Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Right Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			_calcLogCBill += "<tr><td>Left Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;


			_calcLogCBill += "<tr><td>Right Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 100 * this.getTonnage() ;
			actuatorTotal += 100 * this.getTonnage() ;

			if( _no_right_arm_lower_actuator == false ) {
				_calcLogCBill += "<tr><td>Right Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 50 * this.getTonnage() ;
				actuatorTotal += 50 * this.getTonnage() ;
			}

			if( _no_right_arm_hand_actuator == false ) {
				_calcLogCBill += "<tr><td>Right Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 80 * this.getTonnage() ;
				actuatorTotal += 80 * this.getTonnage() ;
			}


			_calcLogCBill += "<tr><td>Left Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 100 * this.getTonnage() ;
			actuatorTotal += 100 * this.getTonnage() ;

			if( _no_left_arm_lower_actuator == false ) {
				_calcLogCBill += "<tr><td>Left Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 50 * this.getTonnage() ;
				actuatorTotal += 50 * this.getTonnage() ;
			}

			if( _no_left_arm_hand_actuator == false ) {
				_calcLogCBill += "<tr><td>Left Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 80 * this.getTonnage() ;
				actuatorTotal += 80 * this.getTonnage() ;
			}

		}
		_calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Actuator Subtotal: " + addCommas(actuatorTotal) + "</strong></td></tr>\n";


		// Engine
		var engineName = this.getLocalTranslation( this.getEngineType().name );
		var engineRating  = this.getEngineRating();
		var engineCostMultiplier = this.getEngineType().costmultiplier;
		_calcLogCBill += "<tr><td><strong>Engine: " + engineName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( engineCostMultiplier ) + " x Engine Rating  [" + engineRating + "] x Unit Tonnage [" + this.getTonnage() + "] / 75</span></td><td>" +  addCommas( engineCostMultiplier * engineRating * this.getTonnage() / 75 ) + "</td></tr>\n";
		cbillTotal += engineCostMultiplier * engineRating * this.getTonnage() / 75;

		// Gyro
		var gyroName = this.getGyroName();
		var gyroCostMultiplier = this.getGyro().costmultiplier;
		var gyroTonnage = this.getGyroWeight();

		_calcLogCBill += "<tr><td><strong>Gyro: " + gyroName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( gyroCostMultiplier ) + " x Gyro Tonnage [" + gyroTonnage + "]</span></td><td>" +  addCommas( gyroCostMultiplier * gyroTonnage  ) + "</td></tr>\n";
		cbillTotal += gyroCostMultiplier * gyroTonnage ;

		// Jump Jets
		var numberOfJumpJets = this._getNumberOfJumpJets();
		if( numberOfJumpJets ) {
			var jumpJetName = this.getLocalTranslation( _jumpJetType.name );
			var jumpJetCost = _jumpJetType.costmultiplier;
			_calcLogCBill += "<tr><td><strong>Jump Jets: " + jumpJetName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( jumpJetCost ) + " x (# Jump Jets [" +  numberOfJumpJets + "])<sup>2</sup> x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ) + "</td></tr>\n";
			cbillTotal += jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ;
		}

		// Heat Sinks
		var heatSinksName = this.getLocalTranslation( this.getHeatSinksObj().name );
		var heatSinksCost =  this.getHeatSinksObj().cost ;
		var numberOfHeatSinks = this.getHeatSinks();
		var heatSinkType = this.getHeatSinksType();
		//~ console.log( numberOfHeatSinks );
		//~ console.log( heatSinkType );

		switch (heatSinkType) {
			case "single":
				_calcLogCBill += "<tr><td><strong>Heat Sinks: " + heatSinksName  + "</strong><br /><span class=\"smaller-text\">" + addCommas(heatSinksCost) + " x (Number of Heat Sinks over 10 [" + (numberOfHeatSinks - 10 ) + "])</span></td><td>" +  addCommas( heatSinksCost * ( numberOfHeatSinks - 10 ) ) + "</td></tr>\n";
				cbillTotal +=  heatSinksCost * ( numberOfHeatSinks - 10 )  ;

				break;
			case "double":
				_calcLogCBill += "<tr><td><strong>Heat Sinks:  " + heatSinksName  + "</strong><br /><span class=\"smaller-text\">" + addCommas(heatSinksCost) + " x (Number of Heat Sinks  [" + (numberOfHeatSinks  ) + "])</span></td><td>" +  addCommas( heatSinksCost * ( numberOfHeatSinks ) ) + "</td></tr>\n";
				cbillTotal +=  heatSinksCost * ( numberOfHeatSinks  )  ;

				break;
			default:
				break;
		}


		// Armor
		var armorName = this.getLocalTranslation( this.getArmorObj().name );
		var armorCostMultiplier = this.getArmorObj().costmultiplier;
		var armorTonnage = this.getArmorWeight();

		_calcLogCBill += "<tr><td><strong>Armor: " + armorName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( armorCostMultiplier ) + " x Armor Tonnage [" + armorTonnage + "]</span></td><td>" +  addCommas( armorCostMultiplier * armorTonnage  ) + "</td></tr>\n";
		cbillTotal += armorCostMultiplier * armorTonnage ;

		// Equipment
		for( var eqC = 0; eqC < _equipmentList.length; eqC++) {
			if( _equipmentList[eqC].tag.indexOf("ammo-") == -1) {
				_calcLogCBill += "<tr><td><strong>" + this.getLocalTranslation( _equipmentList[eqC].name ) + "</strong></td><td>" + addCommas(_equipmentList[eqC].cbills) + "</td></tr>\n";
				cbillTotal += _equipmentList[eqC].cbills;
			} else {
				_calcLogCBill += "<tr><td><strong>" + this.getLocalTranslation( _equipmentList[eqC].name ) + "</strong></td><td><span class=\"smaller-text\">(not included)</span></td></tr>\n";

			}
		}


		// NOTE - for some reason SSW and the MUL are 1000 less here than the actual summation even when all the line items are right.
		_calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\">&nbsp;</td></tr>\n";
		_calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Subtotal: " + addCommas(cbillTotal) + "</strong></td></tr>\n";


		// (Structural Cost + Weapon/Equipment Costs) x (Omni Conversion Cost*) x (1 + [Total Tonnage ÷ 100])

		_calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\">&nbsp;</td></tr>\n";
		_calcLogCBill += "<tr><td class=\"text-right\"><strong>Final Unit Cost</strong>:<br /><span class=\"smaller-text\">Sub Total [" + addCommas(cbillTotal) + "] x (1 + Unit Tonnage [" + this.getTonnage() + "] / 100) - rounded up</span></td><td>" + addCommas( Math.ceil(cbillTotal * ( 1 + this.getTonnage() / 100 ) ) ) + "</td></tr>\n";
		cbillTotal = Math.ceil( cbillTotal * (1 + this.getTonnage() / 100) );


		_calcLogCBill += "</tbody></table>";
		_cbillCost = addCommas(cbillTotal);
	}

	this._getNumberOfJumpJets = function() {
		return this.getJumpSpeed();
	}

	this.getBattleValue = function() {
		return _battleValue;
	}

	this.getPilotAdjustedBattleValue = function() {
		return _pilotAdjustedBattleValue;
	}

	this.getAlphaStrikeValue = function() {
		return _alphaStrikeValue;
	}

	this.getCBillCost = function() {
		return _cbillCost;
	}

	this.getEngineWeight = function() {
		if (_engine && _engine.weight) {
			if (_engineType.tag == "clan-xl")
				return _engine.weight["xl"];
			else
				return _engine.weight[_engineType.tag];
		} else {
			return 0;
		}
	}

	this.getEngineRating = function() {
		if (_engine && _engine.rating)
			return _engine.rating;
		else
			return 0;

	}

	this.getHeatSinks = function() {
		return 10 + _additionalHeatSinks;
	}

	this.getHeatSinksWeight = function() {
		return 0 + _additionalHeatSinks;
	}

	this.getGyroWeight = function() {
		return Math.ceil(Math.ceil(_engine.rating / 100) * _gyro.weight_multiplier);
	}
	this.getCockpitWeight = function() {
		return _cockpitWeight;
	}

	this.setCockpitWeight = function(new_weight) {
		_cockpitWeight = new_weight;
		return _cockpitWeight;
	}


	this.getInteralStructureWeight = function() {
		return _selectedInternalStructure.perTon[this.getTonnage()].tonnage;
	}

	this.getJumpJetWeight = function() {
		if (_tonnage <= 55) {
			// 10-55 tons
			return _jumpSpeed * _jumpJetType.weight_multiplier.light;
		} else if (_tonnage <= 85) {
			// 60 - 85 tons
			return _jumpSpeed * _jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			return _jumpSpeed * _jumpJetType.weight_multiplier.heavy;
		}

	}

	this.getTranslation = function(langKey) {
		for (lang_count = 0; lang_count < available_languages.length; lang_count++) {
			if (available_languages[lang_count].short_code == _useLang) {

				if (available_languages[lang_count].translations[langKey]) {
					return available_languages[lang_count].translations[langKey];
				} else {
					return langKey;
				}
			}
		}
	}

	this.getLocalTranslation = function(languageObject) {

		if (languageObject[_useLang]) {
			return languageObject[_useLang];
		} else {
			return languageObject["en-US"];
		}
	}

	this.getASCalcHTML = function() {
		return "<div class=\"mech-tro\">" + _calcLogAS + "</div>";
	}

	this.getBVCalcHTML = function() {
		return "<div class=\"mech-tro\">" + _calcLogBV + "</div>";
	}

	this.getCBillCalcHTML = function() {
		return "<div class=\"mech-tro\">" + _calcLogCBill + "</div>";
	}


	this.makeSVGRecordSheet = function(inPlay, landscape) {
		if (typeof(landscape) == "undefined") {
			landscape = false;
		} else {
			if (landscape)
				landscape = true;
			else
				landscape = false;
		}

		if (typeof(inPlay) == "undefined") {
			inPlay = false;
		} else {
			if (inPlay)
				inPlay = true;
			else
				inPlay = false;
		}




		return createSVGRecordSheet(this, inPlay, landscape);


	}

	this.makeSVGAlphaStrikeCard = function(inPlay) {
		if (typeof(inPlay) == "undefined") {
			inPlay = false;
		} else {
			if (inPlay)
				inPlay = true;
			else
				inPlay = false;
		}

		//~ console.log( _alphaStrikeForceStats );

		return createSVGAlphaStrike(_alphaStrikeForceStats, inPlay);
	}

	this.makeTROBBCode = function() {

		html = "";
		// Header Info
		html += this.getTranslation("TRO_TYPE") + ": " + this.getName() + "\n";
		html += this.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + this.getTech().name[_useLang] + "\n";
		html += this.getTranslation("TRO_ERA") + ": " + this.getEra().name[_useLang] + "\n";
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
		html += "" + this.getTranslation("TRO_EQUIPMENT").rpad(" ", col1Padding + col2Padding) + "" + this.getTranslation("TRO_MASS") + "\n";
		html += "" + (this.getTranslation("TRO_ARMOR_IS") + " (" + this.getLocalTranslation(_selectedInternalStructure.name) + ")").rpad(" ", col1Padding + col2Padding) + "" + this.getInteralStructureWeight() + "\n";
		html += "" + this.getEngineName().rpad(" ", col1Padding) + "" + this.getEngineRating().toString().rpad(" ", col2Padding) + "" + this.getEngineWeight() + "\n";

		html += "" + this.getTranslation("TRO_WALKING").lpad(" ", col1Padding - 10) + " " + this.getWalkSpeed().toString().lpad(" ", 3) + "\n";
		html += "" + this.getTranslation("TRO_RUNNING").lpad(" ", col1Padding - 10) + " " + this.getRunSpeed().toString().lpad(" ", 3) + "\n";
		html += "" + this.getTranslation("TRO_JUMPING").lpad(" ", col1Padding - 10) + " " + this.getJumpSpeed().toString().lpad(" ", 3) + "\n";

		html += "" + this.getHeatSyncName().rpad(" ", col1Padding) + "" + this.getHeatSinks().toString().rpad(" ", col2Padding) + "" + this.getHeatSinksWeight() + "\n";
		html += "" + this.getGyroName().rpad(" ", col1Padding + col2Padding) + "" + this.getGyroWeight() + "\n";

		if (_smallCockpit) {
			html += "" + this.getTranslation("TRO_SMALL_COCKPIT").rpad(" ", col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
		} else {
			html += "" + this.getTranslation("TRO_COCKPIT").rpad(" ", col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
		}

		//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "" + this.getTranslation("TRO_JUMP_JETS").rpad(" ",col1Padding + col2Padding) + "" + this.getJumpJetWeight() + "\n";
		//~ }

		if (_mechType.class == "biped") {
			html += "" + this.getTranslation("TRO_ARM_ACTUATORS") + ": ";
			actuator_html = "";

			if (this.hasLowerArmActuator("ra"))
				actuator_html += this.getTranslation("TRO_LOWER_RIGHT") + ", ";
			if (this.hasLowerArmActuator("la"))
				actuator_html += this.getTranslation("TRO_LOWER_LEFT") + ", ";
			if (this.hasHandActuator("ra"))
				actuator_html += this.getTranslation("TRO_RIGHT_HAND") + ", ";
			if (this.hasHandActuator("la"))
				actuator_html += this.getTranslation("TRO_LEFT_HAND") + ", ";

			if (actuator_html == "")
				actuator_html = this.getTranslation("TRO_NO_LOWER_ARM_ACTUATORS");
			else
				actuator_html = actuator_html.substring(0, actuator_html.length - 2);

			html += actuator_html;
			html += "\n";
		}

		html += "" + (this.getTranslation("TRO_ARMOR_FACTOR") + " (" + this.getLocalTranslation(_armorType.name) + ")").rpad(" ", col1Padding) + "" + this.getTotalArmor().toString().rpad(" ", col2Padding) + "" + this.getArmorWeight() + "\n";

		var col1Padding = 20;
		var col2Padding = 10;
		var col3Padding = 15;
		var col4Padding = 10;

		// Armor Factor Table

		html += this.getTranslation("TRO_ARMOR_IS").lpad(" ", col1Padding + col2Padding) + "" + this.getTranslation("TRO_ARMOR_VALUE").lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_HD").lpad(" ", col1Padding) + "" + _internalStructure.head.toString().lpad(" ", col2Padding) + "" + _armorAllocation.head.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_CT").lpad(" ", col1Padding) + "" + _internalStructure.centerTorso.toString().lpad(" ", col2Padding) + "" + _armorAllocation.centerTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + this.getTranslation("TRO_ARMOR_CTR").lpad(" ", col1Padding) + "" + _armorAllocation.centerTorsoRear.toString().lpad(" ", col2Padding) + "\n";
		if (_armorAllocation.rightTorso == _armorAllocation.leftTorso && _armorAllocation.rightTorsoRear == _armorAllocation.leftTorsoRear) {
			html += "" + this.getTranslation("TRO_ARMOR_RLT").lpad(" ", col1Padding) + "" + _internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_RLTR").lpad(" ", col1Padding) + "" + _armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";
		} else {
			html += "" + this.getTranslation("TRO_ARMOR_RT").lpad(" ", col1Padding) + "" + _internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_RTR").lpad(" ", col1Padding) + "" + _armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";

			html += "" + this.getTranslation("TRO_ARMOR_LT").lpad(" ", col1Padding) + "" + _internalStructure.leftTorso.toString().lpad(" ", col2Padding) + "" + _armorAllocation.leftTorso.toString().lpad(" ", col3Padding) + "\n";
			html += "" + this.getTranslation("TRO_ARMOR_LTR").lpad(" ", col1Padding) + "" + _armorAllocation.leftTorsoRear.toString().lpad(" ", col2Padding) + "\n";
		}
		if (_mechType.class == "biped") {

			if (_armorAllocation.rightArm == _armorAllocation.leftArm) {
				html += "" + this.getTranslation("TRO_ARMOR_RLA").lpad(" ", col1Padding) + "" + _internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + this.getTranslation("TRO_ARMOR_RA").lpad(" ", col1Padding) + "" + _internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
				html += "" + this.getTranslation("TRO_ARMOR_LA").lpad(" ", col1Padding) + "" + _internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + _armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
			}

			if (_armorAllocation.rightLeg == _armorAllocation.leftLeg) {
				html += "" + this.getTranslation("TRO_ARMOR_RLL").lpad(" ", col1Padding) + "" + _internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + this.getTranslation("TRO_ARMOR_RL").lpad(" ", col1Padding) + "" + _internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
				html += "" + this.getTranslation("TRO_ARMOR_LL").lpad(" ", col1Padding) + "" + _internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + _armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
			}
		} else {
			if (_armorAllocation.rightArm == _armorAllocation.leftArm) {
				html += "" + this.getTranslation("TRO_ARMOR_RLFL").lpad(" ", col1Padding) + "" + _internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + this.getTranslation("TRO_ARMOR_RFL").lpad(" ", col1Padding) + "" + _internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
				html += "" + this.getTranslation("TRO_ARMOR_LFL").lpad(" ", col1Padding) + "" + _internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + _armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
			}

			if (_armorAllocation.rightLeg == _armorAllocation.leftLeg) {
				html += "" + this.getTranslation("TRO_ARMOR_RLRL").lpad(" ", col1Padding) + "" + _internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + this.getTranslation("TRO_ARMOR_RRL").lpad(" ", col1Padding) + "" + _internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + _armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
				html += "" + this.getTranslation("TRO_ARMOR_RLL").lpad(" ", col1Padding) + "" + _internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + _armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
			}
		}
		// End Factor Table
		html += "";
		html += "\n";


		var col1Padding = 20;
		var col2Padding = 10;
		var col3Padding = 10;
		var col4Padding = 10;
		_equipmentList.sort(sortByLocationThenName);

		// Weapons and Ammo
		for (eq_count = 0; eq_count < _equipmentList.length; eq_count++) {
			if (_equipmentList[eq_count].name[_useLang].length + 3 > col1Padding)
				col1Padding = _equipmentList[eq_count].name[_useLang].length + 3;
		}

		for (var locC = 0; locC < this.validJJLocations.length; locC++) {

			var jjObjs = [];
			for (var critC = 0; critC < _criticals[this.validJJLocations[locC].long].length; critC++) {
				if (
					_criticals[this.validJJLocations[locC].long][critC] &&
					_criticals[this.validJJLocations[locC].long][critC].tag &&
					_criticals[this.validJJLocations[locC].long][critC].tag.indexOf("jj-") === 0
				) {
					if (_criticals[this.validJJLocations[locC].long][critC].name + 3 > col1Padding)
						col1Padding = _criticals[this.validJJLocations[locC].long][critC].name + 3;
				}
			}
		}



		html += "" + this.getTranslation("TRO_WEAPONS") + "\n";

		html += this.getTranslation("TRO_AND_AMMO").rpad(" ", col1Padding) + "" + this.getTranslation("TRO_LOCATION").rpad(" ", col2Padding) + "" + this.getTranslation("TRO_CRITICAL").rpad(" ", col3Padding) + "" + this.getTranslation("TRO_TONNAGE").rpad(" ", col4Padding) + "\n";



		for (eq_count = 0; eq_count < _equipmentList.length; eq_count++) {
			if (typeof(_equipmentList[eq_count].location) == "undefined")
				_equipmentList[eq_count].location = "n/a";

			item_location = "";
			item_location = this.getLocationAbbr(_equipmentList[eq_count].location);

			if( _equipmentList[eq_count].rear)
				item_location += " (R)"

			if (_equipmentList[eq_count].ammo_per_ton && _equipmentList[eq_count].ammo_per_ton > 0) {
				html += "" + (_equipmentList[eq_count].name[_useLang] + " " + _equipmentList[eq_count].ammo_per_ton).rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + _equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + _equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
			} else {
				html += "" + _equipmentList[eq_count].name[_useLang].rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + _equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + _equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
			}

		}



		// List Jump Jets Allocations...

		for (var locC = 0; locC < this.validJJLocations.length; locC++) {

			var jjObjs = [];
			for (var critC = 0; critC < _criticals[this.validJJLocations[locC].long].length; critC++) {
				if (
					_criticals[this.validJJLocations[locC].long][critC] &&
					_criticals[this.validJJLocations[locC].long][critC].tag &&
					_criticals[this.validJJLocations[locC].long][critC].tag.indexOf("jj-") === 0
				) {
					jjObjs.push(_criticals[this.validJJLocations[locC].long][critC]);
				}
			}

			if (jjObjs.length > 0) {
				var areaWeight = 0;
				if (_tonnage <= 55) {
					// 10-55 tons
					areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.light;
				} else if (_tonnage <= 85) {
					// 60 - 85 tons
					areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.medium;
				} else {
					// 90+ tons
					areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.heavy;
				}
				html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + this.validJJLocations[locC].short.toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

			}
		}

		var jjObjs = [];

		for (var critC = 0; critC < _unallocatedCriticals.length; critC++) {
			if (
				_unallocatedCriticals[critC] &&
				_unallocatedCriticals[critC].tag &&
				_unallocatedCriticals[critC].tag.indexOf("jj-") === 0
			) {
				jjObjs.push(_unallocatedCriticals[critC]);
			}
		}

		if (jjObjs.length > 0) {
			var areaWeight = 0;
			if (_tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.light;
			} else if (_tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.heavy;
			}
			html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + "n/a".toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

		}



		var createdBy = "\n\nCreated with BattleTech Tools: [url]https://jdgwf.github.io/battletech-tools/[/url]\n\n";


		return "[code]" + html + "[/code]" + createdBy;

	}

	this.makeTROHTML = function() {


		html = "<table class=\"mech-tro\">";

		// Header Info
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TYPE") + ": " + this.getName() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TECHNOLOGY_BASE") + ": " + this.getTech().name[_useLang] + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ERA") + ": " + this.getEra().name[_useLang] + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_TONNAGE") + ": " + this.getTonnage() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_BATTLE_VALUE") + ": " + this.getBattleValue() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ALPHA_STRIKE_VALUE") + ": " + this.getAlphaStrikeValue() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_CBILL_COST") + ": $" + this.getCBillCost() + "</td></tr>";
		html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";

		// Equipment
		html += "<tr><th class=\"text-left\" colspan=\"3\">" + this.getTranslation("TRO_EQUIPMENT") + "</th><th class=\"text-center\" colspan=\"1\">" + this.getTranslation("TRO_MASS") + "</th></tr>";
		html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_ARMOR_IS") + " (" + this.getLocalTranslation(_selectedInternalStructure.name) + ")</td><td class=\"text-center\" colspan=\"1\">" + this.getInteralStructureWeight() + "</td></tr>";
		html += "<tr><td colspan=\"1\">" + this.getEngineName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

		html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_WALKING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
		html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_RUNNING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
		html += "<tr><td colspan=\"1\" class=\"text-right\">" + this.getTranslation("TRO_JUMPING") + "</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

		html += "<tr><td colspan=\"1\">" + this.getHeatSyncName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
		html += "<tr><td colspan=\"3\">" + this.getGyroName() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

		if (_smallCockpit) {
			html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_SMALL_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
		} else {
			html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_COCKPIT") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
		}

		//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "<tr><td colspan=\"3\">" + this.getTranslation("TRO_JUMP_JETS") + "</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
		//~ }

		if (_mechType.class == "biped") {
			html += "<tr><td colspan=\"4\">" + this.getTranslation("TRO_ARM_ACTUATORS") + ": ";
			actuator_html = "";

			if (this.hasLowerArmActuator("ra"))
				actuator_html += this.getTranslation("TRO_LOWER_RIGHT") + ", ";
			if (this.hasLowerArmActuator("la"))
				actuator_html += this.getTranslation("TRO_LOWER_LEFT") + ", ";
			if (this.hasHandActuator("ra"))
				actuator_html += this.getTranslation("TRO_RIGHT_HAND") + ", ";
			if (this.hasHandActuator("la"))
				actuator_html += this.getTranslation("TRO_LEFT_HAND") + ", ";

			if (actuator_html == "")
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


		html += "<tr><th colspan=\"1\">" + this.getTranslation("TRO_ARMOR_VALUE") + " (" + this.getLocalTranslation(_armorType.name) + ")</th><th class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</th><th class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</th></tr>";


		// Armor Factor Table
		html += "<tr><td colspan=\"1\"></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + this.getTranslation("TRO_ARMOR_IS") + "</em></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + this.getTranslation("TRO_ARMOR_VALUE") + "</em></td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_HD") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.head + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.head + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_CT") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.centerTorso + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.centerTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_CTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.centerTorsoRear + "</td><td>&nbsp;</td></tr>";
		if (_armorAllocation.rightTorso == _armorAllocation.leftTorso && _armorAllocation.rightTorsoRear == _armorAllocation.leftTorsoRear) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLT") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RT") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";

			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LT") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.leftTorso + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.leftTorso + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LTR") + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.leftTorsoRear + "</td><td>&nbsp;</td></tr>";
		}
		if (_mechType.class == "biped") {

			if (_armorAllocation.rightArm == _armorAllocation.leftArm) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLA") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RA") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LA") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
			}

			if (_armorAllocation.rightLeg == _armorAllocation.leftLeg) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
			}
		} else {
			if (_armorAllocation.rightArm == _armorAllocation.leftArm) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLFL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RFL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LFL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
			}

			if (_armorAllocation.rightLeg == _armorAllocation.leftLeg) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLRL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RRL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLL") + "</td><td class=\"text-center\" colspan=\"1\">" + _internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + _armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
			}
		}
		// End Factor Table
		html += "</table>";
		html += "<br />";

		// Weapons and Ammo
		html += "<table class=\"mech-tro\">";
		html += "<tr><th class=\"text-left\">" + this.getTranslation("TRO_WEAPONS") + "<br />" + this.getTranslation("TRO_AND_AMMO") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_LOCATION") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_CRITICAL") + "</th><th class=\"text-center\">" + this.getTranslation("TRO_TONNAGE") + "</th></tr>";

		_equipmentList.sort(sortByLocationThenName);

		for (eq_count = 0; eq_count < _equipmentList.length; eq_count++) {
			if (typeof(_equipmentList[eq_count].location) == "undefined")
				_equipmentList[eq_count].location = "n/a";

			item_location = "";
			item_location = this.getLocationAbbr(_equipmentList[eq_count].location);

			if( _equipmentList[eq_count].rear)
				item_location += " (R)"

			if (_equipmentList[eq_count].ammo_per_ton && _equipmentList[eq_count].ammo_per_ton > 0)
				html += "<tr><td class=\"text-left\">" + _equipmentList[eq_count].name[_useLang] + " " + _equipmentList[eq_count].ammo_per_ton + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + _equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + _equipmentList[eq_count].weight + "</td></tr>";
			else
				html += "<tr><td class=\"text-left\">" + _equipmentList[eq_count].name[_useLang] + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + _equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + _equipmentList[eq_count].weight + "</td></tr>";
		}

		// List Jump Jets Allocations...

		for (var locC = 0; locC < this.validJJLocations.length; locC++) {

			var jjObjs = [];
			for (var critC = 0; critC < _criticals[this.validJJLocations[locC].long].length; critC++) {
				if (
					_criticals[this.validJJLocations[locC].long][critC] &&
					_criticals[this.validJJLocations[locC].long][critC].tag &&
					_criticals[this.validJJLocations[locC].long][critC].tag.indexOf("jj-") === 0
				) {
					jjObjs.push(_criticals[this.validJJLocations[locC].long][critC]);
				}
			}

			if (jjObjs.length > 0) {
				var areaWeight = 0;
				if (_tonnage <= 55) {
					// 10-55 tons
					areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.light;
				} else if (_tonnage <= 85) {
					// 60 - 85 tons
					areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.medium;
				} else {
					// 90+ tons
					areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.heavy;
				}
				html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">" + this.validJJLocations[locC].short.toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

			}
		}

		var jjObjs = [];

		for (var critC = 0; critC < _unallocatedCriticals.length; critC++) {
			if (
				_unallocatedCriticals[critC] &&
				_unallocatedCriticals[critC].tag &&
				_unallocatedCriticals[critC].tag.indexOf("jj-") === 0
			) {
				jjObjs.push(_unallocatedCriticals[critC]);
			}
		}

		if (jjObjs.length > 0) {
			var areaWeight = 0;
			if (_tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.light;
			} else if (_tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * _jumpJetType.weight_multiplier.heavy;
			}
			html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">" + "n/a".toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

		}

		// END Weapons and Ammo
		html += "</table>";

		return html;
	}
	this.getLocationAbbr = function(location_tag) {


		for (loc_count = 0; loc_count < battlemechLocations.length; loc_count++) {
			if (location_tag == battlemechLocations[loc_count].tag) {
				if (battlemechLocations[loc_count].abbr[_useLang] != "undefined")
					return battlemechLocations[loc_count].abbr[_useLang];
				else
					return battlemechLocations[loc_count].abbr[_useLang];
			}
		}
		return this.getTranslation("TRO_NOT_AVAILABLE");
	}

	this.clearMech = function() {
		this.setEngineType( "standard" );
		this.setMechType(1);
		this.setTonnage(20);
		this.calc();
	}

	this.calc = function() {


		_maxMoveHeat = 2;
		_maxWeaponHeat = 0;
		_heatDissipation = 0;


		_weights = Array();
		_weights.push({
			name: "Internal Structure",
			weight: this.getInteralStructureWeight()
		});

		if (_smallCockpit) {
			this.setCockpitWeight(2);
			_weights.push({
				name: "Small Cockpit",
				weight: this.getCockpitWeight()
			});
		} else {
			this.setCockpitWeight(3);
			_weights.push({
				name: "Cockpit",
				weight: this.getCockpitWeight()
			});
		}

		_runSpeed = Math.ceil(_walkSpeed * 1.5);

		if (_era == 0) {
			_era = btEraOptions[1];
		}

		if (_tech == 0) {
			_tech = btTechOptions[0];
		}

		if (_mechType == 0) {
			_mechType = mechTypeOptions[0];
		}


		if (_engine) {

			_weights.push({
				name: _engineType.name[_useLang] + " - " + _engineType.rating,
				weight: this.getEngineWeight()
			});

			_weights.push({
				name: _gyro.name[_useLang],
				weight: this.getGyroWeight()
			});

		}

		if (_jumpSpeed > 0) {
			_maxMoveHeat = _jumpSpeed;
			if (_jumpJetType == "Standard") {
				// standard
				_weights.push({
					name: "Jump Jets",
					weight: this.getJumpJetWeight()
				});
			} else {
				// improved
				_weights.push({
					name: "Improved Jets",
					weight: this.getJumpJetWeight()
				});
			}
		}

		_totalArmor = _armorWeight * 16;

		//~ switch( this.getArmorType() ) {

		//~ default: // standard
		//~ _totalArmor = _armorWeight * 16;
		//~ break;
		//~ }
		if (this.getTech().tag == "clan") {
			_totalArmor = Math.floor(_armorWeight * this.getArmorObj().armormultiplier.clan);
		} else {
			_totalArmor = Math.floor(_armorWeight * this.getArmorObj().armormultiplier.is);
		}


		if (_totalArmor > _maxArmor)
			_totalArmor = _maxArmor;

		_weights.push({
			name: "Armor",
			weight: _armorWeight
		});
		_unallocatedArmor = _totalArmor;
		_unallocatedArmor -= _armorAllocation.head;

		_unallocatedArmor -= _armorAllocation.centerTorso;
		_unallocatedArmor -= _armorAllocation.leftTorso;
		_unallocatedArmor -= _armorAllocation.rightTorso;

		_unallocatedArmor -= _armorAllocation.centerTorsoRear;
		_unallocatedArmor -= _armorAllocation.leftTorsoRear;
		_unallocatedArmor -= _armorAllocation.rightTorsoRear;

		_unallocatedArmor -= _armorAllocation.rightArm;
		_unallocatedArmor -= _armorAllocation.leftArm;

		_unallocatedArmor -= _armorAllocation.rightLeg;
		_unallocatedArmor -= _armorAllocation.leftLeg;


		if (_additionalHeatSinks > 0)
			_weights.push({
				name: "Additional Heat Sinks",
				weight: _additionalHeatSinks
			});

		this._calcVariableEquipment();
		for (eq_count = 0; eq_count < _equipmentList.length; eq_count++) {
			if (_equipmentList[eq_count].rear) {
				_weights.push({
					name: _equipmentList[eq_count].name + " (" + this.getTranslation("GENERAL_REAR") + ")",
					weight: _equipmentList[eq_count].weight
				});
			} else {
				_weights.push({
					name: _equipmentList[eq_count].name + "",
					weight: _equipmentList[eq_count].weight
				});
			}
			if (_equipmentList[eq_count])
				_maxWeaponHeat += _equipmentList[eq_count].heat;
		}

		_currentTonnage = 0;
		for (weight_counter = 0; weight_counter < _weights.length; weight_counter++) {
			_currentTonnage += _weights[weight_counter].weight;
		}

		_remainingTonnage = _tonnage - _currentTonnage;

		this.heatSinkCriticals = {};
		this.heatSinkCriticals.number = 0;
		//~ this.heatSinkCriticals.slots_type = "single slot";
		this.heatSinkCriticals.slots_each = 1;

		//~ if( _heatSinkType == "double") {
		//~ if( _tech.tag == "clan") {
		//~ this.heatSinkCriticals.slots_type = "double slot";
		//~ this.heatSinkCriticals.slots_each = 2;
		//~ } else {
		//~ this.heatSinkCriticals.slots_type = "triple slot";
		//~ this.heatSinkCriticals.slots_each = 3;
		//~ }
		//~ _heatDissipation = (_additionalHeatSinks + 10) * 2;
		//~ } else {
		//~ this.heatSinkCriticals.slots_type = "single";
		//~ this.heatSinkCriticals.slots_each = 1;
		//~ _heatDissipation = _additionalHeatSinks + 10;
		//~ }

		_heatDissipation = (_additionalHeatSinks + 10) * _heatSinkType.dissipation;
		this.heatSinkCriticals.slots_each = _heatSinkType.crits[this.getTech().tag];

		if (this.getEngine().rating) {
			this.heatSinkCriticals.number = _additionalHeatSinks + 10 - Math.floor(this.getEngine().rating / 25);
		} else {
			this.heatSinkCriticals.number = 0
		}

		this._calcCriticals();
		this._calcAlphaStrike();
		this._calcBattleValue();
		this._calcCBillCost();

		_equipmentList = _equipmentList.sort(sortByLocationThenName);
		this.sortedEquipmentList = [];
		for (eq_count = 0; eq_count < _equipmentList.length; eq_count++) {


			var foundIt = false;

			for (var se_count = 0; se_count < this.sortedEquipmentList.length; se_count++) {
				if (
					_equipmentList[eq_count].location == this.sortedEquipmentList[se_count].location &&
					_equipmentList[eq_count].tag == this.sortedEquipmentList[se_count].tag
				) {
					this.sortedEquipmentList[se_count].count++;
					foundIt = true;
				}
			}

			if (!foundIt) {
				var eqItem = angular.copy(_equipmentList[eq_count]);
				eqItem.local_name = this.getLocalTranslation(eqItem.name);
				eqItem.count = 1;
				this.sortedEquipmentList.push(eqItem);
			}
		}
	}

	this._calcCriticals = function() {
		// WORK IN PROGRESS
		_criticals.head = Array(6);

		_criticals.centerTorso = Array(12);
		_criticals.leftTorso = Array(12);
		_criticals.rightTorso = Array(12);

		_criticals.rightArm = Array(12);
		_criticals.leftArm = Array(12);

		_criticals.rightLeg = Array(6);
		_criticals.leftLeg = Array(6);

		_unallocatedCriticals = Array();

		// Add required components....
		if (_smallCockpit) {
			this._addCriticalItem("life-support", this.getTranslation("BM_CRITS_LIFE_SUPPORT"), 1, "hd", 0);
			this._addCriticalItem("sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 1);
			this._addCriticalItem("cockpit", this.getTranslation("BM_CRITS_COCKPIT"), 1, "hd", 2);
			this._addCriticalItem("sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 3);
		} else {
			this._addCriticalItem("life-support", this.getTranslation("BM_CRITS_LIFE_SUPPORT"), 1, "hd", 0);
			this._addCriticalItem("sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 1);
			this._addCriticalItem("cockpit", this.getTranslation("BM_CRITS_COCKPIT"), 1, "hd", 2);
			this._addCriticalItem("sensors", this.getTranslation("BM_CRITS_SENSORS"), 1, "hd", 4);
			this._addCriticalItem("life-support", this.getTranslation("BM_CRITS_LIFE_SUPPORT"), 1, "hd", 5);
		}

		if (_mechType.class.toLowerCase() == "quad") {
			// quad
			// Left Leg Components
			this._addCriticalItem("hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "ra", 0);
			this._addCriticalItem("upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "ra", 1);
			this._addCriticalItem("lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "ra", 2);
			this._addCriticalItem("foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "ra", 3);

			// Right Leg Components
			this._addCriticalItem("hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "la", 0);
			this._addCriticalItem("upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "la", 1);
			this._addCriticalItem("lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "la", 2);
			this._addCriticalItem("foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "la", 3);

		} else {
			// biped
			// Left Arm Components
			this._addCriticalItem("shoulder", this.getTranslation("BM_CRITS_ACTUATOR_SHOULDER"), 1, "la", 0);
			this._addCriticalItem("upper-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_ARM"), 1, "la", 1);
			if (this.hasLowerArmActuator("la")) {
				this._addCriticalItem("lower-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_ARM"), 1, "la", 2);
				if (this.hasHandActuator("la")) {

					this._addCriticalItem("hand-actuator", this.getTranslation("BM_CRITS_ACTUATOR_HAND"), 1, "la", 3);
				}
			}


			// Right Arm Components
			this._addCriticalItem("shoulder", this.getTranslation("BM_CRITS_ACTUATOR_SHOULDER"), 1, "ra", 0);
			this._addCriticalItem("upper-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_ARM"), 1, "ra", 1);
			if (this.hasLowerArmActuator("ra")) {
				this._addCriticalItem("lower-arm-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_ARM"), 1, "ra", 2);
				if (this.hasHandActuator("ra")) {

					this._addCriticalItem("hand-actuator", this.getTranslation("BM_CRITS_ACTUATOR_HAND"), 1, "ra", 3);
				}
			}
		}



		// Engine

		if (
			_engineType &&
			_engineType.criticals &&
			_engineType.criticals[this.getTech().tag] &&
			_engineType.criticals[this.getTech().tag].ct > 3
		) {
			this._addCriticalItem(
				"engine", // item_tag
				_engineType.name[_useLang], // item_name
				3, // critical_count
				"ct" // location
				// slot
			);
		} else {
			// reset back to standard, engine not available for tech
			console.log("warning", "resetting engine to standard ", _engineType.criticals, this.getTech().tag, _tech);
			this.setEngineType("standard");
			this._addCriticalItem(
				"engine", // item_tag
				_engineType.name[_useLang], // item_name
				_engineType.criticals[this.getTech().tag].ct, // critical_count
				"ct" // location
				// slot
			);
		}

		if (
			_engineType.criticals[this.getTech().tag] &&
			_engineType.criticals[this.getTech().tag].rt
		) {
			this._addCriticalItem("engine", _engineType.name[_useLang], _engineType.criticals[this.getTech().tag].rt, "rt");
		}
		if (
			_engineType.criticals[this.getTech().tag] &&
			_engineType.criticals[this.getTech().tag].lt
		) {
			this._addCriticalItem("engine", _engineType.name[_useLang], _engineType.criticals[this.getTech().tag].lt, "lt");
		}

		// Gyro
		this._addCriticalItem(
			"gyro", // item_tag
			_gyro.name[_useLang], // item_name
			_gyro.criticals, // critical_count
			"ct" // location
		);

		// Extra engine bits....
		if (_engineType.criticals[this.getTech().tag].ct > 3) {
			this._addCriticalItem(
				"engine", // item_tag
				_engineType.name[_useLang], // item_name
				_engineType.criticals[this.getTech().tag].ct - 3, // critical_count
				"ct" // location
			);
		}

		// Left Leg Components
		this._addCriticalItem("hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "ll", 0);
		this._addCriticalItem("upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "ll", 1);
		this._addCriticalItem("lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "ll", 2);
		this._addCriticalItem("foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "ll", 3);

		// Right Leg Components
		this._addCriticalItem("hip", this.getTranslation("BM_CRITS_ACTUATOR_HIP"), 1, "rl", 0);
		this._addCriticalItem("upper-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_UPPER_LEG"), 1, "rl", 1);
		this._addCriticalItem("lower-leg-actuator", this.getTranslation("BM_CRITS_ACTUATOR_LOWER_LEG"), 1, "rl", 2);
		this._addCriticalItem("foot-actuator", this.getTranslation("BM_CRITS_ACTUATOR_FOOT"), 1, "rl", 3);

		// Jump Jets
		jump_move = this.getJumpSpeed();
		for (var jmc = 0; jmc < jump_move; jmc++) {
			_unallocatedCriticals.push({
				name: _jumpJetType.name[_useLang],
				tag: "jj-" + _jumpJetType.tag,
				rear: false,
				movable: true,
				crits: _jumpJetType.criticals
			});
		}

		// Armor

		var armorObj = this.getArmorObj();
		if (this.getTech().tag == "clan") {
			if (armorObj.crits.clan > 0) {
				if (armorObj.crit_locs) {
					for (var nameLoc in armorObj.crits_locs) {
						this._addCriticalItem(
							armorObj.tag, // item_tag
							armorObj.name[_useLang], // item_name
							armorObj.crits_loc[nameLoc], // critical_count
							nameLoc // location
							// slot
						);
					}
				} else {
					for (var aCounter = 0; aCounter < armorObj.crits.clan; aCounter++) {
						_unallocatedCriticals.push({
							name: armorObj.name[_useLang],
							tag: armorObj.tag,
							rollAgain: true,
							rear: false,
							crits: 1,
							obj: armorObj,
							movable: true
						});
					}
				}
			}
		} else {
			if (armorObj.crits.is > 0) {
				if (armorObj.crit_locs) {
					for (var nameLoc in armorObj.crits_locs) {
						this._addCriticalItem(
							armorObj.tag, // item_tag
							armorObj.name[_useLang], // item_name
							armorObj.crits_loc[nameLoc], // critical_count
							nameLoc // location
							// slot
						);
					}
				} else {
					for (var aCounter = 0; aCounter < armorObj.crits.is; aCounter++) {
						_unallocatedCriticals.push({
							name: armorObj.name[_useLang],
							tag: armorObj.tag,
							rear: false,
							rollAgain: true,
							crits: 1,
							obj: armorObj,
							movable: true
						});
					}
				}
			}
		}

		// Internal Structure critical Items
		if (this.getTech().tag == "clan") {
			for (var aCounter = 0; aCounter < _selectedInternalStructure.crits.clan; aCounter++) {
				_unallocatedCriticals.push({
					name: _selectedInternalStructure.name[_useLang],
					tag: _selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: _selectedInternalStructure,
					movable: true
				});
			}


		} else {
			for (var aCounter = 0; aCounter < _selectedInternalStructure.crits.is; aCounter++) {
				_unallocatedCriticals.push({
					name: _selectedInternalStructure.name[_useLang],
					tag: _selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: _selectedInternalStructure,
					movable: true
				});
			}
		}


		// Get optional equipment...
		//~ this._calcVariableEquipment();
		for (var elc = 0; elc < _equipmentList.length; elc++) {
			//~ _equipmentList[elc].location = "";
			var rearTag = "";
			if (_equipmentList[elc].rear)
				rearTag = " (" + this.getTranslation("GENERAL_REAR") + ")";


			_unallocatedCriticals.push({
				name: _equipmentList[elc].name[_useLang] + rearTag,
				tag: _equipmentList[elc].tag,
				rear: _equipmentList[elc].rear,
				crits: _equipmentList[elc].space.battlemech,
				obj: _equipmentList[elc],
				movable: true
			});

		}


		// Heat Sink Requirements
		hs_requirements = this.getHeatSinkCriticalRequirements();
		if (hs_requirements.slots_each > 1)
			hs_name = this.getTranslation("BM_CRITS_DOUBLE_HEAT_SINK");
		else
			hs_name = this.getTranslation("BM_CRITS_HEAT_SINK");
		for (var hsc = 0; hsc < hs_requirements.number; hsc++) {

			_unallocatedCriticals.push({
				name: hs_name,
				rear: false,
				tag: "heat-sink",
				crits: hs_requirements.slots_each,
				movable: true
			});
		}



		// Allocate items per allocation table.
		for (alt_c = 0; alt_c < _criticalAllocationTable.length; alt_c++) {
			this._allocateCritical(
				_criticalAllocationTable[alt_c].tag,
				_criticalAllocationTable[alt_c].rear,
				_criticalAllocationTable[alt_c].loc,
				_criticalAllocationTable[alt_c].slot,
				true
			)
		}


		// remove location tag for remaining unallocated
		for (var lCount = 0; lCount < _unallocatedCriticals.length; lCount++) {
			if (_unallocatedCriticals[lCount].obj)
				_unallocatedCriticals[lCount].obj.location = "";
		}

	}

	this.hasHandActuator = function(location) {
		if (location == "ra")
			if (_no_right_arm_hand_actuator)
				return false;
		if (location == "la")
			if (_no_left_arm_hand_actuator)
				return false;
		return true;
	}

	this.localizeLocationAbbreviation = function(locationAbbr) {
		// TODO
		return locationAbbr;
	}

	this.hasLowerArmActuator = function(location) {
		if (location == "ra")
			if (_no_right_arm_lower_actuator)
				return false;
		if (location == "la")
			if (_no_left_arm_lower_actuator)
				return false;
		return true;
	}


	this.removeHandActuator = function(location) {
		if (location == "ra") {
			_no_right_arm_hand_actuator = true;
		}
		if (location == "la") {
			_no_left_arm_hand_actuator = true;
		}
		this.calc();

	}

	this.removeLowerArmActuator = function(location) {
		if (location == "ra") {
			_no_right_arm_hand_actuator = true;
			_no_right_arm_lower_actuator = true;

		}
		if (location == "la") {
			_no_left_arm_hand_actuator = true;
			_no_left_arm_lower_actuator = true;
		}
		this.calc();
	}

	this.addHandActuator = function(location) {
		if (location == "ra") {
			_no_right_arm_hand_actuator = false;
			_no_right_arm_lower_actuator = false;

		}
		if (location == "la") {
			_no_left_arm_hand_actuator = false;
			_no_left_arm_lower_actuator = false;
		}
		this.calc();
	}

	this.addLowerArmActuator = function(location) {
		if (location == "ra") {
			//	_no_right_arm_hand_actuator = false;
			_no_right_arm_lower_actuator = false;

		}
		if (location == "la") {
			//	_no_left_arm_hand_actuator = false;
			_no_left_arm_lower_actuator = false;
		}
		this.calc();
	}

	this.getMaxMovementHeat = function() {
		var maxMoveHeat = 2; // standard run heat.

		if (this.getJumpSpeed() > 2) {
			maxMoveHeat = this.getJumpSpeed();
		}


		// Stealth Armor
		if (this.getArmorType() == "stealth") {
			maxMoveHeat += 10;
		}

		return maxMoveHeat;
	}

	this._addCriticalItem = function(item_tag, item_name, critical_count, location, slot, movable) {
		uuid = generateUUID();
		if (movable != "undefined" && movable != null)
			item = {
				tag: item_tag,
				name: item_name,
				crits: critical_count,
				movable: true,
				uuid: uuid
			};
		else
			item = {
				tag: item_tag,
				name: item_name,
				crits: critical_count,
				movable: false,
				uuid: uuid
			};

		if (typeof(slot) == "undefined" || slot == null)
			slot = null;

		if (typeof(location) != "undefined" && location != null) {
			if (location == "hd") {
				this._assignItemToArea(_criticals.head, item, critical_count, slot);

			} else if (location == "ct") {
				this._assignItemToArea(_criticals.centerTorso, item, critical_count, slot);

			} else if (location == "lt") {
				this._assignItemToArea(_criticals.leftTorso, item, critical_count, slot);

			} else if (location == "rt") {
				this._assignItemToArea(_criticals.rightTorso, item, critical_count, slot);

			} else if (location == "ra") {
				this._assignItemToArea(_criticals.rightArm, item, critical_count, slot);

			} else if (location == "la") {
				this._assignItemToArea(_criticals.leftArm, item, critical_count, slot);

			} else if (location == "rl") {
				this._assignItemToArea(_criticals.rightLeg, item, critical_count, slot);

			} else if (location == "ll") {
				this._assignItemToArea(_criticals.leftLeg, item, critical_count, slot);

			} else {
				return item;
			}

		} else {
			return item;
		}
	}

	this._isNextXCritsAvailable = function(area_array, critical_count, begin_slot) {
		returnValue = true;
		for (isca_c = 0; isca_c < critical_count; isca_c++) {
			if (area_array[begin_slot + isca_c] != null) {
				returnValue = false;
			}
		}
		return returnValue;
	}

	this._assignItemToArea = function(area_array, new_item, critical_count, slot_number) {

		var placeholder = {
			uuid: new_item.uuid,
			name: "placeholder",
			placeholder: true
		};

		if (typeof(slot_number) == "undefined" || slot_number === null) {
			// place anywhere available
			for (array_count = 0; array_count < area_array.length; array_count++) {
				if (area_array[array_count] == null) {
					if (this._isNextXCritsAvailable(area_array, critical_count - 1, array_count + 1)) {
						for (var aita_c = 0; aita_c < critical_count; aita_c++) {
							if (aita_c == 0) {
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
			if (area_array[slot_number] == null) {
				if (this._isNextXCritsAvailable(area_array, critical_count - 1, slot_number + 1)) {

					for (var aita_c = 0; aita_c < critical_count; aita_c++) {
						if (aita_c == 0) {
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


	this.canBeAssignedToArea = function(area_array, new_item, critical_count, slot_number) {

		if (typeof(slot_number) == "undefined" || slot_number === null) {
			// place anywhere available
			for (array_count = 0; array_count < area_array.length; array_count++) {
				if (area_array[array_count] == null) {
					if (this._isNextXCritsAvailable(area_array, critical_count - 1, array_count + 1)) {
						return true;
					}
				}
			}
		} else {
			// at specified slot
			if (area_array[slot_number] == null) {
				if (this._isNextXCritsAvailable(area_array, critical_count - 1, slot_number + 1)) {
					return true;
				}
			}
		}

		return false;
	}

	this._trimCriticals = function() {
		_criticals.head = _criticals.head.slice(0, 6);

		_criticals.centerTorso = _criticals.centerTorso.slice(0, 12);
		_criticals.leftTorso = _criticals.leftTorso.slice(0, 12);
		_criticals.rightTorso = _criticals.rightTorso.slice(0, 12);



		_criticals.rightLeg = _criticals.rightLeg.slice(0, 6);
		_criticals.leftLeg = _criticals.leftLeg.slice(0, 6);

		if (_mechType.class.toLowerCase() == "quad") {
			_criticals.rightArm = _criticals.rightArm.slice(0, 6);
			_criticals.leftArm = _criticals.leftArm.slice(0, 6);
		} else {
			_criticals.rightArm = _criticals.rightArm.slice(0, 12);
			_criticals.leftArm = _criticals.leftArm.slice(0, 12);
		}
	}

	this.getHeatSinksType = function() {
		return _heatSinkType.tag;
	}

	this.getHeatSinksObj = function() {
		return _heatSinkType;
	}


	this.setHeatSinksType = function(newValue) {
		for (var lCounter = 0; lCounter < mechHeatSinkTypes.length; lCounter++) {
			if (mechHeatSinkTypes[lCounter].tag == newValue)
				_heatSinkType = mechHeatSinkTypes[lCounter];
		}

		return _heatSinkType;
	}

	this.getCurrentTonnage = function() {
		return _currentTonnage;
	}

	this.getHeatSinkCriticalRequirements = function() {

		return this.heatSinkCriticals;
	}


	this.getArmorAllocation = function() {
		return _armorAllocation;
	}

	this.getRemainingTonnage = function() {

		return _remainingTonnage;

	}

	this.getMoveHeat = function() {
		return _maxMoveHeat;
	}

	this.getWeaponHeat = function() {
		return _maxWeaponHeat;
	}

	this.getHeatDissipation = function() {
		return _heatDissipation;
	}

	this.getWalkSpeed = function() {
		return _walkSpeed;
	}

	this.setWalkSpeed = function(walkSpeed) {
		_walkSpeed = walkSpeed / 1;
		this.setEngine(_tonnage * _walkSpeed);

		if (_jumpSpeed > _walkSpeed)
			this.setJumpSpeed(_walkSpeed);

		return _walkSpeed;
	}

	this.getRunSpeed = function() {
		return _runSpeed;
	}

	this.getJumpSpeed = function() {
		return _jumpSpeed;
	}

	this.setJumpSpeed = function(jumpSpeed) {
		_jumpSpeed = jumpSpeed / 1;
		this.calc();
		return _walkSpeed;
	}

	this.getArmorWeight = function() {
		return _armorWeight;
	}

	this.getArmorType = function() {
		return _armorType.tag;
	}

	this.getArmorObj = function() {
		return _armorType;
	}


	this.setArmorType = function(armorTag) {
		for (var aCount = 0; aCount < mechArmorTypes.length; aCount++) {
			if (mechArmorTypes[aCount].tag == armorTag) {
				_armorType = mechArmorTypes[aCount];
			}
		}
		return _armorType;
	}

	this.getTotalArmor = function() {
		return _totalArmor;
	}

	this.getUnallocatedArmor = function() {
		return _unallocatedArmor;
	}

	this.setArmorWeight = function(armorWeight) {
		_armorWeight = armorWeight / 1;
		this.calc();
		return _armorWeight;
	}

	this.getEngine = function() {
		return _engine;
	}

	this.setEngine = function(ratingNumber) {
		ratingNumber = ratingNumber / 1;
		for (engine_count = 0; engine_count < mechEngineOptions.length; engine_count++) {
			if (mechEngineOptions[engine_count].rating == ratingNumber) {
				_engine = mechEngineOptions[engine_count];
				this.calc();
				return _engine;
			}
		}
		this.calc();
		return 0;
	}

	this.getInternalStructureType = function() {
		return _selectedInternalStructure.tag;
	}

	this.getInternalStructure = function() {
		return _internalStructure;
	}

	this.setInternalStructureType = function(isTag) {
		for (lCounter = 0; lCounter < mechInternalStructureTypes.length; lCounter++) {
			if (isTag == mechInternalStructureTypes[lCounter].tag) {
				_selectedInternalStructure = mechInternalStructureTypes[lCounter];
				return _selectedInternalStructure;
			}
		}

		return null;
	}


	this.getGyro = function() {
		return _gyro;
	}


	this.getEra = function() {
		return _era;
	}

	this.getCriticals = function() {
		this._trimCriticals();
		return _criticals;
	}


	this.getUnallocatedCriticals = function() {
		return _unallocatedCriticals;
	}



	this.getEra = function() {
		return _era;
	}

	this.setEra = function(eraID) {

		for (lcounter = 0; lcounter < btEraOptions.length; lcounter++) {
			if (eraID == btEraOptions[lcounter].id) {
				_era = btEraOptions[lcounter];
				this.calc();
				return _era;
			}
		}
		return null;
	}


	this.getTech = function() {
		return _tech;
	}

	this.setTech = function(techID) {
		for (lcounter = 0; lcounter < btTechOptions.length; lcounter++) {
			if (techID == btTechOptions[lcounter].id) {
				_tech = btTechOptions[lcounter];
				this.calc();

				// set era to Clan Invasion (id 3) if the techID is 2 (Clan)
				if (techID == 2 && this.getEra().id != 3) {
					this.setEra(3);
				}

				return _tech;
			}
		}
		return null;
	}


	this.getMechType = function() {
		return _mechType;
	}

	this.getAlphaStrikeForceStats = function() {
		return _alphaStrikeForceStats;
	}

	this.getPilot = function() {
		return _pilot;
	}


	this.setPilotName = function(newValue) {
		_pilot.name = newValue;
	}

	this.setPilotPiloting = function(newValue) {
		_pilot.piloting = newValue;
	}

	this.setPilotGunnery = function(newValue) {
		_pilot.gunnery = newValue;
	}


	this.setEngineType = function(engineType) {
		for (lcounter = 0; lcounter < mechEngineTypes.length; lcounter++) {
			if (engineType.toLowerCase() == mechEngineTypes[lcounter].tag) {
				_engineType = mechEngineTypes[lcounter];
				this.calc();
				return _engineType;
			}
		}
		// default to Military Standard if tag not found.
		_engineType = mechEngineTypes[0];
		return _engineType;
	}

	this.setGyroType = function(gyroType) {
		for (lcounter = 0; lcounter < mechGyroTypes.length; lcounter++) {
			if (gyroType.toLowerCase() == mechGyroTypes[lcounter].tag) {
				_gyro = mechGyroTypes[lcounter];
				this.calc();
				return _gyro;
			}
		}
		// default to Military Standard if tag not found.
		_gyro = mechGyroTypes[0];
		return _gyro;
	}

	this.getEngineType = function() {
		return _engineType;
	}


	this.getEngineName = function() {
		if (_engineType.name[_useLang])
			return _engineType.name[_useLang];
		else
			return _engineType.name["en-US"];
	}

	this.getHeatSyncName = function() {

		if (this.heat_sink_type == "single") {
			return this.getTranslation("BM_STEP3_SINGLE_HS");
		} else {
			return this.getTranslation("BM_STEP3_DOUBLE_HS");
		}


	}

	this.getGyroName = function() {
		if (_gyro.name[_useLang])
			return _gyro.name[_useLang];
		else
			return _gyro.name["en-US"];
	}


	this.getName = function() {
		return _make;
	}

	this.setName = function(newValue) {
		_make = newValue;
		return _make;
	}

	this.getTonnage = function() {
		return _tonnage;
	}

	this.setTonnage = function(newValue) {
		_tonnage = parseInt(newValue);

		_internalStructure.head = _selectedInternalStructure.perTon[this.getTonnage()].head;

		_internalStructure.centerTorso = _selectedInternalStructure.perTon[this.getTonnage()].centerTorso;
		_internalStructure.leftTorso = _selectedInternalStructure.perTon[this.getTonnage()].rlTorso;
		_internalStructure.rightTorso = _selectedInternalStructure.perTon[this.getTonnage()].rlTorso;

		_internalStructure.rightArm = _selectedInternalStructure.perTon[this.getTonnage()].rlArm;
		_internalStructure.leftArm = _selectedInternalStructure.perTon[this.getTonnage()].rlArm;

		_internalStructure.rightLeg = _selectedInternalStructure.perTon[this.getTonnage()].rlLeg;
		_internalStructure.leftLeg = _selectedInternalStructure.perTon[this.getTonnage()].rlLeg;

		_maxArmor = 9 + _internalStructure.centerTorso * 2 + _internalStructure.leftTorso * 2 + _internalStructure.rightTorso * 2 + _internalStructure.rightLeg * 2 + _internalStructure.leftLeg * 2;
		if (_mechType.class.toLowerCase() == "biped")
			_maxArmor += _internalStructure.leftArm * 2 + _internalStructure.rightArm * 2;
		else
			_maxArmor += _internalStructure.rightLeg * 2 + _internalStructure.leftLeg * 2;


		if (_mechType.class.toLowerCase() == "quad") {
			_internalStructure.rightArm = _internalStructure.rightLeg;
			_internalStructure.leftArm = _internalStructure.leftLeg;
		}

		_maxArmorTonnage = _maxArmor / 16;

		_totalInternalStructurePoints = 0;

		_totalInternalStructurePoints += _internalStructure.head;

		_totalInternalStructurePoints += _internalStructure.centerTorso;
		_totalInternalStructurePoints += _internalStructure.leftTorso;
		_totalInternalStructurePoints += _internalStructure.rightTorso;

		_totalInternalStructurePoints += _internalStructure.rightArm;
		_totalInternalStructurePoints += _internalStructure.leftArm;

		_totalInternalStructurePoints += _internalStructure.rightLeg;
		_totalInternalStructurePoints += _internalStructure.leftLeg;

		this.setWalkSpeed(_walkSpeed);
		this.calc();

		return _tonnage;
	}


	this.getMaxArmorTonnage = function() {
		return _maxArmorTonnage;
	}

	this.getMaxArmor = function() {
		return _maxArmor;
	}


	this.getType = function() {
		return _mechType;
	}

	this.setType = function(newValue) {
		_mechType = newValue;
		this.setTonnage(_tonnage);
		this.calc();
		return _mechType;
	}



	this.exportJSON = function() {
		// TODO
		this.calc();
		var exportObject = {};
		exportObject.name = this.getName();
		exportObject.tonnage = this.getTonnage();
		exportObject.walkSpeed = _walkSpeed;
		exportObject.jumpSpeed = _jumpSpeed;
		exportObject.engineType = this.getEngineType().tag;

		exportObject.mechType = _mechType.id;
		exportObject.era = _era.id;
		exportObject.tech = _tech.id;

		exportObject.gyro = _gyro.tag;

		exportObject.is_type = this.getInternalStructureType();

		exportObject.additionalHeatSinks = _additionalHeatSinks;
		exportObject.heat_sink_type = this.getHeatSinksType();

		exportObject.armor_weight = _armorWeight;
		if (!_uuid)
			_uuid = generateUUID();

		exportObject.uuid = _uuid;

		exportObject.strict_era = _strictEra;

		exportObject.armor_allocation = _armorAllocation;

		exportObject.armor_type = this.getArmorType();

		exportObject.equipment = Array();

		for (eq_count = 0; eq_count < _equipmentList.length; eq_count++) {
			exportObject.equipment.push({
				tag: _equipmentList[eq_count].tag,
				loc: _equipmentList[eq_count].location,
				rear: _equipmentList[eq_count].rear
			});
		}

		exportObject.allocation = _criticalAllocationTable;
		exportObject.features = Array();
		if (!this.hasLowerArmActuator("la"))
			exportObject.features.push("no_lala");
		if (!this.hasLowerArmActuator("ra"))
			exportObject.features.push("no_rala");
		if (!this.hasHandActuator("la"))
			exportObject.features.push("no_laha");
		if (!this.hasHandActuator("ra"))
			exportObject.features.push("no_raha");
		if (_smallCockpit)
			exportObject.features.push("sm_cockpit");

		exportObject.pilot = _pilot;

		exportObject.as_role = _alphaStrikeForceStats.role;
		exportObject.as_custom_name = _alphaStrikeForceStats.customName;

		return JSON.stringify(exportObject);
	}

	this.getInteralStructure = function() {
		return _internalStructure;
	}

	this.setASRole = function(newValue) {
		return _alphaStrikeForceStats.role = newValue;
	}

	this.setASCustomName = function(newValue) {
		return _alphaStrikeForceStats.customName = newValue;
	}

	this.getASCustomName = function(newValue) {
		return _alphaStrikeForceStats.customName;
	}


	this.importJSON = function(json_string) {
		// TODO

		try {
			importObject = JSON.parse(json_string);
		} catch (err) {
			return false;
		}

		if (typeof(importObject) == "object") {
			this.setName(importObject.name);
			//~ console.log( "importObject.mechType", importObject.mechType );
			if (importObject.mechType)
				this.setMechType(importObject.mechType);

			this.setTonnage(importObject.tonnage);

			if (importObject.era)
				this.setEra(importObject.era);

			if (importObject.tech)
				this.setTech(importObject.tech);

			if (importObject.pilot)
				_pilot = importObject.pilot;

			if (importObject.as_role)
				this.setASRole(importObject.as_role);

			if (importObject.armor_type)
				this.setArmorType(importObject.armor_type);

			if (importObject.as_custom_name)
				this.setASCustomName(importObject.as_custom_name);

			if (importObject.is_type)
				this.setInternalStructureType(importObject.is_type);

			if (importObject.walkSpeed)
				this.setWalkSpeed(importObject.walkSpeed);

			if (importObject.jumpSpeed)
				this.setJumpSpeed(importObject.jumpSpeed);

			if (typeof(importObject.strict_era) != "undefined") {
				if (importObject.strict_era)
					_strictEra = 1;
				else
					_strictEra = 0;
			}

			if (importObject.gyro)
				this.setGyroType(importObject.gyro);

			if (importObject.engineType)
				this.setEngineType(importObject.engineType);

			if (importObject.additionalHeatSinks)
				this.setAdditionalHeatSinks(importObject.additionalHeatSinks);

			if (importObject.heat_sink_type)
				this.setHeatSinksType(importObject.heat_sink_type);



			if (importObject.armor_weight)
				this.setArmorWeight(importObject.armor_weight);

			if (importObject.armor_allocation)
				_armorAllocation = importObject.armor_allocation;

			if (importObject.uuid)
				_uuid = importObject.uuid;


			if (importObject.features) {


				// Lower Arm Actuators
				if (importObject.features.indexOf("no_rala") > -1)
					this.removeLowerArmActuator("ra");
				if (importObject.features.indexOf("no_lala") > -1)
					this.removeLowerArmActuator("la");

				// Hand Actuators
				if (importObject.features.indexOf("no_raha") > -1)
					this.removeHandActuator("ra");
				if (importObject.features.indexOf("no_laha") > -1)
					this.removeHandActuator("la");

				// Small Cockpit
				if (importObject.features.indexOf("sm_cockpit") > -1)
					_smallCockpit = true;

				// Other features
			}

			if (importObject.equipment) {
				for (eq_count = 0; eq_count < importObject.equipment.length; eq_count++) {

					import_item = importObject.equipment[eq_count];
					// if( this.getTech().tag == "is")
					// 	this.addEquipmentFromTag( import_item.tag, import_item.loc );
					// if( this.getTech().tag == "clan")
					// 	this.addEquipmentFromTag( import_item.tag), null, import_item.loc );
					if (import_item.rear && import_item.rear > 0)
						import_item.rear = true;
					else
						import_item.rear = false;
					this.addEquipmentFromTag(import_item.tag, this.getTech().tag, import_item.loc, import_item.rear);
				}
			}

			if (importObject.allocation) {
				_criticalAllocationTable = importObject.allocation;

				for (var eq_count = 0; eq_count < _criticalAllocationTable.length; eq_count++) {
					if (!_criticalAllocationTable[eq_count].rear)
						_criticalAllocationTable[eq_count].rear = false;
					else
						_criticalAllocationTable[eq_count].rear = true;
				}
			}

			if (!_useLang && localStorage["tmp.preferred_language"])
				_useLang = localStorage["tmp.preferred_language"];

			this.calc();
			return true;
		} else {
			return false;
		}

	}

	this.getWeightBreakdown = function() {
		return _weights;
	}

	this.setCenterTorsoArmor = function(armorValue) {
		_armorAllocation.centerTorso = armorValue / 1;
		this.calc();
		return _armorAllocation.centerTorso;
	}

	this.setCenterTorsoRearArmor = function(armorValue) {
		_armorAllocation.centerTorsoRear = armorValue / 1;
		this.calc();
		return _armorAllocation.centerTorsoRear;
	}

	this.setHeadArmor = function(armorValue) {
		_armorAllocation.head = armorValue / 1;
		this.calc();
		return _armorAllocation.head;
	}

	this.setLeftArmArmor = function(armorValue) {
		_armorAllocation.leftArm = armorValue / 1;
		this.calc();
		return _armorAllocation.leftArm;
	}

	this.setLeftLegArmor = function(armorValue) {
		_armorAllocation.leftLeg = armorValue / 1;
		this.calc();
		return _armorAllocation.leftLeg;
	}

	this.setLeftTorsoArmor = function(armorValue) {
		_armorAllocation.leftTorso = armorValue / 1;
		this.calc();
		return _armorAllocation.leftTorso;
	}

	this.setLeftTorsoRearArmor = function(armorValue) {
		_armorAllocation.leftTorsoRear = armorValue / 1;
		this.calc();
		return _armorAllocation.leftTorsoRear;
	}

	this.setRightArmArmor = function(armorValue) {
		_armorAllocation.rightArm = armorValue / 1;
		this.calc();
		return _armorAllocation.rightArm;
	}

	this.setRightLegArmor = function(armorValue) {
		_armorAllocation.rightLeg = armorValue / 1;
		this.calc();
		return _armorAllocation.rightLeg;
	}

	this.setRightTorsoArmor = function(armorValue) {
		_armorAllocation.rightTorso = armorValue / 1;
		this.calc();
		return _armorAllocation.rightTorso;
	}

	this.setRightTorsoRearArmor = function(armorValue) {
		_armorAllocation.rightTorsoRear = armorValue / 1;
		this.calc();
		return _armorAllocation.rightTorsoRear;
	}

	this.getAdditionalHeatSinks = function() {
		return _additionalHeatSinks;
	};


	this.addEquipment = function(equipment_index, equipment_list_tag, location, rear) {
		equipment_list = Array();
		if (equipment_list_tag == "is") {
			equipment_list = mechISEquipment;

		}

		if (equipment_list_tag == "clan") {
			equipment_list = mechClanEquipment;
		}

		if (equipment_list[equipment_index]) {
			if (typeof(jQuery) != "undefined") {
				equipment_item = jQuery.extend({}, equipment_list[equipment_index]);
			}
			if (typeof(angular) != "undefined") {
				equipment_item = angular.copy(equipment_list[add_counter]);
			}
			if (typeof(location) != "undefined")
				equipment_item.location = location;
			if (typeof(rear) != "undefined")
				equipment_item.rear = rear;
			else
				equipment_item.rear = false;
			_equipmentList.push(equipment_item);
			return equipment_item;
		}

		return null;
	};

	this.addEquipmentFromTag = function(equipment_tag, equipment_list_tag, location, rear) {
		equipment_list = Array();

		if (!equipment_list_tag) {
			equipment_list_tag = _tech.tag;
		}

		if (equipment_list_tag == "is") {
			equipment_list = mechISEquipment;

		}

		if (equipment_list_tag == "clan") {
			equipment_list = mechClanEquipment;
		}

		for (add_counter = 0; add_counter < equipment_list.length; add_counter++) {
			if (equipment_tag == equipment_list[add_counter].tag) {
				if (typeof(jQuery) != "undefined") {
					equipment_item = jQuery.extend({}, equipment_list[equipment_index]);
				}
				if (typeof(angular) != "undefined") {
					equipment_item = angular.copy(equipment_list[add_counter]);
				}
				if (typeof(location) != "undefined")
					equipment_item.location = location;
				equipment_item.rear = rear;
				_equipmentList.push(equipment_item);
				return equipment_item;
			}
		}

		return null;
	};

	this.removeEquipment = function(equipment_index) {
		if (_equipmentList[equipment_index]) {
			_equipmentList.splice(equipment_index, 1);
			return 1;
		}
		return null;
	};

	this.setRear = function(equipment_index, newValue) {
		if (_equipmentList[equipment_index]) {
			_equipmentList[equipment_index].rear = newValue;
		}
		return _equipmentList[equipment_index].rear;
	};

	this.updateCriticalAllocationTable = function() {
		_criticalAllocationTable = Array();
		for (mech_location in _criticals) {

			for (var crit_item_counter = 0; crit_item_counter < _criticals[mech_location].length; crit_item_counter++) {
				if (
					_criticals[mech_location] &&
					_criticals[mech_location][crit_item_counter] &&
					_criticals[mech_location][crit_item_counter].movable
				) {
					short_loc = "";
					if (mech_location == "head") {
						short_loc = "hd";
					} else if (mech_location == "centerTorso") {
						short_loc = "ct";
					} else if (mech_location == "rightTorso") {
						short_loc = "rt";
					} else if (mech_location == "rightLeg") {
						short_loc = "rl";
					} else if (mech_location == "rightArm") {
						short_loc = "ra";
					} else if (mech_location == "leftTorso") {
						short_loc = "lt";
					} else if (mech_location == "leftLeg") {
						short_loc = "ll";
					} else if (mech_location == "leftArm") {
						short_loc = "la";
					}

					var rear = false;
					if (_criticals[mech_location][crit_item_counter].rear || (_criticals[mech_location][crit_item_counter].obj && _criticals[mech_location][crit_item_counter].obj.rear))
						rear = true;

					if (_criticals[mech_location][crit_item_counter] && _criticals[mech_location][crit_item_counter].obj)
						_criticals[mech_location][crit_item_counter].obj.location = short_loc;

					_criticalAllocationTable.push({
						tag: _criticals[mech_location][crit_item_counter].tag,
						loc: short_loc,
						rear: rear,
						slot: crit_item_counter
					});
				}
			}
		}
		// this.calc();


	};

	this.moveCritical = function(itemTag, itemRear, fromLocation, fromIndex, toLocation, toIndex) {



		fromItem = null
		fromLocationObj = null;
		if (fromLocation == "un") {
			if (_unallocatedCriticals[fromIndex]) {
				fromItem = _unallocatedCriticals[fromIndex];

			}
			fromLocationObj = _unallocatedCriticals;
		} else if (fromLocation == "hd") {
			if (_criticals.head[fromIndex]) {
				fromItem = _criticals.head[fromIndex];
				fromLocationObj = _criticals.head;
			}
		} else if (fromLocation == "ct") {
			if (_criticals.centerTorso[fromIndex]) {
				fromItem = _criticals.centerTorso[fromIndex];
				fromLocationObj = _criticals.centerTorso;
			}
		} else if (fromLocation == "rt") {
			if (_criticals.rightTorso[fromIndex]) {
				fromItem = _criticals.rightTorso[fromIndex];
				fromLocationObj = _criticals.rightTorso;
			}
		} else if (fromLocation == "ra") {
			if (_criticals.rightArm[fromIndex]) {
				fromItem = _criticals.rightArm[fromIndex];
				fromLocationObj = _criticals.rightArm;
			}
		} else if (fromLocation == "rl") {
			if (_criticals.rightLeg[fromIndex]) {
				fromItem = _criticals.rightLeg[fromIndex];
				fromLocationObj = _criticals.rightLeg;
			}
		} else if (fromLocation == "lt") {
			if (_criticals.leftTorso[fromIndex]) {
				fromItem = _criticals.leftTorso[fromIndex];
				fromLocationObj = _criticals.leftTorso;
			}
		} else if (fromLocation == "la") {
			if (_criticals.leftArm[fromIndex]) {
				fromItem = _criticals.leftArm[fromIndex];
				fromLocationObj = _criticals.leftArm;
			}
		} else if (fromLocation == "ll") {
			if (_criticals.leftLeg[fromIndex]) {
				fromItem = _criticals.leftLeg[fromIndex];
				fromLocationObj = _criticals.leftLeg;
			}
		}

		;

		if (fromItem) {

			if (toLocation == "hd") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.head, toIndex);
			} else if (toLocation == "ct") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.centerTorso, toIndex);
			} else if (toLocation == "rt") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.rightTorso, toIndex);
			} else if (toLocation == "rl") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.rightLeg, toIndex);
			} else if (toLocation == "ra") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.rightArm, toIndex);
			} else if (toLocation == "lt") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.leftTorso, toIndex);
			} else if (toLocation == "ll") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.leftLeg, toIndex);
			} else if (toLocation == "la") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, _criticals.leftArm, toIndex);
			}
		}

		return false;
	};

	this._moveItemToArea = function(fromLocation, itemRear, fromItem, fromIndex, toLocation, toIndex) {


		// Step One check to see if TO has enough slots for item....
		var placeholder = {
			uuid: fromItem.uuid,
			name: "placeholder",
			placeholder: true
		};


		hasSpace = true;
		if (toLocation.length < toIndex + fromItem.crits)
			return false;
		for (var testC = 0; testC < fromItem.crits; testC++) {
			if (toLocation[toIndex + testC]) {
				hasSpace = false;
			}
		}

		if (hasSpace) {
			toLocation[toIndex] = fromItem;
			for (var phC = 1; phC < toLocation[toIndex].crits; phC++) {
				toLocation[toIndex + phC] = placeholder;
			}


			fromLocation[fromIndex] = null;
			nextCounter = 1;
			while (
				fromLocation[fromIndex + nextCounter] &&
				fromLocation[fromIndex + nextCounter].name == "placeholder" &&
				nextCounter < fromLocation.length
			) {
				fromLocation[fromIndex + nextCounter] = null;
				nextCounter++;
			}
			return true;

		}

		return false;

	}

	this._allocateCritical = function(equipment_tag, equipment_rear, mech_location, slot_number, remove_from_unallocated) {

		for (uaet_c = 0; uaet_c < _unallocatedCriticals.length; uaet_c++) {

			if (
				equipment_tag == _unallocatedCriticals[uaet_c].tag &&
				_unallocatedCriticals[uaet_c].rear == equipment_rear
			) {
				if (_unallocatedCriticals[uaet_c] && _unallocatedCriticals[uaet_c].obj)
					_unallocatedCriticals[uaet_c].obj.location = mech_location;

				if (mech_location == "hd") {
					this._assignItemToArea(_criticals.head, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "ct") {
					this._assignItemToArea(_criticals.centerTorso, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "rt") {
					this._assignItemToArea(_criticals.rightTorso, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "rl") {
					this._assignItemToArea(_criticals.rightLeg, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "ra") {
					this._assignItemToArea(_criticals.rightArm, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "lt") {
					this._assignItemToArea(_criticals.leftTorso, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "ll") {
					this._assignItemToArea(_criticals.leftLeg, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "la") {
					this._assignItemToArea(_criticals.leftArm, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				}


				if (remove_from_unallocated) {
					_unallocatedCriticals.splice(uaet_c, 1);
				}

				return true;
			}
		}
		return null;
	};

	this.clearHeatSinkCriticals = function() {
		for (alloc_c = _criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
			if (_criticalAllocationTable[alloc_c] && _criticalAllocationTable[alloc_c].tag == "heat-sink")
				_criticalAllocationTable.splice(alloc_c, 1);
		}

		this.calc();
	};

	this.clearArmCriticalAllocationTable = function() {
		for (alloc_c = _criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
			if (
				_criticalAllocationTable[alloc_c] && _criticalAllocationTable[alloc_c].loc == "ra" ||
				_criticalAllocationTable[alloc_c] && _criticalAllocationTable[alloc_c].loc == "la"
			) {
				_criticalAllocationTable.splice(alloc_c, 1);
			}
		}
		this.calc();
	}

	this.clearCriticalAllocationTable = function() {
		_criticalAllocationTable = Array();

		this.calc();

	}

	this.setEquipmentLocation = function(equipment_index, location) {
		if (_equipmentList[equipment_index]) {
			_equipmentList[equipment_index].location = location;
			return _equipmentList[equipment_index];
		}
		return null;
	};

	this.setAdditionalHeatSinks = function(newValue) {
		_additionalHeatSinks = newValue / 1;
		this.calc();
		return _additionalHeatSinks;
	};

	this.getUnallocatedCritCount = function() {
		return _unallocatedCriticals.length;
	}

	this.getInstalledEquipment = function() {
		this._calcVariableEquipment();
		return _equipmentList;
	};

	this._calcVariableEquipment = function() {
		for( var eqC = 0; eqC < _equipmentList.length; eqC++) {
			if( _equipmentList[ eqC ].variable_size ) {
				//~ console.log( " _equipmentList[ eqC ]",  _equipmentList[ eqC ]);
				_equipmentList[ eqC ].criticals_divisior
					_equipmentList[ eqC ].criticals = Math.ceil( this.getTonnage() / _equipmentList[ eqC ].criticals_divisior );
				_equipmentList[ eqC ].weight_divisior
					_equipmentList[ eqC ].weight = Math.ceil( this.getTonnage() / _equipmentList[ eqC ].weight_divisior );
				_equipmentList[ eqC ].damage_divisior
					_equipmentList[ eqC ].damage = Math.ceil( this.getTonnage() / _equipmentList[ eqC ].damage_divisior );
				_equipmentList[ eqC ].criticals_divisior
					_equipmentList[ eqC ].space.battlemech = Math.ceil( this.getTonnage() / _equipmentList[ eqC ].criticals_divisior );

				if( _equipmentList[ eqC ].battlevalue_per_item_damage )
					_equipmentList[ eqC ].battlevalue = _equipmentList[ eqC ].battlevalue_per_item_damage * _equipmentList[ eqC ].damage;
				if( _equipmentList[ eqC ].cost_per_item_ton )
					_equipmentList[ eqC ].cbills = _equipmentList[ eqC ].cost_per_item_ton * _equipmentList[ eqC ].weight;
				//~ console.log( " _equipmentList[ eqC ]",  _equipmentList[ eqC ]);
			}
		}
	}
}
