var worker;
const promises = {};
var id = 0;

function nextId() {
  return id++;
}
export function createWorker(name='worker.js') {
  if(worker) termianteWorker();
  worker = new Worker(name);
  worker.addEventListener('message', handleMessage);
}
export function createPromise(id, method, args) {
  return new Promise((resolve, reject) => {
    promises[id] = {resolve, reject};
  });
}
export function sendMessage(method, args) {
  const id = nextId();
  worker.postMessage({id, method, args});
  return createPromise(id, method, args);
}
export function handleMessage(e) {
  const {data} = e,
    {id, result, error} = data;
  if(error) {
    promises[id].reject(error);
  } else {
    promises[id].resolve(result);
  }
  delete promises[id];
}
