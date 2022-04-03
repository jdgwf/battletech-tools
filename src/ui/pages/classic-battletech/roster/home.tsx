import React from 'react';
import { FaDice, FaHeart, FaPrint, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BattleMech } from "../../../../classes/battlemech";
import { BattleMechGroup, IBMGroupExport } from '../../../../classes/battlemech-group';
import { unitGroupNames } from '../../../../data/group-names';
import { IAppGlobals } from '../../../app-router';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import BattleMechTableGroup from './_tableGroup';



export default class BattleMechRosterHome extends React.Component<IHomeProps, IHomeState> {

    fileReader: FileReader | null = null;

    constructor(props: IHomeProps) {
        super(props);


        this.state = {
            updated: false,
            showBMUnit: null,
            editBMUnit: false,

        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike Roster");


    }

    newGroup = (): void => {
      if( this.props.appGlobals.currentBMForce) {
        this.props.appGlobals.currentBMForce.newGroup();
        this.props.appGlobals.saveCurrentBMForce( this.props.appGlobals.currentBMForce );
      }
    }

    removeGroup = ( bmGroupIndex: number ): void => {
      if( this.props.appGlobals.currentBMForce && this.props.appGlobals.currentBMForce.groups.length > bmGroupIndex ) {
        if(this.props.appGlobals.currentBMForce.groups[bmGroupIndex].getTotalUnits() === 0 ) {
          this.props.appGlobals.currentBMForce.removeGroup(bmGroupIndex);
          this.props.appGlobals.saveCurrentBMForce( this.props.appGlobals.currentBMForce );
        } else {
          this.props.appGlobals.openConfirmDialog(
            "Confirmation",
            "This group still contains units. Are you sure you want to still remove it?",
            "Yes",
            "No",
            () => {
              if( this.props.appGlobals.currentBMForce ) {
                this.props.appGlobals.currentBMForce.removeGroup(bmGroupIndex);
                this.props.appGlobals.saveCurrentBMForce( this.props.appGlobals.currentBMForce );
              }
            }
          );
        }
      }
    }

    selectGroupLabel = ( newName: string, groupIndex: number ): void => {
      if( this.props.appGlobals.currentBMForce) {
      this.props.appGlobals.currentBMForce.selectGroupLabel( newName, groupIndex );
      this.props.appGlobals.saveCurrentBMForce( this.props.appGlobals.currentBMForce );
    }
  }

    renameGroup = ( newName: string, bmGroupIndex: number ): void => {
      if( this.props.appGlobals.currentBMForce) {
        this.props.appGlobals.currentBMForce.renameGroup( newName, bmGroupIndex );
        this.props.appGlobals.saveCurrentBMForce( this.props.appGlobals.currentBMForce );
      }
    }

    removeFavoriteConfirm = ( asFavGroupIndex: number ): void => {

      this.props.appGlobals.openConfirmDialog(
        "Confirmation",
        "Are you sure you want to delete this favorite group?",
        "Yes",
        "No",
        () => {
          this.props.appGlobals.removeBMGroupFavorite(asFavGroupIndex);
        }
      );
    }

    loadBMFavorite = (asFavGroup: BattleMechGroup ): void => {
      if( this.props.appGlobals.currentBMForce ) {
        asFavGroup.setNew();
        this.props.appGlobals.currentBMForce.groups.push( asFavGroup );
        this.props.appGlobals.saveCurrentBMForce( this.props.appGlobals.currentBMForce );
      }
    }



    openViewUnit = ( theUnit: BattleMech ): void => {
      let showBMUnit = theUnit;

      this.setState({
        showBMUnit: showBMUnit,
        editBMUnit: false,
      })
    }

    openEditUnit = ( showBMUnit: BattleMech ): void => {

      this.setState({
        showBMUnit: showBMUnit,
        editBMUnit: true,

      })
    }


    closeShowUnitDialog = (): void => {
      this.setState({
        showBMUnit: null,
      })
    }




    selectFile = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
      e.preventDefault();
      if( e.currentTarget.files && e.currentTarget.files.length > 0 ) {
        let foundFile = e.currentTarget.files[0];
        // console.log( "test", foundFIle );
        if( foundFile.type === "application/json" ) {
          this.fileReader = new FileReader();
          this.fileReader.onloadend = this.handleFileRead;
          this.fileReader.readAsText( foundFile );
        }

      }
    }

    handleFileRead = (e: any) => {
      if( this.fileReader ) {
        let content = this.fileReader.result;

        // console.log("content", content)
        try {
          if( content ) {
            let data: IBMGroupExport = JSON.parse( content.toString() )

            // let btFavBMGroup = this.props.appGlobals.favoriteBMGroup;
            // for( let item of data ) {
            let parsedItem =  new BattleMechGroup(data);
            // }

            this.props.appGlobals.saveBMGroupFavorite( parsedItem );
          }
        }
        catch (err) {
          console.error("Could not import JSON", err)
        }
      }
    }


