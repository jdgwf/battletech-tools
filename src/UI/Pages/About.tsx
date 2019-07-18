import React from 'react';
import ShowAlerts from '../Components/ShowAlerts';
import TopMenu from '../Components/TopMenu';
import { IAppGlobals } from '../AppRouter';
import './About.scss';

export default class About extends React.Component<IAboutProps, IAboutState> {
    constructor(props: IAboutProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("About");
    }

    render() {
      return (
        <div className="ui-page">
          <TopMenu current="about" />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />

		<div className="text-right">
			<strong className="ng-scope">Version</strong> <span ng-bind="appVersion" className="ng-binding">0.0.4 alpha</span>
		</div>
    <div className="row">
        <div className="col-md-6">
          <div className="text-section">
            <h2>Credits</h2>
            <div className="section-content">
              <h4>Jeffrey D. Gordon</h4>
              <strong>Developer and Designer</strong> - <a href="https://twitter.com/gauthic/">@Gauthic</a><br />
              <p>Jeff has been playing BattleTech since 1985 and has been a professional developer since 1996.
              These tools, and several others, including
              <a target="_blank" rel="noopener noreferrer" href="https://jdgwf.github.io/savage-worlds-web-tools/">the Savage Worlds Web Tools project</a>
              and <a target="_blank" rel="noopener noreferrer" href="https://jdgwf.github.io/tournament-tracker/">Tournament Tracker</a>
              are all created and updated in his spare time while juggling work, family, and writing a handful of novels.</p>

              <h4><a href="https://github.com/MoonSword22" rel="noopener noreferrer" target="_blank">MoonSword22</a></h4>
              <p><strong>Data Entry and consulting</strong></p>
              </div>
          </div>
        </div>
        <div className="col-md-6">
        <div className="text-section">
          <h2>Copyright</h2>
          <div className="section-content">
          <p>This site and app is a completely free fan-site that makes no claim to ownership to any of <a href="http://catalystgamelabs.com/">Catalyst Game Labs</a> or <a href="http://topps.com">The Topps Company, Inc</a> properties.</p>

          <p>MechWarrior, BattleMech, ‘Mech and AeroTech are registered trademarks
          of <a href="http://topps.com">The Topps Company, Inc</a>. All Rights Reserved.</p>

          <p> Catalyst Game Labs and the Catalyst Game Labs logo are trademarks of InMediaRes Production, LLC. Used with permission. Neither Topps nor Catalyst Game Labs makes no representation or warranty as to the quality, viability, or suitability for purpose of this product.</p>

          <p><a href="http://bg.battletech.com/?page_id=34">See additional information on the BattleTech The Board Game Website</a></p>
        </div>
        </div>

      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="text-section">
            <h2>Software License</h2>
            <div className="section-content">
            <p>This project is open source (MIT, see below) and hosted by <a href="https://github.com">GitHub</a>. The GitHub project can be found here: <a href="https://github.com/jdgwf/battletech-tools">https://github.com/jdgwf/battletech-tools</a></p>

            <h4>MIT License</h4>



            <p>Permission is hereby granted, free of charge, to any person obtaining a
            copy of this software and associated documentation files (the "Software"),
            to deal in the Software without restriction, including without limitation
            the rights to use, copy, modify, merge, publish, distribute, sublicense,
            and/or sell copies of the Software, and to permit persons to whom the
            Software is furnished to do so, subject to the following conditions:</p>

            <p>The above copyright notice and this permission notice shall be included
            in all copies or substantial portions of the Software.</p>

            <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
            OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
            FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
            IN THE SOFTWARE.</p>


            <h4>Exceptions</h4>
            <p>The data in ./src/Data/* contains copyrighted material and is not included. Each of the comments header in the file repeats this exception in the above license.</p>
              </div>
          </div>
        </div>

      <div className="col-md-6">
      <div className="text-section">
          <h2>Bug Reporting</h2>
          <div className="section-content">
          <p>I have a lot of projects, and I'm only one (busy) man. If you're finding some bugs in this software #sorrynotsorry, but I'll be happy to try to fix any <a href="https://github.com/jdgwf/battletech-tools/issues">issues that are filed on the github project</a>. :)</p>
          </div>
        </div>
      </div>
	</div>
          </div>
        </div>
      );
    }
}

interface IAboutProps {
  appGlobals: IAppGlobals;
}

interface IAboutState {
    updated: boolean;

}