import React from 'react';

export default class Error404 extends React.Component<IError404Props, IError404State> {
    constructor(props: IError404Props) {
        super(props);
        this.state = {
            updated: false,
        }
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

}

interface IError404State {
    // appGlobals: IAppGlobals;
    updated: boolean;

}