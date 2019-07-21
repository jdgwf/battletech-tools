import AlphaStrikeGroup from './AlphaStrikeGroup';
import { AlphaStrikeUnit } from './AlphaStrikeUnit';

export default class AlphaStrikeForce {

    groups: AlphaStrikeGroup[] = [];
    members: AlphaStrikeUnit[] = [];

	customName : string= "";

	activeMembers: number = 0;
	forcePoints: number = 0;
	membersLabel: string = "";

	public getActiveMembers() {
		this.activeMembers = 0;
        this.forcePoints = 0;
        for( var memCountGroup = 0; memCountGroup < this.groups.length; memCountGroup++ ) {
            for( var memCount = 0; memCount < this.groups.length; memCount++ ) {
                this.groups[memCountGroup].members[memCount].calcCurrentVals();
                if( this.groups[memCountGroup].members[memCount].active )
                    this.activeMembers++;
                this.forcePoints += this.groups[memCountGroup].members[memCount].currentPoints / 1;
            }
        }

		this.membersLabel = " (" + this.activeMembers + "/" + this.groups.length + ")";
	}
}
