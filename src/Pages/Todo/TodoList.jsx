import React, { memo } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todoList, toggleComplete, deleteTodo }) {
  console.log('Todo List render');
  return (
    <div className="w-full flex-1 overflow-y-auto my-4">
      {todoList.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default memo(TodoList);
