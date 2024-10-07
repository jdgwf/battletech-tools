
import { FaSquare, FaCheckCircle, FaTimesCircle, FaCheckSquare } from "react-icons/fa";
import * as React from 'react';

export default class InputCheckbox extends React.Component<IInputCheckboxProps, IInputCheckboxState> {

    onChange = ( event: React.FormEvent<HTMLInputElement>): void => {
        if(!this.props.readOnly) {
            let returnEvent = {
                currentTarget: {
                    checked: !this.props.checked
                }
            }
            if( this.props.onChange )
                this.props.onChange( returnEvent as React.FormEvent<HTMLInputElement> );
            // if( this.props.setValue )
            //     this.props.setValue( event.currentTarget.checked );
        }

    }

    toggleValue = (): void => {
        if(!this.props.readOnly) {
            let newValue = !this.props.checked;
            if( this.props.setValue )
                this.props.setValue( newValue );

            if( this.props.onChange ) {
                let returnEvent = {
                    currentTarget: {
                        checked: !this.props.checked
                    }
                }
                this.props.onChange( returnEvent as React.FormEvent<HTMLInputElement> );
            }
        }
    }

    render = (): JSX.Element => {
        return (
            <label
                className={this.props.readOnly ? this.props.className : "checkbox-input " + this.props.className}
                onClick={this.toggleValue}
                title={this.props.readOnly ? "" : "Click here to toggle this value"}
            >
{this.props.readOnly ? (
    <div title={this.props.checked ? "Is" : "Is NOT"}>
    {this.props.checked ? (
        <FaCheckCircle className="color-green" />
    ) : (
        <FaTimesCircle className="color-red" />
    )}&nbsp;<strong>{this.props.label}</strong>
    </div>
) : (<>

                {this.props.checked ? (
                    <FaCheckSquare className="color-green" />
                ) : (
                    <FaSquare className="color-black" />
                )}

                &nbsp;<strong>{this.props.label}</strong>

                {this.props.description ? (
                    <div className="small-text">{this.props.description}</div>
                ) : ( <></> )}
</> )}
                {this.props.children ? (
                    <div className="small-text">
                        {this.props.children}
                    </div>
                ) : ( <></> )}

            </label>

        )
    }
}

interface IInputCheckboxProps {
    label: string;
    onChange?( event: React.FormEvent<HTMLInputElement>): void
    setValue?( newValue: boolean ): void
    checked: boolean;
    name?: string;
    className?: string;
    inputClassName?: string;
    autoFocus?: boolean;
    readOnly?: boolean;
    description?: string;
    children?: React.ReactNode | React.ReactNode[];
}

interface IInputCheckboxState {
}