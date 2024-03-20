import styled from 'styled-components';
import { IoIosLogOut } from 'react-icons/io';
import { device } from '../../ui/device';

export function LogoutOverView({ openModal }) {
  return (
    <StyledButton onClick={openModal}>
      <span>
        <IoIosLogOut />
      </span>
      Logout
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.5s;
  &:hover:not(:disabled) {
    color: ${(props) => (props.$active ? '#4a4a4a' : '#272727')};
  }
  &.active {
    color: #121212;
    border-bottom: 1px solid #262626;
  }
  @media ${device.mobileL} {
    display: flex;
    align-items: center;
    gap: 3px;
    border-bottom: 2px solid transparent;
    color: #e3e3e3;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.44rem 0.8rem;
    transition: all 0.5s;
    &:hover:not(:disabled) {
      color: ${(props) => (props.$active ? '#ffce3a' : '#ffce3a')};
    }
    &.active {
      color: #ffce3a;
      border-bottom-color: #ffce3a;
    }
  }
`;
