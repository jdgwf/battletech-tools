import { FaDice, FaDownload, FaFileImport, FaPlusCircle, FaPrint, FaTrash } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import AlphaStrikeGroup, { IASGroupExport } from '../../../../classes/alpha-strike-group';
import { AlphaStrikeUnit, IASMULUnit } from '../../../../classes/alpha-strike-unit';
import { makeURLSlug } from '../../../../utils/makeURLSlug';
import { IAppGlobals } from '../../../app-router';
import StandardModal from '../../../components/standard-modal';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import AlphaStrikeAddUnitsView from './_AddUnitsPage';
import CurrentForceList from './_CurrentForceList';
import AlphaStrikeUnitEditViewModal from './_showAlphaStrikeUnit';
import { CONST_FORCE_PACKS, IForcePack } from "../../../../data/force-packs-mechs";
import { joinListWithEndLabel } from "../../../../utils/joinListWithEndLabel";
import { getMULASSearchResults } from "../../../../utils";

export default class AlphaStrikeRosterHome extends React.Component<IHomeProps, IHomeState> {

    fileReader: FileReader | null = null;

    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            updated: false,
            showASUnit: null,
            editASUnit: false,
            addingUnitsModal: false,
        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike Roster");

    }

    addForcePack = async (
      e: React.FormEvent<HTMLButtonElement>,
      pack: IForcePack,
    ) => {
      if( e && e.preventDefault ) e.preventDefault();

      let currentASForce = this.props.appGlobals.currentASForce;
      if( currentASForce) {
        let newGroup = new AlphaStrikeGroup();
        newGroup.groupLabel = pack.groupLabel;

        newGroup.customName = pack.name;

        for( let member of pack.members ) {
          let data: IASMULUnit[] = await getMULASSearchResults(
            member,
            "intro+standard",
            pack.tech === "clan" ? "clan" : "inner sphere",
            0, // clan invasion
            "", // Type Filter
            !navigator.onLine,
          );


          data.sort( (
            a: IASMULUnit,
            b: IASMULUnit
          ): number => {

              if(
                a.Name && b.Name &&
                a.Name.toLowerCase().indexOf(" prime") > -1
                &&
                b.Name.toLowerCase().indexOf(" prime") === -1
              ) {
                return -1;
              }if(
                a.Name && b.Name &&
                a.Name.toLowerCase().indexOf(" prime") === -1
                &&
                b.Name.toLowerCase().indexOf(" prime") > -1
              ) {
                return 1;
              } if(
                a.Name && b.Name &&
                a.Name.toLowerCase().indexOf(" (standard)") > -1
                &&
                b.Name.toLowerCase().indexOf(" (standard)") === -1
              ) {
                return -1;
              }if(
                a.Name && b.Name &&
                a.Name.toLowerCase().indexOf(" (standard)") === -1
                &&
                b.Name.toLowerCase().indexOf(" (standard)") > -1
              ) {
                return 1;
              } else {
                if( a.Name && b.Name && a.Name.toLowerCase().trim() > b.Name.toLowerCase().trim() ) {
                  return 1;
                } else if(a.Name && b.Name && a.Name.toLowerCase().trim() < b.Name.toLowerCase().trim() ) {
                  return -1;
                } else {
                  return 0
                }
              }
            }
          )

          console.log( "data", data)

          let foundPrmary = false;

          if( data.length === 1 ) {
            let newUnit = new AlphaStrikeUnit( data[0] );
            newGroup.members.push(
              newUnit
            )
            foundPrmary = true;
          }

          // look for Intro first...
          for( let item of data ) {
            if( item.Rules.toLowerCase().trim() === "introductory" ) {
              if( item.Name && item.Name.toLowerCase().indexOf(" prime") > -1 ) {
                // console.log("Adding intro rules unit via prime in name", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );

                if( pack.tech === "clan" ) newUnit.setSkill(3);

                newGroup.members.push(
                  newUnit
                )

                foundPrmary = true;
                break;
              }
              if( item.Name && item.Name.toLowerCase().indexOf(" (standard)") > -1 ) {
                // console.log("Adding intro rules unit via prime in name", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );

                if( pack.tech === "clan" ) newUnit.setSkill(3);

                newGroup.members.push(
                  newUnit
                )

                foundPrmary = true;
                break;
              }
              if( item.RS && item.RS.toLowerCase().indexOf("rs3039") > -1 ) {
                // console.log("Adding intro rules unit via rs3039", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );
                if( pack.tech === "clan" ) newUnit.setSkill(3);
                newGroup.members.push(
                  newUnit
                )
                foundPrmary = true;
                break;
              }

              if( item.RS && item.RS.toLowerCase().indexOf("rs3050") > -1 ) {

                // console.log("Adding intro rules unit via rs3050", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );
                if( pack.tech === "clan" ) newUnit.setSkill(3);
                newGroup.members.push(
                  newUnit
                )
                foundPrmary = true;
                break;
              }
            }

          }

          if(!foundPrmary) {
            // console.log("data", data)
            for( let item of data ) {
              if( item.Name && item.Name.toLowerCase().indexOf(" prime") > -1 ) {
                // console.log("Adding unit via prime in name", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );
                if( pack.tech === "clan" ) newUnit.setSkill(3);
                newGroup.members.push(
                  newUnit
                )
                foundPrmary = true;
                break;
              }
              if( item.Name && item.Name.toLowerCase().indexOf(" (standard)") > -1 ) {
                // console.log("Adding intro rules unit via prime in name", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );

                if( pack.tech === "clan" ) newUnit.setSkill(3);

                newGroup.members.push(
                  newUnit
                )

                foundPrmary = true;
                break;
              }
              if( item.RS && item.RS.toLowerCase().indexOf("rs3039") > -1 ) {
                // console.log("Adding unit via rs3039", item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );
                if( pack.tech === "clan" ) newUnit.setSkill(3);
                newGroup.members.push(
                  newUnit
                )
                foundPrmary = true;
                break;
              }

              if( item.RS && item.RS.toLowerCase().indexOf("rs3050") > -1 ) {

                // console.log("Adding unit via rs3050", item, item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );
                if( pack.tech === "clan" ) newUnit.setSkill(3);
                newGroup.members.push(
                  newUnit
                )
                foundPrmary = true;
                break;
              }
              if( item.RS && item.RS.toLowerCase().indexOf("rg") === 0 ) {

                // console.log("Adding unit via rg*", item, item.Name, item.RS)
                let newUnit = new AlphaStrikeUnit( item );
                if( pack.tech === "clan" ) newUnit.setSkill(3);
                newGroup.members.push(
                  newUnit
                )
                foundPrmary = true;
                break;
              }

            }
          }



          if(!foundPrmary) {
            console.log("data", data);
          }

        }


        if( newGroup.members.length > 0 ) {
          currentASForce.groups.push( newGroup );
          this.props.appGlobals.saveCurrentASForce( currentASForce );
          this.setState({
            updated: true,
          })
        }

      }


    }

    removeFavoriteConfirm = ( asFavGroupIndex: number ): void => {

      this.props.appGlobals.openConfirmDialog(
        "Confirmation",
        "Are you sure you want to delete this favorite group?",
        "Yes",
        "No",
        () => {
          this.props.appGlobals.removeASGroupFavorite(asFavGroupIndex);
        }
      );
    }

    loadASFavorite = (asFavGroup: AlphaStrikeGroup ): void => {
      if( this.props.appGlobals.currentASForce ) {
        asFavGroup.setNew();
        this.props.appGlobals.currentASForce.groups.push( asFavGroup );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    openViewUnit = ( theUnit: AlphaStrikeUnit ): void => {
      let showASUnit = theUnit;

      this.setState({
        showASUnit: showASUnit,
        editASUnit: false,
      })
    }

    openEditUnit = ( showASUnit: AlphaStrikeUnit ): void => {

      this.setState({
        showASUnit: showASUnit,
        editASUnit: true,

      })
    }

    closeShowUnitDialog = (): void => {
      this.setState({
        showASUnit: null,
      })
    }

    selectFile = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
      if( e && e.preventDefault ) e.preventDefault();
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
            let data: IASGroupExport = JSON.parse( content.toString() )

            // let btFavASGroup = this.props.appGlobals.favoriteASGroup;
            // for( let item of data ) {
            let parsedItem =  new AlphaStrikeGroup(data);
            // }

            this.props.appGlobals.saveASGroupFavorite( parsedItem );
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
<AlphaStrikeUnitEditViewModal
  appGlobals={this.props.appGlobals}
  showASUnit={this.state.showASUnit}
  editASUnit={this.state.editASUnit}
  closeShowUnitDialog={this.closeShowUnitDialog}
/>
<StandardModal
  show={this.state.addingUnitsModal}
  onClose={this.closeAddingUnits}
  className="modal-xl"
  title="Adding units to Current Force"
>
        <AlphaStrikeAddUnitsView
          appGlobals={this.props.appGlobals}
          openEditUnit={this.openEditUnit}
          openViewUnit={this.openViewUnit}
        />
</StandardModal>

        <UIPage current="alpha-strike-roster" appGlobals={this.props.appGlobals}>

          {this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.getTotalUnits() > 0 ? (
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
              <CurrentForceList
                  appGlobals={this.props.appGlobals}
                  openAddingUnits={this.openAddingUnits}
                  openEditUnit={this.openEditUnit}
              />
            </div>
            <div className="col-lg-6">

            {this.props.appGlobals.favoriteASGroups.length > 0 ? (

<TextSection
  label="Favorite Alpha Strike Groups"
>

{this.props.appGlobals.favoriteASGroups.map( (asFavGroup, asFavGroupIndex) => {
  return (<fieldset key={asFavGroupIndex} className="fieldset">
    <legend>{asFavGroup.getName(0)}</legend>

    <div className="pull-right">
      <a
          className="btn btn-primary btn-sm"
          title="Export this favorite to a JSON format to transfer between devices"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(asFavGroup.export())
          )}`}
          download={"as-group-favorite-export-" + makeURLSlug(asFavGroup.getName(0)) + ".json"}
        >
          <FaDownload />
        </a>
      <button
        onClick={() => this.loadASFavorite(asFavGroup)}
        title="Load this favorite group to your current force"
        className="btn-sm btn-primary btn"
      >
        <FaFileImport />
      </button>

      <button
        onClick={() => this.removeFavoriteConfirm( asFavGroupIndex)}
        title="Remove this favorite"
        className="btn-sm btn-danger btn"
      >
        <FaTrash />
      </button>
    </div>
    <div className="text-center">
      <br />
      <strong># Units/Points</strong>: {asFavGroup.getTotalUnits()}/{asFavGroup.getTotalPoints()}
    </div>

    <table className="table tighter-padding">
      <thead>
        <tr>
          <th>Name</th>
          <th>Pilot</th>
          <th>Points</th>
        </tr>
      </thead>

      {asFavGroup.members.length > 0 ? (
        <>
        {asFavGroup.members.map( (asFavGroupUnit, asFavGroupUnitIndex) => {
          return (
            <tbody key={asFavGroupUnitIndex}>
            <tr>
              <td>
                {asFavGroupUnit.customName ? (
                  <><strong>{asFavGroupUnit.customName}</strong><br /></>
                ) : (
                  <></>
                )}
                {asFavGroupUnit.name}

              </td>
              <td>{asFavGroupUnit.currentSkill}</td>
              <td>{asFavGroupUnit.currentPoints}</td>

            </tr>
            </tbody>
          )
        })}
        </>
      ) : (
        <tbody>
        <tr><td colSpan={3} className="text-center">No Units</td></tr>
        </tbody>
      )}

    </table>
  </fieldset>
  )
})}

</TextSection>
): null}

<TextSection
label="Quickly add a ForcePack"
>
  <ul className="styleless">
  {CONST_FORCE_PACKS.map( (pack, packindex) => {
    return (
      <li key={packindex} className="overflow-hidden">
        <button
          className="btn btn-md btn-primary pull-left margin-right"
          onClick={(e) => this.addForcePack( e, pack)}
        >
          <FaPlusCircle />
        </button>
        {pack.name}<br />
        <div className="small-text">{joinListWithEndLabel(pack.members, "and")}</div>
      </li>
    )
  })}
  </ul>
</TextSection>

<TextSection
label='Import to your AS Favorites'
>
<div className="text-small">Use this uploader to restore your favorites from another device. The file will be named, unless it was renamed, "as-group-favorite-export-*,json"</div>

<label
title="Click here to select a JSON file exported this page"
>
Import JSON:&nbsp;
<input
  type="file"
  style={{width: "auto"}}
  onChange={this.selectFile}
/>
</label>
<br />
</TextSection>
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
  showASUnit: AlphaStrikeUnit | null;
  editASUnit: boolean;

  addingUnitsModal: boolean;
}