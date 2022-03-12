import * as React from 'react';
import { IEquipmentItem } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputNumeric from './form_elements/input_numeric';
import TextAreaField from './form_elements/textarea_field';


export default class AlphaStrikeEquipmentEntry extends React.Component<IAlphaStrikeEquipmentEntryProps, IAlphaStrikeEquipmentEntryState> {
    showDialog: boolean = false;

    updateHeat = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.heat = +e.currentTarget.value;

        this.props.onChange( item );
    }
    updateTC = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.tc = e.currentTarget.checked;

        this.props.onChange( item );
    }

    updateShort = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.rangeShort = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateMedium = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.rangeMedium = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateLong = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.rangeLong = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateExtreme = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.rangeExtreme = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateNotes = (
        e: React.FormEvent<HTMLTextAreaElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.alphaStrike.notes = e.currentTarget.value.split("\n");

        this.props.onChange( item );
    }

    render = (): React.ReactFragment => {
        return (
                    <>

                        <InputNumeric
                            value={this.props.editingItem.alphaStrike.heat}
                            onChange={this.updateHeat}
                            min={0}
                            step={1}
                            label="Heat"
                        />
                        <InputCheckbox
                            checked={this.props.editingItem.alphaStrike.tc}
                            onChange={this.updateTC}
                            label="TC"
                        />
                        <hr />
                        <InputNumeric
                            value={this.props.editingItem.alphaStrike.rangeShort}
                            onChange={this.updateShort}
                            min={0}
                            step={1}
                            label="Damage Short"
                        />
                        <InputNumeric
                            value={this.props.editingItem.alphaStrike.rangeMedium}
                            onChange={this.updateMedium}
                            min={0}
                            step={1}
                            label="Damage Medium"
                        />
                        <InputNumeric
                            value={this.props.editingItem.alphaStrike.rangeLong}
                            onChange={this.updateLong}
                            min={0}
                            step={1}
                            label="Damage Long"
                        />
                        <InputNumeric
                            value={this.props.editingItem.alphaStrike.rangeExtreme}
                            onChange={this.updateExtreme}
                            min={0}
                            step={1}
                            label="Damage Extreme"
                        />

                        <TextAreaField
                            label="Notes"
                            description='One item per line'
                            value={this.props.editingItem.alphaStrike.notes.join("\n")}
                            onChange={this.updateNotes}
                        />
                    </>

        )

    }
}

interface IAlphaStrikeEquipmentEntryProps{
    editingItem: IEquipmentItem;
    onChange( nv: IEquipmentItem): void
}

interface IAlphaStrikeEquipmentEntryState{

}