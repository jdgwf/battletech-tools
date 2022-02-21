import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { IEquipmentItem } from '../../data/data-interfaces';
import InputCheckbox from './form_elements/input_checkbox';
import InputField from './form_elements/input_field';


export default class EquipmentEditForm extends React.Component<IEquipmentEditFormProps, IEquipmentEditFormState> {

    constructor(props: IEquipmentEditFormProps) {
        super(props);
        this.state = {
            updated: false,
        };
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
        <div className="col">
          <div className="text-section">
                <h2>Name, Sort, and Tag</h2>
                <div className="section-content">

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
                /><br />
            </div>
            </div>

        </div>
        <div className="col">

        </div>
        <div className="col">

        </div>
    </div>





</div>
        )
    }
}

interface IEquipmentEditFormProps {
    editingItem: IEquipmentItem;
    onChange( nv: IEquipmentItem): void
}


interface IEquipmentEditFormState {
    updated: boolean;
}