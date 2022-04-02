import { IASMULUnit } from "./classes/alpha-strike-unit";
import { IEquipmentItem } from "./data/data-interfaces";
import { mechClanEquipmentEnergy } from "./data/mech-clan-equipment-weapons-energy";
import { mechISEquipmentBallistic } from "./data/mech-is-equipment-weapons-ballistic";
import { mechISEquipmentEnergy } from "./data/mech-is-equipment-weapons-energy";
import { mechISEquipmentMisc } from "./data/mech-is-equipment-weapons-misc";
import { mechISEquipmentMissiles } from "./data/mech-is-equipment-weapons-missiles";
import { mulListItems } from "./data/mul-list-items";


export function addCommas( numericalValue: number ): string {
    return (numericalValue + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
        return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
    });
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8 ) );
        return v.toString(16);
      });
}

export function getISEquipmentList(): IEquipmentItem[] {
    return mechISEquipmentBallistic.concat( mechISEquipmentEnergy, mechISEquipmentMissiles, mechISEquipmentMisc)
}

export function getClanEquipmentList(): IEquipmentItem[] {
    return mechClanEquipmentEnergy;
}


export function getOfflineMULResults(
    searchTerm: string,
    mechRules: string,
    techFilter: string,
    eraFilter: string,
): IASMULUnit[] {
    let returnUnits: IASMULUnit[] = [];

    console.log(
        "getOfflineMULResults called!",
        searchTerm,
        mechRules,
        techFilter,
        eraFilter,
    );

    searchTerm = searchTerm.toLowerCase().trim()
    mechRules = mechRules.toLowerCase().trim()
    techFilter = techFilter.toLowerCase().trim()
    eraFilter = eraFilter.toLowerCase().trim()
    let numberEraFilter = eraFilter ? +eraFilter : 0;

    if( searchTerm.length >= 3) {
        for( let unit of mulListItems) {

            if(
                unit.Name.toLowerCase().trim().indexOf(searchTerm ) > -1
                &&
                (
                    mechRules === ""
                    ||
                    unit.Rules.toLowerCase().trim().indexOf( mechRules ) > -1
                )
                &&
                (
                    techFilter === ""
                    ||
                    unit.Technology.Name.toLowerCase().trim().indexOf( techFilter ) > -1
                )
                &&
                (
                    numberEraFilter === 0
                        ||
                    unit.EraStart > numberEraFilter
                )
            ) {
                returnUnits.push( unit );
            }
        }
    }


    return returnUnits;
}

export async function getMULASSearchResults(
    searchTerm: string,
    mechRules: string,
    techFilter: string,
    eraFilter: string,
    offLine: boolean,
): Promise<IASMULUnit[]> {

    let returnUnits: IASMULUnit[] = [];

    if( offLine === false ) {
        let url = "https://masterunitlist.azurewebsites.net/Unit/QuickList?MinPV=1&MaxPV=999&Name=" + searchTerm;

        if( searchTerm.length >= 3 ) {
            await fetch(url)
            .then(async res => {
                let returnData = await res.json();

                if(!returnData) {
                    return [];
                }

                returnUnits = returnData.Units;

                if( !returnUnits ) {
                    return [];
                }

                for( let mechCounter = returnUnits.length - 1; mechCounter > -1; mechCounter--) {
                    if( mechRules && returnUnits[mechCounter]) {
                        switch( mechRules.toLowerCase() ) {
                            case "introductory":
                                if( returnUnits[mechCounter].Rules.toLowerCase() !== "introductory" )
                                    returnUnits.splice( mechCounter, 1 );
                                break;
                            case "standard":
                                if(
                                    returnUnits[mechCounter].Rules.toLowerCase() !== "introductory"
                                        &&
                                    returnUnits[mechCounter].Rules.toLowerCase() !== "standard"
                                )
                                    returnUnits.splice( mechCounter, 1 );
                                break;
                            case "advanced":
                                if(
                                    returnUnits[mechCounter].Rules.toLowerCase() !== "introductory"
                                        &&
                                    returnUnits[mechCounter].Rules.toLowerCase() !== "standard"
                                        &&
                                    returnUnits[mechCounter].Rules.toLowerCase() !== "advanced"
                                )
                                    returnUnits.splice( mechCounter, 1 );
                                break;
                        }
                    }

                    if( techFilter && returnUnits[mechCounter]) {
                        switch( techFilter.toLowerCase() ) {
                            case "inner sphere":
                                if( returnUnits[mechCounter].Technology.Name.toLowerCase() !== "inner sphere" )
                                    returnUnits.splice( mechCounter, 1 );
                                break;
                            case "clan":
                                if( returnUnits[mechCounter].Technology.Name.toLowerCase() !== "clan" )
                                    returnUnits.splice( mechCounter, 1 );
                                break;
                        }
                    }

                    if( eraFilter && +eraFilter > 0 && returnUnits[mechCounter]) {
                        if( returnUnits[mechCounter].EraStart > +eraFilter ) {
                            returnUnits.splice( mechCounter, 1 );
                        }
                        // switch( techFilter.toLowerCase() ) {
                        //     case "inner sphere":
                        //         if( returnUnits[mechCounter].Technology.Name.toLowerCase() !== "inner sphere" )
                        //             returnUnits.splice( mechCounter, 1 );
                        //         break;
                        //     case "clan":
                        //         if( returnUnits[mechCounter].Technology.Name.toLowerCase() !== "clan" )
                        //             returnUnits.splice( mechCounter, 1 );
                        //         break;
                        // }
                    }


                }

            })
            .catch(err => {
                console.error('Error: ', err)
                returnUnits = getOfflineMULResults(
                    searchTerm,
                    mechRules,
                    techFilter,
                    eraFilter,
                )
            })
        }


    } else {
        returnUnits = getOfflineMULResults(
            searchTerm,
            mechRules,
            techFilter,
            eraFilter,
        )
    }
    return returnUnits;
}
export function getMovementModifier( moveScore: number ): number {
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

export function makeRange( start: number, end: number, steps: number = 1): number[] {
    let returnValue: number[] = [];


    for( let count = start; count <= end; count = count + steps ) {
        returnValue.push( count );
    }



    return returnValue;
}

export function exportCleanJSON(obj: any) {
    var cleaned = JSON.stringify(obj, null, 4);

    // return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function (match) {
    //     return match.replace(/"/g, "");
    // });
    return cleaned.replace(/"([^"]+)":/g, '$1:');;
}

