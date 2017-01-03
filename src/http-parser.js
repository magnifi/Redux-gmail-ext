export function parseHttp(text) {
  const boundary = text.substr(0, text.indexOf('\n'));
  return text.split(boundary)
    .filter(a => !!a)
    .map(parseResponse)
    .map(parseThread);
}

function parseMessage(msg) {
  const {payload} = msg;
  let res = {
    snippet: msg.snippet,
    labelIds: msg.labelIds,
  };
  res.headers = {};
  for(let header of payload.headers) {
    res.headers[header.name.toLowerCase()] = header.value;
  }
  return res;
}

export function parseThread(thread) {
  let res = {...thread, raw: thread};
  res.messages = thread.messages.map(parseMessage);
  return res;
}

export function parseResponse(responseBody) {
  return JSON.parse(responseBody.match(/(\{[\s\S]+\})/)[1]);
}

