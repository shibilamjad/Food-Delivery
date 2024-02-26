import { Link } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import styled from 'styled-components';
import { OrderOverview } from '../features/order/orderOverview';
import { RestaurantOverview } from '../features/Restaurant/RestaurantOverview';

function Header() {
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
