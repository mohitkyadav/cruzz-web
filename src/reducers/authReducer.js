import {
  // SIGNUP,
  SET_CURRENT_USER,
  LOADING,
  LOADED,
  // USER_PROFILE,
  // ERROR
} from '../actions/types';

import { isEmpty } from '../utils/validate';

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
		default:
			return state;
	}
}
