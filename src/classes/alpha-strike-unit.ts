import { CONST_AS_PILOT_ABILITIES, IASPilotAbility } from "../data/alpha-strike-pilot-abilities";
import { CONST_AS_SPECIAL_ABILITIES, IASSpecialAbility } from "../data/alpha-strike-special-abilities";
import { IAlphaStrikeExport } from "../utils/calculateAlphaStrikeValue";
import { generateUUID } from "../utils/generateUUID";
import Pilot, { IPilot } from "./pilot";

export interface IAlphaStrikeDamage {
    short: number;
    medium: number;
    long: number;
    extreme: number;
    shortMinimal?: boolean;
    mediumMinimal?: boolean;
    longMinimal?: boolean;
    extremeMinimal?: boolean;
}

export interface IMoveNumber {
    move: number;
    currentMove: number;
    type: string;
};

export interface ASMULType {
    Id: number;
    Image: string | null;
    Name: string;
    SortOrder: number;
}
export interface ASMULRole {
    Id: number;
    Image: string | null;
    Name: string;
    SortOrder: number;
}
export interface ASMULTech {
    Id: number;
    Image: string | null;
    Name: string;
    SortOrder: number;
}
export interface IASMULUnit {
    // mechCreatorUUID: string;
    FormatedTonnage: string | null; // typo in MUL
    GroupName: string | null;
    BFAbilities: string | null;
    BFArmor: number;
    BFDamageExtreme: number;
    BFDamageLong: number;
    BFDamageMedium: number;
    BFDamageShort: number;
    BFMove: string;
    BFOverheat: number;
    BFPointValue: number;
    BFSize: number;
    BFStructure: number;
    BFTMM: number;
    BFThreshold: number;
    BFType: string | null;
    BattleValue: number;
    Class: string;

    Cost: number;
    DateIntroduced: string;
    EraIcon:string;
    EraId: number;
    EraStart: number;
    Id: number;
    ImageUrl: string;
    IsFeatured: boolean;
    IsPublished: boolean;
    Name: string;
    RS: string;
    RSId: number;
    Release: number;
    Role: ASMULRole;
    Rules: string;
    Skill: number;
    TRO: string;
    TROId: number;
    Technology: ASMULTech;
    Tonnage: number;
    Type: ASMULType;
    Variant: string | null;

    BFDamageShortMin?: boolean;
    BFDamageMediumMin?: boolean;
    BFDamageLongMin?: boolean;
    BFDamageExtremeMin?: boolean;
}

export interface IAlphaStrikeUnitExport {
    mechCreatorUUID: string;


    customName?: string;

    currentArmor?: boolean[];
    currentStructure?: boolean[];
    engineHits?: boolean[];
    fireControlHits?: boolean[];
    mpControlHits?: boolean[];
    weaponHits?: boolean[];
    vehicleMotive910?: boolean[];
    vehicleMotive11?: boolean[];
    vehicleMotive12?: boolean;

    tmm: number;
    // Additional Fields we use internally
    classification: string;
    costCR: number;
    mulID: number;
    currentHeat: number;
    damage: IAlphaStrikeDamage;
    variant: string;
    dateIntroduced: string;
    name: string;
    tonnage: number;
    tro: string;
    role: string;
    threshold: number;
    pilot: IPilot;
    imageURL: string;

    move: IMoveNumber[];
    jumpMove: number;
    structure: number;
    armor: number;
    type: string;
    size: number;
    showDetails: boolean;
    abilities: string | string[];
    overheat: number;
    basePoints: number;
    currentSkill: number;

    uuid: string;
}

export class AlphaStrikeUnit {

    public uuid: string = generateUUID();
    public originalStats: IASMULUnit | null = null;

    public mechCreatorUUID: string = "";

    public classification: string = "";
    public costCR: number = 0;

    public isAerospace: boolean = false;
    public isInfantry: boolean = false;
    public immobile: boolean = false;

    public variant: string = "";
    public name: string = "";
    public dateIntroduced: string = "";
    public era: string = "";

    public tro: string = "";

    public showDetails: boolean = false;

    public active: boolean = true;

    public tonnage: number = 0;

    public type: string = "BM";
    public size: number = 0;
    public tmm: number = 0;

    public imageURL: string = "";

    public currentMove: string = "";
    public currentMoveHexes: string = "";
    public currentMoveSprint: string = "";
    public currentMoveHexesSprint: string = "";
    public currentTMM: string = "";

    public armor: number = 0;
    public structure: number = 1;

    public threshold: number = 0;

    public currentToHitShort: number = 0;
    public currentToHitMedium: number = 0;
    public currentToHitLong: number = 0;
    public currentToHitExtreme: number = 0;

    public damage: IAlphaStrikeDamage = {
            short: 0,
            medium: 0,
            long: 0,
            extreme: 0,
            shortMinimal: false,
            mediumMinimal: false,
            longMinimal: false,
            extremeMinimal: false,
        };

    public move: IMoveNumber[] = [];
    public jumpMove: number = 0;

    public mulID: number = 0;

    public abilities: string[] = [];

    public overheat: number = 0;
    public role = "";

    public basePoints: number = 0;
    public currentPoints: number = 0;
    public currentHeat: number = 0;

    public currentDamage: IAlphaStrikeDamage = {
        short: 0,
        medium: 0,
        long: 0,
        extreme: 0,
        shortMinimal: false,
        mediumMinimal: false,
        longMinimal: false,
        extremeMinimal: false,
    };

    public currentArmor: boolean[] = [];
    public currentStructure: boolean[] = [];
    public engineHits: boolean[] = [];
    public fireControlHits: boolean[] = [];
    public mpControlHits: boolean[] = [];
    public weaponHits: boolean[] = [];

    public vehicleMotive910: boolean[] = [];
    public vehicleMotive11: boolean[] = [];
    public vehicleMotive12: boolean = false;

    private _pilot: Pilot = new Pilot( {
        name: "",
        piloting: 5,
        gunnery: 4,
        wounds: 0,
        alphaStrikeAbilities: [],
    });

    public customName: string = "";

    constructor( ) {
        this._pilot = new Pilot();
    }

    public setPilotSkill( nv: number ) {
        this._pilot.gunnery = nv;
    }

