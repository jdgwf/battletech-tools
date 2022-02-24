import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Error404 from "./pages/error404";
import About from "./pages/about";
import { Modal, Button } from 'react-bootstrap';
import {CONFIGSiteTitle} from '../configVars';
import SanitizedHTML from './components/sanitized-html';
import Alerts from './classes/alerts';
import AlphaStrikeRosterRouter from './pages/alpha-strike-roster/_router'
import MechCreatorRouter from './pages/mech-creator/_router'
import AlphaStrikeForce, { IASForceExport } from "../classes/alpha-strike-force";
import AlphaStrikeGroup, { IASGroupExport } from "../classes/alpha-strike-group";
import DevelopmentStatus from "./pages/development-status";
import { BattleMech, IBattleMechExport } from "../classes/battlemech";
import Settings from "./pages/settings";
import EquipmentEditor from "./pages/equipment-editor";

export default class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {

    constructor(props: IAppRouterProps) {
        super(props);

        let asImport: IASForceExport | null = null;
        let lsASFImport = localStorage.getItem("currentASForce");
        if( lsASFImport ) {
            asImport = JSON.parse( lsASFImport );
        }
        let alphaStrikeForce = new AlphaStrikeForce( asImport );

        let lsBMImport = localStorage.getItem("currentBattleMech");
        let currentBattleMech = new BattleMech();
        if( lsBMImport ) {
            currentBattleMech.importJSON( lsBMImport);
        }

        let lsBMSavesImport: null|string = localStorage.getItem("battleMechSaves");
        let battleMechSaves: IBattleMechExport[] = [];
        if( lsBMSavesImport ) {
            battleMechSaves = JSON.parse( lsBMSavesImport );
        } else {
            battleMechSaves = [];
        }

        let asImportFavorites: IASGroupExport[] = [];
        let asImportedFavorites: AlphaStrikeGroup[] = [];
        let lsASFImportFavorites = localStorage.getItem("favoriteASGroups");
        if( lsASFImportFavorites ) {
            asImportFavorites = JSON.parse( lsASFImportFavorites );
            if( asImportFavorites && asImportFavorites.length > 0 )  {
                for( let importItem of asImportFavorites ) {
                    asImportedFavorites.push( new AlphaStrikeGroup(importItem) );
                }
            }
        }

        let uiTheme: string = "";
        let lsTheme = localStorage.getItem("uiTheme");
        if( lsTheme ) {
            uiTheme = lsTheme;
            document.body.className = uiTheme;
        } else {
            document.body.className = '';
        }


        this.state = {
            updated: false,
            appGlobals: {
                settings: {
                    uiTheme: uiTheme,
                },
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

                favoriteASGroups: asImportedFavorites,
                saveFavoriteASGroups: this.saveFavoriteASGroups,
                saveASGroupFavorite: this.saveASGroupFavorite,
                removeASGroupFavorite: this.removeASGroupFavorite,

                currentBattleMech: currentBattleMech,
                saveCurrentBattleMech: this.saveCurrentBattleMech,

                saveSettings: this.saveSettings,

                battleMechSaves: battleMechSaves,
                saveBattleMechSaves: this.saveBattleMechSaves,
            }
        }

    }

    saveBattleMechSaves = ( newValue: IBattleMechExport[] ): void => {
        localStorage.setItem("battleMechSaves", JSON.stringify(newValue) );

        let appGlobals = this.state.appGlobals;
        appGlobals.battleMechSaves = newValue;
        this.setState({
            appGlobals: appGlobals,
        });
    }

    saveSettings = ( settings: ISettings ): void => {
        let appGlobals = this.state.appGlobals;
        appGlobals.settings = settings;
        this.setState({
            appGlobals: appGlobals,
        });

        if( settings.uiTheme.trim() ) {
            document.body.className = settings.uiTheme;
        } else {
            document.body.className = '';
        }

        localStorage.setItem("uiTheme", settings.uiTheme);
    }

    saveCurrentBattleMech = ( mech: BattleMech ): void => {
        let exportBM: string = mech.exportJSON();
        let appGlobals = this.state.appGlobals;
        appGlobals.currentBattleMech = mech;
        this.setState({
            appGlobals: appGlobals,
        });

        localStorage.setItem("currentBattleMech", exportBM);
    }

    saveCurrentASForce = ( asForce: AlphaStrikeForce ): void => {
        let exportASForce = asForce.export();
        let appGlobals = this.state.appGlobals;
        appGlobals.currentASForce = asForce;
        this.setState({
            appGlobals: appGlobals,
        });

        localStorage.setItem("currentASForce", JSON.stringify( exportASForce ));
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

        localStorage.setItem("favoriteASGroups", JSON.stringify( exportASGroups ));
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



    render() {
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
    settings: ISettings;
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
    saveSettings( settings: ISettings ): void;

    battleMechSaves: IBattleMechExport[];
    saveBattleMechSaves( newValue: IBattleMechExport[]): void;

}