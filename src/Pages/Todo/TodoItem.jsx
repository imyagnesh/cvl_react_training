import classNames from 'classnames';
import React, { memo } from 'react';

function TodoItem({ item, toggleComplete, deleteTodo }) {
  console.log('Todo Item render');
  return (
    <div className="m-4 flex items-center">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => toggleComplete(item)}
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
        onClick={() => deleteTodo(item)}
      >
        Delete
      </button>
    </div>
  );
}

export default memo(TodoItem);
