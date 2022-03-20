import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../app-router';
import Error404 from "../error404";
import SettingsBackupAndRestore from './backup-and-restore';
import SettingsHome from './home';


export default class SettingsRouter extends React.Component<ISettingsRouterProps, ISettingsRouterState> {

    render = (): React.ReactFragment => {
        return(
            <Routes>


                <Route path={``} element={
                    <SettingsHome
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`backup-and-restore`} element={
                    <SettingsBackupAndRestore
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path="*" element={
                    <Error404
                        appGlobals={this.props.appGlobals}
                    />
                }/>
            </Routes>
        )
    }
}

interface ISettingsRouterProps {
    appGlobals: IAppGlobals;
}

interface ISettingsRouterState {

}