import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import { EmptyCart } from './EmptyCart';
import UpdateCartQty from './UpdateCartQty';
import { useCart } from './useCart';

function CartItem({ item }) {
  const { _id, name, discount, unitPrice, quantity } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}{' '}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" text-sm font-bold">{formatCurrency(unitPrice)}</p>
        <div className="flex flex-wrap items-center gap-2 ">
          <UpdateCartQty id={_id} />
          <DeleteItem id={_id} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
