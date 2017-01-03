export const GET_AUTH_TOKEN         = 'GET_AUTH_TOKEN';
export const GET_AUTH_TOKEN_SUCCESS = 'GET_AUTH_TOKEN_SUCCESS';
export const GET_AUTH_TOKEN_FAIL    = 'GET_AUTH_TOKEN_FAIL';

export function getAuthToken(opts={interactive:true}) {
  return dispatch => {
    chrome.identity.getAuthToken(opts, payload => {
      dispatch({type: GET_AUTH_TOKEN_SUCCESS, payload});
    });
  };
}
