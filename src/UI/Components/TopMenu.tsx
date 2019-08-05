import React from 'react';
import { Link } from 'react-router-dom';
import './TopMenu.scss';
import BattleTechLogo from './BattleTechLogo';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IAppGlobals} from '../AppRouter';

export default class TopMenu extends React.Component<ITopMenuProps, ITopMenuState> {
    constructor(props: ITopMenuProps) {
        super(props);
        this.state = {
            updated: false,
        }
        this.toggleMobile = this.toggleMobile.bind(this);
        this.closeMobile = this.closeMobile.bind(this);
    }

    toggleMobile() {
        this.props.appGlobals.toggleMobile();
    }
    closeMobile() {
        this.props.appGlobals.closeMobile();
    }

    render() {
      return (
          <>
          <header className="topmenu">
            <ul>
                <li onClick={this.toggleMobile} className="mobile-menu-button d-inline d-md-none"><FontAwesomeIcon icon={faBars} /></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "home" ? "current" : "" } to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                {/* <li className="d-none d-md-inline"><Link className={this.props.current === "page1" ? "current" : "" } to={`${process.env.PUBLIC_URL}/page1`}>Page1</Link></li> */}
                <li className="d-none d-md-inline"><Link className={this.props.current === "mech-creator" ? "current" : "" } to={`${process.env.PUBLIC_URL}/mech-creator`}>'Mech Creator</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "alpha-strike-roster" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}>Alpha Strike Roster</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "about" ? "current" : "" } to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "dev-status" ? "current" : "" } to={`${process.env.PUBLIC_URL}/dev-status`}>Status</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "settings" ? "current" : "" } to={`${process.env.PUBLIC_URL}/settings`}>Settings</Link></li>

                <li className="logo">
                    <a
                        href="https://battletech.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo
                            baseColor={this.props.appGlobals.settings.uiDesaturated ? "#ddd" : ""}
                            altColor={this.props.appGlobals.settings.uiDesaturated ? "#aaa" : ""}
                        />
                    </a>
                </li>
            </ul>

          </header>
            <div className="mobile-menu">
                <ul className="styleless">
                    <li><Link onClick={this.closeMobile} className={this.props.current === "home" ? "current" : "" } to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                    {/* <li><Link onClick={this.closeMobile} className={this.props.current === "page1" ? "current" : "" } to={`${process.env.PUBLIC_URL}/page1`}>Page1</Link></li> */}
                    <li><Link onClick={this.closeMobile} className={this.props.current === "mech-creator" ? "current" : "" } to={`${process.env.PUBLIC_URL}/mech-creator`}>'Mech Creator</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "alpha-strike-roster" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike-roster`}>Alpha Strike Roster</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "about" ? "current" : "" } to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "dev-status" ? "current" : "" } to={`${process.env.PUBLIC_URL}/dev-status`}>Status</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "settings" ? "current" : "" } to={`${process.env.PUBLIC_URL}/settings`}>Settings</Link></li>
                </ul>

            </div>
          </>
      );
    }
}

interface ITopMenuProps {
    current?: string;
    sub?: string;
    appGlobals: IAppGlobals;
}

interface ITopMenuState {
    updated: boolean;

}