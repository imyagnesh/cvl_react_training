import classNames from 'classnames';
import React, { PureComponent, createRef } from 'react';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.todoTextRef = createRef();
    this.state = {
      todoList: [],
      filterType: 'all',
    };
  }

  async componentDidMount() {
    this.loadTodos('all');
  }

  loadTodos = async (filterType) => {
    try {
      let url = 'http://localhost:3000/todoList';
      if (filterType !== 'all') {
        url += `?isDone=${filterType === 'completed'}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      this.setState({ todoList: json, filterType });
    } catch (error) {
      console.log(error);
    }
  };

  addTodo = async (event) => {
    try {
      event.preventDefault();
      const todoText = this.todoTextRef.current.value;

      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text: todoText,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(
        ({ todoList }) => ({
          todoList: [json, ...todoList],
          filterType: 'all',
        }),
        () => {
          this.todoTextRef.current.value = '';
        }
      );
    } catch (error) {}
  };

  toggleComplete = async (item) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...item, isDone: !item.isDone }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const json = await res.json();

      this.setState(({ todoList }) => {
        // O(logN)
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {}
  };

  deleteTodo = async (item) => {
    try {
      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {}
  };

  render() {
    console.log('render');
    const { todoList, filterType } = this.state;
    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-2xl font-bold my-6 ">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} />
        <TodoList
          todoList={todoList}
          toggleComplete={this.toggleComplete}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter loadTodos={this.loadTodos} filterType={filterType} />
      </div>
    );
  }
}

export default Todo;
