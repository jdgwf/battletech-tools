export function getSSWRulesLevelLabel(
    num: number,
): string {

    if( num === - 1 ) {
        return "All"
    }
    if( num === 0 ) {
        return "Introductory"
    }
    if( num === 1 ) {
        return "Tournament Legal (Standard)"
    }
    if( num === 2 ) {
        return "Advanced"
    }
    if( num === 3 ) {
        return "Experimental"
    }
    if( num === 4 ) {
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