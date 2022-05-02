import React from 'react';
import { FaCheckCircle, FaSync, FaTimesCircle } from "react-icons/fa";
import { IASMULUnit } from '../../classes/alpha-strike-unit';
import { getMULASSearchResults } from '../../utils';
import { addCommas } from "../../utils/addCommas";
import { sortByMechName } from '../../utils/sortByMechName';
import { getSSWRulesLevelLabel, isSSWRulesLevel } from '../../utils/sswUtils';
import { IAppGlobals } from '../app-router';
import SanitizedHTML from '../components/sanitized-html';
import StandardModal from '../components/standard-modal';
import UIPage from '../components/ui-page';
import './ssw-sanity-check.scss';


export default class SSWSanityCheck extends React.Component<ISSWSanityCheckProps, ISSWSanityCheckState> {


    needsASValue: string[] = [];
    isFetchingMUL: boolean = false;
    constructor(props: ISSWSanityCheckProps) {
        super(props);

        let sswRulesFilter = "introductory";

        let lsSSWRulesFilter = localStorage.getItem( "sanity-rules-filter");
        if( lsSSWRulesFilter !== null ) {
            sswRulesFilter = lsSSWRulesFilter;
            if( !isNaN( +sswRulesFilter ) ) {
                sswRulesFilter = "introductory"
            }
        }

        this.state = {
            viewHTML: "",
            mechName: "",
            tableName: "",
            sswRulesFilter: sswRulesFilter,
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Imports | 'Mech Creator");

        // console.log("appSettings.asValues", this.props.appGlobals.appSettings.asValues)
    }

    clearMULCache = (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        console.log("clearMULCache clicked" )
        let appSettings = this.props.appGlobals.appSettings;

        appSettings.asValues = {}
        this.props.appGlobals.saveAppSettings( appSettings );
        // this._getAlphaStrikeValues();
        this.setState({
            updated: true,
        })
        console.log("clearMULCache complete" )
    }

    fetchMULData = (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        console.log("fetchMULData clicked" )

        this._getAlphaStrikeValues();
        this.setState({
            updated: true,
        })
        console.log("fetchMULData complete" )
    }


    updateSSWRulesFilter = (
        e: React.FormEvent<HTMLSelectElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }

        localStorage.setItem( "sanity-rules-filter", e.currentTarget.value)
        this.setState({
            sswRulesFilter: e.currentTarget.value,
        });
    }

    _getAlphaStrikeValues = async (): Promise<void> => {
        if( this.isFetchingMUL ) {
            console.log("_getAlphaStrikeValues already fetching cancelled call")
            return;
        }
        let appSettings =  this.props.appGlobals.appSettings;
        let rulesLevel = this.state.sswRulesFilter;

        for( let mechIndex = this.needsASValue.length -1; mechIndex >= 0; mechIndex-- ) {
            this.isFetchingMUL = true
            let mechName = this.needsASValue[mechIndex];


            console.log("_getAlphaStrikeValues mechName", mechName);
            let data: IASMULUnit[] = await getMULASSearchResults(
                mechName,
                rulesLevel,
                "",
                0,
                "bm",
                !navigator.onLine,
                true,
            );
            if( data.length === 1 ) {
                appSettings.asValues[mechName] = data[0].BFPointValue;
                this.needsASValue.splice(mechIndex, 1 );

            } else {
                console.log( mechName, data.length )
                for( let mech of data ) {
                    if( mech.Variant && mech.Variant.toLowerCase().trim() === mechName.toLowerCase().trim() ) {
                        appSettings.asValues[mechName] = data[0].BFPointValue;
                        this.needsASValue.splice(mechIndex, 1 );
                        break;
                    }
                }
            }
            this.props.appGlobals.saveAppSettings( appSettings );


        }

        this.isFetchingMUL = false;
        this.setState({
            updated: true,
        })


    }

    viewHTML = (
        e: React.FormEvent<HTMLButtonElement>,
        html: string,
        mechName: string,
        tableName: string,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        this.setState({
            viewHTML: html,
            mechName: mechName,
            tableName: tableName,
        })
    }

    closeHTML = (
        e: React.FormEvent<HTMLButtonElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }

