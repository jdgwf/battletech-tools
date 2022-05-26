import * as React from 'react';
import { Route, Routes } from 'react-router';
import { IAppGlobals } from '../../../app-router';
import Error404 from "../../error404";
import MechCreatorExports from './exports';
import Home from './home';
import MechCreatorImports from './imports';
import MechCreatorPrintAS from './print-as';
import MechCreatorPrintRS from './print-rs';
import MechCreatorStep1 from './step1';
import MechCreatorStep2 from './step2';
import MechCreatorStep3 from './step3';
import MechCreatorStep4 from './step4';
import MechCreatorStep5 from './step5';
import MechCreatorStep6 from './step6';
import MechCreatorSummary from './summary';

export default class MechCreatorRouter extends React.Component<IMechCreatorRouterProps, IMechCreatorRouterState> {

    render = (): React.ReactFragment => {
        return(<>
            <Routes>
                <Route path={``} element={
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                }/>
                <Route path={`step1`} element={
                    <MechCreatorStep1
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`step2`} element={
                    <MechCreatorStep2
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`step3`} element={
                    <MechCreatorStep3
                        appGlobals={this.props.appGlobals}
                    />
                }/>
                <Route path={`step4`} element={
                    <MechCreatorStep4
                        appGlobals={this.props.appGlobals}
                    />
                }/>
                <Route path={`step5`} element={
                    <MechCreatorStep5
                        appGlobals={this.props.appGlobals}
                    />
                }/>
                <Route path={`step6`} element={
                    <MechCreatorStep6
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`summary`} element={
                    <MechCreatorSummary
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`exports`} element={
                    <MechCreatorExports
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`imports`} element={
                    <MechCreatorImports
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path={`print-rs`} element={
                    <MechCreatorPrintRS
                        appGlobals={this.props.appGlobals}
                    />
                }/>
                <Route path={`print-as`} element={
                    <MechCreatorPrintAS
                        appGlobals={this.props.appGlobals}
                    />
                }/>

                <Route path="*" element={
                    <Error404
                        appGlobals={this.props.appGlobals}
                    />
                }/>
            </Routes>
        </>
        )
    }
}

interface IMechCreatorRouterProps {
    appGlobals: IAppGlobals;
}

interface IMechCreatorRouterState {

}