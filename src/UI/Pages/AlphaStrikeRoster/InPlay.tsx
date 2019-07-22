import React from 'react';
import './InPlay.scss';
import {IAppGlobals} from '../../AppRouter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import AlphaStrikeUnitSVG from '../../Components/AlphaStrikeUnitSVG';
import { Link } from 'react-router-dom';
import BattleTechLogo from '../../Components/BattleTechLogo';

export default class AlphaStrikeRosterInPlay extends React.Component<IInPlayProps, IInPlayState> {
    searchTech: string = "";
    searchTerm: string = "";
    searchRules: string = "";
    constructor(props: IInPlayProps) {
        super(props);

        this.state = {
            updated: false,

        }

    }

    componentDidMount () {
      this.props.appGlobals.makeDocumentTitle("Playing Alpha Strike");
    }

    render() {
      return (
        <>
          <header className="topmenu">
            <ul>
                <li className="d-none d-md-inline"><Link to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}><FontAwesomeIcon icon={faArrowAltCircleLeft} /></Link></li>

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
          In Play
          {this.props.appGlobals.currentASForce.groups.map( (group, groupIndex) => {
            return (
              <React.Fragment key={groupIndex}>
              <h2>{group.getName(groupIndex)}</h2>
              {group.members.map( (unit, unitIndex) => {
                return (
                <React.Fragment key={unitIndex}>
                  <AlphaStrikeUnitSVG
                    asUnit={unit}
                    inPlay={true}
                  />
                </React.Fragment>
                )
              })}
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