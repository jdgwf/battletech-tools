import * as React from 'react';
import { IEquipmentItem } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputNumeric from './form_elements/input_numeric';

export default class RangeInput extends React.Component<IRangeInputProps, IRangeInputState> {
    showDialog: boolean = false;

    toggleIsMelee = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        if( !item.isMelee ) {
            item.isMelee = true;
        } else {
            item.isMelee = false;
        }

        this.props.onChange( item );
    }

    updateMinimum = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.range.min = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateShort = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.range.short = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateMedium = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.range.medium = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateLong = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.range.long = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateExtreme = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.range.extreme = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateAero = (
        e: React.FormEvent<HTMLSelectElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.rangeAero = e.currentTarget.value;

        this.props.onChange( item );
    }

    render = (): React.ReactFragment => {
        return (
            <fieldset className="fieldset">
                <legend>{this.props.label}</legend>

                <InputCheckbox
                    label="Melee Only"
                    onChange={this.toggleIsMelee}
                    checked={this.props.editingItem.isMelee ? true : false }
                />

                {!this.props.editingItem.isMelee ? (
                    <>
                        <InputNumeric
                            value={this.props.editingItem.range.min ? this.props.editingItem.range.min : 0}
                            onChange={this.updateMinimum}
                            label="Minimum"
                            min={0}
                            step={1}
                            description='Set to 0 for no minimum'
                        />
                        <InputNumeric
                            value={this.props.editingItem.range.short}
                            onChange={this.updateShort}
                            min={0}
                            step={1}
                            label="Short"
                        />
                        <InputNumeric
                            value={this.props.editingItem.range.medium}
                            onChange={this.updateMedium}
                            min={0}
                            step={1}
                            label="Medium"
                        />
                        <InputNumeric
                            value={this.props.editingItem.range.long}
                            onChange={this.updateLong}
                            min={0}
                            step={1}
                            label="Long"
                        />
                        <InputNumeric
                            value={this.props.editingItem.range.extreme ? this.props.editingItem.range.extreme : 0}
                            onChange={this.updateExtreme}
                            min={0}
                            step={1}
                            label="Extreme"
                        />

                        <label>
                            Aero Range:<br />
                            <select
                                onChange={this.updateAero}
                                value={this.props.editingItem.rangeAero ? this.props.editingItem.rangeAero : ""}
                            >
                                <option value={""}>- Select Aero Range -</option>
                                <option value={"s"}>Short</option>
                                <option value={"m"}>Medium</option>
                                <option value={"l"}>Long</option>
                                <option value={"e"}>Extreme</option>
                            </select>
                        </label>
                    </>
                ) : null}
            </fieldset>
        )

    }
}

interface IRangeInputProps{
    label: string;
    editingItem: IEquipmentItem;
    onChange( newValue: IEquipmentItem): void
}

interface IRangeInputState{

}