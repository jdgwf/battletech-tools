import React from 'react';
import { FaArrowCircleLeft, FaGlasses, FaMicroscope, FaPrint, FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CONST_BATTLETECH_URL } from '../../../../configVars';
import { IAppGlobals } from '../../../app-router';
import BattleTechLogo from '../../../components/battletech-logo';
import AlphaStrikePilotCardSVG from '../../../components/svg/alpha-strike-pilot-card-svg';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';
import './print.scss';
import AlphaStrikeToggleRulerHexes from "./_toggleRulerHexes";

export default class AlphaStrikeRosterPrint extends React.Component<IPrintProps, IPrintState> {
    bigVersion: boolean = false;
    constructor(props: IPrintProps) {
        super(props);

        let lBigVersion = localStorage.getItem("big_version");

        if( lBigVersion && +lBigVersion > 0 ) {
          this.bigVersion = true;
        }

        this.state = {
            updated: false,
        };

        this.props.appGlobals.makeDocumentTitle("Printing Alpha Strike Force");
    }



    toggleBigVersion = ( e: React.FormEvent<HTMLSpanElement>) => {

      this.bigVersion = !this.bigVersion;

      localStorage.setItem(
        "big_version",
        this.bigVersion ? "1" : "0"
      )

      this.setState({
        updated: true,
      })
    }

    render = (): JSX.Element => {

      let printSectionClass = "print-section";
      if( this.bigVersion ) {
        printSectionClass += " big-version";
      }
      if(!this.props.appGlobals.currentASForce) {
        return <></>;
      }
      return (
        <>
          <header className="topmenu">
          <ul className="main-menu">
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}><FaArrowCircleLeft /></Link></li>
                <li><span title="Click here open the Print Dialog" onClick={() => window.print()} className="current" ><FaPrint /></span></li>
                <li>
                  <AlphaStrikeToggleRulerHexes
                    appGlobals={this.props.appGlobals}
                  />

                </li>
                {this.bigVersion ? (
                  <li><span title="Click here to use the regular print version" onClick={this.toggleBigVersion} className="current" ><FaMicroscope /></span></li>
                ) : (
                  <li><span title="Click here to use the larger cards print version" onClick={this.toggleBigVersion} className="current" ><FaGlasses /></span></li>
                )}


                <li className="logo">
                    <a
                        href={CONST_BATTLETECH_URL}
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo />
                    </a>
                </li>
            </ul>
            {this.bigVersion ? (
              <div className="header-message">Note: In my experience it's best to print these in Landscape. Don't forget to uncheck "headers and footers" to save space and unnecessary spacing.</div>
            ) : (
              <div className="header-message">Note: Don't forget to uncheck "headers and footers" to save space and unnecessary spacing.</div>
            )}
          </header>
          <div className="print-cards">
          {this.props.appGlobals.currentASForce.groups.map( (group, groupIndex) => {
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div className={printSectionClass}>
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
                          measurementsInHexes={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
                        />
                      </div>
                      {unit.currentPilotAbility ? (
                        <div className={"card"}>
                        <AlphaStrikePilotCardSVG
                          pilotAbility={unit.currentPilotAbility}
                          inPlay={false}
                          appGlobals={this.props.appGlobals}
                          className="small-margins"
                          measurementsInHexes={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
                        />
                      </div>
                      ) : null}
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
              <p>Printed using Jeff's BattleTech Tools at https://jdgwf.github.io/battletech-tools/. Huge thanks to the Master Unit List</p>
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