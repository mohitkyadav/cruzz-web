import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";

import App from './components/App';
import Header from './components/common/Header';
import SignIn from './components/common/SignIn';
import SignUp from './components/common/SignUp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/login" component={SignIn}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
