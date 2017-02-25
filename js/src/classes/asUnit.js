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

			console.log( incomingMechData );

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

			this.role = incomingMechData["Role"]["Name"];

			this.type = incomingMechData["BFType"];
			this.size = incomingMechData["BFSize"];

			//this.tmm = incomingMechData["XXXX"];

			this.armor = incomingMechData["BFArmor"] / 1;
			this.structure = incomingMechData["BFStructure"] / 1;

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


		groupIndex = -1;
		mechIndex = -1;

		if( typeof( inPlay ) == "undefined" ) {
			inPlay = false;
		} else {
			if( inPlay )
				inPlay = true;
			else
				inPlay = false;
		}

		if( typeof( itemIDField ) == "undefined" ) {
			itemIDField = "";
		} else {
			if( !itemIDField )
				itemIDField = "";
		}

		if( itemIDField ) {
			// this is a workaround for a bug. When I previously had parameters, the $index and $parent.$index
			// paramters were undefined when passed directly, but are passed correctly when in the string of the id field
			itemItems = itemIDField.split("-");
			groupIndex = itemItems[2] / 1;
			mechIndex = itemItems[3] / 1;
		}

		var leftBoxWidth = 550;
		var grayBackground = "#fff";
		var grayOpacity = ".8";

		console.log( "makeSVGAlphaStrikeCard",inPlay, groupIndex, mechIndex );
		//~ console.log( "makeSVGAlphaStrikeCard",this );

		svgCode = "<svg version=\"1.1\" viewBox=\"0 0 1000 600\" xmlns=\"http://www.w3.org/2000/svg\">\n";

		// Base Border and Interior White....
		svgCode += "<rect x=\"0\" y=\"0\" width=\"1000\" height=\"600\" fill=\"#000000\" />\n";
		if( !this.active && inPlay )
			svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"#c00\" />\n";
		else
			svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"#ffffff\" />\n";

		// Attempt to put unit's image in background...
		if( this.imageURL ) {
			svgCode += "    <image x=\"450\" y=\"50\" xlink:href=\"" + this.imageURL + "\" x=\"0\" y=\"0\" width=\"" + leftBoxWidth + "\" height=\"500\" />\n";
		}


		// Mech Name and Custom Name
		if( this.customName ) {
			svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + this.customName  + "</text>\n";
			svgCode += "<text x=\"20\" y=\"75\" font-family=\"sans-serif\" font-size=\"20\">" + this.name.toUpperCase()  + "</text>\n";
		} else {
			svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + this.name.toUpperCase()  + "</text>\n";
		}

		//svgCode += "<text x=\"800\" y=\"50\" font-family=\"sans-serif\" font-size=\"11\">" + groupIndex + ", " + mechIndex + ", " + itemIDField + "</text>\n";
		// Point Value
		svgCode += "<rect x=\"850\" y=\"9\" width=\"150\" height=\"35\" fill=\"#000\" />\n";
		svgCode += "<rect x=\"780\" y=\"9\" width=\"70\" height=\"35\" fill=\"#000\" transform=\"rotate( 45, 850, 44)\" />\n";
		svgCode += "<text x=\"990\" y=\"35\" text-anchor=\"end\" fill=\"#fff\" stroke=\"#fff\" font-family=\"sans-serif\" font-size=\"33\">PV: " + this.currentPoints  + "</text>\n";

		/*
		 *  Movement, Type, Role, Skill, etc
		*/
		// Gray, Rounded Box
		svgCode += "<rect x=\"20\" y=\"100\" width=\"" + leftBoxWidth + "\" height=\"105\" fill=\"#000000\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"25\" y=\"105\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"95\" fill=\"" + grayBackground + "\" fill-opacity=\"" + grayOpacity + "\" rx=\"15\" ry=\"15\" />\n";

		//Type
		svgCode += "<text x=\"30\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">TP: " + this.type.toUpperCase()  + "</text>\n";

		//Size
		svgCode += "<text x=\"150\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">SZ: " + this.size.toString().toUpperCase()  + "</text>\n";

		//TMM
		if( this.isAerospace == false )
			svgCode += "<text x=\"250\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">TMM: " + this.currentTMM.toUpperCase()  + "</text>\n";

		//Move
		svgCode += "<text x=\"490\" y=\"140\" font-family=\"sans-serif\" text-anchor=\"end\" font-size=\"25\">MV: " + this.currentMove.toUpperCase()  + "</text>\n";

		//Role
		svgCode += "<text x=\"30\" y=\"180\" font-family=\"sans-serif\" font-size=\"25\">ROLE: " + this.role.toUpperCase()  + "</text>\n";


		//Skill
		svgCode += "<text x=\"490\" y=\"180\" font-family=\"sans-serif\" text-anchor=\"end\" font-size=\"25\">SKILL: " + this.currentSkill.toString().toUpperCase()  + "</text>\n";

		/*
		 *  Damage Section
		*/

		// Gray, Rounded Box
		svgCode += "<rect x=\"20\" y=\"210\" width=\"" + leftBoxWidth + "\" height=\"85\" fill=\"#000000\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"25\" y=\"215\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"75\" fill=\"" + grayBackground + "\" fill-opacity=\"" + grayOpacity + "\" rx=\"15\" ry=\"15\" />\n";



		// Damage Label
		svgCode += "<text x=\"55\" y=\"250\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\" transform=\"rotate(270, 58, 250)\">DAMAGE</text>\n";

		var firstDamageLineY = 245;
		var secondDamageLineY = 280;
		if( this.damage.extreme > 0 ) {
			shortX = 120;
			mediumX = 240;
			longX = 350;
			extremeX = 460;

			// Short
			svgCode += "<text x=\"" + shortX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">S (+0 | " + this.currentToHitShort + "+)</text>\n";
			svgCode += "<text x=\"" + shortX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + this.currentDamage.short  + "</text>\n";


			// Medium
			svgCode += "<text x=\"" + mediumX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">M (+2 | " + this.currentToHitMedium + "+)</text>\n";
			svgCode += "<text x=\"" + mediumX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + this.currentDamage.medium  + "</text>\n";

			// Long
			svgCode += "<text x=\"" + longX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">L (+4 | " + this.currentToHitLong + "+)</text>\n";
			svgCode += "<text x=\"" + longX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + this.currentDamage.long  + "</text>\n";

			// Extreme
			svgCode += "<text x=\"" + extremeX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">E (+6 | " + this.currentToHitExtreme + "+)</text>\n";
			svgCode += "<text x=\"" + extremeX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + this.currentDamage.extreme  + "</text>\n";

		} else {
			shortX = 140;
			mediumX = 290;
			longX = 440;
			extremeX = 0;

			// Short
			svgCode += "<text x=\"" + shortX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">S (+0 | " + this.currentToHitShort + "+)</text>\n";
			svgCode += "<text x=\"" + shortX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + this.currentDamage.short  + "</text>\n";


			// Medium
			svgCode += "<text x=\"" + mediumX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">M (+2 | " + this.currentToHitMedium + "+)</text>\n";
			svgCode += "<text x=\"" + mediumX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + this.currentDamage.medium  + "</text>\n";
 
			// Long
			svgCode += "<text x=\"" + longX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">L (+4 | " + this.currentToHitLong + "+)</text>\n";
			svgCode += "<text x=\"" + longX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + this.currentDamage.long  + "</text>\n";
		}


		/*
		 *  Overheat Section
		*/
		var armorBoxStart = 400;
		if( this.type.toLowerCase() != 'pm' && !this.isInfantry ) {
			svgCode += "<rect x=\"20\" y=\"310\" width=\"" + leftBoxWidth + "\" height=\"80\" fill=\"#000000\" rx=\"18\" ry=\"18\" />\n";
			svgCode += "<rect x=\"25\" y=\"315\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"70\" fill=\"" + grayBackground + "\" fill-opacity=\"" + grayOpacity + "\" rx=\"15\" ry=\"15\" />\n";

			svgCode += "<text x=\"40\" y=\"360\" font-family=\"sans-serif\" font-size=\"35\">OV: " + this.overheat + "</text>\n";

			// heat container...
			svgCode += "<text x=\"240\" y=\"357\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"15\">HEAT SCALE</text>\n";
			svgCode += "<rect x=\"" + ( leftBoxWidth - 255 ) + "\" y=\"320\" width=\"265\" height=\"60\" fill=\"#000\" rx=\"30\" ry=\"30\"  />\n";

			var inActiveColor = "#666";
			var onClickFunction = "";
			var mouseHandClass = "";


			// 0 Heat....
			if( this.currentHeat < 1 && inPlay ) {
				svgCode += "<rect x=\"" + ( leftBoxWidth - 225 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"#0c0\" />\n";
				svgCode += "<circle cx=\"" + ( leftBoxWidth - 225 ) + "\" cy=\"350\" r=\"25\" fill=\"#0c0\" />\n";
				svgCode += "<text x=\"" + ( leftBoxWidth - 225 - 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">0</text>\n";
			} else {
				if( inPlay ) {
					onClickFunction = "ASChangeSVGHeat( 0, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					mouseHandClass = "mouse-hand";
				}
				svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 225 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<circle onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" cx=\"" + ( leftBoxWidth - 225 ) + "\" cy=\"350\" r=\"25\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 225 - 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">0</text>\n";
			}

			// 1 Heat....
			//~ svgCode += "<rect x=\"280\" y=\"320\" width=\"60\" height=\"60\" fill=\"#000\" />\n";
			if( this.currentHeat == 1 && inPlay ) {
				svgCode += "<rect x=\"" + ( leftBoxWidth - 195 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"#cb0\" />\n";
				svgCode += "<text x=\"" + ( leftBoxWidth - 195 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">1</text>\n";
			} else {
				if( inPlay ) {
					onClickFunction = "ASChangeSVGHeat( 1, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					mouseHandClass = "mouse-hand";
				}
				svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 195 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 195 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">1</text>\n";

			}

			// 2 Heat....
			//~ svgCode += "<rect x=\"340\" y=\"320\" width=\"60\" height=\"60\" fill=\"#000\" />\n";
			if( this.currentHeat == 2 && inPlay ) {
				svgCode += "<rect x=\"" + ( leftBoxWidth - 145 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"#c00\" />\n";
				svgCode += "<text x=\"" + ( leftBoxWidth - 145 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">2</text>\n";
			} else {
				if( inPlay ) {
					onClickFunction = "ASChangeSVGHeat( 2, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					mouseHandClass = "mouse-hand";
				}
				svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 145 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 145 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">2</text>\n";

			}
			// 3 Heat....
			//~ svgCode += "<rect x=\"400\" y=\"320\" width=\"60\" height=\"60\" fill=\"#000\" />\n";
			if( this.currentHeat == 3 && inPlay ) {
				svgCode += "<rect x=\"" + ( leftBoxWidth - 95 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"#ec5710\" />\n";
				svgCode += "<text x=\"" + ( leftBoxWidth - 95 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">3</text>\n";
			} else {
				if( inPlay ) {
					onClickFunction = "ASChangeSVGHeat( 3, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					mouseHandClass = "mouse-hand";
				}
				svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 95 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 95 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">3</text>\n";
 
			}
			// s Heat....
			//~ svgCode += "<rect x=\"400\" y=\"320\" width=\"60\" height=\"60\" fill=\"#000\" />\n";
			if( this.currentHeat > 3 && inPlay ) {
				svgCode += "<rect x=\"" + ( leftBoxWidth - 45 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"#333\" />\n";
				svgCode += "<circle cx=\"" + ( leftBoxWidth - 20 ) + "\" cy=\"350\" r=\"25\" fill=\"#333\" />\n";
				svgCode += "<text x=\"" + ( leftBoxWidth - 45 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">S</text>\n";
			} else {
				if( inPlay ) { 
					onClickFunction = "ASChangeSVGHeat( 4, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					mouseHandClass = "mouse-hand";
				}
				svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 45 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<circle onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" cx=\"" + ( leftBoxWidth - 20 ) + "\" cy=\"350\" r=\"25\" fill=\"" + inActiveColor + "\" />\n";
				svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 45 + 10) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: #ffffff\" font-family=\"sans-serif\" font-size=\"35\">S</text>\n";
			}
		} else {
			armorBoxStart = 300;
		}


		/*
		 *  Armor and IS Section
		*/

		// Gray, Rounded Box
		svgCode += "<rect x=\"20\" y=\"" + (armorBoxStart) + "\" width=\"" + leftBoxWidth + "\" height=\"105\" fill=\"#000000\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"25\" y=\"" + (armorBoxStart + 5) + "\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"95\" fill=\"" + grayBackground + "\" fill-opacity=\"" + grayOpacity + "\" rx=\"15\" ry=\"15\" />\n";




		var armorTopBase = armorBoxStart + 15;
		var isTopBase = armorBoxStart + 60;
		var buttonRadius = 15;
		var leftBase = 90;
		svgCode += "<text x=\"80\" y=\"" + ( armorTopBase + 25) + "\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">A: </text>\n";
		svgCode += "<text x=\"80\" y=\"" + ( isTopBase + 25) + "\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">S: </text>\n";

		if( this.isAerospace ) {
			svgCode += "<text x=\"" + ( leftBoxWidth - 25) + "\" y=\"" + ( armorTopBase + 25) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"35\">TH</text>\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 25) + "\" y=\"" + ( armorTopBase + 65) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"35\">" + this.threshold + "</text>\n";
		}

		var armorClass = "";
		var armorFunction = "";
		if( inPlay ) {
			var onClick = "ASTakeDamage( " + groupIndex + ", "+ mechIndex + ", '" + itemIDField + "')";
			svgCode += "<rect class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"30\" y=\"" + (armorBoxStart + 10) + "\" width=\"" + ( 40 ) + "\" height=\"85\" fill=\"#c00\" rx=\"15\" ry=\"15\" />\n";
			svgCode += "<text class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"60\" y=\"" + (armorBoxStart + 30) + "\" fill=\"#fff\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"13\" transform=\"rotate(270, 65, " + (armorBoxStart + 47) + ")\">TAKE</text>\n";
			svgCode += "<text class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"70\" y=\"" + (armorBoxStart + 30) + "\" fill=\"#fff\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"13\" transform=\"rotate(270, 75, " + (armorBoxStart + 45) + ")\">DAMAGE</text>\n";
			leftBase += 40;
		}

		for( var armorCount = 0; armorCount < this.currentArmor.length; armorCount++ ) {
			if( inPlay ) {
				var armorClass = "mouse-hand";
				var armorFunction = "ASToggleArmorPip( " + armorCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
			}
			svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
		//	svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
			if( this.currentArmor[ armorCount ] && inPlay ) {
				svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
			} else {
				svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
			}
		}

		var structClass = "";
		var structFunction = "";
		for( var structCount = 0; structCount < this.currentStructure.length; structCount++ ) {
			if( inPlay ) {
				var structClass = "mouse-hand";
				var structFunction = "ASToggleStructPip( " + structCount + ", " + groupIndex + ", "+ mechIndex + ", '" + itemIDField + "')";
			}
			svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
		//	svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
			if( this.currentStructure[ structCount ] && inPlay ) {
				svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
			} else {
				svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#999\" />\n";
			}
		}


		/*
		 *  Special Section
		*/

		// Gray, Rounded Box
		svgCode += "<rect x=\"20\" y=\"510\" width=\"960\" height=\"60\" fill=\"#000000\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"25\" y=\"515\" width=\"950\" height=\"50\" fill=\"" + grayBackground + "\" fill-opacity=\"" + grayOpacity + "\" rx=\"15\" ry=\"15\" />\n";
		if( this.abilities )
			svgCode += "<text x=\"30\" y=\"550\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">SPECIAL: " + this.abilities + "</text>\n";
		else 
			svgCode += "<text x=\"30\" y=\"550\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">SPECIAL: (none)</text>\n";


		/*
		 *  Critical Hits Section
		*/

		if( !this.isInfantry ) {

			critLineHeight = 50;
			critLineStart = 325;

			// Gray, Rounded Box
			svgCode += "<rect x=\"" + (leftBoxWidth + 30) + "\" y=\"245\" width=\"" + (950 - leftBoxWidth ) + "\" height=\"260\" fill=\"#000000\" rx=\"18\" ry=\"18\" />\n";
			svgCode += "<rect x=\"" + (leftBoxWidth + 35) + "\" y=\"250\" width=\"" + (950 - 10 - leftBoxWidth ) + "\" height=\"250\" fill=\"" + grayBackground + "\" fill-opacity=\"" + grayOpacity + "\" rx=\"15\" ry=\"15\" />\n";

			//
			svgCode += "<text x=\"" + (leftBoxWidth + 35 + (950 - leftBoxWidth ) / 2) + "\" y=\"275\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"25\">CRITICAL HITS</text>\n";

			var leftmostCritButton = (leftBoxWidth + 35 + (950 - leftBoxWidth ) / 2) - 15;

			// Engine Hits
			if( this.type.toLowerCase() != 'pm') {

				svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">ENGINE</text>\n";
				for( var critCount = 0; critCount < this.engineHits.length; critCount++ ) {
					if( inPlay ) {
						var critClass = "mouse-hand";
						var critFunction = "ASToggleEngineHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					}
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";

					if( this.engineHits[ critCount ] && inPlay ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}
				}
				svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">+1 Heat/Firing Weapons</text>\n";
				critLineStart += critLineHeight;
			}



			// Fire Control Hits
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">FIRE CONTROL</text>\n";
			for( var critCount = 0; critCount < this.fireControlHits.length; critCount++ ) {
				if( inPlay ) {
					var critClass = "mouse-hand";
					var critFunction = "ASToggleFireControlHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				}
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";

				if( this.fireControlHits[ critCount ] && inPlay ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
				}
			}
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">+2 To Hit Each</text>\n";
			critLineStart += critLineHeight;

			if( this.type.toLowerCase() == 'bm' || this.type.toLowerCase() == 'pm' ) {
				// MP Hits
				svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">MP</text>\n";
				for( var critCount = 0; critCount < this.mpControlHits.length; critCount++ ) {
					if( inPlay ) {
						var critClass = "mouse-hand";
						var critFunction = "ASToggleMPlHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					}
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";

					if( this.mpControlHits[ critCount ] && inPlay ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}
				}
				svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">&frac12; Move Each</text>\n";
				critLineStart += critLineHeight;
			}

			// Weapon Hits
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">WEAPONS</text>\n";
			for( var critCount = 0; critCount < this.weaponHits.length; critCount++ ) {
				if( inPlay ) {
					var critClass = "mouse-hand";
					var critFunction = "ASToggleWeaponHits( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				}
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";

				if( this.weaponHits[ critCount ] && inPlay ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
				}
			}
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">-1 Damage Each</text>\n";
			critLineStart += critLineHeight;


			if( this.type.toLowerCase() == 'cv' || this.type.toLowerCase() == 'sv' ) {
				// Vehicile Motive Hits
				svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">MOTIVE</text>\n";

				if( inPlay ) {


					var critClass = "mouse-hand";
					var critFunction = "ASToggleMPlHit( 0, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";

					if( this.mpControlHits[ 0 ] ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}

					critFunction = "ASToggleMPlHit( 1, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					if( this.mpControlHits[ 1 ] ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}

					critFunction = "ASToggleMPlHit( 2, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					if( this.mpControlHits[ 2 ] ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}

					critFunction = "ASToggleMPlHit( 3, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					if( this.mpControlHits[ 3 ] ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}

					critFunction = "ASToggleMPlHit( 4, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					if( this.mpControlHits[ 4 ] ) {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4  +30)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"#c00\" />\n";
					} else {
						svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";
					}



				} else {
					critClass = "";
					critFunction = "";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";


					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";


					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";


					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";


					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"#000000\" />\n";
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"#fff\" />\n";


				}
				svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 - buttonRadius + 20 )  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">-2 MV</text>\n";
				svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 - buttonRadius +10)  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">&frac12; Move Each</text>\n";
				svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 - buttonRadius +30)  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">0 MV</text>\n";
				critLineStart += critLineHeight;
			}

		}

		if( !this.active && inPlay) {
			svgCode += "<text x=\"50\" y=\"100\" font-family=\"sans-serif\" transform=\"rotate( 30, 50, 100)\" font-size=\"150\" stroke=\"#fff\" stroke-width=\"4\" fill=\"#c00\">WRECKED</text>\n";

		}

		svgCode += "</svg>\n";

		return svgCode;
	}


	this.calcCurrentVals();
}
