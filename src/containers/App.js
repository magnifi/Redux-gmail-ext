import React from 'react';
import {connect} from 'react-redux';
import {getAuthToken} from '../actions/oauth';
import {Button} from 'react-bootstrap';
import Main from './Main';

class LoginAreaComp extends React.Component {
  componentWillMount() {
    this.props.getAuthToken({});
  }
  render() {
    return (
      <div>
        <Button onClick={_ => props.getAuthToken()}> Login </Button>
      </div>
    );
  }
}


const App = props => {
  return (
    <div>
      {props.oauth.token ? <Main /> : <LoginArea />}
    </div>
  );
};

const mapStateToProps = state => ({oauth: state.oauth});
const mapDispatchToProps = dispatch => {
  return {
    getAuthToken: _ => dispatch(getAuthToken())
  };
};
const LoginArea = connect(null, mapDispatchToProps)(LoginAreaComp);
export default connect(mapStateToProps, mapDispatchToProps)(App);
