import React from 'react';
import './Page1.scss';
import TopMenu from '../Components/TopMenu';
import ShowAlerts from '../Components/ShowAlerts';
import {IAppGlobals} from '../AppRouter';
import { Button } from 'react-bootstrap';

export default class Page1 extends React.Component<IPage1Props, IPage1State> {
    constructor(props: IPage1Props) {
        super(props);
        this.state = {
            updated: false,
        }
    }
    componentDidMount () {
      this.props.appGlobals.makeDocumentTitle("Page 1");

      this.openTestModal = this.openTestModal.bind(this);
      this.injectAlert = this.injectAlert.bind(this);
    }

    openTestModal() {
      this.props.appGlobals.openConfirmDialog(
        "Testing",
        "This is just a test confirm.<br />Press \"Yes\" to get an called-function alert ;)",
        "Yes",
        "No",
        () => {
          alert("ding!");
        }
      );
    }

    injectAlert() {
      this.props.appGlobals.siteAlerts.addAlert(
        "info", // level string
        "Just an alert", // title string
        "this is neat :)", // message string
         "", // messageclass string
         true, // dismissable boolean
         null, // dismissFunction Function,
         5, // autoDismissSeconds number
         "", // externalURL string
         "", // link string
         "", // extraclass string
    );
    }

    render() {
      return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="page1" appGlobals={this.props.appGlobals} />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            <p>This is just a test page for the router and scaffolding components.</p>
            <Button variant="primary" onClick={this.openTestModal}>Primary Button</Button> (Opens A Confirmation Dialog)
            <br /><Button variant="secondary" onClick={this.injectAlert}>Secondary Button</Button> (Adds an auto-dismissing alert)

            <br /><Button variant="primary" disabled={true}>Primary Disabled</Button>
            <br /><Button variant="secondary" disabled={true}>Secondary Disabled</Button>
          </div>
        </div>
      );
    }
}

interface IPage1Props {
  appGlobals: IAppGlobals;
}

interface IPage1State {
    updated: boolean;

}