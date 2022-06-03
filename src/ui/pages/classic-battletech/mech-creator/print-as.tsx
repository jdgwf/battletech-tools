import React from 'react';
import { IAppGlobals } from '../../../app-router';
import PrintablePage from '../../../components/printable-page';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';

export default class MechCreatorPrintAS extends React.Component<IPrintASProps, IPrintASState> {
    constructor(props: IPrintASProps) {
        super(props);
        this.state = {
            updated: false,
        }
        this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }

    render = (): JSX.Element => {
      if(!this.props.appGlobals.currentBattleMech) {
        return <></>
      }
      return (
        <>
          <PrintablePage backTo={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/summary`} appGlobals={this.props.appGlobals}>
            <div className="print-page">
            <AlphaStrikeUnitSVG
              appGlobals={this.props.appGlobals}
              asUnit={this.props.appGlobals.currentBattleMech.getAlphaStrikeForceStats()}
              measurementsInHexes={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
            />
            </div>

          </PrintablePage>
        </>
      );
    }
}

interface IPrintASProps {
  appGlobals: IAppGlobals;
}

interface IPrintASState {
    updated: boolean;

}