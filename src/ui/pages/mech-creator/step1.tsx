import React from 'react';
import './home.scss';
import {IAppGlobals} from '../../app-router';
import SanitizedHTML from '../../components/sanitized-html';
import MechCreatorSideMenu from '../../components/mech-creator-side-menu';
import { btTechOptions } from '../../../data/tech-options';
import { mechTypeOptions } from '../../../data/mech-type-options';
import { btEraOptions } from '../../../data/era-options';
import { mechInternalStructureTypes } from '../../../data/mech-internal-structure-types';
import { btMechTonnages } from '../../../data/mech-tonnages';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import MechCreatorStatusbar from '../../components/mech-creator-status-bar';
import UIPage from '../../components/ui-page';
import TextSection from '../../components/text-section';

export default class MechCreatorStep1 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }


        this.props.appGlobals.makeDocumentTitle("Step 1 | 'Mech Creator");
    }



    updateHideNonAvailableEquipment = ( event: React.FormEvent<HTMLInputElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.hideNonAvailableEquipment = event.currentTarget.checked;
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateMake = ( event: React.FormEvent<HTMLInputElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setMake( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateTech = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setTech( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateType = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateTonnage = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setTonnage( +event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }

    updateStructureType = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setInternalStructureType( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }


    updateEra = ( event: React.FormEvent<HTMLSelectElement>): void => {
      let currentMech = this.props.appGlobals.currentBattleMech;
      currentMech.setEra( event.currentTarget.value);
      this.props.appGlobals.saveCurrentBattleMech( currentMech );
    }



    render() {
      return (
        <>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="mech-creator" appGlobals={this.props.appGlobals}>

            <div className="row">
              <div className="d-none d-md-block col-md-3 col-lg-2">
                <MechCreatorSideMenu
                  appGlobals={this.props.appGlobals}
                  current="step1"
                />
              </div>
              <div className="col-md-9 col-lg-10">
                  <div className="row">
                    <div className="col-md-12 col-lg-8">
                      <TextSection
                        label="Step 1: Design the Chassis"
                      >


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

                          <div className="clear-both overflow-hidden">
                          <hr />
                            <Link to={`${process.env.PUBLIC_URL}/mech-creator/step2`} className="btn btn-primary pull-right btn-sm">Next Step <FontAwesomeIcon icon={faArrowCircleRight} /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/mech-creator/`} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faArrowCircleLeft} /> Previous Step</Link>
                            </div>
                          </div>
                        </TextSection>

                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                      <div className="mech-tro">
                        <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                      </div>
                    </div>
                  </div>
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

}