    public importMUL( incomingMechData: IASMULUnit ) {

        if( typeof(incomingMechData) !== "undefined" && incomingMechData !== null ) {

            this.costCR = +incomingMechData.Cost;

            this.variant = incomingMechData.Variant ? incomingMechData.Variant : "";
            this.name = incomingMechData.Name;
            this.dateIntroduced = incomingMechData.DateIntroduced;

            // if( incomingMechData.mechCreatorUUID ) {
            //     this.mechCreatorUUID = incomingMechData.mechCreatorUUID;
            // }

            this.tro = incomingMechData.TRO;



            this.mulID = incomingMechData.Id;

            this.tonnage = +incomingMechData.Tonnage;

            this.threshold = +incomingMechData.BFThreshold;

            if( incomingMechData.Role && incomingMechData.Role.Name ) {
                this.role = incomingMechData.Role.Name;
            } else {
                this.role = "Not Specified";
            }

            if( incomingMechData.BFType )
                this.type = incomingMechData.BFType;
            this.size = incomingMechData.BFSize;

            this.armor = +incomingMechData.BFArmor;
            this.structure = +incomingMechData.BFStructure;


            this.damage = {
                short: incomingMechData.BFDamageShort,
                medium: incomingMechData.BFDamageMedium,
                long: incomingMechData.BFDamageLong,
                extreme: 0,
            };

            if( incomingMechData.BFDamageExtreme ) {
                this.damage.extreme = incomingMechData.BFDamageExtreme;
            } else {
                this.damage.extreme = 0;
            }

            if( incomingMechData.BFDamageShortMin ) {
                this.damage.shortMinimal = true;
            }
            if( incomingMechData.BFDamageMediumMin ) {
                this.damage.mediumMinimal = true;
            }
            if( incomingMechData.BFDamageLongMin ) {
                this.damage.longMinimal = true;
            }
            if( incomingMechData.BFDamageExtremeMin ) {
                this.damage.extremeMinimal = true;
            }

            if( incomingMechData.BFAbilities && incomingMechData.BFAbilities.trim() ) {
                this.abilities = incomingMechData.BFAbilities.split(",");
                if (!this.abilities){
                    this.abilities = [];
                } else {
                    for( let abi of this.abilities ) {
                        abi = abi.trim();
                    }
                }
            }

            this.overheat = +incomingMechData.BFOverheat;

            this.basePoints = +incomingMechData.BFPointValue;



            this.imageURL = incomingMechData.ImageUrl;

            let tmpMove = incomingMechData.BFMove;
            this.move = [];
            let tmpMoveObj: IMoveNumber = {
                move: 0,
                currentMove: 0,
                type: ""
            }
            while( tmpMove.indexOf('"') > 0 )
                tmpMove = tmpMove.replace('"', "");
            if( tmpMove.indexOf("/") > 0 ) {
                //split move....
                let moveArray = tmpMove.split( "/" );

                for( let moveCount = 0; moveCount < moveArray.length; moveCount++ ) {
                    tmpMoveObj = {
                        move: 0,
                        currentMove: 0,
                        type: ""
                    };

                    tmpMoveObj.move = this._getRawNumber( moveArray[moveCount] );
                    tmpMoveObj.type = this._getRawAlpha( moveArray[moveCount] );

                    this.move.push( tmpMoveObj );
                }

            } else {

                tmpMoveObj = {
                    move: 0,
                    currentMove: 0,
                    type: ""
                };

                tmpMoveObj.move = this._getRawNumber( tmpMove );
                tmpMoveObj.type = this._getRawAlpha( tmpMove );

                this.move.push( tmpMoveObj );

            }
            this.calcCurrentValues();
        }

    }

    public importUnit( incomingMechData: IAlphaStrikeUnitExport ) {
        if( incomingMechData && incomingMechData.uuid )
            this.uuid = incomingMechData.uuid;
        if( typeof(incomingMechData) !== "undefined" && incomingMechData !== null ) {

            // Internally Processed Data

            if( incomingMechData.classification )
                this.classification = incomingMechData.classification;
            this.costCR = incomingMechData.costCR / 1;

            this.mulID = incomingMechData.mulID / 1;

            this.imageURL = incomingMechData.imageURL;

            this.currentHeat = incomingMechData.currentHeat;

            this.variant = incomingMechData.variant;
            this.tmm = incomingMechData.tmm;
            this.name = incomingMechData.name;
            this.dateIntroduced = incomingMechData.dateIntroduced;

            this.tro = incomingMechData.tro;

            this.role =  incomingMechData.role;

            this.tonnage = incomingMechData.tonnage / 1;

            this.threshold = incomingMechData.threshold / 1;

            this.type = incomingMechData.type;
            this.size = incomingMechData.size / 1;

            this.armor = incomingMechData.armor / 1;
            this.structure = incomingMechData.structure / 1;

            this.move = incomingMechData.move;
            this.jumpMove = +incomingMechData.jumpMove;

            this.damage = {
                short: incomingMechData.damage.short,
                medium: incomingMechData.damage.medium,
                long: incomingMechData.damage.long,
                extreme: incomingMechData.damage.extreme,
                shortMinimal: incomingMechData.damage.shortMinimal ? true : false,
                mediumMinimal: incomingMechData.damage.mediumMinimal ? true : false,
                longMinimal: incomingMechData.damage.longMinimal ? true : false,
                extremeMinimal: incomingMechData.damage.extremeMinimal ? true : false,
            };

            if( !this.damage.extreme )
                this.damage.extreme = 0;

            this.move = incomingMechData.move;

            if( typeof(incomingMechData.abilities) === "string" ) {
                this.abilities = incomingMechData.abilities.split(",");
                for( let abi of this.abilities ) {
                    abi = abi.trim();
                }
            } else {
                this.abilities = incomingMechData.abilities;
            }


            this.showDetails = incomingMechData.showDetails;

            this.overheat = incomingMechData.overheat / 1;

            this.basePoints = incomingMechData.basePoints / 1;


            if( incomingMechData.pilot)
                this._pilot.import(incomingMechData.pilot);

            if( incomingMechData.currentSkill && incomingMechData.currentSkill > 0  )
                this._pilot.gunnery = incomingMechData.currentSkill;


            this.currentPoints = this.basePoints;
        }

        if( incomingMechData.currentArmor ) {
            this.currentArmor = incomingMechData.currentArmor;
        }

        if( incomingMechData.currentStructure ) {
            this.currentStructure = incomingMechData.currentStructure;
        }

        if( incomingMechData.engineHits )
        this.engineHits = incomingMechData.engineHits;

        if( incomingMechData.fireControlHits )
            this.fireControlHits = incomingMechData.fireControlHits;

        if( incomingMechData.vehicleMotive910 ) {
            this.vehicleMotive910 = incomingMechData.vehicleMotive910;
        }
        if( incomingMechData.vehicleMotive11 ) {
            this.vehicleMotive11 = incomingMechData.vehicleMotive11;
        }
        if( incomingMechData.vehicleMotive12 ) {
            this.vehicleMotive12 = incomingMechData.vehicleMotive12;
        }

        if( incomingMechData.mpControlHits )
        this.mpControlHits = incomingMechData.mpControlHits;

        if( incomingMechData.weaponHits )
            this.weaponHits = incomingMechData.weaponHits;

            if( incomingMechData.customName )
            this.customName = incomingMechData.customName;


        if( incomingMechData.pilot)
            this._pilot.import(incomingMechData.pilot);


        this.calcCurrentValues();
    }

    public get currentSkill(): number {
        return this._pilot.gunnery;
    }

    public get currentPilotAbilityID(): number {

        if( this._pilot.alphaStrikeAbilities.length > 0 ) {
            return this._pilot.alphaStrikeAbilities[0];
        }
        return 0;
    }

    public get currentPilotAbilityID2(): number {

        if( this._pilot.alphaStrikeAbilities.length > 1 ) {
            return this._pilot.alphaStrikeAbilities[1];
        }
        return 0;
    }

    public get currentPilotAbilityID3(): number {

        if( this._pilot.alphaStrikeAbilities.length > 2 ) {
            return this._pilot.alphaStrikeAbilities[2];
        }
        return 0;
    }

