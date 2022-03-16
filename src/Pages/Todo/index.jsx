import classNames from 'classnames';
import React, { PureComponent, createRef } from 'react';

class Todo extends PureComponent {
  constructor(props) {
    super(props);
    this.todoTextRef = createRef();
    this.state = {
      todoList: [],
      filterType: 'all',
    };
  }

  addTodo = (event) => {
    event.preventDefault();
    const todoText = this.todoTextRef.current.value;
    this.setState(
      ({ todoList }) => ({
        todoList: [
          { id: new Date().valueOf(), text: todoText, isDone: false },
          ...todoList,
        ],
        filterType: 'all',
      }),
      () => {
        this.todoTextRef.current.value = '';
      }
    );
  };

  toggleComplete = (item) => {
    this.setState(({ todoList }) => {
      // O(logN)
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          { ...item, isDone: !item.isDone },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  filterTodo = (filterType) => {
    this.setState({
      filterType,
    });
  };

  render() {
    const { todoList, filterType } = this.state;
    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="text-2xl font-bold my-6 ">Todo App</h1>
        <form onSubmit={this.addTodo} className="flex">
          <input
            type="text"
            className="rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ref={this.todoTextRef}
          />
          <button
            type="submit"
            className="px-4 bg-blue-500 rounded-r-md text-white"
          >
            Add Todo
          </button>
        </form>
        <div className="w-full flex-1 overflow-y-auto my-4">
          {todoList
            .filter((item) => {
              switch (filterType) {
                case 'completed':
                  return item.isDone === true;
                case 'pending':
                  return item.isDone === false;
                default:
                  return true;
              }
            })
            .map((item) => (
              <div key={item.id} className="m-4 flex items-center">
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() => this.toggleComplete(item)}
                />
                <p
                  className={classNames('px-4 flex-1 text-xl', {
                    'line-through': item.isDone,
                  })}
                >
                  {item.text}
                </p>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 rounded-md text-white"
                  onClick={() => this.deleteTodo(item)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div className="w-full flex">
          <button
            type="button"
            onClick={() => this.filterTodo('all')}
            className="flex-1 px-4 py-2 bg-blue-500 text-white"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => this.filterTodo('pending')}
            className="flex-1 px-4 py-2 bg-blue-500 text-white"
          >
            Pending
          </button>
          <button
            type="button"
            onClick={() => this.filterTodo('completed')}
            className="flex-1 px-4 py-2 bg-blue-500 text-white"
          >
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
