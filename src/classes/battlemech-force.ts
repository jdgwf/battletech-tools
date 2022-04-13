import { generateUUID } from "../utils";
import { BattleMech } from "./battlemech";
import { BattleMechGroup, ICBTGroupExport } from "./battlemech-group";

export interface ICBTForceExport {
    groups: ICBTGroupExport[];
	uuid: string;
	lastUpdated: Date;

    heatApplied: boolean;
    turn: number;
    phase: number;
    hideHelp: boolean;
}

export class BattleMechForce {

	// public members: BattleMechGroup[] = [];

	public groupLabel: string = "Lance";

	private _uuid: string = generateUUID();
	private _lastUpdated: Date = new Date();

	public customName : string= "";

    public groups: BattleMechGroup[] = [];

    public turn: number = 1;
    public phase: number = 0;

    public hideHelp: boolean = false;

    public heatApplied: boolean = false;

    constructor(importObj: ICBTForceExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
        }

        if( this.groups.length === 0 ) {
            this.groups.push( new BattleMechGroup() )
        }
    }

    setSelectedMech(
        uuid: string
    ) {
        for( let group of this.groups ) {
            for( let unit of group.members ) {
                if( unit.uuid === uuid ) {
                    unit.selectedMech = true;
                } else {
                    unit.selectedMech = false;
                }
            }
        }
    }

    getSelectedMech(): BattleMech | null {
        for( let group of this.groups ) {
            for( let unit of group.members ) {
                if( unit.selectedMech ) {
                    return unit;
                }
            }
        }
        return null;
    }

    public removeGroup(asGroupIndex: number) {
        if( this.groups.length > asGroupIndex && this.groups[asGroupIndex]) {
            this.groups.splice( asGroupIndex, 1);
        }
    }

    public renameGroup( newName: string, groupIndex: number ) {
        if( this.groups.length > groupIndex && this.groups[groupIndex]) {
            this.groups[groupIndex].customName = newName;
        }
    }

    public selectGroupLabel( newName: string, groupIndex: number ) {
        if( this.groups.length > groupIndex && this.groups[groupIndex]) {
            this.groups[groupIndex].groupLabel = newName;
        }
    }

    public export(
        noInPlayVariabless: boolean = false,
    ): ICBTForceExport {
        let returnValue: ICBTForceExport = {
            groups: [],
            uuid: this._uuid,
            lastUpdated: new Date(),
            turn: this.turn,
            phase: this.phase,
            hideHelp: this.hideHelp,
            heatApplied: this.heatApplied,
        }

        for( let group of this.groups) {
            returnValue.groups.push( group.export(noInPlayVariabless) );
        }

        return returnValue;
    }

    getUnitViaUUID(
        uuid: string
    ): BattleMech | null {
        for( let group of this.groups ) {
            for( let unit of group.members ) {
                if( unit.uuid === uuid )
                    return unit;
            }
        }
        return null;
    }

    updateUnitViaUUID(
        nv: BattleMech
    ): boolean {
        for( let groupIndex in this.groups ) {
            for( let unitIndex in this.groups[groupIndex].members ) {
                if( this.groups[groupIndex].members[unitIndex].uuid === nv.uuid ) {
                    this.groups[groupIndex].members[unitIndex] = nv;
                    return true;
                }
            }
        }
        return false;
    }

    public getPhaseName(
        num: number
    ): string {
        if( num === 0 ) {
            return "Initiative Phase"
        } else if( num === 1 ) {
            return "Movement Phase"
        } else if( num === 2 ) {
            return "Weapon Attack Phase"
        } else if( num === 3 ) {
            return "Physical Attack Phase"
        } else if( num === 4 ) {
            return "Heat Phase"
        } else if( num === 5 ) {
            return "End Phase"
        }

        return "???"
    }

    public import(importObj: ICBTForceExport) {
        for( let group of importObj.groups ) {
            this.groups.push( new BattleMechGroup( group) );
        }
        if( importObj.uuid ) {
            this._uuid = importObj.uuid;
        }

        if( typeof(importObj.turn) !== "undefined" ) {
            this.turn = importObj.turn;
        }
        if( typeof(importObj.phase) !== "undefined" ) {
            this.phase = importObj.phase;
        }

        if( typeof(importObj.hideHelp) !== "undefined" ) {
            this.hideHelp = importObj.hideHelp;
        }

        if( typeof(importObj.heatApplied) !== "undefined" ) {
            this.heatApplied = importObj.heatApplied;
        }

        if( importObj.lastUpdated ) {
            this._lastUpdated = new Date(importObj.lastUpdated);
        }

    }

    public applyHeat() {
        this.heatApplied = true;
        for( let group of this.groups ) {
            for( let unit of group.members ) {
                unit.applyHeat();
            }
        }
    }

    public getTotalUnits(): number {
        let returnValue: number = 0;

        for( let group of this.groups ) {
            returnValue += group.getTotalUnits();
        }

        return returnValue;
    }

    public getTotalBV2(): number {
        let returnValue: number = 0;

        for( let group of this.groups ) {
            for( let unit of group.members ) {
                returnValue += unit.getPilotAdjustedBattleValue();
            }
        }

        return returnValue;
    }

    getTech(): string {
        let rv = "";

        for( let group of this.groups ) {
            let tech = group.getTech();
            if( rv !== tech && rv !== "" ) {
                rv = "Mixed";
            }  else {
                if( rv !== "Mixed")
                    rv = tech;
            }
        }

        return rv;
    }

    getTotalTons(): number {
        let returnValue: number = 0;

        for( let group of this.groups ) {
            for( let unit of group.members ) {
                returnValue += unit.getTonnage();
            }
        }

        return returnValue;
    }

    public newGroup() {
        this.groups.push( new BattleMechGroup() );
    }

    public getTotalGroups(): number {
        return this.groups.length;
    }

    public getTotaBV2(): number {
        let rv = 0;

        for( let group of this.groups ) {
            rv += group.getTotaBV2();
        }

        return rv;
    }
}