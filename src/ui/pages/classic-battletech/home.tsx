import React from 'react';
import { Link } from 'react-router-dom';
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
                  Nothing to see here yet!
                  <br /><br /><Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>'Mech Creator</Link><br />
                  <br /><br />
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