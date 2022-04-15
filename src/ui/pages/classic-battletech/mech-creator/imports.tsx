
import { FaArrowCircleLeft, FaCheckCircle, FaFileImport, FaTimesCircle } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import SanitizedHTML from '../../../components/sanitized-html';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import TextAreaField from "../../../components/form_elements/textarea_field";
import { BattleMech } from "../../../../classes/battlemech";
import StandardModal from "../../../components/standard-modal";
import { sswMechs } from "../../../../data/ssw/sswMechs";
import { getSSWXMLBasicInfo } from "../../../../utils/getSSWXMLBasicInfo";
import { replaceAll } from "../../../../utils/replaceAll";

export default class MechCreatorImports extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            TRO: "",
            ParsedTRO: null,
            importTROModal: false,
            updated: false,
            sswXML: ``,
            sswCBill: -1,
            sswBV2: -1,
            sswBF: -1,
            mechCBill: -1,
            mechBV2: -1,
            mechBF: -1,
        }

        this.props.appGlobals.makeDocumentTitle("Imports | 'Mech Creator");
    }


    updateTRO = (e: React.FormEvent<HTMLTextAreaElement>) => {

      let parsed: BattleMech | null = null;
      if( e.currentTarget.value && e.currentTarget.value.trim() ) {
        parsed = new BattleMech();
        parsed.importTRO( e.currentTarget.value );
      }

      this.setState({
        TRO: e.currentTarget.value,
        ParsedTRO: parsed,
      })
    }

    closeTROModal = (
      e:React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        importTROModal: false,
      })
    }

    importTRO = (
      e:React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      if( this.state.ParsedTRO ) {
        let currentBattleMech = this.props.appGlobals.currentBattleMech;

        currentBattleMech = new BattleMech();
        currentBattleMech.import( this.state.ParsedTRO.export() )
        this.props.appGlobals.saveCurrentBattleMech( currentBattleMech )
        this.setState({
          TRO: "",
          ParsedTRO: null,
          importTROModal: false,
          updated: true,
        })
      }

    }

    openTROModal = (
      e:React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        importTROModal: true,
        TRO: "",
        ParsedTRO: null,
      })
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
      e: React.FormEvent<HTMLButtonElement>,
      mechData: string | null = null,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if( mechData === null ) {
        mechData = this.state.sswXML
      }

      if( this.props.appGlobals.currentBattleMech &&  mechData && mechData.trim() && mechData.trim().startsWith("<")) {
        this.props.appGlobals.currentBattleMech.importSSWXML( mechData.trim() );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );
        let basicMechData = getSSWXMLBasicInfo( mechData.trim() );

        let sswCBill = -1;
        let mechCBill = -1;

        let sswBV2 = -1;
        let mechBV2 = -1;

        let sswBF = -1;
        let mechBF = -1;

        if( basicMechData && this.props.appGlobals.currentBattleMech )  {
          sswCBill = basicMechData.cbill_cost;
          sswBV2 = basicMechData.bv2;
          sswBF = basicMechData.bfvalue;
          mechCBill = this.props.appGlobals.currentBattleMech.getCBillCostNumeric(true);
          mechBV2 = this.props.appGlobals.currentBattleMech.getBattleValue();
          mechBF = this.props.appGlobals.currentBattleMech.getAlphaStrikeValue();
        }

        this.setState({
          updated: true,
          sswXML: mechData,
          sswCBill: sswCBill,
          sswBV2: sswBV2,
          sswBF: sswBF,
          mechCBill: mechCBill,
          mechBV2: mechBV2,
          mechBF: mechBF,
        })
      }

    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>
                      <StandardModal
              title="Experimental TRO importer!"
              show={this.state.importTROModal}
              onClose={this.closeTROModal}
              onAdd={this.state.ParsedTRO ? this.importTRO : undefined }
              labelAdd="Import and Replace"
              className="modal-xl"
            >
<div className="row">
                          <div className="col">
                          <strong>Import Copy/Paste TRO</strong>
                            <p>Because of formatting of copy/paste in Apple Preview, etc, it seems that Adobe Reader is required for ease of use. You could use another, but the copy/paste of Preview and other PDF viewer apps can be erratic with page formatting.</p>
                            </div>

                            <div className="col">
                            <strong>Parsed TRO</strong>
                            <p>What will never work: The standard PDF TROs don't let you know what actuators are missing and where to set the Heat Sink criticals, so you'll have to edit that yourself. That said, this should save you a lot of time!</p>
                          </div>
