import React from "react";
import { Button, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlphaStrikeForce, { IASForceExport } from "../classes/alpha-strike-force";
import AlphaStrikeGroup, { IASGroupExport } from "../classes/alpha-strike-group";
import { BattleMech, IBattleMechExport } from "../classes/battlemech";
import { CONFIGSiteTitle } from '../configVars';
import { getAppSettings, getBattleMechSaves, getCurrentASForce, getCurrentBattleMech, getFavoriteASGroups, saveAppSettings } from "../dataSaves";
import Alerts from './classes/alerts';
import { AppSettings } from "./classes/app_settings";
import SanitizedHTML from './components/sanitized-html';
import About from "./pages/about";
import AlphaStrikeRosterRouter from './pages/alpha-strike-roster/_router';
import DevelopmentStatus from "./pages/development-status";
import EquipmentEditor from "./pages/equipment-editor";
import Error404 from "./pages/error404";
import Home from "./pages/home";
import MechCreatorRouter from './pages/mech-creator/_router';
import Settings from "./pages/settings";


export default class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {

    constructor(props: IAppRouterProps) {
        super(props);

        let asImport: IASForceExport | null = getCurrentASForce();
        // let lsASFImport = getData("currentASForce");
        // if( lsASFImport ) {
        //     asImport = JSON.parse( lsASFImport );
        // }
        let alphaStrikeForce = new AlphaStrikeForce( asImport );

        let lsBMImport = getCurrentBattleMech();
        let currentBattleMech = new BattleMech();
        if( lsBMImport ) {
            currentBattleMech.importJSON( lsBMImport);
        }

        // let lsBMSavesImport: null|string = getData("battleMechSaves");
        let battleMechSaves: IBattleMechExport[] = getBattleMechSaves();
        // if( lsBMSavesImport ) {
        //     battleMechSaves = JSON.parse( lsBMSavesImport );
        // } else {
        //     battleMechSaves = [];
        // }

        let asImportFavorites: IASGroupExport[] = getFavoriteASGroups();
        let asImportedFavorites: AlphaStrikeGroup[] = [];
        // let lsASFImportFavorites = getData("favoriteASGroups");
        if( asImportFavorites.length > 0 ) {
            if( asImportFavorites && asImportFavorites.length > 0 )  {
                for( let importItem of asImportFavorites ) {
                    asImportedFavorites.push( new AlphaStrikeGroup(importItem) );
                }
            }
        }

        // let uiTheme: string = "";
        // let lsTheme = getData("uiTheme");

        let settingsData = getAppSettings();

        // console.log("settingsData", settingsData);
        if( settingsData && settingsData.uiTheme ) {

            document.body.className = settingsData.uiTheme;
        } else {
            document.body.className = '';
        }

        this.state = {
            updated: false,
            appGlobals: {
                appSettings: new AppSettings( settingsData ),
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
                currentASForce: alphaStrikeForce,
                saveCurrentASForce: this.saveCurrentASForce,
                saveAppSettings: this.saveAppSettings,

                favoriteASGroups: asImportedFavorites,
                saveFavoriteASGroups: this.saveFavoriteASGroups,
                saveASGroupFavorite: this.saveASGroupFavorite,
                removeASGroupFavorite: this.removeASGroupFavorite,

                currentBattleMech: currentBattleMech,
                saveCurrentBattleMech: this.saveCurrentBattleMech,

                battleMechSaves: battleMechSaves,
                saveBattleMechSaves: this.saveBattleMechSaves,
            }
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
    }

    saveBattleMechSaves = ( newValue: IBattleMechExport[] ): void => {


        let appGlobals = this.state.appGlobals;
        appGlobals.battleMechSaves = newValue;
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
        });
    }

    saveCurrentBattleMech = ( mech: BattleMech ): void => {
        let exportBM: string = mech.exportJSON();
        let appGlobals = this.state.appGlobals;
        appGlobals.currentBattleMech = mech;
        this.setState({
            appGlobals: appGlobals,
        });

    }

    saveCurrentASForce = ( asForce: AlphaStrikeForce ): void => {
        let exportASForce = asForce.export();
        let appGlobals = this.state.appGlobals;
        appGlobals.currentASForce = asForce;
        this.setState({
            appGlobals: appGlobals,
        });

    }

    saveASGroupFavorite = ( asGroup: AlphaStrikeGroup ): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.favoriteASGroups.push( asGroup );
        this.saveFavoriteASGroups( appGlobals.favoriteASGroups );
    }

    removeASGroupFavorite = ( asGroupIndex: number ): void => {
        let appGlobals = this.state.appGlobals;

        if( appGlobals.favoriteASGroups.length > asGroupIndex ) {
            appGlobals.favoriteASGroups.splice( asGroupIndex, 1 );
            this.saveFavoriteASGroups( appGlobals.favoriteASGroups );
        }

    }

    saveFavoriteASGroups = ( asGroups: AlphaStrikeGroup[] ): void => {
        let exportASGroups: IASGroupExport[] = [];
        for( let group of asGroups) {
            exportASGroups.push( group.export() );
        }
        let appGlobals = this.state.appGlobals;
        appGlobals.favoriteASGroups = asGroups;
        this.setState({
            appGlobals: appGlobals,
        });

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

                    <Button variant="secondary" onClick={this.closeConfirmDialog}>
                        {this.state.appGlobals.confirmDialogNoLabel}
                    </Button>
                    <Button variant="primary" onClick={this.confirmConfirmDialog}>
                        {this.state.appGlobals.confirmDialogYesLabel}
                    </Button>

                </Modal.Footer>
            </Modal>
            <Router>

            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={
                    <Home
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>
                {/* <Route path={`${process.env.PUBLIC_URL}/page1`} >
                    <Page1
                        appGlobals={this.state.appGlobals}
                    />
                </Route> */}
                <Route path={`${process.env.PUBLIC_URL}/equipment-editor`}   element={
                    <EquipmentEditor
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>

                <Route path={`${process.env.PUBLIC_URL}/dev-status`}    element={
                    <DevelopmentStatus
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>
                <Route path={`${process.env.PUBLIC_URL}/about`}  element={
                    <About
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>
                <Route path={`${process.env.PUBLIC_URL}/settings`}  element={
                    <Settings
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>
                <Route path={`${process.env.PUBLIC_URL}/alpha-strike-roster/*`}  element={
                    <AlphaStrikeRosterRouter
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>
                <Route path={`${process.env.PUBLIC_URL}/mech-creator/*`}  element={
                    <MechCreatorRouter
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>

                <Route element={
                    <Error404
                        appGlobals={this.state.appGlobals}
                    />
                }></Route>

            </Routes>
            </Router>
            </>
        );
    }
}

interface IAppRouterProps {

}

interface ISettings {
    uiTheme: string;
}

interface IAppRouterState {
    appGlobals: IAppGlobals;
    updated: boolean;
}

export interface IAppGlobals {
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

    currentASForce: AlphaStrikeForce;
    saveCurrentASForce( asForce: AlphaStrikeForce ): void;

    favoriteASGroups: AlphaStrikeGroup[];
    saveFavoriteASGroups( asGroups: AlphaStrikeGroup[] ): void
    saveASGroupFavorite( asGroup: AlphaStrikeGroup ): void;
    removeASGroupFavorite( asGroupIndex: number ): void;

    currentBattleMech: BattleMech;
    saveCurrentBattleMech( mech: BattleMech ): void;
    saveAppSettings( appSettings: AppSettings ): void;

    battleMechSaves: IBattleMechExport[];
    saveBattleMechSaves( newValue: IBattleMechExport[]): void;

}