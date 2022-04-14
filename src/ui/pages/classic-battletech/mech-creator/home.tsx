import React from 'react';
import { FaArrowCircleRight, FaFile, FaFileExport, FaFolderOpen, FaSave, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BattleMech, IBattleMechExport } from '../../../../classes/battlemech';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import SanitizedHTML from '../../../components/sanitized-html';
import StandardModal from '../../../components/standard-modal';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';

export default class MechCreatorHome extends React.Component<IHomeProps, IHomeState> {
    fileReader: FileReader | null = null;

    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,

        }

        this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }

    handleFileRead = (e: any) => {
      if( this.fileReader ) {
        let content = this.fileReader.result;

        // console.log("content", content)
        try {
          if( content ) {
            let data: IBattleMechExport[] = JSON.parse( content.toString() )

            let btData = this.props.appGlobals.battleMechSaves;
            for( let item of data ) {
              btData.push( item );
            }

            this.props.appGlobals.saveBattleMechSaves( btData );
          }
        }
        catch {

        }
      }
    }

    selectFile = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
      e.preventDefault();
      if( e.currentTarget.files && e.currentTarget.files.length > 0 ) {
        let foundFile = e.currentTarget.files[0];
        // console.log( "test", foundFIle );
        if( foundFile.type === "application/json" ) {
          this.fileReader = new FileReader();
          this.fileReader.onloadend = this.handleFileRead;
          this.fileReader.readAsText( foundFile );
        }

      }
    }

    saveAsNew = (e: React.FormEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      if( this.props.appGlobals.currentBattleMech ){
      let battleMechSaves = this.props.appGlobals.battleMechSaves;
      if( !battleMechSaves )
        battleMechSaves = [];
      battleMechSaves.push(
        this.props.appGlobals.currentBattleMech.export(true)
      )
      this.props.appGlobals.saveBattleMechSaves( battleMechSaves );
      }
    }

    deleteSave = (e: React.FormEvent<HTMLButtonElement>, saveIndex: number): void => {
      e.preventDefault();
      if( this.props.appGlobals.battleMechSaves.length > saveIndex) {
        this.props.appGlobals.openConfirmDialog(
          "Deletion Confirmation",
          "Aer you sure you want to delete the 'mech \"" + this.props.appGlobals.battleMechSaves[saveIndex].name + "\"?",
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
      if( this.props.appGlobals.currentBattleMech && this.props.appGlobals.battleMechSaves.length > saveIndex) {
        this.props.appGlobals.openConfirmDialog(
          "Deletion Confirmation",
          "Aer you sure you want to save the currently loaded 'mech over the saved 'mech \"" + this.props.appGlobals.battleMechSaves[saveIndex].name + "\"?",
          "Yes",
          "No, thank you",
          () => {
            if( this.props.appGlobals.currentBattleMech ){
              let battleMechSaves = this.props.appGlobals.battleMechSaves;
              if( !battleMechSaves )
                battleMechSaves = [];
              battleMechSaves[saveIndex] = this.props.appGlobals.currentBattleMech.export()
              this.props.appGlobals.saveBattleMechSaves( battleMechSaves );
            }
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
        currentBattleMech.import( this.props.appGlobals.battleMechSaves[saveIndex] )
        this.props.appGlobals.saveCurrentBattleMech( currentBattleMech )

      }
    }


    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentBattleMech) {
        return <></>;
      }
      return (
        <>
          <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>

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
                      <TextSection
                        label="Welcome"
                      >

                          <p>Welcome to the BattleTech 'mech builder.</p>

                          <p>This tool attempts to <em>closely</em> follow the steps in the BattleTech TechManual and the steps in that book should be referenced during 'mech creation</p>

                          <div className="clear-both overflow-hidden">
                            <hr />
                              <button
                                className="btn btn-primary pull-left btn-sm"
                                onClick={this.startNew}
                                title="Click here to clear out your current 'mech and start over."
                              >
                                <FaFile />&nbsp;Start Over
                              </button>
                              <Link
                                to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step1`}
                                className="btn btn-primary pull-right btn-sm">
                                  Next Step <FaArrowCircleRight />
                              </Link>
                          </div>
                    </TextSection>

<TextSection
  label={"Your Saved 'Mechs"}
  labelButton={<button
    className="btn btn-primary btn-sm pull-right"
    title="Click here to save a a new 'mech row"
    onClick={this.saveAsNew}
  >
    <FaSave />&nbsp;Save as New
  </button>}
>

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

                      {this.props.appGlobals.battleMechSaves && this.props.appGlobals.battleMechSaves.length > 0 ? (
                        <>
                        {this.props.appGlobals.battleMechSaves.map( (mech, mechIndex) => {
                          return (
                            <tbody key={mechIndex}>
                            <tr>
                              <td title={"UUD: " + mech.uuid}>{mech.model ? mech.model : mech.name}</td>
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
                                  onClick={ (e) => this.loadSave( e, mechIndex)}
                                >
                                  <FaFolderOpen />
                                </button>
                                <button
                                  className="btn btn-sm btn-primary"
                                  type="button"
                                  title={"Click here to save the currently loadoed over " + mech.name + ". You'll be prompted for confirmation."}
                                  onClick={ (e) => this.saveOver( e, mechIndex)}
                                >
                                  <FaSave />
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  type="button"
                                  title={"Click here to delete " + mech.name + " from this list. You'll be prompted for a confirmation."}
                                  onClick={ (e) => this.deleteSave( e, mechIndex)}
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                            </tbody>
                          )
                        })}
                        </>
                      ) : (
                        <tbody>
                        <tr>
                          <td className="text-center" colSpan={7}>
                            You have no saves on this device or browser.
                          </td>
                        </tr>
                        </tbody>
                      )}

                      <tfoot>
                        <tr>
                          <th
                            colSpan={6}
                            className="text-left"
                          >
                            <label
                              title="Click here to select a JSON file exported by the button to the right"
                            >
                              Import JSON:&nbsp;
                              <input
                                type="file"
                                onChange={this.selectFile}
                              />
                            </label>
                          </th>
                          <th
                            className="text-right"
                          >
                            <a
                              className="btn btn-primary btn-sm"
                              title="Export your current list to a JSON format to transfer between devices"
                              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                JSON.stringify(this.props.appGlobals.battleMechSaves, null, 2)
                              )}`}
                              download="battlmech-exports.json"
                            >
                              <FaFileExport />&nbsp;Export
                            </a>
                          </th>
                        </tr>

                      </tfoot>
                    </table>
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