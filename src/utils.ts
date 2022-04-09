import { IASMULUnit } from "./classes/alpha-strike-unit";
import { BattleMech, IGATOR, ITargetToHit } from "./classes/battlemech";
import { IEquipmentItem } from "./data/data-interfaces";
import { mechClanEquipmentEnergy } from "./data/mech-clan-equipment-weapons-energy";
import { mechISEquipmentBallistic } from "./data/mech-is-equipment-weapons-ballistic";
import { mechISEquipmentEnergy } from "./data/mech-is-equipment-weapons-energy";
import { mechISEquipmentMisc } from "./data/mech-is-equipment-weapons-misc";
import { mechISEquipmentMissiles } from "./data/mech-is-equipment-weapons-missiles";


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
    return mechISEquipmentBallistic
        .concat(
            mechISEquipmentEnergy,
            mechISEquipmentMissiles,
            mechISEquipmentMisc
        );
}

export function getClanEquipmentList(): IEquipmentItem[] {
    return mechClanEquipmentEnergy;
}


// export function getOfflineMULResults(
//     searchTerm: string,
//     mechRules: string,
//     techFilter: string,
//     eraFilter: string,
// ): IASMULUnit[] {
//     let returnUnits: IASMULUnit[] = [];

//     console.log(
//         "getOfflineMULResults called!",
//         searchTerm,
//         mechRules,
//         techFilter,
//         eraFilter,
//     );

//     searchTerm = searchTerm.toLowerCase().trim()
//     mechRules = mechRules.toLowerCase().trim()
//     techFilter = techFilter.toLowerCase().trim()
//     eraFilter = eraFilter.toLowerCase().trim()
//     let numberEraFilter = eraFilter ? +eraFilter : 0;

//     if( searchTerm.length >= 3) {
//         for( let unit of mulListItems) {

//             if(
//                 unit.Name.toLowerCase().trim().indexOf(searchTerm ) > -1
//                 &&
//                 (
//                     mechRules === ""
//                     ||
//                     unit.Rules.toLowerCase().trim().indexOf( mechRules ) > -1
//                 )
//                 &&
//                 (
//                     techFilter === ""
//                     ||
//                     unit.Technology.Name.toLowerCase().trim().indexOf( techFilter ) > -1
//                 )
//                 &&
//                 (
//                     numberEraFilter === 0
//                         ||
//                     unit.EraStart > numberEraFilter
//                 )
//             ) {
//                 returnUnits.push( unit );
//             }
//         }
//     }


