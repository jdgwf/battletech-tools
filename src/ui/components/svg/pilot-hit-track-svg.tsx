
import React from 'react';
import { IPilot } from '../../../classes/battlemech';

export default class PilotHitTrackSVG extends React.Component<IPilotHitTrackSVGProps, IPilotHitTrackSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = 744;
    theHeight = 627;
    xLoc = 0;
    yLoc = 0;
    constructor(props: IPilotHitTrackSVGProps) {
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

    }

    render = (): React.ReactFragment => {

        let damageTrack: React.ReactFragment[] = [];

        let boxWidth = 60;
        let lWidthBuffer = 0;
        for( let hits = 1; hits < 7; hits++ ) {
            let concRoll: string = "";
            switch(hits) {
                case 1: {
                    concRoll = "3+"
                    break;
                }
                case 2: {
                    concRoll = "5+"
                    break;
                }
                case 3: {
                    concRoll = "7+"
                    break;
                }
                case 4: {
                    concRoll = "10+"
                    break;
                }
                case 5: {
                    concRoll = "11+"
                    break;
                }
                case 6: {
                    concRoll = "Dead"
                    break;
                }
            }

            damageTrack.push(
                <g key={hits}>
                    <rect
                        x={this.xLoc + 5 + lWidthBuffer}
                        y={this.yLoc - 28 }
                        width={boxWidth}
                        height={40}
                        fill={this.strokeColor}
                    />
                    <rect
                        x={this.xLoc + 5 + lWidthBuffer}
                        y={this.yLoc - 25}
                        width={boxWidth - 1}
                        height={34}
                        fill={this.bgColor}
                    />
                    <rect
                        x={this.xLoc + 5 + lWidthBuffer}
                        y={this.yLoc + 10 }
                        width={boxWidth}
                        height={40}
                        fill={this.strokeColor}
                    />
                    <rect
                        x={this.xLoc + 5 + lWidthBuffer}
                        y={this.yLoc + 12}
                        width={boxWidth - 1}
                        height={36}
                        fill={this.bgColor}
                    />
                    <text
                        x={this.xLoc + lWidthBuffer + 35}
                        y={this.yLoc}
                        textAnchor="middle" fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={25}
                    >
                        {hits}
                    </text>
                    <text
                        x={this.xLoc + lWidthBuffer + 35}
                        y={this.yLoc + 40}
                        textAnchor="middle"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={20}
                    >
                        {concRoll}
                    </text>
                </g>
            );
            lWidthBuffer += boxWidth;
        }
        // var svg = "";

        // if( standAlone ) {
        //     var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>

        return (
    <>
        <text
            x={this.xLoc}
            y={this.yLoc}
            textAnchor="end"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 500}}
            fontSize={25}
        >
            Hits:
        </text>
        <text
            x={this.xLoc}
            y={this.yLoc + 40}
            textAnchor="end"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 500}}
            fontSize={25}
        >
            Consc:
        </text>

        {damageTrack}
</>
        );
    }
}

interface IPilotHitTrackSVGProps {
    bgColor?: string;
    strokeColor?: string;

    yLoc?: number;
    xLoc?: number;

    width?: number;

    height: number;

    pilot: IPilot;
}

interface IPilotHitTrackSVGState {
}