export const GET_LABELS           = 'GET_LABELS';
export const GET_LABELS_SUCCESS   = 'GET_LABELS_SUCCESS';
export const GET_LABELS_FAIL      = 'GET_LABELS_FAIL';
export const SELECT_LABEL         = 'SELECT_LABEL';
export const GET_MESSAGES         = 'GET_MESSAGES';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAIL    = 'GET_MESSAGES_FAIL';
export const GET_THREAD_SUCCESS   = 'GET_THREAD_SUCCESS';
export const SHOW_MESSAGES        = 'SHOW_MESSAGES';
export const SHOW_THREAD          = 'SHOW_THREAD';
import gapi from '../gapi';

export function getLabels() {
  return (dispatch, getState) => {
    gapi.getLabels()
      .then(resp => {
        dispatch({type: GET_LABELS_SUCCESS, payload: resp.labels});
      })
      .catch(e => {
        dispatch({type: GET_LABELS_FAIL, error: e});
      });
  }
}
// export const selectLabel = payload => ({type: SELECT_LABEL, payload});
export function selectLabel(inbox) {
  return (dispatch, getState) => {
    dispatch({type: SELECT_LABEL, payload: inbox});
    getMessages({labelIds: inbox})(dispatch, getState);
  };
}

export function getMessages(filters) {
  filters = Object.assign({currLabel: 'INBOX', start: 0}, filters);
  return (dispatch, getState) => {
    dispatch({type: GET_MESSAGES});
    gapi.getMessages(filters)
      .then(resp => {
        dispatch({type: GET_MESSAGES_SUCCESS, payload: resp});
      })
      .catch(e => {
        dispatch({type: GET_MESSAGES_FAIL, error: e});
      });

  };
}

export function showThread(threadId) {
  return (dispatch, getState) => {
    dispatch({type: SHOW_THREAD});
    gapi.getThread(threadId)
      .then(resp => {
        dispatch({type: GET_THREAD_SUCCESS, payload: resp});
      });
  };
}

export const showMessages = _ => ({type: SHOW_MESSAGES});
