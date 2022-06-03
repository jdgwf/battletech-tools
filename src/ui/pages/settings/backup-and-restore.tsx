
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";
import React from 'react';
import { checkFullRestoreData, getFullBackup, IFullBackup, IRestoreMessage, restoreFullBackup } from '../../../dataSaves';
import { IAppGlobals } from '../../app-router';
import InputCheckbox from '../../components/form_elements/input_checkbox';
import UIPage from '../../components/ui-page';

export default class SettingsBackupAndRestore extends React.Component<ISettingsBackupAndRestoreProps, ISettingsBackupAndRestoreState> {
    // [openPicker, data, authResponse] = useDrivePicker();
    fileReader: FileReader | null = null;

    restoreFileName = "jeffs-battletech-tools-full-export";

    constructor(props: ISettingsBackupAndRestoreProps) {
        super(props);
        this.state = {
            updated: false,
            fullRestoreObject: null,
            restoreError: "",
            restoreMessages: [],

            overwriteCurrentBattlemech: false,
            overwriteCurrentASGroup: false,
            overwriteCurrentCBTGroup: false,

            fullBackupString: "",
        }

        this.getFullBackupString();

        this.props.appGlobals.makeDocumentTitle("SettingsBackupAndRestore");
    }

    getFullBackupString = async() => {
      let fullBackupString = await getFullBackup(this.props.appGlobals.appSettings);
      this.setState({
        fullBackupString: fullBackupString,
      })
    }

    doRestore = (
      e: React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.props.appGlobals.openConfirmDialog(
        "",
        "Are you absolutely sure you want to perform this restore? This is your last chance to say no!",
        "Yes",
        "No, thank you",
        () => {
          if( this.state.fullRestoreObject ) {
            restoreFullBackup(
              this.state.fullRestoreObject,
              this.props.appGlobals,
              this.state.overwriteCurrentBattlemech,
              this.state.overwriteCurrentASGroup,
              this.state.overwriteCurrentCBTGroup,
              true,
            )

            this.setState({
              fullRestoreObject: null,
              overwriteCurrentBattlemech: false,
              overwriteCurrentASGroup: false,
              overwriteCurrentCBTGroup: false,
            })

            this.props.appGlobals.siteAlerts.addAlert(
              "success",
              "Restore Successful",
              "Your settings and data have been successfully restored",
              "",
              true,
              null,
              10,
            )

          }
        }
      )
    }

    updateOverwriteCurrentBatthemech = (
      e: React.FormEvent<HTMLInputElement>,
    ) => {
      this.setState({
        overwriteCurrentBattlemech: e.currentTarget.checked,
      })
    }

    updateOverwriteCurrentASGroup = (
      e: React.FormEvent<HTMLInputElement>,
    ) => {
      this.setState({
        overwriteCurrentASGroup: e.currentTarget.checked,
      })
    }

