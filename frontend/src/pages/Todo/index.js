import React, { Component } from 'react'
import axios from 'axios'
import Input from './Input'
import ListTodo from './ListTodo'

//const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'
//axios.defaults.withCredentials = true;
const baseUrl = 'api/todos'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    console.log('after mount, getTodos')
    this.getTodos()
  }

  getTodos = () => {
    axios
      //.get(`${baseUrl}/todos`)
      .get(baseUrl)
      .then((res) => {
        if (res.data) {
          this.setState({
            todos: res.data,
          })
        }
      })
      .catch((err) => console.log(err))
  }

  deleteTodo = (id) => {
    axios
      //.delete(`${baseUrl}/todos/${id}`)
      .delete(`${baseUrl}/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos()
        }
      })
      .catch((err) => console.log(err))
  }

  render() {
    console.log('rendering Todo')
    let { todos } = this.state

    return (
      <div>
        <h1>My Todo(s)</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo todos={todos} deleteTodo={this.deleteTodo} />
      </div>
    )
  }
}

export default Todo