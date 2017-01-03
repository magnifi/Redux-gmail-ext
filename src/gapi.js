import {encode}    from 'querystring';
import {parseHttp} from './http-parser';
const opts = {
  token: ''
};

const LABELS_URL   = 'https://www.googleapis.com/gmail/v1/users/me/labels';
const MESSAGES_URL = 'https://www.googleapis.com/gmail/v1/users/me/messages';
const THREADS_URL  = 'https://www.googleapis.com/gmail/v1/users/me/threads/';
const BATCH_URL    = 'https://www.googleapis.com/batch';

export function getHeaders() {
  return {
    'Authorization': 'Bearer ' + opts.token
  };
}
export function setToken(token) {
  opts.token = token;
};

export function doRequest(url, opts) {
  opts = Object.assign({ method: 'GET', headers: getHeaders() }, opts);
  return fetch(url, opts).then(resp => resp.json());
}

export function batchGetMessages(ids, opts) {
  opts = Object.assign({
    query: {
      format: 'metadata'
    }
  }, opts);
  const query = encode(opts.query);
  let boundary = 'b_' + (Date.now() * Math.random());
  let headers = {
    'Content-Type': `multipart/mixed; boundary="${boundary}"`,
  };
  boundary = '--' + boundary;
  let body = ids.map(id => {
    return 'Content-Type: application/http\r\n\r\n' +
      `GET /gmail/v1/users/me/threads/${id}?${query}\r\n\r\n`
  }).join(boundary + '\r\n');
  headers = Object.assign(headers, getHeaders());
  body = boundary + '\r\n' + body + boundary + '--\r\n';
  return fetch(BATCH_URL, {
    method: 'POST',
    headers,
    body,

  })
    .then(resp => resp.text())
    .then(parseHttp);
}

export function getLabels(opts) {
  return doRequest(LABELS_URL, opts);
};


export async function getMessages(filter) {
  filter = Object.assign({labelIds: 'INBOX', maxResults: 10}, filter);
  const query = encode(filter);
  const resp = await doRequest(THREADS_URL + '?' + query);
  const threadsIds = resp.threads.map(t => t.id);
  const threads = await batchGetMessages(threadsIds);
  resp.threads = threads;
  return resp;
}

export function getThread(threadId, opts) {
  opts = Object.assign({format: 'full'}, opts);
  const query = encode(opts);
  return doRequest(THREADS_URL + threadId + '?' + query);
}

export default {
  setToken, doRequest, getLabels, getMessages, getThread
};
