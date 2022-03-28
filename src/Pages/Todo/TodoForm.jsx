import classNames from 'classnames';
import { Formik } from 'formik';
import React, { forwardRef, memo } from 'react';
import Loader from '../../components/Loader';
// import { LocaleContext } from '../../context/localeContext';
// import { ThemeContext } from '../../context/themeContext';

function TodoForm({ addTodo, addTodoState }) {
  console.log('Todo Form');
  return (
    <Formik
      initialValues={{ todoText: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.todoText) {
          errors.todoText = 'Required...';
        }
        //  else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.todoText)
        // ) {
        //   errors.todoText = 'Invalid email address';
        // }

        return errors;
      }}
      onSubmit={addTodo}
    >
      {({ values, handleChange, errors, handleSubmit, handleBlur }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex">
            <input
              name="todoText"
              type="text"
              className={classNames(
                'rounded-l-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
                {
                  'border-red-300 focus:border-red-300 focus:ring-red-200':
                    errors.todoText,
                }
              )}
              value={values.todoText}
              onChange={handleChange}
              onBlur={handleBlur}
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
          {errors.todoText && (
            <p className="text-sm text-red-400">{errors.todoText}</p>
          )}
        </form>
      )}
    </Formik>
  );
}

TodoForm.displayName = 'TodoForm';

export default memo(TodoForm);
