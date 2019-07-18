import {IAppGlobals} from '../../AppRouter';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from './Home';

export default class AlphaStrikeRosterRouter extends React.Component<IAlphaStrikeRosterRouterProps, IAlphaStrikeRosterRouterState> {

    constructor(props: IAlphaStrikeRosterRouterProps) {
        super(props);

        this.state = { };
    }

    render() {
        return(<>
            <Switch>


                <Route exact path="/alpha-strike-roster/">
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                </Route>
            </Switch>
        </>
        )
    }
}

interface IAlphaStrikeRosterRouterProps {
    appGlobals: IAppGlobals,
}

interface IAlphaStrikeRosterRouterState {

}