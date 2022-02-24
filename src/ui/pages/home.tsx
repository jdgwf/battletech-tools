import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../app-router';
import TextSection from '../components/text-section';
import UIPage from '../components/ui-page';
import './home.scss';

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Home");
    }

    render() {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>

          <div className="alert alert-success">
            <p>Yes! We're back. Sorry about that. I was hoping that the official BattleTech app would cover most of the functionality of this app, but, alas, it didn't. So we're back!</p>
            <p>I'll try to keep the <Link to="dev-status">Development Status</Link> page up to date, but it's easy to forget with all my other projects</p>
            <div className="text-right"><span title="Commanding Officer, Commanding Officer 😉😘">XOXO</span> - Jeff</div>
          </div>
          <TextSection
            label="News"
          >
                  <ul className="news">
                    <li>
                      <p><strong>2022 Feb 23</strong> - Added a Print function to your Alpha Strike Rosters (finally!?!?!).</p>
                      <p>I might be working on Google Account data syncing this afternoon, although Google still gives me the heebie-jeebies. First, however, I want to finish the internal <Link to="equipment-editor">Equipment Editor</Link> so I can get the rest of the Clan and Inner Sphere weapons ready for the BattleMech creator.</p>

                    </li>
                    <li>
                      <p><strong>2022 Feb 18</strong> - Since there's still a pretty big gap in Alpha Strike Force creation and BattleMech creation on mobile devices, I've decided to reopen this app again. The official App is great, albeit slow, and doesn't do much for Alpha Strike folks.</p>

                    </li>
                  </ul>
              </TextSection>

        </UIPage>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}