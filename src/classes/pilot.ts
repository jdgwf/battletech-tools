import { CONST_AS_PILOT_ABILITIES, IASPilotAbility } from "../data/alpha-strike-pilot-abilities";

export interface IPilot {
    name: string;
    piloting: number;
    gunnery: number;
    wounds: number;
    alphaStrikeAbilities: number[];
}

export default class Pilot {
    name: string = "";
    piloting: number = 5;
    gunnery: number = 4;
    wounds: number = 0;
    alphaStrikeAbilities: number[] = [];

    constructor(importObj: IPilot | null = null ) {
        if( importObj ) {
            this.import(importObj);
        }

    }

    import(importObj: IPilot | null = null  ) {
        if( importObj ) {
            if( importObj.name ) {
                this.name = importObj.name;
            }
            if( importObj.piloting ) {
                this.piloting = importObj.piloting;
            }
            if( importObj.gunnery ) {
                this.piloting = importObj.piloting;
            }
            if( importObj.piloting ) {
                this.piloting = importObj.piloting;
            }
            if( importObj.alphaStrikeAbilities ) {
                this.alphaStrikeAbilities = importObj.alphaStrikeAbilities;
            }
        }
    }

    getASAbilities(): IASPilotAbility[] {
        let rv: IASPilotAbility[] = [];

        for( let id of this.alphaStrikeAbilities ) {
            for( let abi of CONST_AS_PILOT_ABILITIES) {
                if( abi.id === id ) {
                    rv.push( abi );
                    break;
                }
            }


        }

        return rv;
    }


    export(): IPilot {
        let rv: IPilot = {
            name: this.name,
            piloting: this.piloting,
            gunnery: this.gunnery,
            wounds: this.wounds,
            alphaStrikeAbilities: this.alphaStrikeAbilities,
        }

        return rv;
    }


}
