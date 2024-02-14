import styled from "styled-components";
import { device } from "./device";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 20rem 1.7fr 1.2fr;
  gap: 0.4rem;
  margin-bottom: 10px;
  padding: 0.4rem 0;
  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  @media ${device.mobileS} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
  }
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
