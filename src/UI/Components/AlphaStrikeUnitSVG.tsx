import React from 'react';
import { AlphaStrikeUnit } from '../../Classes/AlphaStrikeUnit';
import BattleTechLogo from './BattleTechLogo';

export default class AlphaStrikeUnitSVG extends React.Component<IAlphaStrikeUnitSVGProps, IAlphaStrikeUnitSVGState> {
    height: string = "100%";
    width: string = "auto";
    damageLeftBase = 0;
    buttonRadius = 15;

    critLineHeight = 50;
    critLineStart = 325;

    constructor(props: IAlphaStrikeUnitSVGProps) {
        super(props);
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
    }

    makeArmorDots(
        count: number,
        xLoc: number,
        yLoc: number,
        fillColor: string = "rgb(255,255,255)",
        strokeColor: string = "rgb(0,0,0)",
        radius: number = 0,
    ): JSX.Element[] {
        let dots: JSX.Element[] = []

        if( radius === 0 ) {
            radius = this.buttonRadius - 5;
        }

        for( let currentCount = 0; currentCount < count; currentCount++ ) {
            dots.push(
                <React.Fragment key={currentCount}>
                    <circle className=""
                        cx={this.damageLeftBase + xLoc + (currentCount * (radius * 2 + 9)) }
                        cy={yLoc}
                        r={radius + 3}
                        fill={strokeColor}
                    />
                    <circle className=""
                        cx={this.damageLeftBase + xLoc + (currentCount * (radius * 2 + 9)) }
                        cy={yLoc}
                        r={radius}
                        fill={fillColor}
                    />
                </React.Fragment>
            )
        }

        return dots;
    }

