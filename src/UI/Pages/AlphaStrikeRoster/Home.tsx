import React from 'react';
import './Home.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';
import { getASSearchResults } from '../../../utils';
import { IASMULUnit, AlphaStrikeUnit } from '../../../Classes/AlphaStrikeUnit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
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
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.updateRules = this.updateRules.bind(this);
        this.updateTech = this.updateTech.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);

        this.addUnitToForce = this.addUnitToForce.bind(this);
        this.openViewUnit = this.openViewUnit.bind(this);
        this.closeShowUnitDialog = this.closeShowUnitDialog.bind(this);

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
      let data: IASMULUnit[] = await getASSearchResults(
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
      console.log("showASUnit", showASUnit);
      this.setState({
        showASUnit: showASUnit,
      })
    }

    addUnitToForce( theUnit: IASMULUnit ) {

    }

    closeShowUnitDialog() {
      this.setState({
        showASUnit: null,
      })
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
                    Viewing Unit: {this.state.showASUnit ? (this.state.showASUnit.name ) : ( "" ) }
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body id="book-select-contents">
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

            This will be the Alpha Strike Roster home page.

          <div className="row">
            <div className="col-md-6 col-lg-5">

            </div>
            <div className="col-md-6 col-lg-7">
            <div className="text-section">
              <h2>Search for Units</h2>
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
                          <td>
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
                              onClick={() => this.addUnitToForce(asUnit)}
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
}