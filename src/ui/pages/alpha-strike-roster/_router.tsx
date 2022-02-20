import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../app-router';
import Error404 from "../error404";
import Home from './home';
import InPlay from './in-play';

export default class AlphaStrikeRosterRouter extends React.Component<IAlphaStrikeRosterRouterProps, IAlphaStrikeRosterRouterState> {

    constructor(props: IAlphaStrikeRosterRouterProps) {
        super(props);

        this.state = { };
    }

    render() {
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