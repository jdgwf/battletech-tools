import React from 'react';
import { Link } from 'react-router-dom';
import './TopMenu.scss';
import BattleTechLogo from './BattleTechLogo';

export default class TopMenu extends React.Component<ITopMenuProps, ITopMenuState> {
    constructor(props: ITopMenuProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }
    render() {
      return (
          <header className="topmenu">

            <ul>
                <li><Link className={this.props.current === "home" ? "current" : "" } to="/">Home</Link></li>
                <li><Link className={this.props.current === "page1" ? "current" : "" } to="/page1">Page1</Link></li>
                <li className="logo">
                    <a href="https://battltech.com" rel="noopener noreferrer" target="_blank">
                        {/* <SanitizedHTML raw={true} html={ getBattleTechLogoSVG() } /> */}
                        <BattleTechLogo />
                    </a>
                </li>
            </ul>

          </header>
      );
    }
}

interface ITopMenuProps {
    current?: string;
}

interface ITopMenuState {
    // appGlobals: IAppGlobals;
    updated: boolean;

}