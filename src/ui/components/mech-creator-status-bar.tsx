
import React from 'react';
import { IAppGlobals } from '../app-router';
import './mech-creator-status-bar.scss';

export default class MechCreatorStatusBar extends React.Component<IMechCreatorStatusBarProps, IMechCreatorStatusBarState> {
    constructor(props: IMechCreatorStatusBarProps) {
        super(props);
        this.state = {
        }
    }

    render() {
      return (
          <div className="mech-creator-status-bar">
            <span className="no-wrap inline-block"><strong>Remaining Tons</strong>: {this.props.appGlobals.currentBattleMech.getRemainingTonnage()}</span>&nbsp;|&nbsp;
            <span className="no-wrap inline-block"><strong>Unallocated Armor</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedArmor()}</span>&nbsp;|&nbsp;
            <span className="no-wrap inline-block"><strong>Unallocated Criticals</strong>: {this.props.appGlobals.currentBattleMech.getUnallocatedCritCount()}</span>&nbsp;|&nbsp;

            <span className="no-wrap inline-block"><strong>Move Heat</strong>: {this.props.appGlobals.currentBattleMech.getMoveHeat()}</span>&nbsp;|&nbsp;
            <span className="no-wrap inline-block"><strong>Weapon Heat</strong>: {this.props.appGlobals.currentBattleMech.getWeaponHeat()}</span>&nbsp;|&nbsp;
            <span className="no-wrap inline-block"><strong>Heat Dissipation</strong>: {this.props.appGlobals.currentBattleMech.getHeatDissipation()}</span>&nbsp;|&nbsp;
            {this.props.appGlobals.currentBattleMech.getHeatSummary() < 1 ? (
                <><span className="no-wrap inline-block"><strong>Heat Summary</strong>: <span className="color-green">{this.props.appGlobals.currentBattleMech.getHeatSummary()}</span></span></>
            ) : (
                <><span className="no-wrap inline-block"><strong>Heat Summary</strong>: <span className="color-red">{this.props.appGlobals.currentBattleMech.getHeatSummary()}</span></span></>
            )}


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