import React          from 'react';
import {connect}      from 'react-redux';
import {showMessages} from '../actions/gmail';
import Frame          from '../components/Frame';
import {
  ListGroup,
  ListGroupItem,
  ResponsiveEmbed,
  Label,
  Navbar,
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

const Thread = props => {
  const base64Decode = s => window.atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  const {messages} = props.thread;
  const children = messages.map((msg, i) => {
    let body = '';
    let text = {mimeType: 'text/html'};
    try {
      text = msg.payload.parts
        .sort((a, b) => a.mimeType.localeCompare(b))
        .find(a => a.mimeType.startsWith('text'));
      body = base64Decode(text.body.data);
    } catch(e) {
      body = base64Decode(msg.payload.body.data);
    }
    const headers = {};
    msg.payload.headers.forEach(header => {
      headers[header.name] = header.value;
    });
    const blob = new Blob([body], {type: text.mimeType});
    const url = URL.createObjectURL(blob);
    return (<div key={i}>
      <Navbar>
        <Button onClick={_ => props.showMessages()}> Back </Button>
      </Navbar>
      <ListGroupItem>
        <Grid>
          <Row>
            <Col md={4}> {headers.Subject} </Col>
            <Col md={4}>{msg.labelIds.map((lbl,j) => <Label key={j}> {lbl} </Label>)}</Col>
          </Row>
        </Grid>
        <div> From: <Label> {headers.From} </Label> </div>
        <div> To: <Label> {headers.To} </Label> </div>
        <div> Reply to: <Label> {headers['Reply-to']} </Label> </div>
        <div>
          <Frame src={url} />
        </div>
      </ListGroupItem>
    </div>);
  });
  return (
    <ListGroup>
      {children}
    </ListGroup>
  );
};

const mapStateToProps = state => {
  return {
    thread: state.gmail.currThread
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showMessages: _ => dispatch(showMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
