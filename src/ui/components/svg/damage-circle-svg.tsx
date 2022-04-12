

import React from 'react';

export default class DamageCircleSVG extends React.Component<IDamageCircleSVGProps, IDamageCircleSVGState> {
    bgColor = "rgb(255,255,255)";
    bgColorFilled = "rgb(200,0,0)";
    strokeColor = "rgb(0,0,0)";
    xLoc = 0;
    yLoc = 0;
    radius = 15;
    strokeWidth = 2;
    clickLocation = '';
    constructor(props: IDamageCircleSVGProps) {
        super(props);

        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        if( this.props.strokeWidth ) {
            this.strokeWidth = this.props.strokeWidth;
        }

        if( this.props.clickLocation ) {
            this.clickLocation = this.props.clickLocation;
        }

        if( this.props.xLoc ) {
            this.xLoc = this.props.xLoc;
        }

        if( this.props.yLoc ) {
            this.yLoc = this.props.yLoc;
        }

        if( this.props.radius ) {
            this.radius = this.props.radius;
        }

        if( this.props.bgColorFilled ) {
            this.bgColorFilled = this.props.bgColorFilled;
        }

    }

    clickFunction = (): void => {
        if( this.props.clickFunction && this.props.inPlay ) {
            if( typeof( this.props.clickIndex) !== "undefined" ) {
                this.props.clickFunction( this.clickLocation, +this.props.clickIndex );
            }
        }
    }

    render = (): React.ReactFragment => {
        return (
            <circle
                // className={this.armorClass}
                onClick={this.clickFunction}
                cx={this.props.xLoc}
                cy={this.props.yLoc}
                r={this.radius - 3}
                className={this.props.inPlay ? "cursor-pointer" : ""}
                stroke={this.strokeColor}
                strokeWidth={this.strokeWidth}
                fill={this.props.isFilled ? this.bgColorFilled : this.bgColor }
            />
        );
    }
}

interface IDamageCircleSVGProps {
    bgColor?: string;
    isFilled?: boolean;
    clickIndex?: number;
    bgColorFilled?: string;
    strokeWidth?: number;
    strokeColor?: string;
    xLoc: number;
    yLoc: number;
    radius: number;
    clickLocation?: string;
    inPlay?: boolean;
    clickFunction?( clickLocation: string, clickIndex: number ): void;
}

interface IDamageCircleSVGState {
}

