import React from 'react';
import { BattleMech } from '../../../classes/battlemech';

export default class CritAllocationTableSVG extends React.Component<ICritAllocationTableSVGProps, ICritAllocationTableSVGState> {


    constructor(props: ICritAllocationTableSVGProps) {
        super( props );

        this.state = {

        };
    }

    render = (): React.ReactFragment => {

        // let bgColor = "rgb(255,255,255)";
        let strokeColor = "rgb(0,0,0)";
        // let landscape: boolean = false;
        // let inPlay: boolean = false;
        let colorMediumGray = "rgb(150, 150, 150)";
        let colorVeryLightGray = "rgb(200, 200, 200)";
        // let colorTan = "#fdfde3";
        let fontSize = 25;
        let boxWidth = 275;
        let lineBuffer = 6;

        let critTable: React.ReactFragment[] = [];
        let critBackgrounds: React.ReactFragment[] = [];

        let lineCount = 0;
        let dieNumber = 1;
        let lastName = "";
        let yStartBox = -1;
        let lastWasPlaceHolder = false;
        let lastRollAgain = false;
        let boxHeight = 0

        for( let critC = 0; critC < this.props.critData.length; critC++ ) {

            if( this.props.critData[ critC ] ) {
                this.props.critData[ critC ].name = this.props.critData[ critC ].name.replace("(rear)", "[R]");

                if( this.props.critData[ critC ].name === "placeholder" ) {
                    critTable.push( <text key={critC.toString() + "a"}  x={this.props.xLoc } y={this.props.yLoc + lineCount * (fontSize + lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={fontSize}>{lastName}</text> );
                    lastWasPlaceHolder = true;
                } else {
                    if( this.props.critData[ critC ].rollAgain ) {
                        critTable.push( <text key={critC.toString() + "b"} x={this.props.xLoc } y={this.props.yLoc + lineCount * (fontSize + lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={colorMediumGray} style={{fontWeight: 100}} fontSize={fontSize}>({this.props.critData[ critC ].name})</text> );
                    } else {

                        if( this.props.critData[ critC ].obj && this.props.critData[ critC ].obj.ammoPerTon ) {
                            critTable.push( <text key={critC.toString() + "c"} x={this.props.xLoc } y={this.props.yLoc + lineCount * (fontSize + lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={fontSize}>{this.props.critData[ critC ].name} {this.props.critData[ critC ].obj.currentAmmo}/{this.props.critData[ critC ].obj.ammoPerTon}</text> );
                        } else {
                            critTable.push( <text key={critC.toString() + "d"} x={this.props.xLoc } y={this.props.yLoc + lineCount * (fontSize + lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={fontSize}>{this.props.critData[ critC ].name}</text> );
                        }

                    }

                    if(
                         ( yStartBox > -1  && lastWasPlaceHolder )
                            ||
                        //  ( yStartBox > -1 && lastRollAgain && lastRollAgain === false )
                        //     ||
                         ( yStartBox > -1 && lastRollAgain === false && lastWasPlaceHolder === false )
                    ) {

                        boxHeight = (this.props.yLoc + lineCount * (fontSize + lineBuffer) - yStartBox - lineBuffer );

                        if( critC === 6 ) {
                            boxHeight = (this.props.yLoc + (lineCount - 1 ) * (fontSize + lineBuffer) - yStartBox - lineBuffer );
                        }
                        critBackgrounds.push( <rect key={critC.toString() + "e"} x={this.props.xLoc - 10} rx={15} ry={15} y={yStartBox - fontSize + 2} width={boxWidth} height={ boxHeight } stroke={strokeColor} strokeWidth={2} fill={colorVeryLightGray} /> );

                    }

                    lastName = this.props.critData[ critC ].name;
                    if(  this.props.critData[ critC ].rollAgain )
                        lastRollAgain = true;
                    else
                        lastRollAgain = false;
                    yStartBox = this.props.yLoc + lineCount * (fontSize + lineBuffer);
                    lastWasPlaceHolder = false;
                }

                if( this.props.mechData.isCriticalDamaged( this.props.location, critC) ) {
                    critTable.push(
                        <line
                            key={critC}
                            x1={this.props.xLoc - 50}
                            y1={this.props.yLoc + lineCount * (fontSize + lineBuffer) - fontSize / 2.5}
                            x2={this.props.xLoc + boxWidth + 10 }
                            y2={this.props.yLoc + lineCount * (fontSize + lineBuffer) - fontSize / 2.5 }
                            strokeWidth={4}
                            stroke={"rgb(200,0,0)"}
                        >
                        </line> );
                }
            } else {
                critTable.push( <text key={critC.toString() + "f"}  x={this.props.xLoc } y={this.props.yLoc + lineCount * (fontSize + lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={colorMediumGray} style={{fontWeight: 100}} fontSize={fontSize}>(roll again)</text> );
                    if(
                         ( yStartBox > -1  && lastWasPlaceHolder )
                            ||
                        //  ( yStartBox > -1 && lastRollAgain && lastRollAgain === false )
                        //     ||
                         ( yStartBox > -1 && lastRollAgain === false && lastWasPlaceHolder === false )
                    ) {
                        boxHeight = (this.props.yLoc + lineCount * (fontSize + lineBuffer) - yStartBox - lineBuffer );

                        if( critC === 6 ) {
                            boxHeight = (this.props.yLoc + (lineCount - 1 ) * (fontSize + lineBuffer) - yStartBox - lineBuffer );
                    }
                    critBackgrounds.push( <rect  key={critC.toString() + "g"} x={ this.props.xLoc - 10} rx={15} ry={15} y={yStartBox - fontSize + 2} width={boxWidth} height={boxHeight} stroke={strokeColor} strokeWidth={2} fill={colorVeryLightGray} /> );

                }

                yStartBox = -1;
                lastWasPlaceHolder = false;

            }

            critTable.push( <text key={critC.toString() + "h"}  x={this.props.xLoc - 40} y={this.props.yLoc + lineCount * (fontSize + lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={fontSize}>{dieNumber}.</text> );

            lineCount++;
            dieNumber++;
            if( critC === 5 ) {
                lineCount++;
                dieNumber = 1;
            }

            if( critC === this.props.critData.length - 1 ) {
                if(
                     ( yStartBox > -1 && lastRollAgain === false)
                ) {

                    let boxHeight = (this.props.yLoc + lineCount * (fontSize + lineBuffer) - yStartBox - lineBuffer );

                    if( critC === 5 ) {
                        boxHeight = (this.props.yLoc + (lineCount - 1 ) * (fontSize + lineBuffer) - yStartBox - lineBuffer);
                    }

                    critBackgrounds.push( <rect  key={critC.toString() + "i"} x={this.props.xLoc - 10} rx={15} ry={15} y={yStartBox - fontSize + 2} width={boxWidth} height={boxHeight} stroke={strokeColor} strokeWidth={2} fill={colorVeryLightGray} /> );

                }
            }
        }

        if( this.props.critData.length > 6 ) {
            critTable.push(<text key={"enda"}  x={this.props.xLoc - 80} y={this.props.yLoc + 2.75 * (fontSize + lineBuffer)} textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={fontSize * 1.25}>1-3</text> );
            critTable.push(<text key={"endb"}  x={this.props.xLoc - 80} y={this.props.yLoc + 9.75 * (fontSize + lineBuffer)} textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={fontSize * 1.25}>4-6</text> );

        }

        return (
        <g
            x={this.props.yLoc}
            y={this.props.xLoc}
        >
            {critBackgrounds}
            {critTable}
        </g>
        )
    }
}

interface ICritAllocationTableSVGProps {
    strokeColor?: string;
    critData: any[];
    location: string;
    mechData: BattleMech;
    inPlay?: boolean;
    xLoc: number;
    yLoc: number;
}

interface ICritAllocationTableSVGState {
}