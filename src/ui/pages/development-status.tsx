import React from 'react';
import './development-status.scss';
import {IAppGlobals} from '../app-router';
import UIPage from '../components/ui-page';

export default class DevelopmentStatus extends React.Component<IDevelopmentStatusProps, IDevelopmentStatusState> {
    constructor(props: IDevelopmentStatusProps) {
        super(props);
        this.state = {
            updated: false,
            showXLDialog: false,
        }
        this.props.appGlobals.makeDocumentTitle("Development Status");
    }


    render() {
      return (
        <UIPage current="dev-status" appGlobals={this.props.appGlobals}>
            <div className="alert alert-info">
              <p>
                I only started this rewrite on Friday 7/18/19. Since I'm mostly done with the Alpha Strike Roster, I suppose development is coming along nicely.
              </p>
              <p>If you see anything wrong with the Alpha Strike area - let me know in the <a href="https://github.com/jdgwf/battletech-tools/issues">GitHub issues</a> or a <a href="https://twitter.com/JeffreyDGordon/">send me a Tweet</a>. :)</p>
              <p className="text-right">- Jeff</p>
            </div>
            <h2>Development Status</h2>

            <p><strong>Current Focus:</strong> 'Mech Creator Class and Data conversions</p>
            <div className="row">
              <div className="col-lg-4">
                <div className="text-section ">
                  <h2>General App</h2>
                  <div className="section-content">
                    <h4>Completed</h4>
                    <ul>
                      <li><del>General Scaffolding</del></li>
                      <li><del>Menu</del></li>
                      <li><del>Routing</del></li>
                      <li><del>Local Storage</del></li>
                      <li><del>(S)CSS</del></li>
                    </ul>

                    <h4>TO DO</h4>
                    <ul>
                      <li>Google Drive Sign in/Sync</li>
                      <li>Office 365/ OneDrive Sign in/Sync<sup>*</sup></li>
                      <li>Dropbox Sign in/Sync<sup>*</sup></li>
                      <li>Apple iCloud Drive Sign in/Sync<sup>*</sup></li>
                      <li>Nextcloud Sign in/Sync<sup>*</sup></li>
                    </ul>
                    <div className="small-pt-text">
                      <sup>*</sup> unknown if technically possible with PWA/Pure web apis. I do know that I can sync with GoogleDrive, for I have another web project which does this.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-section ">
                  <h2>Alpha Strike Roster</h2>
                  <div className="section-content">
                    <h4>Completed</h4>
                    <ul>
                      <li><del>Search MUL</del></li>
                      <li><del>Add Units</del></li>
                      <li><del>Group Units</del></li>
                      <li><del>Move Units</del></li>
                      <li><del>Remove Units</del></li>
                      <li><del>Remove Groups</del></li>
                      <li><del>Rename Units</del></li>
                      <li><del>Rename Groups</del></li>
                      <li><del>Unit Skills</del></li>
                      <li><del>Group Favoites</del></li>
                    </ul>
                    <h4>TO DO</h4>
                    <p>This section should be pretty feature complete, although there are some UI annoyances.</p>
                    <ul>
                      <li>Printable AS Roster</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="text-section ">
                  <h2>'Mech Creator</h2>
                  <div className="section-content">
                    <h4>Completed</h4>
                    <ul>
                      <li><del>Typescript interfaces for data</del></li>
                      <li><del>BattleMech Class</del></li>
                      <li><del>UI Sidebar/Steps as per TechManual</del></li>
                      <li><del>Step 1 - Design the Chassis</del></li>
                      <li><del>Step 2 - Install engine and control systems</del></li>
                      <li><del>Step 3 - Add additional heat sinks</del></li>
                      <li><del>Step 4 - Add armor</del></li>
                      <li>
                        <del>Step 5 - Add weapons, ammunition and other equipment</del>
                        <br /><span className="color-green">Working and Functional, UI needs lots of love.</span>
                      </li>
                      <li>
                        <del>Step 6 - Complete the record sheet (critical allocations)</del>
                        <br /><span className="color-green">Working and Functional, Would be nice to have better messaging when an item won't "fit"..</span>
                      </li>
                      <li>
                        <del>BattleMech SVG
                        <ul>
                          <li>Read only/printable</li>
                          <li>Interactive Hooks</li>
                        </ul></del>
                      </li>
                    </ul>
                    <h4>TO DO (short list)</h4>
                    <ul>

                      <li>
                        <h4 className="text-center color-blue">Current Focus</h4>
                        Load/Save/Export
                      </li>

                      <li>
                        Add remaining Clan Equipment,
                        <h4 className="text-center color-blue">Current Focus</h4>
                        IS SRM/LRMs to Data
                      </li>
                      <li>In-Play Sheet</li>
                      <li>Companies</li>
                      <li>Lances</li>

                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </UIPage>
      );
    }
}

interface IDevelopmentStatusProps {
  appGlobals: IAppGlobals;
}

interface IDevelopmentStatusState {
    updated: boolean;
    showXLDialog: boolean;
}