    render() {
        if( !this.props.asUnit ) {
            return <></>
        }

        console.log("xx", this.props.asUnit.ImageUrl)

        return (

            <>
                <svg version="1.1" x="0px" y="0px" viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 0)">
                <rect x="0" y="0" width="1000" height="640px" fill="rgb(0,0,0)"></rect>
                <rect x="10" y="10" style={{zIndex: -1}} width="980" height="580" fill="rgb(255,255,255)"></rect>
                {this.props.asUnit.ImageUrl ? (
                    <image x="440" y="10" href={this.props.asUnit.ImageUrl} width="550" height="500"></image>
                ) : (
                    <></>
                )}

                <text x="20" y="50" fontFamily="sans-serif" fontSize="40">{this.props.asUnit.name}</text>
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
                <text x="140" y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">S (0 | {this.props.asUnit.currentToHitShort}+)</text>
                <text x="140" y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.short}</text>
                <text x="290" y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">M (+2 | {this.props.asUnit.currentToHitMedium}+)</text>
                <text x="290" y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.medium}</text>
                <text x="440" y="245" fontFamily="sans-serif" textAnchor="middle" fontSize="20">L (+4 | {this.props.asUnit.currentToHitLong}+)</text>
                <text x="440" y="280" fontFamily="sans-serif" textAnchor="middle" fontSize={35}>{this.props.asUnit.currentDamage.long}</text>
                <rect x="20" y="310" width="550" height="80" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="25" y="315" width="540" height="70" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>
                <text x="40" y="360" fontFamily="sans-serif" fontSize={35}>OV: 0</text>
                <text x="240" y="357" textAnchor="end" fontFamily="sans-serif" fontSize="15">HEAT SCALE</text>
                <rect x="295" y="320" width="265" height="60" fill="rgb(0,0,0)" rx="30" ry="30"></rect>
                <rect className=""x="325" y="325" width="25" height="50" fill="rgb(102,102,102)"></rect>
                <circle className="" cx="325" cy="350" r="25" fill="rgb(102,102,102)"></circle>
                <text className=""x="315" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>0</text>
                <rect className=""x="355" y="325" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className=""x="365" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>1</text>
                <rect className=""x="405" y="325" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className=""x="415" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>2</text>
                <rect className=""x="455" y="325" width="45" height="50" fill="rgb(102,102,102)"></rect>
                <text className=""x="465" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>3</text>
                <rect className=""x="505" y="325" width="25" height="50" fill="rgb(102,102,102)"></rect>
                <circle className="" cx="530" cy="350" r="25" fill="rgb(102,102,102)"></circle>
                <text className=""x="515" y="363" textAnchor="left" style={{fill: "rgb(255,255,255)"}} fontFamily="sans-serif" fontSize={35}>S</text>



                {/* Armor and Structure Box */}
                <rect x="20" y="400" width="550" height="105" fill="rgb(0,0,0)" rx="18" ry="18"></rect>
                <rect x="25" y="405" width="540" height="95" fill="rgba( 255,255,255,.8)" rx="15" ry="15"></rect>

                {this.props.inPlay ? (
                    <>
		            <rect className="mouse-hand" x="30" y="410" width="40" height="85" fill="rgb(255,0, 0)" rx="15" ry="15" />
		            <text className="mouse-hand" x="60" y="430" fill="rgba(255,255,255)" fontFamily="sans-serif" textAnchor="middle" fontSize={13} transform="rotate(270, 65, 447)">TAKE</text>
		            <text className="mouse-hand" x="70" y="430" fill="rgba(255,255,255)" fontFamily="sans-serif" textAnchor="middle" fontSize={13} transform="rotate(270, 75, 445)">DAMAGE</text>
                    </>
                ): (
                    <></>
                )}
                {/* Armor */}
                <text x={this.damageLeftBase + 40} y="440" fontFamily="sans-serif" fontSize="25">A: </text>

                {this.makeArmorDots( this.props.asUnit.armor, 90, 432, "rgb(255,255,255)", "rgb(0,0,0)" )}
                {/* End Armor */}

                {/* Structure */}
                <text x={this.damageLeftBase + 40} y="485" fontFamily="sans-serif" fontSize="25">S: </text>
                {this.makeArmorDots( this.props.asUnit.structure, 90, 477, "rgb(153,153,153)", "rgb(0,0,0)" )}
                {/* End Structure */}

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
                        <text x="750" y={this.critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">ENGINE</text>
                        <circle cx="770" cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle cx="770" cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius - 3}  fill="rgb(255,255,255)"></circle>

                        <circle cx="803" cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle cx="803" cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>

                        <text x="750" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">+1 Heat/Firing Weapons</text>
                        {this.critLineStart += this.critLineHeight}
                    </>
                ) : (
                    <></>
                )}

                <text x="750" y={this.critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">FIRE CONTROL</text>
                {this.props.asUnit.fireControlHits.map( (fcValue, fcIndex) => {
                    return (
                        <React.Fragment key={fcIndex}>
                            <circle cx={770 + (this.buttonRadius * 2 + 3 ) * fcIndex} cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                            <circle cx={770 + (this.buttonRadius * 2 + 3 ) * fcIndex} cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        </React.Fragment>
                    )
                })}
                <text x="750" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">+2 To Hit Each</text>
                {this.critLineStart += this.critLineHeight}


                {this.props.asUnit.type.toLowerCase() === 'bm' || this.props.asUnit.type.toLowerCase() === 'pm' ? (
                    <>
                        <text x="750"y={this.critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">MP</text>
                        {this.props.asUnit.mpControlHits.map( (mpValue, mpIndex) => {
                            return (
                                <React.Fragment key={mpIndex}>
                                    <circle cx={770 + (this.buttonRadius * 2 + 3 ) * mpIndex} cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                                    <circle cx={770 + (this.buttonRadius * 2 + 3 ) * mpIndex} cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                                </React.Fragment>
                            )
                        })}
                        <text x="750" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">1/2 Move Each</text>
                        {this.critLineStart += this.critLineHeight}
                    </>
                ) :
                (
                    <></>
                )}


                <text x="750" y={this.critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">WEAPONS</text>
                {this.props.asUnit.weaponHits.map( (whValue, whIndex) => {
                    return (
                        <React.Fragment key={whIndex}>
                            <circle cx={770 + (this.buttonRadius * 2 + 3 ) * whIndex} cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                            <circle cx={770 + (this.buttonRadius * 2 + 3 ) * whIndex} cy={this.critLineStart - 27 + this.buttonRadius + 2} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        </React.Fragment>
                    )
                })}
                <text x="750" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">-1 Damage Each</text>
                {this.critLineStart += this.critLineHeight}

                {this.props.asUnit.type.toLowerCase() === 'cv' ||  this.props.asUnit.type.toLowerCase() === 'sv'? (
                    <>
                        <text x="750" y={this.critLineStart} textAnchor="end" fontFamily="sans-serif" fontSize="20">MOTIVE</text>
                        <circle className="" cx="770" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="770" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="801" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="801" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="847" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="847" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="878" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="878" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <circle className="" cx="934" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius} fill="rgb(0,0,0)"></circle>
                        <circle className="" cx="934" cy={this.critLineStart + this.buttonRadius - 27 + 3} r={this.buttonRadius - 3} fill="rgb(255,255,255)"></circle>
                        <text x="775" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">-2 MV</text>
                        <text x="827" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">½ Move Each</text>
                        <text x="919" y={this.critLineStart + this.buttonRadius + 3} textAnchor="start" fontFamily="sans-serif" fontSize="12">0 MV</text>
                        {this.critLineStart += this.critLineHeight}
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
}

interface IAlphaStrikeUnitSVGState {
}