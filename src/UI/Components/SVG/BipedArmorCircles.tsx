
import React from 'react';
import { BattleMech } from '../../../Classes/BattleMech';
import DamageCircleSVG from './DamageCircleSVG';

export default class BipedArmorCircles extends React.Component<IBipedArmorCirclesProps, IBipedArmorCirclesState> {
    armorBoxTop = 0;
    armorBoxLeft = 0;
    armorBoxWidth = 0;

    constructor(props: IBipedArmorCirclesProps) {
        super(props);

        this.toggleArmorBubble = this.toggleArmorBubble.bind(this);
        this.armorBoxWidth = this.props.armorBoxWidth;
        this.armorBoxLeft = this.props.armorBoxLeft;
        this.armorBoxTop = this.props.armorBoxTop;
    }

    toggleArmorBubble( shortLoc: string, indexNumnber: number) {
		if( this.props.inPlay ) {
			this.props.mechData.toggleArmorBubble(shortLoc, indexNumnber);
		}
    }
    render() {
        return (
            <>

        {/* Head Armor */}
        {this.props.mechData.getArmorAllocation().head > 0 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 - 35} yLoc={this.armorBoxTop + 200} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={0} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}
        {this.props.mechData.getArmorAllocation().head > 1 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 - 0} yLoc={this.armorBoxTop + 200} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={1} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}
        {this.props.mechData.getArmorAllocation().head > 2 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 + 35} yLoc={this.armorBoxTop + 200} radius={15} inPlay={this.props.inPlay}  clickLocation="hd" clickIndex={2} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}

        {this.props.mechData.getArmorAllocation().head > 3 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 - 35} yLoc={this.armorBoxTop + 240} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={3} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}
        {this.props.mechData.getArmorAllocation().head > 4 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 + 0} yLoc={this.armorBoxTop + 240} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={4} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}
        {this.props.mechData.getArmorAllocation().head > 5 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 + 35} yLoc={this.armorBoxTop + 240} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={5} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}

        {this.props.mechData.getArmorAllocation().head > 6 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 - 35} yLoc={this.armorBoxTop + 280} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={6} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}
        {this.props.mechData.getArmorAllocation().head > 7 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 + 0} yLoc={this.armorBoxTop + 280} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={7} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}
        {this.props.mechData.getArmorAllocation().head > 8 ? (<><DamageCircleSVG xLoc={this.armorBoxLeft + this.armorBoxWidth / 2 + 35} yLoc={this.armorBoxTop + 280} radius={15} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={8} clickFunction={this.toggleArmorBubble} /></>) : (<></>)}


        {/* TODO Center Torso Rear Armor */}
        {/* TODO Right Torso Rear Armor */}
        {/* TODO Left Torso Rear Armor */}
            </>
        )
    }
}

interface IBipedArmorCirclesProps {
    bgColor?: string;
    strokeColor?: string;

    mechData: BattleMech;
    inPlay?: boolean;

    armorBoxTop: number;
    armorBoxLeft: number;
    armorBoxWidth: number;

}

interface IBipedArmorCirclesState {
}