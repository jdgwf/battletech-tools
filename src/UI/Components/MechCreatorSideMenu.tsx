import React from 'react';
import { Link } from 'react-router-dom';
import './MechCreatorSideMenu.scss';
import {IAppGlobals} from '../AppRouter';

export default class MechCreatorSideMenu extends React.Component<IMechCreatorSideMenuProps, IMechCreatorSideMenuState> {
    constructor(props: IMechCreatorSideMenuProps) {
        super(props);
        this.state = {
        }
    }

    render() {
      return (
          <>
            <ul className="sidebar-menu">
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator`}
                        className={this.props.current === "home" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Welcome</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/step1`}
                        className={this.props.current === "step1" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Step 1</div>
                        <div className="subtitle">Design the Chassis</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/step2`}
                        className={this.props.current === "step2" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Step 2</div>
                        <div className="subtitle">Install engine and control systems</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/step3`}
                        className={this.props.current === "step3" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Step 3</div>
                        <div className="subtitle">Add additional heat sinks</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/step4`}
                        className={this.props.current === "step4" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Step 4</div>
                        <div className="subtitle">Add Armor</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/step5`}
                        className={this.props.current === "step5" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Step 5</div>
                        <div className="subtitle">Add weapons, ammunition and other equipment</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/step6`}
                        className={this.props.current === "step6" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Step 6</div>
                        <div className="subtitle">Complete the record sheet</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/summary`}
                        className={this.props.current === "summary" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Summary</div>
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${process.env.PUBLIC_URL}/mech-creator/exports`}
                        className={this.props.current === "exports" ? "btn btn-primary" : "btn btn-lightbg"}
                    >
                        <div className="title">Exports</div>
                    </Link>
                </li>
            </ul>

          </>
      );
    }
}

interface IMechCreatorSideMenuProps {
    current?: string;
    appGlobals: IAppGlobals;
}

interface IMechCreatorSideMenuState {
}