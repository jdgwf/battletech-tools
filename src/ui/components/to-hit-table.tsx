import React from 'react';
import { getLocationName } from '../../utils';
import { getBattleMechToHitChart } from '../../utils/getBattleMechToHitChart';

export default class ToHitTable extends React.Component<IToHitTableProps, IToHitTableState> {
  
    onClick = (
        e: React.FormEvent<HTMLTableCellElement|HTMLDivElement|HTMLButtonElement>,
        loc: string,
        critical: boolean,
        rear: boolean,
        currentSide: string,
        currentRoll: number,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        if( this.props.onClick ) {
            this.props.onClick( loc, critical, rear, currentSide, currentRoll );
        }
    }
    render = (): React.ReactFragment => {

        let toHitTable = getBattleMechToHitChart();

        return (
            <table style={{maxWidth: "500px"}} className={this.props.className ? this.props.className + " table text-center": "table text-center"}>
      <thead>
        <tr>
          <th>Roll</th>
          <th>Left Side</th>
          <th>Front/Rear</th>
          <th>Right side</th>
        </tr>
      </thead>
      {toHitTable.rows.map( (roll, rollIndex: number) => {
        return (
          <tbody key={rollIndex}>
        <tr>
          <td>{roll.roll}{roll.isCrit ? <sup>*</sup> : null}</td>
          <td>
            {this.props.onClick ? (
              <>
                <button 
                  className={this.props.currentRoll === roll.roll && this.props.currentSide === "left" && !this.props.currentRear? "btn btn-sm full-width btn-primary no-rl-margins" : "btn btn-sm full-width btn-secondary no-rl-margins"}  
                  onClick={(e) => this.onClick(
                    e, 
                    roll.left.location, 
                    (roll.isCrit || roll.left.isCrit ? true : false), 
                    false, 
                    "left", 
                    roll.roll)
                  }
                >
                  {getLocationName(roll.left.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""}
                  
                </button>
                {this.props.showRear && roll.left.hasRear ? (
                  <button 
                  className={this.props.currentRoll === roll.roll && this.props.currentSide === "left" && this.props.currentRear? "btn btn-sm full-width btn-primary no-rl-margins" : "btn btn-sm full-width btn-secondary no-rl-margins"}  
                  onClick={(e) => this.onClick(
                    e, 
                    roll.left.location, 
                    (roll.isCrit || roll.left.isCrit ? true : false), 
                    true, 
                    "left", 
                    roll.roll)
                  }
                >
                  {getLocationName(roll.left.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""} (Rear)
                </button>
                  
                ) : null}
              </>
            ) : (
              <>
              {getLocationName(roll.left.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""}
              </>
            )}
   
            
          </td>
          <td className={"alt-bg"}>
          
          {this.props.onClick ? (
              <>
                <button 
                  className={this.props.currentRoll === roll.roll && this.props.currentSide === "front" && !this.props.currentRear? "btn btn-sm full-width btn-primary no-rl-margins" : "btn btn-sm full-width btn-secondary no-rl-margins"}  
                  onClick={(e) => this.onClick(
                    e, 
                    roll.front.location, 
                    (roll.isCrit || roll.front.isCrit ? true : false), 
                    false, 
                    "front", 
                    roll.roll)
                  }
                >
                  {getLocationName(roll.front.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""}
                </button>
                {this.props.showRear && roll.front.hasRear ? (
                  <button 
                  className={this.props.currentRoll === roll.roll && this.props.currentSide === "front" && this.props.currentRear? "btn btn-sm full-width btn-primary no-rl-margins" : "btn btn-sm full-width btn-secondary no-rl-margins"}  
                  onClick={(e) => this.onClick(
                    e, 
                    roll.front.location, 
                    (roll.isCrit || roll.front.isCrit ? true : false), 
                    true, 
                    "front", 
                    roll.roll)
                  }
                >
                  {getLocationName(roll.front.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""} (Rear)
                </button>
                  
                ) : null}
              </>
            ) : (
              <>
              {getLocationName(roll.left.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""}
              </>
            )}
          </td>
          <td>
          {this.props.onClick ? (
              <>
                <button 
                  className={this.props.currentRoll === roll.roll && this.props.currentSide === "right" && !this.props.currentRear? "btn btn-sm full-width btn-primary no-rl-margins" : "btn btn-sm full-width btn-secondary no-rl-margins"}  
                  onClick={(e) => this.onClick(
                    e, 
                    roll.left.location, 
                    (roll.isCrit || roll.left.isCrit ? true : false), 
                    false, 
                    "right", 
                    roll.roll)
                  }
                >
                  {getLocationName(roll.right.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""}
                </button>
                {this.props.showRear && roll.right.hasRear ? (
                  <button 
                  className={this.props.currentRoll === roll.roll && this.props.currentSide === "right" && this.props.currentRear? "btn btn-sm full-width btn-primary no-rl-margins" : "btn btn-sm full-width btn-secondary no-rl-margins"}  
                  onClick={(e) => this.onClick(
                    e, 
                    roll.right.location, 
                    (roll.isCrit || roll.right.isCrit ? true : false), 
                    true, 
                    "right", 
                    roll.roll)
                  }
                >
                  {getLocationName(roll.right.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""} (Rear)
                </button>
                  
                ) : null}
              </>
            ) : (
              <>
              {getLocationName(roll.left.location, this.props.forQuad ? true : false )} {roll.isCrit ? "[critical]" : ""}
              </>
            )}

          </td>
        </tr>
      </tbody>
        )
      })}
     
      <tfoot>
        <tr>
          <th colSpan={4} className="small-text text-left">
            *A result of 2 may inflict a critical hit.<br />Apply damage to the armor in that section in the normal manner,<br />but the attacking player also rolls once on the Determining Critical Hits Table, p. 46.
          </th>
        </tr>
      </tfoot>
    </table>
        )
    }
}

interface IToHitTableProps {
    onClick?( 
      location: string, 
      critical: boolean, 
      rear: boolean,
      currentSide: string,
      currentRoll: number,
    ): void;
    className?: string;
    forQuad?: boolean;
    showRear?: boolean;
    currentSide?: string;
    currentRoll?: number;
    currentRear?: boolean;
}

interface IToHitTableState {

}
