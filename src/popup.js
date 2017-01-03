import ReactDOM   from 'react-dom';
import React      from 'react';
import {Button}   from 'react-bootstrap';
import {Provider} from 'react-redux';
import Canvas     from './containers/Canvas';
import store      from './store.js';
import App        from './containers/App';
require('./popup.sass');
require('bootstrap/dist/css/bootstrap.css');
class Popup extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('app'));
