import React from 'react'
import { Link } from 'react-router-dom'

class Toolbar extends React.Component {
  constructor(props) {
    super(props)
  }

  unreadCount = (input) => {
    let filtered = input.filter(i => !i.read)
    return filtered.length
  }

  bulkCheck = () => {
    let checkForChecks = this.props.messages.filter(message => !message.selected)
    checkForChecks.length > 0 ? this.props.checkAll() : this.props.unCheckAll()
  }

  selected = (input) => {
    let filtered = input.filter(message => message.selected)
    if (filtered.length === input.length) {
      return 'fa fa-check-square-o'
    } else if (filtered.length) {
      return 'fa fa-minus-square-o'
    } else {
      return 'fa fa-square-o'
    }
  }

  disabled = (input) => {
    let filtered = input.filter(message => message.selected)
    return filtered.length > 0 ? '' : 'disabled'
  }

  render() {
    return (
      <div class="row toolbar">
        <div class="col-md-12">
          <p class="pull-right">
            <span class="badge badge">{this.unreadCount(this.props.messages)}</span>
            unread messages
          </p>

          <a class="btn btn-danger" onClick={this.props.compose}>
            <i class="fa fa-plus"></i>
          </a>

          <button class="btn btn-default" onClick={this.bulkCheck}>
            <i class={`${this.selected(this.props.messages)}`}></i>
          </button>

          <button onClick={this.props.markAsRead} disabled={this.disabled(this.props.messages)} class="btn btn-default">Mark As Read</button>

          <button onClick={this.props.markAsUnread} disabled={this.disabled(this.props.messages)} class="btn btn-default">Mark As Unread</button>

          <select class="form-control label-select" disabled={this.disabled(this.props.messages)} onChange={e => this.props.addLabel(e.target.value)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select class="form-control label-select" disabled={this.disabled(this.props.messages)} onChange={e => this.props.removeLabel(e.target.value)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={this.props.delete} disabled={this.disabled(this.props.messages)} class="btn btn-default">
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
