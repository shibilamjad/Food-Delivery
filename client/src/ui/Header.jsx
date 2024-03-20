import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

import CartOverview from '../features/cart/CartOverview';
import { OrderOverview } from '../features/order/orderOverview';
import { RestaurantOverview } from '../features/Restaurant/RestaurantOverview';
import Logout from '../features/user/Logout';
import ModalConfirm from './ModalConfirm';
import { LogoutOverView } from '../features/user/LogoutOverView';
import UserLocation from '../features/Restaurant/UserLocation';
import { device } from './device';

function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/restaurant';

  const closeModal = () => {
    setModalOpen(false);
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
        <h1 className="py-2 text-[20px] font-semibold tracking-widest text-stone-800">
          <span>Door Dash Dine</span>
          <img src="/logo.png" alt="imge" className="w-10" />
        </h1>
        {isHomePage && <UserLocation />}
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
  @media ${device.mobileL} {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  @media ${device.tablet} {
    justify-content: center;
  }
  h1 {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-right: 10px;
  }
`;

const StyledNav = styled.div`
  display: flex;
  gap: 8px;
  @media ${device.mobileL} {
    display: none;
  }
`;
