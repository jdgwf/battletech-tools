import { FaArrowCircleLeft, FaPrint } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../../app-router';
import BattleTechLogo from '../../../components/battletech-logo';
import './print.scss';
import BattleMechSVG from "../../../components/svg/battlemech-svg";

export default class ClassicBattleTechRosterPrint extends React.Component<IPrintProps, IPrintState> {
    constructor(props: IPrintProps) {
        super(props);

        this.state = {
            updated: false,
        };

        this.props.appGlobals.makeDocumentTitle("Printing CBT Force");
    }

    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentCBTForce) {
        return <></>;
      }
      return (
        <>
          <header className="topmenu">
            <ul className="main-menu">
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/classic-battletech/roster`}><FaArrowCircleLeft /></Link></li>
                <li><span title="Click here open the Print Dialog" onClick={() => window.print()} className="current" ><FaPrint /></span></li>
                <li className="logo">
                    <a
                        href="https://battletech.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo />
                    </a>
                </li>
            </ul>

          </header>
          <div className={"summary-page"}>
            <br />
            <h1 className="text-center">Classic BattleTech Force Summary</h1>

          <table className="full-width">
            <tbody>
              <tr>
                <td className="text-center"><strong># Groups:</strong> {this.props.appGlobals.currentCBTForce.getTotalGroups()}</td>
                <td className="text-center"><strong># Units:</strong> {this.props.appGlobals.currentCBTForce.getTotalUnits()}</td>
                <td className="text-center"><strong>Tons:</strong> {this.props.appGlobals.currentCBTForce.getTotalTons()}</td>
                <td className="text-center"><strong>Tech:</strong> {this.props.appGlobals.currentCBTForce.getTech()}</td>
                <td className="text-center"><strong>Total BV2:</strong> {this.props.appGlobals.currentCBTForce.getTotalBV2()}</td>
              </tr>
            </tbody>
          </table>
            {/* <p className="text-right">

            <strong># Groups:</strong> {this.props.appGlobals.currentCBTForce.getTotalGroups()}<br />
            <strong># Units:</strong> {this.props.appGlobals.currentCBTForce.getTotalUnits()}<br />
            <strong>Tons:</strong> {this.props.appGlobals.currentCBTForce.getTotalTons()}<br />
            <strong>Tech:</strong> {this.props.appGlobals.currentCBTForce.getTech()}<br />
            <strong>Total BV2:</strong> {this.props.appGlobals.currentCBTForce.getTotalBV2()}</p> */}
            {this.props.appGlobals.currentCBTForce.groups.map( (group, groupIndex) => {
              return (
                <div className="group" key={groupIndex}>
                  <table className="print-table">
                    <thead>
                      <tr>
                        <th
                          colSpan={2}
                          className="no-right-border"
                        >
                          {group.getName(groupIndex)}
                        </th>
                        <th
                          colSpan={5}
                          className="text-right"
                        >
                          # Units {group.getTotalUnits()}
                          &nbsp;|&nbsp;
                          {group.getTotalTons()} Tons - {group.getTech()}
                          &nbsp;|&nbsp;
                          Group BV2: {group.getTotaBV2()}
                        </th>
                      </tr>
                      <tr>
                        <th>
                          Unit Name
                        </th>
                        <th className="min-width no-wrap">
                        Tons
                        </th>
                        <th className="min-width no-wrap">
                        Tech
                        </th>
                        <th className="min-width no-wrap">
                        MW Piloting
                        </th>
                        <th className="min-width no-wrap">
                        MW Gunnery
                        </th>
                        <th className="min-width no-wrap">
                          Base BV2
                        </th>
                        <th className="min-width no-wrap">
                          Adjusted BV2
                        </th>
                      </tr>
                    </thead>
                    {group.members.map( (unit, unitIndex) => {
                    return (
                    <tbody key={unitIndex}>
                    <tr>
                        <td>
                          {unit.getName()}
                        </td>
                        <td>
                          {unit.getTonnage()}
                        </td>
                        <td className="small-text">
                          {unit.getTech().name}
                        </td>
                        <td className="min-width no-wrap text-center">
                          {unit.pilot.piloting}
                        </td>
                        <td className="min-width no-wrap text-center">
                          {unit.pilot.gunnery}
                        </td>
                        <td className="min-width no-wrap text-center">
                          {unit.getBattleValue()}
                        </td>
                        <td className="min-width no-wrap text-right">
                          {unit.getPilotAdjustedBattleValue()}
                        </td>
                      </tr>
                    </tbody>
                    )
                    })}
                  </table>
                </div>
              )
            })}
            <div className="print-footer">
              <div className="print-logo">
                <BattleTechLogo />
              </div>
              <p>Printed using Jeff's BattleTech Tools at https://jdgwf.github.io/battletech-tools/. Huge thanks to the Master Unit List</p>
              <p>MechWarrior, BattleMech, ‘Mech and AeroTech are registered trademarks of The Topps Company, Inc. All Rights Reserved.</p>
            </div>
          </div>
          {this.props.appGlobals.currentCBTForce.groups.map( (group, groupIndex) => {
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div className="print-section">

                  {group.members.map( (unit, unitIndex) => {
                    return (

                    <React.Fragment key={unitIndex}>
                      <div className={"page"}>

                        <BattleMechSVG
                          mechData={unit}
                        />
                      </div>
                    </React.Fragment>
                    )
                  })}

              </div>

            </React.Fragment>
            )
          })}

            {/* <footer className="print-footer">
              <div className="print-logo">
                <BattleTechLogo />
              </div>
              <p>Printed using Jeff's BattleTech Tools at https://jdgwf.github.io/battletech-tools/. Huge thanks to the Master Unit List</p>
              <p>MechWarrior, BattleMech, ‘Mech and AeroTech are registered trademarks of The Topps Company, Inc. All Rights Reserved.</p>
            </footer> */}
            {/* <header className="print-header">&nbsp;</header> */}

        </>
      );
    }
}

interface IPrintProps {
  appGlobals: IAppGlobals;

}

interface IPrintState {
  updated: boolean;
}