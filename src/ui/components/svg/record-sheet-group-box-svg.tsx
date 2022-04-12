
import React from 'react';

export default class RecordSheetGroupBoxSVG extends React.Component<IRecordSheetGroupBoxSVGProps, IRecordSheetGroupBoxSVGState> {

    render = (): React.ReactFragment => {
        let bgColor = "rgb(255,255,255)";
        let strokeColor = "rgb(0,0,0)";
        let theWidth = 100;
        let theHeight = 100;
        let xLoc = 0;
        let yLoc = 0;
        let borderRadius = 15;
        let borderWidth = 2;
        let textSize = 35;
        let labelLeft = 35;
        let title = "";

        if( this.props.bgColor ) {
            bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            strokeColor = this.props.strokeColor;
        }

        if( this.props.width ) {
            theWidth = this.props.width;
        }

        if( this.props.height ) {
            theHeight = this.props.height;
        }

        if( this.props.xLoc  ) {
            xLoc = this.props.xLoc;
        }

        if( this.props.yLoc ) {
            yLoc = this.props.yLoc;
        }

        if( this.props.title ) {
            title = this.props.title;
        }

        return (
            <svg>
        <rect
            rx={borderRadius}
            ry={borderRadius}
            x={xLoc}
            y={yLoc + ( textSize + 5 ) / 2}
            width={theWidth}
            height={theHeight}
            fill={strokeColor}
            onClick={this.props.onClick}
            className={this.props.onClick ? "cursor-pointer" : ""}
        />
        <rect
            rx={borderRadius}
            ry={borderRadius}
            x={xLoc + borderWidth}
            y={yLoc + ( textSize + 5 ) / 2 + borderWidth}
            width={theWidth - borderWidth * 2}
            height={theHeight - borderWidth * 2}
            fill={bgColor}
            onClick={this.props.onClick}
            className={this.props.onClick ? "cursor-pointer" : ""}
        />

	{title ? (
        <>
            <rect
                rx={borderRadius}
                ry={borderRadius}
                x={labelLeft + xLoc}
                y={yLoc}
                width={theWidth - labelLeft * 2}
                height={textSize + 5}
                fill={strokeColor}
                onClick={this.props.onClick}
                className={this.props.onClick ? "cursor-pointer" : ""}
            />
            <text
                rx={borderRadius}
                ry={borderRadius}
                x={xLoc +  theWidth / 2}
                y={yLoc + textSize - 3}
                fontFamily="sans-serif"
                fill={bgColor}
                textAnchor="middle"
                fontSize={textSize}
                onClick={this.props.onClick}
                className={this.props.onClick ? "cursor-pointer" : ""}
            >
                {title.toUpperCase()}
                {this.props.subTitle && this.props.subTitle.trim() ? (
                    <>&nbsp;{this.props.subTitle}</>
                ) : null}
            </text>
        </>
    ) : (
        <></>
    )}
               {this.props.children}
            </svg>
        )
    }

}

interface IRecordSheetGroupBoxSVGProps {
    bgColor?: string;
    strokeColor?: string;

    width: number;
    height: number;

    xLoc: number;
    yLoc: number;

    title?: string;
    subTitle?: string;
    onClick?(): void;

}

interface IRecordSheetGroupBoxSVGState {
}