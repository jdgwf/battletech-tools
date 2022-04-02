import * as React from 'react';
import { ICriticalSpace } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputNumeric from './form_elements/input_numeric';

export default class CriticalEntry extends React.Component<ICriticalEntryProps, ICriticalEntryState> {
    showDialog: boolean = false;



    updateWeightDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let valueCriticalDivisor = this.props.valueCriticalDivisor;
        valueCriticalDivisor = +e.currentTarget.value;

        this.props.onChangeWeightDivisor( valueCriticalDivisor );
    }

    toggleWeightDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let valueCriticalDivisor = this.props.valueCriticalDivisor;

        if( !valueCriticalDivisor || valueCriticalDivisor < 1 ) {
            valueCriticalDivisor = 1;
        } else {
            valueCriticalDivisor = 0;
        }


        this.props.onChangeWeightDivisor( valueCriticalDivisor );
    }

    updateBattlemech = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.battlemech = +e.currentTarget.value;

        this.props.onChange( value );
    }

    updateProtomech = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.protomech = +e.currentTarget.value;

        this.props.onChange( value );
    }

    updateSupportVehicle = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.supportVehicle = +e.currentTarget.value;

        this.props.onChange( value );
    }

    updateCombatVehicle = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.combatVehicle = +e.currentTarget.value;

        this.props.onChange( value );
    }
    updateAerospaceFighter = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.aerospaceFighter = +e.currentTarget.value;

        this.props.onChange( value );
    }
    updateSmallCraft = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.smallCraft = +e.currentTarget.value;

        this.props.onChange( value );
    }
    updateDropShip = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let value = this.props.valueCritical;
        value.dropShip = +e.currentTarget.value;

        this.props.onChange( value );
    }
    // For the SanitizeHTML function/module docs go here:
    // https://www.npmjs.com/package/sanitize-html

    render = (): React.ReactFragment => {
        return (
            <fieldset className="fieldset">
                <legend>{this.props.label}</legend>

                <InputCheckbox
                    label="Critical amount is based on a divisor of installed vehicle's tonnage"
                    onChange={this.toggleWeightDivisor}
                    checked={this.props.valueCriticalDivisor && this.props.valueCriticalDivisor > -1 ? true : false }
                />
                {this.props.valueCriticalDivisor && this.props.valueCriticalDivisor ? (
                    <InputNumeric
                        step={1}
                        min={1}
                        onChange={this.updateWeightDivisor}
                        value={this.props.valueCriticalDivisor ? this.props.valueCriticalDivisor : 0}
                        label="Criticals Divisor"
                        description='Divide the criticals of the installed vehicle by this number to get the mass of the equipment.'

                    />
                ) : (
                    <>
                                    <div className="small-font">
                    If equipment is not available on a vehicle, place a -1 in the critical slots for that type.
                </div>
                    <InputNumeric
                        label="Battlemech"
                        onChange={this.updateBattlemech}
                        value={this.props.valueCritical.battlemech}
                    />
                    <InputNumeric
                        label="Protomech"
                        onChange={this.updateProtomech}
                        value={this.props.valueCritical.protomech}
                    />
                    <InputNumeric
                        label="Combat Vehicle"
                        onChange={this.updateCombatVehicle}
                        value={this.props.valueCritical.combatVehicle}
                    />
                    <InputNumeric
                        label="Support Vehicle"
                        onChange={this.updateSupportVehicle}
                        value={this.props.valueCritical.supportVehicle}
                    />
                    <InputNumeric
                        label="Aerospace Fighter"
                        onChange={this.updateAerospaceFighter}
                        value={this.props.valueCritical.aerospaceFighter}
                    />
                    <InputNumeric
                        label="Small Craft"
                        onChange={this.updateSmallCraft}
                        value={this.props.valueCritical.smallCraft}
                    />
                    <InputNumeric
                        label="Drop Ship"
                        onChange={this.updateDropShip}
                        value={this.props.valueCritical.dropShip}
                    />
                    </>
                )}
            </fieldset>
        )

    }
}

interface ICriticalEntryProps{
    label: string;
    valueCritical: ICriticalSpace;
    valueCriticalDivisor: number | undefined;
    onChange( newValue: ICriticalSpace): void;
    onChangeWeightDivisor( newValue: number): void;
}

interface ICriticalEntryState{

}