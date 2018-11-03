import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'

import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<App />), div);
  ReactDOM.unmountComponentAtNode(div);
});
