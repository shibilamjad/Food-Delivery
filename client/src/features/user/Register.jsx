import { ModelAuth } from '../../ui/ModelAuth';
// import Error from '../../ui/Error';
import { AlignCenter, H1, NavLink, StyledSign } from '../../ui/AuthStyles';
import { Input } from '../../ui/Input';
import styled from 'styled-components';
import { device } from '../../ui/device';
import { useForm } from 'react-hook-form';
import { useRegister } from './useRegister';

export function Register() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = useRegister();

  async function onSubmit(data) {
    try {
      console.log(data);
      await signUp(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ModelAuth>
      <div>
        <H1>Sign up</H1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            placeholder="Username"
            id="userName"
            {...register('userName', {
              required: 'This field is required',
            })}
          />
          {errors.email && <Error>{errors?.userName?.message}</Error>}
        </div>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign up'}
          </Button>
        </div>
      </form>

      <StyledSign>
        <AlignCenter>
          <div>
            <p>Already have a account?</p>
          </div>
          <div>
            &nbsp; <NavLink to="/sign-in"> Sign in now.</NavLink>
          </div>
        </AlignCenter>
      </StyledSign>
    </ModelAuth>
  );
}

export const Button = styled.button`
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  margin-top: 20px;
  width: 100%;
  border: transparent;
  color: #fff;
  background-color: #292929;
  border-radius: 4px;
  &:hover {
    background-color: #121212;
    transition: background 0.3s;
  }
  @media ${device.laptopL} {
    font-size: 15px;
    padding: 8px 12px;
    margin-bottom: 8px;
  }
  @media ${device.laptop} {
    font-size: 14px;

    padding: 8px 12px;
    margin-bottom: 8px;
  }
  @media ${device.tablet} {
    font-size: 14px;
    padding: 8px 12px;
    margin-bottom: 3px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
    padding: 6px 10px;
    margin-bottom: 3px;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    padding: 6px 10px;
    margin-bottom: 4px;
  }
`;
const Error = styled.p`
  font-size: 12px;
  /* margin-bottom: 10px; */
  color: red;
  font-weight: 600;
`;
