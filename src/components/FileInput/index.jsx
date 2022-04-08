/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useRef } from 'react';

function FileInput({
  field: { name, value },
  form: { touched, errors, setFieldValue },
  placeholder,
  isFirst,
  isLast,
  ...props
}) {
  console.log(value);
  const fileRef = useRef(null);
  return (
    <div>
      <label htmlFor="email-address" className="sr-only">
        {placeholder}
      </label>
      <input
        ref={fileRef}
        className={classNames(
          'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
          {
            'border-red-300 focus:ring-red-500 focus:border-red-500':
              touched[name] && errors[name],
            'rounded-t-md': isFirst,
            'rounded-b-md': isLast,
          }
        )}
        multiple
        type="file"
        {...props}
        onChange={(e) => {
          const fileListArr = Array.from(fileRef.current.files);
          setFieldValue(name, fileListArr);
        }}
      />
      {value?.map((x, i) => (
        <div key={x.name} className="flex justify-between">
          <p>{x.name}</p>
          <button
            type="button"
            onClick={() => {
              const updatedFiles = [
                ...value.slice(0, i),
                ...value.slice(i + 1),
              ];
              setFieldValue(name, updatedFiles);
            }}
          >
            X
          </button>
        </div>
      ))}
      {touched[name] && errors[name] && (
        <span className="text-red-400 font-light text-sm my-1">
          {errors[name]}
        </span>
      )}
    </div>
  );
}

export default FileInput;
