import React from 'react';
import { BattleMech } from "../../../classes/battlemech";
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class RecordSheetGATORTable extends React.Component<IRecordSheetGATORTableProps, IRecordSheetGATORTableState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    inPlay: boolean = false;
    eqLineHeight = 33;

    colorMediumGray = "rgb(150, 150, 150)";
    colorVeryLightGray = "rgb(200, 200, 200)";

    constructor(props: IRecordSheetGATORTableProps) {
        super( props );

        this.state = {

        };
    }

    render = (): React.ReactFragment => {


        return (
            <RecordSheetGroupBoxSVG
                width={this.props.width}
                height={this.props.height}
                xLoc={this.props.xLoc}
                yLoc={this.props.yLoc}
                title="GATOR Calculations"
                bgColor={this.bgColor}
                strokeColor={this.strokeColor}
            >
                <text
                    x={this.props.xLoc + 50 }
                    y={this.props.yLoc + 100}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={50}
                >G</text>

                {this.props.inPlay ? (
                    <>
                    </>
                ) : (
                    <>

                        {this.props.mechData.pilot ? (
                                <text
                                    x={this.props.xLoc + 125 }
                                    y={this.props.yLoc + 100}
                                    textAnchor="start"
                                    fontFamily="sans-serif"
                                    fill={this.strokeColor}
                                    style={{fontWeight: 100}}
                                    fontSize={50}
                                >
                                    {this.props.mechData.pilot.gunnery}
                                </text>
                            ): null }

                        <line
                            x1={this.props.xLoc + 100 }
                            x2={this.props.xLoc + 200 }
                            y1={this.props.yLoc + 110}
                            y2={this.props.yLoc + 110}
                            strokeWidth={2}
                            stroke={this.strokeColor}
                        />
                    </>
                )}

                <text
                    x={this.props.xLoc + 200 }
                    y={this.props.yLoc + 100}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={50}
                >A</text>
                {this.props.inPlay ? (
                    <>
                    </>
                ) : (
                    <>
                <line
                    x1={this.props.xLoc + 250 }
                    x2={this.props.xLoc + 350 }
                    y1={this.props.yLoc + 110}
                    y2={this.props.yLoc + 110}
                    strokeWidth={2}
                    stroke={this.strokeColor}
                />
                </>
                )}
                <text
                    x={this.props.xLoc + 350 }
                    y={this.props.yLoc + 100}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={50}
                >T</text>
                               {this.props.inPlay ? (
                    <>
                    </>
                ) : (
                    <>
                <line
                    x1={this.props.xLoc + 400 }
                    x2={this.props.xLoc + 500 }
                    y1={this.props.yLoc + 110}
                    y2={this.props.yLoc + 110}
                    strokeWidth={2}
                    stroke={this.strokeColor}
                />
                </>)}
                <text
                    x={this.props.xLoc + 500 }
                    y={this.props.yLoc + 100}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={50}
                >O</text>
                {this.props.inPlay ? (
                    <>
                    </>
                ) : (
                <line
                    x1={this.props.xLoc + 550 }
                    x2={this.props.xLoc + 650 }
                    y1={this.props.yLoc + 110}
                    y2={this.props.yLoc + 110}
                    strokeWidth={2}
                    stroke={this.strokeColor}
                />
                )}
                <text
                    x={this.props.xLoc + 650 }
                    y={this.props.yLoc + 100}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={50}
                >R</text>
                {this.props.inPlay ? (
                    <>
                    </>
                ) : (
                <line
                    x1={this.props.xLoc + 700}
                    x2={this.props.xLoc + 800}
                    y1={this.props.yLoc + 110}
                    y2={this.props.yLoc + 110}
                    strokeWidth={2}
                    stroke={this.strokeColor}
                />
                )}
            </RecordSheetGroupBoxSVG>
        )
    }
}

interface IRecordSheetGATORTableProps {
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

interface IRecordSheetGATORTableState {
}