import React from 'react';

export default class HeatTrackSVG extends React.Component<IHeatTrackSVGProps, IHeatTrackSVGState> {
    strokeColor = "rgb(0,0,0)";
    currentHeat = -1;
    bgColor = "rgb(255,255,255)";
    effectBGColor = "rgb(200,200,200)";

    constructor(props: IHeatTrackSVGProps) {
        super( props );

        if( this.props.currentHeat ) {
            this.currentHeat = this.props.currentHeat;
        }

        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }

        if( this.props.effectBGColor ) {
            this.effectBGColor = this.props.effectBGColor;
        }
    }

    render() {

        let heatScale: React.ReactFragment[] = [];
        let boxHeight = 37;
        let boxWidth = 60;
        let normalBG = this.bgColor;
        let effectBG = this.effectBGColor;
        let boxBG = normalBG;

        for( var hCounter = 0; hCounter < 31; hCounter++ ) {
            heatScale.push(
                <rect
                    key={hCounter.toString() + "a"}
                    x={this.props.xLoc}
                    y={this.props.yLoc + 60 + boxHeight * hCounter}
                    width={boxWidth}
                    height={boxHeight}
                    fill={this.strokeColor}
                />
            );

            if(
                hCounter === 5
                    ||
                hCounter === 8
                    ||
                hCounter === 10
                    ||
                hCounter === 13
                    ||
                hCounter === 14
                    ||
                hCounter === 15
                    ||
                hCounter === 17
                    ||
                hCounter === 18
                    ||
                hCounter === 19
                    ||
                hCounter === 20
                    ||
                hCounter === 22
                    ||
                hCounter === 23
                    ||
                hCounter === 24
                    ||
                hCounter === 25
                    ||
                hCounter === 26
                    ||
                hCounter === 28
                    ||
                hCounter === 30

            )
            {
                boxBG = effectBG;
            } else {
                boxBG = normalBG;
            }

            heatScale.push(
                <rect
                    key={hCounter.toString() + "b"}
                    x={this.props.xLoc + 2}
                    y={this.props.yLoc + 62 + boxHeight * hCounter}
                    width={boxWidth -4}
                    height={boxHeight -4}
                    fill={boxBG}
                />
            );

            heatScale.push(
                <text
                    key={hCounter.toString() + "c"}
                    x={this.props.xLoc + 27}
                    y={this.props.yLoc + 89 + boxHeight * hCounter}
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 100}}
                    fontSize={boxHeight - 10}
                >
                    {hCounter}
                </text>
            );

            if(
                hCounter === 5
                    ||
                hCounter === 8
                    ||
                hCounter === 10
                    ||
                hCounter === 13
                    ||
                hCounter === 14
                    ||
                hCounter === 15
                    ||
                hCounter === 17
                    ||
                hCounter === 18
                    ||
                hCounter === 19
                    ||
                hCounter === 20
                    ||
                hCounter === 22
                    ||
                hCounter === 23
                    ||
                hCounter === 24
                    ||
                hCounter === 25
                    ||
                hCounter === 26
                    ||
                hCounter === 28
                    ||
                hCounter === 30
            ) {
                heatScale.push(
                    <text
                    key={hCounter.toString() + "d"}
                        x={this.props.xLoc + 43}
                        y={this.props.yLoc + 83 + boxHeight * hCounter}
                        textAnchor="right"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 100}}
                        fontSize={boxHeight - 15}
                    >
                        *
                    </text>
                )
            }
        }

        return (
            <>
                <text
                    x={this.props.xLoc + boxWidth / 2}
                    y={this.props.yLoc + 10}
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={20}
                >
                    HEAT
                </text>
                <text
                    x={this.props.xLoc + boxWidth / 2}
                    y={this.props.yLoc + 30}
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={20}
                >
                    SCALE
                </text>

                {heatScale}
            </>
        )
    }
}

interface IHeatTrackSVGProps {
    xLoc: number;
    yLoc: number;
    strokeColor?: string;
    currentHeat?: number;
    bgColor?: string;
    effectBGColor?: string;
}

interface IHeatTrackSVGState {
}