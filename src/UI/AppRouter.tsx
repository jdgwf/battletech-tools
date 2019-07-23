import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import About from "./Pages/About";
import { Modal, Button } from 'react-bootstrap';
import {CONFIGSiteTitle} from '../configVars';
import SanitizedHTML from './Components/SanitizedHTML';
import Alerts from './Classes/Alerts';
import AlphaStrikeRosterRouter from './Pages/AlphaStrikeRoster/_Router'
import MechCreatorRouter from './Pages/MechCreator/_Router'
import AlphaStrikeForce, { IASForceExport } from "../Classes/AlphaStrikeForce";
import AlphaStrikeGroup, { IASGroupExport } from "../Classes/AlphaStrikeGroup";
import DevelopmentStatus from "./Pages/DevelopmentStatus";
import { BattleMech } from "../Classes/BattleMech";


export default class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {

    constructor(props: IAppRouterProps) {
        super(props);

        this.makeDocumentTitle = this.makeDocumentTitle.bind(this);
        this.openConfirmDialog = this.openConfirmDialog.bind(this);
        this.closeConfirmDialog = this.closeConfirmDialog.bind(this);
        this.confirmConfirmDialog = this.confirmConfirmDialog.bind(this);
        this.refreshGlobalState = this.refreshGlobalState.bind(this);
        this.toggleMobile = this.toggleMobile.bind(this);
        this.closeMobile = this.closeMobile.bind(this);
        this.saveCurrentASForce = this.saveCurrentASForce.bind(this);
        this.saveFavoriteASGroups = this.saveFavoriteASGroups.bind(this);
        this.saveASGroupFavorite = this.saveASGroupFavorite.bind(this);
        this.removeASGroupFavorite = this.removeASGroupFavorite.bind(this);
        this.saveCurrentBattleMech = this.saveCurrentBattleMech.bind(this);

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

        this.state = {
            updated: false,
            appGlobals: {
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
            }
        }

    }


    saveCurrentBattleMech( mech: BattleMech ): void {
        let exportBM: string = mech.exportJSON();
        let appGlobals = this.state.appGlobals;
        appGlobals.currentBattleMech = mech;
        this.setState({
            appGlobals: appGlobals,
        });

        localStorage.setItem("currentBattleMech", exportBM);
    }

    saveCurrentASForce( asForce: AlphaStrikeForce ): void {
        let exportASForce = asForce.export();
        let appGlobals = this.state.appGlobals;
        appGlobals.currentASForce = asForce;
        this.setState({
            appGlobals: appGlobals,
        });

        localStorage.setItem("currentASForce", JSON.stringify( exportASForce ));
    }

    saveASGroupFavorite( asGroup: AlphaStrikeGroup ): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.favoriteASGroups.push( asGroup );
        this.saveFavoriteASGroups( appGlobals.favoriteASGroups );
    }

    removeASGroupFavorite( asGroupIndex: number ): void {
        let appGlobals = this.state.appGlobals;

        if( appGlobals.favoriteASGroups.length > asGroupIndex ) {
            appGlobals.favoriteASGroups.splice( asGroupIndex, 1 );
            this.saveFavoriteASGroups( appGlobals.favoriteASGroups );
        }

    }

    saveFavoriteASGroups( asGroups: AlphaStrikeGroup[] ): void {
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

    toggleMobile(): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.showMobile = !appGlobals.showMobile;
        this.setState({
            appGlobals: appGlobals,
            updated: true,
        })
    }

    closeMobile(): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.showMobile = false;
        this.setState({
            appGlobals: appGlobals,
            updated: true,
        })
    }

    makeDocumentTitle( subTitle: string = "" ): void {
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

    refreshGlobalState(appGlobals: IAppGlobals | null = null): void {
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

    closeConfirmDialog(): void {
        let appGlobals = this.state.appGlobals;
        appGlobals.showConfirmDialog = false;
        this.setState({
            appGlobals: appGlobals,
        })
    }

    confirmConfirmDialog(): void {
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

    openConfirmDialog(
        confirmTitle: string,
        confirmMessage: string,
        confirmYesLabel: string,
        confirmNoLabel: string,
        confirmCallback: Function,
    ): void {
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
            <Router>
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
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/`} exact>
                    <Home
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                {/* <Route path={`${process.env.PUBLIC_URL}/page1`} exact>
                    <Page1
                        appGlobals={this.state.appGlobals}
                    />
                </Route> */}
                <Route path={`${process.env.PUBLIC_URL}/dev-status`} exact>
                    <DevelopmentStatus
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/about`} exact>
                    <About
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/alpha-strike-roster`}>
                    <AlphaStrikeRosterRouter
                        appGlobals={this.state.appGlobals}
                    />
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/mech-creator`}>
                    <MechCreatorRouter
                        appGlobals={this.state.appGlobals}
                    />
                </Route>

                <Route>
                    <Error404
                        appGlobals={this.state.appGlobals}
                    />
                </Route>

            </Switch>
            </Router>
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
    currentPageTitle: string;
    siteAlerts: Alerts;
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
}