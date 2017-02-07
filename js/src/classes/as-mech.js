function asMech (incomingMechData) {
	this.originalStats = null;

	this.class = "";
	this.costCR = 0;


	this.variant = "";
	this.name = "";
	this.dateIntroduced = "";
	this.era = "";

	this.tro = "";

	this.active = true;

	this.tonnage = 0;

	this.currentSkill = 4;
	this.type = "BattleMech";
	this.size = 0;
	this.tmm = 0;

	this.armor = 0;
	this.structure = 0;

	this.threshold = 0;

	this.damage = {
		short: 0,
		medium: 0,
		long: 0,
		extreme: 0
	};

	this.move = 0;

	this.abilities = "";

	this.overheat = 0;
	this.role = "";

	this.basePoints = 0;
	this.currentPoints = 0;
	this.currentHeat = 0;

	this.currentDamage = 0;

	this.currentArmor = Array();
	this.currentStructure = Array();
	this.engineHits = Array();
	this.fireControlHits = Array();
	this.mpControlHits = Array();
	this.weaponHits = Array();

	this.customName = "";


	if( typeof(incomingMechData) != "undefined" && incomingMechData != null ) {

		if( typeof(incomingMechData["BFPointValue"]) != "undefined") {
			// RAW Data From MUL

			this.class = incomingMechData["Marauder"];
			this.costCR = incomingMechData["Cost"] / 1;


			this.variant = incomingMechData["Variant"];
			this.name = incomingMechData["Name"];
			this.dateIntroduced = incomingMechData["DateIntroduced"];
			//this.era = incomingMechData["XXXX"];

			this.tro = incomingMechData["TRO"];

			this.tonnage = incomingMechData["Tonnage"] / 1;

			this.role = incomingMechData["Role"]["Name"];

			this.type = incomingMechData["BFType"];
			this.size = incomingMechData["BFSize"];
			this.move = incomingMechData["BFMove"];
			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData["BFArmor"] / 1;
			this.structure = incomingMechData["BFStructure"] / 1;

			this.threshold = incomingMechData["BTThreshold"] / 1;

			this.damage = {
				short: incomingMechData["BFDamageShort"] / 1,
				medium: incomingMechData["BFDamageMedium"] / 1,
				long: incomingMechData["BFDamageLong"] / 1,
			};

			if( incomingMechData["BFDamamgeExtreme"] )
				this.damage.extreme = incomingMechData["BFDamamgeExtreme"] / 1
			else
				this.damage.extreme = 0;

			this.abilities = incomingMechData["BFAbilities"];

			this.overheat = incomingMechData["BFOverheat"] / 1;

			this.basePoints = incomingMechData["BFPointValue"] / 1;


			this.imageURL = incomingMechData["ImageUrl"];

			this.jumpMove = "0";
			//~ console.log( "orig move", this.move );
			while( this.move.indexOf('"') > 0 )
				this.move = this.move.replace('"', "");
			if( this.move.indexOf("/") > 0 ) {
				//split move....
				var moveArray = this.move.split( "/" );
				this.move = moveArray[0].trim();

				this.jumpMove = moveArray[1].replace('J', "");
				this.jumpMove = moveArray[1].replace('j', "");

			} else {

				if( this.move.indexOf("j") > 0 || this.move.indexOf("J") > 0) {
					this.move = this.move.replace('J', "");
					this.move = this.move.replace('j', "");
					this.jumpMove = this.move;
				} else {
					this.jumpMove = "0";
				}

			}

			this.jumpMove = this.jumpMove.trim() / 1;
			this.move = this.move.trim() / 1;

			//~ console.log( "after move", this.move );
			//~ console.log( "after jumpMove", this.jumpMove );

			this.currentSkill = 4;
			this.currentHeat = 0;
			this.currentPoints = this.basePoints;
		} else {
			// Interally Processed Data

			this.class = incomingMechData.class;
			this.costCR = incomingMechData.costCR / 1;

			this.imageURL = incomingMechData.imageURL;

			this.currentHeat = incomingMechData.currentHeat;

			this.variant = incomingMechData.variant;
			this.name = incomingMechData.name;
			this.dateIntroduced = incomingMechData.dateIntroduced;
			//this.era = incomingMechData["XXXX"];

			this.tro = incomingMechData.tro;

			this.role =  incomingMechData.role;

			this.tonnage = incomingMechData.tonnage / 1;


			this.type = incomingMechData.type;
			this.size = incomingMechData.size / 1;
			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData.armor / 1;
			this.structure = incomingMechData.structure / 1;

			this.threshold = incomingMechData.threshold / 1;


			this.move = incomingMechData.move;
			this.jumpMove = incomingMechData.jumpMove;

			this.damage = {
				short: incomingMechData.damage.short / 1,
				medium: incomingMechData.damage.medium / 1,
				long: incomingMechData.damage.long / 1,
				extreme: incomingMechData.damage.extreme / 1
			};

			if( this.damage.extreme = "NaN" )
				this.damage.extreme = 0;

			this.move = incomingMechData.move / 1;

			this.abilities = incomingMechData.abilities;

			this.overheat = incomingMechData.overheat / 1;

			this.basePoints = incomingMechData.basePoints / 1;


			if( incomingMechData.currentSkill > 0  )
				this.currentSkill = incomingMechData.currentSkill;
			else
				this.currentSkill = 4;

			this.currentPoints = this.basePoints;



			if( incomingMechData.currentArmor )
				this.currentArmor = incomingMechData.currentArmor;

			if( incomingMechData.currentStructure )
				this.currentStructure = incomingMechData.currentStructure;

			if( incomingMechData.engineHits )
				this.engineHits = incomingMechData.engineHits;

			if( incomingMechData.fireControlHits )
				this.fireControlHits = incomingMechData.fireControlHits;

			if( incomingMechData.mpControlHits )
				this.mpControlHits = incomingMechData.mpControlHits;

			if( incomingMechData.weaponHits )
				this.weaponHits = incomingMechData.weaponHits;

			if( incomingMechData.customName )
				this.customName = incomingMechData.customName;
		}

	}


	this.setSkill = function( newSkillValue ) {
		this.currentSkill = newSkillValue / 1;
		this.calcCurrentVals();
	}

	this.calcCurrentVals = function() {


		if( this.currentSkill < 4) {
			// improved skill....
			var pvDifference = 0;

			if( this.basePoints <= 7) {
				pvDifference = 1;
			} else if( this.basePoints <= 12) {
				pvDifference = 2;
			} else if( this.basePoints <= 17) {
				pvDifference = 3;
			} else if( this.basePoints <= 22) {
				pvDifference = 4;
			} else if( this.basePoints <= 27) {
				pvDifference = 5;
			} else if( this.basePoints <= 32) {
				pvDifference = 6;
			} else if( this.basePoints <= 37) {
				pvDifference = 7;
			} else if( this.basePoints <= 42) {
				pvDifference = 8;
			} else if( this.basePoints <= 47) {
				pvDifference = 9;
			} else if( this.basePoints <= 52) {
				pvDifference = 10;
			} else {
				pvDifference = 10 + Math.floor( ( this.basePoints - 52) / 5 );
			}
			this.currentPoints = this.basePoints + ( pvDifference * ( 4 - this.currentSkill ) ) ;
		} else if( this.currentSkill > 4) {
			// low skill....

			if( this.basePoints <= 14) {
				pvDifference = 1;
			} else if( this.basePoints <= 24) {
				pvDifference = 2;
			} else if( this.basePoints <= 34) {
				pvDifference = 3;
			} else if( this.basePoints <= 44) {
				pvDifference = 4;
			} else if( this.basePoints <= 54) {
				pvDifference = 5;
			} else if( this.basePoints <= 64) {
				pvDifference = 6;
			} else if( this.basePoints <= 74) {
				pvDifference = 7;
			} else if( this.basePoints <= 84) {
				pvDifference = 8;
			} else if( this.basePoints <= 94) {
				pvDifference = 9;
			} else if( this.basePoints <= 104) {
				pvDifference = 10;
			} else {
				pvDifference = 10 + Math.floor( ( this.basePoints - 104) / 10 );
			}
			this.currentPoints = this.basePoints - ( pvDifference * ( this.currentSkill - 4) );
		} else {
			this.currentSkill = 4;
			this.currentPoints = this.basePoints;
		}
		this.currentSkillString = this.currentSkill.toString();



		this.currentMove = this.move;
		this.currentJump = this.jumpMove;
		this.currentMoveTMM = "";
		this.currentJumpTMM = "";



		if( typeof( this.currentArmor ) == "undefined" || this.currentArmor.length == 0 ) {
			this.currentArmor = Array();
			for( var armorCount = 0; armorCount < this.armor; armorCount++)
				this.currentArmor.push( false );
		}

		if( typeof( this.currentStructure ) == "undefined" || this.currentStructure.length == 0 ) {
			this.currentStructure = Array();
			for( var structureCount = 0; structureCount < this.structure; structureCount++)
				this.currentStructure.push( false );
		}

		if( typeof( this.engineHits ) == "undefined"  || this.engineHits.length == 0  ) {
			this.engineHits = Array();
			for( var engineHitsCount = 0; engineHitsCount < 2; engineHitsCount++)
				this.engineHits.push( false );
		}

		if( typeof( this.fireControlHits ) == "undefined"  || this.fireControlHits.length == 0  ) {
			this.fireControlHits = Array();
			for( var fcHitsCount = 0; fcHitsCount < 4; fcHitsCount++)
				this.fireControlHits.push( false );
		}

		if( typeof( this.mpControlHits ) == "undefined"  || this.mpControlHits.length == 0  ) {
			this.mpControlHits = Array();
			for( var mpHitsCount = 0; mpHitsCount < 4; mpHitsCount++)
				this.mpControlHits.push( false );
		}

		if( typeof( this.weaponHits ) == "undefined"  || this.weaponHits.length == 0  ) {
			this.weaponHits = Array();
			for( var weaponHitsCount = 0; weaponHitsCount < 4; weaponHitsCount++)
				this.weaponHits.push( false );
		}

		var currentWeaponHits = 0;
		for( var weaponHitsCount = 0; weaponHitsCount < this.weaponHits.length; weaponHitsCount++) {
			if( this.weaponHits[ weaponHitsCount ] )
				currentWeaponHits++;
		}

		var currentFCHits = 0;
		for( var fcHitsCount = 0; fcHitsCount < this.fireControlHits.length; fcHitsCount++) {
			if( this.fireControlHits[ fcHitsCount ] )
				currentFCHits++;
		}

		var currentMPHits = 0;
		for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
			if( this.mpControlHits[ mpHitsCount ] )
				currentMPHits++;
		}


		var currentEngineHits = 0;
		for( var engineHitsCount = 0; engineHitsCount < this.engineHits.length; engineHitsCount++) {
			if( this.engineHits[ engineHitsCount ] )
				currentEngineHits++;
		}

		// Calculate Current Damage Values from Crits...

		var shortDamage = this.damage.short;
		var mediumDamage = this.damage.medium;
		var longDamage = this.damage.long;
		var extremeDamage = this.damage.extreme;

		shortDamage = shortDamage - currentWeaponHits;
		mediumDamage = mediumDamage - currentWeaponHits;
		longDamage = longDamage - currentWeaponHits;
		extremeDamage = extremeDamage - currentWeaponHits;

		if( shortDamage < 0 )
			shortDamage = 0;

		if( mediumDamage < 0 )
			mediumDamage = 0;

		if( longDamage < 0 )
			longDamage = 0;

		if( extremeDamage < 0 )
			extremeDamage = 0;


		this.currentDamage = {
			short: shortDamage,
			medium: mediumDamage,
			long: longDamage,
			extreme: extremeDamage
		};


		// Calculate Critical Movement
		for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
			if( this.mpControlHits[ mpHitsCount ] ) {
				var movePenalty = Math.round(this.currentMove / 2);
				if( movePenalty < 2 )
					movePenalty = 2;
				this.currentMove = this.currentMove - movePenalty;

				if( this.currentMove < 0 )
					this.currentMove = 0;

				var movePenalty = Math.round(this.currentJump / 2);
				if( movePenalty < 2 )
					movePenalty = 2;
				this.currentJump = this.currentJump - movePenalty;

				if( this.currentJump < 0 )
					this.currentJump = 0;
			}
		}

		if( this.currentMove < 5 ) {
			this.currentMoveTMM = 0;
		} else if( this.currentMove < 9 ) {
			this.currentMoveTMM = 1;
		} else if( this.currentMove < 13 ) {
			this.currentMoveTMM = 2;
		} else if( this.currentMove < 19 ) {
			this.currentMoveTMM = 3;
		} else if( this.currentMove < 35 ) {
			this.currentMoveTMM = 4;
		} else {
			this.currentMoveTMM = 5;
		}

		if( this.currentJump < 1 ) {
			this.currentJumpTMM = 0;
		}
		else  if( this.currentJump < 5 ) {
			this.currentJumpTMM = 1;
		} else if( this.currentJump < 9 ) {
			this.currentJumpTMM = 2;
		} else if( this.currentJump < 13 ) {
			this.currentJumpTMM = 3;
		} else if( this.currentJump < 19 ) {
			this.currentJumpTMM = 4;
		} else if( this.currentJump < 35 ) {
			this.currentJumpTMM = 5;
		} else {
			this.currentJumpTMM = 6;
		}


		// Calculate To-Hits with Criticals
		this.currentToHitShort = this.currentSkill + this.currentHeat + currentFCHits * 2 + currentEngineHits;
		this.currentToHitMedium = this.currentSkill + 2 + this.currentHeat + currentFCHits * 2 + currentEngineHits;
		this.currentToHitLong = this.currentSkill + 4 + this.currentHeat + currentFCHits * 2 + currentEngineHits;
		this.currentToHitExtreme = this.currentSkill + 6 + this.currentHeat + currentFCHits * 2 + currentEngineHits;


		this.currentHeat = this.currentHeat / 1;

		// Engine Hit Heat Effects
		if( currentEngineHits == 1 )
			if( this.currentHeat < 1)
			this.currentHeat = 1;

		if( this.currentHeat < 0 )
			this.currentHeat = 0;

		if( this.currentHeat > 4 )
			this.currentHeat = 4;



		this.getCurrentStructure();

		if( currentEngineHits > 1 )
			this.active = false;

	}

	this.setHeat = function( newHeatValue ) {
		this.currentHeat = newHeatValue;
		this.calcCurrentVals();
	}

	this.takeDamage = function( numberOfPoints ) {
		leftOverPoints = numberOfPoints;
		console.log("TODO: takeDamage();", numberOfPoints);
		for( var pointCounter = 0; pointCounter < numberOfPoints; pointCounter++ ) {
			for( var armorCounter = 0; armorCounter < this.currentArmor.length; armorCounter++ ) {
				if( this.currentArmor[armorCounter] == false ) {
					if( leftOverPoints > 0 ) {
						this.currentArmor[armorCounter] = true;
						leftOverPoints--;
					}

				}
			}


			for( var structureCounter = 0; structureCounter < this.currentStructure.length; structureCounter++ ) {
				if( this.currentStructure[structureCounter] == false ) {
					if( leftOverPoints > 0 ) {
						this.currentStructure[structureCounter] = true;
						leftOverPoints--;

						if( this.getCurrentStructure() == 0 )
							this.active = false;
						else
							this.active = true;
					}
				}
			}
		}

		//~ console.log("this.currentArmor", this.currentArmor);
		//~ console.log("this.currentStructure", this.currentStructure);
		//~ console.log("this.getCurrentStructure()", this.getCurrentStructure());
		//~ console.log("this.getCurrentArmor()", this.getCurrentArmor());
		//~ console.log("this.active", this.active);
		this.calcCurrentVals();
	}

	this.getCurrentArmor = function() {
		var armorPoints = 0;
		for( var armorCounter = 0; armorCounter < this.currentArmor.length; armorCounter++ ) {
			if( this.currentArmor[armorCounter] == false ) {
				armorPoints++;
			}
		}
		return armorPoints;
	}

	this.getCurrentStructure = function() {
		var structPoints = 0;
		for( var structureCounter = 0; structureCounter < this.currentStructure.length; structureCounter++ ) {
			if( this.currentStructure[structureCounter] == false ) {
				structPoints++;
			}
		}

		if( structPoints < 1 )
			this.active = false;
		else
			this.active = true;

		return structPoints;
	}

	this.calcCurrentVals();
}
