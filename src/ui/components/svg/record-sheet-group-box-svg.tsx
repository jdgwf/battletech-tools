
import React from 'react';

export default class RecordSheetGroupBoxSVG extends React.Component<IRecordSheetGroupBoxSVGProps, IRecordSheetGroupBoxSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = 100;
    theHeight = 100;
    xLoc = 0;
    yLoc = 0;
    borderRadius = 15;
	borderWidth = 2;
	textSize = 35;
    labelLeft = 35;
    title = "";
    constructor(props: IRecordSheetGroupBoxSVGProps) {
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

        if( this.props.title ) {
            this.title = this.props.title;
        }
    }

    render = (): React.ReactFragment => {

        // let children: React.ReactFragment[] = [];
        // let thisObject = this;
        // if( this.props.children ) {
        //     // @ts-ignore
        //     children = this.props.children.map(
        //         (item: SVGElement) => {
        //             // @ts-ignore
        //             // @ts-
        //             item.x = thisObject.xLoc;
        //             // @ts-ignore
        //             item.y = thisObject.yLoc;
        //     });
        // }
        return (
            <svg>
        <rect
            rx={this.borderRadius}
            ry={this.borderRadius}
            x={this.xLoc}
            y={this.yLoc + ( this.textSize + 5 ) / 2}
            width={this.theWidth}
            height={this.theHeight}
            fill={this.strokeColor}
            onClick={this.props.onClick}
            className={this.props.onClick ? "cursor-pointer" : ""}
        />
        <rect
            rx={this.borderRadius}
            ry={this.borderRadius}
            x={this.xLoc + this.borderWidth}
            y={this.yLoc + ( this.textSize + 5 ) / 2 + this.borderWidth}
            width={this.theWidth - this.borderWidth * 2}
            height={this.theHeight - this.borderWidth * 2}
            fill={this.bgColor}
            onClick={this.props.onClick}
        />

	{this.title ? (
        <>
            <rect
                rx={this.borderRadius}
                ry={this.borderRadius}
                x={this.labelLeft + this.xLoc}
                y={this.yLoc}
                width={this.theWidth - this.labelLeft * 2}
                height={this.textSize + 5}
                fill={this.strokeColor}
                onClick={this.props.onClick}
                className={this.props.onClick ? "cursor-pointer" : ""}
            />
            <text
                rx={this.borderRadius}
                ry={this.borderRadius}
                x={this.xLoc +  this.theWidth / 2}
                y={this.yLoc + this.textSize - 3}
                fontFamily="sans-serif"
                fill={this.bgColor}
                textAnchor="middle"
                fontSize={this.textSize}
                onClick={this.props.onClick}
                className={this.props.onClick ? "cursor-pointer" : ""}
            >
                {this.title.toUpperCase()}
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