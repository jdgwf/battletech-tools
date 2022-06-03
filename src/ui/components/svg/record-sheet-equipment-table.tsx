import React from 'react';
import { BattleMech, IGATOR } from "../../../classes/battlemech";
import { getTargetColor, getTargetToHitFromWeapon } from '../../../utils';
import RecordSheetGroupBoxSVG from './record-sheet-group-box-svg';

export default class RecordSheetEquipmentTable extends React.Component<IRecordSheetEquipmentTableProps, IRecordSheetEquipmentTableState> {
    // bgColor = "rgb(255,255,255)";
    // strokeColor = "rgb(0,0,0)";
    // // landscape: boolean = false;
    // inPlay: boolean = false;
    // eqLineHeight = 33;

    // colorMediumGray = "rgb(150, 150, 150)";
    // colorVeryLightGray = "rgb(200, 200, 200)";

    constructor(props: IRecordSheetEquipmentTableProps) {
        super( props );

        this.state = {

        };
    }

    viewGATOR = (
        gator: IGATOR
    ) => {
        if( this.props.viewGATOR ) {
            this.props.viewGATOR( gator );
        }
    }

    cycleTarget = (
        e: React.MouseEvent<SVGCircleElement | SVGTextElement>,
        index: number
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }

        this.props.mechData.cycleWeaponTarget( index );

