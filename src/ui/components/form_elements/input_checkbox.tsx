import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faCheckSquare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

    render = (): React.ReactFragment => {
        return (
            <label
                className={this.props.readOnly ? this.props.className : "checkbox-input " + this.props.className}
                onClick={this.toggleValue}
                title={this.props.readOnly ? "" : "Click here to toggle this value"}
            >
{this.props.readOnly ? (
    <div title={this.props.checked ? "Is" : "Is NOT"}>
    {this.props.checked ? (
        <FontAwesomeIcon icon={faCheckCircle} className="color-green" />
    ) : (
        <FontAwesomeIcon icon={faTimesCircle} className="color-red" />
    )}&nbsp;<strong>{this.props.label}</strong>
    </div>
) : (<>

                {this.props.checked ? (
                    <FontAwesomeIcon icon={faCheckSquare} className="color-green" />
                ) : (
                    <FontAwesomeIcon icon={faSquare} className="color-black" />
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
}

interface IInputCheckboxState {
}