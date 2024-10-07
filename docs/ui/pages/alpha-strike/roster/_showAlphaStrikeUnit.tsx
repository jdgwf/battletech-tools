import * as React from 'react';
import { AlphaStrikeUnit } from '../../../../classes/alpha-strike-unit';
import { CONST_AS_PILOT_ABILITIES } from '../../../../data/alpha-strike-pilot-abilities';
import { IAppGlobals } from '../../../app-router';
import InputField from '../../../components/form_elements/input_field';
import StandardModal from '../../../components/standard-modal';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';

export default class AlphaStrikeUnitEditViewModal extends React.Component<IAlphaStrikeUnitEditViewModalProps, IAlphaStrikeUnitEditViewModalState> {

    constructor(props: IAlphaStrikeUnitEditViewModalProps) {
        super(props);

        this.state = {
            updated: false,
        };
    }

    updateUnitSkill = (event: React.FormEvent<HTMLSelectElement>): void => {
      if(this.props.showASUnit) {
        this.props.showASUnit.setSkill( +event.currentTarget.value );
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    updateUnitPilotAbility = (event: React.FormEvent<HTMLSelectElement>): void => {
      if(this.props.showASUnit) {
        this.props.showASUnit.currentPilotAbilityID = +event.currentTarget.value;
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    updateUnitPilotAbility2 = (event: React.FormEvent<HTMLSelectElement>): void => {
      if(this.props.showASUnit) {
        this.props.showASUnit.currentPilotAbilityID2 = +event.currentTarget.value;
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    updateUnitPilotAbility3 = (event: React.FormEvent<HTMLSelectElement>): void => {
      if(this.props.showASUnit) {
        this.props.showASUnit.currentPilotAbilityID3 = +event.currentTarget.value;
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    renameUnit = (event: React.FormEvent<HTMLInputElement>): void => {
      if(this.props.showASUnit) {
        let asUnit = this.props.showASUnit;
        asUnit.customName = event.currentTarget.value;
        this.setState({
          updated: true,
        })
        this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
      }
    }

    render = (): JSX.Element => {
        return (
<StandardModal
    onClose={this.props.closeShowUnitDialog}
    show={this.props.showASUnit !== null}
    className="modal-xl"
    title={
      this.props.showASUnit ?
       (
         "Showing Unit: " + (this.props.showASUnit ? (this.props.showASUnit.name ) : ( "" ) )
       ) : (
         "Editing Unit:" + (this.props.showASUnit ? (this.props.showASUnit ) : ( "" ) )
      )

    }
>
<div className="text-center">
{this.props.editASUnit && this.props.showASUnit ? (
<>
                      <div className="row">
                        <div className="col-xs-6 col-lg-8 text-left" >

                          <InputField
                              label="Custom Unit Name"
                              type="text"
                              value={this.props.showASUnit.customName}
                              placeholder="Enter your custom mech's name here"
                              onChange={this.renameUnit}
                          />
                        </div>
                        <div className="col-xs-6 col-lg-4 text-left">
                          <label>
                            Skill Level:<br />
                            <select
                              value={this.props.showASUnit.currentSkill}
                              onChange={this.updateUnitSkill}
                            >
                              <option value={0}>0</option>
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
                      <div className="row">
                        <div className="col-xs-12 col-lg-12 text-left" >
                          {this.props.showASUnit.currentSkill <= 4 ?
                          (
                            <>
                            {/* Regular Skill Level */}
                        <label>
                            Pilot Card (Regulars):&nbsp;
                            <select
                              value={this.props.showASUnit.currentPilotAbilityID}
                              onChange={this.updateUnitPilotAbility}
                            >
                              <option value={0}>- None -</option>
                              {CONST_AS_PILOT_ABILITIES.map( (abi, abiIndex) => {
                                return (
                                  <option title={abi.summary.join("\n")} key={abiIndex} value={abi.id}>{abi.ability}  ({abi.cost})</option>
                                )
                              })}
                            </select>
                            {this.props.showASUnit.currentPilotAbility ? (
                              <div>{this.props.showASUnit.currentPilotAbility.summary}</div>
                            ): null}
                          </label>

{/* Veteran or Elite Skill Level */}
                          {this.props.showASUnit.currentSkill <= 3 ?
                          (
                            <>
                        <label>
                            Pilot Card #2 (Veterans and Elites):&nbsp;
                            <select
                              value={this.props.showASUnit.currentPilotAbilityID2}
                              onChange={this.updateUnitPilotAbility2}
                            >
                              <option value={0}>- None -</option>
                              {CONST_AS_PILOT_ABILITIES.map( (abi, abiIndex) => {
                                return (
                                  <option title={abi.summary.join("\n")} key={abiIndex} value={abi.id}>{abi.ability}  ({abi.cost})</option>
                                )
                              })}
                            </select>
                            {this.props.showASUnit.currentPilotAbility ? (
                              <div>{this.props.showASUnit.currentPilotAbility.summary}</div>
                            ): null}
                          </label>

                          {/* Heroic or Legendary Skill Level */}
                          {this.props.showASUnit.currentSkill <= 1 ?
                          (
                            <>
                            <label>
                                Pilot Card #3 (Heroes and Legends):&nbsp;
                                <select
                                  value={this.props.showASUnit.currentPilotAbilityID3}
                                  onChange={this.updateUnitPilotAbility3}
                                >
                                  <option value={0}>- None -</option>
                                  {CONST_AS_PILOT_ABILITIES.map( (abi, abiIndex) => {
                                    return (
                                      <option title={abi.summary.join("\n")} key={abiIndex} value={abi.id}>{abi.ability}  ({abi.cost})</option>
                                    )
                                  })}
                                </select>
                                {this.props.showASUnit.currentPilotAbility ? (
                                  <div>{this.props.showASUnit.currentPilotAbility.summary}</div>
                                ): null}
                              </label>


                                </>
                              ) : null}

                            </>
                          ) : null}
                            </>
                          ) : "Pilot Cards are not available for Green Units."}


                          <div className="text-right"><strong>Total Pilot Card Points: {this.props.showASUnit.getTotalPilotAbilityPoints()}</strong></div>
                          <br />
                        </div>
                      </div>
</>
                    ) : (
                      <></>
                    )}
                  <AlphaStrikeUnitSVG
                    height="auto"
                    width="100%"
                    appGlobals={this.props.appGlobals}
                    asUnit={this.props.showASUnit}
                    measurementsInHexes={this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes}
                    // inPlay={true}
                  />
</div>
</StandardModal>

        )
    }
}

interface IAlphaStrikeUnitEditViewModalProps {
    appGlobals: IAppGlobals;
    showASUnit: AlphaStrikeUnit | null;
    editASUnit: boolean;
    closeShowUnitDialog( e: React.FormEvent<HTMLButtonElement>): void;
}

interface IAlphaStrikeUnitEditViewModalState {
    updated: boolean;
}