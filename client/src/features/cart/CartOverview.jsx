import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../../ui/device';
import { IoCartOutline } from 'react-icons/io5';

function CartOverview() {
  return (
    <StyledNavLink to="/cart">
      <span>
        <IoCartOutline />
      </span>
      Cart
    </StyledNavLink>
  );
}

export default CartOverview;

const StyledNavLink = styled(NavLink)`
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
