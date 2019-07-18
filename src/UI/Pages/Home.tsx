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
        <div className="ui-page">
          <TopMenu current="home" />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
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