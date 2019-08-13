import React from 'react';
import { BattleMech } from "../../../Classes/BattleMech";
import RecordSheetGroupBoxSVG from './RecordSheetGroupBoxSVG';
import DamageCircleSVG from './DamageCircleSVG';

export default class HeatSinksSVG extends React.Component<IHeatSinksSVGProps, IHeatSinksSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;


    colorTan = "#fdfde3";

    constructor(props: IHeatSinksSVGProps) {
        super( props );
        this.state = {

        };
    }

    render() {

    let heatSinkDots: React.ReactFragment[] = [];

	let lineHeight = 27;

	let hsCounter = 0;
	let lCounter = 0;

	let numHeatSinks = this.props.mechData.getHeatSinks();

	let armorBubbleRadius = 15;
	let hsTop = 185;
	let hsLeft = 100;

	let distanceFromCenter = 65;

	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);


	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);



	lCounter++;
	lCounter++;
	if( numHeatSinks >= 41 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 42 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 43 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 44 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	lCounter++;
	if( numHeatSinks >= 45 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 46 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 47 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 48 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.props.mechData.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);


        return (
            <RecordSheetGroupBoxSVG
            yLoc={this.props.yLoc}
            xLoc={this.props.xLoc}
            height={this.props.height}
            width={this.props.width}
            title="Sinks"
        >

		<text x={this.props.xLoc + 205 / 2} y={this.props.yLoc + 75 + lineHeight * 0} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={ lineHeight - 6}>HEAT SINKS</text>\n";
		<text x={this.props.xLoc + 205 / 2} y={this.props.yLoc + 75 + lineHeight * 2} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={ lineHeight * 2}>{this.props.mechData.getHeatSinks()}</text>\n";

		<text x={this.props.xLoc + 205 / 2} y={this.props.yLoc + 75 + lineHeight * 3} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 500}} fontSize={ lineHeight - 6}>{this.props.mechData.getHeatSinksObj().name}</text>\n";

            {heatSinkDots}
        </RecordSheetGroupBoxSVG>
        )
    }
}

interface IHeatSinksSVGProps {
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

interface IHeatSinksSVGState {
}