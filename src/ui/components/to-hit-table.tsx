import React from 'react';

export default class ToHitTable extends React.Component<IToHitTableProps, IToHitTableState> {
  
    onClick = (
        e: React.FormEvent<HTMLTableCellElement>,
        loc: string,
        critical: boolean = false,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        if( this.props.onClick ) {
            this.props.onClick( loc, critical );
        }
    }
    render = (): React.ReactFragment => {
        return (
            <table className={this.props.className ? this.props.className + " table text-center": "table text-center"}>
      <thead>
        <tr>
          <th>Roll</th>
          <th>Left Side</th>
          <th>Front/Rear</th>
          <th>Right side</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2*</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "lt", true)}>Left Torso [critical]</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "ct", true)}>Center Torso [critical]</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rt", true)}>Right Torso [critical]</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>3</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ll")} >Left Leg</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "ra")}>Right Arm</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rl")} >Right Leg</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>4</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "la")}>Left Arm</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "ra")}>Right Arm</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ra")}>Right Arm</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>5</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "la")}>Left Arm</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "rl")}>Right Leg</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ra")}>Right Arm</td>
        </tr>
      </tbody>

      <tbody>
        <tr>
          <td>6</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ll")}>Left Leg</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "rt")}>Right Torso</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rl")}>Right Leg</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>7</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "lt")}>Left Torso</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "ct")}>Center Torso</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rt")}>Right Torso</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <th>8</th>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ct")}>Center Torso</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "lt")}>Left Torso</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ct")}>Center Torso</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>9</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rt")}>Right Torso</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "ll")}>Left Leg</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rt")}>Right Torso</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>10</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ra")}>Right Arm</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "la")}>Left Arm</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "la")}>Left Arm</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>11</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "rl")}>Right Leg</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "la")}>Left Arm</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "ll")}>Left Leg</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>12</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "hd")}>Head</td>
          <td className={this.props.onClick ? "cursor-pointer alt-bg" : "alt-bg"} onClick={(e) => this.onClick(e, "hd")}>Head</td>
          <td className={this.props.onClick ? "cursor-pointer" : ""} onClick={(e) => this.onClick(e, "hd")}>Head</td>
        </tr>
      </tbody>
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
    onClick?( location: string, critical: boolean ): void;
    className?: string;
}

interface IToHitTableState {
}