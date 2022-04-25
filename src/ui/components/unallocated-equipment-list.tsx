import React from 'react';
import { ICriticalSlot } from '../../classes/battlemech';
import { IAppGlobals } from '../app-router';
import './critical-assignment-container.scss';
import './unallocated-equipment-list.scss';

export default class UnallocatedEquipmentList extends React.Component<IUnallocatedEquipmentListProps, IUnallocatedEquipmentListState> {

    render = (): React.ReactFragment => {
        return (
            <ul className="critical-assignment-container">
            {this.props.crits.map( (crit, critIndex) => {
                if( crit ) {
                    let selectedClass = "";
                    if( this.props.currentSelectedLocation === "un" && this.props.currentSelectedIndex === critIndex ) {
                        selectedClass = " selected-item";
                    }
                    return (

                    <li
                        key={critIndex}
                        className={"cursor-pointer critical-height-" + crit.crits + selectedClass}
                        onClick={() => this.props.selectItemClick(
                            critIndex,
                            "un",
                            crit,
                            crit.crits,
                            crit.name,
                        )}
                        title={crit.uuid}
                    >
                        <div className="pull-right">({crit.crits})</div>
                        <div className="text-left card-title">{crit.name}</div>
                        {/* {this.props.currentSelectedIndex}, {critIndex} */}
                    </li>

                    )
                } else {
                    return <></>
                }
            })}
            </ul>
        )
    }
}

interface IUnallocatedEquipmentListProps {
    crits: (ICriticalSlot | null)[];
    appGlobals: IAppGlobals;
    currentSelectedIndex: number;
    currentSelectedLocation: string;

    selectItemClick(
        selectedIndex: number,
        selectedLocation: string,
        selectedItem: ICriticalSlot | null,
        selectedItemSize: number,
        selectedItemName: string,
    ): void;
}

interface IUnallocatedEquipmentListState {
}