import {IAppGlobals} from '../../AppRouter';
import * as React from 'react';
import { Route, Routes } from 'react-router';
import Home from './Home';
import MechCreatorStep1 from './Step1';
import MechCreatorStep2 from './Step2';
import MechCreatorStep3 from './Step3';
import MechCreatorStep4 from './Step4';
import MechCreatorStep5 from './Step5';
import MechCreatorStep6 from './Step6';

import MechCreatorSummary from './Summary';
import MechCreatorExports from './Exports';

import Error404 from "../Error404";
import MechCreatorPrintRS from './PrintRS';

export default class MechCreatorRouter extends React.Component<IMechCreatorRouterProps, IMechCreatorRouterState> {

    constructor(props: IMechCreatorRouterProps) {
        super(props);

        this.state = { };
    }

    render() {
        return(<>
            <Routes>


                <Route path={`/`} element={
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>
                <Route path={`/step1`} element={
                    <MechCreatorStep1
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/step2`} element={
                    <MechCreatorStep2
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/step3`} element={
                    <MechCreatorStep3
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>
                <Route path={`/step4`} element={
                    <MechCreatorStep4
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>
                <Route path={`/step5`} element={
                    <MechCreatorStep5
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>
                <Route path={`/step6`} element={
                    <MechCreatorStep6
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/summary`} element={
                    <MechCreatorSummary
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/exports`} element={
                    <MechCreatorExports
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route path={`/print-rs`} element={
                    <MechCreatorPrintRS
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>

                <Route element={
                    <Error404
                        appGlobals={this.props.appGlobals}
                    />
                }></Route>
            </Routes>
        </>
        )
    }
}

interface IMechCreatorRouterProps {
    appGlobals: IAppGlobals,
}

interface IMechCreatorRouterState {

}