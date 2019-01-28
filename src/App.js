import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Form from './components/Form'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      compose: false
    }
    this.updateItem = this.updateItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({messages: json})
  }

  //post route
  async postRoute(newMessage) {
    const response = await fetch('http://localhost:8082/api/messages', {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const json = await response.json()
    this.setState({messages: [...this.state.messages, json]})
  }

  //patch star route
  async updateItem(inputData) {
    await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify(inputData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  //delete route
  async deleteItem(messageIds) {
    let response = fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [...messageIds],
        command: 'delete'
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  star = (inputId) => {
    let messages = [...this.state.messages]
    let filtered = messages.filter(message => message.id == inputId)
    filtered.forEach(message => this.updateItem({
      messageIds: [message.id],
      command: 'star',
      star: message.starred ? false : true
    }))
    filtered[0].starred ? filtered[0].starred = false : filtered[0].starred = true
    this.setState({messages: messages})
  }

  check = (input) => {
    let messages = [...this.state.messages]
    let message = messages.find(message => message.id == input)
    let update = (mess) => mess.selected ? mess.selected = false : mess.selected = true
    update(message)
    this.setState({messages: messages})
  }

  checkAll = () => {
    let messages = [...this.state.messages]
    messages.forEach(message => message['selected'] = true)
    this.setState({messages: messages})
  }

  unCheckAll = () => {
    let messages = [...this.state.messages]
    messages.forEach(message => message['selected'] = false)
    this.setState({messages: messages})
  }

  markAsRead = () => {
    let messages = [...this.state.messages]
    let filtered = messages.filter(message => message.selected)
    filtered.forEach(message => this.updateItem({
      messageIds: [message.id],
      command: 'read',
      read: true
    }))
    messages.forEach(message => message.selected ? message.read = true : message.read = message.read)
    this.setState({messages: messages})
  }

  markAsUnread = () => {
    let messages = [...this.state.messages]
    let filtered = messages.filter(message => message.selected)
    filtered.forEach(message => this.updateItem({
      messageIds: [message.id],
      command: 'read',
      read: false
    }))
    messages.forEach(message => message.selected ? message.read = false : message.read = message.read)
    this.setState({messages: messages})
  }

  delete = () => {
    //let messages = [...this.state.messages]
    let filtered = this.state.messages.filter(message => message.selected)
    let toDisplay = this.state.messages.filter(message => !message.selected)
    let messageIds = filtered.map(message => message.id)
    this.deleteItem(messageIds)
    this.setState({messages: toDisplay})

  }

  duplicateCheck = (item, label) => {
    if (!item.labels.includes(label) && label !== 'Apply label') {
      item.labels.push(label)
    }
  }

  addLabel = (label) => {
    let messages = [...this.state.messages]
    let filtered = messages.filter(message => message.selected)
    filtered.forEach(message => this.updateItem({
      messageIds: [message.id],
      command: 'addLabel',
      label: label
    }))
    messages.forEach(message => message.selected ? this.duplicateCheck(message, label) : null)
    this.setState({messages: messages})
  }

  remove = (message, label) => {
    let filtered = message.labels.filter(l => l !== label)
    return filtered
  }

  removeLabel = (label) => {
    let messages = [...this.state.messages]
    let filtered = messages.filter(message => message.selected)
    filtered.forEach(message => this.updateItem({
      messageIds: [message.id],
      command: 'removeLabel',
      label: label
    }))
    messages.forEach(message => message.selected ? message.labels = this.remove(message, label) : null)
    this.setState({messages: messages})
  }

  composeToggle = () => {
    this.setState({compose: this.state.compose ? false : true})
  }

  render() {
    return (
      <div className="App container">
        <Toolbar messages={this.state.messages}
          checkAll={this.checkAll}
          unCheckAll={this.unCheckAll}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          delete={this.delete}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          compose={this.composeToggle}/>
          {this.state.compose ? <Form post={this.postRoute}/> : <div></div>}
        <MessageList messages={this.state.messages} star={this.star} check={this.check} update={this.updateItem} />
      </div>
    );
  }
}

export default App;
