import styled from "styled-components";

import { H1 } from "../../ui/AuthStyles";
import { device } from "../../ui/device";
import Buttons from "../../ui/Buttons";
import { useLogout } from "./useLogout";

function Logout({ onClose }) {
  const { logout } = useLogout();

  const hadleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledContainer>
      <H1>Logout</H1>
      <p>Are you sure you want to logout?</p>
      <StlyedButton>
        <Buttons variation="secondary" size="medium" onClick={onClose}>
          Cancel
        </Buttons>
        <Buttons variation="danger" size="medium" onClick={hadleLogout}>
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

const StlyedButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;
