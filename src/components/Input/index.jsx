/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';

function Input({
  field,
  form: { touched, errors },
  placeholder,
  isFirst,
  isLast,
  ...props
}) {
  return (
    <div>
      <label htmlFor="email-address" className="sr-only">
        {placeholder}
      </label>
      <input
        className={classNames(
          'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
          {
            'border-red-300 focus:ring-red-500 focus:border-red-500':
              touched[field.name] && errors[field.name],
            'rounded-t-md': isFirst,
            'rounded-b-md': isLast,
          }
        )}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <span className="text-red-400 font-light text-sm my-1">
          {errors[field.name]}
        </span>
      )}
    </div>
  );
}

export default Input;
