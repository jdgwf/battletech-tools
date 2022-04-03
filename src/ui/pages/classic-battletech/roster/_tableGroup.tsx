import * as React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BattleMech } from '../../../../classes/battlemech';
import { BattleMechGroup } from '../../../../classes/battlemech-group';
import { IAppGlobals } from '../../../app-router';
import InputField from '../../../components/form_elements/input_field';
import SanitizedHTML from '../../../components/sanitized-html';
import StandardModal from '../../../components/standard-modal';
import BattleMechSVG from '../../../components/svg/battlemech-svg';
import BattleMechAddMechDialog from './_addMechDialog';
// import InPlay from './in-play';
// import PrintSheet from './print';

export default class BattleMechTableGroup extends React.Component<IBattleMechTableGroupProps, IBattleMechTableGroupState> {

    constructor(props: IBattleMechTableGroupProps) {
        super(props);
        this.state = {
            viewingUnit: null,
            addingUnitsModal: false,
            addingUnitsGroupIndex: -1,
            editingUnitIndex: -1,
            editingUnit: null,
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
        if( this.props.appGlobals.currentCBTForce && this.state.viewingUnit ) {

            let bmGroup = this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex];
            bmGroup.members.push (
                new BattleMech( this.state.viewingUnit.exportJSON()  )
            )
            // this.props.onChange( bmGroup );
            this.setState({
                viewingUnit: null,
            })
        }

    }


