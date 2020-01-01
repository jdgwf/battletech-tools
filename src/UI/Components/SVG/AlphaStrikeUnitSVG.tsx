import React from 'react';
import { AlphaStrikeUnit } from '../../../Classes/AlphaStrikeUnit';
import BattleTechLogo from '../BattleTechLogo';
import { IAppGlobals } from '../../AppRouter';

export default class AlphaStrikeUnitSVG extends React.Component<IAlphaStrikeUnitSVGProps, IAlphaStrikeUnitSVGState> {
    height: string = "100%";
    width: string = "auto";
    damageLeftBase = 0;
    buttonRadius = 15;

    activeDotColor = "rgb(200,0,0)";

    critLineHeight = 50;

    constructor(props: IAlphaStrikeUnitSVGProps) {
        super(props);
        this.state = {
            showTakeDamage: false,
        }
        if( this.props.height ) {
            this.height = this.props.height;
        }

        if( this.props.width ) {
            this.width = this.props.width;
        }

        this.damageLeftBase = 0;
        if( this.props.inPlay ) {
            this.damageLeftBase = 40;
        }

        this.toggleTakeDamage = this.toggleTakeDamage.bind(this);
        this.takeDamage = this.takeDamage.bind(this);
    }

    toggleTakeDamage() {
        this.setState({
            showTakeDamage: !this.state.showTakeDamage,
        })
    }

    takeDamage( damageTaken: number ) {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.takeDamage( damageTaken );
            this.props.asUnit.calcCurrentVals();
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
        this.setState({
            showTakeDamage: false,
        })
    }

    toggleArmorOrStructure( target: string, indexNumber: number ) {
        if( this.props.inPlay && this.props.asUnit ) {
            if( target === "armor" ) {
                if( this.props.asUnit.currentArmor.length > indexNumber) {
                    this.props.asUnit.currentArmor[indexNumber] = !this.props.asUnit.currentArmor[indexNumber];
                    this.props.asUnit.calcCurrentVals();
                    this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
                }

            } else {
                if( this.props.asUnit.currentStructure.length > indexNumber) {
                    this.props.asUnit.currentStructure[indexNumber] = !this.props.asUnit.currentStructure[indexNumber];
                    this.props.asUnit.calcCurrentVals();
                    this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
                }
            }
        }
    }

