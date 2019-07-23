import React from 'react';
import './Home.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';

export default class MechCreatorHome extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }

    render() {
      return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="mech-creator" sub="home" appGlobals={this.props.appGlobals}  />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            <p>
              Look, ma, a wild Battlemech has appeared (Battlemech object)!
              <br />Make: {this.props.appGlobals.currentBattleMech.make}
              <br />Tonnage: {this.props.appGlobals.currentBattleMech.tonnage}
            </p>
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