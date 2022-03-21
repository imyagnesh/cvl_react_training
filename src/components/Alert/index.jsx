import React from 'react';
import classNames from 'classnames';
import ErrorIcon from '../../assets/icons/error.svg';
import WarningIcon from '../../assets/icons/warning.svg';
import SuccessIcon from '../../assets/icons/success.svg';

function Alert({ variant, title, description }) {
  return (
    <div
      className={classNames('fixed right-0 p-2 w-full md:w-1/2 lg:w-1/3')}
      role="alert"
    >
      <div
        className={classNames('border-t-4', {
          'border-teal-500': variant === 'success',
          'border-red-500': variant === 'error',
          'border-orange-500': variant === 'warning',
        })}
      />
      <div
        className={classNames('flex px-4 py-3 shadow-md rounded-b', {
          'bg-teal-100 text-teal-900': variant === 'success',
          'bg-red-100 text-red-900': variant === 'error',
          'bg-orange-100 text-orange-900': variant === 'warning',
        })}
      >
        <div className="py-1">
          {variant === 'success' && (
            <SuccessIcon className="fill-current h-6 w-6 text-teal-500 mr-4" />
          )}
          {variant === 'error' && (
            <ErrorIcon className="fill-current h-6 w-6 text-red-500 mr-4" />
          )}
          {variant === 'warning' && (
            <WarningIcon className="fill-current h-6 w-6 text-orange-500 mr-4" />
          )}
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Alert;
