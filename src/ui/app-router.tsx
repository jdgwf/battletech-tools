import React from "react";
import { Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AlphaStrikeForce, { IASForceExport } from "../classes/alpha-strike-force";
import AlphaStrikeGroup, { IASGroupExport } from "../classes/alpha-strike-group";
import { BattleMech, IBattleMechExport } from "../classes/battlemech";
import { BattleMechForce, ICBTForceExport } from "../classes/battlemech-force";
import { BattleMechGroup, ICBTGroupExport } from "../classes/battlemech-group";
import { CONFIGSiteTitle } from '../configVars';
import { getAppSettings, getBattleMechSaves, getCurrentASForce, getCurrentBattleMech, getCurrentCBTForce, getFavoriteASGroups, getFavoriteCBTGroups, saveAppSettings, saveBattleMechSaves, saveCurrentASForce, saveCurrentBattleMech, saveCurrentCBTForce, saveFavoriteASGroups, saveFavoriteASGroupsObjects, saveFavoriteCBTGroupsObjects } from "../dataSaves";
import { callAnalytics } from "../jdgAnalytics";
import { generateUUID } from "../utils/generateUUID";
import Alerts from './classes/alerts';
import { AppSettings } from "./classes/app_settings";
import SanitizedHTML from './components/sanitized-html';
import About from "./pages/about";
import AlphaStrikeRouter from "./pages/alpha-strike/_router";
import ClassicBattleTechRouter from "./pages/classic-battletech/_router";
import DevelopmentStatus from "./pages/development-status";
import EquipmentEditor from "./pages/equipment-editor";
import Error404 from "./pages/error404";
import Home from "./pages/home";
import SettingsRouter from "./pages/settings/_router";
let pjson = require('../../package.json');

export default class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {

    constructor(props: IAppRouterProps) {
        super(props);

        let settingsData = getAppSettings();

        let appSettings = new AppSettings( settingsData );

        // let uiTheme: string = "";
        // let lsTheme = getData("uiTheme");

        // Don't worry about tracking individual users here, this UUID resets on every page load or refresh and is NOT tied to a machine or browser...
        // this just helps me see the flow of traffic to help folks find what they need :)
        let sessionUUID = generateUUID();

        // console.log("settingsData", settingsData);
        if( settingsData && settingsData.uiTheme ) {

            document.body.className = settingsData.uiTheme;
        } else {
            document.body.className = '';
        }

        let appGlobals: IAppGlobals = {
            sessionUUID: sessionUUID,
            appSettings: appSettings,
            currentPageTitle: "",
            siteAlerts: new Alerts( this ),
            showMobile: false,
            confirmDialogMessage: "",
            confirmDialogTitle: "",
            confirmDialogYesLabel: "",
            confirmDialogNoLabel: "",
            showConfirmDialog: false,
            confirmDialogConfirm: null,
            makeDocumentTitle: this.makeDocumentTitle,
            openConfirmDialog: this.openConfirmDialog,
            refreshGlobalState: this.refreshGlobalState,
            toggleMobile: this.toggleMobile,
            closeMobile: this.closeMobile,

            saveAppSettings: this.saveAppSettings,

            favoriteASGroups: [],
            currentASForce: null,
            currentBattleMech: null,
            battleMechSaves: [],
            favoriteCBTGroups: [],
            currentCBTForce: null,

            saveCurrentASForce: this.saveCurrentASForce,
            saveFavoriteASGroups: this.saveFavoriteASGroups,
            saveASGroupFavorite: this.saveASGroupFavorite,
            removeASGroupFavorite: this.removeASGroupFavorite,

            saveCurrentCBTForce: this.saveCurrentCBTForce,
            saveFavoriteCBTGroups: this.saveFavoriteCBTGroups,
            saveCBTGroupFavorite: this.saveCBTGroupFavorite,
            removeCBTGroupFavorite: this.removeCBTGroupFavorite,

            saveCurrentBattleMech: this.saveCurrentBattleMech,

            saveBattleMechSaves: this.saveBattleMechSaves,
        }
        this.state = {
            updated: false,
            appGlobals: appGlobals,
        }

        window.addEventListener('offline', (event) => {
            this.setState({
                updated: true,
            })
        });
        window.addEventListener('online', (event) => {
            this.setState({
                updated: true,
            })
        });

        this.setData( appSettings, appGlobals );
    }

    setData = async (
        appSettings: AppSettings,
        appGlobals: IAppGlobals,
    ) => {

        let asImport: IASForceExport | null = await getCurrentASForce(appSettings);

        let alphaStrikeForce = new AlphaStrikeForce( asImport );

        let lsBMImport = await getCurrentBattleMech(appSettings);
        let currentBattleMech = new BattleMech();
        if( lsBMImport ) {
            currentBattleMech.importJSON( lsBMImport);
        }

        let battleMechSaves: IBattleMechExport[] = await getBattleMechSaves(appSettings);
        let asImportFavorites: IASGroupExport[] = await getFavoriteASGroups(appSettings);

        // Basic Data Integrity Checks
        let needsBMReSave = false;
        for( let item of battleMechSaves ) {
            if( !item.uuid ) {
                item.uuid = generateUUID();
                needsBMReSave = true;
            }
        }

        if( needsBMReSave ) {
            console.info("Some UUIDs not found in BattleMech saves, generating UUIDS and re-saving...")
            await saveBattleMechSaves( appSettings, battleMechSaves )
        }
        let needsASReSave = false;
        for( let item of asImportFavorites ) {
            if( !item.uuid ) {
                item.uuid = generateUUID();
                needsASReSave = true;
            }
        }
        if( needsASReSave ) {
            console.info("Some UUIDs not found in AlphaStrike Favorites saves, generating UUIDS and re-saving...")
            await saveFavoriteASGroups(appSettings,  asImportFavorites )
        }

        // End of Basic Data Integrity Checks

        let asImportedFavorites: AlphaStrikeGroup[] = [];

        if( asImportFavorites.length > 0 ) {
            if( asImportFavorites && asImportFavorites.length > 0 )  {
                for( let importItem of asImportFavorites ) {
                    asImportedFavorites.push( new AlphaStrikeGroup(importItem) );
                }
            }
        }

        let bmImportFavorites: ICBTGroupExport[] = await getFavoriteCBTGroups(appSettings);

        let bmImportedFavorites: BattleMechGroup[] = [];

        if( bmImportFavorites.length > 0 ) {
            if( bmImportFavorites && bmImportFavorites.length > 0 )  {
                for( let importItem of bmImportFavorites ) {
                    bmImportedFavorites.push( new BattleMechGroup(importItem) );
                }
            }
        }

        let bmfImport: ICBTForceExport | null = await getCurrentCBTForce(appSettings);

        let currentCBTForce = new BattleMechForce( bmfImport );

        appGlobals.favoriteASGroups = asImportedFavorites;
        appGlobals.currentASForce = alphaStrikeForce;
        appGlobals.currentBattleMech = currentBattleMech;
        appGlobals.battleMechSaves = battleMechSaves;

        appGlobals.favoriteCBTGroups = bmImportedFavorites;
        appGlobals.currentCBTForce = currentCBTForce;

        this.setState({
            appGlobals: appGlobals,
        })
    }

    saveBattleMechSaves = ( newValue: IBattleMechExport[] ): void => {

        let appGlobals = this.state.appGlobals;
        appGlobals.battleMechSaves = newValue;

        saveBattleMechSaves( appGlobals.appSettings, appGlobals.battleMechSaves )

        this.setState({
            appGlobals: appGlobals,
        });
    }

    saveAppSettings = ( appSettings: AppSettings ): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.appSettings = appSettings;

        if( appSettings.uiTheme.trim() ) {
            document.body.className = appSettings.uiTheme;
        } else {
            document.body.className = '';
        }

        saveAppSettings( appGlobals.appSettings.export() )

        this.setState({
            appGlobals: appGlobals,
            updated: true,
        });
    }

    saveCurrentBattleMech = ( mech: BattleMech ): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.currentBattleMech = mech;
        this.setState({
            appGlobals: appGlobals,
        });

        saveCurrentBattleMech( appGlobals.appSettings, mech.exportJSON() );
    }

    saveCurrentASForce = ( asForce: AlphaStrikeForce ): void => {

        let appGlobals = this.state.appGlobals;
        appGlobals.currentASForce = asForce;
        this.setState({
            appGlobals: appGlobals,
        });

        saveCurrentASForce( appGlobals.appSettings, asForce.export() );
    }

    saveASGroupFavorite = ( asGroup: AlphaStrikeGroup ): void => {
        let appGlobals = this.state.appGlobals;
        let asGroupThinned = new AlphaStrikeGroup( asGroup.export(true) ); // Don't Save in-play variables for Favorite Groups, this will save localStorage space
        appGlobals.favoriteASGroups.push( asGroupThinned );
        this.saveFavoriteASGroups( appGlobals.favoriteASGroups );

        saveFavoriteASGroupsObjects( appGlobals.appSettings, appGlobals.favoriteASGroups )
    }

    removeASGroupFavorite = ( asGroupIndex: number ): void => {
        let appGlobals = this.state.appGlobals;

        if( appGlobals.favoriteASGroups.length > asGroupIndex ) {
            appGlobals.favoriteASGroups.splice( asGroupIndex, 1 );
            this.saveFavoriteASGroups( appGlobals.favoriteASGroups );

            saveFavoriteASGroupsObjects( appGlobals.appSettings, appGlobals.favoriteASGroups )
        }

    }

    saveFavoriteASGroups = ( asGroups: AlphaStrikeGroup[] ): void => {
        let exportASGroups: IASGroupExport[] = [];
        for( let group of asGroups) {
            exportASGroups.push( group.export() );
        }
        // console.log("exportASGroups", exportASGroups)
        let appGlobals = this.state.appGlobals;
        appGlobals.favoriteASGroups = asGroups;
        this.setState({
            appGlobals: appGlobals,
        });
        saveFavoriteASGroupsObjects( appGlobals.appSettings, appGlobals.favoriteASGroups )
    }

    saveCurrentCBTForce = ( bmForce: BattleMechForce ): void => {

        let appGlobals = this.state.appGlobals;
        appGlobals.currentCBTForce = bmForce;

        this.setState({
            appGlobals: appGlobals,
        });

        saveCurrentCBTForce( appGlobals.appSettings, bmForce.export() );
        // saveFavoriteCBTGroupsObjects( appGlobals.appSettings, appGlobals.favoriteCBTGroups )
    }

    saveCBTGroupFavorite = ( bmGroup: BattleMechGroup ): void => {
        let appGlobals = this.state.appGlobals;
        let bmGroupThinned = new BattleMechGroup( bmGroup.export(true)); // Don't Save in-play variables for Favorite Groups, this will save localStorage space
        appGlobals.favoriteCBTGroups.push( bmGroupThinned );
        this.saveFavoriteCBTGroups( appGlobals.favoriteCBTGroups );
        saveFavoriteCBTGroupsObjects( appGlobals.appSettings, appGlobals.favoriteCBTGroups )
    }

    removeCBTGroupFavorite = ( asGroupIndex: number ): void => {
        let appGlobals = this.state.appGlobals;

        if( appGlobals.favoriteCBTGroups.length > asGroupIndex ) {
            appGlobals.favoriteCBTGroups.splice( asGroupIndex, 1 );
            this.saveFavoriteCBTGroups( appGlobals.favoriteCBTGroups );

            saveFavoriteCBTGroupsObjects( appGlobals.appSettings, appGlobals.favoriteCBTGroups )
        }

    }

    saveFavoriteCBTGroups = ( asGroups: BattleMechGroup[] ): void => {
        let exportCBTGroups: ICBTGroupExport[] = [];
        for( let group of asGroups) {
            exportCBTGroups.push( group.export() );
        }
        let appGlobals = this.state.appGlobals;
        appGlobals.favoriteCBTGroups = asGroups;
        this.setState({
            appGlobals: appGlobals,
        });
        saveFavoriteCBTGroupsObjects( appGlobals.appSettings, appGlobals.favoriteCBTGroups )
    }

    toggleMobile = (): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.showMobile = !appGlobals.showMobile;
        this.setState({
            appGlobals: appGlobals,
            updated: true,
        })
    }

    closeMobile = (): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.showMobile = false;
        this.setState({
            appGlobals: appGlobals,
            updated: true,
        })
    }

    makeDocumentTitle = ( subTitle: string = "" ): void => {
        let appGlobals = this.state.appGlobals;

        callAnalytics(
            window,
            appGlobals.sessionUUID,
            pjson.version,
        );

        if( subTitle ) {
            document.title = subTitle + " | " + CONFIGSiteTitle;
            appGlobals.currentPageTitle = subTitle;
            this.setState({
                appGlobals: appGlobals,
            })
        } else {
            document.title = CONFIGSiteTitle;
            appGlobals.currentPageTitle = subTitle;
            this.setState({
                appGlobals: appGlobals,
            })
        }
    }

    refreshGlobalState = (appGlobals: IAppGlobals | null = null): void => {
        if( !appGlobals ) {
            this.setState({
                updated: true,
            });
        } else {
            this.setState({
                updated: true,
                appGlobals: appGlobals,
            });
        }
    }

    closeConfirmDialog = (): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.showConfirmDialog = false;
        this.setState({
            appGlobals: appGlobals,
        })
    }

    confirmConfirmDialog = (): void => {
        if( this.state.appGlobals ) {
            if( this.state.appGlobals.confirmDialogConfirm ) {
                this.state.appGlobals.confirmDialogConfirm();
            }
            let appGlobals = this.state.appGlobals;
            appGlobals.showConfirmDialog = false;
            this.setState({
                appGlobals: appGlobals,
            })
        }
    }

    openConfirmDialog = (
        confirmTitle: string,
        confirmMessage: string,
        confirmYesLabel: string,
        confirmNoLabel: string,
        confirmCallback: Function,
    ): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.confirmDialogMessage = confirmMessage;
        appGlobals.confirmDialogTitle = confirmTitle;
        appGlobals.confirmDialogYesLabel = confirmYesLabel;
        appGlobals.confirmDialogNoLabel = confirmNoLabel;
        appGlobals.showConfirmDialog = true;
        appGlobals.confirmDialogConfirm = confirmCallback;
        this.setState({
            appGlobals: appGlobals,
        })
    }


    render = (): React.ReactFragment => {
        return (
            <>

                <Modal show={this.state.appGlobals.showConfirmDialog} onHide={this.closeConfirmDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>
                            {this.state.appGlobals.confirmDialogTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form">
                        <div>
                            <SanitizedHTML html={this.state.appGlobals.confirmDialogMessage} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <button className="btn btn-secondary" onClick={this.closeConfirmDialog}>
                        {this.state.appGlobals.confirmDialogNoLabel}
                    </button>
                    <button className="btn btn-primary" onClick={this.confirmConfirmDialog}>
                        {this.state.appGlobals.confirmDialogYesLabel}
                    </button>

                </Modal.Footer>
            </Modal>
            <Router>

            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={
                    <Home
                        appGlobals={this.state.appGlobals}
                    />
                }/>
                {/* <Route path={`${process.env.PUBLIC_URL}/page1`} >
                    <Page1
                        appGlobals={this.state.appGlobals}
                    />
                </Route> */}
                <Route path={`${process.env.PUBLIC_URL}/equipment-editor`}   element={
                    <EquipmentEditor
                        appGlobals={this.state.appGlobals}
                    />
                }/>

                <Route path={`${process.env.PUBLIC_URL}/dev-status`}    element={
                    <DevelopmentStatus
                        appGlobals={this.state.appGlobals}
                    />
                }/>
                <Route path={`${process.env.PUBLIC_URL}/about`}  element={
                    <About
                        appGlobals={this.state.appGlobals}
                    />
                }/>
                <Route path={`${process.env.PUBLIC_URL}/settings/*`}  element={
                    <SettingsRouter
                        appGlobals={this.state.appGlobals}
                    />
                }/>
                <Route path={`${process.env.PUBLIC_URL}/alpha-strike-roster/*`}  element={
                    <Navigate to={`${process.env.PUBLIC_URL}/alpha-strike/roster/`} />
                } />

                <Route path={`${process.env.PUBLIC_URL}/mech-creator/*`}  element={
                    <Navigate to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/`} />
                } />

                <Route path={`${process.env.PUBLIC_URL}/alpha-strike/*`}  element={
                    <AlphaStrikeRouter
                        appGlobals={this.state.appGlobals}
                    />
                }/>
                <Route path={`${process.env.PUBLIC_URL}/classic-battletech/*`}  element={
                    <ClassicBattleTechRouter
                        appGlobals={this.state.appGlobals}
                    />
                }/>

                <Route path="*" element={
                    <Error404
                        appGlobals={this.state.appGlobals}
                    />
                }/>

            </Routes>
            </Router>
            </>
        );
    }
}

interface IAppRouterProps {

}

interface IAppRouterState {
    appGlobals: IAppGlobals;
    updated: boolean;
}

export interface IAppGlobals {
    sessionUUID: string;
    currentPageTitle: string;
    siteAlerts: Alerts;
    appSettings: AppSettings;
    showMobile: boolean;
    confirmDialogMessage: string;
    confirmDialogTitle: string;
    confirmDialogYesLabel: string;
    confirmDialogNoLabel: string;
    showConfirmDialog: boolean;
    confirmDialogConfirm: Function | null;
    refreshGlobalState(appGlobals: IAppGlobals | null): void;

    makeDocumentTitle( subTitle: string ): void;

    toggleMobile(): void;
    closeMobile(): void;

    openConfirmDialog(
        confirmTitle: string,
        confirmMessage: string,
        confirmYesLabel: string,
        confirmNoLabel: string,
        confirmCallback: Function,
    ): void;

    currentASForce: AlphaStrikeForce | null;
    currentCBTForce: BattleMechForce | null;
    saveCurrentASForce( asForce: AlphaStrikeForce | null ): void;

    favoriteASGroups: AlphaStrikeGroup[];
    favoriteCBTGroups: BattleMechGroup[];
    saveFavoriteASGroups( asGroups: AlphaStrikeGroup[] ): void
    saveASGroupFavorite( asGroup: AlphaStrikeGroup ): void;
    removeASGroupFavorite( asGroupIndex: number ): void;

    currentBattleMech: BattleMech | null;
    saveCurrentBattleMech( mech: BattleMech | null ): void;
    saveAppSettings( appSettings: AppSettings ): void;

    battleMechSaves: IBattleMechExport[];
    saveBattleMechSaves( newValue: IBattleMechExport[]): void;

    saveCurrentCBTForce( bmForce: BattleMechForce ): void;

    saveCBTGroupFavorite( bmGroup: BattleMechGroup ): void;

    removeCBTGroupFavorite( asGroupIndex: number ): void;

    saveFavoriteCBTGroups( asGroups: BattleMechGroup[] ): void;
}