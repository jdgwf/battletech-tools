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

    constructor(importObj: IBMForceExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
        }

        if( this.groups.length === 0 ) {
            this.groups.push( new BattleMechGroup() )
        }
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

    public getTotalUnits(): number {
        let returnValue: number = 0;

        for( let group of this.groups ) {
            returnValue += group.getTotalUnits();
        }

        return returnValue;
    }


    getTotaBV2(): number {
        let rv = 0;

        for( let group of this.groups ) {
            rv += group.getTotaBV2();
        }

        return rv;
    }
}