//     return returnUnits;
// }

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
                console.error('MUL Fetch Error: ', err);
                // returnUnits = getOfflineMULResults(
                //     searchTerm,
                //     mechRules,
                //     techFilter,
                //     eraFilter,
                // )
            })
        }


    } else {
        // returnUnits = getOfflineMULResults(
        //     searchTerm,
        //     mechRules,
        //     techFilter,
        //     eraFilter,
        // )
        console.warn("Navigator is offline!")
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

export function getTargetColor(
    targetLetter: string | undefined,
): string {

    if( targetLetter && targetLetter.toLowerCase() === "a" ) {
        return "red";
    }
    if( targetLetter && targetLetter.toLowerCase() === "b" ) {
        return "blue";
    }
    if( targetLetter && targetLetter.toLowerCase() === "c" ) {
        return "orange";
    }
    return "#cccccc";
}

export function getHexDistanceFromModifier(
    mod: number
): string {
    if( mod > 5 ) {
        return "25+"
    } else if( mod > 4 ) {
        return "18-24"
    } else if( mod > 3 ) {
        return "10-17"
    } else if( mod > 2 ) {
        return "7-9"
    } else if( mod > 1 ) {
        return "5-6"
    } else if( mod > 0 ) {
        return "3-4"
    } else {
        return "0-2"
    }

}

const clusterHitsTable = [
    [   // roll of 2, array index 0
        1,1,1,1,2,2,3,3,3,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,9,9,9,10,10,12,
    ],
    [ // roll of 3, array index 1
        1,1,2,2,2,2,3,3,3,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,9,9,9, 10, 10, 12,
    ],
    [// roll of 4, array index 2
        1,1,2,2,3,3,4,4,4,5,5,5,6,6,7,7,8,8,9,9,9, 10, 10, 10, 11, 11, 11, 12, 12, 18,
    ],
    [ // roll of 5, array index 3
        1,2,2,3,3,4,4,5,6,7,8,8,9,9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24,
    ],
    [ // roll of 6, array index 4
        1,2,2,3,4,4,5,5,6,7,8,8,9,9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24,
    ],
    [ // roll of 7, array index 5
        1,2,3,3,4,4,5,5,6,7,8,8,9,9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24,
    ],
    [ // roll of 8, array index 6
        2,2,3,3,4,4,5,5,6,7,8,8,9,9, 10, 10, 11, 11, 12, 13, 14, 15, 16, 16, 17, 17, 17, 18, 18, 24,
    ],
    [ // roll of 9, array index 7
        2,2,3,4,5,6,6,7,8,9, 10, 11, 11, 12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 21, 22, 23, 23, 24, 32,
    ],
    [ // roll of 10, array index 8
        2,3,3,4,5,6,6,7,8,9, 10, 11, 11, 12, 13, 14, 14, 15, 16, 17, 18, 19, 20, 21, 21, 22, 23, 23, 24, 32,
    ],
    [ // roll of 11, array index 9
        2,3,4,5,6,7,8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40,
    ],
    [ // roll of 12, array index 10
        2,3,4,5,6,7,8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40,
    ],
]

export function getClusterHitsPerRoll(
    roll: number,
    numberCluster: number,
): number {

    if( clusterHitsTable[ roll - 2 ] && clusterHitsTable[ roll - 2][ numberCluster - 2] ) {
        return clusterHitsTable[ roll - 2][ numberCluster - 2];
    }

    return -1;
}

export function getLocationName(
    abbr: string,
    forQuad: boolean,
): string {
    switch( abbr ) {
        case "hd": {
            return "Head"
        }

        case "ct": {
            return "Center Torso"
        }
        case "rt": {
            return "Right Torso"
        }
        case "lt": {
            return "Left Torso"
        }

        case "ctr": {
            return "Center Torso (Rear)"
        }
        case "rtr": {
            return "Right Torso (Rear)"
        }
        case "ltr": {
            return "Left Torso (Rear)"
        }

        case "ra": {
            return "Right Arm"
        }
        case "la": {
            return "Left Arm"
        }

        case "rl": {
            return "Right Leg"
        }
        case "ll": {
            return "Left Leg"
        }
    }


    return "???"
}

export function getTargetToHitFromWeapon(
    mech: BattleMech,
    index: number,
    target: ITargetToHit | null = null,
    equipmentList: IEquipmentItem[] | null = null,

): IGATOR {
    let gator: IGATOR = JSON.parse(JSON.stringify(mech.getGATOR()));

    if( equipmentList === null ) {
        equipmentList = mech.equipmentList;
    }
    gator.finalToHit = -1;
    if(
        equipmentList.length > index
        && equipmentList[index]
        && typeof( equipmentList[index].target ) !== "undefined"
        && equipmentList[index].target
    ) {


        // TS Typechecker is being an idiot here >:(
        // At this point, it's NOT undefined... how many times do I have to check?
        //@ts-ignore
        let targetLetter: string = equipmentList[index].target;


        if( target === null && mech ) {
            target = mech.getTarget( targetLetter )
        }

        if( target ) {

            gator.targetName = target.name;

            gator.target = "Target " + targetLetter.toUpperCase();
            gator.weaponName = equipmentList[index].name;

            // G
            gator.finalToHit = gator.gunnerySkill;

            // A
            if( mech.currentMovementMode === "w") {
                gator.finalToHit += 1;
                gator.attackerMovementModifier = 1;
                gator.rangeExplanation = "Walked";
            } else if( mech.currentMovementMode === "r") {
                gator.finalToHit += 2;
                gator.attackerMovementModifier = 2;
                gator.rangeExplanation = "Ran";
            } else if( mech.currentMovementMode === "j") {

                gator.finalToHit += 3;
                gator.attackerMovementModifier = 3;
                gator.rangeExplanation = "Jumped";
            } else {
                gator.rangeExplanation = "Stationary";
            }


            // T
            gator.finalToHit += target.movement;
            gator.targetMovementModifier = target.movement;

            // O
            let otherModifiersExplanation: string[] = [];
            gator.finalToHit += target.otherMods;
            gator.otherModifiers = target.otherMods;
            if( target.otherMods ) {
                otherModifiersExplanation.push( "Target Other Modifiers");
            }
            if(
                typeof( equipmentList[index].accuracyModifier ) !== "undefined"
                &&
                equipmentList[index].accuracyModifier !== 0
            ) {
                //@ts-ignore
                gator.finalToHit += equipmentList[index].accuracyModifier;
                //@ts-ignore
                gator.otherModifiers = equipmentList[index].accuracyModifier;

                otherModifiersExplanation.push( "Weapon Accuracy Modifier" );
            }
            gator.otherModifiersExplanation = otherModifiersExplanation.join(", ")

            // R
            if(
                target.range <= equipmentList[index].range.short
            ) {

                gator.rangeExplanation = "Short";

                // Check minimum range
                if(
                    equipmentList[index].range.min
                    &&
                    //@ts-ignore
                    equipmentList[index].range.min > 0
                ) {
                    let minRange: number = 0;
                    //@ts-ignore
                    minRange = equipmentList[index].range.min;

                    if( target.range < minRange ) {
                        let rangeModifier = minRange - target.range;
                        gator.finalToHit += rangeModifier;
                        gator.rangeModifier = rangeModifier;
                        gator.rangeExplanation = "Minimum Range";
                    }

                }
            } else if(
                target.range <= equipmentList[index].range.medium
            ) {
                gator.finalToHit += 2;
                gator.rangeModifier = 2;
                gator.rangeExplanation = "Medium";
            } else if( target.range <=equipmentList[index].range.long ) {
                gator.finalToHit += 4;
                gator.rangeModifier = 4;
                gator.rangeExplanation = "Long";
            } else {
                // Out of range
                gator.finalToHit = -1;
                gator.explanation = "The target is out of this weapon's range."
            }


        }

    }

    if( gator.finalToHit > 12 ) {
        gator.explanation = "Any roll over 12 is an impossible shot."
    } else if( gator.finalToHit >= 2 ) {
        let percentageToHit = 0;
        if( gator.finalToHit === 2 ) {
            percentageToHit = 100
        } else if( gator.finalToHit === 3 ) {
            percentageToHit = 97.22
        } else if( gator.finalToHit === 4 ) {
            percentageToHit = 91.66
        } else if( gator.finalToHit === 5 ) {
            percentageToHit = 83.33
        } else if( gator.finalToHit === 6 ) {
            percentageToHit = 72.22
        } else if( gator.finalToHit === 7 ) {
            percentageToHit = 58.33
        } else if( gator.finalToHit === 8 ) {
            percentageToHit = 31.66
        } else if( gator.finalToHit === 9 ) {
            percentageToHit = 27.77
        } else if( gator.finalToHit === 10 ) {
            percentageToHit = 16.66
        } else if( gator.finalToHit === 11 ) {
            percentageToHit = 8.33
        } else if( gator.finalToHit === 12 ) {
            percentageToHit = 2.77
        }

        gator.explanation = "This roll has a " + percentageToHit.toString() + "% chance of success"
    }

    return gator;
}