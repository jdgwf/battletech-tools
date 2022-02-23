import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { IEquipmentItem } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputField from './form_elements/input_field';
import InputNumeric from './form_elements/input_numeric';
import TextSection from './text-section';


export default class EquipmentEditForm extends React.Component<IEquipmentEditFormProps, IEquipmentEditFormState> {

    constructor(props: IEquipmentEditFormProps) {
        super(props);
        this.state = {
            updated: false,
        };
    }

    updateReintroduced = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.reintroduced = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateExtinct = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.extinct = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateIntroduced = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.introduced = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateName = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.name = e.currentTarget.value;

        this.props.onChange( item );
    }

    updateSort = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.sort = e.currentTarget.value;

        this.props.onChange( item );
    }

    updateTag = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.tag = e.currentTarget.value;

        this.props.onChange( item );
    }

    render = (): React.ReactFragment => {


        return (
<div className="form">
    <div className="row">
        <div className="col-md-6">
            <TextSection
                label="Name, Sort, and Tag"
            >

                <InputField
                    onChange={this.updateName}
                    value={this.props.editingItem.name}
                    label="Name"
                />
                <InputField
                    onChange={this.updateTag}
                    value={this.props.editingItem.tag}
                    label="Tag"
                />
                <InputField
                    onChange={this.updateSort}
                    value={this.props.editingItem.sort}
                    label="Sort"
                    description="Weapons with potential 2 digit Damage Ratings (such as AC10, LRM5) referred to internally as a-d instead of numerically to avoid sort and partial"
                />


                <br />
            </TextSection>

        </div>
        <div className="col-md-6">
            <TextSection
                label="Tech, Active Years"
            >

                <label>
                    Technology:&nbsp;
                    {this.props.techBase}
                    <div className="small-text">This is derived from the list you've chosen to edit or add to.</div>
                </label>
                <InputNumeric
                    step={1}
                    onChange={this.updateIntroduced}
                    value={this.props.editingItem.introduced}
                    label="Introduced"
                />

                <InputNumeric
                    step={1}
                    onChange={this.updateExtinct}
                    value={this.props.editingItem.extinct}
                    label="Extinct"
                />

                <InputNumeric
                    step={1}
                    onChange={this.updateReintroduced}
                    value={this.props.editingItem.reintroduced}
                    label="Reintroduced"
                />


            <br />
        </TextSection>
        </div>

    </div>

    <div className="row">
        <div className="col">

        </div>
    </div>




</div>
        )
    }
}

interface IEquipmentEditFormProps {
    editingItem: IEquipmentItem;
    techBase: string;
    onChange( nv: IEquipmentItem): void
}


interface IEquipmentEditFormState {
    updated: boolean;
}