import * as Yup from 'yup';
import Input from '../../components/Input';

export const signInInitialValues = {
  email: '',
  password: '',
  rememberMe: false,
};

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'valida passowrd'
    )
    .required('Required'),
});

export const signInFields = [
  {
    name: 'email',
    component: Input,
    type: 'email',
    autoComplete: 'email',
    placeholder: 'Email address',
    isFirst: true,
  },
  {
    name: 'password',
    component: Input,
    type: 'password',
    autoComplete: 'current-password',
    placeholder: 'Password',
    isLast: true,
  },
];
