
import React from 'react';

export default class QuadRearArmorDiagramSVG extends React.Component<IQuadRearArmorDiagramSVGProps, IQuadRearArmorDiagramSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = 744;
    theHeight = 627;
    xLoc = 0;
    yLoc = 0;
    // baseWidth = 744.09448819;
    // baseHeight = 1052.3622047;
    baseWidth = 744.09449;
	baseHeight = 627.16514;
    constructor(props: IQuadRearArmorDiagramSVGProps) {
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
            this.theHeight = Math.round( this.props.width / this.baseWidth * this.baseHeight );

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

    render = (): React.Element => {

        // var svg = "";

        // if( standAlone ) {
        //     var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

        return (
            <svg
                viewBox={"0 0 " + this.baseWidth + " " + this.baseHeight}
                y={this.yLoc}
                x={this.xLoc}
                width={this.theWidth}
                height={this.theHeight}
                id="rearArmor"
                version="1.1"
            >
                <g>
                    <g
                        id="layer1"
                        transform="translate(0,-644.88234)"
                    >
                        <path
                            d="m 265.36232,1037.1616 0,-10.0738 -71.77633,0 -71.77633,0 -0.0474,-13.222 c -0.0463,-12.9686 -0.91498,-14.4959 -45.332356,-79.71325 -27.50884,-40.39079 -45.28509,-68.85307 -45.28509,-72.5079 0,-4.44137 20.86835,-28.0782 79.708726,-90.28328 l 79.70875,-84.26673 37.4,0 37.40003,0 0,-8.81464 0,-8.81463 110.81257,0 110.81258,0 0,8.81463 0,8.81464 37.36452,0 37.36451,0 79.74424,84.3872 c 57.33115,60.66915 79.74423,86.02416 79.74423,90.21137 0,3.40499 -18.82567,33.47222 -45.32318,72.38741 -44.52661,65.39338 -45.32332,66.79568 -45.33242,79.78518 l -0.009,13.222 -71.77633,0 -71.77633,0 0,10.0738 0,10.0739 -110.81258,0 -110.81257,0 0,-10.0739 z m 214.06975,-178.81115 0,-181.32968 -103.25718,0 -103.25717,0 0,181.32968 0,181.32965 103.25717,0 103.25718,0 0,-181.32965 z m -214.06975,-1.25924 0,-162.44117 -36.18442,0 -36.18441,0 -76.51702,80.9758 c -42.084336,44.53669 -76.877696,83.05808 -77.318536,85.60311 -0.47692,2.75329 17.62719,31.6857 44.70281,71.44017 40.183046,58.99976 45.504316,67.98518 45.504316,76.83798 l 0,10.0253 67.99863,0 67.99863,0 0,-162.44119 z m 357.62241,152.15589 c 0,-9.1951 4.80508,-17.32194 45.33242,-76.67081 24.93283,-36.51204 45.33242,-68.20973 45.33242,-70.43935 0,-2.22963 -34.75299,-40.82629 -77.22889,-85.77038 l -77.22889,-81.71652 -36.10216,0 -36.10216,0 0,162.44117 0,162.44119 67.99863,0 67.99863,0 0,-10.2853 z"
                            id="path5898"
                            style={{fill: this.strokeColor}}
                        ></path>
                    </g>
                </g>
            </svg>
        );
    }
}

interface IQuadRearArmorDiagramSVGProps {
    bgColor?: string;
    strokeColor?: string;

    yLoc?: number;
    xLoc?: number;

    width?: number;
}

interface IQuadRearArmorDiagramSVGState {
}