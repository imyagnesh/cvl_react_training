import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomForm from '../../components/CustomForm';
import axiosInstance from '../../utils/axiosInstance';
import {
  signUpFields,
  signUpInitialValues,
  signUpValidationSchema,
} from './fields';

function Register() {
  const navigate = useNavigate();

  const onRegister = async (values, actions) => {
    try {
      const { confirmPassword, ...rest } = values;
      const res = await axiosInstance.post('register', rest);
      sessionStorage.setItem('@token', JSON.stringify(res.data));
      actions.resetForm();
      navigate('/');
    } catch (error) {
      actions.setErrors({ serverError: error.message });
    }
  };

  return (
    <CustomForm
      onSubmit={onRegister}
      initialValues={signUpInitialValues}
      validationSchema={signUpValidationSchema}
      fields={signUpFields}
      btnText="Sign Up"
    />
  );
}

export default Register;
