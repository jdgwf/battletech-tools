import React from 'react';
import './Home.scss';
import './Step4.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import BattlmechDiagramSVG from '../../Components/BattlmechDiagramSVG';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import MechCreatorStatusbar from '../../Components/MechCreatorStatusBar';
import { makeRange } from '../../../utils';
import { Button } from 'react-bootstrap';

export default class MechCreatorStep4 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }
        this.setArmorWeight = this.setArmorWeight.bind(this);
        this.setArmorType = this.setArmorType.bind(this);

        this.setArmorLocationValue = this.setArmorLocationValue.bind(this);

        this.allocateSanely = this.allocateSanely.bind(this);
        this.allocateMax = this.allocateMax.bind(this);
        this.allocateClear = this.allocateClear.bind(this);
    }

    allocateSanely() {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.allocateArmorSane();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }


    allocateMax() {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.allocateArmorMax();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    allocateClear() {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.allocateArmorClear();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setArmorLocationValue( locationAbbr: string, newValue: number ) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      switch( locationAbbr.toLowerCase().trim() ) {
        case "hd": {
          currentMech.setHeadArmor( newValue);
          break;
        }
        case "lt": {
          currentMech.setLeftTorsoArmor( newValue);
          break;
        }
        case "ct": {
          currentMech.setCenterTorsoArmor( newValue);
          break;
        }
        case "rt": {
          currentMech.setRightTorsoArmor( newValue);
          break;
        }

        case "ltr": {
          currentMech.setLeftTorsoRearArmor( newValue);
          break;
        }
        case "ctr": {
          currentMech.setCenterTorsoRearArmor( newValue);
          break;
        }
        case "rtr": {
          currentMech.setRightTorsoRearArmor( newValue);
          break;
        }

        case "la": {
          currentMech.setLeftArmArmor( newValue);
          break;
        }
        case "ra": {
          currentMech.setRightArmArmor( newValue);
          break;
        }

        case "ll": {
          currentMech.setLeftLegArmor( newValue);
          break;
        }

        case "rl": {
          currentMech.setRightLegArmor( newValue);
          break;
        }
      }

      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setArmorWeight( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setArmorWeight( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setArmorType( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setArmorType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }


    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Step 4 | 'Mech Creator");
    }

    render() {
      let weightDropDownMax = this.props.appGlobals.currentBattleMech.getRemainingTonnage() + this.props.appGlobals.currentBattleMech.getArmorWeight();
      if( weightDropDownMax < this.props.appGlobals.currentBattleMech.getArmorWeight()) {
        weightDropDownMax = this.props.appGlobals.currentBattleMech.getArmorWeight()
      }
      return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="mech-creator" sub="home" appGlobals={this.props.appGlobals}  />
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="step4"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="text-section">
                        <h2>Step 4: Add armor</h2>
                        <div className="section-content">

                        <label>
                              Armor Type:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getArmorType()}
                                onChange={this.setArmorType}
                              >
                                {/* <option value={0}>-Select Jumping Speed-</option> */}
                                {this.props.appGlobals.currentBattleMech.getAvailableArmorTypes().map( (armorData, armorIndex) => {
                                  if( armorData.available ) {
                                    return (
                                      <option key={armorIndex} value={armorData.tag}>{armorData.name}</option>
                                    )
                                  } else {
                                    if( !this.props.appGlobals.currentBattleMech.hideNonAvailableEquipment) {
                                      return (
                                        <option disabled={true} key={armorIndex} value={armorData.tag}>{armorData.name}</option>
                                      )
                                    } else {
                                      return <></>
                                    }
                                  }
                              })}
                              </select>
                            </label>

                            <label>
                              Armor Weight:
                              <select
                                value={this.props.appGlobals.currentBattleMech.getArmorWeight()}
                                onChange={this.setArmorWeight}
                              >
                                <option value={0}>None</option>
                                {makeRange(1, weightDropDownMax, .5).map( (option) => {
                                return (
                                  <option key={option} value={option}>{option}</option>
                                )
                              })}
                              </select>
                            </label>

                          STILL WIP: Armor Allocation Diagram
                          <fieldset className="fieldset">
                            <legend>Armor Allocation</legend>
                            <div className="row">
                              <div className="col-4">
                                <Button
                                  className="display-block full-width btn-sm"
                                  variant="primary"
                                  onClick={this.allocateClear}
                                >
                                  Clear Armor
                                </Button>
                              </div>
                              <div className="col-4">
                              <Button
                                  className="display-block full-width btn-sm"
                                  variant="primary"
                                  onClick={this.allocateSanely}
                              >
                                  Best Guess
                                </Button>
                              </div>
                              <div className="col-4">
                              <Button
                                  className="display-block full-width btn-sm"
                                  variant="primary"
                                  onClick={this.allocateMax}
                              >
                                  Allocate Max
                              </Button>
                              </div>
                            </div>

                            <div className="armor-location-select">

                            <div className="armor-select-dropdown hd">
                                <div className="title">HD</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().head}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "hd", +event.currentTarget.value)}
                                  title="Change this 'mech's head armor value"
                                >
                                  {makeRange(0, 9).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="armor-select-dropdown ct">
                                  <div className="title">CT</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().centerTorso}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ct", +event.currentTarget.value)}

                                  title="Change this 'mech's center torso armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxCenterTorsoArmor()).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>


                              <div className="armor-select-dropdown lt">
                                <div className="title">LT</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftTorso}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "lt", +event.currentTarget.value)}
                                  title="Change this 'mech's left torso armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxLeftTorsoArmor()).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="armor-select-dropdown rt">
                                <div className="title">RT</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightTorso}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rt", +event.currentTarget.value)}
                                  title="Change this 'mech's left torso armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxRightTorsoArmor()).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>


                              <div className="armor-select-dropdown ctr">
                                  <div className="title">CT (R)</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().centerTorsoRear}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ctr", +event.currentTarget.value)}

                                  title="Change this 'mech's center torso armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxCenterTorsoRearArmor()).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>


                              <div className="armor-select-dropdown ltr">
                                <div className="title">LT (R)</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftTorsoRear}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ltr", +event.currentTarget.value)}
                                  title="Change this 'mech's left torso armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxLeftTorsoRearArmor()).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="armor-select-dropdown rtr">
                                <div className="title">RT (R)</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightTorsoRear}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rtr", +event.currentTarget.value)}
                                  title="Change this 'mech's left torso armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxRightTorsoRearArmor()).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>


                              <div className="armor-select-dropdown la">
                                <div className="title">LA</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftArm}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "la", +event.currentTarget.value)}
                                  title="Change this 'mech's left Arm armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().leftArm * 2).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="armor-select-dropdown ra">
                                <div className="title">RA</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightArm}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ra", +event.currentTarget.value)}
                                  title="Change this 'mech's left Arm armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().rightArm * 2).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="armor-select-dropdown ll">
                                <div className="title">LL</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftArm}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ll", +event.currentTarget.value)}
                                  title="Change this 'mech's left Leg armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().leftArm * 2).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <div className="armor-select-dropdown rl">
                                <div className="title">RL</div>
                                <select
                                  value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightArm}
                                  onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rl", +event.currentTarget.value)}
                                  title="Change this 'mech's left Leg armor value"
                                >
                                  {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().rightArm * 2).map( (armorValue) => {
                                    return (
                                      <option key={armorValue} value={armorValue}>{armorValue}</option>
                                    )
                                  })}
                                </select>
                              </div>

                              <BattlmechDiagramSVG
                                strokeColor="rgb(100,100,100)"
                              />
                              <div className="armor-breakdown">
                                <strong>Maximum Armor</strong>: {this.props.appGlobals.currentBattleMech.getMaxArmor()}<br />
                                <strong>Total Armor</strong>: {this.props.appGlobals.currentBattleMech.getTotalArmor()}<br />
                                <strong>Unallocated Armor</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedArmor()}<br />
                              </div>
                            </div>

                          </fieldset>

                          <div className="clear-both overflow-hidden">
                            <hr />
                            <Link to={`${process.env.PUBLIC_URL}/mech-creator/step5`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                            <div className="text-left">
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/step3`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
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