    render = (): React.ReactFragment => {
      return (
        <>
{/* <BattleMechEditViewModal
  appGlobals={this.props.appGlobals}
  showBMUnit={this.state.showBMUnit}
  editBMUnit={this.state.editBMUnit}
  closeShowUnitDialog={this.closeShowUnitDialog}
/> */}



        <UIPage current="classic-battletech-roster" appGlobals={this.props.appGlobals}>

          <div className="alert alert-danger text-center">
            <h4>In Development</h4>
            This area will be the equivalent of the Roster Maker in Alpha Strike. If anything seems to work, it likely doesn't. Use at your owm risk!
          </div>
          {this.props.appGlobals.currentBMForce && this.props.appGlobals.currentBMForce.getTotalUnits() > 0 ? (
            <div className="row">
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/classic-battletech/roster/play`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go into 'Play Mode'"
                >
                    <FaDice />&nbsp;Play Mode
                </Link><br />
                <br />
              </div>
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/classic-battletech/roster/print`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go to a printable version of this page"
                >
                    <FaPrint />&nbsp;Print Force
                </Link><br />
                <br />
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="row">
            <div className="col-lg-6">
              {this.props.appGlobals.currentBMForce ? (
                <>
                  {this.props.appGlobals.currentBMForce.groups.map( (bmGroup, bmGroupIndex) => {
                    return (
                      <fieldset key={bmGroupIndex} className="fieldset">
                        <legend>{bmGroup.groupLabel} #{bmGroupIndex +1}</legend>

                    <div className="pull-right">
                      <button
                        onClick={() => this.props.appGlobals.saveBMGroupFavorite( bmGroup )}
                        title={bmGroup.members.length === 0 ? "A group need to have members to save as a favorite" : "Click here to add this group to your favorites."}
                        className="btn btn-primary btn-sm"
                        disabled={bmGroup.members.length === 0}
                      >
                        <FaHeart />
                      </button>
                      <button
                        onClick={() => this.removeGroup(bmGroupIndex)}
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
                                    onChange={(event: React.FormEvent<HTMLSelectElement>) => this.selectGroupLabel(event.currentTarget.value, bmGroupIndex)}
                                    value={bmGroup.groupLabel}
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
                                    placeholder={"Custom " + bmGroup.groupLabel + " Name"}
                                    type="text"
                                    onChange={(event: React.FormEvent<HTMLInputElement>) => this.renameGroup(event.currentTarget.value, bmGroupIndex)}
                                    value={bmGroup.customName}
                                />
                            </label>
                        </div>
                    </div>


                    <BattleMechTableGroup
                      appGlobals={this.props.appGlobals}
                      bmGroupIndex={bmGroupIndex}
                      showAdd={true}
                      showEdit={true}
                    />


                      </fieldset>
                    )
                  })}
                </>
              ) : null}
<p>
                  <button
                    onClick={this.newGroup}
                    className="display-block text-center btn btn-primary full-width no-margin"
                  >
                    New Group
                  </button>
                </p>
                {this.props.appGlobals.currentBMForce ? (
                  <p className="text-center">
                  <strong>Total Groups</strong>: {this.props.appGlobals.currentBMForce.getTotalGroups()}&nbsp;|&nbsp;
                  <strong>Total Units</strong>: {this.props.appGlobals.currentBMForce.getTotalUnits()}&nbsp;|&nbsp;
                  <strong>Total BV2</strong>: {this.props.appGlobals.currentBMForce.getTotalBV2()}

                </p>
                ) : null}
            </div>
            <div className="col-lg-6">

            {this.props.appGlobals.favoriteBMGroups.length > 0 ? (

<TextSection
  label="Favorite Groups"
>

{this.props.appGlobals.favoriteBMGroups.map( (favGroup, favGroupIndex)=> {
  return (
    <div  key={favGroupIndex}>
      {favGroup.getName(favGroupIndex)}
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th className="min-width no-wrap text-center">Piloting</th>
          <th className="min-width no-wrap text-center">Gunnery</th>
          <th className="min-width no-wrap text-center">Points</th>
        </tr>
      </thead>
      {favGroup.members.map( (mechObj, mechIndex) => {
            let pilotBV2 = mechObj.getPilotAdjustedBattleValue();
            let baseBV2 = mechObj.getBattleValue();

            return (
                <tbody key={mechIndex}>
                <tr>
                    <td>
                        {mechObj.getName()}
                        {mechObj.pilot.name && mechObj.pilot.name.trim() ? (
                            <div className='small-text'>
                                <strong>Pilot:</strong> {mechObj.pilot.name}
                            </div>
                        ) : null}

                    </td>
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

<tfoot>
<tr>

<td colSpan={2}>
{favGroup.members.length > 0 ? (
    <>
        {favGroup.members.length > 0 ? (
            <>{favGroup.members.length} Units</>
        ) : (
            <>One Unit</>
        )}
    </>
) : (
    <>No Units</>
)}
</td>
<td colSpan={2} className="text-right">BV2: {favGroup.getTotaBV2()}</td>
</tr>
</tfoot>
    </table>
    </div>
  )
 })}
</TextSection>
): null}

            </div>
          </div>

          </UIPage>
        </>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;

}

interface IHomeState {
  updated: boolean;


  // searchText: string;
  showBMUnit: BattleMech | null;
  editBMUnit: boolean;






}