import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeRange } from '../../../../utils';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import SanitizedHTML from '../../../components/sanitized-html';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';

export default class MechCreatorStep3 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Step 3 | 'Mech Creator");

    }



    setAdditionalHeatSinks = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setAdditionalHeatSinks( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setHeatSinkType = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setHeatSinksType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }



    render = (): React.ReactFragment => {
      let weightDropDownMax = this.props.appGlobals.currentBattleMech.getRemainingTonnage() + this.props.appGlobals.currentBattleMech.getAdditionalHeatSinks();
      if( weightDropDownMax < this.props.appGlobals.currentBattleMech.getAdditionalHeatSinks()) {
        weightDropDownMax = this.props.appGlobals.currentBattleMech.getArmorWeight()
      }
      return (
        <>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>

            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="step3"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <TextSection
                        label="Step 3: Add additional heat sinks"
                      >



                          <p className="text-center">Your BattleMech includes 10 heat sinks.</p>

                          <label>
                              Heat Sink Technology :
                              <select
                                value={this.props.appGlobals.currentBattleMech.getHeatSinksType()}
                                onChange={this.setHeatSinkType}
                              >
                                <option value="single">Single</option>
                                <option value="double">Double</option>

                              </select>
                            </label>

                            <label>
                              Add additional heat sinks:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getAdditionalHeatSinks()}
                                onChange={this.setAdditionalHeatSinks}
                              >
                                <option value={0}>None</option>
                                {makeRange(1, weightDropDownMax).map( (option) => {
                                return (
                                  <option key={option} value={option}>{option}</option>
                                )
                              })}
                              </select>
                            </label>
                              <br />
                              {this.props.appGlobals.currentBattleMech.getHeatSinkCriticalRequirements().number > 0 ? (
                                  <>{this.props.appGlobals.currentBattleMech.getHeatSinkCriticalRequirements().number === 1 ? (
                                      <p className="text-center">One critical slot is required for your engine class and selected heat sinks</p>
                                    ) : (
                                      <p className="text-center">{this.props.appGlobals.currentBattleMech.getHeatSinkCriticalRequirements().number} critical slots are required for your engine class and selected heat sinks</p>
                                    )}
                                  </>
                              ) : (
                                <p className="text-center">No additional critical slots are required for your engine class and selected heat sinks</p>
                              )}


                          <div className="clear-both overflow-hidden">
                            <hr />
                            <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step4`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step2`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
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
        </>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}