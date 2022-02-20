import * as React from 'react';

export default class TextAreaField extends React.Component<ITextAreaFieldProps, ITextAreaFieldState> {

    constructor( props: ITextAreaFieldProps ) {
        super( props);

    }

    render() {
        return (
            <label className={this.props.className}>
                <strong>{this.props.label}</strong>:<br />
                {this.props.description ? (
                    <div className="small-text">{this.props.description}</div>
                ) : ( <></> )}

                {this.props.children ? (
                    <div className="small-text">
                        {this.props.children}
                    </div>
                ) : ( <></> )}

                <textarea
                    name={this.props.name}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    autoFocus={this.props.autoFocus}
                    value={this.props.value}
                    readOnly={this.props.readOnly}
                    className={this.props.inputClassName}
                    placeholder={this.props.placeholder}
                />
            </label>

        )
    }
}

interface ITextAreaFieldProps {
    label: string;
    onChange( event: React.FormEvent<HTMLTextAreaElement>): void
    onBlur?( event: React.FormEvent<HTMLTextAreaElement>): void
    value: string;
    description?: string;
    name?: string;
    className?: string;
    inputClassName?: string;
    autoFocus?: boolean;
    placeholder?: string;
    readOnly?: boolean;

}

interface ITextAreaFieldState {
}