import { IEquipmentItem } from "../data/data-interfaces";

export function weaponNeedsAmmo(
    attack: IEquipmentItem,
): boolean {

    if( attack.isAmmo ) {
        return false;
    }
    if( attack.isEquipment ) {
        return false;
    }

    if( attack.category.toLowerCase().trim() === "ballistic weapons") {
        return true;
    }
    if( attack.category.toLowerCase().trim() === "missile weapons") {
        return true;
    }
    if( attack.needsAmmo ) {
        return true;
    }

    return false;
}