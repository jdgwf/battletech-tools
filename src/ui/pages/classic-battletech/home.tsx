import React from 'react';
import { IAppGlobals } from '../../app-router';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';

export default class ClassicBattleTechHome extends React.Component<IClassicBattleTechHomeProps, IClassicBattleTechHomeState> {
    constructor(props: IClassicBattleTechHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("ClassicBattleTechHome");
    }

    render = (): React.ReactFragment => {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>


          <TextSection
            label="Classic BattleTech"
          >
                  ( temp home )
              </TextSection>

        </UIPage>
      );
    }
}

interface IClassicBattleTechHomeProps {
  appGlobals: IAppGlobals;
}

interface IClassicBattleTechHomeState {
    updated: boolean;

}