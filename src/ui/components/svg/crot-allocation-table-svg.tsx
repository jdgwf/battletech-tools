import React from 'react';

export default class CritAllocationTableSVG extends React.Component<ICritAllocationTableSVGProps, ICritAllocationTableSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    colorMediumGray = "rgb(150, 150, 150)";
    colorVeryLightGray = "rgb(200, 200, 200)";
    colorTan = "#fdfde3";
    fontSize = 25;
    boxWidth = 275;
    lineBuffer = 6;

    constructor(props: ICritAllocationTableSVGProps) {
        super( props );

        this.state = {

        };
    }

    render = (): React.ReactFragment => {

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
                    critTable.push( <text key={critC.toString() + "a"}  x={this.props.xLoc } y={this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 500}} fontSize={this.fontSize}>{lastName}</text> );
                    lastWasPlaceHolder = true;
                } else {
                    if( this.props.critData[ critC ].rollAgain ) {
                        critTable.push( <text key={critC.toString() + "b"} x={this.props.xLoc } y={this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={this.colorMediumGray} style={{fontWeight: 100}} fontSize={this.fontSize}>({this.props.critData[ critC ].name})</text> );
                    } else {

                        if( this.props.critData[ critC ].obj && this.props.critData[ critC ].obj.ammo_per_ton )
                            critTable.push( <text key={critC.toString() + "c"} x={this.props.xLoc } y={this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 500}} fontSize={this.fontSize}>{this.props.critData[ critC ].name} {this.props.critData[ critC ].obj.ammo_per_ton}</text> );
                        else
                            critTable.push( <text key={critC.toString() + "d"} x={this.props.xLoc } y={this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 500}} fontSize={this.fontSize}>{this.props.critData[ critC ].name}</text> );

                    }


                    if(
                         ( yStartBox > -1  && lastWasPlaceHolder )
                            ||
                        //  ( yStartBox > -1 && lastRollAgain && lastRollAgain === false )
                        //     ||
                         ( yStartBox > -1 && lastRollAgain === false && lastWasPlaceHolder === false )
                    ) {

                        boxHeight = (this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer) - yStartBox - this.lineBuffer );

                        if( critC === 6 ) {
                            boxHeight = (this.props.yLoc + (lineCount - 1 ) * (this.fontSize + this.lineBuffer) - yStartBox - this.lineBuffer );
                        }
                        critBackgrounds.push( <rect key={critC.toString() + "e"} x={this.props.xLoc - 10} rx={15} ry={15} y={yStartBox - this.fontSize + 2} width={this.boxWidth} height={ boxHeight } stroke={this.strokeColor} strokeWidth={2} fill={this.colorVeryLightGray} /> );

                    }

                    lastName = this.props.critData[ critC ].name;
                    if(  this.props.critData[ critC ].rollAgain )
                        lastRollAgain = true;
                    else
                        lastRollAgain = false;
                    yStartBox = this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer);
                    lastWasPlaceHolder = false;
                }

            } else {
                critTable.push( <text key={critC.toString() + "f"}  x={this.props.xLoc } y={this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={this.colorMediumGray} style={{fontWeight: 100}} fontSize={this.fontSize}>(roll again)</text> );
                    if(
                         ( yStartBox > -1  && lastWasPlaceHolder )
                            ||
                        //  ( yStartBox > -1 && lastRollAgain && lastRollAgain === false )
                        //     ||
                         ( yStartBox > -1 && lastRollAgain === false && lastWasPlaceHolder === false )
                    ) {
                        boxHeight = (this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer) - yStartBox - this.lineBuffer );

                        if( critC === 6 ) {
                            boxHeight = (this.props.yLoc + (lineCount - 1 ) * (this.fontSize + this.lineBuffer) - yStartBox - this.lineBuffer );
                    }
                    critBackgrounds.push( <rect  key={critC.toString() + "g"} x={ this.props.xLoc - 10} rx={15} ry={15} y={yStartBox - this.fontSize + 2} width={this.boxWidth} height={boxHeight} stroke={this.strokeColor} strokeWidth={2} fill={this.colorVeryLightGray} /> );

                }

                yStartBox = -1;
                lastWasPlaceHolder = false;

            }

            critTable.push( <text key={critC.toString() + "h"}  x={this.props.xLoc - 40} y={this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer)} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 500}} fontSize={this.fontSize}>{dieNumber}.</text> );

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

                    let boxHeight = (this.props.yLoc + lineCount * (this.fontSize + this.lineBuffer) - yStartBox - this.lineBuffer );


                    if( critC === 5 ) {
                        boxHeight = (this.props.yLoc + (lineCount - 1 ) * (this.fontSize + this.lineBuffer) - yStartBox - this.lineBuffer);
                    }

                    critBackgrounds.push( <rect  key={critC.toString() + "i"} x={this.props.xLoc - 10} rx={15} ry={15} y={yStartBox - this.fontSize + 2} width={this.boxWidth} height={boxHeight} stroke={this.strokeColor} strokeWidth={2} fill={this.colorVeryLightGray} /> );

                }
            }
        }

        if( this.props.critData.length > 6 ) {
            critTable.push(<text key={"enda"}  x={this.props.xLoc - 80} y={this.props.yLoc + 2.75 * (this.fontSize + this.lineBuffer)} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={this.fontSize * 1.25}>1-3</text> );
            critTable.push(<text key={"endb"}  x={this.props.xLoc - 80} y={this.props.yLoc + 9.75 * (this.fontSize + this.lineBuffer)} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={this.fontSize * 1.25}>4-6</text> );

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
    inPlay?: boolean;
    xLoc: number;
    yLoc: number;
}

interface ICritAllocationTableSVGState {
}