        this.setState({
            viewHTML: "",
            tableName: "",
            mechName: "",
        })
    }

    render = (): React.ReactFragment => {

    let totalMechs = 0;
    let bv2Discrpancies = 0;
    let cbillDiscrpancies = 0;
    let bfValueDiscrpancies = 0;
    let importErrors = 0;

      return (
    <UIPage current="ssw-sanity-check" appGlobals={this.props.appGlobals}>
{this.state.viewHTML ? (
    <StandardModal
        show={true}
        className="modal-xl"
        title={"Viewing " + this.state.tableName + " Calculation Summary for " + this.state.mechName}
        onClose={this.closeHTML}
    >
        <SanitizedHTML raw={true} html={this.state.viewHTML} />
    </StandardModal>
) : null}
<div className="alert alert-info">
    <p>This is an internal testing page for all the Solaris Skunk Werks imported data. This imports each, then compares the calculated C-Bill and BV2 values against the stated values in the SSW XML file. If there's a discrepancy then it'll notify, and allow for a side-by-side comparison when checking against the SSW app.</p>
    <p>At the bottom of the table, there'll be a total and percentage accuracy.</p>
</div>
<div className="row">
    <div className='col'>
        <label>
            SSW Rules Level Filter:&nbsp;
        <select
            onChange={this.updateSSWRulesFilter}
            value={this.state.sswRulesFilter}
        >
            <option value={"all"}>{getSSWRulesLevelLabel(-1)}</option>
            <option value={"introductory"}>{getSSWRulesLevelLabel(0)}</option>
            <option value={"standard"}>{getSSWRulesLevelLabel(1)}</option>
            <option value={"advanced"}>{getSSWRulesLevelLabel(2)}</option>
        </select>
        </label>
    </div>
    <div className="col text-center">

    <button
            className="btn btn-primary"
            onClick={this.fetchMULData}
            disabled={this.isFetchingMUL}
        >
            Fetch MUL Data
        </button>

        {this.isFetchingMUL ? (
            <FaSync color="green" />
        ) : null}
    </div>
    <div className="col text-right">
        <button
            className="btn btn-danger"
            onClick={this.clearMULCache}
            disabled={this.isFetchingMUL}
        >
            Clear MUL Cache
        </button>
    </div>
</div>
       <table className="table">
           <thead>
               <tr>
                   <th>Model &amp; Name</th>
                   <th>Source</th>
                   <th>Tech</th>
                   <th>SSW Rules Level</th>
                   <th>Cbills</th>
                   <th>BV2</th>
                   <th>
                       MUL AS Value
                    <div className="small-text">You'll have to Fetch MUL data to cache</div>
                   </th>
                   <th>Import Errors</th>
               </tr>
           </thead>
           {this.props.appGlobals.sswMechObjects.sort( sortByMechName ).map( (tempMech, mechIndex) => {

               let sswData =  tempMech.basicSSWInfo
               if( sswData ) {
                if(
                    !isSSWRulesLevel(sswData.rules_level_ssw, this.state.sswRulesFilter)
                ) {
                    return <React.Fragment key={mechIndex}></React.Fragment>
                }


                let tech = sswData.tech_base;

                if( tempMech ) {
                    let SSWCbills = sswData.cbill_cost;
                    let SSWBV2 = sswData.bv2;
                    let MULASValue = 0;

                    let tempMechCBills = tempMech.getCBillCostNumeric(true);
                    let tempMechBV2 = tempMech.getBattleValue();

                    let tempMechBFValue = tempMech.getAlphaStrikeValue();

                    totalMechs++;

                    let troSource = sswData.source;


                    if( SSWCbills !== tempMechCBills ) {
                        cbillDiscrpancies++;
                    }
                    if( SSWBV2 !== tempMechBV2 ) {
                        bv2Discrpancies++;
                    }

                    // IS only using .model instead of .getName() - for some reason MUL API is removing or ignoring the space - even converting space to %20
                    if( typeof(this.props.appGlobals.appSettings.asValues[ tempMech.model ]) !== "undefined" || this.props.appGlobals.appSettings.asValues[ tempMech.getName() ] === -1) {
                        MULASValue = this.props.appGlobals.appSettings.asValues[ tempMech.model ]
                        if( MULASValue !== tempMechBFValue ) {
                            bfValueDiscrpancies++;
                        }
                        if( MULASValue === -1 ) {
                            if( this.needsASValue.indexOf( tempMech.model ) === -1) {
                                console.log("Adding to needsASValue due to -1 value", tempMech.model)
                                // IS only using .model instead of .getName() - for some reason MUL API is removing or ignoring the space - even converting space to %20
                                this.needsASValue.push( tempMech.model )
                            }
                        }
                    } else {

                        if( this.needsASValue.indexOf( tempMech.model ) === -1) {
                            console.log("Adding to needsASValue", tempMech.model)
                            // IS only using .model instead of .getName() - for some reason MUL API is removing or ignoring the space - even converting space to %20
                            this.needsASValue.push( tempMech.model )
                        }
                    }

                    let modelName = "";
                    if( sswData ) {
                        modelName = sswData.model + " " + sswData.name
                    }

                    if( tempMech && tempMech.sswImportErrors && tempMech.sswImportErrors.length > 0 ) {
                        importErrors++;
                    }

                    return (
                            <tbody key={mechIndex}>
                                <tr>
                                    <td>
                                        {modelName}
                                    </td>
                                    <td>
                                        {troSource}
                                    </td>
                                    <td>
                                        {tech}
                                    </td>
                                    <td>
                                        {getSSWRulesLevelLabel(sswData.rules_level_ssw)}
                                    </td>
                                    <td>
                                    {SSWCbills !== tempMechCBills ? (
                                        <div>
                                            <FaTimesCircle className="color-red" />&nbsp;CBill Costs doesn't match:<br />
                                            SSW: {addCommas(SSWCbills)} != JBT: {addCommas(tempMechCBills)}

                                            {Math.abs(SSWCbills - tempMechCBills ) < 3 ? (
                                                <div className="color-green">..but it's close - rounding error?</div>
                                            ) : null}

                                            <button
                                                className="btn btn-primary full-width btn-xs"
                                                onClick={(e) => this.viewHTML( e, tempMech.calcLogCBill, modelName, "C-Bills")}
                                            >
                                                View Summary
                                            </button>
                                        </div>
                                        ) : (
                                        <div>
                                            <FaCheckCircle className="color-green" />&nbsp;CBill Costs match: {addCommas(tempMechCBills)}
                                        </div>

                                    )}

                                </td>
                                <td>
                                        {SSWBV2 !== tempMechBV2 ? (
                                    <div>
                                        <FaTimesCircle className="color-red" />&nbsp;BV2 doesn't match:
                                        SSW: {addCommas(SSWBV2)} != JBT: {addCommas(tempMechBV2)}
                                        <button
                                            className="btn btn-primary full-width btn-xs"
                                            onClick={(e) => this.viewHTML( e, tempMech.calcLogBV, modelName, "BV2")}
                                        >
                                            View Summary
                                        </button>
                                    </div>
                                    ) : (
                                    <div>
                                        <FaCheckCircle className="color-green" />&nbsp;BV2 matches: {addCommas(tempMechBV2)}
                                    </div>
                                    )}
                                    </td>
                                    <td>
                                    {MULASValue === 0 ? (
                                        <div>
                                            ?? Couldn't obtain MUL Value
                                        </div>
                                    ) : (
                                        <>
                                            {MULASValue !== tempMechBFValue ? (
                                            <div>
                                                <FaTimesCircle className="color-red" />&nbsp;PV doesn't match:
                                                MUL: {addCommas(MULASValue)} != JBT: {addCommas(tempMechBFValue)}

                                                <button
                                                    className="btn btn-primary full-width btn-xs"
                                                    onClick={(e) => this.viewHTML( e, tempMech.calcLogAS, modelName, "BV2")}
                                                >
                                                    View Summary
                                                </button>
                                            </div>
                                            ) : (
                                                <div>
                                                    <FaCheckCircle className="color-green" />&nbsp;PV matches: {addCommas(tempMechBFValue)}
                                                </div>
                                            )}
                                        </>
                                    )}

                                    </td>
                                    <td>

                                {tempMech.sswImportErrors.length > 0 ? (
                                <>
                                <ul>
                                    {tempMech.sswImportErrors.map ( (line, lineIndex) => {
                                    return (
                                        <li key={lineIndex}>
                                        {line}
                                        </li>
                                    )
                                    })}
                                </ul>
                                </>
                                ) :
                                null}
                                    </td>

                                </tr>
                            </tbody>
                    )
                    } else {
                        return <React.Fragment key={mechIndex}></React.Fragment>
                    }
                } else {
                    return <React.Fragment key={mechIndex}></React.Fragment>
                }
           })}
           <tfoot>
               <tr>
                   <th>
                       Total Mechs Here: {totalMechs}
                   </th>
                   <th></th>
                   <th></th>
                   <th></th>
                   <th>
                       CBill Errors: {cbillDiscrpancies} ({Math.round( cbillDiscrpancies / totalMechs * 10000) / 100 } %)
                   </th>
                   <th>
                       BV2 Errors: {bv2Discrpancies} ({Math.round( bv2Discrpancies / totalMechs * 10000 ) / 100} %)
                   </th>
                   <th>
                        MUL AS Value Errors: {bfValueDiscrpancies} ({Math.round( bfValueDiscrpancies / totalMechs * 10000 ) / 100} %)
                    </th>
                    <th>
                        Import Errors: {importErrors} ({Math.round( importErrors / totalMechs * 10000 ) / 100} %)
                    </th>

               </tr>

           </tfoot>
       </table>
    </UIPage>
      );
    }
}

interface ISSWSanityCheckProps {
  appGlobals: IAppGlobals;
}

interface ISSWSanityCheckState {
    viewHTML: string;
    mechName: string;
    tableName: string;
    sswRulesFilter: string;
    updated: boolean;
    // asCards: IASMULUnit[];

}
