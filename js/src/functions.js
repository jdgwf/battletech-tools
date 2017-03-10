
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
var colorVeryLightGray = "rgb(225,225,225)";

var colorGold = "rgb(223,171,45)";
var colorTan = "rgb(253,253,227)";

function getAppVersion() {
	return "0.0.4 alpha";
}

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function sortByLocationThenName( a, b ) {
	if( a.location > b.location )
		return 1;
	if( a.location < b.location )
		return -1;
	if( a.name > b.name )
		return 1;
	if( a.name < b.name )
		return -1;
	return 0;
}



function sortByBVThenHeat( a, b ) {
	if( a.battlevalue < b.battlevalue )
		return 1;
	if( a.battlevalue > b.battlevalue )
		return -1;
	if( a.heat < b.heat )
		return 1;
	if( a.heat > b.heat )
		return -1;
	return 0;
}

function sortByCategoryThenName( a, b ) {
	if( a.local_category > b.local_category )
		return 1;
	if( a.local_category < b.local_category )
		return -1;
	if( a.local_name > b.local_name )
		return 1;
	if( a.local_name < b.local_name )
		return -1;
	return 0;
}

function sortByCategoryThenSortThenName( a, b ) {



	if( a.local_category > b.local_category )
		return 1;
	if( a.local_category < b.local_category )
		return -1;

	if( a.sort && b.sort ) {
		if( a.sort > b.sort )
			return 1;
		if( a.sort < b.sort )
			return -1;
	} else if( a.sort ) {
		if( a.sort > b.local_name )
			return 1;
		if( a.sort < b.local_name )
			return -1;
	} else if( b.sort ) {
		if( a.local_name > b.sort )
			return 1;
		if( a.local_name < b.sort )
			return -1;
	} else {
		if( a.local_name > b.local_name )
			return 1;
		if( a.local_name < b.local_name )
			return -1;
	}

	return 0;
}

function sortBySortThenName( a, b ) {


	if( a.sort && b.sort ) {
		if( a.sort > b.sort )
			return 1;
		if( a.sort < b.sort )
			return -1;
	} else if( a.sort ) {
		if( a.sort > b.local_name )
			return 1;
		if( a.sort < b.local_name )
			return -1;
	} else if( b.sort ) {
		if( a.local_name > b.sort )
			return 1;
		if( a.local_name < b.sort )
			return -1;
	} else {
		if( a.local_name > b.local_name )
			return 1;
		if( a.local_name < b.local_name )
			return -1;
	}

	return 0;
}

function sortByLocalName( a, b ) {
	if( a.local_name > b.local_name )
		return 1;
	if( a.local_name < b.local_name )
		return -1;
	return 0;
}

function ifIEOrEdge() {
	if (/MSIE 10/i.test(navigator.userAgent)) {
	   // This is internet explorer 10
	   return true;
	}

	if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
	    // This is internet explorer 9 or 11
	    return true;
	}

	if (/Edge\/\d./i.test(navigator.userAgent)){
	   // This is Microsoft Edge
	   return true;
	}



	return false;
}


function ifEdge() {
	if (/Edge\/\d./i.test(navigator.userAgent)){
	   // This is Microsoft Edge
	   return true;
	}

	return false;
}

function ifIE() {
	if (/MSIE 10/i.test(navigator.userAgent)) {
	   // This is internet explorer 10
	   return true;
	}

	if (/MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent)) {
	    // This is internet explorer 9 or 11
	    return true;
	}

	return false;
}


function isIOSStandAlone() {
	if( window.navigator.standalone == true ){
	   // Experimenting with iOS PDF fixes.
	   return true;
	}
	return false;
}

function SelectAll(id)
{
    document.getElementById(id).focus();
    document.getElementById(id).select();
}
//pads left
String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

//pads right
String.prototype.rpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

function getMovementModifier( moveScore ) {
	if( moveScore >= 25 ) {
		return 6;
	} else if ( moveScore >= 18 ) {
		return 5;
	} else if ( moveScore >= 10 ) {
		return 4;
	} else if ( moveScore >= 7 ) {
		return 3;
	} else if ( moveScore >= 5 ) {
		return 2;
	} else if ( moveScore >= 3 ) {
		return 1;
	}

	return 0;

}


/*
	item: Object must include following keys:
	{
		introduced int,
		extinct int (if == 0, item != extinct),
		reintroduced int (if == 0 item != reintroduced)
	}

	currentEra: Object must include following keys:
	{
		year_start int,
		year_end int
	}
*/
function getItemAvailability( item, currentEra )
{
	if
	(
		(
			item.reintroduced != 0
			&& item.reintroduced <= currentEra.year_end
		)
		||
		(
			item.introduced <= currentEra.year_end
			&&
			(
				item.extinct == 0
				||
				item.extinct >= currentEra.year_start
			)
		)
	) {
		return true;
	}
	else {
		return false;
	}
}

