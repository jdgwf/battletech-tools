import { faArrowCircleLeft, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../app-router';
import BattleTechLogo from './battletech-logo';

export default class PrintablePage extends React.Component<IPrintablePageProps, IPrintablePageState> {

    render = (): React.ReactFragment => {
        return (
        <>
          <div className="print-bar">
            <a
                href="https://battletech.com"
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
              <Button variant="primary">
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </Button>
            </Link>
            <Button
              variant="primary"
              onClick={() => window.print()}
            >
              <FontAwesomeIcon icon={faPrint} /> Print
            </Button>
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