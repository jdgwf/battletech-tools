import * as React from 'react';
import { AlphaStrikeUnit } from '../../../../classes/alpha-strike-unit';
import { IAppGlobals } from '../../../app-router';
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

    render = (): React.ReactFragment => {
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
                      <div className="row">
                        <div className="col-xs-6 col-lg-8 text-left" >
                          <label>
                            Custom Unit Name:<br />
                            <input
                              type="text"
                              value={this.props.showASUnit.customName}
                              placeholder="Enter your custom mech's name here"
                              onChange={this.renameUnit}
                            />
                          </label>
                        </div>
                        <div className="col-xs-6 col-lg-4 text-left">
                          <label>
                            Skill Level:<br />
                            <select
                              value={this.props.showASUnit.currentSkill}
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