import React from 'react';
import './development-status.scss';
import {IAppGlobals} from '../app-router';
import UIPage from '../components/ui-page';
import TextSection from '../components/text-section';

export default class DevelopmentStatus extends React.Component<IDevelopmentStatusProps, IDevelopmentStatusState> {
    constructor(props: IDevelopmentStatusProps) {
        super(props);

        this.props.appGlobals.makeDocumentTitle("Development Status");
    }

    render = (): JSX.Element => {
      return (
        <UIPage current="dev-status" appGlobals={this.props.appGlobals}>
            <h2>Development Status</h2>

            <p><strong>Current Focus:</strong> Classic BattleTech Roster</p>
            <div className="flex">

              <TextSection
            label="General App"
            className="grow with-margins large-max-width-50"
          >
                    <h4>Completed</h4>
                    <ul>
                      <li><del>General Scaffolding</del></li>
                      <li><del>Menu</del></li>
                      <li><del>Routing</del></li>
                      <li><del>Local Storage</del></li>
                      <li><del>(S)CSS</del></li>
                    </ul>

                    <h4>Possible Future</h4>
                    <p>Although I'm encountering resistance with being hosted on GitHub, I'm not ruling out the possibility of syncing via these services. That said, the backup/restore functionality of the app seems to work quite well.</p>
                    <ul>
                      <li>Google Drive Sign in/Sync</li>
                      <li>Office 365/ OneDrive Sign in/Sync</li>
                      <li>Dropbox Sign in/Sync</li>
                      <li>Apple iCloud Drive Sign in/Sync</li>
                      <li>NextCloud Sign in/Sync</li>
                    </ul>

                  </TextSection>

              <TextSection
                label="Alpha Strike Roster"
                className="grow with-margins large-max-width-50"
              >

                    <div className="alert alert-success">This section should be pretty feature complete, although there are some UI annoyances.</div>
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
                      <li><del>Group Favorites</del></li>
                      <li><del>Printable AS Rosters</del></li>
                    </ul>

                  </TextSection>

              <TextSection
            label="'Mech Creator'"
            className="grow with-margins large-max-width-50"
          >
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
                        Remaining IS Equipment
                      </li>
                      <li>
                        Add remaining Clan Equipment,
                      </li>
                      <li>
                        Fix imported Alpha Strike values to help guarantee proper exports.
                      </li>

                    </ul>

                  </TextSection>

              <TextSection
            label="Classic BattleTech Roster"
            className="grow with-margins large-max-width-50"
          >
              <h3>Currents TODOs</h3>
              <ul>
                <li><del>Apply Heat, and manual adjustments</del></li>
                <li><del>Take Damage Dialog</del></li>
                <li><del>Critical Hit Management</del></li>
                <li>MechWarrior hits</li>
                <li>Cleanup, and workflow enhancement testing during multiple games</li>
              </ul>
            </TextSection>

            </div>
          </UIPage>
      );
    }
}

interface IDevelopmentStatusProps {
  appGlobals: IAppGlobals;
}

interface IDevelopmentStatusState {

}