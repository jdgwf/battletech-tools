import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import MechCreatorStatusbar from '../../Components/MechCreatorStatusBar';
import UIPage from '../../Components/UIPage';

export default class MechCreatorStep2 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.setWalkingMP = this.setWalkingMP.bind(this);
        this.setJumpingMP = this.setJumpingMP.bind(this);
        this.setEngineType = this.setEngineType.bind(this);
        this.setGyroType = this.setGyroType.bind(this);
    }

    setWalkingMP( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setWalkSpeed( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setJumpingMP( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setJumpSpeed( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setEngineType( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setEngineType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setGyroType( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setGyroType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Step 2 | 'Mech Creator");
    }

    render() {
      return (
        <>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>

            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="step2"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="text-section">
                        <h2>Step 2: Install engine and control systems</h2>
                        <div className="section-content">
                          <h3>Select Movement</h3>
                          <label>
                              Walking Movement Points:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getWalkSpeed()}
                                onChange={this.setWalkingMP}
                              >
                                <option value={0}>-Select Walking Speed-</option>
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( (option) => {
                                return (
                                  <option key={option} value={option}>{option} MP</option>
                                )
                              })}
                              </select>
                            </label>

                          <label>
                          Jumping Movement Points:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getJumpSpeed()}
                                onChange={this.setJumpingMP}
                              >
                                <option value={0}>-Select Jumping Speed-</option>
                                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( (option) => {
                                return (
                                  <option key={option} value={option}>{option} MP</option>
                                )
                              })}
                              </select>
                            </label>
                            <h3>Engine Type</h3>
                            <label>
                              Select Engine Type:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getEngineType().tag}
                                onChange={this.setEngineType}
                              >
                                {/* <option value={0}>-Select Jumping Speed-</option> */}
                                {this.props.appGlobals.currentBattleMech.getAvailableEngines().map( (engineData, engineIndex) => {
                                  if( engineData.available ) {
                                    return (
                                      <option key={engineIndex} value={engineData.tag}>{engineData.name}</option>
                                    )
                                  } else {
                                    if( !this.props.appGlobals.currentBattleMech.hideNonAvailableEquipment) {
                                      return (
                                        <option disabled={true} key={engineIndex} value={engineData.tag}>{engineData.name}</option>
                                      )
                                    } else {
                                      return <React.Fragment key={engineIndex}></React.Fragment>
                                    }
                                  }
                              })}
                              </select>
                            </label>
                            <h3>Gyro Type</h3>
                            <label>
                              Select Gyro Type:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getGyro().tag}
                                onChange={this.setGyroType}
                              >
                                {/* <option value={0}>-Select Jumping Speed-</option> */}
                                {this.props.appGlobals.currentBattleMech.getAvailableGyros().map( (gyroData, gyroIndex) => {
                                  if( gyroData.available ) {
                                    return (
                                      <option key={gyroIndex} value={gyroData.tag}>{gyroData.name}</option>
                                    )
                                  } else {
                                    if( !this.props.appGlobals.currentBattleMech.hideNonAvailableEquipment) {
                                      return (
                                        <option disabled={true} key={gyroIndex} value={gyroData.tag}>{gyroData.name}</option>
                                      )
                                    } else {
                                      return <React.Fragment key={gyroIndex}></React.Fragment>
                                    }
                                  }
                              })}
                              </select>
                            </label>

                            <div className="clear-both overflow-hidden">
                              <hr />
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/step3`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                              <div className="inline-block text-left">
                                <Link to={`${process.env.PUBLIC_URL}/mech-creator/step1`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
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