import { FaBars, FaEye, FaPlus } from "react-icons/fa";
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { AlphaStrikeUnit, IASMULUnit } from '../../../../classes/alpha-strike-unit';
import { BattleMech } from '../../../../classes/battlemech';
import { getMULASSearchResults, makeRange } from '../../../../utils';
import { IAppGlobals } from '../../../app-router';
import TextSection from '../../../components/text-section';
import CurrentForceList from './_CurrentForceList';

export default class AlphaStrikeAddUnitsView extends React.Component<IAlphaStrikeAddUnitsViewProps, IAlphaStrikeAddUnitsViewState> {

    constructor( props: IAlphaStrikeAddUnitsViewProps ) {
        super(props)

        this.state = {
            searchResults: this.props.appGlobals.appSettings.alphasStrikeCachedSearchResults,
            contextMenuSearch: -1,
        }

        this.updateSearchResults();
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

        let appSettings = this.props.appGlobals.appSettings;

        appSettings.alphaStrikeSearchTerm = event.currentTarget.value;
        this.props.appGlobals.saveAppSettings( appSettings );


        this.updateSearchResults();
    }

    updateRules = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchRules = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );


      this.updateSearchResults();
    }


    updateTech = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchTech = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );



      this.updateSearchResults();
    }

    updateEra = ( event: React.FormEvent<HTMLSelectElement> ): void => {

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphaStrikeSearchEra = event.currentTarget.value;
      this.props.appGlobals.saveAppSettings( appSettings );

      this.updateSearchResults();
    }

    updateSearchResults = async (): Promise<void> => {
      let data: IASMULUnit[] = await getMULASSearchResults(
        this.props.appGlobals.appSettings.alphaStrikeSearchTerm,
        this.props.appGlobals.appSettings.alphaStrikeSearchRules,
        this.props.appGlobals.appSettings.alphaStrikeSearchTech,
        this.props.appGlobals.appSettings.alphaStrikeSearchEra,
        !navigator.onLine,
      );

      this.setState({
        searchResults: data,
        contextMenuSearch: -1,

      })

      let appSettings = this.props.appGlobals.appSettings;

      appSettings.alphasStrikeCachedSearchResults = data;
      this.props.appGlobals.saveAppSettings( appSettings );

    }

    addToGroup = ( mulUnit: AlphaStrikeUnit,  groupIndex: number = 0  ): void => {
      if( this.props.appGlobals.currentASForce ) {
        this.props.appGlobals.currentASForce.addToGroup( mulUnit, groupIndex );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        this.setState({
          contextMenuSearch: -1,
        })
      }
      }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentASForce) {
        return <></>
      }


        return(
            <>
                  <div className="row">
    <div className="col">
      <CurrentForceList
          appGlobals={this.props.appGlobals}
          // openAddingUnits={this.openAddingUnits}
          openEditUnit={this.props.openEditUnit}
      />
    </div>
    <div className="col">
        <TextSection
            label="Search for Units"
        >
            <div className="small-text text-center">
                We integrate with the <a href="http://masterunitlist.info/" target="mul">Master Unit List</a> to make sure that all the stats are as official and as up to date as possible.
            </div>
{navigator.onLine ? (
    <>

<fieldset className="fieldset">
                    <div className="row">
                      <div className="col-md-6 text-center">
                      <label>
                      Search Name:<br />
                      <input
                        type="search"
                        onChange={this.updateSearch}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchTerm}
                      />
                    </label>
                      </div>
                      <div className="col-md-6 text-center">
                      <label>
                      Search Rules:<br />
                      <select
                        onChange={this.updateRules}
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchRules}
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
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchTech}
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
                        value={this.props.appGlobals.appSettings.alphaStrikeSearchEra}
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


