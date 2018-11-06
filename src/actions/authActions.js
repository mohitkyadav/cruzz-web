import axios from 'axios';

import { SET_CURRENT_USER, SET_CURRENT_PROFILE, LOADING, LOADED, AUTHENTICATED } from './types';

import setAuthToken from '../utils/setAuthToken';
import { isEmpty } from './../utils/validate';

export const updateUserProfile = user => dispatch => {
  dispatch(loading());
  axios.post(
    'https://cruzz.herokuapp.com/api/authentication/users/update/',
    user
  ).then(res => {
      console.log(res.data);
      // dispatch(setCurrentUser());
      dispatch(loaded());
  }).catch(err => {
    console.log(err.response);
    dispatch(loaded());
  });
}


export const signUp = user => dispatch => {
  dispatch(loading());
  axios.post(
    'https://cruzz.herokuapp.com/api/authentication/users/registration',
    user
  ).then(res => {
      // Save / Set token to local storage
      console.log(res.data);
      const { token, username } = res.data.user;
			localStorage.setItem('jwtToken', token);
			localStorage.setItem('username', username);
			// Set auth header
      setAuthToken(token);
      axios.get(`https://cruzz.herokuapp.com/api/profile/retrieve/${username}/`).then(response => {
          dispatch({ type: SET_CURRENT_USER, payload: response.data.profile })
      }).catch(err => {
        console.log(err.response);
        dispatch(loaded());
      });
  }).catch(err => {
    console.log(err.response);
    dispatch(loaded());
  });
};

export const signIn = (user, history) => dispatch => {
  dispatch(loading());
  axios.post(
    'https://cruzz.herokuapp.com/api/authentication/users/login',
    user
  ).then(res => {
      // Save / Set token to local storage
      console.log(res.data);
      let { token, username } = res.data.user;
      token = 'Token ' + token;
			localStorage.setItem('jwtToken', token);
			localStorage.setItem('username', username);
			// Set auth header
      setAuthToken(token);
      axios.get(`https://cruzz.herokuapp.com/api/profile/retrieve/${username}/`).then(response => {
          console.log(response.data);
          dispatch({ type: SET_CURRENT_USER, payload: response.data.user });
          history.push('/');
      }).catch(err => console.log(err.response));
  }).catch(err => console.log(err.response));
};

export const signOut = history => dispatch => {
  dispatch(loading());
  // Remove token from local storage
	localStorage.removeItem('jwtToken');
  // Remove username from local storage
	localStorage.removeItem('username');
	// Remove auth header
	setAuthToken(false);
	// Set current user to {}
	dispatch({ type: SET_CURRENT_USER, payload: {} });
	if (history) history.push('/');
  else window.location.href = '/';
}

export const setCurrentUser = username => dispatch => {
  dispatch(loading());
	axios.get(`https://cruzz.herokuapp.com/api/profile/retrieve/${username}/`).then(response => {
    console.log(response.data);
    dispatch({ type: SET_CURRENT_USER, payload: response.data.user });
    dispatch({ type: SET_CURRENT_PROFILE, payload: response.data.profile });
    dispatch(loaded());
  }).catch(err => console.log(err.response));
};

export const authenticated = userToken => {
  return {
    type: AUTHENTICATED,
    payload: !isEmpty(userToken)
  };
};

export const loading = () => {
  return {
    type: LOADING
  };
};

export const loaded = () => {
  return {
    type: LOADED
  };
};