export function makeURLSlug( str: string ): string {

    return replaceAll(
        str.trim().toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''),
        "--",
        "-",
        false,
        false,
        true);
}


export function replaceAll(
    haystack: string,
    needle: string,
    replace: string,
    caseSensitive: boolean = true,
    wholeWordOnly: boolean = false,
    noRegex: boolean = false,
): string {

    if(!haystack)
        return haystack;
    if(!needle)
        return haystack;
    if(!replace)
        return haystack;
    if( typeof(haystack) !== "string") {
        //@ts-ignore
        haystack = haystack.join("\n")
    }
    if( noRegex ) {
        if( wholeWordOnly ) {
            needle = " " + needle;
            replace = " " + replace;
        }
        let iterations = 0
        let maxIterations = 1000;
        while( haystack.indexOf( needle ) > -1 ) {
            if( maxIterations < iterations ) {
                console.error("replaceAll - max Iterations reached!")
                break;
            }

            try {
                haystack = haystack.replace(needle, replace);
            }
            catch(e: any) {
                console.error("replaceAll err", haystack, e)
            }

            iterations++;
        }

        return haystack;
    } else {
        needle = needle.replace("(", "\\(");
        needle = needle.replace("_", "\\_");
        needle = needle.replace(")", "\\)");
        if( wholeWordOnly ) {

            if( caseSensitive ) {
                let re = new RegExp("\\b" + needle + "\\b","g");
                return haystack.replace(re, replace);
            } else {
                let re = new RegExp("\\b" + needle + "\\b","gi");
                return haystack.replace(re, replace);
            }

        } else {

            if( caseSensitive ) {
                let re = new RegExp(needle,"gi");
                return haystack.replace(re, replace);
            }else {
                let re = new RegExp(needle,"g");
                return haystack.replace(re, replace);
            }

        }


    }
}

export function getAeroRangeLabel( aeroAbbr: string): string {

    if( aeroAbbr === "s" )
        return "Short";
    if( aeroAbbr === "m" )
        return "Medium";
    if( aeroAbbr === "l" )
        return "Long";
    if( aeroAbbr === "e" )
        return "Extreme";
    return "";
}

export function sortEquipment (
    a: IEquipmentItem,
    b: IEquipmentItem,
): number {
    if( a.sort.toLocaleLowerCase().trim() >  b.sort.toLocaleLowerCase().trim() ) {
        return 1;
    } else if( a.sort.toLocaleLowerCase().trim() <  b.sort.toLocaleLowerCase().trim() ) {
        return -1;
    } else {
        return 0
    }

}