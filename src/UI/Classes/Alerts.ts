import App from "../AppRouter";

export interface IAlert {
    level: string;
    title: string;
    message: string;
    messageclass: string;
    externalURL: string;
    link: string;
    dismissable: boolean;
    extraclass: string;
    autoDismissSeconds: number;
    dismissFunction: Function | null,
}

export default class Alerts {

    _app: App;

    activeAlerts: IAlert[] = []

    cancelTimeout: number = -1;

    constructor( mainApp: App ) {
        this._app = mainApp;
        this.activeAlerts = [];
    }

    dismissAlert( alertIndex: number ): boolean {
        if( this.cancelTimeout > -1 ) {
            window.clearTimeout( this.cancelTimeout );
        }
        let alertID = document.getElementById("alert-index-" + alertIndex);
        if( alertID ) {
            alertID.style.height = "0px";
            alertID.style.paddingTop = "0px";
            alertID.style.paddingBottom = "0px";
            alertID.style.borderTop = "0px";
            alertID.style.borderBottom = "0px";
        }

        if( this.activeAlerts.length > alertIndex ) {
            if( this.activeAlerts[alertIndex].dismissable) {

                window.setTimeout(
                    () => {
                        let dismissFunction: Function | null = null;
                        if(  this.activeAlerts[alertIndex].dismissFunction ) {
                            dismissFunction = this.activeAlerts[alertIndex].dismissFunction;
                        }

                        this.activeAlerts.splice( alertIndex, 1);

                        if( dismissFunction ) {
                            dismissFunction();
                        }

                        this._app.refreshGlobalState();
                    },
                    100
                );

                return true;
            }
        }

        return false;
    }

    addAlert(
        level: string,
        title: string,
        message: string,
        messageclass: string = "",
        dismissable: boolean = true,
        dismissFunction: Function | null,
        autoDismissSeconds: number = 0,
        externalURL: string = "",
        link: string = "",
        extraclass: string = "",
    ) {
        this.activeAlerts.push(
            {
                level: level,
                title: title,
                message: message,
                messageclass: messageclass,
                externalURL: externalURL,
                link: link,
                dismissable: dismissable,
                extraclass: extraclass,
                autoDismissSeconds: autoDismissSeconds,
                dismissFunction: dismissFunction,
            }
        );

        let dismissIndex = this.activeAlerts.length - 1;
        this._app.refreshGlobalState();
        if( autoDismissSeconds > 0 ) {
            window.setTimeout(
                () => {
                    let alertID = document.getElementById("alert-index-" + dismissIndex);
                    if( alertID ) {
                        alertID.className = alertID.className + 'fade-away';
                    }
                },
                (autoDismissSeconds * 1000) - 250

            );
            window.setTimeout(
                () => {
                    let alertID = document.getElementById("alert-bar-index-" + dismissIndex);
                    if( alertID ) {
                        alertID.style.width = "0px";
                    }
                },
                100

            );
            this.cancelTimeout = window.setTimeout(
                () => {
                    this.activeAlerts.splice(dismissIndex, 1);
                    if( dismissFunction ) {
                        dismissFunction();
                    }

                    this._app.refreshGlobalState();
                },
                autoDismissSeconds * 1000
            );
        }
    }
}
