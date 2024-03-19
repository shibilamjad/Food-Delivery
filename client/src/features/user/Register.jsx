import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { ModelAuth } from '../../ui/ModelAuth';
import { AlignCenter, H1, NavLink, StyledSign } from '../../ui/AuthStyles';
import { device } from '../../ui/device';
import { useRegister } from './useRegister';

export function Register() {
  const [otpShow, setOtpShow] = useState(false);
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp } = useRegister();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth,
    );
  };

  const onSubmit = () => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const mobile = '+' + ph;

    signInWithPhoneNumber(auth, mobile, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpShow(true);
        toast.success('Otp sent successfully');
      })
      .catch((error) => {
        if (error.code === 'auth/captcha-check-failed') {
          toast.error('reCAPTCHA verification failed. Please try again.');
        } else if (error.code === 'auth/invalid-phone-number') {
          toast.error(
            'Invalid phone number. Please enter a valid phone number.',
          );
        } else {
          toast.error(
            'Something went wrong. Please check your details or try again later.',
          );
        }
        console.log(error);
      });
  };

  const verifyOtp = (data) => {
    const mobile = '+' + ph;
    const formData = { ...data, mobile };
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          let user = result.user;
          signUp(formData);
        })
        .catch((error) => {
          toast.error("User couldn't sign in (bad verification code?)");
        });
    }
  };
  return (
    <>
      {!otpShow ? (
        <ModelAuth>
          <StyledImage>
            <Img src="/sign-up.png" alt="image" />
            <H1>Sign up</H1>
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
            {errors.mobile && <Error>{errors?.mobile?.message}</Error>}
            <InputContainer>
              <TextField
                sx={{ width: '100%' }}
                variant="outlined"
                autoComplete="off"
                label="Username"
                id="userName"
                {...register('userName', {
                  required: 'This field is required',
                })}
              />
            </InputContainer>
            {errors.userName && <Error>{errors?.userName?.message}</Error>}
            <InputContainer>
              <TextField
                sx={{ width: '100%' }}
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
            </InputContainer>
            {errors.password && <Error>{errors?.password?.message}</Error>}
            <Button type="submit">Create Account</Button>
            <div id="recaptcha"></div>
          </form>
          <StyledSign>
            <AlignCenter>
              <p>Already have an Account? </p>
              <NavLink to="/sign-in"> Sign In now.</NavLink>
            </AlignCenter>
          </StyledSign>
        </ModelAuth>
      ) : (
        <ModelAuth>
          <StyledImage>
            <Img src="/otp.png" alt="image" />
            <H1>Otp Verification</H1>
          </StyledImage>
          <form onSubmit={handleSubmit(verifyOtp)}>
            <InputContainer>
              <StyledOtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props, index) => (
                  <StyledInput {...props} key={index} />
                )}
              ></StyledOtpInput>
            </InputContainer>
            {otp.length === 6 && <Button type="submit">Verify Otp</Button>}
          </form>
          <div id="recaptcha"></div>
        </ModelAuth>
      )}
    </>
  );
}

export const Button = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 15px 20px;
  margin-top: 20px;
  width: 100%;
  border: transparent;
  color: #333;
  background-color: #ffca1a;
  border-radius: 4px;
  &:hover {
    background-color: #ffc401;
    transition: background 0.3s;
  }
  @media ${device.laptopL} {
    font-size: 15px;
    margin-bottom: 8px;
  }
  @media ${device.laptop} {
    font-size: 14px;

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
  color: red;
  font-weight: 300;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  margin-bottom: 10px;
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
const StyledInput = styled.input`
  min-width: 40px;
  height: 40px;
  border: 1px solid #ffca1a;
  margin: 0 5px;
  text-align: center;
  font-size: 18px;
  outline: none;
  border-radius: 5px;
  color: #333;
  @media ${device.tablet} {
    min-width: 35px;
    height: 35px;
  }
  @media ${device.mobileL} {
    min-width: 30px;
    height: 30px;
  }
  @media ${device.mobileS} {
    min-width: 20px;
    height: 20px;
  }
`;

const StyledOtpInput = styled(OtpInput)`
  display: flex;
  justify-content: space-between;
`;
