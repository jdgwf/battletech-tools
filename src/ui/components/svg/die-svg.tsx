

import React from 'react';

export default class DieSVG extends React.Component<IDieSVGProps, IDieSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    pipColor = "rgb(0,0,0)";
    numberPips = 5;
    posX = 0;
    posY = 0;
    width = 20;

    constructor(props: IDieSVGProps) {
        super(props);

        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        if( this.props.numberPips ) {
            this.numberPips = this.props.numberPips;
        }

        if( this.props.posX ) {
            this.posX = this.props.posX;
        }

        if( this.props.posY ) {
            this.posY = this.props.posY;
        }

        if( this.props.width ) {
            this.width = this.props.width;
        }

        if( this.props.pipColor ) {
            this.pipColor = this.props.pipColor;
        }
    }

    render() {
        let pipRadius = this.width / 7;

        let pips: React.ReactFragment[] = [];


        switch( this.numberPips ) {
            case 1:
                // Center Dot.
                pips.push (
                    <circle
                        key={1}
                        cx={this.posX + this.width / 5 * 2.5}
                        cy={this.posY + this.width / 5 * 2.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                    break;
            case 2:
                    // Top Left
                    pips.push (
                        <circle
                            key={1}
                            cx={this.posX + this.width / 5 * 1.5}
                            cy={this.posY + this.width / 5 * 1.5}
                            r={pipRadius}
                            fill={this.pipColor}
                        />
                    )

                    // Bottom Right
                    pips.push (
                        <circle
                            key={2}
                            cx={this.posX + this.width / 5 * 3.5}
                            cy={this.posY + this.width / 5 * 3.5}
                            r={pipRadius}
                            fill={this.pipColor}
                        />
                    )
                break;
            case 3: {

                // Center Dot.
                pips.push (
                    <circle
                        key={1}
                        cx={this.posX + this.width / 5 * 2.5}
                        cy={this.posY + this.width / 5 * 2.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Bottom Left
                pips.push (
                    <circle
                        key={2}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 4}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Top Right
                pips.push (
                    <circle
                        key={3}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 1}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )



                break;
            }
            case 4: {
                // Top Right
                pips.push (

                    <circle
                        key={1}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 1.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                // Top Left
                pips.push (
                    <circle
                        key={2}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 1.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Bottom Right
                pips.push (
                    <circle
                        key={3}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 3.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                // Bottom Left
                pips.push (
                    <circle
                        key={4}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 3.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                break;
            }
            case 5: {

                // Center Dot.
                pips.push (
                    <circle
                        key={1}
                        cx={this.posX + this.width / 5 * 2.5}
                        cy={this.posY + this.width / 5 * 2.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Top Left
                pips.push (
                    <circle
                        key={2}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 1}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Bottom Left
                pips.push (
                    <circle
                        key={3}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 4}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Bottom Left
                pips.push (
                    <circle
                        key={4}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 1}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Bottom Right
                pips.push (
                    <circle
                        key={5}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 4}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                break;
            }
            default: {
                // Left Top
                pips.push (
                    <circle
                    key={1}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 }
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                // Left Middle
                pips.push (
                    <circle
                        key={2}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 2.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                // Left Bottom
                pips.push (
                    <circle
                        key={3}
                        cx={this.posX + this.width / 5 * 1.5}
                        cy={this.posY + this.width / 5 * 4}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )

                // Right Top
                pips.push (
                    <circle
                        key={4}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 }
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                // Right Middle
                pips.push (
                    <circle
                        key={5}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 2.5}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                // Right Bottom
                pips.push (
                    <circle
                        key={6}
                        cx={this.posX + this.width / 5 * 3.5}
                        cy={this.posY + this.width / 5 * 4}
                        r={pipRadius}
                        fill={this.pipColor}
                    />
                )
                break;
            }

        }

        return (
        <>
            <rect
                x={this.posX}
                rx={this.width / 5}
                ry={this.width / 5}
                y={this.posY}
                width={this.width}
                height={this.width}
                stroke={this.strokeColor}
                strokeWidth={2}
                fill={this.bgColor}
            />
            {pips}
        </>
        )

    }

}


interface IDieSVGProps {
    bgColor?: string;
    strokeColor?: string;
    numberPips?: number;
    posX: number;
    posY: number;
    width: number;
    pipColor?: string;
}

interface IDieSVGState {
}




