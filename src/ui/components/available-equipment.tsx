
import React from 'react';
import { Button } from 'react-bootstrap';
import { IEquipmentItem } from '../../data/data-interfaces';
import { sortEquipment } from '../../utils';
import { IAppGlobals } from '../app-router';
import './available-equipment.scss';

export default class AvailableEquipment extends React.Component<IAvailableEquipmentProps, IAvailableEquipmentState> {


    constructor( props: IAvailableEquipmentProps ) {
        super(props);
        this.state = {
            updated: false,
            // equipmentFilter: this.props.appGlobals.appSettings.equipmentFilter,
        }
    }

    updateEquipmentFilter = (e: React.FormEvent<HTMLInputElement>):void => {

        let appSettings = this.props.appGlobals.appSettings;

        appSettings.equipmentFilter = e.currentTarget.value;
        this.props.appGlobals.saveAppSettings( appSettings );


    }

    clickSelectCategory = ( newValue: string ): void => {

        let appSettings = this.props.appGlobals.appSettings;

        appSettings.installEquipCategory =newValue;
        this.props.appGlobals.saveAppSettings( appSettings );

    }

    _equipmentFilter = ( item: IEquipmentItem ): boolean => {

        if(
            this.props.appGlobals.appSettings.equipmentFilter.trim() === ""
                ||
            item.name.toLowerCase().trim().indexOf(
                this.props.appGlobals.appSettings.equipmentFilter.toLowerCase().trim()
            ) > -1
                || (
                item.alternameName
                &&
                item.alternameName.toLowerCase().trim().indexOf(
                    this.props.appGlobals.appSettings.equipmentFilter.toLowerCase().trim()
                ) > -1
            )

        ) {
            return true;
        }

        return false;
    }

    render = (): React.ReactFragment => {

        let currentCategory = this.props.appGlobals.appSettings.installEquipCategory;

        let groupedItems : { [categoryName: string] : IEquipmentItem[]; }= {};
        for( let item of this.props.equipment ) {
            if( !this.props.hideUnavailable || item.available ) {
                if( !groupedItems[ item.category ] ) {
                    groupedItems[ item.category ] = []
                }
                if( currentCategory.trim() === "" ) {

                    currentCategory = item.category;
                }
                groupedItems[ item.category ].push( item );
            }
        }

        return (
<div>
    <h2>
        <input
            type="search"
            placeholder="Filter Equipment"
            value={this.props.appGlobals.appSettings.equipmentFilter}
            onChange={this.updateEquipmentFilter}
            className="filter-equiment-box"
        />
        Avail Equip

    </h2>
    <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Cat</th>
                <th>Criticals</th>
                <th>Weight</th>
                <th>&nbsp;</th>
            </tr>
        </thead>

            {Object.keys(groupedItems).map((catName, catIndex) => {

                // this.props.appGlobals.appSettings.equipmentFilter
                if(!catName)
                    return <React.Fragment key={catIndex}></React.Fragment>
                return (
                    <tbody key={catIndex}>
                <tr>
                    <th colSpan={5}>
                        <Button
                            className="full-width no-margin"
                            onClick={() => this.clickSelectCategory( catName)}
                        >
                            {catName}
                        </Button>
                    </th>
                </tr>
                    {this.props.appGlobals.appSettings.equipmentFilter.trim()
                    ||
                    currentCategory.trim().toLowerCase() === catName.trim().toLowerCase() ? (
                        <>
                        {groupedItems[catName].filter(this._equipmentFilter).sort( sortEquipment ).map( (item, itemIndex) => {
                            if( !this.props.hideUnavailable || item.available ) {
                                return (
                                    <tr
                                        key={itemIndex}
                                        className={!item.available ? "disabled" : ""}
                                    >
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.criticals}</td>
                                        <td>{item.weight}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                className="btn-md"
                                                onClick={() => this.props.addFunction( item )}
                                                // disabled={!item.available}
                                            >
                                                Add
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                return <></>
                            }
                        })}
                        </>
                    ) : (
                        <></>
                    )}

                    </tbody>
                )
            })}

    </table>
</div>
        );
    }
}

interface IAvailableEquipmentProps {
    appGlobals: IAppGlobals;
    equipment: IEquipmentItem[];
    addFunction( item: IEquipmentItem ): boolean;
    hideUnavailable?: boolean;
}

interface IAvailableEquipmentState {
    updated: boolean;
    // equipmentFilter: string;
}