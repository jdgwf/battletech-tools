import React from 'react';
import './home.scss';
import {IAppGlobals} from '../../app-router';
import SanitizedHTML from '../../components/sanitized-html';
import MechCreatorSideMenu from '../../components/mech-creator-side-menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faFile, faFileExport, faFolderOpen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import MechCreatorStatusbar from '../../components/mech-creator-status-bar';
import UIPage from '../../components/ui-page';
import { BattleMech, IBattleMechExport } from '../../../classes/battlemech';
import StandardModal from '../../components/standard-modal';
import TextSection from '../../components/text-section';

export default class MechCreatorHome extends React.Component<IHomeProps, IHomeState> {
    fileReader: FileReader | null = null;

    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
            TRO: "",
            ParsedTRO: null,
            importTROModal: false,
        }

        this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }



    updateTRO = (e: React.FormEvent<HTMLTextAreaElement>) => {


      let parsed: BattleMech | null = null;
      if( e.currentTarget.value && e.currentTarget.value.trim() ) {
        parsed = new BattleMech();
        parsed.importTRO( e.currentTarget.value );
      }

      this.setState({
        TRO: e.currentTarget.value,
        ParsedTRO: parsed,
      })
    }

    handleFileRead = (e: any) => {
      if( this.fileReader ) {
        let content = this.fileReader.result;

        console.log("content", content)
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
      if( this.props.appGlobals.battleMechSaves.length > saveIndex) {
        this.props.appGlobals.openConfirmDialog(
          "Deletion Confirmation",
          "Aer you sure you want to save the currently loaded 'mech over the saved 'mech \"" + this.props.appGlobals.battleMechSaves[saveIndex].name + "\"?",
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
        currentBattleMech.import( this.props.appGlobals.battleMechSaves[saveIndex] )
        this.props.appGlobals.saveCurrentBattleMech( currentBattleMech )

      }
    }

    closeTROModal = (
      e:React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        importTROModal: false,
      })
    }

    importTRO = (
      e:React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      if( this.state.ParsedTRO ) {
        let currentBattleMech = this.props.appGlobals.currentBattleMech;

        currentBattleMech = new BattleMech();
        currentBattleMech.import( this.state.ParsedTRO.export() )
        this.props.appGlobals.saveCurrentBattleMech( currentBattleMech )


      }
      this.setState({
        TRO: "",
        ParsedTRO: null,
        importTROModal: false,
      })
    }

    openTROModal = (
      e:React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        importTROModal: true,
        TRO: "",
        ParsedTRO: null,
      })
    }

    render() {
      return (
        <>
          <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>
            <StandardModal
              title="Experimental TRO importer!"
              show={this.state.importTROModal}
              onClose={this.closeTROModal}
              onAdd={this.state.ParsedTRO ? this.importTRO : undefined }
              labelAdd="Import and Replace"
              className="modal-xl"
            >
<div className="row">
                          <div className="col">
                          <strong>Import Copy/Paste TRO</strong>
                            <div className="small-text">Because of formatting of copy/paste in Apple Preview, etc, it seems that Adobe Reader is required for ease of use. You could use another, but the copy/paste of Preview and other PDF viewer apps can be erratic with page formatting.</div>
                            </div>
                            <div className="col">
                            <strong>Parsed TRO</strong>
                            <div className="small-text">What will never work: The standard PDF TROs don't let you know what actuators are missing and where to set the Heat Sink criticals, so you'll have to edit that yourself. That said, this should save you a lot of time!</div>
                            </div>
</div>
<div className="row">
                          <div className="col">

                            <textarea
                              onChange={this.updateTRO}
                              value={this.state.TRO}
                              className="full-width tall"
                            >

                            </textarea>
                          </div>
                          <div className="col">

                            {this.state.ParsedTRO ? (
                                <SanitizedHTML html={this.state.ParsedTRO.makeTROHTML()} raw={true} />
                            ) :
                            (
                              <div className="text-center">
                              <br />
                                <p>Paste something, and we'll see what we can do!</p>
                                <p>Remember: It seems that only Adobe Acrobat does a good job at copying all the text in an orderly fashion.</p>
                              </div>
                            )}
                          </div>
                        </div>
            </StandardModal>
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
                                <FontAwesomeIcon icon={faFile} />&nbsp;Start Over
                              </button>
                              <Link
                                to={`${process.env.PUBLIC_URL}/mech-creator/step1`}
                                className="btn btn-primary pull-right btn-sm">
                                  Next Step <FontAwesomeIcon icon={faArrowCircleRight} />
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
    <FontAwesomeIcon icon={faSave} />&nbsp;Save as New
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
                                  onClick={ (e) => this.loadSave( e, mechIndex)}
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
                                JSON.stringify(this.props.appGlobals.battleMechSaves)
                              )}`}
                              download="battlmech-exports.json"
                            >
                              <FontAwesomeIcon icon={faFileExport} />&nbsp;Export
                            </a>
                          </th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-center">
                            Feeling Lucky? Want to try something new and dangerous?
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={this.openTROModal}
                            >
                              Try the TRO text importer!
                            </button>
                          </th>
                        </tr>
                      </tfoot>
                    </table>
              </TextSection>

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
    TRO: string;
    ParsedTRO: BattleMech | null,
    importTROModal: boolean;
}