import { useNavigate } from 'react-router-dom';

import Button from '../../ui/Button';
import { Loader } from '../../ui/Loader';
import { useAddCart } from '../cart/useAddCart';
import { useCart } from '../cart/useCart';

export function MenuItem({ items, distance, restaurantId }) {
  const navigate = useNavigate();

  const { _id, discount, name, imageUrl, ingredients, isAvailable, unitPrice } =
    items;
  const { addCart } = useAddCart();
  const { cart, isLoading } = useCart();
  const handleCartAction = (menuId, restaurantId) => {
    try {
      const alreadySelected = cart.some((item) => item.menuItem._id === menuId);
      if (alreadySelected) {
        navigate('/cart');
      } else {
        console.log(restaurantId, menuId);
        addCart({ menuId, restaurantId });
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
        className={`h-24 w-24 object-cover  sm:h-36 sm:w-36 ${
          !isAvailable ? `opacity-70 grayscale` : ``
        } `}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className=" font-medium capitalize">{name}</p>

        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients}
        </p>
        <div className=" mt-auto flex flex-wrap items-center justify-between gap-x-2">
          {isAvailable ? (
            <div className="text-md ">
              <div className="text-red-700 line-through ">
                {discount > 0 && `₹${unitPrice}`}
              </div>
              <div className="text-green-700">
                {discount > 0 ? `₹${unitPrice - discount}` : `₹${unitPrice}`}
              </div>
            </div>
          ) : (
            <p className=" text-sm  font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="flex items-center gap-4">
            {isAvailable ? (
              cart.some((item) => item.menuItem._id === _id) ? (
                <Button
                  key={_id}
                  type="third"
                  onClick={() => handleCartAction(_id)}
                >
                  Go to Cart
                </Button>
              ) : (
                <Button
                  key={_id}
                  type="small"
                  disabled={distance > 30}
                  onClick={() => handleCartAction(_id, restaurantId)}
                >
                  Add to cart
                </Button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}
