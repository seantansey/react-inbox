import React from 'react'
import Message from './Message'

class MessageList extends React.Component {
  render() {
    return (
      <div>
        {this.props.messages.map((message) => <Message info={message} key={message.id} star={this.props.star} check={this.props.check} update={this.props.update}/>)}
      </div>
    )
  }
}

export default MessageList
