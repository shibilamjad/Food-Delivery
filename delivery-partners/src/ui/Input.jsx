import styled from "styled-components";
import { device } from "./device";

export const Input = styled.input`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-50);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  color: var(--color-grey-700);
  padding: 0.8rem 1.2rem;
  margin-top: 10px;
  width: 100%;

  @media ${device.tablet} {
    padding: 0.5rem 0.8rem;
  }
  @media ${device.mobileL} {
    padding: 0.4rem 0.8rem;
  }
  @media ${device.mobileS} {
    padding: 0.4rem 0.8rem;
  }
`;

export default Input;
