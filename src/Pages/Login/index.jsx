/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field } from 'formik';
import React, { useContext } from 'react';
import Checkbox from '../../components/Checkbox';
import CustomForm from '../../components/CustomForm';
import { AuthContext } from '../../context/authContext';
import { signInFields, signInInitialValues, signInSchema } from './fields';

function Login() {
  const { onLogin } = useContext(AuthContext);

  return (
    <CustomForm
      initialValues={signInInitialValues}
      validationSchema={signInSchema}
      fields={signInFields}
      btnText="Sign In"
      onSubmit={onLogin}
    >
      <div className="flex items-center justify-between">
        <Field name="rememberMe" component={Checkbox} label="Remember Me?" />
        <div className="text-sm">
          <a
            href="#forgotPassword"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>
    </CustomForm>
  );
}

export default Login;
