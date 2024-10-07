import { formationBonuses } from '../data/formation-bonuses';
import { generateUUID } from '../utils/generateUUID';
import AlphaStrikeGroup, { IASGroupExport } from './alpha-strike-group';
import { AlphaStrikeUnit } from './alpha-strike-unit';

export interface IASForceExport {
    groups: IASGroupExport[];
	uuid: string;
	lastUpdated: Date;

    turn: number;
    phase: number;

}

export default class AlphaStrikeForce {
    _uuid: string = generateUUID();
    _lastUpdated: Date = new Date();

    public groups: AlphaStrikeGroup[] = [];

	public customName : string= "";

	public activeMembers: number = 0;
	public forcePoints: number = 0;
    public membersLabel: string = "";

    public turn: number = 1;
    public phase: number = 0;

    constructor(importObj: IASForceExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
        }

        if( this.groups.length === 0 ) {
            this.groups.push( new AlphaStrikeGroup() )
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

	public getActiveMembers() {
		this.activeMembers = 0;
        this.forcePoints = 0;
        for( var memCountGroup = 0; memCountGroup < this.groups.length; memCountGroup++ ) {
            for( var memCount = 0; memCount < this.groups.length; memCount++ ) {
                this.groups[memCountGroup].members[memCount].calcCurrentValues();
                if( this.groups[memCountGroup].members[memCount].active )
                    this.activeMembers++;
                this.forcePoints += this.groups[memCountGroup].members[memCount].currentPoints / 1;
            }
        }

		this.membersLabel = " (" + this.activeMembers + "/" + this.groups.length + ")";
    }

    public addToGroup(
        mulUnit: AlphaStrikeUnit,
        groupIndex: number = 0
    ) {
        if( this.groups.length < groupIndex)  {
            groupIndex = this.groups.length
        }
        if( this.groups.length === 0 ) {
            this.groups.push(new AlphaStrikeGroup());
        }
        if( this.groups.length > groupIndex && this.groups[groupIndex]) {
            // let exportData = mulUnit.export();

            // if( exportData ) {
                // let newUnit = new AlphaStrikeUnit( exportData );
                this.groups[groupIndex].members.push( mulUnit  );
                this.groups[groupIndex].sortUnits();
                this.groups[groupIndex].setAvailableFormationBonuses( formationBonuses.filter(x=>x.IsValid(this.groups[groupIndex])));
            // }
        }

    }

    public moveUnitToGroup(
        fromUnitIndex: number,
        fromGroupIndex: number,
        toGroupIndex: number ) {
        if(
            this.groups.length > fromGroupIndex
                &&
            this.groups.length > toGroupIndex

        )  {
            if( this.groups[fromGroupIndex].members.length > fromUnitIndex ) {
                let asUnit = this.groups[fromGroupIndex].members[fromUnitIndex];
                this.groups[fromGroupIndex].members.splice(fromUnitIndex, 1 );

                this.groups[toGroupIndex].members.push( asUnit);

                this.groups[toGroupIndex].sortUnits();
                this.groups[fromGroupIndex].sortUnits();
                this.groups[toGroupIndex].setAvailableFormationBonuses( formationBonuses.filter(x=>x.IsValid(this.groups[toGroupIndex])));
                this.groups[fromGroupIndex].setAvailableFormationBonuses( formationBonuses.filter(x=>x.IsValid(this.groups[fromGroupIndex])));
            }
        }
    }

    public newGroup() {
        this.groups.push( new AlphaStrikeGroup() );
    }

    public removeUnitFromGroup(asGroupIndex: number, asUnitIndex: number) {
        if( this.groups.length > asGroupIndex && this.groups[asGroupIndex]) {
            if( this.groups[asGroupIndex].members.length > asUnitIndex && this.groups[asGroupIndex].members[asUnitIndex]) {
                this.groups[asGroupIndex].members.splice( asUnitIndex, 1);
                this.groups[asGroupIndex].setAvailableFormationBonuses(formationBonuses.filter(x=>x.IsValid(this.groups[asGroupIndex])));
            }
        }
    }

    public removeGroup(asGroupIndex: number) {
        if( this.groups.length > asGroupIndex && this.groups[asGroupIndex]) {
            this.groups.splice( asGroupIndex, 1);
        }
    }

    public getTotalGroups(): number {
        return this.groups.length;
    }

    public getTotalUnits(): number {
        let returnValue: number = 0;

        for( let group of this.groups ) {
            returnValue += group.getTotalUnits();
        }

        return returnValue;
    }

    public getTotalPoints(): number {
        let returnValue: number = 0;

        for( let group of this.groups ) {
            returnValue += group.getTotalPoints();
        }

        return returnValue;
    }

    public export(
        noInPlayVariables: boolean = false,
    ): IASForceExport {
        let returnValue: IASForceExport = {
            groups: [],
            uuid: this._uuid,
            lastUpdated: new Date(),

            turn: this.turn,
            phase: this.phase,
        }

        for( let group of this.groups) {
            returnValue.groups.push( group.export(noInPlayVariables) );
        }

        return returnValue;
    }

    public import(importObj: IASForceExport) {
        for( let group of importObj.groups ) {
            this.groups.push( new AlphaStrikeGroup( group) );
        }
        if( importObj.uuid ) {
            this._uuid = importObj.uuid;
        }

        if( typeof(importObj.phase) !== "undefined" ) {
            this.phase = importObj.phase;
        }

        if( importObj.lastUpdated ) {
            this._lastUpdated = new Date(importObj.lastUpdated);
        }

    }
}
