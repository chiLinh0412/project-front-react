import React from 'react';
import FlipMove from 'react-flip-move';
 
export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.createTodo = this.createTodo.bind(this);
    this.delete = this.delete.bind(this);
  }

  createTodo (todo) {
    return <li onClick={() => this.delete(todo.id)} 
              key={todo.id}>{todo.content}</li>
  }
    
  async delete(id) {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.props.delete(id);
  });
  }

  render() {
    var todoEntries = this.props.entries;
    var todos = todoEntries.map(this.createTodo);
 
    return (
      <ul>
            <FlipMove duration={250} easing="ease-out">
                {todos}
            </FlipMove>
      </ul>
    );
  }
}
 