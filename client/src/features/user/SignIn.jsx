import styled from 'styled-components';
import { TextField } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';

import { useLogin } from './useLogin';
import { useForm } from 'react-hook-form';
import { ModelAuth } from '../../ui/ModelAuth';
import {
  AlignCenter,
  Error,
  H1,
  NavLink,
  StyledSign,
} from '../../ui/AuthStyles';
import { device } from '../../ui/device';
import { Link } from 'react-router-dom';

export function SignIn() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, formState } = useForm();
  const [ph, setPh] = useState('');

  const { errors } = formState;
  async function onSubmit({ password }) {
    const mobile = '+' + ph;
    try {
      await login({ mobile, password });
    } catch (error) {
      console.error('Login Error:', error);
    }
  }

  if (isLoading) return <div>isLoading...</div>;

  return (
    <ModelAuth>
      <StyledImage>
        <Img src="/sign-up.png" alt="image" />
        <H1>Sign in</H1>
      </StyledImage>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <PhoneInput
            country={'in'}
            name="mobile"
            value={ph}
            onChange={setPh}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            sx={{
              width: '100%',
            }}
            variant="outlined"
            autoComplete="off"
            label="Password"
            type="password"
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
        </InputContainer>
        <div>
          <Button type="submit">Sign in</Button>
        </div>
      </form>
      <StyledLink to="/forgetpassword">ForgetPassword</StyledLink>
      <StyledSign>
        <AlignCenter>
          <p>Create new account? </p>
          <NavLink to="/sign-up"> Sign Up now.</NavLink>
        </AlignCenter>
      </StyledSign>
    </ModelAuth>
  );
}
export const Button = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 15px 20px;
  margin-top: 20px;
  width: 100%;
  border: transparent;
  color: #131313;
  background-color: #ffca1a;
  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
    border: 1px solid #999999;
    color: #666666;
  }
  &:hover {
    background-color: #ffc401;
    transition: background 0.3s;
  }
  @media ${device.laptopL} {
    font-size: 15px;
  }
  @media ${device.laptop} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
    padding: 6px 10px;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    padding: 6px 10psx;
  }
`;
const Img = styled.img`
  width: 300px;
`;
const StyledImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: end;
  margin-top: 5px;
  font-weight: 400;
  color: #0d5ec1;
  @media ${device.laptopL} {
    font-size: 15px;
  }

  @media ${device.tablet} {
    font-size: 14px;
  }
  @media ${device.mobileL} {
    font-size: 10px;
  }
`;
