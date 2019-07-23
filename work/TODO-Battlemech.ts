
	calcAlphaStrike() {

		this.alphaStrikeForceStats.name = this.name;
		//~ alphaStrikeForceStats.model  = _model;
		this.alphaStrikeForceStats.move = this.getWalkSpeed() * 2;
		this.alphaStrikeForceStats.jumpMove = this.getJumpSpeed() * 2;
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

		this.alphaStrikeForceStats.getAbilityCode(abilityCode) {
			for (var abiC = 0; abiC < alphaStrikeForceStats.abilityCodes.length; abiC++) {
				if (abilityCode.toLowerCase().trim() == alphaStrikeForceStats.abilityCodes[abiC].toLowerCase().trim()) {
					return alphaStrikeForceStats.abilityCodes[abiC];
				}
			}

			return null;
		}

		this.alphaStrikeForceStats.addAbilityCode(abilityCode, abilityValue) {

			this.alphaStrikeForceStats.abilityCodes.push({
				code: abilityCode,
				value: abilityValue
			});


		}


		let calcLogAS = "";

		// TODO - calculations
		calcLogAS += "Tonnage is " + _tonnage + "<br />\n";
		if (_tonnage > 100) {
			this.alphaStrikeForceStats.size_class = 4;
			this.alphaStrikeForceStats.size_class_name = "Superheavy";
			this.alphaStrikeForceStats.special_unit_abilities.push("LG");
			calcLogAS += "<strong>Setting Size to 4 (Superheavy)</strong><br />\n";
		} else if (_tonnage >= 80) {
			this.alphaStrikeForceStats.size_class = 4;
			this.alphaStrikeForceStats.size_class_name = "Assault";
			calcLogAS += "<strong>Setting Size to 4 (Assault)</strong><br />\n";
		} else if (_tonnage >= 60) {
			this.alphaStrikeForceStats.size_class = 3;
			this.alphaStrikeForceStats.size_class_name = "Heavy";
			calcLogAS += "<strong>Setting Size to 3 (Heavy)</strong><br />\n";
		} else if (_tonnage >= 40) {
			this.alphaStrikeForceStats.size_class = 2;
			this.alphaStrikeForceStats.size_class_name = "Medium";
			calcLogAS += "<strong>Setting Size to 2 (Medium)</strong><br />\n";
		} else {
			this.alphaStrikeForceStats.size_class = 1;
			this.alphaStrikeForceStats.size_class_name = "Light";
			calcLogAS += "<strong>Setting Size to 1 (Light)</strong><br />\n";
		}

		this.alphaStrikeForceStats.armor = (this.getTotalArmor() / 30).toFixed(0);
		calcLogAS += "Converting total armor of " + this.getTotalArmor() + "<br />\n";
		calcLogAS += "<strong>Setting Armor to " + alphaStrikeForceStats.armor + "</strong><br />\n";

		if (this.getTech().tag == "is") {


			switch (_engineType.tag) {
				case "compact":
					// Compact

					if (_tonnage == 100) {
						this.alphaStrikeForceStats.structure = 10;
					} else if (_tonnage >= 95) {
						this.alphaStrikeForceStats.structure = 10;
					} else if (_tonnage >= 90) {
						this.alphaStrikeForceStats.structure = 10;
					} else if (_tonnage >= 85) {
						this.alphaStrikeForceStats.structure = 9;
					} else if (_tonnage >= 80) {
						this.alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 75) {
						this.alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 70) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 65) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 60) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 55) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 50) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 45) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 40) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 35) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 30) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 25) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 20) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 15) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 10) {
						this.alphaStrikeForceStats.structure = 1;
					}
					calcLogAS += "Engine is an IS Compact Engine <strong>setting structure to " + alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				case "xl":
					// XL
					if (_tonnage == 100) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 95) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 90) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 85) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 80) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 75) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 70) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 65) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 60) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 55) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 50) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 45) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 40) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 35) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 30) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 25) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 20) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 15) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						this.alphaStrikeForceStats.structure = 1;
					}
					calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				case "light":
					// Compact
					if (_tonnage == 100) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 95) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 90) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 85) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 80) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 75) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 70) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 65) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 60) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 55) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 50) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 45) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 40) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 35) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 30) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 25) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 20) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 15) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						this.alphaStrikeForceStats.structure = 1;
					}
					calcLogAS += "Engine is an IS Light Engine <strong>setting structure to " + alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				default:
					// Standard
					if (_tonnage == 100) {
						this.alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 95) {
						this.alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 90) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 85) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 80) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 75) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 70) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 65) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 60) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 55) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 50) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 45) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 40) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 35) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 30) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 25) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 20) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 15) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						this.alphaStrikeForceStats.structure = 1;
					}
					calcLogAS += "Engine is an IS Standard Engine <strong>setting structure to " + alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
			}
		} else {
			// Clan Engines...
			switch (_engineType.tag) {
				case "xl":
				case "clan-xl":
					// Compact
					if (_tonnage == 100) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 95) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 90) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 85) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 80) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 75) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 70) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 65) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 60) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 55) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 50) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 45) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 40) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 35) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 30) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 25) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 20) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 15) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						this.alphaStrikeForceStats.structure = 1;
					}
					calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + alphaStrikeForceStats.structure + "</strong><br />\n";
					break;
				default:
					// Standard / Standard Fusion
					if (_tonnage == 100) {
						this.alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 95) {
						this.alphaStrikeForceStats.structure = 8;
					} else if (_tonnage >= 90) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 85) {
						this.alphaStrikeForceStats.structure = 7;
					} else if (_tonnage >= 80) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 75) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 70) {
						this.alphaStrikeForceStats.structure = 6;
					} else if (_tonnage >= 65) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 60) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 55) {
						this.alphaStrikeForceStats.structure = 5;
					} else if (_tonnage >= 50) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 45) {
						this.alphaStrikeForceStats.structure = 4;
					} else if (_tonnage >= 40) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 35) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 30) {
						this.alphaStrikeForceStats.structure = 3;
					} else if (_tonnage >= 25) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 20) {
						this.alphaStrikeForceStats.structure = 2;
					} else if (_tonnage >= 15) {
						this.alphaStrikeForceStats.structure = 1;
					} else if (_tonnage >= 10) {
						this.alphaStrikeForceStats.structure = 1;
					}
					calcLogAS += "Engine is a Clan Standard Engine <strong>setting structure to " + alphaStrikeForceStats.structure + "</strong><br />\n";

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

		for (let weapon_counter = 0; weapon_counter < this.equipmentList.length; weapon_counter++) {
			if (this.equipmentList[weapon_counter].alphaStrike) {
				if (this.equipmentList[weapon_counter].alphaStrike.rangeLong > 0) {
					total_weapon_heat_long += this.equipmentList[weapon_counter].alphaStrike.heat;
				}

				if (this.equipmentList[weapon_counter].explosive)
					has_explosive = true;

				if (this.equipmentList[weapon_counter].rear) {
					calcLogAS += "Adding <strong>rear</strong> Weapon " + this.equipmentList[weapon_counter].tag + " - ";
					calcLogAS += " (" + this.equipmentList[weapon_counter].alphaStrike.rangeShort + ", ";
					calcLogAS += this.equipmentList[weapon_counter].alphaStrike.rangeMedium + ", ";
					calcLogAS += this.equipmentList[weapon_counter].alphaStrike.rangeLong + ", ";
					calcLogAS += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme + ")<br />\n";
					rearDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
					rearDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
					rearDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
					rearDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
				} else {

					this.alphaStrikeForceStats.damage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
					this.alphaStrikeForceStats.damage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
					this.alphaStrikeForceStats.damage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
					this.alphaStrikeForceStats.damage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;

					calcLogAS += "Adding Weapon " + this.equipmentList[weapon_counter].tag + " - ";
					calcLogAS += " (" + this.equipmentList[weapon_counter].alphaStrike.rangeShort + ", ";
					calcLogAS += this.equipmentList[weapon_counter].alphaStrike.rangeMedium + ", ";
					calcLogAS += this.equipmentList[weapon_counter].alphaStrike.rangeLong + ", ";
					calcLogAS += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme + ")<br />\n";
					total_weapon_heat += this.equipmentList[weapon_counter].alphaStrike.heat;

				}

				if ( this.equipmentList[weapon_counter].alphaStrike.notes && this.equipmentList[weapon_counter].alphaStrike.notes.length && this.equipmentList[weapon_counter].alphaStrike.notes.length > 0) {
					for (var nC = 0; nC < this.equipmentList[weapon_counter].alphaStrike.notes.length; nC++) {
						if (alphaStrikeForceStats.abilityCodes.indexOf(this.equipmentList[weapon_counter].alphaStrike.notes[nC]) === -1) {
							this.alphaStrikeForceStats.abilityCodes.push(this.equipmentList[weapon_counter].alphaStrike.notes[nC]);
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "mel") {
							this.alphaStrikeForceStats.special_unit_abilities.push( "MEL" );
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "heat") {
							heatDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
							heatDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
							heatDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
							heatDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "lrm") {
							lrmDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
							lrmDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
							lrmDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
							lrmDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "ac") {
							acDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
							acDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
							acDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
							acDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "flak") {
							flakDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
							flakDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
							flakDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
							flakDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "srm") {

							indirectFireRating += this.equipmentList[weapon_counter].alphaStrike.rangeLong;

						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "indirect fire" || this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "if") {
							srmDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
							srmDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
							srmDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
							srmDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
						}

						if (this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "missile" || this.equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() == "msl") {
							mslDamage.short += this.equipmentList[weapon_counter].alphaStrike.rangeShort;
							mslDamage.medium += this.equipmentList[weapon_counter].alphaStrike.rangeMedium;
							mslDamage.long += this.equipmentList[weapon_counter].alphaStrike.rangeLong;
							mslDamage.extreme += this.equipmentList[weapon_counter].alphaStrike.rangeExtreme;
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

			calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"/" + this.getJumpSpeed() * 2 + "\"J</strong><br />\n";
		} else {
			move_heat += 2;
			calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"</strong><br />\n";
		}

		// if there are no explosive components, then the mech gets the ENE ability :)
		if (!has_explosive) {
			this.alphaStrikeForceStats.abilityCodes.push("ENE");
			calcLogAS += "Mech has no explosive components, gets ENE ability<br />\n";
		}

		var heatDissipation = 0;

		heatDissipation += (10 + _additionalHeatSinks) * _heatSinkType.dissipation;


		var max_heat_output = move_heat + total_weapon_heat;
		var overheat_value = move_heat + total_weapon_heat - heatDissipation;
		var long_overheat_value = move_heat + total_weapon_heat_long - heatDissipation;

		//~ var before_heat_rangeShort = alphaStrikeForceStats.damage.short.toFixed(0) /1;
		//~ var before_heat_rangeMedium = alphaStrikeForceStats.damage.medium.toFixed(0) /1;
		//~ var before_heat_rangeLong = alphaStrikeForceStats.damage.long.toFixed(0) /1;
		//~ var before_heat_rangeExtreme = alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

		//~ alphaStrikeForceStats.heat_damage = alphaStrikeForceStats.damage;

		var final_overheat_value = 0;
		if (overheat_value > 3) {
			// Heat Modified Damage, p115 AS companion
			var heat_damage_short = 0;
			var heat_damage_medium = 0;
			if (alphaStrikeForceStats.damage.short != "0*")
				heat_damage_short = Math.ceil((alphaStrikeForceStats.damage.short * heatDissipation) / (max_heat_output - 4));
			if (alphaStrikeForceStats.damage.medium != "0*")
				heat_damage_medium = Math.ceil((alphaStrikeForceStats.damage.medium * heatDissipation) / (max_heat_output - 4));


			if (alphaStrikeForceStats.damage.short != "0*")
				this.alphaStrikeForceStats.damage.short = Math.ceil(alphaStrikeForceStats.damage.short);
			if (alphaStrikeForceStats.damage.medium != "0*")
				this.alphaStrikeForceStats.damage.medium = Math.ceil(alphaStrikeForceStats.damage.medium);
			//~ if( alphaStrikeForceStats.damage.short != "0*")
			//~ alphaStrikeForceStats.damage.long = Math.ceil( alphaStrikeForceStats.damage.long );
			//~ if( alphaStrikeForceStats.damage.medium != "0*")
			//~ alphaStrikeForceStats.damage.extreme =  Math.ceil( alphaStrikeForceStats.damage.extreme );


			//~ console.log( "damage.short", alphaStrikeForceStats.damage.short );
			//~ console.log( "heat_damage_short", heat_damage_short );
			//~ console.log( "damage.medium", alphaStrikeForceStats.damage.medium );
			//~ console.log( "heat_damage_medium", heat_damage_medium );


			if (alphaStrikeForceStats.damage.medium != "0*" && heat_damage_medium < alphaStrikeForceStats.damage.medium) {
				final_overheat_value = alphaStrikeForceStats.damage.medium - heat_damage_medium;
				this.alphaStrikeForceStats.damage.medium = alphaStrikeForceStats.damage.medium - final_overheat_value;
				this.alphaStrikeForceStats.damage.short = alphaStrikeForceStats.damage.short - final_overheat_value;
			}
			//~ console.log( "final_overheat_value", final_overheat_value );



		} else {
			if (alphaStrikeForceStats.damage.short != "0*")
				this.alphaStrikeForceStats.damage.short = Math.ceil(alphaStrikeForceStats.damage.short);
			if (alphaStrikeForceStats.damage.medium != "0*")
				this.alphaStrikeForceStats.damage.medium = Math.ceil(alphaStrikeForceStats.damage.medium);
			//~ if( alphaStrikeForceStats.damage.short != "0*")
			//~ alphaStrikeForceStats.damage.long = Math.ceil( alphaStrikeForceStats.damage.long );
			//~ if( alphaStrikeForceStats.damage.medium != "0*")
			//~ alphaStrikeForceStats.damage.extreme =  Math.ceil( alphaStrikeForceStats.damage.extreme );

		}

		var final_long_overheat_value = 0;

		//~ console.log( "alphaStrikeForceStats.damage", alphaStrikeForceStats.damage );

		if (long_overheat_value > 4) {

			//~ console.log( "long_overheat_value", long_overheat_value );

			if (alphaStrikeForceStats.damage.long != "0*") {
				//~ alphaStrikeForceStats.heat_damage.long = alphaStrikeForceStats.damage.long;
				var heat_damage_long = alphaStrikeForceStats.damage.long;
				var heat_damage_extreme = alphaStrikeForceStats.damage.extreme;

				this.alphaStrikeForceStats.damage.long = Math.ceil((alphaStrikeForceStats.damage.long * heatDissipation) / (total_weapon_heat_long - 4));
				this.alphaStrikeForceStats.damage.extreme = Math.ceil((alphaStrikeForceStats.damage.long * heatDissipation) / (total_weapon_heat_long - 4));

				//~ console.log( "damage.long", alphaStrikeForceStats.damage.long );
				//~ console.log( "heatDissipation", heatDissipation );
				//~ console.log( "heat_damage_long", heat_damage_long );
				//~ console.log( "total_weapon_heat_long", total_weapon_heat_long );



				if (heat_damage_long > alphaStrikeForceStats.damage.long) {
					var final_long_overheat_value = heat_damage_long - alphaStrikeForceStats.damage.long;
					this.alphaStrikeForceStats.damage.long = heat_damage_long - final_long_overheat_value;
					this.alphaStrikeForceStats.damage.extreme = heat_damage_extreme - final_long_overheat_value;
				}

				//~ console.log( "final_long_overheat_value", final_long_overheat_value );
				//~ console.log( "damage.long", alphaStrikeForceStats.damage.long );

			}
		} else {
			//~ if( alphaStrikeForceStats.damage.short != "0*")
			//~ alphaStrikeForceStats.damage.short = Math.ceil( alphaStrikeForceStats.damage.short );
			//~ if( alphaStrikeForceStats.damage.medium != "0*")
			//~ alphaStrikeForceStats.damage.medium =  Math.ceil( alphaStrikeForceStats.damage.medium );
			if (alphaStrikeForceStats.damage.short != "0*")
				this.alphaStrikeForceStats.damage.long = Math.ceil(alphaStrikeForceStats.damage.long);
			if (alphaStrikeForceStats.damage.medium != "0*")
				this.alphaStrikeForceStats.damage.extreme = Math.ceil(alphaStrikeForceStats.damage.extreme);

		}

		if (final_long_overheat_value > 0) {
			this.alphaStrikeForceStats.abilityCodes.push("OVL " + final_long_overheat_value);

		}

		//~ alphaStrikeForceStats.damage.short = alphaStrikeForceStats.damage.short.toFixed(0) /1;
		//~ alphaStrikeForceStats.damage.medium = alphaStrikeForceStats.damage.medium.toFixed(0) /1;
		//~ alphaStrikeForceStats.damage.long = alphaStrikeForceStats.damage.long.toFixed(0) /1;
		//~ alphaStrikeForceStats.damage.extreme = alphaStrikeForceStats.damage.extreme.toFixed(0) /1;

		//~ console.log( "alphaStrikeForceStats.damage", alphaStrikeForceStats.damage);
		this.alphaStrikeForceStats.damage = this._adjustASDamage(alphaStrikeForceStats.damage, true);
		//~ console.log( "alphaStrikeForceStats.damage", alphaStrikeForceStats.damage);

		// Determine Overheat Values - p116 AS Companion
		//~ var final_overheat_value = 0;


		//~ if( alphaStrikeForceStats.damage.medium != "0*" && before_heat_rangeMedium - alphaStrikeForceStats.damage.medium > 0) {
		//~ final_overheat_value = before_heat_rangeMedium - alphaStrikeForceStats.damage.medium;
		//~ } else {
		//~ // try short range bracket since the med range is low.
		//~ if( alphaStrikeForceStats.damage.short != "0*" )
		//~ final_overheat_value = before_heat_rangeShort - alphaStrikeForceStats.damage.short;
		//~ }
		//~ if( final_overheat_value > 4 )
		//~ final_overheat_value = 4;

		// Determine Overheat Values - ASC - p116
		//~ var final_long_overheat_value = 0;
		//~ if( alphaStrikeForceStats.damage.long != "0*" && before_heat_rangeLong - alphaStrikeForceStats.damage.long > 0) {
		//~ final_long_overheat_value = before_heat_rangeLong - alphaStrikeForceStats.damage.long;
		//~ }

		if (final_long_overheat_value > 4)
			final_long_overheat_value = 4;

		this.alphaStrikeForceStats.ov = final_overheat_value;

		calcLogAS += "Move Heat: " + move_heat + "<br />\n";
		calcLogAS += "Weapon Heat: " + total_weapon_heat + "<br />\n";
		calcLogAS += "Long Weapon Heat: " + total_weapon_heat_long + "<br />\n";
		calcLogAS += "Heat Dissipation: " + heatDissipation + "<br />\n";

		calcLogAS += "Overheat Value: " + overheat_value + "<br />\n";
		calcLogAS += "Long Overheat Value: " + long_overheat_value + "<br />\n";

		calcLogAS += "<strong>Short Damage: " + alphaStrikeForceStats.damage.short + "</strong><br />\n";
		calcLogAS += "<strong>Medium Damage: " + alphaStrikeForceStats.damage.medium + "</strong><br />\n";
		calcLogAS += "<strong>Long Damage: " + alphaStrikeForceStats.damage.long + "</strong><br />\n";
		calcLogAS += "<strong>Extreme Damage: " + alphaStrikeForceStats.damage.extreme + "</strong><br />\n";

		// Overheat Value is
		calcLogAS += "<strong>Final Overheat Value: " + final_overheat_value + "</strong><br />\n";
		calcLogAS += "<strong>Final Long Overheat Value: " + final_long_overheat_value + "</strong><br />\n";

		this.alphaStrikeForceStats.overheat = final_overheat_value;
		this.alphaStrikeForceStats.longOverheat = final_long_overheat_value;

		/* *********************************
		 *
		 * Alpha Strike Point Value ASC - p138
		 *
		 * ******************************** */

		this.alphaStrikeForceStats.pv = 0;
		calcLogAS += "<div class=\"text-center\"><strong> - Calculating Point Value - </strong></div>\n";
		/* *********************************
		 * Step 1: Determine Unit’s Offensive Value ASC - p138
		 * ******************************** */

		calcLogAS += "<strong>Step 1: Determine Unit’s Offensive Value ASC - p138</strong><br />\n";
		var offensive_value = 0;
		// Attack Damage Factor
		if (alphaStrikeForceStats.damage.short != "0*" && alphaStrikeForceStats.damage.short != "-")
			offensive_value += alphaStrikeForceStats.damage.short;
		if (alphaStrikeForceStats.damage.medium != "0*" && alphaStrikeForceStats.damage.medium != "-")
			offensive_value += alphaStrikeForceStats.damage.medium;
		if (alphaStrikeForceStats.damage.long != "0*" && alphaStrikeForceStats.damage.long != "-")
			offensive_value += alphaStrikeForceStats.damage.long;
		if (alphaStrikeForceStats.damage.extreme != "0*" && alphaStrikeForceStats.damage.extreme != "-")
			offensive_value += alphaStrikeForceStats.damage.extreme;

		calcLogAS += "Attack Damage Factor: " + offensive_value + " ( " + alphaStrikeForceStats.damage.short + " + " + alphaStrikeForceStats.damage.medium + " + " + alphaStrikeForceStats.damage.long + " + " + alphaStrikeForceStats.damage.extreme + " )<br />\n";

		// Unit Size Factor
		offensive_value += alphaStrikeForceStats.size_class / 2;
		calcLogAS += "Unit Size Factor: " + (alphaStrikeForceStats.size_class / 2) + " (" + alphaStrikeForceStats.size_class + " / 2))<br />\n";

		// Overheat Factor
		var overHeatFactor = 0;
		if (alphaStrikeForceStats.ov > 1) {
			offensive_value += 1;
			offensive_value += (alphaStrikeForceStats.ov - 1) / 2;
			overHeatFactor += 1;
			overHeatFactor += (alphaStrikeForceStats.ov - 1) / 2;
		} else {
			offensive_value += alphaStrikeForceStats.ov;
			overHeatFactor += alphaStrikeForceStats.ov;

		}

		calcLogAS += "Overheat Factor: " + overHeatFactor + "<br />\n";


		// Offensive Special Ability Factor
		// TODO

		/* *********************************
		 * Step 1a: Apply Blanket Offensive Modifiers ASC - p139
		 * ******************************** */
		calcLogAS += "<strong>Step 1a: Apply Blanket Offensive Modifiers ASC - p139</strong><br />\n";
		// TODO

		/* *********************************
		 * Step 2: Determine Unit’s Defensive Value ASC - p139
		 * ******************************** */
		calcLogAS += "<strong>Step 2: Determine Unit’s Defensive Value ASC - p139</strong><br />\n";
		var defensive_value = 0;

		// Movement Factor:
		var movementDefenseValue = 0;
		var bestMovement = 0;
		if (alphaStrikeForceStats.move > alphaStrikeForceStats.jumpMove) {
			movementDefenseValue += alphaStrikeForceStats.move * .25;
			bestMovement = alphaStrikeForceStats.move;
		} else {
			movementDefenseValue += alphaStrikeForceStats.jumpMove * .25;
			bestMovement = alphaStrikeForceStats.move;
		}
		defensive_value += movementDefenseValue;

		if (alphaStrikeForceStats.jumpMove > 0) {
			movementDefenseValue += .5;
			calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25 + .5)<br />\n";
		} else {
			calcLogAS += "Movement Factor: " + movementDefenseValue + " (" + bestMovement + " * .25)<br />\n";
		}



		if (
			rearDamage.short > 0 ||
			rearDamage.medium > 0 ||
			rearDamage.long > 0
		) {
			this.alphaStrikeForceStats.abilityCodes.push("Rear");
		}

		for (var aC = 0; aC < alphaStrikeForceStats.abilityCodes.length; aC++) {

			// Replace Heat with Heat X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "heat") {
				heatDamage = this._adjustASDamage(heatDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "Heat " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long;
				highestDamage = this._getHighestDamage(heatDamage);
				offensive_value += highestDamage;
				if (heatDamage.medium != "-" && heatDamage.medium > 0)
					offensive_value += .5;

				calcLogAS += "<strong>Adding</strong> Heat Ability: " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long + "<br />\n";
				calcLogAS += "Adding Heat Damage Factor to PV: " + highestDamage + "<br />\n";
				if (heatDamage.medium != "-" && heatDamage.medium > 0)
					calcLogAS += "Adding Heat Medium Damage Bonus to PV: 0,5<br />\n";
			}

			// Replace LRM with LRM X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "lrm") {
				lrmDamage = this._adjustASDamage(lrmDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "LRM " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long;
				calcLogAS += "<strong>Adding</strong> LRM Ability: " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long + "<br />\n";

			}


			// Replace Flak with Flak X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "flak") {
				flakDamage = this._adjustASDamage(flakDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "Flak " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long;
				calcLogAS += "<strong>Adding</strong> Flak Ability: " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long + "<br />\n";
			}


			// Replace AC with AC X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "ac") {
				acDamage = this._adjustASDamage(acDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "AC " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long;
				calcLogAS += "<strong>Adding</strong> AC Ability: " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long + "<br />\n";
			}


			// Replace SRM with SRM X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "srm") {
				srmDamage = this._adjustASDamage(srmDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "SRM " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long;
				calcLogAS += "<strong>Adding</strong> SRM Ability: " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long + "<br />\n";
			}

			// Replace Missile with Missile X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "missile" || alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "msl") {
				mslDamage = this._adjustASDamage(mslDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "MSL " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long;
				calcLogAS += "<strong>Adding</strong> Missile Ability: " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long + "<br />\n";
			}

			// Replace Rear with Rear X/X/X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "rear") {
				rearDamage = this._adjustASDamage(rearDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "Rear " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long;
				calcLogAS += "<strong>Adding</strong> Rear Ability: " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long + "<br />\n";
			}

			// Replace IndirectFire with IF X
			if (alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "indirect fire" || alphaStrikeForceStats.abilityCodes[aC].toLowerCase() == "if") {
				rearDamage = this._adjustASDamage(rearDamage);
				this.alphaStrikeForceStats.abilityCodes[aC] = "IF " + indirectFireRating;
				calcLogAS += "<strong>Adding</strong> IF Ability: " + indirectFireRating + "<br />\n";
				offensive_value += highestDamage;
				calcLogAS += "Adding IF Rating to PV: " + indirectFireRating + "<br />\n";

			}

		}

		// Defensive Special Abilities Factor
		// TODO

		// Defensive Interaction Rating
		// TODO

		/* *********************************
		 * Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141
		 * ******************************* */
		calcLogAS += "<strong>Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141</strong><br />\n";
		var bmDIR = 0;
		// Armor Factor
		calcLogAS += "Armor Factor: " + (alphaStrikeForceStats.armor * 2) + " (" + alphaStrikeForceStats.armor + " * 2)<br />\n";
		bmDIR += alphaStrikeForceStats.armor * 2; // No need to do other types of armor, since this is BM only.

		// Structure Factor
		calcLogAS += "Structure Factor: " + (alphaStrikeForceStats.structure * 1) + " (" + alphaStrikeForceStats.structure + " * 1)<br />\n";
		bmDIR += alphaStrikeForceStats.structure * 1; // TODO IndustrialMechs

		// Defense Factor

		if (bestMovement > 34) {
			calcLogAS += "Defense Factor: +5 (movement 35\"+)<br />\n";
			bmDIR += 5;
		} else if (bestMovement > 18) {
			calcLogAS += "Defense Factor: +4 (movement 19\"-34\"+)<br />\n";
			bmDIR += 4;
		} else if (bestMovement > 12) {
			calcLogAS += "Defense Factor: +3 (movement 13\"-18\"+)<br />\n";
			bmDIR += 3;
		} else if (bestMovement > 8) {
			calcLogAS += "Defense Factor: +2 (movement 9\"-12\"+)<br />\n";
			bmDIR += 2;
		} else if (bestMovement > 4) {
			calcLogAS += "Defense Factor: +1 (movement 4\"-8\"+)<br />\n";
			bmDIR += 1;
		} else {
			calcLogAS += "Defense Factor: +0 (movement 0\"-4\"+)<br />\n";
			bmDIR += 0;
		}

		bmDIR += defensive_value;
		calcLogAS += "Adding Defense Value from Step 2 above: " + defensive_value + "<br />\n";
		// Calculate the DIR
		calcLogAS += "Total DIR: " + bmDIR + "<br />\n";

		/* *********************************
		 * Step 3: Determine Unit’s Final Point Value ASC - p141
		 *
		 * ******************************* */
		calcLogAS += "<strong>Step 3: Determine Unit’s Final Point Value ASC - p141</strong><br />\n";
		baseFinalValue = offensive_value + bmDIR;
		calcLogAS += "Base Point Value: " + baseFinalValue + " (" + offensive_value + " + " + bmDIR + ")<br />\n";

		finalValue = baseFinalValue;
		if (
			bestMovement >= 6 &&
			bestMovement <= 10 &&
			this.alphaStrikeForceStats.damage.medium == 0 &&
			this.alphaStrikeForceStats.damage.long == 0 &&
			this.alphaStrikeForceStats.damage.extreme == 0
		) {
			calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
			calcLogAS += "Modified Point Value: " + baseFinalValue * .75 + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
			finalValue = baseFinalValue * .75;
		}

		if (
			bestMovement >= 2 &&
			bestMovement <= 5 &&
			this.alphaStrikeForceStats.damage.medium == 0 &&
			this.alphaStrikeForceStats.damage.long == 0 &&
			this.alphaStrikeForceStats.damage.extreme == 0
		) {
			calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
			calcLogAS += "Modified Point Value: " + baseFinalValue * .5 + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
			finalValue = baseFinalValue * .5;
		}

		if (
			bestMovement >= 2 &&
			bestMovement <= 5 &&
			this.alphaStrikeForceStats.damage.long == 0 &&
			this.alphaStrikeForceStats.damage.extreme == 0
		) {
			calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short and Medium ranges. Point Value * .75<br />\n";
			calcLogAS += "Modified Point Value: " + baseFinalValue * .75 + " (" + offensive_value + " + " + bmDIR + ")<br />\n";
			finalValue = baseFinalValue * .75;
		}

		calcLogAS += "Final Point Value: " + finalValue + "<br />\n";

		/* *********************************
		 * Step 3a: Add Force Bonuses ASC - p141
		 * ******************************* */
		calcLogAS += "<strong>Step 3a: Add Force Bonuses ASC - p141</strong><br />\n";
		// TODO
		calcLogAS += "<strong class=\"color-red\">TODO<br />\n";

		this.alphaStrikeForceStats.name = this.name;
		this.alphaStrikeForceStats.type = "BM";


		alphaStrikeValue = Math.round(finalValue) + " (WIP)";
		var asMechData = [];
		asMechData["BFPointValue"] = Math.round(finalValue);

		asMechData["Name"] = this.getName();
		asMechData["BFThreshold"] = 0;
		asMechData["Role"] = {
			Name: alphaStrikeForceStats.role
		};
		asMechData["BFType"] = "BM";
		asMechData["BFSize"] = alphaStrikeForceStats.size_class;

		asMechData["BFArmor"] = alphaStrikeForceStats.armor;
		asMechData["BFStructure"] = alphaStrikeForceStats.structure;

		asMechData["BFOverheat"] = final_overheat_value;


		asMechData["BFDamageShort"] = alphaStrikeForceStats.damage.short;
		asMechData["BFDamageMedium"] = alphaStrikeForceStats.damage.medium;
		asMechData["BFDamageLong"] = alphaStrikeForceStats.damage.long;
		asMechData["BFDamageExtreme"] = alphaStrikeForceStats.damage.extreme;

		asMechData["BFOverheat"] = alphaStrikeForceStats.overheat;

		asMechData["customName"] = alphaStrikeForceStats.customName;
		asMechData["currentSkilll"] = _pilot.gunnery;

		if (alphaStrikeForceStats.jumpMove) {
			asMechData["BFMove"] = alphaStrikeForceStats.move.toString() + "\"/" + alphaStrikeForceStats.jumpMove + "\"J";
		} else {
			asMechData["BFMove"] = alphaStrikeForceStats.move.toString() + "\"";
		}

		this.alphaStrikeForceStats.abilityCodes.sort();
		asMechData["BFAbilities"] = alphaStrikeForceStats.abilityCodes.join(", ").toUpperCase();

		this.alphaStrikeForceStats = new asUnit(asMechData);

	}