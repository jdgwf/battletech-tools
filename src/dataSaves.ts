import AlphaStrikeForce, { IASForceExport } from "./classes/alpha-strike-force";
import AlphaStrikeGroup, { IASGroupExport } from "./classes/alpha-strike-group";
import { BattleMech, IBattleMechExport } from "./classes/battlemech";
import { BattleMechForce, ICBTForceExport } from "./classes/battlemech-force";
import { BattleMechGroup, ICBTGroupExport } from "./classes/battlemech-group";
import { IAppGlobals } from "./ui/app-router";
import { AppSettings, IAppSettingsExport } from "./ui/classes/app_settings";
// import {Storage} from 'session-storage-sync';

export enum ESaveDataMode {
    localStorage = 0,
    firebase = 1,
}

export function getSaveDataModes(): number[] {
    return [0,1];
}

export function getSaveDataModeName( id: ESaveDataMode ): string {

    if( id === ESaveDataMode.localStorage ) return "localStorage";
    if( id === ESaveDataMode.firebase) return "Firebase";

    return "n/a";
}

export interface IFullBackup {
    battleMechSaves: IBattleMechExport[];
    // appSettings: IAppSettingsExport;
    favoriteASGroups: IASGroupExport[];
    currentASForce: IASForceExport | null;

    favoriteCBTGroups: ICBTGroupExport[];
    currentCBTForce: ICBTForceExport | null;

    currentVBattleMech: string | null;
}

