import * as React from 'react';
import { FaCheckSquare } from 'react-icons/fa';
import { MdDangerous } from 'react-icons/md';
import { BattleMech, ICriticalSlot } from '../../../../classes/battlemech';
import { getLocationName } from '../../../../utils';
import { makeRange } from '../../../../utils/makeRange';
import { IAppGlobals } from '../../../app-router';

export default class InPlayCriticalHitTable extends React.Component<IInPlayCriticalHitTableProps, IInPlayCriticalHitTableState> {

    toggleCritical = (
        location: string,
        critSlotIndex: number
    ) => {
        if( this.props.mechData ) {
            this.props.mechData.toggleCritical(location, critSlotIndex );
            this.props.onChange( this.props.mechData );
        }
    }

    render = (): JSX.Element => {
        let lastCritName = "";
        return(
            <fieldset className="fieldset">
                <legend>{getLocationName(this.props.location, this.props.mechData.isQuad() )}</legend>
                <table className="full-width">
                    <tbody>
                {makeRange(0, this.props.numberCritSlots - 1).map( ( critSlotIndex ) => {
                    let crit: ICriticalSlot | null = null;
                    let hr: JSX.Element | null = null;

                    if( critSlotIndex === 5 && this.props.numberCritSlots > 6)
                        hr = <tr><td colSpan={4}><hr /></td></tr>

                    let firstColData = <React.Fragment></React.Fragment>
                    if( critSlotIndex === 6 ) {
                        firstColData = <td rowSpan={6}>
                            4-6
                        </td>
                    }
                    if( critSlotIndex === 0 ) {
                        firstColData = <td rowSpan={6}>
                            1-3
                        </td>
                    }

                    if( this.props.critData[critSlotIndex]) {
                        crit = this.props.critData[critSlotIndex]
                        if( !crit.placeholder ) {
                            lastCritName = crit.name;
                        }
                        return (
                            <React.Fragment key={critSlotIndex}>
                            <tr>
                                {firstColData}

                                <td className={this.props.mechData.isCriticalDamaged( this.props.location, critSlotIndex  ) ? "color-brighter-red" : ""}>
                                    {critSlotIndex > 5 ? (
                                        <>{critSlotIndex - 5}</>
                                    ) : (
                                        <>{critSlotIndex + 1}</>
                                    )}
                                </td>
                                <td
                                    className={this.props.mechData.isCriticalDamaged( this.props.location, critSlotIndex  ) ? "color-brighter-red cursor-pointer font-weight-700" : "cursor-pointer"}
                                    onClick={(e) => this.toggleCritical( this.props.location, critSlotIndex )}
                                >
                                    {this.props.mechData.isCriticalDamaged( this.props.location, critSlotIndex  ) ? (
                                        <MdDangerous />
                                    ) : (
                                        <FaCheckSquare className="color-green" />
                                    )}
                                    &nbsp;{lastCritName}
                                </td>
                            </tr>
                            {hr}
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment key={critSlotIndex}>
                            <tr>
                                {firstColData}
                                <td className="color-light-gray font-weight-100">
                                    {critSlotIndex > 5 ? (
                                        <>{critSlotIndex - 5}</>
                                    ) : (
                                        <>{critSlotIndex + 1}</>
                                    )}
                                </td>
                                <td className="color-light-gray font-weight-100">
                                    ( Roll Again )
                                </td>
                            </tr>
                            {hr}
                            </React.Fragment>
                        )
                    }

                })}
                </tbody>
                </table>
            </fieldset>
        )
    }
}

interface IInPlayCriticalHitTableProps {
    appGlobals: IAppGlobals;
    mechData: BattleMech;
    critData: ICriticalSlot[];
    location: string;
    numberCritSlots: number;
    onChange( nv: BattleMech ): void;
}

interface IInPlayCriticalHitTableState {

}