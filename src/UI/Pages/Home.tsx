import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Home");
    }

    render() {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>
            <div className="alert alert-warning">
              <h4>Under redevelopment</h4>
              <p>Please bear with me (rarw!), as I'm recoding the site to React+Typescript... most of the old code logic is somewhat compatible, the UI will take a bit to refactor.</p>
            </div>
            This will be the home page.

        </UIPage>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}