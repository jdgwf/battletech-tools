
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import InputCheckbox from '../../components/form_elements/input_checkbox';
import UIPage from '../../components/ui-page';

export default class SettingsHome extends React.Component<ISettingsHomeProps, ISettingsHomeState> {
    // [openPicker, data, authResponse] = useDrivePicker();


    constructor(props: ISettingsHomeProps) {
        super(props);
        this.state = {
            updated: false,

        }



        this.props.appGlobals.makeDocumentTitle("Settings");
    }


    setUITheme = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let appSettingsHome = this.props.appGlobals.appSettings;
      appSettingsHome.uiTheme = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettingsHome );
    }

    setDeveloperMenu = ( event: React.FormEvent<HTMLInputElement>): void => {
      let appSettingsHome = this.props.appGlobals.appSettings;
      appSettingsHome.developerMenu = event.currentTarget.checked;
      this.props.appGlobals.saveAppSettings( appSettingsHome );
    }

    render = (): React.ReactFragment => {

      return (
        <UIPage current="settings-home" appGlobals={this.props.appGlobals}>
            <div className="row">
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>User Interface</legend>

                  <label>
                    App Theme:
                    <select
                      value={this.props.appGlobals.appSettings.uiTheme}
                      onChange={this.setUITheme}
                    >
                      <option value="">Default</option>
                      <option value="desaturated">Desaturated</option>
                      <option value="retro">Retro</option>
                    </select>
                  </label>



                  <InputCheckbox
                  label='Show Developer/Work In Progress Menu'
                  checked={this.props.appGlobals.appSettings.developerMenu}
                  onChange={this.setDeveloperMenu}
                />
                </fieldset>


              </div>
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>Data Management</legend>
                    <p>To Backup and Restore your data from another device, visit the <Link to={`${process.env.PUBLIC_URL}/settings/backup-and-restore`}>Backup and Restore</Link> page</p>

                  </fieldset>
              </div>
            </div>

        </UIPage>
      );
    }
}

interface ISettingsHomeProps {
  appGlobals: IAppGlobals;
}

interface ISettingsHomeState {
    updated: boolean;

}