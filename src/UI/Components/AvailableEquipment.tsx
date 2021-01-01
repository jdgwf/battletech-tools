
import React from 'react';
import { IEquipmentItem } from '../../Data/dataInterfaces';
import { Button } from 'react-bootstrap';

export default class AvailableEquipment extends React.Component<IAvailableEquipmentProps, IAvailableEquipmentState> {
    currentCategory: string = "";


    constructor(props: IAvailableEquipmentProps) {
        super(props);
        this.state = {
            updated: false,
        }

        let lsCurrentCategory = localStorage.getItem("installEquipCat");
        if( lsCurrentCategory ) {
            this.currentCategory = lsCurrentCategory;
        }

    }

    clickSelectCategory = ( newValue: string ): void => {
        this.currentCategory = newValue;
        localStorage.setItem("installEquipCat", newValue);
        this.setState({
            updated: true,
        })
    }

    render() {

        let groupedItems : { [categoryName: string] : IEquipmentItem[]; }= {};
        for( let item of this.props.equipment ) {
            if( !this.props.hideUnavailable || item.available ) {
                if( !groupedItems[item.category ] ) {
                    groupedItems[item.category ] = []
                }
                if( this.currentCategory === "" ) {
                    this.currentCategory = item.category;
                }
                groupedItems[item.category ].push( item );
            }
        }

        return (
<div>
    <h2>Avail Equip</h2>
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
        <tbody>
            {Object.keys(groupedItems).map((catName, catIndex) => {
                return (
                    <React.Fragment key={catIndex}>
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
                    {this.currentCategory === catName ? (
                        <>
                        {groupedItems[catName].map( (item, itemIndex) => {
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
                                                disabled={!item.available}
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

                    </React.Fragment>
                )
            })}
        </tbody>
    </table>
</div>
        );
    }
}

interface IAvailableEquipmentProps {
    equipment: IEquipmentItem[];
    addFunction( item: IEquipmentItem ): boolean;
    hideUnavailable?: boolean;
}

interface IAvailableEquipmentState {
    updated: boolean;
}