    updateOverwriteCurrentCBTGroup = (
      e: React.FormEvent<HTMLInputElement>,
    ) => {
      this.setState({
        overwriteCurrentCBTGroup: e.currentTarget.checked,
      })
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

    handleFileRead = (e: any) => {
      if( this.fileReader ) {
        let content = this.fileReader.result;

        try {
          if( content ) {
            let data: IFullBackup = JSON.parse( content.toString() )

            if( checkFullRestoreData( data ) ) {
              let restoreMessages = restoreFullBackup(
                data,
                this.props.appGlobals,
                false,
                false,
                false,
              )
              this.setState({
                fullRestoreObject: data,
                restoreError: "",
                restoreMessages: restoreMessages,
                overwriteCurrentBattlemech: false,
                overwriteCurrentASGroup: false,
                overwriteCurrentCBTGroup: false,
              })
            }
            else {
              this.setState({
                fullRestoreObject: null,
                restoreError: "Sorry, this does not appear to be a valid restore file",
                overwriteCurrentBattlemech: false,
                overwriteCurrentASGroup: false,
                overwriteCurrentCBTGroup: false,
              })
            }

            return;
            // let btData = this.props.appGlobals.battleMechSaves;
            // for( let item of data ) {
            //   btData.push( item );
            // }

            // this.props.appGlobals.saveBattleMechSaves( btData );
          }
        }
        catch {

        }
        this.setState({
          fullRestoreObject: null,
          restoreError: "Sorry we couldn't parse this restore file",
          overwriteCurrentBattlemech: false,
          overwriteCurrentASGroup: false,
          overwriteCurrentCBTGroup: false,
        })
      }
    }

    render = (): React.Element => {

      let restoreFileName = this.restoreFileName + "-" + (new Date()).toLocaleString() + ".json";
      return (
        <UIPage current="settings-backup-and-restore" appGlobals={this.props.appGlobals}>
            <div className="row">

              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>Backup and Restore</legend>

                  <p>Getting OAUth Sycning on a github static page URL has been difficult, so here's a workaround: Saving and Restoring all Data Manually</p>

                  <div className="text-center">
                    <a
                        href={`data:text/json;charset=utf-8,${encodeURIComponent( this.state.fullBackupString )}`}
                        download={restoreFileName}
                    >
                        <button
                          className="btn btn-sm btn-primary"

                        >
                          Click here to Back Up
                        </button>
                    </a>

                    <p>Clicking on the above button will download <strong>ALL</strong> data which you can store on your own devices or cloud services to restore to a new device</p>
                </div>
                    <hr />

{this.state.fullRestoreObject ? (
  <>
    <h4>Huzzah! We're able to restore from the data on this file!</h4>
    Nothing's been done so far, here's what we're going to do:
    <ul>
      {this.state.restoreMessages.map( (msg, msgIndex) => {
        return (
          <li key={msgIndex}>
            {msg.severity === "add" ? (
                <FaExclamationCircle className="color-green" />
              ) : (
                <FaExclamationTriangle className="color-red" />
              )}&nbsp; {msg.message}
          </li>
        )
      })}
      <li>
      {this.state.fullRestoreObject.currentVBattleMech ? (
        <InputCheckbox
          label="Overwrite your current BattleMech"
          checked={this.state.overwriteCurrentBattlemech}
          onChange={this.updateOverwriteCurrentBatthemech}
        />
      ) : (
        "This restore doesn't have a current Battlemech, so nothing will be overwritten"
      )}
</li>
<li>
      {this.state.fullRestoreObject.currentASForce ? (
          <InputCheckbox
            label="Overwrite your current Alpha Strike Group"
            checked={this.state.overwriteCurrentASGroup}
            onChange={this.updateOverwriteCurrentASGroup}
          />
      ) : (
        "This restore doesn't have a current Alpha Strike Group, so nothing will be overwritten"
      )}
</li>
<li>
      {this.state.fullRestoreObject.currentCBTForce ? (
          <InputCheckbox
            label="Overwrite your current Classic BattleTech Group"
            checked={this.state.overwriteCurrentCBTGroup}
            onChange={this.updateOverwriteCurrentCBTGroup}
          />
      ) : (
        "This restore doesn't have a current Classic BattleTech Group, so nothing will be overwritten"
      )}
</li>

    </ul>
    <button
        className="btn btn-md full-width btn-primary"
        onClick={this.doRestore}
      >
        Do The Above
      </button>
  </>
) : (
  <>
          <p>Restore from Backup. The file is named on export as "{this.restoreFileName}-(date string).json", but you may have renamed it.</p>

<p>What we'll try to do:</p>
  <ul>
    <li>Verify that the restore file is correct.</li>
    <li>Overwrite App SettingsBackupAndRestore, including theme, search history, etc</li>
    <li>We'll ask you to overwrite your current Alpha Strike Roster, defaulting to "no"</li>
    <li>
      Merge your Saved Alpha Strike Groups<br />
      <div className="small-text">Each group has a unique UUID which we'll use to overwrite if you've renamed it, any non-existing UUIDs Groups will be appended to your current Saved Groups</div>
    </li>
    <li>We'll ask you to overwrite your currently editing BattleMech, defaulting to "no"</li>
    <li>
      Merge your Saved BattleMechs<br />
      <div className="small-text">Each 'mech has a unique UUID which we'll use to overwrite if you've renamed it, any non-existing UUIDs Groups will be appended to your current saved 'mech list</div>
    </li>
  </ul>

  {this.state.restoreError ? (
    <div className="alert alert-danger">
      {this.state.restoreError}
    </div>
  ) : null}

  <label
    title="Click here to select a JSON file exported by the button to the right"
  >
    Restore Settings:&nbsp;
    <input
      type="file"
      onChange={this.selectFile}
    />
  </label>
  </>
)}

                  </fieldset>
              </div>
            </div>

        </UIPage>
      );
    }
}

interface ISettingsBackupAndRestoreProps {
  appGlobals: IAppGlobals;
}

interface ISettingsBackupAndRestoreState {
    updated: boolean;
    fullRestoreObject: IFullBackup | null;
    restoreError: string;
    restoreMessages: IRestoreMessage[];

    overwriteCurrentBattlemech: boolean;
    overwriteCurrentASGroup: boolean;
    overwriteCurrentCBTGroup: boolean;

    fullBackupString: string;
}