
var colorRed = "rgb(200,0,0)";
var colorGreen = "rgb(0,200,0)";
var colorBlue = "rgb(0,0,200)";
var colorBlack = "rgb(0,0,0)";
var colorWhite = "rgb(255,255,255)";
var colorYellow = "rgb( 204, 187, 0 )";
var colorOrange = "rgb( 236,87,16 )";
var colorGrayBackground = "rgba( 255,255,255,.8)";

var colorMediumGray = "rgb(102,102,102)";
var colorDarkGray = "rgb(51,51,51)";
var colorLightGray = "rgb(153,153,153)";


/* Functions outside scope for SVG manipulation */
function ASChangeSVGHeat( newHeatValue, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.setMechHeat( newHeatValue, groupIndex, mechIndex ) ;
		}
    );
}


function ASToggleArmorPip( armorIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleArmorPip( armorIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleStructPip( structIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleStructPip( structIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleEngineHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleEngineHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleFireControlHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleControlHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleMPlHit( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleMPHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASToggleWeaponHits( critIndex, groupIndex, mechIndex, idField ) {
	//~ console.log( "changeSVGHeat", newHeatValue, groupIndex, mechIndex, idField );
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.toggleWeaponHit( critIndex, groupIndex, mechIndex ) ;
		}
    );
}

function ASTakeDamage(  groupIndex, mechIndex, idField ) {
    var scope = angular.element(document.getElementById( idField )).scope();
	scope.$apply(
		function() {
			scope.showDamagePopup( groupIndex, mechIndex ) ;
		}
    );
}


function createSVGRecordSheet( mechData, inPlay, landscape, itemIDField ) {
	if( typeof( landscape ) == "undefined" ) {
		landscape = false;
	} else {
		if( landscape )
			landscape = true;
		else
			landscape = false;
	}

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

	var docWidth = 2000;
	var docHeight = 2300;

	svgCode = "<svg version=\"1.1\" x=\"0px\" y=\"0px\" height=\"" + docHeight  + " px\" width=\"" + docWidth  + "px\" xml:space=\"preserve\" viewBox=\"0 0 " + docWidth  + " " + docHeight  + "\" xmlns=\"http://www.w3.org/2000/svg\">\n";

	svgCode += "<g>\n";

	svgCode += "<rect x=\"0\" y=\"0\" width=\"" + docWidth  + "\" height=\"" + docHeight  + "\" fill=\"" + colorWhite + "\" />\n";

	svgCode += "<text x=\""+ (docWidth / 2) + "\" y=\"100\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"55\">TODO: Record Sheet for " + mechData.getName()  + "</text>\n";

	svgCode += "</g>\n";

	svgCode += "</svg>\n";

	while( svgCode.indexOf( "class=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "class=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "onclick=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "onclick=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "  " ) > 0 ) {

		svgCode = svgCode.replace( "  ", " " );
	}

	return svgCode;
}

function createSVGAlphaStrike( asData, inPlay, itemIDField ) {

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



	svgCode = "<svg version=\"1.1\" x=\"0px\" y=\"0px\" height=\"600px\" width=\"1000px\" xml:space=\"preserve\" viewBox=\"0 0 1000 600\" xmlns=\"http://www.w3.org/2000/svg\">\n";

	svgCode += "<g>\n";


	// Base Border and Interior White....
	svgCode += "<rect x=\"0\" y=\"0\" width=\"1000\" height=\"600\" fill=\"" + colorBlack + "\" />\n";

	if( !asData.active && inPlay )
		svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"" + colorRed + "\" />\n";
	else
		svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"" + colorWhite + "\" />\n";

	// Attempt to put unit's image in background...
	if( asData.imageURL ) {
		svgCode += "    <image x=\"450\" y=\"50\" xlink:href=\"" + asData.imageURL + "\" x=\"0\" y=\"0\" width=\"" + leftBoxWidth + "\" height=\"500\" />\n";
	}


	// Mech Name and Custom Name
	if( asData.customName ) {
		svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + asData.customName  + "</text>\n";
		svgCode += "<text x=\"20\" y=\"75\" font-family=\"sans-serif\" font-size=\"20\">" + asData.name.toUpperCase()  + "</text>\n";
	} else {
		svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + asData.name.toUpperCase()  + "</text>\n";
	}

	//svgCode += "<text x=\"800\" y=\"50\" font-family=\"sans-serif\" font-size=\"11\">" + groupIndex + ", " + mechIndex + ", " + itemIDField + "</text>\n";
	// Point Value
	svgCode += "<rect x=\"850\" y=\"9\" width=\"150\" height=\"35\" fill=\"" + colorBlack + "\" />\n";
	svgCode += "<rect x=\"780\" y=\"9\" width=\"70\" height=\"35\" fill=\"" + colorBlack + "\" transform=\"rotate( 45, 850, 44)\" />\n";
	svgCode += "<text x=\"990\" y=\"35\" text-anchor=\"end\" fill=\"" + colorWhite + "\" stroke=\"" + colorWhite + "\" font-family=\"sans-serif\" font-size=\"33\">PV: " + asData.currentPoints  + "</text>\n";

	/*
	 *  Movement, Type, Role, Skill, etc
	*/
	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"100\" width=\"" + leftBoxWidth + "\" height=\"105\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"105\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"95\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";

	//Type
	svgCode += "<text x=\"30\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">TP: " + asData.type.toUpperCase()  + "</text>\n";

	//Size
	svgCode += "<text x=\"150\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">SZ: " + asData.size.toString().toUpperCase()  + "</text>\n";

	//TMM
	if( asData.isAerospace == false )
		svgCode += "<text x=\"235\" y=\"140\" font-family=\"sans-serif\" font-size=\"25\">TMM: " + asData.currentTMM.toUpperCase()  + "</text>\n";

	//Move
	svgCode += "<text x=\"" + (leftBoxWidth - 10) + "\" y=\"140\" font-family=\"sans-serif\" text-anchor=\"end\" font-size=\"25\">MV: " + asData.currentMove.toUpperCase()  + "</text>\n";

	//Role
	svgCode += "<text x=\"30\" y=\"180\" font-family=\"sans-serif\" font-size=\"25\">ROLE: " + asData.role.toUpperCase()  + "</text>\n";


	//Skill
	svgCode += "<text x=\"" + (leftBoxWidth - 10) + "\" y=\"180\" font-family=\"sans-serif\" text-anchor=\"end\" font-size=\"25\">SKILL: " + asData.currentSkill.toString().toUpperCase()  + "</text>\n";

	/*
	 *  Damage Section
	*/

	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"210\" width=\"" + leftBoxWidth + "\" height=\"85\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"215\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"75\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";



	// Damage Label
	svgCode += "<text x=\"55\" y=\"250\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\" transform=\"rotate(270, 58, 250)\">DAMAGE</text>\n";

	var firstDamageLineY = 245;
	var secondDamageLineY = 280;
	if( asData.damage.extreme > 0 ) {
		shortX = 120;
		mediumX = 240;
		longX = 350;
		extremeX = 460;

		// Short
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">S (+0 | " + asData.currentToHitShort + "+)</text>\n";
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.short  + "</text>\n";


		// Medium
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">M (+2 | " + asData.currentToHitMedium + "+)</text>\n";
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.medium  + "</text>\n";

		// Long
		svgCode += "<text x=\"" + longX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">L (+4 | " + asData.currentToHitLong + "+)</text>\n";
		svgCode += "<text x=\"" + longX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.long  + "</text>\n";

		// Extreme
		svgCode += "<text x=\"" + extremeX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"15\">E (+6 | " + asData.currentToHitExtreme + "+)</text>\n";
		svgCode += "<text x=\"" + extremeX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"30\">" + asData.currentDamage.extreme  + "</text>\n";

	} else {
		shortX = 140;
		mediumX = 290;
		longX = 440;
		extremeX = 0;

		// Short
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">S (+0 | " + asData.currentToHitShort + "+)</text>\n";
		svgCode += "<text x=\"" + shortX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + asData.currentDamage.short  + "</text>\n";


		// Medium
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">M (+2 | " + asData.currentToHitMedium + "+)</text>\n";
		svgCode += "<text x=\"" + mediumX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + asData.currentDamage.medium  + "</text>\n";

		// Long
		svgCode += "<text x=\"" + longX  +"\" y=\"" + firstDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"20\">L (+4 | " + asData.currentToHitLong + "+)</text>\n";
		svgCode += "<text x=\"" + longX  +"\" y=\"" + secondDamageLineY + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"35\">" + asData.currentDamage.long  + "</text>\n";
	}


	/*
	 *  Overheat Section
	*/
	var armorBoxStart = 400;
	if( asData.type.toLowerCase() != 'pm' && !asData.isInfantry ) {
		svgCode += "<rect x=\"20\" y=\"310\" width=\"" + leftBoxWidth + "\" height=\"80\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"25\" y=\"315\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"70\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";

		svgCode += "<text x=\"40\" y=\"360\" font-family=\"sans-serif\" font-size=\"35\">OV: " + asData.overheat + "</text>\n";

		// heat container...
		svgCode += "<text x=\"240\" y=\"357\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"15\">HEAT SCALE</text>\n";
		svgCode += "<rect x=\"" + ( leftBoxWidth - 255 ) + "\" y=\"320\" width=\"265\" height=\"60\" fill=\"" + colorBlack + "\" rx=\"30\" ry=\"30\"  />\n";

		var inActiveColor = "rgb(102,102,102)";
		var onClickFunction = "";
		var mouseHandClass = "";


		// 0 Heat....
		if( asData.currentHeat < 1 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 225 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + colorGreen + "\" />\n";
			svgCode += "<circle cx=\"" + ( leftBoxWidth - 225 ) + "\" cy=\"350\" r=\"25\" fill=\"" + colorGreen + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 225 - 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">0</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 0, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 225 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<circle onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" cx=\"" + ( leftBoxWidth - 225 ) + "\" cy=\"350\" r=\"25\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 225 - 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">0</text>\n";
		}

		// 1 Heat....
		//~ svgCode += "<rect x=\"280\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat == 1 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 195 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + colorYellow + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 195 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">1</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 1, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 195 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 195 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">1</text>\n";

		}

		// 2 Heat....
		//~ svgCode += "<rect x=\"340\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat == 2 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 145 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + colorRed + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 145 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">2</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 2, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 145 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 145 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">2</text>\n";

		}
		// 3 Heat....
		//~ svgCode += "<rect x=\"400\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat == 3 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 95 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + colorOrange + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 95 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">3</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 3, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 95 ) + "\" y=\"325\" width=\"45\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 95 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">3</text>\n";

		}
		// s Heat....
		//~ svgCode += "<rect x=\"400\" y=\"320\" width=\"60\" height=\"60\" fill=\"" + colorBlack + "\" />\n";
		if( asData.currentHeat > 3 && inPlay ) {
			svgCode += "<rect x=\"" + ( leftBoxWidth - 45 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + colorDarkGray + "\" />\n";
			svgCode += "<circle cx=\"" + ( leftBoxWidth - 20 ) + "\" cy=\"350\" r=\"25\" fill=\"" + colorDarkGray + "\" />\n";
			svgCode += "<text x=\"" + ( leftBoxWidth - 45 + 10 ) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">S</text>\n";
		} else {
			if( inPlay ) {
				onClickFunction = "ASChangeSVGHeat( 4, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				mouseHandClass = "mouse-hand";
			}
			svgCode += "<rect onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 45 ) + "\" y=\"325\" width=\"25\" height=\"50\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<circle onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" cx=\"" + ( leftBoxWidth - 20 ) + "\" cy=\"350\" r=\"25\" fill=\"" + inActiveColor + "\" />\n";
			svgCode += "<text onclick=\"" + onClickFunction + "\" class=\"" + mouseHandClass + "\" x=\"" + ( leftBoxWidth - 45 + 10) + "\" y=\"363\" text-anchor=\"left\" style=\"fill: " + colorWhite + "\" font-family=\"sans-serif\" font-size=\"35\">S</text>\n";
		}
	} else {
		armorBoxStart = 300;
	}


	/*
	 *  Armor and IS Section
	*/

	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"" + (armorBoxStart) + "\" width=\"" + leftBoxWidth + "\" height=\"105\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"" + (armorBoxStart + 5) + "\" width=\"" + ( leftBoxWidth - 10 ) + "\" height=\"95\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";




	var armorTopBase = armorBoxStart + 15;
	var isTopBase = armorBoxStart + 60;
	var buttonRadius = 15;
	var leftBase = 90;

	if( asData.isAerospace ) {
		svgCode += "<text x=\"" + ( leftBoxWidth - 25) + "\" y=\"" + ( armorTopBase + 25) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"35\">TH</text>\n";
		svgCode += "<text x=\"" + ( leftBoxWidth - 25) + "\" y=\"" + ( armorTopBase + 65) + "\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"35\">" + asData.threshold + "</text>\n";
	}

	var armorClass = "";
	var armorFunction = "";
	if( inPlay ) {
		svgCode += "<text x=\"80\" y=\"" + ( armorTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">A: </text>\n";
		svgCode += "<text x=\"80\" y=\"" + ( isTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">S: </text>\n";


		var onClick = "ASTakeDamage( " + groupIndex + ", "+ mechIndex + ", '" + itemIDField + "')";
		svgCode += "<rect class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"30\" y=\"" + (armorBoxStart + 10) + "\" width=\"" + ( 40 ) + "\" height=\"85\" fill=\"" + colorRed + "\" rx=\"15\" ry=\"15\" />\n";
		svgCode += "<text class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"60\" y=\"" + (armorBoxStart + 30) + "\" fill=\"" + colorWhite + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"13\" transform=\"rotate(270, 65, " + (armorBoxStart + 47) + ")\">TAKE</text>\n";
		svgCode += "<text class=\"mouse-hand\" onclick=\"" + onClick + "\" x=\"70\" y=\"" + (armorBoxStart + 30) + "\" fill=\"" + colorWhite + "\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"13\" transform=\"rotate(270, 75, " + (armorBoxStart + 45) + ")\">DAMAGE</text>\n";
		leftBase += 40;
	} else {
		svgCode += "<text x=\"40\" y=\"" + ( armorTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">A: </text>\n";
		svgCode += "<text x=\"40\" y=\"" + ( isTopBase + 25) + "\" font-family=\"sans-serif\" font-size=\"25\">S: </text>\n";
	}

	for( var armorCount = 0; armorCount < asData.currentArmor.length; armorCount++ ) {
		if( inPlay ) {
			var armorClass = "mouse-hand";
			var armorFunction = "ASToggleArmorPip( " + armorCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
		}
		svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
	//	svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
		if( asData.currentArmor[ armorCount ] && inPlay ) {
			svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
		} else {
			svgCode += "<circle class=\"" + armorClass + "\" onclick=\"" + armorFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * armorCount )  + "\" cy=\"" + ( armorTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
		}
	}

	var structClass = "";
	var structFunction = "";
	for( var structCount = 0; structCount < asData.currentStructure.length; structCount++ ) {
		if( inPlay ) {
			var structClass = "mouse-hand";
			var structFunction = "ASToggleStructPip( " + structCount + ", " + groupIndex + ", "+ mechIndex + ", '" + itemIDField + "')";
		}
		svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
	//	svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"150\" cy=\"" + armorTopBase + "\" r=\"" + buttonRadius + "\" fill=\"green\" />\n";
		if( asData.currentStructure[ structCount ] && inPlay ) {
			svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
		} else {
			svgCode += "<circle class=\"" + structClass + "\" onclick=\"" + structFunction + "\" cx=\"" + ( leftBase + (buttonRadius * 2 + 3 ) * structCount )  + "\" cy=\"" + ( isTopBase + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorLightGray + "\" />\n";
		}
	}


	/*
	 *  Special Section
	*/

	// Gray, Rounded Box
	svgCode += "<rect x=\"20\" y=\"510\" width=\"960\" height=\"60\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
	svgCode += "<rect x=\"25\" y=\"515\" width=\"950\" height=\"50\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";
	if( asData.abilities )
		svgCode += "<text x=\"30\" y=\"550\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">SPECIAL: " + asData.abilities + "</text>\n";
	else
		svgCode += "<text x=\"30\" y=\"550\" text-anchor=\"left\" font-family=\"sans-serif\" font-size=\"25\">SPECIAL: (none)</text>\n";


	/*
	 *  Critical Hits Section
	*/

	if( !asData.isInfantry ) {

		critLineHeight = 50;
		critLineStart = 325;

		// Gray, Rounded Box
		svgCode += "<rect x=\"" + (leftBoxWidth + 30) + "\" y=\"245\" width=\"" + (950 - leftBoxWidth ) + "\" height=\"260\" fill=\"" + colorBlack + "\" rx=\"18\" ry=\"18\" />\n";
		svgCode += "<rect x=\"" + (leftBoxWidth + 35) + "\" y=\"250\" width=\"" + (950 - 10 - leftBoxWidth ) + "\" height=\"250\" fill=\"" + colorGrayBackground + "\" rx=\"15\" ry=\"15\" />\n";

		//
		svgCode += "<text x=\"" + (leftBoxWidth + 35 + (950 - leftBoxWidth ) / 2) + "\" y=\"275\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"25\">CRITICAL HITS</text>\n";

		var leftmostCritButton = (leftBoxWidth + 35 + (950 - leftBoxWidth ) / 2) - 15;

		// Engine Hits
		if( asData.type.toLowerCase() != 'pm') {

			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">ENGINE</text>\n";
			for( var critCount = 0; critCount < asData.engineHits.length; critCount++ ) {
				if( inPlay ) {
					var critClass = "mouse-hand";
					var critFunction = "ASToggleEngineHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				}
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

				if( asData.engineHits[ critCount ] && inPlay ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}
			}
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">+1 Heat/Firing Weapons</text>\n";
			critLineStart += critLineHeight;
		}



		// Fire Control Hits
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">FIRE CONTROL</text>\n";
		for( var critCount = 0; critCount < asData.fireControlHits.length; critCount++ ) {
			if( inPlay ) {
				var critClass = "mouse-hand";
				var critFunction = "ASToggleFireControlHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
			}
			svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

			if( asData.fireControlHits[ critCount ] && inPlay ) {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
			} else {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
			}
		}
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">+2 To Hit Each</text>\n";
		critLineStart += critLineHeight;

		if( asData.type.toLowerCase() == 'bm' || asData.type.toLowerCase() == 'pm' ) {
			// MP Hits
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">MP</text>\n";
			for( var critCount = 0; critCount < asData.mpControlHits.length; critCount++ ) {
				if( inPlay ) {
					var critClass = "mouse-hand";
					var critFunction = "ASToggleMPlHit( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				}
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

				if( asData.mpControlHits[ critCount ] && inPlay ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}
			}
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">1/2 Move Each</text>\n";
			critLineStart += critLineHeight;
		}

		// Weapon Hits
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">WEAPONS</text>\n";
		for( var critCount = 0; critCount < asData.weaponHits.length; critCount++ ) {
			if( inPlay ) {
				var critClass = "mouse-hand";
				var critFunction = "ASToggleWeaponHits( " + critCount + ", " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
			}
			svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

			if( asData.weaponHits[ critCount ] && inPlay ) {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
			} else {
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 3 ) * critCount )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
			}
		}
		svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">-1 Damage Each</text>\n";
		critLineStart += critLineHeight;


		if( asData.type.toLowerCase() == 'cv' || asData.type.toLowerCase() == 'sv' ) {
			// Vehicile Motive Hits
			svgCode += "<text x=\"" + (leftBoxWidth + (950 - leftBoxWidth ) / 2) + "\" y=\"" + critLineStart + "\" text-anchor=\"end\" font-family=\"sans-serif\" font-size=\"20\">MOTIVE</text>\n";

			if( inPlay ) {


				var critClass = "mouse-hand";
				var critFunction = "ASToggleMPlHit( 0, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";

				if( asData.mpControlHits[ 0 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 1, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 1 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 2, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 2 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 3, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 3 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}

				critFunction = "ASToggleMPlHit( 4, " + groupIndex + ", "+ mechIndex+ ", '" + itemIDField + "')";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				if( asData.mpControlHits[ 4 ] ) {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4  +30)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 )+ "\" fill=\"" + colorRed + "\" />\n";
				} else {
					svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";
				}



			} else {
				critClass = "";
				critFunction = "";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 1 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 +15 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 3  +15)  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + buttonRadius + "\" fill=\"" + colorBlack + "\" />\n";
				svgCode += "<circle class=\"" + critClass + "\" onclick=\"" + critFunction + "\" cx=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 +30 )  + "\" cy=\"" + ( critLineStart - 27 + buttonRadius + 2 )  + "\" r=\"" + (buttonRadius -3 ) + "\" fill=\"" + colorWhite + "\" />\n";


			}
			svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 0 - buttonRadius + 20 )  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">-2 MV</text>\n";
			svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 2 - buttonRadius +10)  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">&frac12; Move Each</text>\n";
			svgCode += "<text x=\"" + ( leftmostCritButton + (buttonRadius * 2 + 1 ) * 4 - buttonRadius +30)  + "\" y=\"" + ( critLineStart + buttonRadius + 3 ) + "\" text-anchor=\"start\" font-family=\"sans-serif\" font-size=\"12\">0 MV</text>\n";
			critLineStart += critLineHeight;
		}

	}

	if( !asData.active && inPlay) {
		svgCode += "<text x=\"50\" y=\"100\" font-family=\"sans-serif\" transform=\"rotate( 30, 50, 100)\" font-size=\"150\" stroke=\"" + colorWhite + "\" stroke-width=\"4\" fill=\"" + colorRed + "\">WRECKED</text>\n";
	}


	svgCode += "</g>\n";

	svgCode += "</svg>\n";

	while( svgCode.indexOf( "class=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "class=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "onclick=\"undefined\"" ) > 0 ) {

		svgCode = svgCode.replace( "onclick=\"undefined\"", "" );
	}

	while( svgCode.indexOf( "  " ) > 0 ) {

		svgCode = svgCode.replace( "  ", " " );
	}

	//~ while( svgCode.indexOf( "\n" ) > 0 ) {

		//~ svgCode = svgCode.replace( "\n", "" );
	//~ }

	//~ return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M28.1,36.6c4.6,1.9,12.2,1.6,20.9,1.1c8.9-0.4,19-0.9,28.9,0.9c6.3,1.2,11.9,3.1,16.8,6c-1.5-12.2-7.9-23.7-18.6-31.3   c-4.9-0.2-9.9,0.3-14.8,1.4C47.8,17.9,36.2,25.6,28.1,36.6z"/><path d="M70.3,9.8C57.5,3.4,42.8,3.6,30.5,9.5c-3,6-8.4,19.6-5.3,24.9c8.6-11.7,20.9-19.8,35.2-23.1C63.7,10.5,67,10,70.3,9.8z"/><path d="M16.5,51.3c0.6-1.7,1.2-3.4,2-5.1c-3.8-3.4-7.5-7-11-10.8c-2.1,6.1-2.8,12.5-2.3,18.7C9.6,51.1,13.4,50.2,16.5,51.3z"/><path d="M9,31.6c3.5,3.9,7.2,7.6,11.1,11.1c0.8-1.6,1.7-3.1,2.6-4.6c0.1-0.2,0.3-0.4,0.4-0.6c-2.9-3.3-3.1-9.2-0.6-17.6   c0.8-2.7,1.8-5.3,2.7-7.4c-5.2,3.4-9.8,8-13.3,13.7C10.8,27.9,9.8,29.7,9,31.6z"/><path d="M15.4,54.7c-2.6-1-6.1,0.7-9.7,3.4c1.2,6.6,3.9,13,8,18.5C13,69.3,13.5,61.8,15.4,54.7z"/><path d="M39.8,57.6C54.3,66.7,70,73,86.5,76.4c0.6-0.8,1.1-1.6,1.7-2.5c4.8-7.7,7-16.3,6.8-24.8c-13.8-9.3-31.3-8.4-45.8-7.7   c-9.5,0.5-17.8,0.9-23.2-1.7c-0.1,0.1-0.2,0.3-0.3,0.4c-1,1.7-2,3.4-2.9,5.1C28.2,49.7,33.8,53.9,39.8,57.6z"/><path d="M26.2,88.2c3.3,2,6.7,3.6,10.2,4.7c-3.5-6.2-6.3-12.6-8.8-18.5c-3.1-7.2-5.8-13.5-9-17.2c-1.9,8-2,16.4-0.3,24.7   C20.6,84.2,23.2,86.3,26.2,88.2z"/><path d="M30.9,73c2.9,6.8,6.1,14.4,10.5,21.2c15.6,3,32-2.3,42.6-14.6C67.7,76,52.2,69.6,37.9,60.7C32,57,26.5,53,21.3,48.6   c-0.6,1.5-1.2,3-1.7,4.6C24.1,57.1,27.3,64.5,30.9,73z"/></g></svg>';

	return svgCode;
}
