import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="mx-1 mt-2 flex items-center justify-between rounded-md bg-stone-800 px-2 py-2 text-sm uppercase text-stone-200 sm:mt-0 sm:px-3 sm:py-1  md:mt-0 md:px-2 ">
      {/* Link to open cart */}
      <Link to="/cart">Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
