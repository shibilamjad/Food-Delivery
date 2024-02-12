import Button from '../../ui/Button';
import { Loader } from '../../ui/Loader';
import { formatCurrency } from '../../utils/helpers';
import { useAddCart } from '../cart/useAddCart';
import { useCart } from '../cart/useCart';
import { useDeleteCart } from '../cart/useDeleteCart';

export function MenuItem({ items }) {
  const { _id, discount, name, imageUrl, ingredients, isAvailable, unitPrice } =
    items;
  const { addCart } = useAddCart();
  const { deleteCart } = useDeleteCart();
  const { cart, isLoading } = useCart();

  const handleCartAction = (menuId) => {
    try {
      const alreadySelected = cart.some((item) => item._id === menuId);
      if (alreadySelected) {
        deleteCart(menuId);
      } else {
        addCart(menuId);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24  sm:h-36 sm:w-36 ${
          !isAvailable ? `opacity-70 grayscale` : ``
        } `}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className=" font-medium capitalize">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients}
        </p>
        <p className="  text-sm capitalize italic text-yellow-600">Ratings</p>

        <div className=" mt-auto flex flex-wrap items-center justify-between gap-x-2">
          {isAvailable ? (
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
            {isAvailable && (
              <Button type="small" onClick={() => handleCartAction(_id)}>
                {cart.some((item) => item._id === _id)
                  ? 'Remove'
                  : 'Add to cart'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}