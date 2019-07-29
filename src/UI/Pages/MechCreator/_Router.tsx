import {IAppGlobals} from '../../AppRouter';
import * as React from 'react';
import { Route, Switch } from 'react-router';
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
import BattleMechSVG from '../../Components/SVG/BattleMechSVG';

export default class MechCreatorRouter extends React.Component<IMechCreatorRouterProps, IMechCreatorRouterState> {

    constructor(props: IMechCreatorRouterProps) {
        super(props);

        this.state = { };
    }

    render() {
        return(<>
            <Switch>


                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/`}>
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                </Route>
                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/step1`}>
                    <MechCreatorStep1
                        appGlobals={this.props.appGlobals}
                    />
                </Route>

                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/step2`}>
                    <MechCreatorStep2
                        appGlobals={this.props.appGlobals}
                    />
                </Route>

                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/step3`}>
                    <MechCreatorStep3
                        appGlobals={this.props.appGlobals}
                    />
                </Route>
                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/step4`}>
                    <MechCreatorStep4
                        appGlobals={this.props.appGlobals}
                    />
                </Route>
                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/step5`}>
                    <MechCreatorStep5
                        appGlobals={this.props.appGlobals}
                    />
                </Route>
                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/step6`}>
                    <MechCreatorStep6
                        appGlobals={this.props.appGlobals}
                    />
                </Route>

                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/summary`}>
                    <MechCreatorSummary
                        appGlobals={this.props.appGlobals}
                    />
                </Route>

                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/exports`}>
                    <MechCreatorExports
                        appGlobals={this.props.appGlobals}
                    />
                </Route>

                <Route exact path={`${process.env.PUBLIC_URL}/mech-creator/svg`}>
                    <BattleMechSVG
                        mechData={this.props.appGlobals.currentBattleMech}
                    />
                </Route>

                <Route>
                    <Error404
                        appGlobals={this.props.appGlobals}
                    />
                </Route>
            </Switch>
        </>
        )
    }
}

interface IMechCreatorRouterProps {
    appGlobals: IAppGlobals,
}

interface IMechCreatorRouterState {

}