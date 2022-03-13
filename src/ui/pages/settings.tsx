import React from 'react';
import { getFullBackup } from '../../dataSaves';
import { IAppGlobals } from '../app-router';
import UIPage from '../components/ui-page';

export default class Settings extends React.Component<ISettingsProps, ISettingsState> {
    // [openPicker, data, authResponse] = useDrivePicker();
    constructor(props: ISettingsProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Settings");
    }



    setUITheme = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let appSettings = this.props.appGlobals.appSettings;
      appSettings.uiTheme = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );
    }


    // useEffect(() => {
    //   // do anything with the selected/uploaded files
    //   if(data){
    //     data.docs.map(i => console.log(i.name))
    //   }
    // }, [data])


    render = (): React.ReactFragment => {
      return (
        <UIPage current="appSettings" appGlobals={this.props.appGlobals}>
            <div className="row">
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>User Interface</legend>
                  {/* <label>
                    <input
                      type="checkbox"
                      checked={this.props.appGlobals.appSettings.uiDesaturated}
                      onChange={this.toggleDesaturated}
                    />&nbsp;Desaturated UI
                  </label> */}
                  <select
                      value={this.props.appGlobals.appSettings.uiTheme}
                      onChange={this.setUITheme}
                  >
                    <option value="">Default</option>
                    <option value="desaturated">Desaturated</option>
                    <option value="retro">Retro</option>
                  </select>
                </fieldset>
              </div>
              <div className="col-md-6">
                <fieldset className="fieldset">
                  <legend>Backup and Restore</legend>

                  <p>Getting OAUth Sycning on a github static page URL has been difficult, so here's a workaround: Saving and Restoring all Data Manually</p>

                  <div className="text-center">
                    <a href={`data:text/json;charset=utf-8,${encodeURIComponent(getFullBackup())}`}
          >
                    <button
                      className="btn btn-sm btn-primary"

                    >
                      Click here to Back Up
                    </button>
                </a>

                    <p>Clicking on the above button will download <strong>ALL</strong> data which you can store on your own devices or cloud services to restore to a new device</p>
                    <hr />
                  </div>


                  </fieldset>
              </div>
            </div>

        </UIPage>
      );
    }
}

interface ISettingsProps {
  appGlobals: IAppGlobals;
}

interface ISettingsState {
    updated: boolean;

}