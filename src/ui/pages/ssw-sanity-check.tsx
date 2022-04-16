import React from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BattleMech } from "../../classes/battlemech";
import { sswMechs } from "../../data/ssw/sswMechs";
import { addCommas } from "../../utils/addCommas";
import { getSSWXMLBasicInfo } from "../../utils/getSSWXMLBasicInfo";
import { getSSWRulesLevelLabel } from '../../utils/sswUtils';
import { IAppGlobals } from '../app-router';
import SanitizedHTML from '../components/sanitized-html';
import StandardModal from '../components/standard-modal';
import UIPage from '../components/ui-page';
import './ssw-sanity-check.scss';


export default class SSWSanityCheck extends React.Component<ISSWSanityCheckProps, ISSWSanityCheckState> {

    constructor(props: ISSWSanityCheckProps) {
        super(props);

        let sswRulesFilter = 0;

        let lsSSWRulesFilter = localStorage.getItem( "sanity-rules-filter");
        if( lsSSWRulesFilter !== null ) {
            sswRulesFilter = +lsSSWRulesFilter;
        }

        this.state = {
            viewHTML: "",
            mechName: "",
            tableName: "",
            sswRulesFilter: sswRulesFilter,
        }

        this.props.appGlobals.makeDocumentTitle("Imports | 'Mech Creator");
    }

    updateSSWRulesFilter = (
        e: React.FormEvent<HTMLSelectElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }

        localStorage.setItem( "sanity-rules-filter", e.currentTarget.value)
        this.setState({
            sswRulesFilter: +e.currentTarget.value,
        });
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
            <option value={-1}>{getSSWRulesLevelLabel(-1)}</option>
            <option value={0}>{getSSWRulesLevelLabel(0)}</option>
            <option value={1}>{getSSWRulesLevelLabel(1)}</option>
            <option value={2}>{getSSWRulesLevelLabel(2)}</option>
        </select>
        </label>
    </div>
    <div className="col">

    </div>
    <div className="col">

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
                   <th>Import Errors</th>
               </tr>
           </thead>
           {sswMechs.map( (mech, mechIndex) => {

               let sswData = getSSWXMLBasicInfo( mech );
               if( sswData ) {
                if( this.state.sswRulesFilter > -1 && sswData.rules_level_ssw !== this.state.sswRulesFilter ) {
                    return <React.Fragment key={mechIndex}></React.Fragment>
                }
                let tempMech = new BattleMech();
                tempMech.importSSWXML( mech );

                let tech = sswData.tech_base;

                if( tempMech ) {
                    let SSWCbills = sswData.cbill_cost;
                    let SSWBV2 = sswData.bv2;

                    let tempMechCBills = tempMech.getCBillCostNumeric(true);
                    let tempMechBV2 = tempMech.getBattleValue();

                    totalMechs++;

                    let troSource = sswData.source;


                    if( SSWCbills !== tempMechCBills ) {
                        cbillDiscrpancies++;
                    }
                    if( SSWBV2 !== tempMechBV2 ) {
                        bv2Discrpancies++;
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
    sswRulesFilter: number;
}
