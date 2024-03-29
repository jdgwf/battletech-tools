import React from 'react';
import { IAppGlobals } from '../app-router';
import './about.scss';
import UIPage from '../components/ui-page';
import TextSection from '../components/text-section';
let pjson = require('../../../package.json');

export default class About extends React.Component<IAboutProps, IAboutState> {

  constructor(props: IAboutProps) {
    super(props);

    this.props.appGlobals.makeDocumentTitle("About Jeff's BattleTech Tools");
  }

    render = (): JSX.Element => {
      return (
    <UIPage current="about" appGlobals={this.props.appGlobals}>

    <div className="text-center">Version {pjson.version}</div>

    <div className="row">
        <div className="col-md-6">
          <TextSection
            label="Credits"
          >
              <h4><a href="https://github.com/JDGwf" rel="noopener noreferrer" target="_blank">Jeffrey D. Gordon</a></h4>
              <strong>Developer and Designer</strong> - <a href="https://twitter.com/JeffreyDGordon/">@JeffreyDGordon</a><br />
              <p>Jeff has been playing BattleTech since 1985 and has been a professional developer since 1996.
              These tools, and several others, including
              &nbsp;<a target="_blank" rel="noopener noreferrer" href="https://savaged.us">Savaged.us</a>,
              &nbsp;<a target="_blank" rel="noopener noreferrer" href="https://opend6.net">opend6.net</a>
              &nbsp;and <a target="_blank" rel="noopener noreferrer" href="https://jdgwf.github.io/tournament-tracker/">Tournament Tracker</a>
              &nbsp;are all created and updated in his spare time while juggling work, family, and writing a handful of novels.</p>

              <hr />
              <h4><a href="https://github.com/MoonSword22" rel="noopener noreferrer" target="_blank">MoonSword22</a></h4>
              <p><strong>Data Entry and consulting</strong></p>

              <hr />
              <h4><a href="https://github.com/cam-smith" rel="noopener noreferrer" target="_blank">cam-smith</a></h4>
              <p><strong>Fixes for formation bonuses and aero damages</strong></p>

              </TextSection>
        </div>
        <div className="col-md-6">
          <TextSection
            label="Copyrights"
          >
          <p>This site and app is a completely free fan-site that makes no claim to ownership to any of <a href="http://catalystgamelabs.com/">Catalyst Game Labs</a> or <a href="http://topps.com">The Topps Company, Inc</a> properties.</p>

          <p>MechWarrior, BattleMech, ‘Mech and AeroTech are registered trademarks
          of <a href="http://topps.com">The Topps Company, Inc</a>. All Rights Reserved.</p>

          <p> Catalyst Game Labs and the Catalyst Game Labs logo are trademarks of InMediaRes Production, LLC. Used with permission. Neither Topps nor Catalyst Game Labs makes no representation or warranty as to the quality, viability, or suitability for purpose of this product.</p>

          <p><a href="http://bg.battletech.com/?page_id=34">See additional information on the BattleTech The Board Game Website</a></p>
        </TextSection>

      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <TextSection
          label="Software License"
        >
            <p>This project is open source (GPLv3) with exceptions to the Data directory, see below.</p>

            <p>View the full license here: <a href="https://github.com/jdgwf/battletech-tools/blob/master/LICENSE">at the GitHub repository</a></p>

            <h4>Exceptions</h4>
            <p>The data in ./src/data/* contains copyrighted material and is not included. Each of the comments header in the file repeats this exception in the above license.</p>
          </TextSection>
        </div>

      <div className="col-md-6">
      <TextSection
        label="Bug Reporting"
      >
          <p>I have a lot of projects, and I'm only one (busy) man. If you're finding some bugs in this software #sorrynotsorry, but I'll be happy to try to fix any <a href="https://github.com/jdgwf/battletech-tools/issues">issues that are filed on the github project</a>. :)</p>
        </TextSection>
      </div>
	</div>
          </UIPage>
      );
    }
}

interface IAboutProps {
  appGlobals: IAppGlobals;
}

interface IAboutState {

}