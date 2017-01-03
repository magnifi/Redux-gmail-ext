import {
  GET_LABELS,
  GET_LABELS_SUCCESS,
  GET_LABELS_FAIL,
  SELECT_LABEL,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_THREAD_SUCCESS,
  SHOW_THREAD,
  SHOW_MESSAGES
} from '../actions/gmail';
let INIT_STATE = {
  labels: [],
  currLabel: 'INBOX',
  threads: []
};

export default function gmailReducer(state=INIT_STATE, action) {
  switch(action.type) {
    case GET_LABELS:
      state = {...state, busy: true};
      break;
    case GET_LABELS_SUCCESS:
      state = {...state, busy: false, labels: action.payload};
      break;
    case GET_LABELS_FAIL:
      state = {...state, busy: false, labels: [], error: action.payload}
      break;
    case SELECT_LABEL:
      state = {...state, currLabel: action.payload, threads: [], currThread: null};
      break;
    case GET_MESSAGES:
    case SHOW_THREAD:
      state = {...state, busy: true};
      break;
    case SHOW_MESSAGES:
      state = {...state, currThread: null};
      break;
    case GET_MESSAGES_SUCCESS:
      console.warn(action.payload);
      state = {...state, busy: false, ...action.payload};
      break;
    case GET_THREAD_SUCCESS:
      state = {...state, busy: false, currThread: action.payload};
      break;
  }
  return state;
}
