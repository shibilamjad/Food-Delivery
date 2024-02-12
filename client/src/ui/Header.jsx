import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import CartOverview from '../features/cart/CartOverview';
import styled from 'styled-components';
import { OrderOverview } from '../features/order/orderOverview';

function Header() {
  return (
    <header
      className="flex flex-col items-center 
    justify-between border-b border-stone-200
     bg-yellow-400 px-4 py-3 uppercase sm:flex sm:flex-row sm:px-6"
    >
      <div>
        <Link
          className=" py-2 font-semibold tracking-widest text-stone-800"
          to="/"
        >
          Fast React Pizza co.
        </Link>
      </div>
      <div>
        <SearchOrder />
      </div>
      <StyledNav>
        <CartOverview />
        <OrderOverview />
      </StyledNav>
      {/* <UserName /> */}
    </header>
  );
}

export default Header;

const StyledNav = styled.div`
  display: flex;
  gap: 10px;
`;
