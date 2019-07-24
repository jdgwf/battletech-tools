import React from 'react';
import './Home.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

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
            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="home"
                />              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="text-section">
                        <h2>Welcome</h2>
                        <div className="section-content">
                          <p>Welcome to a BattleTech 'mech builder.</p>

                          <p>This tool attempts to closely follow the steps in the BattleTech TechManual and the steps in that book should be referenced during 'mech creation</p>

                          <div className="clear-both overflow-hidden">
                            <hr />
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/step1`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                      <div className="mech-tro">
                        <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                      </div>
                    </div>
                  </div>
              </div>

            </div>

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