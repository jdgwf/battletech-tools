import React from 'react';
import {IAppGlobals} from '../AppRouter';
import UIPage from '../Components/UIPage';

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
        <UIPage appGlobals={this.props.appGlobals}>
            404 - Not Found
        </UIPage>
      );
    }
}

interface IError404Props {
  appGlobals: IAppGlobals;
}

interface IError404State {
    updated: boolean;

}
