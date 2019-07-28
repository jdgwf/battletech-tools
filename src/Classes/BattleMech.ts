import { addCommas, generateUUID, getMovementModifier } from "../utils";
import { mechTypeOptions } from "../Data/mech-type-options";
import { btTechOptions } from "../Data/tech-options";
import { btEraOptions } from "../Data/era-options";
import { mechArmorTypes } from "../Data/mech-armor-types";
import { mechInternalStructureTypes } from "../Data/mech-internal-structure-types";
import { mechHeatSinkTypes } from "../Data/mech-heat-sink-types";
import { mechEngineTypes } from "../Data/mech-engine-types";
import { mechJumpJetTypes } from "../Data/mech-jump-jet-types";
import { mechGyroTypes } from "../Data/mech-gyro-types";
import { IEquipmentItem, IHeatSync, IEngineOption, IEngineType, IGyro, IArmorType } from "../Data/dataInterfaces";
import { mechEngineOptions } from "../Data/mech-engine-options";
import { battlemechLocations } from "../Data/battlemechLocations";
import { mechISEquipment } from "../Data/mech-is-equipment";
import { mechClanEquipment } from "../Data/mech-clan-equipment";
import { IAlphaStrikeDamage } from "./AlphaStrikeUnit";

interface INumericalHash {
	[index: string]: number;
}

interface IWeights {
    name: string;
    weight: number;
}

export interface ICriticalSlot {
	uuid: string;
	name: string;
	tag: string;
	rear: boolean;
	rollAgain?: boolean;
	crits: number;
	obj: any;
	movable?: boolean;
    placeholder?: boolean;

    loc?: string;
    slot?: number;
}

interface IMechCriticals {
	[location: string]: ICriticalSlot[];
}

interface IArmorAllocation {
	head: number;
	centerTorso: number;
	rightTorso: number;
	leftTorso: number;
	centerTorsoRear: number;
	rightTorsoRear: number;
	leftTorsoRear: number;
	leftArm: number;
	rightArm: number;
	leftLeg: number;
	rightLeg: number;
}

interface IPilot {
	name: string;
	piloting: number;
	gunnery: number;
	wounds: number;
}

interface IBMEquipmentExport {
	tag: string;
	loc: string | undefined;
    rear: boolean | undefined;
    uuid: string | undefined;
}
interface IBattleMechExport {
	name: string;
	tonnage: number;
    walkSpeed: number;
    hideNonAvailableEquipment: boolean;
	jumpSpeed: number;
	engineType: string;
	mechType: string;
	era: string;
	tech: string;
	gyro: string;
	is_type: string;
	additionalHeatSinks: number;
	heat_sink_type: string;
	armor_weight: number;
	uuid: string;
	strictEra: boolean;
	armor_allocation: IArmorAllocation,
	armor_type: string;
	equipment: IBMEquipmentExport[],
	allocation: ICriticalSlot[],
	features: string[],
	pilot: IPilot,
	as_role: string;
	as_custom_name: string;
}

export class BattleMech {

    mechType = mechTypeOptions[0];
    tech = btTechOptions[0];
    era = btEraOptions[1]; // Default to Succession Wars
    make: string = "";
    model: string = "";
    uuid: string = "";
    tonnage = 20;
    hideNonAvailableEquipment: boolean = true;
	currentTonnage = 0;
    // useLang: string = "en-US";

    armorType = mechArmorTypes[0];

    maxArmor: number = 0;

    selectedInternalStructure = mechInternalStructureTypes[0];

    hasTripleStrengthMyomer: boolean = false;

    remainingTonnage: number = 0;

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
    maxWeaponHeat: number = 0;
    heatDissipation: number = 0;

    additionalHeatSinks: number = 0;

    armorWeight: number = 0;
    totalArmor: number = 0;
    unallocatedArmor: number = 0;

    armorAllocation: IArmorAllocation = {
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
        rightLeg: 0,
    };

    equipmentList: IEquipmentItem[] = [];
    sortedEquipmentList: string[] = [];

    criticalAllocationTable: ICriticalSlot[] = [];

    weights: IWeights[] = [];

    strictEra: boolean = true;

    unallocatedCriticals: ICriticalSlot[] = [];

    criticals: IMechCriticals = {
        head: [],
        centerTorso: [],
        rightTorso: [],
        leftTorso: [],
        leftArm: [],
        rightArm: [],
        leftLeg: [],
        rightLeg: [],
    };

    gyro = mechGyroTypes[0];

    engine: IEngineOption | null = null;
    engineType = mechEngineTypes[0];
    jumpJetType = mechJumpJetTypes[0];

    walkSpeed = 0;
    runSpeed = 0;
    jumpSpeed = 0;

    heatSinkCriticals = {
        slotsEach: 1,
        number: 0,
    };

    heatSinkType: IHeatSync = mechHeatSinkTypes[0];

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

    constructor(importJSON: string = "") {
        if( importJSON ) {
            this.importJSON( importJSON );
        } else {
            this.calc();
        }

    }

    setMechType(typeTag: string) {
        for( let lcounter = 0; lcounter < mechTypeOptions.length; lcounter++) {
            if( typeTag === mechTypeOptions[lcounter].tag) {
                this.mechType = mechTypeOptions[lcounter];
                this.setTonnage( this.tonnage );
                this.calc();
                return this.mechType;
            }
        }

        this.mechType = mechTypeOptions[0];
        this.setTonnage( this.tonnage );
        this.calc();
        return this.mechType;
    }

    getHighestDamage(incomingDamageObjects: IAlphaStrikeDamage[]) {
        let returnValue = 0;
        for( let dC = 0; dC < incomingDamageObjects.length; dC++) {
            if(
                incomingDamageObjects[dC] &&
                incomingDamageObjects[dC].short !== "-" &&
                incomingDamageObjects[dC].short !== "0*"
            ) {
                if( +incomingDamageObjects[dC].short > returnValue) {
                    returnValue = +incomingDamageObjects[dC].short;
                }
            }
            if(
                incomingDamageObjects[dC] &&
                incomingDamageObjects[dC].medium !== "-" &&
                incomingDamageObjects[dC].medium !== "0*"
            ) {
                if( +incomingDamageObjects[dC].medium > returnValue) {
                    returnValue = +incomingDamageObjects[dC].medium;
                }
            }
            if(
                incomingDamageObjects[dC] &&
                incomingDamageObjects[dC].long !== "-" &&
                incomingDamageObjects[dC].long !== "0*"
            ) {
                if( +incomingDamageObjects[dC].long > returnValue) {
                    returnValue = +incomingDamageObjects[dC].long;
                }
            }

            if(
                incomingDamageObjects[dC] &&
                incomingDamageObjects[dC].extreme !== "-" &&
                incomingDamageObjects[dC].extreme !== "0*"
            ) {
                if( +incomingDamageObjects[dC].extreme > returnValue) {
                    returnValue = +incomingDamageObjects[dC].extreme;
                }
            }
        }

        return returnValue;
    }

    adjustASDamage(incomingDamageObjects: IAlphaStrikeDamage, useZeros: boolean = false) {

        if( incomingDamageObjects.short === "0") {
            if( useZeros)
                incomingDamageObjects.short = "0";
            else
                incomingDamageObjects.short = "-";
        } else if( +incomingDamageObjects.short < .5) {
            //~ if( useZeros )
            //~ incomingDamageObjects.short = 0;
            //~ else
            incomingDamageObjects.short = "0*";
        } else {
            incomingDamageObjects.short = Math.round(+incomingDamageObjects.short).toString();
        }

        if( incomingDamageObjects.medium === "0") {
            if( useZeros)
                incomingDamageObjects.medium = "0";
            else
                incomingDamageObjects.medium = "-";
        } else if( +incomingDamageObjects.medium < .5) {
            //~ if( useZeros )
            //~ incomingDamageObjects.medium = 0;
            //~ else
            incomingDamageObjects.medium = "0*";
        } else {
            incomingDamageObjects.medium = Math.round(+incomingDamageObjects.medium).toString();
        }

        if( incomingDamageObjects.long === "0") {
            if( useZeros)
                incomingDamageObjects.long = "0";
            else
                incomingDamageObjects.long = "-";
        } else if( +incomingDamageObjects.long < .5) {
            //~ if( useZeros )
            //~ incomingDamageObjects.long = 0;
            //~ else
            incomingDamageObjects.long = "0*";
        } else {
            incomingDamageObjects.long = Math.round(+incomingDamageObjects.long).toString();
        }

        if( incomingDamageObjects.extreme === "0") {
            if( useZeros)
                incomingDamageObjects.extreme = "0";
            else
                incomingDamageObjects.extreme = "-";
        } else if( +incomingDamageObjects.extreme < .5) {
            //~ if( useZeros )
            //~ incomingDamageObjects.extreme = 0;
            //~ else
            incomingDamageObjects.extreme = "0*";
        } else {
            incomingDamageObjects.extreme = Math.round(+incomingDamageObjects.extreme).toString();
        }

        return incomingDamageObjects;
    }

