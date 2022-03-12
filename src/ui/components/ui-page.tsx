import React from 'react';
import { IAppGlobals } from '../app-router';
import ShowAlerts from './show-alerts';
import TopMenu from './top-menu';

export default class UIPage extends React.Component<IUIPageProps, IUIPageState> {

    render = (): React.ReactFragment => {
        return (
        <div className={this.props.appGlobals.showMobile ? "ui-page show-mobile" : "ui-page"}>
          <TopMenu current={this.props.current} sub={this.props.sub} appGlobals={this.props.appGlobals} />
          <div className="content">
            <ShowAlerts appGlobals={this.props.appGlobals} />
            {this.props.children}
          </div>
        </div>
        )
    }
}


interface IUIPageProps {
    appGlobals: IAppGlobals;
    current?: string;
    sub?: string;
  }

  interface IUIPageState {
      updated: boolean;

  }