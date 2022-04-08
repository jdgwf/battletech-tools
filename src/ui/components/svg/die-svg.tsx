

import React from 'react';

export default class DieSVG extends React.Component<IDieSVGProps, IDieSVGState> {


    constructor(props: IDieSVGProps) {
        super(props);

        this.state = {
        }

    }

    render = (): React.ReactFragment => {

        let bgColor = "rgb(255,255,255)";
        let strokeColor = "rgb(0,0,0)";
        let pipColor = "rgb(0,0,0)";
        let numberPips = 5;
        let posX = 0;
        let posY = 0;
        let width = 20;

        if( this.props.bgColor ) {
            bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            strokeColor = this.props.strokeColor;
        }

        if( this.props.numberPips ) {
            numberPips = this.props.numberPips;
        }

        if( this.props.posX ) {
            posX = this.props.posX;
        }

        if( this.props.posY ) {
            posY = this.props.posY;
        }

        if( this.props.width ) {
            width = this.props.width;
        }

        if( this.props.pipColor ) {
            pipColor = this.props.pipColor;
        }
        
        let pipRadius = width / 7;

        let pips: React.ReactFragment[] = [];

        switch( numberPips ) {
            case 1:
                // Center Dot.
                pips.push (
                    <circle
                        key={1}
                        cx={posX + width / 5 * 2.5}
                        cy={posY + width / 5 * 2.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )
                    break;
            case 2:
                    // Top Left
                    pips.push (
                        <circle
                            key={1}
                            cx={posX + width / 5 * 1.5}
                            cy={posY + width / 5 * 1.5}
                            r={pipRadius}
                            fill={pipColor}
                            className={this.props.className}
                        />
                    )

                    // Bottom Right
                    pips.push (
                        <circle
                            key={2}
                            cx={posX + width / 5 * 3.5}
                            cy={posY + width / 5 * 3.5}
                            r={pipRadius}
                            fill={pipColor}
                            className={this.props.className}
                        />
                    )
                break;
            case 3: {

                // Center Dot.
                pips.push (
                    <circle
                        key={1}
                        cx={posX + width / 5 * 2.5}
                        cy={posY + width / 5 * 2.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Bottom Left
                pips.push (
                    <circle
                        key={2}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 4}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Top Right
                pips.push (
                    <circle
                        key={3}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 1}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )



                break;
            }
            case 4: {
                // Top Right
                pips.push (

                    <circle
                        key={1}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 1.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )
                // Top Left
                pips.push (
                    <circle
                        key={2}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 1.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Bottom Right
                pips.push (
                    <circle
                        key={3}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 3.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )
                // Bottom Left
                pips.push (
                    <circle
                        key={4}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 3.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )
                break;
            }
            case 5: {

                // Center Dot.
                pips.push (
                    <circle
                        key={1}
                        cx={posX + width / 5 * 2.5}
                        cy={posY + width / 5 * 2.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Top Left
                pips.push (
                    <circle
                        key={2}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 1}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Bottom Left
                pips.push (
                    <circle
                        key={3}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 4}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Bottom Left
                pips.push (
                    <circle
                        key={4}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 1}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                // Bottom Right
                pips.push (
                    <circle
                        key={5}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 4}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )

                break;
            }
            case 0: {
                break;
            }
            case -1: {
                break;
            }
            default: {
                // Left Top
                pips.push (
                    <circle
                    key={1}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 }
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )
                // Left Middle
                pips.push (
                    <circle
                        key={2}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 2.5}
                        r={pipRadius}
                        fill={pipColor}
                        className={this.props.className}
                    />
                )
                // Left Bottom
                pips.push (
                    <circle
                        key={3}
                        className={this.props.className}
                        cx={posX + width / 5 * 1.5}
                        cy={posY + width / 5 * 4}
                        r={pipRadius}
                        fill={pipColor}
                    />
                )

                // Right Top
                pips.push (
                    <circle
                        key={4}
                        className={this.props.className}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 }
                        r={pipRadius}
                        fill={pipColor}
                    />
                )
                // Right Middle
                pips.push (
                    <circle
                        key={5}
                        className={this.props.className}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 2.5}
                        r={pipRadius}
                        fill={pipColor}
                    />
                )
                // Right Bottom
                pips.push (
                    <circle
                        className={this.props.className}
                        key={6}
                        cx={posX + width / 5 * 3.5}
                        cy={posY + width / 5 * 4}
                        r={pipRadius}
                        fill={pipColor}
                    />
                )
                break;
            }

        }

        return (
        <>
            <rect
                x={posX}
                rx={width / 5}
                ry={width / 5}
                y={posY}
                width={width}
                height={width}
                stroke={strokeColor}
                strokeWidth={2}
                fill={bgColor}
                className={this.props.className}
            />
            {typeof(this.props.numberPips) !== "undefined" && (this.props.numberPips < 1 || this.props.numberPips > 6 || this.props.numericPips)  ? (
                <>
                <text
                    fill={pipColor}
                    className={this.props.className}
                    textAnchor="middle"
                    x={posX + this.props.width / 2}
                    y={posY + this.props.width - this.props.width / 5}
                    style={{fontWeight: 700}}
                    fontSize={this.props.width - 5}
                >
                    {this.props.numberPips === -1 ? (
                        <>#</>
                    ) : (
                        <>{this.props.numberPips}</>
                    )}
                    
                </text>
                </>
            ) : (
                <>{pips}</>
            )}
            
        </>
        )

    }

}


interface IDieSVGProps {
    bgColor?: string;
    strokeColor?: string;
    numberPips?: number;
    numericPips?: boolean;
    posX: number;
    posY: number;
    width: number;
    pipColor?: string;
    className?: string;
}

interface IDieSVGState {
}




