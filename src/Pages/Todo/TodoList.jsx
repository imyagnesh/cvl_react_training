import React, { memo } from 'react';
// import { ThemeContext } from '../../context/themeContext';
import TodoItem from './TodoItem';

function TodoList({ todoList, toggleComplete, deleteTodo, appState }) {
  console.log('Todo List render');
  return (
    <>
      {/* <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div>
            <p>Current theme is {theme}</p>
            <button type="button" onClick={toggleTheme}>
              Change Theme
            </button>
          </div>
        )}
      </ThemeContext.Consumer> */}
      <div className="w-full flex-1 overflow-y-auto my-4">
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            appState={appState.find(
              (x) =>
                (x.type === 'UPDATE_TODO' || x.type === 'DELETE_TODO') &&
                x.loadingId === item.id
            )}
          />
        ))}
      </div>
    </>
  );
}

export default memo(TodoList);
