import { Link } from 'react-router-dom';

export function RestaurantOverview() {
  return (
    <div className=" rounded-md bg-stone-800 p-[10px] text-sm uppercase text-stone-200 ">
      <Link to="/restaurant">Home&rarr;</Link>
    </div>
  );
}
