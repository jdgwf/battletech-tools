import React from 'react';
import './InPlay.scss';
import {IAppGlobals} from '../../AppRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowAltCircleLeft, faTh, faBars, faList } from '@fortawesome/free-solid-svg-icons';
import AlphaStrikeUnitSVG from '../../Components/AlphaStrikeUnitSVG';
import { Link } from 'react-router-dom';
import BattleTechLogo from '../../Components/BattleTechLogo';

export default class AlphaStrikeRosterInPlay extends React.Component<IInPlayProps, IInPlayState> {
    searchTech: string = "";
    searchTerm: string = "";
    searchRules: string = "";
    constructor(props: IInPlayProps) {
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

        this.toggleCardMode =  this.toggleCardMode.bind(this);
    }

    componentDidMount () {
      this.props.appGlobals.makeDocumentTitle("Playing Alpha Strike");
    }

    toggleCardMode() {
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
                <li className="d-none d-md-inline"><Link className="current" to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}><FontAwesomeIcon icon={faArrowAltCircleLeft} /></Link></li>

                {this.state.cardMode ? (
                  <li title="Switch a large list mode" className="d-none d-md-inline"><a className="current" onClick={() => this.toggleCardMode()}><FontAwesomeIcon icon={faList} /></a></li>
                ) : (
                  <li title="Switch to showing 2+ cards per row" className="d-none d-md-inline"><a className="current" onClick={() => this.toggleCardMode()}><FontAwesomeIcon icon={faTh} /></a></li>

                )}


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
          {this.props.appGlobals.currentASForce.groups.map( (group, groupIndex) => {
            return (
              <React.Fragment key={groupIndex}>
              <div className="text-section">
                <h2>{group.getName(groupIndex + 1)}</h2>
                <div className="section-content">
                  <div className="row">
                  {group.members.map( (unit, unitIndex) => {
                    return (
                    <React.Fragment key={unitIndex}>
                      <div className={this.state.cardMode ? "col-md-6 col-lg-6 col-xl-6" : "col-md-12"}>
                        <AlphaStrikeUnitSVG
                          asUnit={unit}
                          inPlay={true}
                          appGlobals={this.props.appGlobals}
                          className="small-margins"
                        />
                      </div>
                    </React.Fragment>
                    )
                  })}
                  </div>
              </div>
              </div>
            </React.Fragment>
            )
          })}
        </>
      );
    }
}

interface IInPlayProps {
  appGlobals: IAppGlobals;

}

interface IInPlayState {
  updated: boolean;
  cardMode: boolean;
}