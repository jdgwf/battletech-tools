
import { FaArrowCircleLeft } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import SanitizedHTML from '../../../components/sanitized-html';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';

export default class MechCreatorExports extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Exports | 'Mech Creator");
    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>
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
                      <TextSection
                        label="Exports"
                      >

                          <h5>Help wanted</h5>

                          <p>If you'd like to make an exporter for your own software send me a PR 😎</p>

                          <div className="clear-both overflow-hidden">
                            <hr />

                              <div className="text-left inline-block">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/summary`} className="btn btn-primary btn-sm"><FaArrowCircleLeft /> Summary</Link>
                            </div>
                          </div>
                        </TextSection>

                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                    <TextSection

                    >
                      <div className="mech-tro">
                        <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                      </div>
                    </TextSection>
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