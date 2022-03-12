import { faBars, faDice, faEye, faFileExport, faFileImport, faPlus, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AlphaStrikeGroup, { IASGroupExport } from '../../../classes/alpha-strike-group';
import { AlphaStrikeUnit, IASMULUnit } from '../../../classes/alpha-strike-unit';
import { getMULASSearchResults, makeRange, makeURLSlug } from '../../../utils';
import { IAppGlobals } from '../../app-router';
import StandardModal from '../../components/standard-modal';
import TextSection from '../../components/text-section';
import UIPage from '../../components/ui-page';
import './home.scss';
import CurrentForceList from './_CurrentForceList';
import AlphaStrikeUnitEditViewModal from './_showAlphaStrikeUnit';


export default class AlphaStrikeRosterHome extends React.Component<IHomeProps, IHomeState> {

    fileReader: FileReader | null = null;

    searchTech: string = "";
    searchTerm: string = "";
    searchRules: string = "";
    searchEra: string = "";
    constructor(props: IHomeProps) {
        super(props);

        let lsSearchTerm = "";
        let rawLSSearchTerm = localStorage.getItem("asSearchTerm");
        if( rawLSSearchTerm ) {
          lsSearchTerm = rawLSSearchTerm;
        }

        let lsSearchEra = "";
        let rawSearchEra = localStorage.getItem("asEraSearch");
        if( rawSearchEra ) {
          lsSearchEra = rawSearchEra;
        }


        let lsSearchRules = "";
        let rawLSsearchRules = localStorage.getItem("asSearchRules");
        if( rawLSsearchRules ) {
          lsSearchRules = rawLSsearchRules;
        }

        let lsSearchTech = "";
        let rawLSSearchTech = localStorage.getItem("asSearchTech");
        if( rawLSSearchTech ) {
          lsSearchTech = rawLSSearchTech;
        }

        let lsSearchResults: IASMULUnit[] = [];
        let rawLSSearchResults = localStorage.getItem("asSearchResults");
        if( rawLSSearchResults ) {
          lsSearchResults = JSON.parse(rawLSSearchResults);
        }

        this.searchTech = lsSearchTech;
        this.searchTerm = lsSearchTerm;
        this.searchRules = lsSearchRules;
        this.searchEra = lsSearchEra;

        this.state = {
            updated: false,
            foundItems: [],
            searchResults: lsSearchResults,
            showASUnit: null,
            searchText: lsSearchTerm,
            editASUnit: false,

            contextMenuSearch: -1,

            addingUnitsModal: false,
        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike Roster");

        this.updateSearchResults();
    }

    addToGroup = ( mulUnit: IASMULUnit,  groupIndex: number = 0  ): void => {
      this.props.appGlobals.currentASForce.addToGroup( mulUnit, groupIndex );
      this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      this.setState({
        contextMenuSearch: -1,
      })
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
      asFavGroup.setNew();
      this.props.appGlobals.currentASForce.groups.push( asFavGroup );
      this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
    }


    toggleContextMenuSearch = ( searchIndex: number ): void => {
      let newIndex: number = -1;
      if( this.state.contextMenuSearch !== searchIndex) {
        newIndex = searchIndex;
      }

      this.setState({
        contextMenuSearch: newIndex,

      })
    }


    updateSearch = ( event: React.FormEvent<HTMLInputElement> ): void => {
        localStorage.setItem( "asSearchTerm", event.currentTarget.value);
        this.searchTerm = event.currentTarget.value;
        this.setState({
          searchText:  event.currentTarget.value
        })
        this.updateSearchResults();
    }

    updateRules = ( event: React.FormEvent<HTMLSelectElement> ): void => {
      localStorage.setItem( "asSearchRules", event.currentTarget.value);

      this.searchRules = event.currentTarget.value;

      this.updateSearchResults();
    }


    updateTech = ( event: React.FormEvent<HTMLSelectElement> ): void => {


      localStorage.setItem( "asSearchTech", event.currentTarget.value);
      this.searchTech = event.currentTarget.value;
      this.updateSearchResults();
    }

    updateEra = ( event: React.FormEvent<HTMLSelectElement> ): void => {


      localStorage.setItem( "asEraSearch", event.currentTarget.value);
      this.searchEra = event.currentTarget.value;
      this.updateSearchResults();
    }

    updateSearchResults = async (): Promise<void> => {
      let data: IASMULUnit[] = await getMULASSearchResults(
        this.searchTerm,
        this.searchRules,
        this.searchTech,
        this.searchEra,
        !navigator.onLine,
      );

      this.setState({
        searchResults: data,
        contextMenuSearch: -1,

      })

      localStorage.setItem( "asSearchResults", JSON.stringify(data));
      // console.log("data", data)
    }


    openViewUnit = ( theUnit: IASMULUnit ): void => {
      let showASUnit = new AlphaStrikeUnit( theUnit );

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

        console.log("content", content)
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

    render() {
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
  <div className="row">
    <div className="col">
      <CurrentForceList
          appGlobals={this.props.appGlobals}
          // openAddingUnits={this.openAddingUnits}
          openEditUnit={this.openEditUnit}
      />
    </div>
    <div className="col">
    <TextSection
                label="Search for Units"
              >

                  <fieldset className="fieldset">
                    <div className="row">
                      <div className="col-md-6 text-center">
                      <label>
                      Search Name:<br />
                      <input
                        type="search"
                        onChange={this.updateSearch}
                        value={this.state.searchText}
                      />
                    </label>
                      </div>
                      <div className="col-md-6 text-center">
                      <label>
                      Search Rules:<br />
                      <select
                        onChange={this.updateRules}
                        value={this.searchRules.toLowerCase()}
                      >
                        <option value="">All</option>
                        <option value="introductory">Introductory</option>
                        <option value="standard">Standard</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </label>

                      </div>
</div>
<div className="row">
                      <div className="col-md-6 text-center">
                      <label>
                      Search Tech:<br />
                      <select
                        onChange={this.updateTech}
                        value={this.searchTech.toLowerCase()}
                      >
                        <option value="">All</option>
                        <option value="inner sphere">Inner Sphere</option>
                        <option value="clan">Clan</option>
                      </select>
                    </label>
                      </div>
                      <div className="col-md-6 text-center">
                      <label>
                      Year:<br />
                      <select
                        onChange={this.updateEra}
                        value={this.searchEra}
                      >
                        <option value="">All</option>
                        {makeRange(3025, 3500, 1).map( (year) => {
                          return (
                            <option key={year} value={year}>{year}</option>
                          )
                        })}
                      </select>
                    </label>
                      </div>
                    </div>
                  </fieldset>

                <h3 className="text-center">Search Results ({this.state.searchResults.length})</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Name</th>
                        <th>Rules</th>
                        <th>Tech</th>
                        <th>Era</th>
                        <th>Type</th>
                        <th>Points</th>

                      </tr>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={6}>Notes</th>


                      </tr>
                    </thead>

                    {this.state.searchResults.length > 0 ? (
                      <>
                        {this.state.searchResults.map( (asUnit: IASMULUnit, unitIndex: number) => {

                          return (
                            <tbody key={unitIndex}>
                            <tr>
                              <td className="text-left min-width no-wrap">


{this.props.appGlobals.currentASForce.getTotalGroups() > 1 ?
  (
    <div className="drop-down-menu-container">
      <Button
        variant="primary"
        className="btn-sm"
        onClick={() => this.toggleContextMenuSearch(unitIndex)}
        title="Open the context menu for this unit"
      >
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <ul
        className={this.state.contextMenuSearch === unitIndex ? "styleless dd-menu active" : "styleless dd-menu"}
      >
        {this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupIndex) => {
          return (
            <li
              key={asGroupIndex}
              onClick={() => this.addToGroup(asUnit, asGroupIndex)}
              title={"Adds this unit to your group '" + asGroup.getName(asGroupIndex + 1) + "'"}
            >
              <FontAwesomeIcon icon={faPlus} />&nbsp;
              Add to {asGroup.getName(asGroupIndex + 1)}
            </li>
          )
        })}

      </ul>
    </div>
  ) : (
    <Button
      variant="primary"
      className="btn-sm no-right-margin"
      onClick={() => this.addToGroup(asUnit, 0)}
      title="Add this unit to your current group"
    >
      <FontAwesomeIcon icon={faPlus} />
    </Button>
)}

  <Button
    variant="primary"
    className="btn-sm"
    onClick={() => this.openViewUnit(asUnit)}
    title="View this unit's Alpha Strike Card"
  >
    <FontAwesomeIcon icon={faEye} />
  </Button>
</td>
                              <td>{asUnit.Name}</td>

                              <td>{asUnit.Rules}</td>
                              <td>{asUnit.Technology.Name}</td>
                              <td>{asUnit.EraStart}</td>
                              <td>{asUnit.BFType}</td>
                              <td>{asUnit.BFPointValue}</td>

                            </tr>
                            <tr>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td colSpan={6} className="med-small-text">
                                <strong title="Armor/Internal Structure values">A/IS</strong>: {asUnit.BFArmor}/{asUnit.BFStructure}
                                &nbsp;|&nbsp;<strong title="Alpha Strike Damage Bands">Damage</strong>: {asUnit.BFDamageShort}/{asUnit.BFDamageMedium}/{asUnit.BFDamageLong}
                                {asUnit.BFOverheat  && asUnit.BFOverheat > 0 ? (
                                  <>
                                   &nbsp;|&nbsp;<strong title="Overheat Value">OHV</strong>: {asUnit.BFOverheat}
                                  </>
                                ) : null}
                                {asUnit.BFAbilities && asUnit.BFAbilities.trim() ? (
                                  <>
                                    &nbsp;|&nbsp;<strong title="Special Abilities">Special</strong>: {asUnit.BFAbilities}
                                  </>
                                ) : null}

                              </td>
                            </tr>
                            </tbody>
                          )
                        })}
                      </>
                    ) : (
                      <>
                      {this.searchRules.length > 2 ? (
                        <tbody>
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Please type a search term 3 or more characters.
                          </td>
                        </tr>
                        </tbody>
                      ) : (
                        <tbody>
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Sorry, there are no matches with those parameters
                          </td>
                        </tr>
                        </tbody>
                      )}
                      </>
                    )}


                  </table>
                </TextSection>
    </div>
  </div>
</StandardModal>



        <UIPage current="alpha-strike-roster" appGlobals={this.props.appGlobals}>

          {this.props.appGlobals.currentASForce.getTotalUnits() > 0 ? (
            <div className="row">
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/alpha-strike-roster/play`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go into 'Play Mode'"
                >
                    <FontAwesomeIcon icon={faDice} />&nbsp;Play Mode
                </Link><br />
                <br />
              </div>
              <div className="col-6">
                <Link
                  to={`${process.env.PUBLIC_URL}/alpha-strike-roster/print`}
                  className="btn btn-primary no-margin full-width"
                  title="Click here to go to a printable version of this page"
                >
                    <FontAwesomeIcon icon={faPrint} />&nbsp;Print Force
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
  label="Favorite Groups"
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
          download={"as-favorite-export" + makeURLSlug(asFavGroup.getName(0)) + ".json"}
        >
          <FontAwesomeIcon icon={faFileExport} />
        </a>
      <Button
        onClick={() => this.loadASFavorite(asFavGroup)}
        title="Load this favorite group to your current force"
        className="btn-sm"
      >
        <FontAwesomeIcon icon={faFileImport} />
      </Button>

      <Button
        onClick={() => this.removeFavoriteConfirm( asFavGroupIndex)}
        title="Remove this favorite"
        className="btn-sm"
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
    <div className="text-center">
      <br />
      <strong># Units/Points</strong>: {asFavGroup.getTotalUnits()}/{asFavGroup.getTotalPoints()}
    </div>

    <table className="table tighter-padding">
      <thead>
        <tr>
          <th>Name</th>
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
label='Import to your AS Favorites'
>
<div className="text-small">Use this uploader to restore your favorites from another device.</div>

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
  foundItems: any[];
  searchResults: IASMULUnit[];

  searchText: string;
  showASUnit: AlphaStrikeUnit | null;
  editASUnit: boolean;



  contextMenuSearch: number;

  addingUnitsModal: boolean;
}