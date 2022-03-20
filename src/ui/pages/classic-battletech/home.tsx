import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';
import { GiMissileMech } from "react-icons/gi";

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
        <UIPage current="classic-battletech" appGlobals={this.props.appGlobals}>


          <TextSection
            label="Classic BattleTech"
          >
              <ul className="icon-links">
                <li>
                  <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>
                    <GiMissileMech />
                    'Mech Creator
                  </Link>
                </li>
              </ul>

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