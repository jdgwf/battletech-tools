import Pilot, { IPilot } from "./pilot";

export interface IAlphaStrikeDamage {
    short: number | string;
    medium: number | string;
    long: number | string;
    extreme: number | string;
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
    mechCreatorUUID: string;
    FormatedTonnage: string | null;
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

    customName?: string;
    // currentSkill?: number;

    currentArmor?: boolean[];
    currentStructure?: boolean[];
    engineHits?: boolean[];
    fireControlHits?: boolean[];
    mpControlHits?: boolean[];
    weaponHits?: boolean[];

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

    move: IMoveNumber[];
    jumpMove: number;
    structure: number;
    armor: number;
    type: string;
    size: number;
    showDetails: boolean;
    abilities: string;
    overheat: number;
    basePoints: number;
    currentSkill: number;
}

export class AlphaStrikeUnit {
    public originalStats: IASMULUnit | null = null;

    public mechCreatorUUID: string = "";

    public classification: string = "";
    public costCR: number = 0;

    public isAerospace: boolean = false;
    public isInfantry: boolean = false;
    public immobile: boolean = false;

    public variant: string | null = "";
    public name: string = "";
    public dateIntroduced: string = "";
    public era: string = "";

    public tro: string = "";

    public showDetails: boolean = false;

    public  active: boolean = true;

    public tonnage: number = 0;

    public type: string = "BattleMech";
    public size: number = 0;
    public tmm: number = 0;

    public ImageUrl: string = "";

    public currentMove: string = "";
    public currentTMM: string = "";