export async function getFullBackup(
    appSettings: AppSettings,
): Promise<string> {
    let rv: IFullBackup  = {
        battleMechSaves: await getBattleMechSaves(appSettings),
        // appSettings: getAppSettings(),
        favoriteASGroups: await getFavoriteASGroups(appSettings),
        currentASForce: await getCurrentASForce(appSettings),
        favoriteCBTGroups: await getFavoriteCBTGroups(appSettings),
        currentCBTForce: await getCurrentCBTForce(appSettings),
        currentVBattleMech: await getCurrentBattleMech(appSettings),
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
    // if( typeof(io.appSettings) !== "object" ) {
    //     return false;
    // }
    // if( typeof(io.currentASForce) !== "object" ) {
    //     return false;
    // }
    if( typeof(io.favoriteASGroups) !== "object" ) {
        return false;
    }
    // if( typeof(io.favoriteCBTGroups) !== "object" ) {
    //     return false;
    // }
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
    overWriteCurrentCBTGroup: boolean = false,
    performActions: boolean = false,
): IRestoreMessage[] {

    let restoreMessages: IRestoreMessage[] = [];

    restoreMessages.push({
        severity: "replace",
        message: "Overwrite your Settings",
    })

    if( io.favoriteASGroups ) {
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
    }

    if( io.favoriteCBTGroups ) {
        for( let item of io.favoriteCBTGroups ) {
            let foundItem: ICBTGroupExport | null = null;
            let itemName = "(nameless)";
            if( item.name ) {
                itemName = item.name;
            }
            for( let existingItem of appGlobals.favoriteCBTGroups ) {
                let existingItemExport = existingItem.export();
                if( existingItem.uuid === item.uuid ) {
                    foundItem = existingItemExport;

                    let existingName = "(nameless)";
                    if( existingItemExport.name ) {
                        existingName = existingItemExport.name;
                    }
                    restoreMessages.push({
                        severity: "replace",
                        message: "Replace Classic BattleTech Favorite Group '" + existingName + "' with '" + itemName + "'",
                    })
                    if( performActions ) {

                        existingItem.import( item );
                    }
                }
            }

            if( !foundItem ) {
                restoreMessages.push({
                    severity: "add",
                    message: "Add To your Classic BattleTech Favorite groups: '" + itemName + "'",
                })
                if( performActions ) {
                    appGlobals.favoriteCBTGroups.push( new BattleMechGroup(item) );
                }
            }
        }
    }

    if( io.battleMechSaves ) {
        for( let item of io.battleMechSaves ) {
            let foundItem: IBattleMechExport | null = null;
            let itemName = "(nameless)";
            if( item.name ) {
                itemName = item.name;
            }
            for( let existingItemIndex in appGlobals.battleMechSaves ) {

                if( appGlobals.battleMechSaves[existingItemIndex].uuid === item.uuid ) {
                    foundItem = appGlobals.battleMechSaves[existingItemIndex];

                    let existingName = "(nameless)";

                    if( appGlobals.battleMechSaves[existingItemIndex].name ) {
                        existingName = appGlobals.battleMechSaves[existingItemIndex].name;
                    }

                    restoreMessages.push({
                        severity: "replace",
                        message: "Replace Saved BattleMech '" + existingName + "' with '" + itemName + "'",
                    });

                    if( performActions ) {
                        appGlobals.battleMechSaves[existingItemIndex] = item;
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

    if( overWriteCurrentCBTGroup && performActions && io.currentCBTForce) {
        appGlobals.currentCBTForce = new BattleMechForce(io.currentCBTForce);
    }

    if( performActions ) {
        appGlobals.saveCurrentBattleMech( appGlobals.currentBattleMech );
        appGlobals.saveCurrentASForce( appGlobals.currentASForce );
        if( appGlobals.currentCBTForce )
            appGlobals.saveCurrentCBTForce( appGlobals.currentCBTForce );
        appGlobals.saveBattleMechSaves( appGlobals.battleMechSaves );
        // let appSettingsObj = new AppSettings(io.appSettings);
        // appGlobals.saveAppSettings( appSettingsObj );
    }

    return restoreMessages;
}

async function saveData(
    appSettings: AppSettings,
    keyName: string,
    data: string,
): Promise<void> {
    switch( appSettings.storageLocation ) {
        case ESaveDataMode.localStorage: {
            localStorage.setItem(keyName, data);
            break;
        }
        case ESaveDataMode.firebase: {
            // localStorage.setItem(keyName, data);
            break;
        }
        default: {
            console.error("Unknown Save Storage", appSettings.storageLocation)
            break;
        }
    }

}

async function getData(
    appSettings: AppSettings,
    keyName: string,
): Promise<string | null> {
    switch( appSettings.storageLocation ) {
        case ESaveDataMode.localStorage: {

            return localStorage.getItem( keyName );;
        }
        case ESaveDataMode.firebase: {
            return null;
        }
        default: {
            console.error("Unknown Save Storage", appSettings.storageLocation)
            return null;
        }
    }
}

export function saveBattleMechSaves(
    appSettings: AppSettings,
    newValue: IBattleMechExport[]
) {
    saveData(appSettings, "battleMechSaves", JSON.stringify(newValue) );
}

export async function getBattleMechSaves(
    appSettings: AppSettings,
): Promise<IBattleMechExport[]> {
    let rv: IBattleMechExport[] = [];

    let rawData = await getData(appSettings, "battleMechSaves" );
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

export function saveCurrentCBTForce(
    appSettings: AppSettings,
    newValue: ICBTForceExport,
) {
    saveData(appSettings, "currentCBTForce", JSON.stringify(newValue) );
}

export function saveCurrentASForce(
    appSettings: AppSettings,
    newValue: IASForceExport,
) {
    saveData(appSettings, "currentASForce", JSON.stringify(newValue) );
}

export async function getCurrentCBTForce(
    appSettings: AppSettings,
): Promise<ICBTForceExport | null> {
    let rv: ICBTForceExport | null = null;

    let rawData = await getData(appSettings, "currentCBTForce" );
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

export async function getCurrentASForce(
    appSettings: AppSettings,
): Promise<IASForceExport | null> {
    let rv: IASForceExport | null = null;

    let rawData = await getData(appSettings, "currentASForce" );
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
    appSettings: AppSettings,
    newValue: string,
) {
    saveData(appSettings, "currentBattleMech", newValue );
}

export async function getCurrentBattleMech(
    appSettings: AppSettings,
): Promise<string | null> {

    return await getData(
        appSettings,
        "currentBattleMech"
    );

}

export function saveFavoriteASGroups(
    appSettings: AppSettings,
    newValue: IASGroupExport[]
) {
    saveData(appSettings, "favoriteASGroups", JSON.stringify(newValue) );
}

export function saveFavoriteASGroupsObjects(
    appSettings: AppSettings,
    newValue: AlphaStrikeGroup[]
) {
    let rv: IASGroupExport[] = [];
    for( let unit of newValue ) {
        rv.push( unit.export() );
    }
    saveData(appSettings, "favoriteASGroups", JSON.stringify(rv) );
}

export async function getFavoriteASGroups(
    appSettings: AppSettings,
): Promise<IASGroupExport[]> {
    let rv: IASGroupExport[] = [];

    let rawData = await getData(appSettings, "favoriteASGroups" );
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

export function saveFavoriteCBTGroupsObjects(
    appSettings: AppSettings,
    newValue: BattleMechGroup[]
) {
    let rv: ICBTGroupExport[] = [];
    for( let unit of newValue ) {
        rv.push( unit.export() );
    }
    saveData(appSettings, "favoriteCBTGroups", JSON.stringify(rv) );
}

export async function getFavoriteCBTGroups(
    appSettings: AppSettings,
): Promise<ICBTGroupExport[]> {
    let rv: ICBTGroupExport[] = [];

    let rawData = await getData(appSettings, "favoriteCBTGroups" );
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
    newValue: IAppSettingsExport,
) {
    localStorage.setItem("appSettings", JSON.stringify(newValue) );
}

export function getAppSettings(): IAppSettingsExport {
    let rv: IAppSettingsExport = (new AppSettings(null)).export()
    let rawData = localStorage.getItem("appSettings" );

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