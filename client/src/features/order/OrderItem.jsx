import LinkButton from '../../ui/LinkButton';
import { Loader } from '../../ui/Loader';
import { EmptyOrder } from './EmptyOrder';
import { useOrder } from './useOrder';

export function OrderItem() {
  const { isLoading, order } = useOrder();

  if (isLoading) return <Loader />;
  if (order.length === 0) return <EmptyOrder />;
  console.log(order);
  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <ul className="mx-auto max-w-4xl list-none divide-y divide-stone-200">
        {order.map((item) => (
          <li className="gap-2 px-6 py-4" key={item._id}>
            {item.cart &&
              item.cart.map((cart) => (
                <div className="flex flex-wrap gap-2 pt-3" key={cart._id}>
                  {cart.imageUrl && (
                    <img
                      src={cart.imageUrl}
                      alt={cart.name}
                      className="h-24 w-24 sm:h-36 sm:w-36"
                    />
                  )}
                  <div className="flex flex-col gap-2">
                    <p>
                      <span className="font-semibold">{cart.name}</span>
                    </p>
                    <p>
                      <span className="text-sm capitalize italic text-stone-500">
                        {cart.ingredients}
                      </span>
                    </p>
                    <p className="text-sm capitalize italic text-stone-500">
                      Quantity: {cart.quantity}
                    </p>
                    {/* <p className="gap-3 text-sm  capitalize italic text-stone-500">
                      <span>Address: {item.address}</span>
                      <span className=" px-3">Phone: {item.mobile}</span>
                    </p> */}
                    <p className="font-semibold text-green-700">
                      Price: ₹{cart.unitPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            <div className="flex items-center justify-end">
              <p className=" rounded-sm bg-red-700 p-2 font-semibold text-yellow-50 ">
                Status: {item.delivery}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
