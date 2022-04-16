export function getSSWRulesLevelLabel(
    num: number,
): string {

    if( num === - 1 ) {
        return "All"
    }
    if( num === 0 ) {
        return "Intro"
    }
    if( num === 1 ) {
        return "Standard"
    }
    if( num === 2 ) {
        return "Experimental"
    }

    return "n/a";
}