    calcBattleValue() {

        let hasCamo = false;
        let hasBasicStealth = false;
        let hasPrototypeStealth = false;
        let hasStandardStealth = false;
        let hasImprovedStealth = false;
        let hasMimetic = false;

        this.battleValue = 0;
        this.calcLogBV = "";

        /* ***************************************************
         *  STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302
         * ************************************************ */
        let defensiveBattleRating = 0;
        this.calcLogBV += "<strong>STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302</strong><br />";
        let totalArmorFactor = 2.5 * this.getTotalArmor();
        this.calcLogBV += "Total Armor Factor = Armor Factor x 2.5: " + totalArmorFactor + " = 2.5 x " + this.getTotalArmor() + "<br />";

        // Get Armor Rating
        switch (this.armorType.tag) {
            case "commercial":
                this.calcLogBV += "Total Armor Factor = 0.5 * Total Armor Factor Modifier for Commercial Armor: " + totalArmorFactor + " x 0.5 = " + (totalArmorFactor * .5) + "<br />";
                totalArmorFactor = totalArmorFactor * 0.5;
                break;
            default:
                this.calcLogBV += "Total Armor Factor = 1.0 * Total Armor Factor Modifier for Non-Commercial Armor:  " + totalArmorFactor + " x 1 = " + (totalArmorFactor * 1) + "<br />";
                break;
        }

        // Get for Internal Structure Rating
        let totalInternalStructurePoints = 1.5 * this.totalInternalStructurePoints;
        this.calcLogBV += "Total Internal Structure Points = Internal Structure Points x 1.5: " + totalInternalStructurePoints + " = 1.5 x " + this.totalInternalStructurePoints + "<br />";

        // Adjust IS for Type
        switch (this.getInternalStructureType()) {
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
        // console.log( "this.engineType", this.engineType );
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
        let totalGyroPoints = 0;
        switch (this.getInternalStructureType()) {
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
        let explosiveAmmoModifiers = 0;
        this.calcLogBV += "<strong>Get Explosive Ammo Modifiers (TM p302-303)</strong><br />";

        // let caseEnabled_HD = false;
        // let caseEnabled_CT = false;
        let caseEnabled_RL = false;
        let caseEnabled_LL = false;
        let caseEnabled_RA = false;
        let caseEnabled_LA = false;
        let caseEnabled_RT = false;
        let caseEnabled_LT = false;

        // for( let lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
        //     if( this.criticals.head[lCrit] && this.criticals.head[lCrit].tag === "case") {
        //         caseEnabled_HD = true;
        //     }
        // }

        // for( let lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
        //     if( this.criticals.centerTorso[lCrit] && this.criticals.centerTorso[lCrit].tag === "case") {
        //         caseEnabled_CT = true;
        //     }
        // }

        for( let lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
            let item = this.criticals.rightLeg[lCrit];
            if( item && item.tag === "case") {
                caseEnabled_RL = true;
            }
        }

        for( let lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
            let item = this.criticals.leftLeg[lCrit];
            if( item && item.tag === "case") {
                caseEnabled_LL = true;
            }
        }

        for( let lCrit = 0; lCrit < this.criticals.rightArm.length; lCrit++) {
            let item = this.criticals.rightArm[lCrit];
            if( item && item.tag === "case") {
                caseEnabled_RA = true;
            }
        }

        for( let lCrit = 0; lCrit < this.criticals.leftArm.length; lCrit++) {
            let item = this.criticals.leftArm[lCrit];
            if( item && item.tag === "case") {
                caseEnabled_LA = true;
            }
        }

        for( let lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
            let item = this.criticals.rightTorso[lCrit];
            if( item && item.tag === "case") {
                caseEnabled_RT = true;
            }
        }

        for( let lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
            let item = this.criticals.leftTorso[lCrit];
            if( item && item.tag === "case") {
                caseEnabled_LT = true;
            }
        }

        if( this.tech.tag === "clan") {

            //Clan is Assumed to have CASE in BV Calculation (TM p303)

            // check head
            for( let lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
                let item = this.criticals.head[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Head (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Head (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check ct
            for( let lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
                let item = this.criticals.centerTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Center Torso (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Center Torso (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check lt
            for( let lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
                let item = this.criticals.leftTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Left Torso (Clan,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Left Torso (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }
            }

            // check rt
            for( let lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
                let item = this.criticals.rightTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Right Torso (Clan,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Center Right (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }
            }

            // check rl
            for( let lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
                let item = this.criticals.leftLeg[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Right Leg (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Right Leg (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }
            }

            // check ll
            for( let lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
                let item = this.criticals.leftLeg[lCrit];
                if(  item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Left Leg (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Left Leg (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }
            }

        } else if( this.tech.tag === "is") {
            // check head
            for( let lCrit = 0; lCrit < this.criticals.head.length; lCrit++) {
                let item = this.criticals.head[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Head (Inner Sphere,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }

            }

            // check ct
            for( let lCrit = 0; lCrit < this.criticals.centerTorso.length; lCrit++) {
                let item = this.criticals.centerTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Center Torso (Inner Sphere,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Center Torso (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check lt
            for( let lCrit = 0; lCrit < this.criticals.leftTorso.length; lCrit++) {
                let item = this.criticals.leftTorso[lCrit];

                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Left Torso (Inner Sphere,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Left Torso (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check rt
            for( let lCrit = 0; lCrit < this.criticals.rightTorso.length; lCrit++) {
                let item = this.criticals.rightTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Right Torso (Inner Sphere,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Center Right (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check rl
            for( let lCrit = 0; lCrit < this.criticals.rightLeg.length; lCrit++) {
                let item = this.criticals.rightLeg[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Right Leg (Inner Sphere, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Right Leg (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

                if( caseEnabled_RT === false && caseEnabled_RL === false) {
                    if( item && item.obj && item.obj.explosive) {
                        this.calcLogBV += "Explosive Ammo Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this.calcLogBV += "Gauss Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

            // check ll
            for( let lCrit = 0; lCrit < this.criticals.leftLeg.length; lCrit++) {
                let item = this.criticals.leftLeg[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this.calcLogBV += "Explosive Ammo Crit in Left Leg (Inner Sphere, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this.calcLogBV += "Gauss Crit in Left Leg (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

                if( caseEnabled_LT === false && caseEnabled_LL === false) {
                    let item = this.criticals.rightLeg[lCrit];

                    if( item && item.obj && item.obj.explosive) {
                        this.calcLogBV += "Explosive Ammo Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this.calcLogBV += "Gauss Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }

            }

            // check RA
            for( let lCrit = 0; lCrit < this.criticals.rightArm.length; lCrit++) {

                if( caseEnabled_RT === false && caseEnabled_RA === false) {
                    let item = this.criticals.rightArm[lCrit];

                    if( item && item.obj && item.obj.explosive) {
                        this.calcLogBV += "Explosive Ammo Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this.calcLogBV += "Gauss Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }

            }

            // check LA
            for( let lCrit = 0; lCrit < this.criticals.leftArm.length; lCrit++) {

                if( caseEnabled_LT === false && caseEnabled_LA === false) {
                    let item = this.criticals.leftArm[lCrit];
                    if( item && item.obj && item.obj.explosive) {
                        this.calcLogBV += "Explosive Ammo Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this.calcLogBV += "Gauss Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

        }

        defensiveBattleRating = totalArmorFactor + totalInternalStructurePoints + totalGyroPoints - explosiveAmmoModifiers;
        this.calcLogBV += "Defensive battle rating = " + defensiveBattleRating + " ( " + totalArmorFactor +  + totalInternalStructurePoints + " +  " + totalGyroPoints + " -  " + explosiveAmmoModifiers + "<br />";

        // Get Defensive Factor Modifier

        let runSpeed = this.getRunSpeed();
        let jumpSpeed = this.getJumpSpeed();
        let runModifier = getMovementModifier(runSpeed);
        let jumpModifier = getMovementModifier(jumpSpeed) + 1;

        let moveModifier = 0;
        if( jumpModifier > runModifier)
            moveModifier = jumpModifier;
        else
            moveModifier = runModifier;

        this.calcLogBV += "Best TMM: " + moveModifier + "<br />";

        let defensiveFactorModifier = 1 + moveModifier / 10;
        if( defensiveFactorModifier < 1)
            defensiveFactorModifier = 1;

        this.calcLogBV += "Defensive Factor (defensiveFactorModifier = 1 + TMM / 10): " + defensiveFactorModifier + " = 1 + " + moveModifier + " / 10<br />";

        // TODO for equipment.... add camo, stealth, etc when it's available
        this.calcLogBV += "<strong> Defensive Factor Modifiers for equipment</strong>.... add camo, stealth, etc when tech is available<br />";

        if( hasCamo) {
            defensiveFactorModifier += 0.2;
        }

        if( hasBasicStealth) {
            defensiveFactorModifier += 0.2;
        }

        if( hasPrototypeStealth) {
            defensiveFactorModifier += 0.2;
        }

        if( hasStandardStealth) {
            defensiveFactorModifier += 0.2;
        }

        if( hasImprovedStealth) {
            defensiveFactorModifier += 0.3;
        }

        if( hasMimetic) {
            defensiveFactorModifier += 0.3;
        }

        this.calcLogBV += "Defensive battle rating = Defensive battle rating * Target Modifier Rating : " + (defensiveBattleRating * defensiveFactorModifier).toFixed(2) + " = " + defensiveBattleRating + " x " + defensiveFactorModifier + "<br />";

        defensiveBattleRating = defensiveBattleRating * defensiveFactorModifier;

        this.calcLogBV += "<strong>Final defensive battle rating</strong>: " + defensiveBattleRating.toFixed(2) + "<br />";

        /* ***************************************************
         *  STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303
         * ************************************************ */
        let offensiveBattleRating = 0;
        this.calcLogBV += "<strong>STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303</strong><br />";

        // TODO
        this.calcLogBV += "<strong>Calculate Each Weapon’s Modified BV</strong><br />";

        let ammoBV: INumericalHash = {};
        let weaponBV: INumericalHash = {};

        let totalAmmoBV = 0;

        // Add up all the BV Sums, put each in an array for comparison
        for( let eqC = 0; eqC < this.equipmentList.length; eqC++) {
			let currentItem = this.equipmentList[eqC];
            if( currentItem.tag.indexOf("ammo-") > -1) {
                if( !ammoBV[currentItem.tag])
                    ammoBV[currentItem.tag] = 0;
                if( currentItem.battleValue)
                    ammoBV[currentItem.tag] += currentItem.battleValue;

                this.calcLogBV += "+ Adding " + currentItem.name + " - " + currentItem.battleValue + "<br />";

            } else {
                if( !weaponBV[currentItem.tag])
                    weaponBV[currentItem.tag] = 0;
                if( currentItem.battleValue)
                    weaponBV[currentItem.tag] = currentItem.battleValue;

            }
        }

        let totalWeaponBV = 0;
        let simplifiedAmmoBV: INumericalHash = {};
        for( let weaponKey in weaponBV) {
            for( let ammoKey in ammoBV) {
                if( ammoKey.indexOf(weaponKey) > -1) {
                    if( !simplifiedAmmoBV[weaponKey])
                        simplifiedAmmoBV[weaponKey] = 0;
                    simplifiedAmmoBV[weaponKey] += ammoBV[ammoKey];
                }
            }
            totalWeaponBV += weaponBV[weaponKey];
        }

        for( let ammoKey in simplifiedAmmoBV) {
            if( weaponBV[ammoKey]) {
                if( simplifiedAmmoBV[ammoKey] > weaponBV[ammoKey]) {
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
        let mechHeatEfficiency = 0;
        if( this.getHeatSinksType() === "single") {
            mechHeatEfficiency = 6 + this.getHeatSinks() - this.getMaxMovementHeat();
            this.calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() + " - " + this.getMaxMovementHeat() + ")<br />";

        } else if( this.getHeatSinksType() === "double") {
            mechHeatEfficiency = 6 + this.getHeatSinks() * 2 - this.getMaxMovementHeat();
            this.calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() * 2 + " - " + this.getMaxMovementHeat() + ")<br />";
        }

        this.calcLogBV += "<strong>Total Weapon Heat</strong> ";
        let totalWeaponHeat = 0;

        this.equipmentList.sort(sortByBVThenRearThenHeat);

        for( let eqC = 0; eqC < this.equipmentList.length; eqC++) {
			let currentItem = this.equipmentList[eqC];
            if( currentItem.tag.indexOf("ammo-") === -1) {
                if( !weaponBV[currentItem.tag])
                    weaponBV[currentItem.tag] = 0;
                if( currentItem.battleValue)
                    weaponBV[currentItem.tag] = currentItem.battleValue;

                this.calcLogBV += this.equipmentList[eqC].heat + " + ";

                // TODO modify per weapon type
                // one shot this.equipmentList[ eqC ].heat = this.equipmentList[ eqC ].heat / 4
                // streak SRM this.equipmentList[ eqC ].heat = this.equipmentList[ eqC ].heat / 2
                // ULTRA AC this.equipmentList[ eqC ].heat = this.equipmentList[ eqC ].heat * 2
                // Rotary AC this.equipmentList[ eqC ].heat = this.equipmentList[ eqC ].heat * 6

                totalWeaponHeat += this.equipmentList[eqC].heat;

            }
        }

        if( this.calcLogBV.substr(this.calcLogBV.length - 3) === " + " ) {
            this.calcLogBV = this.calcLogBV.substr(0, this.calcLogBV.length - 3)
        }

        this.calcLogBV += " = " + totalWeaponHeat;

        this.calcLogBV += "<br />";

        let runningTotal = 0;
        let runningHeat = 0;
        if( totalWeaponHeat >= mechHeatEfficiency) {
            // Mech is heat inefficient, now we need to go through steps 4-7 on TM pp 303-304

            let inHalfCost = false;

            for( let weaponC = 0; weaponC < this.equipmentList.length; weaponC++) {
                if( this.equipmentList[weaponC].tag.indexOf("ammo-") === -1) {

                    if( inHalfCost === true && this.equipmentList[weaponC].heat > 0) {
						// half efficiency
						let currentItem = this.equipmentList[weaponC];
                        if( currentItem && currentItem.rear ) {
							if( currentItem.battleValue) {
								this.calcLogBV += "+ Adding Heat Inefficient Rear Weapon " + currentItem.name + " - " + currentItem.battleValue + " / 4 = " + (currentItem.battleValue / 4);
								runningTotal += currentItem.battleValue / 4;
							}
                        } else {
							if( currentItem.battleValue ) {
								this.calcLogBV += "+ Adding Heat Inefficient Weapon " + currentItem.name + " - " + currentItem.battleValue + " / 2 = " + (currentItem.battleValue / 2);
								runningTotal += currentItem.battleValue / 2;
							}
                        }
                    } else {
                        // normal efficiency

						//~ console.log(  this.equipmentList[weaponC] );
						let currentItem = this.equipmentList[weaponC];
                        if( currentItem.rear ) {
							if( currentItem.battleValue) {
                            	this.calcLogBV += "+ Adding Rear Weapon " + currentItem.name + " - " + (currentItem.battleValue / 2 ) + "<br />";
								runningTotal += (currentItem.battleValue / 2);
							}
                        } else {
							if( currentItem.battleValue) {
                            	this.calcLogBV += "+ Adding Weapon " + currentItem.name + " - " + currentItem.battleValue;
								runningTotal += currentItem.battleValue;
							}
                        }
                    }

                    runningHeat += this.equipmentList[weaponC].heat;
                    //~ console.log( "r,m", runningHeat + " > "   + mechHeatEfficiency );
                    if( runningHeat >= mechHeatEfficiency && this.equipmentList[weaponC].heat > 0 && inHalfCost === false) {
                        inHalfCost = true;
                        this.calcLogBV += " (weapon is last heat efficient)";
                    }

                    this.calcLogBV += "<br />";

                }
            }

        } else {

            // Mech is heat efficient, no need to go through steps 4-7 on TM pp 303-304, just print and add up the weapons

            for( let weaponC = 0; weaponC < this.equipmentList.length; weaponC++) {
				let currentItem = this.equipmentList[weaponC];
                if( currentItem.tag.indexOf("ammo-") === -1) {
                    if( currentItem.rear ) {
						if( currentItem.battleValue ) {
                        	this.calcLogBV += "+ Adding Rear Weapon " + currentItem.name + " - " + (currentItem.battleValue / 2 ) + "<br />";

							runningTotal += (currentItem.battleValue / 2);
						}
                    } else {
						if( currentItem.battleValue ) {
                        	this.calcLogBV += "+ Adding Weapon " + currentItem.name + " - " + currentItem.battleValue + "<br />";
							runningTotal += currentItem.battleValue;
						}
                    }
                }
            }

        }

        totalWeaponBV = runningTotal;
        this.calcLogBV += "<strong>Total Weapon BV</strong> " + totalWeaponBV + "<br />";

        let modifiedMechTonnage = this.getTonnage();

        if( this.hasTripleStrengthMyomer) {
            modifiedMechTonnage = modifiedMechTonnage * 1.5;
        }

        offensiveBattleRating = totalWeaponBV + totalAmmoBV + modifiedMechTonnage;

        let speedFactorModifier = this.getSpeedFactorModifier();
        offensiveBattleRating = offensiveBattleRating * speedFactorModifier;

        this.calcLogBV += "<strong>Final offensive battle rating</strong>: " + offensiveBattleRating.toFixed(2) + " (" + totalWeaponBV + " (weaponBV) + " + totalAmmoBV + " (ammoBV) + " + modifiedMechTonnage + "(mechTonnage) ) x " + speedFactorModifier + " (speed factor rating)<br />";

        /* ***************************************************
         * STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304
         * ************************************************ */

        this.calcLogBV += "<strong>STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304</strong><br />";
        let finalBattleValue = defensiveBattleRating + offensiveBattleRating;
        this.calcLogBV += "finalBattleValue = defensiveBattleRating + offensiveBattleRating: " + finalBattleValue.toFixed(2) + " = " + defensiveBattleRating.toFixed(2) +  + offensiveBattleRating.toFixed(2) + "<br />";

        if( this.smallCockpit) {
            finalBattleValue = Math.round(finalBattleValue * .95);
            this.calcLogBV += "Small Cockpit, multiply total by .95 and round final BV: " + finalBattleValue.toFixed(2) + "<br />";
        }

        this.calcLogBV += "<strong>Final Battle Value</strong>: " + finalBattleValue.toFixed(2) + " rounded to " + Math.round(finalBattleValue) + "<br />";
        this.battleValue = Math.round(finalBattleValue);

        this._setPilotAdjustedBattleValue();

    }

    private _setPilotAdjustedBattleValue() {
        let pilotAdjustedBattleValue = +this.battleValue;

        if( this.pilot.gunnery === 0 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.80;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.56;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.24;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.92;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.60;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.50;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.43;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.36;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 0 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.28;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.63;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.40;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.10;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.80;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.50;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.35;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.33;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.26;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.19;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.45;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.24;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.96;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.68;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.40;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.26;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.19;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.16;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 2 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.10;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.28;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.08;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.82;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.56;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.30;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.17;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.11;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.04;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 3 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.01;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 2.01;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.84;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.61;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.38;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.15;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.04;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 1 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.98;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.92;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 4 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.86;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.82;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.60;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.40;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.20;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.0;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.90;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.85;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.80;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 5 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.75;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.75;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.58;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.33;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.14;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.95;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.86;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.81;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.76;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 6 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.71;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.67;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.51;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.31;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.08;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.90;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.81;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.77;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.72;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 7 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.68;
        } else if( this.pilot.gunnery === 0 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.59;
        } else if( this.pilot.gunnery === 1 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.44;
        } else if( this.pilot.gunnery === 2 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.25;
        } else if( this.pilot.gunnery === 3 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 1.06;
        } else if( this.pilot.gunnery === 4 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.85;
        } else if( this.pilot.gunnery === 5 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.77;
        } else if( this.pilot.gunnery === 6 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.72;
        } else if( this.pilot.gunnery === 7 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.68;
        } else if( this.pilot.gunnery === 8 && this.pilot.piloting === 8 ) {
            this.pilotAdjustedBattleValue = pilotAdjustedBattleValue * 0.64;
        }
        this.pilotAdjustedBattleValue = Math.round( pilotAdjustedBattleValue );
    }

    getSpeedFactorModifier(): number {
        let runSpeedAndHalfJumpSpeed = this.getRunSpeed() + this.getJumpSpeed() / 2;

        if( runSpeedAndHalfJumpSpeed > 25) {
            return +(1 + Math.pow(((this.getRunSpeed() + (this.getJumpSpeed() / 2) - 5) / 10), 1.2)).toFixed(2);
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

    isQuad() {
        if( this.mechType.tag.toLowerCase() === "quad")
            return true;
        else
            return false;
    }

    calcCBillCost() {
        // TODO Calculations
        this.calcLogCBill = "";

        let cbillTotal = 0;
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
        //~ console.log( this.selectedInternalStructure.name );
        this.calcLogCBill += "<tr><td><strong>Internal Structure: " + this.selectedInternalStructure.name  + "</strong><br />" +  addCommas( this.selectedInternalStructure.cost ) + " x Unit Tonnage [" + this.getTonnage() + "]</td><td>" +  addCommas( this.selectedInternalStructure.cost * this.getTonnage() ) + "</td></tr>\n";
        cbillTotal += this.selectedInternalStructure.cost * this.getTonnage() ;

        this.calcLogCBill += "<tr><td colspan=\"2\"><strong>Actuators</strong></td></tr>\n";

        let actuatorTotal = 0;
        // Actuators
        if( this.mechType.tag.toLowerCase() === "quad") {
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

            if( this.no_right_arm_lower_actuator === false ) {
                this.calcLogCBill += "<tr><td>Right Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
                cbillTotal += 50 * this.getTonnage() ;
                actuatorTotal += 50 * this.getTonnage() ;
            }

            if( this.no_right_arm_hand_actuator === false ) {
                this.calcLogCBill += "<tr><td>Right Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
                cbillTotal += 80 * this.getTonnage() ;
                actuatorTotal += 80 * this.getTonnage() ;
            }

            this.calcLogCBill += "<tr><td>Left Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
            cbillTotal += 100 * this.getTonnage() ;
            actuatorTotal += 100 * this.getTonnage() ;

            if( this.no_left_arm_lower_actuator === false ) {
                this.calcLogCBill += "<tr><td>Left Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
                cbillTotal += 50 * this.getTonnage() ;
                actuatorTotal += 50 * this.getTonnage() ;
            }

            if( this.no_left_arm_hand_actuator === false ) {
                this.calcLogCBill += "<tr><td>Left Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
                cbillTotal += 80 * this.getTonnage() ;
                actuatorTotal += 80 * this.getTonnage() ;
            }

        }
        this.calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Actuator Subtotal: " + addCommas(actuatorTotal) + "</strong></td></tr>\n";

        // Engine
        let engineName = this.getEngineType().name;
        let engineRating  = this.getEngineRating();
        let enginecostMultiplier = this.getEngineType().costMultiplier;
        this.calcLogCBill += "<tr><td><strong>Engine: " + engineName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( enginecostMultiplier ) + " x Engine Rating  [" + engineRating + "] x Unit Tonnage [" + this.getTonnage() + "] / 75</span></td><td>" +  addCommas( enginecostMultiplier * engineRating * this.getTonnage() / 75 ) + "</td></tr>\n";
        cbillTotal += enginecostMultiplier * engineRating * this.getTonnage() / 75;

        // Gyro
        let gyroName = this.getGyroName();
        let gyrocostMultiplier = this.getGyro().costMultiplier;
        let gyroTonnage = this.getGyroWeight();

        this.calcLogCBill += "<tr><td><strong>Gyro: " + gyroName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( gyrocostMultiplier ) + " x Gyro Tonnage [" + gyroTonnage + "]</span></td><td>" +  addCommas( gyrocostMultiplier * gyroTonnage  ) + "</td></tr>\n";
        cbillTotal += gyrocostMultiplier * gyroTonnage ;

        // Jump Jets
        let numberOfJumpJets = this.getNumberOfJumpJets();
        if( numberOfJumpJets ) {
            let jumpJetName = this.jumpJetType.name;
            let jumpJetCost = this.jumpJetType.costMultiplier;
            this.calcLogCBill += "<tr><td><strong>Jump Jets: " + jumpJetName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( jumpJetCost ) + " x (# Jump Jets [" +  numberOfJumpJets + "])<sup>2</sup> x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ) + "</td></tr>\n";
            cbillTotal += jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ;
        }

        // Heat Sinks
        let heatSinksName = this.getHeatSinksObj().name;
        let heatSinksCost =  this.getHeatSinksObj().cost ;
        let numberOfHeatSinks = this.getHeatSinks();
        let heatSinkType = this.getHeatSinksType();
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
        let armorName = this.getArmorObj().name;
        let armorcostMultiplier = this.getArmorObj().costMultiplier;
        let armorTonnage = this.getArmorWeight();

        this.calcLogCBill += "<tr><td><strong>Armor: " + armorName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( armorcostMultiplier ) + " x Armor Tonnage [" + armorTonnage + "]</span></td><td>" +  addCommas( armorcostMultiplier * armorTonnage  ) + "</td></tr>\n";
        cbillTotal += armorcostMultiplier * armorTonnage ;

        // Equipment
        for( let eqC = 0; eqC < this.equipmentList.length; eqC++) {
            if( this.equipmentList[eqC].tag.indexOf("ammo-") === -1) {
                this.calcLogCBill += "<tr><td><strong>" + this.equipmentList[eqC].name + "</strong></td><td>" + addCommas(this.equipmentList[eqC].cbills) + "</td></tr>\n";
                cbillTotal += this.equipmentList[eqC].cbills;
            } else {
                this.calcLogCBill += "<tr><td><strong>" + this.equipmentList[eqC].name + "</strong></td><td><span class=\"smaller-text\">(not included)</span></td></tr>\n";

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
            // if( this.engineType.tag === "clan-xl") {
            //     return this.engine.weight.xl;
			// } else {
			// 	return this.engine.weight[this.engineType.tag];
			// }
			switch( this.engineType.tag ) {
				case "standard": {
					return this.engine.weight.standard;
				}
				case "clan-xl":
				case "xl": {
					return this.engine.weight.xl;
				}
				case "cell": {
					return this.engine.weight.cell;
				}
				case "comp": {
					return this.engine.weight.comp;
				}
				case "fission": {
					return this.engine.weight.fission;
				}
				case "ice": {
					return this.engine.weight.ice;
				}
				case "light": {
					return this.engine.weight.light;
				}

			}
			return 0;
        } else {
            return 0;
        }
    }

    getEngineRating() {
        if( this.engine && this.engine.rating)
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
		if( this.engine ) {
			return Math.ceil(Math.ceil(this.engine.rating / 100) * this.gyro.weight_multiplier);
		} else {
			return 0;
		}
    }
    getCockpitWeight() {
        return this.cockpitWeight;
    }

    getInteralStructureWeight() {
        return this.selectedInternalStructure.perTon[this.getTonnage()].tonnage;
    }

    getJumpJetWeight() {
        if( this.tonnage <= 55) {
            // 10-55 tons
            return this.jumpSpeed * this.jumpJetType.weight_multiplier.light;
        } else if( this.tonnage <= 85) {
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
        return "<div class=\"mech-tro\">" + this.calcLogCBill + "</div>";
    }

    // makeSVGRecordSheet(inPlay, landscape) {
    //     if( typeof(landscape) === "undefined") {
    //         landscape = false;
    //     } else {
    //         if( landscape)
    //             landscape = true;
    //         else
    //             landscape = false;
    //     }

    //     if( typeof(inPlay) === "undefined") {
    //         inPlay = false;
    //     } else {
    //         if( inPlay)
    //             inPlay = true;
    //         else
    //             inPlay = false;
    //     }

    //     return createSVGRecordSheet(this, inPlay, landscape);

    // }

    // makeSVGAlphaStrikeCard(inPlay) {
    //     if( typeof(inPlay) === "undefined") {
    //         inPlay = false;
    //     } else {
    //         if( inPlay)
    //             inPlay = true;
    //         else
    //             inPlay = false;
    //     }

    //     //~ console.log( alphaStrikeForceStats );

    //     return createSVGAlphaStrike(alphaStrikeForceStats, inPlay);
    // }

    makeTROBBCode() {

        let html = "";
        // Header Info
        html += "Type: " + this.getName() + "\n";
        html += "Technology Base: " + this.getTech().name + "\n";
        html += "Era: " + this.getEra().name + "\n";
        html += "Tonnage: " + this.getTonnage() + "\n";
        html += "Battle Value: " + this.getBattleValue() + "\n";
        html += "Alpha Strike Value: " + this.getAlphaStrikeValue() + "\n";
        html += "C-Bill Cost: $" + this.getCBillCost() + "\n";
        html += "\n";

        let col1Padding = 25;
        let col2Padding = 15;
        let col3Padding = 10;
        let col4Padding = 10;

        // Equipment
        html += "Equipment".padEnd(col1Padding + col2Padding, " ") + "Mass\n";
        html += "" + ("Internal Structure (" + this.selectedInternalStructure.name + ")").toString().padEnd(col1Padding + col2Padding, " ") + "" + this.getInteralStructureWeight() + "\n";
        html += "" + this.getEngineName().padEnd(col1Padding, " ") + "" + this.getEngineRating().toString().padEnd(col2Padding, " ") + "" + this.getEngineWeight() + "\n";

        html += "Walking".padStart(col1Padding - 10, " ") + " " + this.getWalkSpeed().toString().padStart(3, " ") + "\n";
        html += "Running".padStart(col1Padding - 10, " ") + " " + this.getRunSpeed().toString().padStart(3, " ") + "\n";
        html += "Jumping".padStart(col1Padding - 10, " ") + " " + this.getJumpSpeed().toString().padStart(3, " ") + "\n";

        html += "" + this.getHeatSyncName().padEnd(col1Padding, " ") + "" + this.getHeatSinks().toString().padEnd(col2Padding, " ") + "" + this.getHeatSinksWeight() + "\n";
        html += "" + this.getGyroName().padEnd(col1Padding + col2Padding, " ") + "" + this.getGyroWeight() + "\n";

        if( this.smallCockpit) {
            html += "Small Cockpit".padEnd(col1Padding + col2Padding, " ") + "" + this.getCockpitWeight() + "\n";
        } else {
            html += "Cockpit".padEnd(col1Padding + col2Padding, " ") + "" + this.getCockpitWeight() + "\n";
        }

        //~ if( this.getJumpJetWeight() > 0 ) {
        //~ html += "Jump Jets".padEnd(" ",col1Padding + col2Padding) + "" + this.getJumpJetWeight() + "\n";
        //~ }

        if( this.mechType.tag === "biped") {
            html += "Actuators: ";
            let actuator_html = "";

            if( this.hasLowerArmActuator("ra"))
                actuator_html += "RLA, ";
            if( this.hasLowerArmActuator("la"))
                actuator_html += "LLA, ";
            if( this.hasHandActuator("ra"))
                actuator_html += "RH, ";
            if( this.hasHandActuator("la"))
                actuator_html += "LH, ";

            if( actuator_html === "")
                actuator_html = "No lower arm actuators";
            else
                actuator_html = actuator_html.substring(0, actuator_html.length - 2);

            html += actuator_html;
            html += "\n";
        }

        html += "" + ("Armor Value (" + this.armorType.name + ")").padEnd(col1Padding, " ") + "" + this.getTotalArmor().toString().padEnd(col2Padding, " ") + "" + this.getArmorWeight() + "\n";

        col1Padding = 20;
        col2Padding = 10;
        col3Padding = 15;
        col4Padding = 10;

        // Armor Factor Table

        html += "Internal Structure".padStart(col1Padding + col2Padding, " ") + "Armor Value".padStart(col3Padding, " ") + "\n";
        html += "Head".padStart(col1Padding, " ") + "" + this.internalStructure.head.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.head.toString().padStart(col3Padding, " ") + "\n";
        html += "Center Torso".padStart(col1Padding, " ") + "" + this.internalStructure.centerTorso.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.centerTorso.toString().padStart(col3Padding, " ") + "\n";
        html += "Center Torso (Rear)".padStart(col1Padding, " ") + "" + this.armorAllocation.centerTorsoRear.toString().padStart(col2Padding, " ") + "\n";
        if( this.armorAllocation.rightTorso === this.armorAllocation.leftTorso && this.armorAllocation.rightTorsoRear === this.armorAllocation.leftTorsoRear) {
            html += "R/L Torso".padStart(col1Padding, " ") + "" + this.internalStructure.rightTorso.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightTorso.toString().padStart(col3Padding, " ") + "\n";
            html += "R/L Torso (Rear)".padStart(col1Padding, " ") + "" + this.armorAllocation.rightTorsoRear.toString().padStart(col2Padding, " ") + "\n";
        } else {
            html += "Right Torso".padStart(col1Padding, " ") + "" + this.internalStructure.rightTorso.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightTorso.toString().padStart(col3Padding, " ") + "\n";
            html += "Right Torso (Rear)".padStart(col1Padding, " ") + "" + this.armorAllocation.rightTorsoRear.toString().padStart(col2Padding, " ") + "\n";

            html += "Left Torso".padStart(col1Padding, " ") + "" + this.internalStructure.leftTorso.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.leftTorso.toString().padStart(col3Padding, " ") + "\n";
            html += "Left Torso (Rear)".padStart(col1Padding, " ") + "" + this.armorAllocation.leftTorsoRear.toString().padStart(col2Padding, " ") + "\n";
        }
        if( this.mechType.tag === "biped") {

            if( this.armorAllocation.rightArm === this.armorAllocation.leftArm) {
                html += "R/L Arm".padStart(col1Padding, " ") + "" + this.internalStructure.rightArm.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightArm.toString().padStart(col3Padding, " ") + "\n";
            } else {
                html += "Right Arm".padStart(col1Padding, " ") + "" + this.internalStructure.rightArm.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightArm.toString().padStart(col3Padding, " ") + "\n";
                html += "Left Arm".padStart(col1Padding, " ") + "" + this.internalStructure.leftArm.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.leftArm.toString().padStart(col3Padding, " ") + "\n";
            }

            if( this.armorAllocation.rightLeg === this.armorAllocation.leftLeg) {
                html += "R/L Leg".padStart(col1Padding, " ") + "" + this.internalStructure.rightLeg.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightLeg.toString().padStart(col3Padding, " ") + "\n";
            } else {
                html += "Right Leg".padStart(col1Padding, " ") + "" + this.internalStructure.rightLeg.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightLeg.toString().padStart(col3Padding, " ") + "\n";
                html += "Left Leg".padStart(col1Padding, " ") + "" + this.internalStructure.leftLeg.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.leftLeg.toString().padStart(col3Padding, " ") + "\n";
            }
        } else {
            if( this.armorAllocation.rightArm === this.armorAllocation.leftArm) {
                html += "R/L Front Leg".padStart(col1Padding, " ") + "" + this.internalStructure.rightArm.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightArm.toString().padStart(col3Padding, " ") + "\n";
            } else {
                html += "Right Front Leg".padStart(col1Padding, " ") + "" + this.internalStructure.rightArm.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightArm.toString().padStart(col3Padding, " ") + "\n";
                html += "Left Front Leg".padStart(col1Padding, " ") + "" + this.internalStructure.leftArm.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.leftArm.toString().padStart(col3Padding, " ") + "\n";
            }

            if( this.armorAllocation.rightLeg === this.armorAllocation.leftLeg) {
                html += "R/L Rear Leg".padStart(col1Padding, " ") + "" + this.internalStructure.rightLeg.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightLeg.toString().padStart(col3Padding, " ") + "\n";
            } else {
                html += "Right Rear Leg".padStart(col1Padding, " ") + "" + this.internalStructure.rightLeg.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.rightLeg.toString().padStart(col3Padding, " ") + "\n";
                html += "Right Front Leg".padStart(col1Padding, " ") + "" + this.internalStructure.leftLeg.toString().padStart(col2Padding, " ") + "" + this.armorAllocation.leftLeg.toString().padStart(col3Padding, " ") + "\n";
            }
        }
        // End Factor Table
        html += "";
        html += "\n";

        col1Padding = 20;
        col2Padding = 10;
        col3Padding = 10;
		col4Padding = 10;

        this.equipmentList.sort(sortByLocationThenName);

        // Weapons and Ammo
        for( let countEQ = 0; countEQ < this.equipmentList.length; countEQ++) {
            if( this.equipmentList[countEQ].name.length + 3 > col1Padding)
                col1Padding = this.equipmentList[countEQ].name.length + 3;
        }

        for( let locC = 0; locC < this.validJJLocations.length; locC++) {

            for( let critC = 0; critC < this.criticals[this.validJJLocations[locC].long].length; critC++) {
                let item = this.criticals[this.validJJLocations[locC].long][critC];
                if(
                    item &&
                    item.tag &&
                    item.tag.indexOf("jj-") === 0
                ) {
                    if( item.name.length + 3 > col1Padding)
                        col1Padding = item.name.length + 3;
                }
            }
        }

        html += "Weapons\n";

        html += "and Ammo".padEnd(col1Padding, " ") + "Location".padEnd(col2Padding, " ") + "Critical".padEnd(col3Padding, " ") + "Tonnage".padEnd(col4Padding, " ") + "\n";

        for( let countEQ = 0; countEQ < this.equipmentList.length; countEQ++) {
			let currentItem = this.equipmentList[countEQ];
            if( typeof(currentItem.location) === "undefined")
                currentItem.location = "n/a";

            let item_location = this.getLocationAbbr(currentItem.location);

            if( currentItem.rear)
                item_location += " (R)"

            if( currentItem.ammoPerTon && currentItem.ammoPerTon > 0) {
                html += "" + (currentItem.name + " " + currentItem.ammoPerTon).padEnd(col1Padding, " ") + "" + item_location.toUpperCase().toString().padEnd(col2Padding, " ") + "" + currentItem.space.battlemech.toString().padEnd(col3Padding, " ") + "" + currentItem.weight.toString().padEnd(col4Padding, " ") + "\n";
            } else {
                html += "" + currentItem.name.padEnd(col1Padding, " ") + "" + item_location.toUpperCase().toString().padEnd(col2Padding, " ") + "" + currentItem.space.battlemech.toString().padEnd(col3Padding, " ") + "" + currentItem.weight.toString().padEnd(col4Padding, " ") + "\n";
            }

        }

        // List Jump Jets Allocations...

        for( let locC = 0; locC < this.validJJLocations.length; locC++) {

            let jjObjs = [];
            for( let critC = 0; critC < this.criticals[this.validJJLocations[locC].long].length; critC++) {
				let currentItem = this.criticals[this.validJJLocations[locC].long][critC];
                if(
                    currentItem &&
                    currentItem.tag &&
                    currentItem.tag.indexOf("jj-") === 0
                ) {
                    jjObjs.push(currentItem);
                }
            }

            if( jjObjs.length > 0) {
                let areaWeight = 0;
                if( this.tonnage <= 55) {
                    // 10-55 tons
                    areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
                } else if( this.tonnage <= 85) {
                    // 60 - 85 tons
                    areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
                } else {
                    // 90+ tons
                    areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
                }
                html += "" + jjObjs[0].name.padEnd(col1Padding, " ") + "" + this.validJJLocations[locC].short.toUpperCase().padEnd(col2Padding, " ") + "" + jjObjs.length.toString().padEnd(col3Padding, " ") + "" + areaWeight.toString().padEnd(col4Padding, " ") + "\n";

            }
        }

        let jjObjs = [];

        for( let critC = 0; critC < this.unallocatedCriticals.length; critC++) {
            if(
                this.unallocatedCriticals[critC] &&
                this.unallocatedCriticals[critC].tag &&
                this.unallocatedCriticals[critC].tag.indexOf("jj-") === 0
            ) {
                jjObjs.push(this.unallocatedCriticals[critC]);
            }
        }

        if( jjObjs.length > 0) {
            let areaWeight = 0;
            if( this.tonnage <= 55) {
                // 10-55 tons
                areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
            } else if( this.tonnage <= 85) {
                // 60 - 85 tons
                areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
            } else {
                // 90+ tons
                areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
            }
            html += "" + jjObjs[0].name.padEnd(col1Padding, " ") + "n/a".toUpperCase().padEnd(col2Padding, " ") + "" + jjObjs.length.toString().padEnd(col3Padding, " ") + "" + areaWeight.toString().padEnd(col4Padding, " ") + "\n";

        }

        let createdBy = "\n\nCreated with BattleTech Tools: [url]https://jdgwf.github.io/battletech-tools/[/url]\n\n";

        return "[code]" + html + "[/code]" + createdBy;

    }

    makeTROHTML() {

        let html = "<table class=\"mech-tro\">";

        // Header Info
        html += "<tr><td colspan=\"4\">Type: " + this.getName() + "</td></tr>";
        html += "<tr><td colspan=\"4\">Technology Base: " + this.getTech().name + "</td></tr>";
        html += "<tr><td colspan=\"4\">Era: " + this.getEra().name + "</td></tr>";
        html += "<tr><td colspan=\"4\">Tonnage: " + this.getTonnage() + "</td></tr>";
        html += "<tr><td colspan=\"4\">Battle Value: " + this.getBattleValue() + "</td></tr>";
        html += "<tr><td colspan=\"4\">Alpha Strike Value: " + this.getAlphaStrikeValue() + "</td></tr>";
        html += "<tr><td colspan=\"4\">C-Bill Cost: $" + this.getCBillCost() + "</td></tr>";
        html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";

        // Equipment
        html += "<tr><th class=\"text-left\" colspan=\"3\">Equipment</th><th class=\"text-center\" colspan=\"1\">Mass</th></tr>";
        html += "<tr><td colspan=\"3\">Internal Structure (" + this.selectedInternalStructure.name + ")</td><td class=\"text-center\" colspan=\"1\">" + this.getInteralStructureWeight() + "</td></tr>";
        html += "<tr><td colspan=\"1\">" + this.getEngineName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

        html += "<tr><td colspan=\"1\" class=\"text-right\">Walking</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
        html += "<tr><td colspan=\"1\" class=\"text-right\">Running</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
        html += "<tr><td colspan=\"1\" class=\"text-right\">Jumping</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

        html += "<tr><td colspan=\"1\">" + this.getHeatSyncName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
        html += "<tr><td colspan=\"3\">" + this.getGyroName() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

        if( this.smallCockpit) {
            html += "<tr><td colspan=\"3\">Small Cockpit</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
        } else {
            html += "<tr><td colspan=\"3\">Cockpit</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
        }

        //~ if( this.getJumpJetWeight() > 0 ) {
        //~ html += "<tr><td colspan=\"3\">Jump Jets</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
        //~ }

        if( this.mechType.tag === "biped") {
            html += "<tr><td colspan=\"4\">Actuators: ";
            let actuator_html = "";

            if( this.hasLowerArmActuator("ra"))
                actuator_html += "RLA, ";
            if( this.hasLowerArmActuator("la"))
                actuator_html += "LLA, ";
            if( this.hasHandActuator("ra"))
                actuator_html += "RH, ";
            if( this.hasHandActuator("la"))
                actuator_html += "LH, ";

            if( actuator_html === "")
                actuator_html = "No lower arm actuators";
            else
                actuator_html = actuator_html.substring(0, actuator_html.length - 2);

            html += actuator_html;
            html += "</td></tr>";
        }

        html += "<tr><th colspan=\"1\">Armor Value (" + this.armorType.name + ")</th><th class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</th><th class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</th></tr>";

        // Armor Factor Table
        html += "<tr><td colspan=\"1\"></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">Internal Structure</em></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">Armor Value</em></td><td>&nbsp;</td></tr>";
        html += "<tr><td  class=\"text-right\"colspan=\"1\">Head</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.head + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.head + "</td><td>&nbsp;</td></tr>";
        html += "<tr><td  class=\"text-right\"colspan=\"1\">Center Torso</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.centerTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.centerTorso + "</td><td>&nbsp;</td></tr>";
        html += "<tr><td  class=\"text-right\"colspan=\"1\">Center Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.centerTorsoRear + "</td><td>&nbsp;</td></tr>";
        if( this.armorAllocation.rightTorso === this.armorAllocation.leftTorso && this.armorAllocation.rightTorsoRear === this.armorAllocation.leftTorsoRear) {
            html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Torso</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
            html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";
        } else {
            html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Torso</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
            html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";

            html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Torso</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftTorso + "</td><td>&nbsp;</td></tr>";
            html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftTorsoRear + "</td><td>&nbsp;</td></tr>";
        }
        if( this.mechType.tag === "biped") {

            if( this.armorAllocation.rightArm === this.armorAllocation.leftArm) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Arm</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Arm</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Arm</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
            }

            if( this.armorAllocation.rightLeg === this.armorAllocation.leftLeg) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
            }
        } else {
            if( this.armorAllocation.rightArm === this.armorAllocation.leftArm) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Front Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Front Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Front Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
            }

            if( this.armorAllocation.rightLeg === this.armorAllocation.leftLeg) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Rear Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Rear Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Leg</td><td class=\"text-center\" colspan=\"1\">" + this.internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this.armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
            }
        }
        // End Factor Table
        html += "</table>";
        html += "<br />";

        // Weapons and Ammo
        html += "<table class=\"mech-tro\">";
        html += "<tr><th class=\"text-left\">Weapons<br />and Ammo</th><th class=\"text-center\">Location</th><th class=\"text-center\">Critical</th><th class=\"text-center\">Tonnage</th></tr>";

        this.equipmentList.sort(sortByLocationThenName);

        for( let countEQ = 0; countEQ < this.equipmentList.length; countEQ++) {
			let currentItem = this.equipmentList[countEQ];
            if( typeof(currentItem.location) === "undefined")
                currentItem.location = "n/a";

            let item_location = this.getLocationAbbr(currentItem.location);

            if( currentItem.rear)
                item_location += " (R)"

            if( currentItem.ammoPerTon && currentItem.ammoPerTon > 0)
                html += "<tr><td class=\"text-left\">" + currentItem.name + " " + currentItem.ammoPerTon + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + currentItem.space.battlemech + "</td><td class=\"text-center\">" + currentItem.weight + "</td></tr>";
            else
                html += "<tr><td class=\"text-left\">" + currentItem.name + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + currentItem.space.battlemech + "</td><td class=\"text-center\">" + currentItem.weight + "</td></tr>";
        }

        // List Jump Jets Allocations...

        for( let locC = 0; locC < this.validJJLocations.length; locC++) {

            let jjObjs = [];
            for( let critC = 0; critC < this.criticals[this.validJJLocations[locC].long].length; critC++) {
                let item = this.criticals[this.validJJLocations[locC].long][critC];
                if(
                   item &&
                   item.tag &&
                   item.tag.indexOf("jj-") === 0
                ) {
                    jjObjs.push(this.criticals[this.validJJLocations[locC].long][critC]);
                }
            }

            if( jjObjs.length > 0) {
                let areaWeight = 0;
                if( this.tonnage <= 55) {
                    // 10-55 tons
                    areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
                } else if( this.tonnage <= 85) {
                    // 60 - 85 tons
                    areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
                } else {
                    // 90+ tons
                    areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
                }
                let jjObj = jjObjs[0];
                if( jjObj ) {
                    html += "<tr><td class=\"text-left\">" + jjObj.name + "</td><td class=\"text-center\">" + this.validJJLocations[locC].short.toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";
                }

            }
        }

        let jjObjs = [];

        for( let critC = 0; critC < this.unallocatedCriticals.length; critC++) {
            if(
                this.unallocatedCriticals[critC] &&
                this.unallocatedCriticals[critC].tag &&
                this.unallocatedCriticals[critC].tag.indexOf("jj-") === 0
            ) {
                jjObjs.push(this.unallocatedCriticals[critC]);
            }
        }

        if( jjObjs.length > 0) {
            let areaWeight = 0;
            if( this.tonnage <= 55) {
                // 10-55 tons
                areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.light;
            } else if( this.tonnage <= 85) {
                // 60 - 85 tons
                areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.medium;
            } else {
                // 90+ tons
                areaWeight = jjObjs.length * this.jumpJetType.weight_multiplier.heavy;
            }
            html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">n/a".toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

        }

        // END Weapons and Ammo
        html += "</table>";

        return html;
	}

    getLocationAbbr(locationTag: string) {

        for( let countLoc = 0; countLoc < battlemechLocations.length; countLoc++) {
            if( locationTag === battlemechLocations[countLoc].tag) {
                if( battlemechLocations[countLoc].abbr !== "undefined")
                    return battlemechLocations[countLoc].abbr;
                else
                    return battlemechLocations[countLoc].abbr;
            }
        }
        return "n/a";
    }

    clearMech() {
        this.setEngineType( "standard" );
        this.setMechType("biped");
        this.setTonnage(20);
        this.equipmentList = [];
        this.clearCriticalAllocationTable();
        this.calc();
    }

    calc() {

        this.maxMoveHeat = 2;
        this.heatDissipation = 0;

        this.weights = [];

        this.weights.push({
            name: "Internal Structure",
            weight: this.getInteralStructureWeight()
        });

        if( this.smallCockpit) {
            this.cockpitWeight = 2;
            this.weights.push({
                name: "Small Cockpit",
                weight: this.getCockpitWeight()
            });
        } else {
            this.cockpitWeight = 3;
            this.weights.push({
                name: "Cockpit",
                weight: this.getCockpitWeight()
            });
        }

        this.runSpeed = Math.ceil(this.walkSpeed * 1.5);

        // if( _era === 0) {
        //     era = btEraOptions[1];
        // }

        // if( this.tech === 0) {
        //     tech = btTechOptions[0];
        // }

        // if( this.mechType === 0) {
        //     mechType = mechTypeOptions[0];
        // }

        if( this.engine) {

            this.weights.push({
                name: this.engineType.name + " - " + this.engineType.rating,
                weight: this.getEngineWeight()
            });

            this.weights.push({
                name: this.gyro.name,
                weight: this.getGyroWeight()
            });

        }

        if( this.jumpSpeed > 0) {
            this.maxMoveHeat = this.jumpSpeed;
            // if( this.jumpJetType.tag === "standard") {
            //     // standard
            //     this.weights.push({
            //         name: this.jumpJetType.name,
            //         weight: this.getJumpJetWeight()
            //     });
            // } else {
            //     // improved
            //     this.weights.push({
            //         name: this.jumpJetType.name,
            //         weight: this.getJumpJetWeight()
            //     });
			// }
			this.weights.push({
				name: this.jumpJetType.name,
				weight: this.getJumpJetWeight()
			});
        }

        this.totalArmor = this.armorWeight * 16;

        //~ switch( this.getArmorType() ) {

        //~ default: // standard
        //~ _totalArmor = this.armorWeight * 16;
        //~ break;
        //~ }
        if( this.getTech().tag === "clan") {
            this.totalArmor = Math.floor(this.armorWeight * this.getArmorObj().armorMultiplier.clan);
        } else {
            this.totalArmor = Math.floor(this.armorWeight * this.getArmorObj().armorMultiplier.is);
        }

        if( this.totalArmor > this.maxArmor)
            this.totalArmor = this.maxArmor;

        this.weights.push({
            name: "Armor",
            weight: this.armorWeight
        });
        this.unallocatedArmor = this.totalArmor;
        this.unallocatedArmor -= this.armorAllocation.head;

        this.unallocatedArmor -= this.armorAllocation.centerTorso;
        this.unallocatedArmor -= this.armorAllocation.leftTorso;
        this.unallocatedArmor -= this.armorAllocation.rightTorso;

        this.unallocatedArmor -= this.armorAllocation.centerTorsoRear;
        this.unallocatedArmor -= this.armorAllocation.leftTorsoRear;
        this.unallocatedArmor -= this.armorAllocation.rightTorsoRear;

        this.unallocatedArmor -= this.armorAllocation.rightArm;
        this.unallocatedArmor -= this.armorAllocation.leftArm;

        this.unallocatedArmor -= this.armorAllocation.rightLeg;
        this.unallocatedArmor -= this.armorAllocation.leftLeg;

        this.maxWeaponHeat = 0;

        if( this.additionalHeatSinks > 0)
            this.weights.push({
                name: "Additional Heat Sinks",
                weight: this.additionalHeatSinks
            });

        this._calcVariableEquipment();
        for( let countEQ = 0; countEQ < this.equipmentList.length; countEQ++) {
            if( this.equipmentList[countEQ].rear) {
                this.weights.push({
                    name: this.equipmentList[countEQ].name + " (rear)",
                    weight: this.equipmentList[countEQ].weight
                });
            } else {
                this.weights.push({
                    name: this.equipmentList[countEQ].name + "",
                    weight: this.equipmentList[countEQ].weight
                });
            }
            if( this.equipmentList[countEQ])
                this.maxWeaponHeat += this.equipmentList[countEQ].heat;
        }

        this.currentTonnage = 0;
        for( let weight_counter = 0; weight_counter < this.weights.length; weight_counter++) {
            this.currentTonnage += this.weights[weight_counter].weight;
        }

        this.remainingTonnage = this.tonnage - this.currentTonnage;

        this.heatSinkCriticals = {
            slotsEach: 1,
            number: 0,
        };
        // this.heatSinkCriticals.number = 0;
        //~ this.heatSinkCriticals.slots_type = "single slot";
        // this.heatSinkCriticals.slotsEach = 1;

        //~ if( this.heatSinkType === "double") {
        //~ if( this.tech.tag === "clan") {
        //~ this.heatSinkCriticals.slots_type = "double slot";
        //~ this.heatSinkCriticals.slotsEach = 2;
        //~ } else {
        //~ this.heatSinkCriticals.slots_type = "triple slot";
        //~ this.heatSinkCriticals.slotsEach = 3;
        //~ }
        //~ _heatDissipation = (this.additionalHeatSinks + 10) * 2;
        //~ } else {
        //~ this.heatSinkCriticals.slots_type = "single";
        //~ this.heatSinkCriticals.slotsEach = 1;
        //~ _heatDissipation = this.additionalHeatSinks + 10;
        //~ }

        this.heatDissipation = (this.additionalHeatSinks + 10) * this.heatSinkType.dissipation;
        if( this.getTech().tag === "clan") {
            this.heatSinkCriticals.slotsEach = this.heatSinkType.crits.clan;
        } else {
            this.heatSinkCriticals.slotsEach = this.heatSinkType.crits.is;
        }

		let findEngine = this.getEngine();
        if( findEngine && findEngine.rating) {
            this.heatSinkCriticals.number = this.additionalHeatSinks + 10 - Math.floor(findEngine.rating / 25);
        } else {
            this.heatSinkCriticals.number = 0
        }

        this.calcCriticals();
        // this._calcAlphaStrike();
        this.calcBattleValue();
        this.calcCBillCost();

        // this.equipmentList = this.equipmentList.sort(sortByLocationThenName);
        // this.equipmentList.sort(sortByLocationThenName);
        // this.sortInstalledEquipment()
        this.sortedEquipmentList = [];

        // for( let countEQ = 0; countEQ < this.equipmentList.length; countEQ++) {

        //     let foundIt = false;

        //     for( let se_count = 0; se_count < this.sortedEquipmentList.length; se_count++) {
        //         if(
        //             this.equipmentList[countEQ].location === this.sortedEquipmentList[se_count].location &&
        //             this.equipmentList[countEQ].tag === this.sortedEquipmentList[se_count].tag
        //         ) {
        //             this.sortedEquipmentList[se_count].count++;
        //             foundIt = true;
        //         }
        //     }

        //     if( !foundIt) {
        //         let eqItem = angular.copy(this.equipmentList[countEQ]);
        //         eqItem.local_name = eqItem.name;
        //         eqItem.count = 1;
        //         this.sortedEquipmentList.push(eqItem);
        //     }
        // }
    }

	calcCriticals() {
		// WORK IN PROGRESS
		this.criticals.head = Array(6);

		this.criticals.centerTorso = Array(12);
		this.criticals.leftTorso = Array(12);
		this.criticals.rightTorso = Array(12);

        if( this.getType().tag === "quad") {
		    this.criticals.rightArm = Array(6);
            this.criticals.leftArm = Array(6);
        } else {
		    this.criticals.rightArm = Array(12);
            this.criticals.leftArm = Array(12);
        }

		this.criticals.rightLeg = Array(6);
        this.criticals.leftLeg = Array(6);

        // while( this.criticals.leftArm.length < 12 ) {
        //     this.criticals.leftArm.push( null );
        // }

		this.unallocatedCriticals = [];

		// Add required components....
		if( this.smallCockpit) {
			this._addCriticalItem("life-support", "Life Support", 1, "hd", 0);
			this._addCriticalItem("sensors", "Sensors", 1, "hd", 1);
			this._addCriticalItem("cockpit", "Cockpit", 1, "hd", 2);
			this._addCriticalItem("sensors", "Sensors", 1, "hd", 3);
		} else {
			this._addCriticalItem("life-support", "Life Support", 1, "hd", 0);
			this._addCriticalItem("sensors", "Sensors", 1, "hd", 1);
			this._addCriticalItem("cockpit", "Cockpit", 1, "hd", 2);
			this._addCriticalItem("sensors", "Sensors", 1, "hd", 4);
			this._addCriticalItem("life-support", "Life Support", 1, "hd", 5);
		}

		if( this.mechType.tag.toLowerCase() === "quad") {
			// quad
			// Left Leg Components
			this._addCriticalItem("hip", "Hip", 1, "ra", 0);
			this._addCriticalItem("upper-leg-actuator", "Upper Leg Actuator", 1, "ra", 1);
			this._addCriticalItem("lower-leg-actuator", "Lower Leg Actuator", 1, "ra", 2);
			this._addCriticalItem("foot-actuator", "Foot", 1, "ra", 3);

			// Right Leg Components
			this._addCriticalItem("hip", "Hip", 1, "la", 0);
			this._addCriticalItem("upper-leg-actuator", "Upper Leg Actuator", 1, "la", 1);
			this._addCriticalItem("lower-leg-actuator", "Lower Leg Actuator", 1, "la", 2);
			this._addCriticalItem("foot-actuator", "Foot", 1, "la", 3);

		} else {
			// biped
			// Left Arm Components
			this._addCriticalItem("shoulder", "Shoulder", 1, "la", 0);
			this._addCriticalItem("upper-arm-actuator", "Upper Arm Actuator", 1, "la", 1);
			if( this.hasLowerArmActuator("la")) {
				this._addCriticalItem("lower-arm-actuator", "Lower Arm Actuator", 1, "la", 2);
				if( this.hasHandActuator("la")) {

					this._addCriticalItem("hand-actuator", "Hand Actuator", 1, "la", 3);
				}
			}

			// Right Arm Components
			this._addCriticalItem("shoulder", "Shoulder", 1, "ra", 0);
			this._addCriticalItem("upper-arm-actuator", "Upper Arm Actuator", 1, "ra", 1);
			if( this.hasLowerArmActuator("ra")) {
				this._addCriticalItem("lower-arm-actuator", "Lower Arm Actuator", 1, "ra", 2);
				if( this.hasHandActuator("ra")) {

					this._addCriticalItem("hand-actuator", "Hand Actuator", 1, "ra", 3);
				}
			}
		}

		// Engine

		if( this.engineType.criticals && this.engineType.criticals[this.getTech().tag] ) {
			let engineCrits = this.engineType.criticals[this.getTech().tag];
			if( engineCrits && engineCrits.ct )  {
				if(
					this.engineType &&
					engineCrits &&
					engineCrits.ct > 3
				) {
					this._addCriticalItem(
						"engine", // item_tag
						this.engineType.name, // item_name
						3, // criticalCount
						"ct" // location
						// slot
					);
				} else {
					// reset back to standard, engine not available for tech
					if( engineCrits && engineCrits.ct ) {
						console.log("warning", "resetting engine to standard ", this.engineType.criticals, this.getTech().tag, this.tech);
						this.setEngineType("standard");
						this._addCriticalItem(
							"engine", // item_tag
							this.engineType.name, // item_name
							engineCrits.ct, // criticalCount
							"ct" // location
							// slot
						);
					}
				}

				if(
					engineCrits &&
					engineCrits.rt
				) {
					this._addCriticalItem("engine", this.engineType.name, engineCrits.rt, "rt");
				}

				if(
					engineCrits &&
					engineCrits.lt
				) {
					this._addCriticalItem("engine", this.engineType.name, engineCrits.lt, "lt");
				}

				// Extra engine bits....
				if( engineCrits.ct > 3) {
					this._addCriticalItem(
						"engine", // item_tag
						this.engineType.name, // item_name
						engineCrits.ct - 3, // criticalCount
						"ct" // location
					);
				}
			}
		}
		// Gyro
		this._addCriticalItem(
			"gyro", // item_tag
			this.gyro.name, // item_name
			this.gyro.criticals, // criticalCount
			"ct" // location
		);

		// Left Leg Components
		this._addCriticalItem("hip", "Hip", 1, "ll", 0);
		this._addCriticalItem("upper-leg-actuator", "Upper Leg Actuator", 1, "ll", 1);
		this._addCriticalItem("lower-leg-actuator", "Lower Leg Actuator", 1, "ll", 2);
		this._addCriticalItem("foot-actuator", "Foot", 1, "ll", 3);

		// Right Leg Components
		this._addCriticalItem("hip", "Hip", 1, "rl", 0);
		this._addCriticalItem("upper-leg-actuator", "Upper Leg Actuator", 1, "rl", 1);
		this._addCriticalItem("lower-leg-actuator", "Lower Leg Actuator", 1, "rl", 2);
		this._addCriticalItem("foot-actuator", "Foot", 1, "rl", 3);

		// Jump Jets
		let jump_move = this.getJumpSpeed();
		for( let jmc = 0; jmc < jump_move; jmc++) {
			this.unallocatedCriticals.push({
                uuid: generateUUID(),
                obj: null,
				name: this.jumpJetType.name,
				tag: "jj-" + this.jumpJetType.tag,
				rear: false,
				movable: true,
				crits: this.jumpJetType.criticals,
			});
		}

		// Armor

		let armorObj = this.getArmorObj();
		if( this.getTech().tag === "clan") {
			if( armorObj.crits.clan > 0) {
				if( armorObj.critLocs) {
					for( let nameLoc in armorObj.critLocs) {
						this._addCriticalItem(
							armorObj.tag, // item_tag
							armorObj.name, // item_name
							armorObj.critLocs[nameLoc], // criticalCount
							nameLoc, // location
							// slot
						);
					}
				} else {
					for( let aCounter = 0; aCounter < armorObj.crits.clan; aCounter++) {
						this.unallocatedCriticals.push({
							uuid: generateUUID(),
							name: armorObj.name,
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
			if( armorObj.crits.is > 0) {
				if( armorObj.critLocs) {
					for( let nameLoc in armorObj.critLocs) {
						this._addCriticalItem(
							armorObj.tag, // item_tag
							armorObj.name, // item_name
							armorObj.critLocs[nameLoc], // criticalCount
							nameLoc // location
							// slot
						);
					}
				} else {
					for( let aCounter = 0; aCounter < armorObj.crits.is; aCounter++) {
						this.unallocatedCriticals.push({
							uuid: generateUUID(),
							name: armorObj.name,
							tag: armorObj.tag,
							rear: false,
							rollAgain: true,
							crits: 1,
							obj: armorObj,
							movable: true,
						});
					}
				}
			}
		}

		// Internal Structure critical Items
		if( this.getTech().tag === "clan") {
			for( let aCounter = 0; aCounter < this.selectedInternalStructure.crits.clan; aCounter++) {
				this.unallocatedCriticals.push({
					uuid: generateUUID(),
					name: this.selectedInternalStructure.name,
					tag: this.selectedInternalStructure.tag,
					rollAgain: true,
					rear: false,
					crits: 1,
					obj: this.selectedInternalStructure,
					movable: true
				});
			}

		} else {
			for( let aCounter = 0; aCounter < this.selectedInternalStructure.crits.is; aCounter++) {
				this.unallocatedCriticals.push({
                    uuid: generateUUID(),
					name: this.selectedInternalStructure.name,
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
		for( let elc = 0; elc < this.equipmentList.length; elc++) {
			//~ this.equipmentList[elc].location = "";
            let rearTag = "";
            let isRear = false;
			if( this.equipmentList[elc].rear) {
				rearTag = " (rear)";
                isRear = true;
            }
			this.unallocatedCriticals.push({
                uuid: generateUUID(),
				name: this.equipmentList[elc].name + rearTag,
                tag: this.equipmentList[elc].tag,
                // loc: this.equipmentList[elc].location,
				rear: isRear,
				crits: this.equipmentList[elc].space.battlemech,
				obj: this.equipmentList[elc],
				movable: true
			});

		}

		// Heat Sink Requirements
		let hs_requirements = this.getHeatSinkCriticalRequirements();
		let hs_name = "";
		if( hs_requirements.slotsEach > 1)
			hs_name = "Double Heat Sink";
		else
			hs_name ="Heat Sink";
		for( let hsc = 0; hsc < hs_requirements.number; hsc++) {

			this.unallocatedCriticals.push({
                obj: null,
                uuid: generateUUID(),
				name: hs_name,
				rear: false,
				tag: "heat-sink",
				crits: hs_requirements.slotsEach,
				movable: true
			});
		}

        // Allocate items per allocation table.
		for( let item of this.criticalAllocationTable) {
            // console.log("criticalAllocationTable item", item);
			this.allocateCritical(
				item.tag,
				item.rear,
				item.loc,
				item.slot,
				true,
			)
		}

		// remove location tag for remaining unallocated
		for( let item of this.unallocatedCriticals) {
			if( item.obj)
                item.obj.location = "";
		}

        // console.log( "this.criticals", this.criticals )
	}

    hasHandActuator(location: string) {
        if( location === "ra")
            if( this.no_right_arm_hand_actuator)
                return false;
        if( location === "la")
            if( this.no_left_arm_hand_actuator)
                return false;
        return true;
    }

    hasLowerArmActuator(location: string) {
        if( location === "ra")
            if( this.no_right_arm_lower_actuator)
                return false;
        if( location === "la")
            if( this.no_left_arm_lower_actuator)
                return false;
        return true;
    }

    removeHandActuator(location: string) {
        if( location === "ra") {
            this.no_right_arm_hand_actuator = true;
        }
        if( location === "la") {
            this.no_left_arm_hand_actuator = true;
        }
        this.calc();

    }

    removeLowerArmActuator(location: string) {
        if( location === "ra") {
            this.no_right_arm_hand_actuator = true;
            this.no_right_arm_lower_actuator = true;

        }
        if( location === "la") {
            this.no_left_arm_hand_actuator = true;
            this.no_left_arm_lower_actuator = true;
        }
        this.calc();
    }

    addHandActuator(location: string) {
        if( location === "ra") {
            this.no_right_arm_hand_actuator = false;
            this.no_right_arm_lower_actuator = false;

        }
        if( location === "la") {
            this.no_left_arm_hand_actuator = false;
            this.no_left_arm_lower_actuator = false;
        }
        this.calc();
    }

    addLowerArmActuator(location: string) {
        if( location === "ra") {
            //    no_right_arm_hand_actuator = false;
            this.no_right_arm_lower_actuator = false;

        }
        if( location === "la") {
            //    no_left_arm_hand_actuator = false;
            this.no_left_arm_lower_actuator = false;
        }
        this.calc();
    }

    toggleHandActuator(location: string) {
        if( location === "ra") {
            if( this.no_right_arm_hand_actuator ) {
                this.no_right_arm_hand_actuator = false;
                this.no_right_arm_lower_actuator = false;
            } else {
                this.no_right_arm_hand_actuator = true;
            }

        }
        if( location === "la") {
            if( this.no_left_arm_hand_actuator ) {
                this.no_left_arm_hand_actuator = false;
                this.no_left_arm_lower_actuator = false;
            } else {
                this.no_left_arm_hand_actuator = true;
            }

        }
        this.calc();
    }

    toggleLowerArmActuator(location: string) {
        if( location === "ra") {
            if( this.no_right_arm_lower_actuator ) {
                this.no_right_arm_lower_actuator = false;
            } else {
                this.no_right_arm_lower_actuator = true;
                this.no_right_arm_hand_actuator = true;
            }
        }
        if( location === "la") {
            if( this.no_left_arm_lower_actuator ) {
                this.no_left_arm_lower_actuator = false;

            } else {
                this.no_left_arm_lower_actuator = true;
                this.no_left_arm_hand_actuator = true;
            }

        }
        this.calc();
    }

    getMaxMovementHeat() {
        let maxMoveHeat = 2; // standard run heat.

        if( this.getJumpSpeed() > 2) {
            maxMoveHeat = this.getJumpSpeed();
        }

        // Stealth Armor
        if( this.getArmorType() === "stealth") {
            maxMoveHeat += 10;
        }

        return maxMoveHeat;
    }

    private _addCriticalItem(
		item_tag: string,
		item_name: string,
		criticalCount: number,
		location: string,
		slot: number | null = 0,
		movable: boolean = false,
	) {
		let uuid = generateUUID();
		let item: ICriticalSlot = {
            obj: null,
            rear: false,
			tag: item_tag,
			name: item_name,
			crits: criticalCount,
			movable: movable,
			uuid: uuid
		};

        if( typeof(slot) === "undefined" || slot === null)
            slot = null;

        if( typeof(location) !== "undefined" && location !== null) {
            if( location === "hd") {
                this._assignItemToArea(this.criticals.head, item, criticalCount, slot);

            } else if( location === "ct") {
                this._assignItemToArea(this.criticals.centerTorso, item, criticalCount, slot);

            } else if( location === "lt") {
                this._assignItemToArea(this.criticals.leftTorso, item, criticalCount, slot);

            } else if( location === "rt") {
                this._assignItemToArea(this.criticals.rightTorso, item, criticalCount, slot);

            } else if( location === "ra") {
                this._assignItemToArea(this.criticals.rightArm, item, criticalCount, slot);

            } else if( location === "la") {
                this._assignItemToArea(this.criticals.leftArm, item, criticalCount, slot);

            } else if( location === "rl") {
                this._assignItemToArea(this.criticals.rightLeg, item, criticalCount, slot);

            } else if( location === "ll") {
                this._assignItemToArea(this.criticals.leftLeg, item, criticalCount, slot);

            } else {
                return item;
            }

        } else {
            return item;
        }
    }

    _isNextXCritsAvailable(
		areaArray: ICriticalSlot[],
		criticalCount: number,
        beginSlot: number,
        selfUUID: string,
	): boolean {

        for( let countItem = 0; countItem < criticalCount; countItem++) {
            if(
                areaArray[beginSlot + countItem]
                    &&
                areaArray[beginSlot + countItem].uuid !== selfUUID
            ) {
                return false;
            }
        }
        return true;
    }

    private _assignItemToArea(
		areaArray: ICriticalSlot[],
		newItem: ICriticalSlot,
		criticalCount: number,
		slotNumber: number | null
	) {

        let placeholder: ICriticalSlot = {
            uuid: newItem.uuid,
            name: "placeholder",
			placeholder: true,
			tag: "",
			crits: 1,
			rear: false,
			obj: null,
        };

        // console.log("newItem", newItem );
        if( typeof(slotNumber) === "undefined" || slotNumber === null || slotNumber === 0) {
            // place anywhere available
            for( let countArray = 0; countArray < areaArray.length; countArray++) {
                if( !areaArray[countArray]) {

                    if( this._isNextXCritsAvailable(areaArray, criticalCount - 1, countArray + 1, newItem.uuid)) {
                        for( let aita_c = 0; aita_c < criticalCount; aita_c++) {
                            if( aita_c === 0) {
                                areaArray[aita_c + countArray] = newItem;
                            } else {
                                areaArray[aita_c + countArray] = placeholder;
                            }
                        }
                        return true;
                    }
                }
            }
        } else {
            // at specified slot
            if( !areaArray[slotNumber]) {
                if( this._isNextXCritsAvailable(areaArray, criticalCount - 1, slotNumber + 1, newItem.uuid)) {

                    for( let aita_c = 0; aita_c < criticalCount; aita_c++) {
                        if( aita_c === 0) {
                            areaArray[aita_c + slotNumber] = newItem;
                        } else {
                            areaArray[aita_c + slotNumber] = placeholder;
                        }
                    }
                    return true;
                }
            }
        }

        return false;
    }

    canBeAssignedToArea(
		areaArray: ICriticalSlot[],
        criticalCount: number,
        selfUUID: string,
        slotNumber: number | null = null,
	) {

        if( slotNumber === null ) {
            // place anywhere available
            for( let countArray = 0; countArray < areaArray.length; countArray++) {
                if( areaArray[countArray] === null) {
                    if( this._isNextXCritsAvailable(areaArray, criticalCount - 1, countArray + 1, selfUUID)) {
                        return true;
                    }
                }
            }
        } else {
            // at specified slot
            if( areaArray[slotNumber] === null) {
                if( this._isNextXCritsAvailable(areaArray, criticalCount - 1, slotNumber + 1, selfUUID)) {
                    return true;
                }
            }
        }

        return false;
    }

    trimCriticals() {
        this.criticals.head = this.criticals.head.slice(0, 6);

        this.criticals.centerTorso = this.criticals.centerTorso.slice(0, 12);
        this.criticals.leftTorso = this.criticals.leftTorso.slice(0, 12);
        this.criticals.rightTorso = this.criticals.rightTorso.slice(0, 12);

        this.criticals.rightLeg = this.criticals.rightLeg.slice(0, 6);
        this.criticals.leftLeg = this.criticals.leftLeg.slice(0, 6);

        if( this.mechType.tag.toLowerCase() === "quad") {
            this.criticals.rightArm = this.criticals.rightArm.slice(0, 6);
            this.criticals.leftArm = this.criticals.leftArm.slice(0, 6);
        } else {
            this.criticals.rightArm = this.criticals.rightArm.slice(0, 12);
            this.criticals.leftArm = this.criticals.leftArm.slice(0, 12);
        }
    }

    getHeatSinksType() {
        return this.heatSinkType.tag;
    }

    getHeatSinksObj() {
        return this.heatSinkType;
    }

    setHeatSinksType(newValue: string) {
        for( let heatSink of mechHeatSinkTypes ) {
            if( heatSink.tag === newValue)
                this.heatSinkType = heatSink;
        }

        for( let localCount = this.criticalAllocationTable.length; localCount >= 0; localCount--) {
            if( this.criticalAllocationTable[localCount] && this.criticalAllocationTable[localCount].tag === "heat-sink")
                this.criticalAllocationTable.splice(localCount, 1);
        }

        this.calc();

        return this.heatSinkType;
    }

    getCurrentTonnage() {
        return this.currentTonnage;
    }

    getHeatSinkCriticalRequirements() {

        return this.heatSinkCriticals;
    }

    getArmorAllocation() {
        return this.armorAllocation;
    }

    getRemainingTonnage() {

        return this.remainingTonnage;

    }

    getMoveHeat() {
        return this.maxMoveHeat;
    }

    getWeaponHeat() {
        return this.maxWeaponHeat;
    }

    getHeatDissipation() {
        return this.heatDissipation;
    }

    getHeatSummary(): number {
        // return  (10 + this.additionalHeatSinks) * this.heatSinkType.dissipation;
        return this.getMoveHeat() + this.getWeaponHeat() - this.getHeatDissipation()
    }

    getWalkSpeed() {
        return this.walkSpeed;
    }

    setWalkSpeed(walkSpeed: number) {
        this.walkSpeed = walkSpeed
        this.setEngine(this.tonnage * this.walkSpeed);

        if( this.jumpSpeed > this.walkSpeed)
            this.setJumpSpeed(this.walkSpeed);

        return this.walkSpeed;
    }

    getRunSpeed() {
        return this.runSpeed;
    }

    getJumpSpeed() {
        return this.jumpSpeed;
    }

    setJumpSpeed(jumpSpeed: number) {
        this.jumpSpeed = jumpSpeed;
        this.calc();
        return this.jumpSpeed;
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

    setArmorType(armorTag: string) {
        for( let aCount = 0; aCount < mechArmorTypes.length; aCount++) {
            if( mechArmorTypes[aCount].tag === armorTag) {
                this.armorType = mechArmorTypes[aCount];
                this.calc();
            }
        }
        return this.armorType;
    }

    getTotalArmor() {
        return this.totalArmor;
    }

    getUnallocatedArmor() {
        return this.unallocatedArmor;
    }

    setArmorWeight(armorWeight: number) {
        this.armorWeight = armorWeight;
        this.calc();
        return this.armorWeight;
    }

    getEngine(): IEngineOption | null {
        return this.engine;
    }

    setEngine(ratingNumber: number) {
        ratingNumber = ratingNumber / 1;
        for( let engine of mechEngineOptions ) {
            if(engine.rating === ratingNumber) {
                this.engine = engine;
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

    setInternalStructureType( isTag: string ) {
        for( let is of mechInternalStructureTypes) {
            if( isTag === is.tag) {
                this.selectedInternalStructure = is;
                return this.selectedInternalStructure;
            }
        }

        return null;
    }

    getGyro() {
        return this.gyro;
    }

    getEra() {
        return this.era;
    }

    getCriticals() {
        this.trimCriticals();
        return this.criticals;
    }

    getUnallocatedCriticals() {
        return this.unallocatedCriticals;
    }

    setEra(eraTag: string) {

        for( let era of btEraOptions ) {
            if( eraTag === era.tag) {
                this.era = era;
                this.calc();
                return this.era;
            }
        }
        return null;
    }

    getTech() {
        return this.tech;
    }

    setTech(techTag: string) {
        for( let technology of btTechOptions ) {
            if( techTag === technology.tag) {
                this.tech = technology;
                this.calc();

                // set era to Clan Invasion (id 3) if the techID is 2 (Clan)
                // if( techID === 2 && this.getEra().id !== 3) {
                //     this.setEra(3);
                // }

                return this.tech;
            }
        }
        return null;
    }

    getMechType() {
        return this.mechType;
    }

    getAlphaStrikeForceStats() {
        return this.alphaStrikeForceStats;
    }

    getPilot() {
        return this.pilot;
    }

    setPilotName(newValue: string) {
        this.pilot.name = newValue;
    }

    setPilotPiloting(newValue: number) {
        this.pilot.piloting = newValue;
    }

    setPilotGunnery(newValue: number) {
        this.pilot.gunnery = newValue;
    }

    setEngineType(engineType: string) {
        for( let engine of mechEngineTypes) {
            if( engineType.toLowerCase() === engine.tag) {
                this.engineType = engine;
                this.calc();
                return this.engineType;
            }
        }
        // default to Military Standard if tag not found.
        this.engineType = mechEngineTypes[0];
        return this.engineType;
    }

    setGyroType(gyroType: string) {
        for( let gyro of mechGyroTypes) {
            if( gyroType.toLowerCase() === gyro.tag) {
                this.gyro = gyro;
                this.calc();
                return this.gyro;
            }
        }
        // default to Military Standard if tag not found.
        this.gyro = mechGyroTypes[0];
        return this.gyro;
    }

    getEngineType() {
        return this.engineType;
    }

    getEngineName(): string {
        return this.engineType.name;
    }

    getHeatSyncName() {

        if( this.heatSinkType.tag === "single") {
            return "Single Heat Sinks";
        } else {
            return "Double Heat Sinks";
        }

    }

    getGyroName() {
        return this.gyro.name;
    }

    getName() {
        if( this.make )
            return this.make;
        else
            return "";
    }

    setMake(newValue: string): string {
        this.make = newValue;
        return this.make;
    }

    getTonnage() {
        return this.tonnage;
    }

    setTonnage(tonnage: number) {

        this.tonnage = tonnage;
        this.internalStructure.head = this.selectedInternalStructure.perTon[this.getTonnage()].head;

        this.internalStructure.centerTorso = this.selectedInternalStructure.perTon[this.getTonnage()].centerTorso;
        this.internalStructure.leftTorso = this.selectedInternalStructure.perTon[this.getTonnage()].rlTorso;
        this.internalStructure.rightTorso = this.selectedInternalStructure.perTon[this.getTonnage()].rlTorso;

        this.internalStructure.rightArm = this.selectedInternalStructure.perTon[this.getTonnage()].rlArm;
        this.internalStructure.leftArm = this.selectedInternalStructure.perTon[this.getTonnage()].rlArm;

        this.internalStructure.rightLeg = this.selectedInternalStructure.perTon[this.getTonnage()].rlLeg;
        this.internalStructure.leftLeg = this.selectedInternalStructure.perTon[this.getTonnage()].rlLeg;

        this.maxArmor = 9 + this.internalStructure.centerTorso * 2 + this.internalStructure.leftTorso * 2 + this.internalStructure.rightTorso * 2 + this.internalStructure.rightLeg * 2 + this.internalStructure.leftLeg * 2;
        if( this.mechType.tag.toLowerCase() === "biped")
			this.maxArmor += this.internalStructure.leftArm * 2 + this.internalStructure.rightArm * 2;
        else
			this.maxArmor += this.internalStructure.rightLeg * 2 + this.internalStructure.leftLeg * 2;

        if( this.mechType.tag.toLowerCase() === "quad") {
            this.internalStructure.rightArm = this.internalStructure.rightLeg;
            this.internalStructure.leftArm = this.internalStructure.leftLeg;
        }

        this.maxArmorTonnage = this.maxArmor / 16;

        this.totalInternalStructurePoints = 0;

        this.totalInternalStructurePoints += this.internalStructure.head;

        this.totalInternalStructurePoints += this.internalStructure.centerTorso;
        this.totalInternalStructurePoints += this.internalStructure.leftTorso;
        this.totalInternalStructurePoints += this.internalStructure.rightTorso;

        this.totalInternalStructurePoints += this.internalStructure.rightArm;
        this.totalInternalStructurePoints += this.internalStructure.leftArm;

        this.totalInternalStructurePoints += this.internalStructure.rightLeg;
        this.totalInternalStructurePoints += this.internalStructure.leftLeg;

        this.setWalkSpeed(this.walkSpeed);
        this.calc();

        return this.tonnage;
    }

    getMaxArmorTonnage() {
        return this.maxArmorTonnage;
    }

    getMaxArmor() {
        return this.maxArmor;
    }

    getType() {
        return this.mechType;
    }

    setType(typeTag: string) {
		for( let mechType of mechTypeOptions) {
			if( mechType.tag === typeTag ) {
				this.mechType = mechType;
                this.setTonnage(this.tonnage);
                if( typeTag === "quad")
                    this.clearArmCriticalAllocationTable();
				this.calc();
				return this.mechType;
			}
		}
    }

    exportJSON() {
        // TODO
		this.calc();

        let exportObject: IBattleMechExport = {
			additionalHeatSinks: this.additionalHeatSinks,
			allocation: this.criticalAllocationTable,
			armor_allocation: this.armorAllocation,
			armor_weight: this.armorWeight,
			as_custom_name: this.alphaStrikeForceStats.customName,
			as_role: this.alphaStrikeForceStats.role,
			engineType: this.getEngineType().tag,
			equipment: [],
			era: this.era.tag,
			features: [],
			gyro: this.gyro.tag,
			heat_sink_type: this.getHeatSinksType(),
			is_type: this.getInternalStructureType(),
			jumpSpeed: this.jumpSpeed,
			mechType: this.mechType.tag,
			pilot: this.pilot,
			strictEra: this.strictEra,
			tech: this.tech.tag,
			tonnage: this.getTonnage(),
			uuid: this.uuid,
			walkSpeed: this.walkSpeed,
 			armor_type: this.getArmorType(),
            hideNonAvailableEquipment: this.hideNonAvailableEquipment,
            name: this.getName(),
        };

        for( let countEQ = 0; countEQ < this.equipmentList.length; countEQ++) {
            exportObject.equipment.push({
                tag: this.equipmentList[countEQ].tag,
                loc: this.equipmentList[countEQ].location,
                rear: this.equipmentList[countEQ].rear,
                uuid: this.equipmentList[countEQ].uuid,
            });
        }

        if( !this.hasLowerArmActuator("la"))
            exportObject.features.push("no_lala");
        if( !this.hasLowerArmActuator("ra"))
            exportObject.features.push("no_rala");
        if( !this.hasHandActuator("la"))
            exportObject.features.push("no_laha");
        if( !this.hasHandActuator("ra"))
            exportObject.features.push("no_raha");
        if( this.smallCockpit)
            exportObject.features.push("sm_cockpit");

        return JSON.stringify(exportObject);
    }

    getInteralStructure() {
        return this.internalStructure;
    }

    setASRole(newValue: string) {
        return this.alphaStrikeForceStats.role = newValue;
    }

    setASCustomName(newValue: string) {
        return this.alphaStrikeForceStats.customName = newValue;
    }

    getASCustomName() {
        return this.alphaStrikeForceStats.customName;
    }

    importJSON(jsonString: string) {
        // TODO
		let importObject: IBattleMechExport | null = null;

        try {
            importObject = JSON.parse(jsonString);
        } catch (err) {
            return false;
        }

        if( importObject && importObject.mechType  ) {
            this.setMake(importObject.name);
            //~ console.log( "importObject.mechType", importObject.mechType );
            if( importObject.mechType)
                this.setMechType(importObject.mechType);

            this.setTonnage(importObject.tonnage);

            this.hideNonAvailableEquipment = importObject.hideNonAvailableEquipment;
            if( importObject.era)
                this.setEra(importObject.era);

            if( importObject.tech)
                this.setTech(importObject.tech);

            if( importObject.pilot)
                this.pilot = importObject.pilot;

            if( importObject.as_role)
                this.setASRole(importObject.as_role);

            if( importObject.armor_type)
                this.setArmorType(importObject.armor_type);

            if( importObject.as_custom_name)
                this.setASCustomName(importObject.as_custom_name);

            if( importObject.is_type)
                this.setInternalStructureType(importObject.is_type);

            if( importObject.walkSpeed)
                this.setWalkSpeed(importObject.walkSpeed);

            if( importObject.jumpSpeed)
                this.setJumpSpeed(importObject.jumpSpeed);

            if( typeof(importObject.strictEra) !== "undefined") {
                if( importObject.strictEra)
                    this.strictEra = true;
                else
                    this.strictEra = false;
            }

            if( importObject.gyro)
                this.setGyroType(importObject.gyro);

            if( importObject.engineType)
                this.setEngineType(importObject.engineType);

            if( importObject.additionalHeatSinks)
                this.setAdditionalHeatSinks(importObject.additionalHeatSinks);

            if( importObject.heat_sink_type)
                this.setHeatSinksType(importObject.heat_sink_type);

            if( importObject.armor_weight)
                this.setArmorWeight(importObject.armor_weight);

            if( importObject.armor_allocation)
                this.armorAllocation = importObject.armor_allocation;

            if( importObject.uuid)
                this.uuid = importObject.uuid;

            if( importObject.features) {

                // Lower Arm Actuators
                if( importObject.features.indexOf("no_rala") > -1)
                    this.removeLowerArmActuator("ra");
                if( importObject.features.indexOf("no_lala") > -1)
                    this.removeLowerArmActuator("la");

                // Hand Actuators
                if( importObject.features.indexOf("no_raha") > -1)
                    this.removeHandActuator("ra");
                if( importObject.features.indexOf("no_laha") > -1)
                    this.removeHandActuator("la");

                // Small Cockpit
                if( importObject.features.indexOf("sm_cockpit") > -1)
                    this.smallCockpit = true;

                // Other features
            }

            if( importObject.equipment) {
                for( let countEQ = 0; countEQ < importObject.equipment.length; countEQ++) {

                    let importItem = importObject.equipment[countEQ];

                    if( importItem.rear)
                        importItem.rear = true;
                    else
                        importItem.rear = false;

                    this.addEquipmentFromTag(
                        importItem.tag,
                        this.getTech().tag,
                        importItem.loc,
                        importItem.rear,
                        importItem.uuid,
                    );
                }
            }

            if( importObject.allocation) {

                // console.log("importObject.allocation", importObject.allocation);
                this.criticalAllocationTable = importObject.allocation;

                for( let countEQ = 0; countEQ < this.criticalAllocationTable.length; countEQ++) {
                    if( this.criticalAllocationTable[countEQ].rear)
                        this.criticalAllocationTable[countEQ].rear = true;
                    else
                        this.criticalAllocationTable[countEQ].rear = false;
                }
            }

            this.calc();
            return true;
        } else {
            return false;
        }

    }

    getWeightBreakdown() {
        return this.weights;
    }

    setCenterTorsoArmor(armorValue: number) {
        this.armorAllocation.centerTorso = armorValue;
        this.calc();
        return this.armorAllocation.centerTorso;
    }

    setCenterTorsoRearArmor(armorValue: number) {
        this.armorAllocation.centerTorsoRear = armorValue;
        this.calc();
        return this.armorAllocation.centerTorsoRear;
    }

    setHeadArmor(armorValue: number) {
        this.armorAllocation.head = armorValue;
        this.calc();
        return this.armorAllocation.head;
    }

    setLeftArmArmor(armorValue: number) {
        this.armorAllocation.leftArm = armorValue;
        this.calc();
        return this.armorAllocation.leftArm;
    }

    setLeftLegArmor(armorValue: number) {
        this.armorAllocation.leftLeg = armorValue;
        this.calc();
        return this.armorAllocation.leftLeg;
    }

    setLeftTorsoArmor(armorValue: number) {
        this.armorAllocation.leftTorso = armorValue;
        this.calc();
        return this.armorAllocation.leftTorso;
    }

    setLeftTorsoRearArmor(armorValue: number) {
        this.armorAllocation.leftTorsoRear = armorValue;
        this.calc();
        return this.armorAllocation.leftTorsoRear;
    }

    setRightArmArmor(armorValue: number) {
        this.armorAllocation.rightArm = armorValue;
        this.calc();
        return this.armorAllocation.rightArm;
    }

    setRightLegArmor(armorValue: number) {
        this.armorAllocation.rightLeg = armorValue;
        this.calc();
        return this.armorAllocation.rightLeg;
    }

    setRightTorsoArmor(armorValue: number) {
        this.armorAllocation.rightTorso = armorValue;
        this.calc();
        return this.armorAllocation.rightTorso;
    }

    setRightTorsoRearArmor(armorValue: number) {
        this.armorAllocation.rightTorsoRear = armorValue;
        this.calc();
        return this.armorAllocation.rightTorsoRear;
    }

    getAdditionalHeatSinks() {
        return this.additionalHeatSinks;
    };

    addEquipment(
        equipmentIndex: number,
        equipmentListTag: string,
        location: string,
        rear: boolean = false,
        uuid: string | undefined | null,
    ) {
        if( !uuid ) {
            uuid = generateUUID()
        }

        let equipmentList: IEquipmentItem[] = [];
        if( equipmentListTag === "is") {
            equipmentList = mechISEquipment;

        }

        if( equipmentListTag === "clan") {
            equipmentList = mechClanEquipment;
        }

        if( equipmentList[equipmentIndex]) {


            let equipmentItem: IEquipmentItem = JSON.parse(JSON.stringify(equipmentList[equipmentIndex]));

            if( typeof(location) !== "undefined")
				equipmentItem.location = location;

            equipmentItem.rear = rear;
            equipmentItem.uuid = uuid;

            this.equipmentList.push(equipmentItem);
            this.sortInstalledEquipment();
            return equipmentItem;
        }

        return null;
    };

    addEquipmentFromTag(
        equipmentTag: string,
        equipmentListTag: string,
        location: string | undefined,
        rear: boolean = false,
        uuid: string | undefined | null,
    ) {
        let equipmentList: IEquipmentItem[] = [];

        if( !uuid ) {
            uuid = generateUUID()
        }

        if( !equipmentListTag) {
            equipmentListTag = this.tech.tag;
        }

        if( equipmentListTag === "is") {
            equipmentList = mechISEquipment;

        }

        if( equipmentListTag === "clan") {
            equipmentList = mechClanEquipment;
        }

        for( let item of equipmentList ) {
            if( equipmentTag === item.tag) {
				let equipmentItem: IEquipmentItem = JSON.parse(JSON.stringify(item));
                if( typeof(location) !== "undefined")
                    equipmentItem.location = location;
                equipmentItem.rear = rear;
                equipmentItem.uuid = uuid;
                this.equipmentList.push(equipmentItem);

                this.sortInstalledEquipment();
                return equipmentItem;
            }
        }

        return null;
    };

    removeEquipment(equipmentIndex: number) {
        if( this.equipmentList[equipmentIndex]) {
            this.equipmentList.splice(equipmentIndex, 1);
            return 1;
        }
        return null;
    };

    setRear(equipmentIndex: number, newValue: boolean) {

        if( this.equipmentList[equipmentIndex]) {

            this.equipmentList[equipmentIndex].rear = newValue;
            for( let item of this.criticalAllocationTable ) {
                if( item.obj && item.obj.uuid === this.equipmentList[equipmentIndex].uuid ) {
                    item.rear = newValue;
                    item.obj.rear = newValue;
                }
            }
        }

        this.calc();
        // return this.equipmentList[equipmentIndex].rear;
    };

    updateCriticalAllocationTable() {
        this.criticalAllocationTable = [];

        for( let mechLocation of Object.keys(this.criticals)) {

            // console.log( "xx", this.criticals, mechLocation, this.criticals[mechLocation]);
            if( this.criticals[mechLocation] ) {
                for( let critItemCounter = 0; critItemCounter < this.criticals[mechLocation].length; critItemCounter++) {
                    let currentItem = this.criticals[mechLocation][critItemCounter];
                    if(
                        currentItem &&
                        currentItem.movable
                    ) {
                        let shortLoc = "";
                        if( mechLocation === "head") {
                            shortLoc = "hd";
                        } else if( mechLocation === "centerTorso") {
                            shortLoc = "ct";
                        } else if( mechLocation === "rightTorso") {
                            shortLoc = "rt";
                        } else if( mechLocation === "rightLeg") {
                            shortLoc = "rl";
                        } else if( mechLocation === "rightArm") {
                            shortLoc = "ra";
                        } else if( mechLocation === "leftTorso") {
                            shortLoc = "lt";
                        } else if( mechLocation === "leftLeg") {
                            shortLoc = "ll";
                        } else if( mechLocation === "leftArm") {
                            shortLoc = "la";
                        } else {
                            shortLoc = "un";
                        }
                        currentItem.loc = shortLoc;
                        currentItem.slot = critItemCounter;

                        this.criticalAllocationTable.push(
                            currentItem
                        );
                    }
                }
            }
        }
        // console.log("updateCriticalAllocationTable this.criticalAllocationTable", this.criticalAllocationTable);
        // this.calc();

    };

    moveCritical(
		fromLocation: string,
		fromIndex: number,
		toLocation: string,
        toIndex: number,
	) {

        // console.log(" moveCritical",
        //     fromLocation,
        //     fromIndex,
        //     toLocation,
        //     toIndex,
        // )

        let fromItem: ICriticalSlot | null = null
        let fromLocationObj: ICriticalSlot[] | null = null;
        if( fromLocation === "un") {
            if( this.unallocatedCriticals[fromIndex]) {
                fromItem = this.unallocatedCriticals[fromIndex];

            }
            fromLocationObj = this.unallocatedCriticals;
        } else if( fromLocation === "hd") {
            if( this.criticals.head[fromIndex]) {
                fromItem = this.criticals.head[fromIndex];
                fromLocationObj = this.criticals.head;
            }
        } else if( fromLocation === "ct") {
            if( this.criticals.centerTorso[fromIndex]) {
                fromItem = this.criticals.centerTorso[fromIndex];
                fromLocationObj = this.criticals.centerTorso;
            }
        } else if( fromLocation === "rt") {
            if( this.criticals.rightTorso[fromIndex]) {
                fromItem = this.criticals.rightTorso[fromIndex];
                fromLocationObj = this.criticals.rightTorso;
            }
        } else if( fromLocation === "ra") {
            if( this.criticals.rightArm[fromIndex]) {
                fromItem = this.criticals.rightArm[fromIndex];
                fromLocationObj = this.criticals.rightArm;
            }
        } else if( fromLocation === "rl") {
            if( this.criticals.rightLeg[fromIndex]) {
                fromItem = this.criticals.rightLeg[fromIndex];
                fromLocationObj = this.criticals.rightLeg;
            }
        } else if( fromLocation === "lt") {
            if( this.criticals.leftTorso[fromIndex]) {
                fromItem = this.criticals.leftTorso[fromIndex];
                fromLocationObj = this.criticals.leftTorso;
            }
        } else if( fromLocation === "la") {
            if( this.criticals.leftArm[fromIndex]) {
                fromItem = this.criticals.leftArm[fromIndex];
                fromLocationObj = this.criticals.leftArm;
            }
        } else if( fromLocation === "ll") {
            if( this.criticals.leftLeg[fromIndex]) {
                fromItem = this.criticals.leftLeg[fromIndex];
                fromLocationObj = this.criticals.leftLeg;
            }
        }

        if( fromItem && fromLocationObj) {

            if( toLocation === "hd") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.head, toIndex, toLocation);
            } else if( toLocation === "ct") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.centerTorso, toIndex, toLocation);
            } else if( toLocation === "rt") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.rightTorso, toIndex, toLocation);
            } else if( toLocation === "rl") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.rightLeg, toIndex, toLocation);
            } else if( toLocation === "ra") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.rightArm, toIndex, toLocation);
            } else if( toLocation === "lt") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.leftTorso, toIndex, toLocation);
            } else if( toLocation === "ll") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.leftLeg, toIndex, toLocation);
            } else if( toLocation === "la") {
                return this.moveItemToArea(fromLocationObj, fromItem, fromIndex, this.criticals.leftArm, toIndex, toLocation);
            }
        }

        return false;
    };

    moveItemToArea(
		fromLocation: ICriticalSlot[] | null[],
		fromItem: ICriticalSlot,
		fromIndex: number,
		toLocation: ICriticalSlot[],
        toIndex: number,
        toLocTag: string,
	) {

        // Step One check to see if TO has enough slots for item....
        let placeholder: ICriticalSlot = {
            uuid: fromItem.uuid,
            name: "placeholder",
			placeholder: true,
			tag: "",
			crits: 1,
			rear: false,
			obj: null,
        };

        let hasSpace = true;
        if( toLocation.length < toIndex + fromItem.crits)
            return false;

        for( let testC = 0; testC < fromItem.crits; testC++) {
            if(
                toLocation[toIndex + testC]
                    &&
                fromItem
                    &&
                toLocation[toIndex + testC].uuid !== fromItem.uuid
            ) {
                hasSpace = false;
            }
        }

        if( hasSpace) {

            // Check to see if it's jump jet and make sure that it's going to be assigned to a leg or torso
            let item = fromLocation[fromIndex];

            if( item && item.tag.startsWith("jj-") ) {
                if(
                    (
                        this.mechType.tag === "biped"
                            &&
                        (
                            toLocTag === "ra"
                                ||
                            toLocTag === "la"
                        )
                    )
                        ||
                    toLocTag === "hd"
                ) {
                    return false;
                }
            }
            fromItem.loc = toLocTag;
            fromItem.slot = toIndex;
            toLocation[toIndex] = fromItem;
            for( let phC = 1; phC < toLocation[toIndex].crits; phC++) {
                toLocation[toIndex + phC] = placeholder;
            }

            fromLocation[fromIndex] = null;
			let nextCounter = 1;
			let theItem = fromLocation[fromIndex + nextCounter];
            while (
                theItem &&
                theItem.name === "placeholder" &&
                nextCounter < fromLocation.length
            ) {
                theItem = null;
                nextCounter++;
            }

            // for( let item of this.equipmentList ) {
            //     if( item.uuid === fromItem.uuid ) {
            //         item.location = toLocTag;
            //     }
            // }
            this.updateCriticalAllocationTable();
            return true;

        }

        return false;

    }

    allocateCritical(
		equipmentTag: string,
		equipmentRear: boolean,
		mechLocation: string | null | undefined,
		slotNumber: number| undefined,
		removeFromUnallocated: boolean,
	) {

        if( mechLocation && typeof(slotNumber) !== "undefined" ) {
            for( let uaet_c = 0; uaet_c < this.unallocatedCriticals.length; uaet_c++) {

                if(
                    equipmentTag === this.unallocatedCriticals[uaet_c].tag
                        &&
                    this.unallocatedCriticals[uaet_c].rear === equipmentRear
                ) {
                    if( this.unallocatedCriticals[uaet_c] && this.unallocatedCriticals[uaet_c].obj)
                        this.unallocatedCriticals[uaet_c].obj.location = mechLocation;

                    if( mechLocation === "hd") {
                        this._assignItemToArea(this.criticals.head, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "ct") {
                        this._assignItemToArea(this.criticals.centerTorso, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "rt") {
                        this._assignItemToArea(this.criticals.rightTorso, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "rl") {
                        this._assignItemToArea(this.criticals.rightLeg, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "ra") {
                        this._assignItemToArea(this.criticals.rightArm, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "lt") {
                        this._assignItemToArea(this.criticals.leftTorso, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "ll") {
                        this._assignItemToArea(this.criticals.leftLeg, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    } else if( mechLocation === "la") {
                        this._assignItemToArea(this.criticals.leftArm, this.unallocatedCriticals[uaet_c], this.unallocatedCriticals[uaet_c].crits, slotNumber);
                    }

                    if( removeFromUnallocated) {
                        this.unallocatedCriticals.splice(uaet_c, 1);
                    }

                    return true;
                } else {
                    // console.log("allocaeCrtitical slotNumber undefined", equipmentTag, mechLocation, slotNumber)
                }
            }
        } else {
            // console.log("allocaeCrtitical mechLocation undefined", equipmentTag, mechLocation, slotNumber)
        }
        return null;
    };

    clearArmCriticalAllocationTable() {
        for( let localCount = this.criticalAllocationTable.length; localCount >= 0; localCount--) {
            if(
                (
                    this.criticalAllocationTable[localCount] && this.criticalAllocationTable[localCount].loc === "ra"
                )
                    ||
                (
                    this.criticalAllocationTable[localCount] && this.criticalAllocationTable[localCount].loc === "la"
                )
            ) {
                this.criticalAllocationTable.splice(localCount, 1);
            }
        }
        this.calc();
    }

    clearCriticalAllocationTable() {
        this.criticalAllocationTable = [];

        this.calc();

    }

    setEquipmentLocation(
		equipmentIndex: number,
		location: string,
	) {
        if( this.equipmentList[equipmentIndex]) {
            this.equipmentList[equipmentIndex].location = location;
            return this.equipmentList[equipmentIndex];
        }
        return null;
    };

    setAdditionalHeatSinks(newValue: number) {
        this.additionalHeatSinks = newValue;
        this.calc();
        return this.additionalHeatSinks;
    };

    getUnallocatedCritCount() {
        return this.unallocatedCriticals.length;
    }

    getInstalledEquipment() {
        this._calcVariableEquipment();
        return this.equipmentList;
    };

    _calcVariableEquipment() {
        for( let eqC = 0; eqC < this.equipmentList.length; eqC++) {
            if( this.equipmentList[ eqC ] && this.equipmentList[ eqC ].variableSize ) {

                let currentItem = this.equipmentList[ eqC ];
                //~ console.log( " currentItem",  currentItem);
                if(currentItem.criticalsDivisor) {
					currentItem.criticals = Math.ceil( this.getTonnage() / currentItem.criticalsDivisor );
				}

                if( currentItem.weightDivisor ) {
					currentItem.weight = Math.ceil( this.getTonnage() / currentItem.weightDivisor );
				}

                if( currentItem.damageDivisior ) {
					currentItem.damage = Math.ceil( this.getTonnage() / currentItem.damageDivisior );
				}

                if( currentItem.criticalsDivisor ) {
					currentItem.space.battlemech = Math.ceil( this.getTonnage() / currentItem.criticalsDivisor );
				}

                if( currentItem.battleValuePerItemDamage && currentItem.damage) {
					currentItem.battleValue = currentItem.battleValuePerItemDamage * +currentItem.damage;
				}

                if( currentItem.costPerItemTon ) {
					currentItem.cbills = currentItem.costPerItemTon * currentItem.weight;
				}
                //~ console.log( " currentItem",  currentItem);
            }
        }
    }

    getAvailableEngines(): IEngineType[] {
        let returnValue: IEngineType[] = [];

        let clanOrIS = "is";
        if( this.tech.tag === "clan") {
            clanOrIS = "clan";
        }

        for(let engine of mechEngineTypes ) {
            if( engine.criticals && clanOrIS in engine.criticals ) {
                engine.available = this._itemIsAvailable( engine.introduced, engine.extinct, engine.reintroduced);
                returnValue.push( engine );
            }
        }

        return returnValue;
    }

    getAvailableGyros(): IGyro[] {
        let returnValue: IGyro[] = [];

        for(let gyro of mechGyroTypes ) {
            gyro.available = this._itemIsAvailable( gyro.introduced, gyro.extinct, gyro.reintroduced);

            returnValue.push( gyro );
        }

        return returnValue;
    }

    getAvailableArmorTypes(): IArmorType[] {
        let returnValue: IArmorType[] = [];

        for(let armor of mechArmorTypes ) {
            armor.available = this._itemIsAvailable( armor.introduced, armor.extinct, armor.reintroduced);

            returnValue.push( armor );
        }

        return returnValue;
    }

    private _itemIsAvailable( introduced: number, extinct: number, reintroduced: number): boolean {
        if( introduced <= this.era.yearStart ) {
            if( extinct > 0 && extinct <= this.era.yearEnd ) {
                // item extinct, check to see if it was reintroduced
                if( reintroduced > 0 && reintroduced <= this.era.yearEnd ) {
                    return true;
                }
            } else {
                if( extinct === 0 ) {
                    return true;
                }
            }
        }

        return false;

    }

    allocateArmorClear() {
        this.armorAllocation = {
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
            rightLeg: 0,
        }
    }

    allocateArmorSane() {

        let totalArmor = this.getTotalArmor();
        let internalStructure = this.getInteralStructure();
        let maximumArmor = this.getMaxArmor();
        let percentage = totalArmor / maximumArmor;

        let armArmor = Math.floor(internalStructure.rightArm * 2 * percentage);
        let torsoArmor = Math.floor(internalStructure.rightTorso * 1.75 * percentage);
        let legArmor = Math.floor(internalStructure.rightLeg * 2 * percentage);
        let rearArmor = Math.floor(internalStructure.rightTorso * .25 * percentage);;

        let centerTorsoArmor = Math.floor(internalStructure.centerTorso * 1.75 * percentage);
        let centerTorsoArmorRear = Math.floor(internalStructure.centerTorso * .25 * percentage);

        if( totalArmor > armArmor) {
            let headArmor = armArmor;
            if( headArmor > 9)
                headArmor = 9;
            if( totalArmor >= headArmor) {
               this.setHeadArmor(headArmor);
               totalArmor -= headArmor;
            } else {
                this.setHeadArmor(0);
            }
        }

        if( totalArmor > torsoArmor) {
           this.setRightTorsoArmor( torsoArmor );
           totalArmor -= torsoArmor;
        }

        if( totalArmor > rearArmor) {
           this.setRightTorsoRearArmor( rearArmor );
            totalArmor -= rearArmor;
        }

        if( totalArmor > torsoArmor) {
            this.setLeftTorsoArmor( torsoArmor );
            totalArmor -= torsoArmor;
        }
        if( totalArmor > rearArmor) {
            this.setLeftTorsoRearArmor( rearArmor );
           totalArmor -= rearArmor;
        }

        if( totalArmor > legArmor) {
            this.setRightLegArmor( legArmor );
            totalArmor -= legArmor;
        }

        if( totalArmor > legArmor) {
           this.setLeftLegArmor( legArmor );
           totalArmor -= legArmor;
        }

        if( totalArmor > armArmor) {
            this.setRightArmArmor( armArmor );
           totalArmor -= armArmor;
        }
        if( totalArmor > armArmor) {
           this.setLeftArmArmor( armArmor );
           totalArmor -= armArmor;
        }

        if( totalArmor > rearArmor) {
           this.setCenterTorsoRearArmor( centerTorsoArmorRear );
           totalArmor -= rearArmor;
        }

        this.setCenterTorsoArmor( centerTorsoArmor ); // everything else goes to center torso! :)

        // this.armorAllocation = {
        //     head: 0,
        //     centerTorso: 0,
        //     rightTorso: 0,
        //     leftTorso: 0,
        //     centerTorsoRear: 0,
        //     rightTorsoRear: 0,
        //     leftTorsoRear: 0,
        //     leftArm: 0,
        //     rightArm: 0,
        //     leftLeg: 0,
        //     rightLeg: 0,
        // }
    }

    allocateArmorMax() {
        this.armorAllocation = {
            head: 9,
            centerTorso: Math.ceil(this.getInteralStructure().centerTorso * 5/3),
            rightTorso: Math.ceil(this.getInteralStructure().rightTorso * 5/3),
            leftTorso: Math.ceil(this.getInteralStructure().leftTorso * 5/3),
            centerTorsoRear: Math.floor(this.getInteralStructure().centerTorso * 1/3),
            rightTorsoRear: Math.floor(this.getInteralStructure().rightTorso * 1/3),
            leftTorsoRear: Math.floor(this.getInteralStructure().leftTorso * 1/3),
            leftArm: this.getInteralStructure().leftArm * 2,
            rightArm: this.getInteralStructure().rightArm * 2,
            leftLeg: this.getInteralStructure().leftLeg * 2,
            rightLeg: this.getInteralStructure().rightLeg * 2,
        }
    }

    getMaxCenterTorsoRearArmor(): number {
        return this.getInteralStructure().centerTorso * 2 - this.getArmorAllocation().centerTorso;
    }
    getMaxCenterTorsoArmor(): number {
        return this.getInteralStructure().centerTorso * 2 - this.getArmorAllocation().centerTorsoRear;
    }

    getMaxRightTorsoRearArmor(): number {
        return this.getInteralStructure().rightTorso * 2 - this.getArmorAllocation().rightTorso;
    }
    getMaxRightTorsoArmor(): number {
        return this.getInteralStructure().rightTorso * 2 - this.getArmorAllocation().rightTorsoRear;
    }

    getMaxLeftTorsoRearArmor(): number {
        return this.getInteralStructure().leftTorso * 2 - this.getArmorAllocation().leftTorso;
    }
    getMaxLeftTorsoArmor(): number {
        return this.getInteralStructure().leftTorso * 2 - this.getArmorAllocation().leftTorsoRear;
    }

    getAvailableEquipment(): IEquipmentItem[] {
        let returnItems: IEquipmentItem[] = [];
        if( this.getTech().tag === "clan" ) {
            for( let item of mechClanEquipment ) {
                item.criticals = item.space.battlemech;
                item.available = this._itemIsAvailable( item.introduced, item.extinct, item.reintroduced);
                returnItems.push( item );
            }
        } else {
            for( let item of mechISEquipment ) {
                item.criticals = item.space.battlemech;
                item.available = this._itemIsAvailable( item.introduced, item.extinct, item.reintroduced);
                returnItems.push( item );
            }
        }

        returnItems.sort( ( a, b ) => {
            if( a.sort > b.sort ) {
                return 1;
            } if( a.sort < b.sort ) {
                return -1;
            } else {
                return 0;
            }
        })

        return returnItems;
    }

    sortInstalledEquipment() {
        this.equipmentList.sort( ( a, b ) => {
            if( a.sort > b.sort ) {
                return 1;
            } if( a.sort < b.sort ) {
                return -1;
            } else {
                return 0;
            }
        })
    }
}

function sortByBVThenRearThenHeat(  a: IEquipmentItem, b: IEquipmentItem  ) {
    if( a.rear )
        a.rear = true;
    else
        a.rear = false;

    if( b.rear )
        b.rear = true;
    else
        b.rear = false;

    if(  a.battleValue && b.battleValue && a.battleValue < b.battleValue )
        return 1;
    if(  a.battleValue && b.battleValue && a.battleValue > b.battleValue )
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

function sortByLocationThenName( a: IEquipmentItem, b: IEquipmentItem ) {
    if( a.location && b.location && a.location > b.location )
        return 1;
    if( a.location && b.location && a.location < b.location )
        return -1;
    if( a.name > b.name )
        return 1;
    if( a.name < b.name )
        return -1;
    return 0;
}