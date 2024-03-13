import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";

import signUpImage from "../../assets/sign-up.png";
import { useLogin } from "./useLogin";
import { ModelAuth } from "../../ui/ModelAuth";
import { Input } from "../../ui/Input";
import {
  AlignCenter,
  Button,
  Error,
  H1,
  NavLink,
  StyledSign,
} from "../../ui/AuthStyles";
import { useState } from "react";

export function SignIn() {
  const { login } = useLogin();
  const [ph, setPh] = useState("");

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  async function onSubmit({ password }) {
    const mobile = "+" + ph;
    try {
      await login({ mobile, password });
    } catch (error) {
      console.error("Login Error:", error);
    }
  }

  return (
    <ModelAuth>
      <StyledImage>
        <Img src={signUpImage} alt="image" />
        <H1>Sign-In</H1>
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
        <InputContainer>
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
        </InputContainer>
        {errors.password && <Error>{errors?.password?.message}</Error>}
        <InputContainer>
          <Button type="submit">Sign in</Button>
        </InputContainer>
      </form>

      <StyledSign>
        <AlignCenter>
          <p>Create a new account? </p>
          <NavLink to="/sign-up"> Sign Up now.</NavLink>
        </AlignCenter>
      </StyledSign>
    </ModelAuth>
  );
}

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
