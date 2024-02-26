import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="flex items-center justify-between rounded-md bg-stone-800 p-[10px] text-sm uppercase text-stone-200 ">
      {/* Link to open cart */}
      <Link to="/cart">Cart&rarr;</Link>
    </div>
  );
}

export default CartOverview;
