import React from 'react';
import './Page1.scss';
import TopMenu from '../Components/TopMenu';
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
    render() {
      return (
        <div className="ui-page">
          <TopMenu  current="page1" />
          <div className="content">
            <p>This is just a test page for the router and scaffolding components.</p>
            <Button variant="primary" onClick={this.openTestModal}>Open Test Dialog</Button>
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