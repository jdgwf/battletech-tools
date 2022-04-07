import React from 'react';
import { BattleMech } from "../../../classes/battlemech";
import { getTargetColor } from '../../../utils';

export default class TargetSelectSVG extends React.Component<ITargetSelectSVGProps, ITargetSelectSVGState> {
  

    constructor(props: ITargetSelectSVGProps) {
        super( props );
    }

    render = (): React.ReactFragment => {
        return (
            <svg 
                x={this.props.x}
                y={this.props.y}
                width={this.props.width}
                height={this.props.height}
                onClick={this.props.onClick}
                className={this.props.onClick ? "cursor-pointer" : ""}
            >
                <text
                    x={10}
                    y={30}
                    
                    textAnchor="start"

                    onClick={this.props.onClick}
                    className={this.props.onClick ? "cursor-pointer" : ""}
                >
                    <tspan
                        fontSize={30}
                        fontWeight={700}
                        fill={getTargetColor(this.props.target)}
                    >
                        Target {this.props.target.toUpperCase()}:&nbsp;
                    </tspan>
                {this.props.mechData.getTargetSummaryText(this.props.target)}
                </text>
                
            </svg>
        )
    }
}

interface ITargetSelectSVGProps {
    x: number;
    y: number;
    width: number;
    height: number;
    target: string;
    mechData: BattleMech;
    onClick?(): void;
    // landscape?: boolean;
    // itemIDField
}

interface ITargetSelectSVGState {
}