import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../app-router';
import BattleTechLogo from './battletech-logo';
import './top-menu.scss';

export default class TopMenu extends React.Component<ITopMenuProps, ITopMenuState> {
    constructor(props: ITopMenuProps) {
        super(props);
        this.state = {
            updated: false,
        }

    }

    toggleMobile= (): void => {
        this.props.appGlobals.toggleMobile();
    }
    closeMobile= (): void => {
        this.props.appGlobals.closeMobile();
    }

    render = (): React.ReactFragment => {

    let subMenu: React.ReactFragment | null = null;
    if( this.props.appGlobals.appSettings.developerMenu && this.props.current && this.props.current.startsWith("classic-battletech") ) {
        subMenu = <ul className="sub-menu">
            <li className="d-none d-md-inline"><Link className={this.props.current === "classic-battletech" ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech`}>Home</Link></li>
            <li className="d-none d-md-inline"><Link className={this.props.current === "classic-battletech-mech-creator" ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>'Mech Creator</Link></li>
        </ul>
    }
    if( this.props.appGlobals.appSettings.developerMenu && this.props.current && this.props.current.startsWith("alpha-strike") ) {
        subMenu = <ul className="sub-menu">
            <li className="d-none d-md-inline"><Link className={this.props.current === "alpha-strike" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike`}>Home</Link></li>
            <li className="d-none d-md-inline"><Link className={this.props.current === "alpha-strike-roster" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}>Roster</Link></li>
        </ul>
    }
      return (
          <>
          <header className="topmenu">
            <ul className="main-menu">
                <li onClick={this.toggleMobile} className="mobile-menu-button d-inline d-md-none"><FontAwesomeIcon icon={faBars} /></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "home" ? "current" : "" } to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                {/* <li className="d-none d-md-inline"><Link className={this.props.current === "page1" ? "current" : "" } to={`${process.env.PUBLIC_URL}/page1`}>Page1</Link></li> */}
                {this.props.appGlobals.appSettings.developerMenu ? (
                    <>
                    <li className="d-none d-md-inline"><Link onClick={this.closeMobile} className={this.props.current && this.props.current.startsWith("classic-battletech") ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech`}>Classic BattleTech</Link></li>
                    <li className="d-none d-md-inline"><Link onClick={this.closeMobile} className={this.props.current && this.props.current.startsWith("alpha-strike") ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike`}>Alpha Strike</Link></li>
                    </>
                ) : (
                    <>
                <li className="d-none d-md-inline"><Link className={this.props.current === "classic-battletech-mech-creator" ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>'Mech Creator</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "alpha-strike-roster" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}>Alpha Strike Roster</Link></li>
                    </>
                )}

                <li className="d-none d-md-inline"><Link className={this.props.current === "about" ? "current" : "" } to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "dev-status" ? "current" : "" } to={`${process.env.PUBLIC_URL}/dev-status`}>Status</Link></li>
                <li className="d-none d-md-inline"><Link className={this.props.current === "settings" ? "current" : "" } to={`${process.env.PUBLIC_URL}/settings`}>Settings</Link></li>

                {this.props.appGlobals.appSettings.developerMenu ? (
                    <li className="d-none d-md-inline"><Link className={this.props.current === "equipment-editor" ? "current" : "" } to={`${process.env.PUBLIC_URL}/equipment-editor`}>Equipment Editor</Link></li>
                ) : null}

                <li className="logo">
                    <a
                        href="https://battletech.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo
                            baseColor={this.props.appGlobals.appSettings.uiTheme === "desaturated" ? "#ddd" : ""}
                            altColor={this.props.appGlobals.appSettings.uiTheme === "desaturated" ? "#aaa" : ""}
                        />
                    </a>
                </li>
            </ul>
        {subMenu}

          </header>
            <div className="mobile-menu">
                <ul className="styleless">
                    <li><Link onClick={this.closeMobile} className={this.props.current === "home" ? "current" : "" } to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                    {/* <li><Link onClick={this.closeMobile} className={this.props.current === "page1" ? "current" : "" } to={`${process.env.PUBLIC_URL}/page1`}>Page1</Link></li> */}
                    {this.props.appGlobals.appSettings.developerMenu ? (
                        <>
                    <li>
                        <div>Classic BattleTech</div>
                        <ul className="sub-menu">
                            <li><Link onClick={this.closeMobile} className={this.props.current === "classic-battletech" ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech`}>Home</Link></li>
                            <li><Link onClick={this.closeMobile} className={this.props.current === "classic-battletech-mech-creator" ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>'Mech Creator</Link></li>
                        </ul>
                    </li>
                    <li>
                        <div>Alpha Strike</div>
                        <ul className="sub-menu">
                            <li><Link onClick={this.closeMobile} className={this.props.current === "alpha-strike" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike`}>Home</Link></li>
                            <li><Link onClick={this.closeMobile} className={this.props.current === "alpha-strike-roster" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}>Roster</Link></li>
                        </ul>
                    </li>
                        </>
                    ) : (
                        <>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "classic-battletech-mech-creator" ? "current" : "" } to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>'Mech Creator</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "alpha-strike-roster" ? "current" : "" } to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}>Alpha Strike Roster</Link></li>
                        </>
                    )}

                    <li><Link onClick={this.closeMobile} className={this.props.current === "about" ? "current" : "" } to={`${process.env.PUBLIC_URL}/about`}>About</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "dev-status" ? "current" : "" } to={`${process.env.PUBLIC_URL}/dev-status`}>Status</Link></li>
                    <li><Link onClick={this.closeMobile} className={this.props.current === "settings" ? "current" : "" } to={`${process.env.PUBLIC_URL}/settings`}>Settings</Link></li>
                    {this.props.appGlobals.appSettings.developerMenu ? (
                    <li className="d-none d-md-inline"><Link className={this.props.current === "equipment-editor" ? "current" : "" } to={`${process.env.PUBLIC_URL}/equipment-editor`}>Equipment Editor</Link></li>
                ) : null}
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