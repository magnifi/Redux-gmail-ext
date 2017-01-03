import {compose, createStore, applyMiddleware} from 'redux';
import createLogger                            from 'redux-logger';
import rootReducer                             from './reducers';
import Thunk                                   from 'redux-thunk';
import persistState                            from 'redux-localStorage';

const logger = createLogger();
const store = createStore(
  rootReducer,
  compose(
    // persistState(['oauth']),
    applyMiddleware(Thunk, logger)
  )
);

export default store;
