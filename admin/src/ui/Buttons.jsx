import styled, { css } from "styled-components";
import { device } from "./device";

const Button = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  color: #f9fafb;
  background-color: #4f46e5;
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  @media ${device.laptopL} {
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
  }
  @media ${device.laptop} {
    font-size: 1.3rem;
    padding: 1.1rem 1.4rem;
  }
  @media ${device.tablet} {
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
    padding: 0.5rem 0.8rem;
  }
  &:hover {
    background-color: #4338ca;
  }
`;

export default Button;
