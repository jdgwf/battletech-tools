import {AlphaStrikeUnit, IASMULUnit} from './AlphaStrikeUnit';


export interface IASGroupExport {
	name: string;
    units: IASMULUnit[];
}

export default class AlphaStrikeGroup {

	members: AlphaStrikeUnit[] = [];

	customName : string= "";

	activeMembers: number = 0;
	groupPoints: number = 0;
	membersLabel: string = "";

    constructor(importObj: IASGroupExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
        }

	}

	public getActiveMembers() {
		this.activeMembers = 0;
		this.groupPoints = 0;
		for( var memCount = 0; memCount < this.members.length; memCount++ ) {
			this.members[memCount].calcCurrentVals();
			if( this.members[memCount].active )
				this.activeMembers++;
			this.groupPoints += this.members[memCount].currentPoints / 1;
		}

		this.membersLabel = " (" + this.activeMembers + "/" + this.members.length + ")";
	}

    export(): IASGroupExport {
        let returnValue: IASGroupExport = {
			name: this.customName,
			units: []
		}

		for( let unit of this.members ) {
			let exportUnit = unit.export();
			if( exportUnit ) {
				returnValue.units.push( exportUnit );
			}
		}

		console.log("ASG returnValue", returnValue)
        return returnValue;
    }

    import(importObj: IASGroupExport) {
		this.customName = importObj.name;
		for( let unit of importObj.units) {
			let theUnit = new AlphaStrikeUnit( unit );
			this.members.push( theUnit );
		}
    }
}
