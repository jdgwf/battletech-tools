export function getMULEraLabel(
    id: number,
): string {

    if( id === 10 ) {
        return "Star League";
    } else if( id === 11 ) {
        return "Early Succession War";
    } else  if( id === 255 ) {
        return "Late Succession War - LosTech";
    } else if( id === 256 ) {
        return "Late Succession War - renaissance";
    } else if( id === 13 ) {
        return "Clan Invasion";
    } else if( id === 247 ) {
        return "Civil War";
    } else if( id === 14 ) {
        return "Jihad";
    } else if( id === 15 ) {
        return "Early Republic";
    } else if( id === 254 ) {
        return "Late Republic";
    } else if( id === 16 ) {
        return "Dark Ages";
    } else if( id === 257 ) {
        return "ilClan";
    }
    return "n/a";
}

export function getMULEraIDs(): number[] {
    return [10, 11, 255, 256, 13, 247, 14, 15, 254, 16, 257]
}