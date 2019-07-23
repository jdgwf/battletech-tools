import { tsConstructorType } from "@babel/types";
import { addCommas } from "../utils";
import { IAlphaStrikeDamage } from "./AlphaStrikeUnit";


interface IWeights {
    name: string;
    weight: number;
}
export class BattleMech {

	mechType = mechTypeOptions[0];
	tech = btTechOptions[0];
	era = btEraOptions[1]; // Default to Succession Wars
	make: string = "";
	model: string = "";
	uuid: string = "";
	tonnage = 20;
	useLang: string = "en-US";

	armorType = mechArmorTypes[0];

	maxArmor: number = 0;

	selectedInternalStructure = mechInternalStructureTypes[0];

	hasTripleStrengthMyomer: boolean = false;

	internalStructure = {
		head: 0,
		centerTorso: 0,
		rightTorso: 0,
		leftTorso: 0,
		leftArm: 0,
		rightArm: 0,
		leftLeg: 0,
		rightLeg: 0
	};

	no_right_arm_hand_actuator: boolean = false;
	no_right_arm_lower_actuator: boolean = false;

	no_left_arm_hand_actuator: boolean = false;
	no_left_arm_lower_actuator: boolean = false;

	smallCockpit: boolean = false;
	cockpitWeight: number = 3;

	totalInternalStructurePoints = 0;

	maxMoveHeat: number = 2;
	maxWeaponHea: number = 0;
	heatDissipation: number = 0;

	additionalHeatSinks: number = 0;

	armorWeight: number = 0;
	totalArmor: number = 0;
	unallocatedArmor: number = 0;

