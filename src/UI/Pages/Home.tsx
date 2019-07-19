import React from 'react';
import './Home.scss';
import TopMenu from '../Components/TopMenu';
import ShowAlerts from '../Components/ShowAlerts';
import {IAppGlobals} from '../AppRouter';

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Home");
    }

    render() {
      return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="home" appGlobals={this.props.appGlobals} />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            <div className="alert alert-warning">
              <h4>Under redevelopment</h4>
              <p>Please bear with me (rarw!), as I'm recoding the site to React+Typescript... most of the cose is pretty compatible, the UI will take a bit to refactor.</p>
            </div>
            This will be the home page.
          </div>
        </div>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}