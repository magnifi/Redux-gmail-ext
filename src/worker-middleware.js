export default function createWorker(scriptName) {
  return store => next => action => {
    window.wmw = {store, next, action};
    return next(action);
  };
}
