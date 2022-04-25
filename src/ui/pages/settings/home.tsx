
import React from 'react';
import { Link } from 'react-router-dom';
import { ESaveDataMode } from '../../../dataSaves';
import { IAppGlobals } from '../../app-router';
import InputCheckbox from '../../components/form_elements/input_checkbox';
import UIPage from '../../components/ui-page';

export default class SettingsHome extends React.Component<ISettingsHomeProps, ISettingsHomeState> {
    // [openPicker, data, authResponse] = useDrivePicker();

    constructor(props: ISettingsHomeProps) {
        super(props);
        this.state = {
            updated: false,
            selectedStorageTarget: this.props.appGlobals.appSettings.storageLocation,
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

    setAlphaStrikeMeasurementsInHexes = ( event: React.FormEvent<HTMLInputElement>): void => {
      let appSettingsHome = this.props.appGlobals.appSettings;
      appSettingsHome.alphaStrikeMeasurementsInHexes = event.currentTarget.checked;
      this.props.appGlobals.saveAppSettings( appSettingsHome );
    }

    setStorageTarget = ( event: React.FormEvent<HTMLSelectElement>): void => {
      this.setState({
        selectedStorageTarget: +event.currentTarget.value,
      })
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

              <InputCheckbox
                  label='Alpha Strike: Display Measurements in Hexes'
                  checked={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
                  onChange={this.setAlphaStrikeMeasurementsInHexes}
                />

                </fieldset>

              </div>
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>Data Management</legend>
                    <p>To Backup and Restore your data from another device, visit the <Link to={`${process.env.PUBLIC_URL}/settings/backup-and-restore`}>Backup and Restore</Link> page</p>
{/*
                    <label>
                      Storage Target:<br />
                      <select
                        onChange={this.setStorageTarget}
                        value={this.state.selectedStorageTarget}
                      >
                        <option value={ESaveDataMode.localStorage}>
                          Local Storage {this.props.appGlobals.appSettings.storageLocation === ESaveDataMode.localStorage ? "(current)" : "" }
                          </option>
                        <option value={ESaveDataMode.firebase}>
                          Firebase {this.props.appGlobals.appSettings.storageLocation === ESaveDataMode.firebase ? "(current)" : "" } </option>
                      </select>

                    </label>
                    {this.state.selectedStorageTarget === ESaveDataMode.localStorage ? (
                      <>
                        <p>localStorage is an area of memory in every browser which a web page can store data. This is the default location for this app. If you clear your browser history, setting, and caches, it <strong>may</strong> clear our all your work. Be sure to back up often!</p>
                      </>
                    ) : null}

                    {this.state.selectedStorageTarget === ESaveDataMode.firebase ? (
                      <>
                        <p><a href="https://firebase.google.com/" target="out">Google Firebase</a> is a free service which you can sign up for to store your personal data. I can't vouch for the privacy of the service, as I'm wary all things Google.</p>
                        <p>The advantage of using Firebase is that once set up, all your data is synced across devices and stored on their servers.</p>
                        <p>To Switch to FireBase, you'll need to sign up for an account, enter your Firebase Login info below, and then test the connection.</p>
                      </>
                    ) : null} */}
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
  selectedStorageTarget: ESaveDataMode;
}