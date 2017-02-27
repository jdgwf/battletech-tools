
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

var colorGold = "rgb(223,171,45)";
var colorTan = "rgb(253,253,227)";


function battleTechLogoSVG ( standAlone, baseFillColor, aFillColor, xLoc, yLoc, width ) {
	var baseWidth = 210;
	var baseHeight = 28;
	if( typeof( width ) == "undefined" || width == 0) {
		theWidth = 210;
		theHeight = 28;
	} else {
		theWidth = width;
		theHeight = Math.round( width / baseWidth * baseHeight );
	}

	if( typeof( xLoc ) == "undefined" ) {
		xLoc = 0;
	}

	if( typeof( yLoc ) == "undefined" ) {
		yLoc = 0;
	}

	if( typeof(standAlone) == "undefined" )
		standAlone = true;

	if( !baseFillColor )
		baseFillColor = colorTan;

	if( !aFillColor )
		aFillColor = colorGold;

	// scale = theWidth / baseWidth;
	//~ baseWidth = baseWidth * 5;
	//~ baseHeight = baseHeight * 5;

	//~ console.log( "battleTechLogoSVG" );
	//~ console.log( "battleTechLogoSVG - baseFillColor", baseFillColor);
	//~ console.log( "battleTechLogoSVG - aFillColor", aFillColor);
	//~ console.log( "battleTechLogoSVG - theWidth", theWidth);
	//~ console.log( "battleTechLogoSVG - theHeight", theHeight);
	//~ console.log( "battleTechLogoSVG - width", width);
	//~ console.log( "battleTechLogoSVG - xLoc", xLoc);
	//~ console.log( "battleTechLogoSVG - yLoc", yLoc);


	if( standAlone ) {
		var svg = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

	} else {
		var svg = '<svg \
		   viewBox="0 0 790 100" \
		   height="' + theHeight + 'px" \
		   width="' + theWidth + 'px" \
		   x="' + xLoc + 'px" \
		   y="' + yLoc + 'px" \
		   id=\"btLogo\" \
		   version="1.1"> \
		  <g> \"';
	  }



	svg += '<path \
       style="fill:' + baseFillColor + ';fill-opacity:1" \
       d="m 613.14797,97.475074 c -22.55326,-4.54102 -37.15014,-23.093463 -35.59872,-45.245504 0.80541,-11.500123 4.65183,-20.129404 12.33332,-27.669285 8.70005,-8.53966 19.66012,-12.841085 32.94182,-12.928434 13.03574,-0.08571 22.06992,3.344107 29.95796,11.373609 4.30902,4.386291 9.64083,12.354358 8.81769,13.177502 -0.48955,0.489545 -18.75978,9.049511 -20.47631,9.59357 -1.28765,0.408111 -1.96543,-0.151872 -3.84663,-3.178085 -1.45635,-2.342783 -3.5741,-4.429788 -5.84618,-5.761307 -9.13401,-5.352899 -22.62013,-0.192407 -26.08697,9.982218 -1.87994,5.517331 -1.54632,13.334811 0.76721,17.977475 4.14483,8.317581 13.22817,12.313718 22.27788,9.800981 3.11377,-0.864571 10.18475,-7.253029 10.18475,-9.201671 0,-0.612272 0.31314,-1.306735 0.69586,-1.543272 0.55987,-0.346024 21.30969,8.637335 22.34734,9.674984 0.15811,0.158104 -0.66682,2.076919 -1.83316,4.264015 -2.70077,5.064342 -10.72234,13.110593 -15.73262,15.781022 -8.54657,4.555229 -20.29316,6.038485 -30.90324,3.902182 z M 1.432377,54.886471 l 0,-42.291291 26.734517,0.0117 c 28.953298,0.01266 32.397458,0.368487 38.567864,3.984585 13.631143,7.988382 13.737063,28.930366 0.181219,35.829155 -2.190529,1.114789 -2.191238,1.117415 -0.451992,1.669431 2.916553,0.92567 8.378881,6.520629 10.230164,10.478542 2.158699,4.615149 2.382168,12.500468 0.509976,17.995039 -1.645329,4.828763 -7.551683,10.785957 -12.587425,12.69577 -3.388228,1.284982 -6.476365,1.438839 -33.45854,1.667006 l -29.725783,0.251359 0,-42.291282 z m 48.096499,19.665707 c 0.898395,-0.472873 1.880668,-1.230047 2.182849,-1.682594 C 52.668353,71.4369 52.329337,68.475488 51.046407,67.057876 49.949844,65.846179 48.500843,65.6903 38.333494,65.6903 l -11.475292,0 0,4.860823 0,4.860823 10.518626,0 c 6.479807,0 11.145807,-0.330129 12.152048,-0.859768 z M 49.420837,42.018111 c 1.678338,-1.518873 1.768324,-4.237325 0.192417,-5.813223 -0.959715,-0.959724 -3.153138,-1.17515 -11.965096,-1.17515 l -10.789956,0 0,4.113006 0,4.112997 10.597539,0 c 8.81168,0 10.827988,-0.208552 11.965096,-1.23763 z m 127.001083,24.439995 0,-30.640563 -11.03033,-0.20695 -11.03032,-0.206942 0,-11.217279 0,-11.217279 35.14748,0 35.14747,0 0,11.217279 0,11.217279 -11.03032,0.206942 -11.03033,0.20695 0,30.640563 0,30.640572 -13.08682,0 -13.08683,0 z m 74.78186,-0.01994 0,-30.660561 -11.23676,0 -11.23675,0 0.20642,-11.404231 0.20644,-11.404241 35.14747,0 35.14748,0 0,11.217279 0,11.21728 -11.03033,0.206941 -11.03033,0.20696 0,30.640563 0,30.640572 -13.08682,0 -13.08682,0 z m 53.27584,-11.404231 0.19319,-42.064802 12.89987,-0.204611 12.89986,-0.204612 0,30.678221 0,30.678222 15.70419,0 15.70419,0 0,11.591182 0,11.591193 -28.79724,0 -28.79723,0 z m 63.70339,41.071024 c -0.20974,-0.54658 -0.28331,-19.475735 -0.16349,-42.064792 l 0.21787,-41.071034 68.61235,-0.190863 68.61235,-0.190873 0,11.595104 0,11.595104 -11.21728,0 -11.21728,0 0,30.660561 0,30.660562 -12.71291,0 -12.71292,0 0,-30.660562 0,-30.660561 -31.78229,0 -31.78228,0 0,3.739093 0,3.739093 18.69546,0 18.69546,0 0,11.217279 0,11.21728 -18.69546,0 -18.69546,0 0,4.112996 0,4.113007 19.06937,0 19.06937,0 0,11.591182 0,11.591193 -31.80576,0 c -25.76175,0 -31.87822,-0.18885 -32.1871,-0.993769 z m 142.51381,-41.257985 0,-42.251745 31.78229,0 31.78229,0 0,11.591183 0,11.591193 -18.69546,0 -18.69547,0 0,3.739093 0,3.739093 18.32155,0 18.32156,0 0,11.217279 0,11.21728 -18.32156,0 -18.32155,0 0,4.112996 0,4.113007 18.69547,0 18.69546,0 0,11.591182 0,11.591193 -31.78229,0 -31.78229,0 z m 154.97917,0.186961 0.19318,-42.064802 12.89988,-0.204611 12.89986,-0.204612 0,14.974032 0,14.974032 14.58246,0 14.58247,0 0,-14.974032 0,-14.974032 12.89986,0.204612 12.89988,0.204611 0,41.877841 0,41.877841 -12.89988,0.204611 -12.89986,0.204621 0,-16.095762 0,-16.095762 -14.58247,0 -14.58246,0 0,16.078103 0,16.078102 -13.09305,0 -13.09304,0 z" /> \
    <path \
       style="fill:' + aFillColor + ';fill-opacity:1" \
       d="m 81.354266,96.997204 c 0.132976,-0.52117 2.748565,-5.40069 5.812408,-10.84338 l 5.570619,-9.89577 26.257817,0 26.25782,0 5.74945,10.15953 c 3.16218,5.58774 5.74943,10.46725 5.74943,10.84337 0,0.40421 -15.46403,0.68383 -37.81966,0.68383 -30.157097,0 -37.770684,-0.19199 -37.577884,-0.94758 z m -1.627755,-27.03083 c 0,-1.33965 39.191139,-70.72527986 39.670909,-70.23501986 0.33538,0.34274 9.36944,16.27127986 20.07565,35.39672986 l 19.46585,34.77357 -13.19042,0.20474 c -7.25473,0.11262 -13.43513,-0.0556 -13.73422,-0.3739 -0.29911,-0.31827 -3.31884,-5.57872 -6.71055,-11.68991 -5.31432,-9.57538 -6.27985,-10.91917 -6.98514,-9.72164 -0.45011,0.76429 -3.34948,5.9326 -6.44302,11.48516 l -5.62462,10.09555 -13.262212,0.20421 c -7.294228,0.11231 -13.262227,0.0496 -13.262227,-0.13949 z" /> \
  </g>';

	svg += "<text x=\"750\" y=\"30\" font-family=\"sans-serif\" text-anchor=\"start\" style=\"fill:" + baseFillColor + ";fill-opacity:1\" font-size=\"25\">TM</text>\n";


	svg += "</svg>";


	return svg;
}

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

	svgCode = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + docHeight  + " px\" width=\"" + docWidth  + "px\" viewBox=\"0 0 " + docWidth  + " " + docHeight  + "\" >\n";

	svgCode += "<svg version=\"1.1\" id=\"recordSheetBackground\" x=\"0\" y=\"0\" height=\"" + docHeight  + " px\" width=\"" + docWidth  + "px\" viewBox=\"0 0 " + docWidth  + " " + docHeight  + "\">\n";

	svgCode += "<g>\n";

	svgCode += "<rect x=\"0\" y=\"0\" width=\"" + docWidth  + "\" height=\"" + docHeight  + "\" fill=\"" + colorWhite + "\" />\n";

	svgCode += "<text x=\""+ (docWidth / 2) + "\" y=\"100\" font-family=\"sans-serif\" text-anchor=\"middle\" font-size=\"55\">TODO: Record Sheet for " + mechData.getName()  + "</text>\n";



	svgCode += "</g>\n";

	svgCode += "</svg>\n";

	svgCode += "<rect x=\"0\" y=\"900\" width=\"2000\" height=\"500\" fill=\"" + colorBlack + "\" />\n";
	svgCode += battleTechLogoSVG( false, colorTan, colorGold, 50, 1000, 1900 );

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



	svgCode = "<svg version=\"1.1\" x=\"0px\" y=\"0px\" height=\"675px\" width=\"1000px\" xml:space=\"preserve\" viewBox=\"0 0 1000 600\" xmlns=\"http://www.w3.org/2000/svg\">\n";

	svgCode += "<g>\n";


	// Base Border and Interior White....
	svgCode += "<rect x=\"0\" y=\"0\" width=\"1000\" height=\"600\" fill=\"" + colorBlack + "\" />\n";

	if( !asData.active && inPlay )
		svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"" + colorRed + "\" />\n";
	else
		svgCode += "<rect x=\"10\" y=\"10\" style=\"z-index: -1\" width=\"980\" height=\"580\" fill=\"" + colorWhite + "\" />\n";

	// Attempt to put unit's image in background...
	if( asData.imageURL ) {
		svgCode += "    <image x=\"440\" y=\"10\" xlink:href=\"" + asData.imageURL + "\" x=\"0\" y=\"0\" width=\"" + leftBoxWidth + "\" height=\"500\" />\n";
	}


	// Mech Name and Custom Name
	if( asData.customName ) {
		svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + asData.customName  + "</text>\n";
		if( asData.name.toUpperCase().length > 45 ) {
			svgCode += "<text x=\"20\" y=\"75\" font-family=\"sans-serif\" font-size=\"13\">" + asData.name.toUpperCase()  + "</text>\n";
		} else {
			svgCode += "<text x=\"20\" y=\"75\" font-family=\"sans-serif\" font-size=\"20\">" + asData.name.toUpperCase()  + "</text>\n";
		}
	} else {
		if( asData.name.toUpperCase().length > 45 ) {
			words = asData.name.split( " " );
			halfWords = Math.floor( words.length / 2) + 1;
			firstLine = "";
			secondLine = "";

			for( var lCount = 0; lCount <= halfWords; lCount++ )
				firstLine += words[ lCount ] + " ";

			for( var lCount = halfWords + 1; lCount < words.length ; lCount++ )
				secondLine += words[ lCount ] + " ";

			svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + firstLine.toUpperCase()  + "</text>\n";
			svgCode += "<text x=\"20\" y=\"80\" font-family=\"sans-serif\" font-size=\"35\">" + secondLine.toUpperCase()  + "</text>\n";
		} else {
			svgCode += "<text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"35\">" + asData.name.toUpperCase()  + "</text>\n";
		}
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


	/*
	 * Battletech and Alpha Strike at bottom...
	 */
		svgCode += "<rect x=\"10\" y=\"610\" width=\"960\" height=\"75\" fill=\"" + colorBlack + "\" />\n";

		svgCode += "<text x=\"20\" y=\"625\" text-anchor=\"start\" font-family=\"sans-serif\" fill=\"" + colorTan + "\" style=\"font-weight: 700;\" font-size=\"30\">ALPHA STRIKE</text>\n";

		svgCode += battleTechLogoSVG ( false, colorTan, colorGold, 750, 600, 250 );

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
