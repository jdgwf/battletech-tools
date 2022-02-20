import React from 'react';
import { ICriticalSlot } from '../../classes/battlemech';
import { IAppGlobals } from '../app-router';
import './critical-allocation-section.scss';
import './critical-assignment-container.scss';

export default class CriticalAllocationSection extends React.Component<ICriticalAllocationSectionProps, ICriticalAllocationSectionState> {
    constructor(props: ICriticalAllocationSectionProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        let critItems: JSX.Element[] = [];
        for( let critIndex = 0; critIndex <  this.props.crits.length; critIndex++ ) {
            let crit: ICriticalSlot | null = null;
            if( this.props.crits[ critIndex]) {
                crit = this.props.crits[ critIndex];
            }
            let selectedClass = "";
            if( this.props.currentSelectedLocation === this.props.sectionAbbr && this.props.currentSelectedIndex === critIndex ) {
                selectedClass = " selected-item";
            }

            let clickableClass = "";
            if( this.props.currentSelectedIndex > -1 ) {
                clickableClass = " clickable-item";
            }
            if( crit ) {
                if( !crit.placeholder ) {
                    if( !crit.movable ) {
                        critItems.push(
                            <li
                                className={"custor-pointer critical-height-" + crit.crits + " unmovable"}
                                onClick={() => this.props.selectItemClick( critIndex, this.props.sectionAbbr, null)}
                            >
                                <div className="pull-right">({crit.crits})</div>
                                <div className="text-left card-title">{crit.name}</div>
                            </li>

                        )
                    } else {
                        critItems.push(
                            <li
                                className={"custor-pointer critical-height-" + crit.crits + selectedClass}
                                // for some reason the linter's not checking that I'm looking for a non-null object above... :/
                                // @ts-ignore
                                onClick={() => this.props.selectItemClick( critIndex, this.props.sectionAbbr, crit)}
                            >
                                <div className="pull-right">({crit.crits})</div>
                                <div className="text-left card-title">{crit.name}</div>
                            </li>

                        )
                    }


                } else {
                    critItems.push (
                        <li className={"critical-placeholder critical-height-"}>

                        </li>
                    )
                }
            } else {
                critItems.push (
                    <li
                        className={"critical-height-" + clickableClass}
                        onClick={() => this.props.selectItemClick( critIndex, this.props.sectionAbbr, null)}
                    >
                        &nbsp;
                    </li>
                )
            }
        }
        return (
            <ul className="critical-assignment-container">
            {critItems.map( ( critJSXItem, critIndex) => {
                return (
                    <React.Fragment key={critIndex}>
                        {critJSXItem}
                    </React.Fragment>
                )
            })}
            </ul>
        )
    }
}

interface ICriticalAllocationSectionProps {
    crits: (ICriticalSlot | null)[];
    sectionAbbr: string;
    appGlobals: IAppGlobals;
    currentSelectedIndex: number;
    currentSelectedLocation: string;
    selectItemClick(
        selectedIndex: number,
        selectedLocation: string,
        selectedItem: ICriticalSlot | null
    ): void;
}

interface ICriticalAllocationSectionState {
}