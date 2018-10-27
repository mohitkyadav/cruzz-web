import axios from 'axios';

import { SET_CURRENT_USER } from './types';

import setAuthToken from '../utils/setAuthToken';

export const signUp = user => dispatch => {
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
      }).catch(err => console.log(err.response));
  }).catch(err => console.log(err.response));
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
