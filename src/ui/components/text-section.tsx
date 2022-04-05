import * as React from 'react';


export default class TextSection extends React.Component<ITextSectionProps, ITextSectionState> {

    constructor(props: ITextSectionProps) {
        super(props);
        this.state = {
            updated: false,
        };
    }


    render = (): React.ReactFragment => {


        return (

          <div className={this.props.className ? this.props.className + " text-section" : "text-section"}>
              {this.props.label ? (
                <h2>
                    {this.props.label}
                    {this.props.labelButton}
                </h2>
              ) : null}

                <div className="section-content">
                {this.props.children}
            </div>
            </div>

        )
    }
}

interface ITextSectionProps {
    label?: string;
    labelButton?: React.ReactFragment;
    className?: string;
}


interface ITextSectionState {
    updated: boolean;
}