
import React from 'react';
import { FaArrowCircleLeft, FaCheckCircle, FaEye, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BattleMech } from "../../../../classes/battlemech";
import { sortByMechName } from '../../../../utils/sortByMechName';
import { getSSWRulesLevelLabel } from '../../../../utils/sswUtils';
import { IAppGlobals } from '../../../app-router';
import InputField from '../../../components/form_elements/input_field';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import SanitizedHTML from '../../../components/sanitized-html';
import StandardModal from "../../../components/standard-modal";
import BattleMechSVG from '../../../components/svg/battlemech-svg';
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
            viewingUnit: null,
        }

        this.props.appGlobals.makeDocumentTitle("Imports | 'Mech Creator");
    }

    updateMechNameFilter = (
      e: React.FormEvent<HTMLInputElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }
      let appSettings = this.props.appGlobals.appSettings;
      appSettings.mechNameFilter = e.currentTarget.value;

      this.props.appGlobals.saveAppSettings(appSettings);
      this.setState({
        updated: true,
      })
    }

    updateMechRulesFilter = (
      e: React.FormEvent<HTMLSelectElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }
      let appSettings = this.props.appGlobals.appSettings;
      appSettings.mechRulesFilter = +e.currentTarget.value;

      this.props.appGlobals.saveAppSettings(appSettings)
      this.setState({
        updated: true,
      })
    }

    _filterSSWMechs = (
      a: BattleMech
    ): boolean => {

      if(
        this.props.appGlobals.appSettings.mechNameFilter.trim() !== ""
        &&
        a.getName().trim().toLowerCase().indexOf( this.props.appGlobals.appSettings.mechNameFilter.trim().toLowerCase()  ) === -1
      ) {
        return false;
      }

      if(
        this.props.appGlobals.appSettings.mechRulesFilter > -1
        &&
        a.basicSSWInfo?.rules_level_ssw !== this.props.appGlobals.appSettings.mechRulesFilter
      ) {
        return false;
      }

      return true;
    }

    importUnit = (
      e:React.FormEvent<HTMLButtonElement>,
      unit: BattleMech,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }
      if( unit ) {
        this.props.appGlobals.saveCurrentBattleMech( unit );
      }
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


    viewUnit = (
      e: React.FormEvent<HTMLButtonElement>,
      bm: BattleMech,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      console.log("viewUnit", bm.getName() )
      this.setState({
        viewingUnit: bm,
      })
    }

  closeViewUnit = (
      e: React.FormEvent<HTMLButtonElement> | null,
  ) => {
      if( e && e.preventDefault ) {
          e.preventDefault();
      }
      this.setState({
          viewingUnit: null,
      })
  }

  importViewedUnit = (
    e: React.FormEvent<HTMLButtonElement> | null,
  ) => {
      if( e && e.preventDefault ) {
          e.preventDefault();
      }
      if( this.state.viewingUnit ) {
        this.props.appGlobals.saveCurrentBattleMech( this.state.viewingUnit );
      }

  }

    render = (): JSX.Element => {

      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>
  <StandardModal
        show={this.state.viewingUnit ? true : false}
        onClose={this.closeViewUnit}
        onAdd={this.importViewedUnit}
        labelAdd={"Import This Unit"}
        className="modal modal-xl"
    >
      {this.state.viewingUnit ? (
        <>
        <h3 className="text-center">Viewing {this.state.viewingUnit.model}</h3>
        <div className="row">
            <div className='col'>
                <SanitizedHTML
                    raw={true}
                    html={this.state.viewingUnit.makeTROHTML()}
                />
            </div>
            <div className='col'>
                <BattleMechSVG
                    mechData={this.state.viewingUnit}
                />
            </div>
        </div>
        </>
        ) : null}
</StandardModal>

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
              <div className="col-md-9 col-lg-6">

                      <TextSection
                        label="Imports From Skunkwerks"
                      >
                          <div className="alert alert-info">

                            <p>This is now working perfectly in a limited fashion! Be sure to only semi-trust the units with a <FaCheckCircle title="This import looks good to add!" className="color-green" /> beside their name</p>

                            <p>Since we're still short on base equipment for Clans, right now only the TRO3039 is loadable. Don't worry we'll get it taken care of as this app develops. TRO 3050/3055 is the next target!</p>

                            <div className="text-center">
                              <a href="https://github.com/Solaris-Skunk-Werks/SSW-Master" target="ssw">Solaris Skunk Werks Master Data Repo</a>
                            </div>

                          </div>
<div className="row">
  <div className="col">
  <InputField
              type="search"
              placeholder='Filter'
              value={this.props.appGlobals.appSettings.mechNameFilter}
              onChange={this.updateMechNameFilter}
            />
  </div>
  <div className="col">
  <label>
              <select
                  value={this.props.appGlobals.appSettings.mechRulesFilter}
                  onChange={this.updateMechRulesFilter}
              >
                <option value={-1}>All</option>
                <option value={0}>{getSSWRulesLevelLabel(0)}</option>
                <option value={1}>{getSSWRulesLevelLabel(1)}</option>
                <option value={2}>{getSSWRulesLevelLabel(2)}</option>
              </select>
            </label>

  </div>
</div>





            <table className="table">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th className="min-width no-wrap text-left">Tech</th>
                            <th className="min-width no-wrap text-center">Rules</th>
                            <th className="min-width no-wrap text-center">Tonnage</th>

                            <th className="min-width no-wrap text-center">BV2</th>
                            <th className="min-width no-wrap text-center">&nbsp;</th>
                        </tr>
                    </thead>
                    {this.props.appGlobals.sswMechObjects.length === 0 ? (
                        <tbody>
                            <tr>
                                <td className="text-center" colSpan={5}>
                                    <br />No 'mechs found for import. This should not be!
                                    <br />
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    ) : null}
                    {this.props.appGlobals.sswMechObjects.length > 0 && this.props.appGlobals.sswMechObjects.filter( this._filterSSWMechs ).length === 0 ? (
                        <tbody>
                            <tr>
                                <td className="text-center" colSpan={5}>
                                    <br />There are no 'mechs found with your filter preferences
                                    <br />
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                      <>
                      {this.props.appGlobals.sswMechObjects.sort( sortByMechName ).filter( this._filterSSWMechs ).map( (bmObj, bmIndex) => {


let perfectImport = true;
let problems: string[] = [];
if( bmObj.basicSSWInfo && bmObj.basicSSWInfo.bv2 !== bmObj.getBattleValue()) {
    perfectImport = false;
    problems.push( "BV2 doesn't match! SSW " + bmObj.basicSSWInfo.bv2 + " vs calculated " + bmObj.getBattleValue() )
}
if( bmObj.basicSSWInfo && bmObj.basicSSWInfo.cbill_cost !== bmObj.getCBillCostNumeric(true)) {
    perfectImport = false;
    problems.push( "Cbill Cost doesn't match! SSW " + bmObj.basicSSWInfo.cbill_cost + " vs calculated " + bmObj.getCBillCost(true) )
}
if( bmObj.sswImportErrors.length > 0 ) {
    perfectImport = false;
    problems.push( bmObj.sswImportErrors.length + " import errors!" );
}

return (
    <tbody key={bmIndex}>
        <tr>
            <td>
                {bmObj.getName()}&nbsp;
                {perfectImport ? (
                    <FaCheckCircle title="This import looks good to add!" className="color-green" />
                ) : (
                    <FaTimesCircle title={"Not an accurate import, not recommended for adding to your force. " + problems.join("; ")} className="color-red" />
                )}
            </td>
            <td className="min-width no-wrap text-left">{bmObj.getTech().name}</td>
            <td className="min-width no-wrap text-left">{getSSWRulesLevelLabel(bmObj.basicSSWInfo?.rules_level_ssw ? bmObj.basicSSWInfo?.rules_level_ssw : 0, true )}</td>
            <td className="min-width no-wrap text-center">{bmObj.getTonnage()}</td>
            <td className="min-width no-wrap text-center">{bmObj.getBattleValue()}</td>
            <td className="min-width no-wrap text-center">
                <button
                    className='btn btn-sm btn-primary'
                    onClick={e => this.viewUnit(e, bmObj )}
                >
                    <FaEye />
                </button>

                <button
                    className='btn btn-sm btn-primary'
                    onClick={e => this.importUnit(e, bmObj )}
                >
                    <FaPlusCircle />
                </button>
            </td>
        </tr>
    </tbody>
)
})}
                      </>
                    )}


                </table>

                            See the <Link to="ssw-sanity-check">Sanity Test</Link> page for compatibility


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

  viewingUnit: BattleMech | null;
}