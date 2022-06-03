
import React from 'react';
import { FaArrowCircleLeft, FaPrint } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CONST_BATTLETECH_URL } from '../../configVars';
import { IAppGlobals } from '../app-router';
import BattleTechLogo from './battletech-logo';

export default class PrintablePage extends React.Component<IPrintablePageProps, IPrintablePageState> {

    render = (): React.Element => {
        return (
        <>
          <div className="print-bar">
            <a
                href={CONST_BATTLETECH_URL}
                rel="noopener noreferrer"
                target="_blank"
                title="Click here to go to the official BattleTech website!"
                className="pull-right"
            >
                <BattleTechLogo />
            </a>

            <Link
              to={this.props.backTo}
              className="pull-left"
            >
              <button className="btn btn-primary">
                <FaArrowCircleLeft />
              </button>
            </Link>
            <button
              className="btn btn-primary"
              onClick={() => window.print()}
            >
              <FaPrint /> Print
            </button>
          </div>
          <div className="print-bg">
            {this.props.children}
          </div>
        </>
        )
    }
}

interface IPrintablePageProps {
    appGlobals: IAppGlobals;
    backTo: string;
  }

  interface IPrintablePageState {
      updated: boolean;

  }