import { useState } from 'react';
import styled from 'styled-components';

import { device } from './device';
import { RestaurantOverview } from '../features/Restaurant/RestaurantOverview';
import CartOverview from '../features/cart/CartOverview';
import { OrderOverview } from '../features/order/orderOverview';
import { LogoutOverView } from '../features/user/LogoutOverView';
import ModalConfirm from './ModalConfirm';
import Logout from '../features/user/Logout';

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <StledFooter>
      <StyledContainer>
        <>
          <RestaurantOverview />
          <CartOverview />
          <OrderOverview />
          <LogoutOverView openModal={openModal} />
          {modalOpen && (
            <ModalConfirm onClose={closeModal}>
              <Logout onClose={closeModal} />
            </ModalConfirm>
          )}
        </>
      </StyledContainer>
    </StledFooter>
  );
}

const StledFooter = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  overflow-x: scroll;
  background-color: #212121;
  padding: 10px 10px;
  @media ${device.mobileL} {
    padding: 5px 10px;
  }
`;

const StyledContainer = styled.div`
  display: none;
  margin: 5px;
  @media ${device.mobileL} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