    public armor: number = 0;
    public structure: number = 0;

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
        };

    public move: IMoveNumber[] = [];
    public jumpMove: number = 0;

    public mulID: number = 0;

    public abilities: string = "";

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
    };

    public currentArmor: boolean[] = [];
    public currentStructure: boolean[] = [];
    public engineHits: boolean[] = [];
    public fireControlHits: boolean[] = [];
    public mpControlHits: boolean[] = [];
    public weaponHits: boolean[] = [];

    private _pilot: Pilot = new Pilot( {
        name: "",
        piloting: 5,
        gunnery: 4,
        wounds: 0
    });

    public customName: string = "";

    constructor( incomingMechData: IASMULUnit ) {
        this._pilot = new Pilot();
        if( typeof(incomingMechData) !== "undefined" && incomingMechData !== null ) {
            this.originalStats = incomingMechData;

            if( typeof(incomingMechData.BFPointValue) !== "undefined") {
                // RAW Data From MUL

                // this.classification = incomingMechData["Marauder"];
            this.costCR = +incomingMechData.Cost;

            this.variant = incomingMechData.Variant;
            this.name = incomingMechData.Name;
            this.dateIntroduced = incomingMechData.DateIntroduced;

            if( incomingMechData.mechCreatorUUID ) {
                this.mechCreatorUUID = incomingMechData.mechCreatorUUID;
            }


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

            if( incomingMechData.BFAbilities )
            this.abilities = incomingMechData.BFAbilities;
            if (!this.abilities){
                this.abilities = "";
            }

            this.overheat = +incomingMechData.BFOverheat;

            this.basePoints = +incomingMechData.BFPointValue;

            if( incomingMechData.customName ) {
                this.customName = incomingMechData.customName;
            }

            this.ImageUrl = incomingMechData.ImageUrl;

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

                    tmpMoveObj.move = this.getRawNumber( moveArray[moveCount] );
                    tmpMoveObj.type = this.getRawAlpha( moveArray[moveCount] );

                    this.move.push( tmpMoveObj );
                }

            } else {

                tmpMoveObj = {
                    move: 0,
                    currentMove: 0,
                    type: ""
                };

                tmpMoveObj.move = this.getRawNumber( tmpMove );
                tmpMoveObj.type = this.getRawAlpha( tmpMove );

                this.move.push( tmpMoveObj );

            }

            

            this.currentHeat = 0;
            this.currentPoints = this.basePoints / 1;

            if( incomingMechData.currentSkill ) {
                this._pilot.gunnery = incomingMechData.currentSkill;
                this._pilot.piloting = incomingMechData.currentSkill + 1;
            }

            } else {
                // Internally Processed Data

                if( incomingMechData.classification )
                    this.classification = incomingMechData.classification;
                this.costCR = incomingMechData.costCR / 1;

                this.mulID = incomingMechData.mulID / 1;

                this.ImageUrl = incomingMechData.ImageUrl;

                this.currentHeat = incomingMechData.currentHeat;

                this.variant = incomingMechData.variant;
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
                    };

                if( !this.damage.extreme )
                    this.damage.extreme = 0;

                this.move = incomingMechData.move;

                this.abilities = incomingMechData.abilities;

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

            if( incomingMechData.mpControlHits )
            this.mpControlHits = incomingMechData.mpControlHits;

            if( incomingMechData.weaponHits )
            this.weaponHits = incomingMechData.weaponHits;

            if( incomingMechData.customName )
                this.customName = incomingMechData.customName;

            
            if( incomingMechData.pilot)
                this._pilot.import(incomingMechData.pilot);
            
        }
        this.calcCurrentVals();
    }

    public get currentSkill(): number {
        return this._pilot.gunnery;
    }

    public getRawNumber( incomingString: string ): number {
        let myString = incomingString.replace(/\D/g,'');
        return +myString / 1;
    }

    public getRawAlpha( incomingString: string ): string {
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
        this.calcCurrentVals();
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
        this.calcCurrentVals()
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
        this.calcCurrentVals();
    }

    public calcCurrentVals() {

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
                pvDifference = 10 + Math.floor( ( this.basePoints - 52) / 5 );
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

        if( typeof( this.mpControlHits ) === "undefined"  || this.mpControlHits.length === 0  ) {
            this.mpControlHits = [];
            for( let mpHitsCount = 0; mpHitsCount < 4; mpHitsCount++)
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

        if( shortDamage !== "0*") {
            shortDamage = (+shortDamage - currentWeaponHits).toString();
        } else {
            if( currentWeaponHits )
                shortDamage = "0";
        }

        if( mediumDamage !== "0*") {
            mediumDamage = (+mediumDamage - currentWeaponHits).toString();
        } else {
            if( currentWeaponHits )
                mediumDamage = "0";
        }

        if( longDamage !== "0*") {
            longDamage = (+longDamage - currentWeaponHits).toString();
        } else {
            if( currentWeaponHits )
                longDamage = "0";
        }

        if( extremeDamage !== "0*") {
            extremeDamage = (+extremeDamage - currentWeaponHits).toString();
        } else {
            if( currentWeaponHits )
                extremeDamage = "0";
        }

        if( +shortDamage < 0 )
            shortDamage = "0";

        if( +mediumDamage < 0 )
            mediumDamage = "0";

        if( +longDamage < 0 )
            longDamage = "0";

        if( +extremeDamage < 0 )
            extremeDamage = "0";

        this.currentDamage = {
            short: shortDamage,
            medium: mediumDamage,
            long: longDamage,
            extreme: extremeDamage
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

            // for( let mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
            //     if( this.mpControlHits[ mpHitsCount ] ) {

            //         for( let moveC = 0; moveC < this.move.length; moveC++ ) {
            //             let movePenalty = Math.round( +this.move[moveC].currentMove / 2);
            //             if( movePenalty < 2 )
            //                 movePenalty = 2;

            //             this.move[moveC].currentMove = this.move[moveC].currentMove - movePenalty;

            //             if( this.move[moveC].currentMove < 0 )
            //                 this.move[moveC].currentMove = 0;
            //         }

            //     }
            // }
        }

        if(
            ( this.type && this.type.trim().toLowerCase() === "sv" )
                ||
            ( this.type && this.type.trim().toLowerCase() === "cv" )
        ) {
            let numMPHits = 0;
            for( let mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
                if( this.mpControlHits[ mpHitsCount ] ) {
                    numMPHits++;
                }
            }

            if( numMPHits > 0 ) {
                if( numMPHits < 3 ) {
                    for( let moveC = 0; moveC < this.move.length; moveC++ ) {

                        this.move[moveC].currentMove = this.move[moveC].currentMove - 2;

                        if( this.move[moveC].currentMove < 0 )
                            this.move[moveC].currentMove = 0;
                    }
                } else if( numMPHits < 5 ) {
                    for( let moveC = 0; moveC < this.move.length; moveC++ ) {

                        this.move[moveC].currentMove = Math.round(this.move[moveC].currentMove / 2);

                        if( this.move[moveC].currentMove < 0 )
                            this.move[moveC].currentMove = 0;
                    }
                } else {
                    for( let moveC = 0; moveC < this.move.length; moveC++ ) {
                        this.move[moveC].currentMove = 0;
                    }
                }
            }

        }

        this.currentMove = "";
        this.currentTMM = "";

        this.immobile = true;
        for( let moveC = 0; moveC < this.move.length; moveC++ ) {

            // Subtract Heat from Current Move
            if( this.move[moveC].type !== "j" ) {
                this.move[moveC].currentMove = this.move[moveC].currentMove - this.currentHeat * 2;
                //can't have minus move, or heat level "4" === shutdown
                if (this.move[moveC].currentMove < 0 || this.currentHeat === 4){
                    this.move[moveC].currentMove = 0;
                }
            }

            this.currentMove += "" + this.move[moveC].currentMove + "\"" + this.move[moveC].type;

            let tmpTMM = 0;
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

            // if( this.move[moveC].type === "j" ) {
            //     tmpTMM++;
            // }

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
                if( this.currentHeat > 1 ){
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

            this.currentTMM += tmpTMM.toString(); //  + this.move[moveC].type;

            if( moveC !== this.move.length - 1 ) {
            this.currentTMM += "/";
            this.currentMove += "/";
            }

        }

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

    public setHeat( newHeatValue: number ) {
        this.currentHeat = newHeatValue;
        this.calcCurrentVals();
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

        this.calcCurrentVals();
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

    // makeSVGAlphaStrikeCard( inPlay: boolean, itemIDField: number ) {
    //     return createSVGAlphaStrike( this, inPlay, itemIDField );
    // }

    export(
        noInPlayVariables: boolean = false,
    ): IASMULUnit | null {
        // In Play Variables

        let _currentArmor: boolean[] = [];
        let _currentStructure: boolean[] = [];
        let _engineHits: boolean[] = [];
        let _fireControlHits: boolean[] = [];
        let _mpControlHits: boolean[] = [];
        let _weaponHits: boolean[] = [];


        if( !noInPlayVariables ) {
            _currentArmor = this.currentArmor;
            _currentStructure = this.currentStructure;
            _engineHits = this.engineHits;
            _fireControlHits = this.fireControlHits;
            _mpControlHits = this.mpControlHits;
            _weaponHits = this.weaponHits;

            
        }

        if( this.originalStats ) {
            let returnValue: IASMULUnit = this.originalStats;
            returnValue.customName = this.customName;
            returnValue.mechCreatorUUID = this.mechCreatorUUID;
            returnValue.currentSkill = this.currentSkill;
            returnValue.pilot = this._pilot.export();

            // In Play Variables
            returnValue.currentArmor = _currentArmor;
            returnValue.currentStructure = _currentStructure;
            returnValue.engineHits = _engineHits;
            returnValue.fireControlHits = _fireControlHits;
            returnValue.mpControlHits = _mpControlHits;
            returnValue.weaponHits = _weaponHits;

            return returnValue;
        } else {
            return null;
        }
    }

}