{this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.getTotalGroups() > 1 ?
  (
    <div className="drop-down-menu-container">
      <Button
        variant="primary"
        className="btn-sm"
        onClick={() => this.toggleContextMenuSearch(unitIndex)}
        title="Open the context menu for this unit"
      >
        <FaBars />
      </Button>
      <ul
        className={this.state.contextMenuSearch === unitIndex ? "styleless dd-menu active" : "styleless dd-menu"}
      >
        {this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupIndex) => {
          return (
            <li
              key={asGroupIndex}
              onClick={() => this.addToGroup( new AlphaStrikeUnit(asUnit), asGroupIndex)}
              title={"Adds this unit to your group '" + asGroup.getName(asGroupIndex + 1) + "'"}
            >
              <FaPlus />&nbsp;
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
      onClick={() => this.addToGroup( new AlphaStrikeUnit(asUnit), 0)}
      title="Add this unit to your current group"
    >
      <FaPlus />
    </Button>
)}

  <Button
    variant="primary"
    className="btn-sm"
    onClick={() => this.props.openViewUnit( new AlphaStrikeUnit(asUnit))}
    title="View this unit's Alpha Strike Card"
  >
    <FaEye />
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
                      {this.props.appGlobals.appSettings.alphaStrikeSearchTerm.length > 2 ? (
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
    </>
) : (
    <div className="alert alert-warning">
        We're sorry, searching the Master Unit List for units requires an Internet connection, please connect to the Internet.
    </div>
)}

                </TextSection>

{this.props.appGlobals.battleMechSaves && this.props.appGlobals.battleMechSaves.length > 0 ? (
    <TextSection
        label="Your Created BattleMechs"
    >
                  <table className="table">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Name</th>
                        {/* <th>Rules</th>
                        <th>Tech</th>
                        <th>Era</th>
                        <th>Type</th> */}
                        <th>Points</th>

                      </tr>
                      <tr>
                        <th>&nbsp;</th>
                        <th colSpan={3}>Notes</th>


                      </tr>
                    </thead>

        {this.props.appGlobals.battleMechSaves.map( (bm, unitIndex) => {
            let bmObj = new BattleMech();
            bmObj.import( bm );

            let asUnit = bmObj.calcAlphaStrike();

            return (
                <tbody key={unitIndex}>
                <tr>
                  <td className="text-left min-width no-wrap">


{this.props.appGlobals.currentASForce && this.props.appGlobals.currentASForce.getTotalGroups() > 1 ?
(
<div className="drop-down-menu-container">
<Button
variant="primary"
className="btn-sm"
onClick={() => this.toggleContextMenuSearch(unitIndex)}
title="Open the context menu for this unit"
>
<FaBars />
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
  <FaPlus />&nbsp;
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
<FaPlus />
</Button>
)}

<Button
variant="primary"
className="btn-sm"
onClick={() => this.props.openViewUnit(asUnit)}
title="View this unit's Alpha Strike Card"
>
<FaEye />
</Button>
</td>
                  <td title={"UUID: " + asUnit.mechCreatorUUID}>{asUnit.name}</td>

                  {/* <td>{asUnit.r}</td>
                  <td>{asUnit.Technology.Name}</td>
                  <td>{asUnit.EraStart}</td>
                  <td>{asUnit.BFType}</td> */}
                  <td>{asUnit.basePoints}</td>

                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td colSpan={3} className="med-small-text">

                    <strong title="Alpha Strike Damage Bands">Damage</strong>: {asUnit.damage.short}/{asUnit.damage.medium}/{asUnit.damage.long}
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
        }) }
            </table>
    </TextSection>
) : null}
    </div>
  </div>
            </>
        )
    }
}


interface IAlphaStrikeAddUnitsViewProps {
    appGlobals: IAppGlobals;
    openEditUnit( showASUnit: AlphaStrikeUnit ): void;
    openViewUnit( theUnit: AlphaStrikeUnit ): void;
}

interface IAlphaStrikeAddUnitsViewState {
    searchResults: IASMULUnit[];
    contextMenuSearch: number;
}