import React from 'react';
import { IASPilotAbility } from '../../../data/alpha-strike-pilot-abilities';
import { IAppGlobals } from '../../app-router';
import BattleTechLogo from '../battletech-logo';

export default class AlphaStrikePilotCardSVG extends React.Component<IAlphaStrikePilotCardSVGProps, IAlphaStrikePilotCardSVGState> {
    height: string = "100%";
    width: string = "auto";
    damageLeftBase = 0;
    buttonRadius = 15;

    activeDotColor = "rgb(200,0,0)";

    critLineHeight = 50;

    constructor(props: IAlphaStrikePilotCardSVGProps) {
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

    }

    private _splitAbilities = ( val: string ): string[] => {
        val = val.trim();
        let words = val.split(" ");
        let rv: string[] = [];
        let line = "";



        for( let word of words ) {
            word = word.trim();
            if( word ) {
                if( line.length + word.length + 1 > 35 ) {
                    rv.push( line );
                    line = "";
                }
                if( line.trim() ) {
                    line += " "
                }
                line += word;
            }
        }
        rv.push( line );

        return rv;
    }

    render = (): JSX.Element => {
        if( !this.props.pilotAbility ) {
            return <></>
        }

        let desc = this._splitAbilities( this.props.pilotAbility.summary);

        return (

            <>
                <svg className={this.props.className} version="1.1" x="0px" y="0px" viewBox="0 0 1000 640" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0, 0)">
                <rect x="0" y="0" width="1000" height="640px" fill="rgb(0,0,0)"></rect>
                <rect x="10" y="10" style={{zIndex: -1}} width="980" height="580" fill="rgb(255,255,255)"></rect>
                <rect x="850" y="9" width="150" height="35" fill="rgb(0,0,0)"></rect>
                <text x="990" y="35" textAnchor="end" fill="rgb(255,255,255)" stroke="rgb(255,255,255)" fontFamily="sans-serif" fontSize="33">PV: {this.props.pilotAbility.cost}</text>


                <text x="20" y="60" fontFamily="sans-serif" fontSize="60">{this.props.pilotAbility.ability.toUpperCase()}</text>



                {desc.map( (line, lineIndex) => {
                    return (
                        <text key={lineIndex} x="60" y={140 + lineIndex * 50} fontFamily="sans-serif" fontSize="50">{line}</text>
                    )
                })}

                <rect x="10" y="610" width="960" height="35" fill="rgb(0,0,0)"></rect>
                <text x="20" y="625" textAnchor="start" fontFamily="sans-serif" fill="rgb(253,253,227)" style={{fontWeight: 700}} fontSize="30">ALPHA STRIKE PILOT ABILITY</text>

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

interface IAlphaStrikePilotCardSVGProps {
    height?: string;
    width?: string;
    pilotAbility: IASPilotAbility | null;
    inPlay?: boolean;
     appGlobals: IAppGlobals;
    className?: string;
    forPrint?: boolean;
    showExtreme?: boolean;
    measurementsInHexes: boolean;
}

interface IAlphaStrikePilotCardSVGState {
    showTakeDamage: boolean;
}