import React, { useContext } from 'react';
import CustomForm from '../../components/CustomForm';
import { AuthContext } from '../../context/authContext';
import {
  signUpFields,
  signUpInitialValues,
  signUpValidationSchema,
} from './fields';

function Register() {
  const { onRegister } = useContext(AuthContext);

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