    public get currentPilotAbility(): IASPilotAbility | null {

        if( this._pilot.alphaStrikeAbilities.length > 0 ) {
            for( let abi of CONST_AS_PILOT_ABILITIES ) {
                if( this._pilot.alphaStrikeAbilities[0] === abi.id )
                    return abi;
            }

        }
        return null;
    }

    public getPilotAbilities(): any[] {
        let rv: any[] = [];



        for( let id of this._pilot.alphaStrikeAbilities ) {
            let found = false;
            for( let card of CONST_AS_PILOT_ABILITIES ) {
                if( id === card.id ) {
                    rv.push(card);
                    found = true;
                    break;
                }
            }
            if(!found ) rv.push( null );
        }


        return rv;
    }

    getPilotAbilityList(): string[] {
        let rv: string[] = [];

        for( let id of this._pilot.alphaStrikeAbilities ) {
            for( let card of CONST_AS_PILOT_ABILITIES ) {
                if( id === card.id ) {
                    rv.push(card.ability + " (" + card.cost + ")");
                    break;
                }
            }
        }


        return rv;
    }

    public getTotalPilotAbilityPoints(): number {
        let rv = 0;

        for( let id of this._pilot.alphaStrikeAbilities ) {
            for( let card of CONST_AS_PILOT_ABILITIES ) {
                if( id === card.id ) {
                    rv += card.cost;
                }
            }
        }


        return rv;
    }

    public set currentPilotAbilityID( nv: number ) {
        this._pilot.alphaStrikeAbilities = [nv];

    }
    public set currentPilotAbilityID2( nv: number ) {
        while( this._pilot.alphaStrikeAbilities.length < 2 )
            this._pilot.alphaStrikeAbilities.push(0);
        this._pilot.alphaStrikeAbilities[1] = nv;

    }

    public set currentPilotAbilityID3( nv: number ) {
        while( this._pilot.alphaStrikeAbilities.length < 3 )
            this._pilot.alphaStrikeAbilities.push(0);
        this._pilot.alphaStrikeAbilities[2] = nv;

    }


    private _getRawNumber( incomingString: string ): number {
        let myString = incomingString.replace(/\D/g,'');
        return +myString / 1;
    }

    private _getRawAlpha( incomingString: string ): string {
        let myString = incomingString.replace(/\d/g,'');
        return myString.toLowerCase().trim();
    }

    public toggleShowingDetails() {

        if( this.showDetails) {
            this.showDetails = false;
        } else {
            this.showDetails = true;
        }

    }

    public setSkill( newSkillValue: number ) {
        this._pilot.gunnery = newSkillValue;
        // this._pilot.piloting = newSkillValue + 1;
        this.calcCurrentValues();
    }

    public isUnderStrength(): boolean {

        if( this.getCurrentArmor() < this.armor ) {
            return true;
        }
        if( this.getCurrentStructure() < this.structure ) {
            return true;
        }

        if( this.getEngineHits() > 0 ) {
            return true;
        }

        if( this.getFireControlHits() > 0 ) {
            return true;
        }

        if( this.getMPHits() > 0 ) {
            return true;
        }

        if( this.getWeaponHits() > 0 ) {
            return true;
        }

        if(
            ( this.type && this.type.trim().toLowerCase() === "sv" )
                ||
            ( this.type && this.type.trim().toLowerCase() === "cv" )
        ) {

            for( let mpHitsCount = 0; mpHitsCount < this.vehicleMotive910.length; mpHitsCount++) {
                if( this.vehicleMotive910[ mpHitsCount ] ) {
                    return true;
                }
            }
            for( let mpHitsCount = 0; mpHitsCount < this.vehicleMotive11.length; mpHitsCount++) {
                if( this.vehicleMotive11[ mpHitsCount ] ) {
                    return true;
                }
            }

            if( this.vehicleMotive12 ) {
                return true;
            }
        }
        return false;
    }


    public getEngineHits(): number {
        let rv = 0;
        if( this.engineHits ) {
            for( let val of this.engineHits  ) {
                if( val ) {
                    rv++;
                }
            }
        }

        return rv;
    }

    hasTripeStrengthMyomer(): boolean {

        return this.hasAbility("tsm");

    }

    public hasAbility( ability: string ): boolean {
        for( let abi of this.abilities ) {
            if( abi.toLowerCase().trim() === ability.toLowerCase().trim()) {
                return true;
            }
        }
        return false;
    }
    public getFireControlHits(): number {
        let rv = 0;
        if( this.engineHits ) {
            for( let val of this.fireControlHits  ) {
                if( val ) {
                    rv++;
                }
            }
        }

        return rv;
    }

    public getMPHits(): number {
        let rv = 0;
        if( this.engineHits ) {
            for( let val of this.mpControlHits  ) {
                if( val ) {
                    rv++;
                }
            }
        }

        return rv;
    }

    public isWrecked(): boolean {
        this.calcCurrentValues()
        return !this.active;
    }


    public getWeaponHits(): number {
        let rv = 0;
        if( this.engineHits ) {
            for( let val of this.weaponHits  ) {
                if( val ) {
                    rv++;
                }
            }
        }

        return rv;
    }

    public reset() {
        this.currentArmor = [];
        this.currentStructure = [];
        this.currentHeat = 0;
        this.engineHits = [];
        this.fireControlHits = [];
        this.weaponHits = [];
        this.mpControlHits = [];
        this.engineHits = [];
        this.vehicleMotive910 = [];
        this.vehicleMotive11 = [];
        this.vehicleMotive12 = false;
        this.calcCurrentValues();
    }

