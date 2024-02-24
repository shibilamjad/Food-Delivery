import { useNavigate } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
import { HiMiniStar } from 'react-icons/hi2';

import Button from '../../ui/Button';
import { Loader } from '../../ui/Loader';
import { formatCurrency } from '../../utils/helpers';
import { useAddCart } from '../cart/useAddCart';
import { useCart } from '../cart/useCart';

export function MenuItem({ items }) {
  const navigate = useNavigate();
  const {
    _id,
    discount,
    name,
    imageUrl,
    ingredients,
    isAvailable,
    unitPrice,
    restaurant,
  } = items;
  console.log(items);
  const { addCart } = useAddCart();
  const { cart, isLoading } = useCart();
  const handleCartAction = (menuId) => {
    try {
      const alreadySelected = cart.some((item) => item.menuItem._id === menuId);
      if (alreadySelected) {
        navigate('/cart');
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
        className={`h-24 w-24 object-cover  sm:h-36 sm:w-36 ${
          !isAvailable ? `opacity-70 grayscale` : ``
        } `}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className=" font-medium capitalize">
          {name}({restaurant.restaurant})
        </p>
        <p className="  text-sm capitalize italic text-yellow-600">
          <HiMiniStar />
        </p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients}
        </p>
        {/* <p className=" text-sm capitalize italic text-stone-500">
          {restaurant.address}
        </p> */}
        <p className=" text-sm capitalize italic text-stone-500">
          <WiTime8 />
        </p>

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
                  onClick={() => handleCartAction(_id)}
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
