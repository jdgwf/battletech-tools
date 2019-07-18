import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import Page1 from "./Pages/Page1";

export default class AppRouter extends React.Component<IAppRouterProps, IAppRouterState> {
    constructor(props: IAppRouterProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }
    render() {
        return (
            <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/page1" exact>
                    <Page1 />
                </Route>
                <Route>
                    <Error404 />
                </Route>
            </Switch>
            </Router>
        );
    }
}

interface IAppRouterProps {

}

interface IAppRouterState {
    // appGlobals: IAppGlobals;
    updated: boolean;

}