    public calcCurrentValues() {


        while( this._pilot.alphaStrikeAbilities.length < 3 ) this._pilot.alphaStrikeAbilities.push(0);
        if( this.currentSkill > 4 ) {
            this._pilot.alphaStrikeAbilities[0] = 0;
            this._pilot.alphaStrikeAbilities[1] = 0;
            this._pilot.alphaStrikeAbilities[2] = 0;
        } else if( this.currentSkill > 3 ) {
            this._pilot.alphaStrikeAbilities[1] = 0;
            this._pilot.alphaStrikeAbilities[2] = 0;
        } else if( this.currentSkill > 1 ) {
            this._pilot.alphaStrikeAbilities[2] = 0;
        }
        if(
            (this.type && this.type.trim().toLowerCase() === "sv")
                ||
            (this.type && this.type.trim().toLowerCase() === "cv")
        ) {
            while( this.mpControlHits.length < 5 ) {
                this.mpControlHits.push( false );
            }

        }

        this.isAerospace = false;
        if(
            (this.type && this.type.trim().toLowerCase() === "af")
                    ||
            (this.type && this.type.trim().toLowerCase() === "cf")
        ) {
            this.isAerospace = true;
        }

        this.isInfantry = false;
        if(
            (this.type && this.type.trim().toLowerCase() === "ba")
                    ||
            (this.type && this.type.trim().toLowerCase() === "ci")
        ) {
            this.isInfantry = true;
        }

        let pvDifference = 0;
        if( this.currentSkill < 4) {
            // improved skill....

            if( this.basePoints <= 7) {
                pvDifference = 1;
            } else if( this.basePoints <= 12) {
                pvDifference = 2;
            } else if( this.basePoints <= 17) {
                pvDifference = 3;
            } else if( this.basePoints <= 22) {
                pvDifference = 4;
            } else if( this.basePoints <= 27) {
                pvDifference = 5;
            } else if( this.basePoints <= 32) {
                pvDifference = 6;
            } else if( this.basePoints <= 37) {
                pvDifference = 7;
            } else if( this.basePoints <= 42) {
                pvDifference = 8;
            } else if( this.basePoints <= 47) {
                pvDifference = 9;
            } else if( this.basePoints <= 52) {
                pvDifference = 10;
            } else {
                pvDifference = 10 + Math.ceil( ( this.basePoints - 52) / 5 );
            }
            this.currentPoints = this.basePoints + ( pvDifference * ( 4 - this.currentSkill ) ) ;
        } else if( this.currentSkill > 4) {
            // low skill....

            if( this.basePoints <= 14) {
                pvDifference = 1;
            } else if( this.basePoints <= 24) {
                pvDifference = 2;
            } else if( this.basePoints <= 34) {
                pvDifference = 3;
            } else if( this.basePoints <= 44) {
                pvDifference = 4;
            } else if( this.basePoints <= 54) {
                pvDifference = 5;
            } else if( this.basePoints <= 64) {
                pvDifference = 6;
            } else if( this.basePoints <= 74) {
                pvDifference = 7;
            } else if( this.basePoints <= 84) {
                pvDifference = 8;
            } else if( this.basePoints <= 94) {
                pvDifference = 9;
            } else if( this.basePoints <= 104) {
                pvDifference = 10;
            } else {
                pvDifference = 10 + Math.floor( ( this.basePoints - 104) / 10 );
            }
            this.currentPoints = this.basePoints - ( pvDifference * ( this.currentSkill - 4) );
        } else {
            // this.currentSkill = 4;
            this.currentPoints = this.basePoints;
        }

        if( typeof( this.currentArmor ) === "undefined" || this.currentArmor.length === 0 ) {
            this.currentArmor = [];
            for( let armorCount = 0; armorCount < this.armor; armorCount++)
                this.currentArmor.push( false );
        }

        if( typeof( this.currentStructure ) === "undefined" || this.currentStructure.length === 0 ) {
            this.currentStructure = [];
            for( let structureCount = 0; structureCount < this.structure; structureCount++)
                this.currentStructure.push( false );
        }

        if( typeof( this.engineHits ) === "undefined"  || this.engineHits.length === 0  ) {
            this.engineHits = [];
            for( let engineHitsCount = 0; engineHitsCount < 2; engineHitsCount++)
                this.engineHits.push( false );
        }

        if( typeof( this.fireControlHits ) === "undefined"  || this.fireControlHits.length === 0  ) {
            this.fireControlHits = [];
            for( let fcHitsCount = 0; fcHitsCount < 4; fcHitsCount++)
                this.fireControlHits.push( false );
        }

        if( typeof(this.vehicleMotive910) === "undefined" || this.vehicleMotive910.length === 0 ) {
            this.vehicleMotive11 = [];
            for(let hitCount = 0; hitCount < 2; hitCount++) {
                this.vehicleMotive910.push( false );
            }
        }
        if( typeof(this.vehicleMotive11) === "undefined" || this.vehicleMotive11.length === 0 ) {
            this.vehicleMotive11 = [];
            for(let hitCount = 0; hitCount < 2; hitCount++) {
                this.vehicleMotive11.push( false );
            }
        }


        if( typeof( this.mpControlHits ) === "undefined"  || this.mpControlHits.length === 0  ) {
            this.mpControlHits = [];
            let numberOfHits = 4;
            if(
                ( this.type && this.type.toLowerCase() === "bm" )
                    ||
                ( this.type && this.type.toLowerCase() === "im" )
            ) {
                // mechs have 4 hits
                numberOfHits = 4;
            }

            if(
                ( this.type && this.type.trim().toLowerCase() === "sv" )
                    ||
                ( this.type && this.type.trim().toLowerCase() === "cv" )
            ) {
                // vehicles have 5 hits
                numberOfHits = 5;
            }

            for( let mpHitsCount = 0; mpHitsCount < numberOfHits; mpHitsCount++)
                this.mpControlHits.push( false );
        }

        if( typeof( this.weaponHits ) === "undefined"  || this.weaponHits.length === 0  ) {
            this.weaponHits = [];
            for( let weaponHitsCount = 0; weaponHitsCount < 4; weaponHitsCount++)
                this.weaponHits.push( false );
        }





        let currentWeaponHits = 0;
        for( let weaponHitsCount = 0; weaponHitsCount < this.weaponHits.length; weaponHitsCount++) {
            if( this.weaponHits[ weaponHitsCount ] )
                currentWeaponHits++;
        }

        let currentFCHits = 0;
        for( let fcHitsCount = 0; fcHitsCount < this.fireControlHits.length; fcHitsCount++) {
            if( this.fireControlHits[ fcHitsCount ] )
                currentFCHits++;
        }

        // let currentMPHits = 0;
        // for( let mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
        //     if( this.mpControlHits[ mpHitsCount ] )
        //         currentMPHits++;
        // }

        let currentEngineHits = 0;
        for( let engineHitsCount = 0; engineHitsCount < this.engineHits.length; engineHitsCount++) {
            if( this.engineHits[ engineHitsCount ] )
                currentEngineHits++;
        }

        // Calculate Current Damage Values from Crits...
        let shortDamage = this.damage.short;
        let mediumDamage = this.damage.medium;
        let longDamage = this.damage.long;
        let extremeDamage = this.damage.extreme;

        if( shortDamage.toString().toString() !== "0*") {
            shortDamage = (+shortDamage - currentWeaponHits);
        } else {
            if( currentWeaponHits )
                shortDamage = 0;
        }

        if( mediumDamage.toString() !== "0*") {
            mediumDamage = (+mediumDamage - currentWeaponHits)
        } else {
            if( currentWeaponHits )
                mediumDamage =0;
        }

        if( longDamage.toString() !== "0*") {
            longDamage = (+longDamage - currentWeaponHits)
        } else {
            if( currentWeaponHits )
                longDamage = 0;
        }

        if( extremeDamage.toString() !== "0*") {
            extremeDamage = (+extremeDamage - currentWeaponHits)
        } else {
            if( currentWeaponHits )
                extremeDamage = 0;
        }

        if( +shortDamage < 0 )
            shortDamage = 0;

        if( +mediumDamage < 0 )
            mediumDamage = 0;

        if( +longDamage < 0 )
            longDamage = 0;

        if( +extremeDamage < 0 )
            extremeDamage = 0;

        this.currentDamage = {
            short: shortDamage,
            medium: mediumDamage,
            long: longDamage,
            extreme: extremeDamage,
            shortMinimal: this.damage.shortMinimal ? true : false,
            mediumMinimal: this.damage.mediumMinimal ? true : false,
            longMinimal: this.damage.longMinimal ? true : false,
            extremeMinimal: this.damage.extremeMinimal ? true : false,
        };


        for( let moveC = 0; moveC < this.move.length; moveC++ ) {
            this.move[moveC].currentMove = this.move[moveC].move;
        }

        // Calculate Critical Movement
        if(
            ( this.type && this.type.toLowerCase() === "bm" )
                ||
            ( this.type && this.type.toLowerCase() === "im" )
        ) {
            // for BattleMechs
            for( let count = 0; count < this.getMPHits(); count++ ) {
                for( let moveC = 0; moveC < this.move.length; moveC++ ) {
                    let moveHit = Math.round(this.move[moveC].currentMove / 2);
                    if( moveHit < 2 ) {
                        moveHit = 2;
                    }
                    this.move[moveC].currentMove -= moveHit;
                    if( this.move[moveC].currentMove < 0 ) {
                        this.move[moveC].currentMove = 0;
                    }
                }
            }

        }

        if(
            ( this.type && this.type.trim().toLowerCase() === "sv" )
                ||
            ( this.type && this.type.trim().toLowerCase() === "cv" )
        ) {
            let vehicle11Hits = 0;
            let vehicle910Hits = 0;

            for( let mpHitsCount = 0; mpHitsCount < this.vehicleMotive910.length; mpHitsCount++) {
                if( this.vehicleMotive910[ mpHitsCount ] ) {
                    vehicle910Hits++;
                }
            }
            for( let mpHitsCount = 0; mpHitsCount < this.vehicleMotive11.length; mpHitsCount++) {
                if( this.vehicleMotive11[ mpHitsCount ] ) {
                    vehicle11Hits++;
                }
            }

            for( let moveC = 0; moveC < this.move.length; moveC++ ) {

                for( let count = 0; count < vehicle11Hits; count++) {
                    let half = Math.floor( this.move[moveC].currentMove / 2 );
                    if( half < 2 ) {
                        half = 2;
                    }
                    this.move[moveC].currentMove -= half;
                }

                for( let count = 0; count < vehicle910Hits; count++) {
                    this.move[moveC].currentMove -= 2;
                }

                if( this.move[moveC].currentMove < 0 ) {
                    this.move[moveC].currentMove = 0;
                }

                if( this.vehicleMotive12 ) {
                    this.move[moveC].currentMove = 0;
                }
            }
        }

        this.currentMove = "";
        this.currentTMM = "";
        this.currentMoveHexes = "";

        this.immobile = true;
        if( this.move[0].type === "j" ) {
            this.move = [
                {
                    move: this.move[0].move,
                    currentMove: this.move[0].currentMove,
                    type: "",
                },
                {
                    move: this.move[0].move,
                    currentMove: this.move[0].currentMove,
                    type: this.move[0].type,
                }
            ]
        }
        for( let moveC = 0; moveC < this.move.length; moveC++ ) {




            let tmpTMM = 0;


            if( this.hasTripeStrengthMyomer() && this.currentHeat === 1 ) {
                if( this.move[moveC].currentMove < 5 ) {
                    tmpTMM = 0;
                } else if( this.move[moveC].currentMove < 9 ) {
                    tmpTMM = 1;
                } else if( this.move[moveC].currentMove < 13 ) {
                    tmpTMM = 2;
                } else if( this.move[moveC].currentMove < 19 ) {
                    tmpTMM = 3;
                } else if( this.move[moveC].currentMove < 35 ) {
                    tmpTMM = 4;
                } else {
                    tmpTMM = 5;
                }
            } else {
                if( this.move[moveC].move < 5 ) {
                    tmpTMM = 0;
                } else if( this.move[moveC].move < 9 ) {
                    tmpTMM = 1;
                } else if( this.move[moveC].move < 13 ) {
                    tmpTMM = 2;
                } else if( this.move[moveC].move < 19 ) {
                    tmpTMM = 3;
                } else if( this.move[moveC].move < 35 ) {
                    tmpTMM = 4;
                } else {
                    tmpTMM = 5;
                }
            }



            // Subtract Heat from Current Move
            if( this.move[moveC].type !== "j" || this.move.length === 1 ) {
                // if( this.type.toLowerCase().trim() === "bm" ) {

                // }
                if( this.hasTripeStrengthMyomer() ) {
                    switch( this.currentHeat ) {
                        case 1: {
                            this.move[moveC].currentMove += 2;
                            break;
                        }
                        case 2: {
                            // no effect on movement
                            break;
                        }
                        default: {
                            this.move[moveC].currentMove = this.move[moveC].currentMove - this.currentHeat * 2;

                            break;
                        }
                    }
                    if (this.move[moveC].currentMove < 0 || this.currentHeat === 4){
                        this.move[moveC].currentMove = 0;
                    }
                } else {
                    // if( this.move[moveC].type != "j" ) {
                        this.move[moveC].currentMove = this.move[moveC].currentMove - this.currentHeat * 2;
                        //can't have minus move, or heat level "4" === shutdown
                        if (this.move[moveC].currentMove < 0 || this.currentHeat === 4){
                            this.move[moveC].currentMove = 0;
                        }
                    // }
                }

            }

            this.currentMoveSprint = "" + (+this.move[0].currentMove * 1.5 ) + "\"";
            this.currentMoveHexesSprint = "" + ( Math.ceil(( +this.move[0].currentMove / 2) * 1.5) )+ "⬣";

            this.currentMove += this.move[moveC].currentMove.toString() + "\"" + this.move[moveC].type;
            this.currentMoveHexes += ( this.move[moveC].currentMove / 2).toString() + "⬣" + this.move[moveC].type;





            // if( this.move[moveC].type === "j" ) {
            //     tmpTMM++;
            // }
            if( this.move[moveC].type === "j" && (
                this.hasAbility("JMPS") || this.hasAbility("JMPW")
            )
            ) {
                tmpTMM++;
            }

            // MP Hits against Move
            for( let count = 0; count < this.getMPHits(); count++ ) {
                let tmmHit = Math.round(tmpTMM / 2);
                if( tmmHit < 1 ) {
                    tmmHit = 1;
                }
                tmpTMM -= tmmHit;

                if( tmpTMM < 0 ) {
                    tmpTMM = 0;
                }

                // for( let moveC = 0; moveC < this.move.length; moveC++ ) {
                    // let moveHit = Math.round(this.move[moveC].currentMove / 2);
                    // if( moveHit < 2 ) {
                    //     moveHit = 2;
                    // }
                    // this.move[moveC].currentMove -= moveHit;
                    // if( this.move[moveC].currentMove < 0 ) {
                    //     this.move[moveC].currentMove = 0;
                    // }
                // }
            }
            if(
                ( this.type && this.type.trim().toLowerCase() === "sv" )
                    ||
                ( this.type && this.type.trim().toLowerCase() === "cv" )
            ) {

                for( let mpHitsCount = 0; mpHitsCount < this.vehicleMotive910.length; mpHitsCount++) {
                    if( this.vehicleMotive910[ mpHitsCount ] ) {
                        tmpTMM -= 1;
                    }
                }
                for( let mpHitsCount = 0; mpHitsCount < this.vehicleMotive11.length; mpHitsCount++) {
                    if( this.vehicleMotive11[ mpHitsCount ] ) {
                        let half = Math.floor(tmpTMM / 2);
                        if( half < 1 ) {
                            half = 1;
                        }
                        tmpTMM -= half;
                    }
                }
            }

            if( this.move[moveC].currentMove < 0 ) {
                this.move[moveC].currentMove = 0;
            }

            if( this.move[moveC].currentMove === 0 )
                tmpTMM = -4;

            // shut down units have a tmm of -4 (ASC pg. 53)
            if( this.currentHeat === 4 ){
                tmpTMM = -4;
                this.immobile = true;
            } else {
                // -1 TMM at OV2 or OV3 (ASC pg. 52)
                if( this.currentHeat > 1 && this.move[moveC].type !== "j" ){
                    tmpTMM -= 1;
                    if( tmpTMM < 0 ) {
                        tmpTMM = 0;
                    }
                }
                // UNCOMMENT the below area if it's a -1 TMM at OV3 on top of the -1 TMM at OV2
                // if( this.currentHeat > 2 ){
                //     tmpTMM -= 1;
                //     if( tmpTMM < 0 ) {
                //         tmpTMM = 0;
                //     }
                // }
            }

            if( this.move[moveC].currentMove > 0 )
            this.immobile = false;

            if( tmpTMM.toString() + "/" !== this.currentTMM )
                this.currentTMM += tmpTMM.toString() + this.move[moveC].type.toLowerCase();



            if( moveC !== this.move.length - 1 ) {
                this.currentTMM += "/";
                this.currentMove += "/";
                this.currentMoveHexes += "/";
            }

        }
        if( this.currentTMM.endsWith("/"))
            this.currentTMM = this.currentTMM.substring( 0, this.currentTMM.length - 1);

        // Calculate To-Hits with Criticals
        this.currentToHitShort = this.currentSkill + this.currentHeat + currentFCHits * 2; // + currentEngineHits;
        this.currentToHitMedium = this.currentSkill + 2 + this.currentHeat + currentFCHits * 2; // + currentEngineHits;
        this.currentToHitLong = this.currentSkill + 4 + this.currentHeat + currentFCHits * 2; // + currentEngineHits;
        this.currentToHitExtreme = this.currentSkill + 6 + this.currentHeat + currentFCHits * 2; // + currentEngineHits;

        this.currentHeat = this.currentHeat / 1;

        // Engine Hit Heat Effects
        // if( currentEngineHits === 1 )
        //     if( this.currentHeat < 1)
        //         this.currentHeat = 1;

        if( this.currentHeat < 0 )
            this.currentHeat = 0;

        if( this.currentHeat > 4 )
            this.currentHeat = 4;

        this.getCurrentStructure();

        if( currentEngineHits > 1 )
            this.active = false;


    }
    /**
    * Returns a boolean if the unit is a ground unit. This is used for
    * calculating whether or not the unit can sprint
    *
    * @beta
    */
    public isGroundUnit(): boolean {
        if(
            this.type === "AF"
            ||
            this.type === "DA"
            ||
            this.type === "DS"
            ||
            this.type === "SC"
        ) {
            return false;
        }
        for( let moveC = 0; moveC < this.move.length; moveC++  ){
            if(this.move[moveC].type.toLowerCase() === "v" ) {
                return false;
            }
        }
        return true;
    }

