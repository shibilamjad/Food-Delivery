import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateCartQty from './UpdateCartQty';

function CartItem({ item }) {
  const { _id, name, discount, unitPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {discount}&times; {name}{' '}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" text-sm font-bold">{formatCurrency(unitPrice)}</p>
        <div className="flex flex-wrap items-center gap-2 ">
          <UpdateCartQty pizzaID={_id} />
          <DeleteItem pizzaId={_id} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
