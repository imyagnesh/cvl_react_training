import React from 'react';

function Checkbox({ field, label, ...props }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        {...field}
        {...props}
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
