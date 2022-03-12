import * as React from 'react';
import { IEquipmentItem } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputNumeric from './form_elements/input_numeric';

export default class DamageInput extends React.Component<IDamageInputProps, IDamageInputState> {
    showDialog: boolean = false;

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

    toggleDamageIsInClusters = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;


        if(
            ( !this.props.editingItem.damageClusters || this.props.editingItem.damageClusters === 0 )
            &&
            ( !this.props.editingItem.damagePerCluster || this.props.editingItem.damagePerCluster === 0 )
        ) {
            item.damage = 0;
            this.props.editingItem.damageClusters = 1;
            this.props.editingItem.damagePerCluster = 1;
        } else {
            this.props.editingItem.damageClusters = 0;
            this.props.editingItem.damagePerCluster = 0;
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

    updateDamageDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.damageDivisor = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateDamageAerospace = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.damageAero = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateDamagePerCluster = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.damagePerCluster = +e.currentTarget.value;

        this.props.onChange( item );
    }


    updateDamageClusters = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.damageClusters = +e.currentTarget.value;

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

    render = (): React.ReactFragment => {
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
                                onChange={this.updateDamageDivisor}
                                value={this.props.editingItem.damageDivisor ? this.props.editingItem.damageDivisor : 0}
                                label="Weight Divisor"
                                description='Divide the weight of the installed vehicle by this number to get the damage of this weapon.'

                            />
                        ) : null}

                        {!this.props.editingItem.damageDivisor
                         && typeof(this.props.editingItem.damage) !== "number"
                         && typeof(this.props.editingItem.damage) !== "undefined"  ? (
                            <InputCheckbox
                                label="Damage Changes per range"
                                onChange={this.toggleDamagePerRange}
                                checked={!this.props.editingItem.damageDivisor && typeof(this.props.editingItem.damage) !== "number" && typeof(this.props.editingItem.damage) !== "undefined" ? true : false }
                            />
                        ) : null }

                        {!this.props.editingItem.damageDivisor ? (
                            <InputCheckbox
                                label="Damage is in Clusters"
                                description='For most missles and LB-X weapons'
                                onChange={this.toggleDamageIsInClusters}
                                checked={this.props.editingItem.damageClusters && this.props.editingItem.damageClusters > 0 && this.props.editingItem.damagePerCluster && this.props.editingItem.damagePerCluster > 0 ? true : false }
                            />
                        ) : null }

                        {this.props.editingItem.damagePerCluster && this.props.editingItem.damagePerCluster > 0
                        && this.props.editingItem.damageClusters && this.props.editingItem.damageClusters  > 0 ? (
                            <>
                            <InputNumeric
                                value={this.props.editingItem.damageClusters}
                                onChange={this.updateDamageClusters}
                                min={1}
                                step={1}
                                label="Damage Cluster"
                                description='This is the 20 in the LRM 20'
                            />
                            <InputNumeric
                                value={this.props.editingItem.damagePerCluster}
                                onChange={this.updateDamagePerCluster}
                                min={1}
                                step={1}
                                label="Damage Per Cluster"
                                description='Usually 1 or 2 points of damage'
                            />
                            </>
                        ) : (
                            <>

{!this.props.editingItem.damageDivisor && typeof(this.props.editingItem.damage) === "number" ? (
                            <>
                            <InputNumeric
                                value={this.props.editingItem.damage}
                                onChange={this.updateDamage}
                                min={0}
                                step={1}
                                label="Damage Value"
                            />
                            <InputNumeric
                                value={this.props.editingItem.damageAero}
                                onChange={this.updateDamageAerospace}
                                min={0}
                                step={1}
                                label="Aerospace Damage Value"
                            />
                            </>
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