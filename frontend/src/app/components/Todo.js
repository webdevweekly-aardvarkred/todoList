import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import Importance from './Importance'
import xss from 'xss'

function unauth (err, replace) {
  const status = err.status
  if (status >= 400 && status <= 500) {
    replace('/login')
  }
}

class Todo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      task: props.task
    }
    this.props = props
    this.handleChange = this.handleChange.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.unauth = this.unauth.bind(this)
    this.double = this.double.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  unauth (err) {
    const status = err.status
    if (status >= 400 && status <= 500) {
      this.props.router.replace('/login')
    }
  }

  handleChange (id, value) {
    const { selectImportance } = this.props

    selectImportance(id, value)
      .catch(this.unauth)
  }

  onEdit (e) {
    const { editTask } = this.props
    const key = e.which
    const input = e.target
    const todo = xss(input.value.trim())

    if (key === 13) {
      if (todo) {
        editTask(this.props.id, {
          task: todo
        })
        .catch(this.unauth)
      }

      this.setState({
        editing: false,
        task: todo
      })
    }
  }

  edit (e) {
    this.setState({
      task: e.target.value
    })
  }

  onBlur (e) {
    this.setState({
      editing: false
    })
  }

  double (e) {
    this.setState({
      editing: true
    })
    setTimeout(() => {
      this.refs.edit.focus()
    }, 100)
  }

  render () {
    const { id, importance, completed, deleteTodo, task, toggleTodo } = this.props
    return (
      <li className='todo-item-container' data-id={id} data-importance={importance}>
        <div onDoubleClick={this.double} className='todo-item'>
          <input
            className='center toggle-complete'
            onChange={(e) => {
              toggleTodo(id, { completed: !completed })
                .catch(this.unauth)
            }}
            type='checkbox'
            checked={completed}
            value='completed'
          />
          <span
            style={{
              display: this.state.editing ? 'none' : 'inline'
            }}
          >
          {task}
          </span>
          <div
            style={{
              display: this.state.editing ? 'inline' : 'none'
            }}
            className='todo-edit'>
            <input
              type='text'
              ref='edit'
              value={this.state.task}
              onKeyUp={this.onEdit}
              onBlur={this.onBlur}
              onChange={this.edit.bind(this)}
            />
          </div>
          <button className='center' onClick={(e) => {
            deleteTodo(id)
              .catch(this.unauth)
          }}>X</button>
        </div>
        <div className='importance-input'>
        {['low', 'moderately', 'highly'].map((value, i) => (
          <Importance
            unauth={unauth}
            importance={importance}
            selected={this.props.importance === value}
            value={value}
            key={i} id={id}
            onChange={this.handleChange} />
          ))}
        </div>
      </li>
    )
  }
}

Todo.propTypes = {
  task: PropTypes.string,
  importance: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  selectImportane: PropTypes.func,
  router: PropTypes.object,
  editTask: PropTypes.func
}

export default withRouter(Todo)
