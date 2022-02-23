import * as React from 'react';
import { ICriticalSpace, IEquipmentItem } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputNumeric from './form_elements/input_numeric';
// import * as sanitizeHtml from 'sanitize-html';
var sanitizeHtml = require('sanitize-html');

export default class DamageInput extends React.Component<IDamageInputProps, IDamageInputState> {
    showDialog: boolean = false;
    constructor(props: IDamageInputProps) {
        super(props);
        this.state = {
        }
    }


    toggleDamageDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        if( !item.damageDivisor || item.damageDivisor < 1 ) {
            item.damageDivisor = 1;
        } else {
            item.damageDivisor = 0;
        }

        this.props.onChange( item );
    }

    toggleDamagePerRange = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        if( typeof(item.damage) === "number") {
            item.damage = {
                short: 0,
                medium: 0,
                long: 0,
                aeroShort: 0,
                aeroMedium: 0,
                aeroLong: 0,
            }
        } else {
            item.damage = 0;
        }


        this.props.onChange( item );
    }

    updatedamageDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.damageDivisor = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateDamage = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.damage = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateDamageShort = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        if( typeof(item.damage) != "undefined" && typeof(item.damage) != "number") {
            item.damage.short = +e.currentTarget.value;
        }

        this.props.onChange( item );
    }

    updateDamageMedium = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        if( typeof(item.damage) != "undefined" && typeof(item.damage) != "number") {
            item.damage.medium = +e.currentTarget.value;
        }

        this.props.onChange( item );
    }

    updateDamageLong = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        if( typeof(item.damage) != "undefined" && typeof(item.damage) != "number") {
            item.damage.long = +e.currentTarget.value;
        }

        this.props.onChange( item );
    }

    updateDamageAeroShort = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        if( typeof(item.damage) != "undefined" && typeof(item.damage) != "number") {
            item.damage.aeroShort = +e.currentTarget.value;
        }

        this.props.onChange( item );
    }

    updateDamageAeroMedium = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        if( typeof(item.damage) != "undefined" && typeof(item.damage) != "number") {
            item.damage.aeroMedium = +e.currentTarget.value;
        }

        this.props.onChange( item );
    }

    updateDamageAeroLong = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        if( typeof(item.damage) != "undefined" && typeof(item.damage) != "number") {
            item.damage.aeroLong = +e.currentTarget.value;
        }

        this.props.onChange( item );
    }

    render() {
        return (
            <fieldset className="fieldset">
                <legend>{this.props.label}</legend>

                        <InputCheckbox
                            label="Weight is based on a divisor of installed vehicle's tonnage"
                            onChange={this.toggleDamageDivisor}
                            checked={this.props.editingItem.damageDivisor && this.props.editingItem.damageDivisor > 0 ? true : false }
                        />

                        {this.props.editingItem.damageDivisor && this.props.editingItem.damageDivisor > 0 ? (
                            <InputNumeric
                                step={1}
                                min={1}
                                onChange={this.updatedamageDivisor}
                                value={this.props.editingItem.damageDivisor ? this.props.editingItem.damageDivisor : 0}
                                label="Weight Divisor"
                                description='Divide the weight of the installed vehicle by this number to get the damage of this weapon.'

                            />
                        ) : (
                            <InputCheckbox
                                label="Damage Changes per range"
                                onChange={this.toggleDamagePerRange}
                                checked={!this.props.editingItem.damageDivisor && typeof(this.props.editingItem.damage) !== "number" ? true : false }
                            />
                        )
                        }

                        {!this.props.editingItem.damageDivisor && typeof(this.props.editingItem.damage) === "number" ? (
                            <InputNumeric
                                value={this.props.editingItem.damage}
                                onChange={this.updateDamage}
                                min={0}
                                step={1}
                                label="Damage Value"
                            />
                        ) : (
                            <>
                                {!this.props.editingItem.damageDivisor && typeof(this.props.editingItem.damage) !== "number" && typeof(this.props.editingItem.damage) !== "undefined" ? (
                                    <fieldset className="fieldset">
                                        <legend>Damage at Different Ranges</legend>
                                        <InputNumeric
                                            value={this.props.editingItem.damage.short}
                                            onChange={this.updateDamageShort}
                                            min={0}
                                            step={1}
                                            label="Damage at Short"
                                        />
                                        <InputNumeric
                                            value={this.props.editingItem.damage.medium}
                                            onChange={this.updateDamageMedium}
                                            min={0}
                                            step={1}
                                            label="Damage at Medium"
                                        />
                                        <InputNumeric
                                            value={this.props.editingItem.damage.long}
                                            onChange={this.updateDamageLong}
                                            min={0}
                                            step={1}
                                            label="Damage at Long"
                                        />
                                        <h4>Aerospace Damages</h4>
                                        <InputNumeric
                                            value={this.props.editingItem.damage.aeroShort}
                                            onChange={this.updateDamageAeroShort}
                                            min={0}
                                            step={1}
                                            label="Damage at Short"
                                        />
                                        <InputNumeric
                                            value={this.props.editingItem.damage.aeroMedium}
                                            onChange={this.updateDamageAeroMedium}
                                            min={0}
                                            step={1}
                                            label="Damage at Medium"
                                        />
                                        <InputNumeric
                                            value={this.props.editingItem.damage.aeroLong}
                                            onChange={this.updateDamageAeroLong}
                                            min={0}
                                            step={1}
                                            label="Damage at Long"
                                        />
                                    </fieldset>
                                ) : null}
                            </>

                        )}
            </fieldset>
        )

    }
}

interface IDamageInputProps{
    label: string;
    editingItem: IEquipmentItem;
    onChange( nv: IEquipmentItem): void
}

interface IDamageInputState{

}