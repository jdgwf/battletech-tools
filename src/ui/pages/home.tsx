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

    render = (): React.ReactFragment => {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>

          {/* <div className="alert alert-success">
            <p>Yes! We're back. Sorry about that. I was hoping that the official BattleTech app would cover most of the functionality of this app, but, alas, it didn't. So we're back!</p>
            <p>I'll try to keep the <Link to="dev-status">Development Status</Link> page up to date, but it's easy to forget with all my other projects</p>
            <div className="text-right"><span title="Commanding Officer, Commanding Officer 😉😘">XOXO</span> - Jeff</div>
          </div> */}
          <TextSection
            label="News"
          >
                  <ul className="news">
                  <li>
                      <p><strong>2022 April 8</strong> - The CBT Roster In-Play Section is coming along, albeit slower than I'd like, but there are a lot more moving parts compared to the Alpha Strike Roster.</p>
                      <p>Right now what works: Movement, Target Selection, Weapon Target Assignments (along with GATOR calculations), and Fire Control Resolving marks (as well as cluster hit tracking)</p>
                      <p>Coming Soon (hopefully this weekend, health dependent?): Heat Allocation at end of turn, Damage Entry box (which will assign each damage per location auto-magically, and let you know the crits as you enter the damage, and Critical Damage tracking.</p>
                      <p>Right now you should be able to technically play without all the premium functions (keeping track of heat on your own, and clicking each damage box)</p>
                      <p>This is the very start of this in-play sheet. I'm sure once I get going there'll be more Quality of Life features coming (such as Ammo Explosion calculations)</p>
                    </li>
                    <li>
                      <p><strong>2022 April 3</strong> - Work on the <Link to="classic-battletech/roster">CBT Roster</Link> has started. If you want to see it in the menu, go to <Link to="settings">Settings</Link> then click on "Show Developer/Work In Progress Menu"</p>
                      <p>The basic rostering functions should work, but the Print and Play buttons don't have a URL endpoint yet. I'll have the Print completed first, but the Play button will likely take me the better part of a week to code as I'll need to code the Electronic Character Sheet functions both into the SVG Record Sheet and in the BattleMech class object </p>
                      <p>Ideally all you should need is your tablet for quick and easy lance management during your games. This may take a while for me to iron out the in-play workflow</p>
                      <p className="text-center"><strong>Update</strong>: Print Roster function seems to be working great already!</p>
                    </li>
                  <li>
                      <p><strong>2022 April 2</strong> - Added Rotary ACs for Inner Sphere. I think this closes out the Ballistic Weapons for that tech. Shows up /shot on record sheet too.</p>

                    </li>
                    <li>
                      <p><strong>2022 Mar 13</strong> - The <Link to="settings">Settings</Link> page now includes some total backup/restore functionality. Some care has been made to be sure that if you have any new items on the restore-to device, that the data won't be overwritten. Work still progresses on that safety. You should now have all you need to sync (manually) across devices until I find some syncing solution which is compatible with GitHub pages.</p>

                    </li>
                    <li>
                      <p><strong>2022 Mar 11</strong> - I've started reworking the <Link to="alpha-strike/roster">Alpha Strike Roster</Link> interface. Adding units to the current force is now on a button. Later I might change the main screen so that all the Current Units show up on top and favorite units will be at the bottom. Right now this cleans uop the page significantly, but I'm still not happy with it.</p>

                    </li>
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