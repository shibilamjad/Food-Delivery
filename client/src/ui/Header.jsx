import CartOverview from '../features/cart/CartOverview';
import styled from 'styled-components';
import { OrderOverview } from '../features/order/orderOverview';
import { RestaurantOverview } from '../features/Restaurant/RestaurantOverview';
import { useState } from 'react';
import Logout from '../features/user/Logout';
import ModalConfirm from './ModalConfirm';
import { LogoutOverView } from '../features/user/LogoutOverView';
import UserLocation from './UserLocation';
import { device } from './device';

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
    <Headers
      className=" bg-yellow-400
      uppercase shadow-lg"
    >
      <Div>
        <h1 className=" py-2 text-[20px] font-semibold tracking-widest text-stone-800">
          Fast And Go .
        </h1>
        <UserLocation />
      </Div>
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
    </Headers>
  );
}

export default Header;

const Headers = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  @media ${device.tablet} {
    justify-content: center;
  }
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledNav = styled.div`
  display: flex;
  gap: 8px;
  @media ${device.tablet} {
  }
`;
