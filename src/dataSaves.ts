import AlphaStrikeForce, { IASForceExport } from "./classes/alpha-strike-force";
import AlphaStrikeGroup, { IASGroupExport } from "./classes/alpha-strike-group";
import { BattleMech, IBattleMechExport } from "./classes/battlemech";
import { IAppGlobals } from "./ui/app-router";
import { AppSettings, IAppSettingsExport } from "./ui/classes/app_settings";

export enum ESaveDataMode {
    localStorage = 0,
}

export interface IFullBackup {
    battleMechSaves: IBattleMechExport[];
    appSettings: IAppSettingsExport;
    favoriteASGroups: IASGroupExport[];
    currentASForce: IASForceExport | null;
    currentVBattleMech: string | null;
}

export function getFullBackup(): string {
    let rv: IFullBackup  = {
        battleMechSaves: getBattleMechSaves(),
        appSettings: getAppSettings(),
        favoriteASGroups: getFavoriteASGroups(),
        currentASForce: getCurrentASForce(),
        currentVBattleMech: getCurrentBattleMech(),
    }

    return JSON.stringify( rv );
}

export interface IRestoreMessage {
    severity: string;
    message: string;
}

export function checkFullRestoreData(
    io: IFullBackup
): boolean {
    if( typeof(io.battleMechSaves) !== "object" ) {
        return false;
    }
    if( typeof(io.appSettings) !== "object" ) {
        return false;
    }
    // if( typeof(io.currentASForce) !== "object" ) {
    //     return false;
    // }
    if( typeof(io.favoriteASGroups) !== "object" ) {
        return false;
    }
    // if( typeof(io.currentVBattleMech) !== "object" ) {
    //     return false;
    // }


    return true;
}



export function restoreFullBackup(
    io: IFullBackup,
    appGlobals: IAppGlobals,
    overWriteCurrentBattlemech: boolean = false,
    overWriteCurrentASGroup: boolean = false,
    performActions: boolean = false,
): IRestoreMessage[] {

    let restoreMessages: IRestoreMessage[] = [];

    restoreMessages.push({
        severity: "replace",
        message: "Overwrite your Settings",
    })

    for( let item of io.favoriteASGroups ) {
        let foundItem: IASGroupExport | null = null;
        let itemName = "(nameless)";
        if( item.name ) {
            itemName = item.name;
        }
        for( let existingItem of appGlobals.favoriteASGroups ) {
            let existingItemExport = existingItem.export();
            if( existingItem.uuid === item.uuid ) {
                foundItem = existingItemExport;

                let existingName = "(nameless)";
                if( existingItemExport.name ) {
                    existingName = existingItemExport.name;
                }
                restoreMessages.push({
                    severity: "replace",
                    message: "Replace Alpha Strike Favorite Group '" + existingName + "' with '" + itemName + "'",
                })
                if( performActions ) {

                    existingItem.import( item );
                }
            }
        }

        if( !foundItem ) {
            restoreMessages.push({
                severity: "add",
                message: "Add To your Alpha Strike Favorite groups: '" + itemName + "'",
            })
            if( performActions ) {
                appGlobals.favoriteASGroups.push( new AlphaStrikeGroup(item) );
            }
        }
    }


    for( let item of io.battleMechSaves ) {
        let foundItem: IBattleMechExport | null = null;
        let itemName = "(nameless)";
        if( item.name ) {
            itemName = item.name;
        }
        for( let existingItem of appGlobals.battleMechSaves ) {

            if( existingItem.uuid === item.uuid ) {
                foundItem = existingItem;

                let existingName = "(nameless)";
                if( existingItem.name ) {
                    existingName = existingItem.name;
                }
                restoreMessages.push({
                    severity: "replace",
                    message: "Replace Saved BattleMech '" + existingName + "' with '" + itemName + "'",
                })
                if( performActions ) {
                    existingItem = item;
                }
            }
        }

        if( !foundItem ) {
            restoreMessages.push({
                severity: "add",
                message: "Add to your Saved BattleMech: '" + itemName + "'",
            })
            if( performActions ) {
                appGlobals.battleMechSaves.push( item )
            }
        }
    }

    if( overWriteCurrentBattlemech && performActions ) {
        if( io.currentVBattleMech ) {
            let bmObj = new BattleMech();
            bmObj.importJSON(io.currentVBattleMech);
            appGlobals.currentBattleMech = bmObj;
        }
    }

    if( overWriteCurrentASGroup && performActions ) {
        appGlobals.currentASForce = new AlphaStrikeForce(io.currentASForce);
    }

    if( performActions ) {
        appGlobals.saveCurrentBattleMech( appGlobals.currentBattleMech );
        appGlobals.saveCurrentASForce( appGlobals.currentASForce );
        appGlobals.saveBattleMechSaves( appGlobals.battleMechSaves );
        appGlobals.saveFavoriteASGroups( appGlobals.favoriteASGroups );
        let appSettingsObj = new AppSettings(io.appSettings);
        appGlobals.saveAppSettings( appSettingsObj );
    }

    return restoreMessages;
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
    nv: IAppSettingsExport,
) {
    saveData("appSettings", JSON.stringify(nv) );
}

export function getAppSettings(): IAppSettingsExport {
    let rv: IAppSettingsExport = (new AppSettings(null)).export()
    let rawData = getData("appSettings" );

    try {
        if( rawData )
            rv = JSON.parse( rawData );

        if(rv ) {
            return rv;
        }
    }
    catch {
        return rv;
    }

    return rv;
}