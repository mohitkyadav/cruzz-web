import {
  // SIGNUP,
  SET_CURRENT_USER,
  SET_CURRENT_PROFILE,
  LOADING,
  LOADED,
  // USER_PROFILE,
  // ERROR
} from '../actions/types';

import { isEmpty } from '../utils/validate';
import { AUTHENTICATED } from './../actions/types';

const initialState = {
  loading: false,
	authenticated: false,
  user: {},
  userProfile: {},
  error: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
    case SET_CURRENT_USER:
			return {
        ...state,
				authenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case SET_CURRENT_PROFILE:
			return {
        ...state,
				authenticated: !isEmpty(action.payload),
        userProfile: action.payload,
        loading: false
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADED:
      return {
        ...state,
        loading: false
      }
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.payload
      };
		default:
			return state;
	}
}
