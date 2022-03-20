import { FaArrowCircleLeft } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../../app-router';
import BattleTechLogo from '../../../components/battletech-logo';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';
import './print.scss';

export default class AlphaStrikeRosterPrint extends React.Component<IPrintProps, IPrintState> {
    constructor(props: IPrintProps) {
        super(props);

        this.state = {
            updated: false,
        };

        this.props.appGlobals.makeDocumentTitle("Playing Alpha Strike");
    }


    render = (): React.ReactFragment => {
      return (
        <>
          <header className="topmenu">
            <ul>
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}><FaArrowCircleLeft /></Link></li>

                <li className="logo">
                    <a
                        href="https://battletech.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo />
                    </a>
                </li>
            </ul>

          </header>
          <div className="print-cards">
          {this.props.appGlobals.currentASForce.groups.map( (group, groupIndex) => {
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div className="print-section">
                <h2>
                  <div className="units-summary">
                  {group.getTotalPoints()} points - {group.getTotalUnits()} units
                  </div>
                  {group.getName(groupIndex + 1)}
                </h2>

                <div className="section-content">
                {group.formationBonus!.Name!=="None"?(
                    <>
                    <div className="card lance-bonus">
                      <p><strong>Bonus</strong>:&nbsp;
                      <em>{group.formationBonus!.Name}</em> - {group.formationBonus!.BonusDescription}</p>
                    </div>
                    </>
                  ) : null}

                  {group.members.map( (unit, unitIndex) => {
                    return (

                    <React.Fragment key={unitIndex}>
                      <div className={"card"}>
                        <AlphaStrikeUnitSVG
                          asUnit={unit}
                          inPlay={false}
                          appGlobals={this.props.appGlobals}
                          className="small-margins"
                        />
                      </div>
                    </React.Fragment>
                    )
                  })}

                  </div>
              </div>


            </React.Fragment>
            )
          })}

            <footer className="print-footer">
              <div className="print-logo">
                <BattleTechLogo />
              </div>
              <p>Printed using Jeff's Battletech Tools at https://jdgwf.github.io/battletech-tools/. Huge thanks to the Master Unit List</p>
              <p>MechWarrior, BattleMech, ‘Mech and AeroTech are registered trademarks of The Topps Company, Inc. All Rights Reserved.</p>
            </footer>
            {/* <header className="print-header">&nbsp;</header> */}
          </div>


        </>
      );
    }
}

interface IPrintProps {
  appGlobals: IAppGlobals;

}

interface IPrintState {
  updated: boolean;
}