import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
const baseUrl = '/api/todos'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      action: ''
    }
  }

  addTodo = () => {
    const task = { action: this.state.action }

    if (task.action && task.action.length > 0) {
      axios
        //.post(`${baseUrl}/todos`, task)
        .post(baseUrl, task)
        .then((res) => {
          if (res.data) {
            this.props.getTodos()
            this.setState({ action: '' })
          }
        })
        .catch((err) => console.log(err))
    } else {
      console.log('input field required')
    }
  }

  handleChange = (e) => {
    this.setState({
      action: e.target.value,
    })
  }

  render() {
    let { action } = this.state
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={action} />
        <button onClick={this.addTodo}>add todo</button>
      </div>
    )
  }
}

Input.propTypes = {
  getTodos: PropTypes.func
}

export default Input