import { generateUUID } from "../utils";
import { BattleMechGroup, IBMGroupExport } from "./battlemech-group";

export interface IBMForceExport {
    groups: IBMGroupExport[];
	uuid: string;
	lastUpdated: Date;
}

export class BattleMechForce {

	members: BattleMechGroup[] = [];

	groupLabel: string = "Lance";

	uuid: string = generateUUID();
	lastUpdated: Date = new Date();

	customName : string= "";

    groups: BattleMechGroup[] = [];

    public export(): IBMForceExport {
        let returnValue: IBMForceExport = {
            groups: [],
            uuid: this.uuid,
            lastUpdated: new Date(),
        }

        for( let group of this.groups) {
            returnValue.groups.push( group.export() );
        }

        return returnValue;
    }

    public import(importObj: IBMForceExport) {
        for( let group of importObj.groups ) {
            this.groups.push( new BattleMechGroup( group) );
        }
        if( importObj.uuid ) {
            this.uuid = importObj.uuid;
        }

        if( importObj.lastUpdated ) {
            this.lastUpdated = new Date(importObj.lastUpdated);
        }

    }
}