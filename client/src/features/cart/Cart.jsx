import { Link } from 'react-router-dom';

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
  function handleClearCart() {
    clearCarts();
  }

  if (isLoading) return <Loader />;
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, </h2>
      <ul className=" mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem
            id={item._id}
            totalPrice={item.totalPrice}
            quantity={item.quantity}
            menuItem={item.menuItem}
            key={item._id}
          />
        ))}
      </ul>
      <div className="mt-6 space-x-4">
        <Button type="primery" to="/order/new">
          Order Now
        </Button>
        <Button type="secondery" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