    public getSpecialAbility( tag: string ): IASSpecialAbility | null {
        if( this.abilities ) {
            for( let def of CONST_AS_SPECIAL_ABILITIES ) {
                if( tag.toLowerCase().trim() === def.tag.toLowerCase().trim() ) {
                    let newDef = JSON.parse(JSON.stringify(def));
                    newDef.rawTag = tag;
                    return newDef;
                }
                if(def.tag.indexOf("%") > 0) {
                    let baseTag = def.tag.substring(0, def.tag.indexOf("%") ).toLowerCase();

                    if( tag.toLowerCase().startsWith(baseTag) ) {
                        let newDef = JSON.parse(JSON.stringify(def));
                        newDef.rawTag = tag;
                        return newDef;
                    }
                }
                if(def.tag.indexOf("#") > 0) {
                    let baseTag = def.tag.substring(0, def.tag.indexOf("#") ).toLowerCase();
                    if( tag.toLowerCase().startsWith(baseTag) ) {
                        let tmp = tag.toLowerCase().replace(baseTag, "");
                        if( tmp.length > 0 ) {
                            if( !Number.isNaN(Number(tmp[0])) ) {
                                let newDef = JSON.parse(JSON.stringify(def));
                                newDef.rawTag = tag;
                                return newDef;
                            }
                        }
                    }
                }
            }

        }
        return null;
    }

