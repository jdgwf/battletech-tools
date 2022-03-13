import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../app-router';
import Error404 from "../error404";
import Home from './home';
import InPlay from './in-play';
import PrintSheet from './print';

export default class AlphaStrikeRosterRouter extends React.Component<IAlphaStrikeRosterRouterProps, IAlphaStrikeRosterRouterState> {

    render = (): React.ReactFragment => {
        return(
            <Routes>


                <Route path={``} element={
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/play`} element={
                    <InPlay
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/print`} element={
                    <PrintSheet
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route element={
                    <Error404
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>
            </Routes>
        )
    }
}

interface IAlphaStrikeRosterRouterProps {
    appGlobals: IAppGlobals,
}

interface IAlphaStrikeRosterRouterState {

}