import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import BattleTechLogo from '../../components/battletech-logo';
import AlphaStrikeUnitSVG from '../../components/svg/alpha-strike-unit-svg';
import './print.scss';

export default class AlphaStrikeRosterPrint extends React.Component<IPrintProps, IPrintState> {
    searchTech: string = "";
    searchTerm: string = "";
    searchRules: string = "";
    constructor(props: IPrintProps) {
        super(props);

        let cardMode = true;
        let lsCardMode = localStorage.getItem("asPlayCardMode");
        if( lsCardMode && lsCardMode === "n" ) {
          cardMode = false;
        }

        this.state = {
            updated: false,
            cardMode: cardMode,
        };

        this.props.appGlobals.makeDocumentTitle("Playing Alpha Strike");
    }




    toggleCardMode = (): void => {
      if( !this.state.cardMode ) {
        localStorage.setItem("asPlayCardMode", "y");
      } else {
        localStorage.setItem("asPlayCardMode", "n");
      }

      this.setState({
        cardMode: !this.state.cardMode,
      });

    }

    render() {
      return (
        <>
          <header className="topmenu">
            <ul>
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}><FontAwesomeIcon icon={faArrowAltCircleLeft} /></Link></li>
{/*
                {this.state.cardMode ? (
                  <li title="Switch a large list mode"><span className="current" onClick={this.toggleCardMode}><FontAwesomeIcon icon={faList} /></span></li>
                ) : (
                  <li title="Switch to showing 2+ cards per row"><span className="current" onClick={this.toggleCardMode}><FontAwesomeIcon icon={faTh} /></span></li>

                )} */}


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
                <h2>{group.getName(groupIndex + 1)}</h2>

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
  cardMode: boolean;
}