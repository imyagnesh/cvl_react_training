import { Field, Formik } from 'formik';
import React from 'react';

function CustomForm({ fields, btnText, children, ...rest }) {
  return (
    <Formik {...rest}>
      {({ handleSubmit, errors, dirty, isValid, isSubmitting }) => (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.serverError && (
            <p className="text-center text-red-400 text-lg my-2">
              {errors.serverError}
            </p>
          )}
          <div className="rounded-md -space-y-px">
            {fields.map((item) => (
              <Field key={item.name} {...item} />
            ))}
          </div>
          {children}
          <div>
            <button
              disabled={!(dirty && isValid) || isSubmitting}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400"
            >
              {btnText}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default CustomForm;
