import * as React from 'react';
// import * as sanitizeHtml from 'sanitize-html';
var sanitizeHtml = require('sanitize-html');

export default class SanitizedHTML extends React.Component<ISanitizedHTMLProps, ISanitizedHTMLState> {

    // For the SanitizeHTML function/module docs go here:
    // https://www.npmjs.com/package/sanitize-html

    render = (): JSX.Element => {

        if( this.props.raw ) {
            if( this.props.svg ) {
                return (
                    <text
                        dangerouslySetInnerHTML={
                            {
                                __html: this.props.html
                            }
                        }
                    ></text>
                )
            } else {
                return (
                    <span
                        dangerouslySetInnerHTML={
                            {
                                __html: this.props.html
                            }
                        }
                    ></span>
                )
            }

        } else {
            return (
                <span
                    dangerouslySetInnerHTML={
                        {
                            __html: sanitizeHtml(
                                this.props.html,
                                {
                                    allowedTags: [
                                        "h1",
                                        "h2",
                                        "h3",
                                        "h4",

                                        "svg",

                                        "div",
                                        "span",
                                        "p",

                                        "ol",
                                        "ul",
                                        "li",

                                        "img",

                                        "sup",

                                        "strong",
                                        "em",

                                        "br",
                                        "hr"
                                    ],
                                    allowedAttributes: {
                                        'div': [ 'class', 'id' ],
                                        'span': [ 'class', 'id' ],
                                        'p': [ 'class', 'id' ],
                                        'img': ['src', 'class', 'id', 'style'],
                                        'ul': [ 'class', 'id' ],
                                    },
                                }
                            )
                        }
                    }
                />
            )
        }
    }
}

interface ISanitizedHTMLProps {
    html: string;
    raw?: boolean;
    svg?: boolean;
}

interface ISanitizedHTMLState {

}