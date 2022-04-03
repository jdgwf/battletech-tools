import * as React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { FaArrowsAlt, FaBars, FaEdit, FaExclamationTriangle, FaHeart, FaPlus, FaTrash } from "react-icons/fa";
import { AlphaStrikeUnit } from '../../../../classes/alpha-strike-unit';
import { formationBonuses } from '../../../../data/formation-bonuses';
import { unitGroupNames } from '../../../../data/group-names';
import { IAppGlobals } from '../../../app-router';
import TextSection from '../../../components/text-section';

export default class CurrentForceList extends React.Component<ICurrentForceListProps, ICurrentForceListState> {

    constructor(props: ICurrentForceListProps) {
        super(props);

        this.state = {
            contextMenuGroup: -1,
            contextMenuUnit: -1,
        };
    }

    updateFormationBonus = (event:React.FormEvent<HTMLSelectElement>, groupIndex:number): void => {
      if( this.props.appGlobals.currentASForce ) {
          this.props.appGlobals.currentASForce.groups[groupIndex].formationBonus = formationBonuses.find(x=>x.Name===event.currentTarget.value);
          this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    toggleContextMenuForce = ( asGroupIndex: number, asUnitIndex: number ): void => {
        let newGroup: number = -1;
        let newUnit: number = -1;
        if( this.state.contextMenuGroup !== asGroupIndex && this.state.contextMenuUnit !== asUnitIndex ) {
          newGroup = asGroupIndex;
          newUnit = asUnitIndex;
        }

        this.setState({
          contextMenuGroup: newGroup,
          contextMenuUnit: newUnit,
        })
      }

    removeGroup = ( groupIndex: number ): void => {
        if( this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.groups.length > groupIndex ) {
          if(this.props.appGlobals.currentASForce.groups[groupIndex].getTotalUnits() === 0 ) {
            this.props.appGlobals.currentASForce.removeGroup(groupIndex);
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
          } else {
            this.props.appGlobals.openConfirmDialog(
              "Confirmation",
              "This group still contains units. Are you sure you want to still remove it?",
              "Yes",
              "No",
              () => {
                if( this.props.appGlobals.currentASForce ) {
                  this.props.appGlobals.currentASForce.removeGroup(groupIndex);
                  this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
                }
              }
            );
          }
        }
      }

      moveUnitToGroup = (
        fromUnitIndex: number,
        fromGroupIndex: number,
        toGroupIndex: number,
      ): void => {
        if( this.props.appGlobals.currentASForce) {
          this.props.appGlobals.currentASForce.moveUnitToGroup( fromUnitIndex, fromGroupIndex, toGroupIndex );
          this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
          this.setState({
            contextMenuUnit: -1,
            contextMenuGroup: -1,
          })
        }
      }


    renameGroup = ( newName: string, groupIndex: number ): void => {
      if( this.props.appGlobals.currentASForce) {
        this.props.appGlobals.currentASForce.renameGroup( newName, groupIndex );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

      selectGroupLabel = ( newName: string, groupIndex: number ): void => {
        if( this.props.appGlobals.currentASForce) {
        this.props.appGlobals.currentASForce.selectGroupLabel( newName, groupIndex );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }
      removeUnitFromGroup = (asGroupIndex: number, asUnitIndex: number): void => {
        if( this.props.appGlobals.currentASForce) {
        this.props.appGlobals.currentASForce.removeUnitFromGroup( asGroupIndex, asUnitIndex );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }



    newGroup = (): void => {
      if( this.props.appGlobals.currentASForce) {
        this.props.appGlobals.currentASForce.newGroup();
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    openEditUnit = ( showASUnit: AlphaStrikeUnit ): void => {
        this.setState({
            contextMenuGroup: -1,
            contextMenuUnit: -1,
        })
        this.props.openEditUnit( showASUnit )
    }


    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentASForce) {
        return <></>
      }
        let addUnitButton: React.ReactFragment = <></>;

        if( this.props.openAddingUnits ) {
            addUnitButton = <button
            onClick={this.props.openAddingUnits}
            className="btn btn-sm btn-primary pull-right"
            >
            <FaPlus />&nbsp;Add Units
            </button>
        }


        return (
<TextSection
                label="Current Force"
                labelButton={addUnitButton}
              >

                <p className="text-center">
                  <strong>Total Groups</strong>: {this.props.appGlobals.currentASForce.getTotalGroups()}&nbsp;|&nbsp;
                  <strong>Total Units</strong>: {this.props.appGlobals.currentASForce.getTotalUnits()}&nbsp;|&nbsp;
                  <strong>Total Points</strong>: {this.props.appGlobals.currentASForce.getTotalPoints()}

                </p>

                {this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupIndex) => {
                  return (<fieldset key={asGroupIndex} className="fieldset">
                    <legend>{asGroup.getName(asGroupIndex + 1)}</legend>

                    <div className="pull-right">
                      <button
                        onClick={() => this.props.appGlobals.saveASGroupFavorite( asGroup )}
                        title={asGroup.members.length === 0 ? "A group need to have members to save as a favorite" : "Click here to add this group to your favorites."}
                        className="btn btn-primary btn-sm"
                        disabled={asGroup.members.length === 0}
                      >
                        <FaHeart />
                      </button>
                      <button
                        onClick={() => this.removeGroup(asGroupIndex)}
                        title="Click here to remove this group."
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="width-80">
                        <div className="width-50">
                            <label>
                                <select
                                    title="Select your Group Organization Label"
                                    onChange={(event: React.FormEvent<HTMLSelectElement>) => this.selectGroupLabel(event.currentTarget.value, asGroupIndex)}
                                    value={asGroup.groupLabel}
                                >
                                    {unitGroupNames.map( (name, nameIndex) => {
                                        return (
                                            <option key={nameIndex}>{name}</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </div>
                        <div className="width-50">
                            <label>
                                <input
                                    title="Here you can name your unit"
                                    placeholder={"Custom " + asGroup.groupLabel + " Name"}
                                    type="text"
                                    onChange={(event: React.FormEvent<HTMLInputElement>) => this.renameGroup(event.currentTarget.value, asGroupIndex)}
                                    value={asGroup.customName}
                                />
                            </label>
                        </div>
                    </div>


                    <table className="table">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          <th>Name</th>
                          <th className="min-width no-wrap">Points</th>

                        </tr>
                      </thead>

                      {asGroup.members.length > 0 ? (
                        <>
                        {asGroup.members.map( (asUnit, asUnitIndex) => {
                          return (
                            <tbody key={asUnitIndex}>
                            <tr>
                              <td className="text-left min-width no-wrap">
                                {this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.getTotalGroups() > 1 ?
                                (
                                  <div className="drop-down-menu-container">
                                    <button
                                      className="btn btn-primary btn-sm"
                                      title="Open the context menu for this unit"
                                      onClick={() => this.toggleContextMenuForce( asGroupIndex, asUnitIndex )}
                                    >
                                      <FaBars />
                                    </button>
                                    <ul
                                      className={this.state.contextMenuGroup === asGroupIndex && this.state.contextMenuUnit === asUnitIndex ? "styleless dd-menu active" : "styleless dd-menu"}
                                    >
                                      <li
                                        onClick={() => this.openEditUnit(asUnit)}
                                        title="Edit this unit"
                                      ><FaEdit /> Edit
                                      </li>
                                      {this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupListIndex) => {
                                        return (
                                          <React.Fragment key={asGroupListIndex}>
                                            {asGroupListIndex !== asGroupIndex ? (
                                              <li
                                                onClick={() => this.moveUnitToGroup(asUnitIndex, asGroupIndex, asGroupListIndex)}
                                                title="Move this unit to another group"
                                              >
                                                <FaArrowsAlt />&nbsp;
                                                Move to {asGroup.getName(asGroupListIndex + 1)}
                                              </li>
                                            ) :
                                            ( <></> )}
                                          </React.Fragment>
                                        )
                                      })}
                                    </ul>
                                  </div>
                                ) : (
                                  <>
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.openEditUnit(asUnit)}
                                    title="Edit this unit's skill and name"
                                  >
                                    <FaEdit />
                                  </button>
                                  </>
                                )}


                                <button
                                  className="btn-sm btn btn-danger no-right-margin"
                                  onClick={() => this.removeUnitFromGroup(asGroupIndex, asUnitIndex)}
                                  title="Remove this unit"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                              <td>
                                {asUnit.customName ? (
                                  <><strong>{asUnit.customName}</strong><br /></>
                                ) : (
                                  <></>
                                )}
                                {asUnit.name}

                              </td>
                              <td className="min-width no-wrap">{asUnit.currentPoints}</td>

                            </tr>
                            <tr>
                              <td className="text-center small-text">
                              {asUnit.mechCreatorUUID ? (
                                  <div title="This mech was created with the 'Mech Builder">Custom</div>
                                ) : (
                                  <>&nbsp;</>
                                )}
                              </td>
                              <td colSpan={3} className="med-small-text">
                              {asUnit.isWrecked() ? (
                                  <div className="pull-right wrecked-tag">
                                      <FaExclamationTriangle /> Wrecked
                                  </div>
                                ) : (
                                  <>
                                    {asUnit.isUnderStrength() ? (
                                    <div className="pull-right damaged-tag">
                                        <AiOutlineWarning /> Damaged
                                    </div>
                                  ) : null}
                                  </>
                                )}

                                <strong title="This is the Pilot's Skill">Pilot Skill</strong>: {asUnit.currentSkill}
                                &nbsp;|&nbsp;<strong title="Armor/Internal Structure values">A/IS</strong>: {asUnit.armor}/{asUnit.structure}
                                &nbsp;|&nbsp;<strong title="Alpha Strike Damage Bands">Damage</strong>: {asUnit.damage.short}/{asUnit.damage.medium}/{asUnit.damage.long}
                                {asUnit.overheat  && asUnit.overheat > 0 ? (
                                  <>
                                   &nbsp;|&nbsp;<strong title="Overheat Value">OHV</strong>: {asUnit.overheat}
                                  </>
                                ) : null}
                                {asUnit.abilities && asUnit.abilities.trim() ? (
                                  <>
                                   &nbsp;|&nbsp;<strong title="Special Abilities">Special</strong>: {asUnit.abilities}
                                  </>
                                ) : null}



                              </td>
                            </tr>
                            </tbody>
                          )
                        })}
                        </>
                      ) : (
                        <tbody><tr><td colSpan={3} className="text-center">No Units</td></tr></tbody>
                      )}


                      <tfoot key="footer">
                        <tr key="groupsum">

                          <td colSpan={2}>
                            <strong>Available Bonuses</strong>:({asGroup.availableFormationBonuses.length-1})
                            <select
                              value={asGroup.formationBonus? asGroup.formationBonus.Name:"" }
                              onChange={(event:React.FormEvent<HTMLSelectElement>)=>this.updateFormationBonus(event, asGroupIndex)}
                            >
                              {asGroup.availableFormationBonuses.map((bonus)=>{
                                return (
                                <option key={bonus.Name} value={bonus.Name}>{bonus.Name}</option>
                                )
                              })}
                            </select>
                            <br/>
                            {(asGroup.formationBonus && asGroup.formationBonus.Name!=="None") ? (

                              <div className="small-pt-text">
                                <strong>Bonus</strong>: {asGroup.formationBonus.BonusDescription}
                                </div>

                            ) : null
                            }
                          </td>
                          <td className="min-width no-wrap">Points: {asGroup.getTotalPoints()}</td>
                        </tr>
                      </tfoot>

                    </table>
                  </fieldset>
                  )
                })}
                <p>
                  <button
                    onClick={this.newGroup}
                    className="btn btn-primary display-block text-center full-width no-margin"
                  >
                    New Group
                  </button>
                </p>
                <p className="text-center">
                  <strong>Total Groups</strong>: {this.props.appGlobals.currentASForce.getTotalGroups()}&nbsp;|&nbsp;
                  <strong>Total Units</strong>: {this.props.appGlobals.currentASForce.getTotalUnits()}&nbsp;|&nbsp;
                  <strong>Total Points</strong>: {this.props.appGlobals.currentASForce.getTotalPoints()}

                </p>

                </TextSection>

        )
    }
}


interface ICurrentForceListProps {
    appGlobals: IAppGlobals;
    openAddingUnits?( e: React.FormEvent<HTMLButtonElement>): void;

    openEditUnit( showASUnit: AlphaStrikeUnit ): void
}

interface ICurrentForceListState {
    contextMenuGroup: number;
    contextMenuUnit: number;
}