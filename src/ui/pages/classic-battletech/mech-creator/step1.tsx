import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { btEraOptions } from '../../../../data/era-options';
import { mechInternalStructureTypes } from '../../../../data/mech-internal-structure-types';
import { btMechTonnages } from '../../../../data/mech-tonnages';
import { mechTypeOptions } from '../../../../data/mech-type-options';
import { btTechOptions } from '../../../../data/tech-options';
import { IAppGlobals } from '../../../app-router';
import MechCreatorSideMenu from '../../../components/mech-creator-side-menu';
import MechCreatorStatusbar from '../../../components/mech-creator-status-bar';
import SanitizedHTML from '../../../components/sanitized-html';
import TextSection from '../../../components/text-section';
import UIPage from '../../../components/ui-page';
import './home.scss';
import InputCheckbox from "../../../components/form_elements/input_checkbox";
import InputField from "../../../components/form_elements/input_field";

export default class MechCreatorStep1 extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Step 1 | 'Mech Creator");
    }

    updateHideNonAvailableEquipment = ( e: React.FormEvent<HTMLInputElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.hideNonAvailableEquipment = e.currentTarget.checked;
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateMake = ( e: React.FormEvent<HTMLInputElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setModel( e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateName = ( e: React.FormEvent<HTMLInputElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setName( e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    toggleOmni = ( e: React.FormEvent<HTMLInputElement>): void => {
      if( e && e.preventDefault ) e.preventDefault();

      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.toggleOmni();
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateTech = ( e: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setTech( e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateType = ( e: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setType( e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateTonnage = ( e: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setTonnage( +e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateStructureType = ( e: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setInternalStructureType( e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    updateEra = ( e: React.FormEvent<HTMLSelectElement>): void => {
      if( this.props.appGlobals.currentBattleMech ) {
        let currentMech = this.props.appGlobals.currentBattleMech;
        currentMech.setEra( e.currentTarget.value);
        this.props.appGlobals.saveCurrentBattleMech( currentMech );
      }
    }

    render = (): React.Element => {
      if(!this.props.appGlobals.currentBattleMech)
        return <></>
      return (
        <>
          <MechCreatorStatusbar  appGlobals={this.props.appGlobals}  />
          <UIPage current="classic-battletech-mech-creator" appGlobals={this.props.appGlobals}>

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


                          <InputField
                            label="Mech Model # (e.g. WSP-1A, Timber Wolf)"
                            value={this.props.appGlobals.currentBattleMech.model}
                            onChange={this.updateMake}
                          />

                           <InputField
                            label="Mech Model Name, or Omni Variant (e.g. Wasp, Prime, C )"
                            value={this.props.appGlobals.currentBattleMech.name}
                            onChange={this.updateName}
                          />

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

                          <InputCheckbox
                            label="Is an Omnimech"
                            checked={this.props.appGlobals.currentBattleMech.isOmnimech}
                            onChange={this.toggleOmni}
                          />

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

                            <InputCheckbox
                              checked={this.props.appGlobals.currentBattleMech.hideNonAvailableEquipment}
                              onChange={this.updateHideNonAvailableEquipment}
                              label="Hide non-available weapons and equipment (will be gray otherwise)"
                            />

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
                            <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/step2`} className="btn btn-primary pull-right btn-sm">Next Step <FaArrowCircleRight /></Link>
                            <div className="inline-block text-left">
                              <Link to={`${process.env.PUBLIC_URL}/classic-battletech/mech-creator/`} className="btn btn-primary btn-sm"><FaArrowCircleLeft /> Previous Step</Link>
                            </div>
                          </div>
                        </TextSection>

                    </div>
                    <div className="d-none d-lg-block col-lg-4">
                    <TextSection

                    >
                      <div className="mech-tro">
                        <SanitizedHTML raw={true} html={this.props.appGlobals.currentBattleMech.makeTROHTML()} />
                      </div>
                    </TextSection>
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