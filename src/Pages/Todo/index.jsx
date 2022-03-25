import React, { useState, useEffect } from 'react';

import Alert from '../../components/Alert';
import Loader from '../../components/Loader';
import axiosInstance from '../../utils/axiosInstance';
import TodoFilter from './TodoFilter';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [appState, setAppState] = useState([]);
  // const todoTextRef = useRef(null);

  const loadingProcess = (type, message, loadingId = -1) => {
    setAppState((value) => [
      ...value,
      { state: 'loading', type, message, loadingId },
    ]);
  };

  const successProcess = (type, loadingId = -1) => {
    setAppState((value) =>
      value.filter((x) => !(x.type === type && x.loadingId === loadingId))
    );
  };

  const errorProcess = (type, message, loadingId = -1) => {
    setAppState((value) =>
      value.map((x) => {
        if (x.type === type && x.loadingId === loadingId) {
          return { ...x, state: 'error', message };
        }
        return x;
      })
    );
  };

  const loadTodos = async (ft) => {
    const loadingType = 'LOAD_TODO';
    try {
      loadingProcess(loadingType, 'Loading Todo..');
      let url = 'todoList?_sort=id&_order=desc';
      if (ft !== 'all') {
        url += `&isDone=${ft === 'completed'}`;
      }
      const res = await axiosInstance.get(url);
      setTodoList(res.data);
      setFilterType(ft);
      successProcess(loadingType);
    } catch (error) {
      errorProcess(loadingType, 'Load Todo Failed...');
    }
  };

  useEffect(() => {
    loadTodos('all');
  }, []);

  const isLoadTodoLoading = appState.some(
    (x) => x.type === 'LOAD_TODO' && x.state === 'loading'
  );

  const loadTodoError = appState.find(
    (x) => x.type === 'LOAD_TODO' && x.state === 'error'
  );

  const addTodo = async (values, actions) => {
    console.log(actions);
    const loadingType = 'ADD_TODO';
    try {
      loadingProcess(loadingType, 'Adding Todo..');

      const res = await axiosInstance.post('todoList', {
        text: values.todoText,
        isDone: false,
      });

      setTodoList((value) => [res.data, ...value]);
      setFilterType('all');

      successProcess(loadingType);
      actions.resetForm();
    } catch (error) {
      actions.setErrors({ todoText: 'Add Todo Failed...' });
      errorProcess(loadingType, error.message || 'Add Todo Failed...');
    }
  };

  const toggleComplete = async (item) => {
    const loadingType = 'UPDATE_TODO';
    try {
      loadingProcess(loadingType, 'Updating Todo', item.id);
      const res = await axiosInstance.put(`todoList/${item.id}`, {
        ...item,
        isDone: !item.isDone,
      });

      setTodoList((value) => {
        const index = value.findIndex((x) => x.id === item.id);
        return [...value.slice(0, index), res.data, ...value.slice(index + 1)];
      });

      successProcess(loadingType, item.id);
    } catch (error) {
      errorProcess(loadingType, 'Update Todo Failed', item.id);
    }
  };

  const deleteTodo = async (item) => {
    const loadingType = 'DELETE_TODO';
    try {
      loadingProcess(loadingType, 'Deleting Todo', item.id);
      await axiosInstance.delete(`todoList/${item.id}`);
      setTodoList((value) => {
        const index = value.findIndex((x) => x.id === item.id);
        return [...value.slice(0, index), ...value.slice(index + 1)];
      });

      successProcess(loadingType, item.id);
    } catch (error) {
      errorProcess(loadingType, 'Delete Todo Failed', item.id);
    }
  };

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
      {/* <ThemeProvider> */}
      <TodoForm
        addTodo={addTodo}
        addTodoState={appState.find(
          (x) => x.type === 'ADD_TODO' && x.state === 'loading'
        )}
      />

      <TodoList
        todoList={todoList}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        appState={appState}
      />
      {/* </ThemeProvider> */}
      <TodoFilter loadTodos={loadTodos} filterType={filterType} />
    </div>
  );
}

export default Todo;

// class Todo extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.todoTextRef = createRef();
//     this.state = {
//       todoList: [],
//       filterType: 'all',
//       appState: [],
//     };
//   }

//   async componentDidMount() {
//     this.loadTodos('all');
//   }

//   loadingProcess = (type, message, loadingId = -1) => {
//     this.setState(({ appState }) => ({
//       appState: [...appState, { state: 'loading', type, message, loadingId }],
//     }));
//   };

//   successProcess = (type, loadingId = -1) => {
//     this.setState(({ appState }) => ({
//       appState: appState.filter(
//         (x) => !(x.type === type && x.loadingId === loadingId)
//       ),
//     }));
//   };

//   errorProcess = (type, message, loadingId = -1) => {
//     this.setState(({ appState }) => ({
//       appState: appState.map((x) => {
//         if (x.type === type && x.loadingId === loadingId) {
//           return { ...x, state: 'error', message };
//         }
//         return x;
//       }),
//     }));
//   };

//   loadTodos = async (filterType) => {
//     const loadingType = 'LOAD_TODO';
//     try {
//       this.loadingProcess(loadingType, 'Loading Todo..');
//       let url = 'todoList?_sort=id&_order=desc';
//       if (filterType !== 'all') {
//         url += `&isDone=${filterType === 'completed'}`;
//       }
//       const res = await axiosInstance.get(url);
//       this.setState({
//         todoList: res.data,
//         filterType,
//       });
//       this.successProcess(loadingType);
//     } catch (error) {
//       this.errorProcess(loadingType, 'Load Todo Failed...');
//     }
//   };

