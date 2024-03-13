import CartOverview from '../features/cart/CartOverview';
import styled from 'styled-components';
import { OrderOverview } from '../features/order/orderOverview';
import { RestaurantOverview } from '../features/Restaurant/RestaurantOverview';
import { useState } from 'react';
import Logout from '../features/user/Logout';
import ModalConfirm from './ModalConfirm';
import { LogoutOverView } from '../features/user/LogoutOverView';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setOtpOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <header
      className=" flex  flex-col items-center justify-between 
    border-b border-stone-200 bg-yellow-400
     px-4 py-3 uppercase shadow-lg sm:flex sm:flex-row sm:px-6"
    >
      <div>
        <h1 className=" py-2 text-[20px] font-semibold tracking-widest text-stone-800">
          Fast And Go .
        </h1>
      </div>
      <StyledNav>
        <RestaurantOverview />
        <CartOverview />
        <OrderOverview />
        <LogoutOverView openModal={openModal} />
        {modalOpen && (
          <ModalConfirm onClose={closeModal}>
            <Logout onClose={closeModal} />
          </ModalConfirm>
        )}
      </StyledNav>
    </header>
  );
}

export default Header;

const StyledNav = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;