    public setHeat( newHeatValue: number ) {
        this.currentHeat = newHeatValue;
        this.calcCurrentValues();
    }

    public takeDamage( numberOfPoints: number ) {
        let leftOverPoints = numberOfPoints;

        for( let pointCounter = 0; pointCounter < numberOfPoints; pointCounter++ ) {
            for( let armorCounter = 0; armorCounter < this.currentArmor.length; armorCounter++ ) {
                if( this.currentArmor[armorCounter] === false ) {
                    if( leftOverPoints > 0 ) {
                        this.currentArmor[armorCounter] = true;
                        leftOverPoints--;
                    }

                }
            }

            for( let structureCounter = 0; structureCounter < this.currentStructure.length; structureCounter++ ) {
                if( this.currentStructure[structureCounter] === false ) {
                    if( leftOverPoints > 0 ) {
                        this.currentStructure[structureCounter] = true;
                        leftOverPoints--;

                        if( this.getCurrentStructure() === 0 )
                            this.active = false;
                        else
                            this.active = true;
                    }
                }
            }
        }

        this.calcCurrentValues();
    }

    public getCurrentArmor() {
        let armorPoints = 0;
        for( let armorCounter = 0; armorCounter < this.currentArmor.length; armorCounter++ ) {
            if( this.currentArmor[armorCounter] === false ) {
                armorPoints++;
            }
        }
        return armorPoints;
    }

    public getCurrentStructure() {
        let structPoints = 0;
        for( let structureCounter = 0; structureCounter < this.currentStructure.length; structureCounter++ ) {
            if( this.currentStructure[structureCounter] === false ) {
                structPoints++;
            }
        }

        if( structPoints < 1 )
            this.active = false;
        else
            this.active = true;

        return structPoints;
    }

    public setArmor( nv: number ) {
        this.armor = nv;

    }
    public setStructure( nv: number ) {
        this.armor = nv;


    }

