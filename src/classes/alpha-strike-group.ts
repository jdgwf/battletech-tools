import { formationBonuses, IFormationBonus } from '../data/formation-bonuses';
import { generateUUID } from '../utils';
import { AlphaStrikeUnit, IASMULUnit } from './alpha-strike-unit';


export interface IASGroupExport {
	name: string;
	units: IASMULUnit[];
	uuid: string;
	lastUpdated: Date;
	location?: string;
	formationBonus:string;
	groupLabel: string;
}

export default class AlphaStrikeGroup {

	members: AlphaStrikeUnit[] = [];

	groupLabel: string = "Lance";

	uuid: string = generateUUID();
	lastUpdated: Date = new Date();

	customName : string= "";

	activeMembers: number = 0;
	groupPoints: number = 0;
	membersLabel: string = "";

	formationBonus?: IFormationBonus=formationBonuses.find(x=>x.Name ==="None");
	availableFormationBonuses: IFormationBonus[]=[];

    constructor(importObj: IASGroupExport | null = null ) {
        if( importObj ) {
            this.import(importObj);
		}


		this.sortUnits();
		this.availableFormationBonuses= formationBonuses.filter(x=>x.IsValid(this));
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

    public getTotalUnits(): number {
        return this.members.length;
    }

    public getTotalPoints(): number {
        let returnValue: number = 0;

		for( let unit of this.members ) {
			returnValue += unit.currentPoints;
		}

        return returnValue;
	}

	public getName(
		groupNumber: number,
	): string {

		if( !groupNumber) {
			if( this.customName ) {
				return this.customName;
			} else {
				return "(The Nameless)";
			}
		} else {
			if( this.customName ) {
				return this.groupLabel + " #" + groupNumber.toString() + ": " + this.customName;
			} else {
				return this.groupLabel + "Group #" + groupNumber.toString();
			}
		}

	}

	public sortUnits() {
		this.members.sort( (a, b) => {
			if( a.currentPoints > b.currentPoints ) {
				return -1
			} else if( a.currentPoints < b.currentPoints ) {
				return 1;
			} else {
				return 0;
			}
		})
	}

	public setAvailableFormationBonuses(formationBonuses:IFormationBonus[]){
		this.availableFormationBonuses = formationBonuses;
		// if set formation bonus isn't in new list reset to "None"
		if (this.formationBonus){
			let selectedBonus:string = this.formationBonus.Name;

			if (!this.availableFormationBonuses.find(x=>x.Name === selectedBonus)){
				this.formationBonus = formationBonuses.find(x=>x.Name==="None");
			}
		}
	}


    export(): IASGroupExport {
        let returnValue: IASGroupExport = {
			name: this.customName,
			units: [],
            uuid: this.uuid,
			lastUpdated: new Date(),
			formationBonus: this.formationBonus?this.formationBonus.Name:"None",
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

	public setNew() {
		this.uuid = generateUUID();
		this.lastUpdated = new Date();
	}



    import(importObj: IASGroupExport) {


		this.customName = importObj.name;
		for( let unit of importObj.units) {
			let theUnit = new AlphaStrikeUnit( unit );
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
		if( importObj.formationBonus ){
			this.formationBonus = formationBonuses.find(x=>x.Name===importObj.formationBonus);
		}
    }
}
