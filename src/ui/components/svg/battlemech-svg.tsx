
import React from 'react';
import { BattleMech } from '../../../classes/battlemech';
import BattleTechLogo from '../battletech-logo';
import BattleMechHeatEffectsBoxSVG from './battlemech-heat-effects-box-svg';
import BipedArmorCircles from './biped-armor-circles';
import BipedArmorDiagramSVG from './biped-armor-diagram';
import BipedDamageTransferDiagramSVG from './biped-damage-transfer-diagram-svg';
import BipedInternalStructureDiagramSVG from './biped-internal-structure-diagram-svg';
import BipedRearArmorDiagramSVG from './biped-rear-armor-diagram-svg';
import ComponentDamageSVG from './component-damage-svg';
import CritAllocationTableSVG from './crot-allocation-table-svg';
import DamageCircleSVG from './damage-circle-svg';
import DieSVG from './die-svg';
import HeatSinksSVG from './heat-sink-svg';
import HeatTrackSVG from './heat-track-svg';
import PilotHitTrackSVG from './pilot-hit-track-svg';
import QuadArmorCircles from './quad-armor-circles';
import QuadArmorDiagramSVG from './quad-armor-diagram-svg';
import QuadDamageTransferDiagramSVG from './quad-damage-transfer-diagram-svg';
import QuadInternalStructureDiagramSVG from './quad-internal-structure-damage-svg';
import QuadRearArmorDiagramSVG from './quad-rear-armor-diagram-svg';
import RecordSheetEquipmentTable from './record-sheet-equipment-table';
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class BattleMechSVG extends React.Component<IBattleMechSVGProps, IBattleMechSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    docWidth = 2000;
    docHeight = 2600;

    colorTan = "#fdfde3";


    armorBoxLeft = 1240
    armorBoxWidth = 745
    armorBoxTop = 10


    isBoxLeft = 1250;
    isBoxWidth =655;
    isBoxTop = 1250;

    isQuadCenterAdjust = 0;

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
        // if( this.props.landscape ) {
        //     this.landscape = this.props.landscape;
        // }
        if( this.props.inPlay ) {
            this.inPlay = this.props.inPlay;
        }

    }

    toggleISBubble = ( shortLoc: string, indexNumnber: number): void => {
		if( this.props.inPlay ) {
			this.props.mechData.toggleISBubble(shortLoc, indexNumnber);
		}
    }



    render() {
        let generalDataBoxX = 10;
        let generalDataBoxY = 10;

        let pilotBoxX = 725;
        let pilotBoxY = 160;

        let eraString = this.props.mechData.getEra().name;
        let eraArray = eraString.split("(");
        let eraLine1 = eraArray[0];
        let eraLine2 = "";
        if( eraArray[1] ) {
            eraLine2 = eraArray[1];
            eraLine2 = eraLine2.replace(")", "");
            eraLine2 = eraLine2.replace("(", "");
        }
        eraLine1 = eraLine1.trim();
        eraLine2 = eraLine2.trim();

        let battleValue = this.props.mechData.getBattleValue().toString();
        if( battleValue !== this.props.mechData.getPilotAdjustedBattleValue().toString() )
            battleValue = battleValue + " (" + this.props.mechData.getPilotAdjustedBattleValue() + ")";

        let critBoxTop = 1250;
        let critBoxLeft = 10;
        let critBoxWidth = 1225;
        let damageTransferWidth = 150;

        let critCol1Start = 125;
        let critCol2Start = 513;
        let critCol3Start = 925;

        return (
        <>
        <svg
            version="1.1"
            x={0}
            y={0}
            viewBox={"0 0 " + this.docWidth  + " " + this.docHeight }
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>

                <rect
                    x={0}
                    y={0}
                    width={this.docWidth}
                    height={this.docHeight}
                    fill={this.bgColor}
                />

                <RecordSheetGroupBoxSVG
                    width={700}
                    height={400}
                    xLoc={generalDataBoxX}
                    yLoc={generalDataBoxY}
                    title="'Mech Data"
                    bgColor={this.bgColor}
                    strokeColor={this.strokeColor}
                >
                    <text
                        x={10 + generalDataBoxX}
                        y={80 + generalDataBoxY}
                        textAnchor="start"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Type:
                    </text>


                    <text
                        x={10 + generalDataBoxX}
                        y={120 + generalDataBoxY}
                        textAnchor="start"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={35}
                    >
                        {this.props.mechData.getName()}
                    </text>



                    {/* // Movement */}
                    <text
                        x={generalDataBoxX + 15}
                        y={generalDataBoxY + 160}
                        textAnchor="start"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Movement Points
                    </text>

                    {/* // Walk */}
                    <text
                        x={generalDataBoxX + 220}
                        y={generalDataBoxY + 210}
                        textAnchor="end"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Walking:
                    </text>
                    <text
                        x={generalDataBoxX + 240}
                        y={generalDataBoxY + 210}
                        textAnchor="start" fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={30}
                    >
                        {this.props.mechData.getWalkSpeed()}
                    </text>
                    <DieSVG
                        posY={ generalDataBoxY + 210 - 25}
                        posX={generalDataBoxX + 20}
                        strokeColor="#000000"
                        bgColor="#ffffff"
                        pipColor="#000000"
                        width={30}
                        numberPips={1}
                    />

                    {/* // Run */}
                    <text
                        x={generalDataBoxX + 220}
                        y={generalDataBoxY + 245}
                        textAnchor="end" fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Running
                    </text>
                    <text
                    x={generalDataBoxX + 240}
                    y={generalDataBoxY + 245}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={30}
                    >
                        {this.props.mechData.getRunSpeed()}
                    </text>

                    <DieSVG
                        posY={ generalDataBoxY + 245 - 25}
                        posX={generalDataBoxX + 20}
                        strokeColor="#000000"
                        bgColor="#000000"
                        pipColor="#ffffff"
                        width={30}
                        numberPips={2}
                    />
                    {/* // Jump */}
                    <text
                        x={generalDataBoxX + 220}
                        y={generalDataBoxY + 280}
                        textAnchor="end"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Jumping
                    </text>
                    <text
                        x={generalDataBoxX + 240}
                        y={generalDataBoxY + 280}
                        textAnchor="start"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={30}
                    >
                        {this.props.mechData.getJumpSpeed()}
                    </text>

                    <DieSVG
                        posY={ generalDataBoxY + 280 - 25}
                        posX={generalDataBoxX + 20}
                        strokeColor="#cc0000"
                        bgColor="#cc0000"
                        pipColor="#ffffff"
                        width={30}
                        numberPips={3}
                    />


                {/* // Tonnage */}
                <text
                    x={generalDataBoxX + 340}
                    y={generalDataBoxY + 160}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={25}>
                    Tonnage:
                </text>
                <text
                    x={generalDataBoxX + 665}
                    y={generalDataBoxY + 160}
                    textAnchor="end"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={25}
                    >
                        {this.props.mechData.getTonnage()}
                    </text>

                {/* Tech Base */}
                <text
                    x={generalDataBoxX + 340}
                    y={generalDataBoxY + 205}
                    textAnchor="start" fontFamily="sans-serif"
                    fill={this.strokeColor} style={{fontWeight: 700}}
                    fontSize={25}
                >
                    Tech Base:
                </text>
                <text
                    x={generalDataBoxX + 665}
                    y={generalDataBoxY + 225}
                    textAnchor="end" fontFamily="sans-serif"
                    fill={this.strokeColor} style={{fontWeight: 500}}
                    fontSize={25}
                >
                    {this.props.mechData.getTech().name}
                </text>

                <text

                    x={generalDataBoxX + 340}
                    y={generalDataBoxY + 255}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={25}
                >
                    Era:
                </text>

                <text
                    x={generalDataBoxX + 665}
                    y={generalDataBoxY + 280}
                    textAnchor="end"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={20}
                >{eraLine1}</text>
                <text
                    x={generalDataBoxX + 665}
                    y={generalDataBoxY + 300}
                    textAnchor="end"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={20}
                >{eraLine2}</text>


                {/* // Cost */}
                <text
                    x={generalDataBoxX + 15}
                    y={generalDataBoxY + 350}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={30}
                    >
                        Cost (CBills)
                    </text>
                <text
                    x={generalDataBoxX + 15}
                    y={generalDataBoxY + 380}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={25  }
                >
                    {this.props.mechData.getCBillCost()}
                </text>
	            {/* // BV */}
                <text
                    x={generalDataBoxX + 340}
                    y={generalDataBoxY + 350}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={30}
                >
                    BattleValue (BV2)
                </text>


            <text
                x={generalDataBoxX + 340}
                y={generalDataBoxY + 380}
                textAnchor="start"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 500}}
                fontSize={25}
            >
                {battleValue}
            </text>

                </RecordSheetGroupBoxSVG>





    <text
        x={this.docWidth / 2 - 25}
        y={80}
        textAnchor="middle"
        fontFamily="sans-serif"
        fill={this.strokeColor}
        style={{fontWeight: 700}}
        fontSize={65}
    >
        BATTLEMECH
    </text>
    <text
        x={this.docWidth / 2 - 25}
        y={120}
        textAnchor="middle"
        fontFamily="sans-serif"
        fill={this.strokeColor}
        style={{fontWeight: 700}}
        fontSize={35}
    >
        Record Sheet
    </text>


    <RecordSheetGroupBoxSVG
        width={500}
        height={250}
        xLoc={pilotBoxX}
        yLoc={pilotBoxY}
        title="Warrior Data"
        bgColor={this.bgColor}
        strokeColor={this.strokeColor}
    >
        	{/* // Name/Type */}
            <text
                x={pilotBoxX + 10}
                y={pilotBoxY + 80}
                textAnchor="start"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 500}}
                fontSize={25}
            >
                {this.props.mechData.getPilot().name}
            </text>

	{/* Piloting */}
            <text
                x={pilotBoxX + 450}
                y={pilotBoxY + 120}
                textAnchor="end"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 500}}
                fontSize={35}
            >
                Piloting: {this.props.mechData.getPilot().piloting}
            </text>

	        {/* Gunnery */}
            <text
                x={pilotBoxX + 450}
                y={pilotBoxY + 160}
                textAnchor="end"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 500}}
                fontSize={35}
            >
                Gunnery: {this.props.mechData.getPilot().gunnery}
            </text>

            <PilotHitTrackSVG
                width={500}
                height={250}
                xLoc={pilotBoxX + 100}
                yLoc={pilotBoxY + 200}
                bgColor={this.bgColor}
                strokeColor={this.strokeColor}
                pilot={this.props.mechData.getPilot()}
            />

    </RecordSheetGroupBoxSVG>


    <RecordSheetEquipmentTable
        width={1215}
        height={770}
        xLoc={10}
        yLoc={440}
        mechData={this.props.mechData}
    />


    <RecordSheetGroupBoxSVG
        width={this.armorBoxWidth}
        height={1200}
        xLoc={this.armorBoxLeft}
        yLoc={this.armorBoxTop}
        title="Armor Diagram"
    >
    {this.props.mechData.getMechType().tag === "biped" ? (
        <>
            <BipedArmorDiagramSVG
                xLoc={1263}
                yLoc={-10}
                width={700}
            />

            <BipedRearArmorDiagramSVG
                xLoc={1413}
                yLoc={875}
                width={400}
            />



        {/* Main Armor Labels */}
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2} y={this.armorBoxTop + 70} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>HEAD [{this.props.mechData.getArmorAllocation().head }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 55} y={this.armorBoxTop + 95} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 85} y={this.armorBoxTop + 115} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>[{this.props.mechData.getArmorAllocation().leftTorso }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 55} y={this.armorBoxTop + 95} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 85} y={this.armorBoxTop + 115} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>[{this.props.mechData.getArmorAllocation().rightTorso }]</text>


		<text x={this.armorBoxLeft +  20} y={this.armorBoxTop + 620} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT</text>
		<text x={this.armorBoxLeft +  20} y={this.armorBoxTop + 640} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>ARM [{this.props.mechData.getArmorAllocation().leftArm }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth - 40} y={this.armorBoxTop + 620} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth - 40} y={this.armorBoxTop + 640} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>ARM [{this.props.mechData.getArmorAllocation().rightArm }]</text>

		<text x={this.armorBoxLeft +  20} y={this.armorBoxTop + 890} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT</text>
		<text x={this.armorBoxLeft +  20} y={this.armorBoxTop + 910} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEG [{this.props.mechData.getArmorAllocation().leftLeg }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth - 20} y={this.armorBoxTop + 890} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth - 20} y={this.armorBoxTop + 910} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEG [{this.props.mechData.getArmorAllocation().rightLeg }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2  } y={this.armorBoxTop + 600} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>CENTER</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 } y={this.armorBoxTop + 620} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 } y={this.armorBoxTop + 640} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>[{this.props.mechData.getArmorAllocation().centerTorso })</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 } y={this.armorBoxTop + 1215} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>CENTER TORSO (REAR) [{this.props.mechData.getArmorAllocation().centerTorsoRear }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 190} y={this.armorBoxTop + 1090} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 190} y={this.armorBoxTop + 1110} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>(REAR) [{this.props.mechData.getArmorAllocation().leftTorsoRear }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 190} y={this.armorBoxTop + 1090} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 190} y={this.armorBoxTop + 1110} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>(REAR) [{this.props.mechData.getArmorAllocation().rightTorsoRear }]</text>
            <BipedArmorCircles
                armorBoxLeft={this.armorBoxLeft}
                armorBoxWidth={this.armorBoxWidth}
                armorBoxTop={this.armorBoxTop}
                inPlay={this.props.inPlay}
                mechData={this.props.mechData}
            />
        </>
    ) : (
        <>

            <QuadArmorDiagramSVG
                xLoc={this.armorBoxLeft + 55}
                yLoc={this.armorBoxTop + 50}
                width={640}
            />

            <QuadRearArmorDiagramSVG
                xLoc={this.armorBoxLeft + 170}
                yLoc={this.armorBoxTop + 970}
                width={400}
            />


        {/* // Main Armor Labels */}
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 } y={this.armorBoxTop + 125} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>HEAD [{ this.props.mechData.getArmorAllocation().head }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 95} y={this.armorBoxTop + 105} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 125 } y={this.armorBoxTop + 125} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>[{ this.props.mechData.getArmorAllocation().leftTorso }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 95 } y={this.armorBoxTop + 105} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 125 } y={this.armorBoxTop + 125} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>[{ this.props.mechData.getArmorAllocation().rightTorso }]</text>

		<text x={this.armorBoxLeft +  this.armorBoxWidth / 2 - 280 } y={this.armorBoxTop + 970} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>FRONT</text>
		<text x={this.armorBoxLeft +  this.armorBoxWidth / 2 - 280 } y={this.armorBoxTop + 990} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT</text>
		<text x={this.armorBoxLeft +  this.armorBoxWidth / 2 - 280 } y={this.armorBoxTop + 1010} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEG [{ this.props.mechData.getArmorAllocation().leftArm }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 280 } y={this.armorBoxTop + 970} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>FRONT</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 280 } y={this.armorBoxTop + 990} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 280 } y={this.armorBoxTop + 1010} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEG [{ this.props.mechData.getArmorAllocation().rightArm }]</text>

		<text x={this.armorBoxLeft +  this.armorBoxWidth / 2 - 110 } y={this.armorBoxTop + 935} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>REAR</text>
		<text x={this.armorBoxLeft +  this.armorBoxWidth / 2 - 110 } y={this.armorBoxTop + 955} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT</text>
		<text x={this.armorBoxLeft +  this.armorBoxWidth / 2 - 110 } y={this.armorBoxTop + 975} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEG [{ this.props.mechData.getArmorAllocation().leftLeg }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 110 } y={this.armorBoxTop + 935} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>REAR</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 110 } y={this.armorBoxTop + 955} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 110 } y={this.armorBoxTop + 975} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEG [{ this.props.mechData.getArmorAllocation().rightLeg }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 10  } y={this.armorBoxTop + 600} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={17}>CENTER</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 10  } y={this.armorBoxTop + 620} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={17}>TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 10  } y={this.armorBoxTop + 640} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={17}>[{ this.props.mechData.getArmorAllocation().centerTorso })</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2  } y={this.armorBoxTop + 1210} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>CENTER TORSO (REAR) [{ this.props.mechData.getArmorAllocation().centerTorsoRear }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 190 } y={this.armorBoxTop + 1090} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>LEFT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 - 190 } y={this.armorBoxTop + 1110} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>(REAR) [{ this.props.mechData.getArmorAllocation().leftTorsoRear }]</text>

		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 190 } y={this.armorBoxTop + 1090} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>RIGHT TORSO</text>
		<text x={this.armorBoxLeft + this.armorBoxWidth / 2 + 190 } y={this.armorBoxTop + 1110} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={20}>(REAR) [{ this.props.mechData.getArmorAllocation().rightTorsoRear }]</text>

            <QuadArmorCircles
                armorBoxLeft={this.armorBoxLeft}
                armorBoxWidth={this.armorBoxWidth}
                armorBoxTop={this.armorBoxTop}
                inPlay={this.props.inPlay}
                mechData={this.props.mechData}
            />
        </>
    )}
    </RecordSheetGroupBoxSVG>


    <RecordSheetGroupBoxSVG
        width={this.isBoxWidth}
        height={600}
        xLoc={this.isBoxLeft}
        yLoc={this.isBoxTop}
        title="Internal Structure"
    >
    {this.props.mechData.getMechType().tag === "biped" ? (
        <>
            <BipedInternalStructureDiagramSVG
                xLoc={1350}
                yLoc={1275}
                width={420}
            />


        {/* // Main Structure Labels */}
		<text x={this.isBoxLeft + this.isBoxWidth / 2} y={this.isBoxTop + 55} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>HEAD [{this.props.mechData.getInternalStructure().head }]</text>

		<text x={this.isBoxLeft + this.isBoxWidth / 2 - 65} y={this.isBoxTop + 85} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEFT TORSO</text>
		<text x={this.isBoxLeft + this.isBoxWidth / 2 - 65} y={this.isBoxTop + 105} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>[{this.props.mechData.getInternalStructure().leftTorso }]</text>

		<text x={this.isBoxLeft + this.isBoxWidth / 2 + 65} y={this.isBoxTop + 85} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>RIGHT TORSO</text>
		<text x={this.isBoxLeft + this.isBoxWidth / 2 + 65} y={this.isBoxTop + 105} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>[{this.props.mechData.getInternalStructure().rightTorso }]</text>


		<text x={this.isBoxLeft +  this.isBoxWidth / 2 - 200} y={this.isBoxTop + 310} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEFT</text>
		<text x={this.isBoxLeft +  this.isBoxWidth / 2 - 200} y={this.isBoxTop + 330} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>ARM [{this.props.mechData.getInternalStructure().leftArm }]</text>

		<text x={this.isBoxLeft + this.isBoxWidth / 2 + 200} y={this.isBoxTop + 310} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>RIGHT</text>
		<text x={this.isBoxLeft + this.isBoxWidth / 2 + 200} y={this.isBoxTop + 330} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>ARM [{this.props.mechData.getInternalStructure().rightArm }]</text>

		<text x={this.isBoxLeft +  this.isBoxWidth / 2 - 150} y={this.isBoxTop + 570} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEFT</text>
		<text x={this.isBoxLeft +  this.isBoxWidth / 2 - 150} y={this.isBoxTop + 590} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEG [{this.props.mechData.getInternalStructure().leftLeg }]</text>

		<text x={this.isBoxLeft + this.isBoxWidth / 2 + 150} y={this.isBoxTop + 570} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>RIGHT</text>
		<text x={this.isBoxLeft + this.isBoxWidth / 2 + 150} y={this.isBoxTop + 590} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEG [{this.props.mechData.getInternalStructure().rightLeg }]</text>

		<text x={this.isBoxLeft + this.isBoxWidth / 2 } y={this.isBoxTop + 400} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>CENTER</text>
		<text x={this.isBoxLeft + this.isBoxWidth / 2 } y={this.isBoxTop + 420} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>TORSO</text>
		<text x={this.isBoxLeft + this.isBoxWidth / 2 } y={this.isBoxTop + 440} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>[{this.props.mechData.getInternalStructure().centerTorso })</text>


        {/* Head IS */}
        {this.props.mechData.getInternalStructure().head > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 15 } yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={0} clickFunction={this.toggleISBubble}/></>) : (<></>)}
        {this.props.mechData.getInternalStructure().head > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 15 } yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().head > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2} yLoc={this.isBoxTop + 140} radius={10} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {/* Left Arm IS */}
        {this.props.mechData.getInternalStructure().leftArm > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 135} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 137} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 140} yLoc={this.isBoxTop + 180} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 142} yLoc={this.isBoxTop + 195} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 145} yLoc={this.isBoxTop + 210} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftArm > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 147} yLoc={this.isBoxTop + 235} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 148} yLoc={this.isBoxTop + 250} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 149} yLoc={this.isBoxTop + 265} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 150} yLoc={this.isBoxTop + 280} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 151} yLoc={this.isBoxTop + 295} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().leftArm > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 152} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 155} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 158} yLoc={this.isBoxTop + 180} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 160} yLoc={this.isBoxTop + 195} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 163} yLoc={this.isBoxTop + 210} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftArm > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 154} yLoc={this.isBoxTop + 315} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 157} yLoc={this.isBoxTop + 330} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 160} yLoc={this.isBoxTop + 345} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 162} yLoc={this.isBoxTop + 360} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftArm > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 165} yLoc={this.isBoxTop + 375} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}



        {/* Right Arm IS */}
        {this.props.mechData.getInternalStructure().rightArm > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 135} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 137} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 140} yLoc={this.isBoxTop + 180} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 142} yLoc={this.isBoxTop + 195} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 145} yLoc={this.isBoxTop + 210} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightArm > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 147} yLoc={this.isBoxTop + 235} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={5} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 148} yLoc={this.isBoxTop + 250} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={6} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 149} yLoc={this.isBoxTop + 265} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={7} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 150} yLoc={this.isBoxTop + 280} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={8} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 151} yLoc={this.isBoxTop + 295} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={9} clickFunction={this.toggleISBubble}  /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().rightArm > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 152} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={10} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 155} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={11} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 158} yLoc={this.isBoxTop + 180} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={12} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 160} yLoc={this.isBoxTop + 195} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={13} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 163} yLoc={this.isBoxTop + 210} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={14} clickFunction={this.toggleISBubble}  /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightArm > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 154} yLoc={this.isBoxTop + 315} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 157} yLoc={this.isBoxTop + 330} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 160} yLoc={this.isBoxTop + 345} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 162} yLoc={this.isBoxTop + 360} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightArm > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 165} yLoc={this.isBoxTop + 375} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {/* Center Torso IS */}
        {this.props.mechData.getInternalStructure().centerTorso > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 220} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 235} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().centerTorso > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 255} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 270} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 285} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 300} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 315} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().centerTorso > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 220} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 235} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().centerTorso > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 220} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 235} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().centerTorso > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 255} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 270} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 285} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 300} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 315} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 25 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 255} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={25} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 26 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 270} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={26} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 27 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 285} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={27} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 28 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 300} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={28} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 29 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 315} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={29} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 31 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 335} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={31} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 30 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 0} yLoc={this.isBoxTop + 335} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={30} clickFunction={this.toggleISBubble}/></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 32 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 335} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={32} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {/* Left Torso IS */}
        {this.props.mechData.getInternalStructure().leftTorso > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 145} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 160} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 145} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 160} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 145} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 160} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 53} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 52} yLoc={this.isBoxTop + 245} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 260} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 49} yLoc={this.isBoxTop + 275} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 48} yLoc={this.isBoxTop + 290} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 310} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 310} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 50} yLoc={this.isBoxTop + 325} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 325} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 325} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {/* Right Torso IS */}
        {this.props.mechData.getInternalStructure().rightTorso > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 145} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 160} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 145} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 160} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 145} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 160} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 175} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 190} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 205} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 53} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 52} yLoc={this.isBoxTop + 245} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 260} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 49} yLoc={this.isBoxTop + 275} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 48} yLoc={this.isBoxTop + 290} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 310} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 310} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 50} yLoc={this.isBoxTop + 325} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 325} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 325} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}




        {/* Left Leg IS */}
        {this.props.mechData.getInternalStructure().leftLeg > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 53} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 57} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 59} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 60} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftLeg > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 68} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 72} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 74} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 76} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().leftLeg > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 73} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 77} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 79} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 80} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftLeg > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 88} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 92} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 94} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 96} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftLeg > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 80} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 82} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 84} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 86} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 88} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftLeg > 25 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 100} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={25} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 26 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 102} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={26} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 27 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 104} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={27} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 28 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 106} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={28} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftLeg > 29 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 108} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={29} clickFunction={this.toggleISBubble} /></>) : (<></>)}



        {/* Right Leg IS */}
        {this.props.mechData.getInternalStructure().rightLeg > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 53} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 57} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 59} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 60} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightLeg > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 68} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 72} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 74} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 76} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightLeg > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 73} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 77} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 79} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 80} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightLeg > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 88} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 92} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 94} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 96} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightLeg > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 80} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 82} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 84} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 86} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 88} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightLeg > 25 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 100} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={25} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 26 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 102} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={26} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 27 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 104} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={27} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 28 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 106} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={28} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightLeg > 29 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 108} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={29} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        </>
    ) : (
        <>
            <QuadInternalStructureDiagramSVG
                xLoc={1386}
                yLoc={1295}
                width={380}
            />

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 } y={this.isBoxTop + 60} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>HEAD [{ this.props.mechData.getInternalStructure().head }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 - 65 - 115} y={this.isBoxTop + 105} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEFT TORSO</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 - 95 - 115 } y={this.isBoxTop + 125} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>[{ this.props.mechData.getInternalStructure().leftTorso }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 65 + 115 } y={this.isBoxTop + 105} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>RIGHT TORSO</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 95 + 115 } y={this.isBoxTop + 125} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>[{ this.props.mechData.getInternalStructure().rightTorso }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust +  this.isBoxWidth / 2 - 280 } y={this.isBoxTop + 540} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>FRONT</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust +  this.isBoxWidth / 2 - 280 } y={this.isBoxTop + 560} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEFT</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust +  this.isBoxWidth / 2 - 280 } y={this.isBoxTop + 580} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEG [{ this.props.mechData.getInternalStructure().leftArm }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 280 } y={this.isBoxTop + 540} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>FRONT</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 280 } y={this.isBoxTop + 560} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>RIGHT</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 280 } y={this.isBoxTop + 580} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEG [{ this.props.mechData.getInternalStructure().rightArm }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust +  this.isBoxWidth / 2 - 80 } y={this.isBoxTop + 570} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>REAR</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust +  this.isBoxWidth / 2 - 80 } y={this.isBoxTop + 590} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEFT</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust +  this.isBoxWidth / 2 - 80 } y={this.isBoxTop + 610} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEG [{ this.props.mechData.getInternalStructure().leftLeg }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 80 } y={this.isBoxTop + 570} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>REAR</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 80 } y={this.isBoxTop + 590} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>RIGHT</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2 + 80 } y={this.isBoxTop + 610} textAnchor="end" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={15}>LEG [{ this.props.mechData.getInternalStructure().rightLeg }]</text>

            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2  } y={this.isBoxTop + 360} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={13}>CENTER</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2  } y={this.isBoxTop + 380} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={13}>TORSO</text>
            <text x={ this.isBoxLeft + this.isQuadCenterAdjust + this.isBoxWidth / 2  } y={this.isBoxTop + 400} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={13}>[{ this.props.mechData.getInternalStructure().centerTorso })</text>


            {/* Head IS */}
            {this.props.mechData.getInternalStructure().head > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 15 } yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().head > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 15 } yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().head > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2} yLoc={this.isBoxTop + 125} radius={10} inPlay={this.props.inPlay} clickLocation="hd" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}




        {/* Center Torso IS */}


        {this.props.mechData.getInternalStructure().centerTorso > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 40} yLoc={this.isBoxTop + 170} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 170} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 170} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 170} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 40} yLoc={this.isBoxTop + 170} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 40} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 40} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().centerTorso > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 40} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 40} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 40} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 40} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 40} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 20} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 0} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 20} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 40} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {this.props.mechData.getInternalStructure().centerTorso > 25 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 27} yLoc={this.isBoxTop + 250} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={25} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 26 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 9} yLoc={this.isBoxTop + 250} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={26} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 27 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 9} yLoc={this.isBoxTop + 250} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={27} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 28 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 27} yLoc={this.isBoxTop + 250} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={28} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 29 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 27} yLoc={this.isBoxTop + 265} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={29} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 30 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 9} yLoc={this.isBoxTop + 265} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={30} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 31 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 9} yLoc={this.isBoxTop + 265} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={31} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 32 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 27} yLoc={this.isBoxTop + 265} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={32} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().centerTorso > 33 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 27} yLoc={this.isBoxTop + 280} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={33} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 34 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 9} yLoc={this.isBoxTop + 280} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={34} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 35 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 9} yLoc={this.isBoxTop + 280} radius={10} inPlay={this.props.inPlay}  clickLocation="ct" clickIndex={35} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().centerTorso > 36 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 27} yLoc={this.isBoxTop + 280} radius={10} inPlay={this.props.inPlay} clickLocation="ct" clickIndex={36} clickFunction={this.toggleISBubble} /></>) : (<></>)}


            {/* Right Rear Leg IS */}
            {this.props.mechData.getInternalStructure().rightLeg > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightLeg > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightLeg > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightLeg > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightLeg > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 55} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightLeg > 25 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={25} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 26 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={26} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 27 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={27} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 28 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={28} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightLeg > 29 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 75} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="rl" clickIndex={29} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {/* Right Rear Leg IS */}
            {this.props.mechData.getInternalStructure().leftLeg > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftLeg > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftLeg > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay}clickLocation="ll" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay}clickLocation="ll" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay}clickLocation="ll" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay}clickLocation="ll" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay}clickLocation="ll" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftLeg > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftLeg > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 55} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftLeg > 25 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={25} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 26 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={26} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 27 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={27} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 28 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={28} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftLeg > 29 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 75} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="ll" clickIndex={29} clickFunction={this.toggleISBubble} /></>) : (<></>)}



            {/* Right Front Leg IS */}
            {this.props.mechData.getInternalStructure().rightArm > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 115} yLoc={this.isBoxTop + 260} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={0} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 115} yLoc={this.isBoxTop + 275} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={1} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 115} yLoc={this.isBoxTop + 290} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={2} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 115} yLoc={this.isBoxTop + 305} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={3} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 115} yLoc={this.isBoxTop + 320} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={4} clickFunction={this.toggleISBubble}  /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightArm > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 120} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={5} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 120} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={6} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 120} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={7} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 120} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={8} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 120} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={9} clickFunction={this.toggleISBubble}  /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightArm > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={10} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={11} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={12} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={13} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={14} clickFunction={this.toggleISBubble}  /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightArm > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={15} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={16} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={17} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={18} clickFunction={this.toggleISBubble}  /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 130} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={19} clickFunction={this.toggleISBubble}  /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().rightArm > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 150} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 150} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 150} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 150} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().rightArm > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 150} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="ra" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}



            {/* Left Front Leg IS */}
            {this.props.mechData.getInternalStructure().leftArm > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 115} yLoc={this.isBoxTop + 260} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 115} yLoc={this.isBoxTop + 275} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 115} yLoc={this.isBoxTop + 290} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 115} yLoc={this.isBoxTop + 305} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 115} yLoc={this.isBoxTop + 320} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftArm > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 120} yLoc={this.isBoxTop + 340} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 120} yLoc={this.isBoxTop + 355} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 120} yLoc={this.isBoxTop + 370} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 120} yLoc={this.isBoxTop + 385} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 120} yLoc={this.isBoxTop + 400} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftArm > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 420} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 435} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 450} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 465} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 480} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftArm > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 130} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}

            {this.props.mechData.getInternalStructure().leftArm > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 150} yLoc={this.isBoxTop + 560} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 150} yLoc={this.isBoxTop + 545} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 150} yLoc={this.isBoxTop + 530} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 23 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 150} yLoc={this.isBoxTop + 515} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={23} clickFunction={this.toggleISBubble} /></>) : (<></>)}
            {this.props.mechData.getInternalStructure().leftArm > 24 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 150} yLoc={this.isBoxTop + 500} radius={10} inPlay={this.props.inPlay} clickLocation="la" clickIndex={24} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {/* Right Torso IS */}
        {this.props.mechData.getInternalStructure().rightTorso > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 135} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 135} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 110} yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 110} yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 110} yLoc={this.isBoxTop + 135} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 110} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 110} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 70} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().rightTorso > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().rightTorso > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 + 90} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="rt" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        {/* Left Torso IS */}
        {this.props.mechData.getInternalStructure().leftTorso > 0 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={0} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 1 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={1} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 2 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 135} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={2} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 3 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={3} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 4 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={4} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 5 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={5} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 6 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={6} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 7 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 135} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={7} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 8 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={8} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 9 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={9} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 10 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 110} yLoc={this.isBoxTop + 105} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={10} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 11 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 110} yLoc={this.isBoxTop + 120} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={11} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 12 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 110} yLoc={this.isBoxTop + 135} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={12} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 13 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 110} yLoc={this.isBoxTop + 150} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={13} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 14 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 110} yLoc={this.isBoxTop + 165} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={14} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 15 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={15} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 16 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={16} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 17 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={17} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 18 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 70} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={18} clickFunction={this.toggleISBubble} /></>) : (<></>)}

        {this.props.mechData.getInternalStructure().leftTorso > 19 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 185} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={19} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 20 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 200} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={20} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 21 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 215} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={21} clickFunction={this.toggleISBubble} /></>) : (<></>)}
        {this.props.mechData.getInternalStructure().leftTorso > 22 ? (<><DamageCircleSVG xLoc={this.isBoxLeft + this.isBoxWidth / 2 - 90} yLoc={this.isBoxTop + 230} radius={10} inPlay={this.props.inPlay} clickLocation="lt" clickIndex={22} clickFunction={this.toggleISBubble} /></>) : (<></>)}


        </>
    )}
    </RecordSheetGroupBoxSVG>


    <RecordSheetGroupBoxSVG
        width={critBoxWidth}
        height={1215}
        xLoc={critBoxLeft}
        yLoc={critBoxTop}
        title="Critical Hit Table"
    >

