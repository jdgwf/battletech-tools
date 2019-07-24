
import React from 'react';
import { Link } from 'react-router-dom';
import './MechCreatorStatusBar.scss';
import {IAppGlobals} from '../AppRouter';

export default class MechCreatorStatusBar extends React.Component<IMechCreatorStatusBarProps, IMechCreatorStatusBarState> {
    constructor(props: IMechCreatorStatusBarProps) {
        super(props);
        this.state = {
        }
    }

    render() {
      return (
          <div className="mech-creator-status-bar">
            <strong>Move Heat</strong>: {this.props.appGlobals.currentBattleMech.getMoveHeat()} |&nbsp;
            <strong>Weapon Heat</strong>: {this.props.appGlobals.currentBattleMech.getWeaponHeat()} |&nbsp;
            <strong>Heat Dissipation</strong>: {this.props.appGlobals.currentBattleMech.getHeatDissipation()} |&nbsp;
            {this.props.appGlobals.currentBattleMech.getHeatSummary() < 0 ? (
                <><strong>Heat Summary</strong>: <span className="color-green">{this.props.appGlobals.currentBattleMech.getHeatSummary()}</span> |&nbsp;</>
            ) : (
                <><strong>Heat Summary</strong>: <span className="color-red">{this.props.appGlobals.currentBattleMech.getHeatSummary()}</span> |&nbsp;</>
            )}

            <strong>Remaining Tons</strong>: {this.props.appGlobals.currentBattleMech.getRemainingTonnage()} |&nbsp;
            <strong>Unallocated Armor</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedArmor()} |&nbsp;
            <strong>Unallocated Criticals</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedCritCount()}
          </div>
      );
    }
}

interface IMechCreatorStatusBarProps {
    current?: string;
    appGlobals: IAppGlobals;
}

interface IMechCreatorStatusBarState {
}