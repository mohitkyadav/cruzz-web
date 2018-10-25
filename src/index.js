import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";

import App from './components/App';
import Header from './components/common/Header';
import Login from './components/common/Login';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={App}></Route>
      </Switch>
      <Login/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