        if( this.props.onChange ) {
            this.props.onChange( this.props.mechData );
        }
    }

    openSetTargetDialog = (
        e: React.MouseEvent<SVGCircleElement | SVGTextElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }

        if( this.props.openSetTargetDialog ) {
            this.props.openSetTargetDialog( this.props.mechData );
        }
    }

    render = (): JSX.Element => {

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

        let equipmentList: JSX.Element[] = [];
        let rearDesignation = "";

        let colorVeryLightGray = "rgb(200, 200, 200)";

        let eqLineHeight = 33;
        let bgColor = "rgb(255,255,255)";
        let strokeColor = "rgb(0,0,0)";
        // landscape: boolean = false;

        if( this.props.bgColor ) {
            bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            strokeColor = this.props.strokeColor;
        }

        for( let eq_count = 0; eq_count < this.props.mechData.equipmentList.length; eq_count++) {
            if( eq_count % 2 === 0 )
                equipmentList.push( <rect key={ eq_count.toString() + "a"}x={wacCol1 - 5 } y={weapAndEqpTop + 93 + eqLineHeight * eq_count} width={1180} height={eqLineHeight + 4} fill={colorVeryLightGray} /> );

            let ammoPerTon = this.props.mechData.equipmentList[ eq_count].ammoPerTon ;
            let currentAmmo = this.props.mechData.equipmentList[ eq_count].currentAmmo ;
            let isAmmo = this.props.mechData.equipmentList[ eq_count].isAmmo ? true : false ;
            let isEquipment = this.props.mechData.equipmentList[ eq_count].isEquipment ? true : false ;
            let location = this.props.mechData.equipmentList[eq_count].location;
            let uuid = this.props.mechData.equipmentList[ eq_count].uuid;
            let isDamaged = false;
            if( uuid && location )
                isDamaged = this.props.mechData.isEquipmentDamaged( uuid,  location);

            if( this.props.inPlay && !isAmmo && !isEquipment ) {


                let targetColor = getTargetColor( this.props.mechData.equipmentList[ eq_count].target );
                let targetGATOR = getTargetToHitFromWeapon(
                    this.props.mechData,
                    eq_count,
                );


                if( !isDamaged ) {
                    equipmentList.push(
                        <React.Fragment key={ eq_count.toString() + "b"}>
                            {this.props.mechData.equipmentList[ eq_count].target ? (
                                <text
                                    x={ 18 }
                                    y={weapAndEqpTop + 115 + eqLineHeight * eq_count }
                                    textAnchor="left"
                                    fontFamily="sans-serif"
                                    fill={"black"}
                                    style={{fontWeight: 500}}
                                    fontSize={20}
                                    className="cursor-pointer"
                                    onClick={(e) => this.viewGATOR(targetGATOR)}
                                >
                                    {targetGATOR.finalToHit > 0 ? (
                                        <>
                                            {targetGATOR.finalToHit < 13 ? (
                                                <>{targetGATOR.finalToHit}+</>
                                            ) : (
                                                <>n/s</>
                                            )}
                                        </>
                                    ) : (
                                        <>n/s</>
                                    )}
                                </text>
                            ) : null}
                            <circle
                                stroke={"#009"}
                                strokeWidth="3"
                                fill={targetColor}
                                cx={wacCol1 + 50 }
                                cy={weapAndEqpTop + 110 + eqLineHeight * eq_count }
                                r={15}
                                className="cursor-pointer"
                                onClick={(e) => this.cycleTarget( e, eq_count)}
                            />
                            <text
                                x={wacCol1 + 49 }
                                y={weapAndEqpTop + 115 + eqLineHeight * eq_count }
                                textAnchor="middle"
                                fontFamily="sans-serif"
                                fill={"white"}
                                style={{fontWeight: 700}}
                                fontSize={25}
                                className="cursor-pointer"
                                onClick={(e) => this.cycleTarget( e, eq_count)}
                            >
                                {this.props.mechData.equipmentList[ eq_count].target}
                            </text>
                        </React.Fragment>
                        );
                }
            } else {
                equipmentList.push( <text key={ eq_count.toString() + "b"} x={wacCol1 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].count}</text> );
            }

            rearDesignation = "";
            if(  this.props.mechData.equipmentList[ eq_count].rear )
                rearDesignation = " [R]"

            if( ammoPerTon && isAmmo )
                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "c"} x={wacCol2 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].name + rearDesignation} {currentAmmo}/{this.props.mechData.equipmentList[ eq_count].ammoPerTon} </text> );
            else
                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "d"} x={wacCol2 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].name + rearDesignation}</text> );


            if( location ) {
                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "e"} x={wacCol3 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{location.toUpperCase()}</text> );
            } else {
                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "f"} x={wacCol3 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>-</text> );
            }

            if(!isAmmo && !isEquipment) {
                if(this.props.mechData.equipmentList[eq_count].heatPerShot) {
                    equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "g"} x={wacCol4 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].heat}/shot</text> );
                } else {
                    equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "g"} x={wacCol4 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].heat}</text> );
                }
                if(this.props.mechData.equipmentList[eq_count].damagePerCluster) {
                    equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "h"} x={wacCol5 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].damagePerCluster}/hit</text> );
                } else {
                    if(this.props.mechData.equipmentList[eq_count].damagePerShot) {
                        equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "h"} x={wacCol5 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].damagePerShot}/shot</text> );
                    } else {
                        if( typeof(this.props.mechData.equipmentList[eq_count].damage) !== "undefined") {
                            if( typeof(this.props.mechData.equipmentList[eq_count].damage) === "number") {
                                //@ts-ignore
                                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "h"} x={wacCol5 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].damage}</text> );
                            } else {
                                //@ts-ignore
                                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "h"} x={wacCol5 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].damage.short} / {this.props.mechData.equipmentList[eq_count].damage.medium} / {this.props.mechData.equipmentList[eq_count].damage.long}</text> );
                            }
                        }
                    }
                }
            }

            if( this.props.mechData.equipmentList[eq_count].isMelee ) {
                equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "i"} x={wacCol7 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}> MELEE </text> );

            } else {

                if(!isAmmo && !isEquipment) {

                    if(this.props.mechData.equipmentList[eq_count].range.min === 0)
                        equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "j"} x={wacCol6 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>-</text> );
                    else
                        equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "k"} x={wacCol6 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].range.min}</text> );
                    equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "l"} x={wacCol7 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].range.short}</text> );
                    equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "m"} x={wacCol8 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].range.medium}</text> );
                    equipmentList.push( <text className={this.props.inPlay ? "cursor-pointer": ""} onClick={this.openSetTargetDialog} key={ eq_count.toString() + "n"} x={wacCol9 + 30 } y={weapAndEqpTop + 120 + eqLineHeight * eq_count } textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>{this.props.mechData.equipmentList[eq_count].range.long}</text> );
                }

            }
            if( this.props.inPlay && isDamaged ) {
                equipmentList.push(
                    <line
                    key={ eq_count.toString() + "z"}
                    x1={ 10 }
                    y1={weapAndEqpTop + 110 + eqLineHeight * eq_count }
                    x2={ this.props.width - 10 }
                    y2={weapAndEqpTop + 110 + eqLineHeight * eq_count }

                    stroke={"rgb(200,0,0)"}
                    strokeWidth={4}
                /> );

            }
        }

        if( this.props.mechData.equipmentList.length === 0 ) {
            equipmentList.push( <text onClick={this.openSetTargetDialog} key={ "no-equipment"} x={this.props.width / 2 } y={weapAndEqpTop + 140} textAnchor="middle" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 100}} fontSize={30}>No Equipment Installed</text> );
        }



        return (

            <RecordSheetGroupBoxSVG
                width={this.props.width}
                height={this.props.height}
                xLoc={this.props.xLoc}
                yLoc={this.props.yLoc}
                title="Weapons And Equipment"
                bgColor={bgColor}
                strokeColor={this.props.boxStrokeColor}
            >
                {this.props.inPlay ?
                    <text x={wacCol1 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}></text>
                :
                    <text x={wacCol1 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Qty</text>
                }

	            <text x={wacCol2 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Type</text>
	            <text x={wacCol3 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Loc</text>
	            <text x={wacCol4 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Heat</text>
	            <text x={wacCol5 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Dmg</text>
	            <text x={wacCol6 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Min</text>
	            <text x={wacCol7 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Sht</text>
	            <text x={wacCol8 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Med</text>
	            <text x={wacCol9 } y={weapAndEqpTop + 80} textAnchor="start" fontFamily="sans-serif" fill={strokeColor} style={{fontWeight: 700}} fontSize={35}>Lng</text>

                {equipmentList}
            </RecordSheetGroupBoxSVG>
        )
    }
}

interface IRecordSheetEquipmentTableProps {
    bgColor?: string;
    strokeColor?: string;
    boxStrokeColor?: string;
    mechData: BattleMech;
    inPlay?: boolean;
    xLoc: number;
    yLoc: number;
    width: number;
    height: number;
    onChange?( mech: BattleMech ): void;
    viewGATOR?( gator: IGATOR): void;
    openSetTargetDialog?(
        currentBM: BattleMech,
    ): void;
    // landscape?: boolean;
    // itemIDField
}

interface IRecordSheetEquipmentTableState {
}