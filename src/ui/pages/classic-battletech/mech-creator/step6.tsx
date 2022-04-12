import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ICriticalSlot } from '../../../../classes/battlemech';
import { IAppGlobals } from '../../../app-router';
import CriticalAllocationSection from '../../../components/critical-allocation-section';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import UnallocatedEquipmentList from '../../../components/unallocated-equipment-list';
import './home.scss';

export default class MechCreatorStep6 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
            selectedMessageType: "info",
            selectionMessage: "Select an item to allocate",
            selectedItemIndex: -1,
            selectedItemLocation: "",
            selectedItem: null,
        }

        this.props.appGlobals.makeDocumentTitle("Step 6 | 'Mech Creator");
    }

    toggleLowerArmActuator = ( loc: string ): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.toggleLowerArmActuator( loc );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    toggleHandActuator = ( loc: string ): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.toggleHandActuator( loc );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
      }
    }

    resetAllocations = (): void => {
      this.props.appGlobals.openConfirmDialog(
        "Confirmation",
        "Are you sure you want to clear out all your critical allocations?",
        "Yes",
        "No",
        () => {
          if( this.props.appGlobals.currentBattleMech ) {
            this.props.appGlobals.currentBattleMech.clearCriticalAllocationTable();
            this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
          }
        }
      )

    }

    selectItemClick = (
      selectedIndex: number,
      selectedLocation: string,
      selectedItem: ICriticalSlot | null
    ): void => {
      let selectedMessageType = "info";
      let selectedMessage = "Select an item to allocate";
      if( selectedItem ) {
        selectedMessage = "Select a location to place your " + selectedItem.name;
        selectedMessageType = "warning";
      } else {

        // try to move item to slot
        if( this.state.selectedItem && this.props.appGlobals.currentBattleMech) {
          let wasMoved = this.props.appGlobals.currentBattleMech.moveCritical(
            // this.state.selectedItem.tag,
            // this.state.selectedItem.rear,
            this.state.selectedItemLocation,
            this.state.selectedItemIndex,
            selectedLocation,
            selectedIndex,
          );

          if( wasMoved ) {
            // save the mech
            this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
            selectedMessageType = "success";
            if( this.state.selectedItem ) {
              selectedMessage = this.state.selectedItem.name + " was successfully placed!";
            } else {
              selectedMessage = "Item was successfully placed!";
            }
            setTimeout( () => {
              this.setState({
                selectedMessageType: "info",
                selectionMessage: "Select an item to allocate",
              })
            },
            1000)
          } else {
            if( this.state.selectedItem ) {
              selectedMessage = "Cannot place that "  + this.state.selectedItem.name + " there.";
              selectedMessageType = "danger";
            } else {
              selectedMessage = "Cannot place that item there";
              selectedMessageType = "danger";
            }
          }
        }

        selectedIndex = -1;
        selectedLocation = "";
      }
      this.setState({
        selectionMessage: selectedMessage,
        selectedMessageType: selectedMessageType,
        selectedItemIndex: selectedIndex,
        selectedItemLocation: selectedLocation,
        selectedItem: selectedItem,
      })
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
                  current="step6"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12">
                      <TextSection
                        label="Step 6: Complete the record sheet"
                      >

                          <fieldset className="fieldset">
                            <legend>Instructions</legend>
                            <p>To assign equipment to your critical allocation table, just click on an assignable item then click on an unallocated location.</p>
                          </fieldset>
                          <br />
                          {this.state.selectedMessageType ? (
                            <div className={"alert alert-" + this.state.selectedMessageType + " text-center"}>
                              {this.state.selectionMessage}
                            </div>
                          ) : (
                          <p className="text-center no-margin"><strong>
                            {this.state.selectionMessage}
                          </strong></p>
                          )}

                          <div className="row">
                            <div className="col-lg-3">
                              <fieldset className="fieldset">
                                <legend>Unallocated</legend>
                                {this.props.appGlobals.currentBattleMech.unallocatedCriticals.length > 0 ? (
                                  <>
                                    <UnallocatedEquipmentList
                                        crits={this.props.appGlobals.currentBattleMech.unallocatedCriticals}
                                        appGlobals={this.props.appGlobals}
                                        selectItemClick={this.selectItemClick}
                                        currentSelectedIndex={this.state.selectedItemIndex}
                                        currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                </>
                                ) : (
                                  <>
                                  <p className="text-center">Huzzah! All equipment has been allocated!</p>
                                  </>
                                )}

                                <button
                                  className="btn btn-primary full-width"
                                  onClick={this.resetAllocations}
                                >
                                  Reset Allocations
                                </button>
                              </fieldset>
                            </div>
                            <div className="col-lg-9">
                              <fieldset className="fieldset">
                                <legend>Critical Table</legend>
                                <div className="row">
                                  <div className="col-4">
                                    {this.props.appGlobals.currentBattleMech.getType().tag === "quad" ? (
                                      <h4 className="text-center">Left Front Leg</h4>
                                    ) : (
                                      <>
                                      <h4 className="text-center">Left Arm</h4>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={this.props.appGlobals.currentBattleMech.hasLowerArmActuator("la")}
                                          onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleLowerArmActuator("la") }
                                        />&nbsp;Lower Arm Actuator
                                      </label>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={this.props.appGlobals.currentBattleMech.hasHandActuator("la")}
                                          onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleHandActuator("la") }
                                        />&nbsp;Hand Actuator
                                      </label>

                                      </>
                                    )}
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.leftArm}
                                      sectionAbbr="la"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                    <h4 className="text-center">Left Torso</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.leftTorso}
                                      sectionAbbr="lt"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                    {this.props.appGlobals.currentBattleMech.getType().tag === "quad" ? (
                                      <h4 className="text-center">Left Rear Leg</h4>
                                    ) : (
                                      <h4 className="text-center">Left Leg</h4>
                                    )}

                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.leftLeg}
                                      sectionAbbr="ll"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                  </div>
                                  <div className="col-4">
                                    <h4 className="text-center">Head</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.head}
                                      sectionAbbr="hd"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />

                                    <h4 className="text-center">Center Torso</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.centerTorso}
                                      sectionAbbr="ct"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                  </div>
                                  <div className="col-4">
                                  {this.props.appGlobals.currentBattleMech.getType().tag === "quad" ? (
                                      <h4 className="text-center">Right Front Leg</h4>
                                    ) : (
                                      <>
                                      <h4 className="text-center">Right Arm</h4>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={this.props.appGlobals.currentBattleMech.hasLowerArmActuator("ra")}
                                          onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleLowerArmActuator("ra") }
                                        />&nbsp;Lower Arm Actuator
                                      </label>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={this.props.appGlobals.currentBattleMech.hasHandActuator("ra")}
                                          onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleHandActuator("ra") }
                                        />&nbsp;Hand Actuator
                                      </label>
                                      </>
                                    )}
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.rightArm}
                                      sectionAbbr="ra"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                    <h4 className="text-center">Right Torso</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.rightTorso}
                                      sectionAbbr="rt"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                    {this.props.appGlobals.currentBattleMech.getType().tag === "quad" ? (
                                      <h4 className="text-center">Right Rear Leg</h4>
                                    ) : (
                                      <h4 className="text-center">Right Leg</h4>
                                    )}

                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.rightLeg}
                                      sectionAbbr="rl"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                    />
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </div>

                        <div className="clear-both overflow-hidden">
                          <hr />
                          <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/summary`} className="btn btn-primary pull-right btn-sm">Summary <FaArrowCircleRight /></Link>
                          <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step5`} className="btn btn-primary btn-sm"><FaArrowCircleLeft /> Previous Step</Link>
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
    selectionMessage: string;
    selectedItemLocation: string;
    selectedItemIndex: number;
    selectedMessageType: string,
    selectedItem: ICriticalSlot | null;
}