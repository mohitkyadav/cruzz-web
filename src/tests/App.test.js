import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'

import App from '../components/App';
import ProfilePage from './../components/profile/ProfilePage';
import UserProfile from './../components/profile/UserProfile';
import PostDetails from '../components/feed/PostDetails';
import PostFeed from './../components/feed/PostFeed';
import SignIn from './../components/common/SignIn';
import SignUp from './../components/common/SignUp';
import Header from './../components/common/Header';
import PageSuggestions from './../components/common/PageSuggestions';
import PostOperations from './../components/common/PostOperations';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<App />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<ProfilePage />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<UserProfile />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<PostDetails />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<PostFeed />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<SignIn />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<SignUp />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<Header />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<PageSuggestions />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(withRouter(<PostOperations />), div);
  ReactDOM.unmountComponentAtNode(div);
});
