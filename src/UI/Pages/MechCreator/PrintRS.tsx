import React from 'react';
import {IAppGlobals} from '../../AppRouter';
import PrintablePage from '../../Components/PrintablePage';
import BattleMechSVG from '../../Components/SVG/BattleMechSVG';


export default class MechCreatorPrintRS extends React.Component<IPrintRSProps, IPrintRSState> {
    constructor(props: IPrintRSProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }

    render() {
      return (
        <>
          <PrintablePage backTo={`${process.env.PUBLIC_URL}/mech-creator/summary`} appGlobals={this.props.appGlobals}>
            <div className="print-page">
              <BattleMechSVG mechData={this.props.appGlobals.currentBattleMech} inPlay={true} />
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