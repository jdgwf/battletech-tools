import React from 'react';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BattleMech } from "../../classes/battlemech";
import { IEquipmentItem } from "../../data/data-interfaces";
import { mechClanEquipmentEnergy } from '../../data/mech-clan-equipment-weapons-energy';
import { mechISEquipmentBallistic } from '../../data/mech-is-equipment-weapons-ballistic';
import { mechISEquipmentEnergy } from "../../data/mech-is-equipment-weapons-energy";
import { mechISEquipmentMisc } from '../../data/mech-is-equipment-weapons-misc';
import { mechISEquipmentMissiles } from '../../data/mech-is-equipment-weapons-missiles';
import { sswMechs } from "../../data/ssw/sswMechs";
import { addCommas } from "../../utils/addCommas";
import { getSSWXMLBasicInfo } from "../../utils/getSSWXMLBasicInfo";
import { IAppGlobals } from '../app-router';
import UIPage from '../components/ui-page';
import './ssw-sanity-check.scss';


export default class SSWSanityCheck extends React.Component<ISSWSanityCheckProps, ISSWSanityCheckState> {
    fileDataList: Record<string, IEquipmentItem[]> = {
        "mech-is-equipment-weapons-ballistic": mechISEquipmentBallistic,
        "mech-is-equipment-weapons-energy": mechISEquipmentEnergy,
        "mech-is-equipment-weapons-missiles": mechISEquipmentMissiles,
        "mech-is-equipment-weapons-misc": mechISEquipmentMisc,
        "mech-clan-equipment-weapons-energy": mechClanEquipmentEnergy,
    };



    render = (): React.ReactFragment => {

    let totalMechs = 0;
    let bv2Discrpancies = 0;
    let cbillDiscrpancies = 0;

      return (
    <UIPage current="ssw-sanity-check" appGlobals={this.props.appGlobals}>
       <table className="table">
           <thead>
               <tr>
                   <th>Model &amp; Name</th>
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

                if( SSWCbills !== tempMechCBills ) {
                    cbillDiscrpancies++;
                }
                if( SSWBV2 !== tempMechBV2 ) {
                    bv2Discrpancies++;
                }

                return (
                        <tbody key={mechIndex}>
                            <tr>
                                <td>
                                    {sswData.model} {sswData.name}
                                </td>
                                <td>
                                {SSWCbills !== tempMechCBills ? (
                                    <div>
                                        <FaTimesCircle className="color-red" />&nbsp;CBill Costs don't match:<br />
                                        SSW: {addCommas(SSWCbills)} != JBT: {addCommas(tempMechCBills)}

                                        {Math.abs(SSWCbills - tempMechCBills ) < 3 ? (
                                            <div className="color-green">..but it's close - rounding error?</div>
                                        ) : null}
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
                                    <FaTimesCircle className="color-red" />&nbsp;BV2 don't match:
                                    SSW: {addCommas(SSWBV2)} != JBT: {addCommas(tempMechBV2)}
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
                            ) : null}
                                </td>
                            </tr>
                        </tbody>
                )
                }
           })}
           <tfoot>
               <tr>
                   <th>
                       Total Mechs Here: {totalMechs}
                   </th>
                   <th>
                       CBill Erors: {cbillDiscrpancies} ({Math.round( cbillDiscrpancies / totalMechs * 10000) / 100 } %)
                   </th>
                   <th>
                       BV2 Erors: {bv2Discrpancies} ({Math.round( bv2Discrpancies / totalMechs * 10000 ) / 100} %)
                   </th>
                    <th></th>
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

}

