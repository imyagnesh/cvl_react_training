/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../../components/Checkbox';
import CustomForm from '../../components/CustomForm';
import axiosInstance from '../../utils/axiosInstance';
import { signInFields, signInInitialValues, signInSchema } from './fields';

function Login() {
  const navigate = useNavigate();

  const onLogin = async (values, actions) => {
    try {
      const { rememberMe, ...rest } = values;
      const res = await axiosInstance.post('login', rest);
      sessionStorage.setItem('@token', JSON.stringify(res.data));
      actions.resetForm();
      navigate('/');
    } catch (error) {
      actions.setErrors({ serverError: error.message });
    }
  };

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
