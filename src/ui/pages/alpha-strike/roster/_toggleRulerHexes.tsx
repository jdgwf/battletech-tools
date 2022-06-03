import * as React from 'react';
import { FaRuler } from 'react-icons/fa';
import { FiHexagon } from 'react-icons/fi';
import { IAppGlobals } from '../../../app-router';


export default class AlphaStrikeToggleRulerHexes extends React.Component<IAlphaStrikeToggleRulerHexesViewProps, IAlphaStrikeToggleRulerHexesViewState> {

    toggleAlphaStrikeMeasurementsInHexes = (
        e: React.FormEvent<HTMLSpanElement>
      ): void => {

        if( e && e.preventDefault ) e.preventDefault();

        let appSettings = this.props.appGlobals.appSettings;

        appSettings.alphaStrikeMeasurementsInHexes = !appSettings.alphaStrikeMeasurementsInHexes;
        this.props.appGlobals.saveAppSettings( appSettings );

    }

    render = (): React.Element => {

        return (
            <span
                className="current"
                title="Click to change the measurements from hexes to inches"

                onClick={this.toggleAlphaStrikeMeasurementsInHexes}
            >
            {this.props.appGlobals.appSettings.alphaStrikeMeasurementsInHexes ? (
                <FiHexagon />
            ) : (
                <FaRuler />
            )}
            </span>
        )
    }
}
interface IAlphaStrikeToggleRulerHexesViewProps {
    appGlobals: IAppGlobals;
}

interface IAlphaStrikeToggleRulerHexesViewState {
}