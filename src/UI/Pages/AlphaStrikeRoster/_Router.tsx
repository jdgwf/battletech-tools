import {IAppGlobals} from '../../AppRouter';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import InPlay from './InPlay';
import Error404 from "../Error404";

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