import {IAppGlobals} from '../../AppRouter';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from './Home';

export default class MechCreatorRouter extends React.Component<IMechCreatorRouterProps, IMechCreatorRouterState> {

    constructor(props: IMechCreatorRouterProps) {
        super(props);

        this.state = { };
    }

    render() {
        return(<>
            <Switch>


                <Route exact path="/mech-creator/">
                    <Home
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