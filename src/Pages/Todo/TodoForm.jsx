import React, { forwardRef, memo } from 'react';
import Loader from '../../components/Loader';

const TodoForm = forwardRef(({ addTodo, addTodoState }, ref) => (
  <form onSubmit={addTodo} className="flex flex-col">
    <div className="flex">
      <input
        type="text"
        className="rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ref={ref}
      />
      <button
        type="submit"
        disabled={addTodoState?.state === 'loading'}
        className="px-4 bg-blue-500 rounded-r-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {addTodoState?.state === 'loading' ? (
          <Loader className="h-5 w-5 text-white" />
        ) : (
          'Add Todo'
        )}
      </button>
    </div>
    {addTodoState?.state === 'error' && (
      <p className="text-sm text-red-400">{addTodoState?.message}</p>
    )}
  </form>
));

TodoForm.displayName = 'TodoForm';

export default memo(TodoForm);
