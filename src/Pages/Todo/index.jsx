import React, { PureComponent, createRef } from 'react';
import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import axiosInstance from '../../utils/axiosInstance';
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
      appState: [],
    };
  }

  async componentDidMount() {
    this.loadTodos('all');
  }

  loadTodos = async (filterType) => {
    const loadingType = 'LOAD_TODO';
    try {
      this.setState(({ appState }) => ({
        appState: [
          ...appState,
          { type: loadingType, state: 'loading', message: 'Loading Todo..' },
        ],
      }));
      let url = 'todoList?_sort=id&_order=desc';
      if (filterType !== 'all') {
        url += `&isDone=${filterType === 'completed'}`;
      }
      const res = await axiosInstance.get(url);
      this.setState(({ appState }) => ({
        appState: appState.filter((x) => x.type !== loadingType),
        todoList: res.data,
        filterType,
      }));
    } catch (error) {
      this.setState(({ appState }) => ({
        appState: appState.map((x) => {
          if (x.type === loadingType) {
            return { ...x, state: 'error', message: 'Load Todo Failed...' };
          }
          return x;
        }),
      }));
    }
  };

  addTodo = async (event) => {
    try {
      this.setState({ loading: true, error: null });
      event.preventDefault();
      const todoText = this.todoTextRef.current.value;

      const res = await axiosInstance.post('todoList', {
        text: todoText,
        isDone: false,
      });

      this.setState(
        ({ todoList }) => ({
          todoList: [res.data, ...todoList],
          filterType: 'all',
        }),
        () => {
          this.todoTextRef.current.value = '';
        }
      );
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  toggleComplete = async (item) => {
    try {
      this.setState({ loading: true, error: null });
      const res = await axiosInstance.put(`todoList/${item.id}`, {
        ...item,
        isDone: !item.isDone,
      });

      this.setState(({ todoList }) => {
        // O(logN)
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            res.data,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteTodo = async (item) => {
    try {
      this.setState({ loading: true, error: null });
      await axiosInstance.delete(`todoList/${item.id}`);
      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
        };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { todoList, filterType, appState } = this.state;
    const isLoadTodoLoading = appState.some(
      (x) => x.type === 'LOAD_TODO' && x.state === 'loading'
    );

    const loadTodoError = appState.find(
      (x) => x.type === 'LOAD_TODO' && x.state === 'error'
    );

    return (
      <div className="flex flex-col items-center h-screen">
        {isLoadTodoLoading && (
          <div className="fixed h-screen inset-0 flex justify-center items-center bg-gray-300 bg-opacity-70">
            <Loader className="h-10 w-10 text-teal-600" />
          </div>
        )}
        {loadTodoError && (
          <Alert
            variant="error"
            title="Error"
            description={loadTodoError.message}
          />
        )}
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
