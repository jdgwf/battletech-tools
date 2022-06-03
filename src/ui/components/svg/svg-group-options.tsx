
import React from 'react';

export default class SVGGroupBox extends React.Component<ISVGGroupBoxProps, ISVGGroupBoxState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = "100px";
    theHeight = "100px";
    xLoc = "0px";
    yLoc = "0px";

    constructor(props: ISVGGroupBoxProps) {
        super(props);

        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        if( this.props.width ) {
            this.theWidth = this.props.width;
        }

        if( this.props.height ) {
            this.theHeight = this.props.height;
        }

        if( this.props.xLoc  ) {
            this.xLoc = this.props.xLoc;
        }

        if( this.props.yLoc ) {
            this.yLoc = this.props.yLoc;
        }
    }

    render = (): JSX.Element => {
        return <div className="fieldset">
            {this.props.children}
        </div>
    }

}

interface ISVGGroupBoxProps {
    bgColor?: string;
    strokeColor?: string;

    width?: string;
    height?: string;

    xLoc?: string;
    yLoc?: string;
    children?: React.ReactNode | React.ReactNode[];
}

interface ISVGGroupBoxState {
}