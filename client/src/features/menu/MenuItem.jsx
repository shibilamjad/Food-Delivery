import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from '../cart/DeleteItem';
import UpdateCartQty from '../cart/UpdateCartQty';
import { useAddCart } from '../cart/useAddCart';
import { useCart } from '../cart/useCart';
import { useDeleteCart } from '../cart/useDeleteCart';

export function MenuItem({ items }) {
  const { _id, discount, name, imageUrl, ingredients, isAvailable, unitPrice } =
    items;
  const { addCart } = useAddCart();
  const { deleateCart } = useDeleteCart();
  const { cart } = useCart();
  function handleAddCart(menuId) {
    try {
      const alredySelected = cart.find((item) => item._id === menuId);
      if (alredySelected) {
        return deleateCart(menuId);
      }
      addCart(menuId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 sm:h-36 ${isAvailable ? `opacity-70 grayscale` : ``} `}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className=" font-medium">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients}
        </p>
        <p className="  text-sm capitalize italic text-yellow-600">Ratings</p>

        <div className=" mt-auto flex flex-wrap items-center justify-between gap-x-2">
          {!isAvailable ? (
            <div className="text-md ">
              <div className="text-red-700 line-through ">
                {discount > 0 && formatCurrency(unitPrice)}
              </div>
              <div className="text-green-700">
                {discount > 0
                  ? formatCurrency(unitPrice - discount)
                  : formatCurrency(unitPrice)}
              </div>
            </div>
          ) : (
            <p className=" text-sm  font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="flex items-center gap-4">
            {/* {incItem && <DeleteItem pizzaId={_id} />} */}
            {cart && cart.some((item) => item._id === _id) ? (
              <Button type="small">Remove</Button>
            ) : (
              !isAvailable && (
                <Button type="small" onClick={() => handleAddCart(_id)}>
                  Add to cart
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
