import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../../app-router';
import Error404 from "../../error404";
import Home from './home';
import InPlay from './play';
import PrintSheet from './print';

export default class BattleMechRosterRouter extends React.Component<IBattleMechRosterRouterProps, IBattleMechRosterRouterState> {

    render = (): React.ReactFragment => {
        return(
            <Routes>

                <Route path={``} element={
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`/play`} element={
                    <InPlay
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`/print`} element={
                    <PrintSheet
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

interface IBattleMechRosterRouterProps {
    appGlobals: IAppGlobals;
}

interface IBattleMechRosterRouterState {

}