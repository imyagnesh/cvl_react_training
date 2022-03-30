import * as Yup from 'yup';
import Input from '../../components/Input';

export const signUpFields = [
  {
    name: 'name',
    component: Input,
    placeholder: 'Name',
    isFirst: true,
  },
  {
    name: 'email',
    component: Input,
    type: 'email',
    placeholder: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    component: Input,
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    component: Input,
    type: 'password',
    placeholder: 'Confirm Password',
    autoComplete: 'new-password',
  },
];

export const signUpInitialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'valid passowrd'
    )
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});
