import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ICriticalSlot } from '../../../../classes/battlemech';
import { ISplitLocation } from '../../../../data/data-interfaces';
import { IAppGlobals } from '../../../app-router';
import CriticalAllocationSection from '../../../components/critical-allocation-section';
import InputCheckbox from '../../../components/form_elements/input_checkbox';
import InputNumeric from '../../../components/form_elements/input_numeric';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import StandardModal from '../../../components/standard-modal';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import UnallocatedEquipmentList from '../../../components/unallocated-equipment-list';
import './home.scss';

export default class MechCreatorStep6 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
            selectionMessageType: "info",
            selectionMessage: "Select an item to allocate",
            selectedItemIndex: -1,
            selectedItemSize: -1,
            selectedItemLocation: "",
            selectedItem: null,
            equipmentCanSplit: false,
            splitItemCount: -1,
            isSplitting: false,
            onSecondClick: false,
            split_criticals: [],
            selectedItemName: "",
        }

        this.props.appGlobals.makeDocumentTitle("Step 6 | 'Mech Creator");
    }

    openSplitDialog = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) e.preventDefault();

      this.setState({
        splitItemCount: 1,
      })
    }

    closeSplitDialog = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) e.preventDefault();

      this.setState({
        splitItemCount: -1,
        isSplitting: false,
      })
    }

    saveSplitDialog = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) e.preventDefault();

      let selectionMessage = "Select a location to place your the first part of " + this.state.selectedItem?.name + " ( " + this.state.splitItemCount + " slots)";
      let selectionMessageType = "warning";

      this.setState({
        isSplitting: true,
        selectionMessage: selectionMessage,
        selectionMessageType: selectionMessageType,
      })
    }

    updateSplitItemCount = (
      e: React.FormEvent<HTMLInputElement>
    ) => {
      if( e && e.preventDefault ) e.preventDefault();

      this.setState({
        splitItemCount: +e.currentTarget.value,
        selectedItemSize: +e.currentTarget.value,
      })
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
      selectedItem: ICriticalSlot | null,
      selectedItemSize: number,
      selectedItemName: string,
    ): void => {


      if( selectedItem ) {
        selectedItemSize = selectedItem.crits;
        selectedItemName = selectedItem.name;
      }
      // console.log("selectItemClick selectedIndex", selectedIndex);
      // console.log("selectItemClick selectedLocation", selectedLocation);
      // console.log("selectItemClick selectedItem.obj.space", selectedItem ? selectedItem.obj.space : null);
      // console.log("selectItemClick selectedItemSize", selectedItemSize);
      // console.log("selectItemClick selectedItemName", selectedItemName);
      let selectionMessageType = "info";
      let selectionMessage = "Select an item to allocate";
      this.setState({
        equipmentCanSplit: false,
      })
      if(
        selectedItem
        // && selectedItem.obj
        // && selectedItem.obj.space
        && selectedLocation === "un"
        // && !this.state.isSplitting
      ) {



        selectionMessage = "Select a location to place your " + selectedItem.name;
        selectionMessageType = "warning";
        // console.log("selectedItem.obj", selectedLocation, selectedItem.obj)
        let equipmentCanSplit = false;
        if( selectedItem && selectedItem.obj && selectedItem.obj.space && selectedItem.obj.space.battlemech >= 8 && selectedLocation === "un")
          equipmentCanSplit = true;
          this.setState({
            equipmentCanSplit: equipmentCanSplit,
            selectionMessage: selectionMessage,
            selectionMessageType: selectionMessageType,
            selectedItemIndex: selectedIndex,
            selectedItemName: selectedItemName,
            selectedItemSize: selectedItemSize,
            selectedItemLocation: selectedLocation,
            selectedItem: selectedItem,
            split_criticals: [],
          })
          return;
        // }
      } else {


          if( this.state.isSplitting && this.state.selectedItem ) {
            let selectedItemSize = 1;
            if( selectedItem && selectedItem.size ) {
              selectedItemSize = selectedItem.size
            }
            // console.log("isSplitting")
            let split_criticals = this.state.split_criticals;
            if( this.state.onSecondClick && this.props.appGlobals.currentBattleMech ) {
              // console.log("onSecondClick")

              split_criticals.push({
                loc: selectedLocation,
                size : this.state.selectedItem.crits - this.state.splitItemCount,
                index: selectedIndex,
              });

              // console.log("split_criticals", split_criticals)

              let wasMoved = this.props.appGlobals.currentBattleMech.moveCritical(
                // this.state.selectedItem.tag,
                // this.state.selectedItem.rear,
                this.state.selectedItemLocation,
                this.state.selectedItemIndex,

                selectedLocation,
                selectedIndex,
                // this.state.splitItemCount > 0 ? -1 : this.state.splitItemCount,
                split_criticals
              );




              if( wasMoved ) {
                // save the mech
                this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
                selectionMessageType = "success";
                selectedItemName = "";
                if( this.state.selectedItem ) {
                  selectionMessage = this.state.selectedItem.name + " was successfully placed!";
                } else {
                  selectionMessage = "Item was successfully placed!";
                }
                setTimeout( () => {
                  this.setState({
                    selectionMessageType: "info",
                    selectionMessage: "Select an item to allocate",
                  })
                },
                1000)
              } else {
                if( this.state.selectedItem ) {
                  selectionMessage = "Cannot place that "  + this.state.selectedItem.name + " there.";
                  selectedItemName = "";
                  selectionMessageType = "danger";
                } else {
                  selectionMessage = "Cannot place that item there";
                  selectedItemName = "";
                  selectionMessageType = "danger";
                }
              }


            selectedIndex = -1;
            selectedLocation = "";
            selectedItemName = "";


              this.setState({
                selectionMessage: selectionMessage,
                selectionMessageType: selectionMessageType,
                selectedItemIndex: selectedIndex,
                selectedItemSize: selectedItemSize,
                selectedItemName: selectedItemName,
                selectedItemLocation: selectedLocation,
                selectedItem: selectedItem,
                isSplitting: false,
                splitItemCount: 0,
                onSecondClick: false,
              })


              return;
            } else {
              // console.log("firstClick clicked")
              if( this.state.selectedItem && this.props.appGlobals.currentBattleMech) {
                split_criticals.push({
                  loc: selectedLocation,
                  size : this.state.splitItemCount,
                  index: selectedIndex,
                });
                let selectionMessage = "Select the location to place the second part of your" + this.state.selectedItem?.name + " ( " + (this.state.selectedItem.crits - this.state.splitItemCount) + " slots)";
                let selectionMessageType = "warning";

                // console.log("firstClick split_criticals", split_criticals)

                this.setState({
                  split_criticals: split_criticals,
                  selectionMessage: selectionMessage,
                  selectedItemSize: this.state.selectedItem.crits - this.state.splitItemCount,
                  selectionMessageType: selectionMessageType,
                  onSecondClick: true,
                })
                return;
              }
            }
          } else {
            // console.log("moving?")
            // try to move item to slot
            if( this.state.selectedItemLocation && this.state.selectedItemIndex > -1 && this.props.appGlobals.currentBattleMech) {
              let wasMoved = this.props.appGlobals.currentBattleMech.moveCritical(
                // this.state.selectedItem.tag,
                // this.state.selectedItem.rear,
                this.state.selectedItemLocation,
                this.state.selectedItemIndex,
                selectedLocation,
                selectedIndex,
                // this.state.splitItemCount > 0 ? -1 : this.state.splitItemCount,
              );

              if( wasMoved ) {
                // save the mech
                selectedItemName = "";
                this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
                selectionMessageType = "success";
                if( this.state.selectedItem ) {
                  selectionMessage = this.state.selectedItem.name + " was successfully placed!";

                } else {
                  selectionMessage = "Item was successfully placed!";
                }
                setTimeout( () => {
                  this.setState({
                    selectionMessageType: "info",
                    selectionMessage: "Select an item to allocate",
                  })
                },
                1000)
              } else {
                if( this.state.selectedItem ) {
                  selectionMessage = "Cannot place that "  + this.state.selectedItem.name + " there.";
                  selectionMessageType = "danger";
                  selectedItemName = "";
                } else {
                  selectionMessage = "Cannot place that item there";
                  selectedItemName = "";
                  selectionMessageType = "danger";
                }
              }

              selectedIndex = -1;
              selectedLocation = "";
            } else {
              this.setState({
                selectedItemLocation: selectedLocation,
                selectedItemIndex: selectedIndex,
                selectedItemName: selectedItemName,
                selectionMessage: "Select the location to move your " + selectedItem?.name,
                selectionMessageType: "warning",
                selectedItem: selectedItem,
                selectedItemSize: selectedItem ? selectedItem.crits : 1,
                isSplitting: false,
              })
              return;
            }


          }
        }
        this.setState({
          selectionMessage: selectionMessage,
          selectionMessageType: selectionMessageType,
          selectedItemIndex: selectedIndex,
          selectedItemName: selectedItemName,
          selectedItemSize: selectedItem ? selectedItem.crits : 1,
          selectedItemLocation: selectedLocation,
          selectedItem: selectedItem,
          isSplitting: false,
        })

    }

    render = (): React.Element => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <>
{this.state.splitItemCount > 0 && !this.state.isSplitting ? (
  <StandardModal
    show={true}
    onClose={this.closeSplitDialog}
    onSave={this.saveSplitDialog}
    title={"Splitting Criticals For " + this.state.selectedItem?.name}
  >
    <InputNumeric
      label="First Count of Criticals"
      step={1}
      min={1}
      max={this.state.selectedItem ? this.state.selectedItem.crits - 1 : 99}
      value={this.state.splitItemCount}
      onChange={this.updateSplitItemCount}
    />
  </StandardModal>
) : null }
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
                          {this.state.selectionMessageType ? (
                            <div className={"alert alert-" + this.state.selectionMessageType + " text-center"}>
                              {this.state.selectionMessage}
                            </div>
                          ) : (
                          <p className="text-center no-margin"><strong>
                            {this.state.selectionMessage}
                          </strong></p>
                          )}
                          {this.state.equipmentCanSplit ? (
                            <div className="text-center">
                              <button
                                className="btn btn-primary"
                                onClick={this.openSplitDialog}
                              >
                                Split Into Two Locations
                              </button>
                            </div>
                          ) : null}

                          <div className="row">
                            <div className="col-lg-3">
                              <fieldset className="fieldset">
                                <legend>Unallocated</legend>
                                {this.props.appGlobals.currentBattleMech.unallocatedCriticals.length > 0 ? (
                                  <>
                                  {/* {this.state.selectedItemIndex}<br />
                                  {this.state.selectedItemLocation}<br /> */}
                                  {/* {this.props.appGlobals.currentBattleMech.unallocatedCriticals.length} */}
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
                                      <InputCheckbox
                                        checked={this.props.appGlobals.currentBattleMech.hasLowerArmActuator("la")}
                                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleLowerArmActuator("la") }
                                        label="Lower Arm Actuator"
                                      />

                                      <InputCheckbox
                                        checked={this.props.appGlobals.currentBattleMech.hasHandActuator("la")}
                                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleHandActuator("la") }
                                        label="Hand Actuator"
                                      />

                                      </>
                                    )}
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      mech={this.props.appGlobals.currentBattleMech}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.leftArm}
                                      sectionAbbr="la"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
                                    />
                                    <h4 className="text-center">Left Torso</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      mech={this.props.appGlobals.currentBattleMech}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.leftTorso}
                                      sectionAbbr="lt"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
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
                                      mech={this.props.appGlobals.currentBattleMech}
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
                                    />
                                  </div>
                                  <div className="col-4">
                                    <h4 className="text-center">Head</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      mech={this.props.appGlobals.currentBattleMech}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.head}
                                      sectionAbbr="hd"
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
                                    />

                                    <h4 className="text-center">Center Torso</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.centerTorso}
                                      sectionAbbr="ct"
                                      mech={this.props.appGlobals.currentBattleMech}
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
                                    />
                                  </div>
                                  <div className="col-4">
                                  {this.props.appGlobals.currentBattleMech.getType().tag === "quad" ? (
                                      <h4 className="text-center">Right Front Leg</h4>
                                    ) : (
                                      <>
                                      <h4 className="text-center">Right Arm</h4>
                                      <InputCheckbox
                                        checked={this.props.appGlobals.currentBattleMech.hasLowerArmActuator("ra")}
                                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleLowerArmActuator("ra") }
                                        label="Lower Arm Actuator"
                                      />

                                      <InputCheckbox
                                        checked={this.props.appGlobals.currentBattleMech.hasHandActuator("ra")}
                                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.toggleHandActuator("ra") }
                                        label="Hand Actuator"
                                      />
                                      </>
                                    )}
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.rightArm}
                                      sectionAbbr="ra"
                                      mech={this.props.appGlobals.currentBattleMech}
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
                                    />
                                    <h4 className="text-center">Right Torso</h4>
                                    <CriticalAllocationSection
                                      appGlobals={this.props.appGlobals}
                                      crits={this.props.appGlobals.currentBattleMech.criticals.rightTorso}
                                      sectionAbbr="rt"
                                      mech={this.props.appGlobals.currentBattleMech}
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
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
                                      mech={this.props.appGlobals.currentBattleMech}
                                      selectItemClick={this.selectItemClick}
                                      currentSelectedIndex={this.state.selectedItemIndex}
                                      currentSelectedLocation={this.state.selectedItemLocation}
                                      currentSelectedItemSize={this.state.selectedItemSize}
                                      currentSelectedItemName={this.state.selectedItemName}
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
    selectedItemSize: number;
    selectionMessageType: string,
    selectedItem: ICriticalSlot | null;
    equipmentCanSplit: boolean;
    splitItemCount: number;
    isSplitting: boolean;
    onSecondClick: boolean;
    split_criticals: ISplitLocation[];
    selectedItemName: string;
}