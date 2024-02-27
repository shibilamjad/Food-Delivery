import styled from "styled-components";
import { device } from "./device";

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4rem 4rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: 10px;
  color: var(--color-brand-200);
  @media ${device.tablet} {
    padding: 1.4rem 2.5rem;
  }
  @media ${device.mobileL} {
    padding: 1rem 2rem;
  }
  h1 {
    font-size: 40px;
    font-weight: 600;
    padding-left: 20px;
    margin: 10px;
    @media ${device.tablet} {
      font-size: 30px;
      font-weight: 600;
      padding-left: 10px;
      margin: 10px;
    }
    @media ${device.mobileL} {
      font-size: 20px;
      font-weight: 600;
      padding-left: 1px;
      margin: 10px;
    }
  }
`;

export const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  font-size: 1.4rem;
  width: 1000px;
  @media ${device.laptopL} {
    font-size: 1.2rem;
    padding: 1rem 1rem;
    width: 600px;
  }
  @media ${device.laptop} {
    width: 400px;
  }
  @media ${device.tablet} {
    width: 300px;
  }
  @media ${device.mobileL} {
    width: 240px;
  }
  @media ${device.mobileS} {
    width: 200px;
  }
`;
