import { MdOutlineEmail } from 'react-icons/md';
import { BiLockAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../../components/Input';
import * as S from './styles';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail is required').email('Invalid e-mail'),
  password: yup.string().required('Password is required').min(6, 'Password needs to be at least 6 characters long'),
});

export function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const { signIn } = useAuth();

  async function handleLoginSubmit(data: any) {
    await signIn({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <S.Container>
      <S.FormHeader>
        <h1>Login</h1>
      </S.FormHeader>

      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <S.FormGroup>
          <Input
            id="email-input-register"
            placeholder="E-mail"
            leftIcon={<MdOutlineEmail />}
            {...register('email')}
          />
        </S.FormGroup>

        <S.FormGroup>
          <Input
            id="password-input-register"
            placeholder="Password"
            leftIcon={<BiLockAlt />}
            {...register('password')}
          />
        </S.FormGroup>

        <S.SubmitButton>
          <Button type="submit">
            Login
          </Button>
        </S.SubmitButton>

        <S.AnotherOption>
          <p>
            Don&apos;t have an account yet?
            {' '}
            <Link to="/register">
              <span>
                Register
              </span>
            </Link>
          </p>
        </S.AnotherOption>
      </form>

    </S.Container>
  );
}
