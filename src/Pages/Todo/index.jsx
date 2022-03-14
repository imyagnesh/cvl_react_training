import React, { PureComponent, createRef } from 'react';

class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.todoTextRef = createRef();
    this.state = {
      todoList: [],
    };
  }

  addTodo = (event) => {
    event.preventDefault();
    const todoText = this.todoTextRef.current.value;
    this.setState(
      ({ todoList }) => ({
        todoList: [todoText, ...todoList],
      }),
      () => {
        this.todoTextRef.current.value = '';
      }
    );
  };

  render() {
    const { todoList } = this.state;
    return (
      <div>
        <h1>Todo App</h1>
        <form onSubmit={this.addTodo}>
          <input type="text" ref={this.todoTextRef} />
          <button type="submit">Add Todo</button>
        </form>
        <div>
          {[...new Set(todoList)].map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Todo;