    public export(
        noInPlayVariables: boolean = false,
    ): IAlphaStrikeUnitExport {
        // In Play Variables

        let _currentArmor: boolean[] = [];
        let _currentStructure: boolean[] = [];
        let _engineHits: boolean[] = [];
        let _fireControlHits: boolean[] = [];
        let _mpControlHits: boolean[] = [];
        let _weaponHits: boolean[] = [];

        let _vehicleMotive910: boolean[] = [];
        let _vehicleMotive11: boolean[] = [];
        let _vehicleMotive12: boolean = false;

        let _currentHeat = 0;


        if( !noInPlayVariables ) {
            _currentArmor = this.currentArmor;
            _currentHeat = this.currentHeat;

            _currentStructure = this.currentStructure;
            _engineHits = this.engineHits;
            _fireControlHits = this.fireControlHits;
            _mpControlHits = this.mpControlHits;
            _weaponHits = this.weaponHits;
            _vehicleMotive910 = this.vehicleMotive910;
            _vehicleMotive11 = this.vehicleMotive11;
            _vehicleMotive12 = this.vehicleMotive12;
        }

        let rv:  IAlphaStrikeUnitExport = {
            mechCreatorUUID:  this.mechCreatorUUID,
            customName: this.customName,
            currentArmor: _currentArmor,
            currentStructure: _currentStructure,
            engineHits: _engineHits,
            fireControlHits: _fireControlHits,
            mpControlHits: _mpControlHits,
            weaponHits: _weaponHits,
            vehicleMotive910:  _vehicleMotive910,
            vehicleMotive11:  _vehicleMotive11,
            vehicleMotive12:  _vehicleMotive12,
            classification:  this.classification,
            costCR:  this.costCR,
            mulID:  this.mulID,
            currentHeat:  _currentHeat,
            damage:  this.damage,
            variant:  this.variant,
            dateIntroduced:  this.dateIntroduced,
            name:  this.name,
            tmm:  this.tmm,
            tonnage:  this.tonnage,
            tro:  this.tro,
            role:  this.role,
            threshold:  this.threshold,
            pilot:  this._pilot,
            imageURL:  this.imageURL,
            move:  this.move,
            jumpMove:  this.jumpMove,
            structure:  this.structure,
            armor:  this.armor,
            type:  this.type,
            size:  this.size,
            showDetails:  this.showDetails,
            abilities:  this.abilities,
            overheat:  this.overheat,
            basePoints:  this.basePoints,
            currentSkill:  this.currentSkill,
            uuid: this.uuid,
        };

        return rv;
    }

    export2(): IAlphaStrikeExport {
        let rv: IAlphaStrikeExport = {
            mechCreatorUUID: this.uuid,
            name: this.name,
            move: this.move[0].move,
            type: this.type,
            customName: this.customName,
            role: this.role,
            jumpMove: this.jumpMove,
            pv: this.basePoints,
            damage: this.damage,
            armor: this.armor,
            structure: this.structure,
            size: this.size,
            skill: this._pilot.gunnery,
            overheat: this.overheat,
            notes: "",
            tmm: this.tmm,
            sizeClass: this.size,
            sizeClassName: "",
            ov: this.overheat,
            specialUnitAbilities: this.abilities,
            longHeat: this.overheat,
            longOverheat: this.overheat,
            abilityCodes: this.abilities,
        }
        return rv;
    }

