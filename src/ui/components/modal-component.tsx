import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { IAppGlobals } from '../app-router';
// import * as sanitizeHtml from 'sanitize-html';
var sanitizeHtml = require('sanitize-html');

export default class ModalWindow extends React.Component<IModalWindowProps, IModalWindowState> {
    showDialog: boolean = false;
    constructor(props: IModalWindowProps) {
        super(props);
        this.state = {
        }
    }

    closeDialog() {

    }

    // For the SanitizeHTML function/module docs go here:
    // https://www.npmjs.com/package/sanitize-html

    render() {
        if( this.showDialog ) {
            return(
                <Modal show={this.props.appGlobals.showConfirmDialog} onHide={this.closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>
                            {this.props.appGlobals.confirmDialogTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body id="book-select-contents">
                    <div className="form">

                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={this.closeDialog}>
                        {this.props.appGlobals.confirmDialogNoLabel}
                    </Button>

                </Modal.Footer>
            </Modal>
            );
        } else {
            return(
                <></>
            )
        }

    }
}

interface IModalWindowProps{
    appGlobals: IAppGlobals;
    title: string;
    closeLabel: string;
    component: React.Component;
}

interface IModalWindowState{

}