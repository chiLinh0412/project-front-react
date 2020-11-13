import React from 'react';
import './App.css';
import Todo from './Todo';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: [], isLoading: true};
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/todos/list')
      .then(response => response.json())
  .then(data => this.setState({todos: data, isLoading: false}));
  }

  async addTodo(e) {
    if (this._inputTodo.value !== "") {
      var newTodo = {
        id: this.state.inputId,
        content: this._inputTodo.value,
      };
      await fetch(`/api/todo`, {
      method: (newTodo.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      this.setState((prevState) => {
        return { 
          todos: prevState.todos.concat(newTodo) 
        };
      });
  });
   
      this._inputTodo.value = "";
      this.state.inputId += 1;
    }
   
    console.log(this.state.todos);
     
    e.preventDefault();
  }

  deleteTodo(id) {
    var filteredTodos = this.state.todos.filter(function (todo) {
      return (todo.id !== id);
    });
 
    this.setState({
      todos: filteredTodos
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input ref={(a) => this._inputTodo = a}
            placeholder="enter todo">
          </input>
          <button type="submit">Add</button>
        </form>

        <div>
          <Todo entries={this.state.todos}
                delete={this.deleteTodo}/>
        </div>
        
      </div>
    )
  }
}