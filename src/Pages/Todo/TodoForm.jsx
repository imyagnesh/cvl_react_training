import React, { forwardRef, memo } from 'react';

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log('Todo Form render');
  return (
    <form onSubmit={addTodo} className="flex">
      <input
        type="text"
        className="rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ref={ref}
      />
      <button
        type="submit"
        className="px-4 bg-blue-500 rounded-r-md text-white"
      >
        Add Todo
      </button>
    </form>
  );
});

TodoForm.displayName = 'TodoForm';

export default memo(TodoForm);
