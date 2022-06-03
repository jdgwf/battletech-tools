import React from 'react';
import { BattleMech, ICriticalSlot } from '../../classes/battlemech';
import { IAppGlobals } from '../app-router';
import './critical-allocation-section.scss';
import './critical-assignment-container.scss';

export default class CriticalAllocationSection extends React.Component<ICriticalAllocationSectionProps, ICriticalAllocationSectionState> {

    constructor(props: ICriticalAllocationSectionProps) {
        super( props )

        this.state = {
            hoveredIndex: -1,
        }
    }
    _updateIndex = (
        e: React.FormEvent<HTMLLIElement | HTMLUListElement>,
        critIndex: number
    ) => {
        if( e && e.preventDefault ) e.preventDefault();
        this.setState({
            hoveredIndex: critIndex,
        })
    }

    render = (): React.Element => {
        let critItems: JSX.Element[] = [];
        for( let critIndex = 0; critIndex <  this.props.crits.length; critIndex++ ) {
            let crit: ICriticalSlot | null = null;
            if( this.props.crits[ critIndex]) {
                crit = this.props.crits[ critIndex];
            }
            let selectedClass = "";
            if(
                this.props.currentSelectedLocation === this.props.sectionAbbr
                && this.props.currentSelectedIndex === critIndex
            ) {
                selectedClass = " selected-item";
            }

            let critIndexAdjust = -1;
            let clickableClass = "";
            let allocatingLabel = "";
            // if(
            //     this.props.currentSelectedIndex > -1
            // ) {
            //     clickableClass = " clickable-item";

            // }

            // let  = "";
            if(
                this.state.hoveredIndex > -1
                // && this.state.hoveredIndex <= critIndex + this.props.currentSelectedItemSize
                && this.state.hoveredIndex <= critIndex
                && this.state.hoveredIndex + this.props.currentSelectedItemSize - 1 >= critIndex
                // && critIndex < this.state.hoveredIndex + this.props.currentSelectedItemSize
                // &&
                // critIndex >= this.props.currentSelectedIndex
                && this.props.currentSelectedItemName
            ) {
                critIndexAdjust = critIndex - this.props.currentSelectedItemSize + 1;
                if( critIndexAdjust < this.state.hoveredIndex ) {
                    critIndexAdjust = this.state.hoveredIndex;
                }
                // if( critIndexAdjust < critIndex ) {
                //     critIndexAdjust = critIndex;
                // }

                if( this.props.mech.criticalCanBePlaced( this.props.sectionAbbr, this.props.currentSelectedItemSize , critIndexAdjust, null))
                    clickableClass = " can-be-placed ";
                else
                    clickableClass = " cannot-be-placed ";

                allocatingLabel = "Allocating: " + this.props.currentSelectedItemName;
            }

            if( crit ) {
                if( !crit.placeholder ) {
                    if( !crit.movable ) {
                        critItems.push(
                            <li
                                className={"critical-height-" + crit.size + " unmovable"}
                                // onClick={() => this.props.selectItemClick( critIndex, this.props.sectionAbbr, null)}
                                title={crit.uuid}

                            >
                                {crit.crits !== crit.size ? (
                                    <div className="pull-right">({crit.size}/{crit.crits})</div>
                                ) : (
                                    <div className="pull-right">({crit.crits})</div>
                                )}

                                <div className="text-left card-title">{crit.name}</div>
                            </li>

                        )
                    } else {
                        critItems.push(
                            <li
                                className={"cursor-pointer critical-height-" + crit.size + selectedClass}
                                // for some reason the linter's not checking that I'm looking for a non-null object above... :/
                                // @ts-ignore
                                onClick={() => this.props.selectItemClick(
                                    critIndex,
                                    this.props.sectionAbbr,
                                    crit,
                                )}
                                title={crit.uuid}
                                onMouseEnter={(e) => this._updateIndex(e, critIndex)}
                                onMouseLeave={(e) => this._updateIndex(e, critIndex)}
                            >
                                {crit.crits !== crit.size ? (
                                    <div className="pull-right">({crit.size}/{crit.crits})</div>
                                ) : (
                                    <div className="pull-right">({crit.crits})</div>
                                )}
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
                        className={"critical-empty" + clickableClass}
                        onClick={() => this.props.selectItemClick(
                            critIndex,
                            this.props.sectionAbbr,
                            null,
                            this.props.currentSelectedItemSize,
                            this.props.currentSelectedItemName
                        )}
                        onMouseEnter={(e) => this._updateIndex(e, critIndex)}
                        onMouseLeave={(e) => this._updateIndex(e, critIndex)}
                    >
                        {/* &nbsp;{critIndex},{critIndexAdjust},{this.props.currentSelectedItemSize} */}
                        &nbsp;{allocatingLabel}&nbsp;
                    </li>
                )
            }
        }
        return (
            <ul
                className="critical-assignment-container"
                onMouseLeave={(e) => this._updateIndex(e, -1)}
            >
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
    mech: BattleMech;
    currentSelectedIndex: number;
    currentSelectedLocation: string;
    currentSelectedItemSize: number;
    currentSelectedItemName: string;
    selectItemClick(
        selectedIndex: number,
        selectedLocation: string,
        selectedItem: ICriticalSlot | null,
        selectedItemSize: number,
        selectedItemName: string,
    ): void;
}

interface ICriticalAllocationSectionState {
    hoveredIndex: number;
}