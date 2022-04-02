import React from 'react';
import { BattleMech } from "../../../classes/battlemech";
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class RecordSheetEquipmentTable extends React.Component<IRecordSheetEquipmentTableProps, IRecordSheetEquipmentTableState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    eqLineHeight = 33;

    colorMediumGray = "rgb(150, 150, 150)";
    colorVeryLightGray = "rgb(200, 200, 200)";

    constructor(props: IRecordSheetEquipmentTableProps) {
        super( props );

        this.state = {

        };
    }

    render = (): React.ReactFragment => {

        let weapAndEqpTop = this.props.yLoc;
        let weapAndEqpLeft = this.props.xLoc;

        let wacCol1 = weapAndEqpLeft + 15;
        let wacCol2 = weapAndEqpLeft + 90;
        let wacCol3 = weapAndEqpLeft + 470;
        let wacCol4 = weapAndEqpLeft + 550;
        let wacCol5 = weapAndEqpLeft + 650;
        let wacCol6 = weapAndEqpLeft + 770;
        let wacCol7 = weapAndEqpLeft + 880;
        let wacCol8 = weapAndEqpLeft + 990;
        let wacCol9 = weapAndEqpLeft + 1100;

        let equipmentList: React.ReactFragment[] = [];
        let rearDesignation = "";

        for( let eq_count = 0; eq_count < this.props.mechData.sortedEquipmentList.length; eq_count++) {
            if( eq_count % 2 === 0 )
                equipmentList.push( <rect key={ eq_count.toString() + "a"}x={wacCol1 - 5 } y={weapAndEqpTop + 93 + this.eqLineHeight * eq_count} width={1180} height={this.eqLineHeight + 4} fill={this.colorVeryLightGray} /> );

            equipmentList.push( <text key={ eq_count.toString() + "b"} x={wacCol1 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].count}</text> );

            rearDesignation = "";
            if(  this.props.mechData.sortedEquipmentList[ eq_count].rear )
                rearDesignation = " [R]"

            let ammoPerTon = this.props.mechData.sortedEquipmentList[ eq_count].ammoPerTon ;
            let isAmmo = this.props.mechData.sortedEquipmentList[ eq_count].isAmmo ? true : false ;

            if( ammoPerTon && isAmmo )
                equipmentList.push( <text key={ eq_count.toString() + "c"} x={wacCol2 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].name + rearDesignation} {this.props.mechData.sortedEquipmentList[ eq_count].ammoPerTon}</text> );
            else
                equipmentList.push( <text key={ eq_count.toString() + "d"} x={wacCol2 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].name + rearDesignation}</text> );

            let location = this.props.mechData.sortedEquipmentList[eq_count].location;
            if( location ) {
                equipmentList.push( <text key={ eq_count.toString() + "e"} x={wacCol3 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{location.toUpperCase()}</text> );
            } else {
                equipmentList.push( <text key={ eq_count.toString() + "f"} x={wacCol3 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>-</text> );
            }

            if(!this.props.mechData.sortedEquipmentList[eq_count].isAmmo) {
                if(this.props.mechData.sortedEquipmentList[eq_count].heatPerShot) {
                    equipmentList.push( <text key={ eq_count.toString() + "g"} x={wacCol4 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].heat}/shot</text> );
                } else {
                    equipmentList.push( <text key={ eq_count.toString() + "g"} x={wacCol4 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].heat}</text> );
                }
                if(this.props.mechData.sortedEquipmentList[eq_count].damagePerShot) {
                    equipmentList.push( <text key={ eq_count.toString() + "h"} x={wacCol5 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].damage}/shot</text> );
                } else {
                    equipmentList.push( <text key={ eq_count.toString() + "h"} x={wacCol5 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].damage}</text> );
                }
            }

            if( this.props.mechData.sortedEquipmentList[eq_count].isMelee ) {
                equipmentList.push( <text key={ eq_count.toString() + "i"} x={wacCol7 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}> MELEE </text> );

            } else {


                if(!this.props.mechData.sortedEquipmentList[eq_count].isAmmo) {

                    if(this.props.mechData.sortedEquipmentList[eq_count].range.min === 0)
                        equipmentList.push( <text key={ eq_count.toString() + "j"} x={wacCol6 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>-</text> );
                    else
                        equipmentList.push( <text key={ eq_count.toString() + "k"} x={wacCol6 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].range.min}</text> );
                    equipmentList.push( <text key={ eq_count.toString() + "l"} x={wacCol7 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].range.short}</text> );
                    equipmentList.push( <text key={ eq_count.toString() + "m"} x={wacCol8 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].range.medium}</text> );
                    equipmentList.push( <text key={ eq_count.toString() + "n"} x={wacCol9 + 30 } y={weapAndEqpTop + 120 + this.eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.sortedEquipmentList[eq_count].range.long}</text> );
                }


            }
        }

        if( this.props.mechData.sortedEquipmentList.length === 0 ) {
            equipmentList.push( <text key={ "no-equopment"} x={this.props.width / 2 } y={weapAndEqpTop + 140} textAnchor="middle" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 100}} fontSize={30}>No Equipment Installed</text> );
        }

        return (
            <RecordSheetGroupBoxSVG
                width={this.props.width}
                height={this.props.height}
                xLoc={this.props.xLoc}
                yLoc={this.props.yLoc}
                title="Weapons And Equipment"
                bgColor={this.bgColor}
                strokeColor={this.strokeColor}
            >
	            <text x={wacCol1 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Qty</text>
	            <text x={wacCol2 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Type</text>
	            <text x={wacCol3 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Loc</text>
	            <text x={wacCol4 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Heat</text>
	            <text x={wacCol5 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Dmg</text>
	            <text x={wacCol6 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Min</text>
	            <text x={wacCol7 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Sht</text>
	            <text x={wacCol8 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Med</text>
	            <text x={wacCol9 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={this.strokeColor} style={{fontWeight: 700}} fontSize={35}>Lng</text>

                {equipmentList}
            </RecordSheetGroupBoxSVG>
        )
    }
}

interface IRecordSheetEquipmentTableProps {
    bgColor?: string;
    strokeColor?: string;
    mechData: BattleMech;
    inPlay?: boolean;
    xLoc: number;
    yLoc: number;
    width: number;
    height: number;

    // landscape?: boolean;
    // itemIDField
}

interface IRecordSheetEquipmentTableState {
}