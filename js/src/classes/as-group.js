function asGroup () {

	this.members = Array();

	this.customName = "";

	this.activeMembers = 0;
	this.groupPoints = 0;
	this.membersLabel = "";

	this.getActiveMembers = function() {
		this.activeMembers = 0;
		for( var memCount = 0; memCount < this.members.length; memCount++ ) {
			this.members[memCount].calcCurrentVals();
			if( this.members[memCount].active )
				this.activeMembers++;
			this.groupPoints += this.members[memCount].currentPoints;
		}

		this.membersLabel = " (" + this.activeMembers + "/" + this.members.length + ")";
		//console.log( this.membersLevel );
	}
}
