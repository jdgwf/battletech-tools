import {IAppGlobals} from '../../AppRouter';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import Home from './Home';
import InPlay from './InPlay';
import Error404 from "../Error404";

export default class AlphaStrikeRosterRouter extends React.Component<IAlphaStrikeRosterRouterProps, IAlphaStrikeRosterRouterState> {

    constructor(props: IAlphaStrikeRosterRouterProps) {
        super(props);

        this.state = { };
    }

    render() {
        return(<>
            <Switch>


                <Route exact path={`${process.env.PUBLIC_URL}/alpha-strike-roster`}>
                    <Home
                        appGlobals={this.props.appGlobals}
                    />
                </Route>

                <Route exact path={`${process.env.PUBLIC_URL}/alpha-strike-roster/play`}>
                    <InPlay
                        appGlobals={this.props.appGlobals}
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

interface IAlphaStrikeRosterRouterProps {
    appGlobals: IAppGlobals,
}

interface IAlphaStrikeRosterRouterState {

}