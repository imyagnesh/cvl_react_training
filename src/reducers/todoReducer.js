export const todoInitValue = {
  todoList: [],
  filterType: 'all',
  appState: [],
};

export const todoReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOAD_TODO_REQUEST':
    case 'ADD_TODO_REQUEST':
    case 'UPDATE_TODO_REQUEST':
      return {
        ...state,
        appState: [...state.appState, { state: 'loading', ...payload }],
      };

    case 'LOAD_TODO_SUCCESS':
      return {
        ...state,
        todoList: payload.todoList,
        filterType: payload.filterType,
        appState: state.appState.filter(
          (x) =>
            !(
              x.type === payload.loadingType &&
              x.loadingId === payload.loadingId
            )
        ),
      };

    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        todoList: [...state.todoList, payload.todoList],
        filterType: payload.filterType,
        appState: state.appState.filter(
          (x) =>
            !(
              x.type === payload.loadingType &&
              x.loadingId === payload.loadingId
            )
        ),
      };

    case 'UPDATE_TODO_SUCCESS': {
      const index = state.todoList.findIndex(
        (x) => x.id === payload.todoList.id
      );
      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, index),
          payload.todoList,
          ...state.todoList.slice(index + 1),
        ],
        appState: state.appState.filter(
          (x) =>
            !(
              x.type === payload.loadingType &&
              x.loadingId === payload.loadingId
            )
        ),
      };
    }

    case 'LOAD_TODO_FAIL':
    case 'ADD_TODO_FAIL':
    case 'UPDATE_TODO_FAIL':
      return {
        ...state,
        appState: state.appState.map((x) => {
          if (
            x.type === payload.loadingType &&
            x.loadingId === payload.loadingId
          ) {
            return { ...x, state: 'error', message: payload.message };
          }
          return x;
        }),
      };

    default:
      return state;
  }
};
