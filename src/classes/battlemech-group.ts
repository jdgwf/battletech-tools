import { generateUUID } from "../utils";
import { BattleMech, IBattleMechExport } from "./battlemech";

export interface IBMGroupExport {
	name: string;
	units: IBattleMechExport[];
	uuid: string;
	lastUpdated: Date;
	location?: string;
	// formationBonus:string;
	groupLabel: string;
}

export class BattleMechGroup {

    public groupLabel: string = "Lance";

	private _uuid: string = generateUUID();
	private _lastUpdated: Date = new Date();

    public members: BattleMech[] = [];

	public customName : string= "";

    constructor(importObj: IBMGroupExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
		}


		// this.sortUnits();
		// this.availableFormationBonuses= formationBonuses.filter(x=>x.IsValid(this));
	}

	public getName(
		indexNumber: number,
	): string {
		if( this.customName && this.customName.trim() ) {
			return this.customName;
		} else {
			return this.groupLabel + " #" + (indexNumber + 1).toString();
		}
	}

	public setNew() {
		this._uuid = generateUUID();
		this._lastUpdated = new Date();
	}

	public getTotaBV2(): number {
        let rv = 0;

        for( let unit of this.members ) {
            rv += unit.getPilotAdjustedBattleValue();
        }

        return rv;
    }

    public import(importObj: IBMGroupExport) {


		this.customName = importObj.name;
		for( let unit of importObj.units) {
			let theUnit = new BattleMech( JSON.stringify(unit) );
			this.members.push( theUnit );
		}
        if( importObj.uuid ) {
            this._uuid = importObj.uuid;
        }

		if( importObj.groupLabel ) {
            this.groupLabel = importObj.groupLabel;
		}

        if( importObj.lastUpdated ) {
            this._lastUpdated = new Date(importObj.lastUpdated);
		}
		// if( importObj.formationBonus ){
		// 	this.formationBonus = formationBonuses.find(x=>x.Name===importObj.formationBonus);
		// }
    }

    public export(): IBMGroupExport {
        let returnValue: IBMGroupExport = {
			name: this.customName,
			units: [],
            uuid: this._uuid,
			lastUpdated: new Date(),
			groupLabel: this.groupLabel,
		}

		for( let unit of this.members ) {
			let exportUnit = unit.export();
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