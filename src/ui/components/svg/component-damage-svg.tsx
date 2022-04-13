
import React from 'react';
import { BattleMech } from '../../../classes/battlemech';
import DamageCircleSVG from './damage-circle-svg';
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class ComponentDamageSVG extends React.Component<IComponentDamageSVGProps, IComponentDamageSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = 744;
    theHeight = 627;
    xLoc = 0;
    yLoc = 0;
    constructor(props: IComponentDamageSVGProps) {
        super(props);
        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        let baseWidth = 744.09448819;
        let baseHeight = 1052.3622047;
        if( this.props.width ) {
            this.theWidth = this.props.width;
            this.theHeight = Math.round( this.props.width / baseWidth * baseHeight );

        }

        if( this.props.xLoc  ) {
            this.xLoc = this.props.xLoc;
        }

        if( this.props.yLoc ) {
            this.yLoc = this.props.yLoc;
        }

        // if( typeof(standAlone) === "undefined" )
        //     standAlone = true;

        // if( !baseFillColor )
        //     baseFillColor = colorTan;

        // if( !lineColor )
        //     lineColor = colorGold;
    }

    render = (): React.ReactFragment => {

        // var svg = "";

        // if( standAlone ) {
        //     var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";
        // console.log( this.theWidth )

        let textRightLine = this.theWidth * 2 / 3 - 40;

        // theHeight = 100;
        return (

            <RecordSheetGroupBoxSVG
                yLoc={this.props.yLoc}
                xLoc={this.props.xLoc}
                height={this.props.height}
                width={this.props.width}
                // title="Component Damage"
            >
                <text

                    x={this.props.xLoc + textRightLine}
                    y={this.props.yLoc + 60}
                    fontFamily="sans-serif"
                    fill={this.props.strokeColor}
                    textAnchor="end"
                    fontSize={30}
                >
                    Engine Hits
                </text>

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 30}
                    yLoc={this.props.yLoc + 50}
                    radius={20}
                    isFilled={this.props.inPlay && this.props.mechData.engineHits() > 0 }
                    // clickLocation="ll"
                    bgColorFilled = {"rgb(200,0,0)"}
                    // clickIndex={29}
                    // clickFunction={this.to}
                />

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 80}
                    yLoc={this.props.yLoc + 50}
                    radius={20}
                    // inPlay={this.props.inPlay}
                    isFilled={this.props.inPlay && this.props.mechData.engineHits() > 1 }
                    // clickLocation="ll" clickIndex={29}
                    // bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 130}
                    yLoc={this.props.yLoc + 50}
                    radius={20}
                    // inPlay={this.props.inPlay}
                    isFilled={this.props.inPlay && this.props.mechData.engineHits() > 2 }
                    clickLocation="ll" clickIndex={29}
                    bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />

                <text

                    x={this.props.xLoc + textRightLine}
                    y={this.props.yLoc + 100}
                    fontFamily="sans-serif"
                    fill={this.props.strokeColor}
                    textAnchor="end"
                    fontSize={30}
                >
                    Gyro Hits
                </text>

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 30}
                    yLoc={this.props.yLoc + 90}
                    radius={20}
                    isFilled={this.props.mechData.gyroHits() > 0}
                    // inPlay={this.props.inPlay}
                    // clickLocation="ll" clickIndex={29}
                    bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 80}
                    yLoc={this.props.yLoc + 90}
                    radius={20}
                    isFilled={this.props.mechData.gyroHits() > 1}
                    // inPlay={this.props.inPlay}
                    // clickLocation="ll" clickIndex={29}
                    bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />

                <text

                    x={this.props.xLoc + textRightLine}
                    y={this.props.yLoc + 140}
                    fontFamily="sans-serif"
                    fill={this.props.strokeColor}
                    textAnchor="end"
                    fontSize={30}
                >
                    Sensor Hits
                </text>

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 30}
                    yLoc={this.props.yLoc + 130}
                    radius={20}
                    isFilled={this.props.mechData.sensorHits() > 0}
                    // inPlay={this.props.inPlay}
                    clickLocation="ll" clickIndex={29}
                    bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 80}
                    yLoc={this.props.yLoc + 130}
                    radius={20}
                    isFilled={this.props.mechData.sensorHits() > 1}
                    // inPlay={this.props.inPlay}
                    // clickLocation="ll" clickIndex={29}
                    bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />

                <text
                    x={this.props.xLoc + textRightLine}
                    y={this.props.yLoc + 180}
                    fontFamily="sans-serif"
                    fill={this.props.strokeColor}
                    textAnchor="end"
                    fontSize={30}
                >
                    Life Support
                </text>

                <DamageCircleSVG
                    xLoc={this.props.xLoc + textRightLine + 30}
                    yLoc={this.props.yLoc + 170}
                    radius={20}
                    isFilled={this.props.mechData.lifeSupportHits() > 0}
                    // inPlay={this.props.inPlay}
                    // clickLocation="ll" clickIndex={29}
                    bgColorFilled={"rgb(200,0,0)"}
                    // clickFunction={this.to}
                />
            </RecordSheetGroupBoxSVG>

      );
    }
}

interface IComponentDamageSVGProps {
    bgColor?: string;
    strokeColor?: string;

    inPlay?: boolean;
    yLoc: number;
    xLoc: number;

    mechData: BattleMech;

    width: number;
    height: number;
}

interface IComponentDamageSVGState {
}