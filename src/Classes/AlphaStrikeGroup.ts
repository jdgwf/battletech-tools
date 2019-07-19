import {AlphaStrikeUnit} from './AlphaStrikeUnit';

export default class AlphaStrikeGroup {

	members: AlphaStrikeUnit[] = [];

	customName : string= "";

	activeMembers: number = 0;
	groupPoints: number = 0;
	membersLabel: string = "";

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
}
