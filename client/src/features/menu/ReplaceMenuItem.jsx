import styled from 'styled-components';

import { device } from '../../ui/device';
import Button from '../../ui/Button';
import { useClearCarts } from '../cart/useClearCarts';
import { useAddCart } from '../cart/useAddCart';

function ReplaceMenuItem({
  onClose,
  menuId,
  restaurantId,
  cart,
  setModalOpen,
}) {
  const cartNames = cart && cart.map((name) => name.menuItem.name);
  const { addCart } = useAddCart();
  const { clearCarts } = useClearCarts();

  function handleConfirm(menuId, restaurantId) {
    clearCarts();
    addCart({ menuId, restaurantId });
    setModalOpen(false);
  }

  return (
    <StyledContainer>
      <h1>
        Clear Cart
        {cartNames.length === 1 && (
          <span className="text-red-500"> {cartNames[0]}</span>
        )}
        {cartNames.length === 2 && (
          <span className="text-red-500">
            {' '}
            {cartNames[0]} &amp; {cartNames[1]}
          </span>
        )}
        {cartNames.length === 3 && (
          <span className="text-red-500">
            {' '}
            {cartNames[0]}, {cartNames[1]} &amp; {cartNames[2]} etc..
          </span>
        )}
      </h1>
      <p>
        Only one restaurant item can be selected. Are you sure you want to clear
        CartItems and add a new item?
      </p>

      <StlyedButton>
        <Button type="secondery" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="danger"
          onClick={() => handleConfirm(menuId, restaurantId)}
        >
          Confirm
        </Button>
      </StlyedButton>
    </StyledContainer>
  );
}

export default ReplaceMenuItem;

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

const StlyedButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;
