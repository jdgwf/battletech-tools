import * as React from 'react';
import { ICriticalSpace, IEquipmentItem } from '../../data/data-interfaces';
import AlphaStrikeEquipmentEntry from './alpha-strike-equipment-entry';
import CriticalEntry from './critical-entry';
import DamageInput from './damage-input';
import InputCheckbox from './form_elements/input_checkbox';
import InputField from './form_elements/input_field';
import InputNumeric from './form_elements/input_numeric';
import RangeInput from './range-input';
import TextSection from './text-section';


export default class EquipmentEditForm extends React.Component<IEquipmentEditFormProps, IEquipmentEditFormState> {

    constructor(props: IEquipmentEditFormProps) {
        super(props);
        this.state = {
            updated: false,
        };
    }

    updateCbills = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.cbills = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateBattleValue = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.battleValue = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateBattleValueOneShot = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.battleValueOneShot = +e.currentTarget.value;

        this.props.onChange( item );
    }

    // updateAmmoBattleValue = (
    //     e: React.FormEvent<HTMLInputElement>,
    // ) => {
    //     if( e && e.preventDefault ) {
    //         e.preventDefault();
    //     }
    //     let item = this.props.editingItem;
    //     item.ammoBattleValue = +e.currentTarget.value;

    //     this.props.onChange( item );
    // }

    updateBattleValuePerItemDamage = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.battleValuePerItemDamage = +e.currentTarget.value;

        this.props.onChange( item );
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

    updateCriticals = ( nv: ICriticalSpace ) => {
        let item = this.props.editingItem;
        item.space = nv;
        this.props.onChange( item );
    }

    updateWeight = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.weight = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateAmmoPerTon = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.ammoPerTon = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateMinAmmoTons = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.minAmmoTons = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateWeightDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.weightDivisor = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateCriticalstDivisor = (
        nv: number,
    ) => {

        let item = this.props.editingItem;
        item.criticalsDivisor = nv;

        this.props.onChange( item );
    }

    toggleIsEquipment = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.isAmmo = false;
        if( item.isEquipment  ) {
            item.isEquipment = false;
        } else {
            item.isEquipment = true;
        }

        this.props.onChange( item );
    }

    toggleIsAmmo = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        item.isEquipment = false;
        if( item.isAmmo  ) {
            item.isAmmo = false;
        } else {
            item.isAmmo = true;
            item.heat = 0;
        }


        this.props.onChange( item );
    }

    toggleWeightDivisor = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;

        if( !item.weightDivisor || item.weightDivisor < 1 ) {
            item.weightDivisor = 1;
        } else {
            item.weightDivisor = 0;
        }

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

    updatePage = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.page = +e.currentTarget.value;

        this.props.onChange( item );
    }

    updateBook = (
        e: React.FormEvent<HTMLSelectElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.book = e.currentTarget.value;

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

    updateAlternativeName = (
        e: React.FormEvent<HTMLInputElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item = this.props.editingItem;
        item.alternameName = e.currentTarget.value;

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
                    onChange={this.updateAlternativeName}
                    value={this.props.editingItem.alternameName}
                    label="Alternative Name"
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

                <div className="row">
                    <div className="col">
                        <label>
                            Book:
                            <select
                                onChange={this.updateBook}
                                value={this.props.editingItem.book}
                            >
                                <option value="TM">Tech Manual</option>
                            </select>
                        </label>
                    </div>
                    <div className='col'>
                        <InputNumeric
                            step={1}
                            onChange={this.updatePage}
                            value={this.props.editingItem.page}
                            label="Page #"
                        />
                    </div>
                </div>


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
                <label>
                    Category:&nbsp;
                    {this.props.category}
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
            <TextSection
                label="Equipment Details"
            >
                <div className="row">
                    <div className="col">

                        <InputCheckbox
                            label="Weight is based on a divisor of installed vehicle's tonnage"
                            onChange={this.toggleWeightDivisor}
                            checked={this.props.editingItem.weightDivisor && this.props.editingItem.weightDivisor > 0 ? true : false }
                        />
                        {this.props.editingItem.weightDivisor && this.props.editingItem.weightDivisor > 0 ? (
                            <InputNumeric
                                step={1}
                                min={1}
                                onChange={this.updateWeightDivisor}
                                value={this.props.editingItem.weightDivisor ? this.props.editingItem.weightDivisor : 0}
                                label="Weight Divisor"
                                description='Divide the weight of the installed vehicle by this number to get the mass of the equipment.'

                            />
                        ) : (
                            <InputNumeric
                                step={1}
                                onChange={this.updateWeight}
                                value={this.props.editingItem.weight}
                                label="Weight (tons)"
                            />
                        )}

                        <CriticalEntry
                            label="Criticals"
                            onChange={this.updateCriticals}
                            onChangeWeightDivisor={this.updateCriticalstDivisor}
                            valueCritical={this.props.editingItem.space}
                            valueCriticalDivisor={this.props.editingItem.criticalsDivisor}
                        />
                    </div>
                    <div className="col">
                        <InputCheckbox
                            onChange={this.toggleIsEquipment}
                            checked={this.props.editingItem.isEquipment && this.props.editingItem.isEquipment ? true : false}
                            label="Is Equipment (not an attack or ammo)"
                        />
                        <InputCheckbox
                            onChange={this.toggleIsAmmo}
                            checked={this.props.editingItem.isAmmo && this.props.editingItem.isAmmo ? true : false}
                            label="Is Ammo (not an attack or equipment)"
                        />
                        {!this.props.editingItem.isAmmo && !this.props.editingItem.isEquipment ? (
                            <>
                            <DamageInput
                                label="Damage"
                                editingItem={this.props.editingItem}
                                onChange={this.props.onChange}
                            />
                            <RangeInput
                                label="Range"
                                editingItem={this.props.editingItem}
                                onChange={this.props.onChange}
                            />
                            </>
                        ) : null}

                        {this.props.editingItem.isAmmo && !this.props.editingItem.isEquipment ? (
                            <fieldset className="fieldset">
                                <legend>Ammo Options</legend>
                                <InputNumeric
                                    label="Ammo Per Ton"
                                    step={1}
                                    min={1}
                                    onChange={this.updateAmmoPerTon}
                                    value={this.props.editingItem.ammoPerTon}
                                />
                                <InputNumeric
                                    label="Minimum Tonnage"
                                    onChange={this.updateMinAmmoTons}
                                    step={.5}
                                    min={0}
                                    max={1}
                                    value={this.props.editingItem.minAmmoTons}
                                />
                            </fieldset>
                        ) : null}

                        {!this.props.editingItem.isAmmo && this.props.editingItem.isEquipment ? (
                            <fieldset className="fieldset">
                                <legend>Equipment Options</legend>
                                (TODO)
                            </fieldset>
                        ) : null}
                    </div>
                </div>
            </TextSection>
        </div>
    </div>

    <div className="row">
        <div className="col">
            <TextSection
                label="Battle Values and C-Bills"
            >
                <InputNumeric
                    step={1}
                    onChange={this.updateCbills}
                    value={this.props.editingItem.cbills}
                    label="C-Bills"
                />
                <InputNumeric
                    step={1}
                    onChange={this.updateBattleValue}
                    value={this.props.editingItem.battleValue}
                    label="Battle Value"
                />
                {/* <InputNumeric
                    step={1}
                    onChange={this.updateBattleValueOneShot}
                    value={this.props.editingItem.battleValueOneShot}
                    label="Battle Value One Shot"
                />
                <InputNumeric
                    step={1}
                    onChange={this.updateBattleValuePerItemDamage}
                    value={this.props.editingItem.battleValuePerItemDamage}
                    label="Battle Value Per Item Damage"
                />
                <InputNumeric
                    step={1}
                    onChange={this.updateAmmoBattleValue}
                    value={this.props.editingItem.ammoBattleValue}
                    label="Ammo Battle Value"
                /> */}
                <br />
            </TextSection>
        </div>
        <div className="col">
            <TextSection
                label="Alpha Strike Values"
            >
                <AlphaStrikeEquipmentEntry
                    editingItem={this.props.editingItem}
                    onChange={this.props.onChange}
                />
                <br />
            </TextSection>
        </div>
    </div>



</div>
        )
    }
}

interface IEquipmentEditFormProps {
    editingItem: IEquipmentItem;
    onChange( nv: IEquipmentItem): void
    techBase: string;
    category: string;

}


interface IEquipmentEditFormState {
    updated: boolean;
}