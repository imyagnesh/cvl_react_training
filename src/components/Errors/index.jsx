import React from 'react';
import { connect } from 'react-redux';

function Errors({ errors }) {
  return (
    <>
      {errors.map((err, index) => (
        <div
          key={index}
          role="alert"
          className="fixed w-full md:w-2/3 lg:w-1/2"
          style={{
            bottom: index * 100 + 16,
          }}
        >
          <div className="mx-4">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Danger
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{err.error.message}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(Errors);
