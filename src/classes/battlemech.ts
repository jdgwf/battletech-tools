import { battlemechLocations } from "../data/battlemech-locations";
import { IArmorType, ICriticalLocations, IEngineOption, IEngineType, IEquipmentItem, IGyro, IHeatSync, ISplitLocation } from "../data/data-interfaces";
import { btEraOptions } from "../data/era-options";
import { mechArmorTypes } from "../data/mech-armor-types";
import { mechClanEquipmentEnergy } from "../data/mech-clan-equipment-weapons-energy";
import { mechEngineOptions } from "../data/mech-engine-options";
import { mechEngineTypes } from "../data/mech-engine-types";
import { mechGyroTypes } from "../data/mech-gyro-types";
import { mechHeatSinkTypes } from "../data/mech-heat-sink-types";
import { mechInternalStructureTypes } from "../data/mech-internal-structure-types";
import { mechJumpJetTypes } from "../data/mech-jump-jet-types";
import { mechTypeOptions } from "../data/mech-type-options";
import { btTechOptions } from "../data/tech-options";
import { getHexDistanceFromModifier, getISEquipmentList, getMovementModifier } from "../utils";
import { addCommas } from "../utils/addCommas";
import { adjustAlphaStrikeDamage, calculateAlphaStrikeValue, IAlphaStrikeExport } from "../utils/calculateAlphaStrikeValue";
import { generateUUID } from "../utils/generateUUID";
import { ISSWBasicInfo } from "../utils/getSSWXMLBasicInfo";
import { AlphaStrikeUnit, IAlphaStrikeDamage, IASMULUnit } from "./alpha-strike-unit";
import Pilot, { IPilot } from "./pilot";
const { XMLParser } = require( "fast-xml-parser" );

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

    size?: number;

    loc?: string;
    slot?: number;

    damaged?: boolean;
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

export interface ICriticalHits {
    head: boolean[];
    centerTorso: boolean[];
    rightTorso: boolean[];
    leftTorso: boolean[];
    leftArm: boolean[];
    rightArm: boolean[];
    leftLeg: boolean[];
    rightLeg: boolean[];
}


interface IBMEquipmentExport {
    tag: string;
    loc: string | undefined;
    allocationIndex: number;
    allocationLocation: string;
    rear: boolean | undefined;
    uuid: string | undefined;
    weight: number | undefined;
    // in play variables
    target?: string | undefined;
    resolved?: boolean | undefined;
    damageClusterHits?: IClusterHit[] | undefined;
    split_location?: ISplitLocation[] | undefined;
    currentAmmo?: number | undefined;
    selectedAmmoBinUUID?: string | undefined;
}
export interface IBattleMechExport {

    // in play variables

    selectedMech?: boolean;
    currentMovementMode?: string;
    currentToHitMovementModifier?: number;
    currentTargetModifier?: number;
    currentTargetJumpingMP?: number;
    targetAToHit?: ITargetToHit | null;
    targetBToHit?: ITargetToHit | null;
    targetCToHit?: ITargetToHit | null;
    currentHeat?: number;
    structureBubbles?: IMechDamageAllocation | null;
    armorBubbles?: IMechDamageAllocation | null;
    damageLog?: IMechDamageLog[];
    criticalDamage?: Record<string, number[]>;
    pilot?: IPilot,
    as_custom_nickname?: string;



    // basic properties
    omnimech: boolean;
    additionalHeatSinks: number;
    allocation: ICriticalSlot[],
    armor_allocation: IArmorAllocation,
    armor_type: string;
    armor_weight: number;
    as_role: string;
    as_value: number;   // for easy listing
    battle_value: number;     // for easy listing
    c_bills: string;  // for easy listing
    engineType: string;
    equipment: IBMEquipmentExport[],
    era: string;
    features: string[],
    gyro: string;
    heat_sink_type: string;
    hideNonAvailableEquipment: boolean;
    introductoryRules?: boolean;
    is_type: string;
    jumpSpeed: number;
    lastUpdated: Date;
    location?: string;
    mechType: string;
    mirrorArmorAllocations: boolean;
    model: string;
    name: string;
    nickname: string;
    strictEra: boolean;
    tech: string;
    tech_label: string;  // for easy listing
    tonnage: number;
    uuid: string;
    walkSpeed: number;
}


export interface ITargetToHit {
    name: string;
    active: boolean;
    range: number;
    movement: number;
    otherMods: number;
    jumped: boolean;
    primary: boolean;
    inRearArc: boolean;
}

export interface IGATOR {
    weaponName?: string;
    targetName?: string;
    targetObj?: ITargetToHit | null;
    explanation?: string;
    target?: string;
    rangeExplanation?: string;
    otherModifiersExplanation?: string;

    gunnerySkill: number;
    attackerMovementModifier: number;
    targetMovementModifier: number;
    otherModifiers: number;
    rangeModifier: number;
    finalToHit: number;
}

export class BattleMech {

    private _targetAToHit: ITargetToHit = {
        name: "",
        active: false,
        range: 0,
        movement: 0,
        otherMods: 0,
        jumped: false,
        primary: true,
        inRearArc: false,
    };
    private _targetBToHit: ITargetToHit = {
        name: "",
        active: false,
        range: 0,
        movement: 0,
        otherMods: 0,
        jumped: false,
        primary: false,
        inRearArc: false,
    };
    private _targetCToHit: ITargetToHit = {
        name: "",
        active: false,
        range: 0,
        movement: 0,
        otherMods: 0,
        jumped: false,
        primary: false,
        inRearArc: false,
    };

    private _sswImportErrors: string[] = [];

    private _introductoryRules: boolean = false;

    public basicSSWInfo: ISSWBasicInfo | null = null;

    // in play variables
    public selectedMech: boolean = false;

    public currentMovementMode: string = "n";
    public currentToHitMovementModifier: number = 0;
    public currentTargetModifier: number = 0;
    public currentTargetJumpingMP: number = 0;
    public currentHeat: number = 0;
    public damageLog: IMechDamageLog[] = [];
    public criticalDamage: Record<string, number[]> = {};
    // public criticalHitRollLocations: ICriticalHits = this._normalizeCriticalHits();

    // basic properties
    private _nickname = "";
    private _lastUpdated: Date = new Date();
    private _uuid: string = generateUUID();

    private _mechType = mechTypeOptions[0];
    private _tech = btTechOptions[0];
    private _era = btEraOptions[1]; // Default to Succession Wars
    private _model: string = "";
    private _name: string = "";
    private _tonnage = 20;
    private _hideNonAvailableEquipment: boolean = true;
    private _currentTonnage = 0;

    private _mirrorArmorAllocations: boolean = true;

    private _armorType = mechArmorTypes[0];

    private _maxArmor: number = 0;

    private _selectedInternalStructure = mechInternalStructureTypes[0];

    private _hasTripleStrengthMyomer: boolean = false;
    private _omnimech: boolean = false;
    private _remainingTonnage: number = 0;

    private _internalStructure = {
        head: 0,
        centerTorso: 0,
        rightTorso: 0,
        leftTorso: 0,
        leftArm: 0,
        rightArm: 0,
        leftLeg: 0,
        rightLeg: 0
    };

    private _armorBubbles: IMechDamageAllocation = {
        head: [],
        centerTorso: [],
        rightTorso: [],
        leftTorso: [],
        leftArm: [],
        rightArm: [],
        leftLeg: [],
        rightLeg: [],

        rightTorsoRear: [],
        leftTorsoRear: [],
        centerTorsoRear: [],
    }
    private _structureBubbles: IMechDamageAllocation = {
        head: [],
        centerTorso: [],
        rightTorso: [],
        leftTorso: [],
        leftArm: [],
        rightArm: [],
        leftLeg: [],
        rightLeg: [],

        // unused for IS
        rightTorsoRear: [],
        leftTorsoRear: [],
        centerTorsoRear: [],
    }

    private _no_right_arm_hand_actuator: boolean = false;
    private _no_right_arm_lower_actuator: boolean = false;

    private _no_left_arm_hand_actuator: boolean = false;
    private _no_left_arm_lower_actuator: boolean = false;

    private _smallCockpit: boolean = false;
    private _cockpitWeight: number = 3;

    private _totalInternalStructurePoints = 0;

    private _maxMoveHeat: number = 2;
    private _maxWeaponHeat: number = 0;
    private _heatDissipation: number = 0;

    private _additionalHeatSinks: number = 0;

    private _armorWeight: number = 0;
    private _totalArmor: number = 0;
    private _unallocatedArmor: number = 0;

