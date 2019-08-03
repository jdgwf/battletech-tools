import React from 'react';
import { BattleMech } from "../../../Classes/BattleMech";
import RecordSheetGroupBoxSVG from './RecordSheetGroupBoxSVG';

export default class RecordSheetEquipmentTable extends React.Component<IRecordSheetEquipmentTableProps, IRecordSheetEquipmentTableState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    docWidth = 2000;
    docHeight = 2600;

    colorTan = "#fdfde3";

    constructor(props: IRecordSheetEquipmentTableProps) {
        super( props );

        this.state = {

        };
    }

    render() {
        return (
            <RecordSheetGroupBoxSVG
                width={this.props.width}
                height={this.props.height}
                xLoc={this.props.xLoc}
                yLoc={this.props.yLoc}
                title="Weapons And Equipment"
                bgColor={this.bgColor}
                strokeColor={this.strokeColor}
            >
                Moo.
            </RecordSheetGroupBoxSVG>
        )
    }
}

interface IRecordSheetEquipmentTableProps {
    bgColor?: string;
    strokeColor?: string;
    mechData: BattleMech;
    inPlay?: boolean;
    xLoc: number;
    yLoc: number;
    width: number;
    height: number;

    // landscape?: boolean;
    // itemIDField
}

interface IRecordSheetEquipmentTableState {
}