    closeAddingUnits = (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        addingUnitsModal: false,
      })

    }

  onAddUnitsChange = ( nv: BattleMechGroup ): void => {
    if( this.props.appGlobals.currentCBTForce && this.props.appGlobals.currentCBTForce.groups[this.state.addingUnitsGroupIndex] ) {
      let currentCBTForce = this.props.appGlobals.currentCBTForce;
      currentCBTForce.groups[this.state.addingUnitsGroupIndex] = nv;
      this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );

    }

  }

    openAddingUnits = (
        e: React.FormEvent<HTMLButtonElement>,
        addingUnitsGroupIndex: number,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        addingUnitsModal: true,
        addingUnitsGroupIndex: addingUnitsGroupIndex,
      })

    }

    openEditDialog = (
        e: React.FormEvent<HTMLButtonElement>,
        editUnitIndex: number,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault()
        }

        if( this.props.appGlobals.currentCBTForce ) {
            let currentCBTForce = this.props.appGlobals.currentCBTForce;
            let editUnit = new BattleMech(currentCBTForce.groups[this.props.bmGroupIndex].members[editUnitIndex].exportJSON() );
            this.setState({
                editingUnit: editUnit,
                editingUnitIndex: editUnitIndex,
            })
        } else {
            console.error("Cannot find this.props.appGlobals.currentCBTForce!")
        }

    }

    saveUnit= (
        e: React.FormEvent<HTMLButtonElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault()
        }

        if( this.props.appGlobals.currentCBTForce && this.state.editingUnit) {
            let currentCBTForce = this.props.appGlobals.currentCBTForce;
            let saveUnit = new BattleMech(this.state.editingUnit.exportJSON() );
            currentCBTForce.groups[this.props.bmGroupIndex].members[this.state.editingUnitIndex] = saveUnit;
            this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );
            this.setState({
                editingUnit: null,
                editingUnitIndex: -1,
            })
        } else {
            console.error("Cannot find this.props.appGlobals.currentCBTForce!")
        }
    }

    removeUnit = (
        e: React.FormEvent<HTMLButtonElement>,
        removeUnit: BattleMech,
        removeUnitIndex: number,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.props.appGlobals.openConfirmDialog(
          "Deletion Confirmation",
          "Are you sure you want to remove '" + removeUnit.make + "' from this group?",
          "Yes",
          "No, thank you",
          () => {
            if( this.props.appGlobals.currentCBTForce ) {
                let currentCBTForce = this.props.appGlobals.currentCBTForce;
                currentCBTForce.groups[this.props.bmGroupIndex].members.splice(removeUnitIndex, 1);
                this.props.appGlobals.saveCurrentCBTForce( currentCBTForce );
            }
          }
      )


    }

    closeEditDialog = (
        e: React.FormEvent<HTMLButtonElement>,
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault()
      }

      this.setState({
        editingUnit: null,
        editingUnitIndex: -1,
      })

    }

    updateNickname = ( event: React.FormEvent<HTMLInputElement>): void => {
        let mech = this.state.editingUnit;
        if( mech ) {
            mech.nickname = event.currentTarget.value;
            this.setState({
                editingUnit: mech,
            })
        }
    }

    setPilotName = ( event: React.FormEvent<HTMLInputElement>): void => {
        let mech = this.state.editingUnit;
        if( mech ) {
            mech.setPilotName( event.currentTarget.value );
            this.setState({
                editingUnit: mech,
            })
        }
    }

      setPilotPiloting = ( event: React.FormEvent<HTMLSelectElement>): void => {

        let mech = this.state.editingUnit;
        if( mech ) {
            mech.setPilotPiloting( +event.currentTarget.value );
            this.setState({
                editingUnit: mech,
            })
        }
      }

      setPilotGunnery = ( event: React.FormEvent<HTMLSelectElement>): void => {

        let mech = this.state.editingUnit;
        if( mech ) {
            mech.setPilotGunnery( +event.currentTarget.value );
            this.setState({
                editingUnit: mech,
            })
        }
      }

    render = (): React.ReactFragment => {
        if(!this.props.appGlobals.currentCBTForce) {
            return ("No BM Force Error");
        }
        return(
<>
{this.state.editingUnit ? (
    <StandardModal
        show={true}
        onClose={this.closeEditDialog}
        title={"Editing " + this.state.editingUnit.make}
        onSave={this.saveUnit}
    >
        TODO: Edit Mech Nickname, pilot name and skills dialog. Will show both base amd adjusted BV2
        <InputField
            label="Nickname"
            value={this.state.editingUnit.nickname}
            onChange={this.updateNickname}
        />
        <div className="row">
            <div className="col-md-6">
                <fieldset className="fieldset">
                <legend>Mechwarrior Data</legend>
                <div className="row">
                    <div className="col-sm-12">
                    <label>
                        Pilot Name:<br />
                        <input
                        type="string"
                        value={this.state.editingUnit.getPilot().name}
                        onChange={this.setPilotName}
                        />
                    </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                    <label>
                        Piloting Skill:<br />

                        <select
                        value={this.state.editingUnit.getPilot().piloting}
                        onChange={this.setPilotPiloting}
                        >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        </select>
                    </label>
                    </div>
                    <div className="col-sm-6">
                    <label>
                        Gunnery Skill:<br />
                        <select
                        value={this.state.editingUnit.getPilot().gunnery}
                        onChange={this.setPilotGunnery}
                        >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        </select>
                    </label>
                    </div>
                </div>
                </fieldset>
            </div>
            <div className="col-md-6">
                <fieldset className="fieldset">
                    <legend>Pilot Adjusted BV2</legend>
                    <div>
                        <strong>Base BV2</strong>: {this.state.editingUnit.getBattleValue()}
                    </div>
                    <div>
                        <strong>Adjusted BV2</strong>: {this.state.editingUnit.getPilotAdjustedBattleValue()}
                    </div>

                </fieldset>
            </div>
        </div>
    </StandardModal>
) : null}
<StandardModal
  show={this.state.addingUnitsModal}
  onClose={this.closeAddingUnits}
  className="modal-xl"
  title={this.props.appGlobals.currentCBTForce && this.props.appGlobals.currentCBTForce.groups[this.state.addingUnitsGroupIndex] ? "Adding units to '" + this.props.appGlobals.currentCBTForce.groups[this.state.addingUnitsGroupIndex].getName(this.state.addingUnitsGroupIndex) + "'" : "Adding units to Current Force"}
>
    {this.props.appGlobals.currentCBTForce ? (
      <BattleMechAddMechDialog
        appGlobals={this.props.appGlobals}
        currentForce={this.props.appGlobals.currentCBTForce.groups[this.state.addingUnitsGroupIndex]}
        currentForceIndex={this.state.addingUnitsGroupIndex}
        onChange={this.onAddUnitsChange}
      />
    ) : null}
</StandardModal>

{this.state.viewingUnit ? (
    <StandardModal
        show={true}
        onClose={this.closeViewUnit}
        onAdd={this.addViewedUnit}
        className="modal-xl"
    >

        <h3 className="text-center">Viewing {this.state.viewingUnit.make}</h3>
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
) : (



    <table className="table">
    <thead>
      <tr>
{this.props.showEdit ? (
        <th className="min-width no-wrap">
        {this.props.showAdd ? (
          <button
            className="btn btn-primary btn-sm"
            title="Click here to open the add 'mech dialog"
            onClick={(e) => this.openAddingUnits( e, this.props.bmGroupIndex)}
            >
            Add
            </button>
        ) : null}

        </th>
): null}
        <th>Name</th>
        <th>Tons</th>
        <th>Tech</th>
        <th className="min-width no-wrap text-center">Piloting</th>
        <th className="min-width no-wrap text-center">Gunnery</th>
        <th className="min-width no-wrap text-center">Points</th>

      </tr>
    </thead>

    {this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].members.length > 0 ? (
      <>
        {this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].members.map( (mechObj, mechIndex) => {
            let pilotBV2 = mechObj.getPilotAdjustedBattleValue();
            let baseBV2 = mechObj.getBattleValue();

            return (
                <tbody key={mechIndex}>
                <tr>
                {this.props.showEdit ?
                    <td className="min-width no-wrap text-center">
                        <button
                            onClick={(e) => this.openEditDialog(e, mechIndex)}
                            title="Edit the name and pilot of this unit"
                            className="btn btn-primary btn-sm"
                        >
                        <FaEdit />
                        </button>
                      <button
                        onClick={(e) => this.removeUnit(e, mechObj, mechIndex)}
                        title="Click here to remove this unit."
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                      </button>
                    </td>
                    : null}
                    <td>
                        {mechObj.getName()}
                        {mechObj.pilot.name && mechObj.pilot.name.trim() ? (
                            <div className='small-text'>
                                <strong>Pilot:</strong> {mechObj.pilot.name}
                            </div>
                        ) : null}

                    </td>
                    <td className="min-width no-wrap text-center">{mechObj.getTonnage()}</td>
                    <td className="min-width no-wrap text-center small-text">{mechObj.getTech().name}</td>
                    <td className="min-width no-wrap text-center">{mechObj.pilot.piloting}</td>
                    <td className="min-width no-wrap text-center">{mechObj.pilot.gunnery}</td>
                    <td className="min-width no-wrap text-center">
                        {pilotBV2 !== baseBV2 ? (
                            <>
                                {pilotBV2}
                                <div className='small-text'>Base: {baseBV2}</div>
                            </>
                        ) : (
                            <>{pilotBV2}</>
                        )}
                    </td>

                </tr>
                </tbody>
            )
        })}
      </>
) : (
<tbody><tr><td colSpan={this.props.showEdit ? 7 : 6} className="text-center">No Units</td></tr></tbody>
)}


<tfoot>
<tr>

<td colSpan={1}>
{this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].members.length > 0 ? (
    <>
        {this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].members.length > 0 ? (
            <>{this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].members.length} Units</>
        ) : (
            <>One Unit</>
        )}
    </>
) : (
    <>No Units</>
)}
</td>
<td colSpan={this.props.showEdit ? 4 : 3} className="text-center">
    {this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].getTotalTons()} Tons - {this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].getTech()}
</td>
<td colSpan={2} className="text-right">BV2: {this.props.appGlobals.currentCBTForce.groups[this.props.bmGroupIndex].getTotaBV2()}</td>
</tr>
</tfoot>

</table>


)}
</>
        )
    }
}

interface IBattleMechTableGroupProps {
    appGlobals: IAppGlobals;
    bmGroupIndex: number;
    showAdd: boolean;
    showEdit: boolean;
}

interface IBattleMechTableGroupState {
    viewingUnit: BattleMech | null;
    editingUnit: BattleMech | null;
    editingUnitIndex: number;

    addingUnitsModal: boolean;
    addingUnitsGroupIndex: number;
}