import { faArrowCircleLeft, faArrowCircleRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IEquipmentItem } from '../../../../data/data-interfaces';
import { IAppGlobals } from '../../../app-router';
import AvailableEquipment from '../../../components/available-equipment';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import SanitizedHTML from '../../../components/sanitized-html';
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

      this.props.appGlobals.currentBattleMech.addEquipmentFromTag(
        item.tag,
        this.props.appGlobals.currentBattleMech.getTech().tag,
        "",
        false,
        null,
      );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

      return true;
    }

    removeEquipment = ( itemIndex: number ): boolean => {

      this.props.appGlobals.currentBattleMech.removeEquipment(
        itemIndex
      );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

      return true;
    }

    setRear = ( itemIndex: number, isRear: boolean ): boolean => {

      this.props.appGlobals.currentBattleMech.setRear(
        itemIndex,
        isRear,
      );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

      return true;
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
      return (
        <>
            <Modal
              show={this.state.showAddDialog} onHide={this.closeInstallDialog}
              className="modal-xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                      Installing Equipment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="overflow-scroll-y">
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.closeInstallDialog}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>

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


                          <Button
                            variant="primary"
                            className="pull-right btn-sm"
                            title="Open the add dialog"
                            onClick={this.openInstallDialog}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>

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

                                {this.props.appGlobals.currentBattleMech.getInstalledEquipment().map( (item, itemIndex) => {
                                  return (
                                    <tbody key={itemIndex}>
                                    <tr>
                                      <td>{item.name}</td>
                                      {/* <td>{item.sort}</td> */}
                                      <td>{item.weight}</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={item.rear}
                                          onChange={( event: React.FormEvent<HTMLInputElement>) => this.setRear( itemIndex, event.currentTarget.checked)}
                                        />
                                      </td>
                                      <td className="text-right">
                                        <Button
                                          variant="primary"
                                          className="btn-sm"
                                          onClick={() => this.removeEquipment( itemIndex)}
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </Button>

                                      </td>
                                    </tr>
                                    </tbody>
                                  )
                                })}

                              </table>
                          ) : (
                            <>
                            <hr className="clear-both" />
                            <br />
                            <p className="text-center">No equipment has been installed.</p>
                            <p className="text-center">Click the
                            &nbsp;<Button
                              variant="primary"
                              className="btn-xs no-margin"
                              title="Open the add dialog"
                              onClick={this.openInstallDialog}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>&nbsp;
                            to the top left to install equipment.</p>
                            </>
                          )}
                          <div className="clear-both overflow-hidden">
                            <hr />
                            <Link to={`${process.env.PUBLIC_URL}/mech-creator/step6`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/step4`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
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