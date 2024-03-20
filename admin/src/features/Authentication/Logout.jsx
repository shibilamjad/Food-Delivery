import styled from "styled-components";

import { device } from "../../ui/device";
import Buttons from "../../ui/Buttons";
import { useLogout } from "./useLogout";

function Logout({ onClose }) {
  const { logout } = useLogout();

  function handleLogout() {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <StyledContainer>
      <H1>Logout</H1>
      <p>Are you sure you want to logout?</p>
      <StlyedButton>
        <Buttons variation="secondary" size="medium" onClick={onClose}>
          Cancel
        </Buttons>
        <Buttons variation="danger" size="medium" onClick={handleLogout}>
          Confirm
        </Buttons>
      </StlyedButton>
    </StyledContainer>
  );
}

export default Logout;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${device.mobileL} {
    width: auto;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    /* justify-content: flex-end; */
    gap: 0.8rem;
  }
`;

const StlyedButton = styled.button`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

const H1 = styled.h1`
  color: var(--color-grey-700);
  /* color: var(--color-h1); */
  font-size: 32px;
  @media ${device.laptop} {
    font-size: 28px;
  }
  @media ${device.laptopL} {
    font-size: 25px;
  }
  @media ${device.tablet} {
    font-size: 17px;
  }
  @media ${device.mobileL} {
    font-size: 14px;
  }
  @media ${device.mobileS} {
    font-size: 14px;
  }
`;
