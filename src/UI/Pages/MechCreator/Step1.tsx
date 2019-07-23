import React from 'react';
import './Home.scss';
import TopMenu from '../../Components/TopMenu';
import ShowAlerts from '../../Components/ShowAlerts';
import {IAppGlobals} from '../../AppRouter';
import SanitizedHTML from '../../Components/SanitizedHTML';
import MechCreatorSideMenu from '../../Components/MechCreatorSideMenu';
import { btTechOptions } from '../../../Data/tech-options';
import { mechTypeOptions } from '../../../Data/mech-type-options';
import { btEraOptions } from '../../../Data/era-options';
import { mechInternalStructureTypes } from '../../../Data/mech-internal-structure-types';
import { btMechTonnages } from '../../../Data/mech-tonnages';

export default class MechCreatorStep1 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.updateMake = this.updateMake.bind(this);
        this.updateTech = this.updateTech.bind(this);
        this.updateType = this.updateType.bind(this);
        this.updateEra = this.updateEra.bind(this);

        this.updateStructureType = this.updateStructureType.bind(this);
        this.updateTonnage = this.updateTonnage.bind(this);
        this.updateHideNonAvailableEquipment = this.updateHideNonAvailableEquipment.bind(this);
    }

    updateHideNonAvailableEquipment( event: React.FormEvent<HTMLInputElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.hideNonAvailableEquipment = event.currentTarget.checked;
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateMake( event: React.FormEvent<HTMLInputElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setMake( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateTech( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setTech( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateType( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateTonnage( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setTonnage( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateStructureType( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setInternalStructureType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }


    updateEra( event: React.FormEvent<HTMLSelectElement>) {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setEra( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }


    componentDidMount ()  {
      this.props.appGlobals.makeDocumentTitle("'Mech Creator");
    }

    render() {
      return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="mech-creator" sub="home" appGlobals={this.props.appGlobals}  />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            <div className="row">
              <div className="col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="step1"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <div className="text-section">
                        <h2>Step 1: Design the Chassis</h2>
                        <div className="section-content">
                          <label>
                            Mech Model Name (Type):
                            <input
                              type="text"
                              value={this.props.appGlobals.currentBattleMech.make}
                              onChange={this.updateMake}
                            />
                          </label>

                          <label>
                            Technology Base:
                            <select
                              value={this.props.appGlobals.currentBattleMech.getTech().tag}
                              onChange={this.updateTech}
                            >
                            {btTechOptions.map( (option) => {
                              return (
                                <option key={option.tag} value={option.tag}>{option.name}</option>
                              )
                            })}
                            </select>
                          </label>

                          <label>
                            Mech Type:
                            <select
                              value={this.props.appGlobals.currentBattleMech.getType().tag}
                              onChange={this.updateType}
                            >
                            {mechTypeOptions.map( (option) => {
                              return (
                                <option key={option.tag} value={option.tag}>{option.name}</option>
                              )
                            })}
                            </select>
                          </label>

                          <label>
                            Mech Era:
                            <select
                              value={this.props.appGlobals.currentBattleMech.getEra().tag}
                              onChange={this.updateEra}
                            >
                            {btEraOptions.map( (option) => {
                              return (
                                <option key={option.tag} value={option.tag}>{option.name}</option>
                              )
                            })}
                            </select>
                          </label>

                          <label>
                            <input
                              type="checkbox"
                              checked={this.props.appGlobals.currentBattleMech.hideNonAvailableEquipment}
                              onChange={this.updateHideNonAvailableEquipment}
                            />&nbsp;
                             Hide non-available weapons and equipment (will be gray otherwise)
                          </label>

                          <label>
                            Mech Tonnage:
                            <select
                              value={this.props.appGlobals.currentBattleMech.getTonnage()}
                              onChange={this.updateTonnage}
                            >
                            {btMechTonnages.map( (option) => {
                              return (
                                <option key={option.tons} value={option.tons}>{option.tons} ({option.type})</option>
                              )
                            })}
                            </select>
                          </label>

                          <label>
                            Internal Structure Type:
                            <select
                              value={this.props.appGlobals.currentBattleMech.getInternalStructureType()}
                              onChange={this.updateStructureType}
                            >
                            {mechInternalStructureTypes.map( (option) => {
                              return (
                                <option key={option.tag} value={option.tag}>{option.name}</option>
                              )
                            })}
                            </select>
                          </label>
                        </div>
                      </div>

                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                      <div className="mech-tro">
                        <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                      </div>
                    </div>
                  </div>
              </div>

            </div>

          </div>
        </div>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;
}

interface IHomeState {
    updated: boolean;

}