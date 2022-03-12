import React from 'react';
import { IAppGlobals } from '../../app-router';
import PrintablePage from '../../components/printable-page';
import BattleMechSVG from '../../components/svg/battlemech-svg';


export default class MechCreatorPrintRS extends React.Component<IPrintRSProps, IPrintRSState> {
    constructor(props: IPrintRSProps) {
        super(props);
        this.state = {
            updated: false,
        }
        this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }



    render() {
      return (
        <>
          <PrintablePage backTo={`${process.env.PUBLIC_URL}/mech-creator/summary`} appGlobals={this.props.appGlobals}>
            <div className="print-page">
              <BattleMechSVG mechData={this.props.appGlobals.currentBattleMech} inPlay={false} />
            </div>

          </PrintablePage>
        </>
      );
    }
}

interface IPrintRSProps {
  appGlobals: IAppGlobals;
}

interface IPrintRSState {
    updated: boolean;

}