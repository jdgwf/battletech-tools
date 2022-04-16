import React from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BattleMech } from "../../classes/battlemech";
import { sswMechs } from "../../data/ssw/sswMechs";
import { addCommas } from "../../utils/addCommas";
import { getSSWXMLBasicInfo } from "../../utils/getSSWXMLBasicInfo";
import { IAppGlobals } from '../app-router';
import SanitizedHTML from '../components/sanitized-html';
import StandardModal from '../components/standard-modal';
import UIPage from '../components/ui-page';
import './ssw-sanity-check.scss';


export default class SSWSanityCheck extends React.Component<ISSWSanityCheckProps, ISSWSanityCheckState> {


    constructor(props: ISSWSanityCheckProps) {
        super(props);
        this.state = {
            viewHTML: "",
            mechName: "",
            tableName: "",
        }

        this.props.appGlobals.makeDocumentTitle("Imports | 'Mech Creator");
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
       <table className="table">
           <thead>
               <tr>
                   <th>Model &amp; Name</th>
                   <th>Source</th>
                   {/* <th>SSW Rules Level</th> */}
                   <th>Cbills</th>
                   <th>BV2</th>
                   <th>Import Errors</th>
               </tr>
           </thead>
           {sswMechs.map( (mech, mechIndex) => {
               let tempMech = new BattleMech();
               tempMech.importSSWXML( mech );

               let sswData = getSSWXMLBasicInfo( mech );
               if( sswData && tempMech ) {
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

                return (
                        <tbody key={mechIndex}>
                            <tr>
                                <td>
                                    {modelName}
                                </td>
                                <td>
                                    {troSource}
                                </td>
                                {/* <td>
                                    {sswData.rules_level_ssw}
                                </td> */}
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
                            (
                                <em>(none?)</em>
                            )}
                                </td>
                            </tr>
                        </tbody>
                )
                } else {
                    return <React.Fragment key={mechIndex}></React.Fragment>
                  }
           })}
           <tfoot>
               <tr>
                   <th>
                       Total Mechs Here: {totalMechs}
                   </th>
                   <th>
                       CBill Errors: {cbillDiscrpancies} ({Math.round( cbillDiscrpancies / totalMechs * 10000) / 100 } %)
                   </th>
                   <th>
                       BV2 Errors: {bv2Discrpancies} ({Math.round( bv2Discrpancies / totalMechs * 10000 ) / 100} %)
                   </th>
                    <th>
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
}

