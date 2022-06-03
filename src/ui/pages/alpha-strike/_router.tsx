import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../app-router';
import Error404 from "../error404";
import AlphaStrikeHome from './home';
import AlphaStrikeRosterRouter from './roster/_router';

export default class AlphaStrikeRouter extends React.Component<IAlphaStrikeRouterProps, IAlphaStrikeRouterState> {

    render = (): React.Element => {
        return(
            <Routes>

                <Route path={``} element={
                    <AlphaStrikeHome
                        appGlobals={this.props.appGlobals}
                    />
                }/>
                <Route path={`roster/*`} element={
                    <AlphaStrikeRosterRouter
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

interface IAlphaStrikeRouterProps {
    appGlobals: IAppGlobals;
}

interface IAlphaStrikeRouterState {

}