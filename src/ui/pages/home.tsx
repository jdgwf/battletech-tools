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

    render = (): JSX.Element => {
      return (
        <UIPage current="home" appGlobals={this.props.appGlobals}>

          <div className="row">
            <div className="col-md">
              <TextSection
                label="Jeff's BattleTech Tools"
                >
                  <p>The purpose of this Progressive Web Application (PWA) is to make an easily-accessible set of tools to make both the Classic BattleTech (CBT) and Alpha Strike (AS) games faster and more efficient. Here you'll find tools for:</p>
                  <p>Although this app may be used on many devices, I've really focused on using an iPad, iPad mini, or other tablet sized devices. A laptop will work absolutely amazingly as well (especially if you have a tablet mode!), but you may find the interface a little busy for most phones. </p>
                  <ul className='styleless'>
                    <li>
                      <h3><Link to="alpha-strike/roster">Alpha Strike Roster</Link></h3>
                      <ul>
                        <li>The ability to search the <a href="http://masterunitlist.info" target="mul">Master Unit List (MUL)</a> and add Alpha Strike Units to your Companies/Lances/Stars/Binaries, etc.</li>
                        <li>After the MUL is searched and added to your forces, your units are stored offline on your local device.</li>
                        <li>You may print your AS forces here (which you can do on the MUL if you like), but more importantly you can...</li>
                        <li>Play your Alpha Strike games using a live in-play virtual stack of Alpha Strike Cards. When you unit takes damage or heat, the effects of the damage affect the card live and immediately. All your to-hit rolls are updated on-the-fly.</li>
                      </ul>
                    </li>
                    <li>
                      <h3><Link to="classic-battletech">Classic BattleTech Tools</Link></h3>
                      <p>Although this area is relatively new, it's functionality is growing nearly daily. Most of the tools here are not quite complete (there are lot of moving parts to CBT), but could very well be usable in your case.</p>
                      <ul>
                        <li>
                          <h4><Link to="classic-battletech/mech-creator">'Mech Creator</Link></h4>
                          <p>The 'mech creator closely follows the Classic BattleTech Tech Manual's steps in creating a BattleMech, whether it be a Biped or Quad.</p>
                          <ul>
                            <li>BattleValue 2, Alpha Strike Stats, and C-Bill cost are all matching up with standard BattleTech designs</li>
                            <li>Currently most introductory and standard equipment are available to Inner Sphere designs.</li>
                            <li>Very basic Clan 'mechs can be created, though data entry for the Clan equipment is lagging.</li>
                            <li>When you save your 'mechs you have the ability to add them to your 'mech roster.</li>
                          </ul>
                        </li>
                        <li>
                          <h4><Link to="classic-battletech/roster">'Mech Roster</Link></h4>
                          <p>This area is under construction, but is nearing initial completion as of 2022 April 9. Like the Alpha Strike Roster, this is a set of Electronic Record Sheets which will allow you to:</p>
                          <ul>
                            <li>Track your movement modes and to-hit numbers for each mech at a glance</li>
                            <li>Set your targets speed, range, and other to-hit modifiers (you may have up to 3 targets at one time)</li>
                            <li>Assign your weapons to your targets, your GATOR and final To-Hit will be calculated for you</li>
                            <li>During the Firing Phase, you'll open up a single sheet with all your 'mechs and weapons with their respective targets with the ability to mark the attack as resolved. Cluster hits are easily tracked as well.</li>
                            <li>Heat is automatically assigned during the heat phase per the 'mech's movement mode and discharged weapons.</li>
                          </ul>
                        </li>

                      </ul>

                    </li>
                    <li>
                      <h4><Link to="settings/backup-and-restore">Backing up and Restoring</Link></h4>
                      <p className="alert alert-warning alert-thin">Your data is always private and stored on your own device. This means that if you lose your device you lose your data!</p>
                      <p>That said, I've coded a pretty robust set of backup and restore tools which you can save on your Dropbox/OneDrive/iCloud/NextCloud/OwnCloud/Box (ad nauseum).</p>
                      <p>I've chosen this method mostly because getting logins for Google/Microsoft/etc on a GitHub hosted domain has been challenging and <strong>I want this app to be forever free and forever open source</strong> even after my untimely demise. Having this app hosted at GitHub helps guarantee that as hosting is graciously provided by GitHub at no cost.</p>
                    </li>
                  </ul>
                  <h3>Why? What's the purpose of ths app? I use Solaris Skunk Werks/Mech Factory/ etc.</h3>
                  <p>Each of these software packages are amazing tools! However what they lack is complete cross-platform compatibility and ease of tablet use. Sure, <a href="https://battletech.rpg.hu/mechfactory_frame.php">Mech Factory</a> comes close, but it can't be used offline.</p>
                  <p>I created this app originally for just an electronic Alpha Strike roster sheet, but it's grown slowly (quickly as of 2022) into more.</p>

                  <h3>What's next? What are your plans?</h3>
                  <p>Although I'm not the best at updating the <Link to="dev-status">Development Status Page</Link>, this will be the place where I place my development intentions and what I'm currently working on.</p>
                </TextSection>
            </div>
            <div className="col-md">
            <TextSection
              label="News"
            >
                  <ul className="news">
                  <li>
                  <h4>
                      <strong>2023 July 23</strong> - New Special Abilities
                    </h4>
                    Many thanks to <a href="https://github.com/Stew-rt">Stew-rt</a> for adding a slew of special abilities in my time of busy crazy kicking cancer's ass time for me (3 more Chemo session - woot!). This is why Open Source rocks! Thank you again, Stew-rt!
                  </li>
                  <li>
                    <h4>
                      <strong>2022 June 8</strong> - MUL Elemental and Infantry Size fixes &amp; Pilot Abilities
                    </h4>
                    <h5>Elemental Unit Sizes</h5>
                    <p>The Master Unit List has split up Battle Armor unit sizes into larger and smaller chunks for those looking for over and under sized units. This took effect earlier this week and instantly fixed our <a href="https://github.com/jdgwf/battletech-tools/issues/13" target="github">Issue #13</a></p>

                    <h5>Alpha Strike Pilot Cards</h5>
                    <p>I've added initial support for Pilot Cards in the Alpha Strike roster. The pilot card is selected in the Unit Edit screen (where you'd change the pilot skill or unit name). The pilot card will be printed next to the 'mech card, listed beneath the mech listing, and a clickable link in the In-Play screen. It's noted on the Unit Card in green below the name for ease of recognition. The PV is listed on the card, but added to the unit cost on the card just in case it's not used during the game. The Pilot card <strong>is</strong> added to the Group and Force totals, though.</p>
                  </li>
                  <li>
                    <h4>
                      <strong>2022 April 25</strong>
                    </h4>

                    <p>Intro 'mechs are nearly 100% matching across the board via SSW imports. Allocating Hatchets are the only import errors. All C-Bill and BV2 costs are correct.</p>
                    <h5>CBT Mech Creator</h5>
                    <p>The 'mech creator now has the ability to split criticals.</p>
                    <ol>
                      <li>Just select your unallocated 8 or larger critical slot item</li>
                      <li>press the "Split Criticals" button</li>
                      <li>You'll then be prompted how many slots for the first allocation.</li>
                      <li>Place your first item slot.</li>
                      <li>Then select the spot for the remainder of the slots</li>
                      </ol>

                      <h5>Alpha Strike</h5>
                      <p>Alpha Strike Cards can now display measurements in Hexes optionally if you play on hex boards. Just click on the ruler/hex button at the top of the Print or Play pages, or select your preference in the <Link to="settings">Settings</Link> page </p>

                  </li>
                  <li>
                    <h4>
                      <strong>2022 April 16</strong>
                    </h4>
                    <p>Solaris Skunk Werks data for 3039TRO should be 100% good to go.  My internal <Link to="ssw-sanity-check">Sanity Test</Link> page has all the calculations for c-bills and bv2 matching 100% for all 213 mechs for the 3039 TRO. This wasn't easy, but it sure helped clean up my BV2 calculator. On slower computers or phones, this may take a few of seconds to load as it imports each of the SSW files, calculates the BV2 and C-Bill cost, then compares it to the XML file's stated BV2 and C-Bill costs.</p>
                    <p>Needless to say this is a huge step in the direction of accuracy for this app.</p>

                    <h5>Addendum</h5>
                    <p>The handful of 3050U Inner Sphere 'mechs have been imported, and are also matching their SSW values</p>
                  </li>
                  <li>
                    <h4><strong>2022 April 14</strong></h4>
                    <p>I've added a tentative <Link to="classic-battletech/mech-creator/imports">importer</Link> for the Solar Skunk Werk's Master File format. I'm having relative good success with Inner Sphere mechs (<del>without jump jets, for now, perhaps tomorrow or Saturday</del> nah, already added it: Stingers, Phoenix Hawks, and Wasps all work perfectly!).</p>
                    <p>The Repo is here: <a href="https://github.com/Solaris-Skunk-Werks/SSW-Master" target="ssw">Solaris Skunk Werks Master Data Repo</a>, and the direct download is here: <a href="https://github.com/Solaris-Skunk-Werks/solarisskunkwerks/releases" target="ssw">SSW-Master.zip is the file you want</a></p>
                  </li>
                  <li>
                    <h4><strong>2022 April 9</strong></h4>
                    <p>I've activated the "bigger menu" for folks who haven't checked the "Show Developer/Work In Progress Menu" option in settings. This means that the <Link to="classic-battletech/roster">CBT Roster</Link> is now visible to search engines and normal folk.</p>
                    <p>I've also added an intro blurb to the home page explaining the purpose of this web app.</p>
                  </li>
                  <li>
                      <h4><strong>2022 April 8</strong></h4>
                      <p>The CBT Roster In-Play Section is coming along, albeit slower than I'd like, but there are a lot more moving parts compared to the Alpha Strike Roster.</p>
                      <p>Right now what works: Movement, Target Selection, Weapon Target Assignments (along with GATOR calculations), and Fire Control Resolving marks (as well as cluster hit tracking)</p>
                      <p>Coming Soon (hopefully this weekend, health dependent?): Heat Allocation at end of turn, Damage Entry box (which will assign each damage per location auto-magically, and let you know the crits as you enter the damage, and Critical Damage tracking.</p>
                      <p>Right now you should be able to technically play without all the premium functions (keeping track of heat on your own, and clicking each damage box)</p>
                      <p>This is the very start of this in-play sheet. I'm sure once I get going there'll be more Quality of Life features coming (such as Ammo Explosion calculations)</p>
                    </li>
                    <li>
                      <h4><strong>2022 April 3</strong></h4>
                      <p>Work on the <Link to="classic-battletech/roster">CBT Roster</Link> has started. If you want to see it in the menu, go to <Link to="settings">Settings</Link> then click on "Show Developer/Work In Progress Menu"</p>
                      <p>The basic rostering functions should work, but the Print and Play buttons don't have a URL endpoint yet. I'll have the Print completed first, but the Play button will likely take me the better part of a week to code as I'll need to code the Electronic Character Sheet functions both into the SVG Record Sheet and in the BattleMech class object </p>
                      <p>Ideally all you should need is your tablet for quick and easy lance management during your games. This may take a while for me to iron out the in-play workflow</p>
                      <p className="text-center"><strong>Update</strong>: Print Roster function seems to be working great already!</p>
                    </li>
                  <li>
                      <h4><strong>2022 April 2</strong></h4>
                      <p>Added Rotary ACs for Inner Sphere. I think this closes out the Ballistic Weapons for that tech. Shows up /shot on record sheet too.</p>

                    </li>
                    <li>
                      <h4><strong>2022 Mar 13</strong></h4>
                      <p>The <Link to="settings">Settings</Link> page now includes some total backup/restore functionality. Some care has been made to be sure that if you have any new items on the restore-to device, that the data won't be overwritten. Work still progresses on that safety. You should now have all you need to sync (manually) across devices until I find some syncing solution which is compatible with GitHub pages.</p>

                    </li>
                    <li>
                      <h4><strong>2022 Mar 11</strong></h4>
                      <p>I've started reworking the <Link to="alpha-strike/roster">Alpha Strike Roster</Link> interface. Adding units to the current force is now on a button. Later I might change the main screen so that all the Current Units show up on top and favorite units will be at the bottom. Right now this cleans uop the page significantly, but I'm still not happy with it.</p>

                    </li>
                    <li>
                      <h4><strong>2022 Feb 23</strong></h4>
                      <p>Added a Print function to your Alpha Strike Rosters (finally!?!?!).</p>
                      <p>I might be working on Google Account data syncing this afternoon, although Google still gives me the heebie-jeebies. First, however, I want to finish the internal <Link to="equipment-editor">Equipment Editor</Link> so I can get the rest of the Clan and Inner Sphere weapons ready for the BattleMech creator.</p>

                    </li>
                    <li>
                      <h4><strong>2022 Feb 18</strong></h4>
                      <p>Since there's still a pretty big gap in Alpha Strike Force creation and BattleMech creation on mobile devices, I've decided to reopen this app again. The official App is great, albeit slow, and doesn't do much for Alpha Strike folks.</p>

                    </li>
                  </ul>
              </TextSection>
            </div>
          </div>

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