import React     from 'react';
import {connect} from 'react-redux';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Pagination,
  ProgressBar,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import {
  getMessages,
  showThread,
} from '../actions/gmail';
import Thread from './Thread';

class Inbox extends React.Component {
  componentWillMount() {
    if(!this.props.gmail.threads.length) this.props.getMessages();
  }
  render() {
    const {props} = this;
    if(props.gmail.busy) {
      return <ProgressBar now={100} active />
    }
    if(props.gmail.currThread) return <Thread />;
    const {threads} = props.gmail;
    if(!threads.length) {
      return <h2> No messages </h2>
    }
    const messages = threads.map((thread, i) => {
      const firstMessage = thread.messages[0];
      const unread = firstMessage.labelIds.includes('UNREAD'),
        {snippet} = firstMessage,
        {date, from, subject} = firstMessage.headers;
      return (
        <ListGroupItem key={i} className={unread ? 'unread' : ''}
          onClick={_ => props.showThread(thread.id)} title={snippet}>
          <Grid>
            <Row>
              <Col md={2} sm={2} className="ellipsis">{date}</Col>
              <Col md={3} sm={3} className="ellipsis">{from}</Col>
              <Col md={4} sm={3} className="ellipsis">{subject}</Col>
            </Row>
            <Row className="ellipsis">
              <Col md={9} className="ellipsis"
                dangerouslySetInnerHTML={{__html: snippet}} />
            </Row>
          </Grid>
        </ListGroupItem>
      );
    });

    return (
      <div>
        <ListGroup>
          {messages}
        </ListGroup>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    gmail: state.gmail
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMessages: _ => dispatch(getMessages()),
    showThread: threadId => dispatch(showThread(threadId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
