import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useCart } from './useCart';
import { Loader } from '../../ui/Loader';
import { EmptyCart } from './EmptyCart';

export function Cart() {
  const { cart, isLoading } = useCart();
  if (isLoading) return <Loader />;
  console.log(cart);
  if (!cart) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, </h2>
      <ul className=" mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item._id} />
        ))}
      </ul>
      <div className="mt-6 space-x-4">
        <Button type="primery" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondery">Clear cart</Button>
      </div>
      {/* <EmptyCart /> */}
    </div>
  );
}