//   addTodo = async (values) => {
//     const loadingType = 'ADD_TODO';
//     try {
//       this.loadingProcess(loadingType, 'Adding Todo..');

//       const res = await axiosInstance.post('todoList', {
//         text: values.todoText,
//         isDone: false,
//       });

//       this.setState(
//         ({ todoList }) => ({
//           todoList: [res.data, ...todoList],
//           filterType: 'all',
//         }),
//         () => {
//           this.todoTextRef.current.value = '';
//         }
//       );
//       this.successProcess(loadingType);
//     } catch (error) {
//       this.errorProcess(loadingType, error.message || 'Add Todo Failed...');
//     }
//   };

//   toggleComplete = async (item) => {
//     const loadingType = 'UPDATE_TODO';
//     try {
//       this.loadingProcess(loadingType, 'Updating Todo', item.id);
//       const res = await axiosInstance.put(`todoList/${item.id}`, {
//         ...item,
//         isDone: !item.isDone,
//       });

//       this.setState(({ todoList }) => {
//         // O(logN)
//         const index = todoList.findIndex((x) => x.id === item.id);
//         return {
//           todoList: [
//             ...todoList.slice(0, index),
//             res.data,
//             ...todoList.slice(index + 1),
//           ],
//         };
//       });
//       this.successProcess(loadingType, item.id);
//     } catch (error) {
//       this.errorProcess(loadingType, 'Update Todo Failed', item.id);
//     }
//   };

//   deleteTodo = async (item) => {
//     const loadingType = 'DELETE_TODO';
//     try {
//       this.loadingProcess(loadingType, 'Deleting Todo', item.id);
//       await axiosInstance.delete(`todoList/${item.id}`);
//       this.setState(({ todoList }) => {
//         const index = todoList.findIndex((x) => x.id === item.id);
//         return {
//           todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
//         };
//       });
//       this.successProcess(loadingType, item.id);
//     } catch (error) {
//       this.errorProcess(loadingType, 'Delete Todo Failed', item.id);
//     }
//   };

//   render() {
//     const { todoList, filterType, appState } = this.state;
//     const isLoadTodoLoading = appState.some(
//       (x) => x.type === 'LOAD_TODO' && x.state === 'loading'
//     );

//     const loadTodoError = appState.find(
//       (x) => x.type === 'LOAD_TODO' && x.state === 'error'
//     );

//     return (
//       <div className="flex flex-col items-center h-screen">
//         {isLoadTodoLoading && (
//           <div className="fixed h-screen inset-0 flex justify-center items-center bg-gray-300 bg-opacity-70">
//             <Loader className="h-10 w-10 text-teal-600" />
//           </div>
//         )}
//         {loadTodoError && (
//           <Alert
//             variant="error"
//             title="Error"
//             description={loadTodoError.message}
//           />
//         )}
//         <h1 className="text-2xl font-bold my-6 ">Todo App</h1>
//         {/* <ThemeProvider> */}
//         <TodoForm
//           addTodo={this.addTodo}
//           ref={this.todoTextRef}
//           addTodoState={appState.find((x) => x.type === 'ADD_TODO')}
//         />

//         <TodoList
//           todoList={todoList}
//           toggleComplete={this.toggleComplete}
//           deleteTodo={this.deleteTodo}
//           appState={appState}
//         />
//         {/* </ThemeProvider> */}
//         <TodoFilter loadTodos={this.loadTodos} filterType={filterType} />
//       </div>
//     );
//   }
// }

// export default Todo;

// import React, { useState, useEffect, useRef } from 'react';
// import Child from './Child';

// // In Component if you want to change the data then we have to change state value or prop value

// function Todo() {
//   // const [counter, setCounter] = useState(0);
//   // const [value, setValue] = useState(5);

//   const [data, setData] = useState({
//     counter: 0,
//     value: 5,
//   });

//   const isMounted = useRef(false);

//   const increment = () => {
//     setData((val) => ({ ...val, counter: val.counter + 1 }));
//   };

//   const decrement = () => {
//     setData((val) => ({ ...val, counter: val.counter + 1 }));
//   };

//   const incrementValue = () => {
//     setData((val) => ({ ...val, value: val.value + 1 }));
//   };

//   const decrementValue = () => {
//     setData((val) => ({ ...val, value: val.value + 1 }));
//   };

//   useEffect(() => {
//     if (isMounted.current) {
//       console.log('Component Updated');
//       console.log(document.getElementsByTagName('span')[0].innerHTML);
//       console.log(document.getElementsByTagName('span')[1].innerHTML);
//     }
//   }, [data.value]);

//   // Component Did Update(when value or counter change)
//   useEffect(() => {
//     if (isMounted.current) {
//       console.log('Component Updated');
//       console.log(document.getElementsByTagName('span')[0].innerHTML);
//       console.log(document.getElementsByTagName('span')[1].innerHTML);
//     }
//   }, [data.value, data.counter]);

//   // Component Did Mount
//   useEffect(() => {
//     console.log('Component Mounted');
//     console.log(document.getElementsByTagName('span')[0].innerHTML);
//     console.log(document.getElementsByTagName('span')[1].innerHTML);
//     isMounted.current = true;
//   }, []);

//   // Component Did Update(when value change)

//   return (
//     <div>
//       <div>
//         <button type="button" onClick={increment}>
//           +
//         </button>
//         <span>{data.counter}</span>
//         <button type="button" onClick={decrement}>
//           -
//         </button>
//       </div>
//       <div>
//         <button type="button" onClick={incrementValue}>
//           +
//         </button>
//         <span>{data.value}</span>
//         <button type="button" onClick={decrementValue}>
//           -
//         </button>
//       </div>
//       {data.value < 10 && <Child />}
//     </div>
//   );
// }

// export default Todo;
