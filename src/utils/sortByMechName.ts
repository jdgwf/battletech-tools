import { BattleMech } from "../classes/battlemech";

export function sortByMechName(
    a: BattleMech,
    b: BattleMech,
): number {
    let aName = a.getName().toLowerCase().trim();
    let bName = b.getName().toLowerCase().trim();

    if( aName > bName ) {
        return 1
    } else if( aName < bName ) {
        return -1
    } else {
        return 0;
    }
}