import { ModelAuth } from "../../ui/ModelAuth";
import {
  AlignCenter,
  Button,
  H1,
  NavLink,
  StyledSign,
} from "../../ui/AuthStyles";
import { Input } from "../../ui/Input";
import styled from "styled-components";
import { device } from "../../ui/device";
import { useForm } from "react-hook-form";
import { useDeliveyBoyRegister } from "./useDeliveyBoyRegister ";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";
import toast from "react-hot-toast";

export function Register() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { signUp, isLoading } = useDeliveyBoyRegister();
  const [ph, setPh] = useState("");
  const [otpShow, setOtpShow] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setIsLoading] = useState(false);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };
  const onSubmit = () => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    const mobile = "+" + ph;
    setIsLoading(true);
    signInWithPhoneNumber(auth, mobile, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpShow(true);
        toast.success("Otp sent successfully");
      })
      .catch((error) => {
        if (error.code === "auth/captcha-check-failed") {
          toast.error("reCAPTCHA verification failed. Please try again.");
        } else if (error.code === "auth/invalid-phone-number") {
          toast.error(
            "Invalid phone number. Please enter a valid phone number."
          );
        } else {
          toast.error(
            "Something went wrong. Please check your details or try again later."
          );
        }
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const verifyOtp = (data) => {
    const mobile = "+" + ph;
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
            <Img src="../../../sign-up.png" alt="image" />
            <H1>Sign up</H1>
          </StyledImage>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <PhoneInput
                country={"in"}
                name="mobile"
                value={ph}
                onChange={setPh}
              />
            </InputContainer>
            <div>
              <Input
                type="text"
                placeholder="Name"
                id="name"
                {...register("name", {
                  required: "This field is required",
                })}
              />
              {errors.name && <Error>{errors?.name?.message}</Error>}
              <Input
                type="password"
                placeholder="Password"
                id="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password needs a minimum of 6 characters",
                  },
                })}
              />
              {errors.password && <Error>{errors?.password?.message}</Error>}
            </div>
            <Button type="submit" disabled={loading}>
              {isLoading ? "Loading..." : "Sign up"}
            </Button>

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
            <Img src="../../../otp.png" alt="image" />
            <H1>Otp Verification</H1>
          </StyledImage>
          <form onSubmit={handleSubmit(verifyOtp)}>
            <InputContainer>
              <StyledOtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="text-white">-</span>}
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

const Error = styled.p`
  font-size: 12px;
  color: var(--color-red-700);
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  margin-bottom: 10px;
`;
const StyledImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 300px;
`;

const StyledOtpInput = styled(OtpInput)`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  min-width: 40px;
  height: 40px;
  border: 1px solid var(--color-brand-500);
  margin: 0 5px;
  text-align: center;
  font-size: 18px;
  outline: none;
  border-radius: 5px;
  color: var(--color-grey-700);
  background-color: var(--color-grey-0);
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
