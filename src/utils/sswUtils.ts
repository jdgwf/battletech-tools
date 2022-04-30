export function getSSWRulesLevelLabel(
    num: number,
    short: boolean = false,
): string {

    if( num === - 1 ) {
        return "All"
    }
    if( num === 0 ) {
        if( short )
        return "Intro"
        else
        return "Introductory"
    }
    if( num === 1 ) {
        if( short )
        return "Std"
        else
        return "Tournament Legal (Standard)"
    }
    if( num === 2 ) {
        if( short )
        return "Adv"
        else
        return "Advanced"
    }
    if( num === 3 ) {
        if( short )
        return "Ex["
        else
        return "Experimental"
    }
    if( num === 4 ) {
        if( short )
        return "Era"
        else
        return "Era Specific"
    }

    return "n/a";
}


export function isSSWRulesLevel(
    num: number,
    label: string,
): boolean {

    label = label.trim().toLowerCase();

    if( num === -1 && getSSWRulesLevelLabel(-1).toLowerCase().trim() === label ) {
        return true
    }
    if( num === 0 && getSSWRulesLevelLabel(0).toLowerCase().trim() === label ) {
        return true;
    }
    if( num === 1 && getSSWRulesLevelLabel(1).toLowerCase().trim().indexOf(label) > -1 ) {
        return true;
    }
    if( num === 2 && getSSWRulesLevelLabel(2).toLowerCase().trim() === label ) {
        return true;
    }
    if( num === 3 && getSSWRulesLevelLabel(3).toLowerCase().trim() === label ) {
        return true
    }
    if( num === 4 && getSSWRulesLevelLabel(4).toLowerCase().trim() === label ) {
        return true;
    }

    return false;
}