</div>
<div className="row">
                          <div className="col">

                            <textarea
                              onChange={this.updateTRO}
                              value={this.state.TRO}
                              className="full-width tall"
                            >

                            </textarea>
                          </div>
                          <div className="col">

                            {this.state.ParsedTRO ? (
                                <SanitizedHTML html={this.state.ParsedTRO.makeTROHTML()} raw={true} />
                            ) :
                            (
                              <div className="text-center">
                              <br />
                                <p>Paste something, and we'll see what we can do!</p>
                                <p>Remember: It seems that only Adobe Acrobat does a good job at copying all the text in an orderly fashion.</p>
                              </div>
                            )}
                          </div>
                        </div>
            </StandardModal>
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
                        label="Imports Skunkwerks .ssw XML"
                      >
                          <div className="alert alert-danger">
                            This is brand new as of April 14.
                            Feel free to visit the Solaris Skunk Werks Data repository to copy and paste the contents of their .ssw files (which are .xml files).<br /><br />

                            <div className="text-center">
                              <a href="https://github.com/Solaris-Skunk-Werks/SSW-Master" target="ssw">Solaris Skunk Werks Master Data Repo</a>
                            </div>
                            <br />
                            Right now have I have an Atlas AS7-D preloaded, <del>as the BV and CBill costs are a bit off</del> (fixed, was a problem with SRM Ammo cbill cost typo, BV2 is off with TRO, but matches SSW), not to mention the Alpha Strike Values.
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <h4>SSW Intro 3039 Mechs</h4>
                              <div style={{overflow: "scroll", height: "600px"}}>
                              <ul className="styleless">
                            {sswMechs.map( (mechData, mechIndex) => {
                              let basicData = getSSWXMLBasicInfo( mechData );
                              if( basicData && basicData.rules_level_ssw === 0) {
                                return (
                                  <li key={mechIndex}>
                                    <button
                                      onClick={(e) => this.doImport(e, mechData )}
                                      className="btn btn-primary btn-xs"
                                    >
                                      <FaFileImport />
                                    </button>&nbsp;{basicData.model} {basicData.name}
                                  </li>
                                )
                              }
                            })}
                            </ul>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <TextAreaField
                              label="Import SSW XML"
                              value={this.state.sswXML}
                              onChange={this.updateSSWXML}
                              className="taller"
                            />
                            <h3>Import Checks</h3>
                            {this.state.sswXML ? (
                              <>
                              {this.state.sswCBill !== this.state.mechCBill ? (
                              <div>
                                <FaTimesCircle className="color-red" />&nbsp;CBill Costs don't match:
                                  SSW: {this.state.sswCBill} != JBT: {this.state.mechCBill}
                              </div>
                            ) : (
                              <div>
                                <FaCheckCircle className="color-green" />&nbsp;CBill Costs match: {this.state.mechCBill}
                              </div>
                            )}
                            {/* {this.state.sswBF !== this.state.mechBF ? (
                              <div>
                                <FaTimesCircle className="color-red" />&nbsp;BF (Alpha Strike) Point Costs don't match:
                                  SSW: {this.state.sswBF} != JBT: {this.state.mechBF}
                              </div>
                            ) : (
                              <div>
                                <FaCheckCircle className="color-green" />&nbsp;BF (Alpha Strike) Point Costs match: {this.state.mechBF}
                              </div>
                            )} */}
                            {this.state.sswBV2 !== this.state.mechBV2 ? (
                              <div>
                                <FaTimesCircle className="color-red" />&nbsp;BV2 don't match:
                                  SSW: {this.state.sswBV2} != JBT: {this.state.mechBV2}
                              </div>
                            ) : (
                              <div>
                                <FaCheckCircle className="color-green" />&nbsp;BV2 matches: {this.state.mechBV2}
                              </div>
                            )}
                              </>
                            ) : null}


                            </div>
                          </div>

                          <div className="text-right">
                            <button
                              className="btn btn-primary"
                              onClick={this.doImport}
                            >
                              Do Import
                              <div className="small-text">This will overwrite your current 'mech. Be sure to have it saved!</div>
                            </button>

                          </div>
                          <div className="clear-both overflow-hidden">
                            <hr />

                              <div className="text-left inline-block">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/exports`} className="btn btn-primary btn-sm"><FaArrowCircleLeft /> Exports</Link>
                            </div>
                          </div>
                        </TextSection>

                        <TextSection
                          label="Import TRO Text"
                        >
                            Feeling Lucky? Want to try something new and dangerous?
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={this.openTROModal}
                            >
                              Try the TRO text importer!
                            </button>
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
  TRO: string;
  ParsedTRO: BattleMech | null,
  importTROModal: boolean;

  sswCBill: number;
  sswBV2: number;
  sswBF: number;
  mechCBill: number;
  mechBV2: number;
  mechBF: number;
}