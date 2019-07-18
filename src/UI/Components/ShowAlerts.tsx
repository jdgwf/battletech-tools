import * as React from 'react';
import SanitizedHTML from './SanitizedHTML';
import {IAlert} from '../Classes/Alerts';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {IAppGlobals} from '../AppRouter';

export default class ShowAlerts extends React.Component<IShowAlertsProps, IShowAlertsState> {

    constructor(props: IShowAlertsProps) {
        super(props);
        this.state = {
            updated: false,
        };
    }

    dismissAlert( alertIndex: number) {
        if( this.props.appGlobals.siteAlerts.dismissAlert( alertIndex ) ) {
            this.setState({
                updated: false
            });
        }
    }

    render() {
        return (
            <ul className="styleless">
                {this.props.appGlobals.siteAlerts.activeAlerts.map(
                    (alert: IAlert, alertIndex: number) => {
                        return <div
                            key={alertIndex}
                            id={"alert-index-" + alertIndex}
                            className={alert.autoDismissSeconds > 0 ? "position-relative alert-fade alert alert-" + alert.level + " " + alert.extraclass : "position-relative alert alert-" + alert.level + " " + alert.extraclass}
                            style={{
                                display: "block",
                                height: "auto",
                            }}
                        >

                            {alert.autoDismissSeconds > 0 ?
                            (
                                <>
                                <div className="alert-countdown">
                                    <div
                                        id={"alert-bar-index-" + alertIndex}
                                        className={"alert-countdown-bar dismiss-time-" + alert.autoDismissSeconds}
                                    >

                                    </div>
                                </div>
                                <span
                                    onClick={() => {this.dismissAlert(alertIndex)} }
                                    className="pull-right cursor-pointer"
                                    style={{fontSize: "1.5rem"}}
                                    title={"Click here to dismiss this alert, but it'll auto-dismiss in " + alert.autoDismissSeconds + " seconds"}
                                >
                                    <FontAwesomeIcon icon={faTimesCircle} spin />
                                </span>
                                </>
                            )
                            :
                            (
                                <>
                                    {alert.dismissable ?
                                        (
                                            <span
                                                onClick={() => {this.dismissAlert(alertIndex)} }
                                                className="pull-right cursor-pointer"
                                                style={{fontSize: "1.5rem"}}
                                                title="Click here to dismiss this alert"
                                            >
                                                <FontAwesomeIcon icon={faTimesCircle} />
                                            </span>
                                        ):
                                        (
                                            <></>
                                        )
                                    }
                                </>
                            )}

                            {alert.title ? (
                                <h4>{alert.title}</h4>
                            ):
                            (
                                <></>
                            )
                            }

                            {alert.message ? (
                                <div className={alert.messageclass}>
                                    <SanitizedHTML html={alert.message} />
                                </div>
                            ):
                            (
                             <></>
                            )}
                            {alert.externalURL ? (
                                <div className="text-right">
                                    <a className="btn btn-primary btn-sm" href={alert.externalURL}>Go</a>
                                </div>
                            ):
                            (
                             <></>
                            )}
                            {alert.link ? (
                                <div className="text-right">
                                    <Link className="btn btn-primary btn-sm" to={alert.link}>Go</Link>
                                </div>
                            ):
                            (
                             <></>
                            )}
                        </div>
                    }
                )}
            </ul>

        )
    }
}

interface IShowAlertsProps {
    appGlobals: IAppGlobals;
}

interface IShowAlertsState {
    updated: boolean;
}