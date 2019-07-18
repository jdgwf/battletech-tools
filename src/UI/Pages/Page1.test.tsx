import React from 'react';
import ReactDOM from 'react-dom';
import Page1 from './Page1';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
