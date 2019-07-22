import React from 'react';
import './Home.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';
import { getMULASSearchResults } from '../../../utils';
import { IASMULUnit, AlphaStrikeUnit } from '../../../Classes/AlphaStrikeUnit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import AlphaStrikeUnitSVG from '../../Components/AlphaStrikeUnitSVG';

export default class AlphaStrikeRosterHome extends React.Component<IHomeProps, IHomeState> {
    searchTech: string = "";
    searchTerm: string = "";
    searchRules: string = "";
    constructor(props: IHomeProps) {
        super(props);

        let lsSearchTerm = "";
        let rawLSSearchTerm = localStorage.getItem("asSearchTerm");
        if( rawLSSearchTerm ) {
          lsSearchTerm = rawLSSearchTerm;
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

        this.state = {
            updated: false,
            foundItems: [],
            searchResults: lsSearchResults,
            showASUnit: null,
            searchText: lsSearchTerm,
            editASUnit: false,
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.updateRules = this.updateRules.bind(this);
        this.updateTech = this.updateTech.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);

        this.openViewUnit = this.openViewUnit.bind(this);
        this.openEditUnit = this.openEditUnit.bind(this);
        this.closeShowUnitDialog = this.closeShowUnitDialog.bind(this);

        this.updateUnitSkill = this.updateUnitSkill.bind(this);
        this.renameUnit = this.renameUnit.bind(this);

        this.addToGroup = this.addToGroup.bind(this);
        this.renameGroup = this.renameGroup.bind(this);
        this.removeUnitFromGroup = this.removeUnitFromGroup.bind(this);
        this.newGroup = this.newGroup.bind(this);

        this.updateSearchResults();
    }



    updateSearch( event: React.FormEvent<HTMLInputElement> ) {
        localStorage.setItem( "asSearchTerm", event.currentTarget.value);
        this.searchTerm = event.currentTarget.value;
        this.setState({
          searchText:  event.currentTarget.value
        })
        this.updateSearchResults();
    }

    updateRules( event: React.FormEvent<HTMLSelectElement> ) {
      localStorage.setItem( "asSearchRules", event.currentTarget.value);

      this.searchRules = event.currentTarget.value;

      this.updateSearchResults();
    }

    updateTech( event: React.FormEvent<HTMLSelectElement> ) {
      localStorage.setItem( "asSearchTech", event.currentTarget.value);
      this.searchTech = event.currentTarget.value;
      this.updateSearchResults();
    }

    async updateSearchResults() {
      let data: IASMULUnit[] = await getMULASSearchResults(
        this.searchTerm,
        this.searchRules,
        this.searchTech,
      );

      this.setState({
        searchResults: data,
      })

      localStorage.setItem( "asSearchResults", JSON.stringify(data));
      // console.log("data", data)
    }

    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("Home");
    }

    openViewUnit( theUnit: IASMULUnit ) {
      let showASUnit = new AlphaStrikeUnit( theUnit );

      this.setState({
        showASUnit: showASUnit,
        editASUnit: false,
      })
    }

    openEditUnit( showASUnit: AlphaStrikeUnit ) {

      this.setState({
        showASUnit: showASUnit,
        editASUnit: true,
      })
    }


    closeShowUnitDialog() {
      this.setState({
        showASUnit: null,
      })
    }

    renameGroup( newName: string, groupIndex: number ) {
      this.props.appGlobals.currentASForce.renameGroup( newName, groupIndex );
      this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
    }

    removeUnitFromGroup(asGroupIndex: number, asUnitIndex: number) {
      this.props.appGlobals.currentASForce.removeUnitFromGroup( asGroupIndex, asUnitIndex );
      this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
    }

    addToGroup( mulUnit: IASMULUnit,  groupIndex: number = 0  ) {
      this.props.appGlobals.currentASForce.addToGroup( mulUnit, groupIndex );
      this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
    }

    newGroup() {
      this.props.appGlobals.currentASForce.newGroup();
      this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
    }

