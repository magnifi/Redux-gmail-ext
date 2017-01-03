import {
  GET_AUTH_TOKEN,
  GET_AUTH_TOKEN_SUCCESS,
  GET_AUTH_TOKEN_FAIL
} from '../actions/oauth';
import gapi from '../gapi';
let INIT_STATE = {
  token: ''
};

export default function oauth(state=INIT_STATE, action) {
  switch(action.type) {
    case GET_AUTH_TOKEN:
      state = {busy: true};
      break;
    case GET_AUTH_TOKEN_FAIL:
      state = {busy: false, token: '', error: action.payload};
      break;
    case GET_AUTH_TOKEN_SUCCESS:
      gapi.setToken(action.payload);
      state = {...state, busy: false, token: action.payload};
      break;
  }
  return state;
}
