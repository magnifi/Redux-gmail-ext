import React from 'react';
import {connect} from 'react-redux';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import Inbox from './Inbox';
import {Grid, Row, Col} from 'react-bootstrap';

const Main = props => {
  return (
    <div>
      <Toolbar />
      <Grid>
        <Row>
          <Col md={2}  xs={2} sm={2}> <Sidebar /> </Col>
          <Col md={10} xs={10} sm={10}> <Inbox /> </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default connect()(Main);
