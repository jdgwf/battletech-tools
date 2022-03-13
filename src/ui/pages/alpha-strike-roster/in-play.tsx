import { faArrowAltCircleLeft, faList, faRefresh, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import AlphaStrikeGroup from '../../../classes/alpha-strike-group';
import { IAppGlobals } from '../../app-router';
import BattleTechLogo from '../../components/battletech-logo';
import AlphaStrikeUnitSVG from '../../components/svg/alpha-strike-unit-svg';
import './in-play.scss';

export default class AlphaStrikeRosterInPlay extends React.Component<IInPlayProps, IInPlayState> {

    constructor(props: IInPlayProps) {
        super(props);

        this.state = {
            updated: false,
        };

        this.props.appGlobals.makeDocumentTitle("Playing Alpha Strike");
    }



    toggleCardMode = (): void => {


      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeInPlayCardMode = !appSettings.alphaStrikeInPlayCardMode;
      this.props.appGlobals.saveAppSettings( appSettings );

    }

    resetGroup = (
      e: React.FormEvent<HTMLButtonElement>,
      group: AlphaStrikeGroup,
    ): void => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.props.appGlobals.openConfirmDialog(
        "Confirmation",
        "Are you sure you want to reset all the units to full status?",
        "Yes",
        "No, Thank you",
        () => {
          for( let unit of group.members ) {
            if( unit && unit.reset ) {
              unit.reset();
            }

          }

          this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
      )


    }

    render = (): React.ReactFragment => {
      return (
        <>
          <header className="topmenu">
            <ul>
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}><FontAwesomeIcon icon={faArrowAltCircleLeft} /></Link></li>

                {this.props.appGlobals.appSettings.alphaStrikeInPlayCardMode ? (
                  <li title="Switch a large list mode"><span className="current" onClick={this.toggleCardMode}><FontAwesomeIcon icon={faList} /></span></li>
                ) : (
                  <li title="Switch to showing 2+ cards per row"><span className="current" onClick={this.toggleCardMode}><FontAwesomeIcon icon={faTh} /></span></li>

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
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div className="text-section lr-margin">
                <h2>
                  <button
                    className="pull-right btn-primary btn-sm"
                    title={"Click here to reset the damage for this " + group.groupLabel + ". You'll be prompted for confirmation."}
                    onClick={(e) => this.resetGroup( e, group )}
                  >
                    <FontAwesomeIcon icon={faRefresh} />&nbsp;Reset
                  </button>
                  {group.getName(groupIndex + 1)}
                </h2>
                <div className="section-content">
                  <div className="row">
                  {group.formationBonus!.Name!=="None"?(
                    <>
                    <div className={this.props.appGlobals.appSettings.alphaStrikeInPlayCardMode ? "col-md-12" : "col-md-12"}>
                      <p><strong>Bonus</strong>:&nbsp;
                      <em>{group.formationBonus!.Name}</em> - {group.formationBonus!.BonusDescription}</p>
                    </div>
                    </>
                  ) : null
                  }
                  {group.members.map( (unit, unitIndex) => {
                    return (
                    <React.Fragment key={unitIndex}>
                      <div className={this.props.appGlobals.appSettings.alphaStrikeInPlayCardMode ? "col-md-6 col-lg-6 col-xl-6" : "col-md-12"}>
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
}