
import React from 'react';
import SVGGroupBox from './SVGGroupBox';

export default class BattleMechSVG extends React.Component<IBattleMechSVGProps, IBattleMechSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";

    constructor(props: IBattleMechSVGProps) {
        super(props);

        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

    }

    render() {
        // TODO
        return <>
        <SVGGroupBox>
            <button>Test</button> 
        </SVGGroupBox>
        </>
    }

}


interface IBattleMechSVGProps {
    bgColor?: string;
    strokeColor?: string;

}

interface IBattleMechSVGState {
}