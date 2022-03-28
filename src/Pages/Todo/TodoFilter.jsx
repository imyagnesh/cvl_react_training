import classNames from 'classnames';
import React, { memo } from 'react';

function TodoFilter({ loadTodos, filterType }) {
  return (
    <div className="w-full flex">
      <button
        type="button"
        onClick={() => loadTodos('all')}
        className={classNames('flex-1 px-4 py-2 bg-blue-500 text-white', {
          'bg-red-300': filterType === 'all',
        })}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => loadTodos('pending')}
        className={classNames('flex-1 px-4 py-2 bg-blue-500 text-white', {
          'bg-red-300': filterType === 'pending',
        })}
      >
        Pending
      </button>
      <button
        type="button"
        onClick={() => loadTodos('completed')}
        className={classNames('flex-1 px-4 py-2 bg-blue-500 text-white', {
          'bg-red-300': filterType === 'completed',
        })}
      >
        Completed
      </button>
    </div>
  );
}

export default memo(TodoFilter);
