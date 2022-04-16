
import React from 'react';
import { FaArrowCircleLeft, FaCheckCircle, FaFileImport, FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BattleMech } from "../../../../classes/battlemech";
import { sswMechs } from "../../../../data/ssw/sswMechs";
import { addCommas } from "../../../../utils/addCommas";
import { getSSWXMLBasicInfo } from "../../../../utils/getSSWXMLBasicInfo";
import { IAppGlobals } from '../../../app-router';
import TextAreaField from "../../../components/form_elements/textarea_field";
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import SanitizedHTML from '../../../components/sanitized-html';
import StandardModal from "../../../components/standard-modal";
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';

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
            importMechName: "",
            importErrors: [],
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
      e: React.FormEvent<HTMLTextAreaElement | HTMLButtonElement>,
            mechData: string | null = null,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      if( mechData === null ) {
        mechData = e.currentTarget.value
      }

      let basicMechData = getSSWXMLBasicInfo( mechData.trim() );

        let sswCBill = -1;
        let mechCBill = -1;

        let sswBV2 = -1;
        let mechBV2 = -1;

        let sswBF = -1;
        let mechBF = -1;
        let importMechName = "";

        let tempBM = new BattleMech();
        let importErrors: string[] = [];

        tempBM.importSSWXML( mechData.trim() );

        if( basicMechData && tempBM )  {
          sswCBill = basicMechData.cbill_cost;
          sswBV2 = basicMechData.bv2;
          sswBF = basicMechData.bfvalue;
          mechCBill = tempBM.getCBillCostNumeric(true);
          mechBV2 = tempBM.getBattleValue();
          mechBF = tempBM.getAlphaStrikeValue();
          importMechName = basicMechData.model + " " + basicMechData.name;
          importErrors = tempBM.sswImportErrors;
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
          importMechName: importMechName,
          importErrors: importErrors,
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
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }

      let mechData = this.state.sswXML;

      if( this.props.appGlobals.currentBattleMech &&  mechData && mechData.trim() && mechData.trim().startsWith("<")) {
        this.props.appGlobals.currentBattleMech.importSSWXML( mechData.trim() );
        this.props.appGlobals.saveCurrentBattleMech( this.props.appGlobals.currentBattleMech );



        this.setState({
          updated: true,
          sswXML: "",
         })
      }

    }

    render = (): React.ReactFragment => {

      let sswMechCount = 0;
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
                          <div className="alert alert-info">

                            <p>This is now working perfectly in a limited fashion!</p>

                            <p>Since we're still short on base equipment for Clans, right now only the TRO3039 is loadable. Don't worry we'll get it taken care of as this app develops. TRO 3050/3055 is the next target!</p>

                            <div className="text-center">
                              <a href="https://github.com/Solaris-Skunk-Werks/SSW-Master" target="ssw">Solaris Skunk Werks Master Data Repo</a>
                            </div>

                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <h4 className="text-center">SSW 3039 and 3050 Inner Sphere Mechs</h4>
                              <div className="small-text">These 'mechs are the raw XML files from the Solaris Skunk Werks projects. Right now only the Intro rules level are available; we're working on the others.</div>
                              <div style={{overflow: "scroll", height: "600px"}}>
                              <ul className="styleless">
                            {sswMechs.map( (mechData, mechIndex) => {
                              let basicData = getSSWXMLBasicInfo( mechData );
                              if( basicData && basicData.rules_level_ssw === 0 ) {
                                sswMechCount++;

                                return (
                                  <li key={mechIndex}>
                                    <button
                                      onClick={(e) => this.updateSSWXML(e, mechData )}
                                      className="btn btn-primary btn-xs"
                                    >
                                      <FaFileImport />
                                    </button>&nbsp;{basicData.model} {basicData.name}
                                  </li>
                                )
                              }  else {
                                return <React.Fragment key={mechIndex}></React.Fragment>
                              }
                            })}
                            </ul>

                            </div>
                            <hr />
                            <div className="text-center">
                            {sswMechCount} SSW 'Mechs Available<br />
                            See the <Link to="ssw-sanity-check">Sanity Test</Link> page for compatibility
                            </div>
                            </div>
                            <div className="col-md-6">
                            <TextAreaField
                              label="Import SSW XML"
                              value={this.state.sswXML}
                              onChange={this.updateSSWXML}
                              className="taller"
                            />

                            {this.state.sswXML ? (
                              <>
                              <h3>Import Checks for {this.state.importMechName}</h3>
                              {this.state.sswCBill !== this.state.mechCBill ? (
                              <div>
                                <FaTimesCircle className="color-red" />&nbsp;CBill Costs doesn't match:<br />
                                  SSW: {addCommas(this.state.sswCBill)} != JBT: {addCommas(this.state.mechCBill)}

                                  {Math.abs(this.state.sswCBill - this.state.mechCBill ) < 3 ? (
                                    <div className="color-green">..but it's close - rounding error?</div>
                                  ) : null}
                              </div>
                            ) : (
                              <div>
                                <FaCheckCircle className="color-green" />&nbsp;CBill Costs match: {addCommas(this.state.mechCBill)}
                              </div>
                            )}
                            {/* {this.state.sswBF !== this.state.mechBF ? (
                              <div>
                                <FaTimesCircle className="color-red" />&nbsp;BF (Alpha Strike) Point Costs doesn't match:
                                  SSW: {this.state.sswBF} != JBT: {this.state.mechBF}
                              </div>
                            ) : (
                              <div>
                                <FaCheckCircle className="color-green" />&nbsp;BF (Alpha Strike) Point Costs match: {this.state.mechBF}
                              </div>
                            )} */}
                            {this.state.sswBV2 !== this.state.mechBV2 ? (
                              <div>
                                <FaTimesCircle className="color-red" />&nbsp;BV2 doesn't match:
                                  SSW: {addCommas(this.state.sswBV2)} != JBT: {addCommas(this.state.mechBV2)}
                              </div>
                            ) : (
                              <div>
                                <FaCheckCircle className="color-green" />&nbsp;BV2 matches: {addCommas(this.state.mechBV2)}
                              </div>
                            )}
                              </>
                            ) : null}
                            {this.state.importErrors.length > 0 ? (
                              <>
                              <h4>Import Errors</h4>
                              <ul>
                                {this.state.importErrors.map ( (line, lineIndex) => {
                                  return (
                                    <li key={lineIndex}>
                                      {line}
                                    </li>
                                  )
                                })}
                              </ul>
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
  importMechName: string;
  importErrors: string[];

  sswCBill: number;
  sswBV2: number;
  sswBF: number;
  mechCBill: number;
  mechBV2: number;
  mechBF: number;
}