    toggleEngineHit(  indexNumber: number ) {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.engineHits.length > indexNumber) {
                this.props.asUnit.engineHits[indexNumber] = !this.props.asUnit.engineHits[indexNumber];
                this.props.asUnit.calcCurrentVals();
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    setHeat( newValue: number ) {
        if( this.props.inPlay && this.props.asUnit ) {
            this.props.asUnit.currentHeat = newValue;
            this.props.asUnit.calcCurrentVals();
            this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
        }
    }
    toggleWeaponHit(indexNumber: number ) {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.weaponHits.length > indexNumber) {
                this.props.asUnit.weaponHits[indexNumber] = !this.props.asUnit.weaponHits[indexNumber];
                this.props.asUnit.calcCurrentVals();
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    toggleFireControlHit( indexNumber: number ) {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.fireControlHits.length > indexNumber) {
                this.props.asUnit.fireControlHits[indexNumber] = !this.props.asUnit.fireControlHits[indexNumber];
                this.props.asUnit.calcCurrentVals();
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    toggleMPHit( indexNumber: number ) {
        if( this.props.inPlay && this.props.asUnit ) {

            if( this.props.asUnit.mpControlHits.length > indexNumber) {
                this.props.asUnit.mpControlHits[indexNumber] = !this.props.asUnit.mpControlHits[indexNumber];
                this.props.asUnit.calcCurrentVals();
                this.props.appGlobals.saveCurrentASForce( this.props.appGlobals.currentASForce );
            }
        }
    }

    makeArmorDots(
        count: number,
        xLoc: number,
        yLoc: number,
        fillColor: string = "rgb(255,255,255)",
        strokeColor: string = "rgb(0,0,0)",
        radius: number = 0,
        target: string = "armor",
    ): JSX.Element[] {
        let dots: JSX.Element[] = []

        if( radius === 0 ) {
            radius = this.buttonRadius - 5;
        }

        for( let currentCount = 0; currentCount < count; currentCount++ ) {
            dots.push(
                <React.Fragment
                    key={currentCount}
                >
                    <circle className={this.props.inPlay ? "cursor-pointer" : ""}
                        cx={this.damageLeftBase + xLoc + (currentCount * (radius * 2 + 9)) }
                        cy={yLoc}
                        r={radius + 3}
                        fill={strokeColor}
                        onClick={() => this.toggleArmorOrStructure( target, currentCount )}
                    />
                    {target === "armor" ? (
                        <circle className={this.props.inPlay ? "cursor-pointer" : ""}
                            cx={this.damageLeftBase + xLoc + (currentCount * (radius * 2 + 9)) }
                            cy={yLoc}
                            r={radius}
                            fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentArmor.length > currentCount && this.props.asUnit.currentArmor[currentCount] ? this.activeDotColor : fillColor}
                            onClick={() => this.toggleArmorOrStructure( target, currentCount )}
                        />
                    ) : (
                        <circle className={this.props.inPlay ? "cursor-pointer" : ""}
                            cx={this.damageLeftBase + xLoc + (currentCount * (radius * 2 + 9)) }
                            cy={yLoc}
                            r={radius}
                            fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentStructure.length > currentCount && this.props.asUnit.currentStructure[currentCount] ? this.activeDotColor : fillColor}
                            onClick={() => this.toggleArmorOrStructure( target, currentCount )}
                        />
                    )}

                </React.Fragment>
            )
        }

        return dots;
    }

    render() {
        if( !this.props.asUnit ) {
            return <></>
        }
        let critLineStart = 325;

        let damageLabelColWidth=130;
        let damageColWidth=150;
        if (this.props.asUnit.damage.extreme!=="0"){
            damageColWidth=110;
        }
        return (

            <>
                <svg className={this.props.className} version="1.1" x="0px" y="0px" viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 0)">
                <rect x="0" y="0" width="1000" height="640px" fill="rgb(0,0,0)"></rect>
                {this.props.asUnit.active === false ? (
                    <>
                    <rect x="10" y="10" style={{zIndex: -1}} width="980" height="580" fill={this.activeDotColor}></rect>
                    </>
                ) : (
                    <rect x="10" y="10" style={{zIndex: -1}} width="980" height="580" fill="rgb(255,255,255)"></rect>
                )}

                {this.props.asUnit.ImageUrl ? (
                    <image x="440" y="10" href={this.props.asUnit.ImageUrl} width="550" height="500"></image>
                ) : (
                    <></>
                )}

                {this.props.asUnit.customName ? (
                    <>
                        <text x="20" y="50" fontFamily="sans-serif" fontSize="40">{this.props.asUnit.customName}</text>
                        <text x="20" y="80" fontFamily="sans-serif" fontSize="25">{this.props.asUnit.name.toUpperCase()}</text>
                    </>
                ) : (
                    <text x="20" y="50" fontFamily="sans-serif" fontSize="40">{this.props.asUnit.name.toUpperCase()}</text>
                )}

                <rect x="850" y="9" width="150" height="35" fill="rgb(0,0,0)"></rect>
                <text x="990" y="35" textAnchor="end" fill="rgb(255,255,255)" stroke="rgb(255,255,255)" fontFamily="sans-serif" fontSize="33">PV: {this.props.asUnit.currentPoints}</text>
                <rect x="20" y="100" width="550" height="105" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="25" y="105" width="540" height="95" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>
                <text x="30" y="140" fontFamily="sans-serif" fontSize="25">TP: {this.props.asUnit.type}</text>
                <text x="150" y="140" fontFamily="sans-serif" fontSize="25">SZ: {this.props.asUnit.size}</text>
                {!this.props.asUnit.isAerospace ? (
                    <text x="235" y="140" fontFamily="sans-serif" fontSize="25">TMM: {this.props.asUnit.currentTMM.toUpperCase()}</text>
                ) : (
                    <></>
                )}

                <text x="540" y="140" fontFamily="sans-serif" textAnchor="end" fontSize="25">MV: {this.props.asUnit.currentMove.toUpperCase()}</text>
                <text x="30" y="180" fontFamily="sans-serif" fontSize="25">ROLE: {this.props.asUnit.role.toUpperCase()}</text>
                <text x="540" y="180" fontFamily="sans-serif" textAnchor="end" fontSize="25">SKILL: {this.props.asUnit.currentSkill}</text>
                <rect x="20" y="210" width="550" height="85" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="25" y="215" width="540" height="75" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>
                <text x="55" y="250" fontFamily="sans-serif" textAnchor="middle" fontSize="15" transform="rotate(270, 58, 250)">DAMAGE</text>
                {this.props.forPrint ? (
                    <text x={damageLabelColWidth+(damageColWidth*0)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">S (0)</text>
                ) : (
                    <text x={damageLabelColWidth+(damageColWidth*0)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">S (0 | {this.props.asUnit.currentToHitShort}+)</text>
                )}

                <text x={damageLabelColWidth+(damageColWidth*0)} y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.short}</text>
                {this.props.forPrint ? (
                    <text x={damageLabelColWidth+(damageColWidth*1)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">M (+2)</text>
                ) : (
                    <text x={damageLabelColWidth+(damageColWidth*1)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">M (+2 | {this.props.asUnit.currentToHitMedium}+)</text>
                )}

                <text x={damageLabelColWidth+(damageColWidth*1)} y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.medium}</text>
                {this.props.forPrint ? (
                    <text x={damageLabelColWidth+(damageColWidth*2)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">L (+4)</text>
                ) : (
                    <text x={damageLabelColWidth+(damageColWidth*2)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">L (+4 | {this.props.asUnit.currentToHitLong}+)</text>
                )}

                <text x={damageLabelColWidth+(damageColWidth*2)} y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.long}</text>
                {this.props.asUnit.damage.extreme!=="0" ? ( this.props.forPrint ? (
                    <text x={damageLabelColWidth+(damageColWidth*3)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">E (+6)</text>
                ) : (
                    <text x={damageLabelColWidth+(damageColWidth*3)} y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">E (+6 | {this.props.asUnit.currentToHitExtreme}+)</text>
                )) : null       
                }
                {this.props.asUnit.damage.extreme!=="0" ? (
                <text x={damageLabelColWidth+(damageColWidth*3)} y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.extreme}</text>
                ) : null
                }

                <rect x="20" y="310" width="550" height="80" fill="rgb(0,0,0)" rx="18" ry="18"></rect>

                {/* Heat Scale Box */}
                <rect x="25" y="315" width="540" height="70" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>
                <text x="40" y="360" fontFamily="sans-serif" fontSize={35}>OV: {this.props.asUnit.overheat}</text>
                <text x="240" y="357" textAnchor="end" fontFamily="sans-serif" fontSize="15">HEAT SCALE</text>
                <rect x="295" y="320" width="265" height="60" fill="rgb(0,0,0)" rx="30" ry="30"></rect>

                {/* 0 Heat */}
                <rect
                    onClick={() => this.setHeat(0)}
                    className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    x="325"
                    y="325"
                    width="25"
                    height="50"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat === 0 ? "rgb(0,200,0)" : "rgb(102,102,102)"}
                ></rect>
                <circle
                    onClick={() => this.setHeat(0)}
                    className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    cx="325"
                    cy="350"
                    r="25"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat === 0 ? "rgb(0,200,0)" : "rgb(102,102,102)"}
                ></circle>
                <text onClick={() => this.setHeat(0)} className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""} x="315" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>0</text>

                {/* 1 Heat */}
                <rect
                    onClick={() => this.setHeat(1)}
                    className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    x="355"
                    y="325"
                    width="45"
                    height="50"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat === 1 ? "rgb(204, 187, 0)" : "rgb(102,102,102)"}
                ></rect>
                <text onClick={() => this.setHeat(1)} className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""} x="365" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>1</text>

