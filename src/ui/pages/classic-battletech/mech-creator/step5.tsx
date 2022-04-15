import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IEquipmentItem } from '../../../../data/data-interfaces';
import { sortEquipment } from '../../../../utils';
import { IAppGlobals } from '../../../app-router';
import AvailableEquipment from '../../../components/available-equipment';
import InputCheckbox from '../../../components/form_elements/input_checkbox';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import SanitizedHTML from '../../../components/sanitized-html';
import StandardModal from '../../../components/standard-modal';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';

export default class MechCreatorStep5 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
            showAddDialog: false,
        }

        this.props.appGlobals.makeDocumentTitle("Step 5 | 'Mech Creator");
    }

    addEquipment = ( item: IEquipmentItem ): boolean => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.addEquipmentFromTag(
          item.tag,
          this.props.appGlobals.currentBattleMech.getTech().tag,
          "",
          false,
          null,
          undefined,
          undefined,
          undefined,
          undefined,
        );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

        return true;
      }
      return false;
    }

    removeEquipment = ( itemUUID: string | undefined ): boolean => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.removeEquipment(
          itemUUID
        );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

        return true;
      }
      return false;
    }

    setRear = (
      itemUUID: string | undefined,
      isRear: boolean
    ): boolean => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setRear(
          itemUUID,
          isRear,
        );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

        return true;
      }
      return false;
    }

    setWeight = (
      itemUUID: string | undefined,
      weight: number,
    ): boolean => {
      if( this.props.appGlobals.currentBattleMech ) {
        this.props.appGlobals.currentBattleMech.setweight(
          itemUUID,
          weight,
        );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

        return true;
      }
      return false;
    }

    openInstallDialog = (): void => {
      this.setState({
        showAddDialog: true,
      });
    }

    closeInstallDialog = (): void => {
      this.setState({
        showAddDialog: false,
      });
    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <>
            <StandardModal
              show={this.state.showAddDialog}
              onClose={this.closeInstallDialog}
              className="modal-xl"
              title="Installing Equipment"
            >

              <div className="form">
                  <div>
                      <AvailableEquipment
                        appGlobals={this.props.appGlobals}
                        equipment={this.props.appGlobals.currentBattleMech.getAvailableEquipment()}
                        addFunction={this.addEquipment}
                        hideUnavailable={this.props.appGlobals.currentBattleMech.hideNonAvailableEquipment}
                      />
                  </div>
              </div>

            </StandardModal>
            <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>

            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="step5"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <TextSection
                        label="Step 5: Add weapons, ammunition and other equipment"
                      >

                          <button
                            className="btn btn-primary pull-right btn-sm"
                            title="Open the add dialog"
                            onClick={this.openInstallDialog}
                          >
                            <FaPlus />
                          </button>

                          <h3 className="text-center">Installed Equipment</h3>

                          {this.props.appGlobals.currentBattleMech.getInstalledEquipment().length > 0 ? (

                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    {/* <th>Sort</th> */}
                                    <th>Weight</th>
                                    <th>Rear</th>
                                    <th>&nbsp;</th>
                                  </tr>
                                </thead>

                                {this.props.appGlobals.currentBattleMech.getInstalledEquipment().sort( sortEquipment ).map( (item, itemIndex) => {
                                  return (
                                    <tbody key={itemIndex}>
                                    <tr>
                                      <td>
                                        {item.name}
                                      </td>
                                      <td>
                                        {item.minAmmoTons && item.isAmmo && item.minAmmoTons < 1 ? (
                                          <select
                                            value={item.weight}
                                            onChange={( event: React.FormEvent<HTMLSelectElement>) => this.setWeight( item.uuid, +event.currentTarget.value)}
                                            className="width-auto"
                                          >
                                            <option value={.5}>0.5</option>
                                            <option value={1}>1</option>
                                          </select>
                                        ) : (
                                          <>{item.weight}</>
                                        )}
                                        </td>
                                      <td>
                                        <InputCheckbox
                                          label=""
                                          checked={item.rear ? true : false}
                                          onChange={( event: React.FormEvent<HTMLInputElement>) => this.setRear( item.uuid, event.currentTarget.checked)}
                                        />
                                      </td>
                                      <td className="text-right">
                                        <button
                                          className="btn-sm btn btn-danger"
                                          onClick={() => this.removeEquipment( item.uuid )}
                                        >
                                          <FaTrash />
                                        </button>

                                      </td>
                                    </tr>
                                    </tbody>
                                  )
                                })}

                                <tfoot>
                                  <tr>
                                    <th colSpan={5} className="font-weight-normal text-center">
                                      Don't be surprised if you toggle Rear and the item is moved to the bottom of the sorting list.
                                    </th>
                                  </tr>
                                </tfoot>
                              </table>
                          ) : (
                            <>
                            <hr className="clear-both" />
                            <br />
                            <p className="text-center">No equipment has been installed.</p>
                            <p className="text-center">Click the
                            &nbsp;<button
                              className="btn btn-primary btn-xs no-margin"
                              title="Open the add dialog"
                              onClick={this.openInstallDialog}
                            >
                              <FaPlus />
                            </button>&nbsp;
                            to the top left to install equipment.</p>
                            </>
                          )}
                          <div className="clear-both overflow-hidden">
                            <hr />
                            <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step6`} className="btn btn-primary pull-right btn-sm">Next Step <FaArrowCircleRight /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step4`} className="btn btn-primary btn-sm"><FaArrowCircleLeft /> Previous Step</Link>
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
    showAddDialog: boolean;

}