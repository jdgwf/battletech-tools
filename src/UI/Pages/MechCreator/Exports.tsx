import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import UIPage from '../../Components/UIPage';

export default class MechCreatorExports extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Exports | 'Mech Creator");
    }

    render() {
      return (
        <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>
            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="exports"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="text-section">
                        <h2>Exports</h2>
                        <div className="section-content">
                          TODO


                          <div className="clear-both overflow-hidden">
                            <hr />

                              <div className="text-left inline-block">
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/summary`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Summary</Link>
                            </div>
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