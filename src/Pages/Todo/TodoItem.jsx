import classNames from 'classnames';
import React, { memo } from 'react';

function TodoItem({ item, toggleComplete, deleteTodo, appState }) {
  console.log(appState);
  return (
    <div className="m-4 flex items-center">
      <input
        type="checkbox"
        disabled={
          appState?.type === 'UPDATE_TODO' && appState?.state === 'loading'
        }
        checked={item.isDone}
        onChange={() => toggleComplete(item)}
        className="disabled:cursor-not-allowed disabled:text-gray-500"
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
        disabled={
          appState?.type === 'DELETE_TODO' && appState?.state === 'loading'
        }
        className="px-4 py-2 bg-blue-500 rounded-md text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        onClick={() => deleteTodo(item)}
      >
        Delete
      </button>
    </div>
  );
}

export default memo(TodoItem);
