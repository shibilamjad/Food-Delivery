import DeleteItem from './DeleteItem';
import UpdateCartQty from './UpdateCartQty';
import { useUpdateQuantity } from './useCartUpdate';

function CartItem({ item }) {
  const { updateCart } = useUpdateQuantity();
  const { _id, name, totalPrice, unitPrice, quantity } = item;

  function handleUpdateQty(_id, action) {
    try {
      updateCart({ menuItemId: _id, action: action });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" text-sm font-bold">₹{totalPrice}</p>
        <div className="flex flex-wrap items-center gap-2 ">
          <UpdateCartQty
            id={_id}
            quantity={quantity}
            onUpdateQty={handleUpdateQty}
          />
          <DeleteItem id={_id} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
