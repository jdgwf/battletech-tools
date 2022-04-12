import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';
import { GiMissileMech } from "react-icons/gi";
import { MdTableView } from 'react-icons/md';

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
        <UIPage current="classic-battletech-home" appGlobals={this.props.appGlobals}>

          <TextSection
            label="Classic BattleTech"
          >
              <div className="icon-links">
                  <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>
                    <GiMissileMech />
                    'Mech Creator
                  </Link>

                  <Link  to={`${process.env.PUBLIC_URL}/classic-battletech/roster`}>
                    <MdTableView />
                    Classic BattleTech Roster
                  </Link>
              </div>

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