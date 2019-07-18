import React from 'react';
import {IAppGlobals} from '../AppRouter';

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
        <div className="page-ui">
          404 - Not Found
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
