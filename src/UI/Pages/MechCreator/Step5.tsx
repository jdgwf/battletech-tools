import React from 'react';
import './Home.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import MechCreatorStatusbar from '../../Components/MechCreatorStatusBar';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import AvailableEquipment from '../../Components/AvailableEquipment';
import { IEquipmentItem } from '../../../Data/dataInterfaces';

export default class MechCreatorStep5 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
            showAddDialog: false,
        }

        this.openInstallDialog = this.openInstallDialog.bind(this);
        this.addEquipment = this.addEquipment.bind(this);
        this.closeInstallDialog = this.closeInstallDialog.bind(this);

        this.removeEquipment = this.removeEquipment.bind(this);
        this.setRear = this.setRear.bind(this);
    }

    addEquipment( item: IEquipmentItem ): boolean {

      this.props.appGlobals.currentBattleMech.addEquipmentFromTag(
        item.tag,
        this.props.appGlobals.currentBattleMech.getTech().tag,
        "",
        false,
      );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

      return true;
    }

    removeEquipment( itemIndex: number ): boolean {

      this.props.appGlobals.currentBattleMech.removeEquipment(
        itemIndex
      );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

      return true;
    }

    setRear( itemIndex: number, isRear: boolean ): boolean {

      this.props.appGlobals.currentBattleMech.setRear(
        itemIndex,
        isRear,
      );
      this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );

      return true;
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Step 5 | 'Mech Creator");
    }

    openInstallDialog() {
      this.setState({
        showAddDialog: true,
      });
    }

    closeInstallDialog() {
      this.setState({
        showAddDialog: false,
      });
    }

    render() {
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
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="mech-creator" sub="home" appGlobals={this.props.appGlobals}  />
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
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
                      <div className="text-section">
                        <h2>Step 5: Add weapons, ammunition and other equipment</h2>
                        <div className="section-content">
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
                                    <th>Weight</th>
                                    <th>Rear</th>
                                    <th>&nbsp;</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {this.props.appGlobals.currentBattleMech.getInstalledEquipment().map( (item, itemIndex) => {
                                  return (
                                    <tr key={itemIndex}>
                                      <td>{item.name}</td>
                                      <td>{item.weight}</td>
                                      <td>
                                        <input
                                          type="checkbox"
                                          checked={item.rear}
                                          onChange={( event: React.FormEvent<HTMLInputElement>) => this.setRear( itemIndex, event.currentTarget.checked)}
                                        />
                                      </td>
                                      <td>
                                        <Button
                                          variant="primary"
                                          className="btn-sm"
                                          onClick={() => this.removeEquipment( itemIndex)}
                                        >
                                          <FontAwesomeIcon icon={faTrash} />
                                        </Button>

                                      </td>
                                    </tr>
                                  )
                                })}
                                </tbody>
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
                            <div className="text-left">
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/step4`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
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