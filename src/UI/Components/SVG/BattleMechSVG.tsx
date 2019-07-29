
import React from 'react';
import { BattleMech } from '../../../Classes/BattleMech';
import DieSVG from './DieSVG';
import RecordSheetGroupBoxSVG from './RecordSheetGroupBoxSVG';

export default class BattleMechSVG extends React.Component<IBattleMechSVGProps, IBattleMechSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    docWidth = 2000;
    docHeight = 2600;

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
        let mechDataX = 10;
        let mechDataY = 10;

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
        if( battleValue != this.props.mechData.getPilotAdjustedBattleValue().toString() )
            battleValue = battleValue + " (" + this.props.mechData.getPilotAdjustedBattleValue() + ")";

        return (
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
                    xLoc={mechDataX}
                    yLoc={mechDataY}
                    title="'Mech Data"
                    bgColor={this.bgColor}
                    strokeColor={this.strokeColor}
                >
                    <text
                        x={10 + mechDataX}
                        y={80 + mechDataY}
                        textAnchor="start"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Type:
                    </text>


                    <text
                        x={10 + mechDataX}
                        y={120 + mechDataY}
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
                        x={mechDataX + 15}
                        y={mechDataY + 160}
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
                        x={mechDataX + 220}
                        y={mechDataY + 210}
                        textAnchor="end"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Walking:
                    </text>
                    <text
                        x={mechDataX + 240}
                        y={mechDataY + 210}
                        textAnchor="start" fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={30}
                    >
                        {this.props.mechData.getWalkSpeed()}
                    </text>
                    <DieSVG
                        posY={ mechDataY + 210 - 25}
                        posX={mechDataX + 20}
                        strokeColor="#000000"
                        bgColor="#ffffff"
                        pipColor="#000000"
                        width={30}
                        numberPips={1}
                    />

                    {/* // Run */}
                    <text
                        x={mechDataX + 220}
                        y={mechDataY + 245}
                        textAnchor="end" fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Running
                    </text>
                    <text
                    x={mechDataX + 240}
                    y={mechDataY + 245}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={30}
                    >
                        {this.props.mechData.getRunSpeed()}
                    </text>

                    <DieSVG
                        posY={ mechDataY + 245 - 25}
                        posX={mechDataX + 20}
                        strokeColor="#000000"
                        bgColor="#000000"
                        pipColor="#ffffff"
                        width={30}
                        numberPips={2}
                    />
                    {/* // Jump */}
                    <text
                        x={mechDataX + 220}
                        y={mechDataY + 280}
                        textAnchor="end"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 700}}
                        fontSize={30}
                    >
                        Jumping
                    </text>
                    <text
                        x={mechDataX + 240}
                        y={mechDataY + 280}
                        textAnchor="start"
                        fontFamily="sans-serif"
                        fill={this.strokeColor}
                        style={{fontWeight: 500}}
                        fontSize={30}
                    >
                        {this.props.mechData.getJumpSpeed()}
                    </text>

                    <DieSVG
                        posY={ mechDataY + 280 - 25}
                        posX={mechDataX + 20}
                        strokeColor="#cc0000"
                        bgColor="#cc0000"
                        pipColor="#ffffff"
                        width={30}
                        numberPips={3}
                    />


                </RecordSheetGroupBoxSVG>



                {/* // Tonnage */}
                <text
                    x={mechDataX + 340}
                    y={mechDataY + 160}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={25}>
                    Tonnage:
                </text>
                <text
                    x={mechDataX + 665}
                    y={mechDataY + 160}
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
                    x={mechDataX + 340}
                    y={mechDataY + 205}
                    textAnchor="start" fontFamily="sans-serif"
                    fill={this.strokeColor} style={{fontWeight: 700}}
                    fontSize={25}
                >
                    Tech Base:
                </text>
                <text
                    x={mechDataX + 665}
                    y={mechDataY + 225}
                    textAnchor="end" fontFamily="sans-serif"
                    fill={this.strokeColor} style={{fontWeight: 500}}
                    fontSize={25}
                >
                    {this.props.mechData.getTech().name}
                </text>

                <text

                    x={mechDataX + 340}
                    y={mechDataY + 255}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={25}
                >
                    Era:
                </text>

                <text
                    x={mechDataX + 665}
                    y={mechDataY + 280}
                    textAnchor="end"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={20}
                >{eraLine1}</text>
                <text
                    x={mechDataX + 665}
                    y={mechDataY + 300}
                    textAnchor="end"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 500}}
                    fontSize={20}
                >{eraLine2}</text>


                {/* // Cost */}
                <text
                    x={mechDataX + 15}
                    y={mechDataY + 350}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={30}
                    >
                        Cost (CBills)
                    </text>
                <text
                    x={mechDataX + 15}
                    y={mechDataY + 380}
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
                    x={mechDataX + 340}
                    y={mechDataY + 350}
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fill={this.strokeColor}
                    style={{fontWeight: 700}}
                    fontSize={30}
                >
                    BattleValue (BV2)
                </text>


            <text
                x={mechDataX + 340}
                y={mechDataY + 380}
                textAnchor="start"
                fontFamily="sans-serif"
                fill={this.strokeColor}
                style={{fontWeight: 500}}
                fontSize={25}
            >
                {battleValue}
            </text>


            </g>
        </svg>
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