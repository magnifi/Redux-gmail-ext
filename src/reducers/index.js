import {combineReducers} from 'redux';
import oauth             from './oauth';
import gmail             from './gmail';
export default combineReducers({
  oauth,
  gmail
});
