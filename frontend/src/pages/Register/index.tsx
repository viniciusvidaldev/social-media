import { FiUser } from 'react-icons/fi';
import { MdOutlineEmail } from 'react-icons/md';
import { BiLockAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '../../components/Input';
import * as S from './styles';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

const signUpFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('E-mail is required').email('Invalid e-mail'),
  password: yup.string().required('Password is required').min(6, 'Password needs to be at least 6 characters long'),
});

export function Register() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { signUp } = useAuth();

  async function handleRegisterSubmit(data: any) {
    await signUp({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  }

  return (
    <>
      <S.Header>
        <h1>SocialMedia™</h1>
      </S.Header>

      <S.Container>

        <S.FormHeader>
          <h1>Register</h1>
        </S.FormHeader>

        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <S.FormGroup>
            <Input
              id="name-input-register"
              placeholder="Name"
              leftIcon={<FiUser />}
              error={errors.name}
              {...register('name')}
            />
          </S.FormGroup>

          <S.FormGroup>
            <Input
              id="email-input-register"
              placeholder="E-mail"
              leftIcon={<MdOutlineEmail />}
              error={errors.email}
              {...register('email')}
            />
          </S.FormGroup>

          <S.FormGroup>
            <Input
              id="password-input-register"
              placeholder="Password"
              leftIcon={<BiLockAlt />}
              error={errors.password}
              type="password"
              {...register('password')}
            />
          </S.FormGroup>

          <S.SubmitButton>
            <Button type="submit">
              Register
            </Button>
          </S.SubmitButton>

          <S.AnotherOption>
            <p>
              Already registered?
              {' '}
              <Link to="/login">
                <span>
                  Login
                </span>
              </Link>
            </p>
          </S.AnotherOption>
        </form>

      </S.Container>
    </>
  );
}
