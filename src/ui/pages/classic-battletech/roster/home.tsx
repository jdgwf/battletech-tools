import React from 'react';
import { Button } from 'react-bootstrap';
import { FaDice, FaHeart, FaPrint, FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BattleMech } from "../../../../classes/battlemech";
import { BattleMechGroup, IBMGroupExport } from '../../../../classes/battlemech-group';
import { unitGroupNames } from '../../../../data/group-names';
import { IAppGlobals } from '../../../app-router';
import StandardModal from '../../../components/standard-modal';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';



export default class BattleMechRosterHome extends React.Component<IHomeProps, IHomeState> {

    fileReader: FileReader | null = null;

    constructor(props: IHomeProps) {
        super(props);


        this.state = {
            updated: false,
            showBMUnit: null,
            editBMUnit: false,
            addingUnitsModal: false,
        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike Roster");


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

    openAddingUnits = (
      e: React.FormEvent<HTMLButtonElement>
  ) => {
    if( e && e.preventDefault ) {
      e.preventDefault()
    }

    this.setState({
      addingUnitsModal: true,
    })

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
<StandardModal
  show={this.state.addingUnitsModal}
  onClose={this.closeAddingUnits}
  className="modal-xl"
  title="Adding units to Current Force"
>
        {/* <BattleMechAddUnitsView
          appGlobals={this.props.appGlobals}
          openEditUnit={this.openEditUnit}
          openViewUnit={this.openViewUnit}
        /> */}
</StandardModal>



        <UIPage current="classic-battletech-roster" appGlobals={this.props.appGlobals}>

          <div className="alert alert-danger text-center">
            This is TOTALLY Broken - don't use this!
          </div>
          {this.props.appGlobals.currentBMForce && this.props.appGlobals.currentBMForce.getTotalUnits() > 0 ? (
            <div className="row">
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/alpha-strike/roster/play`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go into 'Play Mode'"
                >
                    <FaDice />&nbsp;Play Mode
                </Link><br />
                <br />
              </div>
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/alpha-strike/roster/print`}
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
                      <Button
                        onClick={() => this.props.appGlobals.saveBMGroupFavorite( bmGroup )}
                        title="Click here to add this group to your favorites."
                        className="btn-sm"
                      >
                        <FaHeart />
                      </Button>
                      <Button
                        onClick={() => this.removeGroup(bmGroupIndex)}
                        title="Click here to remove this group."
                        className="btn-sm"
                      >
                        <FaTrash />
                      </Button>
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


                    <table className="table">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          <th>Name</th>
                          <th>Points</th>

                        </tr>
                      </thead>

                      {bmGroup.members.length > 0 ? (
                        <>
                        </>
) : (
  <tbody><tr><td colSpan={3} className="text-center">No Units</td></tr></tbody>
)}


<tfoot key="footer">
  <tr key="groupsum">

    <td colSpan={2}>
      {/* <strong>Available Bonuses</strong>:({bmGroup.availableFormationBonuses.length-1})
      <select
        value={bmGroup.formationBonus? bmGroup.formationBonus.Name:"" }
        onChange={(event:React.FormEvent<HTMLSelectElement>)=>this.updateFormationBonus(event, bmGroupIndex)}
      >
        {bmGroup.availableFormationBonuses.map((bonus)=>{
          return (
          <option key={bonus.Name} value={bonus.Name}>{bonus.Name}</option>
          )
        })}
      </select>
      <br/>
      {(bmGroup.formationBonus && bmGroup.formationBonus.Name!=="None") ? (

        <div className="small-pt-text">
          <strong>Bonus</strong>: {bmGroup.formationBonus.BonusDescription}
          </div>

      ) : null
      } */}
    </td>
    <td>BV2: {bmGroup.getTotaBV2()}</td>
  </tr>
</tfoot>

</table>
                      </fieldset>
                    )
                  })}
                </>
              ) : null}

            </div>
            <div className="col-lg-6">

            {this.props.appGlobals.favoriteBMGroups.length > 0 ? (

<TextSection
  label="Favorite Groups"
>



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





  addingUnitsModal: boolean;
}