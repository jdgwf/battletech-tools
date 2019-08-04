
import React from 'react';
import { BattleMech } from '../../../Classes/BattleMech';
import DieSVG from './DieSVG';
import RecordSheetGroupBoxSVG from './RecordSheetGroupBoxSVG';
import PilotHitTrackSVG from './PilotHitTrackSVG';
import BattleTechLogo from '../BattleTechLogo';
import RecordSheetEquipmentTable from './RecordSheetEquipmentTable';
import BipedDamageTransferDiagramSVG from './BipedDamageTransferDiagramSVG';
import QuadDamageTransferDiagramSVG from './QuadDamageTransferDiagramSVG';
import HeatTrackSVG from './HeatTrackSVG';
import BattleMechHeatEffectsBoxSVG from './BattleMechHeatEffectsBoxSVG';
import CritAllocationTableSVG from './CritAllocationTableSVG';
import BipedInternalStructureDiagramSVG from './BipedInternalStructureDiagramSVG';
import QuadInternalStructureDiagramSVG from './QuadInternalStructureDiagramSVG';
import BipedArmorDiagramSVG from './BipedArmorDiagramSVG';
import QuadArmorDiagramSVG from './QuadArmorDiagramSVG';
import BipedRearArmorDiagramSVG from './BipedRearArmorDiagramSVG';
import QuadRearArmorDiagramSVG from './QuadRearArmorDiagramSVG';

export default class BattleMechSVG extends React.Component<IBattleMechSVGProps, IBattleMechSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    docWidth = 2000;
    docHeight = 2600;

    colorTan = "#fdfde3";

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

    render() {
        // TODO
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
        let damageTransferWidth = 250;

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

                // Tech Base
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

	// Piloting
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

	        // Gunnery
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
        width={745}
        height={1200}
        xLoc={1240}
        yLoc={10}
        title="Armor Diagram"
    >
    {this.props.mechData.getMechType().tag === "biped" ? (
        <>
            TODO: Biped Armor Diagram
            <BipedArmorDiagramSVG
                xLoc={1268}
                yLoc={-10}
                width={700}
            />

            <BipedRearArmorDiagramSVG
                xLoc={1413}
                yLoc={875}
                width={400}
            />
        </>
    ) : (
        <>
            TODO: Quad Armor Diagram
            <QuadArmorDiagramSVG
                xLoc={1268}
                yLoc={-10}
                width={700}
            />

            <QuadRearArmorDiagramSVG
                xLoc={1413}
                yLoc={975}
                width={400}
            />
        </>
    )}
    </RecordSheetGroupBoxSVG>

    <RecordSheetGroupBoxSVG
        width={655}
        height={600}
        xLoc={1250}
        yLoc={1250}
        title="Internal Structure"
    >
    {this.props.mechData.getMechType().tag === "biped" ? (
        <>
            TODO: Biped Internal Structure
            <BipedInternalStructureDiagramSVG
                xLoc={1350}
                yLoc={1300}
                width={400}
            />
        </>
    ) : (
        <>
            TODO: Quad Internal Structure
            <QuadInternalStructureDiagramSVG
                xLoc={1375}
                yLoc={1300}
                width={400}
            />
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

// Left Arm
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
	// Head
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

	// Center Torso
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

	// Right Torso
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

	// Left Leg
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
        // Right Leg
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


    {this.props.mechData.getMechType().tag === "biped" ? (
        <>
            <BipedDamageTransferDiagramSVG
                xLoc={critBoxLeft + critBoxWidth / 2 - damageTransferWidth / 2}
                yLoc={critBoxTop + 820}
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
                yLoc={critBoxTop + 820}
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

    <RecordSheetGroupBoxSVG
        yLoc={1885}
        xLoc={1690}
        height={575}
        width={205}
        title="Sinks"
    >
    </RecordSheetGroupBoxSVG>

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
    Created with Gauthic's Battletech Tools
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