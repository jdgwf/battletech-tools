import * as React from 'react';
import { makeRange } from '../../../utils';

export default class InputNumeric extends React.Component<IInputNumericProps, IInputNumericState> {

    onSelectFocus = (event: React.FormEvent<HTMLSelectElement>) => {
        if( this.props.onFocus ) {
            // no idea if this will work or not
            //@ts-ignore
            this.props.onFocus( event as React.FormEvent<HTMLInputElement>  )
        }
    }

    onSelectBlur = (event: React.FormEvent<HTMLSelectElement>) => {
        if( this.props.onBlur ) {
            // no idea if this will work or not
            //@ts-ignore
            this.props.onBlur( event as React.FormEvent<HTMLInputElement>  )
        }
    }

    onInputFocus = (event: React.FormEvent<HTMLInputElement>) => {
        if( this.props.onFocus )
            this.props.onFocus( event )

    }
    onInputBlur = (event: React.FormEvent<HTMLInputElement>) => {
        if( this.props.onBlur )
            this.props.onBlur( event )
    }

    onSelectChange = ( event: React.FormEvent<HTMLSelectElement>) => {
        if( this.props.onChange ) {
            // we only ever really use event.currentTarget.value - ignoring ts problems
            //@ts-ignore
            this.props.onChange( event as React.FormEvent<HTMLInputElement> )
        }
        if( this.props.setValue )
            this.props.setValue( +event.currentTarget.value )
    }

    onInputChange = ( event: React.FormEvent<HTMLInputElement>) => {
        if( this.props.onChange )
            this.props.onChange( event )
        if( this.props.setValue )
            this.props.setValue( +event.currentTarget.value )
    }

    render() {
        let label = "";
        if( this.props.label && this.props.label.trim() )
            label = this.props.label;

        if(
            typeof(this.props.min) !== "undefined"
            &&
            typeof(this.props.max) !== "undefined"
            &&
            this.props.step === 1
        ) {
            return (
                <label title={this.props.title} className={this.props.className}>

                    {label ? (
                        <><strong>{label}</strong>:
                        {this.props.inline ? <>&nbsp;</> : <br />}
                        </>
                    ) : null}

                    {this.props.readOnly ? (
                        <strong>
                            {this.props.value}
                        </strong>
                    ) : (
                    <select
                        onChange={this.onSelectChange}
                        value={this.props.value}
                        name={this.props.name}
                        title={this.props.title}
                        onFocus={this.onSelectFocus}
                        onBlur={this.onSelectBlur}
                        className={this.props.inline ? "auto-width" : ""}
                    >
                        {makeRange( this.props.min, this.props.max).map( (value: number ) => {
                            return (
                                <option key={value} value={value}>{value}</option>
                            )
                        })}
                    </select>
                    )}

                </label>
            )
        } else {
            return (
                <label title={this.props.title} className={this.props.className}>
                    {label ? (
                        <><strong>{label}</strong>:
                        {this.props.inline ? <>&nbsp;</> : <br />}
                        </>
                    ) : null}

                    {this.props.description ? (
                        <div className="small-text">{this.props.description}</div>
                    ) : ( <></> )}

                    {this.props.children ? (
                        <div className="small-text">
                            {this.props.children}
                        </div>
                    ) : ( <></> )}

                    <input
                        type="number"
                        name={this.props.name}
                        title={this.props.title}
                        autoFocus={this.props.autoFocus}
                        onChange={this.onInputChange}
                        value={this.props.value}
                        readOnly={this.props.readOnly}
                        placeholder={this.props.placeholder}
                        className={"full-width " + this.props.inputClassName}
                        min={this.props.min}
                        max={this.props.max}
                        step={this.props.step}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                    />
                </label>

            )
        }

    }
}

interface IInputNumericProps {
    label?: string;
    onChange?( event: React.FormEvent<HTMLInputElement>): void;
    setValue?( newValue: number ): void;
    value: number | undefined;
    description?: string;
    name?: string;
    title?: string;
    inline?: boolean;
    className?: string;
    inputClassName?: string;
    autoFocus?: boolean;
    placeholder?: string;
    readOnly?: boolean;
    min?: number;
    max?: number;
    step?: number;
    onFocus?( event: React.FormEvent<HTMLInputElement>): void;
    onBlur?( event: React.FormEvent<HTMLInputElement>): void;
}

interface IInputNumericState {
}