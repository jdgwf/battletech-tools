import React from 'react';
import ShowAlerts from '../Components/ShowAlerts';
import {IAppGlobals} from '../AppRouter';
import TopMenu from '../Components/TopMenu';

export default class Error404 extends React.Component<IError404Props, IError404State> {
    constructor(props: IError404Props) {
        super(props);
        this.state = {
            updated: false,
        }
    }

    componentDidMount () {
      this.props.appGlobals.makeDocumentTitle("404 - Page not Found");
    }

    render() {
      return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current="home" appGlobals={this.props.appGlobals} />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            404 - Not Found
          </div>
        </div>
      );
    }
}

interface IError404Props {
  appGlobals: IAppGlobals;
}

interface IError404State {
    updated: boolean;

}
