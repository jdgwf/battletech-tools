import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { faArrowCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MechCreatorStatusbar from '../../Components/MechCreatorStatusBar';
import UIPage from '../../Components/UIPage';
import AlphaStrikeUnitSVG from '../../Components/SVG/AlphaStrikeUnitSVG';
import BattleMechSVG from '../../Components/SVG/BattleMechSVG';

export default class MechCreatorSummary extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.setASRole = this.setASRole.bind(this);
        this.setASCustomName = this.setASCustomName.bind(this);

        this.setPilotName = this.setPilotName.bind(this);
        this.setPilotPiloting = this.setPilotPiloting.bind(this);
        this.setPilotGunnery = this.setPilotGunnery.bind(this);
    }

    setASRole( event: React.FormEvent<HTMLInputElement>) {
      this.props.appGlobals.currentBattleMech.setASRole( event.currentTarget.value );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
    }

    setASCustomName( event: React.FormEvent<HTMLInputElement>) {
      this.props.appGlobals.currentBattleMech.setASCustomName( event.currentTarget.value );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
    }

    setPilotName( event: React.FormEvent<HTMLInputElement>) {
      this.props.appGlobals.currentBattleMech.setPilotName( event.currentTarget.value );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
    }

    setPilotPiloting( event: React.FormEvent<HTMLInputElement>) {
      this.props.appGlobals.currentBattleMech.setPilotPiloting( +event.currentTarget.value );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
    }

    setPilotGunnery( event: React.FormEvent<HTMLInputElement>) {
      this.props.appGlobals.currentBattleMech.setPilotGunnery( +event.currentTarget.value );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Summary | 'Mech Creator");
    }

    render() {
      return (
        <>
          <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="summary"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="text-section">
                        <h2>Summary</h2>
                        <div className="section-content">
                          <div className="row">
                            <div className="col-md-6">
                              <fieldset className="fieldset">
                                <legend>Mechwarrior Data</legend>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <label>
                                      Pilot Name:<br />
                                      <input
                                        type="string"
                                        value={this.props.appGlobals.currentBattleMech.getPilot().name}
                                        onChange={this.setPilotName}
                                      />
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <label>
                                      Piloting Skill:<br />
                                      <input
                                        type="number"
                                        value={this.props.appGlobals.currentBattleMech.getPilot().piloting}
                                        onChange={this.setPilotPiloting}
                                      />
                                    </label>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>
                                      Gunnery Skill:<br />
                                      <input
                                        type="number"
                                        value={this.props.appGlobals.currentBattleMech.getPilot().gunnery}
                                        onChange={this.setPilotGunnery}
                                      />
                                    </label>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div className="col-md-6">
                            <fieldset className="fieldset">
                                <legend>Alpha Strike</legend>
                                  <label>
                                    Custom Name:<br />
                                    <input
                                      type="string"
                                      value={this.props.appGlobals.currentBattleMech.getASCustomName()}
                                      onChange={this.setASCustomName}
                                    />
                                  </label>
                                  <label>
                                    Alpha Strike Role:<br />
                                    <input
                                      type="string"
                                      value={this.props.appGlobals.currentBattleMech.getASRole()}
                                      onChange={this.setASRole}
                                    />
                                  </label>
                              </fieldset>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-6">
                              <h3 className="text-center">Technical Read Out</h3>
                              <div className="mech-tro some-padding">
                                <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <h3 className="text-center">Record Sheets</h3>
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/print-rs`}>
                                <BattleMechSVG
                                  mechData={this.props.appGlobals.currentBattleMech}
                                />
                              </Link>
                              <br />
                              <AlphaStrikeUnitSVG
                                appGlobals={this.props.appGlobals}
                                asUnit={this.props.appGlobals.currentBattleMech.getAlphaStrikeForceStats()}
                              />
                            </div>
                          </div>
                          <br />
                          <h3 className="text-center">Calculations</h3>
                          <div className="row">
                            <div className="col-lg-4">
                              <h4 className="text-center">Battle Value</h4>
                              <div className="mech-tro some-padding">
                                <SanitizedHTML html={this.props.appGlobals.currentBattleMech.calcLogBV} raw={true} />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <h4 className="text-center">Alpha Strike</h4>
                              <div className="mech-tro some-padding">
                                <SanitizedHTML html={this.props.appGlobals.currentBattleMech.calcLogAS} raw={true} />
                                </div>
                            </div>
                            <div className="col-lg-4">
                              <h4 className="text-center">CBill Cost</h4>
                              <div className="mech-tro some-padding">
                                <SanitizedHTML html={this.props.appGlobals.currentBattleMech.calcLogCBill} raw={true} />
                              </div>
                            </div>
                          </div>

                          <div className="clear-both overflow-hidden">
                            <hr />
                          <Link to={`${process.env.PUBLIC_URL}/mech-creator/exports`} className="btn btn-sm btn-primary pull-right">Summary <FontAwesomeIcon icon={faArrowAltCircleRight} /></Link>
                            <div className="text-left">
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/step6`} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
                            </div>
                          </div>
                        </div>
                      </div>

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