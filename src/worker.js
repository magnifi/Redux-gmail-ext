function parseBatchResponse(responseText) {

}
const methods = {
  parseBatchResponse
};

function run(fn, id, args) {
  var data = {id};
  try {
    data.result = fn.apply(null, args);
  } catch(e) {
    data.error = e;
  }
  self.postMessage(data);
}


self.addEventListener('message', e => {
  const {data} = e,
    {method, args, id} = data,
    fn = methods[method];

  run(fn, id, args);
});
