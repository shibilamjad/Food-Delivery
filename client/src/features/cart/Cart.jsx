import { useNavigate } from 'react-router-dom';

import { useCart } from './useCart';
import { Loader } from '../../ui/Loader';
import { EmptyCart } from './EmptyCart';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useClearCarts } from './useClearCarts';

export function Cart() {
  const { cart, isLoading } = useCart();
  const { clearCarts } = useClearCarts();
  const navigate = useNavigate();
  function handleClearCart() {
    clearCarts();
  }
  const allQuantitiesZero = cart && cart.some((item) => item.quantity === 0);
  if (isLoading) return <Loader />;
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="flex  items-center justify-center">
      <div className="w-[800px] px-8 py-4 sm:px-10 sm:py-5 ">
        <LinkButton to="/restaurant">&larr; Back to menu</LinkButton>
        <h2 className="mt-7 text-xl font-semibold">Your cart, </h2>
        <ul className=" mt-3 divide-y divide-stone-200 border-b">
          {cart.map((item) => (
            <>
              <CartItem
                id={item._id}
                totalPrice={item.totalPrice}
                quantity={item.quantity}
                menuItem={item.menuItem}
                key={item._id}
              />
              {item.quantity === 0 && (
                <p className=" text-red-500">Quantity must be at least 1</p>
              )}
            </>
          ))}
        </ul>
        <div className="mt-6 space-x-4">
          <Button
            disabled={allQuantitiesZero}
            type="primery"
            onClick={() => navigate('/new/order')}
          >
            Order Now
          </Button>
          <Button type="secondery" onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}
