function asUnit (incomingMechData) {
	this.originalStats = null;

	this.class = "";
	this.costCR = 0;


	this.variant = "";
	this.name = "";
	this.dateIntroduced = "";
	this.era = "";

	this.tro = "";

	this.showDetails = 0;

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

	this.move = Array();

	this.mulID = 0;

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


	this.getRawNumber = function( incomingString ) {
		myString = incomingString.replace(/\D/g,'');
		return myString / 1;
	}

	this.getRawAlpha = function( incomingString ) {
		myString = incomingString.replace(/\d/g,'');
		return myString.toLowerCase().trim();
	}

	this.toggleShowingDetails = function() {

		if( this.showDetails > 0)
			this.showDetails = 0;
		else
			this.showDetails = 1;

	}

	if( typeof(incomingMechData) != "undefined" && incomingMechData != null ) {

		if( typeof(incomingMechData["BFPointValue"]) != "undefined") {
			// RAW Data From MUL

			//~ console.log( "incomingMechData", incomingMechData );

			this.class = incomingMechData["Marauder"];
			this.costCR = incomingMechData["Cost"] / 1;


			this.variant = incomingMechData["Variant"];
			this.name = incomingMechData["Name"];
			this.dateIntroduced = incomingMechData["DateIntroduced"];
			//this.era = incomingMechData["XXXX"];

			this.tro = incomingMechData["TRO"];

			this.mulID = incomingMechData["Id"];

			this.tonnage = incomingMechData["Tonnage"] / 1;

			this.threshold = incomingMechData["BFThreshold"] / 1;

			if( incomingMechData["Role"] && incomingMechData["Role"]["Name"] ) {
				this.role = incomingMechData["Role"]["Name"];
			} else {
				this.role = "Not Specified";
			}

			this.type = incomingMechData["BFType"];
			this.size = incomingMechData["BFSize"];

			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData["BFArmor"] / 1;
			this.structure = incomingMechData["BFStructure"] / 1;

			this.damage = {
				short: incomingMechData["BFDamageShort"] ,
				medium: incomingMechData["BFDamageMedium"] ,
				long: incomingMechData["BFDamageLong"]
			};

			if( incomingMechData["BFDamamgeExtreme"] )
				this.damage.extreme = incomingMechData["BFDamamgeExtreme"]
			else
				this.damage.extreme = 0;

			this.abilities = incomingMechData["BFAbilities"];

			this.overheat = incomingMechData["BFOverheat"] / 1;

			this.basePoints = incomingMechData["BFPointValue"] / 1;

			if( incomingMechData["customName"] )
				this.customName = incomingMechData["customName"];

			this.imageURL = incomingMechData["ImageUrl"];

			var tmpMove = incomingMechData["BFMove"];
			this.move = Array();
			while( tmpMove.indexOf('"') > 0 )
				tmpMove = tmpMove.replace('"', "");
			if( tmpMove.indexOf("/") > 0 ) {
				//split move....
				var moveArray = tmpMove.split( "/" );

				for( var moveCount = 0; moveCount < moveArray.length; moveCount++ ) {
					var tmpMoveObj = {
						move: 0,
						type: ""
					};

					tmpMoveObj.move = this.getRawNumber( moveArray[moveCount] );
					tmpMoveObj.type = this.getRawAlpha( moveArray[moveCount] );

					this.move.push( tmpMoveObj );
				}

			} else {

				var tmpMoveObj = {
					move: 0,
					type: ""
				};

				tmpMoveObj.move = this.getRawNumber( tmpMove );
				tmpMoveObj.type = this.getRawAlpha( tmpMove );

				this.move.push( tmpMoveObj );

			}

			//~ this.jumpMove = this.jumpMove.trim() / 1;
			//~ this.move = this.move.trim() / 1;

			//~ console.log( "after move", this.move );
			//~ console.log( "after jumpMove", this.jumpMove );

			this.currentSkill = 4;
			this.currentHeat = 0;
			this.currentPoints = this.basePoints / 1;
		} else {
			// Interally Processed Data

			this.class = incomingMechData.class;
			this.costCR = incomingMechData.costCR / 1;

			this.mulID = incomingMechData.mulID / 1;

			this.imageURL = incomingMechData.imageURL;

			this.currentHeat = incomingMechData.currentHeat;

			this.variant = incomingMechData.variant;
			this.name = incomingMechData.name;
			this.dateIntroduced = incomingMechData.dateIntroduced;
			//this.era = incomingMechData["XXXX"];

			this.tro = incomingMechData.tro;

			this.role =  incomingMechData.role;

			this.tonnage = incomingMechData.tonnage / 1;

			this.threshold = incomingMechData.threshold / 1;


			this.type = incomingMechData.type;
			this.size = incomingMechData.size / 1;
			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData.armor / 1;
			this.structure = incomingMechData.structure / 1;


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

			this.move = incomingMechData.move;

			this.abilities = incomingMechData.abilities;

			this.showDetails = incomingMechData.showDetails;

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

		if(
			this.type.trim().toLowerCase() == "sv"
				||
			this.type.trim().toLowerCase() == "cv"
		) {
			while( this.mpControlHits.length < 5 )
				this.mpControlHits.push( false );

		}

		this.isAerospace = false;
		if(
			this.type.trim().toLowerCase() == "af"
				||
			this.type.trim().toLowerCase() == "cf"
		) {
			this.isAerospace = true;
		}

		this.isInfantry = false;
		if(
			this.type.trim().toLowerCase() == "ba"
				||
			this.type.trim().toLowerCase() == "ci"
		) {
			this.isInfantry = true;
		}


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

		if( shortDamage != "0*") {
			shortDamage = shortDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				shortDamage = 0;
		}

		if( mediumDamage != "0*") {
			mediumDamage = mediumDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				mediumDamage = 0;
		}

		if( longDamage != "0*") {
			longDamage = longDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				longDamage = 0;
		}

		if( extremeDamage != "0*") {
			extremeDamage = extremeDamage - currentWeaponHits;
		} else {
			if( currentWeaponHits )
				extremeDamage = 0;
		}

		//~ mediumDamage = mediumDamage - currentWeaponHits;
		//~ longDamage = longDamage - currentWeaponHits;
		//~ extremeDamage = extremeDamage - currentWeaponHits;

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


		for( var moveC = 0; moveC < this.move.length; moveC++ ) {
			this.move[moveC].currentMove = this.move[moveC].move;
		}

		// Calculate Critical Movement
		if(
			this.type.toLowerCase() == "bm"
				||
			this.type.toLowerCase() == "im"
		) {
			// for BattleMechs
			for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
				if( this.mpControlHits[ mpHitsCount ] ) {

					for( var moveC = 0; moveC < this.move.length; moveC++ ) {
						var movePenalty = Math.round(this.move[moveC].currentMove / 2);
						if( movePenalty < 2 )
							movePenalty = 2;

						this.move[moveC].currentMove = this.move[moveC].currentMove - movePenalty;

						if( this.move[moveC].currentMove < 0 )
							this.move[moveC].currentMove = 0;
					}

				}
			}
		}

		if(
			this.type.trim().toLowerCase() == "sv"
				||
			this.type.trim().toLowerCase() == "cv"
		) {
			var numMPHits = 0;
			for( var mpHitsCount = 0; mpHitsCount < this.mpControlHits.length; mpHitsCount++) {
				if( this.mpControlHits[ mpHitsCount ] ) {
					numMPHits++;
				}
			}

			if( numMPHits > 0 ) {
				if( numMPHits < 3 ) {
					for( var moveC = 0; moveC < this.move.length; moveC++ ) {

						this.move[moveC].currentMove = this.move[moveC].currentMove - 2;

						if( this.move[moveC].currentMove < 0 )
							this.move[moveC].currentMove = 0;
					}
				} else if( numMPHits < 5 ) {
					for( var moveC = 0; moveC < this.move.length; moveC++ ) {

						this.move[moveC].currentMove = Math.round(this.move[moveC].currentMove / 2);

						if( this.move[moveC].currentMove < 0 )
							this.move[moveC].currentMove = 0;
					}
				} else {
					for( var moveC = 0; moveC < this.move.length; moveC++ ) {
						this.move[moveC].currentMove = 0;
					}
				}
			}


		}

		this.currentMove = "";
		this.currentTMM = "";

		this.immobile = true;
		for( var moveC = 0; moveC < this.move.length; moveC++ ) {

			// Subtract Heat from Current Move
			if( this.move[moveC].type != "j" ) {
				this.move[moveC].currentMove = this.move[moveC].currentMove - this.currentHeat * 2;
			}


			this.currentMove += "" + this.move[moveC].currentMove + "\"" + this.move[moveC].type;
			tmpTMM = 0;
			if( this.move[moveC].currentMove < 5 ) {
				tmpTMM = 0;
			} else if( this.move[moveC].currentMove < 9 ) {
				tmpTMM = 1;
			} else if( this.move[moveC].currentMove < 13 ) {
				tmpTMM = 2;
			} else if( this.move[moveC].currentMove < 19 ) {
				tmpTMM = 3;
			} else if( this.move[moveC].currentMove < 35 ) {
				tmpTMM = 4;
			} else {
				tmpTMM = 5;
			}



			if( this.move[moveC].type == "j" ) {
				tmpTMM++;
			}

			if( this.move[moveC].currentMove < 0 ) {
				this.move[moveC].currentMove = 0;
			}

			if( this.move[moveC].currentMove == 0 )
				tmpTMM = 0;

			if( this.move[moveC].currentMove > 0 )
				this.immobile = false;

			this.currentTMM += "" + tmpTMM + this.move[moveC].type;

			if( moveC != this.move.length - 1 ) {
				this.currentTMM += "/";
				this.currentMove += "/";
			}

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
		//~ console.log("TODO: takeDamage();", numberOfPoints);
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

	this.makeSVGAlphaStrikeCard = function( inPlay, itemIDField ) {

		return createSVGAlphaStrike( this, inPlay, itemIDField );
	}


	this.calcCurrentVals();
}
