import styled from "styled-components";
import { device } from "./device";

export const Input = styled.input`
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  padding: 0.8rem 1.2rem;
  width: 300px;

  @media ${device.tablet} {
    width: 250px;
    padding: 0.5rem 0.8rem;
  }
  @media ${device.mobileL} {
    width: 150px;
    padding: 0.4rem 0.8rem;
  }
  @media ${device.mobileS} {
    width: 140px;
    padding: 0.4rem 0.8rem;
  }
`;

export default Input;
