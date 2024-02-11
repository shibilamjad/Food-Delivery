import { Link } from 'react-router-dom';
import Button from '../../ui/Button';

export function EmptyCart() {
  return (
    <div className="m-2 p-6 text-sm text-stone-600 ">
      <p className=" mb-6">
        Your cart is still empty. Start adding some pizzas :)
      </p>
      <Button type="small" to="/menu">
        Go to Menu{' '}
      </Button>
    </div>
  );
}
