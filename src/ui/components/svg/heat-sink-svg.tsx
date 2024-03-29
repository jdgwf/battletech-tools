import React from 'react';
import { BattleMech } from "../../../classes/battlemech";
import DamageCircleSVG from './damage-circle-svg';
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class HeatSinksSVG extends React.Component<IHeatSinksSVGProps, IHeatSinksSVGState> {

    constructor(props: IHeatSinksSVGProps) {
        super( props );
        this.state = {

		};

	}

	toggleHeatBubble = (shortLoc: string, indexNumnber: number): void => {
		if( this.props.inPlay ) {
			this.props.mechData.toggleHeatBubble(shortLoc, indexNumnber);
		}
	}

    render = (): JSX.Element => {

    let heatSinkDots: JSX.Element[] = [];

	let lineHeight = 27;

	let hsCounter = 0;
	let lCounter = 0;

	let numHeatSinks = this.props.mechData.getHeatSinks();

	let armorBubbleRadius = 15;
	let hsTop = 185;
	let hsLeft = 100;

	let distanceFromCenter = 65;

	let bgColor = "rgb(255,255,255)";
    let strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;

	if( this.props.bgColor ) {
		bgColor = this.props.bgColor;
	}
	if( this.props.strokeColor ) {
		strokeColor = this.props.strokeColor;
	}

	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	hsCounter++;
	lCounter++;
	if( numHeatSinks >= 1 + hsCounter + 20 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 0 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 10 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 1 + hsCounter + 30 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	lCounter++;
	lCounter++;
	if( numHeatSinks >= 41 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 42 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 43 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 44 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);

	lCounter++;
	if( numHeatSinks >= 45 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 46 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 - armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 47 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 1.25 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
			clickIndex={hsCounter}
 			isFilled={this.props.mechData.heatSinkIsFilled(hsCounter)}
		/>);
	if( numHeatSinks >= 48 )

		heatSinkDots.push(<DamageCircleSVG
			key={heatSinkDots.length} inPlay={this.props.inPlay}
			xLoc={this.props.xLoc + hsLeft + this.props.width / 2 + armorBubbleRadius * 4 - distanceFromCenter}
			yLoc={this.props.yLoc + hsTop + armorBubbleRadius * lCounter * 2}
			radius={armorBubbleRadius}
			clickFunction={this.toggleHeatBubble}
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
			bgColor={bgColor}
			strokeColor={strokeColor}
        >

		<text x={this.props.xLoc + 205 / 2} y={this.props.yLoc + 75 + lineHeight * 0} textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={ lineHeight - 6}>HEAT SINKS</text>\n";
		<text x={this.props.xLoc + 205 / 2} y={this.props.yLoc + 75 + lineHeight * 2} textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={ lineHeight * 2}>{this.props.mechData.getHeatSinks()}</text>\n";

		<text x={this.props.xLoc + 205 / 2} y={this.props.yLoc + 75 + lineHeight * 3} textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 500}} fontSize={ lineHeight - 6}>{this.props.mechData.getHeatSinksObj().name}</text>\n";

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