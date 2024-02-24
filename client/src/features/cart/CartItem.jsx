import DeleteItem from './DeleteItem';
import UpdateCartQty from './UpdateCartQty';
import { useUpdateQuantity } from './useCartUpdate';

function CartItem({ menuItem, quantity, id, totalPrice, imageUrl }) {
  const { updateCart } = useUpdateQuantity();
  function handleUpdateQty(_id, action) {
    try {
      updateCart({ menuItemId: _id, action: action });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="h-16 w-16"
        />
        <p className="mb-1 sm:mb-0">
          {quantity}&times; {menuItem.name}
        </p>
      </div>
      <div className="flex items-center justify-between sm:gap-6">
        <p className=" text-sm font-bold">₹{totalPrice}</p>
        <div className="flex flex-wrap items-center gap-2 ">
          <UpdateCartQty
            id={id}
            quantity={quantity}
            onUpdateQty={handleUpdateQty}
          />
          <DeleteItem id={id} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
