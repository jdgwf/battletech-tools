import { generateUUID } from "../utils/generateUUID";
import { BattleMech, IBattleMechExport } from "./battlemech";

export interface ICBTGroupExport {
	name: string;
	units: IBattleMechExport[];
	uuid: string;
	lastUpdated: Date;
	location?: string;
	groupLabel: string;
}

export class BattleMechGroup {

    public groupLabel: string = "Lance";

	public uuid: string = generateUUID();
	public lastUpdated: Date = new Date();

    public members: BattleMech[] = [];

	public customName : string= "";

    constructor(importObj: ICBTGroupExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
		}

	}

	public isUnderStrength(): boolean {
		for( let member of this.members ) {
			if( member.isUnderStrength() ) {
				return true;
			}
		}
		return false;
	}
	public getName(
		indexNumber: number,
		forFavorites: boolean = false,
	): string {
		if( this.customName && this.customName.trim() ) {
			return this.customName;
		} else {
			if( forFavorites )
				return "Unnamed " + this.groupLabel;
			else
				return this.groupLabel + " #" + (indexNumber + 1).toString();
		}
	}

	public setNew() {
		this.uuid = generateUUID();
		for( let mech of this.members ) {
			mech.newUUID();
		}
		this.lastUpdated = new Date();
	}

	public getTotaBV2(): number {
        let rv = 0;

        for( let unit of this.members ) {
            rv += unit.getPilotAdjustedBattleValue();
        }

        return rv;
    }

	public getTotalTons(): number {
        let rv = 0;

        for( let unit of this.members ) {
            rv += unit.getTonnage();
        }

        return rv;
    }

	getTech(): string {
        let rv = "";

        for( let group of this.members ) {
            let tech = group.getTech().name;
            if( rv !== tech && rv !== "" ) {
                rv = "Mixed"
            }  else {
                if( rv !== "Mixed")
                    rv = tech;
            }
        }

        return rv;
    }

    public import(importObj: ICBTGroupExport) {

		this.customName = importObj.name;
		for( let unit of importObj.units) {
			let theUnit = new BattleMech( JSON.stringify(unit) );
			this.members.push( theUnit );
		}
        if( importObj.uuid ) {
            this.uuid = importObj.uuid;
        }

		if( importObj.groupLabel ) {
            this.groupLabel = importObj.groupLabel;
		}

        if( importObj.lastUpdated ) {
            this.lastUpdated = new Date(importObj.lastUpdated);
		}

    }

    public export(
		noInPlayVariabless: boolean = false,
	): ICBTGroupExport {
        let returnValue: ICBTGroupExport = {
			name: this.customName,
			units: [],
            uuid: this.uuid,
			lastUpdated: new Date(),
			groupLabel: this.groupLabel,
		}

		for( let unit of this.members ) {
			let exportUnit = unit.export(noInPlayVariabless);
			if( exportUnit ) {
				returnValue.units.push( exportUnit );
			}
		}

        return returnValue;
    }

	public getTotalUnits(): number {
        return this.members.length;
    }

}