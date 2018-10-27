import {
  // SIGNUP,
  SET_CURRENT_USER,
  // USER_PROFILE,
  // ERROR
} from '../actions/types';

import { isEmpty } from '../utils/validate';

const initialState = {
	authenticated: false,
	user: {},
  userProfile: {},
  error: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action.payload);
			return {
				...state,
				authenticated: !isEmpty(action.payload),
				user: action.payload
      };
		default:
			return state;
	}
}
