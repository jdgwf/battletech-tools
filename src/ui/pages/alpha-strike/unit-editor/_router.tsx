import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../../app-router';
import Error404 from "../../error404";
import AlphaStrikeUnitEditorHome from './home';


export default class AlphaStrikeUnitEditorRouter extends React.Component<IAlphaStrikeUnitEditorRouterProps, IAlphaStrikeUnitEditorRouterState> {

    render = (): JSX.Element => {
        return(
            <Routes>

                <Route path={``} element={
                    <AlphaStrikeUnitEditorHome
                        appGlobals={this.props.appGlobals}
                    />
                }/>
{/*
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
*/}
                <Route path="*" element={
                    <Error404
                        appGlobals={this.props.appGlobals}
                    />
                }/>
            </Routes>
        )
    }
}

interface IAlphaStrikeUnitEditorRouterProps {
    appGlobals: IAppGlobals;
}

interface IAlphaStrikeUnitEditorRouterState {

}