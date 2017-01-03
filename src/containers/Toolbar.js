import React from 'react';
import {connect} from 'react-redux';
import {
  Navbar
} from 'react-bootstrap';

const Toolbar = props => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand> Gmail client </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
};

export default connect()(Toolbar);