	armorAllocation = {
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

	heatSinkType = mechHeatSinkTypes[0];


    equipmentList = [];
    sortedEquipmentList: string[] = [];

	criticalAllocationTable = [];

	weights: IWeights[] = [];

	strictEra: boolean = true;

	unallocatedCriticals = [];

	criticals = {
		head: [],
		centerTorso: [],
		rightTorso: [],
		leftTorso: [],
		leftArm: [],
		rightArm: [],
		leftLeg: [],
		rightLeg: []
	};

	gyro = mechGyroTypes[0];

	engine = null;
	engineType = mechEngineTypes[0];
	jumpJetType = mechJumpJetTypes[0];

	walkSpeed = 0;
	runSpeed = 0;
	jumpSpeed = 0;

	maxArmorTonnage = 0;

	cbillCost = "0";
	battleValue = 0;
	pilotAdjustedBattleValue = 0;
	alphaStrikeValue = 0;

	calcLogBV = "";
	calcLogAS = "";
	calcLogCBill = "";

	validJJLocations = [{
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

	pilot = {
		name: "",
		piloting: 5,
		gunnery: 4,
		wounds: 0
	};

	alphaStrikeForceStats = {
		name: "",
		move: "",
		customName: "",
		role: "Brawler",
		jumpMove: 0,
		pv: "",
		damage: {
			short: 0,
			medium: 0,
			long: 0,
			extreme: 0
		},
		armor: 0,
		structure: 0,
		size: 0,
		skill: 4,
		overheat: 0,
		notes: "",
        tmm: 0,
        size_class: 0,
        size_class_name: "",

	}

    constructor() {

    }

	setMechType(typeID: number) {
		for (let lcounter = 0; lcounter < mechTypeOptions.length; lcounter++) {
			if (typeID == mechTypeOptions[lcounter].id) {
				let mechType = mechTypeOptions[lcounter];
				this.setTonnage( this.tonnage );
				this.calc();
				return this.mechType;
			}
		}

		return null;
	}


	// getHighestDamage(incomingDamageObjects: IAlphaStrikeDamage[]) {
	// 	let returnValue = 0;
	// 	for (var dC = 0; dC < incomingDamageObjects.length; dC++) {
	// 		if (
	// 			incomingDamageObjects[dC] &&
	// 			incomingDamageObjects[dC] != "-" &&
	// 			incomingDamageObjects[dC] != "0*"
	// 		) {
	// 			if (incomingDamageObjects[dC] > returnValue) {
	// 				returnValue = incomingDamageObjects[dC] / 1;
	// 			}
	// 		}
	// 	}

	// 	return returnValue;
	// }

	// adjustASDamage(incomingDamageObjects: IAlphaStrikeDamage, useZeros: boolean = false) {

	// 	if (incomingDamageObjects.short == "0") {
	// 		if (useZeros)
	// 			incomingDamageObjects.short = "0";
	// 		else
	// 			incomingDamageObjects.short = "-";
	// 	} else if (+incomingDamageObjects.short < .5) {
	// 		//~ if( useZeros )
	// 		//~ incomingDamageObjects.short = 0;
	// 		//~ else
	// 		incomingDamageObjects.short = "0*";
	// 	} else {
	// 		incomingDamageObjects.short = Math.round(+incomingDamageObjects.short).toString();
	// 	}

	// 	if (incomingDamageObjects.medium == "0") {
	// 		if (useZeros)
	// 			incomingDamageObjects.medium = "0";
	// 		else
	// 			incomingDamageObjects.medium = "-";
	// 	} else if (+incomingDamageObjects.medium < .5) {
	// 		//~ if( useZeros )
	// 		//~ incomingDamageObjects.medium = 0;
	// 		//~ else
	// 		incomingDamageObjects.medium = "0*";
	// 	} else {
	// 		incomingDamageObjects.medium = Math.round(+incomingDamageObjects.medium).toString();
	// 	}

	// 	if (incomingDamageObjects.long == "0") {
	// 		if (useZeros)
	// 			incomingDamageObjects.long = "0";
	// 		else
	// 			incomingDamageObjects.long = "-";
	// 	} else if (+incomingDamageObjects.long < .5) {
	// 		//~ if( useZeros )
	// 		//~ incomingDamageObjects.long = 0;
	// 		//~ else
	// 		incomingDamageObjects.long = "0*";
	// 	} else {
	// 		incomingDamageObjects.long = Math.round(+incomingDamageObjects.long).toString();
	// 	}

	// 	if (incomingDamageObjects.extreme == "0") {
	// 		if (useZeros)
	// 			incomingDamageObjects.extreme = "0";
	// 		else
	// 			incomingDamageObjects.extreme = "-";
	// 	} else if (+incomingDamageObjects.extreme < .5) {
	// 		//~ if( useZeros )
	// 		//~ incomingDamageObjects.extreme = 0;
	// 		//~ else
	// 		incomingDamageObjects.extreme = "0*";
	// 	} else {
	// 		incomingDamageObjects.extreme = Math.round(+incomingDamageObjects.extreme).toString();
	// 	}

	// 	return incomingDamageObjects;
	// }

	calcBattleValue() {

		var hasCamo = false;
		var hasBasicStealth = false;
		var hasPrototypeStealth = false;
		var hasStandardStealth = false;
		var hasImprovedStealth = false;
		var hasMimetic = false;

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
		switch (this.armorType) {
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
		this.calcLogBV += "Total Internal Structure Points = Internal Structure Points x 1.5: " + totalInternalStructurePoints + " = 1.5 x " + _totalInternalStructurePoints + "<br />";

		// Adjust IS for Type
		switch (this.getInteralStructure().tag) {
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
		console.log( "this.engineType", this.engineType );
		switch (this.engineType.tag ) {
			case "light":
				this.calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Light Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .75;
				break;
			case "xl":
				// Inner Sphere XL
				this.calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Inner Sphere XL Engine: " + totalInternalStructurePoints + " x 0.75 = " + (totalInternalStructurePoints * .75) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .75;
				break;

			case "clan-xl":
				// Clan XL
				this.calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Clan XL Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
				totalInternalStructurePoints = totalInternalStructurePoints * .75;
				break;
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
		switch (this.getInteralStructure().tag) {
			case "compact":
				this.calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Compact Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 0.5;
				break;
			case "xl":
				this.calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Extra Light Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 0.5;
				break;
			case "heavy-duty":
				this.calcLogBV += "Total Gyro BV = 1 x Tonnage for Heavy Duty Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 1;
				break;
			default:
				this.calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Standard Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
				totalGyroPoints = this.getTonnage() * 0.5;
				break;
		}

		// Get Explosive Ammo Modifiers - Tech Manual p302-303
		var explosiveAmmoModifiers = 0;
		this.calcLogBV += "<strong>Get Explosive Ammo Modifiers (TM p302-303)</strong><br />";


		var caseEnabled_HD = false;
		var caseEnabled_CT = false;
		var caseEnabled_RL = false;
		var caseEnabled_LL = false;
		var caseEnabled_RA = false;
		var caseEnabled_LA = false;
		var caseEnabled_RT = false;
		var caseEnabled_LT = false;

		for (var lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
			if (this.criticals.head[lCrit] && this.criticals.head[lCrit].tag == "case") {
				caseEnabled_HD = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
			if (this.criticals.centerTorso[lCrit] && this.criticals.centerTorso[lCrit].tag == "case") {
				caseEnabled_CT = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
			if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].tag == "case") {
				caseEnabled_RL = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
			if (this.criticals.leftLeg[lCrit] && this.criticals.leftLeg[lCrit].tag == "case") {
				caseEnabled_LL = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.rightArm.length; lCrit++) {
			if (this.criticals.rightArm[lCrit] && this.criticals.rightArm[lCrit].tag == "case") {
				caseEnabled_RA = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.leftArm.length; lCrit++) {
			if (this.criticals.leftArm[lCrit] && this.criticals.leftArm[lCrit].tag == "case") {
				caseEnabled_LA = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
			if (this.criticals.rightTorso[lCrit] && this.criticals.rightTorso[lCrit].tag == "case") {
				caseEnabled_RT = true;
			}
		}

		for (var lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
			if (this.criticals.leftTorso[lCrit] && this.criticals.leftTorso[lCrit].tag == "case") {
				caseEnabled_LT = true;
			}
		}

		if (this.tech.tag == "clan") {

			//Clan is Assumed to have CASE in BV Calculation (TM p303)

			// check head
			for (var lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
				if (this.criticals.head[lCrit]) {
					if (this.criticals.head[lCrit] && this.criticals.head[lCrit].obj && this.criticals.head[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Head (Clan, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.head[lCrit] && this.criticals.head[lCrit].obj && this.criticals.head[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Head (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check ct
			for (var lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
				if (this.criticals.centerTorso[lCrit]) {
					if (this.criticals.centerTorso[lCrit] && this.criticals.centerTorso[lCrit].obj && this.criticals.centerTorso[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Center Torso (Clan, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.centerTorso[lCrit] && this.criticals.centerTorso[lCrit].obj && this.criticals.centerTorso[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Center Torso (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check lt
			for (var lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
				if (this.criticals.leftTorso[lCrit]) {
					if (this.criticals.leftTorso[lCrit] && this.criticals.leftTorso[lCrit].obj && this.criticals.leftTorso[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Left Torso (Clan,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.leftTorso[lCrit] && this.criticals.leftTorso[lCrit].obj && this.criticals.leftTorso[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Left Torso (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rt
			for (var lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
				if (this.criticals.rightTorso[lCrit]) {
					if (this.criticals.rightTorso[lCrit] && this.criticals.rightTorso[lCrit].obj && this.criticals.rightTorso[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Right Torso (Clan,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.rightTorso[lCrit] && this.criticals.rightTorso[lCrit].obj && this.criticals.rightTorso[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Center Right (Clan, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rl
			for (var lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
				if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.explosive) {
					this.calcLogBV += "Explosive Ammo Crit in Right Leg (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.gauss) {
					this.calcLogBV += "Gauss Crit in Right Leg (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

			// check ll
			for (var lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
				if (this.criticals.leftLeg[lCrit] && this.criticals.leftLeg[lCrit].obj && this.criticals.leftLeg[lCrit].obj.explosive) {
					this.calcLogBV += "Explosive Ammo Crit in Left Leg (Clan, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (this.criticals.leftLeg[lCrit] && this.criticals.leftLeg[lCrit].obj && this.criticals.leftLeg[lCrit].obj.gauss) {
					this.calcLogBV += "Gauss Crit in Left Leg (Clan, -1)<br />";
					explosiveAmmoModifiers += 1;
				}
			}

		} else if (this.tech.tag == "is") {
			// check head
			for (var lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
				if (this.criticals.head[lCrit]) {
					if (this.criticals.head[lCrit] && this.criticals.head[lCrit].obj && this.criticals.head[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Head (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}

				}
			}

			// check ct
			for (var lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
				if (this.criticals.centerTorso[lCrit]) {
					if (this.criticals.centerTorso[lCrit] && this.criticals.centerTorso[lCrit].obj && this.criticals.centerTorso[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Center Torso (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.centerTorso[lCrit] && this.criticals.centerTorso[lCrit].obj && this.criticals.centerTorso[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Center Torso (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check lt
			for (var lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
				if (this.criticals.leftTorso[lCrit]) {
					if (this.criticals.leftTorso[lCrit] && this.criticals.leftTorso[lCrit].obj && this.criticals.leftTorso[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Left Torso (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.leftTorso[lCrit] && this.criticals.leftTorso[lCrit].obj && this.criticals.leftTorso[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Left Torso (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rt
			for (var lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
				if (this.criticals.rightTorso[lCrit]) {
					if (this.criticals.rightTorso[lCrit] && this.criticals.rightTorso[lCrit].obj && this.criticals.rightTorso[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Right Torso (Inner Sphere,-15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.rightTorso[lCrit] && this.criticals.rightTorso[lCrit].obj && this.criticals.rightTorso[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Center Right (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check rl
			for (var lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
				if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.explosive) {
					this.calcLogBV += "Explosive Ammo Crit in Right Leg (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.gauss) {
					this.calcLogBV += "Gauss Crit in Right Leg (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}

				if (caseEnabled_RT == false && caseEnabled_RL == false) {
					if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

			// check ll
			for (var lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
				if (this.criticals.leftLeg[lCrit] && this.criticals.leftLeg[lCrit].obj && this.criticals.leftLeg[lCrit].obj.explosive) {
					this.calcLogBV += "Explosive Ammo Crit in Left Leg (Inner Sphere, -15)<br />";
					explosiveAmmoModifiers += 15;
				}
				if (this.criticals.leftLeg[lCrit] && this.criticals.leftLeg[lCrit].obj && this.criticals.leftLeg[lCrit].obj.gauss) {
					this.calcLogBV += "Gauss Crit in Left Leg (Inner Sphere, -1)<br />";
					explosiveAmmoModifiers += 1;
				}

				if (caseEnabled_LT == false && caseEnabled_LL == false) {
					if (this.criticals.rightLeg[lCrit] && this.criticals.rightLeg[lCrit].obj && this.criticals.rightLeg[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.leftLeg[lCrit] && this.criticals.leftLeg[lCrit].obj && this.criticals.leftLeg[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}

			}

			// check RA
			for (var lCrit = 0; lCrit < this.criticals.rightArm.length; lCrit++) {


				if (caseEnabled_RT == false && caseEnabled_RA == false) {
					if (this.criticals.rightArm[lCrit] && this.criticals.rightArm[lCrit].obj && this.criticals.rightArm[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.rightArm[lCrit] && this.criticals.rightArm[lCrit].obj && this.criticals.rightArm[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}

			}

			// check LA
			for (var lCrit = 0; lCrit < this.criticals.leftArm.length; lCrit++) {


				if (caseEnabled_LT == false && caseEnabled_LA == false) {
					if (this.criticals.leftArm[lCrit] && this.criticals.leftArm[lCrit].obj && this.criticals.leftArm[lCrit].obj.explosive) {
						this.calcLogBV += "Explosive Ammo Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -15)<br />";
						explosiveAmmoModifiers += 15;
					}
					if (this.criticals.leftArm[lCrit] && this.criticals.leftArm[lCrit].obj && this.criticals.leftArm[lCrit].obj.gauss) {
						this.calcLogBV += "Gauss Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -1)<br />";
						explosiveAmmoModifiers += 1;
					}
				}
			}

		}


		defensiveBattleRating = totalArmorFactor + totalInternalStructurePoints + totalGyroPoints - explosiveAmmoModifiers;
		this.calcLogBV += "Defensive battle rating = " + defensiveBattleRating + " ( " + totalArmorFactor + " + " + totalInternalStructurePoints + " +  " + totalGyroPoints + " -  " + explosiveAmmoModifiers + "<br />";


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

		this.calcLogBV += "Best TMM: " + moveModifier + "<br />";

		var defensiveFactorModifier = 1 + moveModifier / 10;
		if (defensiveFactorModifier < 1)
			defensiveFactorModifier = 1;

		this.calcLogBV += "Defensive Factor (defensiveFactorModifier = 1 + TMM / 10): " + defensiveFactorModifier + " = 1 + " + moveModifier + " / 10<br />";

		// TODO for equipment.... add camo, stealth, etc when it's available
		this.calcLogBV += "<strong> Defensive Factor Modifiers for equipment</strong>.... add camo, stealth, etc when tech is available<br />";

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

		this.calcLogBV += "Defensive battle rating = Defensive battle rating * Target Modifier Rating : " + (defensiveBattleRating * defensiveFactorModifier).toFixed(2) + " = " + defensiveBattleRating + " x " + defensiveFactorModifier + "<br />";

		defensiveBattleRating = defensiveBattleRating * defensiveFactorModifier;

		this.calcLogBV += "<strong>Final defensive battle rating</strong>: " + defensiveBattleRating.toFixed(2) + "<br />";

		/* ***************************************************
		 *  STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303
		 * ************************************************ */
		var offensiveBattleRating = 0;
		this.calcLogBV += "<strong>STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303</strong><br />";

		// TODO
		this.calcLogBV += "<strong>Calculate Each Weapon’s Modified BV</strong><br />";

		var ammoBV = {};
		var weaponBV = {};

		var totalAmmoBV = 0;

		// Add up all the BV Sums, put each in an array for comparison
		for (var eqC = 0; eqC < this.equipmentList.length; eqC++) {
			if (this.equipmentList[eqC].tag.indexOf("ammo-") > -1) {
				if (!ammoBV[this.equipmentList[eqC].tag])
					ammoBV[this.equipmentList[eqC].tag] = 0;
				if (this.equipmentList[eqC].battlevalue)
					ammoBV[this.equipmentList[eqC].tag] += this.equipmentList[eqC].battlevalue;

				this.calcLogBV += "+ Adding " + this.getLocalTranslation(this.equipmentList[eqC].name) + " - " + this.equipmentList[eqC].battlevalue + "<br />";

			} else {
				if (!weaponBV[this.equipmentList[eqC].tag])
					weaponBV[this.equipmentList[eqC].tag] = 0;
				if (this.equipmentList[eqC].battlevalue)
					weaponBV[this.equipmentList[eqC].tag] = this.equipmentList[eqC].battlevalue;


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
					this.calcLogBV += "<strong>Excessive Ammo Rule</strong> setting " + ammoKey + " value to " + weaponBV[ammoKey] + " from " + simplifiedAmmoBV[ammoKey] + "<br />";

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

		this.calcLogBV += "<strong>Total Ammo BV</strong> " + totalAmmoBV + "<br />";


		//~ console.log( "this.getHeatSinksType()", this.getHeatSinksType() );
		var mechHeatEfficiency = 0;
		if (this.getHeatSinksType() == "single") {
			mechHeatEfficiency = 6 + this.getHeatSinks() - this.getMaxMovementHeat();
			this.calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() + " - " + this.getMaxMovementHeat() + ")<br />";

		} else if (this.getHeatSinksType() == "double") {
			mechHeatEfficiency = 6 + this.getHeatSinks() * 2 - this.getMaxMovementHeat();
			this.calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() * 2 + " - " + this.getMaxMovementHeat() + ")<br />";
		}

		this.calcLogBV += "<strong>Total Weapon Heat</strong> ";
		var totalWeaponHeat = 0;

		var eqList = angular.copy(this.equipmentList)
		eqList.sort(sortByBVThenRearThenHeat);

		for (var eqC = 0; eqC < eqList.length; eqC++) {
			if (eqList[eqC].tag.indexOf("ammo-") == -1) {
				if (!weaponBV[eqList[eqC].tag])
					weaponBV[eqList[eqC].tag] = 0;
				if (eqList[eqC].battlevalue)
					weaponBV[eqList[eqC].tag] = eqList[eqC].battlevalue;

				this.calcLogBV += eqList[eqC].heat + " + ";

				// TODO modify per weapon type
				// one shot eqList[ eqC ].heat = eqList[ eqC ].heat / 4
				// streak SRM eqList[ eqC ].heat = eqList[ eqC ].heat / 2
				// ULTRA AC eqList[ eqC ].heat = eqList[ eqC ].heat * 2
				// Rotary AC eqList[ eqC ].heat = eqList[ eqC ].heat * 6

				totalWeaponHeat += eqList[eqC].heat;


			}
		}

		if (_calcLogBV.substr(_calcLogBV.length - 3) == " + ") {
			this.calcLogBV = _calcLogBV.substr(0, _calcLogBV.length - 3)
		}

		this.calcLogBV += " = " + totalWeaponHeat;

		this.calcLogBV += "<br />";

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
							this.calcLogBV += "+ Adding Heat Inefficient Rear Weapon " + eqList[weaponC].name + " - " + eqList[weaponC].battlevalue + " / 4 = " + (eqList[weaponC].battlevalue / 4);
							runningTotal += (eqList[weaponC].battlevalue / 4);
						} else {
							this.calcLogBV += "+ Adding Heat Inefficient Weapon " + eqList[weaponC].name + " - " + eqList[weaponC].battlevalue + " / 2 = " + (eqList[weaponC].battlevalue / 2);
							runningTotal += (eqList[weaponC].battlevalue / 2);
						}
					} else {
						// normal efficiency

						//~ console.log(  eqList[weaponC] );
						if( eqList[weaponC].rear ) {
							this.calcLogBV += "+ Adding Rear Weapon " + eqList[weaponC].name + " - " + (eqList[weaponC].battlevalue / 2 ) + "<br />";
							runningTotal += (eqList[weaponC].battlevalue / 2);
						} else {
							this.calcLogBV += "+ Adding Weapon " + eqList[weaponC].name + " - " + eqList[weaponC].battlevalue;

							runningTotal += eqList[weaponC].battlevalue;
						}
					}

					runningHeat += eqList[weaponC].heat;
					//~ console.log( "r,m", runningHeat + " > "   + mechHeatEfficiency );
					if (runningHeat >= mechHeatEfficiency && eqList[weaponC].heat > 0 && inHalfCost == false) {
						inHalfCost = true;
						this.calcLogBV += " (weapon is last heat efficient)";
					}

					this.calcLogBV += "<br />";

				}
			}

		} else {

			// Mech is heat efficient, no need to go through steps 4-7 on TM pp 303-304, just print and add up the weapons



			for (var weaponC = 0; weaponC < eqList.length; weaponC++) {
				if (eqList[weaponC].tag.indexOf("ammo-") == -1) {
					if( eqList[weaponC].rear ) {
						this.calcLogBV += "+ Adding Rear Weapon " + eqList[weaponC].name + " - " + (eqList[weaponC].battlevalue / 2 ) + "<br />";

						runningTotal += (eqList[weaponC].battlevalue / 2);
					} else {
						this.calcLogBV += "+ Adding Weapon " + eqList[weaponC].name + " - " + eqList[weaponC].battlevalue + "<br />";

						runningTotal += eqList[weaponC].battlevalue;
					}
				}
			}

		}

		totalWeaponBV = runningTotal;
		this.calcLogBV += "<strong>Total Weapon BV</strong> " + totalWeaponBV + "<br />";

		var modifiedMechTonnage = this.getTonnage();

		if (this.hasTripleStrengthMyomer) {
			modifiedMechTonnage = modifiedMechTonnage * 1.5;
		}

		offensiveBattleRating = totalWeaponBV + totalAmmoBV + modifiedMechTonnage;

		var speedFactorModifier = this.getSpeedFactorModifier();
		offensiveBattleRating = offensiveBattleRating * speedFactorModifier;

		this.calcLogBV += "<strong>Final offensive battle rating</strong>: " + offensiveBattleRating.toFixed(2) + " (" + totalWeaponBV + " (weaponBV) + " + totalAmmoBV + " (ammoBV) + " + modifiedMechTonnage + "(mechTonnage) ) x " + speedFactorModifier + " (speed factor rating)<br />";

		/* ***************************************************
		 * STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304
		 * ************************************************ */

		this.calcLogBV += "<strong>STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304</strong><br />";
		var finalBattleValue = defensiveBattleRating + offensiveBattleRating;
		this.calcLogBV += "finalBattleValue = defensiveBattleRating + offensiveBattleRating: " + finalBattleValue.toFixed(2) + " = " + defensiveBattleRating.toFixed(2) + " + " + offensiveBattleRating.toFixed(2) + "<br />";

		if (this.smallCockpit) {
			finalBattleValue = Math.round(finalBattleValue * .95);
			this.calcLogBV += "Small Cockpit, multiply total by .95 and round final BV: " + finalBattleValue.toFixed(2) + "<br />";
		}

		this.calcLogBV += "<strong>Final Battle Value</strong>: " + finalBattleValue.toFixed(2) + " rounded to " + Math.round(finalBattleValue) + "<br />";
		battleValue = Math.round(finalBattleValue);

		this._setPilotAdjustedBattleValue();

	}

	setPilotAdjustedBattleValue() {
		let pilotAdjustedBattleValue = +this.battleValue;

		if( this.pilot.gunnery == 0 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.80;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.56;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.24;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.92;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.60;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.50;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.43;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.36;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 0 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.28;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.63;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.40;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.10;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.80;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.50;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.35;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.33;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.26;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.19;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.45;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.24;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.96;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.68;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.40;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.26;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.19;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.16;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 2 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.10;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.28;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.08;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.82;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.56;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.30;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.17;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.11;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.04;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 3 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.01;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.01;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.84;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.61;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.38;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.15;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.04;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 1 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.98;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.92;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 4 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.86;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.82;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.60;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.40;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.20;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.0;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.90;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.85;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.80;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 5 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.75;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.75;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.58;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.33;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.14;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.95;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.86;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.81;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.76;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 6 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.71;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.67;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.51;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.31;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.08;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.90;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.81;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.77;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.72;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 7 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.68;
		} else if( this.pilot.gunnery == 0 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.59;
		} else if( this.pilot.gunnery == 1 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.44;
		} else if( this.pilot.gunnery == 2 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.25;
		} else if( this.pilot.gunnery == 3 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.06;
		} else if( this.pilot.gunnery == 4 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.85;
		} else if( this.pilot.gunnery == 5 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.77;
		} else if( this.pilot.gunnery == 6 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.72;
		} else if( this.pilot.gunnery == 7 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.68;
		} else if( this.pilot.gunnery == 8 && this.pilot.piloting == 8 ) {
			pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.64;
		}
		pilotAdjustedBattleValue = Math.round( pilotAdjustedBattleValue );
	}

	getSpeedFactorModifier(): number {
		var runSpeedAndHalfJumpSpeed = this.getRunSpeed() + this.getJumpSpeed() / 2;

		if (runSpeedAndHalfJumpSpeed > 25) {
			return +(1 + Math.pow(((this.getRunSpeed() + (this.getJumpSpeed() / 2) - 5) / 10), 1.2)).toFixed(2);
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
        return 0;
	}

	isQuad() {
		if (this.mechType.class.toLowerCase() == "quad")
			return true;
		else
			return false;
	}

	calcCBillCost() {
		// TODO Calculations
		let this.calcLogCBill = "";

		var cbillTotal = 0;
		//~ _this.calcLogCBill = "TODO";

		this.calcLogCBill += "<table class=\"cbill-cost\">\n";

		this.calcLogCBill += "<tbody>\n";
		// Cockpit
		if( this.smallCockpit ) {
			this.calcLogCBill += "<tr><td><strong>Small Cockpit</strong></td><td>175,000</td></tr>\n";
			cbillTotal += 175000;
		} else {
			this.calcLogCBill += "<tr><td><strong>Standard Cockpit</strong></td><td>200,000</td></tr>\n";
			cbillTotal += 200000;
		}

		// Life Support
		this.calcLogCBill += "<tr><td><strong>Life Support</strong></td><td>50,000</td></tr>\n";
		cbillTotal += 50000;

		// Sensors
		this.calcLogCBill += "<tr><td><strong>Sensors</strong><br /><span class=\"smaller-text\">2,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" + addCommas( 2000 * this.getTonnage()) + "</td></tr>\n";
		cbillTotal += 2000 * this.getTonnage() ;

		this.calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Cockpit Subtotal: " + addCommas(cbillTotal) + "</strong></td></tr>\n";


		// Myomer
		if( this.hasTripleStrengthMyomer ) {
			this.calcLogCBill += "<tr><td><strong>Triple-Strength Myomer</strong><br /><span class=\"smaller-text\">16,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 16000 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 16000 * this.getTonnage() ;
		} else {
			this.calcLogCBill += "<tr><td><strong>Standard Musculature</strong><br /><span class=\"smaller-text\">2,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 2000 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 2000 * this.getTonnage() ;
		}

		// Internal Structure
		//~ console.log(  this.getLocalTranslation( this.selectedInternalStructure.name ) );
		this.calcLogCBill += "<tr><td><strong>Internal Structure: " + this.selectedInternalStructure.name  + "</strong><br />" +  addCommas( this.selectedInternalStructure.cost ) + " x Unit Tonnage [" + this.getTonnage() + "]</td><td>" +  addCommas( this.selectedInternalStructure.cost * this.getTonnage() ) + "</td></tr>\n";
		cbillTotal += this.selectedInternalStructure.cost * this.getTonnage() ;


		this.calcLogCBill += "<tr><td colspan=\"2\"><strong>Actuators</strong></td></tr>\n";

		var actuatorTotal = 0;
		// Actuators
		if (this.mechType.class.toLowerCase() == "quad") {
			this.calcLogCBill += "<tr><td>Right Front Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;


			this.calcLogCBill += "<tr><td>Right Front Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Right Front Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Front Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Front Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Front Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Right Rear Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Right Rear Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Right Rear Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Rear Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Rear Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Rear Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;
		} else {

			this.calcLogCBill += "<tr><td>Right Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Right Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Right Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 150 * this.getTonnage() ;
			actuatorTotal += 150 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 80 * this.getTonnage() ;
			actuatorTotal += 80 * this.getTonnage() ;

			this.calcLogCBill += "<tr><td>Left Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 120 * this.getTonnage() ;
			actuatorTotal += 120 * this.getTonnage() ;


			this.calcLogCBill += "<tr><td>Right Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 100 * this.getTonnage() ;
			actuatorTotal += 100 * this.getTonnage() ;

			if( _no_right_arm_lower_actuator == false ) {
				this.calcLogCBill += "<tr><td>Right Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 50 * this.getTonnage() ;
				actuatorTotal += 50 * this.getTonnage() ;
			}

			if( this.no_right_arm_hand_actuator == false ) {
				this.calcLogCBill += "<tr><td>Right Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 80 * this.getTonnage() ;
				actuatorTotal += 80 * this.getTonnage() ;
			}


			this.calcLogCBill += "<tr><td>Left Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
			cbillTotal += 100 * this.getTonnage() ;
			actuatorTotal += 100 * this.getTonnage() ;

			if( this.no_left_arm_lower_actuator == false ) {
				this.calcLogCBill += "<tr><td>Left Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 50 * this.getTonnage() ;
				actuatorTotal += 50 * this.getTonnage() ;
			}

			if( _no_left_arm_hand_actuator == false ) {
				this.calcLogCBill += "<tr><td>Left Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
				cbillTotal += 80 * this.getTonnage() ;
				actuatorTotal += 80 * this.getTonnage() ;
			}

		}
		this.calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Actuator Subtotal: " + addCommas(actuatorTotal) + "</strong></td></tr>\n";


		// Engine
		var engineName = this.getLocalTranslation( this.getEngineType().name );
		var engineRating  = this.getEngineRating();
		var enginecostMultiplier = this.getEngineType().costMultiplier;
		this.calcLogCBill += "<tr><td><strong>Engine: " + engineName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( enginecostMultiplier ) + " x Engine Rating  [" + engineRating + "] x Unit Tonnage [" + this.getTonnage() + "] / 75</span></td><td>" +  addCommas( enginecostMultiplier * engineRating * this.getTonnage() / 75 ) + "</td></tr>\n";
		cbillTotal += enginecostMultiplier * engineRating * this.getTonnage() / 75;

		// Gyro
		var gyroName = this.getGyroName();
		var gyrocostMultiplier = this.getGyro().costMultiplier;
		var gyroTonnage = this.getGyroWeight();

		this.calcLogCBill += "<tr><td><strong>Gyro: " + gyroName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( gyrocostMultiplier ) + " x Gyro Tonnage [" + gyroTonnage + "]</span></td><td>" +  addCommas( gyrocostMultiplier * gyroTonnage  ) + "</td></tr>\n";
		cbillTotal += gyrocostMultiplier * gyroTonnage ;

		// Jump Jets
		var numberOfJumpJets = this._getNumberOfJumpJets();
		if( numberOfJumpJets ) {
			var jumpJetName = this.getLocalTranslation( this.jumpJetType.name );
			var jumpJetCost = this.jumpJetType.costMultiplier;
			this.calcLogCBill += "<tr><td><strong>Jump Jets: " + jumpJetName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( jumpJetCost ) + " x (# Jump Jets [" +  numberOfJumpJets + "])<sup>2</sup> x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ) + "</td></tr>\n";
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
				this.calcLogCBill += "<tr><td><strong>Heat Sinks: " + heatSinksName  + "</strong><br /><span class=\"smaller-text\">" + addCommas(heatSinksCost) + " x (Number of Heat Sinks over 10 [" + (numberOfHeatSinks - 10 ) + "])</span></td><td>" +  addCommas( heatSinksCost * ( numberOfHeatSinks - 10 ) ) + "</td></tr>\n";
				cbillTotal +=  heatSinksCost * ( numberOfHeatSinks - 10 )  ;

				break;
			case "double":
				this.calcLogCBill += "<tr><td><strong>Heat Sinks:  " + heatSinksName  + "</strong><br /><span class=\"smaller-text\">" + addCommas(heatSinksCost) + " x (Number of Heat Sinks  [" + (numberOfHeatSinks  ) + "])</span></td><td>" +  addCommas( heatSinksCost * ( numberOfHeatSinks ) ) + "</td></tr>\n";
				cbillTotal +=  heatSinksCost * ( numberOfHeatSinks  )  ;

				break;
			default:
				break;
		}


		// Armor
		var armorName = this.getLocalTranslation( this.getArmorObj().name );
		var armorcostMultiplier = this.getArmorObj().costMultiplier;
		var armorTonnage = this.getArmorWeight();

		this.calcLogCBill += "<tr><td><strong>Armor: " + armorName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( armorcostMultiplier ) + " x Armor Tonnage [" + armorTonnage + "]</span></td><td>" +  addCommas( armorcostMultiplier * armorTonnage  ) + "</td></tr>\n";
		cbillTotal += armorcostMultiplier * armorTonnage ;

		// Equipment
		for( var eqC = 0; eqC < this.equipmentList.length; eqC++) {
			if( this.equipmentList[eqC].tag.indexOf("ammo-") == -1) {
				this.calcLogCBill += "<tr><td><strong>" + this.getLocalTranslation( this.equipmentList[eqC].name ) + "</strong></td><td>" + addCommas(this.equipmentList[eqC].cbills) + "</td></tr>\n";
				cbillTotal += this.equipmentList[eqC].cbills;
			} else {
				this.calcLogCBill += "<tr><td><strong>" + this.getLocalTranslation( this.equipmentList[eqC].name ) + "</strong></td><td><span class=\"smaller-text\">(not included)</span></td></tr>\n";

			}
		}


		// NOTE - for some reason SSW and the MUL are 1000 less here than the actual summation even when all the line items are right.
		this.calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\">&nbsp;</td></tr>\n";
		this.calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Subtotal: " + addCommas(cbillTotal) + "</strong></td></tr>\n";


		// (Structural Cost + Weapon/Equipment Costs) x (Omni Conversion Cost*) x (1 + [Total Tonnage ÷ 100])

		this.calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\">&nbsp;</td></tr>\n";
		this.calcLogCBill += "<tr><td class=\"text-right\"><strong>Final Unit Cost</strong>:<br /><span class=\"smaller-text\">Sub Total [" + addCommas(cbillTotal) + "] x (1 + Unit Tonnage [" + this.getTonnage() + "] / 100) - rounded up</span></td><td>" + addCommas( Math.ceil(cbillTotal * ( 1 + this.getTonnage() / 100 ) ) ) + "</td></tr>\n";
		cbillTotal = Math.ceil( cbillTotal * (1 + this.getTonnage() / 100) );


		this.calcLogCBill += "</tbody></table>";
		this.cbillCost = addCommas(cbillTotal);
	}

	getNumberOfJumpJets() {
		return this.getJumpSpeed();
	}

	getBattleValue() {
		return this.battleValue;
	}

	getPilotAdjustedBattleValue() {
		return this.pilotAdjustedBattleValue;
	}

	getAlphaStrikeValue() {
		return this.alphaStrikeValue;
	}

	getCBillCost() {
		return this.cbillCost;
	}

	getEngineWeight() {
		if( this.engine && this.engine.weight) {
			if (this.engineType.tag == "clan-xl")
				return this.engine.weight["xl"];
			else
				return this.engine.weight[this.engineType.tag];
		} else {
			return 0;
		}
	}

	getEngineRating() {
		if (this.engine && this.engine.rating)
			return this.engine.rating;
		else
			return 0;

	}

	getHeatSinks() {
		return 10 + this.additionalHeatSinks;
	}

	getHeatSinksWeight() {
		return 0 + this.additionalHeatSinks;
	}

	getGyroWeight() {
		return Math.ceil(Math.ceil(this.engine.rating / 100) * _gyro.weight_multiplier);
	}
	getCockpitWeight() {
		return this.cockpitWeight;
	}

	setCockpitWeight(new_weight) {
		this.cockpitWeight = new_weight;
		return this.cockpitWeight;
	}


	getInteralStructureWeight() {
		return this.selectedInternalStructure.perTon[this.getTonnage()].tonnage;
	}

	getJumpJetWeight() {
		if (this.tonnage <= 55) {
			// 10-55 tons
			return this.jumpSpeed * this.jumpJetType.weight_multiplier.light;
		} else if (this.tonnage <= 85) {
			// 60 - 85 tons
			return this.jumpSpeed * this.jumpJetType.weight_multiplier.medium;
		} else {
			// 90+ tons
			return this.jumpSpeed * this.jumpJetType.weight_multiplier.heavy;
		}

	}

	getASCalcHTML() {
		return "<div class=\"mech-tro\">" + this.calcLogAS + "</div>";
	}

	getBVCalcHTML() {
		return "<div class=\"mech-tro\">" + this.calcLogBV + "</div>";
	}

	getCBillCalcHTML() {
		return "<div class=\"mech-tro\">" + this.this.calcLogCBill + "</div>";
	}


	// makeSVGRecordSheet(inPlay, landscape) {
	// 	if (typeof(landscape) == "undefined") {
	// 		landscape = false;
	// 	} else {
	// 		if (landscape)
	// 			landscape = true;
	// 		else
	// 			landscape = false;
	// 	}

	// 	if (typeof(inPlay) == "undefined") {
	// 		inPlay = false;
	// 	} else {
	// 		if (inPlay)
	// 			inPlay = true;
	// 		else
	// 			inPlay = false;
	// 	}




	// 	return createSVGRecordSheet(this, inPlay, landscape);


	// }

	// makeSVGAlphaStrikeCard(inPlay) {
	// 	if (typeof(inPlay) == "undefined") {
	// 		inPlay = false;
	// 	} else {
	// 		if (inPlay)
	// 			inPlay = true;
	// 		else
	// 			inPlay = false;
	// 	}

	// 	//~ console.log( alphaStrikeForceStats );

	// 	return createSVGAlphaStrike(alphaStrikeForceStats, inPlay);
	// }

	makeTROBBCode() {

		let html = "";
		// Header Info
		html += "Type" + ": " + this.getName() + "\n";
		html += "Technology Base" + ": " + this.getTech().name[this.useLang] + "\n";
		html += "Era" + ": " + this.getEra().name[this.useLang] + "\n";
		html += "Tonnage" + ": " + this.getTonnage() + "\n";
		html += "Battle Value" + ": " + this.getBattleValue() + "\n";
		html += "Alpha Strike Value" + ": " + this.getAlphaStrikeValue() + "\n";
		html += "C-Bill Cost" + ": $" + this.getCBillCost() + "\n";
		html += "\n";

		var col1Padding = 25;
		var col2Padding = 15;
		var col3Padding = 10;
		var col4Padding = 10;

		// Equipment
		html += "" + "Equipment.rpad(" ", col1Padding + col2Padding) + "" + "Mass" + "\n";
		html += "" + ("Internal Structure" + " (" + this.selectedInternalStructure.name) + ")").rpad(" ", col1Padding + col2Padding) + "" + this.getInteralStructureWeight() + "\n";
		html += "" + this.getEngineName().rpad(" ", col1Padding) + "" + this.getEngineRating().toString().rpad(" ", col2Padding) + "" + this.getEngineWeight() + "\n";

		html += "" + "Walking".lpad(" ", col1Padding - 10) + " " + this.getWalkSpeed().toString().lpad(" ", 3) + "\n";
		html += "" + "Running".lpad(" ", col1Padding - 10) + " " + this.getRunSpeed().toString().lpad(" ", 3) + "\n";
		html += "" + "Jumping".lpad(" ", col1Padding - 10) + " " + this.getJumpSpeed().toString().lpad(" ", 3) + "\n";

		html += "" + this.getHeatSyncName().rpad(" ", col1Padding) + "" + this.getHeatSinks().toString().rpad(" ", col2Padding) + "" + this.getHeatSinksWeight() + "\n";
		html += "" + this.getGyroName().rpad(" ", col1Padding + col2Padding) + "" + this.getGyroWeight() + "\n";

		if (this.smallCockpit) {
			html += "" + "Small Cockpit".rpad(" ", col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
		} else {
			html += "" + "Cockpit".rpad(" ", col1Padding + col2Padding) + "" + this.getCockpitWeight() + "\n";
		}

		//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "" + "Jump Jets".rpad(" ",col1Padding + col2Padding) + "" + this.getJumpJetWeight() + "\n";
		//~ }

		if (this.mechType.class == "biped") {
			html += "" + "Actuators" + ": ";
			let actuator_html = "";

			if (this.hasLowerArmActuator("ra"))
				actuator_html += "RLA" + ", ";
			if (this.hasLowerArmActuator("la"))
				actuator_html += "LLA" + ", ";
			if (this.hasHandActuator("ra"))
				actuator_html += "RH" + ", ";
			if (this.hasHandActuator("la"))
				actuator_html += "LH" + ", ";

			if (actuator_html == "")
				actuator_html = "No lower arm actuators";
			else
				actuator_html = actuator_html.substring(0, actuator_html.length - 2);

			html += actuator_html;
			html += "\n";
		}

		html += "" + ("Armor Value" + " (" + this.armorType.name + ")").rpad(" ", col1Padding) + "" + this.getTotalArmor().toString().rpad(" ", col2Padding) + "" + this.getArmorWeight() + "\n";

		var col1Padding = 20;
		var col2Padding = 10;
		var col3Padding = 15;
		var col4Padding = 10;

		// Armor Factor Table

		html += "Internal Structure".lpad(" ", col1Padding + col2Padding) + "" + "Armor Value".lpad(" ", col3Padding) + "\n";
		html += "" + "Head".lpad(" ", col1Padding) + "" + this.internalStructure.head.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.head.toString().lpad(" ", col3Padding) + "\n";
		html += "" + "Center Torso"lpad(" ", col1Padding) + "" + this.internalStructure.centerTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.centerTorso.toString().lpad(" ", col3Padding) + "\n";
		html += "" + "Center Torso (Rear)".lpad(" ", col1Padding) + "" + this.armorAllocation.centerTorsoRear.toString().lpad(" ", col2Padding) + "\n";
		if (this.armorAllocation.rightTorso == this.armorAllocation.leftTorso && this.armorAllocation.rightTorsoRear == this.armorAllocation.leftTorsoRear) {
			html += "" + "R/L Torso".lpad(" ", col1Padding) + "" + this.internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
			html += "" + "R/L Torso (Rear)".lpad(" ", col1Padding) + "" + this.armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";
		} else {
			html += "" + "Right Torso".lpad(" ", col1Padding) + "" + this.internalStructure.rightTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightTorso.toString().lpad(" ", col3Padding) + "\n";
			html += "" + "Right Torso (Rear)".lpad(" ", col1Padding) + "" + this.armorAllocation.rightTorsoRear.toString().lpad(" ", col2Padding) + "\n";

			html += "" + "Left Torso".lpad(" ", col1Padding) + "" + this.internalStructure.leftTorso.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftTorso.toString().lpad(" ", col3Padding) + "\n";
			html += "" + "Left Torso (Rear)".lpad(" ", col1Padding) + "" + this.armorAllocation.leftTorsoRear.toString().lpad(" ", col2Padding) + "\n";
		}
		if (this.mechType.class == "biped") {

			if (this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
				html += "" + "R/L Arm".lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + "Right Arm".lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
				html += "" + "Left Arm".lpad(" ", col1Padding) + "" + this.internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
			}

			if (this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
				html += "" + "R/L Leg".lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + "Right Leg".lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
				html += "" + "Left Leg".lpad(" ", col1Padding) + "" + this.internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
			}
		} else {
			if (this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
				html += "" + this.getTranslation("TRO_ARMOR_RLFL").lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + this.getTranslation("TRO_ARMOR_RFL").lpad(" ", col1Padding) + "" + this.internalStructure.rightArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightArm.toString().lpad(" ", col3Padding) + "\n";
				html += "" + this.getTranslation("TRO_ARMOR_LFL").lpad(" ", col1Padding) + "" + this.internalStructure.leftArm.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftArm.toString().lpad(" ", col3Padding) + "\n";
			}

			if (this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
				html += "" + this.getTranslation("TRO_ARMOR_RLRL").lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
			} else {
				html += "" + this.getTranslation("TRO_ARMOR_RRL").lpad(" ", col1Padding) + "" + this.internalStructure.rightLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.rightLeg.toString().lpad(" ", col3Padding) + "\n";
				html += "" + "R/L Leg".lpad(" ", col1Padding) + "" + this.internalStructure.leftLeg.toString().lpad(" ", col2Padding) + "" + this.armorAllocation.leftLeg.toString().lpad(" ", col3Padding) + "\n";
			}
		}
		// End Factor Table
		html += "";
		html += "\n";


		var col1Padding = 20;
		var col2Padding = 10;
		var col3Padding = 10;
		var col4Padding = 10;
		this.equipmentList.sort(sortByLocationThenName);

		// Weapons and Ammo
		for (eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
			if (this.equipmentList[eq_count].name[this.useLang].length + 3 > col1Padding)
				col1Padding = this.equipmentList[eq_count].name[this.useLang].length + 3;
		}

		for (var locC = 0; locC < this.validJJLocations.length; locC++) {

			var jjObjs = [];
			for (var critC = 0; critC < this.criticals[this.validJJLocations[locC].long].length; critC++) {
				if (
					criticals[this.validJJLocations[locC].long][critC] &&
					criticals[this.validJJLocations[locC].long][critC].tag &&
					criticals[this.validJJLocations[locC].long][critC].tag.indexOf("jj-") === 0
				) {
					if (this.criticals[this.validJJLocations[locC].long][critC].name + 3 > col1Padding)
						col1Padding = this.criticals[this.validJJLocations[locC].long][critC].name + 3;
				}
			}
		}



		html += "" + "Weapons" + "\n";

		html += "and Ammo".rpad(" ", col1Padding) + "" + "Location".rpad(" ", col2Padding) + "" + "Critical".rpad(" ", col3Padding) + "" + "Tonnage".rpad(" ", col4Padding) + "\n";



		for (eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
			if (typeof(this.equipmentList[eq_count].location) == "undefined")
				this.equipmentList[eq_count].location = "n/a";

			item_location = "";
			item_location = this.getLocationAbbr(this.equipmentList[eq_count].location);

			if( this.equipmentList[eq_count].rear)
				item_location += " (R)"

			if (this.equipmentList[eq_count].ammoPerTon && this.equipmentList[eq_count].ammoPerTon > 0) {
				html += "" + (this.equipmentList[eq_count].name[this.useLang] + " " + this.equipmentList[eq_count].ammoPerTon).rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + this.equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + this.equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
			} else {
				html += "" + this.equipmentList[eq_count].name[this.useLang].rpad(" ", col1Padding) + "" + item_location.toUpperCase().toString().rpad(" ", col2Padding) + "" + this.equipmentList[eq_count].space.battlemech.toString().rpad(" ", col3Padding) + "" + this.equipmentList[eq_count].weight.toString().rpad(" ", col4Padding) + "\n";
			}

		}



		// List Jump Jets Allocations...

		for (var locC = 0; locC < this.validJJLocations.length; locC++) {

			var jjObjs = [];
			for (var critC = 0; critC < this.criticals[this.validJJLocations[locC].long].length; critC++) {
				if (
					this.criticals[this.validJJLocations[locC].long][critC] &&
					this.criticals[this.validJJLocations[locC].long][critC].tag &&
					this.criticals[this.validJJLocations[locC].long][critC].tag.indexOf("jj-") === 0
				) {
					jjObjs.push(this.criticals[this.validJJLocations[locC].long][critC]);
				}
			}

			if (jjObjs.length > 0) {
				var areaWeight = 0;
				if (this.tonnage <= 55) {
					// 10-55 tons
					areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
				} else if (this.tonnage <= 85) {
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

		for (var critC = 0; critC < _unallocatedCriticals.length; critC++) {
			if (
				unallocatedCriticals[critC] &&
				unallocatedCriticals[critC].tag &&
				unallocatedCriticals[critC].tag.indexOf("jj-") === 0
			) {
				jjObjs.push(_unallocatedCriticals[critC]);
			}
		}

		if (jjObjs.length > 0) {
			var areaWeight = 0;
			if (this.tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
			} else if (this.tonnage <= 85) {
				// 60 - 85 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
			} else {
				// 90+ tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
			}
			html += "" + jjObjs[0].name.rpad(" ", col1Padding) + "" + "n/a".toUpperCase().rpad(" ", col2Padding) + "" + jjObjs.length.toString().rpad(" ", col3Padding) + "" + areaWeight.toString().rpad(" ", col4Padding) + "\n";

		}



		var createdBy = "\n\nCreated with BattleTech Tools: [url]https://jdgwf.github.io/battletech-tools/[/url]\n\n";


		return "[code]" + html + "[/code]" + createdBy;

	}

	makeTROHTML() {


		let html = "<table class=\"mech-tro\">";

		// Header Info
		html += "<tr><td colspan=\"4\">" + "Type" + ": " + this.getName() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + "Technology Base" + ": " + this.getTech().name[this.useLang] + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + "Era" + ": " + this.getEra().name[this.useLang] + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + "Tonnage" + ": " + this.getTonnage() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + "Battle Value" + ": " + this.getBattleValue() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + "Alpha Strike Value" + ": " + this.getAlphaStrikeValue() + "</td></tr>";
		html += "<tr><td colspan=\"4\">" + "C-Bill Cost" + ": $" + this.getCBillCost() + "</td></tr>";
		html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";

		// Equipment
		html += "<tr><th class=\"text-left\" colspan=\"3\">" + "Equipment" + "</th><th class=\"text-center\" colspan=\"1\">" + "Mass" + "</th></tr>";
		html += "<tr><td colspan=\"3\">" + "Internal Structure" + " (" + this.selectedInternalStructure.name + ")</td><td class=\"text-center\" colspan=\"1\">" + this.getInteralStructureWeight() + "</td></tr>";
		html += "<tr><td colspan=\"1\">" + this.getEngineName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

		html += "<tr><td colspan=\"1\" class=\"text-right\">" + "Walking" + "</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
		html += "<tr><td colspan=\"1\" class=\"text-right\">" + "Running" + "</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
		html += "<tr><td colspan=\"1\" class=\"text-right\">" + "Jumping" + "</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

		html += "<tr><td colspan=\"1\">" + this.getHeatSyncName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
		html += "<tr><td colspan=\"3\">" + this.getGyroName() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

		if (this.smallCockpit) {
			html += "<tr><td colspan=\"3\">" + "Small Cockpit" + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
		} else {
			html += "<tr><td colspan=\"3\">" + "Cockpit" + "</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
		}

		//~ if( this.getJumpJetWeight() > 0 ) {
		//~ html += "<tr><td colspan=\"3\">" + "Jump Jets" + "</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
		//~ }

		if (this.mechType.class == "biped") {
			html += "<tr><td colspan=\"4\">" + "Actuators" + ": ";
			let actuator_html = "";

			if (this.hasLowerArmActuator("ra"))
				actuator_html += "RLA" + ", ";
			if (this.hasLowerArmActuator("la"))
				actuator_html += "LLA" + ", ";
			if (this.hasHandActuator("ra"))
				actuator_html += "RH" + ", ";
			if (this.hasHandActuator("la"))
				actuator_html += "LH" + ", ";

			if (actuator_html == "")
				actuator_html = "No lower arm actuators";
			else
				actuator_html = actuator_html.substring(0, actuator_html.length - 2);

			html += actuator_html;
			html += "</td></tr>";
		}

		html += "<tr><th colspan=\"1\">" + "Armor Value" + " (" + this.armorType.name + ")</th><th class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</th><th class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</th></tr>";

		// Armor Factor Table
		html += "<tr><td colspan=\"1\"></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + "Internal Structure" + "</em></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">" + "Armor Value" + "</em></td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Head" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.head + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.head + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Center Torso" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.centerTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.centerTorso + "</td><td>&nbsp;</td></tr>";
		html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Center Torso (Rear)" + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.centerTorsoRear + "</td><td>&nbsp;</td></tr>";
		if (this.armorAllocation.rightTorso == this.armorAllocation.leftTorso && this.armorAllocation.rightTorsoRear == this.armorAllocation.leftTorsoRear) {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "R/L Torso" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "R/L Torso (Rear)" + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";
		} else {
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Right Torso" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Right Torso (Rear)" + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";

			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Left Torso" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftTorso + "</td><td>&nbsp;</td></tr>";
			html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Left Torso (Rear)" + "</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftTorsoRear + "</td><td>&nbsp;</td></tr>";
		}
		if (this.mechType.class == "biped") {

			if (this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "R/L Arm" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Right Arm" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Left Arm" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
			}

			if (this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "R/L Leg" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Right Leg" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "Left Leg" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
			}
		} else {
			if (this.armorAllocation.rightArm == this.armorAllocation.leftArm) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_LFL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
			}

			if (this.armorAllocation.rightLeg == this.armorAllocation.leftLeg) {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RLRL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
			} else {
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + this.getTranslation("TRO_ARMOR_RRL") + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
				html += "<tr><td  class=\"text-right\"colspan=\"1\">" + "R/L Leg" + "</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
			}
		}
		// End Factor Table
		html += "</table>";
		html += "<br />";

		// Weapons and Ammo
		html += "<table class=\"mech-tro\">";
		html += "<tr><th class=\"text-left\">" + "Weapons" + "<br />" + "and Ammo" + "</th><th class=\"text-center\">" + "Location" + "</th><th class=\"text-center\">" + "Critical" + "</th><th class=\"text-center\">" + "Tonnage" + "</th></tr>";

		this.equipmentList.sort(sortByLocationThenName);

		for (eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
			if (typeof(this.equipmentList[eq_count].location) == "undefined")
				this.equipmentList[eq_count].location = "n/a";

			item_location = "";
			item_location = this.getLocationAbbr(this.equipmentList[eq_count].location);

			if( this.equipmentList[eq_count].rear)
				item_location += " (R)"

			if (this.equipmentList[eq_count].ammoPerTon && this.equipmentList[eq_count].ammoPerTon > 0)
				html += "<tr><td class=\"text-left\">" + this.equipmentList[eq_count].name[this.useLang] + " " + this.equipmentList[eq_count].ammoPerTon + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + this.equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this.equipmentList[eq_count].weight + "</td></tr>";
			else
				html += "<tr><td class=\"text-left\">" + this.equipmentList[eq_count].name[this.useLang] + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + this.equipmentList[eq_count].space.battlemech + "</td><td class=\"text-center\">" + this.equipmentList[eq_count].weight + "</td></tr>";
		}

		// List Jump Jets Allocations...

		for (var locC = 0; locC < this.validJJLocations.length; locC++) {

			var jjObjs = [];
			for (var critC = 0; critC < this.criticals[this.validJJLocations[locC].long].length; critC++) {
				if (
					criticals[this.validJJLocations[locC].long][critC] &&
					criticals[this.validJJLocations[locC].long][critC].tag &&
					criticals[this.validJJLocations[locC].long][critC].tag.indexOf("jj-") === 0
				) {
					jjObjs.push(this.criticals[this.validJJLocations[locC].long][critC]);
				}
			}

			if (jjObjs.length > 0) {
				var areaWeight = 0;
				if (this.tonnage <= 55) {
					// 10-55 tons
					areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
				} else if (this.tonnage <= 85) {
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

		for (var critC = 0; critC < _unallocatedCriticals.length; critC++) {
			if (
				unallocatedCriticals[critC] &&
				unallocatedCriticals[critC].tag &&
				unallocatedCriticals[critC].tag.indexOf("jj-") === 0
			) {
				jjObjs.push(_unallocatedCriticals[critC]);
			}
		}

		if (jjObjs.length > 0) {
			var areaWeight = 0;
			if (this.tonnage <= 55) {
				// 10-55 tons
				areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
			} else if (this.tonnage <= 85) {
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
	getLocationAbbr(location_tag) {


		for (loc_count = 0; loc_count < battlemechLocations.length; loc_count++) {
			if (location_tag == battlemechLocations[loc_count].tag) {
				if (battlemechLocations[loc_count].abbr[this.useLang] != "undefined")
					return battlemechLocations[loc_count].abbr[this.useLang];
				else
					return battlemechLocations[loc_count].abbr[this.useLang];
			}
		}
		return this.getTranslation("TRO_NOT_AVAILABLE");
	}

	clearMech() {
		this.setEngineType( "standard" );
		this.setMechType(1);
		this.setTonnage(20);
		this.calc();
	}

	calc() {


		maxMoveHeat = 2;
		maxWeaponHeat = 0;
		heatDissipation = 0;


		weights = [];
		weights.push({
			name: "Internal Structure",
			weight: this.getInteralStructureWeight()
		});

		if (this.smallCockpit) {
			this.setCockpitWeight(2);
			weights.push({
				name: "Small Cockpit",
				weight: this.getCockpitWeight()
			});
		} else {
			this.setCockpitWeight(3);
			weights.push({
				name: "Cockpit",
				weight: this.getCockpitWeight()
			});
		}

		runSpeed = Math.ceil(_walkSpeed * 1.5);

		if (_era == 0) {
			era = btEraOptions[1];
		}

		if (this.tech == 0) {
			tech = btTechOptions[0];
		}

		if (this.mechType == 0) {
			mechType = mechTypeOptions[0];
		}


		if (this.engine) {

			weights.push({
				name: this.engineType.name[this.useLang] + " - " + this.engineType.rating,
				weight: this.getEngineWeight()
			});

			weights.push({
				name: _gyro.name[this.useLang],
				weight: this.getGyroWeight()
			});

		}

		if (this.jumpSpeed > 0) {
			maxMoveHeat = this.jumpSpeed;
			if (this.jumpJetType == "Standard") {
				// standard
				weights.push({
					name: "Jump Jets",
					weight: this.getJumpJetWeight()
				});
			} else {
				// improved
				weights.push({
					name: "Improved Jets",
					weight: this.getJumpJetWeight()
				});
			}
		}

		let totalArmor = this.armorWeight * 16;

		//~ switch( this.getArmorType() ) {

		//~ default: // standard
		//~ _totalArmor = this.armorWeight * 16;
		//~ break;
		//~ }
		if (this.getTech().tag == "clan") {
			totalArmor = Math.floor(this.armorWeight * this.getArmorObj().armormultiplier.clan);
		} else {
			totalArmor = Math.floor(this.armorWeight * this.getArmorObj().armormultiplier.is);
		}


		if (this.totalArmor > this.maxArmor)
			totalArmor = this.maxArmor;

		this.weights.push({
			name: "Armor",
			weight: this.armorWeight
		});
		let unallocatedArmor = totalArmor;
		unallocatedArmor -= this.armorAllocation.head;

		unallocatedArmor -= this.armorAllocation.centerTorso;
		unallocatedArmor -= this.armorAllocation.leftTorso;
		unallocatedArmor -= this.armorAllocation.rightTorso;

		unallocatedArmor -= this.armorAllocation.centerTorsoRear;
		unallocatedArmor -= this.armorAllocation.leftTorsoRear;
		unallocatedArmor -= this.armorAllocation.rightTorsoRear;

		unallocatedArmor -= this.armorAllocation.rightArm;
		unallocatedArmor -= this.armorAllocation.leftArm;

		unallocatedArmor -= this.armorAllocation.rightLeg;
		unallocatedArmor -= this.armorAllocation.leftLeg;


        let maxWeaponHeat = 0;

		if (this.additionalHeatSinks > 0)
			this.weights.push({
				name: "Additional Heat Sinks",
				weight: this.additionalHeatSinks
			});

		this._calcVariableEquipment();
		for (let eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
			if (this.equipmentList[eq_count].rear) {
				this.weights.push({
					name: this.equipmentList[eq_count].name + " (" + this.getTranslation("GENERAL_REAR") + ")",
					weight: this.equipmentList[eq_count].weight
				});
			} else {
				this.weights.push({
					name: this.equipmentList[eq_count].name + "",
					weight: this.equipmentList[eq_count].weight
				});
			}
			if (this.equipmentList[eq_count])
				maxWeaponHeat += this.equipmentList[eq_count].heat;
		}

		let currentTonnage = 0;
		for (let weight_counter = 0; weight_counter < this.weights.length; weight_counter++) {
			currentTonnage += this.weights[weight_counter].weight;
		}

		let remainingTonnage = this.tonnage - currentTonnage;

		this.heatSinkCriticals = {};
		this.heatSinkCriticals.number = 0;
		//~ this.heatSinkCriticals.slots_type = "single slot";
		this.heatSinkCriticals.slots_each = 1;

		//~ if( _heatSinkType == "double") {
		//~ if( this.tech.tag == "clan") {
		//~ this.heatSinkCriticals.slots_type = "double slot";
		//~ this.heatSinkCriticals.slots_each = 2;
		//~ } else {
		//~ this.heatSinkCriticals.slots_type = "triple slot";
		//~ this.heatSinkCriticals.slots_each = 3;
		//~ }
		//~ _heatDissipation = (this.additionalHeatSinks + 10) * 2;
		//~ } else {
		//~ this.heatSinkCriticals.slots_type = "single";
		//~ this.heatSinkCriticals.slots_each = 1;
		//~ _heatDissipation = this.additionalHeatSinks + 10;
		//~ }

		heatDissipation = (this.additionalHeatSinks + 10) * _heatSinkType.dissipation;
		this.heatSinkCriticals.slots_each = _heatSinkType.crits[this.getTech().tag];

		if (this.getEngine().rating) {
			this.heatSinkCriticals.number = this.additionalHeatSinks + 10 - Math.floor(this.getEngine().rating / 25);
		} else {
			this.heatSinkCriticals.number = 0
		}

		this.calcCriticals();
		// this._calcAlphaStrike();
		this.calcBattleValue();
		this.calcCBillCost();

		this.equipmentList = this.equipmentList.sort(sortByLocationThenName);
		this.sortedEquipmentList = [];
		for (eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {


			var foundIt = false;

			for (var se_count = 0; se_count < this.sortedEquipmentList.length; se_count++) {
				if (
					this.equipmentList[eq_count].location == this.sortedEquipmentList[se_count].location &&
					this.equipmentList[eq_count].tag == this.sortedEquipmentList[se_count].tag
				) {
					this.sortedEquipmentList[se_count].count++;
					foundIt = true;
				}
			}

			if (!foundIt) {
				var eqItem = angular.copy(this.equipmentList[eq_count]);
				eqItem.local_name = this.getLocalTranslation(eqItem.name);
				eqItem.count = 1;
				this.sortedEquipmentList.push(eqItem);
			}
		}
	}

	calcCriticals() {
		// WORK IN PROGRESS
		criticals.head = Array(6);

		criticals.centerTorso = Array(12);
		criticals.leftTorso = Array(12);
		criticals.rightTorso = Array(12);

		criticals.rightArm = Array(12);
		criticals.leftArm = Array(12);

		criticals.rightLeg = Array(6);
		criticals.leftLeg = Array(6);

		unallocatedCriticals = [];

		// Add required components....
		if (this.smallCockpit) {
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

		if (this.mechType.class.toLowerCase() == "quad") {
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
			engineType &&
			engineType.criticals &&
			engineType.criticals[this.getTech().tag] &&
			engineType.criticals[this.getTech().tag].ct > 3
		) {
			this._addCriticalItem(
				"engine", // item_tag
				engineType.name[this.useLang], // item_name
				3, // critical_count
				"ct" // location
				// slot
			);
		} else {
			// reset back to standard, engine not available for tech
			console.log("warning", "resetting engine to standard ", this.engineType.criticals, this.getTech().tag, this.tech);
			this.setEngineType("standard");
			this._addCriticalItem(
				"engine", // item_tag
				engineType.name[this.useLang], // item_name
				engineType.criticals[this.getTech().tag].ct, // critical_count
				"ct" // location
				// slot
			);
		}

		if (
			engineType.criticals[this.getTech().tag] &&
			engineType.criticals[this.getTech().tag].rt
		) {
			this._addCriticalItem("engine", this.engineType.name[this.useLang], this.engineType.criticals[this.getTech().tag].rt, "rt");
		}
		if (
			engineType.criticals[this.getTech().tag] &&
			engineType.criticals[this.getTech().tag].lt
		) {
			this._addCriticalItem("engine", this.engineType.name[this.useLang], this.engineType.criticals[this.getTech().tag].lt, "lt");
		}

		// Gyro
		this._addCriticalItem(
			"gyro", // item_tag
			gyro.name[this.useLang], // item_name
			gyro.criticals, // critical_count
			"ct" // location
		);

		// Extra engine bits....
		if (this.engineType.criticals[this.getTech().tag].ct > 3) {
			this._addCriticalItem(
				"engine", // item_tag
				engineType.name[this.useLang], // item_name
				engineType.criticals[this.getTech().tag].ct - 3, // critical_count
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
			unallocatedCriticals.push({
				name: this.jumpJetType.name[this.useLang],
				tag: "jj-" + this.jumpJetType.tag,
				rear: false,
				movable: true,
				crits: this.jumpJetType.criticals
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
							armorObj.name[this.useLang], // item_name
							armorObj.crits_loc[nameLoc], // critical_count
							nameLoc // location
							// slot
						);
					}
				} else {
					for (var aCounter = 0; aCounter < armorObj.crits.clan; aCounter++) {
						unallocatedCriticals.push({
							name: armorObj.name[this.useLang],
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
							armorObj.name[this.useLang], // item_name
							armorObj.crits_loc[nameLoc], // critical_count
							nameLoc // location
							// slot
						);
					}
				} else {
					for (var aCounter = 0; aCounter < armorObj.crits.is; aCounter++) {
						unallocatedCriticals.push({
							name: armorObj.name[this.useLang],
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
			for (var aCounter = 0; aCounter < this.selectedInternalStructure.crits.clan; aCounter++) {
				unallocatedCriticals.push({
					name: this.selectedInternalStructure.name[this.useLang],
					tag: this.selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this.selectedInternalStructure,
					movable: true
				});
			}


		} else {
			for (var aCounter = 0; aCounter < this.selectedInternalStructure.crits.is; aCounter++) {
				unallocatedCriticals.push({
					name: this.selectedInternalStructure.name[this.useLang],
					tag: this.selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this.selectedInternalStructure,
					movable: true
				});
			}
		}


		// Get optional equipment...
		//~ this._calcVariableEquipment();
		for (var elc = 0; elc < this.equipmentList.length; elc++) {
			//~ this.equipmentList[elc].location = "";
			var rearTag = "";
			if (this.equipmentList[elc].rear)
				rearTag = " (" + this.getTranslation("GENERAL_REAR") + ")";


			unallocatedCriticals.push({
				name: this.equipmentList[elc].name[this.useLang] + rearTag,
				tag: this.equipmentList[elc].tag,
				rear: this.equipmentList[elc].rear,
				crits: this.equipmentList[elc].space.battlemech,
				obj: this.equipmentList[elc],
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

			unallocatedCriticals.push({
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
				criticalAllocationTable[alt_c].tag,
				criticalAllocationTable[alt_c].rear,
				criticalAllocationTable[alt_c].loc,
				criticalAllocationTable[alt_c].slot,
				true
			)
		}


		// remove location tag for remaining unallocated
		for (var lCount = 0; lCount < _unallocatedCriticals.length; lCount++) {
			if (_unallocatedCriticals[lCount].obj)
				unallocatedCriticals[lCount].obj.location = "";
		}

	}

	hasHandActuator(location) {
		if (location == "ra")
			if (this.no_right_arm_hand_actuator)
				return false;
		if (location == "la")
			if (_no_left_arm_hand_actuator)
				return false;
		return true;
	}

	localizeLocationAbbreviation(locationAbbr) {
		// TODO
		return locationAbbr;
	}

	hasLowerArmActuator(location) {
		if (location == "ra")
			if (_no_right_arm_lower_actuator)
				return false;
		if (location == "la")
			if (this.no_left_arm_lower_actuator)
				return false;
		return true;
	}


	removeHandActuator(location) {
		if (location == "ra") {
			no_right_arm_hand_actuator = true;
		}
		if (location == "la") {
			no_left_arm_hand_actuator = true;
		}
		this.calc();

	}

	removeLowerArmActuator(location) {
		if (location == "ra") {
			no_right_arm_hand_actuator = true;
			no_right_arm_lower_actuator = true;

		}
		if (location == "la") {
			no_left_arm_hand_actuator = true;
			no_left_arm_lower_actuator = true;
		}
		this.calc();
	}

	addHandActuator(location) {
		if (location == "ra") {
			no_right_arm_hand_actuator = false;
			no_right_arm_lower_actuator = false;

		}
		if (location == "la") {
			no_left_arm_hand_actuator = false;
			no_left_arm_lower_actuator = false;
		}
		this.calc();
	}

	addLowerArmActuator(location) {
		if (location == "ra") {
			//	no_right_arm_hand_actuator = false;
			no_right_arm_lower_actuator = false;

		}
		if (location == "la") {
			//	no_left_arm_hand_actuator = false;
			no_left_arm_lower_actuator = false;
		}
		this.calc();
	}

	getMaxMovementHeat() {
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

	addCriticalItem(item_tag, item_name, critical_count, location, slot, movable) {
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
				this._assignItemToArea(this.criticals.head, item, critical_count, slot);

			} else if (location == "ct") {
				this._assignItemToArea(this.criticals.centerTorso, item, critical_count, slot);

			} else if (location == "lt") {
				this._assignItemToArea(this.criticals.leftTorso, item, critical_count, slot);

			} else if (location == "rt") {
				this._assignItemToArea(this.criticals.rightTorso, item, critical_count, slot);

			} else if (location == "ra") {
				this._assignItemToArea(this.criticals.rightArm, item, critical_count, slot);

			} else if (location == "la") {
				this._assignItemToArea(this.criticals.leftArm, item, critical_count, slot);

			} else if (location == "rl") {
				this._assignItemToArea(this.criticals.rightLeg, item, critical_count, slot);

			} else if (location == "ll") {
				this._assignItemToArea(this.criticals.leftLeg, item, critical_count, slot);

			} else {
				return item;
			}

		} else {
			return item;
		}
	}

	isNextXCritsAvailable(area_array, critical_count, begin_slot) {
		returnValue = true;
		for (isca_c = 0; isca_c < critical_count; isca_c++) {
			if (area_array[begin_slot + isca_c] != null) {
				returnValue = false;
			}
		}
		return returnValue;
	}

	assignItemToArea(area_array, new_item, critical_count, slot_number) {

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


	canBeAssignedToArea(area_array, new_item, critical_count, slot_number) {

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

	trimCriticals() {
		criticals.head = this.criticals.head.slice(0, 6);

		criticals.centerTorso = this.criticals.centerTorso.slice(0, 12);
		criticals.leftTorso = this.criticals.leftTorso.slice(0, 12);
		criticals.rightTorso = this.criticals.rightTorso.slice(0, 12);



		criticals.rightLeg = this.criticals.rightLeg.slice(0, 6);
		criticals.leftLeg = this.criticals.leftLeg.slice(0, 6);

		if (this.mechType.class.toLowerCase() == "quad") {
			criticals.rightArm = this.criticals.rightArm.slice(0, 6);
			criticals.leftArm = this.criticals.leftArm.slice(0, 6);
		} else {
			criticals.rightArm = this.criticals.rightArm.slice(0, 12);
			criticals.leftArm = this.criticals.leftArm.slice(0, 12);
		}
	}

	getHeatSinksType() {
		return _heatSinkType.tag;
	}

	getHeatSinksObj() {
		return _heatSinkType;
	}


	setHeatSinksType(newValue) {
		for (var lCounter = 0; lCounter < mechHeatSinkTypes.length; lCounter++) {
			if (mechHeatSinkTypes[lCounter].tag == newValue)
				heatSinkType = mechHeatSinkTypes[lCounter];
		}

		return _heatSinkType;
	}

	getCurrentTonnage() {
		return _currentTonnage;
	}

	getHeatSinkCriticalRequirements() {

		return this.heatSinkCriticals;
	}


	getArmorAllocation() {
		return this.armorAllocation;
	}

	getRemainingTonnage() {

		return _remainingTonnage;

	}

	getMoveHeat() {
		return _maxMoveHeat;
	}

	getWeaponHeat() {
		return _maxWeaponHeat;
	}

	getHeatDissipation() {
		return _heatDissipation;
	}

	getWalkSpeed() {
		return _walkSpeed;
	}

	setWalkSpeed(walkSpeed) {
		walkSpeed = walkSpeed / 1;
		this.setEngine(this.tonnage * _walkSpeed);

		if (this.jumpSpeed > _walkSpeed)
			this.setJumpSpeed(_walkSpeed);

		return _walkSpeed;
	}

	getRunSpeed() {
		return _runSpeed;
	}

	getJumpSpeed() {
		return this.jumpSpeed;
	}

	setJumpSpeed(jumpSpeed) {
		jumpSpeed = jumpSpeed / 1;
		this.calc();
		return _walkSpeed;
	}

	getArmorWeight() {
		return this.armorWeight;
	}

	getArmorType() {
		return this.armorType.tag;
	}

	getArmorObj() {
		return this.armorType;
	}


	setArmorType(armorTag) {
		for (var aCount = 0; aCount < mechArmorTypes.length; aCount++) {
			if (mechArmorTypes[aCount].tag == armorTag) {
				armorType = mechArmorTypes[aCount];
			}
		}
		return this.armorType;
	}

	getTotalArmor() {
		return _totalArmor;
	}

	getUnallocatedArmor() {
		return _unallocatedArmor;
	}

	setArmorWeight(armorWeight) {
		armorWeight = armorWeight / 1;
		this.calc();
		return this.armorWeight;
	}

	getEngine() {
		return this.engine;
	}

	setEngine(ratingNumber) {
		ratingNumber = ratingNumber / 1;
		for (engine_count = 0; engine_count < mechEngineOptions.length; engine_count++) {
			if (mechEngineOptions[engine_count].rating == ratingNumber) {
				engine = mechEngineOptions[engine_count];
				this.calc();
				return this.engine;
			}
		}
		this.calc();
		return 0;
	}

	getInternalStructureType() {
		return this.selectedInternalStructure.tag;
	}

	getInternalStructure() {
		return this.internalStructure;
	}

	setInternalStructureType(isTag) {
		for (lCounter = 0; lCounter < mechInternalStructureTypes.length; lCounter++) {
			if (isTag == mechInternalStructureTypes[lCounter].tag) {
				selectedInternalStructure = mechInternalStructureTypes[lCounter];
				return this.selectedInternalStructure;
			}
		}

		return null;
	}


	getGyro() {
		return _gyro;
	}


	getEra() {
		return _era;
	}

	getCriticals() {
		this._trimCriticals();
		return this.criticals;
	}


	getUnallocatedCriticals() {
		return _unallocatedCriticals;
	}



	getEra() {
		return _era;
	}

	setEra(eraID) {

		for (lcounter = 0; lcounter < btEraOptions.length; lcounter++) {
			if (eraID == btEraOptions[lcounter].id) {
				era = btEraOptions[lcounter];
				this.calc();
				return _era;
			}
		}
		return null;
	}


	getTech() {
		return this.tech;
	}

	setTech(techID) {
		for (lcounter = 0; lcounter < btTechOptions.length; lcounter++) {
			if (techID == btTechOptions[lcounter].id) {
				tech = btTechOptions[lcounter];
				this.calc();

				// set era to Clan Invasion (id 3) if the techID is 2 (Clan)
				if (techID == 2 && this.getEra().id != 3) {
					this.setEra(3);
				}

				return this.tech;
			}
		}
		return null;
	}


	getMechType() {
		return this.mechType;
	}

	getAlphaStrikeForceStats() {
		return alphaStrikeForceStats;
	}

	getPilot() {
		return this.pilot;
	}


	setPilotName(newValue) {
		pilot.name = newValue;
	}

	setPilotPiloting(newValue) {
		pilot.piloting = newValue;
	}

	setPilotGunnery(newValue) {
		pilot.gunnery = newValue;
	}


	setEngineType(engineType) {
		for (lcounter = 0; lcounter < mechEngineTypes.length; lcounter++) {
			if (engineType.toLowerCase() == mechEngineTypes[lcounter].tag) {
				engineType = mechEngineTypes[lcounter];
				this.calc();
				return this.engineType;
			}
		}
		// default to Military Standard if tag not found.
		engineType = mechEngineTypes[0];
		return this.engineType;
	}

	setGyroType(gyroType) {
		for (lcounter = 0; lcounter < mechGyroTypes.length; lcounter++) {
			if (gyroType.toLowerCase() == mechGyroTypes[lcounter].tag) {
				gyro = mechGyroTypes[lcounter];
				this.calc();
				return _gyro;
			}
		}
		// default to Military Standard if tag not found.
		gyro = mechGyroTypes[0];
		return _gyro;
	}

	getEngineType() {
		return this.engineType;
	}


	getEngineName() {
		if (this.engineType.name[this.useLang])
			return this.engineType.name[this.useLang];
		else
			return this.engineType.name["en-US"];
	}

	getHeatSyncName() {

		if (this.heat_sink_type == "single") {
			return this.getTranslation("BM_STEP3_SINGLE_HS");
		} else {
			return this.getTranslation("BM_STEP3_DOUBLE_HS");
		}


	}

	getGyroName() {
		if (_gyro.name[this.useLang])
			return _gyro.name[this.useLang];
		else
			return _gyro.name["en-US"];
	}


	getName() {
		return _make;
	}

	setName(newValue) {
		make = newValue;
		return _make;
	}

	getTonnage() {
		return this.tonnage;
	}

	setTonnage(newValue) {
		tonnage = parseInt(newValue);

		internalStructure.head = this.selectedInternalStructure.perTon[this.getTonnage()].head;

		internalStructure.centerTorso = this.selectedInternalStructure.perTon[this.getTonnage()].centerTorso;
		internalStructure.leftTorso = this.selectedInternalStructure.perTon[this.getTonnage()].rlTorso;
		internalStructure.rightTorso = this.selectedInternalStructure.perTon[this.getTonnage()].rlTorso;

		internalStructure.rightArm = this.selectedInternalStructure.perTon[this.getTonnage()].rlArm;
		internalStructure.leftArm = this.selectedInternalStructure.perTon[this.getTonnage()].rlArm;

		internalStructure.rightLeg = this.selectedInternalStructure.perTon[this.getTonnage()].rlLeg;
		internalStructure.leftLeg = this.selectedInternalStructure.perTon[this.getTonnage()].rlLeg;

		maxArmor = 9 + this.internalStructure.centerTorso * 2 + this.internalStructure.leftTorso * 2 + this.internalStructure.rightTorso * 2 + this.internalStructure.rightLeg * 2 + this.internalStructure.leftLeg * 2;
		if (this.mechType.class.toLowerCase() == "biped")
			maxArmor += this.internalStructure.leftArm * 2 + this.internalStructure.rightArm * 2;
		else
			maxArmor += this.internalStructure.rightLeg * 2 + this.internalStructure.leftLeg * 2;


		if (this.mechType.class.toLowerCase() == "quad") {
			internalStructure.rightArm = this.internalStructure.rightLeg;
			internalStructure.leftArm = this.internalStructure.leftLeg;
		}

		maxArmorTonnage = _maxArmor / 16;

		totalInternalStructurePoints = 0;

		totalInternalStructurePoints += this.internalStructure.head;

		totalInternalStructurePoints += this.internalStructure.centerTorso;
		totalInternalStructurePoints += this.internalStructure.leftTorso;
		totalInternalStructurePoints += this.internalStructure.rightTorso;

		totalInternalStructurePoints += this.internalStructure.rightArm;
		totalInternalStructurePoints += this.internalStructure.leftArm;

		totalInternalStructurePoints += this.internalStructure.rightLeg;
		totalInternalStructurePoints += this.internalStructure.leftLeg;

		this.setWalkSpeed(_walkSpeed);
		this.calc();

		return this.tonnage;
	}


	getMaxArmorTonnage() {
		return _maxArmorTonnage;
	}

	getMaxArmor() {
		return _maxArmor;
	}


	getType() {
		return this.mechType;
	}

	setType(newValue) {
		mechType = newValue;
		this.setTonnage(this.tonnage);
		this.calc();
		return this.mechType;
	}



	exportJSON() {
		// TODO
		this.calc();
		var exportObject = {};
		exportObject.name = this.getName();
		exportObject.tonnage = this.getTonnage();
		exportObject.walkSpeed = _walkSpeed;
		exportObject.jumpSpeed = this.jumpSpeed;
		exportObject.engineType = this.getEngineType().tag;

		exportObject.mechType = this.mechType.id;
		exportObject.era = _era.id;
		exportObject.tech = this.tech.id;

		exportObject.gyro = _gyro.tag;

		exportObject.is_type = this.getInternalStructureType();

		exportObject.additionalHeatSinks = this.additionalHeatSinks;
		exportObject.heat_sink_type = this.getHeatSinksType();

		exportObject.armor_weight = this.armorWeight;
		if (!_uuid)
			uuid = generateUUID();

		exportObject.uuid = _uuid;

        exportObject.strictEra = false;
        if( _strictEra ) {
            exportObject.strictEra = true;
        }

		exportObject.armor_allocation = this.armorAllocation;

		exportObject.armor_type = this.getArmorType();

		exportObject.equipment = [];

		for (eq_count = 0; eq_count < this.equipmentList.length; eq_count++) {
			exportObject.equipment.push({
				tag: this.equipmentList[eq_count].tag,
				loc: this.equipmentList[eq_count].location,
				rear: this.equipmentList[eq_count].rear
			});
		}

		exportObject.allocation = _criticalAllocationTable;
		exportObject.features = [];
		if (!this.hasLowerArmActuator("la"))
			exportObject.features.push("no_lala");
		if (!this.hasLowerArmActuator("ra"))
			exportObject.features.push("no_rala");
		if (!this.hasHandActuator("la"))
			exportObject.features.push("no_laha");
		if (!this.hasHandActuator("ra"))
			exportObject.features.push("no_raha");
		if (this.smallCockpit)
			exportObject.features.push("sm_cockpit");

		exportObject.pilot = this.pilot;

		exportObject.as_role = alphaStrikeForceStats.role;
		exportObject.as_custom_name = alphaStrikeForceStats.customName;

		return JSON.stringify(exportObject);
	}

	getInteralStructure() {
		return this.internalStructure;
	}

	setASRole(newValue) {
		return alphaStrikeForceStats.role = newValue;
	}

	setASCustomName(newValue) {
		return alphaStrikeForceStats.customName = newValue;
	}

	getASCustomName(newValue) {
		return alphaStrikeForceStats.customName;
	}


	importJSON(json_string) {
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
				pilot = importObject.pilot;

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

			if (typeof(importObject.strictEra) != "undefined") {
				if (importObject.strictEra)
					this.strictEra = true;
				else
                    this.strictEra = false;
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
				armorAllocation = importObject.armor_allocation;

			if (importObject.uuid)
				uuid = importObject.uuid;


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
					smallCockpit = true;

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
				criticalAllocationTable = importObject.allocation;

				for (var eq_count = 0; eq_count < _criticalAllocationTable.length; eq_count++) {
					if (!_criticalAllocationTable[eq_count].rear)
						criticalAllocationTable[eq_count].rear = false;
					else
						criticalAllocationTable[eq_count].rear = true;
				}
			}

			if (!this.useLang && localStorage["tmp.preferred_language"])
				useLang = localStorage["tmp.preferred_language"];

			this.calc();
			return true;
		} else {
			return false;
		}

	}

	getWeightBreakdown() {
		return _weights;
	}

	setCenterTorsoArmor(armorValue) {
		armorAllocation.centerTorso = armorValue / 1;
		this.calc();
		return this.armorAllocation.centerTorso;
	}

	setCenterTorsoRearArmor(armorValue) {
		armorAllocation.centerTorsoRear = armorValue / 1;
		this.calc();
		return this.armorAllocation.centerTorsoRear;
	}

	setHeadArmor(armorValue) {
		armorAllocation.head = armorValue / 1;
		this.calc();
		return this.armorAllocation.head;
	}

	setLeftArmArmor(armorValue) {
		armorAllocation.leftArm = armorValue / 1;
		this.calc();
		return this.armorAllocation.leftArm;
	}

	setLeftLegArmor(armorValue) {
		armorAllocation.leftLeg = armorValue / 1;
		this.calc();
		return this.armorAllocation.leftLeg;
	}

	setLeftTorsoArmor(armorValue) {
		armorAllocation.leftTorso = armorValue / 1;
		this.calc();
		return this.armorAllocation.leftTorso;
	}

	setLeftTorsoRearArmor(armorValue) {
		armorAllocation.leftTorsoRear = armorValue / 1;
		this.calc();
		return this.armorAllocation.leftTorsoRear;
	}

	setRightArmArmor(armorValue) {
		armorAllocation.rightArm = armorValue / 1;
		this.calc();
		return this.armorAllocation.rightArm;
	}

	setRightLegArmor(armorValue) {
		armorAllocation.rightLeg = armorValue / 1;
		this.calc();
		return this.armorAllocation.rightLeg;
	}

	setRightTorsoArmor(armorValue) {
		armorAllocation.rightTorso = armorValue / 1;
		this.calc();
		return this.armorAllocation.rightTorso;
	}

	setRightTorsoRearArmor(armorValue) {
		armorAllocation.rightTorsoRear = armorValue / 1;
		this.calc();
		return this.armorAllocation.rightTorsoRear;
	}

	getAdditionalHeatSinks() {
		return this.additionalHeatSinks;
	};


	addEquipment(equipment_index, equipment_list_tag, location, rear) {
		equipment_list = [];
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
			this.equipmentList.push(equipment_item);
			return equipment_item;
		}

		return null;
	};

	addEquipmentFromTag(equipment_tag, equipment_list_tag, location, rear) {
		equipment_list = [];

		if (!equipment_list_tag) {
			equipment_list_tag = this.tech.tag;
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
				this.equipmentList.push(equipment_item);
				return equipment_item;
			}
		}

		return null;
	};

	removeEquipment(equipment_index) {
		if (this.equipmentList[equipment_index]) {
			this.equipmentList.splice(equipment_index, 1);
			return 1;
		}
		return null;
	};

	setRear(equipment_index, newValue) {
		if (this.equipmentList[equipment_index]) {
			this.equipmentList[equipment_index].rear = newValue;
		}
		return this.equipmentList[equipment_index].rear;
	};

	updateCriticalAllocationTable() {
		criticalAllocationTable = [];
		for (mech_location in this.criticals) {

			for (var crit_item_counter = 0; crit_item_counter < this.criticals[mech_location].length; crit_item_counter++) {
				if (
					criticals[mech_location] &&
					criticals[mech_location][crit_item_counter] &&
					criticals[mech_location][crit_item_counter].movable
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
					if (this.criticals[mech_location][crit_item_counter].rear || (this.criticals[mech_location][crit_item_counter].obj && this.criticals[mech_location][crit_item_counter].obj.rear))
						rear = true;

					if (this.criticals[mech_location][crit_item_counter] && this.criticals[mech_location][crit_item_counter].obj)
						criticals[mech_location][crit_item_counter].obj.location = short_loc;

					criticalAllocationTable.push({
						tag: this.criticals[mech_location][crit_item_counter].tag,
						loc: short_loc,
						rear: rear,
						slot: crit_item_counter
					});
				}
			}
		}
		// this.calc();


	};

	moveCritical(itemTag, itemRear, fromLocation, fromIndex, toLocation, toIndex) {



		fromItem = null
		fromLocationObj = null;
		if (fromLocation == "un") {
			if (_unallocatedCriticals[fromIndex]) {
				fromItem = _unallocatedCriticals[fromIndex];

			}
			fromLocationObj = _unallocatedCriticals;
		} else if (fromLocation == "hd") {
			if (this.criticals.head[fromIndex]) {
				fromItem = this.criticals.head[fromIndex];
				fromLocationObj = this.criticals.head;
			}
		} else if (fromLocation == "ct") {
			if (this.criticals.centerTorso[fromIndex]) {
				fromItem = this.criticals.centerTorso[fromIndex];
				fromLocationObj = this.criticals.centerTorso;
			}
		} else if (fromLocation == "rt") {
			if (this.criticals.rightTorso[fromIndex]) {
				fromItem = this.criticals.rightTorso[fromIndex];
				fromLocationObj = this.criticals.rightTorso;
			}
		} else if (fromLocation == "ra") {
			if (this.criticals.rightArm[fromIndex]) {
				fromItem = this.criticals.rightArm[fromIndex];
				fromLocationObj = this.criticals.rightArm;
			}
		} else if (fromLocation == "rl") {
			if (this.criticals.rightLeg[fromIndex]) {
				fromItem = this.criticals.rightLeg[fromIndex];
				fromLocationObj = this.criticals.rightLeg;
			}
		} else if (fromLocation == "lt") {
			if (this.criticals.leftTorso[fromIndex]) {
				fromItem = this.criticals.leftTorso[fromIndex];
				fromLocationObj = this.criticals.leftTorso;
			}
		} else if (fromLocation == "la") {
			if (this.criticals.leftArm[fromIndex]) {
				fromItem = this.criticals.leftArm[fromIndex];
				fromLocationObj = this.criticals.leftArm;
			}
		} else if (fromLocation == "ll") {
			if (this.criticals.leftLeg[fromIndex]) {
				fromItem = this.criticals.leftLeg[fromIndex];
				fromLocationObj = this.criticals.leftLeg;
			}
		}

		;

		if (fromItem) {

			if (toLocation == "hd") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.head, toIndex);
			} else if (toLocation == "ct") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.centerTorso, toIndex);
			} else if (toLocation == "rt") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.rightTorso, toIndex);
			} else if (toLocation == "rl") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.rightLeg, toIndex);
			} else if (toLocation == "ra") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.rightArm, toIndex);
			} else if (toLocation == "lt") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.leftTorso, toIndex);
			} else if (toLocation == "ll") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.leftLeg, toIndex);
			} else if (toLocation == "la") {
				return this._moveItemToArea(fromLocationObj, itemRear, fromItem, fromIndex, this.criticals.leftArm, toIndex);
			}
		}

		return false;
	};

	moveItemToArea(fromLocation, itemRear, fromItem, fromIndex, toLocation, toIndex) {


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

	allocateCritical(equipment_tag, equipment_rear, mech_location, slot_number, remove_from_unallocated) {

		for (uaet_c = 0; uaet_c < _unallocatedCriticals.length; uaet_c++) {

			if (
				equipment_tag == _unallocatedCriticals[uaet_c].tag &&
				unallocatedCriticals[uaet_c].rear == equipment_rear
			) {
				if (_unallocatedCriticals[uaet_c] && _unallocatedCriticals[uaet_c].obj)
					unallocatedCriticals[uaet_c].obj.location = mech_location;

				if (mech_location == "hd") {
					this._assignItemToArea(this.criticals.head, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "ct") {
					this._assignItemToArea(this.criticals.centerTorso, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "rt") {
					this._assignItemToArea(this.criticals.rightTorso, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "rl") {
					this._assignItemToArea(this.criticals.rightLeg, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "ra") {
					this._assignItemToArea(this.criticals.rightArm, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "lt") {
					this._assignItemToArea(this.criticals.leftTorso, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "ll") {
					this._assignItemToArea(this.criticals.leftLeg, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				} else if (mech_location == "la") {
					this._assignItemToArea(this.criticals.leftArm, _unallocatedCriticals[uaet_c], _unallocatedCriticals[uaet_c].crits, slot_number);
				}


				if (remove_from_unallocated) {
					unallocatedCriticals.splice(uaet_c, 1);
				}

				return true;
			}
		}
		return null;
	};

	clearHeatSinkCriticals() {
		for (alloc_c = _criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
			if (_criticalAllocationTable[alloc_c] && _criticalAllocationTable[alloc_c].tag == "heat-sink")
				criticalAllocationTable.splice(alloc_c, 1);
		}

		this.calc();
	};

	clearArmCriticalAllocationTable() {
		for (alloc_c = _criticalAllocationTable.length; alloc_c >= 0; alloc_c--) {
			if (
				criticalAllocationTable[alloc_c] && _criticalAllocationTable[alloc_c].loc == "ra" ||
				criticalAllocationTable[alloc_c] && _criticalAllocationTable[alloc_c].loc == "la"
			) {
				criticalAllocationTable.splice(alloc_c, 1);
			}
		}
		this.calc();
	}

	clearCriticalAllocationTable() {
		criticalAllocationTable = [];

		this.calc();

	}

	setEquipmentLocation(equipment_index, location) {
		if (this.equipmentList[equipment_index]) {
			this.equipmentList[equipment_index].location = location;
			return this.equipmentList[equipment_index];
		}
		return null;
	};

	setAdditionalHeatSinks(newValue) {
		additionalHeatSinks = newValue / 1;
		this.calc();
		return this.additionalHeatSinks;
	};

	getUnallocatedCritCount() {
		return _unallocatedCriticals.length;
	}

	getInstalledEquipment() {
		this._calcVariableEquipment();
		return this.equipmentList;
	};

	calcVariableEquipment() {
		for( var eqC = 0; eqC < this.equipmentList.length; eqC++) {
			if( this.equipmentList[ eqC ].variable_size ) {
				//~ console.log( " this.equipmentList[ eqC ]",  this.equipmentList[ eqC ]);
				this.equipmentList[ eqC ].criticals_divisior
					this.equipmentList[ eqC ].criticals = Math.ceil( this.getTonnage() / this.equipmentList[ eqC ].criticals_divisior );
				this.equipmentList[ eqC ].weight_divisior
					this.equipmentList[ eqC ].weight = Math.ceil( this.getTonnage() / this.equipmentList[ eqC ].weight_divisior );
				this.equipmentList[ eqC ].damage_divisior
					this.equipmentList[ eqC ].damage = Math.ceil( this.getTonnage() / this.equipmentList[ eqC ].damage_divisior );
				this.equipmentList[ eqC ].criticals_divisior
					this.equipmentList[ eqC ].space.battlemech = Math.ceil( this.getTonnage() / this.equipmentList[ eqC ].criticals_divisior );

				if( this.equipmentList[ eqC ].battlevalue_per_item_damage )
					this.equipmentList[ eqC ].battlevalue = this.equipmentList[ eqC ].battlevalue_per_item_damage * this.equipmentList[ eqC ].damage;
				if( this.equipmentList[ eqC ].cost_per_item_ton )
					this.equipmentList[ eqC ].cbills = this.equipmentList[ eqC ].cost_per_item_ton * this.equipmentList[ eqC ].weight;
				//~ console.log( " this.equipmentList[ eqC ]",  this.equipmentList[ eqC ]);
			}
		}
	}
}


function sortByBVThenRearThenHeat( a, b ) {
	if( a.rear )
		a.rear = true;
	else
		a.rear = false;

	if( b.rear )
		b.rear = true;
	else
		b.rear = false;

	if( a.battlevalue < b.battlevalue )
		return 1;
	if( a.battlevalue > b.battlevalue )
		return -1;

	if( a.rear < b.rear )
		return -1;
	if( a.rear > b.rear )
		return 1;

	if( a.heat < b.heat )
		return 1;
	if( a.heat > b.heat )
		return -1;
	return 0;
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