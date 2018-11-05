import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';
import Header from './components/common/Header';
import SignIn from './components/common/SignIn';
import SignUp from './components/common/SignUp';
import ProfilePage from './components/profile/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

import registerServiceWorker from './registerServiceWorker';

import { setCurrentUser, authenticated } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import PostFeed from './components/feed/PostFeed';

if (localStorage.jwtToken) {
	// Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Set current user
  store.dispatch(authenticated(localStorage.jwtToken));
	store.dispatch(setCurrentUser(localStorage.username));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="full-container">
        <Header/>
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route exact path="/login" component={SignIn}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <PrivateRoute exact path="/profile" component={ProfilePage}></PrivateRoute>
          <PrivateRoute exact path="/feed" component={PostFeed}></PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
