import * as React from 'react';
import './stat-bar.scss';

export default class StarBar extends React.Component<IStarBarProps, IStarBarState> {

    constructor(props: IStarBarProps) {
        super(props);
        this.state = {
            updated: false,
        };
    }

    render = (): React.ReactFragment => {

        let statBarCurrentStyle: React.CSSProperties = {
            width: this.props.currentPercentage + "%",
            height: this.props.height + "px",
        }

        let statBarStyle: React.CSSProperties = {
            height: this.props.height + "px",
        }

        if( this.props.background ) {
            statBarStyle["background"] = this.props.background;
        }

        if( this.props.color ) {
            statBarCurrentStyle["background"] = this.props.color;
        }

        return (

            <div
                className="stat-bar"
                style={statBarStyle}
                title={this.props.title}
            >
                <div
                    className="stat-bar-current"
                    style={statBarCurrentStyle}
                ></div>
            </div>

        )
    }
}

interface IStarBarProps {
    color?: string;
    background?: string;
    currentPercentage: number;
    height: number;
    title?: string;
}

interface IStarBarState {
}