    updateUnitSkill(event: React.FormEvent<HTMLSelectElement>) {
      if(this.state.showASUnit) {
        this.state.showASUnit.setSkill( +event.currentTarget.value );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    renameUnit(event: React.FormEvent<HTMLInputElement>) {
      if(this.state.showASUnit) {
        let asUnit = this.state.showASUnit;
        asUnit.customName = event.currentTarget.value;
        this.setState({
          showASUnit: asUnit,
        })
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    render() {
      return (
        <>

            <Modal
              onHide={this.closeShowUnitDialog}
              show={this.state.showASUnit !== null}
              className="modal-xl"
            >
              <Modal.Header closeButton>
                  <Modal.Title>
                    {this.state.editASUnit ? (
                      <>
                        Editing Unit: {this.state.showASUnit ? (this.state.showASUnit.name ) : ( "" ) }
                      </>
                    ) : (
                      <>Viewing Unit: {this.state.showASUnit ? (this.state.showASUnit.name ) : ( "" ) }</>
                    )}

                  </Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                    {this.state.editASUnit && this.state.showASUnit ? (
                      <div className="row">
                        <div className="col-md-6 col-lg-8 text-left" >
                          <label>
                            Custom Unit Name:<br />
                            <input
                              type="text"
                              value={this.state.showASUnit.customName}
                              placeholder="Enter your custom mech's name here"
                              onChange={this.renameUnit}
                            />
                          </label>
                        </div>
                        <div className="col-md-6 col-lg-4 text-left">
                          <label>
                            Skill Level:<br />
                            <select
                              value={this.state.showASUnit.currentSkill}
                              onChange={this.updateUnitSkill}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                            </select>
                          </label>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  <AlphaStrikeUnitSVG
                    height="auto"
                    width="100%"
                    asUnit={this.state.showASUnit}
                    // inPlay={true}
                  />
              </Modal.Body>
              {/* <Modal.Footer>

                  <Button variant="secondary" onClick={this.closeShowUnitDialog}>
                      Close
                  </Button>

              </Modal.Footer> */}
          </Modal>

        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="alpha-strike-roster" sub="home" appGlobals={this.props.appGlobals} />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />

          <div className="row">
            <div className="col-md-6 col-lg-5">
              <div className="text-section">
                <h2>Current Force</h2>
                <div className="section-content">
                {this.props.appGlobals.currentASForce.groups.map( (asGroup, asGroupIndex) => {
                  return (<fieldset key={asGroupIndex} className="fieldset">
                    <legend>Group #{asGroupIndex + 1}</legend>
                    <label>
                      <input
                        type="text"
                        onChange={(event: React.FormEvent<HTMLInputElement>) => this.renameGroup(event.currentTarget.value, asGroupIndex)}
                        value={asGroup.customName}
                      />
                    </label>

                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Points</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                      {asGroup.members.length > 0 ? (
                        <>
                        {asGroup.members.map( (asUnit, asUnitIndex) => {
                          return (
                            <tr key={asUnitIndex}>
                              <td>
                                {asUnit.customName ? (
                                  <><strong>{asUnit.customName}</strong><br /></>
                                ) : (
                                  <></>
                                )}
                                {asUnit.name}
                              </td>
                              <td>{asUnit.currentPoints}</td>
                              <td className="text-right no-wrap">
                                <Button
                                  variant="primary"
                                  className="btn-sm"
                                  onClick={() => this.openEditUnit(asUnit)}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>

                                <Button
                                  variant="primary"
                                  className="btn-sm no-right-margin"
                                  onClick={() => this.removeUnitFromGroup(asGroupIndex, asUnitIndex)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                        </>
                      ) : (
                        <tr><td colSpan={3} className="text-center">No Units</td></tr>
                      )}
                      </tbody>
                    </table>
                  </fieldset>
                  )
                })}
                <p>
                  <Button
                    variant="primary"
                    onClick={this.newGroup}
                    className="display-block text-center full-width no-margin"
                  >
                    New Group
                  </Button>
                </p>
                <p className="text-right">
                  <strong>Total Groups</strong>: {this.props.appGlobals.currentASForce.getTotalGroups()}<br />
                  <strong>Total Units</strong>: {this.props.appGlobals.currentASForce.getTotalUnits()}<br />
                  <strong>Total Points</strong>: {this.props.appGlobals.currentASForce.getTotalPoints()}<br />
                </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-7">
              <div className="text-section">
                <h2>Search for Units</h2>
                <div className="section-content">
                  <fieldset className="fieldset">
                    <div className="row">
                      <div className="col-md-4 text-center">
                      <label>
                      Search Name:<br />
                      <input
                        type="search"
                        onChange={this.updateSearch}
                        value={this.state.searchText}
                      />
                    </label>
                      </div>
                      <div className="col-md-4 text-center">
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
                      <div className="col-md-4 text-center">
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
                    </div>
                  </fieldset>

                <h3 className="text-center">Search Results</h3>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Name</th>
                        <th>Rules</th>
                        <th>Tech</th>
                        <th>Type</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.searchResults.length > 0 ? (
                      <>
                        {this.state.searchResults.map( (asUnit: IASMULUnit, unitIndex: number) => {
                          return (
                            <tr key={unitIndex}>
                              <td className="no-wrap">
                                <Button
                                  variant="primary"
                                  className="btn-sm"
                                  onClick={() => this.openViewUnit(asUnit)}
                                >
                                  <FontAwesomeIcon icon={faSearch} />
                                </Button>

                                <Button
                                  variant="primary"
                                  className="btn-sm no-right-margin"
                                  onClick={() => this.addToGroup(asUnit, 0)}
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </Button>
                              </td>
                              <td>{asUnit.Name}</td>
                              <td>{asUnit.Rules}</td>
                              <td>{asUnit.Technology.Name}</td>
                              <td>{asUnit.BFType}</td>
                              <td>{asUnit.BFPointValue}</td>
                            </tr>
                          )
                        })}
                      </>
                    ) : (
                      <>
                      {this.searchRules.length > 2 ? (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Please type a search term 3 or more characters.
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td className="text-center" colSpan={6}>
                            Sorry, there are no matches with those parameters
                          </td>
                        </tr>
                      )}
                      </>
                    )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
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
}