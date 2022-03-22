import React, { memo } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todoList, toggleComplete, deleteTodo, appState }) {
  console.log('Todo List render');
  return (
    <div className="w-full flex-1 overflow-y-auto my-4">
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          appState={appState.find(
            (x) => x.type === 'UPDATE_TODO' && x.loadingId === item.id
          )}
        />
      ))}
    </div>
  );
}

export default memo(TodoList);
