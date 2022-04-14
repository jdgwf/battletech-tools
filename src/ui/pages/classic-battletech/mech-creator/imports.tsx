
import { FaArrowCircleLeft } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import SanitizedHTML from '../../../components/sanitized-html';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import TextAreaField from "../../../components/form_elements/textarea_field";

export default class MechCreatorImports extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
            sswXML: `<?xml version="1.0" encoding ="UTF-8"?>
            <mech name="Atlas" model="AS7-D" tons="100" omnimech="FALSE" solaris7id="0" solaris7imageid="0" sswimage="../Images/No_Image.png">
                <ssw_savefile_version>3</ssw_savefile_version>
                <battle_value>1897</battle_value>
                <cost>9519000.0</cost>
                <rules_level>0</rules_level>
                <era>0</era>
                <productionera>1</productionera>
                <mech_type>BattleMech</mech_type>
                <techbase manufacturer="Unknown" location="Unknown">Inner Sphere</techbase>
                <year restricted="FALSE">2755</year>
                <motive_type>Biped</motive_type>
                <structure manufacturer="Unknown" techbase="2">
                    <type>Standard Structure</type>
                </structure>
                <engine rating="300" manufacturer="Unknown" lsstart="-1" rsstart="-1" techbase="2">Fusion Engine</engine>
                <gyro techbase="2">Standard Gyro</gyro>
                <cockpit>
                    <type ejectionseat="FALSE" commandconsole="FALSE" fhes="FALSE">Standard Cockpit</type>
                </cockpit>
                <armor manufacturer="Unknown" techbase="2">
                    <type>Standard Armor</type>
                    <hd>9</hd>
                    <ct>47</ct>
                    <ctr>14</ctr>
                    <lt>32</lt>
                    <ltr>10</ltr>
                    <rt>32</rt>
                    <rtr>10</rtr>
                    <la>34</la>
                    <ra>34</ra>
                    <ll>41</ll>
                    <rl>41</rl>
                </armor>
                <baseloadout fcsa4="FALSE" fcsa5="FALSE" fcsapollo="FALSE">
                    <source>RS3039u</source>
                    <info>Atlas AS7-D 100t, 3/5/0, Std FE, Std; 19.0T/99% Armor; 20 SHS; 4 ML, 1 SRM6, 1 AC20, 1 LRM20</info>
                    <battleforce pv="19" wt="4" mv="3" s="5" m="5" l="2" e="0" ov="0" armor="10" internal="8" abilities="SRCH, ES, SEAL, SOA, AC 2/2/0, LRM 1/1/1, IF 1" />
                    <actuators lla="TRUE" lh="TRUE" rla="TRUE" rh="TRUE"/>
                    <clancase>FALSE</clancase>
                    <heatsinks number="20" techbase="2">
                        <type>Single Heat Sink</type>

                        <location index="5">RL</location>
                        <location index="4">RL</location>
                        <location index="4">LL</location>
                        <location index="5">LL</location>
                        <location index="4">LA</location>
                        <location index="0">LT</location>
                        <location index="3">HD</location>
                        <location index="4">RA</location>
                    </heatsinks>
                    <equipment>
                        <name manufacturer="">(IS) Autocannon/20</name>
                        <type>ballistic</type>
                        <location index="0">RT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="">(IS) Medium Laser</name>
                        <type>energy</type>
                        <location index="5">LA</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="">(IS) Medium Laser</name>
                        <type>energy</type>
                        <location index="5">RA</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="">(R) (IS) Medium Laser</name>
                        <type>energy</type>
                        <location index="10">CT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="">(R) (IS) Medium Laser</name>
                        <type>energy</type>
                        <location index="11">CT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="">(IS) LRM-20</name>
                        <type>missile</type>
                        <location index="1">LT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="">(IS) SRM-6</name>
                        <type>missile</type>
                        <location index="6">LT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="Unknown">@ SRM-6</name>
                        <type>ammunition</type>
                        <location index="10">LT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="Unknown">(IS) @ LRM-20</name>
                        <type>ammunition</type>
                        <location index="8">LT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="Unknown">(IS) @ LRM-20</name>
                        <type>ammunition</type>
                        <location index="9">LT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="Unknown">(IS) @ AC/20</name>
                        <type>ammunition</type>
                        <location index="10">RT</location>
                    </equipment>
                    <equipment>
                        <name manufacturer="Unknown">(IS) @ AC/20</name>
                        <type>ammunition</type>
                        <location index="11">RT</location>
                    </equipment>
                </baseloadout>
                <fluff>
                    <overview></overview>
                    <capabilities></capabilities>
                    <battlehistory></battlehistory>
                    <deployment></deployment>
                    <variants></variants>
                    <notables></notables>
                    <additional></additional>
                    <jumpjet_model>None</jumpjet_model>
                    <commsystem>Unknown</commsystem>
                    <tandtsystem>Unknown</tandtsystem>
                </fluff>
            </mech>

            `,
        }

        this.props.appGlobals.makeDocumentTitle("Imports | 'Mech Creator");
    }

    updateSSWXML = (
      e: React.FormEvent<HTMLTextAreaElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      this.setState({
        sswXML: e.currentTarget.value,
      })

      // if( this.props.appGlobals.currentBattleMech && e.currentTarget.value && e.currentTarget.value.trim() && e.currentTarget.value.trim().startsWith("<")) {
      //   this.props.appGlobals.currentBattleMech.importSSWXML( e.currentTarget.value.trim() );
      // }
      // this.setState({
      //   updated: true,
      // })
    }

    doImport = (
      e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }


      if( this.props.appGlobals.currentBattleMech &&  this.state.sswXML && this.state.sswXML.trim() && this.state.sswXML.trim().startsWith("<")) {
        this.props.appGlobals.currentBattleMech.importSSWXML( this.state.sswXML.trim() );
      }

      this.setState({
        updated: true,
      })
    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>
            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="imports"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <TextSection
                        label="Imports"
                      >
                          <div className="alert alert-danger">
                            This is brand new as of April 14.
                            Feel free to visit the Solaris Skunk Werks Data repository to copy and paste the contents of their .ssw files (which are .xml files).<br /><br />

                            <div className="text-center">
                              <a href="https://github.com/Solaris-Skunk-Werks/SSW-Master" target="ssw">Solaris Skunk Werks Master Data Repo</a>
                            </div>
                            <br />
                            Right now have I have an Atlas AS7-D preloaded, as the BV and CBill costs are a bit off, not to mention the Alpha Strike Values.
                          </div>
                          <TextAreaField
                            label="Import SSW XML"
                            value={this.state.sswXML}
                            onChange={this.updateSSWXML}
                            className="taller"
                          />
                          <div className="text-right">
                            <button
                              className="btn btn-primary"
                              onClick={this.doImport}
                            >
                              Do Import
                            </button>
                          </div>
                          <div className="clear-both overflow-hidden">
                            <hr />

                              <div className="text-left inline-block">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/exports`} className="btn btn-primary btn-sm"><FaArrowCircleLeft /> Exports</Link>
                            </div>
                          </div>
                        </TextSection>

                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                    <TextSection

                    >
                      <div className="mech-tro">
                        <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                      </div>
                    </TextSection>

                    </div>
                  </div>
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
  sswXML: string;
}