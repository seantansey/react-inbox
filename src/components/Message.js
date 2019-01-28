import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div class={`row message ${this.props.info.read ? 'read' : 'unread'} ${this.props.info.selected ? 'selected' : ''}`}>
          <div class="col-xs-1">
            <div class="row">
              <div class="col-xs-2">
                <input id={this.props.info.id} type="checkbox" checked={this.props.info.selected ? 'checked' : ''} onClick={e => this.props.check(this.props.info.id)}/>
              </div>
              <div class="col-xs-2">
                <i class={this.props.info.starred ? "star fa fa-star" : "star fa fa-star-o" } id={this.props.info.id} onClick={(e) => this.props.star(this.props.info.id)}></i>
              </div>
            </div>
          </div>
          <div class="col-xs-11">
            {this.props.info.labels.length >= 1 ? this.props.info.labels.map((label, i) => <span key={i} class="label label-warning">{label}</span>) : ''}

            <a href="#">
              {this.props.info.subject}
            </a>
          </div>
        </div>
      </div>

    )
  }
}


export default Message
