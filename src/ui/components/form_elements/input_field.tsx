import { FaChevronDown, FaChevronUp, FaQuestion } from "react-icons/fa";
import * as React from 'react';
import { Link } from 'react-router-dom';

export default class InputField extends React.Component<IInputFieldProps, IInputFieldState> {
    constructor(props: IInputFieldProps) {
        super(props);
        this.state = {
            ddOpen: false,
        }
    }

    toggleDD = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.setState({
            ddOpen: !this.state.ddOpen,
        })
    }

    updateText = (event: React.FormEvent<HTMLInputElement>) => {
        if( this.props.setValue )
            this.props.setValue( event.currentTarget.value );
        if( this.props.onChange )
            this.props.onChange( event );
    }

    setText = (newValue: string) => {
        let event = {
            currentTarget: {
                value: newValue,
            }
        }

        if( this.props.setValue )
            this.props.setValue( newValue );
        if( this.props.onChange )
            this.props.onChange( event as React.FormEvent<HTMLInputElement> );

        if( this.props.onSetCharacter )
            this.props.onSetCharacter();

        this.setState({
            ddOpen: false,
        })
    }

    numericOnly = ( e: React.KeyboardEvent<HTMLInputElement>) => {
        if( this.props.numericOnly ) {
            if(

                e.key === "-"
                    ||
                e.key === "0"
                ||
                e.key === "1"
                ||
                e.key === "2"
                ||
                e.key === "3"
                ||
                e.key === "4"
                ||
                e.key === "5"
                ||
                e.key === "6"
                ||
                e.key === "7"
                ||
                e.key === "8"
                ||
                e.key === "9"
                ||
                e.key === "."
                ||
                e.key === "Backspace"
                ||
                e.key === "Delete"
                ||
                e.key === "ArrowLeft"
                ||
                e.key === "ArrowUp"
                ||
                e.key === "ArrowDown"
                ||
                e.key === "ArrowRight"
                ||
                e.key === "Control"
                ||
                e.key === "Command"
                ||
                e.key === "Alt"
                ||
                e.key === "Home"
                ||
                e.key === "End"
            ) {
                return true;
            } else {
                e.preventDefault();
                // console.log(e.keyCode)
                // console.log(e.key)
                return false;
            }
        } else {
            return true;
        }

    }

    render = (): React.ReactFragment => {
        let value = "";
        if( this.props.value )
            value = this.props.value;

        let label = "";
        if( this.props.label && this.props.label.trim() )
            label = this.props.label;

        let type = "text"
        if( this.props.type )
            type = this.props.type;

        let fieldReadOnly = false;
        if( this.props.readOnly )
            fieldReadOnly = true;

        return (

            <div className="position-relative">
                {this.props.helpURL && this.props.helpURL.trim() !== ""
                ?
                (
                <Link
                    to={this.props.helpURL}
                    target="savaged-help"
                    className="pull-left btn-sm btn-primary btn help-button"
                >
                    <FaQuestion />
                </Link>
                )
                :
                (
                    <></>
                )}
                {this.props.ddList && this.props.ddList.length > 0 ? (
                    <>
                        <button
                            className="btn dd-button btn-sm"
                            type="button"
                            onClick={this.toggleDD}
                        >
                            {this.state.ddOpen ? (
                                <FaChevronDown />
                            ) : (
                                <FaChevronUp />
                            )}
                        </button>
                        {this.state.ddOpen ? (
                            <ul className="dd-list">
                                {this.props.ddList.map( (item, itemIndex) => {
                                    return (
                                        <li
                                            key={itemIndex}
                                            onClick={() => this.setText(item)}
                                        >{item}</li>
                                    )
                                })}
                            </ul>
                        ) : null}
                    </>
                ) : null }
            <label
                title={this.props.title}
                className={this.props.className}
                style={this.props.style}

            >

                {label ? (
                    <strong>{label}:
                    {this.props.inline ? <>&nbsp;</> : <br />}
                    </strong>
                ) : null}

                {this.props.description && this.props.description.trim() !== ""
                ?
                (
                    <div className="small-text">{this.props.description}</div>
                ):
                null}

                {this.props.children && !this.props.childrenAfter ? (
                    <div className="small-text">
                        {this.props.children}
                    </div>
                ) : null}

                <input
                    onChange={this.updateText}
                    type={type}
                    id={this.props.id}
                    ref={this.props.ref}
                    value={value}
                    className={this.props.inline ? "width-auto inline-block" : "full-width"}
                    readOnly={fieldReadOnly}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.numericOnly}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    autoFocus={this.props.autoFocus}
                    required={this.props.required}
                    name={this.props.name}
                    autoComplete={this.props.autofill ? "on" : "off"}
                    spellCheck={this.props.spellCheck}
                    onKeyPress={this.props.onKeyPress}
                />
                {this.props.children && this.props.childrenAfter ? (
                    <div className="small-text">
                        {this.props.children}
                    </div>
                ) : null}

            </label>
        </div>
        )

    }
}

interface IInputFieldProps {
    value?: string;
    label?: string;
    type?: string;
    name?: string;
    title?: string;
    className?: string;
    inline?: boolean;
    helpURL?: string;
    readOnly?: boolean;
    autofill?: boolean;
    description?: string;
    placeholder?: string;
    id?: string;
    setValue?( newValue: string): void;
    onChange?( event: React.FormEvent<HTMLInputElement>): void;
    onFocus?( event: React.FormEvent<HTMLInputElement>): void;
    onBlur?( event: React.FormEvent<HTMLInputElement>): void;
    onKeyPress?( event: React.KeyboardEvent<HTMLInputElement>): void;
    onSetCharacter?(): void;
    style?: React.CSSProperties;
    ref?: any;
    numericOnly?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    spellCheck?: boolean;
    ddList?: string[];
    childrenAfter?: boolean;
}

interface IInputFieldState {
    ddOpen: boolean;
}