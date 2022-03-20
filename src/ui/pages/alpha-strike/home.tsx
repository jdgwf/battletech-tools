import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../app-router';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';

export default class AlphaStrikeHome extends React.Component<IAlphaStrikeHomeProps, IAlphaStrikeHomeState> {
    constructor(props: IAlphaStrikeHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("AlphaStrikeHome");
    }

    render = (): React.ReactFragment => {
      return (
        <UIPage current="alpha-strike" appGlobals={this.props.appGlobals}>


          <TextSection
            label="Alpha Strike"
          >
            Nothing to see here yet!
            <br /><br />
            <Link  to={`${process.env.PUBLIC_URL}/alpha-strike/roster`}>Alpha Strike Roster</Link><br />
            <br /><br />
          </TextSection>

        </UIPage>
      );
    }
}

interface IAlphaStrikeHomeProps {
  appGlobals: IAppGlobals;
}

interface IAlphaStrikeHomeState {
    updated: boolean;

}