                {/* 2 Heat */}
                <rect
                onClick={() => this.setHeat(2)}
                className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    x="405"
                    y="325"
                    width="45"
                    height="50"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat === 2 ? "rgb(200,0,0)" : "rgb(102,102,102)"}
                ></rect>
                <text onClick={() => this.setHeat(2)} className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""} x="415" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>2</text>

                {/* 3 Heat */}
                <rect
                    onClick={() => this.setHeat(3)}
                    className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    x="455" y="325"
                    width="45"
                    height="50"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat === 3 ? "rgb(236,87,16)" : "rgb(102,102,102)"}
                ></rect>
                <text onClick={() => this.setHeat(3)} className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""} x="465" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>3</text>

                {/* Shutdown Heat */}
                <rect
                    onClick={() => this.setHeat(4)}
                    className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    x="505"
                    y="325"
                    width="25"
                    height="50"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat > 3 ? "rgb(51,51,51)" : "rgb(102,102,102)"}
                ></rect>
                <circle
                    onClick={() => this.setHeat(4)}
                    className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""}
                    cx="530"
                    cy="350"
                    r="25"
                    fill={this.props.inPlay && this.props.asUnit && this.props.asUnit.currentHeat > 3 ? "rgb(51,51,51)" : "rgb(102,102,102)"}
                ></circle>
                <text onClick={() => this.setHeat(4)} className={this.props.inPlay && this.props.asUnit ? "cursor-pointer" : ""} x="515" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>S</text>

                {/* End Heat Scale Box */}

                {/* Armor and Structure Box */}
                <rect x="20" y="400" width="550" height="105" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="25" y="405" width="540" height="95" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>

                {this.props.inPlay ? (
                    <>
		            <rect onClick={this.toggleTakeDamage} className="cursor-pointer" x="30" y="410" width="40" height="85" fill="rgb(255,0, 0)" rx="15" ry="15" />
		            <text onClick={this.toggleTakeDamage} className="cursor-pointer" x="60" y="430" fill="rgba(255,255,255)" fontFamily="sans-serif" textAnchor="middle" fontSize={13} transform="rotate(270, 65, 447)">TAKE</text>
		            <text onClick={this.toggleTakeDamage} className="cursor-pointer" x="70" y="430" fill="rgba(255,255,255)" fontFamily="sans-serif" textAnchor="middle" fontSize={13} transform="rotate(270, 75, 445)">DAMAGE</text>
                    </>
                ): (
                    <></>
                )}

                {this.state.showTakeDamage ? (
                    <>

                    <text x="185" y="425" textAnchor="center" fontFamily="sans-serif" fontSize="15">Click below to add damage taken</text>
                <rect x="80" y="435" width="465" height="60" fill="rgb(0,0,0)" rx="30" ry="30"></rect>
                <rect className="cursor-pointer" onClick={() => this.takeDamage(1)} x="110" y="440" width="25" height="50" fill="rgb(102,102,102)"></rect>
                <circle className="cursor-pointer" onClick={() => this.takeDamage(1)} cx="110" cy="465" r="25" fill="rgb(102,102,102)"></circle>
                <text className="cursor-pointer" onClick={() => this.takeDamage(1)} x="100" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>1</text>

                <rect className="cursor-pointer" onClick={() => this.takeDamage(2)} x="140" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(2)} x="153" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>2</text>


                <rect className="cursor-pointer" onClick={() => this.takeDamage(3)} x="190" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(3)} x="203" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>3</text>


                <rect className="cursor-pointer" onClick={() => this.takeDamage(4)} x="240" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(4)} x="253" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>4</text>

                <rect className="cursor-pointer" onClick={() => this.takeDamage(5)} x="290" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(5)} x="303" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>5</text>

                <rect className="cursor-pointer" onClick={() => this.takeDamage(6)} x="340" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(6)} x="353" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>6</text>

                <rect className="cursor-pointer" onClick={() => this.takeDamage(7)} x="390" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(7)} x="403" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>7</text>

                <rect className="cursor-pointer" onClick={() => this.takeDamage(8)} x="440" y="440" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className="cursor-pointer" onClick={() => this.takeDamage(8)} x="453" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>8</text>

                <rect className="cursor-pointer" onClick={() => this.takeDamage(9)} x="490" y="440" width="25" height="50" fill="rgb(102,102,102)"></rect>
                <circle className="cursor-pointer" onClick={() => this.takeDamage(9)} cx="515" cy="465" r="25" fill="rgb(102,102,102)"></circle>
                <text className="cursor-pointer" onClick={() => this.takeDamage(9)} x="503" y="480" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>9</text>

                    </>
                ) : (

                    <>
                    {/* Armor */}
                    <text x={this.damageLeftBase + 40} y="440" fontFamily="sans-serif" fontSize="25">A: </text>

                    {this.makeArmorDots(
                        this.props.asUnit.armor,
                        90,
                        432,
                        "rgb(255,255,255)",
                        "rgb(0,0,0)",
                        0,
                        "armor",
                    )}
                    {/* End Armor */}

                    {/* Structure */}
                    <text x={this.damageLeftBase + 40} y="485" fontFamily="sans-serif" fontSize="25">S: </text>
                    {this.makeArmorDots(
                        this.props.asUnit.structure,
                        90,
                        477,
                        "rgb(153,153,153)",
                        "rgb(0,0,0)",
                        0,
                        "structure",
                    )}
                    {/* End Structure */}
                    
                    {/* Threshold Display */}
                    {this.props.asUnit.threshold!==0 ? (
                        <>
                        <text x="520" y="445" fontFamily="sans-serif" textAnchor="middle" fontSize="35">TH</text>
                        <text x="520" y="485" fontFamily="sans-serif" textAnchor="middle" fontSize="35" >{this.props.asUnit.threshold}</text>
                        </>
                    ) : null
                    }
                    {/* End Threshold Display */}
                    </>
                )}

                {/* End Armor and Structure Box */}

                <rect x="20" y="510" width="960" height="60" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="25" y="515" width="950" height="50" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>
                <text x="30" y="550" textAnchor="left" fontFamily="sans-serif" fontSize="25">SPECIAL: {this.props.asUnit.abilities}</text>

                {/* Critical Hits */}
                {!this.props.asUnit.isInfantry ? (
                    <>
                {/* Outline Box and Title */}
                <rect x="580" y="245" width="400" height="260" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="585" y="250" width="390" height="250" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>
                <text x="785" y="275" textAnchor="middle" fontFamily="sans-serif" fontSize="25">CRITICAL HITS</text>
                {/* End Outline Box and Title */}



                {this.props.asUnit.type.toLowerCase() !== "pm" ? (

                    <>
                        <text x="750" y={critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">ENGINE</text>

                        {this.props.asUnit.engineHits.map( (ehValue, ehIndex) => {
                            let fillColor = "rgb(255,255,255)";
                            if( ehValue ) {
                                fillColor = this.activeDotColor;
                            }
                            return (
                                <React.Fragment key={ehIndex}>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * ehIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius}
                                        fill="rgb(0,0,0)"
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleEngineHit(ehIndex)}
                                    ></circle>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * ehIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius - 3}
                                        fill={fillColor}
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleEngineHit(ehIndex)}
                                    ></circle>
                                </React.Fragment>
                            )
                        })}


                        <text x="750" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">+1 Heat/Firing Weapons</text>
                        {critLineStart += this.critLineHeight}
                    </>
                ) : (
                    <></>
                )}

                <text x="750" y={critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">FIRE CONTROL</text>
                {this.props.asUnit.fireControlHits.map( (fcValue, fcIndex) => {
                            let fillColor = "rgb(255,255,255)";
                            if( fcValue ) {
                                fillColor = this.activeDotColor;
                            }
                            return (
                                <React.Fragment key={fcIndex}>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * fcIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius}
                                        fill="rgb(0,0,0)"
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleFireControlHit(fcIndex)}
                                    ></circle>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * fcIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius - 3}
                                        fill={fillColor}
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleFireControlHit(fcIndex)}
                                    ></circle>
                                </React.Fragment>
                            )
                })}
                <text x="750" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">+2 To Hit Each</text>
                {critLineStart += this.critLineHeight}


                {this.props.asUnit.type.toLowerCase() === 'bm' || this.props.asUnit.type.toLowerCase() === 'pm' ? (
                    <>
                        <text x="750"y={critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">MP</text>
                        {this.props.asUnit.mpControlHits.map( (mpValue, mpIndex) => {
                            let fillColor = "rgb(255,255,255)";
                            if( mpValue ) {
                                fillColor = this.activeDotColor;
                            }
                            return (
                                <React.Fragment key={mpIndex}>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * mpIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius}
                                        fill="rgb(0,0,0)"
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleMPHit(mpIndex)}
                                    ></circle>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * mpIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius - 3}
                                        fill={fillColor}
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleMPHit(mpIndex)}
                                    ></circle>
                                </React.Fragment>
                            )
                        })}
                        <text x="750" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">1/2 Move Each</text>
                        {critLineStart += this.critLineHeight}
                    </>
                ) :
                (
                    <></>
                )}

                <text x="750" y={critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">WEAPONS</text>
                {this.props.asUnit.weaponHits.map( (whValue, whIndex) => {
                            let fillColor = "rgb(255,255,255)";
                            if( whValue ) {
                                fillColor = this.activeDotColor;
                            }
                            return (
                                <React.Fragment key={whIndex}>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * whIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius}
                                        fill="rgb(0,0,0)"
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleWeaponHit(whIndex)}
                                    ></circle>
                                    <circle
                                        cx={770 + (this.buttonRadius * 2 + 3 ) * whIndex}
                                        cy={critLineStart - 27 + this.buttonRadius + 2}
                                        r={this.buttonRadius - 3}
                                        fill={fillColor}
                                        className={this.props.inPlay ? "cursor-pointer" : ""}
                                        onClick={() => this.toggleWeaponHit(whIndex)}
                                    ></circle>
                                </React.Fragment>
                            )
                })}
                <text x="750" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">-1 Damage Each</text>
                {critLineStart += this.critLineHeight}

                {this.props.asUnit.type.toLowerCase() === 'cv' ||  this.props.asUnit.type.toLowerCase() === 'sv'? (
                    <>
                        <text x="750" y={critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">MOTIVE</text>
                        <circle className="" cx="770" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="770" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="801" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="801" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="847" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="847" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="878" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="878" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="934" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="934" cy={critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <text x="775" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">-2 MV</text>
                        <text x="827" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">½ Move Each</text>
                        <text x="919" y={critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">0 MV</text>
                        {critLineStart += this.critLineHeight}
                    </>
                ) : (
                    <></>
                )}

                    </>
                ) : (
                    <>
                        {/* Infantry has no crits */}
                    </>
                )}

                {/* End Critical Hits */}

                {this.props.asUnit.active === false ? (
                    <>
                    <text x="50" y="100" font-family="sans-serif" transform="rotate( 30, 50, 100)" font-size="150" stroke="rgb(255,255,255)" stroke-width="4" fill="rgb(200,0,0)">WRECKED</text>
                    </>
                ) : (
                    <></>
                )}

                <rect x="10" y="610" width="960" height="35" fill="rgb(0,0,0)"></rect>
                <text x="20" y="625" textAnchor="start" fontFamily="sans-serif" fill="rgb(253,253,227)" style={{fontWeight: 700}} fontSize="30">ALPHA STRIKE</text>

                <BattleTechLogo
                    xLoc={750}
                    yLoc={600}
                    width={250}
                />
                </g>
                </svg>
            </>
        )
    }
}

interface IAlphaStrikeUnitSVGProps {
    height?: string;
    width?: string;
    asUnit: AlphaStrikeUnit | null;
    inPlay?: boolean;
    appGlobals: IAppGlobals;
    className?: string;
    forPrint?: boolean;
}

interface IAlphaStrikeUnitSVGState {
    showTakeDamage: boolean;
}