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
import UserProfile from './components/profile/UserProfile';
import Followers from './components/common/Followers';
import PostOperations from './components/common/PostOperations';
import PostDetails from './components/feed/PostDetails';
import PageSuggestions from './components/common/PageSuggestions';
import FavoritePosts from './components/profile/FavoritePosts';
import PostsByTags from './components/feed/PostsByTags';

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
          <PrivateRoute exact path="/" component={App}></PrivateRoute>
          <Route exact path="/login" component={SignIn}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <PrivateRoute exact path="/discover/pages" component={PageSuggestions}></PrivateRoute>
          <PrivateRoute exact path="/profile/:username" component={ProfilePage}></PrivateRoute>
          <PrivateRoute exact path="/posts/favorite/:username" component={FavoritePosts}></PrivateRoute>
          <PrivateRoute exact path="/posts/bytag/:tag" component={PostsByTags}></PrivateRoute>
          <PrivateRoute exact path="/user/:username" component={UserProfile}></PrivateRoute>
          <PrivateRoute exact path="/user/:username/:follow" component={Followers}></PrivateRoute>
          <PrivateRoute exact path="/view/post/:slug" component={PostDetails}></PrivateRoute>
          <PrivateRoute exact path="/:operation/post/" component={PostOperations}></PrivateRoute>
          <PrivateRoute exact path="/:operation/post/:slug" component={PostOperations}></PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
