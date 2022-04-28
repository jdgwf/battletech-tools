import * as React from 'react';
import { FaCheckCircle, FaEye, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { BattleMech } from '../../../../classes/battlemech';
import { BattleMechGroup } from '../../../../classes/battlemech-group';
import { IAppGlobals } from '../../../app-router';
import SanitizedHTML from '../../../components/sanitized-html';
import StandardModal from '../../../components/standard-modal';
import BattleMechSVG from '../../../components/svg/battlemech-svg';
import BattleMechTableGroup from './_tableGroup';

export default class BattleMechAddMechDialog extends React.Component<IBattleMechAddMechDialogProps, IBattleMechAddMechDialogState> {

    constructor(props: IBattleMechAddMechDialogProps) {
        super(props);
        this.state = {
            viewingUnit: null,

        }

    }




    viewUnit = (
        e: React.FormEvent<HTMLButtonElement>,
        bm: BattleMech,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
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

    addViewedUnit = (
        e: React.FormEvent<HTMLButtonElement> | null,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        if( this.props.currentForce && this.state.viewingUnit ) {
            let currentForce = this.props.currentForce;
            let newBM = new BattleMech( this.state.viewingUnit.exportJSON()  );
            newBM.newUUID();
            currentForce.members.push (
                newBM
            )
            this.props.onChange( currentForce );
            this.setState({
                viewingUnit: null,
            })
        }

    }

    addUnit = (
        e: React.FormEvent<HTMLButtonElement> | null,
        bm: BattleMech,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        if( this.props.currentForce && bm ) {
            let currentForce = this.props.currentForce;
            let newBM = new BattleMech( bm.exportJSON()  );
            newBM.newUUID();
            currentForce.members.push (
                newBM
            )
            this.props.onChange( currentForce );
            this.setState({
                viewingUnit: null,
            })
        }

    }

    render = (): React.ReactFragment => {
        return(
<>
{this.state.viewingUnit ? (
    <StandardModal
        show={true}
        onClose={this.closeViewUnit}
        onAdd={this.addViewedUnit}
        className="modal modal-xl"
    >

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
    </StandardModal>
) : null}

    <div className="row">
      <div className="col">
          <fieldset className="fieldset">
              <legend>Your Saved Units</legend>
              {this.props.appGlobals.battleMechSaves.length === 0 ? (
                <div className='text-center'>
                    You have no saved 'mechs. Currently this app does not have permission to have any pre-built 'mechs loaded, but you should be able to create existing or new ' mechs in the <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator`}>'Mech Creator</Link>
                </div>
              ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th className="min-width no-wrap text-left">Tech</th>
                            <th className="min-width no-wrap text-center">Tonnage</th>
                            <th className="min-width no-wrap text-center">BV2</th>
                            <th className="min-width no-wrap text-center">&nbsp;</th>
                        </tr>
                    </thead>
                    {this.props.appGlobals.battleMechSaves.map( (bmDef, bmIndex) => {
                        let bmObj = new BattleMech( JSON.stringify(bmDef) )
                        return (
                            <tbody key={bmIndex}>
                                <tr>
                                    <td>{bmObj.getName()}</td>
                                    <td className="min-width no-wrap text-left">{bmObj.getTech().name}</td>
                                    <td className="min-width no-wrap text-center">{bmObj.getTonnage()}</td>
                                    <td className="min-width no-wrap text-center">{bmObj.getBattleValue()}</td>
                                    <td className="min-width no-wrap text-center">
                                        <button
                                            className='btn btn-xs btn-primary'
                                            onClick={e => this.viewUnit(e, bmObj )}
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            className='btn btn-xs btn-primary'
                                            onClick={e => this.addUnit(e, bmObj )}
                                        >
                                            <FaPlusCircle />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            )}
        </fieldset>


        <fieldset className="fieldset">
            <legend>Solaris Skunk Werks Data Import</legend>
            <p>Sorry, only Introductory Mechs can be trusted right now.</p>


            <table className="table">
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th className="min-width no-wrap text-left">Tech</th>
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
                    {this.props.appGlobals.sswMechObjects.map( (bmObj, bmIndex) => {


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
                                            <FaTimesCircle title={"Not an accurate import, not reccomended for adding to your force. " + problems.join("; ")} className="color-red" />
                                        )}
                                    </td>
                                    <td className="min-width no-wrap text-left">{bmObj.getTech().name}</td>
                                    <td className="min-width no-wrap text-center">{bmObj.getTonnage()}</td>
                                    <td className="min-width no-wrap text-center">{bmObj.getBattleValue()}</td>
                                    <td className="min-width no-wrap text-center">
                                        <button
                                            className='btn btn-xs btn-primary'
                                            onClick={e => this.viewUnit(e, bmObj )}
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            className='btn btn-xs btn-primary'
                                            onClick={e => this.addUnit(e, bmObj )}
                                        >
                                            <FaPlusCircle />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>


        </fieldset>
      </div>
      <div className="col">
          <fieldset className="fieldset">
              <legend>Current Force</legend>

              <BattleMechTableGroup
                appGlobals={this.props.appGlobals}
                bmGroupIndex={this.props.currentForceIndex}
                showAdd={false}
                showEdit={true}
                // onChange={this.onForceChange}
            />
          </fieldset>
      </div>
    </div>

</>
        )
    }
}

interface IBattleMechAddMechDialogProps {
    appGlobals: IAppGlobals;
    currentForce: BattleMechGroup;
    currentForceIndex: number;
    onChange( nv: BattleMechGroup ): void;
}

interface IBattleMechAddMechDialogState {
    viewingUnit: BattleMech | null;

}