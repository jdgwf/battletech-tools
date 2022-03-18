import * as React from 'react';
import { Route, Routes } from "react-router-dom";
import { IAppGlobals } from '../../app-router';
import Error404 from "../error404";
import ClassicBattleTechHome from './home';
import MechCreatorRouter from './mech-creator/_router';


export default class ClassicBattleTechRouter extends React.Component<IClassicBattleTechRouterProps, IClassicBattleTechRouterState> {

    render = (): React.ReactFragment => {
        return(
            <Routes>


                <Route path={``} element={
                    <ClassicBattleTechHome
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`mech-creator/*`} element={
                    <MechCreatorRouter
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

interface IClassicBattleTechRouterProps {
    appGlobals: IAppGlobals;
}

interface IClassicBattleTechRouterState {

}