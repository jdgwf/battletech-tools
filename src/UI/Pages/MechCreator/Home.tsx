import React from 'react';
import './Home.scss';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faFile, faFolderOpen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import MechCreatorStatusbar from '../../Components/MechCreatorStatusBar';
import UIPage from '../../Components/UIPage';
import { BattleMech } from '../../../Classes/BattleMech';

export default class MechCreatorHome extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }


    saveAsNew = (e: React.FormEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      let battleMechSaves = this.props.appGlobals.battleMechSaves;
      if( !battleMechSaves )
        battleMechSaves = [];
      battleMechSaves.push(
        this.props.appGlobals.currentBattleMech.export()
      )
      this.props.appGlobals.saveBattleMechSaves( battleMechSaves );
    }

    deleteSave = (e: React.FormEvent<HTMLButtonElement>, saveIndex: number): void => {
      e.preventDefault();
      if( this.props.appGlobals.battleMechSaves.length > saveIndex) {
        this.props.appGlobals.openConfirmDialog(
          "Deletion Confirmation",
          "Aer you sure you want to delete the 'mech \"" + this.props.appGlobals.battleMechSaves[saveIndex].name + '\"?',
          "Yes",
          "No, thank you",
          () => {
            let battleMechSaves = this.props.appGlobals.battleMechSaves;
            if( !battleMechSaves )
              battleMechSaves = [];
            battleMechSaves.splice( saveIndex, 1)
            this.props.appGlobals.saveBattleMechSaves( battleMechSaves );
          }
        )
      }
    }

    saveOver = (e: React.FormEvent<HTMLButtonElement>, saveIndex: number): void => {
      e.preventDefault();
      if( this.props.appGlobals.battleMechSaves.length > saveIndex) {
        this.props.appGlobals.openConfirmDialog(
          "Deletion Confirmation",
          "Aer you sure you want to save the currently loaded 'mech over the saved 'mech \"" + this.props.appGlobals.battleMechSaves[saveIndex].name + '\"?',
          "Yes",
          "No, thank you",
          () => {
            let battleMechSaves = this.props.appGlobals.battleMechSaves;
            if( !battleMechSaves )
              battleMechSaves = [];
            battleMechSaves[saveIndex] = this.props.appGlobals.currentBattleMech.export()
            this.props.appGlobals.saveBattleMechSaves( battleMechSaves );
          }
        )
      }
    }

    startNew = (e: React.FormEvent<HTMLButtonElement>): void => {
      e.preventDefault();

      let currentBattleMech = new BattleMech();
      this.props.appGlobals.saveCurrentBattleMech( currentBattleMech )
    }

    loadSave = (e: React.FormEvent<HTMLButtonElement>, saveIndex: number): void => {
      e.preventDefault();
      if( this.props.appGlobals.battleMechSaves.length > saveIndex) {
        let currentBattleMech = this.props.appGlobals.currentBattleMech;

        currentBattleMech = new BattleMech();
        currentBattleMech.import(this.props.appGlobals.battleMechSaves[saveIndex] )
        this.props.appGlobals.saveCurrentBattleMech( currentBattleMech )

      }
    }

    render() {
      return (
        <>
          <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="home"
                />              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="text-section">
                        <h2>Welcome</h2>
                        <div className="section-content">
                          <p>Welcome to a BattleTech 'mech builder.</p>

                          <p>This tool attempts to closely follow the steps in the BattleTech TechManual and the steps in that book should be referenced during 'mech creation</p>

                          <div className="clear-both overflow-hidden">
                            <hr />
                              <button
                                className="btn btn-primary pull-left btn-sm"
                                onClick={this.startNew}
                                title="Click here to clear out your current 'mech and start over."
                              >
                                <FontAwesomeIcon icon={faFile} />&nbsp;Start Over
                              </button>
                              <Link
                                to={`${process.env.PUBLIC_URL}/mech-creator/step1`}
                                className="btn btn-primary pull-right btn-sm">
                                  Next Step <FontAwesomeIcon icon={faArrowCircleRight} />
                              </Link>
                          </div>
                        </div>
                      </div>

                      <div className="text-section">
                  <h2>
                    <button
                      className="btn btn-primary btn-sm pull-right"
                      title="Click here to save a a new 'mech row"
                      onClick={this.saveAsNew}
                    >
                      <FontAwesomeIcon icon={faSave} />&nbsp;Save as New
                    </button>
                    Your Saved 'Mechs
                  </h2>
                  <div className="section-content">
                    <table className="table">
                      <thead>
                        <tr>
                          <th title="This is the 'mech's name">Name</th>
                          <th title="This is the technology the mech is based on">Tech</th>
                          <th title="This is the tonnage">Tons</th>
                          <th title="This is the current battle value for the 'mech">BV</th>
                          <th title="This is the Alpha Strike Value">ASV</th>
                          <th className="no-wrap" title="This is the C-Bill cost">C-Bills</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.props.appGlobals.battleMechSaves && this.props.appGlobals.battleMechSaves.length > 0 ? (
                        <>
                        {this.props.appGlobals.battleMechSaves.map( (mech, mechIndex) => {
                          return (
                            <tr key={mechIndex}>
                              <td>{mech.name}</td>
                              <td>{mech.tech}</td>
                              <td className="min-width">{mech.tonnage}</td>
                              <td className="min-width">{mech.battle_value}</td>
                              <td className="min-width">{mech.as_value}</td>
                              <td className="min-width">{mech.c_bills}</td>
                              <td className="text-right">
                                <button
                                  className="btn btn-sm btn-primary"
                                  type="button"
                                  title={"Click here to load " + mech.name + " into the editor"}

                                >
                                  <FontAwesomeIcon icon={faFolderOpen} />
                                </button>
                                <button
                                  className="btn btn-sm btn-primary"
                                  type="button"
                                  title={"Click here to save the currently loadoed over " + mech.name + ". You'll be prompted for confirmation."}
                                  onClick={ (e) => this.saveOver( e, mechIndex)}
                                >
                                  <FontAwesomeIcon icon={faSave} />
                                </button>
                                <button
                                  className="btn btn-sm btn-primary"
                                  type="button"
                                  title={"Click here to delete " + mech.name + " from this list. You'll be prompted for a confirmation."}
                                  onClick={ (e) => this.deleteSave( e, mechIndex)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                        </>
                      ) : (
                        <tr>
                          <td className="text-center" colSpan={7}>
                            You have no saves.
                          </td>
                        </tr>
                      )}
                      </tbody>
                    </table>
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