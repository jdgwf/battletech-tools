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

    groupLabel: string = "Lance";

	uuid: string = generateUUID();
	lastUpdated: Date = new Date();

    members: BattleMech[] = [];

	customName : string= "";

    constructor(importObj: IBMGroupExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
		}


		// this.sortUnits();
		// this.availableFormationBonuses= formationBonuses.filter(x=>x.IsValid(this));
	}


    import(importObj: IBMGroupExport) {


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
		// if( importObj.formationBonus ){
		// 	this.formationBonus = formationBonuses.find(x=>x.Name===importObj.formationBonus);
		// }
    }

    export(): IBMGroupExport {
        let returnValue: IBMGroupExport = {
			name: this.customName,
			units: [],
            uuid: this.uuid,
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
}