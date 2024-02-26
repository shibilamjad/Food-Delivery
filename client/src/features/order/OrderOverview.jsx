import { Link } from 'react-router-dom';

export function OrderOverview() {
  return (
    <div className=" flex items-center justify-between rounded-md bg-stone-800 p-[4px]  text-sm uppercase text-stone-200  ">
      <Link to="/order">OrderList&rarr;</Link>
    </div>
  );
}
