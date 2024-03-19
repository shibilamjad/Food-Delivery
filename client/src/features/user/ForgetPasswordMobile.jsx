import { useForm } from 'react-hook-form';
import {
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import styled from 'styled-components';
import { TextField } from '@mui/material';

import { H1 } from '../../ui/AuthStyles';
import { Button } from './SignIn';
import { toast } from 'react-hot-toast';
import { ModelAuth } from '../../ui/ModelAuth';
import { device } from '../../ui/device';
import { useForgetPassword } from './useForgetPassword';
import { auth } from './firebase';

function ForgetPasswordMobile() {
  const [ph, setPh] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpConfirm, setConfirm] = useState(false);
  const [otp, setOtp] = useState('');

  const { forgetPassword } = useForgetPassword();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
  const onSubmit = async () => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const mobile = '+' + ph;

    try {
      signInWithPhoneNumber(auth, mobile, appVerifier).then(
        (confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtpSent(true);
          toast.success('Otp sent successfully');
        },
      );
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  const handleOtpVerification = async () => {
    try {
      if (otp.length === 6) {
        let confirmationResult = window.confirmationResult;
        confirmationResult
          .confirm(otp)
          .then((result) => {
            toast.success('OTP verified successfully');
            setConfirm(true);
          })
          .catch((error) => {
            toast.error("User couldn't sign in (bad verification code?)");
          });
      }
      // Render a form to reset password
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Failed to verify OTP. Please try again.');
    }
  };
  const onConfirm = async ({ password }) => {
    const mobile = '+' + ph;
    const formData = { password, mobile };
    try {
      await forgetPassword(formData);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <>
      {!otpConfirm ? (
        <div>
          {!otpSent ? (
            <div>
              <ModelAuth>
                <StyledImage>
                  <Img src="/forgetPassword.png" alt="image" />
                  <H1>Forget Password</H1>
                </StyledImage>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-1">
                    <PhoneInput
                      country={'in'}
                      name="mobile"
                      value={ph}
                      onChange={setPh}
                    />
                  </div>
                  <div>
                    <Button disabled={ph.length < 8} type="submit">
                      Forget Password
                    </Button>
                  </div>
                </form>
              </ModelAuth>
              <div id="recaptcha"></div>
            </div>
          ) : (
            <div>
              <ModelAuth>
                <StyledImage>
                  <Img src="/otp.png" alt="image" />
                  <H1>Otp Verification</H1>
                </StyledImage>
                <form onSubmit={handleSubmit(handleOtpVerification)}>
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
                  <Button disabled={otp.length < 6} type="submit">
                    Verify Otp
                  </Button>
                </form>
                <div id="recaptcha"></div>
              </ModelAuth>
            </div>
          )}
        </div>
      ) : (
        <ModelAuth>
          <StyledImage>
            <H1>Confirm Password</H1>
          </StyledImage>
          <form onSubmit={handleSubmit(onConfirm)}>
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
        </ModelAuth>
      )}
    </>
  );
}

export default ForgetPasswordMobile;

const StyledImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 300px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  margin-bottom: 10px;
`;

const StyledOtpInput = styled(OtpInput)`
  display: flex;
  justify-content: space-between;
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

const Error = styled.p`
  font-size: 12px;
  color: red;
  font-weight: 300;
`;