    private _armorAllocation: IArmorAllocation = {
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

    private _equipmentList: IEquipmentItem[] = [];
    private _sortedEquipmentList: IEquipmentItem[] = [];
    // private _sortedSeparatedEquipmentList: IEquipmentItem[] = [];

    private _criticalAllocationTable: ICriticalSlot[] = [];

    private _weights: IWeights[] = [];

    private _strictEra: boolean = true;

    private _unallocatedCriticals: ICriticalSlot[] = [];

    private _criticals: IMechCriticals = {
        head: [],
        centerTorso: [],
        rightTorso: [],
        leftTorso: [],
        leftArm: [],
        rightArm: [],
        leftLeg: [],
        rightLeg: [],
    };

    private _gyro = mechGyroTypes[0];

    private _engine: IEngineOption | null = null;
    private _engineType = mechEngineTypes[0];
    private _jumpJetType = mechJumpJetTypes[0];

    private _walkSpeed = 0;
    private _runSpeed = 0;
    private _jumpSpeed = 0;

    private _heatSinkCriticals = {
        slotsEach: 1,
        number: 0,
    };

    private _heatSinkType: IHeatSync = mechHeatSinkTypes[0];

    private _cbillCost = "0";
    private _cbillCostWithAmmo = "0";
    private _battleValue = 0;
    private _pilotAdjustedBattleValue = 0;
    private _alphaStrikeValue = 0;

    private _calcLogBV = "";
    private _calcLogAS = "";
    private _calcLogCBill = "";

    private _validJJLocations = [{
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

    private _pilot: Pilot = new Pilot( {
        name: "",
        piloting: 5,
        gunnery: 4,
        wounds: 0,
        alphaStrikeAbilities: [],
    });

    private _alphaStrikeForceStats: IAlphaStrikeExport = {
        mechCreatorUUID: "",
        name: "",
        move: 0,
        type: "BM",
        customName: "",
        role: "Brawler",
        jumpMove: 0,
        pv: 0,
        damage: {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0,
        },
        armor: 0,
        structure: 0,
        size: 0,
        skill: 4,
        overheat: 0,
        notes: "",
        tmm: 0,
        sizeClass: 0,
        sizeClassName: "",
        ov: 0,
        specialUnitAbilities: [],
        longHeat: 0,
        longOverheat: 0,
        abilityCodes: [],
    }

    constructor(importJSON: string = "" ) {
        if( importJSON ) {
            this.importJSON( importJSON );
        } else {
            this.setTonnage( 20 );
        }
        this._calc();

    }

    public reset() {
        this.setTonnage(20);
        this.setWalkSpeed(0);
        this.setWalkSpeed(0);
        this._equipmentList = [];
        this._sortedEquipmentList = [];
        this.setArmorWeight(0)
        this.setArmorType( "standard" );
        this.setASCustomName( "" )
        this.setASRole( "" )
        this.setMechType( "biped" );
        this.setAdditionalHeatSinks(0);
        this.setEngine(0);
        this.setGyroType( "standard" );
        if( this._tech.tag === "is" )
            this.setHeatSinksType( "single" )
        else
            this.setHeatSinksType( "double" )

        this.setInternalStructureType( "standard" );

        this._criticalAllocationTable = [];

        this._calc();

    }


    public newUUID() {
        this._uuid = generateUUID();
    }

    public setTargets(
        a: ITargetToHit,
        b: ITargetToHit,
        c: ITargetToHit,
    ) {
        this._targetAToHit = a;
        this._targetBToHit = b;
        this._targetCToHit = c;
    }

    public getMovementToHitModifier(): number {
        if( this.currentMovementMode === "j" ) {
            return this.currentToHitMovementModifier + 1;
        }
        return this.currentToHitMovementModifier;
    }

    public setMechType(typeTag: string) {
        for( let lcounter = 0; lcounter < mechTypeOptions.length; lcounter++) {
            if( typeTag === mechTypeOptions[lcounter].tag) {
                this._mechType = mechTypeOptions[lcounter];
                this.setTonnage( this._tonnage );
                this._calc();
                return this._mechType;
            }
        }

        this._mechType = mechTypeOptions[0];
        this.setTonnage( this._tonnage );
        this._calc();
        return this._mechType;
    }

    public getGATOR(): IGATOR {
        let rv: IGATOR = {
            gunnerySkill: 0,
            attackerMovementModifier: 0,
            targetMovementModifier: 0,
            otherModifiers: 0,
            rangeModifier: 0,
            finalToHit: 0,
        };

        if( this._pilot ) {
            rv.gunnerySkill = this._pilot.gunnery;
        }

        return rv;
    }


    public hasCASE(
        loc: string
    ): boolean {
        for( let crit of this._criticalAllocationTable ) {
            if( crit.loc === loc ) {
                if( crit.tag === "case" ) {
                    return true;
                }
            }
        }
        return false;
    }

    private _calcBattleValue() {

        let hasCamo = false;
        let hasBasicStealth = false;
        let hasPrototypeStealth = false;
        let hasStandardStealth = false;
        let hasImprovedStealth = false;
        let hasMimetic = false;

        this._battleValue = 0;
        this._calcLogBV = "";

        /* ***************************************************
         *  STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302
         * ************************************************ */
        let defensiveBattleRating = 0;
        this._calcLogBV += "<strong>STEP 1: CALCULATE DEFENSIVE BATTLE RATING - TM p302</strong><br />";
        let totalArmorFactor = 2.5 * this.getTotalArmor();
        this._calcLogBV += "Total Armor Factor = Armor Factor x 2.5: " + totalArmorFactor + " = 2.5 x " + this.getTotalArmor() + "<br />";

        // Get Armor Rating
        switch (this._armorType.tag) {
            case "commercial":
                this._calcLogBV += "Total Armor Factor = 0.5 * Total Armor Factor Modifier for Commercial Armor: " + totalArmorFactor + " x 0.5 = " + (totalArmorFactor * .5) + "<br />";
                totalArmorFactor = totalArmorFactor * 0.5;
                break;
            default:
                this._calcLogBV += "Total Armor Factor = 1.0 * Total Armor Factor Modifier for Non-Commercial Armor:  " + totalArmorFactor + " x 1 = " + (totalArmorFactor * 1) + "<br />";
                break;
        }

        // Get for Internal Structure Rating
        let totalInternalStructurePoints = 1.5 * this._totalInternalStructurePoints;
        this._calcLogBV += "Total Internal Structure Points = Internal Structure Points x 1.5: " + totalInternalStructurePoints + " = 1.5 x " + this._totalInternalStructurePoints + "<br />";

        // Adjust IS for Type
        switch (this.getInternalStructureType()) {
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
        switch (this._engineType.tag ) {
            case "light":
                this._calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Light Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
                totalInternalStructurePoints = totalInternalStructurePoints * .75;
                break;
            case "xl":
                // Inner Sphere XL
                this._calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Inner Sphere XL Engine: " + totalInternalStructurePoints + " x 0.75 = " + (totalInternalStructurePoints * .75) + "<br />";
                totalInternalStructurePoints = totalInternalStructurePoints * .75;
                break;

            case "clan-xl":
                // Clan XL
                this._calcLogBV += "Total Internal Structure = 0.75 x I.S. BV for Clan XL Engine: " + totalInternalStructurePoints + " x 0.5 = " + (totalInternalStructurePoints * .5) + "<br />";
                totalInternalStructurePoints = totalInternalStructurePoints * .75;
                break;
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
        let totalGyroPoints = 0;
        switch (this.getInternalStructureType()) {
            case "compact":
                this._calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Compact Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
                totalGyroPoints = this.getTonnage() * 0.5;
                break;
            case "xl":
                this._calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Extra Light Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
                totalGyroPoints = this.getTonnage() * 0.5;
                break;
            case "heavy-duty":
                this._calcLogBV += "Total Gyro BV = 1 x Tonnage for Heavy Duty Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
                totalGyroPoints = this.getTonnage() * 1;
                break;
            default:
                this._calcLogBV += "Total Gyro BV = 0.5 x Tonnage for Standard Gyro: " + this.getTonnage() + " x 0.5 = " + (this.getTonnage() * .5) + "<br />";
                totalGyroPoints = this.getTonnage() * 0.5;
                break;
        }

        // Get Explosive Ammo Modifiers - Tech Manual p302-303
        let explosiveAmmoModifiers = 0;
        this._calcLogBV += "<strong>Get Explosive Ammo Modifiers (TM p302-303)</strong><br />";

        // let caseEnabled_HD = false;
        // let caseEnabled_CT = false;
        let caseEnabled_RL = false;
        let caseEnabled_LL = false;
        let caseEnabled_RA = false;
        let caseEnabled_LA = false;
        let caseEnabled_RT = false;
        let caseEnabled_LT = false;

        // for( let lCrit = 0; lCrit < this._criticals.head.length; lCrit++) {
        //     if( this._criticals.head[lCrit] && this._criticals.head[lCrit].tag === "case" ) {
        //         caseEnabled_HD = true;
        //     }
        // }

        // for( let lCrit = 0; lCrit < this._criticals.centerTorso.length; lCrit++) {
        //     if( this._criticals.centerTorso[lCrit] && this._criticals.centerTorso[lCrit].tag === "case" ) {
        //         caseEnabled_CT = true;
        //     }
        // }

        for( let lCrit = 0; lCrit < this._criticals.rightLeg.length; lCrit++) {
            let item = this._criticals.rightLeg[lCrit];
            if( item && item.tag === "case" ) {
                caseEnabled_RL = true;
            }
        }

        for( let lCrit = 0; lCrit < this._criticals.leftLeg.length; lCrit++) {
            let item = this._criticals.leftLeg[lCrit];
            if( item && item.tag === "case" ) {
                caseEnabled_LL = true;
            }
        }

        for( let lCrit = 0; lCrit < this._criticals.rightArm.length; lCrit++) {
            let item = this._criticals.rightArm[lCrit];
            if( item && item.tag === "case" ) {
                caseEnabled_RA = true;
            }
        }

        for( let lCrit = 0; lCrit < this._criticals.leftArm.length; lCrit++) {
            let item = this._criticals.leftArm[lCrit];
            if( item && item.tag === "case" ) {
                caseEnabled_LA = true;
            }
        }

        for( let lCrit = 0; lCrit < this._criticals.rightTorso.length; lCrit++) {
            let item = this._criticals.rightTorso[lCrit];
            if( item && item.tag === "case" ) {
                caseEnabled_RT = true;
            }
        }

        for( let lCrit = 0; lCrit < this._criticals.leftTorso.length; lCrit++) {
            let item = this._criticals.leftTorso[lCrit];
            if( item && item.tag === "case" ) {
                caseEnabled_LT = true;
            }
        }

        if( this._tech.tag === "clan" ) {

            //Clan is Assumed to have CASE in BV Calculation (TM p303)

            // check head
            for( let lCrit = 0; lCrit < this._criticals.head.length; lCrit++) {
                let item = this._criticals.head[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Head (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Head (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check ct
            for( let lCrit = 0; lCrit < this._criticals.centerTorso.length; lCrit++) {
                let item = this._criticals.centerTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Center Torso (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Center Torso (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check lt
            for( let lCrit = 0; lCrit < this._criticals.leftTorso.length; lCrit++) {

                if( this.hasXLEngine() ) {
                    let item = this._criticals.leftTorso[lCrit];
                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Left Torso (Clan,-15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Left Torso (Clan, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

            // check rt
            for( let lCrit = 0; lCrit < this._criticals.rightTorso.length; lCrit++) {
                if( this.hasXLEngine() ) {
                    let item = this._criticals.rightTorso[lCrit];
                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Right Torso (Clan,-15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Center Right (Clan, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

            // check rl
            for( let lCrit = 0; lCrit < this._criticals.rightLeg.length; lCrit++) {
                let item = this._criticals.leftLeg[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Right Leg (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Right Leg (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }
            }

            // check ll
            for( let lCrit = 0; lCrit < this._criticals.leftLeg.length; lCrit++) {
                let item = this._criticals.leftLeg[lCrit];
                if(  item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Left Leg (Clan, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Left Leg (Clan, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }
            }

        } else if( this._tech.tag === "is" ) {
            // check head
            for( let lCrit = 0; lCrit < this._criticals.head.length; lCrit++) {
                let item = this._criticals.head[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Head (Inner Sphere,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }

            }

            // check ct
            for( let lCrit = 0; lCrit < this._criticals.centerTorso.length; lCrit++) {
                let item = this._criticals.centerTorso[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Center Torso (Inner Sphere,-15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Center Torso (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

            }

            // check lt
            for( let lCrit = 0; lCrit < this._criticals.leftTorso.length; lCrit++) {
                if( !this.hasCASE("lt") || this.hasXLEngine()) {
                    let item = this._criticals.leftTorso[lCrit];

                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Left Torso (Inner Sphere,-15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Left Torso (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

            // check rt

            for( let lCrit = 0; lCrit < this._criticals.rightTorso.length; lCrit++) {
                // if( this.hasXLEngine() ) {
                if( !this.hasCASE("rt")  || this.hasXLEngine() ) {
                    let item = this._criticals.rightTorso[lCrit];
                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Right Torso (Inner Sphere,-15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Center Right (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
                // }

            }

            // check rl
            for( let lCrit = 0; lCrit < this._criticals.rightLeg.length; lCrit++) {
                let item = this._criticals.rightLeg[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Right Leg (Inner Sphere, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Right Leg (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

                if( caseEnabled_RT === false && caseEnabled_RL === false) {
                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Right Leg, Right Torso and Right Leg to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

            // check ll
            for( let lCrit = 0; lCrit < this._criticals.leftLeg.length; lCrit++) {
                let item = this._criticals.leftLeg[lCrit];
                if( item && item.obj && item.obj.explosive) {
                    this._calcLogBV += "Explosive Ammo Crit in Left Leg (Inner Sphere, -15)<br />";
                    explosiveAmmoModifiers += 15;
                }
                if( item && item.obj && item.obj.gauss) {
                    this._calcLogBV += "Gauss Crit in Left Leg (Inner Sphere, -1)<br />";
                    explosiveAmmoModifiers += 1;
                }

                if( caseEnabled_LT === false && caseEnabled_LL === false) {
                    let item = this._criticals.rightLeg[lCrit];

                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Left Leg, Left Torso and Left Leg to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }

            }

            // check RA
            for( let lCrit = 0; lCrit < this._criticals.rightArm.length; lCrit++) {

                if( caseEnabled_RT === false && caseEnabled_RA === false) {
                    let item = this._criticals.rightArm[lCrit];

                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Right Arm, Right Torso and Right Arm to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }

            }

            // check LA
            for( let lCrit = 0; lCrit < this._criticals.leftArm.length; lCrit++) {

                if( caseEnabled_LT === false && caseEnabled_LA === false) {
                    let item = this._criticals.leftArm[lCrit];
                    if( item && item.obj && item.obj.explosive) {
                        this._calcLogBV += "Explosive Ammo Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -15)<br />";
                        explosiveAmmoModifiers += 15;
                    }
                    if( item && item.obj && item.obj.gauss) {
                        this._calcLogBV += "Gauss Crit in Left Arm, Left Torso and Left Arm to not have CASE (Inner Sphere, -1)<br />";
                        explosiveAmmoModifiers += 1;
                    }
                }
            }

        }

        defensiveBattleRating = totalArmorFactor + totalInternalStructurePoints + totalGyroPoints - explosiveAmmoModifiers;
        this._calcLogBV += "Defensive battle rating = " + defensiveBattleRating + " ( " + totalArmorFactor +  + totalInternalStructurePoints + " +  " + totalGyroPoints + " -  " + explosiveAmmoModifiers + "<br />";

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

        this._calcLogBV += "Best TMM: " + moveModifier + "<br />";

        let defensiveFactorModifier = 1 + moveModifier / 10;
        if( defensiveFactorModifier < 1)
            defensiveFactorModifier = 1;

        this._calcLogBV += "Defensive Factor (defensiveFactorModifier = 1 + TMM / 10): " + defensiveFactorModifier + " = 1 + " + moveModifier + " / 10<br />";

        // TODO for equipment.... add camo, stealth, etc when it's available
        this._calcLogBV += "<strong> Defensive Factor Modifiers for equipment</strong>.... add camo, stealth, etc when tech is available<br />";

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

        this._calcLogBV += "Defensive battle rating = Defensive battle rating * Target Modifier Rating : " + (defensiveBattleRating * defensiveFactorModifier).toFixed(2) + " = " + defensiveBattleRating + " x " + defensiveFactorModifier + "<br />";

        defensiveBattleRating = defensiveBattleRating * defensiveFactorModifier;

        this._calcLogBV += "<strong>Final defensive battle rating</strong>: " + defensiveBattleRating.toFixed(2) + "<br />";

        /* ***************************************************
         *  STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303
         * ************************************************ */
        let offensiveBattleRating = 0;
        this._calcLogBV += "<strong>STEP 2: CALCULATE OFFENSIVE BATTLE RATING - TM p303</strong><br />";

        // TODO
        this._calcLogBV += "<strong>Calculate Each Weapon’s Modified BV</strong><br />";

        let ammoBV: INumericalHash = {};
        let weaponBV: INumericalHash = {};

        let totalAmmoBV = 0;

        // Add up all the BV Sums, put each in an array for comparison
        for( let eqC = 0; eqC < this._equipmentList.length; eqC++) {
            let currentItem = this._equipmentList[eqC];
            if( currentItem.tag.indexOf( "ammo-" ) > -1) {
                if( !ammoBV[currentItem.tag])
                    ammoBV[currentItem.tag] = 0;
                if( currentItem.battleValue)
                    ammoBV[currentItem.tag] += currentItem.battleValue * currentItem.weight;

                this._calcLogBV += "+ Adding " + currentItem.name + " - "  + currentItem.location + " - " + ((currentItem.battleValue ? currentItem.battleValue : 0) * currentItem.weight) + "<br />";

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
                    this._calcLogBV += "<strong>Excessive Ammo Rule</strong> setting " + ammoKey + " value to " + weaponBV[ammoKey] + " from " + simplifiedAmmoBV[ammoKey] + "<br />";

                    simplifiedAmmoBV[ammoKey] = weaponBV[ammoKey];
                }
                totalAmmoBV += simplifiedAmmoBV[ammoKey];
            }
        }

        // console.log( "ammoBV", ammoBV );
        // console.log( "simplifiedAmmoBV", simplifiedAmmoBV );
        // console.log( "weaponBV", weaponBV );

        // console.log( "totalWeaponBV", totalWeaponBV );
        // console.log( "totalAmmoBV", totalAmmoBV );

        this._calcLogBV += "<strong>Total Ammo BV</strong> " + totalAmmoBV + "<br />";

        // console.log( "this.getHeatSinksType()", this.getHeatSinksType() );
        let mechHeatEfficiency = 0;
        if( this.getHeatSinksType() === "single" ) {
            mechHeatEfficiency = 6 + this.getHeatSinks() - this.getMaxMovementHeat();
            this._calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() + " - " + this.getMaxMovementHeat() + " )<br />";

        } else if( this.getHeatSinksType() === "double" ) {
            mechHeatEfficiency = 6 + this.getHeatSinks() * 2 - this.getMaxMovementHeat();
            this._calcLogBV += "<strong>Heat Efficiency</strong> " + mechHeatEfficiency + " (6 + " + this.getHeatSinks() * 2 + " - " + this.getMaxMovementHeat() + " )<br />";
        }

        this._calcLogBV += "<strong>Total Weapon Heat</strong> ";
        let totalWeaponHeat = 0;



        this._equipmentList.sort( (a, b) => sortByAdjustedBVThenHeat( a, b, this ) );

        for( let eqC = 0; eqC < this._equipmentList.length; eqC++) {
            let currentItem = this._equipmentList[eqC];

            currentItem.bvHeat = currentItem.heat;

            if( currentItem.tag.indexOf( "ammo-" ) === -1) {
                if( !weaponBV[currentItem.tag])
                    weaponBV[currentItem.tag] = 0;
                if( currentItem.battleValue)
                    weaponBV[currentItem.tag] = currentItem.battleValue;

                this._calcLogBV += this._equipmentList[eqC].heat + " + ";

                // TODO modify per weapon type
                // one shot this._equipmentList[ eqC ].bvHeat = this._equipmentList[ eqC ].bvHeat / 4

                if( this._equipmentList[eqC].isOneShot ) {
                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    this._equipmentList[ eqC ].bvHeat = this._equipmentList[ eqC ].bvHeat / 4;
                }
                if( this._equipmentList[eqC].isUltra ) {
                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    this._equipmentList[ eqC ].bvHeat = this._equipmentList[ eqC ].bvHeat * 2;
                }
                if( this._equipmentList[eqC].isStreak ) {
                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    this._equipmentList[ eqC ].bvHeat = this._equipmentList[ eqC ].bvHeat / 2;
                }
                if( this._equipmentList[eqC].isRotary ) {
                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    this._equipmentList[ eqC ].bvHeat = this._equipmentList[ eqC ].bvHeat * 6;
                }

                // set above, never undefined, thanks TS
                //@ts-ignore
                totalWeaponHeat += this._equipmentList[eqC].bvHeat;

            }
        }

        if( this._calcLogBV.substring(0, this._calcLogBV.length - 3) === " + " ) {
            this._calcLogBV = this._calcLogBV.substring(0, this._calcLogBV.length - 3)
        }

        this._calcLogBV += " = " + totalWeaponHeat;

        this._calcLogBV += "<br />";

        let runningTotal = 0;
        let runningHeat = 0;
        if( totalWeaponHeat >= mechHeatEfficiency) {
            // Mech is heat inefficient, now we need to go through steps 4-7 on TM pp 303-304

            let inHalfCost = false;

            for( let weaponC = 0; weaponC < this._equipmentList.length; weaponC++) {
                if( this._equipmentList[weaponC].tag.indexOf( "ammo-" ) === -1) {

                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    if( inHalfCost === true && this._equipmentList[weaponC].bvHeat > 0) {
                        // half efficiency
                        let currentItem = this._equipmentList[weaponC];
                        if( currentItem && currentItem.rear ) {
                            if( this.getTotalBVFrontWeapons() < this.getTotalBVRearWeapons() || this.isNotOnTorsoHeadOrLegs(currentItem.location)  ) {

                                if( currentItem.battleValue) {
                                    this._calcLogBV += "+ Adding Heat Inefficient Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + currentItem.battleValue + " / 4 = " + (currentItem.battleValue / 4);
                                    runningTotal += currentItem.battleValue / 2;
                                }
                            } else {
                                if( this.getTotalBVFrontWeapons() < this.getTotalBVRearWeapons() || this.isNotOnTorsoHeadOrLegs(currentItem.location)  ) {
                                    if( currentItem.battleValue) {
                                        this._calcLogBV += "+ Adding Heat Inefficient Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + currentItem.battleValue + " / 4 = " + (currentItem.battleValue / 4);
                                        runningTotal += currentItem.battleValue / 2;
                                    }
                                } else {
                                    if( currentItem.battleValue) {
                                        this._calcLogBV += "+ Adding Heat Inefficient Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + currentItem.battleValue + " / 4 = " + (currentItem.battleValue / 4);
                                        runningTotal += currentItem.battleValue / 4;
                                    }
                                }
                            }
                        } else {
                            if( currentItem.battleValue ) {
                                this._calcLogBV += "+ Adding Heat Inefficient Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + currentItem.battleValue + " / 2 = " + (currentItem.battleValue / 2);
                                runningTotal += currentItem.battleValue / 2;
                            }
                        }
                    } else {
                        // normal efficiency

                        // console.log(  this._equipmentList[weaponC] );
                        let currentItem = this._equipmentList[weaponC];
                        if( currentItem.rear ) {
                            if( currentItem.battleValue) {
                                if( this.getTotalBVFrontWeapons() < this.getTotalBVRearWeapons() || this.isNotOnTorsoHeadOrLegs(currentItem.location)  ) {
                                    this._calcLogBV += "+ Adding Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  -  bv " + (currentItem.battleValue  ) + " (not halved due to less front weapons bv), heat " + currentItem.bvHeat + "<br />";
                                    runningTotal += (currentItem.battleValue );
                                } else {

                                    this._calcLogBV += "+ Adding Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  -  bv " + (currentItem.battleValue / 2 ) + " (half of " + currentItem.battleValue + "), heat " + currentItem.bvHeat + "<br />";
                                    runningTotal += (currentItem.battleValue / 2);

                                }

                            }
                        } else {
                            if( currentItem.battleValue) {
                                // this._calcLogBV += "+ Adding Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ") - bv " + currentItem.battleValue + ", heat " + currentItem.bvHeat;
                                // runningTotal += currentItem.battleValue;
                                if( this.getTotalBVFrontWeapons() >= this.getTotalBVRearWeapons() || this.isNotOnTorsoHeadOrLegs(currentItem.location)  ) {
                                    this._calcLogBV += "+ Adding Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  -  bv " + (currentItem.battleValue  ) + ", heat " + currentItem.bvHeat + "<br />";
                                    runningTotal += (currentItem.battleValue );
                                } else {

                                    this._calcLogBV += "+ Adding Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  -  bv " + (currentItem.battleValue / 2 ) + " (half of " + currentItem.battleValue + "), heat " + currentItem.bvHeat + "<br />";
                                    runningTotal += (currentItem.battleValue / 2);

                                }
                            }
                        }
                    }

                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    runningHeat += this._equipmentList[weaponC].bvHeat;


                    // set above, never undefined, thanks TS
                    //@ts-ignore
                    if( runningHeat >= mechHeatEfficiency && this._equipmentList[weaponC].bvHeat > 0 && inHalfCost === false) {
                        inHalfCost = true;
                        this._calcLogBV += " (weapon is last heat efficient, rest will be half cost)";
                    }

                    this._calcLogBV += "<br />";

                }
            }

        } else {

            // Mech is heat efficient, no need to go through steps 4-7 on TM pp 303-304, just print and add up the weapons

            for( let weaponC = 0; weaponC < this._equipmentList.length; weaponC++) {
                let currentItem = this._equipmentList[weaponC];
                if( currentItem.tag.indexOf( "ammo-" ) === -1) {
                    if( currentItem.rear  ) {
                        if( currentItem.battleValue ) {
                            if( this.getTotalBVFrontWeapons() < this.getTotalBVRearWeapons() || this.isNotOnTorsoHeadOrLegs(currentItem.location) ) {
                                this._calcLogBV += "+ Adding Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  -  bv " + (currentItem.battleValue  ) + " (not halved due to less front weapons bv), heat " + currentItem.bvHeat + "<br />";
                                runningTotal += (currentItem.battleValue );
                            } else {
                                this._calcLogBV += "+ Adding Rear Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + (currentItem.battleValue / 2 ) + " (half of " + currentItem.battleValue + ")<br />";

                                runningTotal += (currentItem.battleValue / 2);
                            }
                        }
                    } else {
                        if( currentItem.battleValue ) {
                            if( this.getTotalBVFrontWeapons() >= this.getTotalBVRearWeapons() || this.isNotOnTorsoHeadOrLegs(currentItem.location)  ) {
                                this._calcLogBV += "+ Adding Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + currentItem.battleValue + "<br />";
                                runningTotal += (currentItem.battleValue );
                            } else {
                                this._calcLogBV += "+ Adding Weapon " + currentItem.name + " (" + (currentItem.location ? currentItem.location : "no location") + ")  - " + (currentItem.battleValue / 2 ) + " (half of " + currentItem.battleValue + ")<br />";

                                runningTotal += currentItem.battleValue / 2;

                            }
                        }
                    }
                }
            }

        }

        totalWeaponBV = runningTotal;
        this._calcLogBV += "<strong>Total Weapon BV</strong> " + totalWeaponBV + "<br />";

        let modifiedMechTonnage = this.getTonnage();

        if( this._hasTripleStrengthMyomer) {
            modifiedMechTonnage = modifiedMechTonnage * 1.5;
        }

        offensiveBattleRating = totalWeaponBV + totalAmmoBV + modifiedMechTonnage;

        let speedFactorModifier = this._getSpeedFactorModifier();
        offensiveBattleRating = offensiveBattleRating * speedFactorModifier;

        this._calcLogBV += "<strong>Final offensive battle rating</strong>: " + offensiveBattleRating.toFixed(2) + " ( " + totalWeaponBV + " (weaponBV) + " + totalAmmoBV + " (ammoBV) + " + modifiedMechTonnage + "(mechTonnage) ) x " + speedFactorModifier + " (speed factor rating)<br />";

        /* ***************************************************
         * STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304
         * ************************************************ */

        this._calcLogBV += "<strong>STEP 3: CALCULATE FINAL BATTLE VALUE - TM p304</strong><br />";
        let finalBattleValue = defensiveBattleRating + offensiveBattleRating;
        this._calcLogBV += "finalBattleValue = defensiveBattleRating + offensiveBattleRating: " + finalBattleValue.toFixed(2) + " = " + defensiveBattleRating.toFixed(2) +  " + "  + offensiveBattleRating.toFixed(2) + "<br />";

        if( this._smallCockpit) {
            finalBattleValue = Math.round(finalBattleValue * .95);
            this._calcLogBV += "Small Cockpit, multiply total by .95 and round final BV: " + finalBattleValue.toFixed(2) + "<br />";
        }

        this._calcLogBV += "<strong>Final Battle Value</strong>: " + finalBattleValue.toFixed(2) + " rounded off " + Math.round(finalBattleValue) + "<br />";
        this._battleValue = Math.round(finalBattleValue);

        this._setPilotAdjustedBattleValue();
    }

    private _setPilotAdjustedBattleValue() {
        this._pilotAdjustedBattleValue = this._battleValue;

        if( this._pilot.gunnery === 0 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.80;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.56;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.24;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.92;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.60;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.50;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.43;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.36;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 0 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.28;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.63;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.40;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.10;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.80;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.50;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.35;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.33;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.26;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.19;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.45;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.24;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.96;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.68;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.40;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.26;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.19;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.16;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 2 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.10;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.28;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.08;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.82;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.56;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.30;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.17;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.11;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.04;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 3 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.01;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 2.01;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.84;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.61;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.38;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.15;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.04;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 1 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.98;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.92;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 4 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.86;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.82;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.60;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.40;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.20;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.0;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.90;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.85;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.80;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 5 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.75;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.75;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.58;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.33;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.14;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.95;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.86;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.81;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.76;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 6 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.71;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.67;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.51;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.31;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.08;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.90;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.81;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.77;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.72;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 7 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.68;
        } else if( this._pilot.gunnery === 0 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.59;
        } else if( this._pilot.gunnery === 1 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.44;
        } else if( this._pilot.gunnery === 2 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.25;
        } else if( this._pilot.gunnery === 3 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 1.06;
        } else if( this._pilot.gunnery === 4 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.85;
        } else if( this._pilot.gunnery === 5 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.77;
        } else if( this._pilot.gunnery === 6 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.72;
        } else if( this._pilot.gunnery === 7 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.68;
        } else if( this._pilot.gunnery === 8 && this._pilot.piloting === 8 ) {
            this._pilotAdjustedBattleValue = this._pilotAdjustedBattleValue * 0.64;
        }
        this._pilotAdjustedBattleValue = Math.round( this._pilotAdjustedBattleValue );
    }

    private _getSpeedFactorModifier(): number {
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

    public isQuad() {
        if( this._mechType.tag.toLowerCase() === "quad" )
            return true;
        else
            return false;
    }

    private _calcCBillCost() {
        // TODO Calculations
        this._calcLogCBill = "";

        let cbillDryTotal = 0;
        let cbillAmmoTotal = 0;
        // _this._calcLogCBill = "TODO";

        this._calcLogCBill += "<table class=\"cbill-cost\">\n";

        this._calcLogCBill += "<tbody>\n";
        // Cockpit
        if( this._smallCockpit ) {
            this._calcLogCBill += "<tr><td><strong>Small Cockpit</strong></td><td>175,000</td></tr>\n";
            cbillDryTotal += 175000;
        } else {
            this._calcLogCBill += "<tr><td><strong>Standard Cockpit</strong></td><td>200,000</td></tr>\n";
            cbillDryTotal += 200000;
        }

        // Life Support
        this._calcLogCBill += "<tr><td><strong>Life Support</strong></td><td>50,000</td></tr>\n";
        cbillDryTotal += 50000;

        // Sensors
        this._calcLogCBill += "<tr><td><strong>Sensors</strong><br /><span class=\"smaller-text\">2,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" + addCommas( 2000 * this.getTonnage()) + "</td></tr>\n";
        cbillDryTotal += 2000 * this.getTonnage() ;

        this._calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Cockpit Subtotal: " + addCommas(cbillDryTotal) + "</strong></td></tr>\n";

        // Myomer
        if( this._hasTripleStrengthMyomer ) {
            this._calcLogCBill += "<tr><td><strong>Triple-Strength Myomer</strong><br /><span class=\"smaller-text\">16,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 16000 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 16000 * this.getTonnage() ;
        } else {
            this._calcLogCBill += "<tr><td><strong>Standard Musculature</strong><br /><span class=\"smaller-text\">2,000 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 2000 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 2000 * this.getTonnage() ;
        }

        // Internal Structure
        // console.log( this._selectedInternalStructure.name );
        this._calcLogCBill += "<tr><td><strong>Internal Structure: " + this._selectedInternalStructure.name  + "</strong><br />" +  addCommas( this._selectedInternalStructure.cost ) + " x Unit Tonnage [" + this.getTonnage() + "]</td><td>" +  addCommas( this._selectedInternalStructure.cost * this.getTonnage() ) + "</td></tr>\n";
        cbillDryTotal += this._selectedInternalStructure.cost * this.getTonnage() ;

        this._calcLogCBill += "<tr><td colspan=\"2\"><strong>Actuators</strong></td></tr>\n";

        let actuatorTotal = 0;
        // Actuators
        if( this._mechType.tag.toLowerCase() === "quad" ) {
            this._calcLogCBill += "<tr><td>Right Front Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 150 * this.getTonnage() ;
            actuatorTotal += 150 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Front Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 80 * this.getTonnage() ;
            actuatorTotal += 80 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Front Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 120 * this.getTonnage() ;
            actuatorTotal += 120 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Front Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 150 * this.getTonnage() ;
            actuatorTotal += 150 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Front Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 80 * this.getTonnage() ;
            actuatorTotal += 80 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Front Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 120 * this.getTonnage() ;
            actuatorTotal += 120 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Rear Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 150 * this.getTonnage() ;
            actuatorTotal += 150 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Rear Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 80 * this.getTonnage() ;
            actuatorTotal += 80 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Rear Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 120 * this.getTonnage() ;
            actuatorTotal += 120 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Rear Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 150 * this.getTonnage() ;
            actuatorTotal += 150 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Rear Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 80 * this.getTonnage() ;
            actuatorTotal += 80 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Rear Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 120 * this.getTonnage() ;
            actuatorTotal += 120 * this.getTonnage() ;
        } else {

            this._calcLogCBill += "<tr><td>Right Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 150 * this.getTonnage() ;
            actuatorTotal += 150 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 80 * this.getTonnage() ;
            actuatorTotal += 80 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 120 * this.getTonnage() ;
            actuatorTotal += 120 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Upper Leg Actuator<br /><span class=\"smaller-text\">150 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 150 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 150 * this.getTonnage() ;
            actuatorTotal += 150 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Lower Leg Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 80 * this.getTonnage() ;
            actuatorTotal += 80 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Left Foot Actuator<br /><span class=\"smaller-text\">120 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 120 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 120 * this.getTonnage() ;
            actuatorTotal += 120 * this.getTonnage() ;

            this._calcLogCBill += "<tr><td>Right Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 100 * this.getTonnage() ;
            actuatorTotal += 100 * this.getTonnage() ;

            if( this._no_right_arm_lower_actuator === false ) {
                this._calcLogCBill += "<tr><td>Right Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
                cbillDryTotal += 50 * this.getTonnage() ;
                actuatorTotal += 50 * this.getTonnage() ;
            }

            if( this._no_right_arm_hand_actuator === false ) {
                this._calcLogCBill += "<tr><td>Right Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
                cbillDryTotal += 80 * this.getTonnage() ;
                actuatorTotal += 80 * this.getTonnage() ;
            }

            this._calcLogCBill += "<tr><td>Left Upper Arm Actuator<br /><span class=\"smaller-text\">100 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 100 * this.getTonnage() ) + "</td></tr>\n";
            cbillDryTotal += 100 * this.getTonnage() ;
            actuatorTotal += 100 * this.getTonnage() ;

            if( this._no_left_arm_lower_actuator === false ) {
                this._calcLogCBill += "<tr><td>Left Lower Arm Actuator<br /><span class=\"smaller-text\">50 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 50 * this.getTonnage() ) + "</td></tr>\n";
                cbillDryTotal += 50 * this.getTonnage() ;
                actuatorTotal += 50 * this.getTonnage() ;
            }

            if( this._no_left_arm_hand_actuator === false ) {
                this._calcLogCBill += "<tr><td>Left Hand Actuator<br /><span class=\"smaller-text\">80 x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( 80 * this.getTonnage() ) + "</td></tr>\n";
                cbillDryTotal += 80 * this.getTonnage() ;
                actuatorTotal += 80 * this.getTonnage() ;
            }

        }
        this._calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Actuator Subtotal: " + addCommas(actuatorTotal) + "</strong></td></tr>\n";

        // Engine
        let engineName = this.getEngineType().name;
        let engineRating  = this.getEngineRating();
        let enginecostMultiplier = this.getEngineType().costMultiplier;
        let engineCost =  Math.round( enginecostMultiplier * engineRating * this.getTonnage() / 75 * 100) / 100; ;
        this._calcLogCBill += "<tr><td><strong>Engine: " + engineName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( enginecostMultiplier ) + " x Engine Rating  [" + engineRating + "] x Unit Tonnage [" + this.getTonnage() + "] / 75</span></td><td>" +  addCommas( engineCost ) + "</td></tr>\n";
        cbillDryTotal += engineCost;

        // Gyro
        let gyroName = this.getGyroName();
        let gyrocostMultiplier = this.getGyro().costMultiplier;
        let gyroTonnage = this.getGyroWeight();

        this._calcLogCBill += "<tr><td><strong>Gyro: " + gyroName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( gyrocostMultiplier ) + " x Gyro Tonnage [" + gyroTonnage + "]</span></td><td>" +  addCommas( gyrocostMultiplier * gyroTonnage  ) + "</td></tr>\n";
        cbillDryTotal += gyrocostMultiplier * gyroTonnage ;

        // Jump Jets
        let numberOfJumpJets = this.getNumberOfJumpJets();
        if( numberOfJumpJets ) {
            let jumpJetName = this._jumpJetType.name;
            let jumpJetCost = this._jumpJetType.costMultiplier;
            this._calcLogCBill += "<tr><td><strong>Jump Jets: " + jumpJetName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( jumpJetCost ) + " x (# Jump Jets [" +  numberOfJumpJets + "])<sup>2</sup> x Unit Tonnage [" + this.getTonnage() + "]</span></td><td>" +  addCommas( jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ) + "</td></tr>\n";
            cbillDryTotal += jumpJetCost * Math.pow( numberOfJumpJets, 2) *  this.getTonnage()  ;
        }

        // Heat Sinks
        let heatSinksName = this.getHeatSinksObj().name;
        let heatSinksCost =  this.getHeatSinksObj().cost ;
        let numberOfHeatSinks = this.getHeatSinks();
        let heatSinkType = this.getHeatSinksType();
        // console.log( numberOfHeatSinks );
        // console.log( heatSinkType );

        switch (heatSinkType) {
            case "single":
                this._calcLogCBill += "<tr><td><strong>Heat Sinks: " + heatSinksName  + "</strong><br /><span class=\"smaller-text\">" + addCommas(heatSinksCost) + " x (Number of Heat Sinks over 10 [" + (numberOfHeatSinks - 10 ) + "])</span></td><td>" +  addCommas( heatSinksCost * ( numberOfHeatSinks - 10 ) ) + "</td></tr>\n";
                cbillDryTotal +=  heatSinksCost * ( numberOfHeatSinks - 10 )  ;

                break;
            case "double":
                this._calcLogCBill += "<tr><td><strong>Heat Sinks:  " + heatSinksName  + "</strong><br /><span class=\"smaller-text\">" + addCommas(heatSinksCost) + " x (Number of Heat Sinks  [" + (numberOfHeatSinks  ) + "])</span></td><td>" +  addCommas( heatSinksCost * ( numberOfHeatSinks ) ) + "</td></tr>\n";
                cbillDryTotal +=  heatSinksCost * ( numberOfHeatSinks  )  ;

                break;
            default:
                break;
        }

        // Armor
        let armorName = this.getArmorObj().name;
        let armorcostMultiplier = this.getArmorObj().costMultiplier;
        let armorTonnage = this.getArmorWeight();

        this._calcLogCBill += "<tr><td><strong>Armor: " + armorName  + "</strong><br /><span class=\"smaller-text\">" +  addCommas( armorcostMultiplier ) + " x Armor Tonnage [" + armorTonnage + "]</span></td><td>" +  addCommas( armorcostMultiplier * armorTonnage  ) + "</td></tr>\n";
        cbillDryTotal += armorcostMultiplier * armorTonnage ;

        // Equipment
        for( let eqC = 0; eqC < this._equipmentList.length; eqC++) {
            if( this._equipmentList[eqC].tag.indexOf( "ammo-" ) === -1) {
                this._calcLogCBill += "<tr><td><strong>" + this._equipmentList[eqC].name + "</strong></td><td>" + addCommas(this._equipmentList[eqC].cbills) + "</td></tr>\n";
                cbillDryTotal += this._equipmentList[eqC].cbills;
            } else {
                this._calcLogCBill += "<tr><td><strong>" + this._equipmentList[eqC].name + "</strong></td><td class=\"text-right\">" + addCommas(this._equipmentList[eqC].cbills * this._equipmentList[eqC].weight) + "<div class=\"smaller-text\">(not included in dry cost)</div></td></tr>\n";
                cbillAmmoTotal += this._equipmentList[eqC].cbills * this._equipmentList[eqC].weight;
            }
        }

        // NOTE - for some reason SSW and the MUL are 1000 less here than the actual summation even when all the line items are right.
        this._calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\">&nbsp;</td></tr>\n";
        this._calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\"><strong>Dry Subtotal: " + addCommas(cbillDryTotal) + "</strong></td></tr>\n";

        // (Structural Cost + Weapon/Equipment Costs) x (Omni Conversion Cost*) x (1 + [Total Tonnage ÷ 100])

        this._calcLogCBill += "<tr><td colspan=\"2\" class=\"text-right\">&nbsp;</td></tr>\n";
        this._calcLogCBill += "<tr><td colSpan=\"2\">Cost Multiplier:<div class=\"smaller-text\">Sub Total [" + addCommas(cbillDryTotal) + "] x (1 + Unit Tonnage [" + this.getTonnage() + "] / 100) - rounded up</div></td><td>" + (1 + this.getTonnage() / 100 ) + "</td></tr>";
        this._calcLogCBill += "<tr><td class=\"text-right\"><strong>Final Dry Cost</strong>:</td><td>" + addCommas( Math.ceil(cbillDryTotal * ( 1 + this.getTonnage() / 100 ) ) ) + "</td></tr>\n";
        this._calcLogCBill += "<tr><td class=\"text-right\"><strong>Final Loaded Cost</strong>:</td><td>" + addCommas( Math.ceil( ( cbillDryTotal ) * ( 1 + this.getTonnage() / 100 ) ) + cbillAmmoTotal ) + "</td></tr>\n";

        // cbillDryTotal = Math.floor(cbillDryTotal)
        cbillDryTotal = Math.round( cbillDryTotal * (1 + this.getTonnage() / 100) );

        this._calcLogCBill += "</tbody></table>";
        this._cbillCost = addCommas(cbillDryTotal);
        this._cbillCostWithAmmo = addCommas( cbillDryTotal + cbillAmmoTotal)
    }

    public getNumberOfJumpJets() {
        return this.getJumpSpeed();
    }

    public getBattleValue() {
        return this._battleValue;
    }

    public getPilotAdjustedBattleValue() {
        return this._pilotAdjustedBattleValue;
    }

    public getAlphaStrikeValue() {
        return this._alphaStrikeValue;
    }

    public getCBillCost( withAMMO: boolean = false): string {
        if( withAMMO )
            return this._cbillCostWithAmmo;
        else
            return this._cbillCost;
    }

    public getCBillCostNumeric( withAMMO: boolean = false): number {
        if( withAMMO )
            return parseInt(this._cbillCostWithAmmo.replace(/,/g, ''), 10);
        else
            return parseInt(this._cbillCost.replace(/,/g, ''), 10);
    }

    public getEngineWeight() {
        if( this._engine && this._engine.weight) {
            // if( this._engineType.tag === "clan-xl" ) {
            //     return this._engine.weight.xl;
            // } else {
            //     return this._engine.weight[this._engineType.tag];
            // }
            switch( this._engineType.tag ) {
                case "standard": {
                    return this._engine.weight.standard;
                }
                case "clan-xl":
                case "xl": {
                    return this._engine.weight.xl;
                }
                case "cell": {
                    return this._engine.weight.cell;
                }
                case "comp": {
                    return this._engine.weight.comp;
                }
                case "fission": {
                    return this._engine.weight.fission;
                }
                case "ice": {
                    return this._engine.weight.ice;
                }
                case "light": {
                    return this._engine.weight.light;
                }

            }
            return 0;
        } else {
            return 0;
        }
    }

    public getEngineRating() {
        if( this._engine && this._engine.rating)
            return this._engine.rating;
        else
            return 0;

    }

    public getHeatSinks() {
        return 10 + this._additionalHeatSinks;
    }

    public getHeatSinksWeight() {
        return 0 + this._additionalHeatSinks;
    }

    public getGyroWeight() {
        if( this._engine ) {
            return Math.ceil(Math.ceil(this._engine.rating / 100) * this._gyro.weight_multiplier);
        } else {
            return 0;
        }
    }
    public getCockpitWeight() {
        return this._cockpitWeight;
    }

    public getInternalStructureWeight() {
        return this._selectedInternalStructure.perTon[this.getTonnage()].tonnage;
    }

    public getJumpJetWeight() {
        if( this._tonnage <= 55) {
            // 10-55 tons
            return this._jumpSpeed * this._jumpJetType.weight_multiplier.light;
        } else if( this._tonnage <= 85) {
            // 60 - 85 tons
            return this._jumpSpeed * this._jumpJetType.weight_multiplier.medium;
        } else {
            // 90+ tons
            return this._jumpSpeed * this._jumpJetType.weight_multiplier.heavy;
        }

    }

    public getASCalcHTML() {
        return "<div class=\"mech-tro\">" + this._calcLogAS + "</div>";
    }

    public getBVCalcHTML() {
        return "<div class=\"mech-tro\">" + this._calcLogBV + "</div>";
    }

    public getCBillCalcHTML() {
        return "<div class=\"mech-tro\">" + this._calcLogCBill + "</div>";
    }

    public calcAlphaStrike(): AlphaStrikeUnit {

        this._alphaStrikeForceStats.name = this.getName();
        this._alphaStrikeForceStats.move = this.getWalkSpeed() * 2;
        this._alphaStrikeForceStats.jumpMove = this.getJumpSpeed() * 2;
        this._alphaStrikeForceStats.pv = 0;
        this._alphaStrikeForceStats.damage.short = 0;
        this._alphaStrikeForceStats.damage.medium = 0;
        this._alphaStrikeForceStats.damage.long = 0;
        this._alphaStrikeForceStats.damage.extreme = 0;
        this._alphaStrikeForceStats.damage.shortMinimal = false;
        this._alphaStrikeForceStats.damage.mediumMinimal = false
        this._alphaStrikeForceStats.damage.longMinimal = false
        this._alphaStrikeForceStats.damage.extremeMinimal = false
        this._alphaStrikeForceStats.armor = 0;
        this._alphaStrikeForceStats.structure = 0;
        this._alphaStrikeForceStats.skill = 4;
        this._alphaStrikeForceStats.ov = 0;
        this._alphaStrikeForceStats.notes = "";
        this._alphaStrikeForceStats.sizeClass = 0;
        this._alphaStrikeForceStats.sizeClassName = "";
        this._alphaStrikeForceStats.specialUnitAbilities = [];
        this._alphaStrikeForceStats.overheat = 0;
        this._alphaStrikeForceStats.longHeat = 0;
        this._alphaStrikeForceStats.abilityCodes = [];
        this._alphaStrikeForceStats.specialUnitAbilities = [];

        // this._alphaStrikeForceStats.getAbilityCode(abilityCode) {
        //     for (let abiC = 0; abiC < this._alphaStrikeForceStats.abilityCodes.length; abiC++) {
        //         if (abilityCode.toLowerCase().trim() === this._alphaStrikeForceStats.abilityCodes[abiC].toLowerCase().trim()) {
        //             return this._alphaStrikeForceStats.abilityCodes[abiC];
        //         }
        //     }

        //     return null;
        // }

        // this._alphaStrikeForceStats.addAbilityCode(abilityCode, abilityValue) {

        //     this._alphaStrikeForceStats.abilityCodes.push({
        //         code: abilityCode,
        //         value: abilityValue
        //     });

        // }

        this._calcLogAS = "";

        // TODO - calculations
        this._calcLogAS += "Tonnage is " + this._tonnage + "<br />\n";
        if (this._tonnage > 100) {
            this._alphaStrikeForceStats.sizeClass = 4;
            this._alphaStrikeForceStats.sizeClassName = "Superheavy";
            this._alphaStrikeForceStats.specialUnitAbilities.push( "LG" );
            this._calcLogAS += "<strong>Setting Size to 4 (Superheavy)</strong><br />\n";
        } else if (this._tonnage >= 80) {
            this._alphaStrikeForceStats.sizeClass = 4;
            this._alphaStrikeForceStats.sizeClassName = "Assault";
            this._calcLogAS += "<strong>Setting Size to 4 (Assault)</strong><br />\n";
        } else if (this._tonnage >= 60) {
            this._alphaStrikeForceStats.sizeClass = 3;
            this._alphaStrikeForceStats.sizeClassName = "Heavy";
            this._calcLogAS += "<strong>Setting Size to 3 (Heavy)</strong><br />\n";
        } else if (this._tonnage >= 40) {
            this._alphaStrikeForceStats.sizeClass = 2;
            this._alphaStrikeForceStats.sizeClassName = "Medium";
            this._calcLogAS += "<strong>Setting Size to 2 (Medium)</strong><br />\n";
        } else {
            this._alphaStrikeForceStats.sizeClass = 1;
            this._alphaStrikeForceStats.sizeClassName = "Light";
            this._calcLogAS += "<strong>Setting Size to 1 (Light)</strong><br />\n";
        }

        this._alphaStrikeForceStats.armor = +((this.getTotalArmor() / 30).toFixed(0));
        this._calcLogAS += "Converting total armor of " + this.getTotalArmor() + "<br />\n";
        this._calcLogAS += "<strong>Setting Armor to " + this._alphaStrikeForceStats.armor + "</strong><br />\n";

        if (this.getTech().tag === "is" ) {

            switch (this._engineType.tag) {
                case "compact":
                    // Compact

                    if (this._tonnage === 100) {
                        this._alphaStrikeForceStats.structure = 10;
                    } else if (this._tonnage >= 95) {
                        this._alphaStrikeForceStats.structure = 10;
                    } else if (this._tonnage >= 90) {
                        this._alphaStrikeForceStats.structure = 10;
                    } else if (this._tonnage >= 85) {
                        this._alphaStrikeForceStats.structure = 9;
                    } else if (this._tonnage >= 80) {
                        this._alphaStrikeForceStats.structure = 8;
                    } else if (this._tonnage >= 75) {
                        this._alphaStrikeForceStats.structure = 8;
                    } else if (this._tonnage >= 70) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 65) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 60) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 55) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 50) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 45) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 40) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 35) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 30) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 25) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 20) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 15) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 10) {
                        this._alphaStrikeForceStats.structure = 1;
                    }
                    this._calcLogAS += "Engine is an IS Compact Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
                    break;
                case "xl":
                    // XL
                    if (this._tonnage === 100) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 95) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 90) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 85) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 80) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 75) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 70) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 65) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 60) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 55) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 50) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 45) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 40) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 35) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 30) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 25) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 20) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 15) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 10) {
                        this._alphaStrikeForceStats.structure = 1;
                    }
                    this._calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
                    break;
                case "light":
                    // Compact
                    if (this._tonnage === 100) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 95) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 90) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 85) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 80) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 75) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 70) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 65) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 60) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 55) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 50) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 45) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 40) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 35) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 30) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 25) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 20) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 15) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 10) {
                        this._alphaStrikeForceStats.structure = 1;
                    }
                    this._calcLogAS += "Engine is an IS Light Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
                    break;
                default:
                    // Standard
                    if (this._tonnage === 100) {
                        this._alphaStrikeForceStats.structure = 8;
                    } else if (this._tonnage >= 95) {
                        this._alphaStrikeForceStats.structure = 8;
                    } else if (this._tonnage >= 90) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 85) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 80) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 75) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 70) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 65) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 60) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 55) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 50) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 45) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 40) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 35) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 30) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 25) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 20) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 15) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 10) {
                        this._alphaStrikeForceStats.structure = 1;
                    }
                    this._calcLogAS += "Engine is an IS Standard Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
                    break;
            }
        } else {
            // Clan Engines...
            switch (this._engineType.tag) {
                case "xl":
                case "clan-xl":
                    // Compact
                    if (this._tonnage === 100) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 95) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 90) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 85) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 80) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 75) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 70) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 65) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 60) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 55) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 50) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 45) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 40) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 35) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 30) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 25) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 20) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 15) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 10) {
                        this._alphaStrikeForceStats.structure = 1;
                    }
                    this._calcLogAS += "Engine is a Clan XL Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";
                    break;
                default:
                    // Standard / Standard Fusion
                    if (this._tonnage === 100) {
                        this._alphaStrikeForceStats.structure = 8;
                    } else if (this._tonnage >= 95) {
                        this._alphaStrikeForceStats.structure = 8;
                    } else if (this._tonnage >= 90) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 85) {
                        this._alphaStrikeForceStats.structure = 7;
                    } else if (this._tonnage >= 80) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 75) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 70) {
                        this._alphaStrikeForceStats.structure = 6;
                    } else if (this._tonnage >= 65) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 60) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 55) {
                        this._alphaStrikeForceStats.structure = 5;
                    } else if (this._tonnage >= 50) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 45) {
                        this._alphaStrikeForceStats.structure = 4;
                    } else if (this._tonnage >= 40) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 35) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 30) {
                        this._alphaStrikeForceStats.structure = 3;
                    } else if (this._tonnage >= 25) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 20) {
                        this._alphaStrikeForceStats.structure = 2;
                    } else if (this._tonnage >= 15) {
                        this._alphaStrikeForceStats.structure = 1;
                    } else if (this._tonnage >= 10) {
                        this._alphaStrikeForceStats.structure = 1;
                    }
                    this._calcLogAS += "Engine is a Clan Standard Engine <strong>setting structure to " + this._alphaStrikeForceStats.structure + "</strong><br />\n";

                    break;
            }
        }

        // Heat Modified Damage, p115 AS companion
        let total_weapon_heat_short = 0;
        let total_weapon_heat_medium = 0;
        let total_weapon_heat_long = 0;
        // let total_weapon_heat_extreme = 0;
        let has_explosive = false;

        let lrmDamage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0

        }

        let heatDamage: IAlphaStrikeDamage = {
            short:0,
            medium: 0,
            long: 0,
            extreme: 0
        }

        let flakDamage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0
        }

        let acDamage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0
        }

        let srmDamage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0
        }

        let mslDamage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0
        }

        let rearDamage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0
        }

        let indirectFireRating = 0;

        let shortTotalDamage = 0;
        let mediumTotalDamage = 0;
        let longTotalDamage = 0;
        let extremeTotalDamage = 0;

        let shortTotalDamageRear = 0;
        let mediumTotalDamageRear = 0;
        let longTotalDamageRear = 0;
        let extremeTotalDamageRear = 0;

        for (let weapon_counter = 0; weapon_counter < this._equipmentList.length; weapon_counter++) {
            if (this._equipmentList[weapon_counter].explosive) {
                has_explosive = true;
            }
            if (this._equipmentList[weapon_counter].alphaStrike && !this._equipmentList[weapon_counter].isAmmo ) {
                if (this._equipmentList[weapon_counter].alphaStrike.rangeLong > 0) {
                    total_weapon_heat_long += +this._equipmentList[weapon_counter].alphaStrike.heat;
                }
                // if (this._equipmentList[weapon_counter].alphaStrike.rangeExtreme > 0) {
                //     total_weapon_heat_extreme += +this._equipmentList[weapon_counter].alphaStrike.heat;
                // }



                if (this._equipmentList[weapon_counter].rear) {
                    this._calcLogAS += "Adding <strong>rear</strong> Weapon " + this._equipmentList[weapon_counter].tag + " - ";
                    this._calcLogAS += " ( " + this._equipmentList[weapon_counter].alphaStrike.rangeShort + ", ";
                    this._calcLogAS += this._equipmentList[weapon_counter].alphaStrike.rangeMedium + ", ";
                    this._calcLogAS += this._equipmentList[weapon_counter].alphaStrike.rangeLong + ", ";
                    this._calcLogAS += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme + " )<br />\n";
                    shortTotalDamageRear += this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                    mediumTotalDamageRear += this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                    longTotalDamageRear += this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                    extremeTotalDamageRear += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                } else {

                    shortTotalDamage += this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                    mediumTotalDamage += this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                    longTotalDamage += this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                    extremeTotalDamage += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;

                    this._calcLogAS += "Adding Weapon " + this._equipmentList[weapon_counter].tag + " - ";
                    this._calcLogAS += " ( " + this._equipmentList[weapon_counter].alphaStrike.rangeShort + ", ";
                    this._calcLogAS += this._equipmentList[weapon_counter].alphaStrike.rangeMedium + ", ";
                    this._calcLogAS += this._equipmentList[weapon_counter].alphaStrike.rangeLong + ", ";
                    this._calcLogAS += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme + " )<br />\n";

                    if( this._equipmentList[weapon_counter].alphaStrike.rangeMedium > 0 )
                        total_weapon_heat_medium += +this._equipmentList[weapon_counter].alphaStrike.heat;
                    if( this._equipmentList[weapon_counter].alphaStrike.rangeShort > 0 )
                        total_weapon_heat_short += +this._equipmentList[weapon_counter].alphaStrike.heat;

                }


                this._alphaStrikeForceStats.damage.short = shortTotalDamage;
                this._alphaStrikeForceStats.damage.medium = mediumTotalDamage;
                this._alphaStrikeForceStats.damage.long = longTotalDamage;
                this._alphaStrikeForceStats.damage.extreme = extremeTotalDamage;

                rearDamage.short = shortTotalDamageRear;
                rearDamage.medium = mediumTotalDamageRear;
                rearDamage.long = longTotalDamageRear;
                rearDamage.extreme = extremeTotalDamageRear;

                if ( this._equipmentList[weapon_counter].alphaStrike.notes && this._equipmentList[weapon_counter].alphaStrike.notes.length && this._equipmentList[weapon_counter].alphaStrike.notes.length > 0) {
                    for (let nC = 0; nC < this._equipmentList[weapon_counter].alphaStrike.notes.length; nC++) {
                        if (this._alphaStrikeForceStats.abilityCodes.indexOf(this._equipmentList[weapon_counter].alphaStrike.notes[nC]) === -1) {
                            this._alphaStrikeForceStats.abilityCodes.push(this._equipmentList[weapon_counter].alphaStrike.notes[nC]);
                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "mel" ) {
                            this._alphaStrikeForceStats.specialUnitAbilities.push( "MEL" );
                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "heat" ) {
                            heatDamage.short += this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                            heatDamage.medium += this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                            heatDamage.long += this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                            heatDamage.extreme += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "lrm" ) {
                            lrmDamage.short += +this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                            lrmDamage.medium += +this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                            lrmDamage.long += +this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                            lrmDamage.extreme += +this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "ac" ) {
                            acDamage.short += +this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                            acDamage.medium += +this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                            acDamage.long += +this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                            acDamage.extreme += +this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "flak" ) {
                            flakDamage.short += +this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                            flakDamage.medium += +this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                            flakDamage.long += +this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                            flakDamage.extreme += +this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                        }

                        if (
                            this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "indirect fire"
                            ||
                            this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "if"
                            ||
                            this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase().startsWith( "if " )
                        ) {
                            indirectFireRating += +this._equipmentList[weapon_counter].alphaStrike.rangeLong;

                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "indirect fire" || this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "srm" ) {
                            srmDamage.short += this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                            srmDamage.medium += this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                            srmDamage.long += this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                            srmDamage.extreme += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                        }

                        if (this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "missile" || this._equipmentList[weapon_counter].alphaStrike.notes[nC].toLowerCase() === "msl" ) {
                            mslDamage.short += this._equipmentList[weapon_counter].alphaStrike.rangeShort;
                            mslDamage.medium += this._equipmentList[weapon_counter].alphaStrike.rangeMedium;
                            mslDamage.long += this._equipmentList[weapon_counter].alphaStrike.rangeLong;
                            mslDamage.extreme += this._equipmentList[weapon_counter].alphaStrike.rangeExtreme;
                        }

                    }

                }
            }
        }




        indirectFireRating = Math.round(indirectFireRating);

        let move_heat = 0;
        if (this.getJumpSpeed() > 0) {
            if (this.getJumpSpeed() < 3)
                move_heat += 3;
            else
                move_heat += +this.getJumpSpeed();

            this._calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"/" + this.getJumpSpeed() * 2 + "\"J</strong><br />\n";
        } else {
            move_heat += 2;
            this._calcLogAS += "<strong>Move Is " + this.getWalkSpeed() * 2 + "\"</strong><br />\n";
        }

        // if there are no explosive components, then the mech gets the ENE ability :)
        if (!has_explosive) {
            this._alphaStrikeForceStats.abilityCodes.push( "ENE" );
            this._calcLogAS += "Mech has no explosive components, gets ENE ability<br />\n";
        }

        let heatDissipation = 0;

        heatDissipation += (10 + this._additionalHeatSinks) * this._heatSinkType.dissipation;

        let max_short_overheat_value =  move_heat + total_weapon_heat_short ;
        let max_medium_overheat_value =  move_heat + total_weapon_heat_medium ;
        let max_long_overheat_value =  move_heat + total_weapon_heat_long;
        // let max_weapon_heat_extreme = move_heat + total_weapon_heat_extreme;

        let max_heat_output =  max_short_overheat_value;
        if( max_medium_overheat_value > max_heat_output)
            max_heat_output = max_medium_overheat_value
        if( max_long_overheat_value > max_heat_output)
            max_heat_output = max_long_overheat_value


        if( this._alphaStrikeForceStats.damage.short >= .5 && this._alphaStrikeForceStats.damage.short < 1) {
            this._alphaStrikeForceStats.damage.short = 0;
            this._alphaStrikeForceStats.damage.shortMinimal = true;
        } else {
            this._alphaStrikeForceStats.damage.short = Math.ceil( this._alphaStrikeForceStats.damage.short );
        }

        if( this._alphaStrikeForceStats.damage.medium >= .5 && this._alphaStrikeForceStats.damage.medium < 1) {
            this._alphaStrikeForceStats.damage.medium = 0;
            this._alphaStrikeForceStats.damage.mediumMinimal = true;
        } else {
            this._alphaStrikeForceStats.damage.medium = Math.ceil( this._alphaStrikeForceStats.damage.medium );
        }
        if( this._alphaStrikeForceStats.damage.long >= .5 && this._alphaStrikeForceStats.damage.long < 1) {
            this._alphaStrikeForceStats.damage.long = 0;
            this._alphaStrikeForceStats.damage.longMinimal = true;
        } else {
            this._alphaStrikeForceStats.damage.long = Math.ceil( this._alphaStrikeForceStats.damage.long );
        }
        if( this._alphaStrikeForceStats.damage.extreme >= .5 && this._alphaStrikeForceStats.damage.extreme < 1) {
            this._alphaStrikeForceStats.damage.extreme = 0;
            this._alphaStrikeForceStats.damage.extremeMinimal = true;
        } else {
            this._alphaStrikeForceStats.damage.extreme = Math.ceil( this._alphaStrikeForceStats.damage.extreme );
        }




        this._calcLogAS += "<strong>Base Short Damage: " + this._alphaStrikeForceStats.damage.short + "</strong><br />\n";
        this._calcLogAS += "<strong>Base Medium Damage: " + this._alphaStrikeForceStats.damage.medium + "</strong><br />\n";
        this._calcLogAS += "<strong>Base Long Damage: " + this._alphaStrikeForceStats.damage.long + "</strong><br />\n";
        this._calcLogAS += "<strong>Base Extreme Damage: " + this._alphaStrikeForceStats.damage.extreme + "</strong><br />\n";

        let final_overheat_value = 0;


        let weapon_heat_damage_short = Math.ceil((this._alphaStrikeForceStats.damage.short * heatDissipation) / (max_heat_output - 4));
        let weapon_heat_damage_medium = Math.ceil((this._alphaStrikeForceStats.damage.medium * heatDissipation) / (max_heat_output - 4));
        let weapon_heat_damage_long = Math.ceil((this._alphaStrikeForceStats.damage.long * heatDissipation) / (max_heat_output - 4));
        // let weapon_heat_damage_extreme = Math.ceil((this._alphaStrikeForceStats.damage.extreme * heatDissipation) / (max_heat_output - 4));



        // if( this._alphaStrikeForceStats.damage.short.toString() !== "0*" )
        this._alphaStrikeForceStats.damage.short = Math.ceil(+this._alphaStrikeForceStats.damage.short);

        // if( this._alphaStrikeForceStats.damage.medium.toString() !== "0*" )
        this._alphaStrikeForceStats.damage.medium = Math.ceil(+this._alphaStrikeForceStats.damage.medium);


        if (weapon_heat_damage_medium !== this._alphaStrikeForceStats.damage.medium || weapon_heat_damage_short !== this._alphaStrikeForceStats.damage.short )  {


            // Heat Modified Damage, p115 AS companion
            this._alphaStrikeForceStats.damage.short = weapon_heat_damage_short;

            this._alphaStrikeForceStats.damage.medium = weapon_heat_damage_medium;
            if( this._alphaStrikeForceStats.damage.medium > 0 && weapon_heat_damage_medium !== this._alphaStrikeForceStats.damage.medium  ) {

                this._calcLogAS += "total_weapon_heat_medium is over 3, weapon damages must be adjusted - " + weapon_heat_damage_medium + " as per p115<br />";

                final_overheat_value = this._alphaStrikeForceStats.damage.medium - weapon_heat_damage_medium;


            } else if( this._alphaStrikeForceStats.damage.short !== weapon_heat_damage_short ) {
                 final_overheat_value = this._alphaStrikeForceStats.damage.short - weapon_heat_damage_short;
            }

        }
        this._alphaStrikeForceStats.damage.short = weapon_heat_damage_short;
        this._alphaStrikeForceStats.damage.medium = weapon_heat_damage_medium;

        let final_long_overheat_value = 0;
        let heat_damage_long = 0;
        let heat_damage_extreme = 0;

        if (weapon_heat_damage_long > 4) {

            if( this._alphaStrikeForceStats.damage.long.toString() !== "0*" ) {
                heat_damage_long = +this._alphaStrikeForceStats.damage.long;
                heat_damage_extreme = +this._alphaStrikeForceStats.damage.extreme;


                this._alphaStrikeForceStats.damage.long = Math.ceil((+this._alphaStrikeForceStats.damage.long * heatDissipation) / (total_weapon_heat_long - 4));
                this._alphaStrikeForceStats.damage.extreme = Math.ceil((+this._alphaStrikeForceStats.damage.long * heatDissipation) / (total_weapon_heat_long - 4));

                if (heat_damage_long > +this._alphaStrikeForceStats.damage.long) {
                    final_long_overheat_value = heat_damage_long - +this._alphaStrikeForceStats.damage.long;
                    this._alphaStrikeForceStats.damage.long = (heat_damage_long - final_long_overheat_value);
                    this._alphaStrikeForceStats.damage.extreme = (heat_damage_extreme - final_long_overheat_value);
                }


            }
        }

        if (final_long_overheat_value > 0) {
            this._alphaStrikeForceStats.abilityCodes.push( "OVL " + final_long_overheat_value);

        }


        this._alphaStrikeForceStats.damage = adjustAlphaStrikeDamage(this._alphaStrikeForceStats.damage, true);

        // Determine Overheat Values - p116 AS Companion
        if( final_overheat_value > 4 )
            final_overheat_value = 4;

        this._alphaStrikeForceStats.ov = final_overheat_value;

        this._calcLogAS += "Move Heat: " + move_heat + "<br />\n";
        this._calcLogAS += "Weapon Heat: " + final_overheat_value + "<br />\n";
        this._calcLogAS += "Long Weapon Heat: " + total_weapon_heat_long + "<br />\n";
        this._calcLogAS += "Heat Dissipation: " + heatDissipation + "<br />\n";

        this._calcLogAS += "Short Overheat Damage: " + weapon_heat_damage_short + "<br />\n";
        this._calcLogAS += "Medium Overheat Damage: " + weapon_heat_damage_medium + "<br />\n";
        this._calcLogAS += "Long Overheat Damage: " + weapon_heat_damage_long + "<br />\n";
        this._calcLogAS += "Final Overheat Damage: " + final_overheat_value + "<br />\n";

        this._calcLogAS += "<strong>Final Short Damage: " + this._alphaStrikeForceStats.damage.short + "</strong><br />\n";
        this._calcLogAS += "<strong>Final Medium Damage: " + this._alphaStrikeForceStats.damage.medium + "</strong><br />\n";
        this._calcLogAS += "<strong>Final Long Damage: " + this._alphaStrikeForceStats.damage.long + "</strong><br />\n";
        this._calcLogAS += "<strong>Final Extreme Damage: " + this._alphaStrikeForceStats.damage.extreme + "</strong><br />\n";

        // Overheat Value is
        this._calcLogAS += "<strong>Final Overheat Value: " + final_overheat_value + "</strong><br />\n";
        this._calcLogAS += "<strong>Final Long Overheat Value: " + final_long_overheat_value + "</strong><br />\n";

        this._alphaStrikeForceStats.overheat = final_overheat_value;
        this._alphaStrikeForceStats.longOverheat = final_long_overheat_value;

        // Offensive Special Ability Factor
        // TODO

        this._alphaStrikeForceStats.name = this._model;
        this._alphaStrikeForceStats.type = "BM";

        let alphaStrikeCalculation = calculateAlphaStrikeValue(
            this._alphaStrikeForceStats,
            rearDamage,
            heatDamage,
            lrmDamage,
            flakDamage,
            acDamage,
            srmDamage,
            mslDamage,
            indirectFireRating,
        );

        this._calcLogAS += alphaStrikeCalculation.calcLogs;
        let finalValue = alphaStrikeCalculation.finalValue;
        this._alphaStrikeForceStats = alphaStrikeCalculation.alphaStrikeForceStats;

        this._alphaStrikeValue = Math.round(finalValue); // + " (WIP)";
        let asMechData: IASMULUnit = {
            FormatedTonnage: this._tonnage.toString(),
            GroupName: "",
            BFAbilities: "",             // "";
            BFArmor: 0,             // number;
            BFDamageExtreme: 0,             // number;
            BFDamageLong: 0,            // number;
            BFDamageMedium: 0,          // number;
            BFDamageShort: 0,           // number;
            BFMove: "",          // string;
            BFOverheat: 0,          // number;
            BFPointValue: 0,            // number;
            BFSize: 0,          // number;
            BFStructure: 0,             // number;
            BFTMM: 0,           // number;
            BFThreshold: 0,             // number;
            BFType: "",          // string;
            BattleValue: 0,             // number;
            Class: "",           // string;
            Cost: 0,            // number;
            DateIntroduced: "",          // string;
            EraIcon: "",           //
            EraId: 0,           // number;
            EraStart: 0,            // number;
            Id: 0,          // number;
            ImageUrl: "",            // string;
            IsFeatured: true,          // true
            IsPublished: true,             // true
            Name: "",            // string;
            RS: "",          // string;
            RSId: 0,            // number;
            Release: 0,             // number;
            Role: {
                Name: "",
                Id: 0,
                Image: "",
                SortOrder: 0,
            },            // ASMULRole;
            Rules: "",           // string;
            Skill: 0,           // number;
            TRO: "",             // string;
            TROId: 0,           // number;
            Technology: {
                Name: "",
                Id: 0,
                SortOrder: 0,
                Image: "",
            },          // ASMULTech;
            Tonnage: 0,             // number;
            Type: {
                Name: "",
                Id: 0,
                SortOrder: 0,
                Image: "",
            },            // ASMULType;
            Variant: "",             // string;

            // // classification: "",
            // costCR: 0,
            // mulID: 0,
            // currentHeat: 0,
            // damage: {
            //     short: 0,
            //     medium: 0,
            //     long: 0,
            //     extreme: 0,
            // },
            // variant: "",
            // dateIntroduced: "",
            // name: "",
            // tonnage: 0,
            // tro: "",
            // role: "",
            // threshold: 0,
            // move: [],
            // jumpMove: 0,
            // structure: 0,
            // armor: 0,
            // type: "",
            // size: 0,
            // showDetails: false,
            // abilities: "",
            // overheat: 0,
            // basePoints: 0,
            // currentSkill: 0,
            // pilot: this._pilot.export(),
        };
        asMechData["BFPointValue"] = Math.round(finalValue);

        asMechData["Name"] = this.getName();
        asMechData["BFThreshold"] = 0;
        asMechData["Role"].Name = this._alphaStrikeForceStats.role;
        asMechData["BFType"] = "BM";
        asMechData["BFSize"] = this._alphaStrikeForceStats.sizeClass;

        asMechData["BFArmor"] = this._alphaStrikeForceStats.armor;
        asMechData["BFStructure"] = this._alphaStrikeForceStats.structure;

        asMechData["BFOverheat"] = final_overheat_value;

        asMechData["BFDamageShort"] = +this._alphaStrikeForceStats.damage.short;
        asMechData["BFDamageMedium"] = +this._alphaStrikeForceStats.damage.medium;
        asMechData["BFDamageLong"] = +this._alphaStrikeForceStats.damage.long;
        asMechData["BFDamageExtreme"] = +this._alphaStrikeForceStats.damage.extreme;

        asMechData["BFOverheat"] = this._alphaStrikeForceStats.overheat;


        if( this._alphaStrikeForceStats.jumpMove) {
            asMechData["BFMove"] = this._alphaStrikeForceStats.move.toString() + "\"/" + this._alphaStrikeForceStats.jumpMove + "\"J";
        } else {
            asMechData["BFMove"] = this._alphaStrikeForceStats.move.toString() + "\"";
        }

        this._alphaStrikeForceStats.abilityCodes.sort();
        asMechData["BFAbilities"] = this._alphaStrikeForceStats.abilityCodes.join( ", " ).toUpperCase();

        let unitObj = new AlphaStrikeUnit();

        unitObj.customName = this._alphaStrikeForceStats.customName;
        unitObj.setPilotSkill( this._pilot.gunnery );
        unitObj.importMUL( asMechData )
        unitObj.mechCreatorUUID = this._uuid;
        return unitObj;

    }

    public makeTROBBCode() {

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

        if( this._isAnachronistic() ) {
            html += "This 'mech is Anachronistic\n\n";
        }

        let col1Padding = 25;
        let col2Padding = 15;
        let col3Padding = 10;
        let col4Padding = 10;

        // Equipment
        html += "Equipment".padEnd(col1Padding + col2Padding, " " ) + "Mass\n";
        html += "" + ( "Internal Structure ( " + this._selectedInternalStructure.name + " )" ).toString().padEnd(col1Padding + col2Padding, " " ) + "" + this.getInternalStructureWeight() + "\n";
        html += "" + this.getEngineName().padEnd(col1Padding, " " ) + "" + this.getEngineRating().toString().padEnd(col2Padding, " " ) + "" + this.getEngineWeight() + "\n";

        html += "Walking".padStart(col1Padding - 10, " " ) + " " + this.getWalkSpeed().toString().padStart(3, " " ) + "\n";
        html += "Running".padStart(col1Padding - 10, " " ) + " " + this.getRunSpeed().toString().padStart(3, " " ) + "\n";
        html += "Jumping".padStart(col1Padding - 10, " " ) + " " + this.getJumpSpeed().toString().padStart(3, " " ) + "\n";

        html += "" + this.getHeatSyncName().padEnd(col1Padding, " " ) + "" + this.getHeatSinks().toString().padEnd(col2Padding, " " ) + "" + this.getHeatSinksWeight() + "\n";
        html += "" + this.getGyroName().padEnd(col1Padding + col2Padding, " " ) + "" + this.getGyroWeight() + "\n";

        if( this._smallCockpit) {
            html += "Small Cockpit".padEnd(col1Padding + col2Padding, " " ) + "" + this.getCockpitWeight() + "\n";
        } else {
            html += "Cockpit".padEnd(col1Padding + col2Padding, " " ) + "" + this.getCockpitWeight() + "\n";
        }

        // if( this.getJumpJetWeight() > 0 ) {
        // html += "Jump Jets".padEnd( " ",col1Padding + col2Padding) + "" + this.getJumpJetWeight() + "\n";
        // }

        if( this._mechType.tag === "biped" ) {
            html += "Actuators: ";
            let actuator_html = "";

            if( this.hasLowerArmActuator( "ra" ))
                actuator_html += "RLA, ";
            if( this.hasLowerArmActuator( "la" ))
                actuator_html += "LLA, ";
            if( this.hasHandActuator( "ra" ))
                actuator_html += "RH, ";
            if( this.hasHandActuator( "la" ))
                actuator_html += "LH, ";

            if( actuator_html === "" )
                actuator_html = "No lower arm actuators";
            else
                actuator_html = actuator_html.substring(0, actuator_html.length - 2);

            html += actuator_html;
            html += "\n";
        }

        html += "" + ( "Armor Value ( " + this._armorType.name + " )" ).padEnd(col1Padding, " " ) + "" + this.getTotalArmor().toString().padEnd(col2Padding, " " ) + "" + this.getArmorWeight() + "\n";

        col1Padding = 20;
        col2Padding = 10;
        col3Padding = 15;
        col4Padding = 10;

        // Armor Factor Table

        html += "Internal Structure".padStart(col1Padding + col2Padding, " " ) + "Armor Value".padStart(col3Padding, " " ) + "\n";
        html += "Head".padStart(col1Padding, " " ) + "" + this._internalStructure.head.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.head.toString().padStart(col3Padding, " " ) + "\n";
        html += "Center Torso".padStart(col1Padding, " " ) + "" + this._internalStructure.centerTorso.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.centerTorso.toString().padStart(col3Padding, " " ) + "\n";
        html += "Center Torso (Rear)".padStart(col1Padding, " " ) + "" + this._armorAllocation.centerTorsoRear.toString().padStart(col2Padding, " " ) + "\n";
        if( this._armorAllocation.rightTorso === this._armorAllocation.leftTorso && this._armorAllocation.rightTorsoRear === this._armorAllocation.leftTorsoRear) {
            html += "R/L Torso".padStart(col1Padding, " " ) + "" + this._internalStructure.rightTorso.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightTorso.toString().padStart(col3Padding, " " ) + "\n";
            html += "R/L Torso (Rear)".padStart(col1Padding, " " ) + "" + this._armorAllocation.rightTorsoRear.toString().padStart(col2Padding, " " ) + "\n";
        } else {
            html += "Right Torso".padStart(col1Padding, " " ) + "" + this._internalStructure.rightTorso.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightTorso.toString().padStart(col3Padding, " " ) + "\n";
            html += "Right Torso (Rear)".padStart(col1Padding, " " ) + "" + this._armorAllocation.rightTorsoRear.toString().padStart(col2Padding, " " ) + "\n";

            html += "Left Torso".padStart(col1Padding, " " ) + "" + this._internalStructure.leftTorso.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.leftTorso.toString().padStart(col3Padding, " " ) + "\n";
            html += "Left Torso (Rear)".padStart(col1Padding, " " ) + "" + this._armorAllocation.leftTorsoRear.toString().padStart(col2Padding, " " ) + "\n";
        }
        if( this._mechType.tag === "biped" ) {

            if( this._armorAllocation.rightArm === this._armorAllocation.leftArm) {
                html += "R/L Arm".padStart(col1Padding, " " ) + "" + this._internalStructure.rightArm.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightArm.toString().padStart(col3Padding, " " ) + "\n";
            } else {
                html += "Right Arm".padStart(col1Padding, " " ) + "" + this._internalStructure.rightArm.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightArm.toString().padStart(col3Padding, " " ) + "\n";
                html += "Left Arm".padStart(col1Padding, " " ) + "" + this._internalStructure.leftArm.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.leftArm.toString().padStart(col3Padding, " " ) + "\n";
            }

            if( this._armorAllocation.rightLeg === this._armorAllocation.leftLeg) {
                html += "R/L Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.rightLeg.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightLeg.toString().padStart(col3Padding, " " ) + "\n";
            } else {
                html += "Right Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.rightLeg.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightLeg.toString().padStart(col3Padding, " " ) + "\n";
                html += "Left Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.leftLeg.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.leftLeg.toString().padStart(col3Padding, " " ) + "\n";
            }
        } else {
            if( this._armorAllocation.rightArm === this._armorAllocation.leftArm) {
                html += "R/L Front Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.rightArm.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightArm.toString().padStart(col3Padding, " " ) + "\n";
            } else {
                html += "Right Front Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.rightArm.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightArm.toString().padStart(col3Padding, " " ) + "\n";
                html += "Left Front Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.leftArm.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.leftArm.toString().padStart(col3Padding, " " ) + "\n";
            }

            if( this._armorAllocation.rightLeg === this._armorAllocation.leftLeg) {
                html += "R/L Rear Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.rightLeg.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightLeg.toString().padStart(col3Padding, " " ) + "\n";
            } else {
                html += "Right Rear Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.rightLeg.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.rightLeg.toString().padStart(col3Padding, " " ) + "\n";
                html += "Right Front Leg".padStart(col1Padding, " " ) + "" + this._internalStructure.leftLeg.toString().padStart(col2Padding, " " ) + "" + this._armorAllocation.leftLeg.toString().padStart(col3Padding, " " ) + "\n";
            }
        }
        // End Factor Table
        html += "";
        html += "\n";

        col1Padding = 20;
        col2Padding = 10;
        col3Padding = 10;
        col4Padding = 10;

        this._equipmentList.sort(sortByLocationThenName);

        // Weapons and Ammo
        for( let countEQ = 0; countEQ < this._equipmentList.length; countEQ++) {
            if( this._equipmentList[countEQ].name.length + 3 > col1Padding)
                col1Padding = this._equipmentList[countEQ].name.length + 3;
        }

        for( let locC = 0; locC < this._validJJLocations.length; locC++) {

            for( let critC = 0; critC < this._criticals[this._validJJLocations[locC].long].length; critC++) {
                let item = this._criticals[this._validJJLocations[locC].long][critC];
                if(
                    item &&
                    item.tag &&
                    item.tag.indexOf( "jj-" ) === 0
                ) {
                    if( item.name.length + 3 > col1Padding)
                        col1Padding = item.name.length + 3;
                }
            }
        }

        html += "Weapons\n";

        html += "and Ammo".padEnd(col1Padding, " " ) + "Location".padEnd(col2Padding, " " ) + "Critical".padEnd(col3Padding, " " ) + "Tonnage".padEnd(col4Padding, " " ) + "\n";

        for( let countEQ = 0; countEQ < this._equipmentList.length; countEQ++) {
            let currentItem = this._equipmentList[countEQ];

            if( typeof(currentItem.location) === "undefined" )
                currentItem.location = "n/a";

            let item_location = this._getLocationAbbr(currentItem.location);

            if( currentItem.rear)
                item_location += " (R)"

            if( currentItem.ammoPerTon && currentItem.ammoPerTon > 0) {
                html += "" + (currentItem.name + " " + currentItem.ammoPerTon).padEnd(col1Padding, " " ) + "" + item_location.toUpperCase().toString().padEnd(col2Padding, " " ) + "" + currentItem.space.battlemech.toString().padEnd(col3Padding, " " ) + "" + currentItem.weight.toString().padEnd(col4Padding, " " ) + "\n";
            } else {
                html += "" + currentItem.name.padEnd(col1Padding, " " ) + "" + item_location.toUpperCase().toString().padEnd(col2Padding, " " ) + "" + currentItem.space.battlemech.toString().padEnd(col3Padding, " " ) + "" + currentItem.weight.toString().padEnd(col4Padding, " " ) + "\n";
            }

        }

        // List Jump Jets Allocations...

        for( let locC = 0; locC < this._validJJLocations.length; locC++) {

            let jjObjs = [];
            for( let critC = 0; critC < this._criticals[this._validJJLocations[locC].long].length; critC++) {
                let currentItem = this._criticals[this._validJJLocations[locC].long][critC];
                if(
                    currentItem &&
                    currentItem.tag &&
                    currentItem.tag.indexOf( "jj-" ) === 0
                ) {
                    jjObjs.push(currentItem);
                }
            }

            if( jjObjs.length > 0) {
                let areaWeight = 0;
                if( this._tonnage <= 55) {
                    // 10-55 tons
                    areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
                } else if( this._tonnage <= 85) {
                    // 60 - 85 tons
                    areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
                } else {
                    // 90+ tons
                    areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
                }
                html += "" + jjObjs[0].name.padEnd(col1Padding, " " ) + "" + this._validJJLocations[locC].short.toUpperCase().padEnd(col2Padding, " " ) + "" + jjObjs.length.toString().padEnd(col3Padding, " " ) + "" + areaWeight.toString().padEnd(col4Padding, " " ) + "\n";

            }
        }

        let jjObjs = [];

        for( let critC = 0; critC < this._unallocatedCriticals.length; critC++) {
            if(
                this._unallocatedCriticals[critC] &&
                this._unallocatedCriticals[critC].tag &&
                this._unallocatedCriticals[critC].tag.indexOf( "jj-" ) === 0
            ) {
                jjObjs.push(this._unallocatedCriticals[critC]);
            }
        }

        if( jjObjs.length > 0) {
            let areaWeight = 0;
            if( this._tonnage <= 55) {
                // 10-55 tons
                areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
            } else if( this._tonnage <= 85) {
                // 60 - 85 tons
                areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
            } else {
                // 90+ tons
                areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
            }
            html += "" + jjObjs[0].name.padEnd(col1Padding, " " ) + "n/a".toUpperCase().padEnd(col2Padding, " " ) + "" + jjObjs.length.toString().padEnd(col3Padding, " " ) + "" + areaWeight.toString().padEnd(col4Padding, " " ) + "\n";

        }

        let createdBy = "\n\nCreated with BattleTech Tools: [url]https://jdgwf.github.io/battletech-tools/[/url]\n\n";

        return "[code]" + html + "[/code]" + createdBy;

    }

    public makeTROHTML() {

        let html = "<table class=\"mech-tro\">";

        // Header Info
        html += "<tr><td colspan=\"4\">Type: " + this.getName() + "</td></tr>";
        html += "<tr><td colspan=\"4\">Technology Base: " + this.getTech().name + "</td></tr>";
        html += "<tr><td colspan=\"4\">Era: " + this.getEra().name + "</td></tr>";
        html += "<tr><td colspan=\"4\">Tonnage: " + this.getTonnage() + "</td></tr>";
        html += "<tr><td colspan=\"4\">Battle Value: " + this.getBattleValue() + "</td></tr>";
        html += "<tr><td colspan=\"4\">Alpha Strike Value: " + this.getAlphaStrikeValue() + "</td></tr>";
        html += "<tr><td colspan=\"4\">C-Bill Cost: $" + this.getCBillCost() + "</td></tr>";
        html += "<tr><td colspan=\"4\">C-Bill Cost with Ammo: $" + this.getCBillCost(true) + "</td></tr>";
        html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";

        if( this._isAnachronistic() ) {
            html += "<tr><td colspan=\"4\">This 'mech is Anachronistic</td></tr>";
            html += "<tr><td colspan=\"4\">&nbsp;</td></tr>";
        }

        // Equipment
        html += "<tr><th class=\"text-left\" colspan=\"3\">Equipment</th><th class=\"text-center\" colspan=\"1\">Mass</th></tr>";
        html += "<tr><td colspan=\"3\">Internal Structure ( " + this._selectedInternalStructure.name + " )</td><td class=\"text-center\" colspan=\"1\">" + this.getInternalStructureWeight() + "</td></tr>";
        html += "<tr><td colspan=\"1\">" + this.getEngineName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getEngineRating() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getEngineWeight() + "</td></tr>";

        html += "<tr><td colspan=\"1\" class=\"text-right\">Walking</td><td class=\"text-center\" colspan=\"2\">" + this.getWalkSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
        html += "<tr><td colspan=\"1\" class=\"text-right\">Running</td><td class=\"text-center\" colspan=\"2\">" + this.getRunSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";
        html += "<tr><td colspan=\"1\" class=\"text-right\">Jumping</td><td class=\"text-center\" colspan=\"2\">" + this.getJumpSpeed() + "</td><td colspan=\"1\">&nbsp;</td></tr>";

        html += "<tr><td colspan=\"1\">" + this.getHeatSyncName() + "</td><td class=\"text-center\" colspan=\"2\">" + this.getHeatSinks() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getHeatSinksWeight() + "</td></tr>";
        html += "<tr><td colspan=\"3\">" + this.getGyroName() + "</td><td class=\"text-center\" colspan=\"1\">" + this.getGyroWeight() + "</td></tr>";

        if( this._smallCockpit) {
            html += "<tr><td colspan=\"3\">Small Cockpit</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
        } else {
            html += "<tr><td colspan=\"3\">Cockpit</td><td class=\"text-center\" colspan=\"1\">" + this.getCockpitWeight() + "</td></tr>";
        }

        // if( this.getJumpJetWeight() > 0 ) {
        // html += "<tr><td colspan=\"3\">Jump Jets</td><td class=\"text-center\" colspan=\"1\">" + this.getJumpJetWeight() + "</td></tr>";
        // }

        if( this._mechType.tag === "biped" ) {
            html += "<tr><td colspan=\"4\">Actuators: ";
            let actuator_html = "";

            if( this.hasLowerArmActuator( "ra" ))
                actuator_html += "RLA, ";
            if( this.hasLowerArmActuator( "la" ))
                actuator_html += "LLA, ";
            if( this.hasHandActuator( "ra" ))
                actuator_html += "RH, ";
            if( this.hasHandActuator( "la" ))
                actuator_html += "LH, ";

            if( actuator_html === "" )
                actuator_html = "No lower arm actuators";
            else
                actuator_html = actuator_html.substring(0, actuator_html.length - 2);

            html += actuator_html;
            html += "</td></tr>";
        }

        html += "<tr><th colspan=\"1\">Armor Value ( " + this._armorType.name + " )</th><th class=\"text-center\" colspan=\"2\">" + this.getTotalArmor() + "</th><th class=\"text-center\" colspan=\"1\">" + this.getArmorWeight() + "</th></tr>";

        // Armor Factor Table
        html += "<tr><td colspan=\"1\"></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">Internal Structure</em></td><td class=\"text-center\" colspan=\"1\"><em style=\"font-size: 12px;\">Armor Value</em></td><td>&nbsp;</td></tr>";
        html += "<tr><td  class=\"text-right\"colspan=\"1\">Head</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.head + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.head + "</td><td>&nbsp;</td></tr>";
        html += "<tr><td  class=\"text-right\"colspan=\"1\">Center Torso</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.centerTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.centerTorso + "</td><td>&nbsp;</td></tr>";
        html += "<tr><td  class=\"text-right\"colspan=\"1\">Center Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.centerTorsoRear + "</td><td>&nbsp;</td></tr>";
        if( this._armorAllocation.rightTorso === this._armorAllocation.leftTorso && this._armorAllocation.rightTorsoRear === this._armorAllocation.leftTorsoRear) {
            html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Torso</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
            html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";
        } else {
            html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Torso</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorso + "</td><td>&nbsp;</td></tr>";
            html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightTorsoRear + "</td><td>&nbsp;</td></tr>";

            html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Torso</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftTorso + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftTorso + "</td><td>&nbsp;</td></tr>";
            html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Torso (Rear)</td><td class=\"text-center\" colspan=\"1\">&nbsp;</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftTorsoRear + "</td><td>&nbsp;</td></tr>";
        }
        if( this._mechType.tag === "biped" ) {

            if( this._armorAllocation.rightArm === this._armorAllocation.leftArm) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Arm</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Arm</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Arm</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
            }

            if( this._armorAllocation.rightLeg === this._armorAllocation.leftLeg) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
            }
        } else {
            if( this._armorAllocation.rightArm === this._armorAllocation.leftArm) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Front Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Front Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightArm + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Left Front Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftArm + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftArm + "</td><td>&nbsp;</td></tr>";
            }

            if( this._armorAllocation.rightLeg === this._armorAllocation.leftLeg) {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Rear Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
            } else {
                html += "<tr><td  class=\"text-right\"colspan=\"1\">Right Rear Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.rightLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.rightLeg + "</td><td>&nbsp;</td></tr>";
                html += "<tr><td  class=\"text-right\"colspan=\"1\">R/L Leg</td><td class=\"text-center\" colspan=\"1\">" + this._internalStructure.leftLeg + "</td><td class=\"text-center\" colspan=\"1\">" + this._armorAllocation.leftLeg + "</td><td>&nbsp;</td></tr>";
            }
        }
        // End Factor Table
        html += "</table>";
        html += "<br />";

        // Weapons and Ammo
        html += "<table class=\"mech-tro\">";
        html += "<tr><th class=\"text-left\">Weapons<br />and Ammo</th><th class=\"text-center\">Location</th><th class=\"text-center\">Critical</th><th class=\"text-center\">Tonnage</th></tr>";

        this._equipmentList.sort(sortByLocationThenName);

        for( let countEQ = 0; countEQ < this._equipmentList.length; countEQ++) {
            let currentItem = this._equipmentList[countEQ];
            if( typeof(currentItem.location) === "undefined" )
                currentItem.location = "n/a";

            let item_location = this._getLocationAbbr(currentItem.location);

            if( currentItem.rear)
                item_location += " (R)"

            if( currentItem.isAmmo && currentItem.ammoPerTon && currentItem.ammoPerTon > 0)
                html += "<tr><td class=\"text-left\">" + currentItem.name + " " + currentItem.ammoPerTon + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + currentItem.space.battlemech + "</td><td class=\"text-center\">" + currentItem.weight + "</td></tr>";
            else
                html += "<tr><td class=\"text-left\">" + currentItem.name + "</td><td class=\"text-center\">" + item_location.toUpperCase() + "</strong></td><td class=\"text-center\">" + currentItem.space.battlemech + "</td><td class=\"text-center\">" + currentItem.weight + "</td></tr>";
        }

        // List Jump Jets Allocations...

        for( let locC = 0; locC < this._validJJLocations.length; locC++) {

            let jjObjs = [];
            for( let critC = 0; critC < this._criticals[this._validJJLocations[locC].long].length; critC++) {
                let item = this._criticals[this._validJJLocations[locC].long][critC];
                if(
                   item &&
                   item.tag &&
                   item.tag.indexOf( "jj-" ) === 0
                ) {
                    jjObjs.push(this._criticals[this._validJJLocations[locC].long][critC]);
                }
            }

            if( jjObjs.length > 0) {
                let areaWeight = 0;
                if( this._tonnage <= 55) {
                    // 10-55 tons
                    areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
                } else if( this._tonnage <= 85) {
                    // 60 - 85 tons
                    areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
                } else {
                    // 90+ tons
                    areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
                }
                let jjObj = jjObjs[0];
                if( jjObj ) {
                    html += "<tr><td class=\"text-left\">" + jjObj.name + "</td><td class=\"text-center\">" + this._validJJLocations[locC].short.toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";
                }

            }
        }

        let jjObjs = [];

        for( let critC = 0; critC < this._unallocatedCriticals.length; critC++) {
            if(
                this._unallocatedCriticals[critC] &&
                this._unallocatedCriticals[critC].tag &&
                this._unallocatedCriticals[critC].tag.indexOf( "jj-" ) === 0
            ) {
                jjObjs.push(this._unallocatedCriticals[critC]);
            }
        }

        if( jjObjs.length > 0) {
            let areaWeight = 0;
            if( this._tonnage <= 55) {
                // 10-55 tons
                areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.light;
            } else if( this._tonnage <= 85) {
                // 60 - 85 tons
                areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.medium;
            } else {
                // 90+ tons
                areaWeight = jjObjs.length * this._jumpJetType.weight_multiplier.heavy;
            }
            html += "<tr><td class=\"text-left\">" + jjObjs[0].name + "</td><td class=\"text-center\">n/a".toUpperCase() + "</strong></td><td class=\"text-center\">" + jjObjs.length + "</td><td class=\"text-center\">" + areaWeight + "</td></tr>";

        }

        // END Weapons and Ammo
        html += "</table>";

        return html;
    }

    private _getLocationAbbr(
        locationTag: string,
    ) {
        for( let countLoc = 0; countLoc < battlemechLocations.length; countLoc++) {
            if( locationTag === battlemechLocations[countLoc].tag) {
                if( battlemechLocations[countLoc].abbr !== "undefined" )
                    return battlemechLocations[countLoc].abbr;
                else
                    return battlemechLocations[countLoc].abbr;
            }
        }
        return "n/a";
    }

     private _calc() {

        if(!this._tonnage) {
            this._tonnage = 20;
        }

        this._maxMoveHeat = 2;
        this._heatDissipation = 0;

        this._weights = [];

        this._weights.push({
            name: "Internal Structure",
            weight: this.getInternalStructureWeight()
        });

        if( this._smallCockpit) {
            this._cockpitWeight = 2;
            this._weights.push({
                name: "Small Cockpit",
                weight: this.getCockpitWeight()
            });
        } else {
            this._cockpitWeight = 3;
            this._weights.push({
                name: "Cockpit",
                weight: this.getCockpitWeight()
            });
        }

        this._runSpeed = Math.ceil(this._walkSpeed * 1.5);

        // if( _era === 0) {
        //     era = btEraOptions[1];
        // }

        // if( this._tech === 0) {
        //     tech = btTechOptions[0];
        // }

        // if( this._mechType === 0) {
        //     mechType = mechTypeOptions[0];
        // }

        if( this._engine) {

            this._weights.push({
                name: this._engineType.name + " - " + this._engineType.rating,
                weight: this.getEngineWeight()
            });

            this._weights.push({
                name: this._gyro.name,
                weight: this.getGyroWeight()
            });

        }

        if( this._jumpSpeed > 0) {
            this._maxMoveHeat = this._jumpSpeed;
            // if( this._jumpJetType.tag === "standard" ) {
            //     // standard
            //     this._weights.push({
            //         name: this._jumpJetType.name,
            //         weight: this.getJumpJetWeight()
            //     });
            // } else {
            //     // improved
            //     this._weights.push({
            //         name: this._jumpJetType.name,
            //         weight: this.getJumpJetWeight()
            //     });
            // }
            this._weights.push({
                name: this._jumpJetType.name,
                weight: this.getJumpJetWeight()
            });
        }

        this._totalArmor = 0;

        // switch( this.getArmorType() ) {

        // default: // standard
        // _totalArmor = this._armorWeight * 16;
        // break;
        // }
        if( this.getTech().tag === "clan" ) {
            this._maxArmor = Math.floor(this._armorWeight * this.getArmorObj().armorMultiplier.clan);
        } else {
            this._maxArmor = Math.floor(this._armorWeight * this.getArmorObj().armorMultiplier.is);
        }

        if( this._totalArmor > this._maxArmor)
            this._totalArmor = this._maxArmor;

        this._weights.push({
            name: "Armor",
            weight: this._armorWeight
        });

        this._totalArmor += this._armorAllocation.head;

        this._totalArmor += this._armorAllocation.centerTorso;
        this._totalArmor += this._armorAllocation.leftTorso;
        this._totalArmor += this._armorAllocation.rightTorso;

        this._totalArmor += this._armorAllocation.centerTorsoRear;
        this._totalArmor += this._armorAllocation.leftTorsoRear;
        this._totalArmor += this._armorAllocation.rightTorsoRear;

        this._totalArmor += this._armorAllocation.rightArm;
        this._totalArmor += this._armorAllocation.leftArm;

        this._totalArmor += this._armorAllocation.rightLeg;
        this._totalArmor += this._armorAllocation.leftLeg;

        this._unallocatedArmor = this._maxArmor - this._totalArmor;

        this._maxWeaponHeat = 0;

        if( this._additionalHeatSinks > 0)
            this._weights.push({
                name: "Additional Heat Sinks",
                weight: this._additionalHeatSinks
            });

        this._calcVariableEquipment();
        for( let countEQ = 0; countEQ < this._equipmentList.length; countEQ++) {
            if( this._equipmentList[countEQ].rear) {
                this._weights.push({
                    name: this._equipmentList[countEQ].name + " (rear)",
                    weight: this._equipmentList[countEQ].weight
                });
            } else {
                this._weights.push({
                    name: this._equipmentList[countEQ].name + "",
                    weight: this._equipmentList[countEQ].weight
                });
            }
            if( this._equipmentList[countEQ])
                this._maxWeaponHeat += this._equipmentList[countEQ].heat;
        }

        this._currentTonnage = 0;
        for( let weight_counter = 0; weight_counter < this._weights.length; weight_counter++) {
            this._currentTonnage += this._weights[weight_counter].weight;
        }

        this._remainingTonnage = this._tonnage - this._currentTonnage;

        this._heatSinkCriticals = {
            slotsEach: 1,
            number: 0,
        };
        // this._heatSinkCriticals.number = 0;
        // this._heatSinkCriticals.slots_type = "single slot";
        // this._heatSinkCriticals.slotsEach = 1;

        // if( this._heatSinkType === "double" ) {
        // if( this._tech.tag === "clan" ) {
        // this._heatSinkCriticals.slots_type = "double slot";
        // this._heatSinkCriticals.slotsEach = 2;
        // } else {
        // this._heatSinkCriticals.slots_type = "triple slot";
        // this._heatSinkCriticals.slotsEach = 3;
        // }
        // _heatDissipation = (this._additionalHeatSinks + 10) * 2;
        // } else {
        // this._heatSinkCriticals.slots_type = "single";
        // this._heatSinkCriticals.slotsEach = 1;
        // _heatDissipation = this._additionalHeatSinks + 10;
        // }

        this._heatDissipation = (this._additionalHeatSinks + 10) * this._heatSinkType.dissipation;
        if( this.getTech().tag === "clan" ) {
            this._heatSinkCriticals.slotsEach = this._heatSinkType.crits.clan;
        } else {
            this._heatSinkCriticals.slotsEach = this._heatSinkType.crits.is;
        }

        let findEngine = this.getEngine();
        if( findEngine && findEngine.rating) {
            this._heatSinkCriticals.number = this._additionalHeatSinks + 10 - Math.floor(findEngine.rating / 25);
        } else {
            this._heatSinkCriticals.number = 0
        }

        this._calcCriticals();
        this._calcBattleValue();
        this._calcCBillCost();

        // this._equipmentList = this._equipmentList.sort(sortByLocationThenName);
        // this._equipmentList.sort(sortByLocationThenName);
        this._sortInstalledEquipment();
        this._sortedEquipmentList = [];
        // this._sortedSeparatedEquipmentList = [];

        for( let countEQ = 0; countEQ < this._equipmentList.length; countEQ++) {

            let foundIt = false;

            for( let se_count = 0; se_count < this._sortedEquipmentList.length; se_count++) {
                if(
                    this._equipmentList[countEQ].location === this._sortedEquipmentList[se_count].location &&
                    this._equipmentList[countEQ].tag === this._sortedEquipmentList[se_count].tag
                ) {
                    // @ts-ignore
                    this._sortedEquipmentList[se_count].count++;
                    foundIt = true;
                }
            }

            if( !foundIt) {
                let eqItem = JSON.parse( JSON.stringify(this._equipmentList[countEQ]));
                eqItem.count = 1;
                this._sortedEquipmentList.push(eqItem);
            }

            let eqItemSeparate = JSON.parse( JSON.stringify(this._equipmentList[countEQ]));
            eqItemSeparate.count = 1;
            // this._sortedSeparatedEquipmentList.push( eqItemSeparate )
        }

        this._calcArmorStructureBubbles();

        this._sortedEquipmentList.sort();
        // this._sortedSeparatedEquipmentList.sort();
    }

    private _calcArmorStructureBubbles() {

        if(!this._armorBubbles.head) {

            this._armorBubbles.head = [];
        }

        while( this._armorBubbles.head.length < this._armorAllocation.head ) {
            this._armorBubbles.head.push( true )
        }

        if( this._armorBubbles.head.length > this._armorAllocation.head ) {
            this._armorBubbles.head = this._armorBubbles.head.splice( 0, this._armorAllocation.head)
        }

        if(!this._armorBubbles.centerTorso)
            this._armorBubbles.centerTorso = [];
        while( this._armorBubbles.centerTorso.length < this._armorAllocation.centerTorso ) {
            this._armorBubbles.centerTorso.push( true )
        }
        if( this._armorBubbles.centerTorso.length > this._armorAllocation.centerTorso ) {
            this._armorBubbles.centerTorso = this._armorBubbles.centerTorso.splice( 0, this._armorAllocation.centerTorso)
        }

        if(!this._armorBubbles.rightTorso)
            this._armorBubbles.rightTorso = [];
        while( this._armorBubbles.rightTorso.length < this._armorAllocation.rightTorso ) {
            this._armorBubbles.rightTorso.push( true )
        }
        if( this._armorBubbles.rightTorso.length > this._armorAllocation.rightTorso ) {
            this._armorBubbles.rightTorso = this._armorBubbles.rightTorso.splice( 0, this._armorAllocation.rightTorso)
        }
        if(!this._armorBubbles.leftTorso)
            this._armorBubbles.leftTorso = [];
        while( this._armorBubbles.leftTorso.length < this._armorAllocation.leftTorso ) {
            this._armorBubbles.leftTorso.push( true )
        }
        if( this._armorBubbles.leftTorso.length > this._armorAllocation.leftTorso ) {
            this._armorBubbles.leftTorso = this._armorBubbles.leftTorso.splice( 0, this._armorAllocation.leftTorso)
        }

        if(!this._armorBubbles.centerTorsoRear)
            this._armorBubbles.centerTorsoRear = [];
        while( this._armorBubbles.centerTorsoRear.length < this._armorAllocation.centerTorsoRear ) {
            this._armorBubbles.centerTorsoRear.push( true )
        }
        if( this._armorBubbles.centerTorsoRear.length > this._armorAllocation.centerTorsoRear ) {
            this._armorBubbles.centerTorsoRear = this._armorBubbles.centerTorsoRear.splice( 0, this._armorAllocation.centerTorsoRear)
        }
        if(!this._armorBubbles.rightTorsoRear)
            this._armorBubbles.rightTorsoRear = [];
        while( this._armorBubbles.rightTorsoRear.length < this._armorAllocation.rightTorsoRear ) {
            this._armorBubbles.rightTorsoRear.push( true )
        }
        if( this._armorBubbles.rightTorsoRear.length > this._armorAllocation.rightTorsoRear ) {
            this._armorBubbles.rightTorsoRear = this._armorBubbles.rightTorsoRear.splice( 0, this._armorAllocation.rightTorsoRear)
        }
        if(!this._armorBubbles.leftTorsoRear)
            this._armorBubbles.leftTorsoRear = [];
        while( this._armorBubbles.leftTorsoRear.length < this._armorAllocation.leftTorsoRear ) {
            this._armorBubbles.leftTorsoRear.push( true )
        }
        if( this._armorBubbles.leftTorsoRear.length > this._armorAllocation.leftTorsoRear ) {
            this._armorBubbles.leftTorsoRear = this._armorBubbles.leftTorsoRear.splice( 0, this._armorAllocation.leftTorsoRear)
        }

        if(!this._armorBubbles.leftArm)
            this._armorBubbles.leftArm = [];
        while( this._armorBubbles.leftArm.length < this._armorAllocation.leftArm ) {
            this._armorBubbles.leftArm.push( true )
        }
        if( this._armorBubbles.leftArm.length > this._armorAllocation.leftArm ) {
            this._armorBubbles.leftArm = this._armorBubbles.leftArm.splice( 0, this._armorAllocation.leftArm)
        }
        if(!this._armorBubbles.rightArm)
            this._armorBubbles.rightArm = [];
        while( this._armorBubbles.rightArm.length < this._armorAllocation.rightArm ) {
            this._armorBubbles.rightArm.push( true )
        }
        if( this._armorBubbles.rightArm.length > this._armorAllocation.rightArm ) {
            this._armorBubbles.rightArm = this._armorBubbles.head.splice( 0, this._armorAllocation.rightArm)
        }

        if(!this._armorBubbles.rightLeg)
            this._armorBubbles.rightLeg = [];
        while( this._armorBubbles.rightLeg.length < this._armorAllocation.rightLeg ) {
            this._armorBubbles.rightLeg.push( true )
        }
        if( this._armorBubbles.rightLeg.length > this._armorAllocation.rightLeg ) {
            this._armorBubbles.rightLeg = this._armorBubbles.rightLeg.splice( 0, this._armorAllocation.rightLeg)
        }
        if(!this._armorBubbles.leftLeg)
            this._armorBubbles.leftLeg = [];
        while( this._armorBubbles.leftLeg.length < this._armorAllocation.leftLeg ) {
            this._armorBubbles.leftLeg.push( true )
        }
        if( this._armorBubbles.leftLeg.length > this._armorAllocation.leftLeg ) {
            this._armorBubbles.leftLeg = this._armorBubbles.head.splice( 0, this._armorAllocation.leftLeg)
        }

        if(!this._structureBubbles.head)
            this._structureBubbles.head = [];
        while( this._structureBubbles.head.length < this._internalStructure.head ) {
            this._structureBubbles.head.push( true )
        }
        if( this._structureBubbles.head.length > this._internalStructure.head ) {
            this._structureBubbles.head = this._structureBubbles.head.splice( 0, this._internalStructure.head)
        }

        if(!this._structureBubbles.centerTorso)
            this._structureBubbles.centerTorso = [];
        while( this._structureBubbles.centerTorso.length < this._internalStructure.centerTorso ) {
            this._structureBubbles.centerTorso.push( true )
        }
        if( this._structureBubbles.centerTorso.length > this._internalStructure.centerTorso ) {
            this._structureBubbles.centerTorso = this._structureBubbles.centerTorso.splice( 0, this._internalStructure.centerTorso)
        }
        if(!this._structureBubbles.rightTorso)
            this._structureBubbles.rightTorso = [];
        while( this._structureBubbles.rightTorso.length < this._internalStructure.rightTorso ) {
            this._structureBubbles.rightTorso.push( true )
        }
        if( this._structureBubbles.rightTorso.length > this._internalStructure.rightTorso ) {
            this._structureBubbles.rightTorso = this._structureBubbles.rightTorso.splice( 0, this._internalStructure.rightTorso)
        }
        if(!this._structureBubbles.leftTorso)
            this._structureBubbles.leftTorso = [];
        while( this._structureBubbles.leftTorso.length < this._internalStructure.leftTorso ) {
            this._structureBubbles.leftTorso.push( true )
        }
        if( this._structureBubbles.leftTorso.length > this._internalStructure.leftTorso ) {
            this._structureBubbles.leftTorso = this._structureBubbles.leftTorso.splice( 0, this._internalStructure.leftTorso)
        }
        this._structureBubbles.leftTorsoRear = [];
        this._structureBubbles.centerTorsoRear = [];
        this._structureBubbles.rightTorsoRear = [];

        if(!this._structureBubbles.leftArm)
            this._structureBubbles.leftArm = [];
        while( this._structureBubbles.leftArm.length < this._internalStructure.leftArm ) {
            this._structureBubbles.leftArm.push( true )
        }
        if( this._structureBubbles.leftArm.length > this._internalStructure.leftArm ) {
            this._structureBubbles.leftArm = this._structureBubbles.leftArm.splice( 0, this._internalStructure.leftArm)
        }
        if(!this._structureBubbles.rightArm)
            this._structureBubbles.rightArm = [];
        while( this._structureBubbles.rightArm.length < this._internalStructure.rightArm ) {
            this._structureBubbles.rightArm.push( true )
        }
        if( this._structureBubbles.rightArm.length > this._internalStructure.rightArm ) {
            this._structureBubbles.rightArm = this._structureBubbles.rightArm.splice( 0, this._internalStructure.rightArm)
        }

        if(!this._structureBubbles.rightLeg)
            this._structureBubbles.rightLeg = [];
        while( this._structureBubbles.rightLeg.length < this._internalStructure.rightLeg ) {
            this._structureBubbles.rightLeg.push( true )
        }
        if( this._structureBubbles.rightLeg.length > this._internalStructure.rightLeg ) {
            this._structureBubbles.rightLeg = this._structureBubbles.rightLeg.splice( 0, this._internalStructure.rightLeg)
        }
        if(!this._structureBubbles.leftLeg)
            this._structureBubbles.leftLeg = [];
        while( this._structureBubbles.leftLeg.length < this._internalStructure.leftLeg ) {
            this._structureBubbles.leftLeg.push( true )
        }
        if( this._structureBubbles.leftLeg.length > this._internalStructure.leftLeg ) {
            this._structureBubbles.leftLeg = this._structureBubbles.leftLeg.splice( 0, this._internalStructure.leftLeg)
        }

    }

    private _sortCriticalAllocationTableByTagThenUUID() {
        this._criticalAllocationTable.sort(
            (
                a: ICriticalSlot,
                b: ICriticalSlot,
            ) => {
                if( a.tag > b.tag ) {
                    return -1;
                } else if( a.tag < b.tag ) {
                    return 1;
                } else {
                    if( a.uuid > b.uuid ) {
                        return -1;
                    } else if( a.uuid < b.uuid ) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        )
    }

    private _calcCriticals() {

        this._calcVariableEquipment();
        // WORK IN PROGRESS (Not so much? - JDG Apr 2 2022)
        this._criticals.head = Array(6);

        this._criticals.centerTorso = Array(12);
        this._criticals.leftTorso = Array(12);
        this._criticals.rightTorso = Array(12);

        if( this.getType().tag === "quad" ) {
            this._criticals.rightArm = Array(6);
            this._criticals.leftArm = Array(6);
        } else {
            this._criticals.rightArm = Array(12);
            this._criticals.leftArm = Array(12);
        }

        this._criticals.rightLeg = Array(6);
        this._criticals.leftLeg = Array(6);

        // while( this._criticals.leftArm.length < 12 ) {
        //     this._criticals.leftArm.push( null );
        // }

        this._unallocatedCriticals = [];

        // Add required components....
        if( this._smallCockpit) {
            this._addCriticalItem( "life-support", "Life Support", 1, "hd", 0);
            this._addCriticalItem( "sensors", "Sensors", 1, "hd", 1);
            this._addCriticalItem( "cockpit", "Cockpit", 1, "hd", 2);
            this._addCriticalItem( "sensors", "Sensors", 1, "hd", 3);
        } else {
            this._addCriticalItem( "life-support", "Life Support", 1, "hd", 0);
            this._addCriticalItem( "sensors", "Sensors", 1, "hd", 1);
            this._addCriticalItem( "cockpit", "Cockpit", 1, "hd", 2);
            this._addCriticalItem( "sensors", "Sensors", 1, "hd", 4);
            this._addCriticalItem( "life-support", "Life Support", 1, "hd", 5);
        }

        if( this._mechType.tag.toLowerCase() === "quad" ) {
            // quad
            // Left Leg Components
            this._addCriticalItem( "hip", "Hip", 1, "ra", 0);
            this._addCriticalItem( "upper-leg-actuator", "Upper Leg Actuator", 1, "ra", 1);
            this._addCriticalItem( "lower-leg-actuator", "Lower Leg Actuator", 1, "ra", 2);
            this._addCriticalItem( "foot-actuator", "Foot", 1, "ra", 3);

            // Right Leg Components
            this._addCriticalItem( "hip", "Hip", 1, "la", 0);
            this._addCriticalItem( "upper-leg-actuator", "Upper Leg Actuator", 1, "la", 1);
            this._addCriticalItem( "lower-leg-actuator", "Lower Leg Actuator", 1, "la", 2);
            this._addCriticalItem( "foot-actuator", "Foot", 1, "la", 3);

        } else {
            // biped
            // Left Arm Components
            this._addCriticalItem( "shoulder", "Shoulder", 1, "la", 0);
            this._addCriticalItem( "upper-arm-actuator", "Upper Arm Actuator", 1, "la", 1);
            if( this.hasLowerArmActuator( "la" )) {
                this._addCriticalItem( "lower-arm-actuator", "Lower Arm Actuator", 1, "la", 2);
                if( this.hasHandActuator( "la" )) {

                    this._addCriticalItem( "hand-actuator", "Hand Actuator", 1, "la", 3);
                }
            }

            // Right Arm Components
            this._addCriticalItem( "shoulder", "Shoulder", 1, "ra", 0);
            this._addCriticalItem( "upper-arm-actuator", "Upper Arm Actuator", 1, "ra", 1);
            if( this.hasLowerArmActuator( "ra" )) {
                this._addCriticalItem( "lower-arm-actuator", "Lower Arm Actuator", 1, "ra", 2);
                if( this.hasHandActuator( "ra" )) {

                    this._addCriticalItem( "hand-actuator", "Hand Actuator", 1, "ra", 3);
                }
            }
        }

        // Engine

        let engineCrits: ICriticalLocations = {
            ct: 0,
            rt: 0,
            lt: 0,
        };
        if( this._engineType.criticals && this._engineType.criticals[this.getTech().tag] ) {
            engineCrits = this._engineType.criticals[this.getTech().tag];
            if( engineCrits && engineCrits.ct )  {
                if(
                    this._engineType &&
                    engineCrits &&
                    engineCrits.ct > 3
                ) {
                    this._addCriticalItem(
                        "engine", // item_tag
                        this._engineType.name, // item_nickname
                        3, // criticalCount
                        "ct" // location
                        // slot
                    );
                } else {
                    // reset back to standard, engine not available for tech
                    if( engineCrits && engineCrits.ct ) {
                        console.warn( "resetting engine to standard ", this._engineType.criticals, this.getTech().tag, this._tech);
                        this.setEngineType( "standard" );
                        this._addCriticalItem(
                            "engine", // item_tag
                            this._engineType.name, // item_nickname
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
                    this._addCriticalItem( "engine", this._engineType.name, engineCrits.rt, "rt" );
                }

                if(
                    engineCrits &&
                    engineCrits.lt
                ) {
                    this._addCriticalItem( "engine", this._engineType.name, engineCrits.lt, "lt" );
                }

                // Gyro
                this._addCriticalItem(
                    "gyro", // item_tag
                    this._gyro.name, // item_nickname
                    this._gyro.criticals, // criticalCount
                    "ct" // location
                );

                // Extra engine bits....
                if( engineCrits.ct > 3) {
                    this._addCriticalItem(
                        "engine", // item_tag
                        this._engineType.name, // item_nickname
                        engineCrits.ct - 3, // criticalCount
                        "ct" // location
                    );
                }
            }
        } else {
            // Gyro, but no engine
            this._addCriticalItem(
                "gyro", // item_tag
                this._gyro.name, // item_nickname
                this._gyro.criticals, // criticalCount
                "ct" // location
            );
        }

        // Left Leg Components
        this._addCriticalItem( "hip", "Hip", 1, "ll", 0);
        this._addCriticalItem( "upper-leg-actuator", "Upper Leg Actuator", 1, "ll", 1);
        this._addCriticalItem( "lower-leg-actuator", "Lower Leg Actuator", 1, "ll", 2);
        this._addCriticalItem( "foot-actuator", "Foot", 1, "ll", 3);

        // Right Leg Components
        this._addCriticalItem( "hip", "Hip", 1, "rl", 0);
        this._addCriticalItem( "upper-leg-actuator", "Upper Leg Actuator", 1, "rl", 1);
        this._addCriticalItem( "lower-leg-actuator", "Lower Leg Actuator", 1, "rl", 2);
        this._addCriticalItem( "foot-actuator", "Foot", 1, "rl", 3);

        // Jump Jets
        let jump_move = this.getJumpSpeed();
        for( let jmc = 0; jmc < jump_move; jmc++) {
            this._unallocatedCriticals.push({
                uuid: generateUUID(),
                obj: null,
                name: this._jumpJetType.name,
                tag: "jj-" + this._jumpJetType.tag,
                rear: false,
                movable: true,
                crits: this._jumpJetType.criticals,
            });
        }

        // Armor

        let armorObj = this.getArmorObj();
        if( this.getTech().tag === "clan" ) {
            if( armorObj.crits.clan > 0) {
                // if( armorObj.critLocs) {
                //     for( let nameLoc in armorObj.critLocs) {
                //         this._addCriticalItem(
                //             armorObj.tag, // item_tag
                //             armorObj.name, // item_nickname
                //             armorObj.critLocs[nameLoc], // criticalCount
                //             nameLoc, // location
                //             null,// slot
                //             true, // movable
                //         );
                //     }
                // } else {
                    for( let aCounter = 0; aCounter < armorObj.crits.clan; aCounter++) {
                        this._unallocatedCriticals.push({
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
                // }
            }
        } else {
            if( armorObj.crits.is > 0) {
                // if( armorObj.critLocs ) {
                //     // console.log("Allocating Armor to first available slot", this.getName(), dontAllocateArmorCrits, armorObj.tag, )
                //     for( let nameLoc in armorObj.critLocs) {
                //         for( let count = 0; count < armorObj.critLocs[nameLoc]; count++) {
                //             this._addCriticalItem(
                //                 armorObj.tag, // item_tag
                //                 armorObj.name, // item_nickname
                //                 1, // criticalCount
                //                 nameLoc, // location
                //                 null,// slot
                //                 true, // movable
                //             );
                //         }
                //     }
                // } else {
                    // console.log("Adding Armor to unallocated", this.getName(), dontAllocateArmorCrits, armorObj.tag, )
                    for( let aCounter = 0; aCounter < armorObj.crits.is; aCounter++) {
                        this._unallocatedCriticals.push({
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
                // }
            }
        }

        // Internal Structure critical Items
        if( this.getTech().tag === "clan" ) {
            for( let aCounter = 0; aCounter < this._selectedInternalStructure.crits.clan; aCounter++) {
                this._unallocatedCriticals.push({
                    uuid: generateUUID(),
                    name: this._selectedInternalStructure.name,
                    tag: this._selectedInternalStructure.tag,
                    rollAgain: true,
                    rear: false,
                    crits: 1,
                    obj: this._selectedInternalStructure,
                    movable: true
                });
            }

        } else {
            for( let aCounter = 0; aCounter < this._selectedInternalStructure.crits.is; aCounter++) {
                this._unallocatedCriticals.push({
                    uuid: generateUUID(),
                    name: this._selectedInternalStructure.name,
                    tag: this._selectedInternalStructure.tag,
                    rollAgain: true,
                    rear: false,
                    crits: 1,
                    obj: this._selectedInternalStructure,
                    movable: true
                });
            }
        }

        // Get optional equipment...
        // this._calcVariableEquipment();
        for( let elc = 0; elc < this._equipmentList.length; elc++) {
            // this._equipmentList[elc].location = "";
            let rearTag = "";
            let isRear = false;
            if( this._equipmentList[elc].rear) {
                rearTag = " (rear)";
                isRear = true;
            }


            this._unallocatedCriticals.push({
                //@ts-ignore
                uuid: this._equipmentList[elc].uuid ? this._equipmentList[elc].uuid : "undefined?",
                name: this._equipmentList[elc].name + rearTag,
                tag: this._equipmentList[elc].tag,
                // loc: this._equipmentList[elc].location,
                rear: isRear,
                crits: this._equipmentList[elc].space.battlemech,
                obj: this._equipmentList[elc],
                movable: true,

            });


        }

        // Heat Sink Requirements
        let hs_requirements = this.getHeatSinkCriticalRequirements();
        let hs_nickname = "";
        if( hs_requirements.slotsEach > 1)
            hs_nickname = "Double Heat Sink";
        else
            hs_nickname ="Heat Sink";
        for( let hsc = 0; hsc < hs_requirements.number; hsc++) {

            this._unallocatedCriticals.push({
                obj: null,
                uuid: generateUUID(),
                name: hs_nickname,
                rear: false,
                tag: "heat-sink",
                crits: hs_requirements.slotsEach,
                movable: true
            });
        }

        // Allocate items per allocation table.
        // console.log( "_calc this._criticalAllocationTable", this._criticalAllocationTable);

        let criticalTally: Record<string, number> = {};
        this._sortCriticalAllocationTableByTagThenUUID();
        for( let item of this._criticalAllocationTable) {
            let removeFromUnallocated = false;
            // console.log( "criticalAllocationTable item", this.getName(), item.tag, item.loc, item.crits, item.size, item.uuid );

            if( !criticalTally[ item.uuid ] )
                criticalTally[ item.uuid ] = 0;

            if( item.size )
                criticalTally[ item.uuid ] += item.size;
            else
                criticalTally[ item.uuid ] += item.crits;

            if( criticalTally[ item.uuid ] >= item.crits )
                removeFromUnallocated = true;


            this._allocateCritical(
                item.tag,
                item.rear,
                item.loc,
                item.slot,
                removeFromUnallocated,
                item.size,
                item.uuid,
            )
        }


    }

    public hasHandActuator(
        location: string,
    ) {
        if( location === "ra" )
            if( this._no_right_arm_hand_actuator)
                return false;
        if( location === "la" )
            if( this._no_left_arm_hand_actuator)
                return false;
        return true;
    }

    public hasLowerArmActuator(
        location: string,
    ) {
        if( location === "ra" )
            if( this._no_right_arm_lower_actuator)
                return false;
        if( location === "la" )
            if( this._no_left_arm_lower_actuator)
                return false;
        return true;
    }

    public removeHandActuator(
        location: string,
    ) {
        if( location === "ra" ) {
            this._no_right_arm_hand_actuator = true;
        }
        if( location === "la" ) {
            this._no_left_arm_hand_actuator = true;
        }
        this._calc();

    }

    public removeLowerArmActuator(
        location: string,
    ) {
        if( location === "ra" ) {
            this._no_right_arm_hand_actuator = true;
            this._no_right_arm_lower_actuator = true;

        }
        if( location === "la" ) {
            this._no_left_arm_hand_actuator = true;
            this._no_left_arm_lower_actuator = true;
        }
        this._calc();
    }

    public addHandActuator(
        location: string,
    ) {
        if( location === "ra" ) {
            this._no_right_arm_hand_actuator = false;
            this._no_right_arm_lower_actuator = false;

        }
        if( location === "la" ) {
            this._no_left_arm_hand_actuator = false;
            this._no_left_arm_lower_actuator = false;
        }
        this._calc();
    }

    public addLowerArmActuator(
        location: string,
    ) {
        if( location === "ra" ) {
            //    no_right_arm_hand_actuator = false;
            this._no_right_arm_lower_actuator = false;

        }
        if( location === "la" ) {
            //    no_left_arm_hand_actuator = false;
            this._no_left_arm_lower_actuator = false;
        }
        this._calc();
    }

    public toggleHandActuator(
        location: string,
    ) {
        if( location === "ra" ) {
            if( this._no_right_arm_hand_actuator ) {
                this._no_right_arm_hand_actuator = false;
                this._no_right_arm_lower_actuator = false;
            } else {
                this._no_right_arm_hand_actuator = true;
            }

        }
        if( location === "la" ) {
            if( this._no_left_arm_hand_actuator ) {
                this._no_left_arm_hand_actuator = false;
                this._no_left_arm_lower_actuator = false;
            } else {
                this._no_left_arm_hand_actuator = true;
            }

        }
        this._calc();
    }

    public toggleLowerArmActuator(
        location: string,
    ) {
        if( location === "ra" ) {
            if( this._no_right_arm_lower_actuator ) {
                this._no_right_arm_lower_actuator = false;
            } else {
                this._no_right_arm_lower_actuator = true;
                this._no_right_arm_hand_actuator = true;
            }
        }
        if( location === "la" ) {
            if( this._no_left_arm_lower_actuator ) {
                this._no_left_arm_lower_actuator = false;

            } else {
                this._no_left_arm_lower_actuator = true;
                this._no_left_arm_hand_actuator = true;
            }

        }
        this._calc();
    }

    public getMaxMovementHeat() {
        let maxMoveHeat = 2; // standard run heat.

        if( this.getJumpSpeed() > 2) {
            maxMoveHeat = this.getJumpSpeed();
        }

        // Stealth Armor
        if( this.getArmorType() === "stealth" ) {
            maxMoveHeat += 10;
        }

        return maxMoveHeat;
    }

    private _addCriticalItem(
        item_tag: string,
        item_nickname: string,
        criticalCount: number,
        location: string,
        slot: number | null = 0,
        movable: boolean = false,
    ): boolean {
        let uuid = generateUUID();
        let item: ICriticalSlot = {
            obj: null,
            rear: false,
            tag: item_tag,
            name: item_nickname,
            crits: criticalCount,
            movable: movable,
            uuid: uuid
        };

        if( typeof(slot) === "undefined" || slot === null)
            slot = null;

        if( typeof(location) !== "undefined" && location !== null) {


            if( location === "hd" ) {
                return this._assignItemToArea(this._criticals.head, item, criticalCount, slot, location);
            } else if( location === "ct" ) {
                return this._assignItemToArea(this._criticals.centerTorso, item, criticalCount, slot, location);
            } else if( location === "lt" ) {
                return this._assignItemToArea(this._criticals.leftTorso, item, criticalCount, slot, location);
            } else if( location === "rt" ) {
                return this._assignItemToArea(this._criticals.rightTorso, item, criticalCount, slot, location);
            } else if( location === "ra" ) {
                return this._assignItemToArea(this._criticals.rightArm, item, criticalCount, slot, location);
            } else if( location === "la" ) {
                return this._assignItemToArea(this._criticals.leftArm, item, criticalCount, slot, location);
            } else if( location === "rl" ) {
                return this._assignItemToArea(this._criticals.rightLeg, item, criticalCount, slot, location);
            } else if( location === "ll" ) {
                return this._assignItemToArea(this._criticals.leftLeg, item, criticalCount, slot, location);
            } else {
                return false;
            }

        } else {
            return false;
        }
    }

    private _isNextXCritsAvailable(
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
        slotNumber: number | null,
        location: string,
    ) {

        newItem = JSON.parse(JSON.stringify(newItem));
        // console.log("_assignItemToArea", this.getName(), newItem, criticalCount, slotNumber);
        let placeholder: ICriticalSlot = {
            uuid: newItem.uuid,
            name: "placeholder",
            placeholder: true,
            tag: "",
            crits: 1,
            rear: false,
            obj: null,
            size: criticalCount,
        };

        newItem.size = criticalCount;
        // console.log( "newItem", newItem );
        if( typeof(slotNumber) === "undefined" || slotNumber === null || slotNumber === 0) {
            // place anywhere available
            for( let countArray = 0; countArray < areaArray.length; countArray++) {
                if( !areaArray[countArray]) {

                    if( this._isNextXCritsAvailable(areaArray, criticalCount - 1, countArray + 1, newItem.uuid)) {
                        for( let aita_c = 0; aita_c < criticalCount; aita_c++) {
                            if( aita_c === 0) {
                                areaArray[aita_c + countArray] = newItem;
                                areaArray[aita_c + countArray].size = criticalCount;
                                this._setEquipmentAllocation(
                                    newItem.uuid,
                                    aita_c + countArray,
                                    location
                                )
                            } else {
                                areaArray[aita_c + countArray] = placeholder;
                                areaArray[aita_c + countArray].size = criticalCount;
                            }
                        }
                        // this._updateCriticalAllocationTable();

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
                            areaArray[aita_c + slotNumber].size = criticalCount;
                            this._setEquipmentAllocation(
                                newItem.uuid,
                                aita_c + slotNumber,
                                location
                            )
                        } else {
                            areaArray[aita_c + slotNumber] = placeholder;
                            areaArray[aita_c + slotNumber].size = criticalCount;
                        }
                    }
                    // this._updateCriticalAllocationTable();

                    return true;
                }
            }
        }

        return false;
    }

    private _trimCriticals() {
        this._criticals.head = this._criticals.head.slice(0, 6);

        this._criticals.centerTorso = this._criticals.centerTorso.slice(0, 12);
        this._criticals.leftTorso = this._criticals.leftTorso.slice(0, 12);
        this._criticals.rightTorso = this._criticals.rightTorso.slice(0, 12);

        this._criticals.rightLeg = this._criticals.rightLeg.slice(0, 6);
        this._criticals.leftLeg = this._criticals.leftLeg.slice(0, 6);

        if( this._mechType.tag.toLowerCase() === "quad" ) {
            this._criticals.rightArm = this._criticals.rightArm.slice(0, 6);
            this._criticals.leftArm = this._criticals.leftArm.slice(0, 6);
        } else {
            this._criticals.rightArm = this._criticals.rightArm.slice(0, 12);
            this._criticals.leftArm = this._criticals.leftArm.slice(0, 12);
        }
    }

    public getHeatSinksType() {
        return this._heatSinkType.tag;
    }

    public getHeatSinksObj() {
        return this._heatSinkType;
    }

    public setHeatSinksType(
        newValue: string,
    ) {

        for( let heatSink of mechHeatSinkTypes ) {
            if( heatSink.tag === newValue)
                this._heatSinkType = heatSink;
        }

        for( let localCount = this._criticalAllocationTable.length; localCount >= 0; localCount--) {
            if( this._criticalAllocationTable[localCount] && this._criticalAllocationTable[localCount].tag === "heat-sink" )
                this._criticalAllocationTable.splice(localCount, 1);
        }

        this._calc();

        return this._heatSinkType;
    }

    public getCurrentTonnage() {
        return this._currentTonnage;
    }

    public getHeatSinkCriticalRequirements() {

        return this._heatSinkCriticals;
    }

    public getArmorAllocation() {
        return this._armorAllocation;
    }

    public getRemainingTonnage() {

        return this._remainingTonnage;

    }

    public  getMoveHeat(): number {
        return +this._maxMoveHeat;
    }

    public getWeaponHeat(): number {
        return +this._maxWeaponHeat;
    }

    public getActiveWeaponHeat(
        equipmentList: IEquipmentItem[] |  null = null
    ): number {
        if( equipmentList === null ) {
            equipmentList = this.equipmentList
        }
        let rv = 0;

        for( let eq of equipmentList) {
            if( eq.target ) {
                rv += +eq.heat;
            }
        }
        return rv;
    }

    public getTurnHeatDifference(
        equipmentList: IEquipmentItem[] |  null = null
    ): number {
        if( equipmentList === null ) {
            equipmentList = this.equipmentList
        }
        let rv = this.getActiveMoveHeat();
        rv += this.getActiveWeaponHeat(equipmentList);
        rv -= this.getActiveHeatDissipation();

        return rv;
    }

    public applyHeat() {
        this.currentHeat += this.getTurnHeatDifference();

        if( this.currentHeat < 0 ) {
            this.currentHeat = 0;
        }
    }

    public getActiveMoveHeat(): number {
        // TODO check if heat sinks are broken
        if( this.currentMovementMode === "w" ) {
            return 1;
        }
        if( this.currentMovementMode === "r" ) {
            return 2;
        }
        if( this.currentMovementMode === "j" ) {
            if( this.currentTargetJumpingMP > 3 ) {
                return this.currentTargetJumpingMP
            }
            return 3;
        }
        return 0;
    }

    public getActiveHeatDissipation(): number {
        // TODO check if heat sinks are broken
        return this._heatDissipation;
    }

    public getHeatDissipation(): number {
        return this._heatDissipation;
    }

    public getHeatSummary(): number {
        // return  (10 + this._additionalHeatSinks) * this._heatSinkType.dissipation;
        return this.getMoveHeat() + this.getWeaponHeat() - this.getHeatDissipation()
    }

    public getWalkSpeed(): number {
        return this._walkSpeed;
    }

    public setWalkSpeed(
        walkSpeed: number,
    ) {
        this._walkSpeed = walkSpeed
        this.setEngine(this._tonnage * this._walkSpeed);

        if( this._jumpSpeed > this._walkSpeed)
            this.setJumpSpeed(this._walkSpeed);

        return this._walkSpeed;
    }

    public getRunSpeed() {
        return this._runSpeed;
    }

    public getJumpSpeed() {
        return this._jumpSpeed;
    }

    public setJumpSpeed(
        jumpSpeed: number,
    ) {
        this._jumpSpeed = +jumpSpeed;
        this._calc();
        return this._jumpSpeed;
    }

    public getArmorWeight() {
        return this._armorWeight;
    }

    public getArmorType() {
        return this._armorType.tag;
    }

    public getArmorObj() {
        return this._armorType;
    }

    public setArmorType(armorTag: string) {
        for( let aCount = 0; aCount < mechArmorTypes.length; aCount++) {
            if( mechArmorTypes[aCount].tag === armorTag) {
                this._armorType = mechArmorTypes[aCount];
                this._calc();
            }
        }
        return this._armorType;
    }

    public setArmorCount( armorCount: number ) {

        // console.log("setArmorCount", armorCount)
        this._totalArmor = armorCount; // ;
        this._armorWeight = armorCount / 16

        // switch( this.getArmorType() ) {

        // default: // standard
        // _totalArmor = this._armorWeight * 16;
        // break;
        // }
        if( this.getTech().tag === "clan" ) {
            // console.log("AW clan: ", this._totalArmor, this.getArmorObj().armorMultiplier.is, this._totalArmor / this.getArmorObj().armorMultiplier.clan, this.getArmorObj().name )
            this._armorWeight = this._totalArmor / this.getArmorObj().armorMultiplier.clan;
        } else {
            // console.log("AW is: ", this._totalArmor, this.getArmorObj().armorMultiplier.is, this._totalArmor / this.getArmorObj().armorMultiplier.is, this.getArmorObj().name )
            this._armorWeight = this._totalArmor / this.getArmorObj().armorMultiplier.is;

        }
        if( this._armorWeight % .5 !== 0  ) {
            // and odd weight, likely wasted armor
            // console.log("AW is an odd weight, likely wasted armor: ", this._armorWeight, this._totalArmor )
            this._armorWeight = Math.ceil(this._armorWeight*2)/2;
            if( this.getTech().tag === "clan" ) {
                // this._totalArmor = this._armorWeight * this.getArmorObj().armorMultiplier.clan;
                this._maxArmor = this._armorWeight * this.getArmorObj().armorMultiplier.clan;
            } else {
                this._maxArmor = this._armorWeight * this.getArmorObj().armorMultiplier.is;
            }
            // console.log("Asjusted weight/max armor/current armor: ", this._armorWeight, this._maxArmor, this._totalArmor )
        }

    }

    public getTotalArmor() {
        return this._totalArmor;
    }

    public getUnallocatedArmor() {
        return this._unallocatedArmor;
    }

    public setArmorWeight(
        armorWeight: number,
    ) {
        this._armorWeight = armorWeight;
        this._calc();
        return this._armorWeight;
    }

    public getEngine(): IEngineOption | null {
        return this._engine;
    }

    public setEngine(
        ratingNumber: number
    ) {
        ratingNumber = ratingNumber / 1;
        for( let engine of mechEngineOptions ) {
            if(engine.rating === ratingNumber) {
                this._engine = engine;
                this._calc();
                return this._engine;
            }
        }
        this._calc();
        return 0;
    }

    public getInternalStructureType() {
        return this._selectedInternalStructure.tag;
    }

    public getInternalStructure() {
        return this._internalStructure;
    }

    public setInternalStructureType(
        isTag: string,
    ) {
        for( let is of mechInternalStructureTypes) {
            if( isTag === is.tag) {
                this._selectedInternalStructure = is;
                return this._selectedInternalStructure;
            }
        }

        return null;
    }

    public getGyro() {
        return this._gyro;
    }

    public getEra() {
        return this._era;
    }

    public getCriticals() {
        this._trimCriticals();
        return this._criticals;
    }

    public toggleCritical(
        location: string,
        critSlotIndex: number
    ) {

        if( typeof( this.criticalDamage ) === "undefined" ) {
            this.criticalDamage = {};
        }

        if( typeof( this.criticalDamage[location] ) === "undefined" ) {
            this.criticalDamage[location] = [];
        }

        let indexNumber = this.criticalDamage[location].indexOf( critSlotIndex );
        if( indexNumber === - 1 ) {
            this.criticalDamage[location].push( critSlotIndex );
        } else {
            this.criticalDamage[location].splice( indexNumber, 1);
        }

        this._calc();
    }

    public isCriticalDamaged(
        location: string,
        critSlotIndex: number
    ): boolean  {
        if( typeof( this.criticalDamage[location] ) === "undefined" ) {
            this.criticalDamage[location] = [];
        }

        if( this.criticalDamage[location].indexOf( critSlotIndex ) === - 1 ) {
            return false
        } else {
            return true;
        }
    }

    public getUnallocatedCriticals() {
        return this._unallocatedCriticals;
    }

    public setEra(
        eraTag: string,
    ) {

        for( let era of btEraOptions ) {
            if( eraTag === era.tag) {
                this._era = era;
                this._calc();
                return this._era;
            }
        }
        return null;
    }

    public getTech() {
        return this._tech;
    }

    public setTech(
        techTag: string,
    ) {
        for( let technology of btTechOptions ) {
            if( techTag === technology.tag) {
                this._tech = technology;
                this._calc();

                // set era to Clan Invasion (id 3) if the techID is 2 (Clan)
                // if( techID === 2 && this.getEra().id !== 3) {
                //     this.setEra(3);
                // }

                return this._tech;
            }
        }
        return null;
    }

    public getMechType() {
        return this._mechType;
    }

    public getAlphaStrikeForceStats() {
        return this.calcAlphaStrike();
    }

    public getPilot() {
        return this._pilot;
    }

    public setPilotName(
        newValue: string,
    ) {
        this._pilot.name = newValue;
    }

    public setPilotPiloting(
        newValue: number,
    ) {
        this._pilot.piloting = newValue;
        this._calcBattleValue();
    }

    public setPilotGunnery(
        newValue: number,
    ) {
        this._pilot.gunnery = newValue;
        this._calcBattleValue();
    }

    public setEngineType(
        engineTag: string,
    ) {
        for( let engine of mechEngineTypes) {
            if( engineTag.toLowerCase() === engine.tag) {
                this._engineType = engine;
                this._calc();
                return this._engineType;
            }
        }
        // default to Military Standard if tag not found.
        this._engineType = mechEngineTypes[0];
        return this._engineType;
    }

    public setGyroTypeByName(
        gyroName: string,
    ) {
        for( let gyro of mechGyroTypes) {
            if(
                gyroName.toLowerCase().trim() === gyro.name.toLowerCase().trim()
                ||
                (
                    gyro.alternateName &&
                    gyroName.toLowerCase().trim() === gyro.alternateName.toLowerCase().trim()
                )

            ) {
                this._gyro = gyro;
                this._calc();
                return this._gyro;
            }
        }
        // default to Military Standard if tag not found.
        this._engineType = mechEngineTypes[0];
        return this._engineType;
    }
    public setEngineTypeByName(
        engineName: string,
    ) {
        for( let engine of mechEngineTypes) {
            if(
                engineName.toLowerCase().trim() === engine.name.toLowerCase().trim()
                ||
                (
                    engine.alternateName &&
                    engineName.toLowerCase().trim() === engine.alternateName.toLowerCase().trim()
                )

            ) {
                this._engineType = engine;
                this._calc();
                return this._engineType;
            }
        }
        // default to Military Standard if tag not found.
        this._engineType = mechEngineTypes[0];
        return this._engineType;
    }

    setGyroType(
        gyroType: string,
    ) {
        for( let gyro of mechGyroTypes) {
            if( gyroType.toLowerCase() === gyro.tag) {
                this._gyro = gyro;
                this._calc();
                return this._gyro;
            }
        }
        // default to Military Standard if tag not found.
        this._gyro = mechGyroTypes[0];
        return this._gyro;
    }

    getEngineType() {
        return this._engineType;
    }

    getEngineName(): string {
        return this._engineType.name;
    }

    getHeatSyncName() {

        if( this._heatSinkType.tag === "single" ) {
            return "Single Heat Sinks";
        } else {
            return "Double Heat Sinks";
        }

    }

    getGyroName() {
        return this._gyro.name;
    }

    getName() {

        let name = "";
        if( this._name ) {
            name = " " + this._name;
        }
        if( this._nickname && this._nickname.trim() ) {
            let rv = this._nickname.trim();

            if( this._model && this._model.trim() )
                rv += " ( " + this._model.trim() + name + " )";

            return rv;
        } else {
            if( this._model && this._model.trim() )
                return this._model.trim() + name;
            else
                return "" + name;
        }

    }

    public setModel(
        newValue: string,
    ): string {
        this._model = newValue;
        return this._model;
    }

    public toggleOmni() {
        this._omnimech = !this._omnimech;
    }

    public isUnderStrength(): boolean {

        if(
            this.getArmorPercentage() !== 100
            ||
            this.getStructurePercentage() !== 100
            ||
            this.currentHeat > 0
        ) {
            return true;
        }

        if(
            this.engineHits() > 0
            ||
            this.gyroHits() > 0
            ||
            this.sensorHits() > 0
            ||
            this.lifeSupportHits() > 0
        ) {
            return true;
        }

        for( let area of Object.keys(this._criticals) )  {
            for( let crit of this._criticals[area] ) {
                if( crit && crit.damaged ) {
                    return true;
                }
            }
        }

        if( this.pilot.wounds > 0 )
            return true;


        return false;
    }

    public resetDamage(): void {
        for( let area of Object.keys(this._criticals) )  {
            for( let crit of this._criticals[area] ) {
                if( crit && crit.damaged ) {
                    crit.damaged = false;
                }
            }
        }

        for( let crit of this._criticalAllocationTable )  {
            if( crit && crit.damaged ) {
                crit.damaged = false;
            }

        }

        for( let dotIndex in this._armorBubbles.head ) {
            this._armorBubbles.head[dotIndex] = true;
        }

        for( let dotIndex in this._armorBubbles.centerTorso ) {
            this._armorBubbles.centerTorso[dotIndex] = true;
        }
        for( let dotIndex in this._armorBubbles.rightTorso ) {
            this._armorBubbles.rightTorso[dotIndex] = true;
        }
        for( let dotIndex in this._armorBubbles.leftTorso ) {
            this._armorBubbles.leftTorso[dotIndex] = true;
        }

        for( let dotIndex in this._armorBubbles.centerTorsoRear ) {
            this._armorBubbles.centerTorsoRear[dotIndex] = true;
        }
        for( let dotIndex in this._armorBubbles.rightTorsoRear ) {
            this._armorBubbles.rightTorsoRear[dotIndex] = true;
        }
        for( let dotIndex in this._armorBubbles.leftTorsoRear ) {
            this._armorBubbles.leftTorsoRear[dotIndex] = true;
        }

        for( let dotIndex in this._armorBubbles.rightArm ) {
            this._armorBubbles.rightArm[dotIndex] = true;
        }
        for( let dotIndex in this._armorBubbles.leftArm ) {
            this._armorBubbles.leftArm[dotIndex] = true;
        }

        for( let dotIndex in this._armorBubbles.rightLeg ) {
            this._armorBubbles.rightLeg[dotIndex] = true;
        }
        for( let dotIndex in this._armorBubbles.leftLeg ) {
            this._armorBubbles.leftLeg[dotIndex] = true;
        }



        for( let dotIndex in this._structureBubbles.head ) {
            this._structureBubbles.head[dotIndex] = true;
        }

        for( let dotIndex in this._structureBubbles.centerTorso ) {
            this._structureBubbles.centerTorso[dotIndex] = true;
        }
        for( let dotIndex in this._structureBubbles.rightTorso ) {
            this._structureBubbles.rightTorso[dotIndex] = true;
        }
        for( let dotIndex in this._structureBubbles.leftTorso ) {
            this._structureBubbles.leftTorso[dotIndex] = true;
        }

        for( let dotIndex in this._structureBubbles.rightArm ) {
            this._structureBubbles.rightArm[dotIndex] = true;
        }
        for( let dotIndex in this._structureBubbles.leftArm ) {
            this._structureBubbles.leftArm[dotIndex] = true;
        }

        for( let dotIndex in this._structureBubbles.rightLeg ) {
            this._structureBubbles.rightLeg[dotIndex] = true;
        }
        for( let dotIndex in this._structureBubbles.leftLeg ) {
            this._structureBubbles.leftLeg[dotIndex] = true;
        }

        this.currentHeat = 0;

        this.pilot.wounds = 0;
    }


    public get isOmnimech(): boolean {
        return this._omnimech;
    }

    public setName(
        newValue: string,
    ): string {
        this._name = newValue;
        return this._name;
    }

    public get name(): string {
        return this._name;
    }

    public getTonnage() {
        return this._tonnage;
    }

    public setTonnage(
        tonnage: number,
    ) {

        this._tonnage = tonnage;
        this._internalStructure.head = this._selectedInternalStructure.perTon[this.getTonnage()].head;

        this._internalStructure.centerTorso = this._selectedInternalStructure.perTon[this.getTonnage()].centerTorso;
        this._internalStructure.leftTorso = this._selectedInternalStructure.perTon[this.getTonnage()].rlTorso;
        this._internalStructure.rightTorso = this._selectedInternalStructure.perTon[this.getTonnage()].rlTorso;

        this._internalStructure.rightArm = this._selectedInternalStructure.perTon[this.getTonnage()].rlArm;
        this._internalStructure.leftArm = this._selectedInternalStructure.perTon[this.getTonnage()].rlArm;

        this._internalStructure.rightLeg = this._selectedInternalStructure.perTon[this.getTonnage()].rlLeg;
        this._internalStructure.leftLeg = this._selectedInternalStructure.perTon[this.getTonnage()].rlLeg;

        this._maxArmor = 9 + this._internalStructure.centerTorso * 2 + this._internalStructure.leftTorso * 2 + this._internalStructure.rightTorso * 2 + this._internalStructure.rightLeg * 2 + this._internalStructure.leftLeg * 2;
        if( this._mechType.tag.toLowerCase() === "biped" )
            this._maxArmor += this._internalStructure.leftArm * 2 + this._internalStructure.rightArm * 2;
        else
            this._maxArmor += this._internalStructure.rightLeg * 2 + this._internalStructure.leftLeg * 2;

        if( this._mechType.tag.toLowerCase() === "quad" ) {
            this._internalStructure.rightArm = this._internalStructure.rightLeg;
            this._internalStructure.leftArm = this._internalStructure.leftLeg;
        }

        // this._maxArmorTonnage = this._maxArmor / 16;

        this._totalInternalStructurePoints = 0;

        this._totalInternalStructurePoints += this._internalStructure.head;

        this._totalInternalStructurePoints += this._internalStructure.centerTorso;
        this._totalInternalStructurePoints += this._internalStructure.leftTorso;
        this._totalInternalStructurePoints += this._internalStructure.rightTorso;

        this._totalInternalStructurePoints += this._internalStructure.rightArm;
        this._totalInternalStructurePoints += this._internalStructure.leftArm;

        this._totalInternalStructurePoints += this._internalStructure.rightLeg;
        this._totalInternalStructurePoints += this._internalStructure.leftLeg;

        this.setWalkSpeed(this._walkSpeed);
        this._calc();

        return this._tonnage;
    }

    getMaxArmorTonnage() {
        let rv = 0;


        rv += 9; // head

        rv += this._internalStructure.centerTorso * 2;
        rv += this._internalStructure.leftTorso * 4;
        rv += this._internalStructure.rightArm * 4;
        rv += this._internalStructure.rightLeg * 4;

        rv = Math.ceil(rv / 16);

        return rv;
    }

    getMaxArmor() {
        let rv = 0;


        rv += this._internalStructure.head;

        rv += this._internalStructure.centerTorso * 2;
        rv += this._internalStructure.leftTorso * 4;
        rv += this._internalStructure.rightArm * 4;
        rv += this._internalStructure.rightLeg * 4;

        return rv;
    }

    // public getMaxArmor() {
    //     return this._maxArmor;
    // }

    public getType() {
        return this._mechType;
    }

    public setType(
        typeTag: string,
    ) {
        for( let mechType of mechTypeOptions) {
            if( mechType.tag === typeTag ) {
                this._mechType = mechType;
                this.setTonnage(this._tonnage);
                if( typeTag === "quad" )
                    this._clearArmCriticalAllocationTable();
                this._calc();
                return this._mechType;
            }
        }
    }

    public exportJSON(
        noInPlayVariables: boolean = false,
    ): string {
        return JSON.stringify( this.export(noInPlayVariables) )
    }

    public getTargetSummaryText(
        target: string
    ): string {
        let targetData = this.getTarget(target);

        if( targetData ) {
            if( targetData.active ) {
                return "MOVE: " + targetData.movement + " | RANGE: "+ targetData.range + " | OTHER: " + targetData.otherMods;
            } else {
                return "No Active Target";
            }
        }
        return "No Active Target";
    }

    public export(
        noInPlayVariables: boolean = false,
    ):IBattleMechExport {
        this._calc();
        this.calcAlphaStrike();

        // In Play Variables
        let _currentHeat = 0;

        let _targetAToHit: ITargetToHit | null = null;
        let _targetBToHit: ITargetToHit | null = null;
        let _targetCToHit: ITargetToHit | null = null;

        let _armorBubbles: IMechDamageAllocation | null = null;
        let _structureBubbles: IMechDamageAllocation | null = null;

        let _selectedMech = false;

        let _currentMovementMode = "";
        let _currentToHitMovementModifier = -1;
        let _currentTargetModifier = 0;
        let _currentTargetJumpingMP = 0;

        if( !noInPlayVariables ) {
            _currentHeat = this.currentHeat;

            _targetAToHit = this._targetAToHit;
            _targetBToHit = this._targetBToHit;
            _targetCToHit = this._targetCToHit;

            _armorBubbles = this._armorBubbles;
            _structureBubbles = this._structureBubbles;
            _selectedMech = this.selectedMech;

            _currentMovementMode = this.currentMovementMode;
            _currentToHitMovementModifier = this.currentToHitMovementModifier;
            _currentTargetModifier = this.currentTargetModifier;
            _currentTargetJumpingMP = this.currentTargetJumpingMP;
        }
        let thinnedAllocations: ICriticalSlot[] = JSON.parse(JSON.stringify(this._criticalAllocationTable));


        for( let alloc of thinnedAllocations ) {
            delete alloc.obj
            delete alloc.damaged
        }

        let exportObject: IBattleMechExport = {


            // Non In-Play Variables
            // important info at the top for easy perusing
            model: this._model,
            name: this._name,
            tech: this._tech.tag,
            tech_label: this.getTech().name,
            tonnage: this.getTonnage(),
            as_role: this._alphaStrikeForceStats.role,
            as_value: this.getAlphaStrikeValue(),
            battle_value: this.getBattleValue(),
            c_bills: this.getCBillCost(),

            omnimech: this._omnimech,

            additionalHeatSinks: this._additionalHeatSinks,
            allocation: thinnedAllocations,
            armor_allocation: this._armorAllocation,
            armor_type: this.getArmorType(),
            armor_weight: this._armorWeight,
            engineType: this.getEngineType().tag,
            equipment: [],
            era: this._era.tag,
            features: [],
            gyro: this._gyro.tag,
            heat_sink_type: this.getHeatSinksType(),
            hideNonAvailableEquipment: this._hideNonAvailableEquipment,
            introductoryRules: this._introductoryRules,
            is_type: this.getInternalStructureType(),
            jumpSpeed: this._jumpSpeed,
            lastUpdated: new Date(),
            mechType: this._mechType.tag,
            mirrorArmorAllocations: this._mirrorArmorAllocations,
            nickname: this._nickname,
            strictEra: this._strictEra,
            uuid: this._uuid,
            walkSpeed: this._walkSpeed,
        };

        if( !noInPlayVariables ) {
            exportObject.as_custom_nickname = this._alphaStrikeForceStats.customName;
            exportObject.pilot = this._pilot.export();
            exportObject.armorBubbles = _armorBubbles;
            exportObject.criticalDamage = this.criticalDamage;
            exportObject.currentHeat = _currentHeat;
            exportObject.currentMovementMode =_currentMovementMode;
            exportObject.currentTargetJumpingMP =_currentTargetJumpingMP;
            exportObject.currentTargetModifier =_currentTargetModifier;
            exportObject.currentToHitMovementModifier =_currentToHitMovementModifier;
            exportObject.damageLog = this.damageLog;
            exportObject.selectedMech = _selectedMech;
            exportObject.structureBubbles = _structureBubbles;
            exportObject.targetAToHit = _targetAToHit;
            exportObject.targetBToHit = _targetBToHit;
            exportObject.targetCToHit = _targetCToHit;
        }

        for( let countEQ = 0; countEQ < this._equipmentList.length; countEQ++) {
            if( noInPlayVariables ) {
                exportObject.equipment.push({
                    tag: this._equipmentList[countEQ].tag,
                    loc: this._equipmentList[countEQ].location,
                    //@ts-ignore - yet another TS failure
                    allocationIndex: typeof(this._equipmentList[countEQ].allocationIndex) !== "undefined" ? this._equipmentList[countEQ].allocationIndex : -1,
                    //@ts-ignore - yet another TS failure
                    allocationLocation: typeof(this._equipmentList[countEQ].allocationLocation) !== "undefined" ? this._equipmentList[countEQ].allocationLocation : "",
                    rear: this._equipmentList[countEQ].rear,
                    uuid: this._equipmentList[countEQ].uuid,
                    weight: this._equipmentList[countEQ].weight,
                    split_location: this._equipmentList[countEQ].split_location,

                });
            } else {
                exportObject.equipment.push({
                    tag: this._equipmentList[countEQ].tag,
                    loc: this._equipmentList[countEQ].location,
                    //@ts-ignore - yet another TS failure
                    allocationIndex: typeof(this._equipmentList[countEQ].allocationIndex) !== "undefined" ? this._equipmentList[countEQ].allocationIndex : -1,
                    //@ts-ignore - yet another TS failure
                    allocationLocation: typeof(this._equipmentList[countEQ].allocationLocation) !== "undefined" ? this._equipmentList[countEQ].allocationLocation : "",
                    rear: this._equipmentList[countEQ].rear,
                    weight: this._equipmentList[countEQ].weight,
                    uuid: this._equipmentList[countEQ].uuid,
                    target: this._equipmentList[countEQ].target,
                    resolved: this._equipmentList[countEQ].resolved,
                    damageClusterHits: this._equipmentList[countEQ].damageClusterHits,
                    split_location: this._equipmentList[countEQ].split_location,
                    currentAmmo: this._equipmentList[countEQ].currentAmmo,
                    selectedAmmoBinUUID: this._equipmentList[countEQ].selectedAmmoBinUUID,
                });
            }

        }

        if( !this.hasLowerArmActuator( "la" ))
            exportObject.features.push( "no_lala" );
        if( !this.hasLowerArmActuator( "ra" ))
            exportObject.features.push( "no_rala" );
        if( !this.hasHandActuator( "la" ))
            exportObject.features.push( "no_laha" );
        if( !this.hasHandActuator( "ra" ))
            exportObject.features.push( "no_raha" );
        if( this._smallCockpit)
            exportObject.features.push( "sm_cockpit" );


            return exportObject;
    }

    public getInteralStructure() {
        return this._internalStructure;
    }

    public setASRole(
        newValue: string,
    ) {
        return this._alphaStrikeForceStats.role = newValue;
    }

    public getASRole(): string {
        return this._alphaStrikeForceStats.role;
    }

    public setASCustomName(
        newValue: string,
    ) {
        return this._alphaStrikeForceStats.customName = newValue;
    }

    public getASCustomName() {
        return this._alphaStrikeForceStats.customName;
    }

    importJSON(
        jsonString: string,
    ) {
        // let importObject: IBattleMechExport | null = null;
        let importObject: IBattleMechExport | null = null;
        try {
            importObject = JSON.parse(jsonString);

            if( importObject ) {
                return this.import( importObject );
            } else {
                return false
            }
        } catch (err) {
            return false;
        }
    }

    public cycleWeaponTarget(
        weaponIndex: number
    ) {
        if( this._equipmentList.length > weaponIndex ) {
            if( typeof(this._equipmentList[weaponIndex].target) === "undefined" ) {
                this._equipmentList[weaponIndex].target = "";
            }

            if( this._equipmentList[weaponIndex].target === "" ) {
                if( this._targetAToHit && this._targetAToHit.active ) {
                    this._equipmentList[weaponIndex].target = "a";
                    return;
                }
                if( this._targetBToHit && this._targetBToHit.active ) {
                    this._equipmentList[weaponIndex].target = "b";
                    return;
                }
                if( this._targetCToHit && this._targetCToHit.active ) {
                    this._equipmentList[weaponIndex].target = "c";
                    return;
                }
                console.warn( "cycleWeaponTarget No Active Targets!" )
                return;
            }

            if( this._equipmentList[weaponIndex].target === "a" ) {
                if( this._targetBToHit && this._targetBToHit.active ) {
                    this._equipmentList[weaponIndex].target = "b";
                    return;
                } else if( this._targetCToHit && this._targetCToHit.active ) {
                    this._equipmentList[weaponIndex].target = "c";
                    return;
                } else {
                    this._equipmentList[weaponIndex].target = "";
                    return;
                }
            }

            if( this._equipmentList[weaponIndex].target === "b" ) {
                if( this._targetCToHit && this._targetCToHit.active ) {
                    this._equipmentList[weaponIndex].target = "c";
                    return;
                } else {
                    this._equipmentList[weaponIndex].target = "";
                    return;
                }
            }

            if( this._equipmentList[weaponIndex].target === "c" ) {
                this._equipmentList[weaponIndex].target = "";
                return;
            }
        }
    }

    import(
        importObject: IBattleMechExport,
    ) {

        this.selectedMech = false;
        if( importObject && importObject.selectedMech ) {
            this.selectedMech = true;
        }

        if( importObject && importObject.criticalDamage ) {
            this.criticalDamage = importObject.criticalDamage;
        }

        if( importObject && importObject.omnimech ) {
            this._omnimech = importObject.omnimech;
        }

        if( importObject && importObject.currentHeat ) {
            this.currentHeat = importObject.currentHeat;
        }

        if( importObject && importObject.damageLog ) {
            this.damageLog = importObject.damageLog;
        }

        if( importObject && importObject.targetAToHit ) {
            this._targetAToHit = importObject.targetAToHit;
        }
        if( importObject && importObject.targetBToHit ) {
            this._targetBToHit = importObject.targetBToHit;
        }
        if( importObject && importObject.targetCToHit ) {
            this._targetCToHit = importObject.targetCToHit;
        }

        if( importObject && importObject.currentMovementMode ) {
            this.currentMovementMode = importObject.currentMovementMode;
        }

        if( importObject && importObject.currentTargetModifier ) {
            this.currentTargetModifier = importObject.currentTargetModifier;
        }

        if( importObject && importObject.currentToHitMovementModifier ) {
            this.currentToHitMovementModifier = importObject.currentToHitMovementModifier;
        }

        if( importObject && importObject.currentTargetJumpingMP ) {
            this.currentTargetJumpingMP = importObject.currentTargetJumpingMP;
        }

        if( importObject && importObject.mechType  ) {
            if( importObject.name )
                this.setName(importObject.name);
            if( importObject.model )
                this.setModel(importObject.model);

            // console.log( "importObject.mechType", importObject.mechType );
            if( importObject.mechType)
                this.setMechType(importObject.mechType);

            this.setTonnage(importObject.tonnage);

            if( importObject.lastUpdated ) {
                this._lastUpdated = new Date( importObject.lastUpdated )
            }

            this._mirrorArmorAllocations = false;
            if( importObject.mirrorArmorAllocations ) {
                this._mirrorArmorAllocations = true;
            }

            this._introductoryRules = false;
            if( importObject.introductoryRules ) {
                this._introductoryRules = true;
            }

            this._hideNonAvailableEquipment = importObject.hideNonAvailableEquipment;
            if( importObject.era)
                this.setEra(importObject.era);

            if( importObject.tech)
                this.setTech(importObject.tech);

            if( importObject.pilot)
                this._pilot = new Pilot(importObject.pilot);

            if( importObject.as_role)
                this.setASRole(importObject.as_role);

            if( importObject.armor_type)
                this.setArmorType(importObject.armor_type);

            if( importObject.as_custom_nickname)
                this.setASCustomName(importObject.as_custom_nickname);

            if( importObject.is_type)
                this.setInternalStructureType(importObject.is_type);

            if( importObject.walkSpeed)
                this.setWalkSpeed(importObject.walkSpeed);

            if( importObject.jumpSpeed)
                this.setJumpSpeed(importObject.jumpSpeed);

            if( typeof(importObject.strictEra) !== "undefined" ) {
                if( importObject.strictEra)
                    this._strictEra = true;
                else
                    this._strictEra = false;
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
                this._armorAllocation = importObject.armor_allocation;

            if( importObject.uuid)
                this._uuid = importObject.uuid;

            this._nickname = "";
            if( importObject.nickname)
                this._nickname = importObject.nickname;

            if( importObject.features) {

                // Lower Arm Actuators
                if( importObject.features.indexOf( "no_rala" ) > -1)
                    this.removeLowerArmActuator( "ra" );
                if( importObject.features.indexOf( "no_lala" ) > -1)
                    this.removeLowerArmActuator( "la" );

                // Hand Actuators
                if( importObject.features.indexOf( "no_raha" ) > -1)
                    this.removeHandActuator( "ra" );
                if( importObject.features.indexOf( "no_laha" ) > -1)
                    this.removeHandActuator( "la" );

                // Small Cockpit
                if( importObject.features.indexOf( "sm_cockpit" ) > -1)
                    this._smallCockpit = true;

                // Other features
            }

            if( importObject.equipment) {
                for( let countEQ = 0; countEQ < importObject.equipment.length; countEQ++) {

                    let importItem = importObject.equipment[countEQ];

                    if( importItem.rear)
                        importItem.rear = true;
                    else
                        importItem.rear = false;

                    if( !importItem.target ) {
                        importItem.target = ""
                    }

                    if( !importItem.resolved ) {
                        importItem.resolved = false
                    }

                    if( !importItem.damageClusterHits ) {
                        importItem.damageClusterHits = []
                    }

                    // console.log("X", this.getName(), importItem.tag, importItem.split_location);
                    this.addEquipmentFromTag(
                        importItem.tag,
                        this.getTech().tag,
                        importItem.loc,
                        importItem.rear,
                        importItem.uuid,
                        importItem.target,
                        importItem.resolved,
                        undefined,
                        importItem.weight,
                        importItem.split_location,
                        importItem.currentAmmo,
                        importItem.selectedAmmoBinUUID,
                    );
                }
            }

            if( importObject.allocation) {

                importObject.allocation.sort(
                    (a, b) => {
                        if( a.uuid > b.uuid ) {
                            return -1;
                        } else if( a.uuid < b.uuid ) {
                            return 1;
                        } else {
                            return 0
                        }
                    }
                )

                // console.log( "importObject.allocation", this.getName(), importObject.allocation);
                this._criticalAllocationTable = importObject.allocation;

                for( let countEQ = 0; countEQ < this._criticalAllocationTable.length; countEQ++) {

                    this._criticalAllocationTable[countEQ].obj = this.getEquipmentByUUID( this._criticalAllocationTable[countEQ].uuid )

                    if( this._criticalAllocationTable[countEQ].rear)
                        this._criticalAllocationTable[countEQ].rear = true;
                    else
                        this._criticalAllocationTable[countEQ].rear = false;

                    if( this._criticalAllocationTable[countEQ].damaged)
                        this._criticalAllocationTable[countEQ].damaged = true;
                    else
                        this._criticalAllocationTable[countEQ].damaged = false;
                }
            }

            if( importObject && importObject.structureBubbles ) {
                this._structureBubbles = importObject.structureBubbles;
            }

            if( importObject && importObject.armorBubbles ) {
                this._armorBubbles = importObject.armorBubbles;
            }

            this._calc();
            return true;
        } else {
            return false;
        }

    }

    getEquipmentByUUID(
        uuid: string,
    ): IEquipmentItem | null {
        for( let eq of this._equipmentList ) {
            if( eq.uuid === uuid ) {
                return eq;
            }
        }
        return null;
    }

    public getWeightBreakdown() {
        return this._weights;
    }

    public setCenterTorsoArmor(
        armorValue: number,
    ) {
        this._armorAllocation.centerTorso = armorValue;
        this._calc();
        return this._armorAllocation.centerTorso;
    }

    public setCenterTorsoRearArmor(
        armorValue: number,
    ) {
        this._armorAllocation.centerTorsoRear = armorValue;
        this._calc();
        return this._armorAllocation.centerTorsoRear;
    }

    public setHeadArmor(
        armorValue: number,
    ) {
        this._armorAllocation.head = armorValue;
        this._calc();
        return this._armorAllocation.head;
    }

    public setLeftArmArmor(
        armorValue: number,
    ) {
        this._armorAllocation.leftArm = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.rightArm = armorValue;
        }
        this._calc();
        return this._armorAllocation.leftArm;
    }

    public setLeftLegArmor(
        armorValue: number,
    ) {
        this._armorAllocation.leftLeg = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.rightLeg = armorValue;
        }
        this._calc();
        return this._armorAllocation.leftLeg;
    }

    public setLeftTorsoArmor(
        armorValue: number,
    ) {
        this._armorAllocation.leftTorso = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.rightTorso = armorValue;
        }
        this._calc();
        return this._armorAllocation.leftTorso;
    }

    public setLeftTorsoRearArmor(
        armorValue: number,
    ) {
        this._armorAllocation.leftTorsoRear = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.rightTorsoRear = armorValue;
        }
        this._calc();
        return this._armorAllocation.leftTorsoRear;
    }

    public setRightArmArmor(
        armorValue: number,
    ) {
        this._armorAllocation.rightArm = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.leftArm = armorValue;
        }
        this._calc();
        return this._armorAllocation.rightArm;
    }

    public setRightLegArmor(
        armorValue: number,
    ) {
        this._armorAllocation.rightLeg = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.leftLeg = armorValue;
        }
        this._calc();
        return this._armorAllocation.rightLeg;
    }

    public setRightTorsoArmor(
        armorValue: number,
    ) {
        this._armorAllocation.rightTorso = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.leftTorso = armorValue;
        }
        this._calc();
        return this._armorAllocation.rightTorso;
    }

    public setRightTorsoRearArmor(
        armorValue: number,
    ) {
        this._armorAllocation.rightTorsoRear = armorValue;
        if( this._mirrorArmorAllocations ) {
            this._armorAllocation.leftTorsoRear = armorValue;
        }
        this._calc();
        return this._armorAllocation.rightTorsoRear;
    }

    public getAdditionalHeatSinks() {
        return this._additionalHeatSinks;
    };

    public addEquipment(
        equipmentIndex: number,
        equipmentListTag: string,
        location: string,
        rear: boolean = false,
        uuid: string | undefined | null,
        weight: number | undefined,
        split_location: ISplitLocation[],
    ) {
        if( !uuid ) {
            uuid = generateUUID()
        }

        let equipmentList = this.getEquipmentList( equipmentListTag );

        if( equipmentList[equipmentIndex]) {

            let equipmentItem: IEquipmentItem = JSON.parse(JSON.stringify(equipmentList[equipmentIndex]));

            if( typeof(location) !== "undefined" )
                equipmentItem.location = location;

            if( typeof(weight) !== "undefined" )
                equipmentItem.weight = weight;

            equipmentItem.rear = rear;
            equipmentItem.uuid = uuid;
            equipmentItem.split_location = split_location;

            this._equipmentList.push(equipmentItem);
            this._sortInstalledEquipment();

            return equipmentItem;
        }

        return null;
    };


    public addEquipmentByName(
        equipmentName: string,
        equipmentListTag: string,
        location: string,
        rear: boolean = false,
        uuid: string | undefined | null,
        weight: number | undefined,
        split_location: ISplitLocation[],
    ): IEquipmentItem | null {
        if( !uuid ) {
            uuid = generateUUID()
        }

        let equipmentList = this.getEquipmentList( equipmentListTag );

        for( let item of equipmentList ) {
            if(
                item.name.toLowerCase().trim() === equipmentName.toLowerCase().trim()
                    ||
                (item.alternateName && item.alternateName.toLowerCase().trim() === equipmentName.toLowerCase().trim() )
            ) {

                let equipmentItem: IEquipmentItem = JSON.parse(JSON.stringify( item ));

                if( typeof(location) !== "undefined" )
                    equipmentItem.location = location;

                if( typeof(weight) !== "undefined" )
                    equipmentItem.weight = weight;
                equipmentItem.rear = rear;
                equipmentItem.uuid = uuid;
                equipmentItem.split_location = split_location;

                if( equipmentItem.criticalsDivisor && equipmentItem.criticalsDivisor > -1 ) {
                    equipmentItem.criticals = this.getTonnage() / equipmentItem.criticalsDivisor;
                }

                if(  equipmentItem.weightDivisor && equipmentItem.weightDivisor  > -1) {
                    equipmentItem.weight = this.getTonnage() / equipmentItem.weightDivisor;
                }

                this._equipmentList.push(equipmentItem);
                this._sortInstalledEquipment();

                return equipmentItem;
            }
        }

        return null;
    };

    public addEquipmentFromTag(
        equipmentTag: string,
        equipmentListTag: string,
        location: string | undefined,
        rear: boolean = false,
        uuid: string | undefined | null,
        target: string = "",
        resolved: boolean = false,
        damageClusterHits: IClusterHit[] = [],
        weight: number | undefined,
        split_location: ISplitLocation[] | undefined,
        currentAmmo: number = -1,
        selectedAmmoBinUUID: string = "",
    ): IEquipmentItem | null {
        if( !uuid ) {
            uuid = generateUUID()
        }

        if( !equipmentListTag) {
            equipmentListTag = this._tech.tag;
        }

        let equipmentList = this.getEquipmentList( equipmentListTag );

        for( let item of equipmentList ) {
            if( equipmentTag === item.tag) {
                let equipmentItem: IEquipmentItem = JSON.parse(JSON.stringify(item));
                if( typeof(location) !== "undefined" )
                    equipmentItem.location = location;
                equipmentItem.rear = rear;
                equipmentItem.uuid = uuid;
                equipmentItem.target = target;
                equipmentItem.split_location = split_location;
                equipmentItem.resolved = false;

                if( currentAmmo === -1 && equipmentItem.isAmmo ) {
                    equipmentItem.currentAmmo = equipmentItem.ammoPerTon;
                } else {
                    equipmentItem.currentAmmo = currentAmmo;
                }

                equipmentItem.selectedAmmoBinUUID = selectedAmmoBinUUID;

                if( typeof(weight) !== "undefined" )
                    equipmentItem.weight = weight;
                equipmentItem.damageClusterHits = []
                if( resolved ) {
                    equipmentItem.resolved = true;
                }
                if( damageClusterHits ) {
                    equipmentItem.damageClusterHits = damageClusterHits;
                }
                this._equipmentList.push(equipmentItem);

                this._sortInstalledEquipment();
                return equipmentItem;
            }
        }

        return null;
    };

    public removeEquipment(itemUUID: string | undefined) {

        if( itemUUID ) {
            for( let equipmentIndex in this._equipmentList ) {
                if( this._equipmentList[equipmentIndex] && itemUUID === this._equipmentList[equipmentIndex].uuid ) {
                    this._equipmentList.splice(+equipmentIndex, 1);
                    return 1;
                }
            }
        }
        return null;
    };

    public isWrecked(): boolean {

        if( this.isWreckedBlurb() !== "" ) {
            return true;
        }

        return false;
    }

    private _returnRandomString(
        from: string[]
    ): string {
        return from[ Math.floor(Math.random() * from.length) ]
    }

    public hasXLEngine(): boolean {
        if(
            this._engineType && this._engineType.criticals
            && (
                (this._engineType.criticals.clan && this._engineType.criticals.clan.lt && this._engineType.criticals.clan.lt > 0)
                ||
                (this._engineType.criticals.clan && this._engineType.criticals.clan.rt && this._engineType.criticals.clan.rt > 0)
                ||
                (this._engineType.criticals.is && this._engineType.criticals.is.lt && this._engineType.criticals.is.lt > 0)
                ||
                (this._engineType.criticals.is && this._engineType.criticals.is.rt && this._engineType.criticals.is.rt > 0)
            )

        ) {
            return true;
        }

        return false;
    }

    public isWreckedBlurb(): string {

        if(
            this._structureInLocation( "ct" ) < 1
            ||
            (
                this.hasXLEngine()
                &&
                (
                    this._structureInLocation( "lt" ) < 1
                    ||
                    this._structureInLocation( "rt" ) < 1
                )
            )
        ) {
            let damageSnarks: string[] = [
                "Massive hole in chest.",
                "Radiation leak, very dangerous.",
                "Where oh where did my reactor go?",
                "No Reactor. The 'mech will finally cool down!",
            ];
            return this._returnRandomString(damageSnarks);
        }

        if( this._structureInLocation( "hd" ) < 1 ) {
            let damageSnarks: string[] = [
                "Cockpit became a convertible",
                "Mechwarrior missing",
                "User error. Replace user.",
            ];
            return this._returnRandomString(damageSnarks);
        }


        if( this.engineHits() > 2 ) {
            let damageSnarks: string[] = [
                "Engine took too many hits",
                "Some days, even the engine has to take a nap.",
            ];
            return this._returnRandomString(damageSnarks);
        }
        if( this.gyroHits() > 2 ) {
            let damageSnarks: string[] = [
                "Oh man my mech can't keep it's liqueur!",
                "'mech drunk, can't stand",
            ];
            return this._returnRandomString(damageSnarks);
        }
        if( this.lifeSupportHits() > 0 ) {
            let damageSnarks: string[] = [
                "Mechwarrior can't breathe",
                "Needed to open a window to catch some air",
            ];
            return this._returnRandomString(damageSnarks);
        }
        if( this.sensorHits() > 1 ) {
            let damageSnarks: string[] = [
                "I can't see!",
            ];
            return this._returnRandomString(damageSnarks);
        }

        return "";
    }

    public takeDamage(
        amount: number,
        location: string,
        rear: boolean,
    ): IDamageResults[] {

        let rv: IDamageResults[] = [];

        // Check location armor
        // let armorDamage = true;
        // let structureDamage = false;

        let locationHasArmor = this._locationHasArmor(location);
        let locationHasStructure = this._locationHasStructure(location);
        while(
            !locationHasStructure &&
            !locationHasArmor &&
            location !== "ct" &&
            location !== "ctr" &&
            location !== "hd"
        ) {

            location = this._moveDamageLocationIn( location, rear );

            locationHasArmor = this._locationHasArmor(location);
            locationHasStructure = this._locationHasStructure(location);
        }

        if( locationHasArmor ) {
            let remainderDamage = this._takeArmorDamageAtLocation( location, amount );

            if( remainderDamage ) {
                // structureDamage = true;
                remainderDamage = this._takeStructureDamageAtLocation( location, remainderDamage )
                while(
                    remainderDamage > 0 &&
                    location !== "ct" &&
                    location !== "ctr" &&
                    location !== "hd"
                ) {
                    location = this._moveDamageLocationIn( location, rear );
                    remainderDamage = this._takeStructureDamageAtLocation( location, remainderDamage )
                }

            }
        } else if (locationHasStructure) {
            let remainderDamage = this._takeStructureDamageAtLocation( location, amount )
            while(
                remainderDamage > 0 &&
                location !== "ct" &&
                location !== "ctr" &&
                location !== "hd"
            ) {
                location = this._moveDamageLocationIn( location, rear );
                remainderDamage = this._takeStructureDamageAtLocation( location, remainderDamage )
            }

        }

        this._calc();
        return rv;

    }

    private _locationHasArmor(
        location: string
    ): boolean {
        if( this._armorInLocation( location ) > 0 )
            return true;

        return false;
    }

    private _locationHasStructure(
        location: string
    ): boolean {
        if( this._structureInLocation( location ) > 0 )
            return true;

        return false;
    }

    private _structureInLocation(
        location: string
    ): number {
        if( location === "ct" || location === "ctr" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.centerTorso ) {
                if( this._structureBubbles.centerTorso[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "lt" ||  location === "ltr"  ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.leftTorso ) {
                if( this._structureBubbles.leftTorso[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "rt" || location === "rtr" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.rightTorso ) {
                if( this._structureBubbles.rightTorso[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "ra" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.rightArm ) {
                if( this._structureBubbles.rightArm[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "la" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.leftArm ) {
                if( this._structureBubbles.leftArm[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "ll" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.leftLeg ) {
                if( this._structureBubbles.leftLeg[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "rl" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.rightLeg ) {
                if( this._structureBubbles.rightLeg[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        }  else if( location === "hd" ) {
            let count = 0;
            for( let bubbleIndex in this._structureBubbles.head ) {
                if( this._structureBubbles.head[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        }
        return -1;
    }

    private _armorInLocation(
        location: string
    ): number {
        if( location === "ct" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.centerTorso ) {
                if( this._armorBubbles.centerTorso[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "ctr" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.centerTorsoRear ) {
                if( this._armorBubbles.centerTorsoRear[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "lt" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.leftTorso ) {
                if( this._armorBubbles.leftTorso[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "ltr" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.leftTorsoRear ) {
                if( this._armorBubbles.leftTorsoRear[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "rt" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.rightTorso ) {
                if( this._armorBubbles.rightTorso[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "rtr" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.rightTorsoRear ) {
                if( this._armorBubbles.rightTorsoRear[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "ra" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.rightArm ) {
                if( this._armorBubbles.rightArm[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "la" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.leftArm ) {
                if( this._armorBubbles.leftArm[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "ll" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.leftLeg ) {
                if( this._armorBubbles.leftLeg[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        } else if( location === "rl" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.rightLeg ) {
                if( this._armorBubbles.rightLeg[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        }  else if( location === "hd" ) {
            let count = 0;
            for( let bubbleIndex in this._armorBubbles.head ) {
                if( this._armorBubbles.head[bubbleIndex] ) {
                    count++;
                }
            }
            return count;

        }
        return -1;
    }

    private _takeArmorDamageAtLocation (
        location: string,
        amount: number,
    ): number {
        let damageTaken = 0;
        if( location === "ct" ) {
            for( let bubbleIndex in this._armorBubbles.centerTorso ) {
                if( this._armorBubbles.centerTorso[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.centerTorso[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "ctr" ) {
            for( let bubbleIndex in this._armorBubbles.centerTorsoRear ) {
                if( this._armorBubbles.centerTorsoRear[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.centerTorsoRear[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "lt" ) {
            for( let bubbleIndex in this._armorBubbles.leftTorso ) {
                if( this._armorBubbles.leftTorso[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.leftTorso[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "ltr" ) {
            for( let bubbleIndex in this._armorBubbles.leftTorsoRear ) {
                if( this._armorBubbles.leftTorsoRear[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.leftTorsoRear[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "rt" ) {
            for( let bubbleIndex in this._armorBubbles.rightTorso ) {
                if( this._armorBubbles.rightTorso[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.rightTorso[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "rtr" ) {
            for( let bubbleIndex in this._armorBubbles.rightTorsoRear ) {
                if( this._armorBubbles.rightTorsoRear[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.rightTorsoRear[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "ra" ) {
            for( let bubbleIndex in this._armorBubbles.rightArm ) {
                if( this._armorBubbles.rightArm[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.rightArm[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "la" ) {
            for( let bubbleIndex in this._armorBubbles.leftArm ) {
                if( this._armorBubbles.leftArm[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.leftArm[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "ll" ) {
            for( let bubbleIndex in this._armorBubbles.leftLeg ) {
                if( this._armorBubbles.leftLeg[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.leftLeg[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "rl" ) {
            for( let bubbleIndex in this._armorBubbles.rightLeg ) {
                if( this._armorBubbles.rightLeg[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.rightLeg[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        }  else if( location === "hd" ) {
            for( let bubbleIndex in this._armorBubbles.head ) {
                if( this._armorBubbles.head[bubbleIndex] && damageTaken < amount ) {
                    this._armorBubbles.head[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        }

        return amount - damageTaken;
    }

    private _takeStructureDamageAtLocation (
        location: string,
        amount: number,
    ): number {
        let damageTaken = 0;
        if( location === "ct" || location === "ctr" ) {
            for( let bubbleIndex in this._structureBubbles.centerTorso ) {
                if( this._structureBubbles.centerTorso[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.centerTorso[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "lt" || location === "ltr"  ) {
            for( let bubbleIndex in this._structureBubbles.leftTorso ) {
                if( this._structureBubbles.leftTorso[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.leftTorso[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        }else if( location === "rt" || location === "rtr" ) {
            for( let bubbleIndex in this._structureBubbles.rightTorso ) {
                if( this._structureBubbles.rightTorso[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.rightTorso[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "ra" ) {
            for( let bubbleIndex in this._structureBubbles.rightArm ) {
                if( this._structureBubbles.rightArm[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.rightArm[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "la" ) {
            for( let bubbleIndex in this._structureBubbles.leftArm ) {
                if( this._structureBubbles.leftArm[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.leftArm[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "ll" ) {
            for( let bubbleIndex in this._structureBubbles.leftLeg ) {
                if( this._structureBubbles.leftLeg[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.leftLeg[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        } else if( location === "rl" ) {
            for( let bubbleIndex in this._structureBubbles.rightLeg ) {
                if( this._structureBubbles.rightLeg[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.rightLeg[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        }  else if( location === "hd" ) {
            for( let bubbleIndex in this._structureBubbles.head ) {
                if( this._structureBubbles.head[bubbleIndex] && damageTaken < amount ) {
                    this._structureBubbles.head[bubbleIndex] = false;
                    damageTaken++;
                }
            }

        }

        return amount - damageTaken;
    }

    private _moveDamageLocationIn(
        loc: string,
        rear: boolean,
    ): string {

        if( loc === "la"  ) {
            if( rear )
                return "ltr";
            else
                return "lt";
        }
        if( loc === "ra" ) {
            if( rear )
                return "rtr";
            else
                return "rt";
        }

        if( loc === "ll" ) {
            if( rear )
                return "ltr";
            else
                return "lt";
        }
        if( loc === "rl" ) {
            if( rear )
                return "rtr";
            else
                return "rt";
        }

        if( loc === "rt" ) {
            if( rear )
                return "ctr";
            else
                return "ct";
        }
        if( loc === "lt" ) {
            if( rear )
                return "ctr";
            else
                return "ct";
        }

        if( loc === "rtr" ) {
            if( rear )
                return "ctr";
            else
                return "ctr";
        }
        if( loc === "ltr" ) {
            if( rear )
                return "ctr";
            else
                return "ctr";
        }

        if( rear )
            return "ctr"
        else
            return "ct"
    }

    public setweight (
        itemUUID: string | undefined,
        weight: number,
    ) {

        if( itemUUID ) {
            for( let item of this._equipmentList ) {
                if( item.uuid && item.uuid === itemUUID) {

                    item.weight = weight;
                    break;

                }
            }

        }
        // if( this._equipmentList[equipmentIndex]) {

        //     this._equipmentList[equipmentIndex].rear = newValue;
        //     for( let item of this._criticalAllocationTable ) {
        //         if( item.obj && item.obj.uuid === this._equipmentList[equipmentIndex].uuid ) {
        //             item.rear = newValue;
        //             item.obj.rear = newValue;
        //         }
        //     }
        // }

        this._calc();
    }

    public setRear(
        itemUUID: string | undefined,
        newValue: boolean
    ) {

        if( itemUUID ) {
            for( let item of this._equipmentList ) {
                if( item.uuid && item.uuid === itemUUID) {

                    item.rear = newValue;

                    for( let critAllItem of this._criticalAllocationTable ) {
                        if( critAllItem.obj && critAllItem.uuid === itemUUID ) {
                            critAllItem.rear = newValue;
                            critAllItem.obj.rear = newValue;
                            break;
                        }

                    }
                    break;

                }
            }

        }
        // if( this._equipmentList[equipmentIndex]) {

        //     this._equipmentList[equipmentIndex].rear = newValue;
        //     for( let item of this._criticalAllocationTable ) {
        //         if( item.obj && item.obj.uuid === this._equipmentList[equipmentIndex].uuid ) {
        //             item.rear = newValue;
        //             item.obj.rear = newValue;
        //         }
        //     }
        // }

        this._calc();
        // return this._equipmentList[equipmentIndex].rear;
    };

    private _updateCriticalAllocationTable() {
        this._criticalAllocationTable = [];

        for( let mechLocation of Object.keys(this._criticals)) {

            // console.log( "_updateCriticalAllocationTable xx", this._criticals, mechLocation, this._criticals[mechLocation]);
            if( this._criticals[mechLocation] ) {
                for( let critItemCounter = 0; critItemCounter < this._criticals[mechLocation].length; critItemCounter++) {
                    let currentItem = this._criticals[mechLocation][critItemCounter];
                    if(
                        currentItem &&
                        currentItem.movable
                    ) {
                        let shortLoc = "";
                        if( mechLocation === "head" ) {
                            shortLoc = "hd";
                        } else if( mechLocation === "centerTorso" ) {
                            shortLoc = "ct";
                        } else if( mechLocation === "rightTorso" ) {
                            shortLoc = "rt";
                        } else if( mechLocation === "rightLeg" ) {
                            shortLoc = "rl";
                        } else if( mechLocation === "rightArm" ) {
                            shortLoc = "ra";
                        } else if( mechLocation === "leftTorso" ) {
                            shortLoc = "lt";
                        } else if( mechLocation === "leftLeg" ) {
                            shortLoc = "ll";
                        } else if( mechLocation === "leftArm" ) {
                            shortLoc = "la";
                        } else {
                            shortLoc = "un";
                        }
                        currentItem.loc = shortLoc;
                        currentItem.slot = critItemCounter;
                        if(!currentItem.size) {
                            currentItem.size = currentItem.crits
                        }
                        // currentItem.size = currentItem.size;
                        // console.log("currentItem", currentItem.tag, shortLoc, currentItem.size, currentItem.crits)

                        this._criticalAllocationTable.push(
                            currentItem
                        );


                    }
                }
            }
            // if( this.getName().indexOf("ASN-") > -1 )
            //     console.log( "_updateCriticalAllocationTable", this.getName(), this._criticalAllocationTable);
        }

        // this._calc();

    };

    _removeUUIDFromUnallocated(
        uuid: string
    ) {

        for( let index = this._unallocatedCriticals.length - 1; index > -1; index--) {
            if( this._unallocatedCriticals[index] && uuid === this._unallocatedCriticals[index].uuid ) {
                this._unallocatedCriticals.splice( index, 1);
            }
        }
    }

    public moveCritical(
        fromLocation: string,
        fromIndex: number,
        toLocation: string,
        toIndex: number,
        split_location: ISplitLocation[] = [],
    ) {


        if( fromLocation === "rrl" ) {
            fromLocation = "rl"
        }
        if( fromLocation === "frl" ) {
            fromLocation = "ra"
        }
        if( fromLocation === "fll" ) {
            fromLocation = "la"
        }
        if( fromLocation === "rll" ) {
            fromLocation = "ll"
        }


        if( toLocation === "rrl" ) {
            toLocation = "rl"
        }
        if( toLocation === "frl" ) {
            toLocation = "ra"
        }
        if( toLocation === "fll" ) {
            toLocation = "la"
        }
        if( toLocation === "rll" ) {
            toLocation = "ll"
        }

        // console.log( " moveCritical",
        //     this.getName(),
        //     fromLocation,
        //     fromIndex,
        //     toLocation,
        //     toIndex,
        //     split_location,
        // )
        // toLocation = toLocation.toLowerCase().trim();
        // fromLocation = fromLocation.toLowerCase().trim();

        if( split_location && split_location.length > 0 ) {


                let fromItem: ICriticalSlot | null = null
                let fromLocationObj: ICriticalSlot[] | null = null;
                if( fromLocation === "un" ) {
                    if( this._unallocatedCriticals[fromIndex]) {
                        fromItem = this._unallocatedCriticals[fromIndex];

                    }
                    fromLocationObj = this._unallocatedCriticals;
                } else if( fromLocation === "hd" ) {
                    if( this._criticals.head[fromIndex]) {
                        fromItem = this._criticals.head[fromIndex];
                        fromLocationObj = this._criticals.head;
                    }
                } else if( fromLocation === "ct" ) {
                    if( this._criticals.centerTorso[fromIndex]) {
                        fromItem = this._criticals.centerTorso[fromIndex];
                        fromLocationObj = this._criticals.centerTorso;
                    }
                } else if( fromLocation === "rt" ) {
                    if( this._criticals.rightTorso[fromIndex]) {
                        fromItem = this._criticals.rightTorso[fromIndex];
                        fromLocationObj = this._criticals.rightTorso;
                    }
                } else if( fromLocation === "ra" ) {
                    if( this._criticals.rightArm[fromIndex]) {
                        fromItem = this._criticals.rightArm[fromIndex];
                        fromLocationObj = this._criticals.rightArm;
                    }
                } else if( fromLocation === "rl" ) {
                    if( this._criticals.rightLeg[fromIndex]) {
                        fromItem = this._criticals.rightLeg[fromIndex];
                        fromLocationObj = this._criticals.rightLeg;
                    }
                } else if( fromLocation === "lt" ) {
                    if( this._criticals.leftTorso[fromIndex]) {
                        fromItem = this._criticals.leftTorso[fromIndex];
                        fromLocationObj = this._criticals.leftTorso;
                    }
                } else if( fromLocation === "la" ) {
                    if( this._criticals.leftArm[fromIndex]) {
                        fromItem = this._criticals.leftArm[fromIndex];
                        fromLocationObj = this._criticals.leftArm;
                    }
                } else if( fromLocation === "ll" ) {
                    if( this._criticals.leftLeg[fromIndex]) {
                        fromItem = this._criticals.leftLeg[fromIndex];
                        fromLocationObj = this._criticals.leftLeg;
                    }
                }

                if( fromItem && fromLocationObj) {
                    let success = false;
                    for( let splitIndex in split_location ) {

                        let split = split_location[splitIndex];

                        let toSize = split.size;
                        toLocation = split.loc;
                        toIndex = split.index;


                        if( toLocation === "rrl" ) {
                            toLocation = "rl"
                        }
                        if( toLocation === "frl" ) {
                            toLocation = "ra"
                        }
                        if( toLocation === "fll" ) {
                            toLocation = "la"
                        }
                        if( toLocation === "rll" ) {
                            toLocation = "ll"
                        }


                        if( toLocation === "hd" ) {
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.head,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "ct" ) {
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.centerTorso,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "rt" ) {
                            // console.log("rt", toSize, +splitIndex , split_location.length - 1, +splitIndex >= split_location.length - 1)
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.rightTorso,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "rl" ) {
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.rightLeg,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "ra" ) {
                            // console.log("ra", toSize, +splitIndex , split_location.length - 1, +splitIndex >= split_location.length - 1)
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.rightArm,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "lt" ) {
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.leftTorso,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "ll" ) {
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.leftLeg,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        } else if( toLocation === "la" ) {
                            success = this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.leftArm,
                                toIndex,
                                toLocation,
                                toSize,
                                +splitIndex >= split_location.length - 1
                            );
                        }
                }

                return success;
            }
        } else {

            let fromItem: ICriticalSlot | null = null
            let fromLocationObj: ICriticalSlot[] | null = null;
            if( fromLocation === "un" ) {
                if( this._unallocatedCriticals[fromIndex]) {
                    fromItem = this._unallocatedCriticals[fromIndex];

                }
                fromLocationObj = this._unallocatedCriticals;
            } else if( fromLocation === "hd" ) {
                if( this._criticals.head[fromIndex]) {
                    fromItem = this._criticals.head[fromIndex];
                    fromLocationObj = this._criticals.head;
                }
            } else if( fromLocation === "ct" ) {
                if( this._criticals.centerTorso[fromIndex]) {
                    fromItem = this._criticals.centerTorso[fromIndex];
                    fromLocationObj = this._criticals.centerTorso;
                }
            } else if( fromLocation === "rt" ) {
                if( this._criticals.rightTorso[fromIndex]) {
                    fromItem = this._criticals.rightTorso[fromIndex];
                    fromLocationObj = this._criticals.rightTorso;
                }
            } else if( fromLocation === "ra" ) {
                if( this._criticals.rightArm[fromIndex]) {
                    fromItem = this._criticals.rightArm[fromIndex];
                    fromLocationObj = this._criticals.rightArm;
                }
            } else if( fromLocation === "rl" ) {
                if( this._criticals.rightLeg[fromIndex]) {
                    fromItem = this._criticals.rightLeg[fromIndex];
                    fromLocationObj = this._criticals.rightLeg;
                }
            } else if( fromLocation === "lt" ) {
                if( this._criticals.leftTorso[fromIndex]) {
                    fromItem = this._criticals.leftTorso[fromIndex];
                    fromLocationObj = this._criticals.leftTorso;
                }
            } else if( fromLocation === "la" ) {
                if( this._criticals.leftArm[fromIndex]) {
                    fromItem = this._criticals.leftArm[fromIndex];
                    fromLocationObj = this._criticals.leftArm;
                }
            } else if( fromLocation === "ll" ) {
                if( this._criticals.leftLeg[fromIndex]) {
                    fromItem = this._criticals.leftLeg[fromIndex];
                    fromLocationObj = this._criticals.leftLeg;
                }
            }

            if( fromItem && fromLocationObj) {
                // console.log("X", this.getName(), fromLocationObj[fromIndex].uuid,fromItem, fromLocation, toLocation, fromIndex, toIndex );
                if( fromLocationObj[fromIndex]) {
                    this._setEquipmentAllocation(
                        fromLocationObj[fromIndex].uuid,
                        toIndex,
                        toLocation
                    )
                }


                if( toLocation === "hd" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.head,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "ct" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.centerTorso,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "rt" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.rightTorso,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "rl" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.rightLeg,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "ra" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.rightArm,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "lt" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.leftTorso,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "ll" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.leftLeg,
                                toIndex,
                                toLocation,
                            );
                } else if( toLocation === "la" ) {
                    return this._moveItemToArea(
                                fromLocationObj,
                                fromItem,
                                fromIndex,
                                this._criticals.leftArm,
                                toIndex,
                                toLocation,
                            );
                }
            }
            // console.warn("moveCritical()", "No to/from objects", fromLocation, toLocation, fromItem, fromLocationObj )
        }


        return false;
    };

    private _setEquipmentAllocation(
        uuid: string,
        allocationIndex: number,
        allocationLocation: string,
    ) {
        for( let item of this._equipmentList ) {
            if( item && item.uuid === uuid ) {
                item.allocationIndex = allocationIndex;
                item.allocationLocation = allocationLocation;
            }
        }
    }


    private _moveItemToArea(
        fromLocation: ICriticalSlot[] | null[],
        fromItem: ICriticalSlot,
        fromIndex: number,
        toLocation: ICriticalSlot[],
        toIndex: number,
        toLocTag: string,
        toSize: number = -1,
        removeFrom: boolean = true,
    ) {

        if( toSize === -1 ) {
            toSize = fromItem.crits
        }

        // Step One check to see if TO has enough slots for item....
        let placeholder: ICriticalSlot = {
            uuid: fromItem.uuid,
            name: "placeholder",
            placeholder: true,
            tag: fromItem.tag,
            crits: 1,
            rear: false,
            obj: null,
        };

        let hasSpace = true;

        if( toIndex === -1 ) {

            for( let itemIndex = 0; itemIndex < toLocation.length; itemIndex++ ) {

                if( toLocation[itemIndex] === null || typeof(toLocation[itemIndex]) === "undefined" ) {

                    toIndex = +itemIndex;
                    break;
                }

            }
            if( toIndex === -1 ) {

                let numSlots = 12;
                if(
                    toLocTag === "ll"
                    ||  toLocTag === "rl"
                    ||  toLocTag === "hd"
                ) {
                    numSlots = 6;
                }

                if( toLocation.length < numSlots) {
                    toIndex = toLocation.length - 1;
                }
            }
        }

        if( toLocation.length < toIndex + toSize || toIndex < 0)
            return false;

        for( let testC = 0; testC < toSize; testC++) {
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


            if( item ) {
                item.size = toSize;
            }

            if( item && item.tag.startsWith( "jj-" ) ) {
                if(
                    (
                        this._mechType.tag === "biped"
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
            toLocation[toIndex] = JSON.parse(JSON.stringify(fromItem));

            toLocation[toIndex].size = toSize;
            for( let phC = 1; phC < toSize; phC++) {
                toLocation[toIndex + phC] = placeholder;
            }


            if( removeFrom ) {

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

                this._removeUUIDFromUnallocated( toLocation[toIndex].uuid )
            }

            this._updateCriticalAllocationTable();

            return true;

        }

        return false;

    }

    private _allocateCritical(
        equipmentTag: string,
        equipmentRear: boolean,
        mechLocation: string | null | undefined,
        slotNumber: number| undefined,
        removeFromUnallocated: boolean,
        critSize: number = -1,
        equipmentUUID: string,
    ): boolean {

        if( mechLocation && typeof(slotNumber) !== "undefined" ) {
            for( let uaet_c = 0; uaet_c < this._unallocatedCriticals.length; uaet_c++) {

                if(
                    equipmentTag === this._unallocatedCriticals[uaet_c].tag
                        &&
                    this._unallocatedCriticals[uaet_c].rear === equipmentRear
                ) {
                    let rv = false;
                    if( this._unallocatedCriticals[uaet_c] && this._unallocatedCriticals[uaet_c].obj)
                        this._unallocatedCriticals[uaet_c].obj.location = mechLocation;

                    if( critSize < 0 ) {
                        critSize = this._unallocatedCriticals[uaet_c].crits;
                    }

                    if( mechLocation === "hd" ) {
                        rv = this._assignItemToArea(
                            this._criticals.head,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "ct" ) {
                        rv = this._assignItemToArea(
                            this._criticals.centerTorso,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "rt" ) {
                        rv = this._assignItemToArea(
                            this._criticals.rightTorso,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "rl" ) {
                        rv = this._assignItemToArea(
                            this._criticals.rightLeg,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "ra" ) {
                        rv = this._assignItemToArea(
                            this._criticals.rightArm,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "lt" ) {
                        rv = this._assignItemToArea(
                            this._criticals.leftTorso,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "ll" ) {
                        rv = this._assignItemToArea(
                            this._criticals.leftLeg,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    } else if( mechLocation === "la" ) {
                        rv = this._assignItemToArea(
                            this._criticals.leftArm,
                            this._unallocatedCriticals[uaet_c],
                            critSize,
                            slotNumber,
                            mechLocation
                        );
                    }

                    if( removeFromUnallocated) {
                         this._unallocatedCriticals.splice(uaet_c, 1);
                    }

                    return rv;
                } else {
                    // console.log( "_allocateCritical slotNumber undefined", equipmentTag, mechLocation, slotNumber)
                }
            }
        } else {
            // console.log( "_allocateCritical mechLocation undefined", equipmentTag, mechLocation, slotNumber)
        }


        return false;
    };

    private _clearArmCriticalAllocationTable() {
        for( let localCount = this._criticalAllocationTable.length; localCount >= 0; localCount--) {
            if(
                (
                    this._criticalAllocationTable[localCount] && this._criticalAllocationTable[localCount].loc === "ra"
                )
                    ||
                (
                    this._criticalAllocationTable[localCount] && this._criticalAllocationTable[localCount].loc === "la"
                )
            ) {
                this._criticalAllocationTable.splice(localCount, 1);
            }
        }
        this._calc();
    }

    public clearCriticalAllocationTable() {
        this._criticalAllocationTable = [];

        this._calc();

    }

    // setEquipmentLocation(
    //     equipmentIndex: number,
    //     location: string,
    // ) {
    //     if( this._equipmentList[equipmentIndex]) {
    //         this._equipmentList[equipmentIndex].location = location;
    //         return this._equipmentList[equipmentIndex];
    //     }
    //     return null;
    // };

    public setAdditionalHeatSinks(
        newValue: number
    ) {
        this._additionalHeatSinks = newValue;
        this._calc();
        return this._additionalHeatSinks;
    };

    public getUnallocatedCritCount() {
        return this._unallocatedCriticals.length;
    }

    public getInstalledEquipment() {
        this._calcVariableEquipment();
        return this._equipmentList;
    };

    private _calcVariableEquipment() {
        for( let eqC = 0; eqC < this._equipmentList.length; eqC++) {
            if( this._equipmentList[ eqC ] && this._equipmentList[ eqC ].variableSize ) {

                let currentItem = this._equipmentList[ eqC ];

                if(currentItem.criticalsDivisor) {
                    currentItem.criticals = Math.ceil( this.getTonnage() / currentItem.criticalsDivisor );
                }

                if( currentItem.weightDivisor ) {
                    currentItem.weight = Math.ceil( this.getTonnage() / currentItem.weightDivisor );
                }

                if( currentItem.damageDivisor ) {
                    currentItem.damage = Math.ceil( this.getTonnage() / currentItem.damageDivisor );
                }

                if( currentItem.damageBonus && typeof(currentItem.damage) === "number") {
                    currentItem.damage += currentItem.damageBonus;
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
            }
        }
    }

    public getAvailableEngines(): IEngineType[] {
        let returnValue: IEngineType[] = [];

        let clanOrIS = "is";
        if( this._tech.tag === "clan" ) {
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

    public getAvailableGyros(): IGyro[] {
        let returnValue: IGyro[] = [];

        for(let gyro of mechGyroTypes ) {
            gyro.available = this._itemIsAvailable( gyro.introduced, gyro.extinct, gyro.reintroduced);

            returnValue.push( gyro );
        }

        return returnValue;
    }

    public getAvailableArmorTypes(): IArmorType[] {
        let returnValue: IArmorType[] = [];

        for(let armor of mechArmorTypes ) {
            armor.available = this._itemIsAvailable( armor.introduced, armor.extinct, armor.reintroduced);

            returnValue.push( armor );
        }

        return returnValue;
    }

    private _itemIsAvailable(
        introduced: number,
        extinct: number,
        reintroduced: number
    ): boolean {
        if( introduced <= this._era.yearStart ) {
            if( extinct > 0 && extinct <= this._era.yearEnd ) {
                // item extinct, check to see if it was reintroduced
                if( reintroduced > 0 && reintroduced <= this._era.yearEnd ) {
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

    public allocateArmorClear() {
        this._armorAllocation = {
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

    public allocateArmorSane() {

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

    }

    public allocateArmorMax() {
        this._armorAllocation = {
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

    public getMaxCenterTorsoRearArmor(): number {
        return this.getInteralStructure().centerTorso * 2 - this.getArmorAllocation().centerTorso;
    }
    public getMaxCenterTorsoArmor(): number {
        return this.getInteralStructure().centerTorso * 2 - this.getArmorAllocation().centerTorsoRear;
    }

    public getMaxRightTorsoRearArmor(): number {
        return this.getInteralStructure().rightTorso * 2 - this.getArmorAllocation().rightTorso;
    }
    public getMaxRightTorsoArmor(): number {
        return this.getInteralStructure().rightTorso * 2 - this.getArmorAllocation().rightTorsoRear;
    }

    public getMaxLeftTorsoRearArmor(): number {
        return this.getInteralStructure().leftTorso * 2 - this.getArmorAllocation().leftTorso;
    }
    public getMaxLeftTorsoArmor(): number {
        return this.getInteralStructure().leftTorso * 2 - this.getArmorAllocation().leftTorsoRear;
    }

    public getAvailableEquipment(): IEquipmentItem[] {
        let returnItems: IEquipmentItem[] = [];
        if( this.getTech().tag === "clan" ) {
            for( let item of mechClanEquipmentEnergy ) {
                item.criticals = item.space.battlemech;
                item.available = this._itemIsAvailable( item.introduced, item.extinct, item.reintroduced);
                returnItems.push( item );
            }
        } else {
            for( let item of getISEquipmentList() ) {
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

    private _sortInstalledEquipment() {
        this._equipmentList.sort( ( a, b ) => {
            if( a.sort > b.sort ) {
                return 1;
            } if( a.sort < b.sort ) {
                return -1;
            } else {
                return 0;
            }
        })
    }

    public toggleMirrorArmorAllocations() {
        this._mirrorArmorAllocations = !this._mirrorArmorAllocations;
    }

    public toggleHeatBubble( clickLocation: string, clickIndex: number ): void {
        // TODO
        console.log( "TODO mechOject toggleHeatBubble", clickLocation, clickIndex);
    }

    public lifeSupportHits(): number {
        let rv = 0;

        for( let critIndex in this._criticals.head ) {
            if(
                this._criticals.head[critIndex]
                &&
                this._criticals.head[critIndex].name.toLowerCase().startsWith( "life support" )
                &&
                this.isCriticalDamaged( "hd", +critIndex )
            ) {
                rv++;
            }
        }

        return rv;
    }

    public isEquipmentDamaged(
        uuid: string,
        loc: string,
    ): boolean {

        if( loc === "hd" ) {

            for( let critIndex in this._criticals.head ) {


                if(
                    this._criticals.head[critIndex]
                    &&
                    this._criticals.head[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }
        if( loc === "ct" ) {

            for( let critIndex in this._criticals.centerTorso ) {


                if(
                    this._criticals.centerTorso[critIndex]
                    &&
                    this._criticals.centerTorso[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }
        if( loc === "lt" ) {

            for( let critIndex in this._criticals.leftTorso ) {


                if(
                    this._criticals.leftTorso[critIndex]
                    &&
                    this._criticals.leftTorso[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }
        if( loc === "rt" ) {

            for( let critIndex in this._criticals.rightTorso ) {

                if(
                    this._criticals.rightTorso[critIndex]
                    &&
                    this._criticals.rightTorso[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }

        if( loc === "la"  ) {

            for( let critIndex in this._criticals.leftArm ) {

                if(
                    this._criticals.leftArm[critIndex]
                    &&
                    this._criticals.leftArm[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {
                    return true;
                }
            }

        }
        if( loc === "ra" ) {

            for( let critIndex in this._criticals.rightArm ) {

                if(
                    this._criticals.rightArm[critIndex]
                    &&
                    this._criticals.rightArm[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }


        if( loc === "rt" ) {

            for( let critIndex in this._criticals.rightTorso ) {


                if(
                    this._criticals.rightTorso[critIndex]
                    &&
                    this._criticals.rightTorso[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }

        if( loc === "ll" ) {

            for( let critIndex in this._criticals.leftLeg ) {

                if(
                    this._criticals.leftLeg[critIndex]
                    &&
                    this._criticals.leftLeg[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }
        if( loc === "rl" ) {


            for( let critIndex in this._criticals.rightLeg ) {

                if(
                    this._criticals.rightLeg[critIndex]
                    &&
                    this._criticals.rightLeg[critIndex].uuid === uuid
                    &&
                    this.isCriticalDamaged( loc, +critIndex )
                ) {

                    return true;
                }
            }

        }



        return false;

    }

    public engineHits(): number {
        let rv = 0;


        let lastName = "";
        for( let critIndex in this._criticals.centerTorso ) {

            if(
                this._criticals.centerTorso[critIndex]
                && !this._criticals.centerTorso[critIndex].placeholder
                && !this._criticals.centerTorso[critIndex].rollAgain
            ) {
                lastName = this._criticals.centerTorso[critIndex].name;
            }

            if(
                this._criticals.centerTorso[critIndex]
                &&
                (
                    lastName.toLowerCase().indexOf( "engine" ) > -1
                    ||
                    lastName.toLowerCase().indexOf( "fusion" ) > -1
                )
                &&
                this.isCriticalDamaged( "ct", +critIndex )
            ) {

                rv++;
            }
        }

        lastName = ""
        for( let critIndex in this._criticals.leftTorso ) {

            if(
                this._criticals.leftTorso[critIndex]
                && !this._criticals.leftTorso[critIndex].placeholder
                && !this._criticals.leftTorso[critIndex].rollAgain
            ) {
                lastName = this._criticals.leftTorso[critIndex].name;
            }

            if(
                this._criticals.leftTorso[critIndex]
                    &&
                (
                    lastName.toLowerCase().indexOf( "engine" ) > -1
                    ||
                    lastName.toLowerCase().indexOf( "fusion" ) > -1
                )
                &&
                this.isCriticalDamaged( "lt", +critIndex )
            ) {
                rv++;
            }
        }

        lastName = "";
        for( let critIndex in this._criticals.rightTorso ) {

            if(
                this._criticals.rightTorso[critIndex]
                && !this._criticals.rightTorso[critIndex].placeholder
                && !this._criticals.rightTorso[critIndex].rollAgain
            ) {
                lastName = this._criticals.rightTorso[critIndex].name;
            }

            if(
                this._criticals.rightTorso[critIndex]
                &&
                (
                    lastName.toLowerCase().indexOf( "engine" ) > -1
                    ||
                    lastName.toLowerCase().indexOf( "fusion" ) > -1
                )
                &&
                this.isCriticalDamaged( "rt", +critIndex )
            ) {
                rv++;
            }
        }

        return rv;
    }

    public gyroHits(): number {
        let rv = 0;


        let lastName = "";
        for( let critIndex in this._criticals.centerTorso ) {

            if(
                this._criticals.centerTorso[critIndex]
                && !this._criticals.centerTorso[critIndex].placeholder
                && !this._criticals.centerTorso[critIndex].rollAgain
            ) {
                lastName = this._criticals.centerTorso[critIndex].name;
            }

            if(
                this._criticals.centerTorso[critIndex]
                &&
                lastName.toLowerCase().indexOf( "gyro" ) > -1
                    &&
                this.isCriticalDamaged( "ct", +critIndex )
            ) {
                rv++;
            }
        }
        lastName = ""
        for( let critIndex in this._criticals.leftTorso ) {

            if(
                this._criticals.leftTorso[critIndex]
                && !this._criticals.leftTorso[critIndex].placeholder
                && !this._criticals.leftTorso[critIndex].rollAgain
            ) {
                lastName = this._criticals.leftTorso[critIndex].name;
            }
            if(
                this._criticals.leftTorso[critIndex]
                &&
                lastName.toLowerCase().indexOf( "gyro" ) > -1
                    &&
                this.isCriticalDamaged( "lt", +critIndex )
            ) {
                rv++;
            }
        }
        lastName = "";
        for( let critIndex in this._criticals.rightTorso ) {

            if(
                this._criticals.rightTorso[critIndex]
                && !this._criticals.rightTorso[critIndex].placeholder
                && !this._criticals.rightTorso[critIndex].rollAgain
            ) {
                lastName = this._criticals.rightTorso[critIndex].name;
            }
            if(
                this._criticals.rightTorso[critIndex]
                &&
                lastName.toLowerCase().indexOf( "gyro" ) > -1
                    &&
                this.isCriticalDamaged( "rt", +critIndex )
            ) {
                rv++;
            }
        }

        return rv;
    }
    public sensorHits(): number {
        let rv = 0;

        for( let critIndex in this._criticals.head ) {
            if(
                this._criticals.head[critIndex]
                &&
                this._criticals.head[critIndex].name.toLowerCase().startsWith( "sensors" )
                &&
                this.isCriticalDamaged( "hd", +critIndex )
            ) {
                rv++;
            }
        }
        return rv;
    }

    public toggleISBubble( clickLocation: string, clickIndex: number ): void {
        switch( clickLocation ) {
            case "hd": {
                this._structureBubbles.head[clickIndex] = !this._structureBubbles.head[clickIndex];
                break;
            }

            case "rt": {
                this._structureBubbles.rightTorso[clickIndex] = !this._structureBubbles.rightTorso[clickIndex];
                break;
            }
            case "ct": {
                this._structureBubbles.centerTorso[clickIndex] = !this._structureBubbles.centerTorso[clickIndex];
                break;
            }
            case "lt": {
                this._structureBubbles.leftTorso[clickIndex] = !this._structureBubbles.leftTorso[clickIndex];
                break;
            }

            case "ra": {
                this._structureBubbles.rightArm[clickIndex] = !this._structureBubbles.rightArm[clickIndex];
                break;
            }
            case "la": {
                this._structureBubbles.leftArm[clickIndex] = !this._structureBubbles.leftArm[clickIndex];
                break;
            }

            case "rl": {
                this._structureBubbles.rightLeg[clickIndex] = !this._structureBubbles.rightLeg[clickIndex];
                break;
            }
            case "ll": {
                this._structureBubbles.leftLeg[clickIndex] = !this._structureBubbles.leftLeg[clickIndex];
                break;
            }
        }
    }

    public structureDamaged( clickLocation: string, clickIndex: number ): boolean {
        switch( clickLocation ) {
            case "hd": {
                return !this._structureBubbles.head[clickIndex];
            }

            case "rt": {
                return !this._structureBubbles.rightTorso[clickIndex];
            }
            case "ct": {
                return !this._structureBubbles.centerTorso[clickIndex];
            }
            case "lt": {
                return !this._structureBubbles.leftTorso[clickIndex];
            }

            case "ra": {
                return !this._structureBubbles.rightArm[clickIndex];
            }
            case "la": {
                return !this._structureBubbles.leftArm[clickIndex];
            }

            case "rl": {
                return !this._structureBubbles.rightLeg[clickIndex];
            }
            case "ll": {
                return !this._structureBubbles.leftLeg[clickIndex];
            }

        }
        return false;
    }

    public armorDamaged( clickLocation: string, clickIndex: number ): boolean {
        switch( clickLocation ) {
            case "hd": {
                return !this._armorBubbles.head[clickIndex];
            }

            case "rt": {
                return !this._armorBubbles.rightTorso[clickIndex];
            }
            case "ct": {
                return !this._armorBubbles.centerTorso[clickIndex];
            }
            case "lt": {
                return !this._armorBubbles.leftTorso[clickIndex];
            }

            case "ra": {
                return !this._armorBubbles.rightArm[clickIndex];
            }
            case "la": {
                return !this._armorBubbles.leftArm[clickIndex];
            }

            case "rl": {
                return !this._armorBubbles.rightLeg[clickIndex];
            }
            case "ll": {
                return !this._armorBubbles.leftLeg[clickIndex];
            }

            case "rtr": {
                return !this._armorBubbles.rightTorsoRear[clickIndex];
            }
            case "ctr": {
                return !this._armorBubbles.centerTorsoRear[clickIndex];
            }
            case "ltr": {
                return !this._armorBubbles.leftTorsoRear[clickIndex];
            }
        }
        return false;
    }

    public toggleArmorBubble( clickLocation: string, clickIndex: number ): void {
        switch( clickLocation ) {
            case "hd": {
                this._armorBubbles.head[clickIndex] = !this._armorBubbles.head[clickIndex];
                break;
            }

            case "rt": {
                this._armorBubbles.rightTorso[clickIndex] = !this._armorBubbles.rightTorso[clickIndex];
                break;
            }
            case "ct": {
                this._armorBubbles.centerTorso[clickIndex] = !this._armorBubbles.centerTorso[clickIndex];
                break;
            }
            case "lt": {
                this._armorBubbles.leftTorso[clickIndex] = !this._armorBubbles.leftTorso[clickIndex];
                break;
            }

            case "ra": {
                this._armorBubbles.rightArm[clickIndex] = !this._armorBubbles.rightArm[clickIndex];
                break;
            }
            case "la": {
                this._armorBubbles.leftArm[clickIndex] = !this._armorBubbles.leftArm[clickIndex];
                break;
            }

            case "rl": {
                this._armorBubbles.rightLeg[clickIndex] = !this._armorBubbles.rightLeg[clickIndex];
                break;
            }
            case "ll": {
                this._armorBubbles.leftLeg[clickIndex] = !this._armorBubbles.leftLeg[clickIndex];
                break;
            }

            case "rtr": {
                this._armorBubbles.rightTorsoRear[clickIndex] = !this._armorBubbles.rightTorsoRear[clickIndex];
                break;
            }
            case "ctr": {
                this._armorBubbles.centerTorsoRear[clickIndex] = !this._armorBubbles.centerTorsoRear[clickIndex];
                break;
            }
            case "ltr": {
                this._armorBubbles.leftTorsoRear[clickIndex] = !this._armorBubbles.leftTorsoRear[clickIndex];
                break;
            }
        }
    }

    public heatSinkIsFilled( hsIndex: number): boolean {
        // TODO
        return false;
    }

    private _isAnachronistic(): boolean {

        if( this._engineType.available === false ) {
            return true;
        }

        if( this._armorType.available === false ) {
            return true;
        }

        // if( this._heatSinkType.available === false ) {
        //     return true;
        // }

        for( let item of this.getInstalledEquipment() ) {

            if( item.available === false ) {
                return true;
            }

        }

        return false;
    }

    public importTRO(
        importString: string
    ): void {
        importString = importString.trim();

        let lines = importString.split( "\n" );

        let inEquipmentList = false;
        let equipmentList: IEquipmentItem[] = [];

        for( let line of lines ) {

            if( line.toLowerCase().startsWith( "technology base:" )) {

                line = line.replace(/technology base:/ig, '').trim();
                if( line === "inner sphere" ) {
                    this.setTech( "is" )
                } else if (line === "clan" ) {
                    this.setTech( "clan" )
                }
                equipmentList = this.getEquipmentList( this.getTech().tag )

            }
            if( line.toLowerCase().startsWith( "tonnage: " )) {
                line = line.replace(/tonnage: /ig, '').trim();
                if( +line ) {
                    this.setTonnage( +line );
                }
            }
            if( line.toLowerCase().startsWith( "type: " )) {
                line = line.replace(/type:/ig, '').trim();
                if( line ) {
                    this.setModel( line )
                }
            }
            if( line.toLowerCase().startsWith( "walking mp: " )) {
                line = line.replace(/walking mp:/ig, '').trim();
                if( +line ) {
                    this.setWalkSpeed( +line )
                }
            }
            if( line.toLowerCase().startsWith( "jumping mp: " )) {
                line = line.replace(/jumping mp:/ig, '').trim();
                if( +line ) {
                    this.setJumpSpeed( +line )
                }
            }

            if( line.toLowerCase().startsWith( "double heat sinks: " )) {
                line = line.replace(/double heat sink:/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && !isNaN(+splitLine[0]) ) {

                        this.setAdditionalHeatSinks(+splitLine[0] - 10 )
                        this.setHeatSinksType( "double" )
                    }
                }
            }

            if( line.toLowerCase().startsWith( "single heat sinks: " )) {
                line = line.replace(/single heat sinks:/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && !isNaN(+splitLine[0]) ) {

                        this.setAdditionalHeatSinks(+splitLine[0] - 10 )
                        this.setHeatSinksType( "single" )
                    }

                }
            }

            if( line.toLowerCase().startsWith( "heat sinks: " )) {
                line = line.replace(/heat sinks:/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && !isNaN(+splitLine[0]) ) {

                        this.setAdditionalHeatSinks(+splitLine[0] - 10 )
                        this.setHeatSinksType( "single" )
                    }

                }
            }


            if( line.toLowerCase().startsWith( "armor factor: " )) {
                line = line.replace(/armor factor:/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && +splitLine[1] > 0) {
                        this.setArmorWeight( +splitLine[1] )
                    }

                }
            }

            // Armor Locations
            if( line.toLowerCase().startsWith( "head" )) {
                line = line.replace(/head/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && +splitLine[1] > 0) {
                        this.setHeadArmor( +splitLine[1] )
                    }

                }
            }

            if( line.toLowerCase().startsWith( "center torso" ) && line.toLowerCase().indexOf( "(rear)" ) === -1 ) {
                line = line.replace(/center torso/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && +splitLine[1] > 0) {
                        this.setCenterTorsoArmor( +splitLine[1] )
                    }

                }
            }

            if( line.toLowerCase().startsWith( "center torso" ) && line.toLowerCase().indexOf( "(rear)" ) > -1 ) {

                line = line.replace(/center torso \(rear\)/ig, '').trim();

                if( +line > 0) {
                    this.setCenterTorsoRearArmor( +line )
                }

            }

            if( line.toLowerCase().startsWith( "r/l torso" ) && line.toLowerCase().indexOf( "(rear)" ) === -1 ) {
                line = line.replace(/r\/l torso/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && +splitLine[1] > 0) {
                        this.setRightTorsoArmor( +splitLine[1] )
                        this.setLeftTorsoArmor( +splitLine[1] )
                    }

                }
            }

            if( line.toLowerCase().startsWith( "r/l torso" ) && line.toLowerCase().indexOf( "(rear)" ) > -1 ) {
                line = line.replace(/r\/l torso \(rear\)/ig, '').trim();

                if( +line > 0) {
                    this.setRightTorsoRearArmor( +line )
                    this.setLeftTorsoRearArmor( +line )
                }

            }

            if( line.toLowerCase().startsWith( "r/l leg" ) ) {
                line = line.replace(/r\/l leg/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && +splitLine[1] > 0) {
                        this.setLeftLegArmor( +splitLine[1] )
                        this.setRightLegArmor( +splitLine[1] )
                    }

                }
            }

            if( line.toLowerCase().startsWith( "r/l arm" ) ) {
                line = line.replace(/r\/l arm/ig, '').trim();
                if( line && line.indexOf( " " ) > - 1 ) {
                    line = line.replace(/ {2}/ig, ' ').trim();
                    let splitLine = line.split( " " );

                    if( splitLine.length > 1 && +splitLine[1] > 0) {
                        this.setLeftArmArmor( +splitLine[1] )
                        this.setRightArmArmor( +splitLine[1] )
                    }

                }
            }

            if( line.toLowerCase().startsWith( "weapons" ) ) {
                inEquipmentList = true;
            }

            if( inEquipmentList && equipmentList.length > 0 ) {

                // remove double-spaces
                line = line.replace(/ {2}/ig, ' ').trim();
                let lineSplit = line.split(' ');

                let equipmentLine = {
                    name: "",
                    location: "",
                    criticals: 0,
                    weight: 0,
                    number: 1,

                }
                if(
                    lineSplit.length > 3
                    &&
                    !isNaN( +lineSplit[ lineSplit.length - 1] )
                        &&
                    !isNaN( +lineSplit[ lineSplit.length - 2] )
                ) {

                    equipmentLine.weight = +lineSplit[ lineSplit.length - 1];
                    equipmentLine.criticals = +lineSplit[ lineSplit.length - 2];
                    equipmentLine.location = lineSplit[ lineSplit.length - 3];
                    lineSplit.pop();
                    lineSplit.pop();
                    lineSplit.pop();
                    equipmentLine.name = lineSplit.join( " " )

                    if( !isNaN( +equipmentLine.name[0] ) ) {
                        let nameSplit = equipmentLine.name.split( " " );
                        let count = +nameSplit[0];
                        nameSplit.shift();
                        equipmentLine.name = nameSplit.join( " " )
                        equipmentLine.number = count;
                        equipmentLine.criticals = equipmentLine.criticals / count;
                        equipmentLine.weight = equipmentLine.weight /  count;
                    }


                    if(
                        equipmentLine.name.trim()
                        &&
                        equipmentLine.criticals > 0
                        &&
                        equipmentLine.weight > 0
                        &&
                        equipmentLine.location.trim()
                    ) {

                        if( equipmentLine.name.trim().toLowerCase().startsWith( "jump jet" ) ) {

                            for( let count = 0; count < equipmentLine.criticals; count++) {

                                    for( let critIndex = this._unallocatedCriticals.length -1; critIndex > -1; critIndex--  ) {

                                        if( this._unallocatedCriticals[critIndex] && this._unallocatedCriticals[critIndex].name.trim().toLowerCase().indexOf( "jump jet" ) > 1) {

                                            this.moveCritical(
                                                "un",
                                                +critIndex,
                                                equipmentLine.location.trim().toLowerCase(),
                                                -1,
                                            )
                                            break;
                                        }

                                    }

                            }

                        } else {

                            for( let eqIndex in equipmentList ) {
                                let eq = equipmentList[eqIndex];

                                if(
                                    (
                                        eq.name.toLowerCase().trim() === equipmentLine.name.trim().toLowerCase()
                                        ||
                                        eq.name.toLowerCase().trim() + "s" === equipmentLine.name.trim().toLowerCase()
                                    )

                                ) {

                                    for( let count = 0; count < equipmentLine.number; count++) {


                                        this.addEquipment(
                                            +eqIndex,
                                            this.getTech().tag,
                                            equipmentLine.location.trim().toLowerCase(),
                                            false,
                                            null,
                                            equipmentLine.weight,
                                            []
                                        )

                                        this._calcCriticals();

                                        for( let count = 0; count < equipmentLine.criticals; count++) {

                                            for( let critIndex = this._unallocatedCriticals.length -1; critIndex > -1; critIndex--  ) {

                                                if( this._unallocatedCriticals[critIndex] && this._unallocatedCriticals[critIndex].name.trim().toLowerCase() === equipmentLine.name.trim().toLowerCase() ) {

                                                    this.moveCritical(
                                                        "un",
                                                        +critIndex,
                                                        equipmentLine.location.trim().toLowerCase(),
                                                        -1,
                                                    )
                                                    break;
                                                }

                                            }

                                        }
                                    }

                                }

                            }

                        }

                    }
                }
            }

        }
        this._calc()
    }

    public getEquipmentList(
        equipmentListTag: string
    ): IEquipmentItem[] {

        let equipmentList: IEquipmentItem[] = [];
        if( equipmentListTag === "is" ) {
            equipmentList = getISEquipmentList();

        }

        if( equipmentListTag === "clan" ) {
            equipmentList = mechClanEquipmentEnergy;
        }

        return equipmentList;
    }


    /* Public Getters */
    public get model(): string {
        return this._model;
    }

    public get introductoryRules(): boolean {
        return this._introductoryRules;
    }

    public set introductoryRules(
        nv: boolean,
    ) {
        this._introductoryRules = nv;
    }

    public get hideNonAvailableEquipment(): boolean {
        return this._hideNonAvailableEquipment;
    }
    public set hideNonAvailableEquipment(
        nv: boolean,
    ) {
        this._hideNonAvailableEquipment = nv;
    }

    public get nickname(): string {
        return this._nickname;
    }
    public set nickname(
        nv: string,
    ) {
        this._nickname = nv;
    }

    public get mirrorArmorAllocations(): boolean {
        return this._mirrorArmorAllocations;
    }

    public get unallocatedCriticals(): ICriticalSlot[] {
        return this._unallocatedCriticals;
    }
    public get criticals(): IMechCriticals {
        return this._criticals;
    }

    public set equipmentList(
        nv: IEquipmentItem[],
    ) {
        this._equipmentList = nv;
    }

    public get equipmentList(): IEquipmentItem[] {
        return this._equipmentList;
    }

    // public get sortedSeparatedEquipmentList(): IEquipmentItem[] {
    //     return this._sortedSeparatedEquipmentList;
    // }

    public get calcLogCBill(): string {
        return this._calcLogCBill;
    }
    public get calcLogAS(): string {
        return this._calcLogAS;
    }
    public get calcLogBV(): string {
        return this._calcLogBV;
    }

    public get pilot(): IPilot {
        return this._pilot;
    }

    public get uuid(): string {
        return this._uuid;
    }

    public getTarget(
        targetLetter: string
    ) {
        if( targetLetter === "b" ) {
            return this._targetBToHit
        }
        if( targetLetter === "c" ) {
            return this._targetCToHit
        }
        return this._targetAToHit;
    }

    public getMovementText(): string {
        if( this.currentMovementMode ) {
            if( this.currentMovementMode === "n" ) {
                return "Has not moved";
            } else if( this.currentMovementMode === "w" ) {
                return "Walked " + getHexDistanceFromModifier(this.currentToHitMovementModifier) + "⬣";
            } else if( this.currentMovementMode === "r" ) {
                return "Ran " + getHexDistanceFromModifier(this.currentToHitMovementModifier) + "⬣";
            } else {
                return "Jumped " + getHexDistanceFromModifier(this.currentToHitMovementModifier) + "⬣";
            }
        } else {
            return "Remained Stationary";
        }

    }
    public getMovementToHitText(): string {
        if( this.currentMovementMode ) {
            if( this.currentMovementMode === "n" ) {
                return "Click here to set move for the turn";
            } else if( this.currentMovementMode === "w" ) {
                return "+1 to attack, -" + this.getMovementToHitModifier() + " to be hit";
            } else if( this.currentMovementMode === "r" ) {
                return "+2 to attack, -" + this.getMovementToHitModifier() + " to be hit";
            } else {
                return "+3 to attack, -" + this.getMovementToHitModifier() + " to be hit";
            }
        } else {
            return "-" + this.getMovementToHitModifier() + " to be hit";
        }

    }

    public getArmorPercentage(): number {
        return this.getCurrentArmor() / this.getTotalArmor() * 100;
    }
    public getStructurePercentage(): number {

        return this.getCurrentStructure() / this.getTotalStructure() * 100;
    }
    public getHeatPercentage(): number {
        return this.currentHeat / 30 * 100;
    }

    public getCurrentArmor(): number {
        let rv = 0;

        for( let count = 0; count < this._armorBubbles.head.length; count ++  ) {
            if( this._armorBubbles.head[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._armorBubbles.leftTorso.length; count ++  ) {
            if( this._armorBubbles.leftTorso[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._armorBubbles.centerTorso.length; count ++  ) {
            if( this._armorBubbles.centerTorso[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._armorBubbles.rightTorso.length; count ++  ) {
            if( this._armorBubbles.rightTorso[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._armorBubbles.leftTorsoRear.length; count ++  ) {
            if( this._armorBubbles.leftTorsoRear[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._armorBubbles.centerTorsoRear.length; count ++  ) {
            if( this._armorBubbles.centerTorsoRear[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._armorBubbles.rightTorsoRear.length; count ++  ) {
            if( this._armorBubbles.rightTorsoRear[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._armorBubbles.rightLeg.length; count ++  ) {
            if( this._armorBubbles.rightLeg[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._armorBubbles.rightArm.length; count ++  ) {
            if( this._armorBubbles.rightArm[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._armorBubbles.leftLeg.length; count ++  ) {
            if( this._armorBubbles.leftLeg[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._armorBubbles.leftArm.length; count ++  ) {
            if( this._armorBubbles.leftArm[count] ) {
                rv++
            }
        }

        return rv;
    }

    public getCurrentStructure(): number {
        let rv = 0;

        for( let count = 0; count < this._structureBubbles.head.length; count ++  ) {
            if( this._structureBubbles.head[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._structureBubbles.leftTorso.length; count ++  ) {
            if( this._structureBubbles.leftTorso[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._structureBubbles.centerTorso.length; count ++  ) {
            if( this._structureBubbles.centerTorso[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._structureBubbles.rightTorso.length; count ++  ) {
            if( this._structureBubbles.rightTorso[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._structureBubbles.rightLeg.length; count ++  ) {
            if( this._structureBubbles.rightLeg[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._structureBubbles.rightArm.length; count ++  ) {
            if( this._structureBubbles.rightArm[count] ) {
                rv++
            }
        }

        for( let count = 0; count < this._structureBubbles.leftLeg.length; count ++  ) {
            if( this._structureBubbles.leftLeg[count] ) {
                rv++
            }
        }
        for( let count = 0; count < this._structureBubbles.leftArm.length; count ++  ) {
            if( this._structureBubbles.leftArm[count] ) {
                rv++
            }
        }

        return rv;
    }

    public getTotalStructure(): number {
        let rv = 0;

        rv += this._internalStructure.head;

        rv += this._internalStructure.leftTorso;
        rv += this._internalStructure.centerTorso;
        rv += this._internalStructure.rightTorso;

        rv += this._internalStructure.leftArm;
        rv += this._internalStructure.rightArm;

        rv += this._internalStructure.leftLeg;
        rv += this._internalStructure.rightLeg;

        return rv;
    }

    public turnReset() {
        this.currentMovementMode = "n"
        this.currentToHitMovementModifier = -1;
        this.damageLog = [];
        for( let item of this._equipmentList ) {
            item.resolved = false;
            item.damageClusterHits = [];
        }
    }

    public selectAmmoBin(
        weaponUUID: string,
        ammoUUID: string,
    ) {
        for( let eq of this._equipmentList ) {
            if( eq.uuid === weaponUUID  ) {
                eq.selectedAmmoBinUUID = ammoUUID;
            }
        }
    }
    public toggleResolved(
        eq_index: number
    ) {
        if( this._equipmentList.length > eq_index ) {
            this._equipmentList[eq_index].resolved = !this._equipmentList[eq_index].resolved;
            if( this._equipmentList[eq_index].selectedAmmoBinUUID  ) {
                if( this._equipmentList[eq_index].resolved )
                    this._decrementAmmoBin( this._equipmentList[eq_index].selectedAmmoBinUUID );
                else
                    this._incrementAmmoBin( this._equipmentList[eq_index].selectedAmmoBinUUID );
            }
        }
    }

    private _decrementAmmoBin( uuid: string | undefined ) {
        if( uuid ) {
            for( let eq of this._equipmentList ) {
                if( eq.uuid === uuid && eq.isAmmo && typeof(eq.currentAmmo) !== "undefined" && eq.currentAmmo > 0 ) {
                    eq.currentAmmo--;
                }
            }
        }
    }

    private _incrementAmmoBin( uuid: string | undefined ) {
        if( uuid ) {
            for( let eq of this._equipmentList ) {
                if( eq.uuid === uuid && eq.isAmmo && typeof(eq.currentAmmo) !== "undefined" && eq.currentAmmo > 0 ) {
                    eq.currentAmmo++;
                }
            }
        }
    }

    public setDamageClusterHits(
        eq_index: number,
        nv: IClusterHit[]
    ) {
        if( this._equipmentList.length > eq_index ) {
            this._equipmentList[eq_index].damageClusterHits = nv;
        }
    }

    private _installSSWEquipment(
        item: any
    ) {

        let listTag = "is";
        let itemName = "";
        let location = "";
        let allocationIndex = -1;
        let rear = false;
        if( item.name &&  item.name["#text"].indexOf( "(IS) " ) > -1) {
            itemName = item.name["#text"].replace( "(IS) ", "" )
            listTag = "is";
        } else if( item.name &&  item.name["#text"].indexOf( "(CLAN) ") > -1 ) {
                itemName = item.name["#text"].replace( "(CLAN) ", "" )
                listTag = "clan";

        } else {
            itemName = item.name["#text"];
        }

        if( itemName.indexOf("(R) ") > -1 ) {
            itemName = itemName.replace( "(R) ", "" )
            rear = true;
        }


        let halfTon = false;
        if( itemName.indexOf(" (1/2)") > -1 ) {
            itemName = itemName.replace( " (1/2)", "" )
            halfTon = true;
        }

        if( item.location && item.location["#text"]) {
            location = item.location["#text"].toLowerCase().trim();

            if( typeof( item.location["@_index"]) !== "undefined" ) {
                allocationIndex =  +item.location["@_index"];
            }

        }
        if( itemName.indexOf( "@" ) > -1 )
            itemName = itemName.replace( "@ ", "Ammo (" ) + ")"

        if( location === "ctr" ) {
            rear = true;
            location = "ct";
        }
        if( location === "ltr" ) {
            rear = true;
            location = "lt";
        }
        if( location === "rtr" ) {
            rear = true;
            location = "rt";
        }


        if( itemName ) {

            let newItem = this.addEquipmentByName(
                itemName,
                listTag,
                location,
                rear,
                generateUUID(),
                undefined,
                item.splitlocation ? item.splitlocation : [],
            );

            if( !newItem ) {
                console.warn( "Cannot find any equipment named: '" + itemName + "'" );
                this._sswImportErrors.push( "Cannot find any equipment named: '" + itemName + "'" )
            } else {



                if( halfTon ) {
                    newItem.weight = .5;
                }

                newItem.allocationIndex = allocationIndex;
                newItem.allocationLocation = location;
                newItem.location = "un";
                newItem.rear = rear;
                newItem.split_location = [];


                if( item.splitlocation ) {
                    for( let split of item.splitlocation ) {

                        newItem.split_location.push(
                            {
                                loc: split["#text"].toLowerCase(),
                                index: +split["@_index"],
                                size: +split["@_number"],
                            }
                        )
                    }
                }
            }
        }
    }

    public getCriticalsForLocation(
        shortLoc: string
    ): ICriticalSlot[] {
        shortLoc = shortLoc.toLowerCase().trim();
        if( shortLoc === "hd" ) {
            return this._criticals.head;
        }

        if( shortLoc === "ct" ) {
            return this._criticals.centerTorso;
        }
        if( shortLoc === "lt" ) {
            return this._criticals.leftTorso;
        }
        if( shortLoc === "rt" ) {
            return this._criticals.rightTorso;
        }

        if( shortLoc === "ra" ) {
            return this._criticals.rightArm;
        }
        if( shortLoc === "la" ) {
            return this._criticals.leftArm;
        }

        if( shortLoc === "rl" ) {
            return this._criticals.rightLeg;
        }
        if( shortLoc === "ll" ) {
            return this._criticals.leftLeg;
        }


        return [];
    }
    public importSSWXML(
        ssw_xml: string
    ): void {

        this._sswImportErrors = [];



        const options = {
            ignoreAttributes : false
        };
        const parser = new XMLParser(options);
        let jObj = parser.parse(ssw_xml);

        // console.log( "battlemech.importSSWXML() jObj", jObj)
        if( jObj && jObj.mech && jObj.mech.mech_type === "BattleMech") {
            this.reset();

            if( jObj.mech.motive_type && jObj.mech.motive_type === "Quad" ) {
                this.setMechType("quad");
            }
            if( jObj.mech["@_model" ] ) {
                this.setModel( jObj.mech["@_model"] );
            }
            if( jObj.mech["@_name" ] ) {
                this.setName( jObj.mech["@_name"] );
            }
            this._omnimech = false;
            if( jObj.mech["@_omnimech"] ) {
                if( jObj.mech["@_omnimech" ].toLowerCase().trim() === "true")
                    this._omnimech = true;

            }
            if( jObj.mech["@_solaris7id"] ) {

            }
            if( jObj.mech["@_solaris7imageid"] ) {

            }
            if( jObj.mech["@_sswimage"] ) {

            }
            if( jObj.mech["@_tons"] ) {
                this.setTonnage( +jObj.mech["@_tons"] )
            }
            if( jObj.mech.techbase && jObj.mech.techbase["#text"] ) {
                if( jObj.mech.techbase["#text"].toLowerCase().indexOf("inner") > -1) {
                    this.setTech("is");
                } else if( jObj.mech.techbase["#text"].toLowerCase().indexOf("clan") > -1) {
                    this.setTech("clan");
                }
            }

            if( jObj.mech.baseloadout ) {
                if( jObj.mech.baseloadout.actuators ) {
                    if( jObj.mech.baseloadout.actuators["@_lh"] && jObj.mech.baseloadout.actuators["@_lh"].toLowerCase().trim() !== "true" ) {
                        this.removeHandActuator( "la" );
                    } else {
                        this.addHandActuator( "la" );
                    }
                    if( jObj.mech.baseloadout.actuators["@_lla"] && jObj.mech.baseloadout.actuators["@_lla"].toLowerCase().trim() !== "true" ) {
                        this.removeLowerArmActuator( "la" );
                    } else {
                        this.addLowerArmActuator( "la" );
                    }
                    if( jObj.mech.baseloadout.actuators["@_rh"] && jObj.mech.baseloadout.actuators["@_rh"].toLowerCase().trim() !== "true" ) {
                        this.removeHandActuator( "ra" );
                    } else {
                        this.addHandActuator( "ra" );
                    }
                    if( jObj.mech.baseloadout.actuators["@_rla"] && jObj.mech.baseloadout.actuators["@_rla"].toLowerCase().trim() !== "true" ) {
                        this.removeLowerArmActuator( "ra" );
                    } else {
                        this.addLowerArmActuator( "ra" );
                    }
                }
            }

            if( jObj.mech.armor ) {
                let totalArmor = 0;
                // It sure would be nice for SSW to have the armor weight in XML file 🙄
                if( jObj.mech.armor.ct ) {
                    this._armorAllocation.centerTorso = jObj.mech.armor.ct;
                    totalArmor += this._armorAllocation.centerTorso;
                }
                if( jObj.mech.armor.ctr ) {
                    this._armorAllocation.centerTorsoRear = jObj.mech.armor.ctr;
                    totalArmor += this._armorAllocation.centerTorsoRear;
                }
                if( jObj.mech.armor.hd ) {
                    this._armorAllocation.head = jObj.mech.armor.hd;
                    totalArmor += this._armorAllocation.head;
                }
                if( jObj.mech.armor.la ) {
                    this._armorAllocation.leftArm = jObj.mech.armor.la;
                    totalArmor += this._armorAllocation.leftArm;
                }
                if( jObj.mech.armor.ll ) {
                    this._armorAllocation.leftLeg = jObj.mech.armor.ll;
                    totalArmor += this._armorAllocation.leftLeg;
                }
                if( jObj.mech.armor.lt ) {
                    this._armorAllocation.leftTorso = jObj.mech.armor.lt;
                    totalArmor += this._armorAllocation.leftTorso;
                }
                if( jObj.mech.armor.ltr ) {
                    this._armorAllocation.leftTorsoRear = jObj.mech.armor.ltr;
                    totalArmor += this._armorAllocation.leftTorsoRear;
                }
                if( jObj.mech.armor.ra ) {
                    this._armorAllocation.rightArm = jObj.mech.armor.ra;
                    totalArmor += this._armorAllocation.rightArm;
                }
                if( jObj.mech.armor.rl ) {
                    this._armorAllocation.rightLeg = jObj.mech.armor.rl;
                    totalArmor += this._armorAllocation.rightLeg;
                }
                if( jObj.mech.armor.rt ) {
                    this._armorAllocation.rightTorso = jObj.mech.armor.rt;
                    totalArmor += this._armorAllocation.rightTorso;
                }
                if( jObj.mech.armor.rtr ) {
                    this._armorAllocation.rightTorsoRear = jObj.mech.armor.rtr;
                    totalArmor += this._armorAllocation.rightTorsoRear;
                }
                if( jObj.mech.armor.type ) {
                    if( jObj.mech.armor.type === "Standard Armor" ) {
                        this.setArmorType( "standard" )
                    } else if( jObj.mech.armor.type === "Ferro Fibrous" ) {
                        this.setArmorType( "ferro-fibrous" )
                    } else if( jObj.mech.armor.type === "Ferro-Fibrous" ) {
                        this.setArmorType( "ferro-fibrous" )
                    } else if( jObj.mech.armor.type === "Light Ferro Fibrous" ) {
                        this.setArmorType( "light-ferro-fibrous" )
                    } else if( jObj.mech.armor.type === "Light Ferro-Fibrous" ) {
                        this.setArmorType( "light-ferro-fibrous" )
                    } else if( jObj.mech.armor.type === "Heavy Ferro Fibrous" ) {
                        this.setArmorType( "heavy-ferro-fibrous" )
                    } else if( jObj.mech.armor.type === "Heavy Ferro-Fibrous" ) {
                        this.setArmorType( "heavy-ferro-fibrous" )
                    } else if( jObj.mech.armor.type.indexOf( "Stealth" )  > -1) {
                        this.setArmorType( "stealth" )
                    }

                    this.setArmorCount( totalArmor );


                    if( typeof(  jObj.mech.armor.location ) === "object" ) {
                        this._calcCriticals();


                        for( let loc of jObj.mech.armor.location ) {
                            let foundIndex = -1;


                            for( let critItemIndex in this._unallocatedCriticals ) {
                                if(
                                    this._unallocatedCriticals[critItemIndex]
                                    && this._unallocatedCriticals[critItemIndex].tag === this.getArmorType()
                                ) {
                                    foundIndex = +critItemIndex;
                                    break;
                                }
                            }

                            this.moveCritical(
                                "un",
                                foundIndex,
                                loc["#text"] ? loc["#text"].toLowerCase().trim() : "un",
                                loc["@_index"] ? +loc["@_index"] : -1,

                            )
                        }

                    }


                }
            }

            if( jObj.mech.engine ) {
                this.setWalkSpeed( +jObj.mech.engine["@_rating"] / this._tonnage );
                this.setEngineTypeByName( jObj.mech.engine["#text"] );
            }

            if( jObj.mech.gyro ) {
                this.setGyroTypeByName( jObj.mech.gyro["#text"] );
            }

            if( jObj.mech.baseloadout ) {


                if( jObj.mech.baseloadout.clancase ) {

                }

                if( jObj.mech.baseloadout.equipment && jObj.mech.baseloadout.equipment.length > 0 ) {

                    for( let item of jObj.mech.baseloadout.equipment ) {
                        this._installSSWEquipment( item );
                    }

                    this._calcCriticals();

                    for( let item of this._equipmentList ) {
                        let foundIndex = -1;
                        for( let critItemIndex in this._unallocatedCriticals ) {
                            if( this._unallocatedCriticals[critItemIndex] && this._unallocatedCriticals[critItemIndex].tag === item.tag ) {

                                foundIndex = +critItemIndex;
                                break;
                            }
                        }


                        let success = this.moveCritical(
                            "un",
                            foundIndex,
                            item.allocationLocation ? item.allocationLocation : "un",
                            item.allocationIndex ? item.allocationIndex : -1,
                            item.split_location,
                        );

                        if( !success ) {
                            console.warn(
                                "unsuccessful crit allocation",
                                this.getName(),
                                item.name,
                                item.tag,
                                foundIndex,
                                item.allocationLocation,
                                item.allocationIndex,
                                item.criticals,
                                this._unallocatedCriticals,

                            )
                        }
                        item.location = item.allocationLocation;
                    }

                } else {
                    if( jObj.mech.baseloadout.equipment ) {
                        // a single weapon?!?!
                        this._installSSWEquipment( jObj.mech.baseloadout.equipment );


                        this._calcCriticals();

                        for( let item of this._equipmentList ) {
                            let foundIndex = -1;
                            for( let critItemIndex in this._unallocatedCriticals ) {
                                if( this._unallocatedCriticals[critItemIndex] && this._unallocatedCriticals[critItemIndex].tag === item.tag ) {
                                    foundIndex = +critItemIndex;
                                    break;
                                }
                            }

                            this.moveCritical(
                                "un",
                                foundIndex,
                                item.allocationLocation ? item.allocationLocation : "un",
                                item.allocationIndex ? item.allocationIndex : -1,
                                item.split_location,
                            );

                            item.location = item.allocationLocation;
                        }
                    }
                }

                if( jObj.mech.baseloadout.heatsinks ) {

                    if( jObj.mech.baseloadout.heatsinks["type"].toLowerCase().indexOf("single") > -1)
                        this.setHeatSinksType( "single" )
                    else
                        this.setHeatSinksType( "double" )

                    this.setAdditionalHeatSinks( (+ jObj.mech.baseloadout.heatsinks["@_number"] ) - 10 );

                    if( typeof(  jObj.mech.baseloadout.heatsinks.location ) === "object" ) {
                        this._calcCriticals();

                        try {
                            for( let loc of jObj.mech.baseloadout.heatsinks.location ) {
                                let foundIndex = -1;


                                    for( let critItemIndex in this._unallocatedCriticals ) {
                                        if( this._unallocatedCriticals[critItemIndex] && this._unallocatedCriticals[critItemIndex].tag === "heat-sink" ) {
                                            foundIndex = +critItemIndex;
                                            break;
                                        }
                                    }


                                if( foundIndex > -1 ) {

                                    this.moveCritical(
                                        "un",
                                        foundIndex,
                                        loc["#text"] ? loc["#text"].toLowerCase().trim() : "un",
                                        loc["@_index"] ? +loc["@_index"] : -1,
                                    );
                                }


                            }
                        }

                        catch {
                            let foundIndex = -1;


                            for( let critItemIndex in this._unallocatedCriticals ) {
                                if( this._unallocatedCriticals[critItemIndex] && this._unallocatedCriticals[critItemIndex].tag === "heat-sink" ) {
                                    foundIndex = +critItemIndex;
                                    break;
                                }
                            }


                            if( foundIndex > -1 ) {
                                this.moveCritical(
                                    "un",
                                    foundIndex,
                                    jObj.mech.baseloadout.heatsinks.location["#text"] ? jObj.mech.baseloadout.heatsinks.location["#text"].toLowerCase().trim() : "un",
                                    jObj.mech.baseloadout.heatsinks.location["@_index"] ? +jObj.mech.baseloadout.heatsinks.location["@_index"] : -1,
                                );
                            }

                        }
                    }

                }


                if( jObj.mech.baseloadout.jumpjets ) {

                    let jumpJetNumber = jObj.mech.baseloadout.jumpjets["@_number"];
                    this.setJumpSpeed(jumpJetNumber);
                    this._calcCriticals();

                    let jjType = "jj-standard";

                    if( jObj.mech.baseloadout.jumpjets.type && jObj.mech.baseloadout.jumpjets.type.toLowerCase().indexOf("improved") > -1 ) {
                        jjType = "jj-improved";
                    }
                    for( let loc of jObj.mech.baseloadout.jumpjets.location ) {
                        let foundIndex = -1;

                        for( let critItemIndex in this._unallocatedCriticals ) {
                            if( this._unallocatedCriticals[critItemIndex] && this._unallocatedCriticals[critItemIndex].tag === jjType ) {
                                foundIndex = +critItemIndex;
                                break;
                            }
                        }

                        if( foundIndex > -1 ) {
                            this.moveCritical(
                                "un",
                                foundIndex,
                                loc["#text"] ? loc["#text"].toLowerCase().trim() : "un",
                                loc["@_index"] ? +loc["@_index"] : -1,
                            );
                        }

                    }
                }

                if( jObj.mech.baseloadout.info ) {

                }

                if( jObj.mech.baseloadout.source ) {

                }
            }

            this._calc();
            this.calcAlphaStrike();

            if( this._unallocatedCriticals && this._unallocatedCriticals.length > 0 ) {
                this.sswImportErrors.push("Unallocated Criticals: " + this._unallocatedCriticals.length);
                for( let crit of this._unallocatedCriticals ) {
                    this.sswImportErrors.push("- " + crit.name + " (" + crit.tag + ")");
                }

            }
        }
    }

    public get sswImportErrors(): string[] {
        return this._sswImportErrors;
    }



    public getTotalBVFrontWeapons(): number {


        let rv = 0;
        for( let eq of this._equipmentList ) {
            if(
                eq.location &&
                (
                    eq.location === "ct"
                    ||
                    eq.location === "lt"
                    ||
                    eq.location === "rt"
                    ||
                    eq.location === "rl"
                    ||
                    eq.location === "ll"
                    ||
                    eq.location === "hd"
                )
                &&
                !eq.rear
            ) {
                rv += eq.battleValue ? eq.battleValue : 0
            }
        }

        return rv;
    }

    public isNotOnTorsoHeadOrLegs(
        loc: string | undefined
    ): boolean {

        if(
            loc
            &&
            (
                loc === "ct"
                ||
                loc === "lt"
                ||
                loc === "rt"
                ||
                loc === "rl"
                ||
                loc === "ll"
                ||
                loc === "hd"
            )
        ) {
            return false
        }
        return true;
    }
    public getTotalBVRearWeapons(): number {

        let rv = 0;
        for( let eq of this._equipmentList ) {
            if(
                eq.location
                &&
                (
                    eq.location === "ct"
                    ||
                    eq.location === "lt"
                    ||
                    eq.location === "rt"
                    ||
                    eq.location === "rl"
                    ||
                    eq.location === "ll"
                    ||
                    eq.location === "hd"
                )
                && eq.rear
            ) {
                rv += eq.battleValue ? eq.battleValue : 0
            }
        }

        return rv;
    }

    private _getToLocationFromTag(
        fromLocation: string,
    ): ICriticalSlot[] {


        if( fromLocation === "un" ) {
            return this._unallocatedCriticals;
        } else if( fromLocation === "hd" ) {

            return this._criticals.head;

        } else if( fromLocation === "ct" ) {
            return this._criticals.centerTorso;
        } else if( fromLocation === "rt" ) {
            return this._criticals.rightTorso;

        } else if( fromLocation === "ra" ) {

            return this._criticals.rightArm;

        } else if( fromLocation === "rl" ) {

            return this._criticals.rightLeg;

        } else if( fromLocation === "lt" ) {

            return this._criticals.leftTorso;

        } else if( fromLocation === "la" ) {

            return this._criticals.leftArm;

        } else if( fromLocation === "ll" ) {

            return this._criticals.leftLeg;

        }

        return this._unallocatedCriticals;

    }

    public criticalCanBePlaced(
        toLocTag: string,
        toSize: number,
        toIndex: number,
        fromItem: ICriticalSlot | null,
    ): boolean {
        // Step One check to see if TO has enough slots for item....
        let hasSpace = true;

        let toLocation = this._getToLocationFromTag( toLocTag );

        if( toIndex === -1 ) {

            for( let itemIndex = 0; itemIndex < toLocation.length; itemIndex++ ) {

                if( toLocation[itemIndex] === null || typeof(toLocation[itemIndex]) === "undefined" ) {

                    toIndex = +itemIndex;
                    break;
                }

            }
            if( toIndex === -1 ) {

                let numSlots = 12;
                if(
                    toLocTag === "ll"
                    ||  toLocTag === "rl"
                    ||  toLocTag === "hd"
                ) {
                    numSlots = 6;
                }

                if( toLocation.length < numSlots) {
                    toIndex = toLocation.length - 1;
                }
            }
        }

        if( toLocation.length < toIndex + toSize || toIndex < 0)
            return false;

        for( let testC = 0; testC < toSize; testC++) {
            if(
                toLocation[toIndex + testC]
            ) {
                if( fromItem ) {
                    if( toLocation[toIndex + testC].uuid !== fromItem.uuid ) {

                    } else {
                        hasSpace = false;
                    }

                } else {
                    hasSpace = false;
                }

            }
        }
        return hasSpace;
    }

}

export interface IClusterHit {
    location: string;
    damage: number;
    critical: boolean;
  }



  function sortByAdjustedBVThenHeat(
      a: IEquipmentItem,
      b: IEquipmentItem,
      mech: BattleMech,
) {

    let aBattleValue = a.battleValue ? a.battleValue : 0;
    let bBattleValue = b.battleValue ? b.battleValue : 0;

    if( mech && a.rear && mech.getTotalBVFrontWeapons() >= mech.getTotalBVRearWeapons()) {
        aBattleValue = aBattleValue / 2;
    } else if( mech && !a.rear && mech.getTotalBVFrontWeapons() < mech.getTotalBVRearWeapons()) {
        aBattleValue = aBattleValue / 2;
    }

    if( mech && b.rear && mech.getTotalBVFrontWeapons() >= mech.getTotalBVRearWeapons() ) {
        bBattleValue = bBattleValue / 2;
    } else if( mech && !b.rear && mech.getTotalBVFrontWeapons() < mech.getTotalBVRearWeapons()) {
        bBattleValue = bBattleValue / 2;
    }

    if(  aBattleValue < bBattleValue )
        return 1;
    if(  aBattleValue > bBattleValue )
        return -1;



    if( a.heat < b.heat )
        return 1;
    if( a.heat > b.heat )
        return -1;


    // if( a.rear < b.rear )
    //     return -1;
    // if( a.rear > b.rear )
    //     return 1;

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

export interface IMechDamageAllocation {
    head: boolean[],
    centerTorso: boolean[],
    rightTorso: boolean[],
    leftTorso: boolean[],
    leftArm: boolean[],
    rightArm: boolean[],
    leftLeg: boolean[],
    rightLeg: boolean[],

    rightTorsoRear: boolean[],
    centerTorsoRear: boolean[],
    leftTorsoRear: boolean[],
}

export interface IMechDamageLog {
    turn: number;
    location: string;
    rear: boolean;
    amount: number;
    damageResults: IDamageResults[];
}

export interface IDamageResults {
    criticals: number;
    criticalRoll: number;
    criticalEffects: string[];
    location: string;
    amount: number;
}