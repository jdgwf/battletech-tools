import React from 'react';
import { BattleMech } from "../../../classes/battlemech";
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class BattleMechHeatEffectsBoxSVG extends React.Component<IBattleMechHeatEffectsBoxSVGProps, IBattleMechHeatEffectsBoxSVGState> {


    constructor(props: IBattleMechHeatEffectsBoxSVGProps) {
        super( props );
        this.state = {

        };
    }

    render = (): React.ReactFragment => {

        let effectsTable: React.ReactFragment[] = [];


	// Heat Effects....
	// let this.props.yLoc = 1885;
	// let this.props.xLoc = 1240;
	// svgCode += createRSGroupBox( "Heat Effects", this.props.xLoc, this.props.yLoc, 575, 435);
	let col1Loc = 70;
	let col2Loc = 90;

	let hCounter = 0;
	let lineHeight = 27;


	let bgColor = "rgb(255,255,255)";
    let strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    let inPlay: boolean = false;


	if( this.props.inPlay ) {
		inPlay = true;
	}
	if( this.props.bgColor ) {
		bgColor = this.props.bgColor;
	}
	if( this.props.strokeColor ) {
		strokeColor = this.props.strokeColor;
	}

	effectsTable.push(<text key={hCounter.toString() + "a"} x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={lineHeight - 6}>HEAT</text>);
	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"} x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={lineHeight - 6}>LEVEL</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"} x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={lineHeight - 6}>EFFECTS</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"} x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>30</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"} x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Shutdown</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"} x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>28</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"} x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Ammo Exp. Avoid on 8+</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"} x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>26</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"} x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Shutdown Avoid on 10+</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"} x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>25</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>-5 Movement Points</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>24</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>+4 Modifier to Fire</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>23</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Ammo Exp. Avoid on 6+</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>22</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Shutdown Avoid on 8+</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>20</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>-4 Movement Points</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>19</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Ammo Exp. Avoid on 4+</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>18</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Shutdown Avoid on 6+</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>17</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>+3 Modifier to Fire</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>15</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>-3 Movement Points</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>14</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>Shutdown Avoid on 4+</text>);


	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>13</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>+2 Modifier to Fire</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>10</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>-2 Movement Points</text>);


	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>8</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>+1 Modifier to Fire</text>);

	hCounter++;
	effectsTable.push(<text key={hCounter.toString() + "a"}  x={this.props.xLoc + col1Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="end" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>5</text>);
	effectsTable.push(<text key={hCounter.toString() + "b"}  x={this.props.xLoc + col2Loc + 20} y={this.props.yLoc + 75 + lineHeight * hCounter} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={lineHeight - 3}>-1 Movement Points</text>);


        return (
            <RecordSheetGroupBoxSVG
            yLoc={this.props.yLoc}
            xLoc={this.props.xLoc}
            height={this.props.height}
            width={this.props.width}
            title="Heat Effects"
			bgColor={bgColor}
        >
            {effectsTable}
        </RecordSheetGroupBoxSVG>
        )
    }
}

interface IBattleMechHeatEffectsBoxSVGProps {
    bgColor?: string;
    strokeColor?: string;
    mechData: BattleMech;
    inPlay?: boolean;
    xLoc: number;
    yLoc: number;
    height: number;
    width: number;
    // landscape?: boolean;
    // itemIDField
}

interface IBattleMechHeatEffectsBoxSVGState {
}