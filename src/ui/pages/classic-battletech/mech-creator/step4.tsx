import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { makeRange } from '../../../../utils';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import SanitizedHTML from '../../../components/sanitized-html';
import BipedArmorDiagramSVG from '../../../components/svg/biped-armor-diagram';
import QuadArmorDiagramSVG from '../../../components/svg/quad-armor-diagram-svg';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import './step4.scss';

export default class MechCreatorStep4 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }


        this.props.appGlobals.makeDocumentTitle("Step 4 | 'Mech Creator");
    }



    allocateSanely = (): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.allocateArmorSane();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }


    allocateMax = (): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.allocateArmorMax();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    allocateClear = (): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.allocateArmorClear();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    toggleMirrorArmorAllocations = (): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.toggleMirrorArmorAllocations();
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setArmorLocationValue = ( locationAbbr: string, newValue: number ): void => {
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

    setArmorWeight = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setArmorWeight( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    setArmorType = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setArmorType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }




    render = (): React.ReactFragment => {
      let weightDropDownMax = this.props.appGlobals.currentBattleMech.getRemainingTonnage() + this.props.appGlobals.currentBattleMech.getArmorWeight();
      if( weightDropDownMax < this.props.appGlobals.currentBattleMech.getArmorWeight()) {
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
                  current="step4"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <TextSection
                        label="Step 4: Add armor"
                      >



                          <div className="row">
                            <div className="col-xs-12 col-md-6">
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
                                          return <React.Fragment key={armorIndex}></React.Fragment>
                                        }
                                      }

                                  })}
                                  </select>
                                </label>
                            </div>
                            <div className="col-xs-12 col-md-6">
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
                            </div>
                          </div>

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
                            <div className="row">
                              <div className="col-12 text-center">
                                <label>
                                  <input
                                    type="checkbox"
                                    onChange={this.toggleMirrorArmorAllocations}
                                    checked={this.props.appGlobals.currentBattleMech.mirrorArmorAllocations}
                                  />&nbsp;Mirror Left/Right Allocations
                                </label>
                              </div>
                            </div>
{this.props.appGlobals.currentBattleMech.getType().tag === "biped" ?
(
  <>
  <div className="armor-location-select">

<label className="armor-select-dropdown hd">
    <div className="title">HD</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().head}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "hd", +event.currentTarget.value)}
      title="Change this BattleMech's head armor value"
    >
      {makeRange(0, 9).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown ct">
      <div className="title">CT</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().centerTorso}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ct", +event.currentTarget.value)}

      title="Change this BattleMech's center torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxCenterTorsoArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown lt">
    <div className="title">LT</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftTorso}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "lt", +event.currentTarget.value)}
      title="Change this BattleMech's left torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxLeftTorsoArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rt">
    <div className="title">RT</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightTorso}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rt", +event.currentTarget.value)}
      title="Change this BattleMech's right torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxRightTorsoArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown ctr">
      <div className="title">CT (R)</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().centerTorsoRear}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ctr", +event.currentTarget.value)}

      title="Change this BattleMech's rear center torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxCenterTorsoRearArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown ltr">
    <div className="title">LT (R)</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftTorsoRear}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ltr", +event.currentTarget.value)}
      title="Change this BattleMech's rear left torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxLeftTorsoRearArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rtr">
    <div className="title">RT (R)</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightTorsoRear}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rtr", +event.currentTarget.value)}
      title="Change this BattleMech's rear right torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxRightTorsoRearArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown la">
    <div className="title">LA</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftArm}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "la", +event.currentTarget.value)}
      title="Change this BattleMech's left arm armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().leftArm * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown ra">
    <div className="title">RA</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightArm}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ra", +event.currentTarget.value)}
      title="Change this BattleMech's right arm armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().rightArm * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown ll">
    <div className="title">LL</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftLeg}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ll", +event.currentTarget.value)}
      title="Change this BattleMech's left leg armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().leftLeg * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rl">
    <div className="title">RL</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightLeg}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rl", +event.currentTarget.value)}
      title="Change this BattleMech's right leg armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().rightLeg * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <BipedArmorDiagramSVG
    strokeColor="rgb(100,100,100)"
  />
  <div className="armor-breakdown">
    <strong>Maximum Armor</strong>: {this.props.appGlobals.currentBattleMech.getMaxArmor()}<br />
    <strong>Total Armor</strong>: {this.props.appGlobals.currentBattleMech.getTotalArmor()}<br />
    <strong>Unallocated Armor</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedArmor()}<br />
  </div>
</div>
  </>
) :
(
  <>
    <div className="armor-location-select quad">
    <QuadArmorDiagramSVG
      strokeColor="rgb(100,100,100)"
    />


<label className="armor-select-dropdown hd">
    <div className="title">HD</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().head}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "hd", +event.currentTarget.value)}
      title="Change this BattleMech's head armor value"
    >
      {makeRange(0, 9).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown ct">
      <div className="title">CT</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().centerTorso}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ct", +event.currentTarget.value)}

      title="Change this BattleMech's center torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxCenterTorsoArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown lt">
    <div className="title">LT</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftTorso}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "lt", +event.currentTarget.value)}
      title="Change this BattleMech's left torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxLeftTorsoArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rt">
    <div className="title">RT</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightTorso}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rt", +event.currentTarget.value)}
      title="Change this BattleMech's right torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxRightTorsoArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown ctr">
      <div className="title">CT (R)</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().centerTorsoRear}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ctr", +event.currentTarget.value)}

      title="Change this BattleMech's rear center torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxCenterTorsoRearArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown ltr">
    <div className="title">LT (R)</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftTorsoRear}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ltr", +event.currentTarget.value)}
      title="Change this BattleMech's rear left torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxLeftTorsoRearArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rtr">
    <div className="title">RT (R)</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightTorsoRear}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rtr", +event.currentTarget.value)}
      title="Change this BattleMech's rear right torso armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getMaxRightTorsoRearArmor()).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


  <label className="armor-select-dropdown lfl">
    <div className="title">LFL</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftArm}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "la", +event.currentTarget.value)}
      title="Change this BattleMech's left front leg armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().leftArm * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rfl">
    <div className="title">RFL</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightArm}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ra", +event.currentTarget.value)}
      title="Change this BattleMech's right front leg armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().rightArm * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>


    <label className="armor-select-dropdown lrl">
    <div className="title">LRL</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().leftLeg}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "ll", +event.currentTarget.value)}
      title="Change this BattleMech's left rear leg armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().leftLeg * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>

  <label className="armor-select-dropdown rrl">
    <div className="title">RRL</div>
    <select
      value={this.props.appGlobals.currentBattleMech.getArmorAllocation().rightLeg}
      onChange={(event: React.FormEvent<HTMLSelectElement>) => this.setArmorLocationValue( "rl", +event.currentTarget.value)}
      title="Change this BattleMech's right rear leg armor value"
    >
      {makeRange(0, this.props.appGlobals.currentBattleMech.getInteralStructure().rightLeg * 2).map( (armorValue) => {
        return (
          <option key={armorValue} value={armorValue}>{armorValue}</option>
        )
      })}
    </select>
  </label>
    <div className="armor-breakdown">
      <strong>Maximum Armor</strong>: {this.props.appGlobals.currentBattleMech.getMaxArmor()}<br />
      <strong>Total Armor</strong>: {this.props.appGlobals.currentBattleMech.getTotalArmor()}<br />
      <strong>Unallocated Armor</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedArmor()}<br />
    </div>
    </div>
  </>
)}


                          </fieldset>

                          <div className="clear-both overflow-hidden">
                            <hr />
                            <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step5`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step3`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
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