import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '../../services/useLogin';
import { useForm } from 'react-hook-form';
import { ModelAuth } from '../../ui/ModelAuth';
import { Input } from '../../ui/Input';
import {
  AlignCenter,
  Button,
  Error,
  H1,
  NavLink,
  StyledSign,
} from '../../ui/AuthStyles';

export function SignIn() {
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  async function onSubmit(data) {
    try {
      await login(data);
    } catch (error) {
      console.error('Login Error:', error);
    }
  }

  if (isLoading) return <div>isLoading...</div>;

  return (
    <ModelAuth>
      <div>
        <H1>Sign in</H1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
          />
          {errors.email && <Error>{errors?.email?.message}</Error>}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'Password needs a minimum of 6 characters',
              },
            })}
          />
          {errors.password && <Error>{errors?.password?.message}</Error>}
        </div>
        <div>
          <Button type="submit">Sign in</Button>
        </div>
      </form>

      <StyledSign>
        <AlignCenter>
          <div>
            <p>Not a member? </p>
          </div>
          <div>
            &nbsp;
            <NavLink to="/sign-up"> Sign up now.</NavLink>
          </div>
        </AlignCenter>
      </StyledSign>
    </ModelAuth>
  );
}