    calc(): string {

        let _calcLogAS = "";

        /* *********************************
         *
         * Alpha Strike Point Value ASC - p138
         *
         * ******************************** */

        this.basePoints = 0;
        _calcLogAS += "<div class=\"text-center\"><strong> - Calculating Point Value - </strong></div>\n";
        /* *********************************
         * Step 1: Determine Unit’s Offensive Value ASC - p138
         * ******************************** */

        _calcLogAS += "<strong>Step 1: Determine Unit’s Offensive Value ASC - p138</strong><br />\n";
        let offensive_value = 0;
        // Attack Damage Factor
        offensive_value += this.damage.short;
        offensive_value += this.damage.medium;
        offensive_value += this.damage.medium;
        offensive_value += this.damage.long;
        offensive_value += this.damage.extreme;

        _calcLogAS += "Attack Damage Factor: "
        + offensive_value.toString() + " ( "
        + this.damage.short.toString() + " + "
        + this.damage.medium.toString() + " + "
         + this.damage.long.toString() + " + "
         + this.damage.medium.toString() + " + "
         + this.damage.extreme.toString()
        + " )<br />\n";

        // Unit Size Factor
        if(
            this.type.toLowerCase().trim() === "bm"
            ||
            this.type.toLowerCase().trim() === "pm"
        )  {
            offensive_value += this.size / 2;
            _calcLogAS += "Unit Size Factor: " + (this.size / 2) + " ( " + this.size + " / 2)<br />\n";
        }

        // Overheat Factor
        let overHeatFactor = 0;
        if( this.overheat > 1) {
            offensive_value += 1;
            offensive_value += (this.overheat - 1) / 2;
            overHeatFactor += 1;
            overHeatFactor += (this.overheat - 1) / 2;
        } else {
            offensive_value += this.overheat;
            overHeatFactor += this.overheat;

        }

        _calcLogAS += "Overheat Factor: " + overHeatFactor + "<br />\n";

        /* *********************************
         * Step 1a: Apply Blanket Offensive Modifiers ASC - p139
         * ******************************** */
        _calcLogAS += "<strong>Step 1a: Apply Blanket Offensive Modifiers ASC - p139</strong><br />\n";
        // TODO

        /* *********************************
         * Step 2: Determine Unit’s Defensive Value ASC - p139
         * ******************************** */
        _calcLogAS += "<strong>Step 2: Determine Unit’s Defensive Value ASC - p139</strong><br />\n";
        // let movementFactor = 0;

        let _groundMove = 0;
        for( let move of this.move ) {
            if( move.type === "g" ) {
                _groundMove = move.move;
            }
        }

        // Movement Factor:
        let movementDefenseValue = 0;
        let bestMovement = 0;
        if( _groundMove > this.jumpMove) {
            movementDefenseValue += _groundMove * .25;
            bestMovement = _groundMove;
        } else {
            movementDefenseValue += this.jumpMove * .25;
            bestMovement = _groundMove;
        }

        if( this.jumpMove > 0) {
            movementDefenseValue += .5;
            _calcLogAS += "Movement Factor: " + movementDefenseValue + " ( " + bestMovement + " * .25 + .5)<br />\n";
        } else {
            _calcLogAS += "Movement Factor: " + movementDefenseValue + " ( " + bestMovement + " * .25)<br />\n";
        }

        // if (
        //     +rearDamage.short > 0 ||
        //     +rearDamage.medium > 0 ||
        //     +rearDamage.long > 0
        // ) {
        //     this.abilityCodes.push( "Rear" );
        // }

        // let highestDamage = 0;

        for (let aC = 0; aC < this.abilities.length; aC++) {

        //     // Replace Heat with Heat X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "heat" ) {
        //         heatDamage = adjustAlphaStrikeDamage(heatDamage);
        //         this.abilityCodes[aC] = "Heat " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long;
        //         highestDamage = getHighestDamage(heatDamage);
        //         offensive_value += highestDamage;
        //         if (heatDamage.medium.toString() !== "-" && +heatDamage.medium > 0)
        //             offensive_value += .5;

        //         _calcLogAS += "<strong>Adding</strong> Heat Ability: " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long + "<br />\n";
        //         _calcLogAS += "Adding Heat Damage Factor to PV: " + highestDamage + "<br />\n";
        //         if (heatDamage.medium.toString() !== "-" && +heatDamage.medium > 0)
        //             _calcLogAS += "Adding Heat Medium Damage Bonus to PV: 0,5<br />\n";
        //     }

        //     // Replace LRM with LRM X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "lrm" ) {
        //         lrmDamage = adjustAlphaStrikeDamage(lrmDamage);
        //         this.abilityCodes[aC] = "LRM " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long;
        //         _calcLogAS += "<strong>Adding</strong> LRM Ability: " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long + "<br />\n";

        //     }

        //     // Replace Flak with Flak X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "flak" ) {
        //         flakDamage = adjustAlphaStrikeDamage(flakDamage);
        //         this.abilityCodes[aC] = "Flak " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long;
        //         _calcLogAS += "<strong>Adding</strong> Flak Ability: " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long + "<br />\n";
        //     }

        //     // Replace AC with AC X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "ac" ) {
        //         acDamage = adjustAlphaStrikeDamage(acDamage);
        //         this.abilityCodes[aC] = "AC " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long;
        //         _calcLogAS += "<strong>Adding</strong> AC Ability: " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long + "<br />\n";
        //     }

        //     // Replace SRM with SRM X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "srm" ) {
        //         srmDamage = adjustAlphaStrikeDamage(srmDamage);
        //         this.abilityCodes[aC] = "SRM " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long;
        //         _calcLogAS += "<strong>Adding</strong> SRM Ability: " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long + "<br />\n";
        //     }

        //     // Replace Missile with Missile X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "missile" || this.abilityCodes[aC].toLowerCase() === "msl" ) {
        //         mslDamage = adjustAlphaStrikeDamage(mslDamage);
        //         this.abilityCodes[aC] = "MSL " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long;
        //         _calcLogAS += "<strong>Adding</strong> Missile Ability: " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long + "<br />\n";
        //     }

        //     // Replace Rear with Rear X/X/X
        //     if( this.abilityCodes[aC].toLowerCase() === "rear" ) {
        //         rearDamage = adjustAlphaStrikeDamage(rearDamage);
        //         this.abilityCodes[aC] = "Rear " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long;
        //         _calcLogAS += "<strong>Adding</strong> Rear Ability: " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long + "<br />\n";
        //     }

        //     // Replace IndirectFire with IF X
        //     if(
        //         this.abilityCodes[aC].toLowerCase() === "indirect fire"
        //         ||
        //         this.abilityCodes[aC].toLowerCase() === "if"
        //     ) {
        //         rearDamage = adjustAlphaStrikeDamage(rearDamage);
        //         this.abilityCodes[aC] = "IF " + indirectFireRating;
        //         _calcLogAS += "<strong>Adding</strong> IF Ability: " + indirectFireRating + "<br />\n";
        //         offensive_value += indirectFireRating;
        //         _calcLogAS += "Adding IF Rating to PV: " + indirectFireRating + "<br />\n";

        //     }

        }

        // Defensive Special Abilities Factor
        // TODO

        // Defensive Interaction Rating
        // TODO

        /* *********************************
         * Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141
         * ******************************* */
        _calcLogAS += "<strong>Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141</strong><br />\n";
        let bmDIR = 0;
        // Armor Factor
        if( this.type.toLowerCase().trim() === "bm") {
            _calcLogAS += "Armor Factor: " + (this.armor * 2) + " ( " + this.armor + " * 2)<br />\n";
            bmDIR += this.armor * 2;
        }
        // TODO other types of units

        // Structure Factor
        if( this.type.toLowerCase().trim() === "bm") {
            _calcLogAS += "Structure Factor: " + (this.structure * 1) + " ( " + this.structure + " * 1)<br />\n";
            bmDIR += this.structure * 1;
        }
        // TODO other types of units

        // Defense Factor
        let defensiveFactor = 0;
        if (bestMovement > 34) {
            _calcLogAS += "Base Defense Factor: +5 (movement 35\"+)<br />\n";
            defensiveFactor += 5;
        } else if (bestMovement > 18) {
            _calcLogAS += "Base Defense Factor: +4 (movement 19\"-34\")<br />\n";
            defensiveFactor += 4;
        } else if (bestMovement > 12) {
            _calcLogAS += "Base Defense Factor: +3 (movement 13\"-18\")<br />\n";
            defensiveFactor += 3;
        } else if (bestMovement > 8) {
            _calcLogAS += "Base Defense Factor: +2 (movement 9\"-12\")<br />\n";
            defensiveFactor += 2;
        } else if (bestMovement > 4) {
            _calcLogAS += "Base Defense Factor: +1 (movement 4\"-8\")<br />\n";
            defensiveFactor += 1;
        } else {
            _calcLogAS += "Base Defense Factor: +0 (movement 0\"-4\")<br />\n";
            defensiveFactor += 0;
        }


        if( defensiveFactor < 0 )
        defensiveFactor = 0;
        bmDIR += defensiveFactor;
        _calcLogAS += "Adding Defense Value from Step 2 above: " + (defensiveFactor) + "<br />\n";
        // Calculate the DIR
        _calcLogAS += "Total DIR: " + bmDIR + "<br />\n";

        /* *********************************
         * Step 3: Determine Unit’s Final Point Value ASC - p141
         * ******************************* */
        _calcLogAS += "<strong>Step 3: Determine Unit’s Final Point Value ASC - p141</strong><br />\n";
        let baseFinalValue = offensive_value + bmDIR + movementDefenseValue;
        _calcLogAS += "Base Point Value: " + baseFinalValue + " ( " + offensive_value + " + " + bmDIR + " + "  + movementDefenseValue + ")<br />\n";

        let finalValue = baseFinalValue;
        if (
            bestMovement >= 6 &&
            bestMovement <= 10 &&
            +this.damage.medium === 0 &&
            +this.damage.long === 0 &&
            +this.damage.extreme === 0
        ) {
            _calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
            _calcLogAS += "Modified Point Value: " + (baseFinalValue * .75) + " ( " + offensive_value + " + " + bmDIR + " )<br />\n";
            finalValue = baseFinalValue * .75;
        }

        if (
            bestMovement >= 2 &&
            bestMovement <= 5 &&
            +this.damage.medium === 0 &&
            +this.damage.long === 0 &&
            +this.damage.extreme === 0
        ) {
            _calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
            _calcLogAS += "Modified Point Value: " + (baseFinalValue * .5) + " ( " + offensive_value + " + " + bmDIR + " )<br />\n";
            finalValue = baseFinalValue * .5;
        }

        if (
            bestMovement >= 2 &&
            bestMovement <= 5 &&
            +this.damage.long === 0 &&
            +this.damage.extreme === 0
        ) {
            _calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short and Medium ranges. Point Value * .75<br />\n";
            _calcLogAS += "Modified Point Value: " + (baseFinalValue * .75) + " ( " + offensive_value + " + " + bmDIR + " )<br />\n";
            finalValue = baseFinalValue * .75;
        }


        finalValue = Math.round(finalValue);

        _calcLogAS += "Final Point Value: " + finalValue + "<br />\n";

        /* *********************************
         * Step 3a: Add Force Bonuses ASC - p141
         * ******************************* */
        _calcLogAS += "<strong>Step 3a: Add Force Bonuses ASC - p141</strong><br />\n";
        // TODO
        _calcLogAS += "<strong class=\"color-red\">TODO<br />\n";

        this.basePoints = finalValue;

        this.calcCurrentValues();
        return _calcLogAS;
    }
}
