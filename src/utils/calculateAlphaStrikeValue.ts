import { IAlphaStrikeDamage } from "../classes/alpha-strike-unit";

export interface IAlphaStrikeExport {
    mechCreatorUUID: string;
    name: string;
    move: number;
    type: string;
    customName: string;
    role: string;
    jumpMove: number;
    pv: number;
    damage: IAlphaStrikeDamage;
    armor: number;
    structure: number;
    size: number;
    skill: number;
    overheat: number;
    notes: string;
    tmm: number;
    sizeClass: number;
    sizeClassName: string;
    ov: number;
    specialUnitAbilities: string[],
    longHeat: number;
    longOverheat: number;
    abilityCodes: string[],
}

export interface IAlphaStrikeCalculationResult {
    calcLogs: string;
    finalValue: number;
    alphaStrikeForceStats: IAlphaStrikeExport;
}

export function calculateAlphaStrikeValue(
    _alphaStrikeForceStats: IAlphaStrikeExport,
    rearDamage: IAlphaStrikeDamage,
    heatDamage: IAlphaStrikeDamage,
    lrmDamage: IAlphaStrikeDamage,
    flakDamage: IAlphaStrikeDamage,
    acDamage: IAlphaStrikeDamage,
    srmDamage: IAlphaStrikeDamage,
    mslDamage: IAlphaStrikeDamage,
    indirectFireRating: number,
): IAlphaStrikeCalculationResult {

        let _calcLogAS = "";

        /* *********************************
         *
         * Alpha Strike Point Value ASC - p138
         *
         * ******************************** */

        _alphaStrikeForceStats.pv = 0;
        _calcLogAS += "<div class=\"text-center\"><strong> - Calculating Point Value - </strong></div>\n";
        /* *********************************
         * Step 1: Determine Unit’s Offensive Value ASC - p138
         * ******************************** */

        _calcLogAS += "<strong>Step 1: Determine Unit’s Offensive Value ASC - p138</strong><br />\n";
        let offensive_value = 0;
        // Attack Damage Factor
        if( _alphaStrikeForceStats.damage.short.toString() !== "0*" && _alphaStrikeForceStats.damage.short.toString() !== "-" )
            offensive_value += +_alphaStrikeForceStats.damage.short;
        if( _alphaStrikeForceStats.damage.medium.toString() !== "0*" && _alphaStrikeForceStats.damage.medium.toString() !== "-" )
            offensive_value += +_alphaStrikeForceStats.damage.medium;
        if( _alphaStrikeForceStats.damage.medium.toString() !== "0*" && _alphaStrikeForceStats.damage.medium.toString() !== "-" )
            offensive_value += +_alphaStrikeForceStats.damage.medium;
        if( _alphaStrikeForceStats.damage.long.toString() !== "0*" && _alphaStrikeForceStats.damage.long.toString() !== "-" )
            offensive_value += +_alphaStrikeForceStats.damage.long;
        // if( _alphaStrikeForceStats.damage.extreme.toString() !== "0*" && _alphaStrikeForceStats.damage.extreme.toString() !== "-" )
        //     offensive_value += +_alphaStrikeForceStats.damage.extreme;

        _calcLogAS += "Attack Damage Factor: "
        + offensive_value + " ( "
        + _alphaStrikeForceStats.damage.short + " + "
        + _alphaStrikeForceStats.damage.medium + " + "
         + _alphaStrikeForceStats.damage.long + " + "
         + _alphaStrikeForceStats.damage.medium // + " + "
        // + _alphaStrikeForceStats.damage.extreme
        + " )<br />\n";

        // Unit Size Factor
        if(
            _alphaStrikeForceStats.type.toLowerCase().trim() === "bm"
            ||
            _alphaStrikeForceStats.type.toLowerCase().trim() === "pm"

        )  {
            offensive_value += _alphaStrikeForceStats.sizeClass / 2;
            _calcLogAS += "Unit Size Factor: " + (_alphaStrikeForceStats.sizeClass / 2) + " ( " + _alphaStrikeForceStats.sizeClass + " / 2)<br />\n";
        }

        // Overheat Factor
        let overHeatFactor = 0;
        if( _alphaStrikeForceStats.ov > 1) {
            offensive_value += 1;
            offensive_value += (_alphaStrikeForceStats.ov - 1) / 2;
            overHeatFactor += 1;
            overHeatFactor += (_alphaStrikeForceStats.ov - 1) / 2;
        } else {
            offensive_value += _alphaStrikeForceStats.ov;
            overHeatFactor += _alphaStrikeForceStats.ov;

        }

        _calcLogAS += "Overheat Factor: " + overHeatFactor + "<br />\n";

        /* *********************************
         * Step 1a: Apply Blanket Offensive Modifiers ASC - p139
         * ******************************** */
        _calcLogAS += "<strong>Step 1a: Apply Blanket Offensive Modifiers ASC - p139</strong><br />\n";
        // TODO

        /* *********************************
         * Step 2: Determine Unit’s Defensive Value ASC - p139
         * ******************************** */
        _calcLogAS += "<strong>Step 2: Determine Unit’s Defensive Value ASC - p139</strong><br />\n";
        // let movementFactor = 0;

        // Movement Factor:
        let movementDefenseValue = 0;
        let bestMovement = 0;
        if( _alphaStrikeForceStats.move > _alphaStrikeForceStats.jumpMove) {
            movementDefenseValue += _alphaStrikeForceStats.move * .25;
            bestMovement = _alphaStrikeForceStats.move;
        } else {
            movementDefenseValue += _alphaStrikeForceStats.jumpMove * .25;
            bestMovement = _alphaStrikeForceStats.move;
        }
        // movementFactor += movementDefenseValue;

        if( _alphaStrikeForceStats.jumpMove > 0) {
            movementDefenseValue += .5;
            _calcLogAS += "Movement Factor: " + movementDefenseValue + " ( " + bestMovement + " * .25 + .5)<br />\n";
        } else {
            _calcLogAS += "Movement Factor: " + movementDefenseValue + " ( " + bestMovement + " * .25)<br />\n";
        }

        if (
            +rearDamage.short > 0 ||
            +rearDamage.medium > 0 ||
            +rearDamage.long > 0
        ) {
            _alphaStrikeForceStats.abilityCodes.push( "Rear" );
        }

        let highestDamage = 0;

        for (let aC = 0; aC < _alphaStrikeForceStats.abilityCodes.length; aC++) {

            // Replace Heat with Heat X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "heat" ) {
                heatDamage = adjustAlphaStrikeDamage(heatDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "Heat " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long;
                highestDamage = getHighestDamage(heatDamage);
                offensive_value += highestDamage;
                if (heatDamage.medium.toString() !== "-" && +heatDamage.medium > 0)
                    offensive_value += .5;

                _calcLogAS += "<strong>Adding</strong> Heat Ability: " + heatDamage.short + "/" + heatDamage.medium + "/" + heatDamage.long + "<br />\n";
                _calcLogAS += "Adding Heat Damage Factor to PV: " + highestDamage + "<br />\n";
                if (heatDamage.medium.toString() !== "-" && +heatDamage.medium > 0)
                    _calcLogAS += "Adding Heat Medium Damage Bonus to PV: 0,5<br />\n";
            }

            // Replace LRM with LRM X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "lrm" ) {
                lrmDamage = adjustAlphaStrikeDamage(lrmDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "LRM " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long;
                _calcLogAS += "<strong>Adding</strong> LRM Ability: " + lrmDamage.short + "/" + lrmDamage.medium + "/" + lrmDamage.long + "<br />\n";

            }

            // Replace Flak with Flak X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "flak" ) {
                flakDamage = adjustAlphaStrikeDamage(flakDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "Flak " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long;
                _calcLogAS += "<strong>Adding</strong> Flak Ability: " + flakDamage.short + "/" + flakDamage.medium + "/" + flakDamage.long + "<br />\n";
            }

            // Replace AC with AC X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "ac" ) {
                acDamage = adjustAlphaStrikeDamage(acDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "AC " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long;
                _calcLogAS += "<strong>Adding</strong> AC Ability: " + acDamage.short + "/" + acDamage.medium + "/" + acDamage.long + "<br />\n";
            }

            // Replace SRM with SRM X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "srm" ) {
                srmDamage = adjustAlphaStrikeDamage(srmDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "SRM " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long;
                _calcLogAS += "<strong>Adding</strong> SRM Ability: " + srmDamage.short + "/" + srmDamage.medium + "/" + srmDamage.long + "<br />\n";
            }

            // Replace Missile with Missile X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "missile" || _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "msl" ) {
                mslDamage = adjustAlphaStrikeDamage(mslDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "MSL " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long;
                _calcLogAS += "<strong>Adding</strong> Missile Ability: " + mslDamage.short + "/" + mslDamage.medium + "/" + mslDamage.long + "<br />\n";
            }

            // Replace Rear with Rear X/X/X
            if( _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "rear" ) {
                rearDamage = adjustAlphaStrikeDamage(rearDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "Rear " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long;
                _calcLogAS += "<strong>Adding</strong> Rear Ability: " + rearDamage.short + "/" + rearDamage.medium + "/" + rearDamage.long + "<br />\n";
            }

            // Replace IndirectFire with IF X
            if(
                _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "indirect fire"
                ||
                _alphaStrikeForceStats.abilityCodes[aC].toLowerCase() === "if"
            ) {
                rearDamage = adjustAlphaStrikeDamage(rearDamage);
                _alphaStrikeForceStats.abilityCodes[aC] = "IF " + indirectFireRating;
                _calcLogAS += "<strong>Adding</strong> IF Ability: " + indirectFireRating + "<br />\n";
                offensive_value += indirectFireRating;
                _calcLogAS += "Adding IF Rating to PV: " + indirectFireRating + "<br />\n";

            }

        }

        // Defensive Special Abilities Factor
        // TODO

        // Defensive Interaction Rating
        // TODO

        /* *********************************
         * Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141
         * ******************************* */
        _calcLogAS += "<strong>Step 2a: Calculating Defensive Interaction Rating (DIR) ASC - p141</strong><br />\n";
        let bmDIR = 0;
        // Armor Factor
        if( _alphaStrikeForceStats.type.toLowerCase().trim() === "bm") {
            _calcLogAS += "Armor Factor: " + (_alphaStrikeForceStats.armor * 2) + " ( " + _alphaStrikeForceStats.armor + " * 2)<br />\n";
            bmDIR += _alphaStrikeForceStats.armor * 2;
        }
        // TODO other types of units

        // Structure Factor
        if( _alphaStrikeForceStats.type.toLowerCase().trim() === "bm") {
            _calcLogAS += "Structure Factor: " + (_alphaStrikeForceStats.structure * 1) + " ( " + _alphaStrikeForceStats.structure + " * 1)<br />\n";
            bmDIR += _alphaStrikeForceStats.structure * 1;
        }
        // TODO other types of units

        // Defense Factor
        let defensiveFactor = 0;
        if (bestMovement > 34) {
            _calcLogAS += "Base Defense Factor: +5 (movement 35\"+)<br />\n";
            defensiveFactor += 5;
        } else if (bestMovement > 18) {
            _calcLogAS += "Base Defense Factor: +4 (movement 19\"-34\")<br />\n";
            defensiveFactor += 4;
        } else if (bestMovement > 12) {
            _calcLogAS += "Base Defense Factor: +3 (movement 13\"-18\")<br />\n";
            defensiveFactor += 3;
        } else if (bestMovement > 8) {
            _calcLogAS += "Base Defense Factor: +2 (movement 9\"-12\")<br />\n";
            defensiveFactor += 2;
        } else if (bestMovement > 4) {
            _calcLogAS += "Base Defense Factor: +1 (movement 4\"-8\")<br />\n";
            defensiveFactor += 1;
        } else {
            _calcLogAS += "Base Defense Factor: +0 (movement 0\"-4\")<br />\n";
            defensiveFactor += 0;
        }


        if( defensiveFactor < 0 )
        defensiveFactor = 0;
        bmDIR += defensiveFactor;
        _calcLogAS += "Adding Defense Value from Step 2 above: " + (defensiveFactor) + "<br />\n";
        // Calculate the DIR
        _calcLogAS += "Total DIR: " + bmDIR + "<br />\n";

        /* *********************************
         * Step 3: Determine Unit’s Final Point Value ASC - p141
         * ******************************* */
        _calcLogAS += "<strong>Step 3: Determine Unit’s Final Point Value ASC - p141</strong><br />\n";
        let baseFinalValue = offensive_value + bmDIR + movementDefenseValue;
        _calcLogAS += "Base Point Value: " + baseFinalValue + " ( " + offensive_value + " + " + bmDIR + " + "  + movementDefenseValue + ")<br />\n";

        let finalValue = baseFinalValue;
        if (
            bestMovement >= 6 &&
            bestMovement <= 10 &&
            +_alphaStrikeForceStats.damage.medium === 0 &&
            +_alphaStrikeForceStats.damage.long === 0 &&
            +_alphaStrikeForceStats.damage.extreme === 0
        ) {
            _calcLogAS += "Unit has 6 to 10\" of Move, but only delivers damage at Short range. Point Value * .75<br />\n";
            _calcLogAS += "Modified Point Value: " + (baseFinalValue * .75) + " ( " + offensive_value + " + " + bmDIR + " )<br />\n";
            finalValue = baseFinalValue * .75;
        }

        if (
            bestMovement >= 2 &&
            bestMovement <= 5 &&
            +_alphaStrikeForceStats.damage.medium === 0 &&
            +_alphaStrikeForceStats.damage.long === 0 &&
            +_alphaStrikeForceStats.damage.extreme === 0
        ) {
            _calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short range. Point Value * .5<br />\n";
            _calcLogAS += "Modified Point Value: " + (baseFinalValue * .5) + " ( " + offensive_value + " + " + bmDIR + " )<br />\n";
            finalValue = baseFinalValue * .5;
        }

        if (
            bestMovement >= 2 &&
            bestMovement <= 5 &&
            +_alphaStrikeForceStats.damage.long === 0 &&
            +_alphaStrikeForceStats.damage.extreme === 0
        ) {
            _calcLogAS += "Unit has 2 to 5\" of Move, but only delivers damage at Short and Medium ranges. Point Value * .75<br />\n";
            _calcLogAS += "Modified Point Value: " + (baseFinalValue * .75) + " ( " + offensive_value + " + " + bmDIR + " )<br />\n";
            finalValue = baseFinalValue * .75;
        }

        _calcLogAS += "Final Point Value: " + finalValue + "<br />\n";

        /* *********************************
         * Step 3a: Add Force Bonuses ASC - p141
         * ******************************* */
        _calcLogAS += "<strong>Step 3a: Add Force Bonuses ASC - p141</strong><br />\n";
        // TODO
        _calcLogAS += "<strong class=\"color-red\">TODO<br />\n";

        return {
            calcLogs: _calcLogAS,
            finalValue: finalValue,
            alphaStrikeForceStats: _alphaStrikeForceStats,
        }
}


export function adjustAlphaStrikeDamage(
    incomingDamageObjects: IAlphaStrikeDamage,
    useZeros: boolean = false,
) {

    if( incomingDamageObjects.short.toString() === "0" ) {
        if( useZeros)
            incomingDamageObjects.short = 0;
        else
            incomingDamageObjects.short = 0;
    } else if( +incomingDamageObjects.short < .5) {
        incomingDamageObjects.shortMinimal = true;
        incomingDamageObjects.short= 0;
    } else {
        incomingDamageObjects.short = Math.round(+incomingDamageObjects.short);
    }

    if( incomingDamageObjects.medium.toString() === "0" ) {
        if( useZeros)
            incomingDamageObjects.medium = 0;
        else
            incomingDamageObjects.medium = 0;
    } else if( +incomingDamageObjects.medium < .5) {
        incomingDamageObjects.mediumMinimal = true;
        incomingDamageObjects.medium = 0;
    } else {
        incomingDamageObjects.medium = Math.round(+incomingDamageObjects.medium);
    }

    if( incomingDamageObjects.long.toString() === "0" ) {
        if( useZeros)
            incomingDamageObjects.long = 0;
        else
            incomingDamageObjects.long = 0;
    } else if( +incomingDamageObjects.long < .5) {
        incomingDamageObjects.long = 0;
        incomingDamageObjects.longMinimal = true;
    } else {
        incomingDamageObjects.long = Math.round(+incomingDamageObjects.long);
    }

    if( incomingDamageObjects.extreme.toString() === "0" ) {
        if( useZeros)
            incomingDamageObjects.extreme = 0;
        else
            incomingDamageObjects.extreme = 0;
    } else if( +incomingDamageObjects.extreme < .5) {
        incomingDamageObjects.extreme = 0;
        incomingDamageObjects.extremeMinimal= true;
    } else {
        incomingDamageObjects.extreme = Math.round(+incomingDamageObjects.extreme);
    }

    return incomingDamageObjects;
}


function getHighestDamage(incomingDamageObjects: IAlphaStrikeDamage): number {
    let returnValue = 0;

   if(
        incomingDamageObjects &&
        incomingDamageObjects.short.toString() !== "-" &&
        incomingDamageObjects.short.toString() !== "0*"
    ) {
        if( +incomingDamageObjects.short > returnValue) {
            returnValue = +incomingDamageObjects.short;
        }
    }
    if(
        incomingDamageObjects &&
        incomingDamageObjects.medium.toString() !== "-" &&
        incomingDamageObjects.medium.toString() !== "0*"
    ) {
        if( +incomingDamageObjects.medium > returnValue) {
            returnValue = +incomingDamageObjects.medium;
        }
    }
    if(
        incomingDamageObjects &&
        incomingDamageObjects.long.toString() !== "-" &&
        incomingDamageObjects.long.toString() !== "0*"
    ) {
        if( +incomingDamageObjects.long > returnValue) {
            returnValue = +incomingDamageObjects.long;
        }
    }

    if(
        incomingDamageObjects &&
        incomingDamageObjects.extreme.toString() !== "-" &&
        incomingDamageObjects.extreme.toString() !== "0*"
    ) {
        if( +incomingDamageObjects.extreme > returnValue) {
            returnValue = +incomingDamageObjects.extreme;
        }
    }

    return returnValue;
}
