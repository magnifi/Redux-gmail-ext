import React from 'react';
import {connect} from 'react-redux';
window.fs = require('path');
import {
  Button,
  Nav,
  NavItem,
  ProgressBar
} from 'react-bootstrap';
import {getLabels, selectLabel} from '../actions/gmail';

const Sidebar = props => {
  var labels;
  const {gmail} = props;
  if(!(gmail.busy || gmail.labels.length)) {
    console.warn('fetching....');
    props.getLabels();
    return <ProgressBar active now={100} />;
  }
  labels = props.gmail.labels
    .map((lbl, i) => {
      return <NavItem eventKey={lbl.id} key={i}> {lbl.name} </NavItem>;
    });


  return (
    <div>
      {!props.gmail.labels ? <Button onClick={_ => props.getLabels()}> Get Labels </Button> : void 0}
      <Nav bsStyle="pills" stacked activeKey={props.gmail.currLabel} onSelect={props.selectLabel}> {labels} </Nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    gmail: state.gmail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLabels: _ => dispatch(getLabels()),
    selectLabel: key => dispatch(selectLabel(key))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
