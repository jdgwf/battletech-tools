import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import MechCreatorSideMenu from '../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../components/mech-creator-status-bar';
import SanitizedHTML from '../../components/sanitized-html';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';
import './home.scss';

export default class MechCreatorStep2 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Step 2 | 'Mech Creator");
    }



    setWalkingMP = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setWalkSpeed( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setJumpingMP = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setJumpSpeed( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setEngineType = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setEngineType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setGyroType = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setGyroType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
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
                      <TextSection
                        label="Step 2: Install engine and control systems"
                      >



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