import styled from 'styled-components';

import { device } from '../../ui/device';
import { useLogout } from './useLogout';
import Button from '../../ui/Button';

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
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <StlyedButton>
        <Button type="secondery" onClick={onClose}>
          Cancel
        </Button>
        <Button type="danger" onClick={hadleLogout}>
          Confirm
        </Button>
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
  & h1 {
    font-size: 20px;
    font-weight: 600;
    @media ${device.mobileL} {
      font-size: 18px;
    }
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