{/* // Left Arm */}
        <text
            x={critBoxLeft + critCol1Start}
            y={critBoxTop + 100}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
            {this.props.mechData.getMechType().tag === "biped" ? (
                <>LEFT ARM</>
            ) : (
                <>LEFT FRONT LEG</>
            )}
        </text>

        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().leftArm}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol1Start}
            yLoc={critBoxTop + 140}
        />
	{/* // Head */}
        <text
            x={critBoxLeft + critCol2Start}
            y={(critBoxTop + 100)}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
                HEAD
        </text>
        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().head}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol2Start}
            yLoc={critBoxTop + 140}
        />

        <text
            x={critBoxLeft + critCol3Start}
            y={critBoxTop + 100}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
            {this.props.mechData.getMechType().tag === "biped" ? (
                <>RIGHT ARM</>
            ) : (
                <>RIGHT FRONT LEG</>
            )}
        </text>
        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().rightArm}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol3Start}
            yLoc={critBoxTop + 140}
        />

        <text
            x={critBoxLeft + critCol1Start}
            y={critBoxTop + 550}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30
        }>
            LEFT TORSO
        </text>
        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().leftTorso}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol1Start}
            yLoc={critBoxTop + 575}

        />

	{/* // Center Torso */}
        <text
            x={critBoxLeft + critCol2Start}
            y={critBoxTop + 350}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
            CENTER TORSO
        </text>
        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().centerTorso}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol2Start}
            yLoc={critBoxTop + 375}

        />

	{/* // Right Torso */}
        <text
            x={critBoxLeft + critCol3Start}
            y={critBoxTop + 550}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
            RIGHT TORSO
        </text>

        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().rightTorso}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol3Start}
            yLoc={critBoxTop + 575}
        />

	{/* // Left Leg */}
        <text
            x={critBoxLeft + critCol1Start}
            y={critBoxTop + 1010}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
            {this.props.mechData.getMechType().tag === "biped" ? (
                <>LEFT LEG</>
            ) : (
                <>LEFT REAR LEG</>
            )}
        </text>

        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().leftLeg}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol1Start}
            yLoc={critBoxTop + 1050}
        />
        {/* // Right Leg */}
        <text
            x={critBoxLeft + critCol3Start}
            y={critBoxTop + 1010}
            textAnchor="start"
            fontFamily="sans-serif"
            fill={this.strokeColor}
            style={{fontWeight: 700}}
            fontSize={30}
        >
            {this.props.mechData.getMechType().tag === "biped" ? (
                <>RIGHT LEG</>
            ) : (
                <>RIGHT REAR LEG</>
            )}
        </text>
        <CritAllocationTableSVG
            strokeColor={this.strokeColor}
            critData={this.props.mechData.getCriticals().rightLeg}
            inPlay={this.inPlay}
            xLoc={critBoxLeft + critCol3Start}
            yLoc={critBoxTop + 1050}
        />

        <ComponentDamageSVG
            xLoc={critBoxWidth / 3 }
            yLoc={critBoxTop + 750}
            mechData={this.props.mechData}
            width={critBoxWidth / 3}
            height={190}
            strokeColor={this.strokeColor}
        />

    {this.props.mechData.getMechType().tag === "biped" ? (
        <>
            <BipedDamageTransferDiagramSVG
                xLoc={critBoxLeft + critBoxWidth / 2 - damageTransferWidth / 2}
                yLoc={critBoxTop + 950}
                width={damageTransferWidth}
                strokeColor={this.strokeColor}
            />
            <text
                x={critBoxLeft + critBoxWidth / 2}
                y={critBoxTop + 1200}
                textAnchor="middle"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 700}}
                fontSize={25}
            >
                DAMAGE TRANSFER
            </text>
            <text
                x={critBoxLeft + critBoxWidth / 2}
                y={critBoxTop + 1220}
                textAnchor="middle"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 700}}
                fontSize={25}
            >
                DIAGRAM
            </text>
        </>
    ) : (
        <>
            <QuadDamageTransferDiagramSVG
                xLoc={critBoxLeft + critBoxWidth / 2 - damageTransferWidth / 2}
                yLoc={critBoxTop + 950}
                width={damageTransferWidth}
                strokeColor={this.strokeColor}
            />
            <text
                x={critBoxLeft + critBoxWidth / 2}
                y={critBoxTop + 1200}
                textAnchor="middle"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 700}}
                fontSize={25}
            >
                DAMAGE TRANSFER
            </text>
            <text
                x={critBoxLeft + critBoxWidth / 2}
                y={critBoxTop + 1220}
                textAnchor="middle"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 700}}
                fontSize={25}
            >
                DIAGRAM
            </text>
        </>
    )}
    </RecordSheetGroupBoxSVG>

    <BattleMechHeatEffectsBoxSVG
        yLoc={1885}
        xLoc={1240}
        height={575}
        width={435}
        mechData={this.props.mechData}
        inPlay={this.props.inPlay}
    >
    </BattleMechHeatEffectsBoxSVG>

    {/* <RecordSheetGroupBoxSVG
        yLoc={1885}
        xLoc={1690}
        height={575}
        width={205}
        title="Sinks"
    >
    </RecordSheetGroupBoxSVG> */}
    <HeatSinksSVG
        yLoc={1885}
        xLoc={1690}
        height={575}
        width={205}
        mechData={this.props.mechData}
        inPlay={this.props.inPlay}
    >

    </HeatSinksSVG>

    <HeatTrackSVG
        xLoc={this.docWidth - 80}
        yLoc={1260}
    />

	{/* // Classic Battletech Logo on bottom. */}
    <rect
        x={0}
        y={this.docHeight - 100}
        width={2000}
        height={100}
        fill={this.strokeColor}
    />
    <BattleTechLogo
        yLoc={this.docHeight - 85}
        xLoc={1500}
        width={500}
    />
    {/* <text
        x={20}
        y={this.docHeight - 25}
        textAnchor="start"
        fontFamily="sans-serif"
        fill={this.colorTan}
        style={{fontWeight: 700}}
        fontSize={60}
    >
    CLASSIC BATTLETECH
    </text> */}
    <text
        x={20}
        y={this.docHeight - 55}
        textAnchor="start"
        fontFamily="sans-serif"
        fill={this.colorTan}
        style={{fontWeight: 700}}
        fontSize={20}
    >
    Created with Jeff's Battletech Tools
    </text>
    <text
        x={20}
        y={this.docHeight - 25}
        textAnchor="start"
        fontFamily="sans-serif"
        fill={this.colorTan}
        style={{fontWeight: 700}}
        fontSize={20}
    >
    https://jdgwf.github.io/battletech-tools/
    </text>
            </g>
        </svg>
        </>
        )

    }

}


interface IBattleMechSVGProps {
    bgColor?: string;
    strokeColor?: string;
    mechData: BattleMech;
    inPlay?: boolean;
    // landscape?: boolean;
    // itemIDField
}

interface IBattleMechSVGState {
}