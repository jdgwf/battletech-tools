import { IASForceExport } from "./classes/alpha-strike-force";
import { IASGroupExport } from "./classes/alpha-strike-group";
import { IBattleMechExport } from "./classes/battlemech";
import { ISettingsExport } from "./ui/classes/app_settings";

export enum ESaveDataMode {
    localStorage = 0,
}

export interface IFullBackup {
    battleMechSaves: IBattleMechExport[];
}

export function getFullBackup(): string {
    let battleMechSaves = getBattleMechSaves();
    let rv: IFullBackup  = {
        battleMechSaves: battleMechSaves,
    }


    return JSON.stringify( rv );
}


function saveData(
    keyName: string,
    data: string,
): void {
    localStorage.setItem(keyName, data);
}

function getData(
    keyName: string,
): string | null {
    return localStorage.getItem(keyName);
}

export function saveBattleMechSaves(
    nv: IBattleMechExport[]
) {
    saveData("battleMechSaves", JSON.stringify(nv) );
}

export function getBattleMechSaves(): IBattleMechExport[] {
    let rv: IBattleMechExport[] = [];

    let rawData = getData("battleMechSaves" );
    try {
        if( rawData )
            rv = JSON.parse( rawData );

        if(!rv ) {
            rv = [];
        }
    }
    catch {
        rv = [];
    }

    return rv;
}


export function saveCurrentASForce(
    nv: IBattleMechExport[]
) {
    saveData("currentASForce", JSON.stringify(nv) );
}

export function getCurrentASForce(): IASForceExport | null {
    let rv: IASForceExport | null = null;

    let rawData = getData("currentASForce" );
    try {
        if( rawData )
            rv = JSON.parse( rawData );

        if(!rv ) {
            return rv;
        }
    }
    catch {
        return rv;
    }

    return rv;
}


export function saveCurrentBattleMech(
    nv: string,
) {
    saveData("currentBattleMech", nv );
}

export function getCurrentBattleMech(): string | null {

    return  getData("currentBattleMech" );

}


export function saveFavoriteASGroups(
    nv: IASGroupExport[]
) {
    saveData("favoriteASGroups", JSON.stringify(nv) );
}

export function getFavoriteASGroups(): IASGroupExport[] {
    let rv: IASGroupExport[] = [];

    let rawData = getData("favoriteASGroups" );
    try {
        if( rawData )
            rv = JSON.parse( rawData );

        if(!rv ) {
            rv = [];
        }
    }
    catch {
        rv = [];
    }

    return rv;
}


export function saveAppSettings(
    nv: ISettingsExport,
) {
    // console.log("settingsData", nv )
    saveData("appSettings", JSON.stringify(nv) );
}

export function getAppSettings(): ISettingsExport | null {
    let rv: ISettingsExport | null = null;
    let rawData = getData("appSettings" );
    // console.log("getAppSettings", rawData);
    try {
        if( rawData )
            rv = JSON.parse( rawData );

        if(!rv ) {
            return rv;
        }
    }
    catch {
        return rv;
    }

    return rv;
}