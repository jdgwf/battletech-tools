import React from 'react';
import './Page1.scss';
import TopMenu from '../Components/TopMenu';

export default class Page1 extends React.Component<IPage1Props, IPage1State> {
    constructor(props: IPage1Props) {
        super(props);
        this.state = {
            updated: false,
        }
    }
    render() {
      return (
        <div className="ui-page">
          <TopMenu  current="page1" />
          <div className="content">
            This is just a test page for the router.
          </div>
        </div>
      );
    }
}

interface IPage1Props {

}

interface IPage1State {
    // appGlobals: IAppGlobals;
    updated: boolean;

}