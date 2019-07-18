import React from 'react';
import './Home.scss';
import TopMenu from '../Components/TopMenu';

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            updated: false,
        }
    }
    render() {
      return (
        <div className="ui-page">
          <TopMenu current="home" />
          <div className="content">
            This will be the home page.
          </div>
        </div>
      );
    }
}

interface IHomeProps {

}

interface IHomeState {
    // appGlobals: IAppGlobals;
    updated: boolean;

}