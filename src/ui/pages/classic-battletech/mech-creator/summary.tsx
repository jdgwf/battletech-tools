import React from 'react';
import './home.scss';
import {IAppGlobals} from '../../../app-router';
import SanitizedHTML from '../../../components/sanitized-html';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import UIPage from '../../../components/ui-page';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';
import BattleMechSVG from '../../../components/svg/battlemech-svg';
import TextSection from '../../../components/text-section';
import InputField from '../../../components/form_elements/input_field';

export default class MechCreatorSummary extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Summary | 'Mech Creator");
    }

    setASRole = ( event: React.FormEvent<HTMLInputElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setASRole( event.currentTarget.value );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    setASCustomName = ( event: React.FormEvent<HTMLInputElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setASCustomName( event.currentTarget.value );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    setPilotName = ( event: React.FormEvent<HTMLInputElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setPilotName( event.currentTarget.value );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    setPilotPiloting = ( event: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setPilotPiloting( +event.currentTarget.value );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    setPilotGunnery = ( event: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setPilotGunnery( +event.currentTarget.value );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>

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
                      <TextSection
                        label="Summary"
                      >

                          <div className="row">
                            <div className="col-md-6">
                              <fieldset className="fieldset">
                                <legend>Mechwarrior Data</legend>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <InputField
                                      label="Handle"
                                      value={this.props.appGlobals.currentBattleMech.getPilot().name}
                                      onChange={this.setPilotName}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <label>
                                      Piloting:<br />

                                      <select
                                        value={this.props.appGlobals.currentBattleMech.getPilot().piloting}
                                        onChange={this.setPilotPiloting}
                                      >
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                      </select>
                                    </label>
                                  </div>
                                  <div className="col-sm-6">
                                    <label>
                                      Gunnery:<br />
                                      <select
                                        value={this.props.appGlobals.currentBattleMech.getPilot().gunnery}
                                        onChange={this.setPilotGunnery}
                                      >
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                      </select>
                                    </label>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div className="col-md-6">
                            <fieldset className="fieldset">
                                <legend>Alpha Strike</legend>

                                  <InputField
                                      label="Custom Name"
                                      value={this.props.appGlobals.currentBattleMech.getASCustomName()}
                                      onChange={this.setASCustomName}
                                    />

                                  <InputField
                                      label="Alpha Strike Role"
                                      value={this.props.appGlobals.currentBattleMech.getASRole()}
                                      onChange={this.setASRole}
                                    />
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
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/print-rs`}>
                                <BattleMechSVG
                                  mechData={this.props.appGlobals.currentBattleMech}
                                />
                              </Link>
                              <br />
                              <AlphaStrikeUnitSVG
                                appGlobals={this.props.appGlobals}
                                asUnit={this.props.appGlobals.currentBattleMech.getAlphaStrikeForceStats()}
                                measurementsInHexes={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
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
                          <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/exports`} className="btn btn-sm btn-primary pull-right">Exports <FaArrowCircleRight /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step6`} className="btn btn-sm btn-primary"><FaArrowCircleLeft /> Previous Step</Link>
                            </div>
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